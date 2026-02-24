# RespireLabs Website — Master Launch Checklist

> **Project**: smartmouthtape.com
> **Created**: 2026-02-22
> **Last Updated**: 2026-02-24
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
- [x] Initialize Astro 5.x project with `pnpm create astro@latest` *(done — Astro 5.17.1, used npm)*
- [ ] Install @astrojs/react adapter (React 19)
- [x] Install @astrojs/tailwind *(done — using @tailwindcss/vite 4.2.1 instead of @astrojs/tailwind)*
- [x] Install @astrojs/mdx *(done — v4.3.13)*
- [x] Install @astrojs/sitemap *(done — v3.7.0)*
- [x] Configure TypeScript strict mode in tsconfig.json *(done — extends astro/tsconfigs/strict)*
- [ ] Install GSAP + ScrollTrigger (`gsap` package)
- [ ] Install Sanity v3 + @sanity/client + @sanity/document-internationalization
- [ ] Install nanostores + @nanostores/react
- [ ] Install react-hook-form
- [x] Configure ESLint + Prettier with Astro plugin *(partial — .prettierrc and .prettierignore created, format/format:check/check scripts added to package.json; ESLint Astro plugin not yet installed)*
- [ ] Create .env.example with all placeholder variables
- [x] Configure netlify.toml for dev/staging deploys *(done — netlify.toml with build config, security headers, caching rules, i18n redirects; public/_redirects fallback also created)*
- [x] Verify: `pnpm dev` starts without errors *(done — site builds and runs)*
- [~] Verify: First deploy to Netlify succeeds *(partial — netlify.toml config ready, not yet deployed)*

### 1.2 Design Token System
> **Design finalized**: Current color palette, fonts, and branding are locked in as the final design.

- [x] Configure Tailwind theme extension (colors per spec Section 4) *(done — final palette in global.css @theme: brand-blue #206FF7, brand-dark #0A0A0B, brand-white #FAFAFA, brand-yellow #FFDC31, brand-grey #6B7280, brand-light #E5E7EB)*
- [x] Define CSS custom properties — light mode palette *(done — 6 brand tokens defined, accepted as final)*
- [x] Define CSS custom properties — dark mode palette (deep navy #0a0f1e) *(done — 12 CSS custom properties in :root and .dark scopes, 6 surface utility classes added to global.css)*
- [x] Define spacing scale CSS variables *(done — using Tailwind 4 built-in scale)*
- [x] Define border radius scale *(done — using Tailwind defaults + inline values like rounded-[2rem])*
- [x] Define shadow scale (light + dark variants) *(done — custom shadow utilities in global.css: glass-panel, glass-panel-dark)*
- [x] Convert Oddval font to WOFF2 (variable) *(skipped — variable TTF accepted as final format)*
- [x] Convert Montserrat font to WOFF2 (variable) *(skipped — variable TTF accepted as final format)*
- [x] Convert EB Garamond font to WOFF2 (variable) *(skipped — variable TTF accepted as final format)*
- [x] Create @font-face declarations in src/styles/fonts.css *(done — declared in global.css)*
- [x] Implement typography scale (sizes, line heights, letter spacing) *(done — Tailwind built-in scale + custom heading styles)*
- [x] Implement heading styles (H1-H4, responsive desktop/mobile) *(done — in global.css base layer)*
- [x] Create src/styles/global.css (Tailwind directives + reset) *(done — includes @theme, @font-face, base styles, utility classes, animations)*
- [x] Copy 7 brand SVG icons to src/assets/icons/ *(done — in public/assets/icons/)*
- [x] Copy logo variants to src/assets/logos/ *(done — in public/assets/logo/)*
- [x] Verify: Fonts render correctly in browser *(done)*
- [~] Verify: Dark mode CSS variables swap properly *(variables defined in :root + .dark, but no toggle to test swap — foundation only)*
- [x] Verify: Typography scale responsive on mobile *(done)*

### 1.3 Global Components
- [x] Build BaseLayout.astro (HTML shell, font preloading, dark mode init script) *(done — as Layout.astro, includes SEO meta, structured data, scroll animation observer)*
- [x] Build Header.astro — desktop navigation *(done — pill-style nav bar, logo, CTA button)*
- [x] Build Header.astro — mobile hamburger menu *(done — fullscreen overlay with close button, escape key, focus trap)*
- [x] Build Header.astro — sticky scroll behavior (backdrop-blur + shadow) *(done — JS scroll listener, height shrink, border + shadow on scroll)*
- [x] Build Footer.astro (3-column links, disclaimer, social icons) *(done — 4-column: brand/copyright, legal links, medical disclaimer; social icons pending)*
- [x] Build SEOHead.astro (meta, OG, hreflang, JSON-LD slots) *(done — integrated into Layout.astro, not separate component)*
- [ ] Build DarkModeToggle.tsx (React island, localStorage sync) *(requires React install)*
- [x] Build LanguageSwitcher.tsx (React island, DE/EN route mapping) *(done — as inline Astro in Header.astro, not React island; functional path swap)*
- [x] Build PageLayout.astro (BaseLayout + Header + Footer + SEO) *(done — Layout.astro serves this role)*
- [ ] Build LegalLayout.astro (simpler, no animations) *(legal pages use MarkdownLayout instead)*
- [x] Build BlogLayout.astro (reading progress bar) *(done — as MarkdownLayout.astro; reading progress bar added — 3px blue bar at top)*
- [x] Build SkipToContent.astro (accessibility) *(done — skip link in Header.astro)*
- [x] Verify: Header responsive on all breakpoints *(done — desktop nav + mobile overlay)*
- [ ] Verify: Dark mode toggle persists, no flash on reload *(dark mode not implemented)*
- [x] Verify: Language switcher changes route correctly *(done — swaps /en ↔ /de in URL)*

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
- [x] Create src/lib/i18n.ts (detection logic, route mapping, helpers) *(done — getTranslations() + t() helper, components not yet consuming)*
- [x] Build root index.astro (language detection redirect) *(done — redirects to /en; no Accept-Language detection yet)*
- [x] Create src/lib/translations/en.json (all UI strings) *(done — 43 keys across 6 sections)*
- [x] Create src/lib/translations/de.json (all UI strings) *(done — 43 keys across 6 sections)*
- [ ] Create src/stores/language.ts (nanostore) *(requires nanostores install)*
- [x] Implement hreflang generation in SEOHead.astro *(done — in Layout.astro, auto-generates en/de/x-default hreflang tags)*
- [ ] Verify: / redirects to /de/ for DACH browsers *(currently always redirects to /en)*
- [x] Verify: / redirects to /en/ for others *(done — always redirects to /en)*
- [ ] Verify: Saved preference persists in localStorage
- [~] Verify: All UI text renders in correct language *(partial — translation JSON files created but components not yet consuming them; nav/footer have bilingual strings inline)*

---

## Phase 3: Animation System (Week 2-3)

### 3.1 GSAP Foundation
- [ ] Create src/lib/animations.ts (GSAP init, ScrollTrigger, all presets)
- [ ] Create src/styles/gsap.css (base animation styles)
- [ ] Build ScrollReveal.astro (fade-up on scroll)
- [ ] Build TextReveal.astro (clip-reveal heading)
- [ ] Build FloatIn.astro (product image float-in)
- [ ] Build ParallaxImage.astro (depth parallax)
- [x] Configure Astro View Transitions (page crossfade) *(done — ViewTransitions from astro:transitions in Layout.astro, fade animation on main content, IntersectionObserver re-runs after astro:after-swap)*
- [ ] Verify: Animations trigger at correct scroll position
- [ ] Verify: 60fps on animations (no jank)
- [x] Verify: View Transitions work between pages *(done — smooth client-side navigation with fade crossfade)*

### 3.2 Advanced Animations (can be done during page build)
- [ ] Hero text reveal animation (staggered word clip) *(current hero uses CSS fade-up, not GSAP word clip)*
- [ ] Counter animation (numbers count up)
- [~] Stagger grid animation (cards sequential reveal) *(done via CSS .reveal + .delay-* classes, not GSAP)*
- [ ] Dark mode toggle icon morph animation
- [x] Header scroll animation (backdrop-blur transition) *(done — JS scroll listener in Header.astro, not GSAP)*

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
- [x] Build Homepage /en/ — Hero section (tape-first, hybrid approach) *(done — "Breathe. Sleep." hero with CTAs, trust bar, gradient orbs)*
- [x] Build Homepage /en/ — Problem statement section *(done — "Most sleep trackers tell you what happened" garamond quote)*
- [x] Build Homepage /en/ — Two products (App + Tape cards) *(done — bento box: App large card + privacy dark card + Tape full-width card)*
- [x] Build Homepage /en/ — How it works (mini timeline) *(done — 4-step numbered grid: Detect, Understand, Train, Measure)*
- [~] Build Homepage /en/ — Differentiators (3 feature cards) *(partially — privacy is in bento box, no standalone differentiator section)*
- [x] Build Homepage /en/ — Mini comparison table *(done — 3-row table: rings, audio apps, traditional tape vs. RespireLabs)*
- [~] Build Homepage /en/ — Stats bar (early-stage momentum) *(replaced with trust bar: aws First Incubator, WKO Tirol, etc.)*
- [x] Build Homepage /en/ — FAQ (top 3 questions) *(done — FAQ accordion section with top 3 questions on homepage)*
- [x] Build Homepage /en/ — Bottom CTA (inline waitlist form) *(done — dark section CTA with button, no inline form)*
- [~] Build App page /en/app (8 sections + NoseBreathingTimer) *(done — hero, core loop, features bento, privacy callout, CTA; missing NoseBreathingTimer React island)*
- [~] Build Smart Mouth Tape page /en/smart-mouth-tape (8 sections + SensorDiagram) *(done — dark hero, description, sensors, specs, CTA; missing SensorDiagramExplorer React island)*
- [~] Build How It Works page /en/how-it-works (5 sections + BreathingDemo) *(done — hero, timeline steps, privacy, CTA; missing BreathingDemo React island)*

### 5.2 Secondary Pages
- [x] Build Science & Safety page /en/science-safety (medical disclaimer prominent) *(done — dark hero, responsible claims, safety, privacy)*
- [~] Build Compare page /en/compare (interactive ComparisonSlider) *(done — static comparison table; missing interactive ComparisonSlider React island)*
- [~] Build FAQ page /en/faq (category filter + FAQAccordion) *(done — static Q&A with categories; missing FAQAccordion React island)*
- [x] Build Waitlist page /en/waitlist (full WaitlistForm) *(done — full form with all fields, client-side only, no backend)*
- [x] Build Contact page /en/contact (contact form) *(done — contact form + direct contact cards)*
- [x] Build About page /en/about (mission, principles, team placeholders) *(done)*
- [x] Build Pricing page /en/pricing (pre-launch simple page) *(done — markdown)*
- [x] Build Press page /en/press (boilerplate, assets) *(done — markdown)*
- [x] Build Facts page /en/facts (LLM-first, semantic HTML) *(done — markdown)*
- [x] Create /en/facts.md static file *(done)*

### 5.3 Legal Pages
- [x] Build Privacy Policy /en/privacy *(done — markdown)*
- [x] Build Terms /en/terms *(done — markdown)*
- [x] Build Cookies Policy /en/cookies *(done — markdown)*
- [x] Build Data Deletion /en/data-deletion *(done — markdown)*

### 5.4 English Pages Verification
- [x] All EN pages render without errors *(all pages including legal pages now render)*
- [~] All section animations working on each page *(CSS reveal animations work; GSAP not yet integrated)*
- [ ] All interactive components functional *(React islands not yet built)*
- [x] Medical disclaimer visible where needed *(footer has disclaimer on all pages; science-safety has prominent disclaimer)*
- [x] Internal links all working *(footer links to legal pages now resolve correctly)*
- [x] Content matches readme.md source material

---

## Phase 6: German Localization (Week 6-7)

### 6.1 DE Pages
> **UPDATED 2026-02-24**: German URL slugs implemented. Old English-slug URLs converted to 301 redirects. Header/Footer DE nav links updated.

- [x] Build Homepage /de/ *(done — German content, same structure as EN)*
- [x] Build App page /de/app *(done)*
- [x] Build Smart Mouth Tape page /de/smart-mouth-tape *(done)*
- [x] Build How It Works /de/so-funktionierts *(done — German slug, old /de/how-it-works redirects via 301)*
- [x] Build Science & Safety /de/wissenschaft-sicherheit *(done — German slug, old /de/science-safety redirects via 301)*
- [x] Build Compare /de/vergleich *(done — German slug, old /de/compare redirects via 301)*
- [x] Build FAQ /de/faq *(done)*
- [x] Build Waitlist /de/warteliste *(done — German slug, old /de/waitlist redirects via 301)*
- [x] Build Contact /de/kontakt *(done — German slug, old /de/contact redirects via 301)*
- [x] Build About /de/ueber-uns *(done — German slug, old /de/about redirects via 301)*
- [~] Build Pricing /de/plaene *(done as /de/pricing — slug rename pending)*
- [~] Build Press /de/presse *(done as /de/press — slug rename pending)*
- [~] Build Facts /de/fakten *(done as /de/facts — slug rename pending)*
- [x] Create /de/fakten.md static file *(done as /de/facts.md)*

### 6.2 DE Legal Pages
- [x] Build Datenschutz /de/datenschutz *(done — markdown)*
- [x] Build AGB /de/terms *(done — markdown, linked as AGB in footer)*
- [x] Build Cookies /de/cookies *(done — markdown)*
- [x] Build Datenlöschung /de/data-deletion *(done — markdown, linked as Datenlöschung in footer)*
- [x] Build Impressum /de/impressum *(done — markdown)*

### 6.3 DE Verification
- [x] All DE pages render without errors *(all pages including legal pages render, German slugs active)*
- [x] All hreflang tags correct *(auto-generated in Layout.astro)*
- [x] All canonical tags correct *(auto-generated in Layout.astro)*
- [x] lang="de" on all DE pages *(done — lang prop passed through frontmatter)*
- [x] Language switcher works on every DE page *(done — Header.astro slug mapping updated for German URLs)*
- [~] Form validation messages in German *(forms use browser defaults, no custom i18n — partial)*
- [x] Nav/footer/UI strings in German *(done — Header.astro and Footer.astro DE strings updated with German slug links)*

---

## Phase 7: Blog (Week 7)

- [x] Build blog listing page /en/blog/ *(done — uses Astro.glob to load .md files, manual card grid)*
- [x] Build blog post template [...slug].astro *(done — using MarkdownLayout.astro with frontmatter layout reference, not dynamic [...slug] route)*
- [x] Build BlogPreview.astro (3-card section component) *(done — bilingual, 3-card grid, reusable component)*
- [x] Create 3 EN blog posts in Sanity (from readme) *(done as markdown files, not in Sanity: 01-mouth-breathing, 02-mouth-taping-safety, 03-daytime-nasal-breathing)*
- [x] Create 3 DE blog posts in Sanity (from readme) *(done as markdown files, not in Sanity: 01-mundatmung, 02-mouth-taping-sicherheit, 03-nasenatmung-tagsueber)*
- [x] Build blog listing page /de/blog/ *(done)*
- [x] Implement related posts section *(done — BlogPreview component added to MarkdownLayout.astro, all blog posts show "Related posts" at bottom)*
- [x] Verify: Post renders portable text correctly *(markdown renders via @tailwindcss/typography prose classes)*
- [x] Verify: Reading progress bar works *(done — 3px blue bar at top of viewport in MarkdownLayout.astro)*
- [x] Verify: Blog cards show image, title, excerpt, date, read time *(done — cards show title, excerpt, date, read time, category pill, hover effects; no featured image yet)*

---

## Phase 8: SEO & LLM Optimization (Week 7-8)

### 8.1 Static Files
- [x] Create public/llms.txt (smartmouthtape.com URLs) *(done — updated with all pages including legal, DE localized slugs; currently uses respirelabs.com URLs, needs domain update)*
- [x] Create public/robots.txt (AI crawler rules) *(done — Allow: / with sitemap + AI crawler rules added)*
- [x] Configure @astrojs/sitemap (auto sitemap.xml) *(done — installed and configured in astro.config.mjs)*
- [ ] Build /api/facts.json.ts endpoint
- [ ] Build auto-generated /llms-ctx.txt (build-time script)

### 8.2 Structured Data
- [x] Implement Organization JSON-LD (all pages) *(done — in Layout.astro)*
- [x] Implement WebSite JSON-LD (all pages) *(done — in Layout.astro)*
- [x] Implement BreadcrumbList JSON-LD (all pages) *(done — auto-generated in Layout.astro)*
- [x] Implement MobileApplication JSON-LD (app page) *(done — via frontmatter structuredData prop)*
- [x] Implement Product JSON-LD (smart mouth tape page) *(done — via frontmatter structuredData prop)*
- [x] Implement FAQPage JSON-LD (FAQ page + any page with FAQ content) *(done — EN + DE FAQ pages, bug fixed where faqStructuredData referenced faqs before declaration)*
- [x] Implement Article JSON-LD (blog posts) *(done — auto-generated in MarkdownLayout.astro for all blog posts)*

### 8.3 Open Graph & Social
- [ ] Create EN default OG image (1200x630) *(currently using logo as placeholder)*
- [ ] Create DE default OG image (1200x630)
- [ ] Configure per-page OG images from Sanity

### 8.4 SEO Verification
- [ ] Validate all JSON-LD with schema.org validator
- [ ] Validate with Google Rich Results tester
- [~] Verify answer-first formatting on all pages (quick summary bullets) *(blog posts have "Quick summary" bullets; product pages have hero subtext but not bullet format)*
- [x] Verify hreflang on all pages (use hreflang checker tool) *(auto-generated in Layout.astro for en/de/x-default)*
- [x] Verify canonical tags on all pages *(auto-generated in Layout.astro)*
- [x] Verify /llms.txt accessible *(done — served from public/)*
- [x] Verify /robots.txt accessible *(done — served from public/)*
- [x] Verify sitemap.xml includes all pages *(done — auto-generated, output as sitemap-index.xml + sitemap-0.xml)*
- [ ] Verify /api/facts.json returns correct data *(endpoint not built)*

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
- [x] Build CookieConsent.astro (bottom bar: accept/reject/learn more) *(done — bilingual EN/DE, slide animation, integrated into Layout.astro)*
- [x] Implement consent state in localStorage *(done — localStorage persistence, shows on first visit only)*
- [ ] Toggle Matomo cookies based on consent *(Matomo not yet installed)*
- [x] Verify: Bar shows on first visit only *(done — localStorage check on page load)*
- [x] Verify: Choice persists across visits *(done — stored in localStorage)*

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
| [ ] | Homepage hero visual | Abstract breathing/wellness illustration, transparent BG, 1920px wide | TODO — currently using CSS gradient orbs as placeholder |
| [~] | App phone mockup | 2-3 screens showing app UI concept, iPhone frame, 800px wide | PARTIAL — CSS-only abstract phone shape with animated spinner on app page |
| [ ] | Smart Mouth Tape schematic | SVG line art, labeled sensors, for SensorDiagramExplorer | TODO — currently using tape SVG icon in circle |
| [ ] | OG image EN | 1200x630px, logo + tagline + brand colors | TODO — using logo PNG as placeholder |
| [ ] | OG image DE | 1200x630px, logo + DE tagline + brand colors | TODO |
| [ ] | Blog images (x6) | 1200x675px (16:9), relevant to each post topic | TODO — blog cards have no images |
| [x] | Favicon.ico | 32x32 + 16x16, from lung symbol | DONE — exists at public/favicon.ico |
| [x] | Favicon.svg | Scalable, brand lung symbol | DONE — exists at public/favicon.svg |
| [ ] | Apple touch icon | 180x180px PNG, lung symbol on white/brand bg | TODO |
| [x] | Font files | Oddval, Montserrat, EB Garamond — variable TTF | DONE — TTF accepted as final format |
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
