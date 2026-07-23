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
  batch_status: 'Live Weekend Sessions Enrolling'
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

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .limit(1)
        .single();

      if (data && !error) {
        setSettings(data);
      }
    } catch (err) {
      console.log('Using default local settings fallback');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('public:site_settings')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'site_settings' }, (payload) => {
        if (payload.new) {
          setSettings((prev) => ({ ...prev, ...(payload.new as SiteSettings) }));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const updateSettings = async (newSettings: Partial<SiteSettings>): Promise<boolean> => {
    const updated = { ...settings, ...newSettings, updated_at: new Date().toISOString() };
    setSettings(updated);

    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert(updated);

      if (error) {
        console.error('Database update error:', error);
        return false;
      }
      return true;
    } catch (err) {
      console.error('Update failed:', err);
      return false;
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
