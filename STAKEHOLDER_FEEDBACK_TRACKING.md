# Stakeholder Feedback Tracking

> **Source**: `new Website review.pdf` (dated 4.3.2026)
> **Last Updated**: 2026-03-24
> **Implementation Plan**: [STAKEHOLDER_FEEDBACK_PLAN.md](./STAKEHOLDER_FEEDBACK_PLAN.md)
> **Build Status**: PASSING (77 pages, 0 errors)

## Status Legend
- `[ ]` TODO
- `[~]` IN PROGRESS
- `[x]` DONE
- `[!]` BLOCKED (needs stakeholder input)
- `[-]` SKIPPED (on hold / not applicable)

---

## Phase 1: English Content Changes

### Homepage (`/en/index.astro`)

| Status | ID | Priority | Description |
|--------|-----|----------|-------------|
| [-] | WWW-000 | ON HOLD | Move header — stakeholders will decide later |
| [x] | WWW-001 | SHOULD | Hero tagline: change "respiratory wellness system" to new breathing intelligence platform description |
| [x] | WWW-002 | MUST | Trust bar: reorder to Austria Wirtschaftsservice \| brutkasten \| Tech-ON \| Wolves Summit |
| [-] | WWW-003 | NICE TO HAVE | Email signature — not a website task |
| [!] | WWW-004 | SHOULD | Stats bar: verify statistics with sources, add references |
| [!] | WWW-005 | SHOULD | Stats bar: visual update (linked to WWW-004) |
| [x] | WWW-006 | MUST | Problem section: "Most wearables tell you what. We focus on why and how." + updated paragraph |
| [-] | WWW-007 | SHOULD | "Nudge" word — discussed, keeping as-is |
| [x] | WWW-008 | MUST | Step 4 Measure: "Upgrade to deeper night insights with the innovative Smart Mouth Tape wearable." |
| [x] | WWW-009 | MUST | Privacy box: "Our AI uses breathing sounds, but it doesn't listen to them..." |
| [!] | WWW-010 | NICE TO HAVE | New Research page — deferred to Phase 3 |
| [x] | WWW-011 | MUST | Smart Mouth Tape bento: new description about traditional tape being blind |
| [x] | WWW-012 | MUST | Benefits intro: "The nose performs over 30 functions..." |
| [!] | WWW-013 | SHOULD | Benefits references — needs source data from stakeholders |
| [x] | WWW-014 | MUST | Deeper sleep: "improves oxygen saturation and contributes to..." |
| [x] | WWW-015 | MUST | Comparison table: update "Where RespireLabs differs" column content |
| [x] | WWW-016 | MUST | Remove "optional" from Smart Mouth Tape references |
| [x] | WWW-017 | MUST | FAQ answer: "Yes, however we neither listen to the sounds..." with spectrogram mention |
| [!] | WWW-018 | SHOULD | Science references — needs source data from stakeholders |
| [x] | WWW-019 | MUST | Medical disclaimer: increase font size for visibility |
| [x] | WWW-020 | MUST | Footer: add awards/recognition content |

### Smart Tape Page (`/en/smart-mouth-tape.astro`)

| Status | ID | Priority | Description |
|--------|-----|----------|-------------|
| [x] | WWW-021 | MUST | Font color: change to #212121 |
| [x] | WWW-022 | MUST | Problem copy: "Taping mouth shut for a night but still don't know..." |
| [x] | WWW-023 | MUST | Problem list: 3 pain-point questions (tired, same feeling, want to learn) |
| [x] | WWW-024 | MUST | Solution: "Smart Mouth Tape provides insights that no other wearable does..." |
| [x] | WWW-025 | MUST | Add women's health target group card |
| [x] | WWW-026 | MUST | Add contraindications section with sleep apnea warning |
| [x] | WWW-027 | MUST | Hero: "Smart Mouth Tape!" (exclamation mark) |

### App Page (`/en/app.astro`)

| Status | ID | Priority | Description |
|--------|-----|----------|-------------|
| [x] | WWW-028 | MUST | Hero: "Your breath coach." (not "pocket coach") |
| [-] | WWW-029 | — | Habit loop discussion — no code change, discussion item |
| [x] | WWW-030 | MUST | Add experts & consultations section |
| [x] | WWW-031 | MUST | Add MEL-spectrogram explanation (we don't listen to audio) |

### How It Works Page (`/en/how-it-works.astro`)

| Status | ID | Priority | Description |
|--------|-----|----------|-------------|
| [x] | WWW-032 | MUST | Fix orphan: "loop" on same line as "RespireLabs" |
| [x] | WWW-033 | SHOULD | Change "Train" to "Practice" in methodology steps |
| [x] | WWW-034 | MUST | Loop animation visible in light mode (currently dark-only) |
| [x] | WWW-035 | MUST | Remove risky claim: "...you will learn what might be the cause behind it..." |
| [x] | WWW-036 | MUST | Breathing demo: center 4-2-6, remove label, add explanation |

### Compare Page (`/en/compare.astro`)

| Status | ID | Priority | Description |
|--------|-----|----------|-------------|
| [x] | WWW-037 | MUST | Clarify "exclusively" — make clear no other wearable does this |
| [!] | WWW-038 | NICE TO HAVE | Replace RESPIRELABS text with logo — deferred |

### Cross-Cutting

| Status | ID | Priority | Description | File(s) |
|--------|-----|----------|-------------|---------|
| [x] | WWW-039 | SHOULD | Waitlist: add "Do you practice mouth taping?" question | `WaitlistForm.tsx` |
| [!] | WWW-040 | MUST | Polish translation review — needs native speaker | All PL pages |
| [x] | WWW-041 | MUST | Blog: categories in posts, Facebook sharing, search with categories | `blog/`, `MarkdownLayout.astro` |
| [!] | WWW-042 | SHOULD | German translation review — needs native speaker | All DE pages |
| [x] | WWW-043 | MUST | FAQ: add contraindications, waitlist link, spectrogram explanation | `faq.astro` |

---

## Phase 2: DE + PL Sync

### German Pages

| Status | ID | Mirrors | File |
|--------|-----|---------|------|
| [x] | DE-001 | WWW-001 | `de/index.astro` |
| [x] | DE-002 | WWW-002 | `de/index.astro` |
| [x] | DE-006 | WWW-006 | `de/index.astro` |
| [x] | DE-008 | WWW-008 | `de/index.astro` |
| [x] | DE-009 | WWW-009 | `de/index.astro` |
| [x] | DE-011 | WWW-011 | `de/index.astro` |
| [x] | DE-012 | WWW-012 | `de/index.astro` |
| [x] | DE-014 | WWW-014 | `de/index.astro` |
| [x] | DE-015 | WWW-015 | `de/index.astro` |
| [x] | DE-016 | WWW-016 | `de/index.astro` |
| [x] | DE-017 | WWW-017 | `de/index.astro` |
| [x] | DE-019 | WWW-019 | `de/index.astro` |
| [x] | DE-020 | WWW-020 | `Footer.astro` (shared) |
| [x] | DE-021 | WWW-021 | `de/smart-mouth-tape.astro` |
| [x] | DE-022 | WWW-022 | `de/smart-mouth-tape.astro` |
| [x] | DE-023 | WWW-023 | `de/smart-mouth-tape.astro` |
| [x] | DE-024 | WWW-024 | `de/smart-mouth-tape.astro` |
| [x] | DE-025 | WWW-025 | `de/smart-mouth-tape.astro` |
| [x] | DE-026 | WWW-026 | `de/smart-mouth-tape.astro` |
| [x] | DE-027 | WWW-027 | `de/smart-mouth-tape.astro` |
| [x] | DE-028 | WWW-028 | `de/app.astro` |
| [x] | DE-030 | WWW-030 | `de/app.astro` |
| [x] | DE-031 | WWW-031 | `de/app.astro` |
| [x] | DE-032 | WWW-032 | `de/so-funktionierts.astro` |
| [x] | DE-033 | WWW-033 | `de/so-funktionierts.astro` |
| [x] | DE-034 | WWW-034 | `de/so-funktionierts.astro` |
| [x] | DE-035 | WWW-035 | `de/so-funktionierts.astro` |
| [x] | DE-036 | WWW-036 | `BreathingDemo.tsx` (shared component) |
| [x] | DE-037 | WWW-037 | `de/vergleich.astro` |
| [x] | DE-039 | WWW-039 | `WaitlistForm.tsx` (shared component) |
| [x] | DE-041 | WWW-041 | `de/blog/index.astro` |
| [x] | DE-043 | WWW-043 | `de/faq.astro` |

### Polish Pages

| Status | ID | Mirrors | File |
|--------|-----|---------|------|
| [x] | PL-001 | WWW-001 | `pl/index.astro` |
| [x] | PL-002 | WWW-002 | `pl/index.astro` |
| [x] | PL-006 | WWW-006 | `pl/index.astro` |
| [x] | PL-008 | WWW-008 | `pl/index.astro` |
| [x] | PL-009 | WWW-009 | `pl/index.astro` |
| [x] | PL-011 | WWW-011 | `pl/index.astro` |
| [x] | PL-012 | WWW-012 | `pl/index.astro` |
| [x] | PL-014 | WWW-014 | `pl/index.astro` |
| [x] | PL-015 | WWW-015 | `pl/index.astro` |
| [x] | PL-016 | WWW-016 | `pl/index.astro` |
| [x] | PL-017 | WWW-017 | `pl/index.astro` |
| [x] | PL-019 | WWW-019 | `pl/index.astro` |
| [x] | PL-020 | WWW-020 | `Footer.astro` (shared) |
| [x] | PL-021 | WWW-021 | `pl/inteligentna-tasma.astro` |
| [x] | PL-022 | WWW-022 | `pl/inteligentna-tasma.astro` |
| [x] | PL-023 | WWW-023 | `pl/inteligentna-tasma.astro` |
| [x] | PL-024 | WWW-024 | `pl/inteligentna-tasma.astro` |
| [x] | PL-025 | WWW-025 | `pl/inteligentna-tasma.astro` |
| [x] | PL-026 | WWW-026 | `pl/inteligentna-tasma.astro` |
| [x] | PL-027 | WWW-027 | `pl/inteligentna-tasma.astro` |
| [x] | PL-028 | WWW-028 | `pl/aplikacja.astro` |
| [x] | PL-030 | WWW-030 | `pl/aplikacja.astro` |
| [x] | PL-031 | WWW-031 | `pl/aplikacja.astro` |
| [x] | PL-032 | WWW-032 | `pl/jak-to-dziala.astro` |
| [x] | PL-033 | WWW-033 | `pl/jak-to-dziala.astro` |
| [x] | PL-034 | WWW-034 | `pl/jak-to-dziala.astro` |
| [x] | PL-035 | WWW-035 | `pl/jak-to-dziala.astro` |
| [x] | PL-036 | WWW-036 | `BreathingDemo.tsx` (shared component) |
| [x] | PL-037 | WWW-037 | `pl/porownanie.astro` |
| [x] | PL-039 | WWW-039 | `WaitlistForm.tsx` (shared component) |
| [x] | PL-041 | WWW-041 | `pl/blog/index.astro` |
| [x] | PL-043 | WWW-043 | `pl/faq.astro` |

---

## Phase 3: Deferred Items

| Status | ID | Priority | Description | Blocker |
|--------|-----|----------|-------------|---------|
| [-] | WWW-000 | ON HOLD | Move header | Stakeholder decision pending |
| [-] | WWW-003 | NICE TO HAVE | Email signature | Not a website task |
| [!] | WWW-004 | SHOULD | Stats verification | Needs confirmed study sources |
| [!] | WWW-005 | SHOULD | Stats visual update | Blocked by WWW-004 |
| [!] | WWW-010 | NICE TO HAVE | Research page | Needs article/publication list |
| [!] | WWW-013 | SHOULD | Benefits references | Needs source data |
| [!] | WWW-018 | SHOULD | Science references | Needs source data |
| [-] | WWW-029 | — | Habit loop discussion | Discussion item only |
| [!] | WWW-038 | NICE TO HAVE | Logo in comparison | Needs logo asset |
| [!] | WWW-040 | MUST | Polish native review | Needs native PL speaker |
| [!] | WWW-042 | SHOULD | German native review | Needs native DE speaker |

---

## Progress Summary

| Phase | Total | Done | In Progress | Blocked | Skipped |
|-------|-------|------|-------------|---------|---------|
| Phase 1 EN | 32 | 22 | 0 | 6 | 4 |
| Phase 2 DE | 32 | 32 | 0 | 0 | 0 |
| Phase 2 PL | 32 | 32 | 0 | 0 | 0 |
| Phase 3 | 11 | 0 | 0 | 8 | 3 |
| **Total** | **107** | **86** | **0** | **14** | **7** |

---

## Files Modified (Complete List)

### EN Pages
- `website/src/pages/en/index.astro`
- `website/src/pages/en/smart-mouth-tape.astro`
- `website/src/pages/en/app.astro`
- `website/src/pages/en/how-it-works.astro`
- `website/src/pages/en/compare.astro`
- `website/src/pages/en/faq.astro`
- `website/src/pages/en/blog/index.astro`
- `website/src/pages/en/blog/01-mouth-breathing-vs-nasal-breathing.md`
- `website/src/pages/en/blog/02-mouth-taping-safety.md`
- `website/src/pages/en/blog/03-daytime-nasal-breathing-training.md`

### DE Pages
- `website/src/pages/de/index.astro`
- `website/src/pages/de/smart-mouth-tape.astro`
- `website/src/pages/de/app.astro`
- `website/src/pages/de/so-funktionierts.astro`
- `website/src/pages/de/vergleich.astro`
- `website/src/pages/de/faq.astro`
- `website/src/pages/de/blog/index.astro`
- `website/src/pages/de/blog/01-mundatmung-vs-nasenatmung.md`
- `website/src/pages/de/blog/02-mouth-taping-sicherheit.md`
- `website/src/pages/de/blog/03-nasenatmung-tagsueber-trainieren.md`

### PL Pages
- `website/src/pages/pl/index.astro`
- `website/src/pages/pl/inteligentna-tasma.astro`
- `website/src/pages/pl/aplikacja.astro`
- `website/src/pages/pl/jak-to-dziala.astro`
- `website/src/pages/pl/porownanie.astro`
- `website/src/pages/pl/faq.astro`
- `website/src/pages/pl/blog/index.astro`
- `website/src/pages/pl/blog/01-oddychanie-ustami-vs-nosem.md`
- `website/src/pages/pl/blog/02-tasmowanie-ust-bezpieczenstwo.md`
- `website/src/pages/pl/blog/03-dzienny-trening-oddychania-nosem.md`

### Shared Components
- `website/src/components/Footer.astro`
- `website/src/components/interactive/BreathingDemo.tsx`
- `website/src/components/interactive/HowItWorksTimeline.tsx`
- `website/src/components/islands/WaitlistForm.tsx`
- `website/src/layouts/MarkdownLayout.astro`
