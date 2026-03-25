#!/usr/bin/env node
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '..', 'prototype.html'), 'utf8');
const $ = cheerio.load(html, { decodeEntities: false });

function hasLinkTo(fromId, toId) {
  const screen = $('#' + fromId);
  if (!screen.length) return false;
  const hasNav = screen.find('[data-nav="' + toId + '"]').length > 0;
  const hasAuto = screen.attr('data-auto-target') === toId;
  return hasNav || hasAuto;
}

function checkFlow(name, steps) {
  let ok = true;
  const fails = [];
  for (let i = 0; i < steps.length - 1; i++) {
    if (!hasLinkTo(steps[i], steps[i+1])) {
      fails.push(steps[i] + '→' + steps[i+1]);
      ok = false;
    }
  }
  const status = ok ? '✓ PASS' : '✗ FAIL (' + fails.join(', ') + ')';
  console.log('  ' + status + ' — ' + name + ': ' + steps.join('→'));
  return ok;
}

console.log('=== VERIFICATION SCENARIOS ===\n');

let allPass = true;
allPass &= checkFlow('Full onboarding', ['S1','S3','S2','S23','S4','S24','S84','S26','S86','S5']);
allPass &= checkFlow('Auth login', ['S38','S6']);
allPass &= checkFlow('Auth recovery', ['S38','S39','S40','S41','S42','S6']);
allPass &= checkFlow('Device pairing', ['S5','S20']);
allPass &= checkFlow('Night session', ['S6','S57','S19']);
allPass &= checkFlow('Exercise start', ['S28','S7']);
allPass &= checkFlow('Exercise end', ['S8','S93','S11']);
allPass &= checkFlow('Settings', ['S6','S21']);
allPass &= checkFlow('Settings→Profile', ['S21','S62']);
allPass &= checkFlow('Settings→Tape', ['S21','S15']);
allPass &= checkFlow('Settings→Privacy', ['S21','S34']);
allPass &= checkFlow('Settings→Notifications', ['S21','S64']);
allPass &= checkFlow('Booking', ['S32','S55','S54','S96']);
allPass &= checkFlow('Video call', ['S33','S60','S96']);
allPass &= checkFlow('Error recovery', ['S50','S6']);
allPass &= checkFlow('Empty→session', ['S47','S19']);
allPass &= checkFlow('Monetization entry', ['C1','S22']);
allPass &= checkFlow('Monetization trial', ['S22','C4','S6']);
allPass &= checkFlow('Plan comparison', ['C5','S56','C4']);
allPass &= checkFlow('Password reset', ['S38','S39','S40','S41','S42','S6']);
allPass &= checkFlow('Delete account', ['S70','S38']);
allPass &= checkFlow('Device firmware', ['S15','S80']);
allPass &= checkFlow('Device guide', ['S15','S81']);

console.log('\n=== TAB BAR CHECK ===\n');
const expectedTabs = ['S5','S6','S9','S10','S11','S12','S14','S15','S17','S18','S25','S26','S28','S29','S30','S31','S32','S37','S46','S47','S48','S49','S50','S51','S72','S79','S83','S91','S96','S108'];
let tabOk = 0;
for (const s of expectedTabs) {
  const screen = $('#' + s);
  if (screen.attr('data-has-tab') === 'true') {
    tabOk++;
  } else {
    console.log('  ✗ ' + s + ' missing tab bar');
  }
}
console.log('  Tab bars: ' + tabOk + '/' + expectedTabs.length + ' screens');

console.log('\n=== DEAD END CHECK ===\n');
let deadEnds = 0;
$('.proto-screen').each((i, el) => {
  const id = $(el).attr('id');
  const hasNav = $(el).find('[data-nav]').length > 0;
  const hasBack = $(el).find('[data-back]').length > 0;
  const hasDismiss = $(el).find('[data-dismiss]').length > 0;
  const hasAutoDelay = $(el).attr('data-auto-delay');
  const hasTabBar = $(el).attr('data-has-tab') === 'true';
  if (!hasNav && !hasBack && !hasDismiss && !hasAutoDelay && !hasTabBar) {
    console.log('  ⚠ ' + id + ' — dead end');
    deadEnds++;
  }
});
console.log('  Dead ends: ' + deadEnds);

console.log('\n=== SUMMARY ===\n');
const screens = $('.proto-screen').length;
const navs = $('[data-nav]').length;
const backs = $('[data-back]').length;
const dismisses = $('[data-dismiss]').length;
const autoDelays = $('[data-auto-delay]').length;
const withTab = $('.proto-screen[data-has-tab="true"]').length;

console.log('  Screens: ' + screens);
console.log('  Explicit connections: ' + (navs + backs + dismisses));
console.log('  Tab bar connections: ~' + (withTab * 4));
console.log('  Auto-delays: ' + autoDelays);
console.log('  Total: ~' + (navs + backs + dismisses + withTab * 4));
console.log('  Dead ends: ' + deadEnds);
console.log('  File size: ' + Math.round(fs.statSync(path.resolve(__dirname, '..', 'prototype.html')).size / 1024) + ' KB');
console.log('');
console.log(allPass && deadEnds === 0 ? '  ✓ ALL CHECKS PASSED' : '  ✗ SOME CHECKS FAILED');
