#!/usr/bin/env node
/**
 * extract-screens.js
 * Parses all HTML mockup files and extracts the first light-mode phone frame
 * for each unique screen ID. Outputs a JSON manifest + individual screen HTML.
 */

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const MOCKUPS_DIR = path.resolve(__dirname, '..');
const OUTPUT_FILE = path.resolve(__dirname, 'screens-manifest.json');

// Files to process (in order) and which screen IDs they contain
const SOURCE_FILES = [
  'onboarding.html',
  'home.html',
  'session.html',
  'analytics.html',
  'explore.html',
  'services.html',
  'session-results.html',
  'tracking-modes.html',
  'device-pairing.html',
  'settings-subscription.html',
  'onboarding-extended.html',
  'exercises-detail.html',
  'trends-bookmarks.html',
  'telehealth-detail.html',
  'privacy-health.html',
  'auth-screens.html',
  'loading-states.html',
  'empty-states.html',
  'error-states.html',
  'booking-video-flow.html',
  'payment-subscription.html',
  'session-extended.html',
  'profile-account.html',
  'notification-settings.html',
  'settings-extended.html',
  'gamification-social.html',
  'ai-insights.html',
  'content-programs.html',
  'device-management.html',
  'future-screens.html',
  'onboarding-finish.html',
  'modals-prompts.html',
  'analytics-advanced.html',
  'search-results.html',
  'telehealth-extended.html',
  'telehealth-referral.html',
  'core-modals.html',
  'premium-upsell.html',
  'notifications-center.html',
  'onboarding-variations.html',
];

// Screens to include in the prototype (light mode only, phone frames)
// Excludes: F1-F4 (watch), G1-G4 (accessibility), S110-S113 (non-phone)
const INCLUDED_PREFIXES = ['S', 'C', 'D1', 'H1'];

// Parse a screen-label to extract the screen ID (e.g., "S38", "C1", "D1", "H1")
function extractScreenId(labelText) {
  if (!labelText) return null;

  // Decode HTML entities
  const decoded = labelText
    .replace(/&middot;/g, '·')
    .replace(/&bull;/g, '·')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8212;/g, '—')
    .trim();

  if (!decoded || decoded === ' ') return null;

  // Match patterns: "S1 — Splash", "S38-A · Login · Light", "C1-A · Paywall", "D1-A · Inbox", "H1-A · Social"
  const match = decoded.match(/^(S\d+|C\d+|D\d+|H\d+)/);
  if (!match) return null;

  return match[1];
}

// Check if this is a light-mode variant (not dark)
function isLightVariant(labelText) {
  const decoded = labelText
    .replace(/&middot;/g, '·')
    .replace(/&bull;/g, '·')
    .replace(/&nbsp;/g, ' ')
    .trim();

  // Explicitly dark variants
  if (/\bDark\b/i.test(decoded)) return false;
  if (/-C\s*·/i.test(decoded)) return false; // e.g., "S32-C · Specialist · Dark"
  if (/-B\s*·.*Dark/i.test(decoded)) return false;

  return true;
}

// Check if a phone div has a tab bar
function hasTabBar(phoneHtml) {
  return /<div\s+class="tab-bar[^"]*"/i.test(phoneHtml);
}

// Determine the phone theme class
function getPhoneTheme($phone) {
  const classes = $phone.attr('class') || '';
  if (classes.includes('phone-dark')) return 'dark';
  if (classes.includes('phone-blue')) return 'blue';
  if (classes.includes('phone-gradient-splash')) return 'gradient-splash';
  return 'light';
}

function processFile(filename) {
  const filepath = path.join(MOCKUPS_DIR, filename);
  if (!fs.existsSync(filepath)) {
    console.warn(`  SKIP: ${filename} not found`);
    return { screens: [], inlineCSS: '' };
  }

  const html = fs.readFileSync(filepath, 'utf8');
  const $ = cheerio.load(html, { decodeEntities: false });

  // Extract inline <style> content
  let inlineCSS = '';
  $('head style').each((i, el) => {
    inlineCSS += $(el).html() + '\n';
  });

  // Two-pass: first collect all candidates, then pick best per screen ID
  const candidates = []; // { screenId, isLight, priority, ... }

  $('.screen-label').each((i, labelEl) => {
    const labelText = $(labelEl).html();
    const screenId = extractScreenId(labelText);

    if (!screenId) return;

    const screenCol = $(labelEl).closest('.screen-col');
    let $phone;

    if (screenCol.length) {
      $phone = screenCol.find('.phone').first();
    } else {
      $phone = $(labelEl).nextAll('.phone').first();
      if (!$phone.length) {
        $phone = $(labelEl).parent().find('.phone').first();
      }
    }

    if (!$phone || !$phone.length) {
      console.warn(`  WARN: No phone found for ${screenId} in ${filename}`);
      return;
    }

    const theme = getPhoneTheme($phone);
    const isLight = isLightVariant(labelText);
    const phoneHtml = $.html($phone);
    const tabBar = hasTabBar(phoneHtml);

    const decodedLabel = labelText
      .replace(/&middot;/g, '·')
      .replace(/&bull;/g, '·')
      .replace(/&nbsp;/g, '')
      .replace(/&#8212;/g, '—')
      .trim();

    // Priority: light theme > blue/gradient > dark
    // Also prefer -A variants over -B
    let priority = 0;
    if (theme === 'light') priority = 10;
    else if (theme === 'blue' || theme === 'gradient-splash') priority = 8;
    else priority = 2; // dark

    if (isLight) priority += 5;
    if (/-A\b/.test(decodedLabel)) priority += 2;

    candidates.push({
      screenId,
      sourceFile: filename,
      label: decodedLabel,
      hasTabBar: tabBar,
      phoneTheme: theme,
      innerHTML: $phone.html(),
      phoneClasses: $phone.attr('class'),
      priority,
    });
  });

  // Pick best candidate per screen ID
  const bestByScreen = {};
  for (const c of candidates) {
    if (!bestByScreen[c.screenId] || c.priority > bestByScreen[c.screenId].priority) {
      bestByScreen[c.screenId] = c;
    }
  }

  const screens = Object.values(bestByScreen);
  return { screens, inlineCSS };
}

// Main execution
console.log('Extracting screens from HTML mockups...\n');

const allScreens = [];
const allInlineCSS = [];
const seenGlobalIds = new Set();

for (const file of SOURCE_FILES) {
  const { screens, inlineCSS } = processFile(file);

  if (inlineCSS.trim()) {
    allInlineCSS.push(`/* === ${file} === */\n${inlineCSS}`);
  }

  for (const screen of screens) {
    if (seenGlobalIds.has(screen.screenId)) {
      console.log(`  DUP: ${screen.screenId} from ${file} (already extracted)`);
      continue;
    }
    seenGlobalIds.add(screen.screenId);
    allScreens.push(screen);
    console.log(`  ✓ ${screen.screenId} — ${screen.label} (tab: ${screen.hasTabBar}, theme: ${screen.phoneTheme})`);
  }
}

// Sort by screen ID (numeric sort within prefix)
allScreens.sort((a, b) => {
  const aPrefix = a.screenId.charAt(0);
  const bPrefix = b.screenId.charAt(0);
  if (aPrefix !== bPrefix) return aPrefix.localeCompare(bPrefix);

  const aNum = parseInt(a.screenId.slice(1), 10);
  const bNum = parseInt(b.screenId.slice(1), 10);
  return aNum - bNum;
});

// Write manifest
const manifest = allScreens.map(s => ({
  screenId: s.screenId,
  sourceFile: s.sourceFile,
  label: s.label,
  hasTabBar: s.hasTabBar,
  phoneTheme: s.phoneTheme,
}));

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(manifest, null, 2));
console.log(`\nManifest: ${OUTPUT_FILE}`);
console.log(`Total screens extracted: ${allScreens.length}`);

// Write combined inline CSS
const cssOutputPath = path.resolve(__dirname, 'extracted-inline-styles.css');
fs.writeFileSync(cssOutputPath, allInlineCSS.join('\n\n'));
console.log(`Inline CSS: ${cssOutputPath}`);

// Write each screen's inner HTML for assembly
const screensDir = path.resolve(__dirname, 'extracted-screens');
if (!fs.existsSync(screensDir)) fs.mkdirSync(screensDir, { recursive: true });

for (const screen of allScreens) {
  const outPath = path.join(screensDir, `${screen.screenId}.html`);
  // Wrap in the phone div with same classes
  const wrapped = `<div class="${screen.phoneClasses}">\n${screen.innerHTML}\n</div>`;
  fs.writeFileSync(outPath, wrapped);
}
console.log(`Screen HTML files: ${screensDir}/`);

// Print summary by prefix
const byPrefix = {};
for (const s of allScreens) {
  const prefix = s.screenId.match(/^[A-Z]+/)[0];
  if (!byPrefix[prefix]) byPrefix[prefix] = [];
  byPrefix[prefix].push(s.screenId);
}
console.log('\nSummary:');
for (const [prefix, ids] of Object.entries(byPrefix)) {
  console.log(`  ${prefix}: ${ids.length} screens (${ids.join(', ')})`);
}
