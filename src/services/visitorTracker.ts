import { supabase, SiteVisit } from '../lib/supabase';

// Helper to get or generate persistent Visitor ID
export function getVisitorId(): string {
  let visitorId = localStorage.getItem('ls_visitor_id');
  if (!visitorId) {
    visitorId = 'v_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now();
    localStorage.setItem('ls_visitor_id', visitorId);
  }
  return visitorId;
}

// Helper to get or generate current Session ID
export function getSessionId(): string {
  let sessionId = sessionStorage.getItem('ls_session_id');
  if (!sessionId) {
    sessionId = 's_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now();
    sessionStorage.setItem('ls_session_id', sessionId);
  }
  return sessionId;
}

// Helper to detect Device Type
export function getDeviceType(): string {
  const ua = navigator.userAgent;
  if (/mobile/i.test(ua)) return 'Mobile';
  if (/ipad|tablet/i.test(ua)) return 'Tablet';
  return 'Desktop';
}

// Helper to infer approximate user timezone / region
export function getUserLocationInfo(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz) return tz;
  } catch (e) {
    // fallback
  }
  return 'India (IST)';
}

let activeRecordId: string | null = null;
let startTime: number = Date.now();

// Log visit to Supabase database
export async function logSiteVisit(pagePath: string = window.location.pathname + window.location.hash): Promise<string | null> {
  try {
    const visitor_id = getVisitorId();
    const session_id = getSessionId();
    const referrer = document.referrer ? new URL(document.referrer).hostname : 'Direct';
    const device_type = getDeviceType();
    const location_info = getUserLocationInfo();
    const user_agent = navigator.userAgent;

    const payload: Omit<SiteVisit, 'id'> = {
      visitor_id,
      session_id,
      page_path: pagePath || '/',
      referrer,
      user_agent,
      device_type,
      location_info,
      duration_seconds: 0,
    };

    const { data, error } = await supabase
      .from('site_visits')
      .insert([payload])
      .select('id')
      .single();

    if (error) {
      console.warn('Note: site_visits insert note:', error.message);
      return null;
    }

    if (data?.id) {
      activeRecordId = data.id;
      startTime = Date.now();
      return data.id;
    }
  } catch (err) {
    console.warn('Visit tracker error:', err);
  }
  return null;
}

// Update visit duration
export async function updateVisitDuration(): Promise<void> {
  if (!activeRecordId) return;
  const duration_seconds = Math.floor((Date.now() - startTime) / 1000);
  try {
    await supabase
      .from('site_visits')
      .update({
        duration_seconds,
        updated_at: new Date().toISOString(),
      })
      .eq('id', activeRecordId);
  } catch (err) {
    // Ignore heartbeat errors
  }
}
