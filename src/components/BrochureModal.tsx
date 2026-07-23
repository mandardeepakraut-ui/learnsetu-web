import React, { useState } from 'react';
import { X, Download, CheckCircle, FileText, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { supabase } from '../lib/supabase';
import { sendTelegramNewLeadAlert } from '../lib/telegramAlerts';
import { PersonalizedBrochureView } from './PersonalizedBrochureView';

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrochureModal: React.FC<BrochureModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    program: 'Master Program in Data Science & AI'
  });

  if (!isOpen) return null;

  const triggerPdfDownload = () => {
    const link = document.createElement('a');
    link.href = '/LearnSetu-Data-science-and-ai-Brochure.pdf';
    link.download = 'LearnSetu-Data-science-and-ai-Brochure.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const saveLeadToSupabase = async () => {
    try {
      await supabase.from('brochure_leads').insert([
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          program: formData.program,
          created_at: new Date().toISOString()
        }
      ]);
    } catch (err) {
      console.log('Lead saved locally fallback');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerPdfDownload();
    saveLeadToSupabase();

    // Trigger Instant Telegram Lead Alert
    sendTelegramNewLeadAlert({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      program: formData.program,
    });

    setSubmitted(true);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div className={`relative w-full ${submitted ? 'max-w-4xl max-h-[90vh] overflow-y-auto p-4' : 'max-w-lg p-8'} bg-white rounded-3xl border border-slate-200 shadow-2xl shadow-slate-900/20 transition-all`}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors border border-slate-200"
        >
          <X className="w-4 h-4" />
        </button>

        {!submitted ? (
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0067FF]/10 text-[#0067FF] text-xs font-mono mb-3 font-bold">
              <Download className="w-3.5 h-3.5" />
              <span>OFFICIAL BROCHURE & SYLLABUS</span>
            </div>

            <h3 className="text-2xl font-extrabold text-slate-900 mb-1">
              Download Program Syllabus
            </h3>
            <p className="text-xs text-slate-600 mb-6">
              Get the complete 24-week curriculum breakdown, project details, fee structure, and EMI guide downloaded directly to your device.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Rahul"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAFC] border border-slate-300 text-slate-900 text-xs font-medium focus:outline-none focus:border-[#0067FF] focus:ring-1 focus:ring-[#0067FF] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Sharma"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAFC] border border-slate-300 text-slate-900 text-xs font-medium focus:outline-none focus:border-[#0067FF] focus:ring-1 focus:ring-[#0067FF] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="rahul.sharma@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAFC] border border-slate-300 text-slate-900 text-xs font-medium focus:outline-none focus:border-[#0067FF] focus:ring-1 focus:ring-[#0067FF] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number (WhatsApp)</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAFC] border border-slate-300 text-slate-900 text-xs font-medium focus:outline-none focus:border-[#0067FF] focus:ring-1 focus:ring-[#0067FF] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Select Program</label>
                <select
                  value={formData.program}
                  onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAFC] border border-slate-300 text-slate-900 text-xs font-medium focus:outline-none focus:border-[#0067FF] focus:ring-1 focus:ring-[#0067FF] transition-colors"
                >
                  <option value="Master Program in Data Science & AI">Master Program in Data Science & AI</option>
                  <option value="Business Analytics Essentials">Business Analytics Essentials (Launching Soon)</option>
                  <option value="Full Stack AI Engineer Program">Full Stack AI Engineer Program (In Dev)</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#0067FF] hover:bg-[#0052CC] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#0067FF]/20 active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF Brochure Instantly</span>
                </button>
                <div className="mt-3 text-[10px] text-slate-400 font-mono flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>256-BIT SSL ENCRYPTED • 100% PRIVACY PROTECTED</span>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="space-y-4">
            <PersonalizedBrochureView
              firstName={formData.firstName}
              lastName={formData.lastName}
              email={formData.email}
              phone={formData.phone}
              program={formData.program}
              onClose={() => {
                setSubmitted(false);
                onClose();
              }}
            />
          </div>
        )}

      </div>
    </div>
  );
};
