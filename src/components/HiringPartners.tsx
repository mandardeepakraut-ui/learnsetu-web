import React, { useState } from 'react';
import { Building2, Sparkles, TrendingUp, CheckCircle2 } from 'lucide-react';

interface CompanyLogo {
  name: string;
  slug: string;
  avgPackage: string;
  hike: string;
  svg: React.ReactNode;
}

export const HiringPartners: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const companies: CompanyLogo[] = [
    {
      name: 'TCS',
      slug: 'tcs',
      avgPackage: '₹6.5 - ₹8.0 LPA',
      hike: '+65% Hike',
      svg: (
        <svg viewBox="0 0 120 40" className="h-8 w-auto fill-current">
          <path d="M10 8h24v6H25v18h-6V14H10V8zm28 0h18v6h-12v4h10v6H44v4h12v6H38V8zm22 0h18c3.3 0 6 2.7 6 6v4c0 3.3-2.7 6-6 6h-12v8h-6V8zm6 6v4h12v-4H66z" fill="#0067FF" />
          <text x="92" y="27" fontFamily="'Outfit', sans-serif" fontWeight="800" fontSize="16" fill="#0F172A">TCS</text>
        </svg>
      )
    },
    {
      name: 'Infosys',
      slug: 'infosys',
      avgPackage: '₹7.0 - ₹9.5 LPA',
      hike: '+70% Hike',
      svg: (
        <svg viewBox="0 0 140 40" className="h-8 w-auto">
          <text x="5" y="28" fontFamily="'Outfit', sans-serif" fontStyle="italic" fontWeight="800" fontSize="24" fill="#0067FF">Infosys</text>
          <circle cx="125" cy="24" r="4" fill="#0067FF" />
        </svg>
      )
    },
    {
      name: 'Wipro',
      slug: 'wipro',
      avgPackage: '₹6.8 - ₹8.5 LPA',
      hike: '+68% Hike',
      svg: (
        <svg viewBox="0 0 130 40" className="h-8 w-auto">
          <circle cx="16" cy="20" r="10" fill="none" stroke="#0067FF" strokeWidth="4" />
          <circle cx="16" cy="20" r="4" fill="#4F46E5" />
          <text x="36" y="28" fontFamily="'Outfit', sans-serif" fontWeight="800" fontSize="22" fill="#0F172A">wipro</text>
        </svg>
      )
    },
    {
      name: 'Accenture',
      slug: 'accenture',
      avgPackage: '₹8.0 - ₹11.0 LPA',
      hike: '+75% Hike',
      svg: (
        <svg viewBox="0 0 160 40" className="h-8 w-auto">
          <path d="M12 10 l8 8 l-8 8" fill="none" stroke="#A100FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <text x="28" y="28" fontFamily="'Outfit', sans-serif" fontWeight="800" fontSize="20" fill="#0F172A">accenture</text>
        </svg>
      )
    },
    {
      name: 'Cognizant',
      slug: 'cognizant',
      avgPackage: '₹7.2 - ₹9.8 LPA',
      hike: '+72% Hike',
      svg: (
        <svg viewBox="0 0 160 40" className="h-8 w-auto">
          <circle cx="16" cy="20" r="10" fill="none" stroke="#0033A0" strokeWidth="4" />
          <text x="34" y="28" fontFamily="'Outfit', sans-serif" fontWeight="800" fontSize="20" fill="#0F172A">Cognizant</text>
        </svg>
      )
    },
    {
      name: 'Capgemini',
      slug: 'capgemini',
      avgPackage: '₹7.5 - ₹10.2 LPA',
      hike: '+74% Hike',
      svg: (
        <svg viewBox="0 0 160 40" className="h-8 w-auto">
          <path d="M14 12 C14 12, 22 8, 22 20 C22 28, 14 28, 14 28" fill="none" stroke="#0070AD" strokeWidth="4" strokeLinecap="round" />
          <text x="32" y="28" fontFamily="'Outfit', sans-serif" fontWeight="800" fontSize="20" fill="#0F172A">Capgemini</text>
        </svg>
      )
    },
    {
      name: 'IBM',
      slug: 'ibm',
      avgPackage: '₹8.5 - ₹12.0 LPA',
      hike: '+80% Hike',
      svg: (
        <svg viewBox="0 0 110 40" className="h-8 w-auto">
          <text x="5" y="30" fontFamily="'JetBrains Mono', monospace" fontWeight="900" fontSize="28" fill="#054ADA" letterSpacing="2">IBM</text>
        </svg>
      )
    },
    {
      name: 'StartTech',
      slug: 'starttech',
      avgPackage: '₹7.0 - ₹9.0 LPA',
      hike: '+70% Hike',
      svg: (
        <svg viewBox="0 0 150 40" className="h-8 w-auto">
          <polygon points="16,8 20,16 28,16 22,22 24,30 16,24 8,30 10,22 4,16 12,16" fill="#0067FF" />
          <text x="36" y="28" fontFamily="'Outfit', sans-serif" fontWeight="800" fontSize="20" fill="#0F172A">StartTech</text>
        </svg>
      )
    }
  ];

  return (
    <section className="py-14 bg-white border-y border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        {/* Visible Header */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-slate-800">
          <Building2 className="w-4 h-4 text-[#0067FF]" />
          <span>TOP HIRING PARTNERS • 500+ ALUMNI PLACED</span>
        </div>

        {/* Interactive Logo Wall Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {companies.map((company, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`relative p-4 rounded-2xl bg-[#FAFAFC] border transition-all duration-300 flex flex-col items-center justify-center min-h-[90px] cursor-pointer group ${
                  isHovered
                    ? 'bg-white border-[#0067FF] shadow-xl shadow-[#0067FF]/15 scale-105 ring-1 ring-[#0067FF]'
                    : 'border-slate-200/80 hover:border-slate-300'
                }`}
              >
                {/* SVG Company Logo */}
                <div className="transition-transform duration-300 group-hover:scale-105">
                  {company.svg}
                </div>

                {/* Interactive Tooltip Card on Hover */}
                {isHovered && (
                  <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 z-30 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-[11px] font-mono whitespace-nowrap shadow-xl border border-slate-700 animate-fadeIn flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">{company.hike}</span>
                    <span className="text-slate-300">({company.avgPackage})</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Subtitle proof */}
        <p className="text-xs text-slate-500 font-medium pt-2">
          Graduates working across top Indian IT service majors, MNCs, and high-growth AI startups.
        </p>

      </div>
    </section>
  );
};
