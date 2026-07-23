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

export interface MentorProfile {
  id: string;
  name: string;
  role: string;
  passcode: string;
  avatar: string;
}

export const MENTOR_PROFILES: MentorProfile[] = [
  { id: 'mandar', name: 'Mandar Raut', role: 'Founder & Lead Data Science Mentor', passcode: 'mandar123', avatar: '👨‍💻' },
  { id: 'sagar', name: 'Sagar Parmar', role: 'Founder & CEO', passcode: 'sagar123', avatar: '🚀' },
  { id: 'manthan', name: 'Manthan Saindane', role: 'Co-Founder & AI Mentor', passcode: 'manthan123', avatar: '🧠' },
];

export interface AdminAuditLog {
  id?: string;
  mentor_name: string;
  mentor_role: string;
  action_type: string;
  details: string;
  created_at?: string;
}

export async function logAuditActivity(
  mentor_name: string,
  mentor_role: string,
  action_type: string,
  details: string
): Promise<void> {
  try {
    await supabase.from('admin_audit_logs').insert([
      {
        mentor_name,
        mentor_role,
        action_type,
        details,
      },
    ]);
  } catch (err) {
    console.warn('Audit logging note:', err);
  }
}

export type AdminPermission = 'pricing' | 'leads' | 'traffic' | 'content' | 'admins';

export interface AdminUser {
  id?: string;
  username: string;
  name: string;
  role: string;
  passcode: string;
  permissions: AdminPermission[];
  is_active?: boolean;
  created_at?: string;
}

export const ALL_PERMISSIONS: { key: AdminPermission; label: string; description: string }[] = [
  { key: 'pricing', label: 'Pricing & Fee', description: 'Can edit course pricing and EMI options' },
  { key: 'leads', label: 'Brochure Leads', description: 'Can view and export student brochure leads' },
  { key: 'traffic', label: 'Live Traffic Analytics', description: 'Can view real-time online users & website traffic logs' },
  { key: 'content', label: 'Site Content & Announcements', description: 'Can edit top banner, FAQs, testimonials & partners' },
  { key: 'admins', label: 'Manage Admin Accounts', description: 'Can create new admin accounts & update permissions' },
];

export const DEFAULT_ADMIN_USERS: AdminUser[] = [
  {
    username: 'mandar',
    name: 'Mandar Raut',
    role: 'Founder & Lead Data Science Mentor',
    passcode: 'mandar123',
    permissions: ['pricing', 'leads', 'traffic', 'content', 'admins'],
    is_active: true,
  },
  {
    username: 'sagar',
    name: 'Sagar Parmar',
    role: 'Founder & CEO',
    passcode: 'sagar123',
    permissions: ['pricing', 'leads', 'traffic', 'content', 'admins'],
    is_active: true,
  },
  {
    username: 'manthan',
    name: 'Manthan Saindane',
    role: 'Co-Founder & AI Mentor',
    passcode: 'manthan123',
    permissions: ['pricing', 'leads', 'traffic', 'content', 'admins'],
    is_active: true,
  },
];

export async function fetchAdminUsers(): Promise<AdminUser[]> {
  try {
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .order('created_at', { ascending: true });

    if (!error && data && data.length > 0) {
      return data as AdminUser[];
    }
  } catch (err) {
    console.warn('Using local fallback admin users:', err);
  }
  return DEFAULT_ADMIN_USERS;
}

export async function createAdminUser(newUser: Omit<AdminUser, 'id' | 'created_at'>): Promise<boolean> {
  try {
    const { error } = await supabase.from('admin_users').insert([newUser]);
    if (!error) return true;
  } catch (err) {
    console.error('Error creating admin user:', err);
  }
  return false;
}

export async function updateAdminUserPermissions(username: string, permissions: AdminPermission[]): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('admin_users')
      .update({ permissions })
      .eq('username', username);
    if (!error) return true;
  } catch (err) {
    console.error('Error updating permissions:', err);
  }
  return false;
}

export async function deleteAdminUser(username: string): Promise<boolean> {
  try {
    const { error } = await supabase.from('admin_users').delete().eq('username', username);
    if (!error) return true;
  } catch (err) {
    console.error('Error deleting admin:', err);
  }
  return false;
}
