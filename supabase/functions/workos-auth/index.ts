import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { code, code_verifier } = await req.json();
    
    const WORKOS_API_KEY = Deno.env.get("WORKOS_API_KEY");
    const WORKOS_CLIENT_ID = Deno.env.get("WORKOS_CLIENT_ID");
    const WORKOS_REDIRECT_URI = Deno.env.get("WORKOS_REDIRECT_URI");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!WORKOS_API_KEY || !WORKOS_CLIENT_ID || !WORKOS_REDIRECT_URI) {
      throw new Error("WorkOS credentials not configured");
    }

    console.log('Exchanging code for token with WorkOS');

    // Exchange code for access token with WorkOS
    const tokenResponse = await fetch("https://api.workos.com/user_management/authenticate", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${WORKOS_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: WORKOS_CLIENT_ID,
        code: code,
        grant_type: "authorization_code",
        redirect_uri: WORKOS_REDIRECT_URI,
        code_verifier: code_verifier,
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error("WorkOS token exchange error:", errorText);
      throw new Error(`WorkOS authentication failed: ${tokenResponse.status}`);
    }

    const { user, access_token } = await tokenResponse.json();
    
    console.log('Successfully authenticated with WorkOS, creating Supabase session');

    // Create Supabase client with service role
    const supabase = createClient(
      SUPABASE_URL!,
      SUPABASE_SERVICE_ROLE_KEY!
    );

    // Check if user exists in profiles
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', user.email)
      .single();

    let userId;

    if (existingProfile) {
      userId = existingProfile.id;
    } else {
      // Create a new auth user
      const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
        email: user.email,
        email_confirm: true,
        user_metadata: {
          full_name: `${user.first_name} ${user.last_name}`,
          workos_id: user.id,
        },
      });

      if (authError) {
        console.error("Error creating user:", authError);
        throw authError;
      }

      userId = authUser.user.id;
    }

    // Generate Supabase session
    const { data: sessionData, error: sessionError } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email: user.email,
    });

    if (sessionError) {
      console.error("Error generating session:", sessionError);
      throw sessionError;
    }

    console.log('Session created successfully');

    return new Response(
      JSON.stringify({ 
        access_token: sessionData.properties.action_link,
        user: {
          id: userId,
          email: user.email,
          full_name: `${user.first_name} ${user.last_name}`,
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("Error in workos-auth function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
