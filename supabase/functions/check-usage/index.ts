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

    // Get auth token from header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      throw new Error("Unauthorized");
    }

    const { featureType } = await req.json();

    // Get user profile with subscription details
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select(`
        *,
        subscription_plan:subscription_plans(*)
      `)
      .eq('id', user.id)
      .single();

    if (profileError) throw profileError;

    // Check if usage needs reset
    const today = new Date().toISOString().split('T')[0];
    if (profile.usage_reset_date !== today) {
      const nextResetDate = new Date();
      nextResetDate.setMonth(nextResetDate.getMonth() + 1);
      
      await supabase
        .from('profiles')
        .update({
          usage_count: { interviews: 0, ai_answers: 0, emails: 0 },
          usage_reset_date: nextResetDate.toISOString().split('T')[0]
        })
        .eq('id', user.id);
      
      profile.usage_count = { interviews: 0, ai_answers: 0, emails: 0 };
    }

    const limits = profile.subscription_plan.limits;
    const usage = profile.usage_count;

    let canUse = true;
    let remaining = -1;

    if (featureType === 'ai_answer') {
      if (profile.subscription_status === 'free') {
        canUse = false;
        remaining = 0;
      } else {
        const limit = limits.ai_answers_per_day;
        remaining = limit === -1 ? -1 : Math.max(0, limit - (usage.ai_answers || 0));
        canUse = limit === -1 || remaining > 0;
      }
    } else if (featureType === 'interview') {
      const limit = limits.interviews_per_month;
      remaining = limit === -1 ? -1 : Math.max(0, limit - (usage.interviews || 0));
      canUse = limit === -1 || remaining > 0;
    } else if (featureType === 'email') {
      canUse = limits.email_generation === true;
    }

    return new Response(
      JSON.stringify({ 
        canUse,
        remaining,
        plan: profile.subscription_status,
        limits,
        usage
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("Error in check-usage function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
