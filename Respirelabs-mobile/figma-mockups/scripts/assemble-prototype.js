#!/usr/bin/env node
/**
 * assemble-prototype.js
 * Assembles all extracted screens into a single interactive prototype HTML file.
 * Wires navigation by matching elements by text content and position.
 */

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const SCRIPTS_DIR = __dirname;
const MOCKUPS_DIR = path.resolve(__dirname, '..');
const SCREENS_DIR = path.join(SCRIPTS_DIR, 'extracted-screens');
const MANIFEST_FILE = path.join(SCRIPTS_DIR, 'screens-manifest.json');
const OUTPUT_FILE = path.join(MOCKUPS_DIR, 'prototype.html');

const manifest = JSON.parse(fs.readFileSync(MANIFEST_FILE, 'utf8'));
const stylesCSS = fs.readFileSync(path.join(MOCKUPS_DIR, 'styles.css'), 'utf8');
const protoCSS = fs.readFileSync(path.join(MOCKUPS_DIR, 'prototype.css'), 'utf8');
const inlineCSS = fs.readFileSync(path.join(SCRIPTS_DIR, 'extracted-inline-styles.css'), 'utf8');
const protoJS = fs.readFileSync(path.join(MOCKUPS_DIR, 'prototype.js'), 'utf8');

console.log('Assembling prototype...\n');

// ── Text-Content Navigation Wiring ──
// Map: screenId -> array of { text (regex), target, transition, action, nth }
// text: matches element textContent; nth: which match to use (0-based, default 0)
function buildTextNavMap() {
  const nav = {};
  function add(screenId, textPattern, target, opts = {}) {
    if (!nav[screenId]) nav[screenId] = [];
    nav[screenId].push({
      text: textPattern,
      target,
      transition: opts.transition || 'push',
      action: opts.action || 'nav',
      nth: opts.nth || 0,
      selector: opts.selector || null,
    });
  }

  // ── Flow 1: Onboarding ──
  add('S3', /^Next$/i, 'S2');
  add('S3', /^Skip$/i, 'S2');
  add('S2', /Allow|Enable|Continue/i, 'S23');
  add('S23', /Enable|Allow|Continue/i, 'S4');
  add('S4', /Continue|Next/i, 'S24');
  add('S24', /Continue|Next/i, 'S84');
  add('S84', /Continue|Next/i, 'S26');
  add('S26', /^Next$/i, 'S86');
  add('S86', /Let.*s Start|Begin|Start|Explore/i, 'S5');

  // ── Flow 2: Auth ──
  add('S38', /Log In|Sign In/i, 'S6');
  add('S38', /Forgot/i, 'S39');
  add('S39', /Send|Reset|Submit/i, 'S40');
  add('S40', /Set|Reset|Update|Save/i, 'S41');
  add('S41', /Verify|Confirm|Submit/i, 'S42');
  add('S42', /Verify|Confirm|Submit/i, 'S6');
  add('S43', /Contact Support|Get Help|Support/i, 'S68');
  add('S43', /Try Again|Retry/i, 'S38');
  add('S44', /Use Password|Password/i, 'S38');
  add('H1', /Continue with Google|Google|Apple/i, 'S4');
  add('H1', /Email|Sign in with Email/i, 'S38');
  add('H1', /Log in$/i, 'S38');
  add('H1', /Face ID|Biometric/i, 'S44');
  add('H2', /Create Account|Sign Up/i, 'H3');
  add('H3', /Continue|Accept|Agree/i, 'H4');
  add('H4', /Complete.*setup|Full setup/i, 'S4');

  // ── Flow 3: Device Pairing ──
  add('S5', /Pair|Connect|Set Up/i, 'S20');
  add('S20', /trouble|help/i, 'S15');

  // ── Flow 3b: Home Hub text matches ──
  add('S6', /AI Sleep Coach/i, 'S77');
  add('S6', /Weekly Report/i, 'S78');
  add('S6', /Daily Tip/i, 'S106');
  add('S6', /Achievements/i, 'S29');

  // ── Flow 4: Night Session ──
  add('S57', /Start Session|Start Sleep|Begin/i, 'S19');
  add('S57', /Skip Checklist|Skip/i, 'S19');
  add('S19', /Start Sleep Tracking|Start.*Track|Begin/i, 'S7');
  add('S7', /End Session/i, 'S16');
  add('S7', /Pause/i, 'S8');
  add('S16', /Done|Close|Home/i, 'S6');
  add('S16', /View.*Detail|Full.*Report|Details/i, 'S18');
  add('S16', /Share/i, 'S61');
  add('S16', /Rate|Rate.*App/i, 'S103');

  // ── Flow 5: Daytime Tracking ──
  add('S37', /End|Stop|Finish/i, 'S16');
  add('S58', /Resume|Continue/i, 'S37');
  add('S58', /End|Stop/i, 'S16');

  // ── Flow 6: Exercise ──
  // S11 exercise cards — navigate to exercise detail
  add('S11', /4-7-8|Box Breathing|Diaphragm|Coherent|Alternate/i, 'S28');
  add('S11', /Recommended|Smart|For You/i, 'S79');
  add('S11', /Premium|Locked|Pro/i, 'C1');
  add('S28', /Start|Begin|Play/i, 'S7');
  add('S28', /Audio|Listen|Play Audio/i, 'S94');
  add('S7', /End Session/i, 'S16');
  add('S8', /Resume|Continue|Play/i, 'S7');
  add('S8', /End Session|End/i, 'S93');
  add('S93', /Done|Close|Finish/i, 'S11');
  add('S92', /Start|Begin/i, 'S7');
  add('S79', /Program|Exercise Program/i, 'S92');

  // ── Flow 7: Analytics ──
  add('S9', /View All|All Sessions|See All/i, 'S17');
  add('S9', /Sleep/i, 'S10');
  add('S9', /Breathing Patterns|View Patterns|Pattern/i, 'S87');
  add('S9', /Sleep Stages|Stages/i, 'S88');
  add('S9', /Compare|Compare Sessions/i, 'S90');
  add('S10', /Monthly|Trends/i, 'S30');
  add('S18', /Share/i, 'S61');

  // ── Flow 8: Knowledge ──
  // S12 article cards — navigate to article detail
  add('S12', /Science Behind|Article/i, 'S13');
  add('S12', /Premium|Locked|Pro/i, 'C2');
  add('S91', /Result|Article/i, 'S13');
  add('S13', /Audio|Listen|Play/i, 'S94');

  // ── Flow 9: Teleconsultation ──
  // S14 specialist cards
  add('S14', /Dr\.|Louise|Roel|Specialist/i, 'S32');
  add('S14', /Upcoming Appointment/i, 'S96');
  add('S14', /Reschedule/i, 'S97');
  add('S14', /Cancel/i, 'S98');
  add('S32', /Book|Schedule|Appointment/i, 'S55');
  add('S32', /Review/i, 'S95');
  add('S55', /Confirm|Book|Schedule/i, 'S54');
  add('S54', /Done|Close|View/i, 'S96');
  add('S59', /Leave/i, 'S96', { transition: 'back' });
  add('S33', /End|Leave|Hang Up/i, 'S60');
  add('S60', /Done|Close|Back/i, 'S96');
  add('S97', /Confirm|Save|Reschedule/i, 'S96');
  add('S98', /Confirm|Cancel.*Appointment|Yes/i, 'S96');
  // S96 appointment cards
  add('S96', /^Join$/i, 'S59');
  add('S96', /^Details$/i, 'S32');
  add('S96', /Book New/i, 'S55');

  // ── Flow 10: Settings ──
  add('S21', /Alex Gerges/i, 'S62');
  add('S21', /Premium Plan/i, 'S22');
  add('S21', /Smart Tape/i, 'S15');
  add('S21', /Health Integrations/i, 'S35');
  add('S21', /Privacy.*Consent/i, 'S34');
  add('S21', /Export.*Data/i, 'S36');
  add('S21', /Delete Account/i, 'S70');
  add('S21', /Notifications/i, 'S64');
  add('S21', /Haptic/i, 'S65');
  add('S21', /Face ID/i, 'S66');
  // Extended settings (new rows)
  add('S21', /Sound.*Haptics/i, 'S65');
  add('S21', /Data.*Storage|Storage/i, 'S67');
  add('S21', /About.*Legal|About/i, 'S69');
  add('S21', /Sync.*Status|Sync/i, 'S109');
  add('S21', /Manage.*Subscription/i, 'S99');
  add('S21', /Goals|Goal Config/i, 'S85');
  add('S21', /Year.*Review|Wrapped/i, 'S89');
  add('S21', /Journal/i, 'S75');

  // S34 → S36
  add('S34', /Export|Download/i, 'S36');
  // S35 health integrations
  add('S35', /Connect/i, 'S35'); // stays on same page conceptually
  // S62 → S63
  add('S62', /Password|Change Password/i, 'S63');
  add('S62', /Delete|Remove Account/i, 'S70');
  // S70 → S38
  add('S70', /Confirm|Delete|Yes/i, 'S38');
  // S36
  add('S36', /Share Report/i, 'S61');
  add('S36', /Download/i, 'S21', { transition: 'back' });

  // ── Flow 11: Monetization ──
  add('C1', /Start.*Trial|Upgrade|Subscribe/i, 'S22');
  add('S22', /Start.*Trial|Subscribe|Upgrade/i, 'C4');
  add('S22', /Compare.*Plans|View Plans|Restore/i, 'C5');
  add('S22', /Manage/i, 'S99');
  add('C4', /Explore|Get Started|Home|Continue/i, 'S6');
  add('C5', /Start Free Trial/i, 'S56');
  add('S56', /Pay|Confirm|Submit/i, 'C4');
  add('S99', /Billing.*History|View.*Billing/i, 'S100');
  add('S99', /Cancel.*Subscription|Cancel/i, 'S101');
  add('S99', /Promo|Coupon|Code/i, 'S102');
  add('C2', /Start.*Free.*Trial|Upgrade|Unlock/i, 'S22');
  add('C3', /Subscribe|Upgrade/i, 'S22');

  // ── Flow 12: Device Management ──
  add('S15', /Firmware|Update/i, 'S80');
  add('S15', /Calibration/i, 'S81');
  add('S15', /Auto-Sync/i, 'S82');
  add('S80', /Update Now/i, 'S15');
  add('S80', /Later/i, 'S15', { transition: 'back' });
  add('S81', /^Next$/i, 'S15');
  add('S81', /^Back$/i, 'S15', { transition: 'back' });
  add('S82', /Try Again/i, 'S15');
  add('S82', /Contact Support/i, 'S68');

  // ── Flow 13: AI ──
  // S6 quick actions to AI screens
  add('S77', /Share with Doctor/i, 'S61');
  add('S78', /Share with Doctor/i, 'S61');

  // ── Flow 14: Gamification ──
  add('S71', /Share Achievement/i, 'S61');
  add('S71', /View All Badges/i, 'S29');
  add('S29', /Leaderboard/i, 'S72');
  add('S29', /Challenge|Weekly Challenge/i, 'S73');
  add('S73', /Start|Accept|Join/i, 'S74');
  add('S74', /Next Challenge/i, 'S73');
  add('S74', /Share/i, 'S61');
  add('S75', /Save|Submit|Done/i, 'S76');
  add('S77', /Weekly Report|View Report/i, 'S78');
  add('S83', /Add to Cart/i, 'S56');

  // ── Flow 16: Device Shop ──
  add('S15', /Shop|Order.*Tape|Reorder/i, 'S83');

  // ── Flow 15: Notifications ──
  add('D1', /Session|Sleep/i, 'S18', { nth: 0 });
  add('D1', /Article|Read|Tip/i, 'S13', { nth: 0 });
  add('D1', /Appointment|Upcoming|Dr\./i, 'S96', { nth: 0 });
  add('D1', /Settings|Manage|Preferences/i, 'D2');

  // ── Flow 16b: Misc Orphan Connections ──
  add('S19', /Alert|Configure|Settings/i, 'S27');
  add('S32', /Refer|Invite/i, 'S105');
  add('S42', /Locked|Too many/i, 'S43');

  // ── Flow 17: Error/Empty States ──
  add('S47', /Start|Record|Begin/i, 'S19');
  add('S48', /Browse|Explore/i, 'S12');
  add('S49', /Explore|Browse/i, 'S11');
  add('S50', /Retry|Try Again/i, 'S6');
  add('S51', /Retry|Try Again/i, 'S6');
  add('S52', /Upgrade to Premium/i, 'S22');
  add('S52', /Go Back/i, 'S6', { transition: 'back' });
  add('S53', /Home|Go Home|Back/i, 'S6');

  // ── Flow 18: Future ──
  add('S89', /^Done$/i, 'S21', { transition: 'back' });
  add('S89', /Share/i, 'S61');

  // ── Modal screens ──
  add('S85', /Save Goal/i, null, { action: 'dismiss' });
  add('S93', /Done|Close|Finish/i, 'S11');
  add('S103', /Rate on App Store/i, null, { action: 'dismiss' });
  add('S103', /Give Feedback/i, null, { action: 'dismiss' });
  add('S104', /Got it/i, null, { action: 'dismiss' });
  add('S106', /Dismiss/i, null, { action: 'dismiss' });
  add('S107', /End Session/i, 'S16');
  add('S107', /Continue Session/i, null, { action: 'dismiss' });
  add('S108', /Retry|Reconnect/i, null, { action: 'dismiss' });

  return nav;
}

// Auto-delay screens
const AUTO_DELAYS = {
  'S1':  { delay: 2000, target: 'S3', transition: 'dissolve' },
  'S44': { delay: 1500, target: 'S6', transition: 'dissolve' },
  'S45': { delay: 2000, target: 'S46', transition: 'dissolve' },
  'S46': { delay: 1500, target: 'S6', transition: 'dissolve' },
  'S59': { delay: 3000, target: 'S33', transition: 'dissolve' },
};

const navMap = buildTextNavMap();

// ── Wire Screen HTML ──
function wireScreen(screenId, html) {
  const $ = cheerio.load(html, { decodeEntities: false });
  const rules = navMap[screenId] || [];

  // Track which elements have been wired to avoid double-wiring
  const wired = new Set();

  for (const rule of rules) {
    // Find candidate elements with matching text
    const candidates = [];

    // Search clickable-looking elements
    const searchSelectors = rule.selector
      ? rule.selector
      : 'button, a, .btn, .btn-primary, .btn-secondary, .btn-outline, .btn-ghost, .card, .settings-item, .hero-card, .quick-action, .tab-item, [class*="btn"], [class*="card"], [class*="item"], [class*="action"], [class*="link"], div[style*="cursor"], span, div';

    $(searchSelectors).each((i, el) => {
      const $el = $(el);
      const text = $el.text().trim();
      const elHtml = $.html(el);

      // Skip if already wired
      if ($el.attr('data-nav') || $el.attr('data-back') || $el.attr('data-modal') || $el.attr('data-dismiss')) return;

      // Skip very large containers (likely layout divs, not clickable elements)
      if (text.length > 200) return;

      // Check text match
      if (rule.text && rule.text.test(text)) {
        candidates.push({ el, $el, text, specificity: text.length });
      }
    });

    if (candidates.length === 0) continue;

    // Sort by specificity (shorter text = more specific match)
    candidates.sort((a, b) => a.specificity - b.specificity);

    // Pick the nth match (or first if nth not specified)
    const idx = Math.min(rule.nth, candidates.length - 1);
    const chosen = candidates[idx];

    if (!chosen) continue;

    const key = $.html(chosen.el).substring(0, 60);
    if (wired.has(key)) continue;
    wired.add(key);

    if (rule.action === 'dismiss') {
      chosen.$el.attr('data-dismiss', 'true');
    } else if (rule.action === 'modal') {
      chosen.$el.attr('data-modal', rule.target);
    } else {
      chosen.$el.attr('data-nav', rule.target);
      if (rule.transition && rule.transition !== 'push') {
        chosen.$el.attr('data-transition', rule.transition);
      }
    }
  }

  // Auto-wire back buttons by looking for left-arrow SVGs and "Back" text
  $('svg').each((i, el) => {
    const svgHtml = $.html(el);
    // Common back arrow patterns:
    // "M15 18l-6-6 6-6" — left chevron (onboarding/settings)
    // "M19 12H5M12 19l-7-7" — left arrow (auth screens)
    // "M15 9H3M9 4L3 9l6 5" — left arrow (analytics screens)
    // "M15 8l-7 7-7-7" — down chevron used as back (challenge/journal)
    const isBackArrow =
      (svgHtml.includes('M15') && svgHtml.includes('l-6-6')) ||
      (svgHtml.includes('M19') && svgHtml.includes('l-7')) ||
      (svgHtml.includes('M15 9H3') && svgHtml.includes('L3 9')) ||
      (svgHtml.includes('M15 8l-7'));

    if (isBackArrow) {
      const parent = $(el).parent();
      if (!parent.attr('data-nav') && !parent.attr('data-back') && !parent.attr('data-modal') && !parent.attr('data-dismiss')) {
        parent.attr('data-back', 'true');
      }
    }
  });

  // Also wire .nav-back, close buttons, close-x, back-circle, etc.
  $('[class*="nav-back"], [class*="back-circle"], [class*="back"], [class*="close-btn"], [class*="close-x"]').each((i, el) => {
    const $el = $(el);
    if (!$el.attr('data-nav') && !$el.attr('data-back') && !$el.attr('data-modal') && !$el.attr('data-dismiss')) {
      const text = $el.text().trim().toLowerCase();
      if (text === '' || text === 'back' || text === 'close' || text === 'cancel' || text === 'x' || text === '←' || text === '&larr;') {
        $el.attr('data-back', 'true');
      }
    }
  });

  // For screens with no exit at all, add data-back to the first clickable-looking element
  // (this is a safety net for dead-end screens)
  const NEEDS_BACK_FALLBACK = ['S13', 'D2', 'D3', 'H2', 'H3', 'H4'];
  if (NEEDS_BACK_FALLBACK.includes(screenId)) {
    // Add a back button to the status bar area (top of screen)
    const statusBar = $('.status-bar');
    if (statusBar.length) {
      statusBar.attr('data-back', 'true');
      statusBar.attr('style', (statusBar.attr('style') || '') + ';cursor:pointer;');
    }
  }

  // Wire the gear icon on S6 and S5 nav-settings to S21
  if (screenId === 'S6' || screenId === 'S5') {
    $('.nav-settings').attr('data-nav', 'S21');
  }

  // Wire S5 empty state hub icons
  if (screenId === 'S5') {
    $('.nav-bell').attr('data-nav', 'D1');
    $('.nav-search').attr('data-nav', 'S91');
  }

  // Wire S6 home hub — class-based wiring for new elements
  if (screenId === 'S6') {
    // Nav icons
    $('.nav-bell').attr('data-nav', 'D1');
    $('.nav-search').attr('data-nav', 'S91');
    // AI Coach card
    $('.ai-coach-card').attr('data-nav', 'S77');
    // Quick actions
    $('[data-id="start-session"]').attr('data-nav', 'S57');
    $('[data-id="exercise"]').attr('data-nav', 'S11');
    $('[data-id="track"]').attr('data-nav', 'S37');
    // Hero/progress ring card → session detail
    const heroCards = $('.hero-card');
    if (heroCards.length > 0) {
      $(heroCards[0]).attr('data-nav', 'S57');
    }
    // Tappable stat cards
    $('.stat-sleep').attr('data-nav', 'S88');
    $('.stat-exercise').attr('data-nav', 'S11');
    $('.stat-progress').attr('data-nav', 'S30');
    // Content cards
    $('.daily-tip-card').attr('data-nav', 'S106');
    $('.recent-session-card').attr('data-nav', 'S18');
    $('.weekly-report-card').attr('data-nav', 'S78');
    $('.achievements-card').attr('data-nav', 'S29');
  }

  // Wire exercise cards on S11 to S28
  if (screenId === 'S11') {
    const cards = $('[class*="card"]');
    cards.each((i, el) => {
      if (!$(el).attr('data-nav') && !$(el).attr('data-back')) {
        $(el).attr('data-nav', 'S28');
      }
    });
  }

  // Wire article cards on S12 to S13
  if (screenId === 'S12') {
    const cards = $('[class*="card"]');
    cards.each((i, el) => {
      if (!$(el).attr('data-nav') && !$(el).attr('data-back')) {
        $(el).attr('data-nav', 'S13');
      }
    });
  }

  // Wire specialist cards on S14 to S32
  if (screenId === 'S14') {
    const cards = $('[class*="card"]');
    cards.each((i, el) => {
      if (!$(el).attr('data-nav') && !$(el).attr('data-back')) {
        const text = $(el).text();
        if (/Dr\.|specialist/i.test(text)) {
          $(el).attr('data-nav', 'S32');
        }
      }
    });
  }

  // Wire session history items on S17 to S18
  if (screenId === 'S17') {
    const items = $('[class*="card"], [class*="item"], [class*="row"]');
    items.each((i, el) => {
      if (!$(el).attr('data-nav') && !$(el).attr('data-back')) {
        $(el).attr('data-nav', 'S18');
      }
    });
  }

  // Wire settings items on S21 by finding chevron-right arrows
  if (screenId === 'S21') {
    // Wire the settings-items that have navigation chevrons
    const settingsItems = $('.settings-item');
    settingsItems.each((i, el) => {
      if ($(el).attr('data-nav')) return; // already wired
      const text = $(el).text().trim();
      // Match by text to the right target
      if (/Notification/i.test(text)) $(el).attr('data-nav', 'S64');
      else if (/Haptic/i.test(text)) $(el).attr('data-nav', 'S65');
      else if (/Face ID/i.test(text)) $(el).attr('data-nav', 'S66');
      else if (/Privacy/i.test(text)) $(el).attr('data-nav', 'S34');
      else if (/Export/i.test(text)) $(el).attr('data-nav', 'S36');
      else if (/Delete/i.test(text)) $(el).attr('data-nav', 'S70');
      else if (/Smart Tape/i.test(text)) $(el).attr('data-nav', 'S15');
      else if (/Health Integrations/i.test(text)) $(el).attr('data-nav', 'S35');
      // Extended settings rows (new)
      else if (/Sound.*Haptic/i.test(text)) $(el).attr('data-nav', 'S65');
      else if (/Data.*Storage/i.test(text)) $(el).attr('data-nav', 'S67');
      else if (/About.*Legal/i.test(text)) $(el).attr('data-nav', 'S69');
      else if (/Sync/i.test(text)) $(el).attr('data-nav', 'S109');
      else if (/Manage.*Sub/i.test(text)) $(el).attr('data-nav', 'S99');
      else if (/Goal/i.test(text)) $(el).attr('data-nav', 'S85');
      else if (/Year.*Review/i.test(text)) $(el).attr('data-nav', 'S89');
      else if (/Journal/i.test(text)) $(el).attr('data-nav', 'S75');
    });
  }

  // Wire S15 settings items
  if (screenId === 'S15') {
    const settingsItems = $('.settings-item');
    settingsItems.each((i, el) => {
      if ($(el).attr('data-nav')) return;
      const text = $(el).text().trim();
      if (/Firmware|Update/i.test(text)) $(el).attr('data-nav', 'S80');
      else if (/Calibration/i.test(text)) $(el).attr('data-nav', 'S81');
      else if (/Auto-Sync/i.test(text)) $(el).attr('data-nav', 'S82');
    });
  }

  // Wire notification items on D1
  if (screenId === 'D1') {
    const items = $('[class*="card"], [class*="item"], [class*="notification"]');
    let itemIndex = 0;
    const targets = ['S18', 'S13', 'S96']; // session, article, appointment
    items.each((i, el) => {
      if (!$(el).attr('data-nav') && !$(el).attr('data-back') && itemIndex < targets.length) {
        $(el).attr('data-nav', targets[itemIndex]);
        itemIndex++;
      }
    });
  }

  // Wire recommendation cards on S79 to S13
  if (screenId === 'S79') {
    const cards = $('[class*="card"]');
    cards.each((i, el) => {
      if (!$(el).attr('data-nav') && !$(el).attr('data-back')) {
        $(el).attr('data-nav', 'S13');
      }
    });
  }

  // Wire achievement/badge cards on S29 (first 3 → S71, then challenge/leaderboard/journal)
  if (screenId === 'S29') {
    const cards = $('[class*="card"], [class*="badge"], [class*="achievement"]');
    let count = 0;
    cards.each((i, el) => {
      if (count >= 3) return;
      if (!$(el).attr('data-nav') && !$(el).attr('data-back')) {
        $(el).attr('data-nav', 'S71');
        count++;
      }
    });
    // Wire remaining cards by text content
    const allCards = $('[class*="card"], [class*="badge"], [class*="achievement"], [class*="item"]');
    allCards.each((i, el) => {
      if ($(el).attr('data-nav')) return;
      const text = $(el).text();
      if (/challenge/i.test(text)) $(el).attr('data-nav', 'S73');
      else if (/leaderboard/i.test(text)) $(el).attr('data-nav', 'S72');
      else if (/journal/i.test(text)) $(el).attr('data-nav', 'S75');
    });
  }

  // Wire S9 track-nav-cards → deep-dive screens
  if (screenId === 'S9') {
    $('.track-nav-card').each((i, el) => {
      if ($(el).attr('data-nav')) return;
      const text = $(el).text();
      if (/Breathing Patterns/i.test(text)) $(el).attr('data-nav', 'S87');
      else if (/Audio Spectrum/i.test(text)) $(el).attr('data-nav', 'S88');
      else if (/Sleep Stages/i.test(text)) $(el).attr('data-nav', 'S88');
      else if (/Compare Sessions/i.test(text)) $(el).attr('data-nav', 'S90');
    });
    // Coach note → AI Coach
    $('.coach-card').each((i, el) => {
      if (!$(el).attr('data-nav')) $(el).attr('data-nav', 'S77');
    });
    // Search icon
    $('.nav-search').attr('data-nav', 'S91');
  }

  // Wire H4 quick start cards
  if (screenId === 'H4') {
    const cards = $('[class*="card"]');
    const targets = ['S19', 'S37', 'S11'];
    let idx = 0;
    cards.each((i, el) => {
      if (!$(el).attr('data-nav') && idx < targets.length) {
        $(el).attr('data-nav', targets[idx++]);
      }
    });
  }

  // Wire journal entries on S76 to S75
  if (screenId === 'S76') {
    const cards = $('[class*="card"], [class*="entry"]');
    cards.each((i, el) => {
      if (!$(el).attr('data-nav') && !$(el).attr('data-back')) {
        $(el).attr('data-nav', 'S75');
      }
    });
  }

  // Wire search results on S91 to S13 (first 3 only)
  if (screenId === 'S91') {
    const items = $('[class*="card"], [class*="result"], [class*="item"]');
    let count = 0;
    items.each((i, el) => {
      if (count >= 3) return;
      if (!$(el).attr('data-nav') && !$(el).attr('data-back')) {
        $(el).attr('data-nav', 'S13');
        count++;
      }
    });
  }

  return $('body').html() || $.html();
}

// ── Process Screens ──
let screenSections = '';
let processedCount = 0;
let totalNavCount = 0;
let totalBackCount = 0;

for (const screenInfo of manifest) {
  const screenId = screenInfo.screenId;
  const htmlPath = path.join(SCREENS_DIR, `${screenId}.html`);
  if (!fs.existsSync(htmlPath)) continue;

  let html = fs.readFileSync(htmlPath, 'utf8');

  // Remove inline tab bars
  const $temp = cheerio.load(html, { decodeEntities: false });
  $temp('.tab-bar').remove();
  $temp('.tab-bar-dark').remove();
  html = $temp('body').html() || $temp.html();

  // Wire navigation
  html = wireScreen(screenId, html);

  // Count connections
  const navCount = (html.match(/data-nav="/g) || []).length;
  const backCount = (html.match(/data-back="/g) || []).length;
  totalNavCount += navCount;
  totalBackCount += backCount;

  // Build screen section
  const autoDelay = AUTO_DELAYS[screenId];

  let attrs = `id="${screenId}" class="proto-screen"`;
  attrs += ` data-has-tab="${screenInfo.hasTabBar}"`;
  attrs += ` data-label="${screenInfo.label.replace(/"/g, '&quot;')}"`;

  if (autoDelay) {
    attrs += ` data-auto-delay="${autoDelay.delay}"`;
    attrs += ` data-auto-target="${autoDelay.target}"`;
    attrs += ` data-auto-transition="${autoDelay.transition}"`;
  }

  screenSections += `\n  <!-- ${screenId} — ${screenInfo.label} -->\n`;
  screenSections += `  <section ${attrs}>\n`;
  screenSections += `    ${html}\n`;
  screenSections += `  </section>\n`;

  processedCount++;

  if (navCount + backCount > 0) {
    console.log(`  ${screenId}: ${navCount} nav + ${backCount} back`);
  }
}

console.log(`\nTotal: ${processedCount} screens, ${totalNavCount} nav + ${totalBackCount} back = ${totalNavCount + totalBackCount} explicit connections`);
console.log(`Plus ~152 tab bar connections from JS engine\n`);

// ── Tab Bar SVG Icons ──
const TAB_ICONS = {
  Home: '<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z"/></svg>',
  Track: '<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>',
  Tips: '<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>',
  Learn: '<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>',
  Consult: '<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>',
};

const tabBarHtml = `
  <div id="proto-tab-bar" class="proto-tab-bar hidden">
    ${Object.entries(TAB_ICONS).map(([name, icon]) => `
    <div class="proto-tab-item" data-tab="${name}">
      <div class="proto-tab-icon">${icon}</div>
      ${name}
    </div>`).join('')}
  </div>`;

const devToolsHtml = `
  <div id="proto-dev-tools" class="proto-dev-tools">
    <div class="proto-dev-tools-header">
      <span class="proto-dev-tools-title">PROTOTYPE</span>
      <button id="dev-toggle" class="proto-dev-toggle">Hide</button>
    </div>
    <div id="dev-body" class="proto-dev-body">
      <div class="proto-dev-current" id="dev-current">S1</div>
      <div class="proto-dev-breadcrumb" id="dev-breadcrumb">S1</div>
      <select id="dev-select" class="proto-dev-select">
        <option value="">Jump to screen...</option>
      </select>
      <div class="proto-dev-actions">
        <button id="dev-back" class="proto-dev-btn">&larr; Back</button>
        <button id="dev-reset" class="proto-dev-btn reset">Reset</button>
      </div>
      <div class="proto-dev-stats" id="dev-stats"></div>
    </div>
  </div>`;

// ── Final Assembly ──
const finalHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>RespireLabs — Interactive Prototype</title>

<style>
/* === Base Design System === */
${stylesCSS}

/* === Component Styles (from mockup files) === */
${inlineCSS}

/* === Prototype Frame & Transitions === */
${protoCSS}
</style>
</head>

<body class="proto-body">

<!-- Device Frame -->
<div class="proto-device">
  <div id="proto-viewport" class="proto-viewport">

    <!-- Modal Overlay -->
    <div id="proto-modal-overlay" class="proto-modal-overlay"></div>

    <!-- ═══════════════════════════════════════════ -->
    <!-- SCREENS (${processedCount} total)              -->
    <!-- ═══════════════════════════════════════════ -->
    ${screenSections}
  </div>

  <!-- Global Tab Bar -->
  ${tabBarHtml}
</div>

<!-- Dev Tools -->
${devToolsHtml}

<script>
${protoJS}
</script>

</body>
</html>`;

fs.writeFileSync(OUTPUT_FILE, finalHtml);

const fileSizeKB = Math.round(fs.statSync(OUTPUT_FILE).size / 1024);
console.log(`Output: ${OUTPUT_FILE}`);
console.log(`Size: ${fileSizeKB} KB`);
console.log(`Done!`);
