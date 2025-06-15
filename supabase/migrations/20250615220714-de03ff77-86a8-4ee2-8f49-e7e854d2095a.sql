-- Create a table for contact form submissions
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  service TEXT,
  budget TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users (admins) to view all submissions
CREATE POLICY "Authenticated users can view all contact submissions" 
ON public.contact_submissions 
FOR SELECT 
USING (auth.role() = 'authenticated');

-- Create policy to allow anyone to create submissions (public contact form)
CREATE POLICY "Anyone can create contact submissions" 
ON public.contact_submissions 
FOR INSERT 
WITH CHECK (true);

-- Create policy for authenticated users to update submissions
CREATE POLICY "Authenticated users can update contact submissions" 
ON public.contact_submissions 
FOR UPDATE 
USING (auth.role() = 'authenticated');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_contact_submissions_updated_at
BEFORE UPDATE ON public.contact_submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better performance
CREATE INDEX idx_contact_submissions_status ON public.contact_submissions(status);
CREATE INDEX idx_contact_submissions_created_at ON public.contact_submissions(created_at DESC);