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
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      throw new Error("Unauthorized");
    }

    const { featureType, metadata } = await req.json();

    // Get current profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('usage_count')
      .eq('id', user.id)
      .single();

    if (profileError) throw profileError;

    // Update usage count
    const usageCount = profile.usage_count || { interviews: 0, ai_answers: 0, emails: 0 };
    
    if (featureType === 'interview') {
      usageCount.interviews = (usageCount.interviews || 0) + 1;
    } else if (featureType === 'ai_answer') {
      usageCount.ai_answers = (usageCount.ai_answers || 0) + 1;
    } else if (featureType === 'email') {
      usageCount.emails = (usageCount.emails || 0) + 1;
    }

    // Update profile usage
    await supabase
      .from('profiles')
      .update({ usage_count: usageCount })
      .eq('id', user.id);

    // Log usage in tracking table
    await supabase
      .from('user_usage')
      .insert({
        user_id: user.id,
        feature_type: featureType,
        metadata
      });

    return new Response(
      JSON.stringify({ success: true, usage: usageCount }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("Error in track-usage function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
