-- Add author_name column to blog_posts table
ALTER TABLE public.blog_posts 
ADD COLUMN author_name TEXT DEFAULT 'Julisha Solutions';

-- Update existing posts to have the default author
UPDATE public.blog_posts 
SET author_name = 'Julisha Solutions' 
WHERE author_name IS NULL;