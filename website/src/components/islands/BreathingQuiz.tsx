import { useState, useCallback } from 'react';

interface BreathingQuizProps {
  lang?: 'en' | 'de' | 'pl';
}

const translations = {
  en: {
    heading: 'Are you a mouth breather?',
    subheading: 'Answer 4 quick questions to find out.',
    q1: 'Do you wake up with a dry mouth or sore throat?',
    q2: 'Do you snore, or has someone told you that you snore?',
    q3: 'Do you feel tired even after 7-8 hours of sleep?',
    q4: 'Do you breathe through your mouth during the day, especially under stress?',
    yes: 'Yes',
    no: 'No',
    resultHigh: 'signs detected. You are very likely a mouth breather.',
    resultMid: 'signs detected. You may be a mouth breather.',
    resultLow: 'sign detected. You might have occasional mouth breathing.',
    resultNone: 'No signs detected, but many mouth breathers don\'t realize it, especially during sleep.',
    outOf: 'out of 4',
    cta: 'RespireLabs can help. Join the waitlist.',
    ctaButton: 'Join the Waitlist',
    restart: 'Retake quiz',
    question: 'Question',
    of: 'of',
  },
  de: {
    heading: 'Atmest du durch den Mund?',
    subheading: '4 kurze Fragen, um es herauszufinden.',
    q1: 'Wachst du mit trockenem Mund oder Halsschmerzen auf?',
    q2: 'Schnarchst du, oder hat dir jemand gesagt, dass du schnarchst?',
    q3: 'Fuhlst du dich mude, obwohl du 7-8 Stunden geschlafen hast?',
    q4: 'Atmest du tagsuber durch den Mund, besonders unter Stress?',
    yes: 'Ja',
    no: 'Nein',
    resultHigh: 'Anzeichen erkannt. Du atmest sehr wahrscheinlich durch den Mund.',
    resultMid: 'Anzeichen erkannt. Du koenntest ein Mundatmer sein.',
    resultLow: 'Anzeichen erkannt. Gelegentliches Mundatmen ist moeglich.',
    resultNone: 'Keine Anzeichen erkannt, aber viele Mundatmer wissen es nicht, besonders im Schlaf.',
    outOf: 'von 4',
    cta: 'RespireLabs kann helfen. Trag dich auf die Warteliste ein.',
    ctaButton: 'Auf die Warteliste',
    restart: 'Quiz wiederholen',
    question: 'Frage',
    of: 'von',
  },
  pl: {
    heading: 'Czy oddychasz przez usta?',
    subheading: '4 szybkie pytania, zeby sie dowiedziec.',
    q1: 'Budzisz sie z suchymi ustami lub bolem gardla?',
    q2: 'Chrapiesz, albo ktos ci powiedzial, ze chrapiesz?',
    q3: 'Czujesz sie zmeczony mimo 7-8 godzin snu?',
    q4: 'Oddychasz przez usta w ciagu dnia, zwlaszcza pod wplywem stresu?',
    yes: 'Tak',
    no: 'Nie',
    resultHigh: 'objawy wykryte. Bardzo prawdopodobne, ze oddychasz przez usta.',
    resultMid: 'objawy wykryte. Mozesz byc osobo oddychajaca przez usta.',
    resultLow: 'objaw wykryty. Mozliwe okazjonalne oddychanie przez usta.',
    resultNone: 'Brak objawow, ale wielu oddychajacych przez usta nie zdaje sobie z tego sprawy, zwlaszcza podczas snu.',
    outOf: 'z 4',
    cta: 'RespireLabs moze pomoc. Dolacz do listy oczekujacych.',
    ctaButton: 'Dolacz do listy',
    restart: 'Powtorz quiz',
    question: 'Pytanie',
    of: 'z',
  },
} as const;

export default function BreathingQuiz({ lang = 'en' }: BreathingQuizProps) {
  const t = translations[lang] || translations.en;
  const questions = [t.q1, t.q2, t.q3, t.q4];

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [phase, setPhase] = useState<'intro' | 'quiz' | 'result'>('intro');
  const [animating, setAnimating] = useState(false);

  const score = answers.filter(Boolean).length;

  const answer = useCallback((val: boolean) => {
    if (animating) return;
    setAnimating(true);
    const next = [...answers, val];
    setAnswers(next);

    setTimeout(() => {
      if (current < questions.length - 1) {
        setCurrent(current + 1);
      } else {
        setPhase('result');
      }
      setAnimating(false);
    }, 300);
  }, [current, answers, questions.length, animating]);

  const restart = () => {
    setCurrent(0);
    setAnswers([]);
    setPhase('intro');
    setAnimating(false);
  };

  const getResultText = () => {
    if (score === 0) return t.resultNone;
    if (score === 1) return `1 ${t.resultLow}`;
    if (score <= 2) return `${score} ${t.resultMid}`;
    return `${score} ${t.resultHigh}`;
  };

  const handleCTA = () => {
    // Find the nearest cta-waitlist mechanism — trigger the parent section's form
    const quizSection = document.getElementById('quiz-section');
    if (!quizSection) return;
    const formWrapper = quizSection.nextElementSibling?.classList.contains('waitlist-inline')
      ? quizSection.nextElementSibling as HTMLElement
      : null;
    if (!formWrapper) return;

    document.querySelectorAll('.waitlist-inline:not(.hidden)').forEach(f => f.classList.add('hidden'));
    formWrapper.classList.remove('hidden');
    setTimeout(() => formWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };

  // -- Intro screen --
  if (phase === 'intro') {
    return (
      <div className="text-center">
        <h2
          className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight"
          style={{ fontFamily: 'var(--font-oddval)' }}
        >
          {t.heading}
        </h2>
        <p
          className="text-base md:text-lg text-white/50 mb-8 font-light"
          style={{ fontFamily: 'var(--font-montserrat)' }}
        >
          {t.subheading}
        </p>
        <button
          onClick={() => setPhase('quiz')}
          className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold text-white bg-[#206FF7] hover:bg-[#1a5cd4] hover:shadow-lg hover:shadow-[#206FF7]/25 active:scale-[0.98] transition-all"
          style={{ fontFamily: 'var(--font-montserrat)' }}
        >
          {t.yes === 'Ja' ? 'Quiz starten' : t.yes === 'Tak' ? 'Rozpocznij quiz' : 'Start the Quiz'}
        </button>
      </div>
    );
  }

  // -- Quiz in progress --
  if (phase === 'quiz') {
    return (
      <div className="max-w-2xl mx-auto">
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-8">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i < current ? 'bg-[#206FF7]' : i === current ? 'bg-[#206FF7] scale-125' : 'bg-white/20'
              }`}
            />
          ))}
        </div>

        {/* Question counter */}
        <p
          className="text-xs uppercase tracking-widest text-white/30 text-center mb-4"
          style={{ fontFamily: 'var(--font-montserrat)' }}
        >
          {t.question} {current + 1} {t.of} {questions.length}
        </p>

        {/* Question card */}
        <div
          className={`bg-white/5 border border-white/10 backdrop-blur-sm rounded-[2rem] p-8 md:p-10 text-center transition-all duration-300 ${
            animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
        >
          <p
            className="text-xl md:text-2xl font-bold text-white mb-8 leading-snug"
            style={{ fontFamily: 'var(--font-oddval)' }}
          >
            {questions[current]}
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => answer(true)}
              className="rounded-full px-10 py-3.5 text-base font-semibold text-white bg-[#206FF7] hover:bg-[#1a5cd4] hover:shadow-lg hover:shadow-[#206FF7]/25 active:scale-[0.98] transition-all"
              style={{ fontFamily: 'var(--font-montserrat)' }}
            >
              {t.yes}
            </button>
            <button
              onClick={() => answer(false)}
              className="rounded-full px-10 py-3.5 text-base font-semibold text-white/70 border border-white/15 hover:bg-white/5 hover:text-white active:scale-[0.98] transition-all"
              style={{ fontFamily: 'var(--font-montserrat)' }}
            >
              {t.no}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -- Result screen --
  const ringPercent = (score / 4) * 100;
  const circumference = 2 * Math.PI * 54;
  const strokeDash = (ringPercent / 100) * circumference;

  return (
    <div className="max-w-2xl mx-auto text-center">
      {/* Score circle */}
      <div className="relative w-32 h-32 mx-auto mb-6">
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
          <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
          <circle
            cx="60" cy="60" r="54" fill="none"
            stroke={score >= 3 ? '#EF4444' : score >= 2 ? '#FFDC31' : '#206FF7'}
            strokeWidth="8" strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - strokeDash}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-3xl font-bold text-white"
            style={{ fontFamily: 'var(--font-oddval)' }}
          >
            {score}/4
          </span>
        </div>
      </div>

      {/* Result text */}
      <p
        className="text-lg md:text-xl text-white/80 mb-3 font-light leading-relaxed"
        style={{ fontFamily: 'var(--font-montserrat)' }}
      >
        {getResultText()}
      </p>
      <p
        className="text-base text-white/50 mb-8"
        style={{ fontFamily: 'var(--font-montserrat)' }}
      >
        {t.cta}
      </p>

      {/* CTA + restart */}
      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <button
          onClick={handleCTA}
          className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold text-white bg-[#206FF7] hover:bg-[#1a5cd4] hover:shadow-lg hover:shadow-[#206FF7]/25 active:scale-[0.98] transition-all"
          style={{ fontFamily: 'var(--font-montserrat)' }}
        >
          {t.ctaButton}
        </button>
        <button
          onClick={restart}
          className="inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold text-white/50 hover:text-white/80 transition-colors"
          style={{ fontFamily: 'var(--font-montserrat)' }}
        >
          {t.restart}
        </button>
      </div>
    </div>
  );
}
