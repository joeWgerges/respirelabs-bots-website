import { useState, useEffect, useRef } from 'react';

interface BreathingDemoProps {
  lang: 'en' | 'de' | 'pl';
}

export default function BreathingDemo({ lang }: BreathingDemoProps) {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [cycles, setCycles] = useState(0);
  const [timeInPhase, setTimeInPhase] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const elapsedRef = useRef(0);
  const startTimeRef = useRef<number>(0);

  const phaseDurations = { inhale: 4, hold: 2, exhale: 6 };
  const totalCycle = 12; // 4 + 2 + 6

  const labels = {
    en: {
      inhale: 'Inhale',
      hold: 'Hold',
      exhale: 'Exhale',
      start: 'Start',
      stop: 'Stop',
      cycles: 'Cycles',
      title: 'Try it now.',
      subtitle: 'Follow the circle. Breathe in through your nose.',
    },
    de: {
      inhale: 'Einatmen',
      hold: 'Halten',
      exhale: 'Ausatmen',
      start: 'Starten',
      stop: 'Stoppen',
      cycles: 'Zyklen',
      title: 'Jetzt ausprobieren.',
      subtitle: 'Folge dem Kreis. Atme durch die Nase ein.',
    },
    pl: {
      inhale: 'Wdech',
      hold: 'Wstrzymaj',
      exhale: 'Wydech',
      start: 'Start',
      stop: 'Stop',
      cycles: 'Cykle',
      title: 'Sprobuj teraz.',
      subtitle: 'Podazaj za kolem. Oddychaj przez nos.',
    },
  };
  const t = labels[lang] || labels.en;

  useEffect(() => {
    if (!isActive) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    elapsedRef.current = 0;
    startTimeRef.current = Date.now();

    intervalRef.current = setInterval(() => {
      elapsedRef.current = (Date.now() - startTimeRef.current) / 1000;
      const cycleTime = elapsedRef.current % totalCycle;

      if (cycleTime < 4) {
        setPhase('inhale');
        setTimeInPhase(cycleTime);
      } else if (cycleTime < 6) {
        setPhase('hold');
        setTimeInPhase(cycleTime - 4);
      } else {
        setPhase('exhale');
        setTimeInPhase(cycleTime - 6);
      }

      setCycles(Math.floor(elapsedRef.current / totalCycle));
    }, 100);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive]);

  const getScale = () => {
    if (!isActive) return 0.6;
    if (phase === 'inhale') return 0.6 + (timeInPhase / 4) * 0.4;
    if (phase === 'hold') return 1.0;
    return 1.0 - (timeInPhase / 6) * 0.4;
  };

  const getPhaseColor = () => {
    if (phase === 'inhale') return '#206FF7';
    if (phase === 'hold') return '#FFDC31';
    return '#10B981';
  };

  const handleToggle = () => {
    if (isActive) {
      setIsActive(false);
      setPhase('inhale');
      setTimeInPhase(0);
      elapsedRef.current = 0;
      startTimeRef.current = 0;
    } else {
      setCycles(0);
      setIsActive(true);
    }
  };

  return (
    <div className="text-center py-16">
      <h3
        className="text-3xl md:text-4xl font-bold mb-3 tracking-tight"
        style={{ fontFamily: 'var(--font-oddval)', color: '#0A0A0B' }}
      >
        {t.title}
      </h3>
      <p
        className="text-lg font-light mb-12"
        style={{ fontFamily: 'var(--font-montserrat)', color: '#6B7280' }}
      >
        {t.subtitle}
      </p>

      {/* Circle */}
      <div className="relative w-64 h-64 mx-auto mb-8 flex items-center justify-center">
        <div
          className="absolute inset-0 rounded-full transition-all duration-[400ms] ease-in-out"
          style={{
            transform: `scale(${getScale()})`,
            backgroundColor: isActive ? `${getPhaseColor()}15` : '#206FF710',
            border: `3px solid ${isActive ? getPhaseColor() : '#E5E7EB'}`,
            boxShadow: isActive ? `0 0 60px ${getPhaseColor()}30` : 'none',
          }}
        />
        <div className="relative z-10">
          <div
            className="text-2xl font-bold mb-1"
            aria-live="polite"
            style={{
              fontFamily: 'var(--font-oddval)',
              color: isActive ? getPhaseColor() : '#0A0A0B',
            }}
          >
            {isActive ? t[phase] : '4-2-6'}
          </div>
          {isActive && (
            <div
              className="text-xs font-medium uppercase tracking-widest"
              style={{ fontFamily: 'var(--font-montserrat)', color: '#6B7280' }}
            >
              {Math.ceil(phaseDurations[phase] - timeInPhase)}s
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6">
        <button
          onClick={handleToggle}
          aria-pressed={isActive}
          className="px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300"
          style={{
            fontFamily: 'var(--font-montserrat)',
            backgroundColor: isActive ? '#0A0A0B' : '#206FF7',
            color: '#FFFFFF',
          }}
        >
          {isActive ? t.stop : t.start}
        </button>

        {cycles > 0 && (
          <span
            className="text-sm font-medium"
            style={{ fontFamily: 'var(--font-montserrat)', color: '#6B7280' }}
          >
            {cycles} {t.cycles}
          </span>
        )}
      </div>
    </div>
  );
}
