import React from 'react';
import { X, ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-white rounded-3xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0067FF] border border-blue-200 flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 font-display">Privacy Policy</h3>
              <p className="text-[11px] font-mono text-slate-500">LearnSetu Edutech LLP • Last Updated: July 2026</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Policy Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-600 leading-relaxed font-medium">
          
          <section className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#0067FF]" />
              <span>1. Information We Collect</span>
            </h4>
            <p>
              When you fill out forms on LearnSetu (such as downloading a syllabus brochure, requesting 1:1 counseling, or enrolling in our Master Program), we collect your name, email address, phone number, and career goals.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#0067FF]" />
              <span>2. How We Use Your Information</span>
            </h4>
            <p>We use your information strictly to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Deliver requested syllabus PDFs and course curriculum materials.</li>
              <li>Provide 1:1 WhatsApp doubt-clearing and career counseling support.</li>
              <li>Notify you regarding upcoming batch schedules, live masterclasses, and EMI options.</li>
              <li>We <strong>NEVER sell, rent, or trade your personal information</strong> to third-party telemarketers.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>3. Data Security & Encryption</span>
            </h4>
            <p>
              All brochure submissions and lead records are encrypted using industry-standard 256-bit SSL encryption and stored safely within our secure Supabase database infrastructure with row-level security (RLS) enabled.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#0067FF]" />
              <span>4. Your Rights & Support Contact</span>
            </h4>
            <p>
              You may request access to, modification of, or complete deletion of your personal contact records at any time by contacting our support team:
            </p>
            <div className="p-4 rounded-2xl bg-[#FAFAFC] border border-slate-200 font-mono text-[11px] space-y-1">
              <div><strong>Entity:</strong> LearnSetu Edutech LLP</div>
              <div><strong>Email:</strong> mandarra71@gmail.com</div>
              <div><strong>WhatsApp Support:</strong> +91 85919 28362</div>
            </div>
          </section>

        </div>

        {/* Footer Close Button */}
        <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#0067FF] hover:bg-[#0052CC] text-white font-bold text-xs transition-all shadow-md shadow-[#0067FF]/20"
          >
            I Understand
          </button>
        </div>

      </div>
    </div>
  );
};
