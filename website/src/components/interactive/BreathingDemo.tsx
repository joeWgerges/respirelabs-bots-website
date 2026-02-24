import { useState, useEffect, useRef, useCallback } from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface BreathingDemoProps {
  lang?: 'en' | 'de' | 'pl';
  inhale?: number;
  hold?: number;
  exhale?: number;
}

type Phase = 'inhale' | 'hold' | 'exhale';

// ---------------------------------------------------------------------------
// Translations
// ---------------------------------------------------------------------------

const translations = {
  en: {
    breatheIn: 'Breathe In',
    hold: 'Hold',
    breatheOut: 'Breathe Out',
    start: 'Start',
    stop: 'Stop',
    cycles: 'Cycles',
    title: 'Try it now.',
    subtitle: 'Follow the circle. Breathe in through your nose.',
    pattern: 'breathing pattern',
  },
  de: {
    breatheIn: 'Einatmen',
    hold: 'Halten',
    breatheOut: 'Ausatmen',
    start: 'Start',
    stop: 'Stopp',
    cycles: 'Zyklen',
    title: 'Jetzt ausprobieren.',
    subtitle: 'Folge dem Kreis. Atme durch die Nase ein.',
    pattern: 'Atemmuster',
  },
  pl: {
    breatheIn: 'Wdech',
    hold: 'Wstrzymaj',
    breatheOut: 'Wydech',
    start: 'Start',
    stop: 'Stop',
    cycles: 'Cykle',
    title: 'Spr\u00F3buj teraz.',
    subtitle: 'Pod\u0105\u017Caj za ko\u0142em. Oddychaj przez nos.',
    pattern: 'wzorzec oddechowy',
  },
} as const;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Check if the user prefers reduced motion. */
function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function BreathingDemo({
  lang = 'en',
  inhale = 4,
  hold = 2,
  exhale = 6,
}: BreathingDemoProps) {
  const t = translations[lang] ?? translations.en;

  const totalCycle = inhale + hold + exhale;

  // ---- State ----
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState<Phase>('inhale');
  const [countdown, setCountdown] = useState(inhale);
  const [cycles, setCycles] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Scale for the breathing circle: 0 = smallest, 1 = largest.
  const [progress, setProgress] = useState(0);

  // ---- Refs ----
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef(0);
  // Track total elapsed at the moment the user last started,
  // so we can pause & resume cleanly (currently not used for pause,
  // but keeps the rAF loop simple).
  const accumulatedRef = useRef(0);

  // ---- Reduced motion detection ----
  useEffect(() => {
    setReducedMotion(prefersReducedMotion());

    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // ---- Core animation loop (requestAnimationFrame) ----
  const tick = useCallback(
    (now: number) => {
      const elapsed = (now - startTimeRef.current) / 1000 + accumulatedRef.current;
      const cycleTime = elapsed % totalCycle;

      let currentPhase: Phase;
      let phaseElapsed: number;
      let phaseDuration: number;

      if (cycleTime < inhale) {
        currentPhase = 'inhale';
        phaseElapsed = cycleTime;
        phaseDuration = inhale;
      } else if (cycleTime < inhale + hold) {
        currentPhase = 'hold';
        phaseElapsed = cycleTime - inhale;
        phaseDuration = hold;
      } else {
        currentPhase = 'exhale';
        phaseElapsed = cycleTime - inhale - hold;
        phaseDuration = exhale;
      }

      // Progress within the current phase (0 to 1).
      const phaseProgress = Math.min(phaseElapsed / phaseDuration, 1);

      // Calculate visual scale progress (0 = contracted, 1 = expanded).
      let scaleProgress: number;
      if (currentPhase === 'inhale') {
        // Ease-out: fast start, slow finish for a natural inhale feel.
        scaleProgress = 1 - Math.pow(1 - phaseProgress, 2);
      } else if (currentPhase === 'hold') {
        scaleProgress = 1;
      } else {
        // Ease-in: slow start, fast finish for a natural exhale feel.
        scaleProgress = 1 - Math.pow(phaseProgress, 2);
      }

      setPhase(currentPhase);
      setProgress(scaleProgress);
      setCountdown(Math.max(1, Math.ceil(phaseDuration - phaseElapsed)));
      setCycles(Math.floor(elapsed / totalCycle));

      rafRef.current = requestAnimationFrame(tick);
    },
    [inhale, hold, exhale, totalCycle],
  );

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = performance.now();
      rafRef.current = requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(rafRef.current);
    }

    return () => cancelAnimationFrame(rafRef.current);
  }, [isRunning, tick]);

  // ---- Handlers ----
  const handleToggle = useCallback(() => {
    if (isRunning) {
      // Stop
      cancelAnimationFrame(rafRef.current);
      setIsRunning(false);
      setPhase('inhale');
      setProgress(0);
      setCountdown(inhale);
      accumulatedRef.current = 0;
    } else {
      // Start
      setCycles(0);
      accumulatedRef.current = 0;
      setIsRunning(true);
    }
  }, [isRunning, inhale]);

  // ---- Derived values ----
  // Scale: from 0.55 (contracted) to 1.0 (expanded).
  const scale = reducedMotion ? (isRunning ? 0.85 : 0.55) : 0.55 + progress * 0.45;

  const phaseLabel =
    phase === 'inhale'
      ? t.breatheIn
      : phase === 'hold'
        ? t.hold
        : t.breatheOut;

  // Color logic:
  //   inhale -> brand-blue (#206FF7) with cyan tint
  //   hold   -> subtle blend
  //   exhale -> brand-yellow (#FFDC31)
  const phaseColors: Record<Phase, { primary: string; glow: string; bg: string }> = {
    inhale: {
      primary: '#206FF7',
      glow: 'rgba(32, 111, 247, 0.25)',
      bg: 'rgba(32, 111, 247, 0.08)',
    },
    hold: {
      primary: '#60A5FA',
      glow: 'rgba(96, 165, 250, 0.20)',
      bg: 'rgba(96, 165, 250, 0.06)',
    },
    exhale: {
      primary: '#FFDC31',
      glow: 'rgba(255, 220, 49, 0.25)',
      bg: 'rgba(255, 220, 49, 0.08)',
    },
  };

  const colors = isRunning ? phaseColors[phase] : phaseColors.inhale;

  // Gradient for the circle border (SVG-driven).
  // inhale: blue->cyan, hold: cyan pulse, exhale: yellow
  const gradientStops: Record<Phase, [string, string]> = {
    inhale: ['#206FF7', '#22D3EE'],
    hold: ['#60A5FA', '#22D3EE'],
    exhale: ['#FFDC31', '#F59E0B'],
  };

  const currentStops = isRunning ? gradientStops[phase] : gradientStops.inhale;

  // Transition duration for CSS properties.
  const transitionMs = reducedMotion ? 0 : 400;

  return (
    <div
      className="relative mx-auto w-full max-w-lg rounded-[2rem] px-6 py-12 sm:px-10 sm:py-16"
      style={{
        background: 'rgba(255, 255, 255, 0.70)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255, 255, 255, 0.10)',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)',
      }}
    >
      {/* ---- Header ---- */}
      <div className="text-center mb-10">
        <h3
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 tracking-tight"
          style={{ fontFamily: 'var(--font-oddval)', color: '#0A0A0B' }}
        >
          {t.title}
        </h3>
        <p
          className="text-base sm:text-lg font-light"
          style={{ fontFamily: 'var(--font-montserrat)', color: '#6B7280' }}
        >
          {t.subtitle}
        </p>
      </div>

      {/* ---- Breathing Circle ---- */}
      <div
        className="relative mx-auto mb-10 flex items-center justify-center"
        style={{ width: '100%', maxWidth: '300px', aspectRatio: '1 / 1' }}
      >
        {/* Outer glow ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            transform: `scale(${scale * 1.15})`,
            background: colors.bg,
            transition: `transform ${transitionMs}ms cubic-bezier(0.4, 0, 0.2, 1), background ${transitionMs}ms ease`,
          }}
          aria-hidden="true"
        />

        {/* Main circle with gradient border (SVG) */}
        <div
          className="absolute rounded-full flex items-center justify-center"
          style={{
            width: '80%',
            height: '80%',
            transform: `scale(${scale})`,
            transition: `transform ${transitionMs}ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow ${transitionMs}ms ease`,
            boxShadow: isRunning
              ? `0 0 40px ${colors.glow}, 0 0 80px ${colors.glow}`
              : '0 0 0 transparent',
          }}
          aria-hidden="true"
        >
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 200 200"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="breathing-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop
                  offset="0%"
                  stopColor={currentStops[0]}
                  style={{ transition: `stop-color ${transitionMs}ms ease` }}
                />
                <stop
                  offset="100%"
                  stopColor={currentStops[1]}
                  style={{ transition: `stop-color ${transitionMs}ms ease` }}
                />
              </linearGradient>
              <radialGradient id="breathing-fill" cx="50%" cy="50%" r="50%">
                <stop
                  offset="0%"
                  stopColor={currentStops[0]}
                  stopOpacity="0.08"
                  style={{ transition: `stop-color ${transitionMs}ms ease` }}
                />
                <stop
                  offset="100%"
                  stopColor={currentStops[1]}
                  stopOpacity="0.02"
                  style={{ transition: `stop-color ${transitionMs}ms ease` }}
                />
              </radialGradient>
            </defs>
            <circle
              cx="100"
              cy="100"
              r="96"
              fill="url(#breathing-fill)"
              stroke="url(#breathing-gradient)"
              strokeWidth="3"
            />
          </svg>

          {/* Inner subtle pulse ring during hold phase */}
          {isRunning && phase === 'hold' && !reducedMotion && (
            <div
              className="absolute inset-2 rounded-full"
              style={{
                border: `2px solid ${colors.primary}`,
                opacity: 0.3,
                animation: 'breathing-pulse 1s ease-in-out infinite',
              }}
              aria-hidden="true"
            />
          )}
        </div>

        {/* Center text content */}
        <div
          className="relative z-10 flex flex-col items-center justify-center"
          style={{ pointerEvents: 'none' }}
        >
          {/* Phase label with aria-live for screen readers */}
          <div
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="mb-1"
          >
            <span
              className="block text-xl sm:text-2xl font-bold tracking-tight"
              style={{
                fontFamily: 'var(--font-oddval)',
                color: isRunning ? colors.primary : '#0A0A0B',
                transition: `color ${transitionMs}ms ease, opacity 200ms ease`,
              }}
            >
              {isRunning ? phaseLabel : `${inhale}-${hold}-${exhale}`}
            </span>
          </div>

          {/* Countdown */}
          {isRunning && (
            <span
              className="text-sm sm:text-base font-semibold uppercase tracking-widest"
              style={{
                fontFamily: 'var(--font-montserrat)',
                color: '#6B7280',
                transition: `opacity 200ms ease`,
              }}
              aria-label={`${countdown} seconds remaining`}
            >
              {countdown}s
            </span>
          )}

          {/* Idle state pattern label */}
          {!isRunning && (
            <span
              className="text-xs sm:text-sm font-medium uppercase tracking-widest mt-1"
              style={{
                fontFamily: 'var(--font-montserrat)',
                color: '#9CA3AF',
              }}
            >
              {t.pattern}
            </span>
          )}
        </div>
      </div>

      {/* ---- Controls ---- */}
      <div className="flex items-center justify-center gap-5">
        <button
          onClick={handleToggle}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleToggle();
            }
          }}
          aria-pressed={isRunning}
          aria-label={isRunning ? t.stop : t.start}
          className="relative px-8 py-3 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{
            fontFamily: 'var(--font-montserrat)',
            backgroundColor: isRunning ? '#0A0A0B' : '#206FF7',
            color: '#FFFFFF',
            focusVisibleRingColor: isRunning ? '#0A0A0B' : '#206FF7',
          }}
        >
          {isRunning ? t.stop : t.start}
        </button>

        {/* Cycle counter */}
        <div
          className="flex items-center gap-1.5 text-sm font-medium tabular-nums"
          style={{
            fontFamily: 'var(--font-montserrat)',
            color: '#6B7280',
            opacity: cycles > 0 ? 1 : 0,
            transition: 'opacity 300ms ease',
          }}
          aria-live="polite"
          aria-atomic="true"
        >
          <span>{cycles}</span>
          <span>{t.cycles}</span>
        </div>
      </div>

      {/* ---- Inline keyframe for hold pulse ---- */}
      <style>{`
        @keyframes breathing-pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.04); opacity: 0.15; }
        }

        @media (prefers-reduced-motion: reduce) {
          @keyframes breathing-pulse {
            0%, 100% { transform: none; opacity: 0.3; }
          }
        }
      `}</style>
    </div>
  );
}
