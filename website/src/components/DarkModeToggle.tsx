import { useStore } from '@nanostores/react';
import { isDark, toggleTheme } from '../stores/theme';

/**
 * DarkModeToggle — React island for switching between light and dark mode.
 *
 * Renders a pill-shaped button with an animated sun/moon icon.
 * Reads state from the `isDark` nanostore atom so all islands
 * stay in sync. Must be hydrated with `client:load` to prevent
 * a flash of the wrong icon.
 */
export default function DarkModeToggle() {
  const dark = useStore(isDark);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative flex items-center justify-center w-9 h-9 rounded-full border border-black/[0.08] bg-white/60 backdrop-blur-sm hover:bg-black/[0.04] dark:border-white/10 dark:bg-white/[0.06] dark:hover:bg-white/[0.12] focus-ring transition-all duration-200 cursor-pointer"
    >
      {/* Sun icon — visible in dark mode (click to go light) */}
      <svg
        className={`absolute w-[18px] h-[18px] transition-all duration-300 ${
          dark
            ? 'opacity-100 rotate-0 scale-100'
            : 'opacity-0 rotate-90 scale-0'
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v1.5M12 19.5V21M4.219 4.219l1.06 1.06M17.72 17.72l1.06 1.06M3 12h1.5M19.5 12H21M4.219 19.781l1.06-1.06M17.72 6.28l1.06-1.06"
        />
        <circle cx={12} cy={12} r={4} strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      {/* Moon icon — visible in light mode (click to go dark) */}
      <svg
        className={`absolute w-[18px] h-[18px] transition-all duration-300 ${
          dark
            ? 'opacity-0 -rotate-90 scale-0'
            : 'opacity-100 rotate-0 scale-100'
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.752 15.002A9.718 9.718 0 0118 15.75 9.75 9.75 0 018.25 6c0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 12c0 5.385 4.365 9.75 9.75 9.75 4.638 0 8.53-3.24 9.502-7.574.107-.46.287-.903.5-1.174z"
        />
      </svg>
    </button>
  );
}
