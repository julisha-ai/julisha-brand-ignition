
-- First, let's ensure we have all necessary RLS policies for blog_posts table
-- Drop any potentially conflicting policies first
DROP POLICY IF EXISTS "Allow authenticated users to read all posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Allow authenticated users to insert posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Allow authenticated users to update their own posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Allow authenticated users to delete their own posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Public read access for published posts" ON public.blog_posts;

-- Create comprehensive RLS policies for blog_posts
-- Policy for public to read published posts
CREATE POLICY "Public can read published posts" 
ON public.blog_posts 
FOR SELECT 
TO public
USING (published = true);

-- Policy for authenticated users to read all posts (including drafts)
CREATE POLICY "Authenticated users can read all posts" 
ON public.blog_posts 
FOR SELECT 
TO authenticated 
USING (true);

-- Policy for authenticated users to create posts
CREATE POLICY "Authenticated users can create posts" 
ON public.blog_posts 
FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = author_id);

-- Policy for authenticated users to update their own posts
CREATE POLICY "Authenticated users can update their own posts" 
ON public.blog_posts 
FOR UPDATE 
TO authenticated 
USING (auth.uid() = author_id)
WITH CHECK (auth.uid() = author_id);

-- Policy for authenticated users to delete their own posts
CREATE POLICY "Authenticated users can delete their own posts" 
ON public.blog_posts 
FOR DELETE 
TO authenticated 
USING (auth.uid() = author_id);
