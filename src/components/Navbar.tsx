import React, { useState } from 'react';
import { MessageCircle, FileText, Menu, X } from 'lucide-react';
import { LearnSetuLogo } from './LearnSetuLogo';

interface NavbarProps {
  onOpenBrochure: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBrochure }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-22 flex items-center justify-between py-2">

        {/* Interactive Official Brand Logo */}
        <a href="#" className="flex items-center">
          <LearnSetuLogo showTagline={true} size="md" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#master-course" className="text-sm text-slate-600 hover:text-[#0067FF] font-semibold transition-colors">
            Master Course
          </a>
          <a href="#estimator" className="text-sm text-slate-600 hover:text-[#0067FF] font-semibold transition-colors">
            Salary & EMI Estimator
          </a>
          <a href="#syllabi" className="text-sm text-slate-600 hover:text-[#0067FF] font-semibold transition-colors">
            Syllabus
          </a>
          <a href="#placement" className="text-sm text-slate-600 hover:text-[#0067FF] font-semibold transition-colors">
            Placement Lock
          </a>
          <a href="#faq" className="text-sm text-slate-600 hover:text-[#0067FF] font-semibold transition-colors">
            FAQs
          </a>
        </nav>

        {/* Header Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="https://wa.me/918591928362?text=Hi%20Team%20Learnsetu%2C%20I%20want%20to%20know%20more%20about%20your%20Data%20Science%20program."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 text-xs font-bold transition-all shadow-sm"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>WhatsApp Mentor</span>
          </a>

          <button
            onClick={onOpenBrochure}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0067FF] hover:bg-[#0052CC] text-white text-xs font-bold transition-all shadow-md shadow-[#0067FF]/20 active:scale-95"
          >
            <FileText className="w-4 h-4" />
            <span>Brochure</span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-800"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-slate-200 px-4 py-6 flex flex-col gap-4 bg-white">
          <a
            href="#master-course"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm text-slate-800 font-semibold py-1"
          >
            Master Course
          </a>
          <a
            href="#estimator"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm text-slate-800 font-semibold py-1"
          >
            Salary & EMI Estimator
          </a>
          <a
            href="#syllabi"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm text-slate-800 font-semibold py-1"
          >
            Syllabus
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm text-slate-800 font-semibold py-1"
          >
            FAQs
          </a>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBrochure();
              }}
              className="w-full py-3 rounded-xl bg-[#0067FF] text-white font-bold text-sm text-center"
            >
              Download Course Brochure
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
