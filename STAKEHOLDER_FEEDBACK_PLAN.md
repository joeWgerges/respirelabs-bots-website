# Stakeholder Website Review — Implementation Plan

> **Source**: `new Website review.pdf` (dated 4.3.2026)
> **Created**: 2026-03-24
> **Total Issues**: 44 (WWW-000 through WWW-043)
> **Actionable**: 32 | **On Hold / Needs Discussion**: 12

---

## Summary

Stakeholder review of smartmouthtape.com covering 7 areas: Homepage, Smart Tape page, App page, How It Works page, Compare page, Waitlist, and cross-cutting (Blog, FAQ, translations, footer). Changes are primarily content/copy updates with some structural additions (new sections, new page) and a few visual/UX fixes.

---

## Priority Legend

| Priority | Meaning | Count |
|----------|---------|-------|
| **MUST** | Required before next review | 27 |
| **SHOULD** | Important but can follow | 8 |
| **NICE TO HAVE** | Low priority / future | 5 |
| **ON HOLD** | Parked by stakeholders | 1 |
| **DISCUSSION** | Needs stakeholder input before action | 3 |

---

## Work Packages (Grouped by Page)

### WP1: Homepage (EN) — 18 issues

| ID | Priority | Summary | Action |
|----|----------|---------|--------|
| WWW-000 | ON HOLD | Move header to Smart Tape page | **SKIP** — stakeholders will decide later |
| WWW-001 | SHOULD | Change hero tagline from "respiratory wellness system" | **UPDATE** tagline to: "A breathing intelligence platform, that tracks your breathing during sleep, recognises dysfunctional patterns and helps you to change them with simple, non-invasive breathing retraining. Start with your phone." |
| WWW-002 | MUST | Trust bar logos — use correct order | **UPDATE** trust bar to show: Austria Wirtschaftsservice \| brutkasten \| Tech-ON \| Wolves Summit (in this order) |
| WWW-003 | NICE TO HAVE | Prepare email signature with awards | **SKIP** — not a website task (email/image asset creation) |
| WWW-004 | SHOULD | Stats bar — only confirmed statistics with references | **FLAG** — stakeholders to provide confirmed stats. Current stats (50%, 3x, 85%, 2K+) need source verification. Add placeholder for references. |
| WWW-005 | SHOULD | Stats bar visual update | **UPDATE** — linked to WWW-004, update visuals as specified |
| WWW-006 | MUST | Problem agitation section — new copy | **UPDATE** quote to: "Most wearables tell you what. We focus on why and how." AND paragraph to: "You wake up tired. You feel dry mouth. Maybe you snore. RespireLabs focuses on breathing behavior: mouth breathing can be linked to dry mouth and morning headaches. It affects sleep quality." |
| WWW-007 | SHOULD | "Nudge" word feedback | **KEEP AS-IS** — discussed, decision was to keep "Detect, nudge, train, and measure progress." |
| WWW-008 | MUST | Step 4 "Measure" — remove "optional", update copy | **UPDATE** to: "Upgrade to deeper night insights with the innovative Smart Mouth Tape wearable." |
| WWW-009 | MUST | Privacy bento box — new audio explanation | **UPDATE** to: "Our AI uses breathing sounds, but it doesn't listen to them. We convert audio to images immediately. Your data never leaves your device without consent." |
| WWW-010 | NICE TO HAVE | New "Research" page | **CREATE** new page `/en/research` with articles/publications section. Add brutkasten article, Sarka Solecka study. |
| WWW-011 | MUST | Smart Mouth Tape bento box — new description | **UPDATE** to: "A wearable concept adding data and feedback to a simple habit. When you use a traditional tape, you still don't know what happens to your breathing during sleep. We add structured insights to help you understand your night." |
| WWW-012 | MUST | Benefits section intro — new copy | **UPDATE** subtitle to: "The nose performs over 30 functions. Switching from mouth to nose breathing can positively impact multiple areas of your health and wellbeing." |
| WWW-013 | SHOULD | Benefits section — add references | **FLAG** — needs source references for each benefit claim. Add reference markers. |
| WWW-014 | MUST | "Deeper sleep" card — stronger language | **UPDATE** from "helps maintain optimal oxygen levels and may support" to "improves oxygen saturation and contributes to more restful sleep cycles." |
| WWW-015 | MUST | Comparison table — update RespireLabs column | **UPDATE** all 3 rows in "Where RespireLabs differs" column. New text: "Specialised in breathing, focuses on mouth vs. nose breathing, nasal cycle detection and active, tailored to your needs and situation coaching." |
| WWW-016 | MUST | Remove "optional" from text | **UPDATE** — remove word "optional" wherever it appears in relation to Smart Mouth Tape |
| WWW-017 | MUST | FAQ "Does RespireLabs record me?" — enhanced answer | **UPDATE** answer to: "Yes, however we neither listen to the sounds in your bedroom nor save them as audio files. They are converted into images immediately, which cannot be reversed. RespireLabs is designed so you control when a session is started and what is stored. Sensitive audio is treated as private and processed locally on your device by default." |
| WWW-018 | SHOULD | Science section — add references | **FLAG** — needs source references for nitric oxide, breathing claims |
| WWW-019 | MUST | Medical disclaimer — bigger font | **UPDATE** disclaimer text size from `text-sm` to larger, more visible size |
| WWW-020 | MUST | Footer — add new content | **UPDATE** footer with additional content block (awards/recognitions similar to trust bar) |

### WP2: Smart Tape Page (EN) — 7 issues

| ID | Priority | Summary | Action |
|----|----------|---------|--------|
| WWW-021 | MUST | Font color to #212121 | **UPDATE** main text color to `#212121` across the page |
| WWW-022 | MUST | Problem section — new copy | **UPDATE** from "Traditional mouth tape is 'blind'..." to "Taping mouth shut for a night but still don't know what happens to your breathing during sleep?" |
| WWW-023 | MUST | Problem elaboration — new list | **UPDATE** problem section to include: a) You wake up tired, despite you slept enough? b) You tape your mouth at night, but wake up feeling the same? c) You tape your mouth at night and want to learn what actually happens, whether this practice serves you or disrupts your sleep? |
| WWW-024 | MUST | Solution section — new copy | **UPDATE** to: "Smart Mouth Tape provides insights that no other wearable does. It distinguishes between mouth and nose breathing, detects nasal cycle and nostrils activation." + bullet list: Track breathing pattern trends, Measure changes over time, Receive guidance on next steps |
| WWW-025 | MUST | Add women's health target group | **ADD** new card in "Who It's For" section for women's health |
| WWW-026 | MUST | Add contraindications section | **ADD** new section with key contraindications list: Nasal congestion, Sleep apnea*, Alcohol/sedative use, Respiratory conditions, Reflux/high risk of vomiting, Anxiety. Include sleep apnea asterisk explanation and "never seal mouth completely" warning. |
| WWW-027 | MUST | "Smart Mouth Tape!" with exclamation | **UPDATE** hero title from "Smart Mouth Tape." to "Smart Mouth Tape!" |

### WP3: App Page (EN) — 4 issues

| ID | Priority | Summary | Action |
|----|----------|---------|--------|
| WWW-028 | MUST | Hero title change | **UPDATE** from "Your pocket coach." to "Your breath coach." |
| WWW-029 | — | Habit loop discussion | **DISCUSSION** — stakeholders want to clarify if home page loop vs app page loop represent different perspectives. No code change needed. |
| WWW-030 | MUST | Add experts/consultations section | **ADD** new section showcasing experts and consultation options |
| WWW-031 | MUST | Add MEL-spectrogram explanation | **ADD** spectrogram visual/explanation about not listening to audio, similar to homepage privacy update |

### WP4: How It Works Page (EN) — 5 issues

| ID | Priority | Summary | Action |
|----|----------|---------|--------|
| WWW-032 | MUST | Fix orphan text | **FIX** CSS/text to prevent "loop" from appearing on separate line from "RespireLabs" |
| WWW-033 | SHOULD | Change "Train" to "Practice" or "Improve" | **UPDATE** step label from "Train" to "Practice" throughout the page |
| WWW-034 | MUST | Animation visible in light mode | **FIX** — the loop diagram animation is only visible in dark mode. Make it visible in light mode too. |
| WWW-035 | MUST | Remove risky claim about triggers | **UPDATE** from "you'll learn which specific contexts trigger mouth breathing" to "you will learn what might be the cause behind it and if you have dysfunctional breathing problems." |
| WWW-036 | MUST | Breathing demo improvements | **UPDATE** — Center 4-2-6 vertically, remove "Breathing pattern" label, add explanation that "4-2-6 is a breathing pattern where you inhale for 4 seconds, hold for 2 seconds, and exhale for 6 seconds." |

### WP5: Compare Page (EN) — 2 issues

| ID | Priority | Summary | Action |
|----|----------|---------|--------|
| WWW-037 | MUST | Clarify "exclusively" | **UPDATE** — rewrite to make clear that no other wearable does mouth vs nose breathing detection, not just that RespireLabs focuses exclusively on it |
| WWW-038 | NICE TO HAVE | Replace "RESPIRELABS" text with logo | **UPDATE** comparison table header to use full logo image instead of text |

### WP6: Cross-Cutting (FAQ, Blog, Waitlist, Footer, Translations) — 8 issues

| ID | Priority | Summary | Action |
|----|----------|---------|--------|
| WWW-039 | SHOULD | Add "Do you practice mouth taping?" to waitlist | **ADD** checkbox or question to waitlist form |
| WWW-040 | MUST | Polish translations are artificial | **FLAG** — needs native Polish speaker review. Current PL content reads like machine translation. Cannot be fully fixed by AI. |
| WWW-041 | MUST | Blog improvements | **IMPLEMENT**: a) Show category inside blog posts, b) Keep simple structure (categories only, no tags), c) Add Facebook sharing + track shares, d) Add search with selectable categories |
| WWW-042 | SHOULD | German translation review | **FLAG** — needs native German speaker review |
| WWW-043 | MUST | FAQ updates | **UPDATE**: a) "Is mouth taping safe?" — add contraindications list, b) "How do I get early access?" — add link to waitlist, c) "Does RespireLabs record me all night?" — add spectrogram explanation, mention AI doesn't listen |

---

## Execution Order

### Phase 1: EN Content Changes (Parallel)
All English page content updates run simultaneously:
- **Agent A**: Homepage (WP1) — WWW-001, 002, 006, 008, 009, 011, 012, 014, 015, 016, 017, 019, 020
- **Agent B**: Smart Tape (WP2) — WWW-021, 022, 023, 024, 025, 026, 027
- **Agent C**: App + How It Works + Compare (WP3+WP4+WP5) — WWW-028, 030, 031, 032, 033, 034, 035, 036, 037
- **Agent D**: FAQ + Blog + Waitlist (WP6) — WWW-039, 041, 043

### Phase 2: DE + PL Sync (Parallel, after Phase 1)
- **Agent E**: Mirror all Phase 1 changes to DE pages
- **Agent F**: Mirror all Phase 1 changes to PL pages

### Phase 3: Deferred Items (Separate sprint)
- WWW-000: ON HOLD (header move)
- WWW-003: Email signature (non-website)
- WWW-004/005: Stats verification (needs stakeholder data)
- WWW-010: Research page (NICE TO HAVE)
- WWW-013/018: Reference sources (needs stakeholder input)
- WWW-029: Habit loop discussion
- WWW-038: Logo in comparison table (NICE TO HAVE)
- WWW-040: Polish native review
- WWW-042: German native review

---

## Files Affected

### Phase 1 (EN)
| File | Issues |
|------|--------|
| `website/src/pages/en/index.astro` | WWW-001, 002, 006, 008, 009, 011, 012, 014, 015, 016, 017, 019 |
| `website/src/pages/en/smart-mouth-tape.astro` | WWW-021, 022, 023, 024, 025, 026, 027 |
| `website/src/pages/en/app.astro` | WWW-028, 030, 031 |
| `website/src/pages/en/how-it-works.astro` | WWW-032, 033, 034, 035, 036 |
| `website/src/pages/en/compare.astro` | WWW-037 |
| `website/src/pages/en/faq.astro` | WWW-043 |
| `website/src/pages/en/waitlist.astro` | WWW-039 |
| `website/src/pages/en/blog/*.astro` | WWW-041 |
| `website/src/components/Footer.astro` | WWW-020 |
| `website/src/components/interactive/FAQAccordion.tsx` | WWW-043 (if structural) |
| `website/src/components/interactive/BreathingDemo.tsx` | WWW-036 |

### Phase 2 (DE + PL mirrors)
| File | Mirrors |
|------|---------|
| `website/src/pages/de/index.astro` | All homepage changes |
| `website/src/pages/de/smart-mouth-tape.astro` | All smart tape changes |
| `website/src/pages/de/app.astro` | All app changes |
| `website/src/pages/de/so-funktionierts.astro` | All how-it-works changes |
| `website/src/pages/de/vergleich.astro` | All compare changes |
| `website/src/pages/de/faq.astro` | FAQ changes |
| `website/src/pages/de/warteliste.astro` | Waitlist changes |
| `website/src/pages/de/blog/index.astro` | Blog changes |
| `website/src/pages/pl/index.astro` | All homepage changes |
| `website/src/pages/pl/inteligentna-tasma.astro` | All smart tape changes |
| `website/src/pages/pl/aplikacja.astro` | All app changes |
| `website/src/pages/pl/jak-to-dziala.astro` | All how-it-works changes |
| `website/src/pages/pl/porownanie.astro` | All compare changes |
| `website/src/pages/pl/faq.astro` | FAQ changes |
| `website/src/pages/pl/lista-oczekujacych.astro` | Waitlist changes |
| `website/src/pages/pl/blog/index.astro` | Blog changes |

---

## Risk Notes

1. **Medical claims**: WWW-014 uses stronger language ("improves" vs "may support"). Verify with compliance.
2. **Statistics (WWW-004)**: Current stats (50%, 3x, 85%) have no cited sources. Stakeholders flagged this.
3. **Polish translations (WWW-040)**: AI can improve but native speaker review is essential.
4. **Contraindications (WWW-026)**: Critical safety content — must be reviewed by medical advisor.
5. **Blog sharing (WWW-041c)**: Facebook sharing requires meta tags and share tracking infrastructure.
