import React from 'react';
import { UserCheck, Video, Code2, Briefcase, CheckCircle2 } from 'lucide-react';

export const MentorshipGrid: React.FC = () => {
  const pillars = [
    {
      icon: UserCheck,
      title: "1:1 Doubt Solving",
      desc: "Get personalized attention with dedicated one-on-one mentorship and doubt clearing sessions with senior Data Scientists.",
      color: "text-[#0067FF]",
      bg: "bg-[#0067FF]/10",
      border: "border-[#0067FF]/20"
    },
    {
      icon: Video,
      title: "Live Interactive Sessions",
      desc: "Learn through engaging live weekend classes led by active industry professionals instead of static pre-recorded videos.",
      color: "text-[#4F46E5]",
      bg: "bg-[#4F46E5]/10",
      border: "border-[#4F46E5]/20"
    },
    {
      icon: Code2,
      title: "Real-Time Projects",
      desc: "Work on hands-on datasets that reflect real industry scenarios in fintech, e-commerce, and healthcare to build a verified portfolio.",
      color: "text-purple-600",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20"
    },
    {
      icon: Briefcase,
      title: "100% Placement Assistance",
      desc: "From resume crafting and GitHub portfolio review to 1:1 mock interviews and direct referrals, we guide you till you get hired.",
      color: "text-emerald-600",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20"
    }
  ];

  return (
    <section className="py-20 relative bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-mono mb-3">
            <span>MENTORSHIP & CAREER FRAMEWORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Get Hired. Stay Relevant. Grow Fast.
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            Master the skills top technology companies actively hire for. Our structured framework prepares you for real-world engineering challenges.
          </p>
        </div>

        {/* Bento Grid (Exact Cell Count = 4 items) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#FAFAFC] p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#0067FF]/40 transition-all flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl ${item.bg} border ${item.border} flex items-center justify-center ${item.color} mb-6 group-hover:scale-110 transition-transform`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">{item.desc}</p>
                </div>
                <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center gap-2 text-[11px] font-mono text-slate-500 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>GUARANTEED SUPPORT</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
