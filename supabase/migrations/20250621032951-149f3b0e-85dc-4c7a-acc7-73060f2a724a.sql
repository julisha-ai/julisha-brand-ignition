-- Add missing blog post policies
CREATE POLICY "Public read access for published posts" 
ON public.blog_posts 
FOR SELECT 
TO public
USING (published = true);

-- Add missing contact submission policies  
CREATE POLICY "Admin can delete contact submissions" 
ON public.contact_submissions 
FOR DELETE 
TO authenticated 
USING (true);

-- Add missing newsletter subscriber policies
CREATE POLICY "Admin can view all newsletter subscribers" 
ON public.newsletter_subscribers 
FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Admin can update newsletter subscribers" 
ON public.newsletter_subscribers 
FOR UPDATE 
TO authenticated 
USING (true)
WITH CHECK (true);

CREATE POLICY "Admin can delete newsletter subscribers" 
ON public.newsletter_subscribers 
FOR DELETE 
TO authenticated 
USING (true);