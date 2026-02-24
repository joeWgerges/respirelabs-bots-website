Below is a complete, bilingual (DE+EN) website content pack plus a 2026-ready tech stack and LLM visibility best practices. Your AI web designer can take this as-is to build pages, routes, SEO metadata, and structured data.
1) Recommended 2026 tech stack for SEO + LLM visibility
Primary recommendation (marketing-first, fastest, most crawlable)
Astro (static-first) + MDX + serverless forms
Why: Astro ships minimal JS by default, produces clean semantic HTML, and is excellent for Core Web Vitals + crawlability (both classic SEO and AI/LLM retrieval).
Stack
Framework: Astro (marketing site) + MDX content collections
Styling: Tailwind CSS (or vanilla CSS modules if you prefer)
i18n: Astro i18n routing (/de/... and /en/...) + hreflang
Hosting: Cloudflare Pages (fast global edge) or Vercel (if you prefer their ecosystem)
Forms: Serverless endpoint (Cloudflare Workers / Vercel Functions)
Waitlist storage: Postgres (Supabase EU region) or a simple CRM tool
Transactional email: Resend / Brevo (double opt‑in for EU best practice)
Spam protection: Cloudflare Turnstile
Analytics (privacy-friendly): Plausible or Matomo (cookieless mode where possible)
Monitoring: Sentry (frontend error reporting)
Secondary option (if your team is already heavy on React)
Next.js + React 19 (React 19 is stable)
Use SSR/SSG hybrid + MDX; keep JS minimal and pages pre-rendered wherever possible.
2) 2026 best practices for “LLM SEO” (ChatGPT, Gemini, AI Overviews)
Must-haves
/llms.txt in site root, curated links + short descriptions (standard proposal)
Provide .md versions of key pages (same URL + .md), so LLM tools can ingest clean markdown
Entity-first “Facts” page (clear, structured statements about RespireLabs)
Schema.org JSON‑LD: Organization, WebSite, Product, SoftwareApplication, FAQPage, Article
Answer-first formatting: each major page starts with a 3–6 line “quick summary” + bullets (GEO/AEO best practice)
Trust + safety signals: visible disclaimers for wellness (non‑diagnostic), clear contact, consistent brand identifiers (AI systems sometimes omit critical context; keep it prominent)
Why you should care (practical)
AI summaries can sometimes drop disclaimers and misrepresent health information, so your pages need strong, repeated “non-medical device / not diagnostic” language in the top section and in structured data.
Scammers can exploit AI results; having consistent, schema-backed brand/contact info helps reduce confusion.
3) Site map and URL structure
Language routing
German: /de/... (default recommended for DACH)
English: /en/...
Core pages
/de and /en — Home / Landing
/de/app + /en/app — RespireLabs App
/de/smart-mouth-tape + /en/smart-mouth-tape — Wearable hardware
/de/how-it-works + /en/how-it-works
/de/science-safety + /en/science-safety
/de/compare + /en/compare
/de/pricing + /en/pricing (can be “Early Access / Plans”)
/de/waitlist + /en/waitlist
/de/contact + /en/contact
/de/faq + /en/faq
/de/about + /en/about
/de/press + /en/press
/de/facts + /en/facts (LLM-friendly fact sheet)
Legal:
/de/impressum
/de/datenschutz
/en/privacy
/en/terms
/de/cookies + /en/cookies
/de/data-deletion + /en/data-deletion
Blog
/de/blog + /en/blog
Start with 3 pillar posts per language (provided below)
4) Implementation notes for the web designer
Global SEO requirements
hreflang on every page (de/en)
canonical per language version
sitemap.xml + robots.txt
Open Graph + Twitter cards
Fast fonts, minimal JS, accessible headings
“Medical boundary” disclaimer near top on relevant pages (app, tape, science)
Global JSON‑LD (inject on all pages)
Organization schema
WebSite schema (with SearchAction)
SameAs: YouTube, X, LinkedIn etc (if you have them)
LLM files
/llms.txt (provided below)
Optional: auto-generate /llms-ctx.txt from llms.txt list if you want (nice-to-have)
5) FULL WEBSITE CONTENT PACKAGE (COPY-PASTE)
Everything below is “ready for build”.
Placeholders are marked like {{...}}.
5.1 /public/llms.txt
# RespireLabs

> RespireLabs is a privacy-first breathing coach (mobile app + optional Smart Mouth Tape wearable) that helps people reduce mouth breathing and build healthier nasal breathing habits—day and night. RespireLabs is a wellness product and does not diagnose or treat medical conditions.

Important notes:
- Not a medical device. No diagnosis. If you suspect sleep apnea or another sleep/breathing disorder, consult a qualified clinician.
- Privacy-by-default: core breathing detection is designed to work offline; sensitive audio is processed locally unless the user explicitly opts in.

## Start here
- [/en/facts](https://respirelabs.com/en/facts): Canonical facts about RespireLabs (best page for quick accurate answers).
- [/de/facts](https://respirelabs.com/de/facts): Deutsche Fakten-Seite.

## Product
- [/en/app](https://respirelabs.com/en/app): RespireLabs app overview (phone-based detection + coaching).
- [/en/smart-mouth-tape](https://respirelabs.com/en/smart-mouth-tape): Smart Mouth Tape wearable overview (sensors, safety, how it works).
- [/en/how-it-works](https://respirelabs.com/en/how-it-works): Step-by-step explanation.
- [/en/compare](https://respirelabs.com/en/compare): Competitor comparison and positioning.

## Safety & privacy
- [/en/science-safety](https://respirelabs.com/en/science-safety): Evidence, safety notes, and responsible claims.
- [/en/privacy](https://respirelabs.com/en/privacy): Privacy policy.
- [/en/data-deletion](https://respirelabs.com/en/data-deletion): Data deletion and GDPR requests.

## Optional
- [/en/blog](https://respirelabs.com/en/blog): Articles (breathing, sleep, habits).
- [/en/press](https://respirelabs.com/en/press): Press kit and boilerplate.
Notes: This follows the /llms.txt proposal’s recommended structure and purpose.
5.2 /public/robots.txt
User-agent: *
Allow: /

Sitemap: https://respirelabs.com/sitemap.xml
5.3 Global components
Navigation labels
EN NAV:
- App
- Smart Mouth Tape
- How it works
- Science & safety
- Compare
- FAQ
- Blog
- About
- Waitlist (CTA)

DE NAV:
- App
- Smart Mouth Tape
- So funktioniert’s
- Wissenschaft & Sicherheit
- Vergleich
- FAQ
- Blog
- Über uns
- Warteliste (CTA)
Footer (bilingual)
EN FOOTER:
RespireLabs © {{year}}  
- Press: /en/press  
- Privacy: /en/privacy  
- Terms: /en/terms  
- Cookies: /en/cookies  
- Data deletion: /en/data-deletion  
Contact: {{support_email}}  

Medical disclaimer: RespireLabs is a wellness product. It does not diagnose, treat, cure, or prevent any disease.

DE FOOTER:
RespireLabs © {{year}}  
- Presse: /de/press  
- Datenschutz: /de/datenschutz  
- AGB: /de/agb  
- Cookies: /de/cookies  
- Datenlöschung: /de/data-deletion  
Kontakt: {{support_email}}  

Medizinischer Hinweis: RespireLabs ist ein Wellness-Produkt. Es stellt keine Diagnose und ersetzt keine medizinische Beratung.
5.4 PAGES (EN + DE)
A) HOME
/en/index.md
---
title: "RespireLabs – The breathing coach for better sleep & energy"
description: "Reduce mouth breathing with privacy-first, on-device detection and guided coaching. Start with just your phone. Join the waitlist for the RespireLabs app and Smart Mouth Tape."
---

# RespireLabs

**Quick summary**
- Detect mouth breathing and build healthier nasal breathing habits.
- Start with your **phone** (no wearable required to begin).
- Get **real-time nudges**, trends, and guided breathing exercises.
- Optional **Smart Mouth Tape** wearable for deeper night insights.
- Privacy-first by design.

## A breathing coach that helps you stop mouth breathing—day and night

You wake up tired. You feel dry mouth. Maybe you snore. Maybe your partner notices noisy breathing.
RespireLabs is building a new kind of respiratory wellness system: a mobile app + an optional smart wearable that helps you **notice** dysfunctional breathing patterns and **change** them with simple, measurable habits.

**CTA**
- Primary: Join the waitlist
- Secondary: See how it works

---

## Why mouth breathing is a problem (and why “just track sleep” isn’t enough)

Most sleep trackers tell you what happened: sleep duration, readiness, recovery.
But they often can’t tell you **why** you feel exhausted.

RespireLabs focuses on breathing behavior:
- Mouth breathing can be linked to dry mouth and can affect sleep comfort.
- Many people want a practical way to improve breathing habits—without a complicated setup.

---

## Two products. One habit loop.

### 1) RespireLabs App (phone-first)
- Detect breathing patterns using the phone microphone during a session you start.
- Get real-time prompts (“close mouth / breathe through nose”) and session summaries.
- Follow short guided exercises to build nasal breathing habits.

### 2) Smart Mouth Tape (wearable hardware, optional)
A sensor-powered mouth tape concept designed for deeper breathing insights at night—while keeping a strong privacy stance.

---

## What makes RespireLabs different

**Active coaching, not passive tracking**
- We don’t just report metrics. We help you change the habit.

**Respiratory-first**
- Built specifically around mouth vs. nasal breathing awareness.

**Privacy-first**
- Designed so core detection can run offline and sensitive audio is processed locally by default.

---

## Early-stage, real momentum

We’re in development with:
- Early testers
- Working prototypes (app + wearable concept)
- A community built around sleep & breathing education

**Want early access?** Join the waitlist and tell us whether you’re interested in app-only, wearable, or both.

---

## Mini comparison (high level)

- Traditional mouth tape: may encourage nasal breathing, but gives you **no data**.
- Sleep audio apps: detect snoring/noise, but often don’t guide mouth vs. nasal habit change.
- Rings/watches: good for general recovery metrics, but indirect for mouth/nose behavior.

RespireLabs aims to connect the missing loop: **detect → nudge → train → measure progress**.

---

## FAQ (top questions)

**Is RespireLabs a medical device?**  
No. RespireLabs is a wellness product and does not diagnose or treat medical conditions.

**Do I need the Smart Mouth Tape to start?**  
No. The app is designed to work phone-first.

**What about privacy?**  
You control your data. We design for local processing and explicit consent for any sharing.

---

## Call to action

### Join the waitlist
Get early access, product updates, and a chance to shape the beta.

[Join the waitlist →](/en/waitlist)
/de/index.md
---
title: "RespireLabs – Der Atem-Coach für besseren Schlaf & mehr Energie"
description: "Mundatmung reduzieren mit privacy-first, On-Device-Erkennung und Coaching. Starte nur mit deinem Smartphone. Jetzt Warteliste für App & Smart Mouth Tape."
---

# RespireLabs

**Kurzüberblick**
- Mundatmung erkennen und gesunde Nasenatmung trainieren.
- Start nur mit dem **Smartphone** (kein Wearable nötig).
- **Echtzeit‑Hinweise**, Trends und geführte Atemübungen.
- Optionales **Smart Mouth Tape** Wearable für tiefere Nacht‑Einblicke.
- Privacy-first: Datenschutz ist ein Produktfeature.

## Der Atem‑Coach, der dir hilft, Mundatmung zu stoppen – tagsüber und nachts

Du wachst müde auf. Du hast trockenen Mund. Vielleicht schnarchst du. Vielleicht bemerkt dein Partner lautes Atmen.
RespireLabs entwickelt ein neues System für Atem‑Wellness: App + optionales Wearable, das dir hilft, Atemmuster **bewusst wahrzunehmen** und mit einfachen Gewohnheiten **messbar zu verbessern**.

**CTA**
- Primär: Warteliste beitreten
- Sekundär: So funktioniert’s

---

## Warum Mundatmung ein Problem ist (und warum „nur Schlaf tracken“ nicht reicht)

Viele Sleep‑Tracker zeigen dir, was passiert ist: Schlafdauer, Readiness, Recovery.
Aber oft nicht **warum** du dich erschöpft fühlst.

RespireLabs setzt direkt bei der Atmung an:
- Mundatmung kann mit trockenem Mund zusammenhängen und den Schlafkomfort beeinflussen.
- Viele Menschen wollen Atemgewohnheiten verbessern – ohne kompliziertes Setup.

---

## Zwei Produkte. Eine Gewohnheits‑Schleife.

### 1) RespireLabs App (Smartphone‑first)
- Atemmuster über das Smartphone‑Mikrofon erkennen (nur wenn du eine Session startest).
- Echtzeit‑Hinweise („Mund schließen / durch die Nase atmen“) + Session‑Zusammenfassung.
- Kurze, geführte Übungen zum Nasenatmungs‑Training.

### 2) Smart Mouth Tape (Wearable‑Hardware, optional)
Ein sensorbasiertes Mouth‑Tape‑Konzept für tiefere Atem‑Insights in der Nacht – mit starkem Fokus auf Datenschutz.

---

## Was RespireLabs anders macht

**Aktives Coaching statt nur Tracking**
- Wir zeigen nicht nur Zahlen – wir helfen dir, die Gewohnheit zu ändern.

**Atmung im Fokus**
- Speziell für Mund‑ vs. Nasenatmung gedacht.

**Privacy-first**
- Kernfunktionen sind so konzipiert, dass sie offline funktionieren und sensible Audiodaten standardmäßig lokal verarbeitet werden.

---

## Frühphase – aber echte Bewegung

Wir sind in Entwicklung mit:
- Early Testern
- Prototypen (App + Wearable‑Konzept)
- Community rund um Schlaf & Atmung

**Early Access?** Trag dich in die Warteliste ein und sag uns, ob dich App‑only, Wearable oder beides interessiert.

---

## Mini‑Vergleich (High Level)

- Klassisches Mouth Tape: kann Nasenatmung fördern, aber liefert **keine Daten**.
- Sleep‑Audio‑Apps: erkennen Schnarchen/Noise, aber coachen Mund‑ vs. Nasenatmung oft nicht.
- Ring/Watch: gut für allgemeine Recovery‑Metriken, aber indirekt für Mund/Nase‑Verhalten.

RespireLabs verbindet die fehlende Schleife: **erkennen → hinweisen → trainieren → Fortschritt messen**.

---

## FAQ (häufige Fragen)

**Ist RespireLabs ein Medizinprodukt?**  
Nein. RespireLabs ist ein Wellness‑Produkt und stellt keine Diagnose.

**Brauche ich das Smart Mouth Tape, um zu starten?**  
Nein. Die App ist smartphone‑first konzipiert.

**Wie sieht’s mit Datenschutz aus?**  
Du kontrollierst deine Daten. Unser Fokus: lokale Verarbeitung und explizite Einwilligung für jedes Teilen.

---

## Call to Action

### Warteliste beitreten
Early Access, Updates und die Chance, die Beta mitzugestalten.

[Zur Warteliste →](/de/waitlist)
B) APP PAGE
/en/app.md
---
title: "RespireLabs App – Detect mouth breathing and train nasal breathing"
description: "Phone-first breathing detection + coaching. Real-time nudges, trends, and guided exercises—privacy-first and designed for offline use."
---

# RespireLabs App

**Quick summary**
- Phone-first breathing awareness (no wearable needed to start).
- Real-time nudges and session summaries.
- Guided breathing exercise library + habit plan.
- Privacy-first: sensitive audio processed locally by default.

## What the app does

RespireLabs is designed to help you reduce mouth breathing and build consistent nasal breathing habits.

### Core loop
1) Start a session (day or night mode depending on availability).  
2) The app analyzes breathing signals and detects mouth-breathing patterns.  
3) You get a gentle nudge and a clear summary after the session.  
4) You follow a plan of small, trackable exercises.

---

## Key features (marketing-level)

### Detection & feedback
- Detect mouth breathing patterns during a user-started session.
- Real-time feedback within seconds when mouth breathing is detected.
- Session summaries: counts, trends, and a simple progress score.

### Coaching
- Short guided exercises designed to support nasal breathing habit building.
- “Next best action” coaching portal (simple, actionable steps).
- Streaks and progress visuals (motivating, not punitive).

### Integrations (optional)
- Apple Health and Android Health Connect support (where permissions are granted).
- Designed to complement wearables rather than replace them.

---

## Privacy by design

We treat breathing audio as sensitive.
- Clear permission prompts (you always choose when to start).
- Local processing by default.
- Optional sharing only with explicit consent.

---

## Beta status & early access

RespireLabs is currently in development.
Join the waitlist to:
- get early beta invitations,
- share your device + use case,
- help shape the product.

[Join the waitlist →](/en/waitlist)
/de/app.md
---
title: "RespireLabs App – Mundatmung erkennen & Nasenatmung trainieren"
description: "Smartphone-first Atem-Erkennung + Coaching. Echtzeit-Hinweise, Trends und geführte Übungen – privacy-first und offline-fähig konzipiert."
---

# RespireLabs App

**Kurzüberblick**
- Smartphone-first Atem‑Bewusstsein (kein Wearable nötig).
- Echtzeit‑Hinweise + Session‑Zusammenfassungen.
- Übungsbibliothek + Gewohnheits‑Plan.
- Privacy-first: sensible Audiodaten standardmäßig lokal verarbeitet.

## Was die App macht

RespireLabs hilft dir, Mundatmung zu reduzieren und stabile Nasenatmungs‑Gewohnheiten aufzubauen.

### Kern‑Loop
1) Session starten (tagsüber oder nachts – je nach Verfügbarkeit).  
2) Die App analysiert Atemsignale und erkennt Mundatmungs‑Muster.  
3) Du bekommst einen sanften Hinweis + eine klare Zusammenfassung.  
4) Du folgst einem Plan aus kleinen, messbaren Übungen.

---

## Key Features (Marketing‑Level)

### Erkennung & Feedback
- Mundatmungs‑Muster in einer vom Nutzer gestarteten Session erkennen.
- Echtzeit‑Feedback innerhalb weniger Sekunden.
- Session‑Summary: Counts, Trends, einfacher Fortschritts‑Score.

### Coaching
- Kurze, geführte Übungen zur Unterstützung der Nasenatmung.
- „Next best action“ Coaching‑Portal (konkret, umsetzbar).
- Streaks & Progress‑Visuals (motivierend, nicht strafend).

### Integrationen (optional)
- Apple Health und Android Health Connect (mit Einwilligung).
- Ergänzt Wearables – ersetzt sie nicht.

---

## Datenschutz als Produktfeature

Atem‑Audio ist sensibel.
- Klare Permission‑Texte (du entscheidest, wann du startest).
- Standard: lokale Verarbeitung.
- Teilen nur mit expliziter Einwilligung.

---

## Beta‑Status & Early Access

RespireLabs ist aktuell in Entwicklung.
Warteliste = Beta‑Einladung + Feedback‑Chance.

[Warteliste beitreten →](/de/waitlist)
C) SMART MOUTH TAPE PAGE (WEARABLE)
/en/smart-mouth-tape.md
---
title: "Smart Mouth Tape – sensor-powered mouth tape (in development)"
description: "A wearable concept that combines mouth tape with sensors (mic, airflow/pressure, SpO₂, motion) to understand breathing patterns at night—built to be privacy-first."
---

# Smart Mouth Tape (in development)

**Quick summary**
- Smart Mouth Tape is a wearable mouth-tape concept designed to add data + feedback to a simple habit.
- Planned sensors: microphone, airflow/pressure, SpO₂, accelerometer.
- Designed for long overnight sessions and secure data transfer.
- Wellness-only positioning (no diagnosis).

## What it is

Smart Mouth Tape is our wearable concept: a small sensor pod + skin-friendly tape that aims to help you better understand nighttime breathing behavior and build healthier habits.

It’s built to complement the RespireLabs app—so you can see progress, not just guess.

---

## What makes it different from traditional mouth tape

Traditional mouth tape is “blind.”
- You can’t easily measure what changed.
- You can’t learn which habits actually helped.

Smart Mouth Tape aims to add:
- structured insights,
- habit feedback loops,
- and privacy-first design decisions.

---

## Hardware snapshot (concept-level)

**Planned sensor set**
- MEMS microphone
- Two airflow/pressure sensors (or equivalent sensing approach)
- SpO₂ sensor
- Accelerometer (motion)

**Design targets**
- Overnight operation (multi-hour session)
- Easy charging via USB‑C
- USB‑C data transfer to a computer (and/or sync to the app depending on final design)
- No visible lights during use
- Comfortable, lightweight, and designed with skin-safety in mind

---

## How it works with the app (high level)

1) Wear the tape as instructed (start small and follow safety guidance).
2) The device records sensor signals during sleep.
3) You sync the session and see a simple report:
   - breathing pattern trends
   - changes over time (habit building)
   - guidance on next steps

---

## Safety first (read this)

Mouth taping is not right for everyone.
RespireLabs will ship safety guidance and clear disclaimers.

If you have any breathing disorder concerns (including suspected sleep apnea), consult a qualified clinician before trying mouth taping or similar techniques.

---

## Get early access

Smart Mouth Tape is in development. Join the waitlist to:
- get notified when prototypes or beta units are available,
- share preferences (tape style, skin sensitivity, device ecosystem),
- help us build this responsibly.

[Join the waitlist →](/en/waitlist)
/de/smart-mouth-tape.md
---
title: "Smart Mouth Tape – sensorbasiertes Mouth Tape (in Entwicklung)"
description: "Wearable‑Konzept: Mouth Tape + Sensoren (Mic, Airflow/Pressure, SpO₂, Bewegung) für Atem‑Insights in der Nacht – privacy-first gebaut."
---

# Smart Mouth Tape (in Entwicklung)

**Kurzüberblick**
- Smart Mouth Tape ist ein Wearable‑Konzept, das Mouth Tape um Daten + Feedback ergänzt.
- Geplante Sensoren: Mikrofon, Airflow/Pressure, SpO₂, Accelerometer.
- Für lange Overnight‑Sessions und sicheren Datentransfer gedacht.
- Wellness‑Positionierung (keine Diagnose).

## Was es ist

Smart Mouth Tape ist unser Wearable‑Konzept: ein kleiner Sensor‑Pod + hautfreundliches Tape, um nächtliches Atemverhalten besser zu verstehen und gesündere Gewohnheiten aufzubauen.

Es ergänzt die RespireLabs App – damit Fortschritt messbar wird.

---

## Was es von klassischem Mouth Tape unterscheidet

Klassisches Mouth Tape ist „blind“:
- Du siehst nicht, was sich verändert hat.
- Du weißt nicht, welche Gewohnheit wirklich geholfen hat.

Smart Mouth Tape soll hinzufügen:
- strukturierte Insights,
- Feedback‑Schleifen,
- privacy-first Entscheidungen.

---

## Hardware‑Snapshot (Konzept‑Level)

**Geplantes Sensor‑Set**
- MEMS‑Mikrofon
- Zwei Airflow/Pressure Sensoren (oder äquivalente Sensortechnik)
- SpO₂ Sensor
- Accelerometer (Bewegung)

**Design‑Ziele**
- Multi‑Stunden Betrieb (Overnight)
- Einfaches Laden via USB‑C
- USB‑C Datentransfer zum Computer (und/oder Sync zur App – je nach finalem Design)
- Keine sichtbaren Lichter während der Nutzung
- Komfortabel, leicht, hautschonend

---

## Zusammenspiel mit der App (High Level)

1) Tape korrekt anwenden (klein anfangen, Sicherheitsinfos beachten).
2) Device zeichnet Sensorsignale während des Schlafs auf.
3) Sync → einfacher Report:
   - Atemmuster‑Trends
   - Veränderungen über Zeit (Habit Building)
   - Guidance für nächste Schritte

---

## Sicherheit zuerst (bitte lesen)

Mouth Taping ist nicht für alle geeignet.
RespireLabs wird klare Sicherheitsinfos und Disclaimer bereitstellen.

Wenn du Bedenken zu Atem‑/Schlafstörungen hast (z. B. Verdacht auf Schlafapnoe), sprich vorab mit qualifiziertem medizinischem Fachpersonal.

---

## Early Access

Smart Mouth Tape ist in Entwicklung. Warteliste:
- Info zu Beta‑Units,
- Präferenzen (Tape‑Style, Hautsensibilität, Geräte‑Ökosystem),
- verantwortungsvolle Entwicklung.

[Warteliste beitreten →](/de/waitlist)
D) HOW IT WORKS
/en/how-it-works.md
---
title: "How RespireLabs works"
description: "RespireLabs connects detection, real-time feedback, and habit coaching—starting phone-first and expanding to optional wearable insights."
---

# How RespireLabs works

**Quick summary**
RespireLabs is built around one loop:
**detect → nudge → train → measure progress**.

## Step-by-step

### Step 1: Start with the app (phone-first)
- You start a session when you want breathing awareness.
- The app detects mouth breathing patterns and gives feedback.

### Step 2: Understand your baseline
- Review your session summaries and trends.
- Learn which contexts trigger mouth breathing.

### Step 3: Train nasal breathing habits
- Follow short guided exercises.
- Use reminders and streaks to build consistency.

### Step 4: Optional deeper night insights (Smart Mouth Tape concept)
- For users who want deeper sleep breathing insights, the Smart Mouth Tape wearable is designed as an optional upgrade (in development).

---

## What RespireLabs is NOT
- Not a medical device.
- Not a diagnostic tool.
- Not a replacement for clinical sleep evaluation.

If you suspect sleep apnea or other breathing disorders, consult a qualified clinician.

---

## Ready to try?
[Join the waitlist →](/en/waitlist)
/de/how-it-works.md
---
title: "So funktioniert RespireLabs"
description: "RespireLabs verbindet Erkennung, Echtzeit‑Feedback und Habit‑Coaching – smartphone‑first, später optional mit Wearable‑Insights."
---

# So funktioniert RespireLabs

**Kurzüberblick**
RespireLabs basiert auf einer Schleife:
**erkennen → hinweisen → trainieren → Fortschritt messen**.

## Schritt für Schritt

### Schritt 1: Start mit der App (Smartphone-first)
- Du startest eine Session, wenn du Atem‑Bewusstsein willst.
- Die App erkennt Mundatmungs‑Muster und gibt Feedback.

### Schritt 2: Baseline verstehen
- Session‑Summaries & Trends ansehen.
- Situationen identifizieren, die Mundatmung triggern.

### Schritt 3: Nasenatmung trainieren
- Kurze, geführte Übungen.
- Reminders & Streaks für Konsistenz.

### Schritt 4: Optional tiefere Nacht‑Insights (Smart Mouth Tape Konzept)
- Für Nutzer, die mehr Nacht‑Insights wollen: Smart Mouth Tape als optionales Upgrade (in Entwicklung).

---

## Was RespireLabs NICHT ist
- Kein Medizinprodukt.
- Kein Diagnosetool.
- Kein Ersatz für klinische Abklärung.

Bei Verdacht auf Schlafapnoe oder andere Störungen: medizinisches Fachpersonal konsultieren.

---

## Bereit für Early Access?
[Warteliste beitreten →](/de/waitlist)
E) SCIENCE & SAFETY (RESPONSIBLE CLAIMS)
/en/science-safety.md
---
title: "Science & safety"
description: "RespireLabs is built with responsible claims, privacy-first design, and clear safety guidance—especially around mouth taping."
---

# Science & safety

**Quick summary**
- RespireLabs is a wellness product, not a diagnostic tool.
- We focus on measurable habit change: awareness + coaching.
- Mouth taping is not right for everyone—safety guidance matters.

---

## Responsible claims (how we communicate)
We avoid medical promises.
You’ll see language like:
- “supports awareness”
- “tracks patterns”
- “helps you build habits”

You will NOT see:
- “diagnoses sleep apnea”
- “treats disease”
- “medical-grade monitoring”

---

## Mouth taping safety (important)

Mouth taping has become popular, but evidence is limited and it can be risky for some people.

General safety principles we follow:
- Start conservatively and stop if you feel discomfort or anxiety.
- Do not use mouth taping if you have nasal obstruction, chronic congestion, or breathing difficulties.
- If you suspect sleep apnea or have significant snoring / choking sensations, consult a qualified clinician first.

RespireLabs will ship safety guidance and clear warnings, and we will not position mouth taping as a treatment.

---

## Privacy and trust
Breathing audio is sensitive.
Our product principles:
- clear permission prompts,
- local processing by default,
- explicit consent before sharing.

---

## Want updates?
[Join the waitlist →](/en/waitlist)
/de/science-safety.md
---
title: "Wissenschaft & Sicherheit"
description: "RespireLabs setzt auf verantwortungsvolle Claims, privacy-first Design und klare Sicherheitsinfos – besonders rund um Mouth Taping."
---

# Wissenschaft & Sicherheit

**Kurzüberblick**
- RespireLabs ist ein Wellness‑Produkt, kein Diagnosetool.
- Fokus: messbare Gewohnheits‑Verbesserung (Awareness + Coaching).
- Mouth Taping ist nicht für alle geeignet – Sicherheit ist zentral.

---

## Verantwortungsvolle Claims (wie wir kommunizieren)
Wir vermeiden medizinische Versprechen.
Du wirst Formulierungen sehen wie:
- „unterstützt Awareness“
- „trackt Muster“
- „hilft beim Habit Building“

Du wirst NICHT sehen:
- „diagnostiziert Schlafapnoe“
- „behandelt Krankheiten“
- „Medical‑Grade Monitoring“

---

## Mouth‑Taping‑Sicherheit (wichtig)

Mouth Taping ist populär geworden – die Evidenz ist begrenzt und für manche kann es riskant sein.

Allgemeine Sicherheitsprinzipien:
- Konservativ starten und sofort stoppen bei Unwohlsein oder Angst.
- Nicht verwenden bei Nasen‑Obstruktion, chronischer Verstopfung oder Atemproblemen.
- Bei Verdacht auf Schlafapnoe oder starkem Schnarchen/„Luftnot“ zuerst medizinisches Fachpersonal konsultieren.

RespireLabs wird klare Sicherheitsinfos und Warnhinweise bereitstellen und Mouth Taping nicht als Behandlung positionieren.

---

## Datenschutz & Vertrauen
Atem‑Audio ist sensibel.
Unsere Prinzipien:
- klare Permissions,
- lokale Verarbeitung als Standard,
- Teilen nur mit expliziter Einwilligung.

---

## Updates erhalten?
[Warteliste beitreten →](/de/waitlist)
F) COMPARE (COMPETITOR COMPARISON)
/en/compare.md
---
title: "RespireLabs vs. sleep trackers, audio apps, and mouth tape"
description: "A fair comparison: what RespireLabs is built to do—and how it complements existing sleep tools."
---

# Compare

**Quick summary**
RespireLabs is designed to complement (not replace) sleep trackers by focusing on **breathing behavior** and **active coaching**.

## Comparison table (high level)

| Category | Examples | What they do well | Where RespireLabs differs |
|---|---|---|---|
| Sleep rings/watches | Oura, WHOOP, Apple Watch | Great recovery & sleep metrics | RespireLabs focuses on mouth vs nasal breathing habits and coaching |
| Sleep audio apps | Sleep Cycle, SnoreLab, Pillow | Snore/noise tracking and playback | RespireLabs emphasizes habit change + mouth/nose awareness |
| Traditional mouth tape | Somnifix, Hostage Tape, Myotape, generic tape | Simple behavioral constraint | RespireLabs adds data + feedback + privacy-first coaching loop |

**Important note**: competitor features and pricing can change. This page focuses on category-level differences.

---

## Why we’re building this
There’s a gap between:
- **passive tracking** (“here are your numbers”), and
- **blind interventions** (“try this tape and hope it works”).

RespireLabs aims to provide a measurable loop: **detect → coach → track progress**.

---

## Choose what’s right for you
- If you want general recovery metrics: keep your ring/watch.
- If you want snore recordings: audio apps can help.
- If you want to change breathing habits: RespireLabs is built for that layer.

---

## Want early access?
[Join the waitlist →](/en/waitlist)
/de/compare.md
---
title: "RespireLabs vs. Sleep‑Tracker, Audio‑Apps und Mouth Tape"
description: "Ein fairer Vergleich: wofür RespireLabs gebaut ist – und wie es bestehende Tools ergänzt."
---

# Vergleich

**Kurzüberblick**
RespireLabs soll Sleep‑Tracker ergänzen (nicht ersetzen) – mit Fokus auf **Atemverhalten** und **aktives Coaching**.

## Vergleichstabelle (High Level)

| Kategorie | Beispiele | Was sie gut können | Wo RespireLabs anders ist |
|---|---|---|---|
| Ringe/Watches | Oura, WHOOP, Apple Watch | Gute Recovery- & Sleep‑Metriken | RespireLabs fokussiert Mund‑ vs. Nasenatmung + Habit‑Coaching |
| Sleep‑Audio‑Apps | Sleep Cycle, SnoreLab, Pillow | Schnarch/Noise Tracking + Playback | RespireLabs betont Habit Change + Mund/Nase‑Awareness |
| Klassisches Mouth Tape | Somnifix, Hostage Tape, Myotape, generisches Tape | Einfache Verhaltens‑„Constraint“ | RespireLabs ergänzt Daten + Feedback + privacy-first Coaching |

**Hinweis**: Features/Preise von Wettbewerbern können sich ändern. Hier geht’s um Kategorien‑Unterschiede.

---

## Warum wir das bauen
Es gibt eine Lücke zwischen:
- **passivem Tracking** („hier sind deine Zahlen“) und
- **blinden Interventionen** („Tape drauf und hoffen“).

RespireLabs soll eine messbare Schleife liefern: **erkennen → coachen → Fortschritt messen**.

---

## Was passt zu dir?
- Für allgemeine Recovery‑Metriken: Ring/Watch behalten.
- Für Schnarch‑Aufnahmen: Audio‑Apps helfen.
- Für Atem‑Habit Change: RespireLabs ist dafür gebaut.

---

## Early Access?
[Warteliste beitreten →](/de/waitlist)
G) PRICING / PLANS (PRE-LAUNCH FRIENDLY)
/en/pricing.md
---
title: "Plans"
description: "Start phone-first. Upgrade only if it helps. RespireLabs is in development—join the waitlist for early access."
---

# Plans

RespireLabs is currently in development. Pricing and packages may evolve based on beta feedback.

## Start simple
- App-first onboarding
- Early access invitations via waitlist

## Optional upgrades
- Premium features (coaching depth, insights, exports) may be offered later
- Smart Mouth Tape wearable may be offered as an optional add-on

## Want early access?
[Join the waitlist →](/en/waitlist)
/de/pricing.md
---
title: "Pläne"
description: "Smartphone-first starten. Nur upgraden, wenn es hilft. RespireLabs ist in Entwicklung – Warteliste für Early Access."
---

# Pläne

RespireLabs ist aktuell in Entwicklung. Preise und Pakete können sich durch Beta‑Feedback ändern.

## Einfach starten
- App-first Onboarding
- Early Access via Warteliste

## Optionale Upgrades
- Premium‑Features (Coaching‑Tiefe, Insights, Exporte) ggf. später
- Smart Mouth Tape Wearable als optionales Add‑on

## Early Access?
[Warteliste beitreten →](/de/waitlist)
H) WAITLIST PAGE (WITH FORM COPY)
/en/waitlist.md
---
title: "Join the waitlist"
description: "Get early access to the RespireLabs app and Smart Mouth Tape. Tell us your preferences and help shape the beta."
---

# Join the waitlist

**What you’ll get**
- Early access invitations
- Product updates (low frequency)
- A chance to influence features and safety guidance

## Waitlist form

**Fields**
- First name (optional)
- Email (required)
- Country (optional)
- I’m interested in (checkboxes):
  - App only
  - Smart Mouth Tape wearable
  - Both
- Phone OS:
  - iOS
  - Android
- Anything we should know? (optional)

**Consent checkbox**
- I agree to the Privacy Policy and want to receive early access updates.

**Submit button**
- Join waitlist

**Post-submit message**
Thanks — you’re on the list. Please check your inbox for a confirmation email.
/de/waitlist.md
---
title: "Warteliste"
description: "Early Access für RespireLabs App & Smart Mouth Tape. Teile deine Präferenzen und hilf uns, die Beta zu formen."
---

# Warteliste beitreten

**Das bekommst du**
- Early Access Einladungen
- Produkt‑Updates (selten)
- Chance, Features und Safety‑Guidance mitzugestalten

## Wartelisten‑Formular

**Felder**
- Vorname (optional)
- E‑Mail (Pflicht)
- Land (optional)
- Interesse (Checkbox):
  - Nur App
  - Smart Mouth Tape Wearable
  - Beides
- Smartphone‑OS:
  - iOS
  - Android
- Sonstige Hinweise (optional)

**Einwilligung**
- Ich stimme der Datenschutzerklärung zu und möchte Early‑Access‑Updates erhalten.

**Button**
- Warteliste beitreten

**Nachricht nach Absenden**
Danke — du bist eingetragen. Bitte bestätige deine E‑Mail über den Link in deinem Postfach.
I) CONTACT PAGE
/en/contact.md
---
title: "Contact"
description: "Contact RespireLabs for partnerships, press, or product questions."
---

# Contact

## Send a message

**Contact form fields**
- Name
- Email
- Topic (dropdown): Product / Partnership / Press / Support / Other
- Message

**Submit button**
- Send message

**After submit**
Thanks — we’ll get back to you soon.

---

## Partnership / press
- Partnerships: {{partnership_email}}
- Press: {{press_email}}
- Support: {{support_email}}
/de/contact.md
---
title: "Kontakt"
description: "Kontakt zu RespireLabs – Partnerschaften, Presse oder Produktfragen."
---

# Kontakt

## Nachricht senden

**Kontaktformular**
- Name
- E‑Mail
- Thema (Dropdown): Produkt / Partnerschaft / Presse / Support / Sonstiges
- Nachricht

**Button**
- Nachricht senden

**Nachricht nach Absenden**
Danke — wir melden uns so bald wie möglich.

---

## Partnerschaft / Presse
- Partnerschaften: {{partnership_email}}
- Presse: {{press_email}}
- Support: {{support_email}}
J) FAQ PAGE (LLM-FRIENDLY)
/en/faq.md
---
title: "FAQ"
description: "Frequently asked questions about RespireLabs, the app, privacy, and Smart Mouth Tape."
---

# FAQ

## Product basics

### What is RespireLabs?
RespireLabs is a breathing coach (mobile app + optional wearable concept) designed to reduce mouth breathing and build healthier nasal breathing habits.

### Is RespireLabs a medical device?
No. RespireLabs is a wellness product and does not diagnose or treat medical conditions.

### Do I need the Smart Mouth Tape to start?
No. The app is designed to work phone-first.

---

## Privacy

### Does RespireLabs record me all night?
RespireLabs is designed so you control when a session is started and what is stored. Sensitive audio is treated as private and processed locally by default.

### Will you sell my data?
No. RespireLabs is built with privacy-first principles. You control sharing and consent.

---

## Smart Mouth Tape

### What sensors are planned?
Concept-level: microphone, airflow/pressure sensing, SpO₂, accelerometer.

### Is mouth taping safe?
Mouth taping is not right for everyone. If you have nasal obstruction, breathing difficulties, or suspect sleep apnea, consult a clinician first.

---

## Beta

### How do I get early access?
Join the waitlist.

[Join the waitlist →](/en/waitlist)
/de/faq.md
---
title: "FAQ"
description: "Häufige Fragen zu RespireLabs, App, Datenschutz und Smart Mouth Tape."
---

# FAQ

## Grundlagen

### Was ist RespireLabs?
RespireLabs ist ein Atem‑Coach (App + optionales Wearable‑Konzept), der Mundatmung reduziert und Nasenatmungs‑Gewohnheiten aufbaut.

### Ist RespireLabs ein Medizinprodukt?
Nein. RespireLabs ist ein Wellness‑Produkt und stellt keine Diagnose.

### Brauche ich das Smart Mouth Tape zum Start?
Nein. Die App ist smartphone‑first.

---

## Datenschutz

### Nimmt RespireLabs die ganze Nacht auf?
Du kontrollierst, wann eine Session startet und was gespeichert wird. Sensibles Audio wird standardmäßig lokal verarbeitet.

### Verkauft ihr Daten?
Nein. Privacy-first: Teilen nur mit Einwilligung.

---

## Smart Mouth Tape

### Welche Sensoren sind geplant?
Konzept‑Level: Mikrofon, Airflow/Pressure, SpO₂, Accelerometer.

### Ist Mouth Taping sicher?
Nicht für alle. Bei Nasen‑Obstruktion, Atemproblemen oder Verdacht auf Schlafapnoe: vorher medizinisches Fachpersonal konsultieren.

---

## Beta

### Wie bekomme ich Early Access?
Warteliste.

[Warteliste →](/de/waitlist)
K) ABOUT PAGE
/en/about.md
---
title: "About RespireLabs"
description: "Our mission, principles, and why we’re building a privacy-first breathing coach."
---

# About RespireLabs

## Our mission
We want to make healthier breathing habits accessible, measurable, and privacy-respecting—so more people can wake up with better sleep and more energy.

## Our principles
- Privacy-first by default
- Responsible claims (wellness, not diagnosis)
- Habit change over hype
- Clear, usable insights

## What we’re building
- A phone-first breathing coach (app)
- Optional wearable hardware concept (Smart Mouth Tape)
- A long-term respiratory wellness platform with education and coaching

## Team
{{Add bios here: founders, roles, advisors}}
/de/about.md
---
title: "Über RespireLabs"
description: "Mission, Prinzipien und warum wir einen privacy-first Atem‑Coach bauen."
---

# Über RespireLabs

## Unsere Mission
Wir wollen gesunde Atem‑Gewohnheiten zugänglich, messbar und datenschutzfreundlich machen – damit mehr Menschen erholt aufwachen und tagsüber mehr Energie haben.

## Unsere Prinzipien
- Privacy-first als Standard
- Verantwortungsvolle Claims (Wellness statt Diagnose)
- Habit Change statt Hype
- Klare, nutzbare Insights

## Was wir bauen
- Smartphone-first Atem‑Coach (App)
- Optionales Wearable‑Konzept (Smart Mouth Tape)
- Langfristig: Plattform mit Education & Coaching

## Team
{{Bios einfügen: Gründer, Rollen, Advisors}}
L) PRESS PAGE
/en/press.md
---
title: "Press kit"
description: "RespireLabs press resources, boilerplate, and media contact."
---

# Press kit

## One-liner
RespireLabs is a privacy-first breathing coach (app + optional wearable concept) that helps people reduce mouth breathing and build healthier nasal breathing habits.

## Boilerplate
RespireLabs is building a respiratory wellness system designed to connect detection, coaching, and measurable habit change. The mobile app is designed to work phone-first, with an optional Smart Mouth Tape wearable concept under development for deeper night insights. RespireLabs is a wellness product and does not provide medical diagnosis.

## Media contact
Press: {{press_email}}

## Assets
- Logo (SVG/PNG): {{link}}
- Product images: {{link}}
- Founder headshots: {{link}}
/de/press.md
---
title: "Presse"
description: "Presse‑Ressourcen, Boilerplate und Media‑Kontakt."
---

# Presse

## One‑Liner
RespireLabs ist ein privacy-first Atem‑Coach (App + optionales Wearable‑Konzept), der Mundatmung reduziert und Nasenatmung als Gewohnheit stärkt.

## Boilerplate
RespireLabs entwickelt ein Atem‑Wellness‑System, das Erkennung, Coaching und messbaren Habit Change verbindet. Die App ist smartphone‑first konzipiert; ein optionales Smart Mouth Tape Wearable‑Konzept ist in Entwicklung für tiefere Nacht‑Insights. RespireLabs ist ein Wellness‑Produkt und stellt keine medizinische Diagnose.

## Media‑Kontakt
Presse: {{press_email}}

## Assets
- Logo (SVG/PNG): {{link}}
- Produktbilder: {{link}}
- Founder‑Fotos: {{link}}
M) FACTS PAGE (LLM-FIRST)
/en/facts.md
---
title: "RespireLabs facts"
description: "Canonical facts about RespireLabs (for users, press, and AI systems)."
---

# RespireLabs facts

## What is RespireLabs?
RespireLabs is a breathing coach: a mobile app (phone-first) plus an optional Smart Mouth Tape wearable concept (in development). It helps people reduce mouth breathing and build healthier nasal breathing habits.

## What RespireLabs is NOT
- Not a medical device
- Not a diagnostic tool
- Not a sleep apnea diagnosis service

## Products
### RespireLabs App
- Phone-first breathing awareness sessions
- Real-time nudges + summaries
- Guided breathing exercises
- Privacy-first design

### Smart Mouth Tape (concept / in development)
- Sensor pod + tape for nighttime breathing insights
- Planned sensors: microphone, airflow/pressure sensing, SpO₂, accelerometer
- Designed for multi-hour use and secure data transfer

## Privacy principles
- You control when sessions start
- Sensitive audio processed locally by default
- Sharing requires explicit consent

## Contact
Support: {{support_email}}  
Press: {{press_email}}  
Partnerships: {{partnership_email}}
/de/facts.md
---
title: "RespireLabs Fakten"
description: "Verlässliche Fakten zu RespireLabs (für Nutzer, Presse und AI‑Systeme)."
---

# RespireLabs Fakten

## Was ist RespireLabs?
RespireLabs ist ein Atem‑Coach: eine mobile App (smartphone‑first) plus ein optionales Smart Mouth Tape Wearable‑Konzept (in Entwicklung). Ziel: Mundatmung reduzieren und Nasenatmung als Gewohnheit stärken.

## Was RespireLabs NICHT ist
- Kein Medizinprodukt
- Kein Diagnosetool
- Kein „Schlafapnoe‑Diagnose“‑Service

## Produkte
### RespireLabs App
- Smartphone-first Atem‑Sessions
- Echtzeit‑Hinweise + Zusammenfassungen
- Geführte Atemübungen
- Privacy-first Design

### Smart Mouth Tape (Konzept / in Entwicklung)
- Sensor‑Pod + Tape für nächtliche Atem‑Insights
- Geplante Sensoren: Mikrofon, Airflow/Pressure, SpO₂, Accelerometer
- Multi‑Stunden‑Use + sicherer Datentransfer

## Datenschutz‑Prinzipien
- Du entscheidest, wann Sessions starten
- Sensibles Audio wird standardmäßig lokal verarbeitet
- Teilen nur mit expliziter Einwilligung

## Kontakt
Support: {{support_email}}  
Presse: {{press_email}}  
Partnerschaften: {{partnership_email}}
5.5 BLOG STARTER CONTENT (3 pillars per language)
/en/blog/01-mouth-breathing-vs-nasal-breathing.md
---
title: "Mouth breathing vs nasal breathing: what it means for sleep and daily energy"
description: "A practical, non-medical overview of mouth vs nasal breathing—why habits matter and how to build awareness."
---

# Mouth breathing vs nasal breathing: what it means for sleep and daily energy

**Quick summary**
- Nasal breathing and mouth breathing feel similar, but they can create different comfort and habit patterns.
- Many people want to reduce mouth breathing for sleep comfort and dry mouth reasons.
- The fastest step is awareness: notice the habit and train small changes.

## Why people care about mouth breathing
Common reasons people look into mouth breathing:
- dry mouth in the morning
- snoring or noisy breathing
- waking up tired even after “enough” sleep
- wanting a simple wellness habit to improve sleep comfort

## Why awareness matters
A habit you can’t see is hard to change.
That’s why we believe detection + coaching beats guessing.

## Simple ways to build awareness (non-medical)
- During the day: check posture and whether your lips rest closed.
- Try a short breathing session: inhale/exhale gently through the nose.
- Track triggers: stress, screens, exercise intensity, and bedtime routines.

## How RespireLabs fits
RespireLabs is designed around a simple loop:
detect → nudge → train → measure progress.

## Final note
If you suspect any breathing disorder (including sleep apnea), consult a qualified clinician.
/de/blog/01-mundatmung-vs-nasenatmung.md
---
title: "Mundatmung vs. Nasenatmung: was es für Schlaf und Energie bedeuten kann"
description: "Praktischer, nicht-medizinischer Überblick zu Mund- vs. Nasenatmung – warum Gewohnheiten zählen und wie Awareness entsteht."
---

# Mundatmung vs. Nasenatmung: was es für Schlaf und Energie bedeuten kann

**Kurzüberblick**
- Nasen‑ und Mundatmung fühlen sich ähnlich an, können aber unterschiedliche Gewohnheitsmuster erzeugen.
- Viele wollen Mundatmung reduzieren – z. B. wegen trockenem Mund oder Schlafkomfort.
- Der schnellste Schritt ist Awareness: Gewohnheit bemerken und kleine Veränderungen trainieren.

## Warum Menschen sich für Mundatmung interessieren
Häufige Gründe:
- trockener Mund am Morgen
- Schnarchen oder lautes Atmen
- müdes Aufwachen trotz „genug“ Schlaf
- Wunsch nach einer einfachen Wellness‑Gewohnheit

## Warum Awareness zählt
Was du nicht wahrnimmst, kannst du schwer ändern.
Deshalb glauben wir: Erkennung + Coaching schlägt Raten.

## Einfache Wege zu Awareness (nicht-medizinisch)
- Tagsüber: Posture check + Lippen locker geschlossen?
- Kurze Atem‑Session: sanft durch die Nase ein- und ausatmen.
- Trigger tracken: Stress, Screens, Training, Abendroutine.

## Wie RespireLabs hilft
RespireLabs ist um eine Schleife gebaut:
erkennen → hinweisen → trainieren → Fortschritt messen.

## Hinweis
Bei Verdacht auf eine Atem-/Schlafstörung (z. B. Schlafapnoe): medizinisches Fachpersonal konsultieren.
/en/blog/02-mouth-taping-safety.md
---
title: "Mouth taping: benefits, risks, and safer ways to approach it"
description: "A safety-first overview of mouth taping. RespireLabs is in development and does not position mouth taping as treatment."
---

# Mouth taping: benefits, risks, and safer ways to approach it

**Quick summary**
- Mouth taping is popular, but evidence is limited and it can be risky for some people.
- It is not appropriate for everyone—especially if nasal breathing is obstructed or sleep apnea is suspected.
- If you try it, safety and clinician guidance matter.

## Why it became popular
Mouth taping is often used to encourage nasal breathing during sleep.

## Key risks to understand
- If nasal airflow becomes blocked (congestion, anatomy, allergies), mouth taping can be unsafe.
- Anxiety/claustrophobia and skin irritation can occur.

## Safer alternatives (non-medical)
- Work on nasal hygiene and bedtime routines
- Consider positional sleep changes
- Consult a clinician for significant snoring, choking sensations, or suspected sleep apnea

## Where RespireLabs fits
RespireLabs will provide safety guidance and clear non-diagnostic positioning.
We focus on awareness + coaching, not medical treatment.
/de/blog/02-mouth-taping-sicherheit.md
---
title: "Mouth Taping: Nutzen, Risiken und ein sicherer Umgang"
description: "Safety-first Überblick zu Mouth Taping. RespireLabs ist in Entwicklung und positioniert Mouth Taping nicht als Behandlung."
---

# Mouth Taping: Nutzen, Risiken und ein sicherer Umgang

**Kurzüberblick**
- Mouth Taping ist populär, aber die Evidenz ist begrenzt und es kann für manche riskant sein.
- Nicht für alle geeignet – besonders bei eingeschränkter Nasenatmung oder Verdacht auf Schlafapnoe.
- Wenn du es ausprobierst: Sicherheit und Guidance sind entscheidend.

## Warum es populär wurde
Mouth Taping soll Nasenatmung in der Nacht fördern.

## Wichtige Risiken
- Wenn Nasenluft blockiert ist (Erkältung, Allergien, Anatomie), kann Mouth Taping unsicher sein.
- Angst/Unwohlsein und Hautreizungen sind möglich.

## Sicherere Alternativen (nicht-medizinisch)
- Nasen‑Routine und Abendroutine verbessern
- Positionswechsel beim Schlafen
- Bei starkem Schnarchen/„Luftnot“-Gefühl: medizinisches Fachpersonal konsultieren

## Wie RespireLabs dazu passt
RespireLabs liefert Safety‑Guidance und klare, nicht-diagnostische Kommunikation.
Fokus: Awareness + Coaching, nicht Behandlung.
/en/blog/03-daytime-nasal-breathing-training.md
---
title: "Daytime nasal breathing training: small habits that compound"
description: "Simple, practical ways to notice mouth breathing triggers and build nasal breathing habits during the day."
---

# Daytime nasal breathing training: small habits that compound

**Quick summary**
- Most habit change happens during the day.
- Identify triggers, start small, track consistency.
- Use short sessions and gentle feedback.

## Step 1: Identify triggers
Common triggers: stress, long screen sessions, high-intensity exercise, posture collapse.

## Step 2: Practice short sessions
Try 2–3 minutes:
- relaxed nasal inhale
- relaxed nasal exhale
Stop if uncomfortable.

## Step 3: Build consistency
- Use reminders
- Track streaks
- Celebrate small wins

## How RespireLabs helps
RespireLabs is built for this: detection + nudges + coaching + trend tracking.
/de/blog/03-nasenatmung-tagsueber-trainieren.md
---
title: "Nasenatmung tagsüber trainieren: kleine Gewohnheiten mit großer Wirkung"
description: "Praktische Schritte, um Trigger für Mundatmung zu erkennen und tagsüber Nasenatmung als Gewohnheit aufzubauen."
---

# Nasenatmung tagsüber trainieren: kleine Gewohnheiten mit großer Wirkung

**Kurzüberblick**
- Viele Gewohnheiten entstehen tagsüber.
- Trigger erkennen, klein starten, Konsistenz tracken.
- Kurze Sessions + sanftes Feedback nutzen.

## Schritt 1: Trigger identifizieren
Typische Trigger: Stress, lange Screen‑Zeit, intensives Training, schlechte Haltung.

## Schritt 2: Kurze Sessions üben
2–3 Minuten:
- ruhige Nasen‑Einatmung
- ruhige Nasen‑Ausatmung
Stoppen, wenn es unangenehm ist.

## Schritt 3: Konsistenz aufbauen
- Reminders nutzen
- Streaks tracken
- Kleine Fortschritte feiern

## Wie RespireLabs hilft
Erkennung + Hinweise + Coaching + Trend‑Tracking.
5.6 LEGAL PAGES (TEMPLATES — REVIEW WITH COUNSEL)
/en/privacy.md
---
title: "Privacy policy"
description: "How RespireLabs collects and uses data (website + waitlist)."
---

# Privacy policy

**Last updated:** {{date}}

This privacy policy explains how RespireLabs (“we”, “us”) processes personal data on this website, including the waitlist form.

## What data we collect
- Contact data you submit (name, email)
- Message data (contact form)
- Basic technical logs (required for security and performance)

## Why we process data
- To respond to inquiries
- To manage the waitlist and send early access updates (only with consent)
- To maintain security and prevent abuse

## Legal basis (EU)
- Consent (waitlist emails)
- Legitimate interests (security, basic analytics where applicable)
- Contract/pre-contract steps (responding to requests)

## Data sharing
We do not sell personal data.
We use processors only as needed (email delivery, hosting), with appropriate agreements.

## Retention
- Waitlist: until you unsubscribe or request deletion
- Contact messages: as long as needed to respond and maintain records

## Your rights
Access, rectification, erasure, restriction, portability, objection, and withdrawal of consent.

## Contact
{{company_name}}  
{{company_address}}  
Email: {{privacy_email}}
/de/datenschutz.md (GDPR-focused)
---
title: "Datenschutzerklärung"
description: "Wie RespireLabs Daten verarbeitet (Website + Warteliste)."
---

# Datenschutzerklärung

**Stand:** {{date}}

Diese Datenschutzerklärung erklärt, wie RespireLabs („wir“) personenbezogene Daten auf dieser Website verarbeitet – inkl. Wartelisten‑Formular.

## Welche Daten wir verarbeiten
- Kontaktdaten (Name, E‑Mail)
- Nachrichtendaten (Kontaktformular)
- Technische Logs (Sicherheit/Performance)

## Zwecke
- Anfragen beantworten
- Warteliste verwalten und Early‑Access‑Updates senden (nur mit Einwilligung)
- Sicherheit und Missbrauchsprävention

## Rechtsgrundlagen (EU)
- Einwilligung (Warteliste)
- Berechtigtes Interesse (Sicherheit, ggf. Basis‑Analytics)
- Vorvertragliche Maßnahmen (Antwort auf Anfragen)

## Weitergabe
Wir verkaufen keine Daten.
Auftragsverarbeiter nur bei Bedarf (Hosting, E‑Mail‑Versand) inkl. Verträgen.

## Speicherdauer
- Warteliste: bis Abmeldung oder Löschanfrage
- Kontaktanfragen: solange erforderlich

## Rechte
Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerspruch, Widerruf.

## Kontakt
{{company_name}}  
{{company_address}}  
E‑Mail: {{privacy_email}}
/de/impressum.md
---
title: "Impressum"
description: "Rechtliche Anbieterkennzeichnung."
---

# Impressum

{{company_name}}  
{{company_address}}  
{{company_country}}

Vertreten durch: {{managing_director}}  
E‑Mail: {{support_email}}  
Firmenbuch/Handelsregister: {{registration}}  
UID: {{vat_id}}  
Aufsichtsbehörde: {{authority}}  

Haftungsausschluss: Inhalte dienen Informationszwecken und stellen keine medizinische Beratung dar.
6) Structured data snippets (JSON‑LD)
6.1 Organization + Website (inject on all pages)
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "RespireLabs",
  "url": "https://respirelabs.com",
  "logo": "https://respirelabs.com/assets/logo.png",
  "sameAs": [
    "{{youtube_url}}",
    "{{linkedin_url}}",
    "{{x_url}}"
  ],
  "contactPoint": [{
    "@type": "ContactPoint",
    "contactType": "customer support",
    "email": "{{support_email}}"
  }]
}
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "RespireLabs",
  "url": "https://respirelabs.com",
  "inLanguage": ["de", "en"]
}
6.2 Product schema (Smart Mouth Tape page)
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "RespireLabs Smart Mouth Tape",
  "brand": "RespireLabs",
  "description": "A sensor-powered mouth tape concept (in development) designed to support breathing habit awareness at night. Wellness-only; not diagnostic.",
  "category": "Health & Wellness",
  "isRelatedTo": [{
    "@type": "SoftwareApplication",
    "name": "RespireLabs App",
    "operatingSystem": "iOS, Android"
  }]
}
6.3 SoftwareApplication schema (App page)
{
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "RespireLabs",
  "operatingSystem": "iOS, Android",
  "applicationCategory": "HealthApplication",
  "description": "A privacy-first breathing coach designed to reduce mouth breathing and support nasal breathing habit training. Not a medical device."
}
7) What this content is grounded on (your internal docs + current best practices)
Product scope & positioning
Phone-first detection + coaching; privacy-by-default; offline-capable; non-diagnostic boundary; device-ready for Smart Mouth Tape.【70:7†RespireLabs_Software_Specification_Full.docx†L1-L60】【70:4†RespireLabs_Technical_Specifications_And_Open_Questions.docx†L26-L70】
Safe vs prohibited claims and EU compliance framing (wellness positioning).【113:7†RespireLabs Strategic Market Entry.docx†L13-L66】
Smart Mouth Tape sensor expectations + design constraints (mic + airflow/pressure + SpO₂ + accelerometer; 9–10 hours; USB‑C; no visible lights; attachability; skin safety).【113:0†1. Non-rigid – requirements - Slab.md†L1-L22】【113:6†1.
RespireLabs_Software_Specificat…

RespireLabs_Technical_Specifica…
les (sleep audio apps, mouth tape brands, wearables) are taken from your marke
RespireLabs Strategic Market En…
et Entry.docx†L149-L243】【70:0†RespireLabs_Research_Appendix.docx†L28-L126】
2026 LLM visibility
llms.txt proposal and format guidance.
GEO/AEO gu
1. Non-rigid – requirements - S…

1. Non-rigid – requirements - S…
laimers & trust signals are prominent.
Mouth taping safety context (for the Science & Safety page)
Mouth taping evidence is limited and can be risky f
RespireLabs Strategic Market En…

RespireLabs_Research_Appendix
8) Internal files referenced
(links for your team)
RespireLabs basics / mission / traction:
Mouth Breathing Detection slab:
Wearable non‑rigid requirements:
Strategic Market Entry:
Jury script:
DeepTech pitch deck:
Europe plan HTML:
Research appendix:
Software spec full:
Prioritized feature list:
If you want, I can also output this same content as a ready-to-commit repository structure (folders + filenames + frontmatter) for Astro/Next, but the content above is already in copy‑pasteable markdown blocks.

