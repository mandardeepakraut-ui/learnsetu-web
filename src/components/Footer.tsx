import React from 'react';
import { MessageCircle, Mail } from 'lucide-react';
import { LearnSetuLogo } from './LearnSetuLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200/80 pt-16 pb-12 text-xs text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-200/60">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <LearnSetuLogo showTagline={true} size="md" />
            <p className="text-xs leading-relaxed text-slate-600">
              Leading Online Learning Academy for Data Science & AI Mastery. Transform your tech career with expert guidance, real projects, and guaranteed placement support.
            </p>
            <div className="text-[11px] font-mono text-slate-500 font-bold">
              LEARNSETU EDUTECH LLP
            </div>
          </div>

          {/* Col 2: Programs */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider">Programs</h4>
            <ul className="space-y-2 font-medium">
              <li>
                <a href="#master-course" className="hover:text-[#0067FF] transition-colors">Master Program in Data Science & AI (₹14,999)</a>
              </li>
              <li>
                <a href="#syllabi" className="hover:text-[#0067FF] transition-colors">Business Analytics Essentials (Soon)</a>
              </li>
              <li>
                <a href="#syllabi" className="hover:text-[#0067FF] transition-colors">Full Stack AI Engineer Track (In Dev)</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider">Resources</h4>
            <ul className="space-y-2 font-medium">
              <li><a href="#master-course" className="hover:text-[#0067FF] transition-colors">24-Week Syllabus</a></li>
              <li><a href="#placement" className="hover:text-[#0067FF] transition-colors">Placement Guarantee Criteria</a></li>
              <li><a href="#testimonials" className="hover:text-[#0067FF] transition-colors">Student Success Stories</a></li>
              <li><a href="#faq" className="hover:text-[#0067FF] transition-colors">Frequently Asked Questions</a></li>
            </ul>
          </div>

          {/* Col 4: Contact & Mentorship Support */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider">Connect With Mentors</h4>
            
            {/* WhatsApp Direct Link */}
            <a
              href="https://wa.me/918591928362?text=Hi%20Team%20Learnsetu%2C%20I%20want%20to%20know%20more%20about%20your%20Data%20Science%20program."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 hover:bg-emerald-100 transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp: +91 85919 28362</span>
            </a>

            {/* Email Direct Mailto Redirect Link */}
            <a
              href="mailto:mandarra71@gmail.com"
              className="flex items-center gap-2 text-slate-600 font-medium hover:text-[#0067FF] transition-colors group"
            >
              <Mail className="w-4 h-4 text-[#0067FF] group-hover:scale-110 transition-transform" />
              <span className="underline decoration-slate-300 underline-offset-4 group-hover:decoration-[#0067FF]">mandarra71@gmail.com</span>
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <div>
            Copyright © 2025 - 2026 | Learn Setu | All Rights Reserved. Built with ❤️ by Mandar Raut
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-900">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900">Terms of Service</a>
            <a href="#" className="hover:text-slate-900">Placement Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
