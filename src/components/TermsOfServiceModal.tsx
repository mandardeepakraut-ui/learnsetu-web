import React from 'react';
import { X, FileCheck, CheckCircle2, Award, DollarSign } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

interface TermsOfServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsOfServiceModal: React.FC<TermsOfServiceModalProps> = ({ isOpen, onClose }) => {
  const { settings } = useSettings();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-white rounded-3xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0067FF] border border-blue-200 flex items-center justify-center font-bold">
              <FileCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 font-display">Terms of Service</h3>
              <p className="text-[11px] font-mono text-slate-500">LearnSetu Edutech LLP • Master Program Terms</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Terms Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-600 leading-relaxed font-medium">
          
          <section className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
              <Award className="w-4 h-4 text-[#0067FF]" />
              <span>1. Program Scope & Mentorship</span>
            </h4>
            <p>
              The Master Program in Data Science & AI is a 24-Week (6 Month) career transformation program. All live weekend sessions, recordings, source code repositories, and 1:1 mentorship slots are delivered by active industry Data Scientists.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#0067FF]" />
              <span>2. Total Program Investment & EMI Terms</span>
            </h4>
            <p>
              The complete program fee is <strong>{settings.course_fee}</strong>. We provide 12-Month No-Cost EMI breakdown options starting at <strong>{settings.emi_monthly}</strong> with zero hidden charges or interest.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>3. Placement Assistance Guarantee Criteria</span>
            </h4>
            <p>To qualify for 100% placement support and dedicated job referral drives, enrolled students must fulfill the following criteria:</p>
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1.5 font-medium text-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span>Maintain a minimum 60% score across all module assessments & quizzes.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span>Complete 100% of assigned portfolio projects and mock technical interviews.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span>Maintain at least 80% attendance in live weekend interactive sessions.</span>
              </div>
            </div>
          </section>

          <section className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900 font-display">4. Intellectual Property Rights</h4>
            <p>
              All curriculum modules, code datasets, lecture recordings, and capstone project roadmaps are the exclusive intellectual property of LearnSetu Edutech LLP. Unauthorized sharing or re-selling of course materials is strictly prohibited.
            </p>
          </section>

        </div>

        {/* Footer Close Button */}
        <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#0067FF] hover:bg-[#0052CC] text-white font-bold text-xs transition-all shadow-md shadow-[#0067FF]/20"
          >
            I Accept Terms
          </button>
        </div>

      </div>
    </div>
  );
};
