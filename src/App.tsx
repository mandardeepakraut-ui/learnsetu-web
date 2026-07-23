import React, { useState, useEffect } from 'react';
import { SettingsProvider, useSettings } from './context/SettingsContext';
import { SeoHead } from './components/SeoHead';
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
import { useRealtimePresence } from './hooks/useRealtimePresence';
import { AdminVisitorDashboard } from './components/AdminVisitorDashboard';

import { AdminUser, DEFAULT_ADMIN_USERS } from './lib/supabase';

const MainSiteContent: React.FC = () => {
  const [brochureOpen, setBrochureOpen] = useState(false);
  const [isAdminView, setIsAdminView] = useState<boolean>(() => {
    return window.location.hash === '#admin' || window.location.pathname === '/admin';
  });
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser>(DEFAULT_ADMIN_USERS[0]);
  const [isVisitorDashboardOpen, setIsVisitorDashboardOpen] = useState(false);

  // Initialize Real-time Presence tracking
  const { onlineUsers, onlineCount } = useRealtimePresence();

  useEffect(() => {
    const checkAdminHash = () => {
      if (window.location.hash === '#admin' || window.location.pathname === '/admin') {
        setIsAdminView(true);
      } else {
        setIsAdminView(false);
      }
    };
    checkAdminHash();
    window.addEventListener('hashchange', checkAdminHash);
    return () => window.removeEventListener('hashchange', checkAdminHash);
  }, []);

  // Hotkey listener for Admin Visitor Analytics (Ctrl + Shift + V)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'v') {
        e.preventDefault();
        setIsVisitorDashboardOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToCourse = () => {
    const el = document.getElementById('master-course');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isAdminView) {
    if (!isAdminAuthenticated) {
      return (
        <AdminLogin
          onLoginSuccess={(adminUser) => {
            setCurrentAdmin(adminUser);
            setIsAdminAuthenticated(true);
          }}
        />
      );
    }
    return (
      <AdminDashboard
        onLogout={() => {
          setIsAdminAuthenticated(false);
          setIsAdminView(false);
          window.location.hash = '';
        }}
        onlineUsers={onlineUsers}
        onlineCount={onlineCount}
        currentAdmin={currentAdmin}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-[#0F172A] flex flex-col font-body selection:bg-[#0067FF] selection:text-white">
      <SeoHead />
      <Navbar
        onOpenBrochure={() => setBrochureOpen(true)}
        onlineCount={onlineCount}
        onOpenDashboard={() => setIsVisitorDashboardOpen(true)}
      />

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

      <Footer onOpenDashboard={() => setIsVisitorDashboardOpen(true)} />

      <BrochureModal
        isOpen={brochureOpen}
        onClose={() => setBrochureOpen(false)}
      />

      <AdminVisitorDashboard
        isOpen={isVisitorDashboardOpen}
        onClose={() => setIsVisitorDashboardOpen(false)}
        onlineUsers={onlineUsers}
        onlineCount={onlineCount}
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
