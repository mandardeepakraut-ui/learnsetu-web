import React, { useState } from 'react';
import { Building2 } from 'lucide-react';
import tcsImg from '../assets/companies/TCS.jpg';
import infosysImg from '../assets/companies/INFOSYS.jpg';
import wiproImg from '../assets/companies/WIPRO.jpg';
import accentureImg from '../assets/companies/ACCENTURE.jpg';
import cognizantImg from '../assets/companies/COGNIZANT.jpg';
import capgeminiImg from '../assets/companies/CAPGEMINI.jpg';
import ibmImg from '../assets/companies/IBM.jpg';
import startechImg from '../assets/companies/STARTECH.jpg';

interface CompanyLogo {
  name: string;
  imgSrc: string;
  fallbackSrc: string;
  avgPackage: string;
  hike: string;
}

export const HiringPartners: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const companies: CompanyLogo[] = [
    {
      name: 'TCS',
      imgSrc: tcsImg,
      fallbackSrc: '/companies/TCS.jpg',
      avgPackage: '₹6.5 - ₹8.0 LPA',
      hike: '+65% Hike'
    },
    {
      name: 'Infosys',
      imgSrc: infosysImg,
      fallbackSrc: '/companies/INFOSYS.jpg',
      avgPackage: '₹7.0 - ₹9.5 LPA',
      hike: '+70% Hike'
    },
    {
      name: 'Wipro',
      imgSrc: wiproImg,
      fallbackSrc: '/companies/WIPRO.jpg',
      avgPackage: '₹6.8 - ₹8.5 LPA',
      hike: '+68% Hike'
    },
    {
      name: 'Accenture',
      imgSrc: accentureImg,
      fallbackSrc: '/companies/ACCENTURE.jpg',
      avgPackage: '₹8.0 - ₹11.0 LPA',
      hike: '+75% Hike'
    },
    {
      name: 'Cognizant',
      imgSrc: cognizantImg,
      fallbackSrc: '/companies/COGNIZANT.jpg',
      avgPackage: '₹7.2 - ₹9.8 LPA',
      hike: '+72% Hike'
    },
    {
      name: 'Capgemini',
      imgSrc: capgeminiImg,
      fallbackSrc: '/companies/CAPGEMINI.jpg',
      avgPackage: '₹7.5 - ₹10.2 LPA',
      hike: '+75% Hike'
    },
    {
      name: 'IBM',
      imgSrc: ibmImg,
      fallbackSrc: '/companies/IBM.jpg',
      avgPackage: '₹8.5 - ₹12.0 LPA',
      hike: '+80% Hike'
    },
    {
      name: 'StartTech',
      imgSrc: startechImg,
      fallbackSrc: '/companies/STARTECH.jpg',
      avgPackage: '₹7.0 - ₹9.0 LPA',
      hike: '+70% Hike'
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
                className={`relative p-3 rounded-2xl bg-white border transition-all duration-300 flex flex-col items-center justify-center min-h-[90px] cursor-pointer group ${
                  isHovered
                    ? 'border-[#0067FF] shadow-xl shadow-[#0067FF]/15 scale-105 ring-1 ring-[#0067FF]'
                    : 'border-slate-200/80 hover:border-slate-300'
                }`}
              >
                {/* Official High-Resolution Logo Image */}
                <div className="w-full h-12 flex items-center justify-center p-1 transition-transform duration-300 group-hover:scale-105">
                  <img
                    src={company.imgSrc}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = company.fallbackSrc;
                    }}
                    alt={`${company.name} Official Logo`}
                    className="max-h-11 max-w-full object-contain filter contrast-110 transition-all"
                  />
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
