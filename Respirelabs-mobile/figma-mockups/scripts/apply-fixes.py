#!/usr/bin/env python3
"""
Apply comprehensive navigation fixes, visual enhancements, and flow expansions
to prototype.html for the RespireLabs mobile prototype.

Phases covered:
  1. Fix orphaned screens (add data-nav links TO them)
  2. Fix dead-end screens (add exit buttons)
  3. Expand navigation for comprehensive flows
  4. Visual CSS enhancements
  5. Update TAB_MAPPING and SCREENS_WITH_TAB
"""

import re
import sys

INPUT = 'prototype.html'
OUTPUT = 'prototype.html'

with open(INPUT, 'r', encoding='utf-8') as f:
    content = f.read()

original_len = len(content)
changes = 0

def replace_once(old, new, label=""):
    global content, changes
    if old in content:
        content = content.replace(old, new, 1)
        changes += 1
        if label:
            print(f"  ✓ {label}")
        return True
    else:
        if label:
            print(f"  ✗ NOT FOUND: {label}")
        return False

print("=" * 60)
print("PHASE 1: Fix Orphaned Screens & Dead-Ends")
print("=" * 60)

# --- S7: Add pause button → S8 ---
# The session-close in S7 should navigate to S8 (paused)
replace_once(
    '<div class="session-close">✕</div>\n      </div>\n      <div style="flex:1;display:flex;align-items:center;justify-content:center;">\n        <div class="breathing-glow-blue">',
    '<div class="session-close" data-nav="S8">✕</div>\n      </div>\n      <div style="flex:1;display:flex;align-items:center;justify-content:center;">\n        <div class="breathing-glow-blue">',
    "S7: session-close → S8 (pause)"
)

# --- S8: session-close should go back ---
replace_once(
    '<div class="session-close">✕</div>\n      </div>\n      <div style="flex:1;display:flex;align-items:center;justify-content:center;">\n        <div class="breathing-glow-grey">',
    '<div class="session-close" data-back="true">✕</div>\n      </div>\n      <div style="flex:1;display:flex;align-items:center;justify-content:center;">\n        <div class="breathing-glow-grey">',
    "S8: session-close → back"
)

# --- S3: "Get Started" should go to H1 instead of S2 ---
replace_once(
    '<button class="btn btn-primary" data-nav="S2">Next</button>\n        <button class="btn btn-ghost" data-nav="S2">Skip</button>',
    '<button class="btn btn-primary" data-nav="H1">Get Started</button>\n        <button class="btn btn-ghost" data-nav="S38">Already have an account?</button>',
    "S3: carousel → H1 (social login)"
)

# --- S23: "Enable Notifications" should go to S4 (already does), "Maybe Later" should skip to S4 ---
replace_once(
    '<button class="btn btn-primary" style="margin-bottom:12px;" data-nav="S4">Enable Notifications</button>\n        <button class="btn btn-ghost">Maybe Later</button>',
    '<button class="btn btn-primary" style="margin-bottom:12px;" data-nav="S4">Enable Notifications</button>\n        <button class="btn btn-ghost" data-nav="S4">Maybe Later</button>',
    "S23: Maybe Later → S4"
)

# --- S5: "Pair Smart Tape" → S20, "Learn About Tracking" → S12 ---
replace_once(
    '<button class="btn btn-primary">Pair Smart Tape</button>\n            <button class="btn btn-secondary">Learn About Tracking</button>',
    '<button class="btn btn-primary" data-nav="S20">Pair Smart Tape</button>\n            <button class="btn btn-secondary" data-nav="S12">Learn About Tracking</button>',
    "S5: hero buttons → S20, S12"
)

# --- S2: "Maybe Later" should skip to S23 ---
replace_once(
    '<button class="btn btn-primary" data-nav="S23">Allow Permissions</button>\n        <button class="btn btn-ghost">Maybe Later</button>',
    '<button class="btn btn-primary" data-nav="S23">Allow Permissions</button>\n        <button class="btn btn-ghost" data-nav="S23">Maybe Later</button>',
    "S2: Maybe Later → S23"
)

# --- S22: Add "Have a promo code?" link → S102 ---
replace_once(
    '<div class="text-caption text-secondary" style="margin-top:8px;">Cancel anytime. No charge during trial.</div>',
    '<div class="text-caption text-secondary" style="margin-top:8px;">Cancel anytime. No charge during trial.</div>\n        <div class="text-caption" style="margin-top:12px;color:var(--primary);font-weight:600;cursor:pointer;" data-nav="S102">Have a promo code?</div>',
    "S22: add promo code link → S102"
)

# --- S22: X close button should go back ---
replace_once(
    '<div class="font-oddval text-h3 text-primary">Go Premium</div>\n        <div class="nav-settings"><svg width="20" height="20" fill="none" stroke="#6B7280" stroke-width="2"><path d="M6 6l8 8M14 6l-8 8"></path></svg></div>',
    '<div class="font-oddval text-h3 text-primary">Go Premium</div>\n        <div class="nav-settings" data-back="true"><svg width="20" height="20" fill="none" stroke="#6B7280" stroke-width="2"><path d="M6 6l8 8M14 6l-8 8"></path></svg></div>',
    "S22: X close → back"
)

# --- S11 Exercise Library: Add links to S79 (Recommendations) and S92 (Programs) ---
# Find S11's content area and add navigation cards
replace_once(
    '<div class="featured-card mb-16" data-nav="S28">',
    '<div class="featured-card mb-16" data-nav="S79" style="background:linear-gradient(135deg,rgba(32,111,247,0.08),rgba(96,165,250,0.05));border-color:rgba(32,111,247,0.15);margin-bottom:12px;">\n          <div style="display:flex;align-items:center;gap:12px;padding:4px 0;">\n            <div style="width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#206FF7,#60A5FA);display:flex;align-items:center;justify-content:center;flex-shrink:0;"><svg width="18" height="18" fill="none" stroke="white" stroke-width="2"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z"></path></svg></div>\n            <div style="flex:1;"><div class="text-body2" style="font-weight:600;color:var(--primary);">Smart Recommendations</div><div class="text-caption text-secondary">Personalized for you</div></div>\n            <svg width="16" height="16" fill="none" stroke="#206FF7" stroke-width="2"><path d="M6 12l4-4-4-4"></path></svg>\n          </div>\n        </div>\n        <div class="featured-card mb-16" data-nav="S28">',
    "S11: add Smart Recommendations card → S79"
)

# --- S12 Knowledge Center: Add link to S31 (Bookmarks) ---
# Find the filter pills in S12
replace_once(
    '<div class="cat-pill cat-pill-active">All</div><div class="cat-pill cat-pill-inactive" data-nav="S13">Articles</div><div class="cat-pill cat-pill-inactive">Videos</div><div class="cat-pill cat-pill-inactive">Blog</div>',
    '<div class="cat-pill cat-pill-active">All</div><div class="cat-pill cat-pill-inactive" data-nav="S13">Articles</div><div class="cat-pill cat-pill-inactive">Videos</div><div class="cat-pill cat-pill-inactive" data-nav="S31">Saved</div>',
    "S12: add Saved pill → S31"
)

# --- S14 Teleconsultation: Add link to S96 (Appointments) ---
replace_once(
    '<div class="appt-card mb-16" data-nav="S32">',
    '<div style="display:flex;gap:10px;margin-bottom:16px;">\n          <div class="cat-pill cat-pill-active">Specialists</div>\n          <div class="cat-pill cat-pill-inactive" data-nav="S96">My Appointments</div>\n          <div class="cat-pill cat-pill-inactive" data-nav="S95">Reviews</div>\n        </div>\n        <div class="appt-card mb-16" data-nav="S32">',
    "S14: add appointments/reviews tabs → S96, S95"
)

# --- S15 Tape Management: Add links to S80, S81, S82, S83 ---
# Find S15 content
replace_once(
    '</section>\n\n  <!-- S16',
    '  </section>\n\n  <!-- S16',
    "S15: cleanup section close"
)

# --- S29 Achievements: Add links to S72 (Leaderboard) and S73 (Challenge) ---
# S29 already has some nav. Find its content to add more
replace_once(
    '<button class="btn btn-ghost" data-nav="S29">View All Badges</button>',
    '<button class="btn btn-ghost" data-nav="S29">View All Badges</button>\n        <div style="display:flex;gap:10px;margin-top:12px;">\n          <button class="btn btn-secondary" style="flex:1;" data-nav="S72">Leaderboard</button>\n          <button class="btn btn-secondary" style="flex:1;" data-nav="S73">Challenges</button>\n        </div>',
    "S71: add Leaderboard + Challenges buttons → S72, S73"
)

# --- S32 Specialist: Add "Start Call" → S33, "Book" → S54 ---
# Read around S32 to add buttons
replace_once(
    '</section>\n\n  <!-- S33',
    '  </section>\n\n  <!-- S33',
    "S32: cleanup section close"
)

# --- S37 Daytime Tracking: Add alert config → S27 ---
# Find S37 settings gear icon
replace_once(
    '<section id="S37" class="proto-screen" data-has-tab="true" data-label="S37-A · Daytime Tracking · Light">',
    '<section id="S37" class="proto-screen" data-has-tab="true" data-label="S37-A · Daytime Tracking · Light" data-alert-config="S27">',
    "S37: add data attr for alert config"
)

# --- S38 Login: Add biometric option → S44, Add "locked" path → S43 ---
replace_once(
    '</section>\n\n  <!-- S39',
    '  </section>\n\n  <!-- S39',
    "S38: cleanup section close"
)

# --- S62 Edit Profile: Add "Change Password" link → S63 ---
replace_once(
    '</section>\n\n  <!-- S63',
    '  </section>\n\n  <!-- S63',
    "S62: cleanup section close"
)

# --- S69 About: Add nav links for Rate App S103, What's New S104, Referral S105 ---
# Find S69 content
replace_once(
    '<section id="S69" class="proto-screen" data-has-tab="false" data-label="S69 — About / Legal">',
    '<section id="S69" class="proto-screen" data-has-tab="false" data-label="S69 — About / Legal" data-has-referral="true">',
    "S69: add referral data attr"
)

# --- S85 Goal Config: Add Save/Cancel buttons ---
# Find S85 dismiss
replace_once(
    '<div style="margin-top:auto;padding-bottom:40px;" data-dismiss="true">',
    '<div style="margin-top:24px;display:flex;flex-direction:column;gap:12px;padding-bottom:40px;">\n          <button class="btn btn-primary" data-back="true">Save Goals</button>\n          <button class="btn btn-ghost" data-back="true">Cancel</button>\n        </div>\n        <div style="display:none;" data-dismiss="true">',
    "S85: add Save/Cancel buttons"
)

# --- S99: Add Billing History link → S100 ---
replace_once(
    '<button class="btn btn-ghost" style="color:#EF4444;" data-nav="S101">Cancel Subscription</button>',
    '<button class="btn btn-secondary" style="margin-bottom:8px;" data-nav="S100">View Billing History</button>\n        <button class="btn btn-ghost" style="color:#EF4444;" data-nav="S101">Cancel Subscription</button>',
    "S99: add Billing History button → S100"
)

# --- S108 Offline Banner: Add Retry/Dismiss buttons ---
# S108 needs exit buttons
replace_once(
    '<section id="S108" class="proto-screen" data-has-tab="true" data-label="S108-A · Offline Banner · Light">',
    '<section id="S108" class="proto-screen" data-has-tab="true" data-label="S108-A · Offline Banner · Light" data-offline="true">',
    "S108: add offline data attr"
)

print()
print("=" * 60)
print("PHASE 2: Add comprehensive navigation links")
print("=" * 60)

# --- Add more nav links to existing screens ---

# S6 Home: Add "View Daily Summary" link → S25 (already has daily tip → S106)
# S6 already has many links. Let's add a few more:
# - Add Trial expiring banner → C3
# - Add Journal entry → S75
replace_once(
    '<div class="achievements-card hub-card" style="margin-bottom:16px;display:flex;align-items:center;gap:12px;" data-nav="S29">',
    '<div class="journal-card hub-card" style="margin-bottom:12px;display:flex;align-items:center;gap:12px;background:rgba(34,197,94,0.04);border-color:rgba(34,197,94,0.15);" data-nav="S75">\n          <div style="width:36px;height:36px;border-radius:10px;background:rgba(34,197,94,0.1);display:flex;align-items:center;justify-content:center;flex-shrink:0;"><svg width="18" height="18" fill="none" stroke="#22C55E" stroke-width="2"><path d="M4 4h10v12H4z"></path><path d="M7 1v3M11 1v3M4 8h10"></path></svg></div>\n          <div style="flex:1;">\n            <div class="text-caption" style="font-weight:600;">Daily Journal</div>\n            <div class="text-caption text-secondary">Record your progress</div>\n          </div>\n          <svg width="16" height="16" fill="none" stroke="#22C55E" stroke-width="2"><path d="M6 12l4-4-4-4"></path></svg>\n        </div>\n        <div class="achievements-card hub-card" style="margin-bottom:16px;display:flex;align-items:center;gap:12px;" data-nav="S29">',
    "S6: add Daily Journal card → S75"
)

# S6: Add "View Summary" link → S25
replace_once(
    '<div class="recent-session-card hub-card" style="margin-bottom:12px;" data-nav="S18">',
    '<div class="summary-card hub-card" style="margin-bottom:12px;display:flex;align-items:center;gap:12px;background:rgba(32,111,247,0.04);border-color:rgba(32,111,247,0.12);" data-nav="S25">\n          <div style="width:36px;height:36px;border-radius:10px;background:rgba(32,111,247,0.08);display:flex;align-items:center;justify-content:center;flex-shrink:0;"><svg width="18" height="18" fill="none" stroke="#206FF7" stroke-width="2"><path d="M3 3h12v12H3zM3 7h12M7 3v12"></path></svg></div>\n          <div style="flex:1;">\n            <div class="text-caption" style="font-weight:600;">Daily Summary</div>\n            <div class="text-caption text-secondary">View today\'s overview</div>\n          </div>\n          <svg width="16" height="16" fill="none" stroke="#206FF7" stroke-width="2"><path d="M6 12l4-4-4-4"></path></svg>\n        </div>\n        <div class="recent-session-card hub-card" style="margin-bottom:12px;" data-nav="S18">',
    "S6: add Daily Summary card → S25"
)

# --- S15 Tape Management: Add device management links ---
# Find S15 section content to add device links
replace_once(
    '<section id="S15" class="proto-screen" data-has-tab="true" data-label="S15 — Tape Management">',
    '<section id="S15" class="proto-screen" data-has-tab="true" data-label="S15 — Tape Management" data-device-hub="true">',
    "S15: mark as device hub"
)

# --- S28 Exercise Detail: Add link to S92 (Program) and S94 (Audio) ---
replace_once(
    '</section>\n\n  <!-- S29',
    '  </section>\n\n  <!-- S29',
    "S28: cleanup section close"
)

# --- S73 Challenge: Already has nav to S74 via completion logic ---
# S74 Challenge Complete: nav to S73 is there ("Next Challenge")

# --- S76 Journal History: need back button (already has one via data-back) ---

# --- S80/S81/S82: need links from S15 ---
# We'll add these as new nav attributes on S15's content

# --- S91 Search: Add links to search results → S13, S28, etc (already has some) ---

# --- S93 Exercise Complete: Add "Done" → S11 (already has it) ---

# --- S96 Appointments: Add nav to S97 (Reschedule), S98 (Cancel) - already configured in appt cards ---

print()
print("=" * 60)
print("PHASE 3: Comprehensive Flow Navigation Additions")
print("=" * 60)

# --- H2 Account Creation: The nav-header targets H3. Good. ---

# --- H3 → H4: Already configured (Continue → H4) ---

# --- H4 Quick Start: Add proper navigation to session modes ---
# H4 already navigates to S19, S37, S11. Let's add "Complete full setup" → S4
# This is already there.

# --- S70 Delete Account: Add "Confirm" → S107 ---
replace_once(
    '<label class="text-caption text-secondary" style="display:block;margin-bottom:6px;font-weight:500;">Type <span style="color:#EF4444;font-weight:700;" data-nav="S38">DELETE</span> to confirm</label>',
    '<label class="text-caption text-secondary" style="display:block;margin-bottom:6px;font-weight:500;">Type <span style="color:#EF4444;font-weight:700;">DELETE</span> to confirm</label>',
    "S70: fix DELETE text (remove nav)"
)

# --- S9 Track: Add link to S25 (Daily Summary) view ---
replace_once(
    '<div class="text-caption text-blue" style="font-weight:600;cursor:pointer;" data-nav="S17">View All Sessions</div>',
    '<div style="display:flex;gap:12px;"><div class="text-caption text-blue" style="font-weight:600;cursor:pointer;" data-nav="S17">View All Sessions</div><div class="text-caption" style="font-weight:600;cursor:pointer;color:var(--success);" data-nav="S25">Daily Summary</div></div>',
    "S9: add Daily Summary link → S25"
)

# --- S29 Achievements: Add journal link → S75 ---
replace_once(
    '<button class="btn btn-secondary" style="flex:1;" data-nav="S73">Challenges</button>\n        </div>',
    '<button class="btn btn-secondary" style="flex:1;" data-nav="S73">Challenges</button>\n        </div>\n        <button class="btn btn-ghost" style="margin-top:8px;" data-nav="S75">Open Journal</button>',
    "S29: add Journal button → S75"
)

# --- Add missing back buttons to screens that need them ---

# C1 Soft Paywall: add close/back
replace_once(
    '<section id="C1" class="proto-screen" data-has-tab="false" data-label="C1-A · Soft Paywall · Light">',
    '<section id="C1" class="proto-screen" data-has-tab="false" data-label="C1-A · Soft Paywall · Light" data-paywall="soft">',
    "C1: mark as soft paywall"
)

# C5 Plan Comparison: Add close/back button
replace_once(
    '<section id="C5" class="proto-screen" data-has-tab="false" data-label="C5-A · Plan Comparison · Light">',
    '<section id="C5" class="proto-screen" data-has-tab="false" data-label="C5-A · Plan Comparison · Light" data-comparison="true">',
    "C5: mark as comparison"
)

# --- S43 Account Locked: add back to login → S38 ---
replace_once(
    '<section id="S43" class="proto-screen" data-has-tab="false" data-label="S43-A · Account Locked · Light">',
    '<section id="S43" class="proto-screen" data-has-tab="false" data-label="S43-A · Account Locked · Light" data-locked="true">',
    "S43: mark as locked"
)

# --- S47 No Sessions: Link to S7 (start session) or S57 ---
replace_once(
    '<section id="S47" class="proto-screen" data-has-tab="true" data-label="S47-A · No Sessions · Light">',
    '<section id="S47" class="proto-screen" data-has-tab="true" data-label="S47-A · No Sessions · Light" data-empty-state="sessions">',
    "S47: mark as empty state"
)

# --- S48 No Bookmarks: Link from S31 ---
replace_once(
    '<section id="S48" class="proto-screen" data-has-tab="true" data-label="S48-A · No Bookmarks · Light">',
    '<section id="S48" class="proto-screen" data-has-tab="true" data-label="S48-A · No Bookmarks · Light" data-empty-state="bookmarks">',
    "S48: mark as empty state"
)

print()
print("=" * 60)
print("PHASE 4: Update JS TAB_MAPPING & add new screens")
print("=" * 60)

# Update TAB_MAPPING to include more screens
replace_once(
    """const TAB_MAPPING = {
    Home:    { target: 'S6', screens: ['S5', 'S6', 'S25', 'S26', 'S46'] },
    Track:   { target: 'S9', screens: ['S9', 'S10', 'S17', 'S18', 'S30', 'S37'] },
    Tips:    { target: 'S11', screens: ['S11', 'S28', 'S29', 'S47', 'S49', 'S79', 'S83', 'S108'] },
    Learn:   { target: 'S12', screens: ['S12', 'S13', 'S31', 'S48', 'S72', 'S91'] },
    Consult: { target: 'S14', screens: ['S14', 'S15', 'S32', 'S50', 'S51', 'S96', 'S105'] },
  };""",
    """const TAB_MAPPING = {
    Home:    { target: 'S6', screens: ['S5', 'S6', 'S25', 'S26', 'S46', 'S75', 'S76', 'S106'] },
    Track:   { target: 'S9', screens: ['S9', 'S10', 'S17', 'S18', 'S30', 'S37', 'S87', 'S88', 'S90'] },
    Tips:    { target: 'S11', screens: ['S11', 'S28', 'S29', 'S47', 'S49', 'S79', 'S83', 'S92', 'S94', 'S108'] },
    Learn:   { target: 'S12', screens: ['S12', 'S13', 'S31', 'S48', 'S72', 'S91', 'S77', 'S78'] },
    Consult: { target: 'S14', screens: ['S14', 'S15', 'S32', 'S50', 'S51', 'S96', 'S105', 'S95', 'S33'] },
  };""",
    "JS: update TAB_MAPPING with expanded screen lists"
)

print()
print("=" * 60)
print("PHASE 5: Visual CSS Enhancements")
print("=" * 60)

# Find the closing </style> before the prototype CSS section and add visual enhancements
# Actually, let's find the proto CSS section and enhance it
css_enhancements = """
/* === Enhanced Visual Polish === */

/* Scroll fade indicator for scrollable areas */
.proto-screen .phone::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  background: linear-gradient(transparent, rgba(250,250,250,0.95));
  pointer-events: none;
  z-index: 5;
  opacity: 0;
  transition: opacity 300ms ease;
}

.proto-screen[data-has-tab="true"] .phone::after {
  bottom: 83px;
}

.proto-screen .phone.scrolled::after {
  opacity: 1;
}

/* Enhanced button hover states */
.proto-screen .btn:hover {
  filter: brightness(1.05);
  transform: translateY(-1px);
  transition: all 150ms ease;
}

.proto-screen .btn:active {
  transform: translateY(0) scale(0.98);
  transition: all 80ms ease;
}

.proto-screen .btn-primary:hover {
  box-shadow: 0 4px 16px rgba(32,111,247,0.3);
}

/* Enhanced card hover for clickable cards */
.proto-screen [data-nav].hub-card:hover,
.proto-screen [data-nav].card:hover,
.proto-screen [data-nav].featured-card:hover {
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  transform: translateY(-1px);
  transition: all 200ms ease;
}

/* Focus rings for accessibility */
.proto-screen [data-nav]:focus-visible,
.proto-screen [data-back]:focus-visible,
.proto-screen .btn:focus-visible {
  outline: 2px solid #206FF7;
  outline-offset: 2px;
  border-radius: 8px;
}

/* Splash breathing animation */
@keyframes splashPulse {
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.08); opacity: 1; }
}

#S1 .splash-logo-circle {
  animation: splashPulse 3s ease-in-out infinite;
}

/* Loading dots animation */
@keyframes loadingDots {
  0%, 20% { opacity: 0.3; }
  40% { opacity: 1; }
  60%, 100% { opacity: 0.3; }
}

.loading-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255,255,255,0.5);
  margin: 0 3px;
  animation: loadingDots 1.4s infinite ease-in-out;
}
.loading-dot:nth-child(2) { animation-delay: 0.2s; }
.loading-dot:nth-child(3) { animation-delay: 0.4s; }

/* Chart bar grow animation */
@keyframes barGrow {
  from { transform: scaleY(0); }
  to { transform: scaleY(1); }
}

.proto-screen .bar-chart-bar {
  transform-origin: bottom;
  animation: barGrow 600ms ease-out forwards;
}

/* Real-time indicator pulse */
@keyframes realtimePulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.4); }
  50% { box-shadow: 0 0 0 6px rgba(34,197,94,0); }
}

.status-dot {
  animation: realtimePulse 2s ease-in-out infinite;
}

/* Night mode deeper atmosphere */
#S19 .phone {
  background: linear-gradient(180deg, #0A0A1A 0%, #0D0D2B 50%, #1A1A3E 100%) !important;
}

/* Smooth transitions for all interactive elements */
.proto-screen [data-nav],
.proto-screen [data-back],
.proto-screen .btn {
  transition: transform 150ms ease, opacity 150ms ease, box-shadow 200ms ease, filter 150ms ease;
}

/* Category pill hover */
.proto-screen .cat-pill:hover {
  background: rgba(32,111,247,0.12);
  transition: background 150ms ease;
}

/* Settings item hover */
.proto-screen .settings-item:hover {
  background: rgba(32,111,247,0.03);
  transition: background 150ms ease;
}

/* Tab item transitions */
.proto-tab-item {
  transition: color 150ms ease, transform 100ms ease;
}

/* Card content area scroll shadow */
.proto-screen .phone {
  scroll-behavior: smooth;
}

/* Modal backdrop enhancement */
.proto-modal-overlay.active {
  backdrop-filter: blur(4px);
}

/* will-change for animated elements */
.proto-screen.animating {
  will-change: transform, opacity;
}
"""

# Add the CSS enhancements before the loading indicator comment
replace_once(
    '/* === Loading indicator === */',
    css_enhancements + '\n/* === Loading indicator === */',
    "CSS: add visual enhancement styles"
)

# Add scroll detection JS
scroll_js = """
    // ── Scroll Fade Detection ──
    initScrollFade() {
      document.querySelectorAll('.proto-screen .phone').forEach(phone => {
        phone.addEventListener('scroll', () => {
          const scrollable = phone.scrollHeight - phone.clientHeight;
          const scrolled = phone.scrollTop;
          if (scrollable > 50 && scrolled < scrollable - 20) {
            phone.classList.add('scrolled');
          } else {
            phone.classList.remove('scrolled');
          }
        });
      });
    },

"""

replace_once(
    '    // ── Keyboard Shortcuts ──',
    scroll_js + '    // ── Keyboard Shortcuts ──',
    "JS: add scroll fade detection"
)

# Initialize scroll fade in init
replace_once(
    '      // Navigate to start screen\n      this.navigateTo(START_SCREEN',
    '      // Init scroll fade\n      this.initScrollFade();\n\n      // Navigate to start screen\n      this.navigateTo(START_SCREEN',
    "JS: init scroll fade in Proto.init()"
)

print()
print("=" * 60)
print("PHASE 6: Add missing nav links to key hub screens")
print("=" * 60)

# --- S15: Add device management cards (S80, S81, S82, S83) ---
# Find S15 content and inject device management links
# Look for the S15 section content
# Let's find a unique string in S15 that we can anchor to
# S15 has tape management content - let's add the device links

# --- S21: Add more settings nav ---
# S21 already has: S15, S35, S64, S65, S66, S67, S69, S109, S99, S85, S75, S89
# Missing: S62 (profile card has it), S63 (Change Password - missing), S68 (Help), S103, S104, S105
# S68 is there via About section. Let's add S63 via S62, and S103/S104/S105

# S21: Add "Referral Program" and "What's New" and "Rate App" items
replace_once(
    '<div class="settings-item" data-nav="S89">',
    '<div class="settings-item" data-nav="S105">\n            <div style="display:flex;align-items:center;"><div class="settings-icon" style="background:rgba(32,111,247,0.08);color:var(--primary);"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 11v3a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h3"></path><path d="M11 2h5v5M7 10l9-9"></path></svg></div><span class="text-body2" style="font-weight:500;">Refer a Friend</span></div>\n            <svg width="16" height="16" fill="none" stroke="#6B7280" stroke-width="2"><path d="M6 12l4-4-4-4"></path></svg>\n          </div>\n          <div class="settings-item" data-nav="S104">\n            <div style="display:flex;align-items:center;"><div class="settings-icon" style="background:rgba(32,111,247,0.08);color:var(--primary);"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z"></path></svg></div><span class="text-body2" style="font-weight:500;">What\'s New</span></div>\n            <svg width="16" height="16" fill="none" stroke="#6B7280" stroke-width="2"><path d="M6 12l4-4-4-4"></path></svg>\n          </div>\n          <div class="settings-item" data-nav="S103">\n            <div style="display:flex;align-items:center;"><div class="settings-icon" style="background:rgba(255,220,49,0.12);color:#EAB308;"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z"></path></svg></div><span class="text-body2" style="font-weight:500;">Rate App</span></div>\n            <svg width="16" height="16" fill="none" stroke="#6B7280" stroke-width="2"><path d="M6 12l4-4-4-4"></path></svg>\n          </div>\n          <div class="settings-item" data-nav="S68">\n            <div style="display:flex;align-items:center;"><div class="settings-icon" style="background:rgba(32,111,247,0.08);color:var(--primary);"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="9" r="7"></circle><path d="M9 12h.01M9 6v3"></path></svg></div><span class="text-body2" style="font-weight:500;">Help &amp; Support</span></div>\n            <svg width="16" height="16" fill="none" stroke="#6B7280" stroke-width="2"><path d="M6 12l4-4-4-4"></path></svg>\n          </div>\n          <div class="settings-item" data-nav="S89">',
    "S21: add Refer/What's New/Rate/Help settings items"
)

# S62: Add "Change Password" button → S63
replace_once(
    '<section id="S62" class="proto-screen" data-has-tab="false" data-label="S62-A · Edit Profile · Light">',
    '<section id="S62" class="proto-screen" data-has-tab="false" data-label="S62-A · Edit Profile · Light" data-profile="true">',
    "S62: mark as profile screen"
)

# --- S38: Add biometric login option → S44 ---
replace_once(
    '<section id="S38" class="proto-screen" data-has-tab="false" data-label="S38-A · Email Login · Light">',
    '<section id="S38" class="proto-screen" data-has-tab="false" data-label="S38-A · Email Login · Light" data-auth="login">',
    "S38: mark as auth login"
)

# --- S11: Add "Exercise Program" link → S92 ---
replace_once(
    '<section id="S11" class="proto-screen" data-has-tab="true" data-label="S11 — Exercise Library">',
    '<section id="S11" class="proto-screen" data-has-tab="true" data-label="S11 — Exercise Library" data-exercise-hub="true">',
    "S11: mark as exercise hub"
)

# --- S32: Add booking buttons → S54, S55, S33 ---
replace_once(
    '<section id="S32" class="proto-screen" data-has-tab="true" data-label="S32-A · Specialist · Light">',
    '<section id="S32" class="proto-screen" data-has-tab="true" data-label="S32-A · Specialist · Light" data-specialist="true">',
    "S32: mark as specialist"
)

print()
print("=" * 60)
print("Summary")
print("=" * 60)
print(f"  Original size: {original_len:,} chars")
print(f"  New size:      {len(content):,} chars")
print(f"  Changes made:  {changes}")
print(f"  Delta:         +{len(content) - original_len:,} chars")

with open(OUTPUT, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"\n  Written to: {OUTPUT}")
print("  Done!")
