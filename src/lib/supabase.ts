import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://cyvlwtiimhcbootszrio.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5dmx3dGlpbWhjYm9vdHN6cmlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ3NDU2NDgsImV4cCI6MjEwMDMyMTY0OH0.oN4d1zbROrGfouvyMod9Y4ScLZAJFzqDxTtpoDC2Tbg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface SiteSettings {
  id?: string;
  course_fee: string;
  emi_monthly: string;
  whatsapp_number: string;
  support_email: string;
  founder_name: string;
  founder_title: string;
  founder_quote: string;
  batch_status: string;
  batch_name?: string;
  batch_start_date?: string;
  seats_remaining?: string;
  countdown_enabled?: boolean;
  countdown_target?: string;
  announcement_active?: boolean;
  announcement_text?: string;
  announcement_button_text?: string;
  announcement_button_url?: string;
  announcement_theme?: string;
  brochure_pdf_url?: string;
  custom_faqs?: string;
  custom_testimonials?: string;
  admin_passcode?: string;
  custom_hiring_partners?: string;
  popup_active?: boolean;
  popup_title?: string;
  popup_badge?: string;
  popup_description?: string;
  popup_button_text?: string;
  popup_button_url?: string;
  updated_at?: string;
}

export interface BrochureLead {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  program: string;
  created_at?: string;
}

export interface SiteVisit {
  id?: string;
  visitor_id: string;
  session_id: string;
  page_path: string;
  referrer?: string;
  user_agent?: string;
  device_type?: string;
  location_info?: string;
  duration_seconds?: number;
  created_at?: string;
  updated_at?: string;
}

