-- 1. Create Site Settings Table
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_fee TEXT DEFAULT '₹14,999',
  emi_monthly TEXT DEFAULT '₹1,250/mo',
  whatsapp_number TEXT DEFAULT '918591928362',
  support_email TEXT DEFAULT 'mandarra71@gmail.com',
  founder_name TEXT DEFAULT 'Sagar Parmar',
  founder_title TEXT DEFAULT 'Founder & CEO',
  founder_quote TEXT DEFAULT 'Our mission is simple: Bridging you to your next tech job.',
  batch_status TEXT DEFAULT 'Live Weekend Sessions Enrolling',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Insert Default Row
INSERT INTO public.site_settings (
  course_fee, emi_monthly, whatsapp_number, support_email, founder_name, founder_title, founder_quote, batch_status
) VALUES (
  '₹14,999', '₹1,250/mo', '918591928362', 'mandarra71@gmail.com', 'Sagar Parmar', 'Founder & CEO', 'Our mission is simple: Bridging you to your next tech job.', 'Live Weekend Sessions Enrolling'
) ON CONFLICT DO NOTHING;

-- 2. Create Brochure Leads Table
CREATE TABLE IF NOT EXISTS public.brochure_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  program TEXT DEFAULT 'Master Program in Data Science & AI',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable Row Level Security (RLS) & Public Access Policies
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brochure_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public Update Settings" ON public.site_settings FOR ALL USING (true);

CREATE POLICY "Public Insert Leads" ON public.brochure_leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Read Leads" ON public.brochure_leads FOR SELECT USING (true);
