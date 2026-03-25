/**
 * Export HTML prototype to Figma-importable bundle.
 *
 * Renders each of the 121 screens in headless Playwright,
 * captures a 393x852 screenshot, extracts hotspot bounding rects
 * from data-nav / data-back / data-dismiss / data-modal attributes,
 * and writes a single figma-bundle.json + individual PNGs.
 *
 * Usage:
 *   cd figma-export
 *   npm install && npm run install-browsers
 *   npm run export
 */

import { chromium, type Page, type ElementHandle } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

// ── Constants ───────────────────────────────────────────────────────

const DEVICE_WIDTH = 393;
const DEVICE_HEIGHT = 852;
const MIN_HOTSPOT = 24; // minimum hotspot dimension in px
const PROTOTYPE_PATH = path.resolve(__dirname, '..', 'prototype.html');
const MANIFEST_PATH = path.resolve(__dirname, '..', 'scripts', 'screens-manifest.json');
const OUTPUT_DIR = path.resolve(__dirname, 'output');
const SCREENS_DIR = path.resolve(OUTPUT_DIR, 'screens');
const BUNDLE_PATH = path.resolve(OUTPUT_DIR, 'figma-bundle.json');

// ── Types ───────────────────────────────────────────────────────────

interface ManifestEntry {
  screenId: string;
  sourceFile: string;
  label: string;
  hasTabBar: boolean;
  phoneTheme: string;
}

interface Hotspot {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'nav' | 'back' | 'dismiss' | 'modal';
  target: string | null;
  transition: string;
  label: string;
}

interface ScreenData {
  screenId: string;
  label: string;
  hasTabBar: boolean;
  imageFile: string;
  hotspots: Hotspot[];
}

interface TabBarTab {
  name: string;
  target: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface AutoDelay {
  screenId: string;
  delayMs: number;
  target: string;
  transition: string;
}

interface FigmaBundle {
  version: number;
  dimensions: { width: number; height: number };
  startScreen: string;
  screens: ScreenData[];
  tabBar: {
    height: number;
    tabs: TabBarTab[];
  };
  autoDelays: AutoDelay[];
}

// ── Helpers ─────────────────────────────────────────────────────────

function clampRect(
  rect: { x: number; y: number; width: number; height: number },
  vw: number,
  vh: number,
) {
  let { x, y, width, height } = rect;

  // Clamp to viewport
  if (x < 0) { width += x; x = 0; }
  if (y < 0) { height += y; y = 0; }
  if (x + width > vw) width = vw - x;
  if (y + height > vh) height = vh - y;

  // Enforce minimum size (expand from center)
  if (width < MIN_HOTSPOT) {
    const diff = MIN_HOTSPOT - width;
    x = Math.max(0, x - diff / 2);
    width = MIN_HOTSPOT;
    if (x + width > vw) x = vw - width;
  }
  if (height < MIN_HOTSPOT) {
    const diff = MIN_HOTSPOT - height;
    y = Math.max(0, y - diff / 2);
    height = MIN_HOTSPOT;
    if (y + height > vh) y = vh - height;
  }

  return {
    x: Math.round(x),
    y: Math.round(y),
    width: Math.round(width),
    height: Math.round(height),
  };
}

// ── Main Export ─────────────────────────────────────────────────────

async function main() {
  console.log('=== Figma Prototype Export ===\n');

  // Load manifest
  const manifest: ManifestEntry[] = JSON.parse(
    fs.readFileSync(MANIFEST_PATH, 'utf-8'),
  );
  console.log(`Loaded manifest: ${manifest.length} screens`);

  // Ensure output dirs
  fs.mkdirSync(SCREENS_DIR, { recursive: true });

  // Launch browser
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 500, height: 950 },
    deviceScaleFactor: 2, // retina screenshots
  });
  const page = await context.newPage();

  // Load prototype
  const fileUrl = `file://${PROTOTYPE_PATH}`;
  console.log(`Loading: ${fileUrl}`);
  await page.goto(fileUrl, { waitUntil: 'networkidle' });

  // Wait for Proto to initialize
  await page.waitForFunction(() => (window as any).Proto !== undefined, {
    timeout: 10000,
  });
  console.log('Proto initialized\n');

  // Hide dev tools panel so it doesn't appear in screenshots
  await page.evaluate(() => {
    const devTools = document.getElementById('proto-dev-tools');
    if (devTools) devTools.style.display = 'none';
    // Also hide any other overlay elements
    const style = document.createElement('style');
    style.textContent = '#proto-dev-tools, .proto-dev-tools { display: none !important; }';
    document.head.appendChild(style);
  });

  // Get the device element handle — we need its position for relative coords
  const deviceHandle = await page.$('.proto-device');
  if (!deviceHandle) throw new Error('.proto-device element not found');

  // ── Measure tab bar once (on a screen that has it) ──
  const tabBarScreen = manifest.find((s) => s.hasTabBar);
  let tabBarTabs: TabBarTab[] = [];
  let tabBarHeight = 83;

  if (tabBarScreen) {
    await navigateToScreen(page, tabBarScreen.screenId);
    await page.waitForTimeout(200);

    const tabData = await page.evaluate(() => {
      const tabBar = document.getElementById('proto-tab-bar');
      if (!tabBar) return null;
      const device = document.querySelector('.proto-device') as HTMLElement;
      if (!device) return null;
      const deviceRect = device.getBoundingClientRect();
      const tabBarRect = tabBar.getBoundingClientRect();

      const TAB_TARGETS: Record<string, string> = {
        Home: 'S6',
        Track: 'S9',
        Tips: 'S11',
        Learn: 'S12',
        Consult: 'S14',
      };

      const tabs: Array<{
        name: string;
        target: string;
        x: number;
        y: number;
        width: number;
        height: number;
      }> = [];

      const items = tabBar.querySelectorAll('.proto-tab-item');
      items.forEach((item) => {
        const name = (item as HTMLElement).dataset.tab || item.textContent?.trim() || '';
        const rect = item.getBoundingClientRect();
        tabs.push({
          name,
          target: TAB_TARGETS[name] || 'S6',
          x: Math.round(rect.left - deviceRect.left),
          y: Math.round(rect.top - deviceRect.top),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        });
      });

      return {
        height: Math.round(tabBarRect.height),
        tabs,
      };
    });

    if (tabData) {
      tabBarHeight = tabData.height;
      tabBarTabs = tabData.tabs;
      console.log(`Tab bar measured: ${tabBarTabs.length} tabs, height=${tabBarHeight}px`);
    }
  }

  // ── Process each screen ──
  const screens: ScreenData[] = [];
  const autoDelays: AutoDelay[] = [];
  let totalHotspots = 0;
  const allScreenIds = new Set(manifest.map((m) => m.screenId));

  for (let i = 0; i < manifest.length; i++) {
    const entry = manifest[i];
    const { screenId, label, hasTabBar } = entry;

    process.stdout.write(
      `  [${i + 1}/${manifest.length}] ${screenId} — ${label}...`,
    );

    // Navigate to screen (instant, no animation)
    await navigateToScreen(page, screenId);
    await page.waitForTimeout(150); // let render settle

    // Screenshot the device element
    const imgPath = path.join(SCREENS_DIR, `${screenId}.png`);
    await deviceHandle.screenshot({
      path: imgPath,
      type: 'png',
    });

    // Extract hotspots
    const hotspots = await extractHotspots(page, screenId, allScreenIds);
    totalHotspots += hotspots.length;

    // Extract auto-delay
    const autoDelay = await page.evaluate((sid: string) => {
      const el = document.getElementById(sid);
      if (!el) return null;
      const delay = el.getAttribute('data-auto-delay');
      const target = el.getAttribute('data-auto-target');
      const transition = el.getAttribute('data-auto-transition') || 'dissolve';
      if (delay && target) {
        return {
          screenId: sid,
          delayMs: parseInt(delay, 10),
          target,
          transition,
        };
      }
      return null;
    }, screenId);

    if (autoDelay) {
      autoDelays.push(autoDelay);
    }

    screens.push({
      screenId,
      label,
      hasTabBar,
      imageFile: `screens/${screenId}.png`,
      hotspots,
    });

    console.log(` ${hotspots.length} hotspots${autoDelay ? ' + auto-delay' : ''}`);
  }

  await browser.close();

  // ── Validate targets ──
  let missingTargets = 0;
  for (const screen of screens) {
    for (const hotspot of screen.hotspots) {
      if (hotspot.target && !allScreenIds.has(hotspot.target)) {
        console.warn(
          `  WARNING: ${screen.screenId} hotspot "${hotspot.id}" targets unknown screen "${hotspot.target}"`,
        );
        missingTargets++;
      }
    }
  }
  for (const ad of autoDelays) {
    if (!allScreenIds.has(ad.target)) {
      console.warn(
        `  WARNING: Auto-delay on ${ad.screenId} targets unknown screen "${ad.target}"`,
      );
      missingTargets++;
    }
  }

  // Count tab-bar screens
  const tabBarScreens = screens.filter((s) => s.hasTabBar).length;
  const tabConnections = tabBarScreens * tabBarTabs.length;

  // ── Write bundle (without base64 — images are separate files) ──
  const bundle: FigmaBundle = {
    version: 1,
    dimensions: { width: DEVICE_WIDTH, height: DEVICE_HEIGHT },
    startScreen: 'S1',
    screens,
    tabBar: {
      height: tabBarHeight,
      tabs: tabBarTabs,
    },
    autoDelays,
  };

  fs.writeFileSync(BUNDLE_PATH, JSON.stringify(bundle, null, 2));

  // ── Summary ──
  console.log('\n=== Export Summary ===');
  console.log(`  Screens:         ${screens.length}`);
  console.log(`  Hotspots:        ${totalHotspots}`);
  console.log(`  Tab-bar screens: ${tabBarScreens}`);
  console.log(`  Tab connections: ${tabConnections}`);
  console.log(`  Auto-delays:     ${autoDelays.length}`);
  console.log(`  Total connections: ~${totalHotspots + tabConnections + autoDelays.length}`);
  console.log(`  Missing targets: ${missingTargets}`);
  console.log(`  Bundle:          ${BUNDLE_PATH}`);
  console.log(`  Screenshots:     ${SCREENS_DIR}/`);
  console.log('\nDone!');
}

// ── Navigate to screen (instant, no transition) ──

async function navigateToScreen(page: Page, screenId: string) {
  await page.evaluate((sid: string) => {
    (window as any).Proto.navigateTo(sid, 'none', false);
  }, screenId);
}

// ── Extract hotspots from current screen ──

async function extractHotspots(
  page: Page,
  screenId: string,
  allScreenIds: Set<string>,
): Promise<Hotspot[]> {
  const raw = await page.evaluate((sid: string) => {
    const screen = document.getElementById(sid);
    if (!screen) return [];

    const device = document.querySelector('.proto-device') as HTMLElement;
    if (!device) return [];
    const deviceRect = device.getBoundingClientRect();

    const results: Array<{
      type: string;
      target: string | null;
      transition: string;
      x: number;
      y: number;
      width: number;
      height: number;
      text: string;
    }> = [];

    // data-nav elements
    screen.querySelectorAll('[data-nav]').forEach((el) => {
      const rect = el.getBoundingClientRect();
      const target = (el as HTMLElement).dataset.nav || null;
      const transition = (el as HTMLElement).dataset.transition || 'push';
      results.push({
        type: 'nav',
        target,
        transition,
        x: rect.left - deviceRect.left,
        y: rect.top - deviceRect.top,
        width: rect.width,
        height: rect.height,
        text: (el as HTMLElement).innerText?.trim().substring(0, 40) || '',
      });
    });

    // data-back elements
    screen.querySelectorAll('[data-back]').forEach((el) => {
      const rect = el.getBoundingClientRect();
      results.push({
        type: 'back',
        target: null,
        transition: 'back',
        x: rect.left - deviceRect.left,
        y: rect.top - deviceRect.top,
        width: rect.width,
        height: rect.height,
        text: 'Back',
      });
    });

    // data-modal elements
    screen.querySelectorAll('[data-modal]').forEach((el) => {
      const rect = el.getBoundingClientRect();
      const target = (el as HTMLElement).dataset.modal || null;
      results.push({
        type: 'modal',
        target,
        transition: 'modal',
        x: rect.left - deviceRect.left,
        y: rect.top - deviceRect.top,
        width: rect.width,
        height: rect.height,
        text: (el as HTMLElement).innerText?.trim().substring(0, 40) || '',
      });
    });

    // data-dismiss elements
    screen.querySelectorAll('[data-dismiss]').forEach((el) => {
      const rect = el.getBoundingClientRect();
      results.push({
        type: 'dismiss',
        target: null,
        transition: 'dismiss',
        x: rect.left - deviceRect.left,
        y: rect.top - deviceRect.top,
        width: rect.width,
        height: rect.height,
        text: 'Dismiss',
      });
    });

    return results;
  }, screenId);

  // Post-process: clamp, enforce minimums, filter out-of-viewport, sort largest-first
  const hotspots: Hotspot[] = [];
  let idx = 0;

  for (const r of raw) {
    // Skip elements that are entirely outside the viewport
    if (r.x + r.width <= 0 || r.y + r.height <= 0) continue;
    if (r.x >= DEVICE_WIDTH || r.y >= DEVICE_HEIGHT) continue;
    // Skip zero-size elements
    if (r.width <= 0 || r.height <= 0) continue;

    const clamped = clampRect(r, DEVICE_WIDTH, DEVICE_HEIGHT);

    hotspots.push({
      id: `${screenId}_${r.type}_${idx++}`,
      ...clamped,
      type: r.type as Hotspot['type'],
      target: r.target,
      transition: r.transition,
      label: r.text,
    });
  }

  // Sort largest-first so smaller, more specific hotspots render on top in Figma
  hotspots.sort((a, b) => b.width * b.height - a.width * a.height);

  return hotspots;
}

// ── Run ─────────────────────────────────────────────────────────────

main().catch((err) => {
  console.error('Export failed:', err);
  process.exit(1);
});
