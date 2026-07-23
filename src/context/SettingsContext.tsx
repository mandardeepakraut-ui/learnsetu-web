import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, SiteSettings } from '../lib/supabase';

const defaultSettings: SiteSettings = {
  course_fee: '₹14,999',
  emi_monthly: '₹1,250/mo',
  whatsapp_number: '918591928362',
  support_email: 'mandarra71@gmail.com',
  founder_name: 'Sagar Parmar',
  founder_title: 'Founder & CEO',
  founder_quote: 'Our mission is simple: Bridging you to your next tech job.',
  batch_status: 'Live Weekend Sessions Enrolling',
  batch_name: 'BATCH #2026-A',
  batch_start_date: 'Weekend Batch • Starting Next Saturday',
  seats_remaining: 'Only 4 Seats Left',
  countdown_enabled: true,
  countdown_target: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
  announcement_active: true,
  announcement_text: '⚡ Early Bird Offer: Flat ₹2,000 Off on Batch #2026-A! Use Code: LEARNSETU2000',
  announcement_button_text: 'Claim Offer',
  announcement_button_url: '#master-course',
  announcement_theme: 'blue',
  brochure_pdf_url: '/LearnSetu-Data-science-and-ai-Brochure.pdf',
  custom_faqs: JSON.stringify([
    {
      q: "What is the total fee for the Master Program in Data Science & AI?",
      a: "The complete program fee is ₹14,999 with no hidden charges. We also offer 12-Month No-Cost EMI options starting at just ₹1,250/month."
    },
    {
      q: "What are the criteria for the 100% Placement Assistance Guarantee?",
      a: "To qualify for guaranteed placement support, students must achieve a minimum 60% score in module assessments, complete 100% of assigned portfolio projects and mock interviews, and maintain at least 80% attendance in live sessions."
    },
    {
      q: "Can non-IT or non-engineering students enroll in this program?",
      a: "Yes! The program starts with foundational Python programming and statistics from scratch before advancing to Machine Learning and SQL. Over 40% of our successful alumni come from non-IT backgrounds."
    },
    {
      q: "Are classes live or pre-recorded?",
      a: "All core sessions are held live on weekends by active industry Data Scientists. All sessions are recorded and uploaded to your student portal for lifelong review."
    },
    {
      q: "How does 1:1 mentorship work?",
      a: "You get dedicated one-on-one video doubt clearing slots with mentors to resolve project blockers, review code, and conduct 1:1 resume & mock interview reviews."
    }
  ]),
  custom_testimonials: JSON.stringify([
    {
      name: "Riya Sharma",
      role: "Data Analyst @ TCS",
      hike: "+65% Hike",
      review: "LearnSetu transformed my career. The Python and Power BI modules were so hands-on that I cleared my TCS technical interview in the first attempt.",
      stars: 5,
    },
    {
      name: "Rahul Jain",
      role: "Associate AI Engineer @ Infosys",
      hike: "+70% Hike",
      review: "The 1:1 mentorship and mock interviews gave me complete confidence. Building real Machine Learning models on actual datasets made all the difference.",
      stars: 5,
    },
    {
      name: "Mehul Desai",
      role: "Data Scientist @ StartTech",
      hike: "+85% Hike",
      review: "Coming from a non-IT background, I was skeptical. But the step-by-step SQL and ML roadmap helped me land my dream Data Science job.",
      stars: 5,
    }
  ])
};

interface SettingsContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<boolean>;
  loading: boolean;
}

const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  updateSettings: async () => false,
  loading: false
});

// Helper to unpack nested config inside batch_status
const parseRowData = (row: any): SiteSettings => {
  let extra: any = {};
  let cleanBatchStatus = row.batch_status || defaultSettings.batch_status;

  if (row.batch_status && typeof row.batch_status === 'string' && row.batch_status.trim().startsWith('{')) {
    try {
      const parsed = JSON.parse(row.batch_status);
      if (parsed && typeof parsed === 'object') {
        extra = parsed;
        if (parsed.status) {
          cleanBatchStatus = parsed.status;
        }
      }
    } catch (e) {}
  }

  return {
    ...defaultSettings,
    ...extra,
    ...row,
    batch_status: cleanBatchStatus
  };
};

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(() => {
    const local = localStorage.getItem('ls_site_settings');
    if (local) {
      try { return { ...defaultSettings, ...JSON.parse(local) }; } catch (e) {}
    }
    return defaultSettings;
  });
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(1);

      if (data && data.length > 0 && !error) {
        const parsed = parseRowData(data[0]);
        setSettings(parsed);
        localStorage.setItem('ls_site_settings', JSON.stringify(parsed));
      }
    } catch (err) {
      console.log('Using local settings fallback:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();

    // 1. Supabase Postgres Real-Time Channel
    const channel = supabase
      .channel('public:site_settings')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'site_settings' }, (payload) => {
        if (payload.new) {
          const parsed = parseRowData(payload.new);
          setSettings(parsed);
          localStorage.setItem('ls_site_settings', JSON.stringify(parsed));
        }
      })
      .subscribe();

    // 2. Multi-Tab Local Storage Cross-Sync Event Listener
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'ls_site_settings' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setSettings((prev) => ({ ...prev, ...parsed }));
        } catch (err) {}
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      supabase.removeChannel(channel);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const updateSettings = async (newSettings: Partial<SiteSettings>): Promise<boolean> => {
    // 1. Fetch latest DB state to perform a conflict-free merge
    let latestBase = { ...settings };
    try {
      const { data } = await supabase
        .from('site_settings')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(1);

      if (data && data.length > 0) {
        const parsed = parseRowData(data[0]);
        latestBase = { ...latestBase, ...parsed };
      }
    } catch (e) {}

    // 2. Perform deep merge of newSettings over latestBase
    const updated = { ...latestBase, ...newSettings, updated_at: new Date().toISOString() };
    setSettings(updated);
    localStorage.setItem('ls_site_settings', JSON.stringify(updated));

    try {
      const dbPayload: Record<string, any> = {
        course_fee: updated.course_fee,
        emi_monthly: updated.emi_monthly,
        whatsapp_number: updated.whatsapp_number,
        support_email: updated.support_email,
        founder_name: updated.founder_name,
        founder_title: updated.founder_title,
        founder_quote: updated.founder_quote,
        batch_status: JSON.stringify({
          status: updated.batch_status,
          batch_name: updated.batch_name,
          batch_start_date: updated.batch_start_date,
          seats_remaining: updated.seats_remaining,
          announcement_active: updated.announcement_active,
          announcement_text: updated.announcement_text,
          announcement_button_text: updated.announcement_button_text,
          announcement_button_url: updated.announcement_button_url,
          announcement_theme: updated.announcement_theme,
          custom_faqs: updated.custom_faqs,
          custom_testimonials: updated.custom_testimonials
        }),
        updated_at: updated.updated_at
      };

      if (latestBase.id) {
        dbPayload.id = latestBase.id;
      }

      const { data, error } = await supabase
        .from('site_settings')
        .upsert(dbPayload)
        .select();

      if (error) {
        console.error('Database update error:', error);
        return false;
      } else if (data && data.length > 0) {
        const parsed = parseRowData(data[0]);
        const finalMerged = { ...updated, ...parsed };
        setSettings(finalMerged);
        localStorage.setItem('ls_site_settings', JSON.stringify(finalMerged));
      }
      return true;
    } catch (err) {
      console.error('Update error:', err);
      return true;
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
