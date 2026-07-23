import React, { useState } from 'react';
import { Download, Sparkles, CheckCircle2, ShieldCheck, Copy, Printer, Award, FileText, ArrowRight, Star, Clock } from 'lucide-react';
import { LearnSetuLogo } from './LearnSetuLogo';
import { useSettings } from '../context/SettingsContext';

interface PersonalizedBrochureViewProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  program?: string;
  onClose?: () => void;
}

export const PersonalizedBrochureView: React.FC<PersonalizedBrochureViewProps> = ({
  firstName,
  lastName,
  email,
  phone,
  program = 'Data Science & AI Master Program',
  onClose,
}) => {
  const { settings } = useSettings();
  const [copiedCode, setCopiedCode] = useState(false);

  const studentFullName = `${firstName} ${lastName}`.trim() || 'Valued Student';
  const promoCode = `${firstName.toUpperCase().replace(/[^A-Z]/g, '') || 'LEARNSETU'}2000`;
  const feeDisplay = settings.course_fee || '₹14,999';

  const handleCopyCode = () => {
    navigator.clipboard.writeText(promoCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-body py-8 px-4 sm:px-6">
      {/* Top Banner Alert Bar */}
      <div className="max-w-4xl mx-auto mb-6 p-4 rounded-2xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-blue-500/20 animate-fadeIn">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-500/20 border border-blue-400/30 text-blue-400">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-blue-300 uppercase tracking-wider">
              PERSONALIZED SCHOLARSHIP CERTIFICATE
            </div>
            <div className="text-sm font-extrabold text-white">
              Prepared Exclusively for <span className="text-amber-300">{studentFullName}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl border border-white/15">
          <Clock className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-mono font-bold text-amber-200">
            Scholarship Code: <code className="text-white bg-amber-500/30 px-1.5 py-0.5 rounded font-mono">{promoCode}</code> (Save ₹2,000)
          </span>
        </div>
      </div>

      {/* Main Printable Document Card */}
      <div id="personalized-brochure-card" className="max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-2xl shadow-slate-900/10 space-y-8 print:shadow-none print:border-none print:p-0">
        
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-slate-200 pb-6">
          <div className="space-y-2">
            <LearnSetuLogo showTagline={true} size="md" />
            <p className="text-xs text-slate-500 font-medium">
              Industry-Led Data Science, AI & MLOps Master Curriculum
            </p>
          </div>

          <div className="text-left sm:text-right bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <div className="text-[11px] font-mono text-slate-400 font-bold uppercase">OFFICIAL SYLLABUS DOSSIER</div>
            <div className="text-sm font-extrabold text-[#0067FF]">{program}</div>
            <div className="text-[11px] text-slate-500 font-mono mt-0.5">Date: {new Date().toLocaleDateString('en-IN')}</div>
          </div>
        </div>

        {/* Exclusive Student Scholarship Box */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 via-indigo-50/50 to-emerald-50 border border-blue-200/80 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600 text-white text-[11px] font-mono font-bold mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                VERIFIED ADMISSION SCHOLARSHIP
              </span>
              <h3 className="text-lg font-extrabold text-slate-900">
                Welcome to LearnSetu, {firstName}!
              </h3>
              <p className="text-xs text-slate-600 font-medium mt-1">
                Your personalized curriculum roadmap and scholarship discount pass have been generated.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-blue-200 shadow-sm text-center min-w-[200px]">
              <div className="text-[10px] font-mono font-bold text-slate-400 uppercase">Effective Special Fee</div>
              <div className="text-2xl font-black text-[#0067FF]">{feeDisplay}</div>
              <div className="text-[10px] font-mono text-emerald-600 font-bold mt-0.5">₹2,000 Early Bird Applied</div>
            </div>
          </div>

          {/* Promo code copy bar */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/90 border border-blue-200">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-bold text-slate-700">Your Exclusive Coupon Code:</span>
              <code className="text-sm font-mono font-black text-[#0067FF] bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                {promoCode}
              </code>
            </div>

            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>
        </div>

        {/* Master Curriculum Modules Overview */}
        <div className="space-y-4">
          <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-2">
            <FileText className="w-5 h-5 text-[#0067FF]" />
            <span>Master Curriculum Overview (4-Month Intensive)</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-mono font-extrabold text-[#0067FF]">MODULE 01</div>
              <div className="text-sm font-bold text-slate-900">Python Foundations & Math for AI</div>
              <p className="text-xs text-slate-500 font-medium">
                Data structures, NumPy, Pandas, Linear Algebra, Descriptive & Inferential Statistics from scratch.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-mono font-extrabold text-[#0067FF]">MODULE 02</div>
              <div className="text-sm font-bold text-slate-900">Machine Learning & Advanced SQL</div>
              <p className="text-xs text-slate-500 font-medium">
                Scikit-Learn models, Regression, Random Forest, XGBoost, SQL joins, aggregations & database queries.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-mono font-extrabold text-[#0067FF]">MODULE 03</div>
              <div className="text-sm font-bold text-slate-900">Generative AI, LLMs & MLOps</div>
              <p className="text-xs text-slate-500 font-medium">
                PyTorch Deep Learning, RAG pipeline building, OpenAI API, LangChain & AWS Cloud Deployment.
              </p>
            </div>
          </div>
        </div>

        {/* Student Guarantee & Mentor Contact Bar */}
        <div className="p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-extrabold text-white">100% Placement Assistance Guarantee</span>
            </div>
            <p className="text-xs text-slate-400 max-w-lg font-medium">
              1:1 Mock Interviews, Resume Rewriting, Portfolio Project Reviews & Direct Hiring Referral Network.
            </p>
          </div>

          <div className="text-right">
            <div className="text-[11px] font-mono text-slate-400 uppercase font-bold">Counseling Hotline</div>
            <a href="https://wa.me/918591928362" target="_blank" rel="noreferrer" className="text-sm font-mono font-extrabold text-emerald-400 hover:underline">
              +91 85919 28362
            </a>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 print:hidden">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF Syllabus</span>
          </button>

          <a
            href={settings.brochure_pdf_url || '/LearnSetu-Data-science-and-ai-Brochure.pdf'}
            download="LearnSetu-Data-science-and-ai-Brochure.pdf"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0067FF] hover:bg-[#0052CC] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#0067FF]/20"
          >
            <Download className="w-4 h-4" />
            <span>Download Full Syllabus PDF</span>
          </a>

          {onClose && (
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all border border-slate-200"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
