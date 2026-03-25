"use strict";
/**
 * Figma Plugin: RespireLabs Prototype Importer
 *
 * Reads the figma-bundle.json export and creates:
 *   - 121 frames (393x852) with screenshot images
 *   - Invisible hotspot rectangles with prototype connections
 *   - Tab bar click targets on all hasTabBar screens
 *   - Auto-delay reactions on splash/loading screens
 *   - Flow starting point at S1
 *
 * Compile: npx tsc code.ts --target ES2017 --lib ES2017
 */
// ── State ───────────────────────────────────────────────────────────
let meta = null;
const frameMap = new Map(); // screenId → Figma frame
const imageQueue = []; // screens waiting for image data
let totalConnections = 0;
// ── Constants ───────────────────────────────────────────────────────
const GRID_COLS = 12;
const GRID_GAP_X = 80;
const GRID_GAP_Y = 120;
// ── Plugin Entry Point ──────────────────────────────────────────────
figma.showUI(__html__, { width: 400, height: 640 });
figma.ui.onmessage = async (msg) => {
    try {
        if (msg.type === 'start-import') {
            meta = msg.meta;
            await phase1_createFrames();
            // Request first image
            figma.ui.postMessage({ type: 'request-next-image' });
        }
        else if (msg.type === 'image-data') {
            if (!meta)
                return;
            const screenId = msg.screenId;
            const frame = frameMap.get(screenId);
            if (frame && msg.bytes) {
                const image = figma.createImage(msg.bytes);
                const imgRect = figma.createRectangle();
                imgRect.name = 'Screenshot';
                imgRect.resize(meta.dimensions.width, meta.dimensions.height);
                imgRect.x = 0;
                imgRect.y = 0;
                imgRect.fills = [{
                        type: 'IMAGE',
                        imageHash: image.hash,
                        scaleMode: 'FILL',
                    }];
                imgRect.locked = true;
                frame.appendChild(imgRect);
            }
            // Track progress
            const idx = meta.screens.findIndex(s => s.screenId === screenId);
            sendProgress('Phase 1: Creating frames + images', idx + 1, meta.screens.length, screenId);
            // Check if all images received
            if (idx === meta.screens.length - 1) {
                // All images received, proceed to phase 2
                await phase2_createHotspots();
                await phase3_wireAutoDelays();
                await phase4_setFlowStart();
                finish();
            }
            else {
                figma.ui.postMessage({ type: 'request-next-image' });
            }
        }
    }
    catch (err) {
        figma.ui.postMessage({ type: 'error', text: err.message || String(err) });
    }
};
// ── Phase 1: Create frames ─────────────────────────────────────────
async function phase1_createFrames() {
    if (!meta)
        return;
    const { width, height } = meta.dimensions;
    sendLog(`Creating ${meta.screens.length} frames...`);
    for (let i = 0; i < meta.screens.length; i++) {
        const screen = meta.screens[i];
        const col = i % GRID_COLS;
        const row = Math.floor(i / GRID_COLS);
        const frame = figma.createFrame();
        frame.name = `${screen.screenId} — ${screen.label}`;
        frame.resize(width, height);
        frame.x = col * (width + GRID_GAP_X);
        frame.y = row * (height + GRID_GAP_Y);
        frame.clipsContent = true;
        // Set background to white
        frame.fills = [{ type: 'SOLID', color: { r: 0.98, g: 0.98, b: 0.98 } }];
        frameMap.set(screen.screenId, frame);
    }
    sendLog(`Created ${frameMap.size} frames`);
}
// ── Phase 2: Create hotspot rectangles + wire connections ───────────
async function phase2_createHotspots() {
    var _a;
    if (!meta)
        return;
    sendLog('Phase 2: Wiring hotspot connections...');
    let hotspotCount = 0;
    for (let i = 0; i < meta.screens.length; i++) {
        const screen = meta.screens[i];
        const frame = frameMap.get(screen.screenId);
        if (!frame)
            continue;
        sendProgress('Phase 2: Wiring hotspots', i + 1, meta.screens.length, screen.screenId);
        // Create hotspot rectangles (sorted largest-first in export, so smaller on top)
        for (const hotspot of screen.hotspots) {
            const rect = createHotspotRect(frame, hotspot);
            const reaction = buildReaction(hotspot);
            if (reaction) {
                await rect.setReactionsAsync([reaction]);
                totalConnections++;
            }
            hotspotCount++;
        }
        // Tab bar hotspots for hasTabBar screens
        if (screen.hasTabBar && ((_a = meta.tabBar) === null || _a === void 0 ? void 0 : _a.tabs)) {
            for (const tab of meta.tabBar.tabs) {
                const tabRect = createTabHotspotRect(frame, tab);
                const targetFrame = frameMap.get(tab.target);
                if (targetFrame) {
                    const reaction = {
                        trigger: { type: 'ON_CLICK' },
                        actions: [{
                                type: 'NODE',
                                destinationId: targetFrame.id,
                                navigation: 'NAVIGATE',
                                transition: null, // instant
                                preserveScrollPosition: false,
                            }],
                    };
                    await tabRect.setReactionsAsync([reaction]);
                    totalConnections++;
                }
            }
        }
    }
    sendLog(`Created ${hotspotCount} hotspot rects + tab bar connections`);
}
// ── Phase 3: Wire auto-delays ──────────────────────────────────────
async function phase3_wireAutoDelays() {
    if (!meta)
        return;
    sendLog('Phase 3: Wiring auto-delays...');
    for (const ad of meta.autoDelays) {
        const frame = frameMap.get(ad.screenId);
        const targetFrame = frameMap.get(ad.target);
        if (!frame || !targetFrame) {
            sendLog(`Skipping auto-delay: ${ad.screenId} → ${ad.target} (missing frame)`);
            continue;
        }
        const transition = buildTransitionEffect(ad.transition);
        const reaction = {
            trigger: {
                type: 'AFTER_TIMEOUT',
                timeout: ad.delayMs / 1000, // Figma uses seconds
            },
            actions: [{
                    type: 'NODE',
                    destinationId: targetFrame.id,
                    navigation: 'NAVIGATE',
                    transition,
                    preserveScrollPosition: false,
                }],
        };
        // Merge with existing reactions (if any hotspots are on the frame itself)
        const existing = frame.reactions || [];
        await frame.setReactionsAsync([...existing, reaction]);
        totalConnections++;
        sendProgress('Phase 3: Auto-delays', meta.autoDelays.indexOf(ad) + 1, meta.autoDelays.length, `${ad.screenId} → ${ad.target}`);
    }
    sendLog(`Wired ${meta.autoDelays.length} auto-delays`);
}
// ── Phase 4: Set flow starting point ───────────────────────────────
async function phase4_setFlowStart() {
    if (!meta)
        return;
    const startFrame = frameMap.get(meta.startScreen);
    if (startFrame) {
        figma.currentPage.flowStartingPoints = [{
                nodeId: startFrame.id,
                name: 'Main Flow',
            }];
        sendLog(`Flow starting point set: ${meta.startScreen}`);
    }
}
// ── Helpers ─────────────────────────────────────────────────────────
function createHotspotRect(parent, hotspot) {
    const rect = figma.createRectangle();
    rect.name = `hotspot: ${hotspot.label || hotspot.id} [${hotspot.type}→${hotspot.target || 'back'}]`;
    rect.x = hotspot.x;
    rect.y = hotspot.y;
    rect.resize(Math.max(hotspot.width, 1), Math.max(hotspot.height, 1));
    rect.fills = []; // no fill
    rect.strokes = []; // no stroke
    rect.opacity = 0; // invisible (but clickable in prototype)
    parent.appendChild(rect);
    return rect;
}
function createTabHotspotRect(parent, tab) {
    const rect = figma.createRectangle();
    rect.name = `tab: ${tab.name} → ${tab.target}`;
    rect.x = tab.x;
    rect.y = tab.y;
    rect.resize(Math.max(tab.width, 1), Math.max(tab.height, 1));
    rect.fills = [];
    rect.strokes = [];
    rect.opacity = 0;
    parent.appendChild(rect);
    return rect;
}
function buildReaction(hotspot) {
    // BACK navigation (data-back or data-dismiss)
    if (hotspot.type === 'back' || hotspot.type === 'dismiss') {
        return {
            trigger: { type: 'ON_CLICK' },
            actions: [{
                    type: 'BACK',
                    navigation: 'BACK',
                }],
        };
    }
    // Forward navigation (data-nav, data-modal)
    if (!hotspot.target)
        return null;
    const targetFrame = frameMap.get(hotspot.target);
    if (!targetFrame)
        return null;
    // Modal overlay
    if (hotspot.type === 'modal') {
        return {
            trigger: { type: 'ON_CLICK' },
            actions: [{
                    type: 'NODE',
                    destinationId: targetFrame.id,
                    navigation: 'OVERLAY',
                    transition: {
                        type: 'MOVE_IN',
                        direction: 'BOTTOM',
                        matchLayers: false,
                        duration: 0.4,
                        easing: { type: 'EASE_OUT' },
                    },
                    preserveScrollPosition: false,
                    overlayRelativePosition: { x: 0, y: 0 },
                }],
        };
    }
    // Standard nav
    const transition = buildTransitionEffect(hotspot.transition);
    const navigation = 'NAVIGATE';
    return {
        trigger: { type: 'ON_CLICK' },
        actions: [{
                type: 'NODE',
                destinationId: targetFrame.id,
                navigation,
                transition,
                preserveScrollPosition: false,
            }],
    };
}
function buildTransitionEffect(type) {
    switch (type) {
        case 'push':
            return {
                type: 'SLIDE_IN',
                direction: 'LEFT',
                matchLayers: false,
                duration: 0.3,
                easing: { type: 'EASE_OUT' },
            };
        case 'back':
            return {
                type: 'SLIDE_IN',
                direction: 'RIGHT',
                matchLayers: false,
                duration: 0.3,
                easing: { type: 'EASE_OUT' },
            };
        case 'dissolve':
            return {
                type: 'DISSOLVE',
                matchLayers: false,
                duration: 0.4,
                easing: { type: 'EASE_OUT' },
            };
        case 'modal':
            return {
                type: 'MOVE_IN',
                direction: 'BOTTOM',
                matchLayers: false,
                duration: 0.4,
                easing: { type: 'EASE_OUT' },
            };
        case 'none':
        case 'tab':
            return null; // instant
        default:
            return {
                type: 'DISSOLVE',
                matchLayers: false,
                duration: 0.3,
                easing: { type: 'EASE_OUT' },
            };
    }
}
function finish() {
    if (!meta)
        return;
    const summary = `Imported: ${meta.screens.length} frames, ${totalConnections} connections`;
    figma.ui.postMessage({ type: 'done', summary });
    figma.notify(summary);
    // Zoom to fit
    const frames = Array.from(frameMap.values());
    if (frames.length > 0) {
        figma.viewport.scrollAndZoomIntoView(frames);
    }
}
function sendProgress(phase, current, total, detail) {
    figma.ui.postMessage({ type: 'progress', phase, current, total, detail });
}
function sendLog(text, level) {
    figma.ui.postMessage({ type: 'log', text, level });
}
