# RespireLabs Launch Page — Project Knowledge

> **Project**: app.respirelabs.com (standalone mobile app launch landing page)
> **Status**: Active development
> **Deployed as**: Separate website from main smartmouthtape.com

## Overview

This is a **standalone single-page landing page** for the RespireLabs mobile app launch. It lives within the main Respirelabs-gemini repo but is built and deployed independently to `app.respirelabs.com`. It shares the same Astro project (`website/`) but uses its own layout, header, footer, and does NOT link to other pages on the main site.

The page drives waitlist signups for the upcoming mobile app (AI-powered breathing health app that detects mouth breathing and helps users sleep better).

## Architecture — Standalone Setup

This landing page is treated as a **separate website**:
- **Own layout**: `LaunchLayout.astro` (NOT the main `Layout.astro`)
- **Own header**: Minimal — logo + language pills + "Join Waitlist" CTA button (opens modal). No navigation links to the main site.
- **Own footer**: Minimal — medical disclaimer, copyright, privacy link, email
- **Own domain**: `app.respirelabs.com` (separate from `smartmouthtape.com`)
- **Own deploy folder**: Build output is extracted to `launch-deploy/` for independent deployment
- **Own database**: Supabase project for waitlist signups (not part of Grace App backend)

## Pages (3 total — trilingual)

| Path | Language | File |
|------|----------|------|
| `/en/launch` | English | `website/src/pages/en/launch.astro` |
| `/de/launch` | German | `website/src/pages/de/launch.astro` |
| `/pl/launch` | Polish | `website/src/pages/pl/launch.astro` |

Root `/` redirects to `/en/launch`.

## File Structure

```
website/src/
├── layouts/
│   └── LaunchLayout.astro          # Standalone layout (header, footer, modal, scripts)
├── components/islands/
│   ├── LaunchWaitlistForm.tsx       # Waitlist form (React island, connects to Supabase)
│   ├── LiveWaitlistCounter.tsx      # Real-time waitlist count (currently unused on page)
│   └── CountdownTimer.tsx           # Countdown to launch date (compact + full size)
├── pages/
│   ├── en/launch.astro             # English page
│   ├── de/launch.astro             # German page
│   └── pl/launch.astro             # Polish page
└── lib/
    └── supabase.ts                 # Supabase client (unused — props passed directly now)

website/public/assets/
└── app-screenshots/                # 7 WebP screenshots of the mobile app
    ├── home-dashboard.webp
    ├── breathing-pattern.webp
    ├── achievements.webp
    ├── breathing-analysis.webp
    ├── daily-tips.webp
    ├── knowledge-center.webp
    └── teleconsultation.webp

launch-deploy/                      # Standalone deploy folder (generated from build)
```

## Page Sections (Full-Viewport Design)

Every section fills the full viewport height (`min-height: 100dvh` via `.section-full`). The page scrolls section-by-section like slides.

| # | Section | Background | Key Elements |
|---|---------|------------|--------------|
| 1 | **Hero** | Dark (`bg-brand-dark`) | Heading, subheading, pills, CTA buttons, compact countdown, particle animation |
| 2 | **The Problem** | Dark | Three stat cards (50%, 3x, 80%) with GSAP counters, editorial quote, CTA |
| 3 | **Phone Showcase** | Dark→Light (GSAP pinned transition) | Phone mockup cycling through 4 screenshots, "Meet RespireLabs" text |
| 4 | **Features** | Light (`#FAFAFA`) | Bento grid with 6 feature cards + app screenshots, CTA |
| 5 | **How It Works** | Light (`#F7F7F9`) | 3-step vertical layout with phone mockups, CTA |
| 6 | **Smart Tape** | Dark | Tape icon with glow, description, CTA |

## CTA & Waitlist Form Behavior

**Every section has a CTA button** with class `cta-waitlist`. When clicked:
1. A hidden `<div class="waitlist-inline">` immediately after that section slides open
2. Contains a white card with the full waitlist form
3. Page smooth-scrolls to the form
4. Clicking again toggles it closed
5. Only one form is open at a time (others close)

**Header CTA** (`#header-waitlist-btn`): Opens a **modal popup** instead of inline form. Modal has backdrop blur, close button, escape key support.

**Implementation**: Each CTA button is a `<button type="button" class="cta-waitlist">`. The script in the page finds the nearest `.waitlist-inline` sibling after the button's parent section and toggles it.

## Waitlist Form (LaunchWaitlistForm.tsx)

**Fully controlled React component** (no react-hook-form dependency — uses useState):
- Fields: First name, Email, Interest checkboxes (App/Tape/Both), How heard dropdown, Privacy consent
- Checkboxes are `<button>` elements (not hidden inputs) for reliable click handling
- Validation on submit with inline error messages
- Supabase client created in `useEffect` only (never during SSR)
- Success state: Green checkmark + "You're on the list!" message
- Duplicate handling: `23505` unique violation treated as success
- localStorage: Saves email to `respirelabs_waitlist_submitted` to persist success state

**Props** (passed from Astro frontmatter where env vars work):
```tsx
<LaunchWaitlistForm client:visible lang="en" supabaseUrl={sbUrl} supabaseKey={sbKey} />
```

**IMPORTANT**: `import.meta.env.PUBLIC_*` vars do NOT work inside React islands (`.tsx` files). They must be read in the `.astro` frontmatter and passed as props.

## Supabase Database

| Setting | Value |
|---------|-------|
| **Project ref** | `mbatljbrvpdwyrbazuni` |
| **Region** | West EU (Ireland) |
| **Table** | `waitlist_signups` |
| **RLS** | Anon can INSERT only, no SELECT |
| **Counter** | `get_waitlist_count()` function (security definer) |
| **Realtime** | Enabled on the table |

### Schema
```sql
CREATE TABLE waitlist_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  first_name text,
  interest text[] DEFAULT '{}',
  hear_about text,
  source text DEFAULT 'launch-page',
  lang text DEFAULT 'en' CHECK (lang IN ('en', 'de', 'pl')),
  created_at timestamptz DEFAULT now()
);
```

### Environment Variables (in `website/.env`)
```
PUBLIC_SUPABASE_URL=https://mbatljbrvpdwyrbazuni.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
```

Migration file: `supabase/migrations/20260324_create_waitlist.sql`

## Night-to-Dawn Transition

The signature creative feature. A GSAP ScrollTrigger-pinned section that:
1. Phone mockup fades in from bottom (0-25% scroll)
2. Background color interpolates `#0A0A0B` → `#FAFAFA` (25-75% scroll)
3. Phone screenshots crossfade through 4 app screens
4. Phone frame color changes dark → light
5. "Meet RespireLabs" text fades in (75-100% scroll)

**Reduced motion**: Falls back to static gradient with visible text.

Script is inline in each page file (not in animations.ts).

## Design System (matches main site)

| Token | Value | Usage |
|-------|-------|-------|
| `brand-blue` | `#206FF7` | CTAs, accents, links |
| `brand-dark` | `#0A0A0B` | Dark sections, text |
| `brand-white` | `#FAFAFA` | Light sections |
| `brand-yellow` | `#FFDC31` | Highlights, quotes |
| `brand-grey` | `#6B7280` | Secondary text |

**Fonts**: Oddval (headings), Montserrat (body/UI), EB Garamond (quotes). Self-hosted variable TTF.

**Visual classes**: `.glass-panel`, `.glass-panel-dark`, `.bg-grid-pattern-dark`, `.text-gradient`, `.reveal` (scroll animations)

## Build & Deploy

```bash
# Build
cd website && npm run build

# The launch pages are in dist/en/launch/, dist/de/launch/, dist/pl/launch/

# Generate standalone deploy folder
# (run the deploy script or manually copy needed files — see launch-deploy/)

# Deploy launch-deploy/ folder to app.respirelabs.com
```

**Countdown target date**: May 1, 2026 (`2026-05-01T00:00:00Z`)

## Key Rules

1. **Standalone**: This page does NOT link to the main site navigation. No Header.astro, no Footer.astro from the main site.
2. **Trilingual parity**: Every change to EN must be mirrored to DE and PL.
3. **Supabase props**: Always pass `supabaseUrl` and `supabaseKey` as props to React islands. Never use `import.meta.env` inside `.tsx` files.
4. **Full viewport sections**: Every section uses `.section-full` (min-height: 100dvh).
5. **CTA pattern**: Use `<button class="cta-waitlist">` for in-page CTAs. The script handles reveal/toggle of the nearest `.waitlist-inline` form.
6. **Medical disclaimer**: Always present in the footer. RespireLabs is a wellness product, not medical.
7. **No em dashes**: Use commas instead of `—` or `&mdash;` throughout all copy.
8. **Deploy separately**: Build output goes to `launch-deploy/` folder for independent hosting at app.respirelabs.com.

## What NOT to Add

- Navigation links to the main site pages (app, how-it-works, compare, etc.)
- Partner/supporter logo trust bar (no logo image files exist)
- Testimonials or social proof (removed per user preference)
- Bottom countdown section (removed — countdown is only in the hero)
- Live waitlist counter (component exists but not used on the page currently)
- Dark mode toggle (not used on launch page)
