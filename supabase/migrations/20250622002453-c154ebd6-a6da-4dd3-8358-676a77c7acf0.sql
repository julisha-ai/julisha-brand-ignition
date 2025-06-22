-- Fix the policy that still uses deprecated auth.role()
DROP POLICY IF EXISTS "Public can view newsletter status" ON public.newsletter_subscribers;

-- Create a proper policy without deprecated functions
CREATE POLICY "Newsletter subscribers management" 
ON public.newsletter_subscribers 
FOR SELECT 
USING (true);