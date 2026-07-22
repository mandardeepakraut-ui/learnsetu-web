import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HiringPartners } from './components/HiringPartners';
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
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [brochureOpen, setBrochureOpen] = useState(false);

  const scrollToCourse = () => {
    const el = document.getElementById('master-course');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-[#0F172A] flex flex-col font-body selection:bg-[#0067FF] selection:text-white">
      <Navbar onOpenBrochure={() => setBrochureOpen(true)} />

      <main className="flex-1">
        <Hero
          onOpenBrochure={() => setBrochureOpen(true)}
          onSelectCourse={scrollToCourse}
        />
        <HiringPartners />

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
    </div>
  );
};

export default App;
