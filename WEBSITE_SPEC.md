# RespireLabs Website — Full Technical Specification

> **Created**: 2026-02-21
> **Domain**: smartmouthtape.com
> **Status**: Pre-Build Specification
> **Quality Target**: Premium (no rush, Apple-level polish)

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Technology Stack](#2-technology-stack)
3. [Project Structure](#3-project-structure)
4. [Design Tokens & Brand System](#4-design-tokens--brand-system)
5. [Dark Mode System](#5-dark-mode-system)
6. [Typography System](#6-typography-system)
7. [Animation & Motion System](#7-animation--motion-system)
8. [i18n (Internationalization)](#8-i18n-internationalization)
9. [Sanity CMS Architecture](#9-sanity-cms-architecture)
10. [SEO & LLM Visibility](#10-seo--llm-visibility)
11. [Conversion System (Waitlist Funnel)](#11-conversion-system-waitlist-funnel)
12. [Form & API Architecture](#12-form--api-architecture)
13. [Analytics (Matomo)](#13-analytics-matomo)
14. [Cookie Consent](#14-cookie-consent)
15. [Interactive Components](#15-interactive-components)
16. [Page-by-Page Specifications](#16-page-by-page-specifications)
17. [Image & Asset Requirements](#17-image--asset-requirements)
18. [Hosting & Deployment](#18-hosting--deployment)
19. [Performance Budgets](#19-performance-budgets)
20. [Accessibility](#20-accessibility)
21. [Build Phases & Checklist](#21-build-phases--checklist)

---

## 1. Executive Summary

### What We're Building
A premium, bilingual (DE + EN) marketing website for **RespireLabs** — a privacy-first breathing coach (mobile app + Smart Mouth Tape wearable concept). The site lives on **smartmouthtape.com** and serves as the primary conversion funnel for waitlist signups targeting the DACH (Germany/Austria/Switzerland) market with an English version for global reach.

### Key Decisions Summary

| Decision | Choice |
|---|---|
| Framework | Astro + React islands |
| Styling | Tailwind CSS |
| Animation | GSAP + ScrollTrigger (Apple product page style) |
| CMS | Sanity (full content, embedded Studio) |
| CRM / Email | Brevo (via serverless proxy + built-in transactional) |
| Analytics | Matomo (self-hosted) |
| Domain | smartmouthtape.com (non-www) |
| i18n | Auto-detect + toggle (DE default for DACH) |
| Dark mode | System-detected + manual toggle |
| Primary CTA | Waitlist signup (full funnel) |
| Conversion UX | Inline + sticky bar + exit-intent + slide-in (once/session) |
| LLM SEO | Maximum optimization |
| Launch scope | All ~20 pages x 2 languages |
| Interactive | Breathing demo, comparison slider, FAQ accordion, timeline, sensor explorer |
| Quality bar | Premium — no compromises |

### Domain & Brand Note
The domain is **smartmouthtape.com** (emphasizing the hardware product), while the brand is **RespireLabs** (broader ecosystem). The homepage uses a hybrid approach: Smart Mouth Tape leads the hero section (matching the domain), then introduces the broader RespireLabs app + coaching ecosystem below.

---

## 2. Technology Stack

### Core Framework
```
Framework:        Astro 5.x (static-first, island architecture)
UI Islands:       React 19 (for interactive components only)
Styling:          Tailwind CSS 4.x
Animation:        GSAP 3.x + ScrollTrigger plugin
CMS:              Sanity v3 + @sanity/document-internationalization
Forms:            React Hook Form (in React islands)
```

### Infrastructure & Services
```
Hosting (dev):    Netlify (free tier)
Hosting (prod):   Host-agnostic static deploy (decision deferred)
CRM:              Brevo (API integration via serverless proxy)
Transactional:    Brevo built-in transactional email
Analytics:        Matomo (self-hosted)
Spam protection:  Deferred (add when needed)
DNS:              smartmouthtape.com (non-www canonical)
```

### Build Tooling
```
Package manager:  pnpm
Build:            Astro build (static output)
Linting:          ESLint + Prettier
Type checking:    TypeScript strict
Image handling:   Astro Image (sharp, avif/webp)
Font loading:     Self-hosted variable fonts (Oddval, Montserrat, EB Garamond)
```

### Key Dependencies
```json
{
  "astro": "^5.x",
  "@astrojs/react": "^4.x",
  "@astrojs/tailwind": "^6.x",
  "@astrojs/sitemap": "^4.x",
  "@astrojs/mdx": "^4.x",
  "@sanity/client": "^6.x",
  "@sanity/document-internationalization": "^3.x",
  "sanity": "^3.x",
  "gsap": "^3.12.x",
  "react": "^19.x",
  "react-dom": "^19.x",
  "react-hook-form": "^7.x",
  "nanostores": "^0.11.x",
  "@nanostores/react": "^0.8.x"
}
```

### Why Astro + React Islands (Not Next.js)
- **Zero JS by default**: Pages ship as pure HTML/CSS. Only interactive islands (forms, language switcher, breathing demo) load React.
- **Best Core Web Vitals**: Static HTML is fastest for LCP, FID, CLS.
- **LLM crawlability**: Clean semantic HTML without hydration artifacts. Ideal for ChatGPT, Gemini, and AI Overview ingestion.
- **Astro Content Collections**: Maps directly to the readme's MDX page structure.
- **Sanity integration**: Official `@sanity/astro` adapter. Fetches at build time for static pages.
- **GSAP compatibility**: GSAP loads as a client-side script, unaffected by framework choice.
- **React islands**: Forms, language switcher, breathing demo, dark mode toggle, and other interactive components use React. Best of both worlds.

---

## 3. Project Structure

```
smartmouthtape.com/
├── astro.config.mjs              # Astro configuration
├── sanity.config.ts              # Sanity Studio configuration
├── tailwind.config.mjs           # Tailwind + design tokens
├── tsconfig.json                 # TypeScript config
├── package.json
├── .env.example                  # Environment variables template
│
├── public/
│   ├── llms.txt                  # LLM discovery file
│   ├── llms-ctx.txt              # Auto-generated LLM context
│   ├── robots.txt                # Crawler directives
│   ├── favicon.ico
│   ├── favicon.svg               # Brand lung symbol
│   ├── apple-touch-icon.png
│   ├── og-image-en.png           # Open Graph default (EN)
│   ├── og-image-de.png           # Open Graph default (DE)
│   └── fonts/
│       ├── Oddval-Variable.woff2
│       ├── Montserrat-Variable.woff2
│       ├── Montserrat-Italic-Variable.woff2
│       ├── EBGaramond-Variable.woff2
│       └── EBGaramond-Italic-Variable.woff2
│
├── src/
│   ├── assets/                   # Processed images (Astro Image)
│   │   ├── icons/                # Brand SVG icons
│   │   │   ├── nose.svg
│   │   │   ├── mouth.svg
│   │   │   ├── tape.svg
│   │   │   ├── sleep.svg
│   │   │   ├── bad-sleep.svg
│   │   │   ├── microphone.svg
│   │   │   └── monitor.svg
│   │   ├── logos/                # Brand logos (all variants)
│   │   └── images/               # Page images, mockups, photos
│   │
│   ├── components/
│   │   ├── global/               # Site-wide components
│   │   │   ├── Header.astro          # Navigation + language switch + dark mode
│   │   │   ├── Footer.astro          # Footer with legal links + disclaimer
│   │   │   ├── SEOHead.astro         # Meta, OG, hreflang, JSON-LD
│   │   │   ├── CookieConsent.astro   # GDPR cookie bar
│   │   │   ├── LanguageSwitcher.tsx  # React island
│   │   │   ├── DarkModeToggle.tsx    # React island
│   │   │   └── SkipToContent.astro   # Accessibility
│   │   │
│   │   ├── conversion/           # Waitlist funnel components
│   │   │   ├── WaitlistForm.tsx      # React island — main form
│   │   │   ├── InlineWaitlistCTA.astro  # Inline CTA blocks
│   │   │   ├── StickyBar.tsx         # React island — bottom sticky bar
│   │   │   ├── ExitIntentPopup.tsx   # React island — exit-intent modal
│   │   │   ├── SlideInCTA.tsx        # React island — timed slide-in
│   │   │   └── PostSubmitMessage.astro  # Thank you state
│   │   │
│   │   ├── interactive/          # Interactive experience components
│   │   │   ├── BreathingDemo.tsx     # React island — breathing exercise
│   │   │   ├── NoseBreathingTimer.tsx # React island — nasal exercise timer
│   │   │   ├── ComparisonSlider.tsx  # React island — product comparison
│   │   │   ├── FAQAccordion.tsx      # React island — animated FAQ
│   │   │   ├── HowItWorksTimeline.tsx # React island — interactive steps
│   │   │   └── SensorDiagramExplorer.tsx # React island — hardware explorer
│   │   │
│   │   ├── sections/             # Page section components
│   │   │   ├── HeroHome.astro        # Homepage hero (tape-first)
│   │   │   ├── HeroProduct.astro     # Product page hero template
│   │   │   ├── FeatureGrid.astro     # Feature cards grid
│   │   │   ├── SplitContent.astro    # Text + image/visual split
│   │   │   ├── ComparisonTable.astro # Static comparison table
│   │   │   ├── TestimonialCarousel.astro
│   │   │   ├── StatsBar.astro        # Key metrics/numbers
│   │   │   ├── CTASection.astro      # Full-width CTA block
│   │   │   └── BlogPreview.astro     # Blog post cards
│   │   │
│   │   ├── ui/                   # Primitive UI components
│   │   │   ├── Button.astro
│   │   │   ├── Badge.astro
│   │   │   ├── Card.astro
│   │   │   ├── Input.astro
│   │   │   ├── Select.astro
│   │   │   ├── Checkbox.astro
│   │   │   ├── Container.astro       # Max-width wrapper
│   │   │   ├── Section.astro         # Padded section wrapper
│   │   │   └── Divider.astro
│   │   │
│   │   └── animation/            # GSAP animation wrappers
│   │       ├── ScrollReveal.astro    # Fade-in on scroll
│   │       ├── ParallaxImage.astro   # Parallax scroll effect
│   │       ├── TextReveal.astro      # Large text reveal on scroll
│   │       ├── FloatIn.astro         # Product image float-in
│   │       └── gsap-init.ts          # GSAP + ScrollTrigger setup
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro      # HTML shell, fonts, global scripts
│   │   ├── PageLayout.astro      # Standard page (header + footer + SEO)
│   │   ├── BlogLayout.astro      # Blog post layout
│   │   └── LegalLayout.astro     # Legal pages (simpler, no animations)
│   │
│   ├── pages/
│   │   ├── en/
│   │   │   ├── index.astro           # Home (EN)
│   │   │   ├── app.astro
│   │   │   ├── smart-mouth-tape.astro
│   │   │   ├── how-it-works.astro
│   │   │   ├── science-safety.astro
│   │   │   ├── compare.astro
│   │   │   ├── pricing.astro
│   │   │   ├── waitlist.astro
│   │   │   ├── contact.astro
│   │   │   ├── faq.astro
│   │   │   ├── about.astro
│   │   │   ├── press.astro
│   │   │   ├── facts.astro
│   │   │   ├── facts.md              # .md version for LLM ingestion
│   │   │   ├── privacy.astro
│   │   │   ├── terms.astro
│   │   │   ├── cookies.astro
│   │   │   ├── data-deletion.astro
│   │   │   └── blog/
│   │   │       ├── index.astro       # Blog listing
│   │   │       └── [...slug].astro   # Dynamic blog post
│   │   │
│   │   ├── de/
│   │   │   ├── index.astro           # Home (DE)
│   │   │   ├── app.astro
│   │   │   ├── smart-mouth-tape.astro
│   │   │   ├── so-funktionierts.astro
│   │   │   ├── wissenschaft-sicherheit.astro
│   │   │   ├── vergleich.astro
│   │   │   ├── plaene.astro
│   │   │   ├── warteliste.astro
│   │   │   ├── kontakt.astro
│   │   │   ├── faq.astro
│   │   │   ├── ueber-uns.astro
│   │   │   ├── presse.astro
│   │   │   ├── fakten.astro
│   │   │   ├── fakten.md             # .md version for LLM ingestion
│   │   │   ├── datenschutz.astro
│   │   │   ├── agb.astro
│   │   │   ├── cookies.astro
│   │   │   ├── datenloeschung.astro
│   │   │   ├── impressum.astro
│   │   │   └── blog/
│   │   │       ├── index.astro
│   │   │       └── [...slug].astro
│   │   │
│   │   ├── index.astro               # Root redirect (language detection)
│   │   ├── api/
│   │   │   ├── waitlist.ts           # Serverless: waitlist → Brevo
│   │   │   ├── contact.ts            # Serverless: contact form
│   │   │   └── facts.json.ts         # Programmatic facts endpoint
│   │   │
│   │   └── studio/
│   │       └── [...index].astro      # Sanity Studio (embedded)
│   │
│   ├── lib/
│   │   ├── sanity.ts             # Sanity client configuration
│   │   ├── brevo.ts              # Brevo API wrapper
│   │   ├── i18n.ts               # Language detection + routing helpers
│   │   ├── animations.ts         # GSAP animation presets
│   │   └── utils.ts              # Shared utilities
│   │
│   ├── stores/                   # Nanostores (shared state across islands)
│   │   ├── theme.ts              # Dark mode state
│   │   ├── language.ts           # Current language
│   │   └── waitlist.ts           # Waitlist popup state (shown/dismissed)
│   │
│   ├── sanity/                   # Sanity Studio schemas
│   │   ├── schemas/
│   │   │   ├── documents/
│   │   │   │   ├── page.ts       # Generic page schema
│   │   │   │   ├── blogPost.ts   # Blog post schema
│   │   │   │   ├── faqItem.ts    # FAQ question/answer
│   │   │   │   ├── feature.ts    # Feature cards
│   │   │   │   └── siteSettings.ts # Global settings
│   │   │   ├── objects/
│   │   │   │   ├── hero.ts       # Hero section block
│   │   │   │   ├── ctaBlock.ts   # CTA section block
│   │   │   │   ├── richText.ts   # Portable text
│   │   │   │   ├── seo.ts        # SEO metadata
│   │   │   │   └── localizedString.ts # i18n string type
│   │   │   └── index.ts          # Schema registry
│   │   └── desk/
│   │       └── structure.ts      # Studio desk structure
│   │
│   └── styles/
│       ├── global.css            # Tailwind directives + global styles
│       ├── fonts.css             # @font-face declarations
│       └── gsap.css              # GSAP animation base styles
│
├── netlify.toml                  # Netlify config (dev/staging)
└── .github/
    └── workflows/
        └── deploy.yml            # CI/CD pipeline
```

---

## 4. Design Tokens & Brand System

### Color Palette

#### Light Mode (Primary)
```css
:root {
  /* Brand Primary */
  --color-primary-50:  #eef0fe;   /* Lightest tint */
  --color-primary-100: #d4d8fd;
  --color-primary-200: #a9b1fb;
  --color-primary-300: #7e8af9;
  --color-primary-400: #5b6cf6;
  --color-primary-500: #3d50f4;   /* Brand blue — from icons SVG */
  --color-primary-600: #3144d0;
  --color-primary-700: #2536a8;
  --color-primary-800: #1a2880;
  --color-primary-900: #101a58;
  --color-primary-950: #080e30;

  /* Neutral (warm-shifted for wellness feel) */
  --color-neutral-0:   #ffffff;
  --color-neutral-50:  #f8f9fb;
  --color-neutral-100: #f1f3f6;
  --color-neutral-200: #e2e5eb;
  --color-neutral-300: #c8cdd6;
  --color-neutral-400: #9ba3b1;
  --color-neutral-500: #6e788a;
  --color-neutral-600: #4f5768;
  --color-neutral-700: #3a4050;
  --color-neutral-800: #272c38;
  --color-neutral-900: #181c25;
  --color-neutral-950: #0c0e14;

  /* Semantic */
  --color-success:     #22c55e;
  --color-warning:     #f59e0b;
  --color-error:       #ef4444;
  --color-info:        var(--color-primary-500);

  /* Surface (light mode) */
  --color-bg:          var(--color-neutral-0);
  --color-bg-subtle:   var(--color-neutral-50);
  --color-bg-muted:    var(--color-neutral-100);
  --color-surface:     var(--color-neutral-0);
  --color-surface-raised: var(--color-neutral-50);
  --color-border:      var(--color-neutral-200);
  --color-border-subtle: var(--color-neutral-100);

  /* Text (light mode) */
  --color-text:        var(--color-neutral-900);
  --color-text-secondary: var(--color-neutral-600);
  --color-text-muted:  var(--color-neutral-400);
  --color-text-on-primary: var(--color-neutral-0);
}
```

#### Dark Mode Palette
```css
[data-theme="dark"] {
  /* Surface (dark mode) — deep navy base, not pure black */
  --color-bg:          #0a0f1e;
  --color-bg-subtle:   #111827;
  --color-bg-muted:    #1a2035;
  --color-surface:     #141a2e;
  --color-surface-raised: #1e2642;
  --color-border:      #2a3350;
  --color-border-subtle: #1e2642;

  /* Text (dark mode) */
  --color-text:        #f1f3f6;
  --color-text-secondary: #9ba3b1;
  --color-text-muted:  #6e788a;
  --color-text-on-primary: #ffffff;

  /* Adjusted brand primary (slightly brighter for dark bg contrast) */
  --color-primary-500: #5b6cf6;
  --color-primary-600: #3d50f4;
}
```

### Spacing Scale
```css
:root {
  --space-0:   0;
  --space-1:   0.25rem;   /* 4px */
  --space-2:   0.5rem;    /* 8px */
  --space-3:   0.75rem;   /* 12px */
  --space-4:   1rem;      /* 16px */
  --space-5:   1.25rem;   /* 20px */
  --space-6:   1.5rem;    /* 24px */
  --space-8:   2rem;      /* 32px */
  --space-10:  2.5rem;    /* 40px */
  --space-12:  3rem;      /* 48px */
  --space-16:  4rem;      /* 64px */
  --space-20:  5rem;      /* 80px */
  --space-24:  6rem;      /* 96px */
  --space-32:  8rem;      /* 128px */

  /* Section spacing */
  --section-padding-y: var(--space-24);       /* Desktop */
  --section-padding-y-mobile: var(--space-16); /* Mobile */
}
```

### Border Radius
```css
:root {
  --radius-sm:   0.375rem;  /* 6px — inputs, small cards */
  --radius-md:   0.5rem;    /* 8px — cards, buttons */
  --radius-lg:   0.75rem;   /* 12px — large cards, modals */
  --radius-xl:   1rem;      /* 16px — hero cards */
  --radius-2xl:  1.5rem;    /* 24px — featured sections */
  --radius-full: 9999px;    /* pills, avatars */
}
```

### Shadows
```css
:root {
  --shadow-sm:   0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md:   0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
  --shadow-lg:   0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.04);
  --shadow-xl:   0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04);
  --shadow-glow: 0 0 40px rgba(61, 80, 244, 0.15);  /* Brand blue glow */
}

[data-theme="dark"] {
  --shadow-sm:   0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md:   0 4px 6px -1px rgba(0, 0, 0, 0.4);
  --shadow-lg:   0 10px 15px -3px rgba(0, 0, 0, 0.5);
  --shadow-xl:   0 20px 25px -5px rgba(0, 0, 0, 0.5);
  --shadow-glow: 0 0 60px rgba(91, 108, 246, 0.2);
}
```

### Tailwind Config Extension
```js
// tailwind.config.mjs
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#eef0fe',
          100: '#d4d8fd',
          200: '#a9b1fb',
          300: '#7e8af9',
          400: '#5b6cf6',
          500: '#3d50f4',
          600: '#3144d0',
          700: '#2536a8',
          800: '#1a2880',
          900: '#101a58',
          950: '#080e30',
        },
        neutral: { /* as defined above */ },
        dark: {
          bg:      '#0a0f1e',
          subtle:  '#111827',
          muted:   '#1a2035',
          surface: '#141a2e',
          raised:  '#1e2642',
          border:  '#2a3350',
        }
      },
      fontFamily: {
        display: ['Oddval', 'serif'],
        body:    ['Montserrat', 'sans-serif'],
        serif:   ['EB Garamond', 'serif'],
      },
      maxWidth: {
        content: '72rem',    // 1152px — main content width
        narrow:  '42rem',    // 672px — text-heavy pages
      },
      borderRadius: {
        sm:  '0.375rem',
        md:  '0.5rem',
        lg:  '0.75rem',
        xl:  '1rem',
        '2xl': '1.5rem',
      },
    },
  },
}
```

---

## 5. Dark Mode System

### Implementation
- **Detection**: `prefers-color-scheme` media query on initial load
- **Toggle**: Manual override stored in `localStorage` key `theme`
- **Attribute**: `data-theme="dark"` on `<html>` element
- **Shared state**: Nanostore (`src/stores/theme.ts`) syncs across React islands

### Toggle Component (DarkModeToggle.tsx)
- Icon: Sun/Moon with smooth morphing animation (GSAP)
- Placement: Navigation bar, right side, before language switcher
- Transition: CSS `transition` on `background-color`, `color`, `border-color` — 200ms ease
- No flash: Inline `<script>` in `<head>` reads localStorage before render

### Color Strategy
- **Deep navy base** (`#0a0f1e`) — not pure black. Feels sophisticated and on-brand.
- **Brand blue shifts to `#5b6cf6`** in dark mode — slightly brighter for contrast on dark backgrounds.
- **Blue glow accent** (`--shadow-glow`) becomes more prominent in dark mode for premium feel.
- All text meets WCAG AA contrast ratios in both modes.

---

## 6. Typography System

### Font Stack
| Role | Font | Weight Range | Usage |
|---|---|---|---|
| Display / Headings | **Oddval** (variable) | Medium, SemiBold, Bold | H1, H2, hero text, feature titles |
| Body / UI | **Montserrat** (variable) | Regular (400), Medium (500), SemiBold (600), Bold (700) | Body text, navigation, buttons, form labels |
| Accent / Quotes | **EB Garamond** (variable) | Regular, Medium | Pull quotes, testimonials, editorial blog text |

### Type Scale
```css
:root {
  /* Scale based on 1.25 ratio (Major Third) */
  --text-xs:    0.75rem;     /* 12px */
  --text-sm:    0.875rem;    /* 14px */
  --text-base:  1rem;        /* 16px */
  --text-lg:    1.125rem;    /* 18px */
  --text-xl:    1.25rem;     /* 20px */
  --text-2xl:   1.5rem;      /* 24px */
  --text-3xl:   1.875rem;    /* 30px */
  --text-4xl:   2.25rem;     /* 36px */
  --text-5xl:   3rem;        /* 48px */
  --text-6xl:   3.75rem;     /* 60px */
  --text-7xl:   4.5rem;      /* 72px — hero headlines */

  /* Line heights */
  --leading-tight:   1.15;
  --leading-snug:    1.3;
  --leading-normal:  1.6;
  --leading-relaxed: 1.75;

  /* Letter spacing */
  --tracking-tight:  -0.02em;
  --tracking-normal: 0;
  --tracking-wide:   0.02em;
  --tracking-wider:  0.05em;
}
```

### Heading Styles
| Element | Font | Size (Desktop) | Size (Mobile) | Weight | Line Height |
|---|---|---|---|---|---|
| H1 (hero) | Oddval | 4.5rem (72px) | 2.25rem (36px) | Bold | 1.15 |
| H1 (page) | Oddval | 3rem (48px) | 2.25rem (36px) | Bold | 1.15 |
| H2 | Oddval | 2.25rem (36px) | 1.875rem (30px) | SemiBold | 1.2 |
| H3 | Oddval | 1.5rem (24px) | 1.25rem (20px) | SemiBold | 1.3 |
| H4 | Montserrat | 1.25rem (20px) | 1.125rem (18px) | SemiBold | 1.3 |
| Body | Montserrat | 1rem (16px) | 1rem (16px) | Regular | 1.6 |
| Body large | Montserrat | 1.125rem (18px) | 1rem (16px) | Regular | 1.6 |
| Caption | Montserrat | 0.875rem (14px) | 0.875rem (14px) | Regular | 1.5 |

### Font Loading Strategy
1. Subset fonts to Latin + Latin Extended (covers DE + EN)
2. Convert to WOFF2 format (variable font files)
3. `font-display: swap` with system font fallback
4. Preload Montserrat (body) and Oddval (display) in `<head>`
5. EB Garamond loaded lazily (used only on certain pages)

---

## 7. Animation & Motion System

### Design Philosophy: Apple Product Page Style
- **Scroll-driven storytelling**: Content reveals as user scrolls, creating a cinematic narrative
- **Large typography reveals**: Headlines emerge from below or fade in as you reach them
- **Product elements float**: Images/illustrations enter viewport with smooth parallax
- **Purposeful motion**: Every animation serves comprehension, not decoration
- **60fps always**: GSAP with `will-change` and GPU-composited properties only (transform, opacity)

### GSAP Setup
```typescript
// src/lib/animations.ts
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Default animation presets
export const presets = {
  fadeUp: {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  },
  fadeIn: {
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
  },
  slideInLeft: {
    x: -80,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  },
  slideInRight: {
    x: 80,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  },
  scaleIn: {
    scale: 0.9,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  },
  textReveal: {
    y: '100%',
    duration: 1.2,
    ease: 'power4.out',
    stagger: 0.08,
  },
  parallax: {
    y: -100,
    ease: 'none',
  },
};
```

### Animation Catalog

| Animation | Used On | Trigger | Description |
|---|---|---|---|
| **Hero text reveal** | Homepage hero | Page load | H1 letters/words clip-reveal from bottom, staggered |
| **Fade up** | Section content | Scroll into view | Elements translate up 60px and fade in |
| **Float in** | Product images | Scroll into view | Images translate up with slight scale, parallax offset |
| **Parallax** | Background elements | Scroll position | Slower scroll speed for depth |
| **Text reveal** | Section headings | Scroll into view | Overflow-hidden container, text slides up from below |
| **Counter** | Stats/numbers | Scroll into view | Numbers count up from 0 to target value |
| **Stagger grid** | Feature cards | Scroll into view | Cards appear sequentially (0.1s stagger) |
| **Comparison highlight** | Compare table | Scroll/hover | Row highlights, RespireLabs column emphasized |
| **Breathing pulse** | Breathing demo | User interaction | Gentle expand/contract on a breathing rhythm (4s inhale, 7s exhale) |
| **Page transition** | Navigation | Route change | Content fades out, new content fades in (View Transitions API) |
| **Sensor glow** | Hardware page | Hover on diagram | Sensor areas pulse with brand-blue glow on interaction |

### ScrollTrigger Configuration
```typescript
// Standard scroll trigger for sections
ScrollTrigger.defaults({
  start: 'top 80%',      // Trigger when top of element hits 80% viewport height
  end: 'bottom 20%',
  toggleActions: 'play none none none',  // Play once, don't reverse
});
```

### Page Transitions
Use Astro's View Transitions API (`<ViewTransitions />`) for smooth cross-page navigation:
- Content area crossfades (300ms)
- Shared elements (logo, nav) persist
- Scroll position resets to top

---

## 8. i18n (Internationalization)

### Language Detection Flow
```
1. User visits smartmouthtape.com/
2. Check localStorage for saved preference → use if exists
3. If no preference, check Accept-Language header:
   - de, de-AT, de-CH → redirect to /de/
   - everything else → redirect to /en/
4. Set cookie/localStorage with choice
5. Language toggle in nav allows manual switch at any time
```

### URL Structure
```
smartmouthtape.com/
├── /              → Language detection + redirect
├── /en/           → English home
├── /en/app
├── /en/smart-mouth-tape
├── /en/how-it-works
├── /en/science-safety
├── /en/compare
├── /en/pricing
├── /en/waitlist
├── /en/contact
├── /en/faq
├── /en/about
├── /en/press
├── /en/facts
├── /en/facts.md          (LLM-friendly raw markdown)
├── /en/privacy
├── /en/terms
├── /en/cookies
├── /en/data-deletion
├── /en/blog/
├── /en/blog/[slug]
│
├── /de/           → German home
├── /de/app
├── /de/smart-mouth-tape
├── /de/so-funktionierts
├── /de/wissenschaft-sicherheit
├── /de/vergleich
├── /de/plaene
├── /de/warteliste
├── /de/kontakt
├── /de/faq
├── /de/ueber-uns
├── /de/presse
├── /de/fakten
├── /de/fakten.md         (LLM-friendly raw markdown)
├── /de/datenschutz
├── /de/agb
├── /de/cookies
├── /de/datenloeschung
├── /de/impressum
├── /de/blog/
├── /de/blog/[slug]
│
├── /api/waitlist          (serverless)
├── /api/contact           (serverless)
├── /api/facts.json        (programmatic)
│
├── /studio/               (Sanity Studio, embedded)
├── /llms.txt
├── /llms-ctx.txt
├── /robots.txt
└── /sitemap.xml
```

### hreflang Tags
Every page includes:
```html
<link rel="alternate" hreflang="en" href="https://smartmouthtape.com/en/[page]" />
<link rel="alternate" hreflang="de" href="https://smartmouthtape.com/de/[page]" />
<link rel="alternate" hreflang="x-default" href="https://smartmouthtape.com/en/[page]" />
```

### Language Switcher Component
- Location: Navigation bar, right side (after dark mode toggle)
- Style: Text link — "DE" / "EN" with active state indicator
- Behavior: Clicking switches to the equivalent page in the other language
- Preserves: scroll position not preserved (top of page), hash anchors preserved

### Translation Management
All translatable strings managed in Sanity CMS via `@sanity/document-internationalization`. Static UI strings (button labels, nav items, form validation messages) stored in local JSON files:
```
src/lib/translations/
├── en.json
└── de.json
```

---

## 9. Sanity CMS Architecture

### Setup
- **Sanity v3** with embedded Studio at `/studio`
- **Plugin**: `@sanity/document-internationalization` for DE/EN linked documents
- **Dataset**: `production` (single dataset, documents tagged with language)
- **API version**: `2024-01-01`
- **CDN**: Enabled for production reads

### Content Schemas

#### Document Types

**Page** (for all static pages)
```typescript
{
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', validation: required },
    { name: 'slug', type: 'slug', source: 'title' },
    { name: 'language', type: 'string', hidden: true },
    { name: 'seo', type: 'seo' },
    { name: 'hero', type: 'hero' },
    { name: 'sections', type: 'array', of: [
      { type: 'contentSection' },
      { type: 'featureGrid' },
      { type: 'ctaBlock' },
      { type: 'comparisonTable' },
      { type: 'faqSection' },
      { type: 'statsBar' },
      { type: 'splitContent' },
      { type: 'blogPreviewSection' },
    ]},
    { name: 'medicalDisclaimer', type: 'boolean', initialValue: false },
  ]
}
```

**Blog Post**
```typescript
{
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'slug', type: 'slug', source: 'title' },
    { name: 'language', type: 'string', hidden: true },
    { name: 'seo', type: 'seo' },
    { name: 'publishedAt', type: 'datetime' },
    { name: 'excerpt', type: 'text', rows: 3 },
    { name: 'featuredImage', type: 'image', options: { hotspot: true } },
    { name: 'body', type: 'portableText' },
    { name: 'tags', type: 'array', of: [{ type: 'string' }] },
    { name: 'relatedPosts', type: 'array', of: [{ type: 'reference', to: [{ type: 'blogPost' }] }] },
  ]
}
```

**FAQ Item**
```typescript
{
  name: 'faqItem',
  title: 'FAQ',
  type: 'document',
  fields: [
    { name: 'question', type: 'string' },
    { name: 'answer', type: 'portableText' },
    { name: 'language', type: 'string', hidden: true },
    { name: 'category', type: 'string', options: {
      list: ['product', 'privacy', 'smartMouthTape', 'beta', 'general']
    }},
    { name: 'order', type: 'number' },
  ]
}
```

**Site Settings** (singleton)
```typescript
{
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    { name: 'companyName', type: 'string' },
    { name: 'supportEmail', type: 'string' },
    { name: 'pressEmail', type: 'string' },
    { name: 'partnershipEmail', type: 'string' },
    { name: 'socialLinks', type: 'object', fields: [
      { name: 'linkedin', type: 'url' },
      { name: 'youtube', type: 'url' },
      { name: 'instagram', type: 'url' },
    ]},
    { name: 'footerDisclaimerEN', type: 'text' },
    { name: 'footerDisclaimerDE', type: 'text' },
  ]
}
```

#### Object Types

**SEO**
```typescript
{
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    { name: 'metaTitle', type: 'string', validation: max(70) },
    { name: 'metaDescription', type: 'text', rows: 3, validation: max(160) },
    { name: 'ogImage', type: 'image' },
    { name: 'noIndex', type: 'boolean', initialValue: false },
  ]
}
```

**Hero**
```typescript
{
  name: 'hero',
  title: 'Hero Section',
  type: 'object',
  fields: [
    { name: 'headline', type: 'string' },
    { name: 'subheadline', type: 'text' },
    { name: 'quickSummary', type: 'array', of: [{ type: 'string' }] },
    { name: 'primaryCTA', type: 'object', fields: [
      { name: 'label', type: 'string' },
      { name: 'href', type: 'string' },
    ]},
    { name: 'secondaryCTA', type: 'object', fields: [
      { name: 'label', type: 'string' },
      { name: 'href', type: 'string' },
    ]},
    { name: 'image', type: 'image', options: { hotspot: true } },
    { name: 'showWaitlistForm', type: 'boolean', initialValue: false },
  ]
}
```

### Studio Desk Structure
Organize the Studio for editors:
```
📁 Pages
  📁 English
    - Home (EN)
    - App (EN)
    - Smart Mouth Tape (EN)
    - ... (all EN pages)
  📁 Deutsch
    - Home (DE)
    - App (DE)
    - Smart Mouth Tape (DE)
    - ... (all DE pages)
📁 Blog
  📁 English Posts
  📁 Deutsche Beiträge
📁 FAQ
📁 Site Settings
```

### Data Fetching Pattern
```typescript
// src/lib/sanity.ts
import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

// Fetch page by slug and language
export async function getPage(slug: string, lang: string) {
  return sanityClient.fetch(
    `*[_type == "page" && slug.current == $slug && language == $lang][0]{
      ...,
      sections[]{ ... }
    }`,
    { slug, lang }
  );
}
```

---

## 10. SEO & LLM Visibility

### Maximum LLM Optimization Strategy

#### /llms.txt
Served from `public/llms.txt`. Content adapted from readme but using **smartmouthtape.com** domain:
```
# RespireLabs

> RespireLabs is a privacy-first breathing coach (mobile app + optional Smart Mouth Tape wearable)
> that helps people reduce mouth breathing and build healthier nasal breathing habits—day and night.
> RespireLabs is a wellness product and does not diagnose or treat medical conditions.

Important notes:
- Not a medical device. No diagnosis. If you suspect sleep apnea or another sleep/breathing
  disorder, consult a qualified clinician.
- Privacy-by-default: core breathing detection is designed to work offline; sensitive audio
  is processed locally unless the user explicitly opts in.

## Start here
- [/en/facts](https://smartmouthtape.com/en/facts): Canonical facts about RespireLabs.
- [/de/fakten](https://smartmouthtape.com/de/fakten): Deutsche Fakten-Seite.

## Product
- [/en/app](https://smartmouthtape.com/en/app): RespireLabs app overview.
- [/en/smart-mouth-tape](https://smartmouthtape.com/en/smart-mouth-tape): Smart Mouth Tape overview.
- [/en/how-it-works](https://smartmouthtape.com/en/how-it-works): Step-by-step explanation.
- [/en/compare](https://smartmouthtape.com/en/compare): Competitor comparison.

## Safety & privacy
- [/en/science-safety](https://smartmouthtape.com/en/science-safety): Evidence, safety notes.
- [/en/privacy](https://smartmouthtape.com/en/privacy): Privacy policy.
- [/en/data-deletion](https://smartmouthtape.com/en/data-deletion): Data deletion / GDPR.

## Optional
- [/en/blog](https://smartmouthtape.com/en/blog): Articles.
- [/en/press](https://smartmouthtape.com/en/press): Press kit.
```

#### /llms-ctx.txt
Auto-generated at build time from llms.txt links. Concatenates key page content in markdown for LLM context ingestion.

#### .md Versions of Key Pages
`/en/facts.md` and `/de/fakten.md` serve raw markdown versions of the facts page. These are static files in the `pages/` directory.

#### /api/facts.json
Programmatic JSON endpoint for machine-readable product facts:
```json
{
  "name": "RespireLabs",
  "type": "wellness_product",
  "domain": "smartmouthtape.com",
  "is_medical_device": false,
  "products": [
    { "name": "RespireLabs App", "platform": ["iOS", "Android"], "status": "in_development" },
    { "name": "Smart Mouth Tape", "type": "wearable", "status": "concept" }
  ],
  "privacy": { "default_processing": "local", "consent_required": true },
  "contact": { "support": "{{support_email}}", "press": "{{press_email}}" }
}
```

#### robots.txt
```
User-agent: *
Allow: /

# AI crawlers — explicit allow
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: https://smartmouthtape.com/sitemap.xml
```

#### AI-Crawler Sitemap
In addition to the standard `sitemap.xml`, generate a supplementary sitemap that prioritizes LLM-friendly pages:
- `/en/facts` and `/de/fakten` (priority: 1.0)
- `/llms.txt` (priority: 1.0)
- Product pages (priority: 0.9)
- FAQ pages (priority: 0.8)

#### Schema.org JSON-LD (All Pages)
**Organization** + **WebSite** (injected on every page):
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "RespireLabs",
  "url": "https://smartmouthtape.com",
  "logo": "https://smartmouthtape.com/logo.png",
  "sameAs": ["{{linkedin_url}}", "{{youtube_url}}", "{{instagram_url}}"],
  "contactPoint": [{
    "@type": "ContactPoint",
    "contactType": "customer support",
    "email": "{{support_email}}"
  }]
}
```

**Page-specific schemas**:
- **App page**: `MobileApplication` schema
- **Smart Mouth Tape page**: `Product` schema
- **FAQ page**: `FAQPage` schema (every Q&A pair)
- **Blog posts**: `Article` schema
- **All pages**: `BreadcrumbList` schema

#### Answer-First Formatting
Every page starts with a "Quick summary" block — 3-6 bullet points summarizing the page content. This is the first content after the H1, before the hero visual. Optimized for AI Overviews and GEO/AEO extraction.

---

## 11. Conversion System (Waitlist Funnel)

### Funnel Components

#### 1. Inline Waitlist CTAs
- **Placement**: End of major content sections, within product pages, dedicated /waitlist page
- **Style**: Full-width section with heading + brief copy + email input + submit button
- **Variants**: Minimal (email-only) and full (all fields from waitlist form)

#### 2. Sticky Bottom Bar
- **Trigger**: Appears after scrolling 30% down any page
- **Content**: One-liner + email input + "Join" button
- **Dismissible**: X button, stays dismissed for the session
- **Mobile**: Full-width bar, stacks vertically
- **Z-index**: Above page content, below modals

#### 3. Exit-Intent Popup
- **Trigger**: Mouse moves toward browser chrome (desktop only)
- **Frequency**: Once per session (tracked in sessionStorage)
- **Content**: Compelling headline + 3 bullet value props + email form
- **Animation**: Backdrop fade + modal scale-in (GSAP)
- **Dismissal**: Click outside, X button, Escape key

#### 4. Timed Slide-In
- **Trigger**: 60 seconds after page load (if no other popup shown)
- **Position**: Bottom-right corner
- **Content**: Small card with headline + email input
- **Animation**: Slides in from right (GSAP)
- **Dismissal**: X button, remains dismissed for session

### Session Tracking Logic
```typescript
// src/stores/waitlist.ts
import { atom } from 'nanostores';

// Track if any conversion component has been shown/dismissed this session
export const $waitlistShown = atom<boolean>(
  typeof sessionStorage !== 'undefined'
    ? sessionStorage.getItem('waitlist_shown') === 'true'
    : false
);

export const $waitlistSubmitted = atom<boolean>(
  typeof localStorage !== 'undefined'
    ? localStorage.getItem('waitlist_submitted') === 'true'
    : false
);
```

**Rules**:
- If user has already submitted the waitlist form (`localStorage`), hide ALL conversion components permanently
- If user has dismissed any popup this session (`sessionStorage`), don't show exit-intent or slide-in again
- Sticky bar can be shown/dismissed independently
- The dedicated `/waitlist` page never shows popups (user is already there)

### Waitlist Form Fields
```
- First name (optional, text)
- Email (required, email validation)
- Country (optional, dropdown)
- Interest (required, checkboxes):
  □ App only
  □ Smart Mouth Tape wearable
  □ Both
- Phone OS (required, radio):
  ○ iOS
  ○ Android
- Notes (optional, textarea, max 500 chars)
- Consent (required, checkbox):
  "I agree to the Privacy Policy and want to receive early access updates."
- Submit: "Join waitlist"
```

### Post-Submit UX
- Form replaced with success message (animated transition)
- "Thanks — you're on the list. Check your inbox for a confirmation email."
- All other conversion components hidden for this user
- Matomo custom event fired: `waitlist_submit`

---

## 12. Form & API Architecture

### Serverless Functions

#### POST /api/waitlist
```typescript
// src/pages/api/waitlist.ts
export async function POST({ request }) {
  const body = await request.json();

  // 1. Validate server-side
  // 2. Sanitize inputs (strip HTML, trim whitespace)
  // 3. Check for duplicate email (Brevo API)
  // 4. Create/update contact in Brevo
  // 5. Trigger double opt-in email (Brevo transactional)
  // 6. Return success/error

  // Brevo API: POST https://api.brevo.com/v3/contacts
  // Headers: api-key: BREVO_API_KEY
  // Body: { email, attributes: { FIRSTNAME, COUNTRY, INTEREST, PHONE_OS, NOTES }, listIds: [waitlist_list_id] }
}
```

#### POST /api/contact
```typescript
// src/pages/api/contact.ts
export async function POST({ request }) {
  const body = await request.json();

  // 1. Validate (name, email, topic, message)
  // 2. Sanitize
  // 3. Send transactional email to support (via Brevo SMTP API)
  // 4. Send confirmation email to user
  // 5. Return success
}
```

### Brevo Setup Instructions
1. Create Brevo account at brevo.com (free tier: 300 emails/day)
2. Create a contact list named "Waitlist"
3. Create contact attributes: FIRSTNAME, COUNTRY, INTEREST, PHONE_OS, NOTES
4. Generate API key (Settings → SMTP & API → API Keys)
5. Create double opt-in template (Settings → Transactional → Templates)
6. Set environment variables:
   ```
   BREVO_API_KEY=your-api-key
   BREVO_WAITLIST_LIST_ID=list-id-number
   BREVO_DOI_TEMPLATE_ID=template-id
   BREVO_SENDER_EMAIL=hello@smartmouthtape.com
   BREVO_SENDER_NAME=RespireLabs
   ```

### Client-Side Validation (React Hook Form)
```typescript
const schema = {
  email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  interest: { required: true },
  phoneOS: { required: true },
  consent: { required: true },
  firstName: { maxLength: 100 },
  notes: { maxLength: 500 },
};
```

---

## 13. Analytics (Matomo)

### Self-Hosted Setup
- **Host**: Same server as the website OR a separate lightweight VPS
- **Mode**: Cookieless (no cookie consent needed for basic pageviews)
- **Tracking**: JavaScript tag in `BaseLayout.astro`
- **Custom events** (to be tracked):

| Event Category | Event Action | Event Name | Trigger |
|---|---|---|---|
| waitlist | form_view | inline / popup / sticky | Waitlist form becomes visible |
| waitlist | form_start | field_interaction | User starts filling the form |
| waitlist | form_submit | success / error | Form submitted |
| waitlist | popup_dismiss | exit_intent / slide_in | User dismisses conversion popup |
| engagement | breathing_demo | start / complete | User interacts with breathing exercise |
| engagement | sensor_explorer | view | User interacts with hardware diagram |
| navigation | language_switch | en_to_de / de_to_en | Language toggle clicked |
| navigation | dark_mode | enable / disable | Theme toggle clicked |

### Implementation
```html
<!-- Matomo tracking code (cookieless mode) -->
<script>
  var _paq = window._paq = window._paq || [];
  _paq.push(['disableCookies']);
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u = "//{{matomo_url}}/";
    _paq.push(['setTrackerUrl', u + 'matomo.php']);
    _paq.push(['setSiteId', '{{matomo_site_id}}']);
    var d = document, g = d.createElement('script');
    g.async = true; g.src = u + 'matomo.js';
    d.head.appendChild(g);
  })();
</script>
```

---

## 14. Cookie Consent

### Minimal Bottom Bar
- **Style**: Fixed bottom bar, full width, subtle background
- **Content**: "We use cookies for analytics. [Accept] [Reject] [Learn more]"
- **Learn more**: Links to /cookies page
- **Behavior**:
  - If Matomo runs in cookieless mode, the banner is technically optional but shown for transparency
  - Accept → enables Matomo cookies (richer analytics), stores consent in localStorage
  - Reject → Matomo stays cookieless, stores rejection in localStorage
  - No interaction → treated as reject (no cookies set)
- **Reappearance**: Only on first visit or after clearing localStorage
- **Animation**: Slide up from bottom (CSS transition, not GSAP)
- **Dark mode**: Adapts to current theme

---

## 15. Interactive Components

### 1. Breathing Demo (BreathingDemo.tsx)
- **Location**: Homepage, App page, Blog post about nasal breathing
- **UI**: Circular animated element that expands (inhale) and contracts (exhale)
- **Timer**: 4s inhale → 2s hold → 6s exhale (customizable)
- **Visual**: Ring/circle with brand blue gradient, size animates with GSAP
- **Audio**: Optional subtle audio cue (can be toggled off)
- **States**: Idle, Running, Paused, Complete
- **Data**: Shows cycle count, total time
- **Mobile**: Full-width, touch to start/stop

### 2. Nose Breathing Exercise Timer (NoseBreathingTimer.tsx)
- **Location**: Dedicated section on App page, Blog post #3
- **UI**: Visual timer with nose icon from brand kit
- **Exercise flow**: Guided steps with text instructions
  1. "Close your mouth gently"
  2. "Breathe in through your nose" (4s, circle expands)
  3. "Hold" (2s, circle holds)
  4. "Breathe out through your nose" (6s, circle contracts)
- **Cycles**: User selects 3, 5, or 10 cycles
- **Animation**: Nose icon subtly animates (airflow lines), circle pulses with brand blue
- **Completion**: "Great job! You completed X cycles" with option to try again

### 3. Comparison Slider (ComparisonSlider.tsx)
- **Location**: Compare page
- **UI**: Interactive table where user can filter/highlight categories
- **Behavior**: Clicking a category (Rings, Audio Apps, Tape) highlights that row and dims others
- **RespireLabs column**: Always highlighted with brand blue accent
- **Animation**: Rows slide/fade when filtered (GSAP)
- **Mobile**: Horizontally scrollable table with sticky first column

### 4. FAQ Accordion (FAQAccordion.tsx)
- **Location**: FAQ page, mini-FAQ sections on product pages
- **UI**: Question text with expand/collapse arrow
- **Animation**: Smooth height transition (GSAP, not CSS — avoids layout shift)
- **Behavior**: One open at a time (accordion style), or multi-open (configurable)
- **Schema**: Each Q&A pair generates FAQPage JSON-LD structured data
- **Categories**: Tabs or filter chips at the top (Product, Privacy, Smart Mouth Tape, Beta)

### 5. How It Works Timeline (HowItWorksTimeline.tsx)
- **Location**: How It Works page
- **UI**: Vertical timeline with 4 steps
- **Behavior**: Steps reveal as user scrolls, with connecting line that draws progressively
- **Each step**: Icon (from brand kit) + headline + description + optional visual
- **Animation**: Line draws down (SVG stroke-dashoffset), step cards fade-up and slide-in from alternating sides
- **Mobile**: Single column, line on the left side

### 6. Sensor Diagram Explorer (SensorDiagramExplorer.tsx)
- **Location**: Smart Mouth Tape page
- **UI**: Abstract/schematic diagram of the tape device with labeled sensor positions
- **Behavior**: Hover/tap on a sensor area → info panel slides in with details
- **Sensors**: Microphone, Airflow/Pressure (x2), SpO₂, Accelerometer
- **Animation**: Sensor areas pulse with blue glow on hover, info panel slides in
- **Style**: Technical/schematic aesthetic (line art, not realistic render)
- **Mobile**: Tap to explore, bottom sheet for info panel

---

## 16. Page-by-Page Specifications

### A) Homepage (/ → /en/ or /de/)

**Strategic role**: Primary landing page. Smart Mouth Tape leads (matching domain name), then introduces the broader RespireLabs ecosystem.

#### Section Order

| # | Section | Component | Animation | Content |
|---|---|---|---|---|
| 1 | **Hero** | HeroHome.astro | Text reveal (stagger), product visual float-in | H1: "Smart Mouth Tape" tagline. Quick summary bullets. Primary CTA: "Join the waitlist". Secondary CTA: "See how it works" |
| 2 | **Problem statement** | SplitContent.astro | Fade-up | "Why mouth breathing is a problem" — emotional copy + supporting visual |
| 3 | **Two products** | FeatureGrid.astro (2 cards) | Stagger grid | App card + Smart Mouth Tape card. Each with icon, headline, 3 bullets, "Learn more" link |
| 4 | **How it works (mini)** | HowItWorksTimeline.tsx | Scroll-driven line draw | 4-step loop: detect → nudge → train → measure. Abbreviated version. |
| 5 | **What makes us different** | FeatureGrid.astro (3 cards) | Stagger grid | Active coaching, Respiratory-first, Privacy-first. Brand icons. |
| 6 | **Mini comparison** | ComparisonTable.astro | Fade-up | High-level 3-row comparison (tape, audio apps, rings vs RespireLabs) |
| 7 | **Early-stage momentum** | StatsBar.astro | Counter animation | "Early testers", "Working prototypes", "Community members" |
| 8 | **FAQ (top 3)** | FAQAccordion.tsx | Fade-up | Medical device? Need tape to start? Privacy? |
| 9 | **CTA** | CTASection.astro | Fade-up | "Join the waitlist" heading + inline waitlist form |

#### SEO & Structured Data
- Title: "RespireLabs – The breathing coach for better sleep & energy" (EN) / DE variant
- Description: Per readme
- Schema: Organization, WebSite, FAQPage (for the 3 FAQs)

---

### B) App Page (/en/app, /de/app)

| # | Section | Animation | Content |
|---|---|---|---|
| 1 | **Hero** | Text reveal + phone mockup float-in | "RespireLabs App" + quick summary bullets + mockup image |
| 2 | **Core loop** | HowItWorksTimeline (4 steps) | Start session → Detect → Feedback → Exercises |
| 3 | **Detection & feedback** | SplitContent, parallax image | Feature details with supporting visual |
| 4 | **Coaching** | FeatureGrid (3 cards) | Exercises, Next best action, Streaks |
| 5 | **Nose Breathing Exercise** | NoseBreathingTimer.tsx | Interactive demo — try it now |
| 6 | **Privacy by design** | SplitContent | Permission prompts, local processing, consent |
| 7 | **Integrations** | FeatureGrid (2 cards) | Apple Health, Android Health Connect |
| 8 | **Beta CTA** | CTASection + inline form | Join waitlist |

**Schema**: MobileApplication

---

### C) Smart Mouth Tape Page (/en/smart-mouth-tape, /de/smart-mouth-tape)

| # | Section | Animation | Content |
|---|---|---|---|
| 1 | **Hero** | Text reveal + abstract schematic float-in | "Smart Mouth Tape (in development)" + quick summary |
| 2 | **What it is** | Fade-up | Description of concept, how it complements the app |
| 3 | **vs. Traditional tape** | SplitContent | Blind vs. data-driven comparison |
| 4 | **Sensor Diagram** | SensorDiagramExplorer.tsx | Interactive schematic — hover/tap sensors |
| 5 | **Hardware specs** | FeatureGrid (4 cards) | Overnight, USB-C, no lights, comfortable |
| 6 | **How it works with app** | HowItWorksTimeline (3 steps) | Wear → Record → Sync + report |
| 7 | **Safety first** | Highlighted callout section | Medical disclaimer, safety guidance |
| 8 | **Early access CTA** | CTASection + inline form | Join waitlist |

**Schema**: Product
**Visual approach**: Abstract/schematic diagrams, technical line art, no realistic product renders

---

### D) How It Works (/en/how-it-works, /de/so-funktionierts)

| # | Section | Animation | Content |
|---|---|---|---|
| 1 | **Hero** | Text reveal | "How RespireLabs works" + quick summary |
| 2 | **4-step timeline** | HowItWorksTimeline.tsx (full version) | Phone → Baseline → Training → Night insights |
| 3 | **Breathing Demo** | BreathingDemo.tsx | Interactive breathing exercise — try the core experience |
| 4 | **What we're NOT** | Callout section | Not medical, not diagnostic, not replacement for clinical eval |
| 5 | **CTA** | CTASection | Waitlist |

---

### E) Science & Safety (/en/science-safety, /de/wissenschaft-sicherheit)

| # | Section | Animation | Content |
|---|---|---|---|
| 1 | **Hero** | Text reveal | "Science & Safety" + quick summary |
| 2 | **Responsible claims** | SplitContent | What we say vs. what we don't say |
| 3 | **Mouth taping safety** | Highlighted section with warning styling | General safety principles, contraindications |
| 4 | **Privacy and trust** | FeatureGrid (3 cards) | Permissions, local processing, consent |
| 5 | **CTA** | CTASection | Waitlist |

**Medical disclaimer**: Prominent, top-of-page banner on this page.

---

### F) Compare (/en/compare, /de/vergleich)

| # | Section | Animation | Content |
|---|---|---|---|
| 1 | **Hero** | Text reveal | "Compare" + quick summary |
| 2 | **Interactive comparison** | ComparisonSlider.tsx | Full comparison table with filtering |
| 3 | **Why we're building this** | SplitContent | Gap between passive tracking and blind interventions |
| 4 | **Choose what's right** | FeatureGrid (3 cards) | Recovery metrics → ring. Snoring → audio. Breathing habits → us. |
| 5 | **CTA** | CTASection | Waitlist |

---

### G) Pricing/Plans (/en/pricing, /de/plaene)

| # | Section | Animation | Content |
|---|---|---|---|
| 1 | **Hero** | Text reveal | "Plans" |
| 2 | **Start simple** | Card | App-first, waitlist |
| 3 | **Optional upgrades** | Card | Premium features, Smart Mouth Tape add-on |
| 4 | **CTA** | CTASection | Waitlist |

Minimal page — product is in development, no real pricing yet.

---

### H) Waitlist (/en/waitlist, /de/warteliste)

| # | Section | Animation | Content |
|---|---|---|---|
| 1 | **Hero** | Text reveal | "Join the waitlist" |
| 2 | **What you'll get** | 3 bullet points | Early access, updates, influence features |
| 3 | **Full waitlist form** | WaitlistForm.tsx | All fields (see Section 11) |

**No conversion popups on this page** (user is already converting).

---

### I) Contact (/en/contact, /de/kontakt)

| # | Section | Animation | Content |
|---|---|---|---|
| 1 | **Hero** | Text reveal | "Contact" |
| 2 | **Contact form** | Form (React island) | Name, Email, Topic dropdown, Message |
| 3 | **Direct contacts** | Info cards | Partnership, Press, Support emails (placeholders) |

---

### J) FAQ (/en/faq, /de/faq)

| # | Section | Animation | Content |
|---|---|---|---|
| 1 | **Hero** | Text reveal | "FAQ" |
| 2 | **Category filter** | Tab/chip bar | Product, Privacy, Smart Mouth Tape, Beta |
| 3 | **FAQ accordion** | FAQAccordion.tsx | All Q&A pairs from Sanity CMS |
| 4 | **CTA** | CTASection | "Still have questions? Contact us" + Waitlist |

**Schema**: FAQPage (full structured data for all Q&A pairs)

---

### K) About (/en/about, /de/ueber-uns)

| # | Section | Animation | Content |
|---|---|---|---|
| 1 | **Hero** | Text reveal | "About RespireLabs" |
| 2 | **Mission** | SplitContent | Mission statement |
| 3 | **Principles** | FeatureGrid (4 cards) | Privacy-first, Responsible claims, Habit change, Clear insights |
| 4 | **What we're building** | Timeline or feature list | App, Wearable, Platform |
| 5 | **Team** | Grid of team cards | {{Placeholder for bios}} |

---

### L) Press (/en/press, /de/presse)

| # | Section | Animation | Content |
|---|---|---|---|
| 1 | **Hero** | Text reveal | "Press kit" |
| 2 | **One-liner + boilerplate** | Text section | Company description |
| 3 | **Media contact** | Contact card | Press email (placeholder) |
| 4 | **Assets** | Download links | Logo, product images, headshots (placeholder links) |

---

### M) Facts (/en/facts, /de/fakten)

| # | Section | Animation | Content |
|---|---|---|---|
| 1 | **Hero** | Text reveal | "RespireLabs Facts" |
| 2 | **Structured facts** | Clean text layout | What is, What is NOT, Products, Privacy, Contact |

**LLM-first page**: Minimal styling. Clean semantic HTML. Also served as `.md` file.
**Schema**: Organization (enhanced)

---

### N) Blog (/en/blog, /de/blog)

**Listing page**: Grid of blog post cards (featured image, title, excerpt, date, read time).
**Post page**: BlogLayout with portable text rendering, reading progress bar, related posts at bottom.

**Initial posts** (3 per language, from readme):
1. Mouth breathing vs nasal breathing
2. Mouth taping: benefits, risks, and safer ways
3. Daytime nasal breathing training

---

### O) Legal Pages

All legal pages use `LegalLayout.astro` — simpler design, no animations, no conversion popups.

| Page | EN Path | DE Path |
|---|---|---|
| Privacy Policy | /en/privacy | /de/datenschutz |
| Terms | /en/terms | /de/agb |
| Cookies | /en/cookies | /de/cookies |
| Data Deletion | /en/data-deletion | /de/datenloeschung |
| Impressum | — | /de/impressum |

---

## 17. Image & Asset Requirements

### Per-Page Image Needs

| Page | Required Images | Source Status |
|---|---|---|
| **Homepage** | Hero visual (abstract breathing/wellness), App mockup (phone), Tape schematic, Background texture/pattern | To be created |
| **App** | Phone mockup showing app UI (2-3 screens), Exercise illustration | To be created |
| **Smart Mouth Tape** | Abstract sensor schematic/diagram, Technical line art of device concept | To be created |
| **How It Works** | Step icons (can use brand icons), Optional: supporting illustrations per step | Brand icons exist |
| **Science & Safety** | Trust/safety visual (abstract), Optional: data privacy illustration | To be created |
| **Compare** | Category icons (ring, audio wave, tape, RespireLabs logo) | Brand icons exist |
| **About** | Team headshots | {{Placeholder}} |
| **Press** | Logo pack preview image, Product image preview | From brand kit |
| **Blog** | Featured image per post (3 per language) | To be created |
| **Open Graph** | Default OG image (1200x630) per language | To be created |

### Image Specifications
```
Format:        WebP primary, AVIF where supported, PNG fallback
Hero images:   1920x1080 max, responsive srcset (640, 960, 1280, 1920)
Card images:   800x600 max
Blog featured: 1200x675 (16:9)
OG images:     1200x630 (fixed)
Icons:         SVG (from brand kit, already available)
Logos:         SVG for web, PNG for OG/email
```

### Astro Image Processing
All raster images processed through `astro:assets` for automatic:
- WebP/AVIF conversion
- Responsive `srcset` generation
- Lazy loading with `loading="lazy"` + blur placeholder
- Width/height attributes for CLS prevention

---

## 18. Hosting & Deployment

### Development: Netlify
```toml
# netlify.toml
[build]
  command = "pnpm build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  conditions = {Role = ["admin"]}

# Serverless functions (Astro endpoints auto-detected)
[functions]
  directory = ".netlify/functions"
```

### Production: Host-Agnostic
The Astro static build outputs to `/dist` — deployable to any static host:
- Netlify, Vercel, Cloudflare Pages
- Any CDN + object storage (S3, GCS, R2)
- Traditional web server (nginx, Apache)

**Serverless functions** (waitlist, contact) use Astro's adapter system:
- `@astrojs/netlify` for Netlify
- `@astrojs/vercel` for Vercel
- `@astrojs/cloudflare` for Cloudflare
- `@astrojs/node` for self-hosted Node.js

To switch hosts, change the Astro adapter in `astro.config.mjs`.

### Environment Variables
```env
# Sanity
SANITY_PROJECT_ID=
SANITY_DATASET=production
SANITY_API_TOKEN=           # Read token for build-time fetching

# Brevo
BREVO_API_KEY=
BREVO_WAITLIST_LIST_ID=
BREVO_DOI_TEMPLATE_ID=
BREVO_SENDER_EMAIL=
BREVO_SENDER_NAME=RespireLabs

# Matomo
MATOMO_URL=
MATOMO_SITE_ID=

# Site
SITE_URL=https://smartmouthtape.com
```

### CI/CD Pipeline
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
        env:
          SANITY_PROJECT_ID: ${{ secrets.SANITY_PROJECT_ID }}
          SANITY_DATASET: production
          SANITY_API_TOKEN: ${{ secrets.SANITY_API_TOKEN }}
          SITE_URL: https://smartmouthtape.com
      # Deploy step depends on chosen host
```

---

## 19. Performance Budgets

| Metric | Target | Rationale |
|---|---|---|
| **Lighthouse Performance** | 95+ | Static HTML + minimal JS = easy to achieve |
| **LCP** | < 2.0s | Hero content is static HTML, fonts preloaded |
| **FID / INP** | < 100ms | React islands hydrate independently |
| **CLS** | < 0.05 | Fixed image dimensions, font-display: swap |
| **Total page weight** | < 500KB (initial) | Before GSAP loads |
| **GSAP bundle** | ~80KB gzipped | Loaded async after initial paint |
| **JS total** | < 150KB gzipped | React islands + GSAP + form logic |
| **Font files** | < 200KB total | Variable fonts, Latin subset, WOFF2 |
| **Time to Interactive** | < 3.0s | Islands hydrate progressively |

### Loading Strategy
1. **Critical path**: HTML + CSS + fonts (preloaded)
2. **Above-fold content**: Renders without JS
3. **GSAP**: Loaded async, initializes after DOMContentLoaded
4. **React islands**: Hydrate on `visible` (Astro `client:visible` directive)
5. **Matomo**: Loaded async, non-blocking
6. **Images**: Lazy loaded with blur placeholders

---

## 20. Accessibility

### Standards
- **WCAG 2.1 AA** compliance target
- Semantic HTML5 elements throughout
- Proper heading hierarchy (H1 → H2 → H3, no skips)
- All images have descriptive `alt` text
- Form fields have associated `<label>` elements
- Focus states visible on all interactive elements
- Skip-to-content link (first focusable element)
- Color contrast: minimum 4.5:1 for text, 3:1 for large text
- Keyboard navigation for all interactive components

### Reduced Motion
- **Deferred for v1** (per your decision)
- Future enhancement: `prefers-reduced-motion` media query will disable GSAP animations and show static content

### Language
- `lang` attribute on `<html>` element (`de` or `en`)
- `hreflang` tags for search engines

---

## 21. Build Phases & Checklist

### Phase 1: Foundation
- [ ] Initialize Astro project with React, Tailwind, MDX
- [ ] Set up TypeScript configuration
- [ ] Configure Tailwind with design tokens (colors, fonts, spacing)
- [ ] Set up font loading (Oddval, Montserrat, EB Garamond — WOFF2)
- [ ] Create BaseLayout, PageLayout, LegalLayout
- [ ] Implement dark mode system (store + toggle + CSS variables)
- [ ] Implement language detection + routing + switcher
- [ ] Create Header and Footer components
- [ ] Set up GSAP + ScrollTrigger with animation presets
- [ ] Configure Sanity project + embedded Studio at /studio

### Phase 2: CMS & Content
- [ ] Define all Sanity schemas (page, blogPost, faqItem, feature, siteSettings)
- [ ] Set up @sanity/document-internationalization
- [ ] Configure Sanity desk structure
- [ ] Populate initial content (migrate from readme markdown)
- [ ] Build Sanity data fetching layer (src/lib/sanity.ts)
- [ ] Test content rendering pipeline

### Phase 3: Core Pages (EN)
- [ ] Homepage (all 9 sections)
- [ ] App page
- [ ] Smart Mouth Tape page
- [ ] How It Works page
- [ ] Science & Safety page
- [ ] Compare page
- [ ] Pricing page
- [ ] FAQ page
- [ ] About page
- [ ] Press page
- [ ] Facts page (+ .md version)
- [ ] Waitlist page
- [ ] Contact page

### Phase 4: Interactive Components
- [ ] BreathingDemo.tsx
- [ ] NoseBreathingTimer.tsx
- [ ] ComparisonSlider.tsx
- [ ] FAQAccordion.tsx
- [ ] HowItWorksTimeline.tsx
- [ ] SensorDiagramExplorer.tsx

### Phase 5: Conversion Funnel
- [ ] WaitlistForm.tsx (full form with validation)
- [ ] StickyBar.tsx
- [ ] ExitIntentPopup.tsx
- [ ] SlideInCTA.tsx
- [ ] Session tracking logic (nanostores)
- [ ] Post-submit UX

### Phase 6: Form Backend & Integrations
- [ ] Set up Brevo account + contact list + attributes
- [ ] POST /api/waitlist endpoint
- [ ] POST /api/contact endpoint
- [ ] Double opt-in email template
- [ ] Contact form confirmation email
- [ ] Error handling + rate limiting

### Phase 7: German Localization
- [ ] Create all DE page variants
- [ ] Translate UI strings (src/lib/translations/de.json)
- [ ] Test language switching across all pages
- [ ] Verify hreflang tags

### Phase 8: Blog
- [ ] Blog listing page (EN + DE)
- [ ] Blog post template
- [ ] Create 6 initial posts (3 EN + 3 DE) in Sanity
- [ ] Reading progress bar
- [ ] Related posts section

### Phase 9: SEO & LLM Optimization
- [ ] Schema.org JSON-LD on all pages
- [ ] FAQ structured data
- [ ] /llms.txt
- [ ] /llms-ctx.txt (auto-generated)
- [ ] /api/facts.json endpoint
- [ ] .md versions of facts pages
- [ ] robots.txt with AI crawler rules
- [ ] sitemap.xml
- [ ] Open Graph images
- [ ] hreflang verification

### Phase 10: Premium Motion Polish
- [ ] Homepage hero animation (text reveal + product visual)
- [ ] Page transitions (View Transitions API)
- [ ] Scroll-driven animations for each page
- [ ] Timeline line-draw animation
- [ ] Sensor diagram hover effects
- [ ] Parallax effects on images
- [ ] Counter animations for stats
- [ ] Dark mode transition animation
- [ ] Breathing demo animation refinement

### Phase 11: Analytics & Cookie Consent
- [ ] Self-host Matomo instance
- [ ] Integrate Matomo tracking code
- [ ] Set up custom events
- [ ] Cookie consent bar component
- [ ] Consent state management

### Phase 12: Legal Pages
- [ ] Privacy Policy (EN + DE)
- [ ] Terms (EN)
- [ ] AGB (DE)
- [ ] Cookies Policy (EN + DE)
- [ ] Data Deletion (EN + DE)
- [ ] Impressum (DE)

### Phase 13: Testing & QA
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile testing (iOS Safari, Chrome Android)
- [ ] Dark mode on all pages
- [ ] Language switching on all pages
- [ ] Form validation (success + error states)
- [ ] Lighthouse audit (target: 95+ performance)
- [ ] Schema.org validation (schema.org validator)
- [ ] hreflang validation
- [ ] Link checking (no 404s)
- [ ] Accessibility audit (axe DevTools)

### Phase 14: Launch
- [ ] Configure DNS for smartmouthtape.com
- [ ] Deploy to production host
- [ ] Verify SSL certificate
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify Matomo tracking in production
- [ ] Test waitlist form end-to-end in production
- [ ] Monitor Core Web Vitals for first 48 hours

---

## Appendix A: Placeholder Values

The following values need to be filled in before launch:

```
{{support_email}}         → e.g., hello@smartmouthtape.com
{{press_email}}           → e.g., press@smartmouthtape.com
{{partnership_email}}     → e.g., partners@smartmouthtape.com
{{privacy_email}}         → e.g., privacy@smartmouthtape.com
{{company_name}}          → Legal company name
{{company_address}}       → Registered address
{{company_country}}       → Country
{{managing_director}}     → Name(s)
{{registration}}          → Firmenbuch/Handelsregister number
{{vat_id}}                → UID/VAT number
{{authority}}             → Aufsichtsbehörde
{{year}}                  → Dynamic (use JavaScript Date)
{{linkedin_url}}          → LinkedIn company page URL
{{youtube_url}}           → YouTube channel URL
{{instagram_url}}         → Instagram profile URL
{{matomo_url}}            → Self-hosted Matomo URL
{{matomo_site_id}}        → Matomo site ID
```

---

## Appendix B: Brand Assets Reference

### Available from /branding/

**Logos** (all PNG, AI, PDF formats):
- `respire-labs-logo_primary-logo.png` — Full color logo (blue symbol + dark text)
- `respire-labs-logo_black-white-logo.png` — B&W version
- `respire-labs-logo_dark-grey-logo.png` — Dark grey version
- `respire-labs-logo_white-on-colour-logo.png` — White version (for dark/colored backgrounds)
- `respire-labs-symbol_blue-symbol.png` — Standalone lung symbol (blue)
- `respire-labs-symbol_dark-grey-symbol.png` — Standalone symbol (dark grey)
- `respire-labs-symbol_white-symbol.png` — Standalone symbol (white)

**Icons** (SVG + PNG):
- `respire-labs-icons_nose.svg` — Nasal breathing
- `respire-labs-icons_mouth.svg` — Mouth breathing
- `respire-labs-icons_tape.svg` — Smart Mouth Tape
- `respire-labs-icons_sleep.svg` — Good sleep
- `respire-labs-icons_bad-sleep.svg` — Poor sleep
- `respire-labs-icons_microphone.svg` — Audio/detection
- `respire-labs-icons_monitor.svg` — Monitoring/data

**Fonts**:
- Oddval (Variable + static weights: Hairline through Black)
- Montserrat (Variable: all weights)
- EB Garamond (Variable: all weights)

**Brand color from SVG source**: `#3D50F4`

---

*End of specification. This document contains all decisions made during the interview process and is ready for implementation.*
