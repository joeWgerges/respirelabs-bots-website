import { atom } from 'nanostores';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Supported language codes. Mirrors the Lang type from lib/i18n.ts. */
export type Lang = 'en' | 'de' | 'pl';

const SUPPORTED_LANGS: readonly Lang[] = ['en', 'de', 'pl'] as const;
const STORAGE_KEY = 'preferred-lang';
const DEFAULT_LANG: Lang = 'en';

// ---------------------------------------------------------------------------
// Localized path map
// ---------------------------------------------------------------------------
// Canonical paths for every page keyed by a page identifier.
// This mirrors the map in Header.astro so the store can resolve the
// equivalent URL when the user switches language.

const localizedPaths: Record<string, Record<Lang, string>> = {
  index: { en: '/en', de: '/de', pl: '/pl' },
  app: { en: '/en/app', de: '/de/app', pl: '/pl/aplikacja' },
  'smart-mouth-tape': {
    en: '/en/smart-mouth-tape',
    de: '/de/smart-mouth-tape',
    pl: '/pl/inteligentna-tasma',
  },
  'how-it-works': { en: '/en/how-it-works', de: '/de/so-funktionierts', pl: '/pl/jak-to-dziala' },
  'science-safety': {
    en: '/en/science-safety',
    de: '/de/wissenschaft-sicherheit',
    pl: '/pl/nauka-i-bezpieczenstwo',
  },
  compare: { en: '/en/compare', de: '/de/vergleich', pl: '/pl/porownanie' },
  waitlist: { en: '/en/waitlist', de: '/de/warteliste', pl: '/pl/lista-oczekujacych' },
  contact: { en: '/en/contact', de: '/de/kontakt', pl: '/pl/kontakt' },
  about: { en: '/en/about', de: '/de/ueber-uns', pl: '/pl/o-nas' },
  privacy: { en: '/en/privacy', de: '/de/datenschutz', pl: '/pl/polityka-prywatnosci' },
  terms: { en: '/en/terms', de: '/de/terms', pl: '/pl/regulamin' },
  'data-deletion': { en: '/en/data-deletion', de: '/de/data-deletion', pl: '/pl/usuwanie-danych' },
  cookies: { en: '/en/cookies', de: '/de/cookies', pl: '/pl/cookies' },
  faq: { en: '/en/faq', de: '/de/faq', pl: '/pl/faq' },
  blog: { en: '/en/blog', de: '/de/blog', pl: '/pl/blog' },
  pricing: { en: '/en/pricing', de: '/de/pricing', pl: '/pl/cennik' },
  press: { en: '/en/press', de: '/de/press', pl: '/pl/prasa' },
  facts: { en: '/en/facts', de: '/de/facts', pl: '/pl/fakty' },
  // Blog posts
  'blog/01': {
    en: '/en/blog/01-mouth-breathing-vs-nasal-breathing',
    de: '/de/blog/01-mundatmung-vs-nasenatmung',
    pl: '/pl/blog/01-oddychanie-ustami-vs-nosem',
  },
  'blog/02': {
    en: '/en/blog/02-mouth-taping-safety',
    de: '/de/blog/02-mouth-taping-sicherheit',
    pl: '/pl/blog/02-tasmowanie-ust-bezpieczenstwo',
  },
  'blog/03': {
    en: '/en/blog/03-daytime-nasal-breathing-training',
    de: '/de/blog/03-nasenatmung-tagsueber-trainieren',
    pl: '/pl/blog/03-dzienny-trening-oddychania-nosem',
  },
};

// Reverse lookup: normalized path -> { pageKey, lang }
const pathToPage: Record<string, { key: string; lang: Lang }> = {};

for (const [pageKey, langs] of Object.entries(localizedPaths)) {
  for (const lang of SUPPORTED_LANGS) {
    const path = langs[lang];
    if (path) {
      pathToPage[normalizePath(path)] = { key: pageKey, lang };
    }
  }
}

// Legacy DE paths that used English slugs (still accessible via redirects /
// old bookmarks). Map them to the correct page key so language switching
// works even if the user lands on one of these.
const legacyDePaths: Record<string, string> = {
  '/de/how-it-works': 'how-it-works',
  '/de/science-safety': 'science-safety',
  '/de/compare': 'compare',
  '/de/waitlist': 'waitlist',
  '/de/contact': 'contact',
  '/de/about': 'about',
};

for (const [path, pageKey] of Object.entries(legacyDePaths)) {
  pathToPage[normalizePath(path)] = { key: pageKey, lang: 'de' };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Remove trailing slash for consistent comparison. */
function normalizePath(path: string): string {
  return path.replace(/\/$/, '') || '/';
}

/** Return true if `value` is a supported language code. */
function isSupportedLang(value: unknown): value is Lang {
  return typeof value === 'string' && (SUPPORTED_LANGS as readonly string[]).includes(value);
}

/**
 * Extract the language prefix from a URL pathname.
 *
 * @example
 * getLanguageFromURL('/de/smart-mouth-tape') // => 'de'
 * getLanguageFromURL('/en')                  // => 'en'
 * getLanguageFromURL('/unknown/page')        // => 'en' (default)
 */
export function getLanguageFromURL(pathname?: string): Lang {
  const path = pathname ?? (typeof window !== 'undefined' ? window.location.pathname : '/');
  const match = path.match(/^\/(en|de|pl)(?:\/|$)/);
  if (match && isSupportedLang(match[1])) {
    return match[1];
  }
  return DEFAULT_LANG;
}

/**
 * Resolve the equivalent path in another language.
 *
 * If the current path is known in the localized-paths map the exact
 * localized URL is returned. Otherwise the function performs a simple
 * prefix swap (e.g. `/en/unknown` -> `/de/unknown`), which is a safe
 * fallback for pages not yet listed in the map (e.g. newly added pages).
 */
function resolvePathForLang(currentPath: string, targetLang: Lang): string {
  const normalized = normalizePath(currentPath);
  const pageInfo = pathToPage[normalized];

  if (pageInfo) {
    const resolved = localizedPaths[pageInfo.key]?.[targetLang];
    if (resolved) return resolved;
  }

  // Fallback: simple prefix replacement
  return normalized.replace(/^\/(en|de|pl)/, `/${targetLang}`);
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

/**
 * Reactive atom holding the current language.
 *
 * Initialized lazily on first access (browser-only) from the URL path.
 * During SSR / static build this defaults to 'en' and should not be
 * relied upon -- use the `lang` prop passed through Astro frontmatter
 * instead.
 */
export const currentLang = atom<Lang>(DEFAULT_LANG);

// ---------------------------------------------------------------------------
// Initialization (runs once when this module is first imported in the browser)
// ---------------------------------------------------------------------------

if (typeof window !== 'undefined') {
  const detected = getLanguageFromURL(window.location.pathname);
  currentLang.set(detected);

  // Persist to localStorage so the root redirect (index.astro) can use it
  // on subsequent visits without waiting for language detection.
  try {
    localStorage.setItem(STORAGE_KEY, detected);
  } catch {
    // localStorage may be unavailable (private browsing, storage full, etc.)
  }
}

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

/**
 * Switch to a different language.
 *
 * Updates the store, persists the preference to localStorage, and navigates
 * the browser to the equivalent page in the target language.
 *
 * @param lang - The language to switch to ('en' | 'de' | 'pl').
 */
export function setLanguage(lang: Lang): void {
  if (!isSupportedLang(lang)) return;

  currentLang.set(lang);

  // Persist preference
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // Silently ignore storage errors
  }

  // Navigate to the equivalent page in the new language
  if (typeof window !== 'undefined') {
    const targetPath = resolvePathForLang(window.location.pathname, lang);
    window.location.assign(targetPath);
  }
}
