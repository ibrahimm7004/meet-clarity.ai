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
    const { notes } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log('Categorizing notes');

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
            content: `You are a note categorization assistant. Analyze interview notes and organize them into these categories:
- Technical Questions: coding, algorithms, system design
- Behavioral Questions: past experience, teamwork, challenges
- Company Culture: values, work environment, team dynamics
- Role Details: responsibilities, expectations, growth opportunities
- Next Steps: follow-up actions, timeline, contacts

Return a JSON object with categorized notes.` 
          },
          { 
            role: "user", 
            content: `Categorize these interview notes:\n\n${notes}` 
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
    let categorizedNotes;
    
    try {
      categorizedNotes = JSON.parse(data.choices[0].message.content);
    } catch {
      // If AI doesn't return JSON, wrap the response
      categorizedNotes = {
        general: data.choices[0].message.content
      };
    }

    console.log('Notes categorized successfully');

    return new Response(
      JSON.stringify({ categorizedNotes }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("Error in categorize-notes function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
