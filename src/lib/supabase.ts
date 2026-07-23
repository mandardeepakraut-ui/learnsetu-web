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
