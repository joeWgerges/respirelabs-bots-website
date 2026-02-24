# RespireLabs Website — Project Instructions

> **Project**: smartmouthtape.com (RespireLabs marketing website)
> **Status**: Early build — foundation + static pages complete, major features pending
> **Domain**: smartmouthtape.com (production) / respirelabs.com (currently configured)

## Critical Rules

1. **Medical claims**: RespireLabs is a wellness product. NEVER claim it diagnoses, treats, cures, or prevents any disease. Always include medical disclaimers where appropriate.
2. **Privacy-first language**: Core detection runs locally/offline. Never imply data is shared without consent.
3. **Bilingual parity**: Every EN page must have a DE equivalent. Every UI string must exist in both languages.
4. **Accessibility**: WCAG 2.1 AA compliance. All images need alt text, form inputs need labels, focus states must be visible, heading hierarchy must not skip levels.
5. **No JS by default**: Astro ships zero JS unless explicitly needed. Only use React islands (`client:visible`) for truly interactive components. Keep the site static-first.
6. **Font usage**: Oddval for headings, Montserrat for body/UI, EB Garamond for quotes/editorial. Never mix these roles.
7. **Performance budget**: Target Lighthouse 95+, LCP < 2s, total JS < 150KB gzipped, page weight < 500KB initial load.

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
    │   ├── fonts/                # Font files (TTF, not yet WOFF2)
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

### What's NOT Built Yet (from WEBSITE_SPEC.md)

- React islands: BreathingDemo, NoseBreathingTimer, ComparisonSlider, FAQAccordion, HowItWorksTimeline, SensorDiagramExplorer
- Conversion components: StickyBar, ExitIntentPopup, SlideInCTA, WaitlistForm (React)
- Dark mode system (toggle, CSS variables, nanostore)
- Sanity CMS integration (schemas, Studio at /studio, data fetching)
- GSAP animations (currently using CSS-only IntersectionObserver reveals)
- Brevo CRM integration (API endpoints for waitlist/contact)
- Matomo analytics
- Cookie consent banner
- Legal pages: terms, cookies, data-deletion, AGB, datenloeschung
- WOFF2 font conversion (currently serving TTF)
- OG images (using logo as placeholder)

## Design System & Brand Tokens

### Colors (defined in `global.css` @theme)

| Token | Value | Usage |
|---|---|---|
| `brand-blue` | `#206FF7` | Primary accent, links, CTAs |
| `brand-dark` | `#0A0A0B` | Text, dark backgrounds |
| `brand-white` | `#FAFAFA` | Page background |
| `brand-yellow` | `#FFDC31` | Secondary accent, highlights |
| `brand-grey` | `#6B7280` | Secondary text (WCAG AA compliant) |
| `brand-light` | `#E5E7EB` | Borders, subtle backgrounds |

**Note**: The WEBSITE_SPEC.md defines a more extensive token system (primary-50 through primary-950, dark mode palette with deep navy #0a0f1e). The current implementation uses a simpler flat palette. When implementing dark mode, follow the spec's CSS custom property system.

### Typography

| Role | Font | CSS Variable | Tailwind Class |
|---|---|---|---|
| Headings | Oddval | `--font-oddval` | `font-oddval` |
| Body/UI | Montserrat | `--font-montserrat` | `font-montserrat` |
| Quotes/Editorial | EB Garamond | `--font-garamond` | `font-garamond` |

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

- All pages exist in `/en/` and `/de/` directories
- Root `/` redirects to `/en` (language detection not yet implemented)
- Header nav links are defined per-language in `Header.astro`
- Footer links are defined per-language in `Footer.astro`
- Language switcher swaps `/en` ↔ `/de` in the URL path
- `hreflang` tags are auto-generated in `Layout.astro`
- Static UI strings are currently inline (not yet extracted to JSON files)

### Structured Data

Pages can pass JSON-LD via the `structuredData` frontmatter prop. The Layout automatically injects:
- Organization schema (all pages)
- WebSite schema (all pages)
- Page-specific schemas (MobileApplication, Product, FAQPage, Article) via frontmatter

## Key Reference Documents

| Document | Purpose | When to Reference |
|---|---|---|
| `WEBSITE_SPEC.md` | Complete technical specification | Building any new feature or component |
| `MASTER_TRACKING.md` | 147 tickets organized by epic | Planning work, checking dependencies |
| `MASTER_CHECKLIST.md` | Ordered build checklist | Tracking progress, finding next task |
| `readme.md` | Full bilingual content source | Writing page copy, blog content |

### Critical Path (from MASTER_TRACKING.md)

```
E01 (Setup) → E02 (Design Tokens) → E03 (Global Components) → E09 (EN Pages) → E10 (DE Pages) → E14 (Launch)
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
3. Add nav link in `Header.astro` navLinks (both `en` and `de` objects)
4. Add footer link if it's a legal/info page
5. Include `hreflang` tags (automatic via Layout)
6. Add structured data if applicable

### Adding a Blog Post

1. Create `website/src/pages/en/blog/NN-slug.md` with MarkdownLayout frontmatter
2. Create matching `website/src/pages/de/blog/NN-slug.md`
3. Add card entry to `blog/index.astro` in both languages

### Dark Section Styling

When a section uses `bg-brand-dark`:
- Text: `text-white` or `text-brand-light`
- Subtle text: `text-brand-light/70`
- Accent: `text-brand-yellow`
- Grid pattern: `bg-grid-pattern-dark`
- Cards: `bg-white/5 border border-white/10`
- Use `focus-ring-dark` for interactive elements

## Known Issues

- Fonts served as TTF instead of WOFF2 (larger file sizes)
- `astro.config.mjs` has `site: 'https://respirelabs.com'` — should be updated to `https://smartmouthtape.com` for production
- Waitlist form is client-side only (no backend endpoint yet)
- No dark mode toggle or dark mode CSS variables
- No actual CMS — all content is hardcoded in `.astro` and `.md` files
- Some DE pages use English URL slugs (e.g., `/de/how-it-works` instead of `/de/so-funktionierts`)
- Blog post cards on `blog/index.astro` are manually maintained (not auto-generated from content)
- `user-scalable=no` in viewport meta tag may cause accessibility issues
