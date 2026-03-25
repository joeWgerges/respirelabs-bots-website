# RespireLabs Mobile App — UI Design Specifications

## 1. Design Tokens
- **Primary Action:** #206FF7 (Respire Blue)
- **Background (Light):** #FAFAFA (Clean White)
- **Background (Dark):** #0A0A0B (Deep Navy)
- **Text (Primary):** #0A0A0B / #FAFAFA
- **Text (Secondary):** #6B7280 (Neutral Grey)
- **Exhale Accent:** #FFDC31 (Golden Yellow)
- **Corners:** 24px (Cards), 100px (Pill Buttons)
- **Typography:** Oddval (Headers), Montserrat (UI)

---

## 2. Screen: S5 Home Dashboard (Light Mode)

### Layout Structure:
- **StatusBar:** Standard iOS/Android system bar.
- **TopNav:** 
  - Left: Logo Symbol (Blue).
  - Center: "Good Morning, [User]" (Oddval SemiBold, 16px).
  - Right: Tape Status Icon (Small pill: Green dot + "Connected").
- **Hero Card (Main Metric):**
  - **Background:** White, Subtle Shadow (0 4px 20px rgba(0,0,0,0.05)).
  - **Title:** "Last Session" (Montserrat 12px, Uppercase, Grey).
  - **Metric:** "88%" (Oddval Bold, 64px, Blue).
  - **Subtext:** "Nasal Breathing Ratio" (Montserrat 14px, Grey).
  - **Visual:** A thin blue circular progress ring around the metric.
- **Secondary Grid (2 columns):**
  - **Card A (Sleep):** "76" Quality Score (Circular indicator).
  - **Card B (Streak):** "5 Days" (Flame icon).
- **Primary CTA (Floating Bottom):**
  - **Button:** "Start Night Session" (Pill-shaped, Blue, White Text).

---

## 3. Screen: S9 Active Breathing Session (Dark Mode Only)

### Layout Structure:
- **Background:** Pure #000000 for maximum focus and OLED efficiency.
- **Center Element (The Ring):**
  - **Animation State:** Expanding/Contracting circle.
  - **Inhale:** Circle expands to 80% width, Glowing Blue (#206FF7).
  - **Hold:** Circle pulses gently.
  - **Exhale:** Circle contracts to 40% width, Glowing Yellow (#FFDC31).
- **Text Overlay (Inside Ring):**
  - **Instruction:** "Inhale" (Montserrat SemiBold, 24px, White).
  - **Timer:** "0:04" (Oddval Regular, 18px, Muted White).
- **Bottom Bar:**
  - **Action:** "End Session" (Secondary button, Ghost style).
  - **Stats:** Cycle 4/10.

---

## 4. Screen: S10 Knowledge Center

### Layout Structure:
- **Header:** "Knowledge Center" (Oddval Bold, 28px).
- **Search:** Rounded bar with "Search articles..."
- **Featured Card:**
  - Full-width image (Rounded 24px).
  - Overlay: "The Science of Mouth Taping" (Oddval SemiBold, 20px).
- **Feed:** Clean list items with small thumbnails and "5 min read" labels.
