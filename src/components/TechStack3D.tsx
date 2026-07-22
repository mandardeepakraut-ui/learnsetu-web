import React, { useState } from 'react';
import { Cpu, Code, Database, BarChart3, Terminal, GitBranch, Layers } from 'lucide-react';

export const TechStack3D: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<number>(0);

  const stack = [
    {
      name: "Python 3.12",
      category: "Core Language",
      icon: Code,
      desc: "Master data structures, object-oriented programming, file I/O, and advanced functional programming for Data Science."
    },
    {
      name: "Pandas & NumPy",
      category: "Data Processing",
      icon: Database,
      desc: "Perform high-speed vectorized computation, data cleaning, aggregation, joining, and feature engineering."
    },
    {
      name: "Scikit-learn & ML",
      category: "Machine Learning",
      icon: Cpu,
      desc: "Build predictive models with Linear/Logistic Regression, Random Forests, Gradient Boosting, KNN, and Hyperparameter Tuning."
    },
    {
      name: "Advanced SQL & RDBMS",
      category: "Database Systems",
      icon: Layers,
      desc: "Master relational queries, complex joins, subqueries, CTEs, and analytic window functions for enterprise data."
    },
    {
      name: "Power BI & DAX",
      category: "Business Intelligence",
      icon: BarChart3,
      desc: "Design interactive executive dashboards, DAX measures, data modeling, and automated reporting pipelines."
    },
    {
      name: "Git & GitHub",
      category: "Version Control",
      icon: GitBranch,
      desc: "Build a professional GitHub portfolio with version-controlled machine learning projects and clean repositories."
    }
  ];

  const current = stack[selectedTech];

  return (
    <section className="py-20 relative bg-[#FAFAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-mono text-[#4F46E5] mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>INTERACTIVE TOOLING MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Industry Standard Tech Stack
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            Click through the core technologies you will master in the 24-week Master Program.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Tech Buttons */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-3">
            {stack.map((item, idx) => {
              const IconComp = item.icon;
              const isSelected = selectedTech === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedTech(idx)}
                  className={`p-4 rounded-2xl text-left transition-all border flex items-center gap-3 ${
                    isSelected
                      ? 'bg-white border-[#0067FF] shadow-lg shadow-[#0067FF]/10 ring-1 ring-[#0067FF]'
                      : 'bg-white/60 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-[#0067FF] text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{item.name}</h4>
                    <span className="text-[10px] text-slate-500 font-mono">{item.category}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Tech Focus Card */}
          <div className="lg:col-span-6 p-8 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/50 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-mono">
              <span>{current.category}</span>
            </div>
            
            <h3 className="text-2xl font-extrabold text-slate-900">{current.name}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{current.desc}</p>
            
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>INCLUDED IN 24-WEEK SYLLABUS</span>
              <span className="text-[#0067FF] font-bold">PRACTICAL HANDS-ON</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
