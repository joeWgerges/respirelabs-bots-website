import { atom } from 'nanostores';

/**
 * Dark mode theme store.
 *
 * Manages the dark/light theme state across all React islands via nanostores.
 * The theme preference is persisted to localStorage under the key "theme"
 * and applied by toggling the `.dark` class on the <html> element.
 *
 * On first visit, the system preference (prefers-color-scheme: dark) is used.
 * After the user manually toggles, their explicit choice takes priority.
 */

const STORAGE_KEY = 'theme';

/**
 * Reads the initial dark mode state.
 * Returns true if dark mode should be active, false otherwise.
 *
 * Priority:
 *   1. Saved preference in localStorage
 *   2. Default to light mode (always)
 */
function getInitialDark(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  return localStorage.getItem(STORAGE_KEY) === 'dark';
}

/** Atom holding the current dark mode state. */
export const isDark = atom<boolean>(getInitialDark());

/**
 * Applies the current theme to the DOM.
 * Adds or removes the `.dark` class on <html> and updates the
 * `meta[name="theme-color"]` tag for browser chrome.
 */
function applyTheme(dark: boolean): void {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  if (dark) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }

  // Update theme-color meta tag so browser chrome adapts
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute('content', dark ? '#0a0f1e' : '#FAFAFA');
  }
}

/**
 * Toggles between dark and light mode.
 * Updates the atom, persists the choice to localStorage,
 * and applies the `.dark` class to <html>.
 */
export function toggleTheme(): void {
  const next = !isDark.get();
  isDark.set(next);
  localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light');
  applyTheme(next);
}

/**
 * Explicitly sets the theme to dark or light.
 * Useful for programmatic control (e.g., resetting to system preference).
 */
export function setTheme(dark: boolean): void {
  isDark.set(dark);
  localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light');
  applyTheme(dark);
}

// --- Initialization ---
// Apply theme on module load (client-side only).
// This covers the case where the store is imported after the inline
// <head> script has already run — it ensures the atom and DOM stay in sync.
if (typeof window !== 'undefined') {
  applyTheme(isDark.get());
}
