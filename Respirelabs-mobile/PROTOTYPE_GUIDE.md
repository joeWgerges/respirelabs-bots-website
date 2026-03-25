# RespireLabs Mobile — Figma Prototype Connection Guide

> **Figma File**: https://www.figma.com/design/UVh2sg1nQys2wamFgu1jMh/RespireLabs-Mobile-App
> **FigJam Flow Map**: https://www.figma.com/online-whiteboard/create-diagram/99635a35-bcc1-4191-8122-7ff4e1ba198b
> **Generated**: February 28, 2026

## Quick Start

1. Open the Figma file above
2. Switch to **Prototype** tab (top-right)
3. Use the Variant A frames below to create connections
4. Set Device to **iPhone 15 Pro** (393 x 852)
5. Set Starting Frame to **S1 Splash** (node `0:19`)

---

## Variant A Frame Reference (Primary Prototype Chain)

These are the first-variant (Variant A) phone frames to use for the clickable prototype:

### Original Screens (S1-S15)
| Screen | Node ID | Description |
|--------|---------|-------------|
| S1 | `0:19` | Splash Screen |
| S2 | `0:60` | Permissions |
| S3 | `0:243` | Value Prop Carousel |
| S4 | `0:358` | Goal Selection |
| S5 | `3:18` | Home Empty State |
| S6 | `3:274` | Home Active State |
| S7 | `4:18` | Session Playing |
| S8 | `4:156` | Session Paused |
| S9 | `5:18` | Breathing Analysis |
| S10 | `5:339` | Sleep Trends |
| S11 | `6:18` | Exercise Library |
| S12 | `6:413` | Knowledge Center |
| S13 | `6:710` | Article Detail |
| S14 | `7:18` | Teleconsultation |
| S15 | `7:497` | Tape Management |

### Tier 1 — MVP Must-Have (S16-S27, S37)
| Screen | Node ID | Description |
|--------|---------|-------------|
| S16 | `11:18` | Session Complete / Summary |
| S17 | `11:258` | Session History List |
| S18 | `11:699` | Session Detail View |
| S19 | `14:18` | Nighttime Sleep Mode |
| S20 | `15:18` | BLE Device Pairing |
| S21 | `12:18` | Settings / Profile |
| S22 | `12:366` | Paywall / Subscription |
| S23 | `13:18` | Notification Permission |
| S24 | `13:183` | Personalization Questionnaire |
| S25 | `13:367` | Daily Summary |
| S26 | `13:796` | Tutorial Overlay |
| S27 | `14:275` | Real-Time Alert Config |
| S37 | `14:587` | Daytime Tracking Mode |

### Tier 2 — Should-Have (S28-S36)
| Screen | Node ID | Description |
|--------|---------|-------------|
| S28 | `16:18` | Exercise Detail / Timer |
| S29 | `16:366` | Streak & Achievements |
| S30 | `17:18` | Monthly Trends |
| S31 | `17:476` | Content Bookmarks |
| S32 | `18:18` | Specialist Detail |
| S34 | `19:18` | Privacy & Consent |
| S35 | `19:381` | Health Integrations |
| S36 | `19:487` | Export / Share Report |

### Stakeholder Bonus
| Screen | Node ID | Description |
|--------|---------|-------------|
| C1 | `20:18` | Soft Paywall (Inline) |
| C4 | `20:278` | Subscription Success |
| D1 | `21:18` | Notification Inbox |
| H1 | `22:18` | Social Login |

> **Note**: Platform Extensions (F1-F4) and Accessibility Modes (G1-G4) are non-phone frames (Watch, Widget, iPad) and are not included in the prototype flow.

---

## 10 User Flows — Connection Instructions

### How to Create a Prototype Link in Figma
1. Select a frame or element (button, card, tab icon)
2. In the **Prototype** tab (right panel), click **+** next to "Interactions"
3. Set trigger (e.g., "On tap")
4. Set action: **Navigate to** → select destination frame
5. Set animation (see transition table below)
6. Drag the blue arrow to the destination frame

### Transition Presets
| Transition | Animation | Duration | Easing |
|------------|-----------|----------|--------|
| Tab switch | Instant | 0ms | — |
| Push forward | Slide In → Right | 300ms | Ease Out |
| Back | Slide Out → Right | 300ms | Ease Out |
| Modal open | Slide In → Bottom | 400ms | Spring |
| Modal close | Slide Out → Bottom | 300ms | Ease In |
| Splash → Carousel | Dissolve | 600ms | Ease In-Out |

---

### Flow 1: Onboarding
> First-time user journey from splash to home

| Step | From | Trigger | To | Transition |
|------|------|---------|-----|------------|
| 1 | S1 (`0:19`) | After delay 2s | S3 (`0:243`) | Dissolve 600ms |
| 2 | S3 (`0:243`) | Tap "Get Started" | S2 (`0:60`) | Slide Right 300ms |
| 3 | S2 (`0:60`) | Tap "Allow Permissions" | S23 (`13:18`) | Slide Right 300ms |
| 4 | S23 (`13:18`) | Tap "Enable Notifications" | S4 (`0:358`) | Slide Right 300ms |
| 5 | S4 (`0:358`) | Tap goal card | S24 (`13:183`) | Slide Right 300ms |
| 6 | S24 (`13:183`) | Tap "Continue" | S26 (`13:796`) | Slide Right 300ms |
| 7 | S26 (`13:796`) | Tap "Got It" | S5 (`3:18`) | Dissolve 300ms |

### Flow 2: Device Pairing
> Connecting the Smart Tape via BLE

| Step | From | Trigger | To | Transition |
|------|------|---------|-----|------------|
| 1 | S5 (`3:18`) | Tap "Pair Smart Tape" | S20 (`15:18`) | Modal Up 400ms |
| 2 | S20 (`15:18`) | Tap "Done" / auto | S5 (`3:18`) | Modal Down 300ms |
| 3 | S20 (`15:18`) | Tap "Settings" | S15 (`7:497`) | Slide Right 300ms |

### Flow 3: Night Session
> Overnight sleep tracking

| Step | From | Trigger | To | Transition |
|------|------|---------|-----|------------|
| 1 | S6 (`3:274`) | Tap "Start Night Session" | S19 (`14:18`) | Modal Up 400ms |
| 2 | S19 (`14:18`) | Tap "Stop Recording" | S16 (`11:18`) | Dissolve 300ms |
| 3 | S16 (`11:18`) | Tap "Done" / "View Details" | S6 (`3:274`) | Modal Down 300ms |
| 4 | S16 (`11:18`) | Tap "View Full Report" | S18 (`11:699`) | Slide Right 300ms |

### Flow 4: Daytime Tracking
> Real-time daytime breathing tracking with alerts

| Step | From | Trigger | To | Transition |
|------|------|---------|-----|------------|
| 1 | S6 (`3:274`) | Tap "Start Tracking" | S37 (`14:587`) | Modal Up 400ms |
| 2 | S37 (`14:587`) | Tap alert icon / gear | S27 (`14:275`) | Slide Right 300ms |
| 3 | S27 (`14:275`) | Tap back arrow | S37 (`14:587`) | Slide Left 300ms |
| 4 | S37 (`14:587`) | Tap "End Session" | S16 (`11:18`) | Dissolve 300ms |

### Flow 5: Breathing Exercise
> Starting and completing a guided exercise

| Step | From | Trigger | To | Transition |
|------|------|---------|-----|------------|
| 1 | S11 (`6:18`) | Tap exercise card | S28 (`16:18`) | Slide Right 300ms |
| 2 | S28 (`16:18`) | Tap "Start Exercise" | S7 (`4:18`) | Modal Up 400ms |
| 3 | S7 (`4:18`) | Tap pause button | S8 (`4:156`) | Dissolve 200ms |
| 4 | S8 (`4:156`) | Tap "Resume" | S7 (`4:18`) | Dissolve 200ms |
| 5 | S7 (`4:18`) | Tap "End Session" | S16 (`11:18`) | Dissolve 300ms |
| 6 | S8 (`4:156`) | Tap "End Session" | S16 (`11:18`) | Dissolve 300ms |

### Flow 6: Analytics Deep Dive
> Browsing breathing analysis, session history, and trends

| Step | From | Trigger | To | Transition |
|------|------|---------|-----|------------|
| 1 | S9 (`5:18`) | Tap "See All Sessions" | S17 (`11:258`) | Slide Right 300ms |
| 2 | S17 (`11:258`) | Tap session row | S18 (`11:699`) | Slide Right 300ms |
| 3 | S18 (`11:699`) | Tap back arrow | S17 (`11:258`) | Slide Left 300ms |
| 4 | S17 (`11:258`) | Tap back arrow | S9 (`5:18`) | Slide Left 300ms |
| 5 | S9 (`5:18`) | Swipe left / tap "Sleep" tab | S10 (`5:339`) | Slide Right 300ms |
| 6 | S10 (`5:339`) | Tap "Monthly View" | S30 (`17:18`) | Slide Right 300ms |
| 7 | S30 (`17:18`) | Tap back arrow | S10 (`5:339`) | Slide Left 300ms |
| 8 | S10 (`5:339`) | Tap badges area | S29 (`16:366`) | Slide Right 300ms |
| 9 | S29 (`16:366`) | Tap back arrow | S10 (`5:339`) | Slide Left 300ms |

### Flow 7: Knowledge Center
> Browsing articles, bookmarks, and content

| Step | From | Trigger | To | Transition |
|------|------|---------|-----|------------|
| 1 | S12 (`6:413`) | Tap article card | S13 (`6:710`) | Slide Right 300ms |
| 2 | S13 (`6:710`) | Tap back arrow | S12 (`6:413`) | Slide Left 300ms |
| 3 | S13 (`6:710`) | Tap bookmark icon | S31 (`17:476`) | Slide Right 300ms |
| 4 | S12 (`6:413`) | Tap "Saved" / bookmarks | S31 (`17:476`) | Slide Right 300ms |
| 5 | S31 (`17:476`) | Tap back arrow | S12 (`6:413`) | Slide Left 300ms |

### Flow 8: Teleconsultation
> Finding and consulting with a specialist

| Step | From | Trigger | To | Transition |
|------|------|---------|-----|------------|
| 1 | S14 (`7:18`) | Tap specialist card | S32 (`18:18`) | Slide Right 300ms |
| 2 | S32 (`18:18`) | Tap "Book Appointment" | S14 (`7:18`) | Slide Left 300ms |
| 3 | S32 (`18:18`) | Tap back arrow | S14 (`7:18`) | Slide Left 300ms |

### Flow 9: Settings
> Navigating settings and related screens

| Step | From | Trigger | To | Transition |
|------|------|---------|-----|------------|
| 1 | S6 (`3:274`) | Tap gear icon | S21 (`12:18`) | Slide Right 300ms |
| 2 | S21 (`12:18`) | Tap "Smart Tape" | S15 (`7:497`) | Slide Right 300ms |
| 3 | S15 (`7:497`) | Tap back arrow | S21 (`12:18`) | Slide Left 300ms |
| 4 | S21 (`12:18`) | Tap "Health Integrations" | S35 (`19:381`) | Slide Right 300ms |
| 5 | S35 (`19:381`) | Tap back arrow | S21 (`12:18`) | Slide Left 300ms |
| 6 | S21 (`12:18`) | Tap "Privacy & Data" | S34 (`19:18`) | Slide Right 300ms |
| 7 | S34 (`19:18`) | Tap "Export Report" | S36 (`19:487`) | Slide Right 300ms |
| 8 | S36 (`19:487`) | Tap back arrow | S34 (`19:18`) | Slide Left 300ms |
| 9 | S34 (`19:18`) | Tap back arrow | S21 (`12:18`) | Slide Left 300ms |
| 10 | S21 (`12:18`) | Tap "Subscription" | S22 (`12:366`) | Slide Right 300ms |
| 11 | S22 (`12:366`) | Tap back arrow | S21 (`12:18`) | Slide Left 300ms |
| 12 | S21 (`12:18`) | Tap back arrow | S6 (`3:274`) | Slide Left 300ms |

### Flow 10: Monetization
> Premium upsell and subscription flow

| Step | From | Trigger | To | Transition |
|------|------|---------|-----|------------|
| 1 | C1 (`20:18`) | Tap "Upgrade" | S22 (`12:366`) | Modal Up 400ms |
| 2 | S22 (`12:366`) | Tap "Start Free Trial" | C4 (`20:278`) | Dissolve 300ms |
| 3 | C4 (`20:278`) | Tap "Start Exploring" | S6 (`3:274`) | Modal Down 300ms |

---

## Tab Bar Navigation (Global)

Apply these connections to the tab bar on **every screen that has one**:

| Tab | Destination | Node ID |
|-----|-------------|---------|
| Home | S6 Home Active | `3:274` |
| Track | S9 Breathing Analysis | `5:18` |
| Tips | S11 Exercise Library | `6:18` |
| Learn | S12 Knowledge Center | `6:413` |
| Consult | S14 Teleconsultation | `7:18` |

**Screens WITH tab bar** (apply tab nav to all):
S5, S6, S9, S10, S11, S12, S13, S14, S15, S17, S21, S25, S28, S29, S30, S31, S32, S34, S35, S36

**Screens WITHOUT tab bar** (modals/overlays):
S1, S2, S3, S4, S7, S8, S16, S19, S20, S22, S23, S24, S26, S27, S33, S37

**Transition for tabs**: Instant (0ms)

---

## Screens with Settings Gear → S21

These screens have a gear/settings icon in the nav header. Connect it to S21:

| Screen | Node ID | Target |
|--------|---------|--------|
| S5 Home Empty | `3:18` | S21 (`12:18`) |
| S6 Home Active | `3:274` | S21 (`12:18`) |
| S25 Daily Summary | `13:367` | S21 (`12:18`) |

---

## Prototype Settings

| Setting | Value |
|---------|-------|
| Device | iPhone 15 Pro |
| Frame size | 393 x 852 |
| Starting frame | S1 Splash (`0:19`) |
| Background | #E5E5E5 |

---

## File Organization (Recommended)

For the best prototype experience, consider duplicating the Variant A frames onto a dedicated **"Prototype"** page in Figma. This keeps the prototype flow separate from the design variants and makes it easier to manage links.

### Recommended Page Structure
```
Page 1: Cover
Page 2: Design System
Page 3: Onboarding (S1, S2, S3, S4, S23, S24, S26)
Page 4: Home (S5, S6, S25)
Page 5: Sessions (S7, S8, S16, S19, S27, S37)
Page 6: Analytics (S9, S10, S17, S18, S30)
Page 7: Exercises (S11, S28, S29)
Page 8: Knowledge (S12, S13, S31)
Page 9: Teleconsultation (S14, S32)
Page 10: Device & Settings (S15, S20, S21, S34, S35, S36)
Page 11: Subscription (S22, C1, C4)
Page 12: Notifications (D1)
Page 13: Platform Extensions (F1-F4) — non-interactive
Page 14: Accessibility (G1-G4) — non-interactive
Page 15: Onboarding Variations (H1-H4) — non-interactive
Page 16: Prototype Flow (Variant A copies, all connected)
```

---

## Total Connection Count

| Flow | Connections |
|------|------------|
| Flow 1: Onboarding | 7 |
| Flow 2: Device Pairing | 3 |
| Flow 3: Night Session | 4 |
| Flow 4: Daytime Tracking | 4 |
| Flow 5: Breathing Exercise | 6 |
| Flow 6: Analytics | 9 |
| Flow 7: Knowledge | 5 |
| Flow 8: Teleconsultation | 3 |
| Flow 9: Settings | 12 |
| Flow 10: Monetization | 3 |
| Tab Bar (×20 screens × 5 tabs) | 100 |
| Settings Gear (×3 screens) | 3 |
| **Total** | **~159** |

---

## Verification Checklist

After connecting all flows:

- [ ] **Start to finish**: S1 → S5 (complete onboarding works)
- [ ] **Night session**: S6 → S19 → S16 → S6 (completes and returns)
- [ ] **Day tracking**: S6 → S37 → S27 → S37 → S16 (full loop)
- [ ] **Exercise**: S11 → S28 → S7 → S8 → S7 → S16 (play/pause/complete)
- [ ] **Analytics drill**: S9 → S17 → S18 → back → back → S9 (no dead ends)
- [ ] **All tabs work**: Every tab bar on every screen navigates correctly
- [ ] **Back navigation**: Every detail screen has a working back arrow
- [ ] **No dead ends**: Every screen has at least one way to navigate away
- [ ] **Settings round-trip**: S6 → S21 → any sub-screen → back to S21 → back to S6
- [ ] **Monetization**: C1 → S22 → C4 → S6 (complete purchase flow)
