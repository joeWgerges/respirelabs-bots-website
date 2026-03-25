import { useState, useEffect, useRef, useCallback } from 'react';

interface BreathingChallengeProps {
  lang?: 'en' | 'de' | 'pl';
}

const translations = {
  en: {
    heading: 'Try this. Right now.',
    instruction: 'Close your mouth. Breathe only through your nose for 30 seconds.',
    start: 'Start',
    breatheIn: 'Breathe in...',
    breatheOut: 'Breathe out...',
    doneTitle: 'How did that feel?',
    doneText: 'If that felt difficult or unnatural, you are not alone. 50% of adults struggle with nasal breathing.',
    cta: 'Let RespireLabs help you breathe better.',
    ctaButton: 'Join the Waitlist',
    tryAgain: 'Try again',
    seconds: 's',
  },
  de: {
    heading: 'Probier es. Jetzt.',
    instruction: 'Schliess deinen Mund. Atme 30 Sekunden nur durch die Nase.',
    start: 'Starten',
    breatheIn: 'Einatmen...',
    breatheOut: 'Ausatmen...',
    doneTitle: 'Wie hat sich das angefuhlt?',
    doneText: 'Wenn es schwierig oder unnatuerlich war, bist du nicht allein. 50% der Erwachsenen haben Probleme mit der Nasenatmung.',
    cta: 'Lass RespireLabs dir helfen, besser zu atmen.',
    ctaButton: 'Auf die Warteliste',
    tryAgain: 'Nochmal versuchen',
    seconds: 's',
  },
  pl: {
    heading: 'Sprobuj. Teraz.',
    instruction: 'Zamknij usta. Oddychaj tylko przez nos przez 30 sekund.',
    start: 'Start',
    breatheIn: 'Wdech...',
    breatheOut: 'Wydech...',
    doneTitle: 'Jak sie czujesz?',
    doneText: 'Jesli to bylo trudne lub nienaturalne, nie jestes sam. 50% doroslych ma problem z oddychaniem przez nos.',
    cta: 'RespireLabs pomoze ci oddychac lepiej.',
    ctaButton: 'Dolacz do listy',
    tryAgain: 'Sprobuj ponownie',
    seconds: 's',
  },
} as const;

const DURATION = 30;
const RADIUS = 70;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function BreathingChallenge({ lang = 'en' }: BreathingChallengeProps) {
  const t = translations[lang] || translations.en;
  const [phase, setPhase] = useState<'idle' | 'running' | 'done'>('idle');
  const [secondsLeft, setSecondsLeft] = useState(DURATION);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 4-second breathing cycle: 2s in, 2s out
  const breathCycle = DURATION - secondsLeft;
  const isBreathingIn = (breathCycle % 4) < 2;

  const startChallenge = useCallback(() => {
    setPhase('running');
    setSecondsLeft(DURATION);
  }, []);

  useEffect(() => {
    if (phase !== 'running') return;

    intervalRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setPhase('done');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [phase]);

  const progress = (DURATION - secondsLeft) / DURATION;
  const strokeDash = progress * CIRCUMFERENCE;

  const handleCTA = () => {
    const section = document.getElementById('challenge-section');
    if (!section) return;
    const formWrapper = section.nextElementSibling?.classList.contains('waitlist-inline')
      ? section.nextElementSibling as HTMLElement
      : null;
    if (!formWrapper) return;

    document.querySelectorAll('.waitlist-inline:not(.hidden)').forEach(f => f.classList.add('hidden'));
    formWrapper.classList.remove('hidden');
    setTimeout(() => formWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };

  // -- Idle --
  if (phase === 'idle') {
    return (
      <div className="text-center">
        <h2
          className="text-3xl md:text-5xl font-bold mb-4 tracking-tight"
          style={{ fontFamily: 'var(--font-oddval)', color: '#0A0A0B' }}
        >
          {t.heading}
        </h2>
        <p
          className="text-base md:text-lg font-light mb-10 max-w-lg mx-auto"
          style={{ fontFamily: 'var(--font-montserrat)', color: '#6B7280' }}
        >
          {t.instruction}
        </p>
        {/* Idle ring */}
        <div className="relative w-44 h-44 md:w-52 md:h-52 mx-auto mb-8">
          <svg viewBox="0 0 160 160" className="w-full h-full">
            <circle cx="80" cy="80" r={RADIUS} fill="none" stroke="#E5E7EB" strokeWidth="6" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className="text-4xl md:text-5xl font-bold"
              style={{ fontFamily: 'var(--font-oddval)', color: '#0A0A0B' }}
            >
              30{t.seconds}
            </span>
          </div>
        </div>
        <button
          onClick={startChallenge}
          className="inline-flex items-center justify-center rounded-full px-10 py-4 text-base font-semibold text-white bg-[#206FF7] hover:bg-[#1a5cd4] hover:shadow-lg hover:shadow-[#206FF7]/25 active:scale-[0.98] transition-all"
          style={{ fontFamily: 'var(--font-montserrat)' }}
        >
          {t.start}
        </button>
      </div>
    );
  }

  // -- Running --
  if (phase === 'running') {
    return (
      <div className="text-center">
        <p
          className="text-sm uppercase tracking-widest mb-6"
          style={{ fontFamily: 'var(--font-montserrat)', color: '#6B7280' }}
        >
          {isBreathingIn ? t.breatheIn : t.breatheOut}
        </p>
        <div className="relative w-44 h-44 md:w-52 md:h-52 mx-auto">
          <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
            <circle cx="80" cy="80" r={RADIUS} fill="none" stroke="#E5E7EB" strokeWidth="6" />
            <circle
              cx="80" cy="80" r={RADIUS} fill="none"
              stroke="#206FF7" strokeWidth="6" strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE - strokeDash}
              className="transition-[stroke-dashoffset] duration-1000 linear"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className="text-5xl md:text-6xl font-bold tabular-nums"
              style={{ fontFamily: 'var(--font-oddval)', color: '#0A0A0B' }}
            >
              {secondsLeft}
            </span>
          </div>
          {/* Pulsing ring for breathing rhythm */}
          <div
            className="absolute inset-0 rounded-full border-2 border-[#206FF7]/20"
            style={{
              animation: 'breathPulse 4s ease-in-out infinite',
            }}
          />
        </div>
        <style>{`
          @keyframes breathPulse {
            0%, 100% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.08); opacity: 0.6; }
          }
        `}</style>
      </div>
    );
  }

  // -- Done --
  return (
    <div className="text-center">
      {/* Completion checkmark */}
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3
        className="text-2xl md:text-3xl font-bold mb-3"
        style={{ fontFamily: 'var(--font-oddval)', color: '#0A0A0B' }}
      >
        {t.doneTitle}
      </h3>
      <p
        className="text-base font-light mb-2 max-w-lg mx-auto"
        style={{ fontFamily: 'var(--font-montserrat)', color: '#6B7280' }}
      >
        {t.doneText}
      </p>
      <p
        className="text-sm mb-8"
        style={{ fontFamily: 'var(--font-montserrat)', color: '#6B7280' }}
      >
        {t.cta}
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <button
          onClick={handleCTA}
          className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold text-white bg-[#206FF7] hover:bg-[#1a5cd4] hover:shadow-lg hover:shadow-[#206FF7]/25 active:scale-[0.98] transition-all"
          style={{ fontFamily: 'var(--font-montserrat)' }}
        >
          {t.ctaButton}
        </button>
        <button
          onClick={() => { setPhase('idle'); setSecondsLeft(DURATION); }}
          className="inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold transition-colors"
          style={{ fontFamily: 'var(--font-montserrat)', color: '#6B7280' }}
        >
          {t.tryAgain}
        </button>
      </div>
    </div>
  );
}
