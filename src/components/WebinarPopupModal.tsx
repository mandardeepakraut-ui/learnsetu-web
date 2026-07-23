import React, { useState, useEffect } from 'react';
import { Sparkles, X, Calendar, ArrowRight, Video } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export const WebinarPopupModal: React.FC = () => {
  const { settings } = useSettings();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!settings.popup_active) return;
    const dismissed = sessionStorage.getItem('ls_popup_dismissed');
    if (dismissed) return;

    const timer = setTimeout(() => setIsOpen(true), 1500);
    return () => clearTimeout(timer);
  }, [settings.popup_active]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('ls_popup_dismissed', 'true');
  };

  if (!settings.popup_active || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden space-y-6 p-8">
        
        {/* Top Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
          title="Close Popup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Popup Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0067FF]/10 text-[#0067FF] text-xs font-mono font-bold">
          <Video className="w-4 h-4" />
          <span>{settings.popup_badge || 'SPECIAL LIVE EVENT'}</span>
        </div>

        {/* Modal Header & Title */}
        <div className="space-y-2">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight font-display">
            {settings.popup_title || '⚡ Free Live Masterclass: Build AI Apps'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
            {settings.popup_description || 'Join our expert mentors live to learn how to build LLM applications and accelerate your Data Science career.'}
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="p-4 rounded-2xl bg-[#FAFAFC] border border-slate-200/80 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <Sparkles className="w-4 h-4 text-[#0067FF]" />
            <span>100% Free Entry • Live Q&A • Certificate of Attendance</span>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <a
            href={settings.popup_button_url || 'https://wa.me/918591928362'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClose}
            className="flex-1 py-3.5 px-6 rounded-xl bg-[#0067FF] hover:bg-[#0052CC] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#0067FF]/25 active:scale-95"
          >
            <span>{settings.popup_button_text || 'Reserve Free Spot'}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <button
            onClick={handleClose}
            className="py-3.5 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 transition-all"
          >
            Remind Me Later
          </button>
        </div>

      </div>
    </div>
  );
};
