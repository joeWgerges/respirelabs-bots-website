import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string;
  lang?: 'en' | 'de' | 'pl';
  compact?: boolean;
}

const translations = {
  en: { days: 'days', hours: 'hrs', min: 'min', sec: 'sec', live: "We're Live!" },
  de: { days: 'Tage', hours: 'Std', min: 'Min', sec: 'Sek', live: 'Wir sind live!' },
  pl: { days: 'dni', hours: 'godz', min: 'min', sec: 'sek', live: 'Jestesmy na zywo!' },
} as const;

function getTimeLeft(target: number) {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: diff <= 0,
  };
}

function TimeBox({ value, label, compact }: { value: number; label: string; compact?: boolean }) {
  const boxSize = compact
    ? 'w-11 h-11 sm:w-12 sm:h-12 rounded-lg'
    : 'w-16 h-16 md:w-20 md:h-20 rounded-xl';
  const numSize = compact
    ? 'text-base sm:text-lg'
    : 'text-2xl md:text-3xl';
  const labelSize = compact
    ? 'text-[8px] sm:text-[9px]'
    : 'text-[10px] md:text-xs';

  return (
    <div className={`flex flex-col items-center ${compact ? 'gap-1' : 'gap-2'}`}>
      <div className={`relative ${boxSize} bg-[#206FF7] flex items-center justify-center overflow-hidden`}>
        <span className={`${numSize} font-bold text-white tabular-nums`} style={{ fontFamily: 'var(--font-oddval)' }}>
          {String(value).padStart(2, '0')}
        </span>
        <div className="absolute inset-x-0 top-1/2 h-px bg-white/10" />
      </div>
      <span className={`${labelSize} uppercase tracking-wider`} style={{ fontFamily: 'var(--font-montserrat)', color: 'rgba(255,255,255,0.5)' }}>
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer({ targetDate, lang = 'en', compact = false }: CountdownTimerProps) {
  const t = translations[lang] || translations.en;
  const target = new Date(targetDate).getTime();
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(target));

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(interval);
  }, [target]);

  if (timeLeft.expired) {
    return (
      <div className="text-center">
        <p className={`${compact ? 'text-2xl md:text-3xl' : 'text-4xl md:text-5xl'} font-bold`} style={{ fontFamily: 'var(--font-oddval)', color: '#FFDC31' }}>
          {t.live}
        </p>
      </div>
    );
  }

  const colonSize = compact ? 'text-lg text-white/20 mt-[-0.75rem]' : 'text-2xl font-bold text-white/30 mt-[-1.5rem]';
  const gap = compact ? 'gap-2 sm:gap-3' : 'gap-3 md:gap-4';

  return (
    <div className={`flex items-center justify-center ${gap}`}>
      <TimeBox value={timeLeft.days} label={t.days} compact={compact} />
      <span className={colonSize} aria-hidden="true">:</span>
      <TimeBox value={timeLeft.hours} label={t.hours} compact={compact} />
      <span className={colonSize} aria-hidden="true">:</span>
      <TimeBox value={timeLeft.minutes} label={t.min} compact={compact} />
      <span className={colonSize} aria-hidden="true">:</span>
      <TimeBox value={timeLeft.seconds} label={t.sec} compact={compact} />
    </div>
  );
}
