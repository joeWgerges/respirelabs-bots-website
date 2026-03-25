// RespireLabs Mobile — Figma Prototype Connections Plugin
//
// HOW TO USE:
// 1. Open your RespireLabs Figma file
// 2. Go to Plugins → Development → New Plugin...
// 3. Choose "Figma design" → click "Save and open folder"
// 4. Replace the contents of code.ts with this file
// 5. Back in Figma: Plugins → Development → RespireLabs Prototype → Run
//
// This will automatically create all prototype connections between screens.

// ============================================================
// FRAME ID MAPPING — Variant A (primary prototype chain)
// ============================================================
// If your node IDs differ, update these values.
// Find IDs by right-clicking a frame → "Copy link" → extract node-id from URL

const SCREENS: Record<string, string> = {
  // Original screens
  'S1':  '0:19',    // Splash Screen
  'S2':  '0:60',    // Permissions
  'S3':  '0:243',   // Value Prop Carousel
  'S4':  '0:358',   // Goal Selection
  'S5':  '3:18',    // Home Empty State
  'S6':  '3:274',   // Home Active State
  'S7':  '4:18',    // Session Playing
  'S8':  '4:156',   // Session Paused
  'S9':  '5:18',    // Breathing Analysis
  'S10': '5:339',   // Sleep Trends
  'S11': '6:18',    // Exercise Library
  'S12': '6:413',   // Knowledge Center
  'S13': '6:710',   // Article Detail
  'S14': '7:18',    // Teleconsultation
  'S15': '7:497',   // Tape Management

  // Tier 1 — MVP Must-Have
  'S16': '11:18',   // Session Complete / Summary
  'S17': '11:258',  // Session History List
  'S18': '11:699',  // Session Detail View
  'S19': '14:18',   // Nighttime Sleep Mode
  'S20': '15:18',   // BLE Device Pairing
  'S21': '12:18',   // Settings / Profile
  'S22': '12:366',  // Paywall / Subscription
  'S23': '13:18',   // Notification Permission
  'S24': '13:183',  // Personalization Questionnaire
  'S25': '13:367',  // Daily Summary
  'S26': '13:796',  // Tutorial Overlay
  'S27': '14:275',  // Real-Time Alert Config
  'S37': '14:587',  // Daytime Tracking Mode

  // Tier 2 — Should-Have
  'S28': '16:18',   // Exercise Detail / Timer
  'S29': '16:366',  // Streak & Achievements
  'S30': '17:18',   // Monthly Trends
  'S31': '17:476',  // Content Bookmarks
  'S32': '18:18',   // Specialist Detail
  'S34': '19:18',   // Privacy & Consent
  'S35': '19:381',  // Health Integrations
  'S36': '19:487',  // Export / Share Report

  // Stakeholder Bonus
  'C1':  '20:18',   // Soft Paywall (Inline)
  'C4':  '20:278',  // Subscription Success
  'D1':  '21:18',   // Notification Inbox
  'H1':  '22:18',   // Social Login
};

// ============================================================
// TRANSITION HELPERS
// ============================================================

type TransitionType = 'SLIDE_IN' | 'SLIDE_OUT' | 'DISSOLVE' | 'SMART_ANIMATE';
type Direction = 'LEFT' | 'RIGHT' | 'TOP' | 'BOTTOM';

function slideIn(direction: Direction, duration = 0.3): Transition {
  return {
    type: 'SLIDE_IN',
    direction,
    matchLayers: false,
    duration,
    easing: { type: 'EASE_OUT' },
  };
}

function slideOut(direction: Direction, duration = 0.3): Transition {
  return {
    type: 'SLIDE_OUT',
    direction,
    matchLayers: false,
    duration,
    easing: { type: 'EASE_IN' },
  };
}

function dissolve(duration = 0.3): Transition {
  return {
    type: 'DISSOLVE',
    duration,
    easing: { type: 'EASE_IN_AND_OUT' },
  };
}

// ============================================================
// CONNECTION BUILDER
// ============================================================

interface ProtoLink {
  from: string;       // Screen key (e.g. 'S1')
  to: string;         // Screen key (e.g. 'S3')
  transition: Transition;
  trigger?: 'ON_CLICK' | 'AFTER_TIMEOUT';
  delay?: number;     // For AFTER_TIMEOUT, in seconds
}

// All prototype connections organized by flow
const CONNECTIONS: ProtoLink[] = [
  // ── Flow 1: Onboarding ──────────────────────────────
  { from: 'S1',  to: 'S3',  transition: dissolve(0.6),           trigger: 'AFTER_TIMEOUT', delay: 2 },
  { from: 'S3',  to: 'S2',  transition: slideIn('LEFT') },
  { from: 'S2',  to: 'S23', transition: slideIn('LEFT') },
  { from: 'S23', to: 'S4',  transition: slideIn('LEFT') },
  { from: 'S4',  to: 'S24', transition: slideIn('LEFT') },
  { from: 'S24', to: 'S26', transition: slideIn('LEFT') },
  { from: 'S26', to: 'S5',  transition: dissolve(0.3) },

  // ── Flow 2: Device Pairing ──────────────────────────
  { from: 'S5',  to: 'S20', transition: slideIn('BOTTOM', 0.4) },
  { from: 'S20', to: 'S5',  transition: slideOut('BOTTOM') },

  // ── Flow 3: Night Session ───────────────────────────
  { from: 'S6',  to: 'S19', transition: slideIn('BOTTOM', 0.4) },
  { from: 'S19', to: 'S16', transition: dissolve(0.3) },
  { from: 'S16', to: 'S6',  transition: slideOut('BOTTOM') },

  // ── Flow 4: Daytime Tracking ────────────────────────
  // Note: S6→S37 conflicts with S6→S19 above.
  // In practice, different buttons on S6 would link to different screens.
  // Since whole-frame tap can only have one destination,
  // S6→S19 (night) is set above. Add S37 link manually to "Start Tracking" button.
  { from: 'S37', to: 'S27', transition: slideIn('LEFT') },
  { from: 'S27', to: 'S37', transition: slideOut('LEFT') },
  { from: 'S37', to: 'S16', transition: dissolve(0.3) },  // This creates a second reaction on S37

  // ── Flow 5: Breathing Exercise ──────────────────────
  { from: 'S11', to: 'S28', transition: slideIn('LEFT') },
  { from: 'S28', to: 'S7',  transition: slideIn('BOTTOM', 0.4) },
  { from: 'S7',  to: 'S8',  transition: dissolve(0.2) },
  { from: 'S8',  to: 'S7',  transition: dissolve(0.2) },
  { from: 'S8',  to: 'S16', transition: dissolve(0.3) },  // "End Session"

  // ── Flow 6: Analytics Deep Dive ─────────────────────
  { from: 'S9',  to: 'S17', transition: slideIn('LEFT') },
  { from: 'S17', to: 'S18', transition: slideIn('LEFT') },
  { from: 'S18', to: 'S17', transition: slideOut('LEFT') },
  { from: 'S17', to: 'S9',  transition: slideOut('LEFT') },
  { from: 'S9',  to: 'S10', transition: slideIn('LEFT') },  // "Sleep" tab
  { from: 'S10', to: 'S30', transition: slideIn('LEFT') },
  { from: 'S30', to: 'S10', transition: slideOut('LEFT') },
  { from: 'S10', to: 'S29', transition: slideIn('LEFT') },
  { from: 'S29', to: 'S10', transition: slideOut('LEFT') },

  // ── Flow 7: Knowledge Center ────────────────────────
  { from: 'S12', to: 'S13', transition: slideIn('LEFT') },
  { from: 'S13', to: 'S12', transition: slideOut('LEFT') },
  { from: 'S12', to: 'S31', transition: slideIn('LEFT') },
  { from: 'S31', to: 'S12', transition: slideOut('LEFT') },

  // ── Flow 8: Teleconsultation ────────────────────────
  { from: 'S14', to: 'S32', transition: slideIn('LEFT') },
  { from: 'S32', to: 'S14', transition: slideOut('LEFT') },

  // ── Flow 9: Settings ───────────────────────────────
  { from: 'S6',  to: 'S21', transition: slideIn('LEFT') },  // gear icon
  { from: 'S21', to: 'S15', transition: slideIn('LEFT') },   // Smart Tape
  { from: 'S15', to: 'S21', transition: slideOut('LEFT') },
  { from: 'S21', to: 'S35', transition: slideIn('LEFT') },   // Health
  { from: 'S35', to: 'S21', transition: slideOut('LEFT') },
  { from: 'S21', to: 'S34', transition: slideIn('LEFT') },   // Privacy
  { from: 'S34', to: 'S36', transition: slideIn('LEFT') },   // Export
  { from: 'S36', to: 'S34', transition: slideOut('LEFT') },
  { from: 'S34', to: 'S21', transition: slideOut('LEFT') },
  { from: 'S21', to: 'S22', transition: slideIn('LEFT') },   // Subscription
  { from: 'S22', to: 'S21', transition: slideOut('LEFT') },
  { from: 'S21', to: 'S6',  transition: slideOut('LEFT') },  // back

  // ── Flow 10: Monetization ──────────────────────────
  { from: 'C1',  to: 'S22', transition: slideIn('BOTTOM', 0.4) },
  { from: 'S22', to: 'C4',  transition: dissolve(0.3) },    // "Start Trial"
  { from: 'C4',  to: 'S6',  transition: slideOut('BOTTOM') },

  // ── Tab Bar Navigation ─────────────────────────────
  // These are applied to all screens that have a tab bar.
  // Using a special marker to handle these separately.
];

// Screens that have a tab bar
const TAB_BAR_SCREENS = [
  'S5', 'S6', 'S9', 'S10', 'S11', 'S12', 'S13', 'S14', 'S15',
  'S17', 'S21', 'S25', 'S28', 'S29', 'S30', 'S31', 'S32',
  'S34', 'S35', 'S36',
];

// Tab destinations
const TAB_DESTINATIONS: Record<string, string> = {
  'Home':    'S6',
  'Track':   'S9',
  'Tips':    'S11',
  'Learn':   'S12',
  'Consult': 'S14',
};

// ============================================================
// MAIN PLUGIN LOGIC
// ============================================================

async function main() {
  let successCount = 0;
  let errorCount = 0;
  let skippedCount = 0;

  console.log('🚀 RespireLabs Prototype Builder starting...');
  console.log(`📋 ${CONNECTIONS.length} flow connections to create`);
  console.log(`📋 ${TAB_BAR_SCREENS.length} screens × 5 tabs = ${TAB_BAR_SCREENS.length * 5} tab connections`);

  // ── Step 1: Create flow connections ──
  // Group connections by source frame to merge reactions
  const reactionsByFrame: Record<string, Reaction[]> = {};

  for (const conn of CONNECTIONS) {
    const fromId = SCREENS[conn.from];
    const toId = SCREENS[conn.to];

    if (!fromId || !toId) {
      console.warn(`⚠️ Skipping ${conn.from} → ${conn.to}: screen ID not found`);
      skippedCount++;
      continue;
    }

    const toNode = figma.getNodeById(toId);
    if (!toNode) {
      console.warn(`⚠️ Node not found for ${conn.to} (${toId})`);
      skippedCount++;
      continue;
    }

    const reaction: Reaction = {
      action: {
        type: 'NODE',
        destinationId: toId,
        navigation: 'NAVIGATE',
        transition: conn.transition,
        preserveScrollPosition: false,
      },
      trigger: conn.trigger === 'AFTER_TIMEOUT'
        ? { type: 'AFTER_TIMEOUT', timeout: conn.delay || 2 }
        : { type: 'ON_CLICK' },
    };

    if (!reactionsByFrame[fromId]) {
      reactionsByFrame[fromId] = [];
    }
    reactionsByFrame[fromId].push(reaction);
  }

  // Apply reactions to frames
  for (const [frameId, reactions] of Object.entries(reactionsByFrame)) {
    const node = figma.getNodeById(frameId);
    if (!node) {
      console.warn(`⚠️ Source frame not found: ${frameId}`);
      errorCount++;
      continue;
    }

    if ('reactions' in node) {
      // Merge with existing reactions (don't overwrite)
      const existing = (node as SceneNode & { reactions: Reaction[] }).reactions || [];
      (node as SceneNode & { reactions: Reaction[] }).reactions = [...existing, ...reactions];
      successCount += reactions.length;

      // Find screen name for logging
      const screenName = Object.entries(SCREENS).find(([_, id]) => id === frameId)?.[0] || frameId;
      console.log(`✅ ${screenName}: ${reactions.length} connection(s) added`);
    } else {
      console.warn(`⚠️ Frame ${frameId} doesn't support reactions`);
      errorCount++;
    }
  }

  // ── Step 2: Tab bar navigation ──
  // For tab bar connections, we try to find the tab bar area within each screen
  // Since frames from HTML capture have generic names, we apply tab navigation
  // as whole-frame reactions. In a real setup, you'd target specific tab elements.

  console.log('\n📱 Setting up tab bar navigation...');

  let tabSuccess = 0;
  for (const screenKey of TAB_BAR_SCREENS) {
    const screenId = SCREENS[screenKey];
    if (!screenId) continue;

    const screenNode = figma.getNodeById(screenId);
    if (!screenNode || !('reactions' in screenNode)) continue;

    // For each tab destination that ISN'T the current screen
    for (const [tabName, destKey] of Object.entries(TAB_DESTINATIONS)) {
      if (destKey === screenKey) continue; // Skip self-navigation

      const destId = SCREENS[destKey];
      if (!destId) continue;

      // Note: We can't add tab-specific reactions without finding the tab elements.
      // The tab bar reactions are noted but not added as whole-frame taps
      // since that would conflict with the flow connections.
      // Tab navigation should be added manually to the tab bar elements.
      tabSuccess++;
    }
  }

  console.log(`ℹ️  Tab bar: ${tabSuccess} connections noted (add manually to tab elements)`);

  // ── Summary ──
  console.log('\n' + '='.repeat(50));
  console.log(`✅ Successfully created: ${successCount} connections`);
  console.log(`⚠️ Skipped: ${skippedCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log('='.repeat(50));
  console.log('\n💡 Tips:');
  console.log('  1. Set Device to "iPhone 15 Pro" in Prototype settings');
  console.log('  2. Set Starting Frame to S1 Splash (0:19)');
  console.log('  3. Press Play ▶ to test the prototype');
  console.log('  4. Add tab bar links manually to individual tab elements');
  console.log('  5. For screens with multiple destinations (S6, S37, etc.),');
  console.log('     add additional links to specific buttons within those frames');

  figma.closePlugin('Prototype connections created! Press ▶ to test.');
}

main();
