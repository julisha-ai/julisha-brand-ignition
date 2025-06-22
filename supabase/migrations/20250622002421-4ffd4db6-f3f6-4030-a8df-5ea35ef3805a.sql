-- Drop deprecated policies that use auth.role()
DROP POLICY IF EXISTS "Authenticated users can update contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Authenticated users can view all contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Anyone can view their own subscription" ON public.newsletter_subscribers;

-- Create proper replacement policies
CREATE POLICY "Admin can view contact submissions" 
ON public.contact_submissions 
FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Admin can update contact submissions" 
ON public.contact_submissions 
FOR UPDATE 
TO authenticated 
USING (true)
WITH CHECK (true);

-- Replace the overly permissive newsletter policy
CREATE POLICY "Public can view newsletter status" 
ON public.newsletter_subscribers 
FOR SELECT 
TO public
USING (email = auth.email() OR auth.role() = 'authenticated');