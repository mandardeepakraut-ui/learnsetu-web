import React, { useState } from 'react';

interface LearnSetuLogoProps {
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const LearnSetuLogo: React.FC<LearnSetuLogoProps> = ({ showTagline = true, size = 'md' }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Dynamic scale dimensions
  const scale = size === 'sm' ? 0.8 : size === 'lg' ? 1.2 : 1;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="inline-flex flex-col items-start select-none cursor-pointer group transition-all duration-300 transform active:scale-95"
      style={{ transform: `scale(${scale})`, transformOrigin: 'left center' }}
    >
      {/* Interactive Pill Container */}
      <div className={`relative inline-flex items-center rounded-full p-[2px] transition-all duration-500 shadow-md ${
        isHovered
          ? 'shadow-xl shadow-[#0067FF]/30 scale-[1.03] ring-2 ring-[#0067FF]/40'
          : 'shadow-slate-200'
      }`}>
        
        {/* Outer Glowing Border Capsule */}
        <div className="relative inline-flex items-center rounded-full border-2 border-[#0067FF] bg-white overflow-hidden font-display font-extrabold tracking-tight text-xl sm:text-2xl">
          
          {/* Left Pill Half: Solid Electric Blue background with white "Learn" */}
          <div className={`px-4 py-1.5 bg-[#0067FF] text-white font-extrabold flex items-center transition-all duration-500 ${
            isHovered ? 'pr-5' : 'pr-4'
          }`}>
            <span>Learn</span>
          </div>

          {/* Right Pill Half: White background with blue "setu" */}
          <div className={`px-4 py-1.5 bg-white text-[#0067FF] font-extrabold flex items-center transition-all duration-500 ${
            isHovered ? 'pl-5 text-[#0052CC]' : 'pl-4'
          }`}>
            <span>setu</span>
          </div>

          {/* Interactive Shimmer Glow overlay on hover */}
          {isHovered && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse pointer-events-none" />
          )}

        </div>
      </div>

      {/* Subtitle Tagline: "Bridging you to your next tech job" */}
      {showTagline && (
        <span className={`text-[11px] font-bold tracking-tight text-[#0067FF] mt-1 transition-all duration-300 font-body ${
          isHovered ? 'text-[#0052CC] translate-x-0.5' : 'text-[#0067FF]'
        }`}>
          Bridging you to your next tech job
        </span>
      )}
    </div>
  );
};
