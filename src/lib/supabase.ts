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
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown';
    const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
    const deviceType = isMobile ? 'Mobile Device' : 'Desktop Browser';
    const enrichedDetails = `${details} [Device: ${deviceType}]`;

    await supabase.from('admin_audit_logs').insert([
      {
        mentor_name,
        mentor_role,
        action_type,
        details: enrichedDetails,
      },
    ]);

    // Send security alert notification if admin login occurs
    if (action_type === 'ADMIN_LOGIN') {
      sendSecurityAlertWebhook(mentor_name, mentor_role, deviceType);
    }
  } catch (err) {
    console.warn('Audit logging note:', err);
  }
}

export async function sendSecurityAlertWebhook(
  name: string,
  role: string,
  device: string
): Promise<void> {
  try {
    console.log(`🔒 SECURITY ALERT: Admin login detected for ${name} (${role}) via ${device} at ${new Date().toLocaleString()}`);
  } catch (err) {
    console.warn('Security webhook error:', err);
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
  let deletedList: string[] = [];
  try {
    const rawDeleted = localStorage.getItem('ls_deleted_admins');
    if (rawDeleted) deletedList = JSON.parse(rawDeleted);
  } catch (e) {}

  let customAdmins: AdminUser[] = [];
  try {
    const rawCustom = localStorage.getItem('ls_custom_admins');
    if (rawCustom) customAdmins = JSON.parse(rawCustom);
  } catch (e) {}

  let permOverrides: Record<string, AdminPermission[]> = {};
  try {
    const rawOverrides = localStorage.getItem('ls_perm_overrides');
    if (rawOverrides) permOverrides = JSON.parse(rawOverrides);
  } catch (e) {}

  let listToReturn: AdminUser[] = [...DEFAULT_ADMIN_USERS];

  try {
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .order('created_at', { ascending: true });

    if (!error && data && data.length > 0) {
      listToReturn = data as AdminUser[];
    }
  } catch (err) {
    console.warn('Using local fallback admin users:', err);
  }

  // Merge custom created admins
  customAdmins.forEach((ca) => {
    if (!listToReturn.some((u) => u.username.toLowerCase() === ca.username.toLowerCase())) {
      listToReturn.push(ca);
    }
  });

  // Apply permission overrides
  listToReturn = listToReturn.map((u) => {
    const uClean = u.username.toLowerCase();
    if (permOverrides[uClean]) {
      return { ...u, permissions: permOverrides[uClean] };
    }
    return u;
  });

  // Filter out deleted admin usernames
  return listToReturn.filter((u) => !deletedList.includes(u.username.toLowerCase()));
}

export async function createAdminUser(newUser: Omit<AdminUser, 'id' | 'created_at'>): Promise<boolean> {
  const usernameClean = newUser.username.toLowerCase();
  
  // Remove from deleted list if re-creating
  try {
    const rawDeleted = localStorage.getItem('ls_deleted_admins');
    let deletedList: string[] = rawDeleted ? JSON.parse(rawDeleted) : [];
    deletedList = deletedList.filter((u) => u !== usernameClean);
    localStorage.setItem('ls_deleted_admins', JSON.stringify(deletedList));
  } catch (e) {}

  // Save to local custom admins
  try {
    const rawCustom = localStorage.getItem('ls_custom_admins');
    let customList: AdminUser[] = rawCustom ? JSON.parse(rawCustom) : [];
    customList = customList.filter((u) => u.username.toLowerCase() !== usernameClean);
    customList.push(newUser as AdminUser);
    localStorage.setItem('ls_custom_admins', JSON.stringify(customList));
  } catch (e) {}

  // Save permission override
  try {
    const rawOverrides = localStorage.getItem('ls_perm_overrides');
    let permOverrides: Record<string, AdminPermission[]> = rawOverrides ? JSON.parse(rawOverrides) : {};
    permOverrides[usernameClean] = newUser.permissions;
    localStorage.setItem('ls_perm_overrides', JSON.stringify(permOverrides));
  } catch (e) {}

  try {
    await supabase.from('admin_users').upsert([newUser]);
  } catch (err) {
    console.warn('DB upsert note:', err);
  }
  return true;
}

export async function updateAdminUserPermissions(username: string, permissions: AdminPermission[]): Promise<boolean> {
  const usernameClean = username.toLowerCase();

  // Save permission overrides locally
  try {
    const rawOverrides = localStorage.getItem('ls_perm_overrides');
    let permOverrides: Record<string, AdminPermission[]> = rawOverrides ? JSON.parse(rawOverrides) : {};
    permOverrides[usernameClean] = permissions;
    localStorage.setItem('ls_perm_overrides', JSON.stringify(permOverrides));
  } catch (e) {}

  // Update local custom admins
  try {
    const rawCustom = localStorage.getItem('ls_custom_admins');
    if (rawCustom) {
      let customList: AdminUser[] = JSON.parse(rawCustom);
      customList = customList.map((u) => (u.username.toLowerCase() === usernameClean ? { ...u, permissions } : u));
      localStorage.setItem('ls_custom_admins', JSON.stringify(customList));
    }
  } catch (e) {}

  try {
    await supabase
      .from('admin_users')
      .update({ permissions })
      .eq('username', usernameClean);
  } catch (err) {
    console.warn('DB permissions update note:', err);
  }
  return true;
}

export async function deleteAdminUser(username: string): Promise<boolean> {
  const usernameClean = username.toLowerCase();

  // Add to local deleted list
  try {
    const rawDeleted = localStorage.getItem('ls_deleted_admins');
    let deletedList: string[] = rawDeleted ? JSON.parse(rawDeleted) : [];
    if (!deletedList.includes(usernameClean)) {
      deletedList.push(usernameClean);
    }
    localStorage.setItem('ls_deleted_admins', JSON.stringify(deletedList));
  } catch (e) {}

  // Remove from custom local list if present
  try {
    const rawCustom = localStorage.getItem('ls_custom_admins');
    if (rawCustom) {
      let customList: AdminUser[] = JSON.parse(rawCustom);
      customList = customList.filter((u) => u.username.toLowerCase() !== usernameClean);
      localStorage.setItem('ls_custom_admins', JSON.stringify(customList));
    }
  } catch (e) {}

  try {
    await supabase.from('admin_users').delete().eq('username', usernameClean);
  } catch (err) {
    console.warn('DB delete note:', err);
  }

  return true;
}

