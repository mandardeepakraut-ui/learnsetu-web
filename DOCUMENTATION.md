# LearnSetu Web Application - Technical & Architectural Documentation

> **Official Platform Documentation**  
> **Repository**: [`mandardeepakraut-ui/learnsetu-web`](https://github.com/mandardeepakraut-ui/learnsetu-web.git)  
> **Live Web Application**: [https://learnsetu-web.vercel.app](https://learnsetu-web.vercel.app) | [https://learnsetu.in](https://learnsetu.in)  
> **Organization**: LearnSetu Edutech LLP  

---

## 👨‍💻 1. Leadership & Project Credits ("Who Made It")

### Founder & Chief Executive Officer
- **Sagar Parmar** — *Founder & CEO of LearnSetu*
  - **Background**: Information Technology degree from Mumbai University with over 4+ years of hands-on experience driving startup growth.
  - **Vision**: Founded LearnSetu to empower fresh graduates and career switchers with practical Data Science skills, direction, mindset, and confidence.

### Platform Developer & Lead Data Science Mentor
- **Mandar Raut** — *Platform Engineer & Lead Instructor*
  - **LinkedIn**: [`https://www.linkedin.com/in/mandarraut-datascience/`](https://www.linkedin.com/in/mandarraut-datascience/)
  - **Contact**: `mandarra71@gmail.com` | `+91 85919 28362`
  - **Role**: Designed and implemented the full-stack React frontend architecture, 3D interactive physics components, design system, and deployment pipeline.

---

## 🎨 2. Design System & Aesthetics ("How It Was Made")

The website was built following strict **anti-slop frontend design standards** to create a state-of-the-art, high-converting tech academy interface.

### Palette Tokens
- **Canvas / Background**: `#FAFAFC` (Crisp, clean off-white canvas)
- **Cards / Containers**: `#FFFFFF` (Solid crisp white with subtle `border-slate-200` outlines)
- **Primary Accent**: `#0067FF` (Electric Tech Blue)
- **Hover Accent**: `#0052CC` (Deep Electric Blue)
- **Typography**: `#0F172A` (Slate 900 high-contrast primary text)
- **Secondary Text**: `#475569` (Slate 600 subtle paragraph copy)
- **Success / Hike**: `#059669` (Emerald 600 for salary hikes & verified badges)

### Typography Stack
- **Headlines / Display**: `Outfit` (Font-extrabold, tight tracking)
- **Body Copy**: `Plus Jakarta Sans` / `Inter` (Font-medium, leading-relaxed)
- **Code & Badges**: `JetBrains Mono` (Font-bold, uppercase)

### Official Interactive Logo Design
- **Component**: [`LearnSetuLogo.tsx`](file:///c:/Users/Mandar/OneDrive/Desktop/STITCH/src/components/LearnSetuLogo.tsx)
- **Structure**: Two-tone pill badge with a solid electric blue left half ("Learn"), a crisp white right half ("setu"), tagline *"Bridging you to your next tech job"*, and dynamic liquid light shimmer overlay on hover.

---

## 🧰 3. Installed AI Engineering Skills & Guidelines Used

This project was crafted using specialized agent skills from the repository customization roots:

1. **`design-taste-frontend`**:
   - Enforces 100% theme lock across all pages.
   - Bans lazy AI design defaults (no boring gray backgrounds, no generic gradients).
   - Strict typography contrast rules and layout hierarchy.

2. **`improve-ui`**:
   - Installed via `npx skills add https://github.com/ibelick/ui-skills --skill improve-ui`.
   - Used to audit layout hierarchy, fix contrast issues, and polish interactive component states.

3. **`stitch-design-taste`**:
   - Standardizes semantic design tokens in [`DESIGN.md`](file:///c:/Users/Mandar/OneDrive/Desktop/STITCH/DESIGN.md).

4. **`remotion-best-practices`**, **`remotion-markup`**, **`remotion-interactivity`**:
   - Provides guidelines for hardware-accelerated 3D component animations.

5. **`brandkit`**:
   - Enforces visual identity consistency across banners, badges, and marketing assets.

---

## 🧩 4. Complete Component & Feature Architecture ("All Working of the Web")

The application is structured into modular React components located in `src/components/`:

```
src/
├── assets/
│   ├── companies/          # Official company logo images (TCS, Infosys, Wipro, etc.)
│   └── sagar-parmar-founder.png  # Founder & CEO portrait
├── components/
│   ├── AboutSection.tsx            # Founder story, 3D mouse tilt, Number Speaks metrics
│   ├── BrochureModal.tsx           # Lead capture modal with auto PDF download & confetti
│   ├── CertificatePreview3D.tsx    # Live 3D certificate preview with student name input
│   ├── CourseMatcherQuiz.tsx       # 3-Question eligibility quiz with confetti
│   ├── CourseShowcase.tsx          # 24-Week Master Program package card (₹14,999 / EMI)
│   ├── FaqSection.tsx              # Interactive accordion for FAQs
│   ├── Footer.tsx                  # Comprehensive footer with social links & LinkedIn redirect
│   ├── Hero.tsx                    # Clean hero with 24-week curriculum card & WhatsApp CTA
│   ├── HiringPartners.tsx          # 8-Company logo wall with hover salary hike tooltips
│   ├── InteractiveCalculator3D.tsx # 3D salary hike & 12-month EMI estimator
│   ├── LearnSetuLogo.tsx           # Official interactive pill badge logo
│   ├── MentorshipGrid.tsx          # 1:1 mentorship framework details
│   ├── Navbar.tsx                  # Sticky glassmorphic header with navigation
│   ├── Remotion3DHero.tsx          # Hardware-accelerated 3D background effects
│   ├── TechStack3D.tsx             # Interactive tech stack cards (Python, ML, SQL, Power BI)
│   ├── Testimonials.tsx            # Verified student success stories & salary hikes
│   └── UpcomingPrograms.tsx        # Upcoming courses (Business Analytics, Full Stack AI)
├── App.tsx                         # Main application layout assembler
├── main.tsx                        # React DOM entry point
└── vite-env.d.ts                   # TypeScript declarations for static image assets
```

---

## ⚙️ 5. Detailed Component Working Breakdown

### 1. Header Navigation ([Navbar.tsx](file:///c:/Users/Mandar/OneDrive/Desktop/STITCH/src/components/Navbar.tsx))
- Sticky glassmorphic header (`backdrop-blur-xl bg-white/95`).
- Houses the official interactive `LearnSetuLogo`.
- Provides instant scroll links: `#about` (About Founder), `#master-course` (Master Course), `#estimator` (Salary Estimator), `#syllabi` (Syllabus), `#placement` (Placement Lock), `#faq` (FAQs).
- Direct CTAs: **WhatsApp Mentor** (`+91 85919 28362`) and **Download Brochure**.

### 2. Hero Section ([Hero.tsx](file:///c:/Users/Mandar/OneDrive/Desktop/STITCH/src/components/Hero.tsx))
- **Headline**: Matched font style for `100% Mentored.` using display font `Outfit font-extrabold text-[#0067FF]`.
- **Curriculum Card**: Highlights 4 core modules (Python, ML & AI, SQL, Power BI).
- **Direct Enrollment**: **"Enroll Now"** button opens WhatsApp directly with a pre-filled enrollment message:
  > *"Hi LearnSetu Team, I want to enroll in the Master Program in Data Science & AI (₹14,999 Fee / 12-Month EMI). Please guide me with registration."*

### 3. Top Hiring Partners Logo Wall ([HiringPartners.tsx](file:///c:/Users/Mandar/OneDrive/Desktop/STITCH/src/components/HiringPartners.tsx))
- Displays official logos for 8 top companies: **TCS, Infosys, Wipro, Accenture, Cognizant, Capgemini, IBM, StartTech**.
- **Interactive Tooltip**: Hovering over any logo reveals placement metrics (e.g., `+65% Hike`, `₹6.5 - ₹8.0 LPA`).

### 4. Leadership & Founder Section ([AboutSection.tsx](file:///c:/Users/Mandar/OneDrive/Desktop/STITCH/src/components/AboutSection.tsx))
- **Headline**: *"Leading Online Learning Platform for Data Science Mastery"*
- **Subheading**: *"Transform Your Data Science Career and Secure up to 70% salary hikes with Learnsetu's Expert Guidance."*
- **Founder Profile**: **Sagar Parmar — Founder & CEO**.
  - **3D Perspective Mouse Tilt**: Hovering over Sagar Parmar's portrait rotates the card in 3D (`rotateY`, `rotateX`).
  - **Fluid Liquid Blob Motion**: Pulsing background blob (`animate-pulse-slow`) behind the image.
  - **Verbatim Bio**: Details Sagar Parmar's Information Technology degree from Mumbai University, 4+ years startup experience, and vision for LearnSetu.
- **Number Speaks Impact Cards**:
  - `5+ Awards`
  - `25+ Partners`
  - `500+ Students`

### 5. Interactive 3D Salary & EMI Calculator ([InteractiveCalculator3D.tsx](file:///c:/Users/Mandar/OneDrive/Desktop/STITCH/src/components/InteractiveCalculator3D.tsx))
- Allows users to select their current salary (e.g. ₹4.5 LPA) and experience level.
- Computes projected post-upskilling salary (e.g. ₹7.8 LPA) and hike percentage (+73%).
- Calculates 12-month No-Cost EMI breakdown starting at **₹1,250/month** (for the ₹14,999 fee).

### 6. Master Program Package Showcase ([CourseShowcase.tsx](file:///c:/Users/Mandar/OneDrive/Desktop/STITCH/src/components/CourseShowcase.tsx))
- **Investment**: ₹14,999 Full Fee / ₹1,250/mo No-Cost EMI.
- **Duration**: 24 Weeks (6 Months) with Weekend Live Sessions + Recordings.
- **100% Placement Guarantee Criteria**:
  - Maintain minimum 60% score in assessments.
  - Complete all assigned projects & mock interviews.
  - Maintain at least 80% attendance.
- **CTA**: Direct WhatsApp Enrollment Redirect (`+91 85919 28362`).

### 7. Eligibility Quiz Matcher ([CourseMatcherQuiz.tsx](file:///c:/Users/Mandar/OneDrive/Desktop/STITCH/src/components/CourseMatcherQuiz.tsx))
- Interactive 3-question quiz checking student career goals and time commitment.
- Triggers celebratory confetti (`canvas-confetti`) upon match completion.

### 8. 3D Certificate Generator ([CertificatePreview3D.tsx](file:///c:/Users/Mandar/OneDrive/Desktop/STITCH/src/components/CertificatePreview3D.tsx))
- Interactive certificate preview card tilted in 3D space.
- Features a live name input field allowing students to type their name (defaulting to **Mandar Raut**) to preview their verified certificate.

### 9. PDF Brochure Instant Download Modal ([BrochureModal.tsx](file:///c:/Users/Mandar/OneDrive/Desktop/STITCH/src/components/BrochureModal.tsx))
- Lead capture form collecting First Name, Last Name, Email, and Phone.
- Submitting the form automatically triggers an instant browser download of **`LearnSetu-Data-science-and-ai-Brochure.pdf`** (~78.7 MB) with confetti particles.

### 10. Footer & Signature Credits ([Footer.tsx](file:///c:/Users/Mandar/OneDrive/Desktop/STITCH/src/components/Footer.tsx))
- **Social Media Links**:
  - **Instagram**: [`https://www.instagram.com/learnsetu.in/`](https://www.instagram.com/learnsetu.in/)
  - **LinkedIn**: [`https://www.linkedin.com/company/learnsetu/posts/?feedView=all`](https://www.linkedin.com/company/learnsetu/posts/?feedView=all)
- **Direct Contacts**: WhatsApp `+91 85919 28362`, clickable `mailto:mandarra71@gmail.com`.
- **Signature Line**:
  > *"Copyright © 2025 - 2026 | Learn Setu | All Rights Reserved. Built with ❤️ by [Mandar Raut](https://www.linkedin.com/in/mandarraut-datascience/)"*

---

## 🚀 6. Tech Stack & Deployment Pipeline

### Core Stack
- **Framework**: React 18 + TypeScript + Vite 5
- **Styling**: Tailwind CSS + Vanilla CSS micro-animations
- **Icons**: Lucide React (`lucide-react`)
- **Particle Effects**: Canvas Confetti (`canvas-confetti`)

### Deployment Pipeline
1. **Source Control**: Git + GitHub (`mandardeepakraut-ui/learnsetu-web.git`).
2. **Hosting Platform**: Vercel.
3. **Automated CI/CD**: Pushing to the `main` branch automatically triggers Vercel webhooks, building and deploying updates live in under 60 seconds.

---
*Documentation compiled and maintained for LearnSetu Edutech LLP.*
