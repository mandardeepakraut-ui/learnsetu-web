import React, { useState } from 'react';
import { HelpCircle, Check, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CourseMatcherQuizProps {
  onOpenBrochure: () => void;
  onSelectCourse: () => void;
}

export const CourseMatcherQuiz: React.FC<CourseMatcherQuizProps> = ({ onOpenBrochure, onSelectCourse }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const whatsappEnrollUrl = "https://wa.me/918591928362?text=Hi%20LearnSetu%20Team%2C%20I%20want%20to%20enroll%20in%20the%20Master%20Program%20in%20Data%20Science%20%26%20AI%20(%E2%82%B914%2C999%20Fee%20%2F%2012-Month%20EMI).%20Please%20guide%20me%20with%20the%20registration%20and%20batch%20details.";

  const questions = [
    {
      q: "What is your primary career goal?",
      options: ["Switch to Data Science / AI Role", "Build Job-Ready Tech Skills as a Fresher", "Upskill for Higher Salary Hikes"]
    },
    {
      q: "How many hours per week can you learn?",
      options: ["5 to 8 Hours (Weekend Live)", "10 to 15 Hours (Standard Pace)", "20+ Hours (Intensive Project Pace)"]
    },
    {
      q: "What is your current background?",
      options: ["Non-IT / Commerce / Business", "Engineering / Computer Science", "Fresh Graduate / Final Year Student"]
    }
  ];

  const handleSelect = (optionIdx: number) => {
    const nextAnswers = [...answers, optionIdx];
    setAnswers(nextAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setStep(questions.length);
      confetti({ particleCount: 90, spread: 60, origin: { y: 0.7 } });
    }
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers([]);
  };

  return (
    <section className="py-20 relative bg-white border-t border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-700 mb-3 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERACTIVE MATCHING TOOL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Find Your Ideal Learning Track
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Answer 3 quick questions to check your eligibility and course fit.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-[#FAFAFC] border border-slate-200 shadow-xl shadow-slate-200/40">
          {step < questions.length ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 font-bold">
                <span>QUESTION {step + 1} OF 3</span>
                <span>STEP {step + 1}/3</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900">{questions[step].q}</h3>

              <div className="space-y-3">
                {questions[step].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className="w-full p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#0067FF] hover:bg-[#0067FF]/5 text-left text-xs font-bold text-slate-800 flex items-center justify-between transition-all group"
                  >
                    <span>{opt}</span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#0067FF] group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center space-y-6">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <Check className="w-7 h-7" />
              </div>

              <div>
                <span className="text-xs font-mono font-bold text-emerald-600 uppercase">100% MATCH FOUND</span>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">Master Program in Data Science & AI</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto mt-2">
                  Based on your goals and background, the 24-Week Master Program (₹14,999 full fee / ₹1,250 mo EMI) with 1:1 mentorship is your optimal career path.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={whatsappEnrollUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#0067FF] hover:bg-[#0052CC] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-[#0067FF]/20"
                >
                  <span>Enroll in Master Program</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <button
                  onClick={resetQuiz}
                  className="w-full sm:w-auto px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-slate-50"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Matcher</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
