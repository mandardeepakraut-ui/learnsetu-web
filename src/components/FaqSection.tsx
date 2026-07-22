import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
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
  ];

  return (
    <section id="faq" className="py-20 bg-white border-t border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0067FF]/10 text-[#0067FF] text-xs font-mono mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>GOT QUESTIONS?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-slate-600 text-sm">
            Everything you need to know about the 24-week Master Program, fee structure (₹14,999), and placement criteria.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all shadow-sm ${
                  isOpen ? 'bg-[#FAFAFC] border-[#0067FF] ring-1 ring-[#0067FF]/20' : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4"
                >
                  <span className="text-base font-bold text-slate-900">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#0067FF]' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-4 font-medium">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
