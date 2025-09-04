import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AIContentRequest {
  topic: string;
  persona?: string;
  tone?: string;
  style?: string;
  instructions?: string;
  knowledgeBase?: string;
  includeSEO?: boolean;
}

const defaultKnowledgeBase = `
Julisha Solutions is a leading digital transformation consultancy specializing in:
- Business Process Optimization & Automation
- Custom Software Development & Integration
- Cloud Migration & Infrastructure Management  
- Data Analytics & Business Intelligence
- Digital Marketing & E-commerce Solutions
- AI & Machine Learning Implementation
- Cybersecurity & Compliance Management
- Project Management & Agile Transformation

Our mission is to empower businesses through innovative technology solutions that drive growth, efficiency, and competitive advantage. We serve clients across industries including healthcare, finance, retail, manufacturing, and professional services.

Key differentiators:
- 15+ years of proven industry experience
- End-to-end digital transformation expertise
- ROI-focused approach with measurable outcomes
- Agile methodology and rapid deployment
- 24/7 support and ongoing optimization
- Certified partnerships with leading tech platforms
`;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      topic, 
      persona = "industry expert", 
      tone = "professional", 
      style = "informative", 
      instructions = "", 
      knowledgeBase = defaultKnowledgeBase,
      includeSeO = true 
    }: AIContentRequest = await req.json();

    if (!topic) {
      return new Response(
        JSON.stringify({ error: "Topic is required" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const systemPrompt = `You are a ${persona} writing content for Julisha Solutions. 
    
    Tone: ${tone}
    Writing Style: ${style}
    
    Knowledge Base about Julisha Solutions:
    ${knowledgeBase}
    
    Additional Instructions: ${instructions}
    
    Create comprehensive, engaging, and SEO-optimized content that:
    1. Provides valuable, up-to-date information with factual accuracy
    2. Includes relevant citations and sources where appropriate
    3. Naturally promotes Julisha Solutions' services where relevant
    4. Uses proper Markdown formatting with headings, bold text, lists, etc.
    5. Includes strategic calls-to-action that align with our services
    6. Maintains brand consistency and professional voice
    
    Format your response as JSON with:
    - "content": Full article in Markdown format
    - "seoTitles": Array of 5 SEO-optimized title options
    - "metaDescription": SEO meta description (150-160 characters)
    - "excerpt": Brief summary for article preview
    - "suggestedTags": Array of relevant tags/keywords
    `;

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
            content: systemPrompt
          },
          {
            role: 'user',
            content: `Create a comprehensive article about: ${topic}`
          }
        ],
        temperature: 0.7,
        top_p: 0.9,
        max_tokens: 4000,
        return_images: false,
        return_related_questions: false,
        search_recency_filter: 'month',
        frequency_penalty: 0.1,
        presence_penalty: 0.1
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Perplexity API error:', errorData);
      throw new Error(`Perplexity API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Try to parse as JSON, fallback to plain content
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(aiResponse);
    } catch {
      // If not JSON, create structured response
      parsedResponse = {
        content: aiResponse,
        seoTitles: [
          `${topic} - Complete Guide | Julisha Solutions`,
          `Understanding ${topic}: Expert Insights & Solutions`,
          `${topic} Best Practices for Business Success`,
          `The Ultimate ${topic} Guide for Modern Businesses`,
          `${topic} Solutions: Transform Your Business Today`
        ],
        metaDescription: `Expert insights on ${topic}. Discover proven strategies and solutions with Julisha Solutions' comprehensive guide to digital transformation.`,
        excerpt: `Comprehensive guide covering everything you need to know about ${topic}, including best practices, strategies, and implementation tips.`,
        suggestedTags: [topic.toLowerCase(), 'digital transformation', 'business solutions', 'technology']
      };
    }

    return new Response(JSON.stringify(parsedResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-content-generator function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});