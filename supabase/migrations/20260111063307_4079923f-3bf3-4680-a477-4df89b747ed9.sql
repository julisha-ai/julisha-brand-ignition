-- Drop overly permissive public SELECT policies on newsletter_subscribers
DROP POLICY IF EXISTS "Newsletter subscribers management" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Public can view newsletter status" ON public.newsletter_subscribers;

-- Fix the update_updated_at_column function with proper search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql
SET search_path = public;