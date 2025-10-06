import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { transcript, questions, answers, duration } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log('Generating performance report');

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { 
            role: "system", 
            content: `You are an interview performance analyst. Analyze interview performance and provide:
1. Overall Performance Score (0-100)
2. Strengths (3-5 points)
3. Areas for Improvement (3-5 points)
4. Key Insights (2-3 observations)
5. Recommendations (3-4 actionable tips)

Be constructive, specific, and actionable.` 
          },
          { 
            role: "user", 
            content: `Analyze this interview:

Duration: ${duration} minutes
Number of questions: ${questions?.length || 0}
Number of AI assists used: ${answers?.length || 0}

${transcript ? `Transcript:\n${transcript}` : 'No transcript available'}

Generate a comprehensive performance report.` 
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const report = data.choices[0].message.content;

    // Generate a performance score based on various factors
    const baseScore = 70;
    const questionsBonus = Math.min((questions?.length || 0) * 2, 15);
    const durationBonus = duration > 30 ? 10 : duration > 15 ? 5 : 0;
    const aiUsagePenalty = Math.min((answers?.length || 0) * 2, 15);
    const performanceScore = Math.min(100, Math.max(0, baseScore + questionsBonus + durationBonus - aiUsagePenalty));

    console.log('Performance report generated successfully');

    return new Response(
      JSON.stringify({ 
        report,
        performanceScore,
        metrics: {
          duration,
          questionsAsked: questions?.length || 0,
          aiAssistsUsed: answers?.length || 0,
          timestamp: Date.now()
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("Error in generate-report function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
