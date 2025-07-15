

import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY');

console.log('Environment check:');
console.log('SUPABASE_URL:', !!supabaseUrl);
console.log('SUPABASE_SERVICE_ROLE_KEY:', !!supabaseServiceKey);
console.log('PERPLEXITY_API_KEY:', !!perplexityApiKey);
console.log('All environment variables:', Object.keys(Deno.env.toObject()));

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      name, 
      email, 
      phone, 
      company, 
      industry, 
      customIndustry,
      businessSize, 
      currentChallenges, 
      goals, 
      budgetRange, 
      specificBudget,
      timeline, 
      additionalInfo 
    } = await req.json();

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insert lead into database
    const { data: leadData, error: leadError } = await supabase
      .from('leads')
      .insert({
        name,
        email,
        phone,
        company,
        industry,
        business_size: businessSize,
        current_challenges: currentChallenges,
        goals,
        budget_range: budgetRange,
        timeline,
        additional_info: additionalInfo
      })
      .select()
      .single();

    if (leadError) {
      throw new Error(`Failed to save lead: ${leadError.message}`);
    }

    // Generate recommendations using engineered prompt
    const engineeredPrompt = `ROLE
You are a senior AI business consultant for Julisha Solutions, an established AI innovation and brand management company. You provide clear, actionable business recommendations based on data-driven insights.

OBJECTIVE
Create a concise, professional business proposal with specific service recommendations for the client's business challenges.

CONTEXT PACKAGE
Client Details:
- Company: ${company || 'Not specified'}
- Industry: ${industry === 'other' ? (customIndustry || 'Other') : (industry || 'Not specified')}
- Business Size: ${businessSize || 'Not specified'}
- Current Challenges: ${currentChallenges || 'Not specified'}
- Goals: ${goals || 'Not specified'}
- Budget Range: ${budgetRange === 'under-10k' ? (specificBudget ? `${specificBudget} (under $10,000)` : 'Under $10,000') : (budgetRange || 'Not specified')}
- Timeline: ${timeline || 'Not specified'}
- Additional Context: ${additionalInfo || 'Not specified'}

Available Julisha Solutions Services:
1. Smart Agents (AI automation for business processes)
2. Conversational AI (chatbots, virtual assistants)
3. Brand Management (digital presence optimization)
4. AI Consulting (implementation guidance)
5. Web Development (custom solutions)

Voice and Tone: Professional, consultative, action-oriented
Length Target: Maximum 800 words total
Key Constraints: 
- Stay within specified word limit
- Provide specific, actionable recommendations only
- Include realistic budget estimates
- Focus on measurable outcomes
- Avoid repetition or filler content

WORKFLOW RULES
1. Analyze the client's specific situation
2. Recommend 2-3 most relevant services (not all services)
3. Provide implementation timeline with specific phases
4. Give realistic budget breakdown within their range
5. Include 1-2 key market trends relevant to their industry
6. End with clear next steps

OUTPUT FORMAT
Structure your response with these exact headings:

## Primary Service Recommendations
[List 2-3 most relevant services with brief justification]

## Implementation Roadmap
[3-month phased approach with specific milestones]

## Investment Breakdown
[Realistic cost allocation within their budget]

## Market Advantage
[1-2 current trends that support these recommendations]

## Next Steps
[Specific actions the client should take]

CRITICAL INSTRUCTIONS:
- Maximum 800 words total
- Be specific and actionable
- No repetitive content
- No technical jargon without explanation
- End response immediately after "Next Steps" section
- Do not add disclaimers or additional text beyond the format

Begin analysis and recommendation:`;

    let recommendations = 'AI-powered recommendations temporarily unavailable. Our team will provide personalized recommendations via email within 24 hours.';

    console.log('PERPLEXITY_API_KEY available:', !!perplexityApiKey);

    if (!perplexityApiKey) {
      console.error('PERPLEXITY_API_KEY not found in environment variables');
      console.error('Available env vars:', Object.keys(Deno.env.toObject()));
    } else {
      try {
        console.log('Making Perplexity API call with model: sonar-reasoning-pro');
        
        const requestBody = {
          model: 'sonar-reasoning-pro',
          messages: [
            {
              role: 'system',
              content: 'You are a senior business consultant who provides precise, actionable recommendations. Always follow the exact format specified and stay within word limits. Never repeat content or add unnecessary text.'
            },
            {
              role: 'user',
              content: engineeredPrompt
            }
          ],
          temperature: 0.2,
          top_p: 0.8,
          max_tokens: 1200,
          search_recency_filter: 'month',
          frequency_penalty: 1.2,
          presence_penalty: 0.5
        };
        
        console.log('Request body:', JSON.stringify(requestBody, null, 2));
        
        const response = await fetch('https://api.perplexity.ai/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${perplexityApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        console.log('Perplexity API response status:', response.status);
        console.log('Perplexity API response headers:', Object.fromEntries(response.headers.entries()));

        if (response.ok) {
          const data = await response.json();
          console.log('Perplexity API response received successfully');
          console.log('Response data structure:', JSON.stringify(data, null, 2));
          
          if (data.choices && data.choices[0] && data.choices[0].message) {
            recommendations = data.choices[0].message.content;
            console.log('Recommendations extracted successfully');
          } else {
            console.error('Unexpected response structure:', data);
            throw new Error('Unexpected response structure from Perplexity API');
          }
        } else {
          const errorText = await response.text();
          console.error('Perplexity API error response:', response.status, errorText);
          throw new Error(`Perplexity API error: ${response.status} - ${errorText}`);
        }
      } catch (perplexityError) {
        console.error('Perplexity API error:', perplexityError);
        throw perplexityError;
      }
    }

    // Update lead with recommendations
    await supabase
      .from('leads')
      .update({ recommendations })
      .eq('id', leadData.id);

    return new Response(JSON.stringify({ 
      success: true, 
      leadId: leadData.id,
      recommendations 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in service-recommendations function:', error);
    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

