# RespireLabs Website — Master Tracking File

> **Project**: smartmouthtape.com
> **Created**: 2026-02-22
> **Spec Reference**: [WEBSITE_SPEC.md](./WEBSITE_SPEC.md)
> **Total Tickets**: 147
> **Epics**: 14

---

## Status Legend

| Status | Meaning |
|---|---|
| `TODO` | Not started |
| `IN PROGRESS` | Actively being worked on |
| `BLOCKED` | Waiting on dependency |
| `IN REVIEW` | Needs review/QA |
| `DONE` | Completed and verified |

## Priority Legend

| Priority | Meaning |
|---|---|
| `P0` | Blocker — must be done first, blocks other work |
| `P1` | Critical — core functionality, needed for launch |
| `P2` | Important — enhances quality, should ship with launch |
| `P3` | Nice to have — can follow shortly after launch |

---

## Summary by Epic

| # | Epic | Tickets | P0 | P1 | P2 | P3 | Status |
|---|---|---|---|---|---|---|---|
| E01 | Project Setup & Tooling | 12 | 7 | 5 | 0 | 0 | TODO |
| E02 | Design System & Tokens | 11 | 3 | 6 | 2 | 0 | TODO |
| E03 | Global Components (Header/Footer/Layout) | 10 | 4 | 4 | 2 | 0 | TODO |
| E04 | Sanity CMS Setup & Schemas | 13 | 3 | 8 | 2 | 0 | TODO |
| E05 | i18n & Language System | 7 | 3 | 3 | 1 | 0 | TODO |
| E06 | Animation & Motion System (GSAP) | 12 | 1 | 5 | 4 | 2 | TODO |
| E07 | Interactive Components (React Islands) | 11 | 0 | 4 | 5 | 2 | TODO |
| E08 | Conversion Funnel (Waitlist) | 10 | 1 | 6 | 2 | 1 | TODO |
| E09 | Core Pages (EN) | 16 | 2 | 12 | 2 | 0 | TODO |
| E10 | German Localization (DE Pages) | 8 | 0 | 6 | 2 | 0 | TODO |
| E11 | Blog System | 7 | 0 | 4 | 2 | 1 | TODO |
| E12 | SEO & LLM Optimization | 13 | 2 | 6 | 3 | 2 | TODO |
| E13 | Analytics, Cookie Consent & Integrations | 8 | 0 | 3 | 3 | 2 | TODO |
| E14 | QA, Performance & Launch | 9 | 2 | 5 | 2 | 0 | TODO |

---

## Epic E01: Project Setup & Tooling

> Foundation: Initialize the Astro project, install dependencies, configure build tools.
> **Blocks**: Everything else. Must be completed first.

| ID | Ticket | Priority | Status | Depends On | Effort |
|---|---|---|---|---|---|
| E01-001 | Initialize Astro 5.x project with pnpm | P0 | TODO | — | S |
| E01-002 | Install and configure @astrojs/react (React 19 islands) | P0 | TODO | E01-001 | S |
| E01-003 | Install and configure Tailwind CSS 4.x (@astrojs/tailwind) | P0 | TODO | E01-001 | S |
| E01-004 | Install and configure TypeScript strict mode + tsconfig | P0 | TODO | E01-001 | S |
| E01-005 | Install GSAP 3.x + ScrollTrigger plugin | P0 | TODO | E01-001 | S |
| E01-006 | Install Sanity v3 + @sanity/client + document-internationalization | P0 | TODO | E01-001 | S |
| E01-007 | Install nanostores + @nanostores/react for shared state | P0 | TODO | E01-001 | S |
| E01-008 | Install React Hook Form for form islands | P1 | TODO | E01-002 | S |
| E01-009 | Configure ESLint + Prettier with Astro plugin | P1 | TODO | E01-001 | S |
| E01-010 | Create .env.example with all environment variable placeholders | P1 | TODO | E01-001 | S |
| E01-011 | Configure netlify.toml for dev deployment | P1 | TODO | E01-001 | S |
| E01-012 | Create .github/workflows/deploy.yml CI/CD pipeline | P1 | TODO | E01-001 | M |

### Acceptance Criteria (E01)
- `pnpm dev` starts Astro dev server without errors
- TypeScript strict mode active, no type errors
- Tailwind utility classes render in browser
- React island renders in an Astro page
- GSAP + ScrollTrigger imports resolve
- Sanity client connects to a project
- Netlify deploy preview works

---

## Epic E02: Design System & Tokens

> Implement the full design token system from WEBSITE_SPEC.md Section 4-6.
> **Blocks**: All visual component work.

| ID | Ticket | Priority | Status | Depends On | Effort |
|---|---|---|---|---|---|
| E02-001 | Configure Tailwind theme extension (colors, spacing, radii, shadows) per spec | P0 | TODO | E01-003 | M |
| E02-002 | Define CSS custom properties for light mode palette | P0 | TODO | E02-001 | S |
| E02-003 | Define CSS custom properties for dark mode palette (deep navy base #0a0f1e) | P0 | TODO | E02-002 | S |
| E02-004 | Convert brand fonts to WOFF2 (Oddval, Montserrat, EB Garamond variable) | P1 | TODO | — | M |
| E02-005 | Create @font-face declarations in src/styles/fonts.css | P1 | TODO | E02-004 | S |
| E02-006 | Configure font preloading in BaseLayout (Oddval + Montserrat) | P1 | TODO | E02-005, E03-001 | S |
| E02-007 | Implement typography scale (type sizes, line heights, letter spacing per spec) | P1 | TODO | E02-001, E02-005 | M |
| E02-008 | Implement heading styles (H1-H4 responsive sizes per spec table) | P1 | TODO | E02-007 | S |
| E02-009 | Create src/styles/global.css (Tailwind directives + base reset) | P1 | TODO | E02-001 | S |
| E02-010 | Copy brand SVG icons into src/assets/icons/ (7 icons from branding/) | P2 | TODO | — | S |
| E02-011 | Copy brand logo variants into src/assets/logos/ | P2 | TODO | — | S |

### Acceptance Criteria (E02)
- All design tokens available as Tailwind classes AND CSS variables
- Dark mode toggleable, all surfaces/text/borders swap correctly
- Fonts render correctly: Oddval for headings, Montserrat for body, EB Garamond for quotes
- No FOUT (Flash of Unstyled Text) — fonts preloaded
- Typography scale responsive (desktop/mobile sizes per spec table)

---

## Epic E03: Global Components (Header, Footer, Layout)

> Site-wide components used on every page.
> **Blocks**: All page work.

| ID | Ticket | Priority | Status | Depends On | Effort |
|---|---|---|---|---|---|
| E03-001 | Build BaseLayout.astro (HTML shell, font loading, head scripts, dark mode init) | P0 | TODO | E02-005 | M |
| E03-002 | Build PageLayout.astro (BaseLayout + Header + Footer + SEOHead + conversion components) | P0 | TODO | E03-001, E03-003, E03-004, E03-005 | M |
| E03-003 | Build Header.astro (nav links, logo, mobile hamburger, slots for DarkMode + Lang toggles) | P0 | TODO | E02-001 | L |
| E03-004 | Build Footer.astro (legal links, medical disclaimer, social icons, copyright) | P0 | TODO | E02-001 | M |
| E03-005 | Build SEOHead.astro (meta tags, OG, hreflang, canonical, JSON-LD injection) | P1 | TODO | E05-001 | M |
| E03-006 | Build DarkModeToggle.tsx (React island, sun/moon icon, nanostore sync) | P1 | TODO | E02-003, E01-007 | M |
| E03-007 | Build LanguageSwitcher.tsx (React island, DE/EN toggle, route mapping) | P1 | TODO | E05-001, E01-007 | M |
| E03-008 | Build LegalLayout.astro (simpler layout for legal pages, no animations/popups) | P1 | TODO | E03-001 | S |
| E03-009 | Build BlogLayout.astro (blog post layout, reading progress bar) | P2 | TODO | E03-002 | M |
| E03-010 | Build SkipToContent.astro (accessibility skip link) | P2 | TODO | E03-001 | S |

### Acceptance Criteria (E03)
- Header responsive: desktop nav + mobile hamburger menu
- Header contains: logo (link to home), nav links, dark mode toggle, language switcher
- Footer contains: legal links (per language), medical disclaimer, social placeholders, copyright
- Dark mode toggle persists in localStorage, no flash on reload
- Language switcher navigates to equivalent page in other language
- All layouts inject correct SEO metadata

### Frontend Design Details (E03)

**Header — Desktop (>1024px)**
```
┌─────────────────────────────────────────────────────────────┐
│  [Logo]   App  Tape  How  Science  Compare  FAQ  Blog  About │ 🌙 DE/EN  [Waitlist CTA] │
└─────────────────────────────────────────────────────────────┘
```
- Logo: `respire-labs-logo_primary-logo.png` (light mode) / `white-on-colour` (dark mode)
- Nav links: font-body (Montserrat), 14px, medium weight, uppercase tracking-wide
- Active link: brand-blue underline (2px, offset 4px)
- Hover: text transitions to primary-500
- Sticky on scroll: backdrop-blur-md, border-bottom, shadow-sm
- Waitlist CTA: primary button (filled blue, white text, radius-md)
- Height: 72px desktop, 56px mobile

**Header — Mobile (<1024px)**
```
┌─────────────────────────┐
│  [Logo]      🌙 DE ☰    │
└─────────────────────────┘
│  Full-screen overlay     │
│  App                     │
│  Smart Mouth Tape        │
│  How it works            │
│  ...                     │
│  [Waitlist CTA button]   │
└─────────────────────────┘
```
- Hamburger icon animates to X (GSAP, 200ms)
- Overlay: full screen, bg-dark or bg-white, links centered, font-display (Oddval), 24px
- Staggered fade-in on open (GSAP, 50ms per item)

**Footer — Layout**
```
┌─────────────────────────────────────────────────────┐
│  [Logo]                                             │
│                                                     │
│  PRODUCT        COMPANY        LEGAL                │
│  App            About          Privacy              │
│  Smart Tape     Press          Terms                │
│  How it works   Contact        Cookies              │
│  Compare        Blog           Data deletion        │
│  FAQ                           Impressum (DE only)  │
│                                                     │
│  ─────────────────────────────────────────────────  │
│  © 2026 RespireLabs                [LI] [YT] [IG]  │
│  Medical disclaimer: RespireLabs is a wellness      │
│  product. Not diagnostic. Not medical.              │
└─────────────────────────────────────────────────────┘
```
- Background: neutral-50 (light) / dark-subtle (dark)
- 3-column grid on desktop, stacked on mobile
- Social icons: LinkedIn, YouTube, Instagram (SVG, 24px)
- Disclaimer: text-xs, text-muted

---

## Epic E04: Sanity CMS Setup & Schemas

> Full Sanity v3 CMS with embedded Studio, all content schemas, i18n plugin.
> **Blocks**: All content-driven pages.

| ID | Ticket | Priority | Status | Depends On | Effort |
|---|---|---|---|---|---|
| E04-001 | Create Sanity project via sanity.io dashboard (get project ID) | P0 | TODO | — | S |
| E04-002 | Configure sanity.config.ts with project ID, dataset, plugins | P0 | TODO | E04-001, E01-006 | M |
| E04-003 | Set up embedded Sanity Studio at /studio route | P0 | TODO | E04-002 | M |
| E04-004 | Define `page` document schema (per spec Section 9) | P1 | TODO | E04-002 | M |
| E04-005 | Define `blogPost` document schema (per spec Section 9) | P1 | TODO | E04-002 | M |
| E04-006 | Define `faqItem` document schema (per spec Section 9) | P1 | TODO | E04-002 | S |
| E04-007 | Define `siteSettings` singleton schema (per spec Section 9) | P1 | TODO | E04-002 | S |
| E04-008 | Define all object schemas: hero, ctaBlock, richText/portableText, seo, featureGrid, splitContent, comparisonTable, statsBar, contentSection, faqSection, blogPreviewSection | P1 | TODO | E04-002 | L |
| E04-009 | Configure @sanity/document-internationalization plugin (DE/EN) | P1 | TODO | E04-004, E04-005, E04-006 | M |
| E04-010 | Build custom Studio desk structure (Pages→EN/DE, Blog→EN/DE, FAQ, Settings) | P1 | TODO | E04-004 | M |
| E04-011 | Create src/lib/sanity.ts (client config + data fetching functions) | P1 | TODO | E04-002 | M |
| E04-012 | Populate Sanity with initial content from readme.md (EN pages) | P2 | TODO | E04-004, E04-008 | L |
| E04-013 | Populate Sanity with initial content from readme.md (DE pages) | P2 | TODO | E04-012, E04-009 | L |

### Acceptance Criteria (E04)
- /studio loads Sanity Studio (password protected)
- All document types visible and createable in Studio
- Language switcher in Studio links EN ↔ DE documents
- Data fetching from Astro pages returns correct content
- Desk structure organized: Pages (EN/DE), Blog (EN/DE), FAQ, Settings

---

## Epic E05: i18n & Language System

> Language detection, routing, and translation infrastructure.
> **Blocks**: All multilingual page rendering.

| ID | Ticket | Priority | Status | Depends On | Effort |
|---|---|---|---|---|---|
| E05-001 | Create src/lib/i18n.ts (language detection, route mapping, helpers) | P0 | TODO | E01-001 | M |
| E05-002 | Build root index.astro (language detection redirect to /en/ or /de/) | P0 | TODO | E05-001 | M |
| E05-003 | Create src/lib/translations/en.json (all static UI strings) | P0 | TODO | — | M |
| E05-004 | Create src/lib/translations/de.json (all static UI strings) | P1 | TODO | E05-003 | M |
| E05-005 | Create src/stores/language.ts (nanostore for current language) | P1 | TODO | E01-007 | S |
| E05-006 | Implement hreflang tag generation in SEOHead.astro | P1 | TODO | E03-005 | S |
| E05-007 | Test language detection with various Accept-Language headers | P2 | TODO | E05-002 | S |

### Acceptance Criteria (E05)
- Visiting / auto-redirects to /de/ for DACH browsers, /en/ for others
- Saved language preference persists across visits (localStorage)
- All static UI text (buttons, nav, form labels, validation) rendered in correct language
- hreflang tags present on all pages for both languages + x-default

---

## Epic E06: Animation & Motion System (GSAP)

> Apple product page style animations, GSAP setup, all motion presets.
> **Can start after**: E01, E02 complete.

| ID | Ticket | Priority | Status | Depends On | Effort |
|---|---|---|---|---|---|
| E06-001 | Create src/lib/animations.ts (GSAP init, ScrollTrigger, all presets from spec) | P0 | TODO | E01-005 | M |
| E06-002 | Create src/styles/gsap.css (base animation styles, will-change hints) | P1 | TODO | E06-001 | S |
| E06-003 | Build ScrollReveal.astro (generic fade-up on scroll wrapper) | P1 | TODO | E06-001 | M |
| E06-004 | Build TextReveal.astro (clip-reveal heading animation) | P1 | TODO | E06-001 | M |
| E06-005 | Build FloatIn.astro (product image float-in with parallax) | P1 | TODO | E06-001 | M |
| E06-006 | Build ParallaxImage.astro (depth parallax for backgrounds) | P1 | TODO | E06-001 | M |
| E06-007 | Implement hero text reveal animation (staggered word/letter clip) | P2 | TODO | E06-004 | L |
| E06-008 | Implement counter animation (numbers count up from 0) | P2 | TODO | E06-001 | M |
| E06-009 | Implement stagger grid animation (cards appear sequentially) | P2 | TODO | E06-003 | S |
| E06-010 | Configure Astro View Transitions (page crossfade 300ms) | P2 | TODO | E01-001 | M |
| E06-011 | Implement dark mode toggle animation (sun/moon icon morph) | P3 | TODO | E03-006, E06-001 | S |
| E06-012 | Implement header scroll animation (backdrop-blur, shadow on sticky) | P3 | TODO | E03-003, E06-001 | S |

### Acceptance Criteria (E06)
- All animations run at 60fps (GPU composited: transform + opacity only)
- ScrollTrigger fires correctly: elements animate once when scrolling into view
- Hero text reveal plays on page load
- View Transitions work between page navigations
- No layout shift caused by animations

### Frontend Design Details (E06)

**Animation Timing Reference**
| Animation | Duration | Ease | Stagger |
|---|---|---|---|
| Fade up | 1000ms | power3.out | — |
| Text reveal | 1200ms | power4.out | 80ms per word |
| Float in | 1000ms | power3.out | — |
| Counter | 1500ms | power2.out | — |
| Card stagger | 800ms | power3.out | 100ms per card |
| Page transition | 300ms | ease | — |
| Parallax | continuous | linear | — |

---

## Epic E07: Interactive Components (React Islands)

> All interactive React components: breathing demo, comparison, FAQ, timeline, sensor explorer.
> **Can start after**: E01, E02, E06 partially complete.

| ID | Ticket | Priority | Status | Depends On | Effort |
|---|---|---|---|---|---|
| E07-001 | Build FAQAccordion.tsx (animated expand/collapse, GSAP height tween, category filter) | P1 | TODO | E06-001 | L |
| E07-002 | Build HowItWorksTimeline.tsx (4-step vertical timeline, SVG line draw, card reveals) | P1 | TODO | E06-001 | L |
| E07-003 | Build BreathingDemo.tsx (circular expand/contract, 4s inhale / 2s hold / 6s exhale) | P1 | TODO | E06-001 | L |
| E07-004 | Build NoseBreathingTimer.tsx (guided nasal exercise, nose icon animation, cycle counter) | P1 | TODO | E07-003 | L |
| E07-005 | Build ComparisonSlider.tsx (interactive table, category filter/highlight, RespireLabs column accent) | P2 | TODO | E06-001 | L |
| E07-006 | Build SensorDiagramExplorer.tsx (schematic diagram, hover/tap sensor areas, info panel) | P2 | TODO | E06-001 | XL |
| E07-007 | Integrate FAQAccordion with Sanity FAQ items (data fetching) | P2 | TODO | E07-001, E04-006 | M |
| E07-008 | Implement breathing demo Matomo event tracking (start/complete) | P2 | TODO | E07-003, E13-001 | S |
| E07-009 | Implement sensor explorer Matomo event tracking (view) | P2 | TODO | E07-006, E13-001 | S |
| E07-010 | Mobile-optimize all interactive components (touch, responsive, bottom sheet for sensor) | P3 | TODO | E07-001 through E07-006 | L |
| E07-011 | Add optional audio cue toggle to BreathingDemo | P3 | TODO | E07-003 | M |

### Acceptance Criteria (E07)
- All React components render inside Astro pages via `client:visible` directive
- FAQ accordion: smooth height animation (no layout jump), category tabs filter items
- Timeline: SVG line draws as user scrolls, step cards animate from alternating sides
- Breathing demo: circle animates on 4s/2s/6s rhythm, shows cycle count and total time
- Nose timer: guided steps with text instructions, configurable 3/5/10 cycles
- Comparison: clicking category highlights row, dims others, RespireLabs column always accented
- Sensor diagram: hover/tap reveals info panel, sensor areas pulse with blue glow
- All components work on mobile (touch interactions, responsive sizing)

### Frontend Design Details (E07)

**BreathingDemo.tsx — Layout**
```
┌───────────────────────────────────┐
│           Try it now              │
│                                   │
│         ┌─────────────┐           │
│         │             │           │
│         │   ○ → ●     │  ← circle expands on inhale
│         │  (brand     │     contracts on exhale
│         │   blue      │     holds on hold
│         │  gradient)  │
│         │             │
│         └─────────────┘           │
│                                   │
│     "Breathe in through           │
│       your nose..."               │
│                                   │
│    Cycle 3 of 5  •  1:24         │
│                                   │
│    [ Start ]  [ Reset ]           │
└───────────────────────────────────┘
```
- Circle: 200px diameter default → 280px on inhale
- Gradient: primary-400 → primary-600 radial
- Phase text: font-serif (EB Garamond), italic, 18px
- Buttons: pill style (radius-full), primary + ghost variants

**SensorDiagramExplorer.tsx — Layout**
```
┌──────────────────────────────────────────────────┐
│                                                  │
│    ┌────────────────────────────┐  ┌──────────┐  │
│    │                            │  │ Sensor:  │  │
│    │   [Abstract tape diagram]  │  │ MEMS Mic │  │
│    │                            │  │          │  │
│    │   ● mic                    │  │ Captures │  │
│    │   ● airflow (L)            │  │ breath   │  │
│    │   ● airflow (R)            │  │ audio... │  │
│    │   ● SpO2                   │  │          │  │
│    │   ● accelerometer          │  │ [glow]   │  │
│    │                            │  └──────────┘  │
│    └────────────────────────────┘                 │
│                                                  │
└──────────────────────────────────────────────────┘
```
- Diagram: SVG line art, schematic style, white stroke on dark section (or dark stroke on light)
- Sensor dots: pulsing brand-blue glow on hover (box-shadow animation)
- Info panel: slides in from right (desktop) or bottom sheet (mobile)
- Panel: surface-raised background, radius-lg, shadow-lg

**HowItWorksTimeline.tsx — Layout**
```
Desktop:                              Mobile:
                                      │
Step 1 ──────────── [icon + text]     ├── Step 1
           │                          │   [icon + text]
           │                          │
[icon + text] ──── Step 2             ├── Step 2
           │                          │   [icon + text]
           │                          │
Step 3 ──────────── [icon + text]     ├── Step 3
           │                          │   [icon + text]
           │                          │
[icon + text] ──── Step 4             ├── Step 4
                                      │   [icon + text]
```
- Connecting line: 2px brand-blue, draws with SVG stroke-dashoffset
- Cards: alternating left/right on desktop, all left-aligned on mobile
- Icons: brand SVG icons (24px), inside a 48px circle with primary-50 bg
- Card: surface background, radius-lg, shadow-md, 16px padding

---

## Epic E08: Conversion Funnel (Waitlist)

> Full funnel: inline forms, sticky bar, exit-intent, slide-in, session tracking.
> **Blocks**: Primary business goal — waitlist signups.

| ID | Ticket | Priority | Status | Depends On | Effort |
|---|---|---|---|---|---|
| E08-001 | Build WaitlistForm.tsx (full form: all fields from spec, React Hook Form validation) | P0 | TODO | E01-008 | L |
| E08-002 | Create src/stores/waitlist.ts (nanostore: shown/dismissed/submitted state) | P1 | TODO | E01-007 | S |
| E08-003 | Build InlineWaitlistCTA.astro (section block: heading + copy + email-only mini form) | P1 | TODO | E08-001 | M |
| E08-004 | Build StickyBar.tsx (bottom bar: one-liner + email input + join button, appears after 30% scroll) | P1 | TODO | E08-002 | M |
| E08-005 | Build ExitIntentPopup.tsx (modal: headline + 3 value props + email form, desktop only) | P1 | TODO | E08-002, E06-001 | L |
| E08-006 | Build SlideInCTA.tsx (bottom-right card: headline + email input, after 60s) | P1 | TODO | E08-002, E06-001 | M |
| E08-007 | Build PostSubmitMessage.astro (animated thank you state, replaces form) | P1 | TODO | E08-001 | S |
| E08-008 | Implement session/localStorage tracking logic (once-per-session popups, permanent hide after submit) | P2 | TODO | E08-002 | M |
| E08-009 | Suppress all conversion popups on /waitlist and /warteliste pages | P2 | TODO | E08-002 | S |
| E08-010 | Implement Matomo custom events for waitlist interactions (view/start/submit/dismiss) | P3 | TODO | E08-001, E13-001 | M |

### Acceptance Criteria (E08)
- Full form validates: email required, interest required, phoneOS required, consent required
- Inline CTA renders at bottom of content sections
- Sticky bar appears after scrolling 30%, dismissible, stays dismissed per session
- Exit-intent fires once per session when cursor moves to browser chrome (desktop)
- Slide-in appears after 60s if no popup shown yet
- All popups hidden permanently after successful form submission
- No popups on /waitlist or /warteliste pages
- Post-submit shows "Thanks — you're on the list" message

### Frontend Design Details (E08)

**StickyBar.tsx**
```
┌──────────────────────────────────────────────────────────────┐
│  Be the first to try RespireLabs   [email@input]  [Join ▸]  ✕ │
└──────────────────────────────────────────────────────────────┘
```
- Position: fixed bottom, full width
- Background: surface-raised, border-top, shadow-lg
- Height: 56px (desktop), 48px (mobile — stacked vertically)
- Z-index: 40 (above content, below modals)
- Enter animation: slide up 56px, 400ms ease
- Dismiss: fade out, mark session as shown

**ExitIntentPopup.tsx**
```
┌─────────────────────────────────────────────┐
│  ┌───────────────────────────────────────┐  │
│  │                                   [✕] │  │
│  │    Don't miss early access            │  │
│  │                                       │  │
│  │    ✓ Be first to test the app         │  │
│  │    ✓ Shape the product with feedback  │  │
│  │    ✓ Get Smart Mouth Tape updates     │  │
│  │                                       │  │
│  │    [email@input____] [Join waitlist]   │  │
│  │                                       │  │
│  │    We respect your privacy.           │  │
│  └───────────────────────────────────────┘  │
│         (backdrop: dark overlay)            │
└─────────────────────────────────────────────┘
```
- Backdrop: rgba(0,0,0,0.5), backdrop-blur-sm
- Modal: max-w-md, surface bg, radius-xl, shadow-xl, padding-8
- Enter: backdrop fades in 200ms, modal scales from 0.95 to 1.0 (GSAP, 300ms)
- Dismiss: click outside, X button, Escape key

---

## Epic E09: Core Pages (EN)

> Build all English pages with section layouts, content, and animations.
> **Blocks**: German pages (E10) are derived from these.

| ID | Ticket | Priority | Status | Depends On | Effort |
|---|---|---|---|---|---|
| E09-001 | Build Homepage /en/ (9 sections: hero, problem, two products, how it works mini, differentiators, mini comparison, stats, FAQ top 3, CTA) | P0 | TODO | E03-002, E04-011, E06-003 | XL |
| E09-002 | Build App page /en/app (8 sections per spec) | P0 | TODO | E03-002, E04-011 | L |
| E09-003 | Build Smart Mouth Tape page /en/smart-mouth-tape (8 sections, sensor diagram) | P1 | TODO | E03-002, E07-006 | L |
| E09-004 | Build How It Works page /en/how-it-works (5 sections, breathing demo) | P1 | TODO | E03-002, E07-002, E07-003 | L |
| E09-005 | Build Science & Safety page /en/science-safety (5 sections, medical disclaimer banner) | P1 | TODO | E03-002 | M |
| E09-006 | Build Compare page /en/compare (5 sections, interactive comparison) | P1 | TODO | E03-002, E07-005 | L |
| E09-007 | Build FAQ page /en/faq (category filter + accordion) | P1 | TODO | E03-002, E07-001 | M |
| E09-008 | Build Waitlist page /en/waitlist (hero + value props + full form) | P1 | TODO | E03-002, E08-001 | M |
| E09-009 | Build Contact page /en/contact (form + direct contacts) | P1 | TODO | E03-002 | M |
| E09-010 | Build About page /en/about (mission, principles, team placeholders) | P1 | TODO | E03-002 | M |
| E09-011 | Build Press page /en/press (boilerplate, media contact, asset links) | P1 | TODO | E03-002 | S |
| E09-012 | Build Facts page /en/facts (LLM-first, clean semantic HTML) | P1 | TODO | E03-002 | S |
| E09-013 | Build Pricing page /en/pricing (simple pre-launch page) | P1 | TODO | E03-002 | S |
| E09-014 | Build Privacy page /en/privacy (LegalLayout) | P2 | TODO | E03-008 | S |
| E09-015 | Build Terms, Cookies, Data Deletion pages /en/ (LegalLayout) | P2 | TODO | E03-008 | M |
| E09-016 | Create /en/facts.md static file (raw markdown for LLM ingestion) | P1 | TODO | E09-012 | S |

### Acceptance Criteria (E09)
- All pages render with correct layout, content from Sanity CMS
- All section animations fire on scroll (fade-up, text reveal, float-in, etc.)
- All interactive components functional (breathing demo, FAQ, timeline, sensor explorer, comparison)
- Medical disclaimer banner visible on relevant pages (app, tape, science)
- All pages pass Lighthouse SEO audit
- All internal links work (no 404s)

### Frontend Design Details (E09)

**Homepage Hero Section**
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                                                             │
│     Smart Mouth Tape               [Abstract schematic      │
│     by RespireLabs                  or breathing visual      │
│                                     — parallax float-in]    │
│     • Detect mouth breathing                                │
│     • Build nasal breathing habits                          │
│     • Privacy-first by design                               │
│     • Start with just your phone                            │
│                                                             │
│     [Join the waitlist]  [How it works →]                   │
│                                                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```
- Hero height: 90vh (desktop), auto (mobile, min 80vh)
- H1: Oddval Bold, 72px desktop / 36px mobile, text-reveal animation
- Quick summary: Montserrat, 18px, bullet list, staggered fade-up
- Primary CTA: filled primary button, large (48px height)
- Secondary CTA: ghost button with arrow
- Visual: abstract/schematic illustration, parallax float-in from right

**Section Template (reusable pattern)**
```
┌─────────────────────────────────────────────┐
│  [Section padding: 96px top/bottom desktop] │
│                                             │
│     Section Heading (H2, text-reveal)       │
│     Subtext (body-large, max-w-narrow)      │
│                                             │
│     [Content area — varies per section]     │
│                                             │
└─────────────────────────────────────────────┘
```
- Max width: 1152px (content), centered
- Section alternating backgrounds: white / neutral-50 (light) or dark-bg / dark-subtle (dark)

---

## Epic E10: German Localization (DE Pages)

> Create all German page variants matching EN structure.
> **Depends on**: E09 (EN pages built first).

| ID | Ticket | Priority | Status | Depends On | Effort |
|---|---|---|---|---|---|
| E10-001 | Build Homepage /de/ (mirror EN structure, DE content from Sanity) | P1 | TODO | E09-001, E04-013 | L |
| E10-002 | Build App page /de/app | P1 | TODO | E09-002 | M |
| E10-003 | Build Smart Mouth Tape page /de/smart-mouth-tape | P1 | TODO | E09-003 | M |
| E10-004 | Build all remaining DE product pages (so-funktionierts, wissenschaft-sicherheit, vergleich, plaene, warteliste, kontakt, faq, ueber-uns, presse, fakten) | P1 | TODO | E09-004 through E09-013 | L |
| E10-005 | Build DE legal pages (datenschutz, agb, cookies, datenloeschung, impressum) | P1 | TODO | E09-014, E09-015 | M |
| E10-006 | Create /de/fakten.md static file (raw markdown for LLM ingestion) | P1 | TODO | E10-004 | S |
| E10-007 | Verify all DE pages have correct hreflang, canonical, and language attributes | P2 | TODO | E10-001 through E10-005 | M |
| E10-008 | Test language switching works correctly between all EN ↔ DE page pairs | P2 | TODO | E10-007 | M |

### Acceptance Criteria (E10)
- Every EN page has a DE equivalent with translated content
- Language switcher navigates to correct DE ↔ EN pair on every page
- All DE pages have `lang="de"` on HTML element
- hreflang tags correct on every DE page
- Form validation messages in German
- All nav/footer/UI strings in German

---

## Epic E11: Blog System

> Blog listing, post template, initial content, Sanity integration.

| ID | Ticket | Priority | Status | Depends On | Effort |
|---|---|---|---|---|---|
| E11-001 | Build blog listing page /en/blog/ (grid of post cards, pagination or load more) | P1 | TODO | E03-002, E04-005 | M |
| E11-002 | Build blog post template [...slug].astro (portable text rendering, reading progress bar) | P1 | TODO | E03-009, E04-005 | L |
| E11-003 | Build BlogPreview.astro section component (3-card preview for homepage/other pages) | P1 | TODO | E04-005 | M |
| E11-004 | Create 3 EN blog posts in Sanity (from readme content) | P1 | TODO | E04-005, E04-012 | M |
| E11-005 | Create 3 DE blog posts in Sanity (from readme content) | P2 | TODO | E11-004, E04-009 | M |
| E11-006 | Build DE blog listing page /de/blog/ | P2 | TODO | E11-001 | S |
| E11-007 | Implement related posts section at bottom of blog posts | P3 | TODO | E11-002 | M |

### Acceptance Criteria (E11)
- Blog listing shows all published posts for the current language
- Post cards: featured image, title, excerpt, date, reading time estimate
- Blog post renders portable text (headings, paragraphs, images, lists, code blocks, links)
- Reading progress bar at top of post page
- Related posts section shows 2-3 related posts

### Frontend Design Details (E11)

**Blog Card**
```
┌─────────────────────────┐
│  [Featured image 16:9]  │
│                         │
│  Feb 22, 2026 • 5 min   │
│                         │
│  Mouth breathing vs     │
│  nasal breathing: what  │
│  it means for sleep...  │
│                         │
│  A practical overview   │
│  of mouth vs nasal...   │
│                         │
│  Read more →            │
└─────────────────────────┘
```
- Card: surface bg, radius-lg, shadow-md, overflow-hidden
- Image: aspect-ratio 16/9, object-cover
- Date + read time: text-sm, text-muted
- Title: font-display (Oddval), text-xl, semibold
- Excerpt: text-sm, text-secondary, line-clamp-3
- Grid: 3 columns desktop, 2 tablet, 1 mobile

---

## Epic E12: SEO & LLM Optimization

> Maximum LLM visibility: llms.txt, schema.org, sitemaps, structured data.

| ID | Ticket | Priority | Status | Depends On | Effort |
|---|---|---|---|---|---|
| E12-001 | Create public/llms.txt (per spec Section 10, smartmouthtape.com domain) | P0 | TODO | — | S |
| E12-002 | Create public/robots.txt (with AI crawler rules per spec) | P0 | TODO | — | S |
| E12-003 | Configure @astrojs/sitemap for auto-generated sitemap.xml | P1 | TODO | E01-001 | S |
| E12-004 | Implement Organization + WebSite JSON-LD on all pages (via SEOHead.astro) | P1 | TODO | E03-005 | M |
| E12-005 | Implement page-specific JSON-LD: MobileApplication (app), Product (tape), FAQPage (faq), Article (blog), BreadcrumbList (all) | P1 | TODO | E12-004 | L |
| E12-006 | Implement FAQ structured data on every page that has FAQ content | P1 | TODO | E12-005 | M |
| E12-007 | Build /api/facts.json.ts endpoint (programmatic machine-readable facts) | P1 | TODO | E01-001 | S |
| E12-008 | Build auto-generated /llms-ctx.txt at build time (concatenate key page content) | P1 | TODO | E12-001 | M |
| E12-009 | Create Open Graph images (1200x630) for EN and DE defaults | P2 | TODO | — | M |
| E12-010 | Configure per-page OG images from Sanity CMS | P2 | TODO | E12-009, E04-008 | S |
| E12-011 | Verify all pages have answer-first formatting (quick summary bullets after H1) | P2 | TODO | E09-001 through E09-016 | M |
| E12-012 | Validate all schema.org with Google Rich Results tester | P3 | TODO | E12-005 | M |
| E12-013 | Submit sitemap to Google Search Console and Bing Webmaster Tools | P3 | TODO | E12-003 | S |

### Acceptance Criteria (E12)
- /llms.txt accessible and contains correct content with smartmouthtape.com URLs
- /robots.txt allows all crawlers including named AI bots
- sitemap.xml auto-generated with all pages
- JSON-LD validates on schema.org validator for all page types
- /api/facts.json returns correct JSON
- /llms-ctx.txt generated at build time
- OG images render correctly in social share previews

---

## Epic E13: Analytics, Cookie Consent & Integrations

> Matomo, cookie bar, Brevo CRM integration.

| ID | Ticket | Priority | Status | Depends On | Effort |
|---|---|---|---|---|---|
| E13-001 | Set up self-hosted Matomo instance | P1 | TODO | — | L |
| E13-002 | Integrate Matomo tracking code in BaseLayout (cookieless mode) | P1 | TODO | E13-001, E03-001 | S |
| E13-003 | Implement all custom Matomo events (waitlist, engagement, navigation per spec) | P1 | TODO | E13-002 | M |
| E13-004 | Build CookieConsent.astro (minimal bottom bar: accept/reject/learn more) | P2 | TODO | E03-001 | M |
| E13-005 | Implement consent state management (localStorage, Matomo cookie toggle) | P2 | TODO | E13-004 | M |
| E13-006 | Set up Brevo account (contact list, attributes, API key, DOI template) | P2 | TODO | — | M |
| E13-007 | Build POST /api/waitlist.ts serverless endpoint (validate → sanitize → Brevo API) | P1 | TODO via E12 | E13-006 | L |
| E13-008 | Build POST /api/contact.ts serverless endpoint (validate → Brevo transactional email) | P2 | TODO | E13-006 | M |

### Acceptance Criteria (E13)
- Matomo tracks pageviews in cookieless mode without consent banner interaction
- Cookie bar shows once, remembers choice, toggles Matomo cookies
- All custom events fire correctly and appear in Matomo dashboard
- Waitlist API: validates, sanitizes, creates Brevo contact, triggers DOI email
- Contact API: sends email to support, confirmation to user

---

## Epic E14: QA, Performance & Launch

> Final quality assurance, performance optimization, launch checklist.

| ID | Ticket | Priority | Status | Depends On | Effort |
|---|---|---|---|---|---|
| E14-001 | Cross-browser testing (Chrome, Firefox, Safari, Edge — latest) | P0 | TODO | E09, E10 | L |
| E14-002 | Mobile testing (iOS Safari, Chrome Android — responsive + touch) | P0 | TODO | E09, E10 | L |
| E14-003 | Dark mode visual audit on all pages | P1 | TODO | E09, E10 | M |
| E14-004 | Lighthouse audit — target 95+ performance on all pages | P1 | TODO | E09, E10 | M |
| E14-005 | Accessibility audit (axe DevTools, keyboard nav, screen reader spot check) | P1 | TODO | E09, E10 | M |
| E14-006 | Link checking — no broken internal or external links | P1 | TODO | E09, E10, E11 | S |
| E14-007 | Schema.org validation (all JSON-LD passes Google Rich Results tester) | P1 | TODO | E12-005 | M |
| E14-008 | Configure production DNS for smartmouthtape.com | P2 | TODO | — | M |
| E14-009 | Production deployment + SSL verification + Matomo verification | P2 | TODO | E14-008 | M |

### Acceptance Criteria (E14)
- No visual regressions in any browser
- All pages score 95+ on Lighthouse Performance
- All interactive components work on touch devices
- Dark mode renders correctly on every page
- Zero broken links
- All structured data validates
- Production site live on smartmouthtape.com with HTTPS

---

## Dependency Graph (Critical Path)

```
E01 (Setup) ─┬─→ E02 (Design Tokens) ─┬─→ E03 (Global Components) ─┬─→ E09 (EN Pages) ─→ E10 (DE Pages)
              │                         │                            │
              ├─→ E04 (Sanity CMS) ─────┘                            ├─→ E11 (Blog)
              │                                                      │
              ├─→ E05 (i18n) ───────────────────────────────────────→┘
              │
              ├─→ E06 (Animations) ─→ E07 (Interactive Components)
              │
              └─→ E08 (Conversion) ──────────────────────────────────→ E13 (Analytics/CRM)
                                                                       │
                                                                       └─→ E14 (QA/Launch)
              E12 (SEO/LLM) can start early and continues through launch
```

**Critical path**: E01 → E02 → E03 → E09 → E10 → E14

**Parallelizable work**:
- E04 (Sanity) can run in parallel with E02 (Design Tokens)
- E06 (Animations) can run in parallel with E04 (Sanity)
- E07 (Interactive) can start once E06 is partially done
- E08 (Conversion) can run in parallel with E09 (Pages)
- E12 (SEO) can start very early (llms.txt, robots.txt) and continues throughout

---

## Effort Legend

| Size | Meaning | Approximate Hours |
|---|---|---|
| S | Small | 1-2 hours |
| M | Medium | 3-5 hours |
| L | Large | 6-12 hours |
| XL | Extra Large | 13-20+ hours |

---

## Image & Asset Production Tickets

These are not code tickets but creative/production work needed alongside development.

| ID | Asset | Needed For | Status |
|---|---|---|---|
| A-001 | Homepage hero visual (abstract breathing/wellness illustration) | E09-001 | TODO |
| A-002 | App phone mockup (2-3 screens showing app UI concept) | E09-002 | TODO |
| A-003 | Smart Mouth Tape schematic diagram (SVG line art for sensor explorer) | E07-006, E09-003 | TODO |
| A-004 | Open Graph image — EN (1200x630) | E12-009 | TODO |
| A-005 | Open Graph image — DE (1200x630) | E12-009 | TODO |
| A-006 | Blog post featured images (3 per language, 1200x675 16:9) | E11-004, E11-005 | TODO |
| A-007 | Favicon.ico + favicon.svg (from brand lung symbol) | E03-001 | TODO |
| A-008 | Apple touch icon (180x180 PNG from brand symbol) | E03-001 | TODO |
| A-009 | Convert brand fonts to WOFF2 (3 font families, variable) | E02-004 | TODO |
| A-010 | Team headshots for About page | E09-010 | TODO (placeholder OK) |

---

*End of Master Tracking File. Reference WEBSITE_SPEC.md for detailed implementation specs per ticket.*
