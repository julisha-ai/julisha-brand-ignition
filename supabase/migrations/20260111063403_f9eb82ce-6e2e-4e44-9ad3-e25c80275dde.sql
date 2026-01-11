-- Fix contact_submissions policies to require authentication for admin operations
DROP POLICY IF EXISTS "Admin can delete contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admin can update contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admin can view contact submissions" ON public.contact_submissions;

-- Create proper authenticated policies for contact_submissions
CREATE POLICY "Authenticated users can view contact submissions" 
ON public.contact_submissions 
FOR SELECT 
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update contact submissions" 
ON public.contact_submissions 
FOR UPDATE 
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete contact submissions" 
ON public.contact_submissions 
FOR DELETE 
USING (auth.role() = 'authenticated');

-- Fix newsletter_subscribers policies to require authentication for admin operations
DROP POLICY IF EXISTS "Admin can delete newsletter subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Admin can update newsletter subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Admin can view all newsletter subscribers" ON public.newsletter_subscribers;

-- Create proper authenticated policies for newsletter_subscribers
CREATE POLICY "Authenticated users can view newsletter subscribers" 
ON public.newsletter_subscribers 
FOR SELECT 
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update newsletter subscribers" 
ON public.newsletter_subscribers 
FOR UPDATE 
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete newsletter subscribers" 
ON public.newsletter_subscribers 
FOR DELETE 
USING (auth.role() = 'authenticated');