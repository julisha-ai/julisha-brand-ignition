
-- Create a table for leads/prospects who use the recommendation assistant
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  industry TEXT,
  business_size TEXT,
  current_challenges TEXT,
  goals TEXT,
  budget_range TEXT,
  timeline TEXT,
  additional_info TEXT,
  recommendations TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to create leads (public recommendation form)
CREATE POLICY "Anyone can create leads" 
ON public.leads 
FOR INSERT 
WITH CHECK (true);

-- Create policy for authenticated users (admins) to view all leads
CREATE POLICY "Authenticated users can view all leads" 
ON public.leads 
FOR SELECT 
USING (auth.role() = 'authenticated');

-- Create policy for authenticated users to update leads
CREATE POLICY "Authenticated users can update leads" 
ON public.leads 
FOR UPDATE 
USING (auth.role() = 'authenticated');

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_leads_updated_at
BEFORE UPDATE ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_leads_email ON public.leads(email);
CREATE INDEX idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX idx_leads_industry ON public.leads(industry);
