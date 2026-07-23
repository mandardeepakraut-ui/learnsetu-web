import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, Users, FileText } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

interface HeroProps {
  onOpenBrochure: () => void;
  onSelectCourse: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBrochure, onSelectCourse }) => {
  const { settings } = useSettings();

  const whatsappEnrollUrl = `https://wa.me/${settings.whatsapp_number}?text=Hi%20LearnSetu%20Team%2C%20I%20want%20to%20enroll%20in%20the%20Master%20Program%20in%20Data%20Science%20%26%20AI%20(${encodeURIComponent(settings.course_fee)}%20Fee%20%2F%2012-Month%20EMI).%20Please%20guide%20me%20with%20the%20registration%20and%20batch%20details.`;

  return (
    <section className="relative pt-12 pb-20 overflow-hidden bg-[#FAFAFC] bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Eyebrow Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0067FF]/10 border border-[#0067FF]/20 text-[#0067FF] text-xs font-mono font-bold tracking-tight shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{settings.batch_status || '24-WEEK MASTER PROGRAM • 1:1 MENTORSHIP'}</span>
          </div>
        </div>

        {/* Hero Title Header */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight font-display leading-[1.15]">
            Master Data Science & AI.{' '}
            <span className="text-[#0067FF] font-display font-extrabold underline decoration-2 underline-offset-8">
              100% Mentored.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Learn Python, Machine Learning, SQL & Power BI directly from industry Data Scientists. Build real-world projects with dedicated 1:1 doubt-clearing sessions.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href={whatsappEnrollUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#0067FF] hover:bg-[#0052CC] text-white font-bold text-sm flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-[#0067FF]/25 active:scale-95"
            >
              <span>Enroll Now</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenBrochure}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
            >
              <FileText className="w-4 h-4 text-[#0067FF]" />
              <span>Download Syllabus PDF</span>
            </button>
          </div>

          {/* Hero Feature Showcase Card */}
          <div className="mt-12 max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/50 space-y-6 text-left">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#0067FF] uppercase">24-WEEK STRUCTURED CURRICULUM</span>
                <h3 className="text-lg font-bold text-slate-900">Master Program in Data Science & AI</h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>100% Placement Guarantee Criteria</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-bold text-slate-800">
              <div className="p-3 rounded-2xl bg-[#FAFAFC] border border-slate-200">
                <span className="block text-[10px] text-slate-400 font-mono font-normal">MODULE 1</span>
                <span>Python & Data Analytics</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#FAFAFC] border border-slate-200">
                <span className="block text-[10px] text-slate-400 font-mono font-normal">MODULE 2</span>
                <span>Machine Learning & AI</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#FAFAFC] border border-slate-200">
                <span className="block text-[10px] text-slate-400 font-mono font-normal">MODULE 3</span>
                <span>Advanced SQL & Databases</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#FAFAFC] border border-slate-200">
                <span className="block text-[10px] text-slate-400 font-mono font-normal">MODULE 4</span>
                <span>Power BI & Dashboards</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-2">
                <div className="text-2xl font-extrabold text-slate-900">{settings.course_fee}</div>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">Full Fee</span>
                <span className="text-slate-400">|</span>
                <span className="text-slate-600 font-bold">12-Month No Cost EMI Options ({settings.emi_monthly})</span>
              </div>
              <div className="flex items-center gap-2 font-bold text-[#0067FF]">
                <Users className="w-4 h-4" />
                <span>500+ Learners Onboarded</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
