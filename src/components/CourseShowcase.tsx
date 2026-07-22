import React, { useState } from 'react';
import { BookOpen, Check, ChevronDown, Clock, Calendar, Trophy, Award, ArrowUpRight } from 'lucide-react';

interface CourseShowcaseProps {
  onOpenBrochure: () => void;
  onSelectCourse: () => void;
}

export const CourseShowcase: React.FC<CourseShowcaseProps> = ({ onOpenBrochure, onSelectCourse }) => {
  const [openModuleIndex, setOpenModuleIndex] = useState<number | null>(0);

  const whatsappEnrollUrl = "https://wa.me/918591928362?text=Hi%20LearnSetu%20Team%2C%20I%20want%20to%20enroll%20in%20the%20Master%20Program%20in%20Data%20Science%20%26%20AI%20(%E2%82%B914%2C999%20Fee%20%2F%2012-Month%20EMI).%20Please%20guide%20me%20with%20the%20registration%20and%20batch%20details.";

  const modules = [
    {
      title: "Module 1: Python Programming & Data Analytics",
      duration: "6 Weeks",
      topics: [
        "Programming Basics & Environment Setup (VS Code, Jupyter)",
        "Python Data Types, Strings, Decision & Loop Control",
        "Lists, Tuples, Dictionaries & Set Operations",
        "Functions, Modules, File I/O & Exception Handling",
        "Regular Expressions for Text Processing",
        "Data Analysis Using NumPy & Array Operations",
        "Data Cleaning & Manipulation Using Pandas",
        "Data Visualization using Matplotlib & Seaborn",
        "Version Control with Git & GitHub Projects"
      ]
    },
    {
      title: "Module 2: Machine Learning & Predictive Modeling",
      duration: "8 Weeks",
      topics: [
        "Introduction to Supervised & Unsupervised Machine Learning",
        "Data Preprocessing, Missing Value Imputation & Feature Engineering",
        "Evaluation Metrics for Classification & Regression Models",
        "Linear Regression & Logistic Regression in Practice",
        "K-Nearest Neighbors (KNN) & Decision Tree Models",
        "Ensemble Learning: Random Forest & Gradient Boosting",
        "Naive Bayes & Hyperparameter Tuning (GridSearch, RandomSearch)",
        "End-to-End ML Pipeline Deployment"
      ]
    },
    {
      title: "Module 3: SQL & Relational Database Systems (RDBMS)",
      duration: "5 Weeks",
      topics: [
        "SQL Fundamentals: DDL, DML, DQL Commands",
        "Complex Joins (Inner, Left, Right, Full Outer, Self)",
        "Aggregation, Grouping & Having Clauses",
        "Advanced SQL: Subqueries, CTEs (Common Table Expressions)",
        "Window Functions (ROW_NUMBER, RANK, DENSE_RANK, LEAD, LAG)",
        "Database Indexing & Query Optimization"
      ]
    },
    {
      title: "Module 4: Power BI & Business Intelligence Dashboards",
      duration: "5 Weeks",
      topics: [
        "Getting Started with Power BI Desktop & Architecture",
        "Data Transformation & Cleaning with Power Query",
        "Data Modeling & Relationships",
        "DAX Expressions (Calculated Columns & Measures)",
        "Building Interactive Executive Dashboards",
        "Publishing Reports to Power BI Service"
      ]
    }
  ];

  return (
    <section id="master-course" className="py-20 relative bg-[#FAFAFC] border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0067FF]/10 text-[#0067FF] text-xs font-mono mb-3 font-bold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>FLAGSHIP 24-WEEK PROGRAM</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Master Program in Data Science & AI
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            A comprehensive 24-week career transformation program designed to turn beginners into job-ready Data Scientists and AI Engineers.
          </p>
        </div>

        {/* Course Card Grid (Asymmetric Split) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sticky Summary Card */}
          <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/60 sticky top-28 space-y-6">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-mono font-bold border border-emerald-200">
                NOW ENROLLING
              </span>
              <span className="text-xs font-mono text-slate-500 font-bold">BATCH #2026-A</span>
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-slate-900">Full Program Package</h3>
              <p className="text-xs text-slate-500 mt-1">Live Classes + 1:1 Mentorship + Placement Assistance</p>
            </div>

            {/* Price Box */}
            <div className="p-5 rounded-2xl bg-[#FAFAFC] border border-[#0067FF]/30">
              <div className="text-xs text-slate-500 font-mono uppercase tracking-wider font-bold">Total Investment</div>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-4xl font-extrabold font-mono text-slate-900">₹14,999</span>
                <span className="text-xs font-mono font-bold text-[#0067FF]">No Cost EMI</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-2">12-Month EMI starts at ₹1,250/mo. Zero hidden charges.</p>
            </div>

            {/* Program Specs List */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs py-2 border-b border-slate-100">
                <span className="text-slate-600 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#0067FF]" /> Duration
                </span>
                <span className="font-mono text-slate-900 font-bold">24 Weeks (6 Months)</span>
              </div>
              <div className="flex items-center justify-between text-xs py-2 border-b border-slate-100">
                <span className="text-slate-600 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#4F46E5]" /> Live Sessions
                </span>
                <span className="font-mono text-slate-900 font-bold">Weekends + Recordings</span>
              </div>
              <div className="flex items-center justify-between text-xs py-2 border-b border-slate-100">
                <span className="text-slate-600 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-500" /> Placement Lock
                </span>
                <span className="font-mono text-slate-900 font-bold">100% Assistance</span>
              </div>
            </div>

            {/* Placement Eligibility Requirements Box */}
            <div id="placement" className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
              <div className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-600" /> 100% Placement Guarantee Criteria:
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Maintain minimum 60% score in assessments</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Complete all assigned projects & mock interviews</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Maintain at least 80% attendance in sessions</span>
                </li>
              </ul>
            </div>

            {/* Action CTAs: Direct WhatsApp Enrollment */}
            <div className="flex flex-col gap-3 pt-2">
              <a
                href={whatsappEnrollUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-[#0067FF] hover:bg-[#0052CC] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#0067FF]/20 active:scale-95"
              >
                <span>Enroll in Master Program</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <button
                onClick={onOpenBrochure}
                className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200 transition-all text-center"
              >
                Download Detailed Syllabus PDF
              </button>
            </div>

          </div>

          {/* Right Module Accordion (Syllabus) */}
          <div id="syllabi" className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-2">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#0067FF]" />
                <span>24-Week Detailed Curriculum</span>
              </h3>
              <span className="text-xs font-mono text-slate-500 font-bold">4 CORE MODULES</span>
            </div>

            {modules.map((module, idx) => {
              const isOpen = openModuleIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl transition-all border shadow-sm ${
                    isOpen
                      ? 'bg-white border-[#0067FF] ring-1 ring-[#0067FF]/30 shadow-md'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => setOpenModuleIndex(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-xl font-mono font-bold text-sm flex items-center justify-center ${
                        isOpen ? 'bg-[#0067FF] text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        0{idx + 1}
                      </div>
                      <div>
                        <h4 className="text-base sm:text-lg font-bold text-slate-900">{module.title}</h4>
                        <span className="text-xs font-mono font-bold text-[#0067FF]">{module.duration}</span>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#0067FF]' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 border-t border-slate-100">
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {module.topics.map((topic, topicIdx) => (
                          <li key={topicIdx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0067FF] mt-1.5 shrink-0" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
