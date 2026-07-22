import React, { useState } from 'react';
import { User, ShieldCheck, Sparkles, Award, Target, Rocket, Linkedin, Quote } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <section id="about" className="py-20 bg-white border-t border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0067FF]/10 text-[#0067FF] text-xs font-mono font-bold mb-3">
            <User className="w-3.5 h-3.5" />
            <span>LEADERSHIP & VISION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Meet the Founder & Visionary
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg font-medium">
            Bridging ambitious students to high-paying tech jobs through 1:1 mentorship and live industry projects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Interactive 3D Motion Founder Portrait */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x * 14}deg) rotateX(${-mousePos.y * 14}deg) scale(${isHovered ? 1.02 : 1})`,
                transition: 'transform 0.15s ease-out'
              }}
              className="relative w-full max-w-md cursor-pointer group"
            >
              {/* Dynamic Animated Liquid Blob Background */}
              <div className="absolute inset-0 -m-6 bg-gradient-to-tr from-[#0067FF]/20 via-[#4F46E5]/20 to-sky-400/20 rounded-[40%] blur-2xl animate-pulse-slow pointer-events-none group-hover:scale-110 transition-transform" />

              {/* Founder Card Container */}
              <div className="relative rounded-3xl bg-white border-2 border-slate-200 p-4 shadow-2xl shadow-slate-200/80 overflow-hidden">
                
                {/* Founder Interactive Portrait */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#FAFAFC] to-slate-100 flex items-center justify-center p-2">
                  <img
                    src="/sagar-parmar-founder.png"
                    alt="Sagar Parmar - Founder & CEO LearnSetu"
                    className="w-full h-auto max-h-[420px] object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  
                  {/* Floating Shimmer Light Effect */}
                  {isHovered && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse pointer-events-none" />
                  )}
                </div>

                {/* Subtitle Badge Card */}
                <div className="p-4 mt-2 text-center space-y-1">
                  <h3 className="text-2xl font-extrabold text-slate-900 font-display">Sagar Parmar</h3>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0067FF] text-white text-xs font-mono font-bold shadow-md shadow-[#0067FF]/20">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>FOUNDER & CEO</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Right Column: Mission & Mentorship Story */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Quote Block */}
            <div className="p-6 rounded-3xl bg-[#FAFAFC] border border-slate-200/80 space-y-4 relative">
              <Quote className="w-8 h-8 text-[#0067FF]/30 absolute top-4 right-4 pointer-events-none" />
              <h4 className="text-xl font-bold text-slate-900 font-display">
                "Our mission is simple: Bridging you to your next tech job."
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                At LearnSetu, we believe real career transformation happens through live weekend mentorship, hands-on Data Science projects, and direct 1:1 guidance. We focus on building true engineering competence so our graduates succeed in top tech companies.
              </p>
            </div>

            {/* Core Pillars */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-[#0067FF]/40 transition-all hover:shadow-md">
                <div className="w-10 h-10 rounded-xl bg-[#0067FF]/10 text-[#0067FF] flex items-center justify-center shrink-0 font-bold">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">Job-Ready AI & Data Science Curriculum</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
                    Learn Python, Machine Learning, SQL, and Power BI through 24 weeks of structured live sessions and real-world project portfolios.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-[#0067FF]/40 transition-all hover:shadow-md">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">100% Placement Guarantee Commitment</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
                    1:1 video doubt solving, resume review, GitHub portfolio alignment, and mock interviews until you secure your tech offer.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-[#0067FF]/40 transition-all hover:shadow-md">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#4F46E5] flex items-center justify-center shrink-0 font-bold">
                  <Rocket className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">Affordable Investment (₹14,999 Full Fee)</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
                    Complete 24-week roadmap available with 12-month No-Cost EMI options starting at just ₹1,250/month.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
