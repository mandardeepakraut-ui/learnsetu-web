# Design Plan: LearnSetu UI Refinement & Design System Conformance

## Design language
- **Audited surface:** LearnSetu Landing Surface (`src/App.tsx`, `src/components/*`)
- **Design sources:** [DESIGN.md](file:///c:/Users/Mandar/OneDrive/Desktop/STITCH/DESIGN.md)
- **Documented decisions:** Dark Tech Canvas (`#080B11`), Elevated Surface (`#0F172A`), Electric Blue Accent (`#0067FF`), Cyan Highlight (`#38BDF8`), Outfit/Plus Jakarta Sans/JetBrains Mono typography stack.
- **Governing owners:** `tailwind.config.js`, `src/index.css`.
- **Explicit exceptions:** None documented.

---

## Audit Findings & Proposed Improvements

| # | Property / Component | Evidence | Proposed Change | Scope | Confidence |
|---|---|---|---|---|---|
| 1 | **Glassmorphism Backdrop & Modal Depth** | `BrochureModal.tsx` uses standard dark background overlay. `DESIGN.md` section 4 & 5 requires layered glass elevation (`backdrop-blur-[#0F172A]/80`) and glowing focus rings. | Refine `BrochureModal.tsx` with enhanced glass border, `#38BDF8` focus glow rings, and responsive touch targets. | `src/components/BrochureModal.tsx` | High |
| 2 | **Interactive Card Hover State Consistency** | Components (`UpcomingPrograms.tsx`, `MentorshipGrid.tsx`, `Testimonials.tsx`) have slight variance in border hover highlights. | Standardize all card wrappers to use `rounded-3xl`, `glass-panel` background tokens, and `#38BDF8` glow highlights. | `src/components/*` | High |
| 3 | **Hero 3D Canvas Canvas Resolution** | `Remotion3DHero.tsx` canvas scaling can look slightly pixelated on high-DPI (Retina) displays. | Implement device pixel ratio (`window.devicePixelRatio`) scaling for crisp vector 3D particle rendering. | `src/components/Remotion3DHero.tsx` | High |

---

## Execution Plan
1. Update `Remotion3DHero.tsx` to add High-DPI canvas DPR scaling for crisp 3D neural node rendering.
2. Refine `BrochureModal.tsx` for elevated glassmorphism depth, input contrast, and tactile focus states.
3. Verify production build via `npm run build`.
