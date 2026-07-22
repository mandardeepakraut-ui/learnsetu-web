import React from 'react';
import { Star, Quote, Building2, TrendingUp } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: "Riya Sharma",
      role: "Data Analyst @ TCS",
      hike: "+65% Hike",
      review: "LearnSetu transformed my career. The Python and Power BI modules were so hands-on that I cleared my TCS technical interview in the first attempt.",
      stars: 5,
    },
    {
      name: "Rahul Jain",
      role: "Associate AI Engineer @ Infosys",
      hike: "+70% Hike",
      review: "The 1:1 mentorship and mock interviews gave me complete confidence. Building real Machine Learning models on actual datasets made all the difference.",
      stars: 5,
    },
    {
      name: "Mehul Desai",
      role: "Data Scientist @ StartTech",
      hike: "+85% Hike",
      review: "Coming from a non-IT background, I was skeptical. But the step-by-step SQL and ML roadmap helped me land my dream Data Science job.",
      stars: 5,
    }
  ];

  return (
    <section id="testimonials" className="py-20 relative bg-[#FAFAFC] border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-mono mb-3 border border-emerald-200">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>ALUMNI CAREER TRANSITIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Real Student Success Stories
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            See how our graduates transformed their careers with top technology companies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col justify-between space-y-6 hover:border-[#0067FF] transition-all transform hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-mono font-bold border border-emerald-200">
                    {rev.hike}
                  </span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-medium italic">
                  "{rev.review}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{rev.name}</h4>
                  <p className="text-[11px] text-slate-500 font-mono">{rev.role}</p>
                </div>
                <Building2 className="w-5 h-5 text-slate-400" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
