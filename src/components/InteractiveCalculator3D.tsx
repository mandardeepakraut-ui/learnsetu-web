import React, { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

interface InteractiveCalculator3DProps {
  onOpenBrochure: () => void;
}

export const InteractiveCalculator3D: React.FC<InteractiveCalculator3DProps> = ({ onOpenBrochure }) => {
  const { settings } = useSettings();
  const [experience, setExperience] = useState<number>(0); // 0 = Fresher, 1 = 1-2 Yrs, 2 = 3+ Yrs
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const expLevels = [
    { label: 'Fresher / Non-Tech', currentSalary: '₹3.5 LPA', avgHike: '+80%', projectedSalary: '₹6.5 - ₹8.0 LPA', emi: settings.emi_monthly },
    { label: '1 - 2 Yrs IT Pro', currentSalary: '₹5.0 LPA', avgHike: '+75%', projectedSalary: '₹9.0 - ₹12.0 LPA', emi: settings.emi_monthly },
    { label: '3+ Yrs Experienced', currentSalary: '₹7.5 LPA', avgHike: '+70%', projectedSalary: '₹13.0 - ₹18.0 LPA', emi: settings.emi_monthly },
  ];

  const currentLevel = expLevels[experience];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section className="py-20 relative bg-white border-y border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0067FF]/10 text-[#0067FF] text-xs font-mono mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>3D INTERACTIVE ESTIMATOR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Calculate Your Placement & Salary Hike
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            Select your background experience level to estimate your projected career growth and flexible EMI breakdown.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Interactive Experience Controls */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="p-6 rounded-3xl bg-[#FAFAFC] border border-slate-200/80 space-y-4">
              <label className="block text-sm font-bold text-slate-900">
                1. Select Your Experience Level:
              </label>
              
              <div className="grid grid-cols-3 gap-2">
                {expLevels.map((lvl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setExperience(idx)}
                    className={`py-3 px-2 rounded-2xl text-xs font-bold transition-all border ${
                      experience === idx
                        ? 'bg-[#0067FF] text-white border-[#0067FF] shadow-md shadow-[#0067FF]/20'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {lvl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Placement Eligibility Requirements Checklist */}
            <div className="p-6 rounded-3xl bg-emerald-50/60 border border-emerald-200/70 space-y-3">
              <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>100% Placement Guarantee Checklist</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Maintain minimum 60% score in module assessments</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Complete all assigned real-world projects & mock interviews</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Maintain at least 80% attendance in live sessions</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Right Column: 3D Tilt Card Display */}
          <div className="lg:col-span-6">
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x * 12}deg) rotateX(${-mousePos.y * 12}deg)`,
                transition: 'transform 0.15s ease-out'
              }}
              className="p-8 rounded-3xl bg-gradient-to-br from-white via-[#FAFAFC] to-slate-100 border border-slate-200 shadow-2xl shadow-slate-200/70 space-y-6 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#0067FF] uppercase tracking-wider">
                  PROJECTED SALARY OUTCOME
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-mono font-bold">
                  {currentLevel.avgHike} AVG HIKE
                </span>
              </div>

              {/* Salary Comparison Grid */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-white border border-slate-200">
                <div>
                  <span className="text-[11px] text-slate-500 uppercase font-mono">Current / Baseline</span>
                  <div className="text-xl font-extrabold font-mono text-slate-400 mt-1">{currentLevel.currentSalary}</div>
                </div>
                <div>
                  <span className="text-[11px] text-[#0067FF] uppercase font-mono font-bold">Projected Post-LearnSetu</span>
                  <div className="text-xl sm:text-2xl font-extrabold font-mono text-slate-900 mt-1">{currentLevel.projectedSalary}</div>
                </div>
              </div>

              {/* EMI Calculator Breakdown */}
              <div className="p-4 rounded-2xl bg-[#0067FF]/5 border border-[#0067FF]/20 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">Program Fee: {settings.course_fee}</div>
                  <div className="text-[11px] text-slate-500">12 Month No Cost EMI Option</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-extrabold font-mono text-[#0067FF]">{currentLevel.emi}/mo</div>
                  <div className="text-[10px] text-emerald-600 font-bold">Zero Interest</div>
                </div>
              </div>

              <button
                onClick={onOpenBrochure}
                className="w-full py-3.5 rounded-xl bg-[#0067FF] hover:bg-[#0052CC] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#0067FF]/20 active:scale-95"
              >
                <span>Get Detailed Salary Report & Brochure</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
