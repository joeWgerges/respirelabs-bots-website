// RespireLabs Mobile — Figma Prototype Connections
//
// ╔══════════════════════════════════════════════════╗
// ║  HOW TO USE (takes ~2 minutes):                 ║
// ║                                                  ║
// ║  1. Open your RespireLabs Figma file             ║
// ║  2. Menu → Plugins → Development → New Plugin    ║
// ║  3. Name it "RespireLabs Prototype"              ║
// ║  4. Choose "Figma design" → Empty                ║
// ║  5. Click "Save and open folder"                 ║
// ║  6. Replace code.js with THIS file               ║
// ║  7. Back in Figma: Plugins → Development →       ║
// ║     "RespireLabs Prototype" → Run                ║
// ║                                                  ║
// ║  It will create ~50 prototype connections        ║
// ║  automatically between your screen frames.       ║
// ╚══════════════════════════════════════════════════╝

// ── Screen Node IDs (Variant A frames) ─────────────
// Update these if your node IDs differ from the defaults.
// To find a node ID: right-click frame → "Copy link" →
// extract the node-id parameter from the URL.

const S = {
  S1:  '0:19',    S2:  '0:60',    S3:  '0:243',
  S4:  '0:358',   S5:  '3:18',    S6:  '3:274',
  S7:  '4:18',    S8:  '4:156',   S9:  '5:18',
  S10: '5:339',   S11: '6:18',    S12: '6:413',
  S13: '6:710',   S14: '7:18',    S15: '7:497',
  S16: '11:18',   S17: '11:258',  S18: '11:699',
  S19: '14:18',   S20: '15:18',   S21: '12:18',
  S22: '12:366',  S23: '13:18',   S24: '13:183',
  S25: '13:367',  S26: '13:796',  S27: '14:275',
  S28: '16:18',   S29: '16:366',  S30: '17:18',
  S31: '17:476',  S32: '18:18',   S34: '19:18',
  S35: '19:381',  S36: '19:487',  S37: '14:587',
  C1:  '20:18',   C4:  '20:278',  D1:  '21:18',
  H1:  '22:18',
};

// ── Transition presets ─────────────────────────────

function slideRight(dur) {
  return { type: 'SLIDE_IN', direction: 'LEFT', matchLayers: false, duration: dur || 0.3, easing: { type: 'EASE_OUT' } };
}
function slideBack(dur) {
  return { type: 'SLIDE_IN', direction: 'RIGHT', matchLayers: false, duration: dur || 0.3, easing: { type: 'EASE_OUT' } };
}
function modalUp(dur) {
  return { type: 'SLIDE_IN', direction: 'BOTTOM', matchLayers: false, duration: dur || 0.4, easing: { type: 'EASE_OUT' } };
}
function modalDown(dur) {
  return { type: 'SLIDE_OUT', direction: 'BOTTOM', matchLayers: false, duration: dur || 0.3, easing: { type: 'EASE_IN' } };
}
function fade(dur) {
  return { type: 'DISSOLVE', duration: dur || 0.3, easing: { type: 'EASE_IN_AND_OUT' } };
}
function instant() {
  return { type: 'DISSOLVE', duration: 0, easing: { type: 'LINEAR' } };
}

// ── Build a reaction object ────────────────────────

function tap(toId, transition) {
  return {
    action: {
      type: 'NODE',
      destinationId: toId,
      navigation: 'NAVIGATE',
      transition: transition,
      preserveScrollPosition: false,
    },
    trigger: { type: 'ON_CLICK' },
  };
}

function afterDelay(toId, transition, seconds) {
  return {
    action: {
      type: 'NODE',
      destinationId: toId,
      navigation: 'NAVIGATE',
      transition: transition,
      preserveScrollPosition: false,
    },
    trigger: { type: 'AFTER_TIMEOUT', timeout: seconds },
  };
}

// ── All connections ────────────────────────────────
// Format: [sourceKey, destinationKey, reactionBuilder]

const LINKS = [
  // Flow 1: Onboarding
  ['S1',  'S3',  function() { return afterDelay(S.S3,  fade(0.6), 2); }],
  ['S3',  'S2',  function() { return tap(S.S2,  slideRight()); }],
  ['S2',  'S23', function() { return tap(S.S23, slideRight()); }],
  ['S23', 'S4',  function() { return tap(S.S4,  slideRight()); }],
  ['S4',  'S24', function() { return tap(S.S24, slideRight()); }],
  ['S24', 'S26', function() { return tap(S.S26, slideRight()); }],
  ['S26', 'S5',  function() { return tap(S.S5,  fade()); }],

  // Flow 2: Device Pairing
  ['S5',  'S20', function() { return tap(S.S20, modalUp()); }],
  ['S20', 'S5',  function() { return tap(S.S5,  modalDown()); }],

  // Flow 3: Night Session
  ['S6',  'S19', function() { return tap(S.S19, modalUp()); }],
  ['S19', 'S16', function() { return tap(S.S16, fade()); }],
  ['S16', 'S6',  function() { return tap(S.S6,  modalDown()); }],

  // Flow 4: Daytime Tracking
  ['S37', 'S27', function() { return tap(S.S27, slideRight()); }],
  ['S27', 'S37', function() { return tap(S.S37, slideBack()); }],

  // Flow 5: Breathing Exercise
  ['S11', 'S28', function() { return tap(S.S28, slideRight()); }],
  ['S28', 'S7',  function() { return tap(S.S7,  modalUp()); }],
  ['S7',  'S8',  function() { return tap(S.S8,  fade(0.2)); }],
  ['S8',  'S7',  function() { return tap(S.S7,  fade(0.2)); }],

  // Flow 6: Analytics Deep Dive
  ['S9',  'S17', function() { return tap(S.S17, slideRight()); }],
  ['S17', 'S18', function() { return tap(S.S18, slideRight()); }],
  ['S18', 'S17', function() { return tap(S.S17, slideBack()); }],
  ['S10', 'S30', function() { return tap(S.S30, slideRight()); }],
  ['S30', 'S10', function() { return tap(S.S10, slideBack()); }],
  ['S10', 'S29', function() { return tap(S.S29, slideRight()); }],
  ['S29', 'S10', function() { return tap(S.S10, slideBack()); }],

  // Flow 7: Knowledge Center
  ['S12', 'S13', function() { return tap(S.S13, slideRight()); }],
  ['S13', 'S12', function() { return tap(S.S12, slideBack()); }],
  ['S12', 'S31', function() { return tap(S.S31, slideRight()); }],
  ['S31', 'S12', function() { return tap(S.S12, slideBack()); }],

  // Flow 8: Teleconsultation
  ['S14', 'S32', function() { return tap(S.S32, slideRight()); }],
  ['S32', 'S14', function() { return tap(S.S14, slideBack()); }],

  // Flow 9: Settings
  ['S6',  'S21', function() { return tap(S.S21, slideRight()); }],
  ['S21', 'S15', function() { return tap(S.S15, slideRight()); }],
  ['S15', 'S21', function() { return tap(S.S21, slideBack()); }],
  ['S21', 'S35', function() { return tap(S.S35, slideRight()); }],
  ['S35', 'S21', function() { return tap(S.S21, slideBack()); }],
  ['S21', 'S34', function() { return tap(S.S34, slideRight()); }],
  ['S34', 'S36', function() { return tap(S.S36, slideRight()); }],
  ['S36', 'S34', function() { return tap(S.S34, slideBack()); }],
  ['S34', 'S21', function() { return tap(S.S21, slideBack()); }],
  ['S21', 'S22', function() { return tap(S.S22, slideRight()); }],
  ['S22', 'S21', function() { return tap(S.S21, slideBack()); }],
  ['S21', 'S6',  function() { return tap(S.S6,  slideBack()); }],

  // Flow 10: Monetization
  ['C1',  'S22', function() { return tap(S.S22, modalUp()); }],
  ['S22', 'C4',  function() { return tap(S.C4,  fade()); }],
  ['C4',  'S6',  function() { return tap(S.S6,  modalDown()); }],
];

// ── Main execution ─────────────────────────────────

var successCount = 0;
var errorCount = 0;
var frameReactions = {};

// Group reactions by source frame
for (var i = 0; i < LINKS.length; i++) {
  var link = LINKS[i];
  var fromKey = link[0];
  var toKey = link[1];
  var reactionFn = link[2];

  var fromId = S[fromKey];
  var toId = S[toKey];

  if (!fromId) {
    console.log('⚠️ Unknown source: ' + fromKey);
    errorCount++;
    continue;
  }
  if (!toId) {
    console.log('⚠️ Unknown destination: ' + toKey);
    errorCount++;
    continue;
  }

  if (!frameReactions[fromId]) {
    frameReactions[fromId] = [];
  }
  frameReactions[fromId].push({
    fromKey: fromKey,
    toKey: toKey,
    reaction: reactionFn()
  });
}

// Apply reactions to each frame
var frameIds = Object.keys(frameReactions);
for (var f = 0; f < frameIds.length; f++) {
  var frameId = frameIds[f];
  var node = figma.getNodeById(frameId);

  if (!node) {
    var screenName = '';
    for (var key in S) { if (S[key] === frameId) screenName = key; }
    console.log('❌ Frame not found: ' + screenName + ' (' + frameId + ')');
    errorCount++;
    continue;
  }

  if (!('reactions' in node)) {
    console.log('❌ Frame does not support reactions: ' + frameId);
    errorCount++;
    continue;
  }

  var items = frameReactions[frameId];
  var reactions = [];
  var logParts = [];

  for (var r = 0; r < items.length; r++) {
    reactions.push(items[r].reaction);
    logParts.push(items[r].fromKey + ' → ' + items[r].toKey);
  }

  // Set reactions (replaces existing — backup first if needed)
  node.reactions = reactions;
  successCount += reactions.length;

  console.log('✅ ' + logParts.join(', '));
}

// Summary
console.log('\n════════════════════════════════════');
console.log('✅ Created: ' + successCount + ' prototype connections');
console.log('❌ Errors:  ' + errorCount);
console.log('════════════════════════════════════');
console.log('');
console.log('Next steps:');
console.log('  1. Set Device → iPhone 15 Pro');
console.log('  2. Set Starting Frame → node 0:19 (S1 Splash)');
console.log('  3. Press ▶ Play to test the prototype');
console.log('  4. For tab bar links, select each tab element');
console.log('     and add "On Click → Navigate" manually');

figma.closePlugin('Done! ' + successCount + ' connections created. Press ▶ to test.');
