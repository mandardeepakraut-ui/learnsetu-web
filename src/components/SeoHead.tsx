import React, { useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';

export const SeoHead: React.FC = () => {
  const { settings } = useSettings();

  useEffect(() => {
    // 1. Dynamic Document Title
    const title = `LearnSetu | Master Program in Data Science & AI (${settings.course_fee})`;
    document.title = title;

    // 2. Meta Tags Helper
    const setMetaTag = (nameAttr: string, nameValue: string, content: string) => {
      let element = document.querySelector(`meta[${nameAttr}="${nameValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(nameAttr, nameValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const description = `Transform your career with LearnSetu's 24-Week Master Program in Data Science & AI. Fee: ${settings.course_fee} (${settings.emi_monthly}). 1:1 Industry Mentorship & 100% Placement Assistance.`;

    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', 'Data Science course, AI Engineer roadmap, LearnSetu Data Science, Machine Learning mentorship, Python SQL Power BI training India');
    setMetaTag('name', 'author', 'LearnSetu Edutech LLP');

    // 3. OpenGraph Social Card Preview Tags (WhatsApp / LinkedIn / Twitter)
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:url', window.location.href);
    setMetaTag('property', 'og:site_name', 'LearnSetu Edutech LLP');

    // 4. Inject JSON-LD Schema.org Structured Data
    const courseSchema = {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "Master Program in Data Science & AI",
      "description": description,
      "provider": {
        "@type": "EducationalOrganization",
        "name": "LearnSetu Edutech LLP",
        "sameAs": "https://www.linkedin.com/company/learnsetu/"
      },
      "offers": {
        "@type": "Offer",
        "category": "Paid",
        "price": settings.course_fee.replace(/\D/g, '') || "14999",
        "priceCurrency": "INR"
      },
      "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": "Online Live Weekend Sessions",
        "duration": "P24W"
      }
    };

    let script = document.getElementById('jsonld-course-schema') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'jsonld-course-schema';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(courseSchema);
  }, [settings]);

  return null;
};
