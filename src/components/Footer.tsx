import React, { useState } from 'react';
import { MessageCircle, Mail, Instagram, Linkedin } from 'lucide-react';
import { LearnSetuLogo } from './LearnSetuLogo';
import { useSettings } from '../context/SettingsContext';
import { PrivacyPolicyModal } from './PrivacyPolicyModal';
import { TermsOfServiceModal } from './TermsOfServiceModal';

export const Footer: React.FC = () => {
  const { settings } = useSettings();
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  return (
    <footer className="bg-white border-t border-slate-200/80 pt-16 pb-12 text-xs text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-200/60">
          
          {/* Col 1: Brand Info & Social Media Links */}
          <div className="space-y-4">
            <LearnSetuLogo showTagline={true} size="md" />
            <p className="text-xs leading-relaxed text-slate-600">
              Leading Online Learning Academy for Data Science & AI Mastery. Transform your tech career with expert guidance, real projects, and guaranteed placement support.
            </p>
            
            {/* Social Media Links */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://www.instagram.com/learnsetu.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-pink-50 text-pink-700 font-bold border border-pink-200 hover:bg-pink-100 transition-all text-xs"
                title="Follow LearnSetu on Instagram"
              >
                <Instagram className="w-4 h-4 text-pink-600" />
                <span>Instagram</span>
              </a>

              <a
                href="https://www.linkedin.com/company/learnsetu/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-50 text-[#0067FF] font-bold border border-blue-200 hover:bg-blue-100 transition-all text-xs"
                title="Follow LearnSetu on LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-[#0067FF]" />
                <span>LinkedIn</span>
              </a>
            </div>

            <div className="text-[11px] font-mono text-slate-500 font-bold pt-1">
              LEARNSETU EDUTECH LLP
            </div>
          </div>

          {/* Col 2: Programs */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider">Programs</h4>
            <ul className="space-y-2 font-medium">
              <li>
                <a href="#master-course" className="hover:text-[#0067FF] transition-colors">Master Program in Data Science & AI ({settings.course_fee})</a>
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
            Copyright © 2025 - 2026 | Learn Setu | All Rights Reserved. Built with ❤️ by{' '}
            <a
              href="https://www.linkedin.com/in/mandarraut-datascience/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#0067FF] hover:underline"
            >
              Mandar Raut
            </a>{' '}
            &{' '}
            <a
              href="https://www.linkedin.com/in/manthan-saindane-datascience/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#0067FF] hover:underline"
            >
              Manthan Saindane
            </a>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="https://www.instagram.com/learnsetu.in/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 font-semibold transition-colors">Instagram</a>
            <a href="https://www.linkedin.com/company/learnsetu/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="hover:text-[#0067FF] font-semibold transition-colors">LinkedIn</a>
            <button onClick={() => setPrivacyOpen(true)} className="hover:text-slate-900 font-semibold transition-colors">Privacy Policy</button>
            <button onClick={() => setTermsOpen(true)} className="hover:text-slate-900 font-semibold transition-colors">Terms of Service</button>
          </div>
        </div>

      </div>

      <PrivacyPolicyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      <TermsOfServiceModal isOpen={termsOpen} onClose={() => setTermsOpen(false)} />
    </footer>
  );
};
