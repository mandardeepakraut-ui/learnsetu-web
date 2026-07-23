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

-- 3. Create Site Visits Table (For Real-Time & Historical Visitor Tracking)
CREATE TABLE IF NOT EXISTS public.site_visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  page_path TEXT DEFAULT '/',
  referrer TEXT,
  user_agent TEXT,
  device_type TEXT DEFAULT 'Desktop',
  location_info TEXT DEFAULT 'India',
  duration_seconds INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS and public policies for site_visits
ALTER TABLE public.site_visits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Insert Visits" ON public.site_visits FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update Visits" ON public.site_visits FOR UPDATE USING (true);
CREATE POLICY "Public Read Visits" ON public.site_visits FOR SELECT USING (true);

-- 4. Create Admin Audit Logs Table (For Multi-Admin Activity Tracking)
CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mentor_name TEXT NOT NULL,
  mentor_role TEXT DEFAULT 'Admin Mentor',
  action_type TEXT NOT NULL,
  details TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS and public access policies for admin_audit_logs
ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Insert Audit Logs" ON public.admin_audit_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Read Audit Logs" ON public.admin_audit_logs FOR SELECT USING (true);

-- 5. Create Admin Users Table (For Multi-Admin Management & Permission Control)
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'Admin Mentor',
  passcode TEXT NOT NULL,
  permissions TEXT[] DEFAULT ARRAY['pricing', 'leads', 'traffic', 'content', 'admins'],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS & public access policies for admin_users
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Select Admins" ON public.admin_users FOR SELECT USING (true);
CREATE POLICY "Public Insert Admins" ON public.admin_users FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update Admins" ON public.admin_users FOR UPDATE USING (true);
CREATE POLICY "Public Delete Admins" ON public.admin_users FOR DELETE USING (true);

-- Seed Default Admin Accounts
INSERT INTO public.admin_users (username, name, role, passcode, permissions) VALUES
  ('mandar', 'Mandar Raut', 'Founder & Lead Mentor', 'mandar123', ARRAY['pricing', 'leads', 'traffic', 'content', 'admins']),
  ('sagar', 'Sagar Parmar', 'Founder & CEO', 'sagar123', ARRAY['pricing', 'leads', 'traffic', 'content', 'admins']),
  ('manthan', 'Manthan Saindane', 'Co-Founder & AI Mentor', 'manthan123', ARRAY['pricing', 'leads', 'traffic', 'content', 'admins'])
ON CONFLICT (username) DO NOTHING;



-- Enable Supabase Realtime publication on site_visits table (optional if listening to DB changes)
-- ALTER PUBLICATION supabase_realtime ADD TABLE public.site_visits;

