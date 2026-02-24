import { useStore } from '@nanostores/react';
import { isDark, toggleTheme } from '../../stores/theme';

/**
 * DarkModeToggle — React island component for switching between light and dark themes.
 *
 * Renders a circular button with a sun icon (in dark mode, click to go light)
 * or a moon icon (in light mode, click to go dark). Icons crossfade smoothly
 * via CSS transitions.
 *
 * Uses the `isDark` nanostore atom so all React islands stay in sync.
 *
 * Accessibility:
 * - `aria-label` describes the action ("Switch to dark mode" / "Switch to light mode")
 * - `aria-pressed` reflects the current state
 * - Fully keyboard accessible (focusable button, Enter/Space to toggle)
 * - Visible focus ring using the project's `.focus-ring` utility
 *
 * Usage in Astro:
 *   <DarkModeToggle client:visible />
 */
export default function DarkModeToggle() {
  const dark = useStore(isDark);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={dark}
      className="
        relative inline-flex items-center justify-center
        w-8 h-8 rounded-full
        text-brand-dark/70 hover:text-brand-dark
        dark:text-brand-light/70 dark:hover:text-brand-light
        hover:bg-black/[0.05] dark:hover:bg-white/[0.1]
        transition-colors duration-200
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-brand-blue focus-visible:ring-offset-2
        focus-visible:ring-offset-white
        dark:focus-visible:ring-brand-yellow
        dark:focus-visible:ring-offset-brand-dark
      "
    >
      {/* Sun icon — visible in dark mode (click to switch to light) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          w-[18px] h-[18px] absolute
          transition-all duration-300 ease-in-out
          ${dark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}
        `}
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>

      {/* Moon icon — visible in light mode (click to switch to dark) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          w-[18px] h-[18px] absolute
          transition-all duration-300 ease-in-out
          ${dark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}
        `}
        aria-hidden="true"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
}
