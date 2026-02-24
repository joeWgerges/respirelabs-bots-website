# RespireLabs Website — Project Instructions

> **Project**: smartmouthtape.com (RespireLabs marketing website)
> **Status**: Early build — foundation + static pages complete, major features pending
> **Domain**: smartmouthtape.com (production) / respirelabs.com (currently configured)

## Critical Rules

1. **Medical claims**: RespireLabs is a wellness product. NEVER claim it diagnoses, treats, cures, or prevents any disease. Always include medical disclaimers where appropriate.
2. **Privacy-first language**: Core detection runs locally/offline. Never imply data is shared without consent.
3. **Trilingual parity**: Every EN page must have a DE and PL equivalent. Every UI string must exist in all three languages. When building any new page, component, or feature, always create/update the Polish (PL) version alongside EN and DE.
4. **Accessibility**: WCAG 2.1 AA compliance. All images need alt text, form inputs need labels, focus states must be visible, heading hierarchy must not skip levels.
5. **No JS by default**: Astro ships zero JS unless explicitly needed. Only use React islands (`client:visible`) for truly interactive components. Keep the site static-first.
6. **Font usage**: Oddval for headings, Montserrat for body/UI, EB Garamond for quotes/editorial. Never mix these roles.
7. **Performance budget**: Target Lighthouse 95+, LCP < 2s, total JS < 150KB gzipped, page weight < 500KB initial load.

## Deployment (Netlify)

**IMPORTANT**: Always deploy to the correct Netlify project.

| Setting | Value |
|---|---|
| **Netlify Site** | `smartbreathing-app` |
| **Site ID** | `bdbfe489-72f3-4b21-a62e-ba7b2fbce77e` |
| **Production URL** | https://smartbreathing-app.netlify.app |
| **Deploy directory** | `website/dist` |

**Deploy commands** (run from project root):
```bash
# 1. Build the site
cd website && npm run build && cd ..

# 2. Ensure linked to the correct site
npx netlify link --id bdbfe489-72f3-4b21-a62e-ba7b2fbce77e

# 3. Deploy to production
npx netlify deploy --prod --dir=website/dist
```

**Do NOT deploy to**: `respairelabai` or any other Netlify project. Always verify you are linked to `smartbreathing-app` before deploying.

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Astro (static-first, island architecture) | 5.x |
| Styling | Tailwind CSS | 4.x |
| Content (future) | Sanity CMS v3 | Not yet installed |
| Animation (future) | GSAP + ScrollTrigger | Not yet installed |
| Interactive islands (future) | React 19 | Not yet installed |
| Forms (future) | React Hook Form | Not yet installed |
| State (future) | nanostores | Not yet installed |
| Package manager | npm | — |
| Build output | Static HTML to `dist/` | — |

### What's Installed Now

```json
{
  "astro": "^5.17.1",
  "@astrojs/mdx": "^4.3.13",
  "@astrojs/sitemap": "^3.7.0",
  "@tailwindcss/vite": "^4.2.1",
  "@tailwindcss/typography": "^0.5.19",
  "@heroicons/react": "^2.2.0",
  "tailwindcss": "^4.2.1"
}
```

### What Still Needs to Be Installed (per WEBSITE_SPEC.md)

- `@astrojs/react` + `react` + `react-dom` (for interactive islands)
- `gsap` (for ScrollTrigger animations)
- `sanity` + `@sanity/client` + `@sanity/document-internationalization` (CMS)
- `nanostores` + `@nanostores/react` (shared state)
- `react-hook-form` (form validation)

## Project Structure

```
Respirelabs-gemini/
├── CLAUDE.md                    # This file
├── readme.md                    # Full bilingual content pack + tech recommendations
├── WEBSITE_SPEC.md              # Complete technical specification (21 sections)
├── MASTER_TRACKING.md           # 147 tickets across 14 epics
├── MASTER_CHECKLIST.md          # 300+ item launch checklist
├── branding/                    # Brand assets (fonts, icons, logos, guidelines PDF)
│   ├── Fonts/                   # Oddval, Montserrat, EB Garamond (TTF/OTF)
│   ├── Icons/                   # 7 brand SVGs + PNGs (nose, mouth, tape, sleep, etc.)
│   └── Logo/                    # Logo variants (primary, white, dark grey, symbol)
└── website/                     # Astro project root
    ├── astro.config.mjs         # Astro config (i18n, sitemap, Tailwind)
    ├── package.json
    ├── tsconfig.json             # TypeScript strict mode
    ├── public/                   # Static assets served as-is
    │   ├── assets/icons/         # Brand icons (copied from branding/)
    │   ├── assets/logo/          # Logo variants (copied from branding/)
    │   ├── fonts/                # Font files (variable TTF)
    │   ├── en/, de/              # Static markdown content files
    │   ├── llms.txt              # LLM discovery file
    │   ├── robots.txt
    │   ├── favicon.ico, favicon.svg
    │   └── ...
    └── src/
        ├── components/
        │   ├── Header.astro      # Responsive nav, language switcher, mobile menu
        │   ├── Footer.astro      # Legal links, medical disclaimer, contact
        │   └── ui/Button.astro   # Multi-variant button (primary/secondary/outline/ghost/glass)
        ├── layouts/
        │   ├── Layout.astro      # Base layout (head, SEO, structured data, scroll animations)
        │   └── MarkdownLayout.astro  # Blog/markdown content layout with typography
        ├── pages/
        │   ├── index.astro       # Root redirect to /en
        │   ├── en/               # All English pages
        │   └── de/               # All German pages (mirrors EN structure)
        └── styles/
            └── global.css        # Tailwind config, @font-face, brand tokens, animations
```

## Development Commands

All commands run from `website/` directory:

```bash
cd website
npm run dev          # Start dev server at localhost:4321
npm run build        # Build static site to dist/
npm run preview      # Preview production build locally
```

## Current Build Status

### Pages Built (37 total)

**EN pages (18)**: index, app, smart-mouth-tape, how-it-works, compare, faq, science-safety, about, waitlist, contact, press.md, pricing.md, facts.md, privacy.md, blog/index, blog/01, blog/02, blog/03

**DE pages (18)**: Mirror of all EN pages with German content

**Root**: index.astro (redirects to /en)

### What's NOT Built Yet

- React islands: BreathingDemo, NoseBreathingTimer, ComparisonSlider, FAQAccordion, HowItWorksTimeline, SensorDiagramExplorer
- Conversion components: StickyBar, ExitIntentPopup, SlideInCTA, WaitlistForm (React)
- Dark mode system (toggle, CSS variables, nanostore)
- Sanity CMS integration (schemas, Studio at /studio, data fetching)
- GSAP animations (currently using CSS-only IntersectionObserver reveals)
- Brevo CRM integration (API endpoints for waitlist/contact)
- Matomo analytics
- Cookie consent banner
- Legal pages: terms, cookies, data-deletion, AGB, datenloeschung
- OG images (using logo as placeholder)

## Design System & Brand Tokens (Final)

The current design, color palette, fonts, and branding are **locked in**. Do not refactor toward alternative token systems.

### Colors (defined in `global.css` @theme)

| Token | Value | Usage |
|---|---|---|
| `brand-blue` | `#206FF7` | Primary accent, links, CTAs |
| `brand-dark` | `#0A0A0B` | Text, dark section backgrounds |
| `brand-white` | `#FAFAFA` | Page background |
| `brand-yellow` | `#FFDC31` | Secondary accent, highlights, dark-mode emphasis |
| `brand-grey` | `#6B7280` | Secondary text (WCAG AA compliant) |
| `brand-light` | `#E5E7EB` | Borders, subtle backgrounds |

Additional surface colors used inline: `#F5F5F7` and `#F7F7F9` for alternating section backgrounds.

### Typography

| Role | Font | Format | CSS Variable | Tailwind Class |
|---|---|---|---|---|
| Headings | Oddval Variable | TTF | `--font-oddval` | `font-oddval` |
| Body/UI | Montserrat Variable | TTF | `--font-montserrat` | `font-montserrat` |
| Quotes/Editorial | EB Garamond Variable | TTF | `--font-garamond` | `font-garamond` |

Fonts are self-hosted as variable TTF files from `public/fonts/`. All use `font-display: swap`.

### Visual Style

The site uses a clean, premium aesthetic inspired by Linear/Apple product pages:
- **Glass panels**: `glass-panel` / `glass-panel-dark` — frosted blur with subtle borders
- **Grid patterns**: `bg-grid-pattern` / `bg-grid-pattern-dark` — faint 40px grid with fade masks
- **Gradient orbs**: Large blurred color circles for ambient depth (brand-blue, brand-yellow)
- **Bento box layouts**: Mixed-size card grids using `md:col-span-*` on 12-column grid
- **Rounded corners**: `rounded-[2rem]` for feature cards, `rounded-full` for buttons/pills
- **Dark sections**: `bg-brand-dark` with `text-white`, `brand-yellow` accents, grid pattern overlay

### Utility Classes (custom in global.css)

- `.text-gradient` — Blue-to-cyan gradient text
- `.glass-panel` / `.glass-panel-dark` — Frosted glass effect
- `.bg-grid-pattern` / `.bg-grid-pattern-dark` — Subtle grid background
- `.focus-ring` / `.focus-ring-dark` — Accessible focus indicators
- `.reveal` / `.reveal-left` / `.reveal-right` — Scroll-triggered animations (add `.active` to trigger)
- `.delay-100` through `.delay-500` — Animation stagger delays

## Coding Patterns

### Page Template

Every `.astro` page follows this pattern:

```astro
---
import Layout from '../../layouts/Layout.astro';
import Button from '../../components/ui/Button.astro';

const frontmatter = {
  title: 'Page Title – RespireLabs',
  description: 'Meta description under 160 chars.',
  lang: 'en', // or 'de'
  structuredData: { /* optional JSON-LD */ }
};
---

<Layout frontmatter={frontmatter}>
  <!-- Sections go here -->
</Layout>
```

### Markdown Pages

Blog posts and simple pages use markdown with frontmatter:

```markdown
---
layout: "../../../layouts/MarkdownLayout.astro"
lang: "en"
title: "Article Title"
description: "Article description"
---
# Content here
```

### Section Pattern

Each page section follows a consistent structure:

```astro
<section class="py-24 bg-brand-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16 reveal">
      <h2 class="text-4xl md:text-5xl font-oddval font-bold text-brand-dark mb-4">Heading</h2>
      <p class="text-lg font-montserrat text-brand-grey font-light">Subtext</p>
    </div>
    <!-- Section content -->
  </div>
</section>
```

Key conventions:
- Section padding: `py-24` to `py-32` (desktop), content auto-adjusts on mobile
- Max width: `max-w-7xl` for full layouts, `max-w-5xl` for focused content, `max-w-3xl` for text-heavy
- Animations: Add `.reveal` class to elements for scroll-triggered fade-up
- Backgrounds alternate: `bg-brand-white`, `bg-[#F7F7F9]`, `bg-brand-dark` (for emphasis)

### Button Component

The `Button.astro` component supports 5 variants:

```astro
<Button href="/en/waitlist" variant="primary">Join waitlist</Button>
<Button href="/en/how-it-works" variant="secondary">Learn more</Button>
<Button href="#" variant="outline">Outline</Button>
<Button href="#" variant="ghost">Ghost</Button>
<Button href="#" variant="glass">Glass (for dark bg)</Button>
```

### i18n Pattern

- All pages exist in `/en/`, `/de/`, and `/pl/` directories (Polish pending implementation)
- Root `/` redirects to `/en` (language detection not yet implemented)
- Header nav links are defined per-language in `Header.astro`
- Footer links are defined per-language in `Footer.astro`
- Language switcher cycles `/en` ↔ `/de` ↔ `/pl` in the URL path
- `hreflang` tags are auto-generated in `Layout.astro`
- **When adding any new page or feature**: Always create the PL version alongside EN and DE
- Static UI strings are currently inline (not yet extracted to JSON files)

### Structured Data

Pages can pass JSON-LD via the `structuredData` frontmatter prop. The Layout automatically injects:
- Organization schema (all pages)
- WebSite schema (all pages)
- Page-specific schemas (MobileApplication, Product, FAQPage, Article) via frontmatter

## Key Reference Documents

**IMPORTANT**: Always read the relevant reference document before starting work on a feature or ticket. These files are the source of truth for specifications, progress tracking, and content.

### WEBSITE_SPEC.md — Full Technical Specification
- **Path**: `/Users/JoeG/Documents/Respirelabs-gemini/WEBSITE_SPEC.md`
- **What it contains**: 21 sections covering every aspect of the build — tech stack, project structure, design tokens (full color scales, spacing, radii, shadows), dark mode system, typography system, animation/motion system (GSAP presets, ScrollTrigger config, animation catalog), i18n (language detection flow, URL structure, hreflang), Sanity CMS architecture (all schemas: page, blogPost, faqItem, siteSettings, object types, desk structure, data fetching), SEO & LLM optimization (llms.txt, robots.txt, JSON-LD schemas, facts.json endpoint), conversion system (waitlist funnel: inline CTAs, sticky bar, exit-intent popup, slide-in CTA, session tracking logic, form fields), form & API architecture (serverless endpoints, Brevo setup), analytics (Matomo events table), cookie consent, interactive components (BreathingDemo, NoseBreathingTimer, ComparisonSlider, FAQAccordion, HowItWorksTimeline, SensorDiagramExplorer — each with detailed specs), page-by-page specifications (section order, content, animations for all ~20 pages), image & asset requirements, hosting & deployment (Netlify config, CI/CD pipeline, env vars), performance budgets, accessibility standards, and build phases checklist.
- **When to read**: Before building ANY new component, page, feature, or integration. This is the authoritative spec.

### MASTER_TRACKING.md — Ticket Tracker (147 Tickets, 14 Epics)
- **Path**: `/Users/JoeG/Documents/Respirelabs-gemini/MASTER_TRACKING.md`
- **What it contains**: Every ticket organized by epic with ID, description, priority (P0-P3), status (TODO/IN PROGRESS/DONE), dependencies, and effort estimates. Includes detailed notes per epic about what's actually implemented vs. planned, acceptance criteria, and frontend design details (ASCII wireframes for Header, Footer, BreathingDemo, SensorDiagram, Timeline, StickyBar, ExitIntentPopup, blog cards). Also has the dependency graph and critical path.
- **Epics**: E01 (Setup, 4/12 done), E02 (Design Tokens, 10/11 done), E03 (Global Components, 8/10 done), E04 (Sanity CMS, 0/13), E05 (i18n, 2/7), E06 (Animations, 3/12), E07 (Interactive Components, 0/11), E08 (Conversion, 0/10 + 1 in progress), E09 (EN Pages, 15/16 done), E10 (DE Pages, 5/8), E11 (Blog, 5/7), E12 (SEO/LLM, 4/13), E13 (Analytics/CRM, 0/8), E14 (QA/Launch, 0/9)
- **When to read**: Before starting a new ticket — check its status, dependencies, and which epic it belongs to. After completing work — update the ticket status. When planning what to work on next.

### MASTER_CHECKLIST.md — Ordered Launch Checklist (300+ Items)
- **Path**: `/Users/JoeG/Documents/Respirelabs-gemini/MASTER_CHECKLIST.md`
- **What it contains**: Every task in execution order across 12 phases, with `[x]` done / `[ ]` pending / `[~]` partial / `[!]` blocked markers. Covers: project initialization, design tokens, global components, Sanity CMS setup, i18n, GSAP animations, interactive components, conversion components, all EN pages (with section-level detail), DE localization (with slug rename notes), blog, SEO/LLM optimization, analytics/Matomo, cookie consent, Brevo CRM, premium motion polish, QA/testing (cross-browser, responsive breakpoints, feature testing, performance, accessibility, SEO final check), launch (DNS, deployment, post-launch). Also has image/asset production checklist, environment variables checklist, and placeholder values checklist.
- **When to read**: To find the next task to work on (work top-to-bottom within each phase). To verify what's been completed and what's still pending at a granular level.

### readme.md — Bilingual Content Source
- **Path**: `/Users/JoeG/Documents/Respirelabs-gemini/readme.md`
- **What it contains**: Full bilingual (EN + DE) content pack for all pages — homepage copy, product descriptions, feature lists, FAQ questions and answers, blog post content, legal text, about/press copy. Also contains tech recommendations and product positioning.
- **When to read**: When writing page copy, translating content, creating blog posts, or needing the exact wording for any page section.

### Critical Path (from MASTER_TRACKING.md)

```
E01 (Setup) → E02 (Design Tokens) → E03 (Global Components) → E09 (EN Pages) → E10 (DE Pages) → E15 (PL Pages) → E14 (Launch)
```

Parallelizable: E04 (Sanity), E06 (Animations), E07 (Interactive), E08 (Conversion), E12 (SEO)

## Do NOT Modify

- `branding/` — Source brand assets, read-only reference
- `public/llms.txt` — LLM discovery file, update only when adding/removing pages
- `public/robots.txt` — Crawler rules, update only for policy changes
- Existing page content that includes medical disclaimers — review carefully before editing

## Common Patterns to Follow

### Adding a New EN Page

1. Create `website/src/pages/en/new-page.astro`
2. Create matching `website/src/pages/de/new-page.astro` (or localized slug)
3. Create matching `website/src/pages/pl/new-page.astro` (or localized slug)
4. Add nav link in `Header.astro` navLinks (`en`, `de`, and `pl` objects)
5. Add footer link if it's a legal/info page
6. Include `hreflang` tags (automatic via Layout)
7. Add structured data if applicable

### Adding a Blog Post

1. Create `website/src/pages/en/blog/NN-slug.md` with MarkdownLayout frontmatter
2. Create matching `website/src/pages/de/blog/NN-slug.md`
3. Create matching `website/src/pages/pl/blog/NN-slug.md`
4. Add card entry to `blog/index.astro` in all three languages

### Dark Section Styling

When a section uses `bg-brand-dark`:
- Text: `text-white` or `text-brand-light`
- Subtle text: `text-brand-light/70`
- Accent: `text-brand-yellow`
- Grid pattern: `bg-grid-pattern-dark`
- Cards: `bg-white/5 border border-white/10`
- Use `focus-ring-dark` for interactive elements

## Known Issues

- `astro.config.mjs` has `site: 'https://respirelabs.com'` — should be updated to `https://smartmouthtape.com` for production
- Waitlist form is client-side only (no backend endpoint yet)
- No dark mode toggle or dark mode CSS variables
- No actual CMS — all content is hardcoded in `.astro` and `.md` files
- Some DE pages use English URL slugs (e.g., `/de/how-it-works` instead of `/de/so-funktionierts`)
- Blog post cards on `blog/index.astro` are manually maintained (not auto-generated from content)
- `user-scalable=no` in viewport meta tag may cause accessibility issues
