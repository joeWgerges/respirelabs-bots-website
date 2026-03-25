import { useState, useEffect, useRef, useMemo } from 'react';
import { createClient } from '@supabase/supabase-js';

interface LiveWaitlistCounterProps {
  lang?: 'en' | 'de' | 'pl';
  totalSlots?: number;
  supabaseUrl?: string;
  supabaseKey?: string;
}

const translations = {
  en: {
    people: 'people on the waitlist',
    remaining: 'free Smart Tape samples remaining',
    loading: 'Loading...',
  },
  de: {
    people: 'Personen auf der Warteliste',
    remaining: 'kostenlose Smart Tape Muster verbleibend',
    loading: 'Laden...',
  },
  pl: {
    people: 'osob na liscie oczekujacych',
    remaining: 'bezplatnych probek Smart Tape pozostalo',
    loading: 'Ladowanie...',
  },
} as const;

export default function LiveWaitlistCounter({ lang = 'en', totalSlots = 500, supabaseUrl, supabaseKey }: LiveWaitlistCounterProps) {
  const supabase = useMemo(() => supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null, [supabaseUrl, supabaseKey]);
  const t = translations[lang] || translations.en;
  const [count, setCount] = useState<number | null>(null);
  const [displayCount, setDisplayCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  // Fetch initial count
  useEffect(() => {
    if (!supabase) {
      setCount(247); // Fallback demo count
      return;
    }

    const fetchCount = async () => {
      const { data, error } = await supabase.rpc('get_waitlist_count');
      if (!error && typeof data === 'number') {
        setCount(data);
      } else {
        setCount(0);
      }
    };
    fetchCount();

    // Real-time subscription
    const channel = supabase
      .channel('waitlist-counter')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'waitlist_signups' }, () => {
        setCount((prev) => (prev !== null ? prev + 1 : 1));
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  // Animate counter on first load
  useEffect(() => {
    if (count === null || hasAnimated.current) {
      if (count !== null && hasAnimated.current) setDisplayCount(count);
      return;
    }

    hasAnimated.current = true;
    const target = count;
    const duration = 2000;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplayCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [count]);

  const remaining = Math.max(0, totalSlots - (count ?? 0));

  return (
    <div className="text-center">
      {count === null ? (
        <p className="text-lg" style={{ fontFamily: 'var(--font-montserrat)', color: '#6B7280' }}>{t.loading}</p>
      ) : (
        <>
          <div className="mb-3">
            <span
              ref={counterRef}
              className="text-6xl md:text-7xl font-bold inline-block transition-transform duration-200"
              style={{ fontFamily: 'var(--font-oddval)', color: '#206FF7' }}
            >
              {displayCount.toLocaleString()}
            </span>
          </div>
          <p className="text-lg md:text-xl mb-6" style={{ fontFamily: 'var(--font-montserrat)', color: '#6B7280' }}>
            {t.people}
          </p>
          {remaining > 0 && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFDC31]/15 border border-[#FFDC31]/30">
              <span className="text-sm font-semibold" style={{ fontFamily: 'var(--font-montserrat)', color: '#0A0A0B' }}>
                {remaining} {t.remaining}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
