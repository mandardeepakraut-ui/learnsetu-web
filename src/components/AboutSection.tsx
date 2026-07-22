import React, { useState } from 'react';
import { User, Sparkles, Trophy, Users, Building2, Quote, ArrowRight, ShieldCheck } from 'lucide-react';
import sagarParmarImg from '../assets/sagar-parmar-founder.png';

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
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0067FF]/10 text-[#0067FF] text-xs font-mono font-bold">
            <User className="w-3.5 h-3.5" />
            <span>EXPERT GUIDANCE & FOUNDER STORY</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight font-display">
            Leading Online Learning Platform for Data Science Mastery
          </h2>
          
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            Transform Your Data Science Career and Secure up to <strong className="text-[#0067FF]">70% salary hikes</strong> with Learnsetu's Expert Guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
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
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#FAFAFC] to-slate-100 flex items-center justify-center p-2 min-h-[380px]">
                  <img
                    src={sagarParmarImg}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/sagar-parmar-founder.png';
                    }}
                    alt="Sagar Parmar - Founder & CEO Learnsetu"
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

          {/* Right Column: Exact Founder Story Copy */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#0067FF] uppercase tracking-wider">MEET THE FOUNDER</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                Hi, I'm Sagar Parmar
              </h3>
              <p className="text-xs font-mono text-slate-500 font-bold">FOUNDER & CEO OF LEARNSETU</p>
            </div>

            {/* Verbatim Founder Bio Paragraphs */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              <div className="p-5 rounded-2xl bg-[#FAFAFC] border border-slate-200/80">
                With a degree in Information Technology from Mumbai University and over 4 years of hands-on experience helping startups grow, I’ve seen the challenges fresh graduates face when trying to break into the tech industry — not because they lack talent, but because they lack direction, practical skills, and confidence.
              </div>

              <div className="p-5 rounded-2xl bg-[#FAFAFC] border border-slate-200/80">
                That realization led me to build <strong className="text-[#0067FF]">Learnsetu.in</strong> — a platform designed not just to teach Data Science and AI, but to empower students with the mindset, communication, and emotional strength needed to thrive in their careers.
              </div>

              <div className="p-5 rounded-2xl bg-[#FAFAFC] border border-slate-200/80">
                My goal is simple: to make learning real, personal, and transformational. Whether you’re a fresher or a career switcher, <strong className="text-[#0067FF]">Learnsetu.in</strong> is here to guide you with mentorship, hands-on projects, and a community that genuinely cares.
              </div>
            </div>

          </div>

        </div>

        {/* Number Speaks Section (Interactive Metrics Cards) */}
        <div className="pt-12 border-t border-slate-200/80">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight font-display">
              Number Speaks
            </h3>
            <p className="text-xs text-slate-500 font-mono mt-1 font-bold">PROVEN IMPACT & ACADEMY METRICS</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Metric 1: 5+ Awards */}
            <div className="p-6 rounded-3xl bg-[#FAFAFC] border border-slate-200 text-center space-y-2 hover:border-[#0067FF] hover:shadow-xl hover:shadow-[#0067FF]/10 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-[#0067FF]/10 text-[#0067FF] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <Trophy className="w-6 h-6" />
              </div>
              <div className="text-4xl font-extrabold font-mono text-slate-900">5+</div>
              <div className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">Awards</div>
            </div>

            {/* Metric 2: 25+ Partners */}
            <div className="p-6 rounded-3xl bg-[#FAFAFC] border border-slate-200 text-center space-y-2 hover:border-[#0067FF] hover:shadow-xl hover:shadow-[#0067FF]/10 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-[#4F46E5] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="text-4xl font-extrabold font-mono text-slate-900">25+</div>
              <div className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">Partners</div>
            </div>

            {/* Metric 3: 500+ Students */}
            <div className="p-6 rounded-3xl bg-[#FAFAFC] border border-slate-200 text-center space-y-2 hover:border-[#0067FF] hover:shadow-xl hover:shadow-[#0067FF]/10 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-4xl font-extrabold font-mono text-slate-900">500+</div>
              <div className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">Students</div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
