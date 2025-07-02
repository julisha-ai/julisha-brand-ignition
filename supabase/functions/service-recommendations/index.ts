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
      businessSize, 
      currentChallenges, 
      goals, 
      budgetRange, 
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

    // Generate recommendations using Perplexity API
    const prompt = `As an AI business consultant for Julisha Solutions (an AI innovation and brand management company), analyze this business profile and provide comprehensive service recommendations:

Company: ${company || 'Not specified'}
Industry: ${industry || 'Not specified'}
Business Size: ${businessSize || 'Not specified'}
Current Challenges: ${currentChallenges || 'Not specified'}
Goals: ${goals || 'Not specified'}
Budget Range: ${budgetRange || 'Not specified'}
Timeline: ${timeline || 'Not specified'}
Additional Info: ${additionalInfo || 'Not specified'}

Based on current market trends and AI innovations in 2024-2025, provide:

1. **Primary Service Recommendations** from Julisha Solutions:
   - Smart Agents (AI-powered business automation)
   - Conversational AI (chatbots, virtual assistants)
   - Brand Management (digital presence optimization)
   - AI Consulting (implementation guidance)
   - Web Development (custom solutions)

2. **Strategic Implementation Plan**:
   - Phase-by-phase rollout
   - Timeline considerations
   - Resource requirements

3. **Budget Optimization**:
   - Cost-effective approaches
   - ROI projections
   - Scalability options

4. **Market Trends & Future-Proofing**:
   - Current AI trends relevant to their industry
   - Emerging technologies to consider
   - Competitive advantages

Format the response as a professional business proposal with clear sections and actionable insights.`;

    let recommendations = 'AI-powered recommendations temporarily unavailable. Our team will provide personalized recommendations via email within 24 hours.';

    if (perplexityApiKey) {
      try {
        const response = await fetch('https://api.perplexity.ai/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${perplexityApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'llama-3.1-sonar-large-128k-online',
            messages: [
              {
                role: 'system',
                content: 'You are an expert AI business consultant specializing in AI solutions and brand management. Provide detailed, actionable recommendations based on current market data and trends.'
              },
              {
                role: 'user',
                content: prompt
              }
            ],
            temperature: 0.3,
            top_p: 0.9,
            max_tokens: 2000,
            search_recency_filter: 'month',
            frequency_penalty: 1,
            presence_penalty: 0
          }),
        });

        if (response.ok) {
          const data = await response.json();
          recommendations = data.choices[0].message.content;
        }
      } catch (perplexityError) {
        console.error('Perplexity API error:', perplexityError);
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