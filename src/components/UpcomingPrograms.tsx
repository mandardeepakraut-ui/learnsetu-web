import React from 'react';
import { Rocket, Brain, PieChart, ArrowUpRight } from 'lucide-react';

interface UpcomingProgramsProps {
  onOpenBrochure: () => void;
}

export const UpcomingPrograms: React.FC<UpcomingProgramsProps> = ({ onOpenBrochure }) => {
  return (
    <section className="py-20 relative bg-[#FAFAFC] border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0067FF]/10 text-[#0067FF] text-xs font-mono mb-3">
              <Rocket className="w-3.5 h-3.5" />
              <span>FUTURE-PROOF LEARNING PATHS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Upcoming Specialised Tracks
            </h2>
            <p className="text-sm text-slate-600 max-w-md mt-2">
              Expand your tech arsenal with specialised paths built for tomorrow's AI economy.
            </p>
          </div>
        </div>

        {/* 2-Column Asymmetric Cards (Light White Cards with Glow Physics) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Business Analytics Essentials */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/50 relative overflow-hidden group hover:border-[#0067FF] hover:shadow-2xl hover:shadow-[#0067FF]/10 transition-all duration-300 transform hover:-translate-y-1">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#0067FF]/5 rounded-full blur-2xl group-hover:bg-[#0067FF]/15 transition-all" />
            
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#0067FF]/10 border border-[#0067FF]/20 flex items-center justify-center text-[#0067FF]">
                <PieChart className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 rounded-full bg-sky-50 text-[#0067FF] text-xs font-mono font-bold border border-sky-200">
                LAUNCHING SOON
              </span>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mb-2">Business Analytics Essentials</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Explore data-driven decision making. Uncover financial, operational, and customer insights that power executive business strategy.
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-xs font-mono font-semibold text-slate-500">STATUS: IN PREPARATION</span>
              <button
                onClick={onOpenBrochure}
                className="flex items-center gap-1.5 text-xs font-bold text-[#0067FF] hover:underline group-hover:translate-x-0.5 transition-transform"
              >
                <span>Notify Me</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: Full Stack AI Engineer Program */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/50 relative overflow-hidden group hover:border-[#4F46E5] hover:shadow-2xl hover:shadow-[#4F46E5]/10 transition-all duration-300 transform hover:-translate-y-1">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#4F46E5]/5 rounded-full blur-2xl group-hover:bg-[#4F46E5]/15 transition-all" />
            
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#4F46E5]/10 border border-[#4F46E5]/20 flex items-center justify-center text-[#4F46E5]">
                <Brain className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 rounded-full bg-indigo-50 text-[#4F46E5] text-xs font-mono font-bold border border-indigo-200">
                IN DEVELOPMENT
              </span>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mb-2">Full Stack AI Engineer Program</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              From data pipelines and model training to deploying autonomous AI agents and RAG applications at enterprise scale.
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-xs font-mono font-semibold text-slate-500">STATUS: ADVANCED LAB SETUP</span>
              <button
                onClick={onOpenBrochure}
                className="flex items-center gap-1.5 text-xs font-bold text-[#4F46E5] hover:underline group-hover:translate-x-0.5 transition-transform"
              >
                <span>Request Early Access</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
