# RespireLabs Website — Master Launch Checklist

> **Project**: smartmouthtape.com
> **Created**: 2026-02-22
> **Tracking**: [MASTER_TRACKING.md](./MASTER_TRACKING.md)
> **Spec**: [WEBSITE_SPEC.md](./WEBSITE_SPEC.md)

---

## How to Use This Checklist

Check items as completed. Items are ordered by dependency — work top to bottom.
Each section maps to an Epic in MASTER_TRACKING.md.

**Status markers**: Use `[x]` for done, `[ ]` for pending, `[~]` for in progress, `[!]` for blocked.

---

## Phase 1: Foundation (Week 1)

### 1.1 Project Initialization
- [ ] Initialize Astro 5.x project with `pnpm create astro@latest`
- [ ] Install @astrojs/react adapter (React 19)
- [ ] Install @astrojs/tailwind
- [ ] Install @astrojs/mdx
- [ ] Install @astrojs/sitemap
- [ ] Configure TypeScript strict mode in tsconfig.json
- [ ] Install GSAP + ScrollTrigger (`gsap` package)
- [ ] Install Sanity v3 + @sanity/client + @sanity/document-internationalization
- [ ] Install nanostores + @nanostores/react
- [ ] Install react-hook-form
- [ ] Configure ESLint + Prettier with Astro plugin
- [ ] Create .env.example with all placeholder variables
- [ ] Configure netlify.toml for dev/staging deploys
- [ ] Verify: `pnpm dev` starts without errors
- [ ] Verify: First deploy to Netlify succeeds

### 1.2 Design Token System
- [ ] Configure Tailwind theme extension (colors per spec Section 4)
- [ ] Define CSS custom properties — light mode palette
- [ ] Define CSS custom properties — dark mode palette (deep navy #0a0f1e)
- [ ] Define spacing scale CSS variables
- [ ] Define border radius scale
- [ ] Define shadow scale (light + dark variants)
- [ ] Convert Oddval font to WOFF2 (variable)
- [ ] Convert Montserrat font to WOFF2 (variable)
- [ ] Convert EB Garamond font to WOFF2 (variable)
- [ ] Create @font-face declarations in src/styles/fonts.css
- [ ] Implement typography scale (sizes, line heights, letter spacing)
- [ ] Implement heading styles (H1-H4, responsive desktop/mobile)
- [ ] Create src/styles/global.css (Tailwind directives + reset)
- [ ] Copy 7 brand SVG icons to src/assets/icons/
- [ ] Copy logo variants to src/assets/logos/
- [ ] Verify: Fonts render correctly in browser
- [ ] Verify: Dark mode CSS variables swap properly
- [ ] Verify: Typography scale responsive on mobile

### 1.3 Global Components
- [ ] Build BaseLayout.astro (HTML shell, font preloading, dark mode init script)
- [ ] Build Header.astro — desktop navigation
- [ ] Build Header.astro — mobile hamburger menu
- [ ] Build Header.astro — sticky scroll behavior (backdrop-blur + shadow)
- [ ] Build Footer.astro (3-column links, disclaimer, social icons)
- [ ] Build SEOHead.astro (meta, OG, hreflang, JSON-LD slots)
- [ ] Build DarkModeToggle.tsx (React island, localStorage sync)
- [ ] Build LanguageSwitcher.tsx (React island, DE/EN route mapping)
- [ ] Build PageLayout.astro (BaseLayout + Header + Footer + SEO)
- [ ] Build LegalLayout.astro (simpler, no animations)
- [ ] Build BlogLayout.astro (reading progress bar)
- [ ] Build SkipToContent.astro (accessibility)
- [ ] Verify: Header responsive on all breakpoints
- [ ] Verify: Dark mode toggle persists, no flash on reload
- [ ] Verify: Language switcher changes route correctly

---

## Phase 2: CMS & i18n (Week 2)

### 2.1 Sanity CMS
- [ ] Create Sanity project on sanity.io (get project ID + dataset)
- [ ] Configure sanity.config.ts
- [ ] Set up embedded Studio at /studio route
- [ ] Define `page` document schema
- [ ] Define `blogPost` document schema
- [ ] Define `faqItem` document schema
- [ ] Define `siteSettings` singleton schema
- [ ] Define `feature` document schema
- [ ] Define object schemas: hero, ctaBlock, richText/portableText
- [ ] Define object schemas: seo, featureGrid, splitContent
- [ ] Define object schemas: comparisonTable, statsBar, contentSection
- [ ] Define object schemas: faqSection, blogPreviewSection
- [ ] Configure @sanity/document-internationalization (DE/EN)
- [ ] Build custom desk structure (Pages→EN/DE, Blog, FAQ, Settings)
- [ ] Create src/lib/sanity.ts (client + fetch functions)
- [ ] Populate initial EN page content from readme.md
- [ ] Populate initial DE page content from readme.md
- [ ] Verify: Studio loads at /studio
- [ ] Verify: Content fetches correctly in Astro pages
- [ ] Verify: Language switcher in Studio links EN ↔ DE documents

### 2.2 Internationalization
- [ ] Create src/lib/i18n.ts (detection logic, route mapping, helpers)
- [ ] Build root index.astro (language detection redirect)
- [ ] Create src/lib/translations/en.json (all UI strings)
- [ ] Create src/lib/translations/de.json (all UI strings)
- [ ] Create src/stores/language.ts (nanostore)
- [ ] Implement hreflang generation in SEOHead.astro
- [ ] Verify: / redirects to /de/ for DACH browsers
- [ ] Verify: / redirects to /en/ for others
- [ ] Verify: Saved preference persists in localStorage
- [ ] Verify: All UI text renders in correct language

---

## Phase 3: Animation System (Week 2-3)

### 3.1 GSAP Foundation
- [ ] Create src/lib/animations.ts (GSAP init, ScrollTrigger, all presets)
- [ ] Create src/styles/gsap.css (base animation styles)
- [ ] Build ScrollReveal.astro (fade-up on scroll)
- [ ] Build TextReveal.astro (clip-reveal heading)
- [ ] Build FloatIn.astro (product image float-in)
- [ ] Build ParallaxImage.astro (depth parallax)
- [ ] Configure Astro View Transitions (page crossfade)
- [ ] Verify: Animations trigger at correct scroll position
- [ ] Verify: 60fps on animations (no jank)
- [ ] Verify: View Transitions work between pages

### 3.2 Advanced Animations (can be done during page build)
- [ ] Hero text reveal animation (staggered word clip)
- [ ] Counter animation (numbers count up)
- [ ] Stagger grid animation (cards sequential reveal)
- [ ] Dark mode toggle icon morph animation
- [ ] Header scroll animation (backdrop-blur transition)

---

## Phase 4: Interactive Components (Week 3-4)

### 4.1 Core Interactive Components
- [ ] Build FAQAccordion.tsx (GSAP height tween, category filter tabs)
- [ ] Build HowItWorksTimeline.tsx (SVG line draw, alternating cards)
- [ ] Build BreathingDemo.tsx (circle expand/contract, 4/2/6 timing)
- [ ] Build NoseBreathingTimer.tsx (guided steps, cycle counter)
- [ ] Build ComparisonSlider.tsx (table filter/highlight)
- [ ] Build SensorDiagramExplorer.tsx (SVG diagram, hover info panel)
- [ ] Verify: All components work as React islands (client:visible)
- [ ] Verify: All components responsive on mobile
- [ ] Verify: Touch interactions work on mobile

### 4.2 Conversion Components
- [ ] Build WaitlistForm.tsx (all fields, RHF validation, bilingual)
- [ ] Create src/stores/waitlist.ts (session tracking state)
- [ ] Build InlineWaitlistCTA.astro (section block with mini form)
- [ ] Build StickyBar.tsx (bottom bar, appears after 30% scroll)
- [ ] Build ExitIntentPopup.tsx (modal, desktop only, GSAP enter)
- [ ] Build SlideInCTA.tsx (bottom-right card, after 60s)
- [ ] Build PostSubmitMessage.astro (animated thank you)
- [ ] Implement session tracking logic (once per session, permanent after submit)
- [ ] Suppress popups on /waitlist and /warteliste
- [ ] Verify: Sticky bar appears/dismisses correctly
- [ ] Verify: Exit-intent fires once, only on desktop
- [ ] Verify: No popups shown after successful submission
- [ ] Verify: Form validates all required fields

---

## Phase 5: Core Pages — English (Week 4-6)

### 5.1 Primary Pages
- [ ] Build Homepage /en/ — Hero section (tape-first, hybrid approach)
- [ ] Build Homepage /en/ — Problem statement section
- [ ] Build Homepage /en/ — Two products (App + Tape cards)
- [ ] Build Homepage /en/ — How it works (mini timeline)
- [ ] Build Homepage /en/ — Differentiators (3 feature cards)
- [ ] Build Homepage /en/ — Mini comparison table
- [ ] Build Homepage /en/ — Stats bar (early-stage momentum)
- [ ] Build Homepage /en/ — FAQ (top 3 questions)
- [ ] Build Homepage /en/ — Bottom CTA (inline waitlist form)
- [ ] Build App page /en/app (8 sections + NoseBreathingTimer)
- [ ] Build Smart Mouth Tape page /en/smart-mouth-tape (8 sections + SensorDiagram)
- [ ] Build How It Works page /en/how-it-works (5 sections + BreathingDemo)

### 5.2 Secondary Pages
- [ ] Build Science & Safety page /en/science-safety (medical disclaimer prominent)
- [ ] Build Compare page /en/compare (interactive ComparisonSlider)
- [ ] Build FAQ page /en/faq (category filter + FAQAccordion)
- [ ] Build Waitlist page /en/waitlist (full WaitlistForm)
- [ ] Build Contact page /en/contact (contact form)
- [ ] Build About page /en/about (mission, principles, team placeholders)
- [ ] Build Pricing page /en/pricing (pre-launch simple page)
- [ ] Build Press page /en/press (boilerplate, assets)
- [ ] Build Facts page /en/facts (LLM-first, semantic HTML)
- [ ] Create /en/facts.md static file

### 5.3 Legal Pages
- [ ] Build Privacy Policy /en/privacy
- [ ] Build Terms /en/terms
- [ ] Build Cookies Policy /en/cookies
- [ ] Build Data Deletion /en/data-deletion

### 5.4 English Pages Verification
- [ ] All EN pages render without errors
- [ ] All section animations working on each page
- [ ] All interactive components functional
- [ ] Medical disclaimer visible where needed
- [ ] Internal links all working
- [ ] Content matches readme.md source material

---

## Phase 6: German Localization (Week 6-7)

### 6.1 DE Pages
- [ ] Build Homepage /de/
- [ ] Build App page /de/app
- [ ] Build Smart Mouth Tape page /de/smart-mouth-tape
- [ ] Build How It Works /de/so-funktionierts
- [ ] Build Science & Safety /de/wissenschaft-sicherheit
- [ ] Build Compare /de/vergleich
- [ ] Build FAQ /de/faq
- [ ] Build Waitlist /de/warteliste
- [ ] Build Contact /de/kontakt
- [ ] Build About /de/ueber-uns
- [ ] Build Pricing /de/plaene
- [ ] Build Press /de/presse
- [ ] Build Facts /de/fakten
- [ ] Create /de/fakten.md static file

### 6.2 DE Legal Pages
- [ ] Build Datenschutz /de/datenschutz
- [ ] Build AGB /de/agb
- [ ] Build Cookies /de/cookies
- [ ] Build Datenlöschung /de/datenloeschung
- [ ] Build Impressum /de/impressum

### 6.3 DE Verification
- [ ] All DE pages render without errors
- [ ] All hreflang tags correct
- [ ] All canonical tags correct
- [ ] lang="de" on all DE pages
- [ ] Language switcher works on every DE page
- [ ] Form validation messages in German
- [ ] Nav/footer/UI strings in German

---

## Phase 7: Blog (Week 7)

- [ ] Build blog listing page /en/blog/
- [ ] Build blog post template [...slug].astro
- [ ] Build BlogPreview.astro (3-card section component)
- [ ] Create 3 EN blog posts in Sanity (from readme)
- [ ] Create 3 DE blog posts in Sanity (from readme)
- [ ] Build blog listing page /de/blog/
- [ ] Implement related posts section
- [ ] Verify: Post renders portable text correctly
- [ ] Verify: Reading progress bar works
- [ ] Verify: Blog cards show image, title, excerpt, date, read time

---

## Phase 8: SEO & LLM Optimization (Week 7-8)

### 8.1 Static Files
- [ ] Create public/llms.txt (smartmouthtape.com URLs)
- [ ] Create public/robots.txt (AI crawler rules)
- [ ] Configure @astrojs/sitemap (auto sitemap.xml)
- [ ] Build /api/facts.json.ts endpoint
- [ ] Build auto-generated /llms-ctx.txt (build-time script)

### 8.2 Structured Data
- [ ] Implement Organization JSON-LD (all pages)
- [ ] Implement WebSite JSON-LD (all pages)
- [ ] Implement BreadcrumbList JSON-LD (all pages)
- [ ] Implement MobileApplication JSON-LD (app page)
- [ ] Implement Product JSON-LD (smart mouth tape page)
- [ ] Implement FAQPage JSON-LD (FAQ page + any page with FAQ content)
- [ ] Implement Article JSON-LD (blog posts)

### 8.3 Open Graph & Social
- [ ] Create EN default OG image (1200x630)
- [ ] Create DE default OG image (1200x630)
- [ ] Configure per-page OG images from Sanity

### 8.4 SEO Verification
- [ ] Validate all JSON-LD with schema.org validator
- [ ] Validate with Google Rich Results tester
- [ ] Verify answer-first formatting on all pages (quick summary bullets)
- [ ] Verify hreflang on all pages (use hreflang checker tool)
- [ ] Verify canonical tags on all pages
- [ ] Verify /llms.txt accessible
- [ ] Verify /robots.txt accessible
- [ ] Verify sitemap.xml includes all pages
- [ ] Verify /api/facts.json returns correct data

---

## Phase 9: Analytics & Integrations (Week 8)

### 9.1 Matomo
- [ ] Set up self-hosted Matomo instance
- [ ] Configure Matomo tracking code in BaseLayout (cookieless mode)
- [ ] Implement custom event: waitlist_form_view
- [ ] Implement custom event: waitlist_form_start
- [ ] Implement custom event: waitlist_form_submit
- [ ] Implement custom event: waitlist_popup_dismiss
- [ ] Implement custom event: breathing_demo_start / complete
- [ ] Implement custom event: sensor_explorer_view
- [ ] Implement custom event: language_switch
- [ ] Implement custom event: dark_mode_toggle
- [ ] Verify: Pageviews tracked in Matomo dashboard
- [ ] Verify: Custom events appear in Matomo

### 9.2 Cookie Consent
- [ ] Build CookieConsent.astro (bottom bar: accept/reject/learn more)
- [ ] Implement consent state in localStorage
- [ ] Toggle Matomo cookies based on consent
- [ ] Verify: Bar shows on first visit only
- [ ] Verify: Choice persists across visits

### 9.3 Brevo CRM
- [ ] Create Brevo account
- [ ] Create "Waitlist" contact list
- [ ] Create contact attributes (FIRSTNAME, COUNTRY, INTEREST, PHONE_OS, NOTES)
- [ ] Generate API key
- [ ] Create double opt-in email template
- [ ] Set environment variables (BREVO_API_KEY, etc.)
- [ ] Build POST /api/waitlist.ts (validate → sanitize → Brevo API → DOI email)
- [ ] Build POST /api/contact.ts (validate → transactional email to support + user)
- [ ] Verify: Waitlist form creates contact in Brevo
- [ ] Verify: DOI email sent after form submission
- [ ] Verify: Contact form sends email to support address
- [ ] Verify: Duplicate email handling works

---

## Phase 10: Premium Motion Polish (Week 8-9)

- [ ] Refine homepage hero animation (text reveal timing, product visual float)
- [ ] Refine page transitions (View Transitions smoothness)
- [ ] Refine all scroll-driven animations per page
- [ ] Refine timeline line-draw animation timing
- [ ] Refine sensor diagram hover/glow effects
- [ ] Refine parallax effects (depth, speed)
- [ ] Refine counter animations (easing, number formatting)
- [ ] Refine dark mode transition animation (smooth swap)
- [ ] Refine breathing demo circle animation (smooth expand/contract)
- [ ] Test all animations on 60Hz and 120Hz displays
- [ ] Test all animations on low-power devices (throttled CPU)

---

## Phase 11: QA & Testing (Week 9-10)

### 11.1 Cross-Browser
- [ ] Chrome (latest) — desktop + mobile
- [ ] Firefox (latest) — desktop + mobile
- [ ] Safari (latest) — desktop + iOS
- [ ] Edge (latest) — desktop
- [ ] Samsung Internet (Android) — mobile

### 11.2 Responsive
- [ ] 320px (small phone)
- [ ] 375px (iPhone SE / standard)
- [ ] 414px (large phone)
- [ ] 768px (tablet portrait)
- [ ] 1024px (tablet landscape / small laptop)
- [ ] 1280px (laptop)
- [ ] 1440px (desktop)
- [ ] 1920px (large desktop)

### 11.3 Feature Testing
- [ ] Dark mode renders correctly on every page
- [ ] Language switching works on every page pair
- [ ] Waitlist form submits successfully (happy path)
- [ ] Waitlist form shows validation errors (error paths)
- [ ] Contact form submits successfully
- [ ] Exit-intent popup fires correctly (desktop)
- [ ] Sticky bar appears/dismisses correctly
- [ ] Slide-in appears after 60s
- [ ] No popups after successful form submit
- [ ] No popups on /waitlist or /warteliste pages
- [ ] Breathing demo works (start, pause, complete)
- [ ] Nose breathing timer works (3, 5, 10 cycles)
- [ ] FAQ accordion expands/collapses smoothly
- [ ] Timeline animates on scroll
- [ ] Sensor diagram hover/tap reveals info
- [ ] Comparison table filter/highlight works
- [ ] Blog listing loads posts correctly
- [ ] Blog post renders all content types
- [ ] Cookie consent bar shows/dismisses correctly
- [ ] All external links open in new tab
- [ ] All internal links resolve (no 404s)

### 11.4 Performance
- [ ] Lighthouse Performance: 95+ on homepage
- [ ] Lighthouse Performance: 95+ on all product pages
- [ ] Lighthouse Performance: 95+ on blog listing
- [ ] LCP < 2.0s on homepage
- [ ] CLS < 0.05 on all pages
- [ ] Total JS < 150KB gzipped
- [ ] Total page weight < 500KB initial load
- [ ] Font files < 200KB total (WOFF2)

### 11.5 Accessibility
- [ ] All images have alt text
- [ ] All form inputs have labels
- [ ] Heading hierarchy correct (no skips)
- [ ] Focus states visible on all interactive elements
- [ ] Keyboard navigation works for all interactive components
- [ ] Color contrast meets WCAG AA (4.5:1 text, 3:1 large text)
- [ ] Skip-to-content link works
- [ ] axe DevTools audit: zero critical/serious issues

### 11.6 SEO Final Check
- [ ] All pages have unique title tags
- [ ] All pages have meta descriptions < 160 chars
- [ ] All pages have canonical tags
- [ ] All pages have hreflang tags (en + de + x-default)
- [ ] OG tags render correctly (check with Facebook debugger)
- [ ] Twitter cards render correctly
- [ ] Structured data validates (Google Rich Results)
- [ ] /llms.txt, /robots.txt, /sitemap.xml accessible
- [ ] No noindex on public pages

---

## Phase 12: Launch (Week 10)

### 12.1 Pre-Launch
- [ ] Fill in ALL placeholder values (emails, company info) or confirm placeholders are OK
- [ ] Review all page content for accuracy
- [ ] Review all legal pages with counsel (privacy, terms, impressum)
- [ ] Final content freeze in Sanity CMS
- [ ] Final build passes with zero warnings

### 12.2 DNS & Deployment
- [ ] Configure DNS for smartmouthtape.com (non-www canonical)
- [ ] Configure www → non-www redirect
- [ ] Deploy to production host
- [ ] Verify SSL certificate (HTTPS)
- [ ] Verify all pages load on production domain
- [ ] Verify serverless functions work in production

### 12.3 Post-Launch (First 48 hours)
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify Matomo tracking in production
- [ ] Test waitlist form end-to-end in production (real submission)
- [ ] Test contact form end-to-end in production
- [ ] Monitor Core Web Vitals for first 48 hours
- [ ] Monitor Brevo for incoming waitlist contacts
- [ ] Check Google Search Console for indexing issues
- [ ] Share site URL on social channels

### 12.4 Post-Launch Optimization (Week 11+)
- [ ] Review Matomo analytics for first week
- [ ] Identify top-performing and underperforming pages
- [ ] A/B test waitlist form variations (if traffic sufficient)
- [ ] Monitor LLM citations (check ChatGPT, Gemini for brand mentions)
- [ ] Review and optimize OG images based on social share data
- [ ] Plan next content sprint (additional blog posts)
- [ ] Consider adding prefers-reduced-motion support

---

## Image & Asset Production Checklist

| # | Asset | Spec | Status |
|---|---|---|---|
| [ ] | Homepage hero visual | Abstract breathing/wellness illustration, transparent BG, 1920px wide | TODO |
| [ ] | App phone mockup | 2-3 screens showing app UI concept, iPhone frame, 800px wide | TODO |
| [ ] | Smart Mouth Tape schematic | SVG line art, labeled sensors, for SensorDiagramExplorer | TODO |
| [ ] | OG image EN | 1200x630px, logo + tagline + brand colors | TODO |
| [ ] | OG image DE | 1200x630px, logo + DE tagline + brand colors | TODO |
| [ ] | Blog images (x6) | 1200x675px (16:9), relevant to each post topic | TODO |
| [ ] | Favicon.ico | 32x32 + 16x16, from lung symbol | TODO |
| [ ] | Favicon.svg | Scalable, brand lung symbol | TODO |
| [ ] | Apple touch icon | 180x180px PNG, lung symbol on white/brand bg | TODO |
| [ ] | Font files (WOFF2) | Oddval, Montserrat, EB Garamond — variable, Latin subset | TODO |
| [ ] | Team headshots | For About page — placeholder boxes OK for v1 | TODO |

---

## Environment Variables Checklist

All must be set before production launch:

| Variable | Required | Status |
|---|---|---|
| `SANITY_PROJECT_ID` | Yes | [ ] Set |
| `SANITY_DATASET` | Yes (= "production") | [ ] Set |
| `SANITY_API_TOKEN` | Yes (read token) | [ ] Set |
| `BREVO_API_KEY` | Yes | [ ] Set |
| `BREVO_WAITLIST_LIST_ID` | Yes | [ ] Set |
| `BREVO_DOI_TEMPLATE_ID` | Yes | [ ] Set |
| `BREVO_SENDER_EMAIL` | Yes | [ ] Set |
| `BREVO_SENDER_NAME` | Yes (= "RespireLabs") | [ ] Set |
| `MATOMO_URL` | Yes | [ ] Set |
| `MATOMO_SITE_ID` | Yes | [ ] Set |
| `SITE_URL` | Yes (= "https://smartmouthtape.com") | [ ] Set |

---

## Placeholder Values Checklist

Fill in before launch (or confirm they remain as placeholders):

| Placeholder | Value | Status |
|---|---|---|
| `{{support_email}}` | | [ ] Filled |
| `{{press_email}}` | | [ ] Filled |
| `{{partnership_email}}` | | [ ] Filled |
| `{{privacy_email}}` | | [ ] Filled |
| `{{company_name}}` | | [ ] Filled |
| `{{company_address}}` | | [ ] Filled |
| `{{company_country}}` | | [ ] Filled |
| `{{managing_director}}` | | [ ] Filled |
| `{{registration}}` | | [ ] Filled |
| `{{vat_id}}` | | [ ] Filled |
| `{{authority}}` | | [ ] Filled |
| `{{linkedin_url}}` | | [ ] Filled |
| `{{youtube_url}}` | | [ ] Filled |
| `{{instagram_url}}` | | [ ] Filled |

---

*End of Master Checklist. Total items: 300+. Work through phases sequentially, parallelizing where the dependency graph allows.*
