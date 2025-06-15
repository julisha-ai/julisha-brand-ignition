import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BlogPostPayload {
  title: string;
  content: string;
  excerpt?: string;
  author_id?: string;
  published?: boolean;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { 
        status: 405, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }

  try {
    const payload: BlogPostPayload = await req.json();
    
    // Validate required fields
    if (!payload.title || !payload.content) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields: title and content are required' 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Prepare blog post data
    const blogPost = {
      title: payload.title,
      content: payload.content,
      excerpt: payload.excerpt || payload.content.substring(0, 150) + '...',
      author_id: payload.author_id || null,
      published: payload.published || false,
    };

    console.log('Creating blog post:', blogPost);

    // Insert blog post into database
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([blogPost])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to create blog post',
          details: error.message 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Blog post created successfully:', data);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Blog post created successfully',
        data: data
      }),
      {
        status: 201,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Invalid JSON payload or server error',
        details: error.message 
      }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});