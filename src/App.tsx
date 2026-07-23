import React, { useState, useEffect } from 'react';
import { SettingsProvider, useSettings } from './context/SettingsContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HiringPartners } from './components/HiringPartners';
import { AboutSection } from './components/AboutSection';
import { CourseShowcase } from './components/CourseShowcase';
import { InteractiveCalculator3D } from './components/InteractiveCalculator3D';
import { TechStack3D } from './components/TechStack3D';
import { CourseMatcherQuiz } from './components/CourseMatcherQuiz';
import { CertificatePreview3D } from './components/CertificatePreview3D';
import { UpcomingPrograms } from './components/UpcomingPrograms';
import { MentorshipGrid } from './components/MentorshipGrid';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { BrochureModal } from './components/BrochureModal';
import { WebinarPopupModal } from './components/WebinarPopupModal';
import { Footer } from './components/Footer';
import { AdminLogin } from './admin/AdminLogin';
import { AdminDashboard } from './admin/AdminDashboard';

const MainSiteContent: React.FC = () => {
  const [brochureOpen, setBrochureOpen] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    const checkAdminHash = () => {
      if (window.location.hash === '#admin' || window.location.pathname === '/admin') {
        setIsAdminView(true);
      }
    };
    checkAdminHash();
    window.addEventListener('hashchange', checkAdminHash);
    return () => window.removeEventListener('hashchange', checkAdminHash);
  }, []);

  const scrollToCourse = () => {
    const el = document.getElementById('master-course');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isAdminView) {
    if (!isAdminAuthenticated) {
      return <AdminLogin onLoginSuccess={() => setIsAdminAuthenticated(true)} />;
    }
    return (
      <AdminDashboard
        onLogout={() => {
          setIsAdminAuthenticated(false);
          setIsAdminView(false);
          window.location.hash = '';
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-[#0F172A] flex flex-col font-body selection:bg-[#0067FF] selection:text-white">
      <Navbar onOpenBrochure={() => setBrochureOpen(true)} />

      <main className="flex-1">
        <Hero
          onOpenBrochure={() => setBrochureOpen(true)}
          onSelectCourse={scrollToCourse}
        />
        
        <HiringPartners />

        <AboutSection />

        <div id="estimator">
          <InteractiveCalculator3D onOpenBrochure={() => setBrochureOpen(true)} />
        </div>

        <CourseShowcase
          onOpenBrochure={() => setBrochureOpen(true)}
          onSelectCourse={scrollToCourse}
        />

        <TechStack3D />

        <MentorshipGrid />

        <CourseMatcherQuiz
          onOpenBrochure={() => setBrochureOpen(true)}
          onSelectCourse={scrollToCourse}
        />

        <CertificatePreview3D />

        <UpcomingPrograms onOpenBrochure={() => setBrochureOpen(true)} />

        <Testimonials />

        <FaqSection />
      </main>

      <Footer />

      <BrochureModal
        isOpen={brochureOpen}
        onClose={() => setBrochureOpen(false)}
      />

      <WebinarPopupModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <SettingsProvider>
      <MainSiteContent />
    </SettingsProvider>
  );
};

export default App;
