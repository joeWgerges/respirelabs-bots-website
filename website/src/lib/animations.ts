/**
 * GSAP Animation Foundation for RespireLabs Website
 *
 * Provides reusable animation presets, ScrollTrigger initialization,
 * counter animations, and cleanup utilities for Astro view transitions.
 *
 * Usage: Dynamically imported in Layout.astro to avoid blocking initial render.
 * All animations respect `prefers-reduced-motion`.
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ---------------------------------------------------------------------------
// Reduced-motion detection
// ---------------------------------------------------------------------------

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------------------------------------------------------------------------
// Animation presets (match WEBSITE_SPEC.md exactly)
// ---------------------------------------------------------------------------

export const presets = {
  fadeUp: {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  },
  fadeIn: {
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
  },
  slideInLeft: {
    x: -80,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  },
  slideInRight: {
    x: 80,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  },
  scaleIn: {
    scale: 0.9,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  },
  textReveal: {
    y: '100%',
    duration: 1.2,
    ease: 'power4.out',
    stagger: 0.08,
  },
  parallax: {
    y: -100,
    ease: 'none',
  },
} as const;

// ---------------------------------------------------------------------------
// ScrollTrigger defaults
// ---------------------------------------------------------------------------

ScrollTrigger.defaults({
  start: 'top 80%',
  end: 'bottom 20%',
  toggleActions: 'play none none none',
});

// ---------------------------------------------------------------------------
// Individual animation helpers (can be used directly from page scripts)
// ---------------------------------------------------------------------------

/**
 * Animate an element with the "fade up" preset.
 */
export function fadeUp(
  element: gsap.TweenTarget,
  vars?: gsap.TweenVars,
): gsap.core.Tween {
  return gsap.from(element, {
    ...presets.fadeUp,
    scrollTrigger: element as Element,
    ...vars,
  });
}

/**
 * Animate an element with a simple opacity fade-in.
 */
export function fadeIn(
  element: gsap.TweenTarget,
  vars?: gsap.TweenVars,
): gsap.core.Tween {
  return gsap.from(element, {
    ...presets.fadeIn,
    scrollTrigger: element as Element,
    ...vars,
  });
}

/**
 * Animate an element sliding in from the left.
 */
export function fadeLeft(
  element: gsap.TweenTarget,
  vars?: gsap.TweenVars,
): gsap.core.Tween {
  return gsap.from(element, {
    ...presets.slideInLeft,
    scrollTrigger: element as Element,
    ...vars,
  });
}

/**
 * Animate an element sliding in from the right.
 */
export function fadeRight(
  element: gsap.TweenTarget,
  vars?: gsap.TweenVars,
): gsap.core.Tween {
  return gsap.from(element, {
    ...presets.slideInRight,
    scrollTrigger: element as Element,
    ...vars,
  });
}

/**
 * Stagger-animate a set of child elements (e.g., feature cards in a grid).
 */
export function stagger(
  elements: gsap.TweenTarget,
  vars?: gsap.TweenVars,
): gsap.core.Tween {
  return gsap.from(elements, {
    ...presets.fadeUp,
    stagger: 0.1,
    scrollTrigger: {
      trigger: (elements as Element[])[0]?.parentElement ?? (elements as Element),
      start: 'top 80%',
    },
    ...vars,
  });
}

/**
 * Apply a parallax scroll effect to an element.
 * `speed` controls the amount of vertical offset (positive = move up slower).
 */
export function parallax(
  element: gsap.TweenTarget,
  speed: number = 0.3,
  vars?: gsap.TweenVars,
): gsap.core.Tween {
  const yOffset = speed * -200;
  return gsap.to(element, {
    y: yOffset,
    ease: 'none',
    scrollTrigger: {
      trigger: element as Element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
    ...vars,
  });
}

// ---------------------------------------------------------------------------
// Counter animation (0 -> target number)
// ---------------------------------------------------------------------------

/**
 * Animates a number from 0 to `target` inside the given element.
 * Supports optional `suffix` (e.g., "+", "%", "K") and `prefix` (e.g., "$").
 */
export function initCounterAnimation(
  element: HTMLElement,
  target: number,
  options?: {
    duration?: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
  },
): gsap.core.Tween | null {
  if (prefersReducedMotion()) {
    // Show final value immediately
    const prefix = options?.prefix ?? '';
    const suffix = options?.suffix ?? '';
    const decimals = options?.decimals ?? 0;
    element.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
    return null;
  }

  const obj = { value: 0 };
  const duration = options?.duration ?? 2;
  const prefix = options?.prefix ?? '';
  const suffix = options?.suffix ?? '';
  const decimals = options?.decimals ?? 0;

  return gsap.to(obj, {
    value: target,
    duration,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
    },
    onUpdate() {
      element.textContent = `${prefix}${obj.value.toFixed(decimals)}${suffix}`;
    },
  });
}

// ---------------------------------------------------------------------------
// Batch initializer: find all GSAP-class elements and animate them
// ---------------------------------------------------------------------------

/**
 * Scans the DOM for elements with GSAP animation classes and applies
 * the appropriate ScrollTrigger animations.
 *
 * Recognized classes:
 * - `.gsap-reveal`       -> fade up
 * - `.gsap-fade-in`      -> fade in (opacity only)
 * - `.gsap-fade-left`    -> slide in from left
 * - `.gsap-fade-right`   -> slide in from right
 * - `.gsap-stagger`      -> stagger children with `.gsap-stagger-item`
 * - `.gsap-parallax`     -> parallax scroll effect
 * - `.gsap-counter`      -> number counter (reads data-target, data-suffix, data-prefix, data-decimals)
 *
 * Delay can be specified with `data-delay="200"` (ms) on any element.
 */
export function initScrollAnimations(): void {
  if (prefersReducedMotion()) {
    // Make all GSAP-targeted elements visible immediately
    const selectors = [
      '.gsap-reveal',
      '.gsap-fade-in',
      '.gsap-fade-left',
      '.gsap-fade-right',
      '.gsap-stagger-item',
      '.gsap-parallax',
    ];
    document.querySelectorAll(selectors.join(', ')).forEach((el) => {
      (el as HTMLElement).style.opacity = '1';
      (el as HTMLElement).style.transform = 'none';
    });
    // Still run counters (they handle reduced motion internally)
    document.querySelectorAll<HTMLElement>('.gsap-counter').forEach((el) => {
      const target = parseFloat(el.dataset.target ?? '0');
      const prefix = el.dataset.prefix ?? '';
      const suffix = el.dataset.suffix ?? '';
      const decimals = parseInt(el.dataset.decimals ?? '0', 10);
      el.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
    });
    return;
  }

  // --- Fade Up ---
  document.querySelectorAll<HTMLElement>('.gsap-reveal').forEach((el) => {
    const delay = parseFloat(el.dataset.delay ?? '0') / 1000;
    gsap.from(el, {
      ...presets.fadeUp,
      delay,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
      },
    });
  });

  // --- Fade In (opacity only) ---
  document.querySelectorAll<HTMLElement>('.gsap-fade-in').forEach((el) => {
    const delay = parseFloat(el.dataset.delay ?? '0') / 1000;
    gsap.from(el, {
      ...presets.fadeIn,
      delay,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
      },
    });
  });

  // --- Fade Left ---
  document.querySelectorAll<HTMLElement>('.gsap-fade-left').forEach((el) => {
    const delay = parseFloat(el.dataset.delay ?? '0') / 1000;
    gsap.from(el, {
      ...presets.slideInLeft,
      delay,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
      },
    });
  });

  // --- Fade Right ---
  document.querySelectorAll<HTMLElement>('.gsap-fade-right').forEach((el) => {
    const delay = parseFloat(el.dataset.delay ?? '0') / 1000;
    gsap.from(el, {
      ...presets.slideInRight,
      delay,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
      },
    });
  });

  // --- Stagger containers ---
  document.querySelectorAll<HTMLElement>('.gsap-stagger').forEach((container) => {
    const items = container.querySelectorAll<HTMLElement>('.gsap-stagger-item');
    if (items.length === 0) return;
    const staggerDelay = parseFloat(container.dataset.stagger ?? '100') / 1000;
    gsap.from(items, {
      ...presets.fadeUp,
      stagger: staggerDelay,
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
      },
    });
  });

  // --- Parallax ---
  document.querySelectorAll<HTMLElement>('.gsap-parallax').forEach((el) => {
    const speed = parseFloat(el.dataset.speed ?? '0.3');
    parallax(el, speed);
  });

  // --- Counters ---
  document.querySelectorAll<HTMLElement>('.gsap-counter').forEach((el) => {
    const target = parseFloat(el.dataset.target ?? '0');
    const prefix = el.dataset.prefix ?? '';
    const suffix = el.dataset.suffix ?? '';
    const decimals = parseInt(el.dataset.decimals ?? '0', 10);
    const duration = parseFloat(el.dataset.duration ?? '2');
    initCounterAnimation(el, target, { duration, prefix, suffix, decimals });
  });
}

// ---------------------------------------------------------------------------
// Cleanup for Astro view transitions
// ---------------------------------------------------------------------------

/**
 * Kill all ScrollTrigger instances and GSAP tweens.
 * Call this before Astro view transition swap to prevent memory leaks
 * and stale scroll triggers.
 */
export function cleanupAnimations(): void {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  gsap.killTweensOf('*');
}

/**
 * Refresh ScrollTrigger calculations.
 * Useful after dynamic content changes or layout shifts.
 */
export function refreshScrollTrigger(): void {
  ScrollTrigger.refresh();
}
