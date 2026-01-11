import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-api-key',
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
    // Authentication check - require either API key or valid JWT
    const apiKey = req.headers.get('X-API-Key');
    const authHeader = req.headers.get('Authorization');
    const expectedApiKey = Deno.env.get('BLOG_WEBHOOK_API_KEY');

    let isAuthenticated = false;
    let userId: string | null = null;

    // Check API key authentication first
    if (expectedApiKey && apiKey === expectedApiKey) {
      isAuthenticated = true;
      console.log('Authenticated via API key');
    } 
    // Fall back to JWT authentication
    else if (authHeader?.startsWith('Bearer ')) {
      const supabaseAuth = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_ANON_KEY') ?? '',
        { global: { headers: { Authorization: authHeader } } }
      );

      const token = authHeader.replace('Bearer ', '');
      const { data, error } = await supabaseAuth.auth.getUser(token);

      if (!error && data?.user) {
        isAuthenticated = true;
        userId = data.user.id;
        console.log('Authenticated via JWT for user:', userId);
      }
    }

    if (!isAuthenticated) {
      console.log('Authentication failed - no valid API key or JWT provided');
      return new Response(
        JSON.stringify({ error: 'Unauthorized - API key or valid authentication required' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Get raw text first to handle potential JSON parsing issues
    const rawBody = await req.text();
    console.log('Raw request body received');
    
    let payload: BlogPostPayload;
    try {
      payload = JSON.parse(rawBody);
    } catch (parseError) {
      console.error('JSON parsing error');
      return new Response(
        JSON.stringify({ 
          error: 'Invalid JSON format'
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
    
    // Validate and sanitize required fields
    const title = typeof payload.title === 'string' ? payload.title.trim() : '';
    const content = typeof payload.content === 'string' ? payload.content.trim() : '';
    
    if (!title || !content) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields: title and content cannot be empty' 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Validate field lengths
    if (title.length > 500) {
      return new Response(
        JSON.stringify({ error: 'Title must be less than 500 characters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (content.length > 100000) {
      return new Response(
        JSON.stringify({ error: 'Content must be less than 100000 characters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Prepare blog post data with sanitized inputs
    const excerpt = typeof payload.excerpt === 'string' && payload.excerpt.trim() 
      ? payload.excerpt.trim().substring(0, 500) 
      : content.substring(0, 150) + '...';

    const blogPost = {
      title: title.substring(0, 500),
      content: content,
      excerpt: excerpt,
      author_id: userId || (typeof payload.author_id === 'string' ? payload.author_id : null),
      published: payload.published === true ? true : false,
    };

    console.log('Creating blog post for authenticated user');

    // Insert blog post into database
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([blogPost])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error.code);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to create blog post'
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Blog post created successfully');

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Blog post created successfully',
        data: { id: data.id, title: data.title }
      }),
      {
        status: 201,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error processing webhook');
    return new Response(
      JSON.stringify({ 
        error: 'Server error processing request'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});