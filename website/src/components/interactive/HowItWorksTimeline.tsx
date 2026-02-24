import { useState, useEffect, useRef, useCallback } from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface HowItWorksTimelineProps {
  lang?: 'en' | 'de' | 'pl';
  /** URL for the tape page CTA in step 4 */
  tapeHref?: string;
}

interface Step {
  number: number;
  pill: string;
  heading: string;
  description: string;
  accent: 'blue' | 'yellow';
  /** Optional privacy note for step 1 */
  privacyNote?: string;
  /** Optional context tags for step 2 */
  contextTags?: string[];
  /** Optional CTA for step 4 */
  cta?: { label: string; href: string };
}

// ---------------------------------------------------------------------------
// Translations
// ---------------------------------------------------------------------------

const translations: Record<string, { steps: Step[]; micAlt: string }> = {
  en: {
    micAlt: 'Microphone icon for breathing sound detection',
    steps: [
      {
        number: 1,
        pill: 'Phone-First',
        heading: 'Start with the app.',
        description:
          'You are in control. You start a session only when you want breathing awareness (day or night). The app uses your phone\u2019s microphone to detect mouth breathing patterns and gives you gentle, real-time feedback.',
        accent: 'blue',
        privacyNote:
          'Audio is processed locally. We don\u2019t store or upload raw sound without explicit consent.',
      },
      {
        number: 2,
        pill: 'Insights',
        heading: 'Understand your baseline.',
        description:
          'After a session, review your summaries and trends. Instead of just seeing that you slept poorly, you\u2019ll learn which specific contexts trigger mouth breathing.',
        accent: 'blue',
        contextTags: ['Stress', 'Screen time', 'Sleep posture', 'Exercise intensity'],
      },
      {
        number: 3,
        pill: 'Coaching',
        heading: 'Train nasal habits.',
        description:
          'Information isn\u2019t enough; you need to change the behavior. Follow short guided exercises right in the app. Use smart reminders and visual streaks to build consistency over time.',
        accent: 'blue',
      },
      {
        number: 4,
        pill: 'Optional Hardware Upgrade',
        heading: 'Deeper night insights.',
        description:
          'For users who want detailed clarity on their sleep breathing, the Smart Mouth Tape wearable is designed as an optional upgrade to measure progress with precision.',
        accent: 'yellow',
        cta: { label: 'Learn about the tape \u2192', href: '/en/smart-mouth-tape' },
      },
    ],
  },
  de: {
    micAlt: 'Mikrofon-Symbol f\u00FCr Atemerkennung',
    steps: [
      {
        number: 1,
        pill: 'Smartphone-First',
        heading: 'Start mit der App.',
        description:
          'Du hast die Kontrolle. Du startest eine Session nur dann, wenn du Atem-Bewusstsein willst (tags\u00FCber oder nachts). Die App nutzt das Mikrofon deines Smartphones, um Mundatmung zu erkennen, und gibt dir sanftes Echtzeit-Feedback.',
        accent: 'blue',
        privacyNote:
          'Audio wird lokal verarbeitet. Ohne explizite Zustimmung speichern wir keine Rohdaten.',
      },
      {
        number: 2,
        pill: 'Insights',
        heading: 'Baseline verstehen.',
        description:
          'Nach der Session siehst du Zusammenfassungen und Trends. Du erf\u00E4hrst nicht nur, dass du schlecht geschlafen hast, sondern in welchen konkreten Situationen Mundatmung aufgetreten ist.',
        accent: 'blue',
        contextTags: ['Stress', 'Bildschirmzeit', 'Schlafposition', 'Training'],
      },
      {
        number: 3,
        pill: 'Coaching',
        heading: 'Nasenatmung trainieren.',
        description:
          'Wissen allein reicht nicht; das Verhalten muss sich \u00E4ndern. Folge kurzen, gef\u00FChrten \u00DCbungen direkt in der App. Erinnerungen und Streaks helfen dir, am Ball zu bleiben.',
        accent: 'blue',
      },
      {
        number: 4,
        pill: 'Hardware Upgrade (Optional)',
        heading: 'Tiefere Nacht-Insights.',
        description:
          'F\u00FCr alle, die genaueste Daten \u00FCber ihre Atmung im Schlaf wollen: Das Smart Mouth Tape Wearable liefert als optionales Upgrade tiefe Einblicke, um Fortschritte exakt zu messen.',
        accent: 'yellow',
        cta: { label: 'Mehr zum Tape \u2192', href: '/de/smart-mouth-tape' },
      },
    ],
  },
  pl: {
    micAlt: 'Ikona mikrofonu do wykrywania d\u017Awi\u0119k\u00F3w oddychania',
    steps: [
      {
        number: 1,
        pill: 'Telefon na pierwszym miejscu',
        heading: 'Zacznij od aplikacji.',
        description:
          'Masz kontrol\u0119. Uruchamiasz sesj\u0119 tylko wtedy, gdy chcesz \u015Bwiadomo\u015Bci oddychania (w dzie\u0144 lub w nocy). Aplikacja u\u017Cywa mikrofonu w twoim telefonie do wykrywania wzorc\u00F3w oddychania przez usta i daje ci delikatne informacje zwrotne w czasie rzeczywistym.',
        accent: 'blue',
        privacyNote:
          'Audio jest przetwarzane lokalnie. Nie przechowujemy ani nie przesy\u0142amy surowego d\u017Awi\u0119ku bez wyra\u017Anej zgody.',
      },
      {
        number: 2,
        pill: 'Analizy',
        heading: 'Poznaj swoj\u0105 baz\u0119.',
        description:
          'Po sesji przejrzyj podsumowania i trendy. Zamiast widzie\u0107 tylko, \u017Ce spa\u0142e\u015B \u017Ale, dowiesz si\u0119, jakie konkretne sytuacje wywo\u0142uj\u0105 oddychanie przez usta.',
        accent: 'blue',
        contextTags: ['Stres', 'Czas przed ekranem', 'Pozycja snu', 'Intensywno\u015B\u0107 \u0107wicze\u0144'],
      },
      {
        number: 3,
        pill: 'Coaching',
        heading: 'Trenuj nawyki nosowe.',
        description:
          'Informacja to za ma\u0142o; musisz zmieni\u0107 zachowanie. Wykonuj kr\u00F3tkie \u0107wiczenia z przewodnikiem bezpo\u015Brednio w aplikacji. U\u017Cywaj inteligentnych przypomnie\u0144 i wizualnych serii, aby budowa\u0107 konsekwencj\u0119 w czasie.',
        accent: 'blue',
      },
      {
        number: 4,
        pill: 'Opcjonalna rozbudowa sprz\u0119towa',
        heading: 'G\u0142\u0119bsze analizy nocne.',
        description:
          'Dla u\u017Cytkownik\u00F3w, kt\u00F3rzy chc\u0105 szczeg\u00F3\u0142owej jasno\u015Bci w kwestii oddychania podczas snu, urz\u0105dzenie Smart Mouth Tape jest zaprojektowane jako opcjonalna rozbudowa do precyzyjnego pomiaru post\u0119pu.',
        accent: 'yellow',
        cta: { label: 'Dowiedz si\u0119 o ta\u015Bmie \u2192', href: '/pl/inteligentna-tasma' },
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function HowItWorksTimeline({
  lang = 'en',
  tapeHref,
}: HowItWorksTimelineProps) {
  const t = translations[lang] ?? translations.en;
  const steps = t.steps.map((s) =>
    tapeHref && s.cta ? { ...s, cta: { ...s.cta, href: tapeHref } } : s,
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<SVGLineElement>(null);

  const [visibleSteps, setVisibleSteps] = useState<boolean[]>([false, false, false, false]);
  const [lineProgress, setLineProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Detect reduced motion preference
  useEffect(() => {
    setReducedMotion(prefersReducedMotion());
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // IntersectionObserver for step reveal
  useEffect(() => {
    if (reducedMotion) {
      setVisibleSteps([true, true, true, true]);
      setLineProgress(1);
      return;
    }

    const observers: IntersectionObserver[] = [];

    stepRefs.current.forEach((el, i) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSteps((prev) => {
              const next = [...prev];
              next[i] = true;
              return next;
            });
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.15, rootMargin: '0px 0px -50px 0px' },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [reducedMotion]);

  // Scroll-driven line progress
  const handleScroll = useCallback(() => {
    if (!containerRef.current || reducedMotion) return;

    const rect = containerRef.current.getBoundingClientRect();
    const viewportH = window.innerHeight;

    // Start drawing when the top of the container enters the lower 3rd of viewport
    // Finish when the bottom of the container reaches the upper 1/3
    const start = viewportH * 0.7;
    const end = viewportH * 0.3;
    const totalScroll = rect.height - (start - end);

    const scrolled = start - rect.top;
    const progress = Math.min(Math.max(scrolled / totalScroll, 0), 1);

    setLineProgress(progress);
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll, reducedMotion]);

  // SVG line total length (will be calculated based on container height)
  const lineLength = 1000; // arbitrary length for dasharray

  return (
    <div ref={containerRef} className="relative" role="list" aria-label="Steps">
      {/* SVG connecting line */}
      <div
        className="absolute left-6 md:left-12 top-0 bottom-0 w-px pointer-events-none"
        aria-hidden="true"
      >
        {/* Background track */}
        <div className="absolute inset-0 bg-white/10" />
        {/* Animated progress line */}
        <div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#206FF7] via-[#206FF7] to-[#FFDC31]"
          style={{
            height: `${lineProgress * 100}%`,
            transition: reducedMotion ? 'none' : 'height 100ms linear',
          }}
        />
      </div>

      {steps.map((step, i) => {
        const isVisible = visibleSteps[i];
        const isYellow = step.accent === 'yellow';
        const accentColor = isYellow ? '#FFDC31' : '#206FF7';
        const pillBg = isYellow ? 'rgba(255, 220, 49, 0.2)' : 'rgba(32, 111, 247, 0.2)';

        return (
          <div
            key={step.number}
            ref={(el) => { stepRefs.current[i] = el; }}
            role="listitem"
            className="relative pl-16 md:pl-24 py-12 md:py-16"
            style={{
              opacity: reducedMotion ? 1 : isVisible ? 1 : 0,
              transform: reducedMotion
                ? 'none'
                : isVisible
                  ? 'translateX(0)'
                  : 'translateX(40px)',
              transition: reducedMotion
                ? 'none'
                : `opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) ${i * 0.1}s, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) ${i * 0.1}s`,
            }}
          >
            {/* Timeline node */}
            <div
              className="absolute top-12 md:top-16 left-0 md:left-5 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center z-10"
              style={{
                backgroundColor: 'var(--timeline-bg, #0A0A0B)',
                border: `4px solid ${accentColor}`,
                boxShadow: isYellow
                  ? '0 0 20px rgba(255, 220, 49, 0.4)'
                  : isVisible
                    ? `0 0 20px ${accentColor}33`
                    : 'none',
                transition: 'box-shadow 0.6s ease',
              }}
              aria-hidden="true"
            >
              <span
                className="text-lg md:text-2xl font-bold"
                style={{ fontFamily: 'var(--font-oddval)', color: accentColor }}
              >
                {step.number}
              </span>
            </div>

            {/* Step content */}
            <div>
              {/* Pill label */}
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  backgroundColor: pillBg,
                  color: accentColor,
                }}
              >
                {step.pill}
              </span>

              {/* Heading */}
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white"
                style={{ fontFamily: 'var(--font-oddval)' }}
              >
                {step.heading}
              </h2>

              {/* Description */}
              <p
                className="text-lg md:text-xl font-light leading-relaxed mb-8 max-w-2xl"
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  color: 'rgba(229, 231, 235, 0.7)',
                }}
              >
                {step.description}
              </p>

              {/* Step 1: Privacy note */}
              {step.privacyNote && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 max-w-lg backdrop-blur-md">
                  <div className="flex items-center gap-4">
                    <img
                      src="/assets/icons/respire-labs-icons_microphone.svg"
                      alt={t.micAlt}
                      className="w-8 h-8 opacity-70 invert flex-shrink-0"
                    />
                    <p
                      className="text-sm font-light"
                      style={{
                        fontFamily: 'var(--font-montserrat)',
                        color: '#E5E7EB',
                      }}
                    >
                      {step.privacyNote}
                    </p>
                  </div>
                </div>
              )}

              {/* Step 2: Context tags */}
              {step.contextTags && (
                <div className="flex flex-wrap gap-3">
                  {step.contextTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm"
                      style={{
                        fontFamily: 'var(--font-garamond)',
                        color: '#E5E7EB',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Step 4: CTA button */}
              {step.cta && (
                <a
                  href={step.cta.href}
                  className="inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
                  style={{
                    fontFamily: 'var(--font-montserrat)',
                    color: '#FFDC31',
                    border: '1px solid rgba(255, 220, 49, 0.2)',
                    backgroundColor: 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 220, 49, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {step.cta.label}
                </a>
              )}
            </div>
          </div>
        );
      })}

      {/* CSS variable for timeline node bg — inherits from parent dark section */}
      <style>{`
        :root { --timeline-bg: #0A0A0B; }
        .dark { --timeline-bg: #060810; }
      `}</style>
    </div>
  );
}
