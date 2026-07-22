import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Users, Award, Clock, BookOpen, Check, Layers } from 'lucide-react';

interface HeroProps {
  onOpenBrochure: () => void;
  onSelectCourse: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBrochure, onSelectCourse }) => {
  const whatsappEnrollUrl = "https://wa.me/918591928362?text=Hi%20LearnSetu%20Team%2C%20I%20want%20to%20enroll%20in%20the%20Master%20Program%20in%20Data%20Science%20%26%20AI%20(%E2%82%B914%2C999%20Fee%20%2F%2012-Month%20EMI).%20Please%20guide%20me%20with%20the%20registration%20and%20batch%20details.";

  return (
    <section className="relative pt-12 pb-20 overflow-hidden bg-[#FAFAFC] bg-grid-pattern border-b border-slate-200/60">
      {/* Radial Soft Lights */}
      <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-[#0067FF]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#4F46E5]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Asymmetric Typography & Action CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            
            {/* Live Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-mono text-[#0067FF] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#0067FF]" />
              <span>LIVE BATCH ENROLLING • 24 WEEKS ROADMAP</span>
            </div>

            {/* Headline with 100% Mentored matched in exact display font */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Real Experts.{' '}
              <span className="text-[#0067FF] underline decoration-[#0067FF]/30 underline-offset-8">
                100% Mentored.
              </span>{' '}
              Real Skills. Real Results.
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-normal">
              Learn directly from Data Scientists and AI Engineers. Master job-ready skills with 1:1 mentorship and live industry projects.
            </p>

            {/* Key Value Badges */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-xl">
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-2.5 hover:border-[#0067FF] transition-all cursor-default">
                <ShieldCheck className="w-4 h-4 text-[#0067FF] shrink-0" />
                <span className="text-xs font-bold text-slate-800">100% Placement</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-2.5 hover:border-[#0067FF] transition-all cursor-default">
                <Clock className="w-4 h-4 text-[#4F46E5] shrink-0" />
                <span className="text-xs font-bold text-slate-800">24-Wk Roadmap</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-2.5 hover:border-[#0067FF] transition-all cursor-default">
                <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-bold text-slate-800">Live Projects</span>
              </div>
            </div>

            {/* Price Box & Action CTAs */}
            <div className="w-full max-w-xl p-6 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="text-3xl font-extrabold font-mono text-slate-900">₹14,999</span>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                    Full Fee
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">12-Month No Cost EMI Options (₹1,250/mo)</p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={whatsappEnrollUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial px-6 py-3.5 rounded-xl bg-[#0067FF] hover:bg-[#0052CC] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#0067FF]/25 active:scale-95 hover:shadow-xl hover:shadow-[#0067FF]/35"
                >
                  <span>Enroll Now</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <button
                  onClick={onOpenBrochure}
                  className="px-4 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200 transition-all active:scale-95"
                >
                  Brochure
                </button>
              </div>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-6 pt-1 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#0067FF]" />
                <span><strong className="text-slate-900 font-bold">500+</strong> Learners Onboarded</span>
              </div>
            </div>

          </div>

          {/* Right Column: Clean, Premium Showcase Card */}
          <div className="lg:col-span-5 w-full">
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-2xl shadow-slate-200/80 space-y-6 relative overflow-hidden">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#0067FF]/10 text-[#0067FF] flex items-center justify-center font-bold">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base">Master Program</h3>
                    <p className="text-[11px] font-mono text-slate-500 font-bold">DATA SCIENCE & AI</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-mono font-bold border border-emerald-200">
                  100% GUARANTEE
                </span>
              </div>

              {/* Course Highlights Grid */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-[#FAFAFC] border border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-[#0067FF] text-white font-mono font-bold text-xs flex items-center justify-center">01</span>
                    <span className="text-xs font-bold text-slate-800">Python & Data Analytics</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#0067FF] font-bold">6 WEEKS</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAFAFC] border border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-[#0067FF] text-white font-mono font-bold text-xs flex items-center justify-center">02</span>
                    <span className="text-xs font-bold text-slate-800">Machine Learning Models</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#0067FF] font-bold">8 WEEKS</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAFAFC] border border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-[#0067FF] text-white font-mono font-bold text-xs flex items-center justify-center">03</span>
                    <span className="text-xs font-bold text-slate-800">SQL & Relational Databases</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#0067FF] font-bold">5 WEEKS</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAFAFC] border border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-[#0067FF] text-white font-mono font-bold text-xs flex items-center justify-center">04</span>
                    <span className="text-xs font-bold text-slate-800">Power BI & Executive Dashboards</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#0067FF] font-bold">5 WEEKS</span>
                </div>
              </div>

              {/* Bottom Summary Callout */}
              <div className="p-4 rounded-2xl bg-[#0067FF]/5 border border-[#0067FF]/20 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">Total Course Duration</div>
                  <div className="text-[11px] text-slate-500 font-medium">24-Week Live Hands-on Mentorship</div>
                </div>
                <a
                  href={whatsappEnrollUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#0067FF] hover:bg-[#0052CC] text-white text-xs font-bold transition-all shadow-md shadow-[#0067FF]/20 flex items-center gap-1.5"
                >
                  <span>Enroll</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
