import React, { useState } from 'react';
import { Award, CheckCircle2 } from 'lucide-react';
import { LearnSetuLogo } from './LearnSetuLogo';

export const CertificatePreview3D: React.FC = () => {
  const [studentName, setStudentName] = useState('Rahul Sharma');

  return (
    <section className="py-20 bg-[#FAFAFC] border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0067FF]/10 text-[#0067FF] text-xs font-mono">
              <Award className="w-3.5 h-3.5" />
              <span>VERIFIED CERTIFICATION</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Industry-Recognized AI & Data Science Certificate
            </h2>
            
            <p className="text-sm text-slate-600 leading-relaxed">
              Earn a shareable, verified certificate upon completing the 24-week Master Program and real-world portfolio projects. Share directly on LinkedIn to showcase your verified credentials to hiring managers.
            </p>

            {/* Name Input Box for Live Preview */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-sm">
              <label className="block text-xs font-bold text-slate-900">
                Type Your Name for Live Certificate Preview:
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter your name..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAFC] border border-slate-200 text-slate-900 font-bold text-sm focus:outline-none focus:border-[#0067FF]"
              />
            </div>
          </div>

          {/* Right 3D Perspective Certificate Preview */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-12 rounded-3xl bg-white border-2 border-slate-200 shadow-2xl shadow-slate-200/80 space-y-8 relative overflow-hidden transform lg:rotate-1 hover:rotate-0 transition-transform duration-500">
              
              {/* Decorative Certificate Watermark */}
              <div className="absolute top-4 right-4 opacity-10 pointer-events-none">
                <Award className="w-48 h-48 text-[#0067FF]" />
              </div>

              {/* Certificate Header with Official Interactive Logo */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                <div>
                  <LearnSetuLogo showTagline={true} size="sm" />
                  <p className="text-[10px] font-mono text-slate-500 mt-1">LLP REGISTERED ACADEMY</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-mono font-bold flex items-center gap-1.5 border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>VERIFIED ID: LS-2026-DS</span>
                </div>
              </div>

              {/* Certificate Body */}
              <div className="text-center py-4 space-y-3">
                <p className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">CERTIFICATE OF MASTERY</p>
                <p className="text-xs text-slate-500">THIS IS PROUDLY PRESENTED TO</p>
                <h4 className="text-3xl sm:text-4xl font-extrabold text-[#0067FF] font-display underline decoration-2 underline-offset-8">
                  {studentName || 'Your Name'}
                </h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto pt-2 font-medium">
                  For successfully completing the 24-Week Master Program in Data Science, Machine Learning, Advanced SQL, and Power BI Analytics.
                </p>
              </div>

              {/* Certificate Signatures */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-mono font-bold text-slate-900">Lead Data Scientist</div>
                  <div className="text-[10px] text-slate-500">LearnSetu Academy Board</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-slate-900">24-Week Master Track</div>
                  <div className="text-[10px] text-emerald-600 font-bold">100% Placement Verified</div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
