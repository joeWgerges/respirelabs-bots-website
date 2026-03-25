import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface LaunchWaitlistFormProps {
  lang?: 'en' | 'de' | 'pl';
  compact?: boolean;
  supabaseUrl?: string;
  supabaseKey?: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

// ---------------------------------------------------------------------------
// Translations
// ---------------------------------------------------------------------------

const translations = {
  en: {
    email: 'Email address',
    emailPlaceholder: 'jane@example.com',
    firstName: 'First name',
    firstNamePlaceholder: 'Jane',
    interest: 'What interests you?',
    app: 'RespireLabs App',
    tape: 'Smart Mouth Tape',
    both: 'Both',
    hearAbout: 'How did you hear about us?',
    hearAboutPlaceholder: 'Select an option',
    hearAboutOptions: ['Social Media', 'Friend / Family', 'Search Engine', 'Blog / Article', 'Other'],
    privacy: 'I agree to the',
    privacyLink: 'Privacy Policy',
    privacySuffix: '',
    submit: 'Join the Waitlist',
    submitting: 'Joining...',
    successTitle: "You're on the list!",
    successBody: "We'll send a confirmation to your email. Stay tuned for early access.",
    required: 'This field is required',
    invalidEmail: 'Please enter a valid email',
    errorTitle: 'Something went wrong',
    errorBody: 'Please try again.',
    shareTitle: 'Spread the word',
    shareText: 'I just joined the RespireLabs waitlist. 50% of people mouth-breathe in their sleep and don\'t know it.',
    copyLink: 'Copy link',
    copied: 'Copied!',
  },
  de: {
    email: 'E-Mail-Adresse',
    emailPlaceholder: 'max@beispiel.de',
    firstName: 'Vorname',
    firstNamePlaceholder: 'Max',
    interest: 'Was interessiert dich?',
    app: 'RespireLabs App',
    tape: 'Smart Mouth Tape',
    both: 'Beides',
    hearAbout: 'Wie hast du von uns erfahren?',
    hearAboutPlaceholder: 'Option auswahlen',
    hearAboutOptions: ['Social Media', 'Freunde / Familie', 'Suchmaschine', 'Blog / Artikel', 'Sonstiges'],
    privacy: 'Ich stimme der',
    privacyLink: 'Datenschutzerklarung',
    privacySuffix: ' zu',
    submit: 'Auf die Warteliste',
    submitting: 'Wird eingetragen...',
    successTitle: 'Du bist dabei!',
    successBody: 'Wir senden dir eine Bestatigung per E-Mail.',
    required: 'Pflichtfeld',
    invalidEmail: 'Bitte gultige E-Mail eingeben',
    errorTitle: 'Etwas ist schiefgelaufen',
    errorBody: 'Bitte erneut versuchen.',
    shareTitle: 'Weitersagen',
    shareText: 'Ich bin auf der RespireLabs-Warteliste. 50% der Menschen atmen im Schlaf durch den Mund, ohne es zu wissen.',
    copyLink: 'Link kopieren',
    copied: 'Kopiert!',
  },
  pl: {
    email: 'Adres e-mail',
    emailPlaceholder: 'anna@example.pl',
    firstName: 'Imie',
    firstNamePlaceholder: 'Anna',
    interest: 'Co Cie interesuje?',
    app: 'Aplikacja RespireLabs',
    tape: 'Smart Mouth Tape',
    both: 'Oba',
    hearAbout: 'Skad o nas wiesz?',
    hearAboutPlaceholder: 'Wybierz opcje',
    hearAboutOptions: ['Media spolecznosciowe', 'Znajomi / Rodzina', 'Wyszukiwarka', 'Blog / Artykul', 'Inne'],
    privacy: 'Zgadzam sie z',
    privacyLink: 'Polityka Prywatnosci',
    privacySuffix: '',
    submit: 'Dolacz do listy',
    submitting: 'Dolaczanie...',
    successTitle: 'Jestes na liscie!',
    successBody: 'Wyslemy potwierdzenie na Twoj e-mail.',
    required: 'Pole wymagane',
    invalidEmail: 'Podaj poprawny e-mail',
    errorTitle: 'Cos poszlo nie tak',
    errorBody: 'Sprobuj ponownie.',
    shareTitle: 'Podziel sie',
    shareText: 'Dolaczam do listy oczekujacych RespireLabs. 50% ludzi oddycha przez usta podczas snu i o tym nie wie.',
    copyLink: 'Kopiuj link',
    copied: 'Skopiowano!',
  },
} as const;

// Privacy links now open an in-page modal via data-open-privacy attribute

const STORAGE_KEY = 'respirelabs_waitlist_submitted';

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function LaunchWaitlistForm({ lang = 'en', compact = false, supabaseUrl, supabaseKey }: LaunchWaitlistFormProps) {
  const t = translations[lang] || translations.en;
  const sbRef = useRef<SupabaseClient | null>(null);

  // Form state (fully controlled, no external form library issues)
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState<string[]>([]);
  const [hearAbout, setHearAbout] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [position, setPosition] = useState<number | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);

  // Create Supabase client only on client side
  useEffect(() => {
    if (supabaseUrl && supabaseKey && !sbRef.current) {
      try {
        sbRef.current = createClient(supabaseUrl, supabaseKey);
      } catch { /* noop */ }
    }
  }, [supabaseUrl, supabaseKey]);

  // Check if already submitted
  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) setStatus('success');
    } catch { /* noop */ }
  }, []);

  const toggleInterest = useCallback((val: string) => {
    setInterest(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);
    setErrors(prev => { const next = { ...prev }; delete next.interest; return next; });
  }, []);

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!firstName.trim()) e.firstName = t.required;
    if (!email.trim()) e.email = t.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = t.invalidEmail;
    if (interest.length === 0) e.interest = t.required;
    if (!privacyConsent) e.privacy = t.required;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    try {
      if (sbRef.current) {
        const { error } = await sbRef.current.from('waitlist_signups').insert({
          email: email.trim(),
          first_name: firstName.trim(),
          interest,
          hear_about: hearAbout || null,
          source: 'launch-page',
          lang,
        });
        if (error && error.code !== '23505') throw error;
      }
      try { localStorage.setItem(STORAGE_KEY, email); } catch { /* noop */ }
      // Fetch position
      if (sbRef.current) {
        try {
          const { data } = await sbRef.current.rpc('get_waitlist_count');
          if (typeof data === 'number') setPosition(data);
        } catch { /* noop */ }
      }
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  // ---- Compact (email-only) ----
  if (compact) {
    if (status === 'success') {
      return <p className="text-sm font-medium text-green-400" style={{ fontFamily: 'var(--font-montserrat)' }}>{t.successTitle}</p>;
    }
    return (
      <form onSubmit={async (e) => {
        e.preventDefault();
        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          setErrors({ email: t.invalidEmail });
          return;
        }
        setStatus('submitting');
        try {
          if (sbRef.current) {
            const { error } = await sbRef.current.from('waitlist_signups').insert({ email: email.trim(), source: 'launch-page', lang });
            if (error && error.code !== '23505') throw error;
          }
          try { localStorage.setItem(STORAGE_KEY, email); } catch { /* noop */ }
          setStatus('success');
        } catch { setStatus('error'); }
      }} className="flex items-start gap-3 w-full">
        <div className="flex-1">
          <input
            type="email" value={email} onChange={(e) => { setEmail(e.target.value); setErrors({}); }}
            placeholder={t.emailPlaceholder} disabled={status === 'submitting'}
            className="block w-full rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-[#206FF7] focus:ring-2 focus:ring-[#206FF7]/30 focus:outline-none disabled:opacity-60"
            style={{ fontFamily: 'var(--font-montserrat)' }}
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
        </div>
        <button type="submit" disabled={status === 'submitting'}
          className="rounded-full px-6 py-3 text-sm font-semibold text-white bg-[#206FF7] hover:bg-[#1a5cd4] active:scale-[0.98] disabled:opacity-70 whitespace-nowrap transition-all"
          style={{ fontFamily: 'var(--font-montserrat)' }}>
          {status === 'submitting' ? t.submitting : t.submit}
        </button>
      </form>
    );
  }

  // ---- Success state (enhanced with confetti + sharing) ----
  if (status === 'success') {
    const shareUrl = `https://app.respirelabs.com/${lang}/launch`;
    const shareText = t.shareText;
    const twitterUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;

    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
      } catch { /* noop */ }
    };

    return (
      <div className="text-center py-8 px-4 relative overflow-hidden">
        {/* CSS Confetti */}
        <div className="confetti-container" aria-hidden="true">
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className="confetti-piece" style={{
              left: `${5 + Math.random() * 90}%`,
              animationDelay: `${Math.random() * 0.5}s`,
              animationDuration: `${1.5 + Math.random() * 1.5}s`,
              backgroundColor: ['#206FF7', '#FFDC31', '#10B981', '#F59E0B', '#8B5CF6'][i % 5],
            }} />
          ))}
        </div>
        <style>{`
          .confetti-container { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
          .confetti-piece { position: absolute; top: -10px; width: 8px; height: 8px; border-radius: 2px; animation: confettiFall 2.5s ease-out forwards; opacity: 0; }
          @keyframes confettiFall {
            0% { opacity: 1; transform: translateY(0) rotate(0deg) scale(1); }
            100% { opacity: 0; transform: translateY(300px) rotate(720deg) scale(0.5); }
          }
        `}</style>

        <div className="relative z-10">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-1" style={{ fontFamily: 'var(--font-oddval)', color: '#0A0A0B' }}>{t.successTitle}</h3>

          {position && (
            <p className="text-sm font-medium mb-3" style={{ fontFamily: 'var(--font-montserrat)', color: '#206FF7' }}>
              #{position}
            </p>
          )}

          <p className="text-sm mb-6" style={{ fontFamily: 'var(--font-montserrat)', color: '#6B7280' }}>{t.successBody}</p>

          {/* Share section */}
          <div className="border-t border-[#E5E7EB] pt-5 mt-2">
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ fontFamily: 'var(--font-montserrat)', color: '#0A0A0B' }}>
              {t.shareTitle}
            </p>
            <div className="flex justify-center gap-3">
              {/* Twitter/X */}
              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#0A0A0B] text-white hover:bg-[#0A0A0B]/80 transition-colors"
                aria-label="Share on X"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#25D366] text-white hover:bg-[#25D366]/80 transition-colors"
                aria-label="Share on WhatsApp"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              </a>
              {/* Copy link */}
              <button
                onClick={copyToClipboard}
                className={`inline-flex items-center justify-center h-11 px-4 rounded-full border transition-all text-sm font-medium ${
                  linkCopied
                    ? 'bg-green-50 border-green-300 text-green-700'
                    : 'bg-white border-[#E5E7EB] text-[#0A0A0B] hover:bg-gray-50'
                }`}
                style={{ fontFamily: 'var(--font-montserrat)' }}
              >
                {linkCopied ? (
                  <><svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>{t.copied}</>
                ) : (
                  <><svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>{t.copyLink}</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---- Full form ----
  const isSubmitting = status === 'submitting';
  const inputBase = "block w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 disabled:opacity-60 disabled:cursor-not-allowed transition-colors";
  const inputNormal = `${inputBase} border-[#E5E7EB] bg-white focus:border-[#206FF7] focus:ring-[#206FF7]/20`;
  const inputError = `${inputBase} border-red-400 bg-white focus:border-red-500 focus:ring-red-200`;

  return (
    <div>
      {status === 'error' && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 flex items-center gap-3">
          <span className="text-sm text-red-700" style={{ fontFamily: 'var(--font-montserrat)' }}>{t.errorTitle}. {t.errorBody}</span>
          <button type="button" onClick={() => setStatus('idle')} className="ml-auto text-red-400 hover:text-red-600">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Name + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ fontFamily: 'var(--font-montserrat)', color: '#0A0A0B' }}>
              {t.firstName} <span className="text-red-500">*</span>
            </label>
            <input
              type="text" value={firstName} onChange={(e) => { setFirstName(e.target.value); setErrors(prev => { const n = { ...prev }; delete n.firstName; return n; }); }}
              placeholder={t.firstNamePlaceholder} disabled={isSubmitting}
              className={errors.firstName ? inputError : inputNormal}
              style={{ fontFamily: 'var(--font-montserrat)', color: '#0A0A0B' }}
            />
            {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ fontFamily: 'var(--font-montserrat)', color: '#0A0A0B' }}>
              {t.email} <span className="text-red-500">*</span>
            </label>
            <input
              type="email" value={email} onChange={(e) => { setEmail(e.target.value); setErrors(prev => { const n = { ...prev }; delete n.email; return n; }); }}
              placeholder={t.emailPlaceholder} disabled={isSubmitting}
              className={errors.email ? inputError : inputNormal}
              style={{ fontFamily: 'var(--font-montserrat)', color: '#0A0A0B' }}
            />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
          </div>
        </div>

        {/* Interest checkboxes */}
        <div>
          <p className="text-sm font-medium mb-2" style={{ fontFamily: 'var(--font-montserrat)', color: '#0A0A0B' }}>
            {t.interest} <span className="text-red-500">*</span>
          </p>
          <div className="space-y-2.5">
            {(['app', 'tape', 'both'] as const).map((val) => {
              const labels = { app: t.app, tape: t.tape, both: t.both };
              const checked = interest.includes(val);
              return (
                <button
                  key={val} type="button" disabled={isSubmitting}
                  onClick={() => toggleInterest(val)}
                  className={`flex items-center gap-3 w-full text-left py-2 px-3 rounded-xl transition-colors ${checked ? 'bg-[#206FF7]/5' : 'hover:bg-gray-50'} disabled:opacity-60`}
                >
                  <span className={`flex h-5 w-5 items-center justify-center rounded-md border-2 transition-all flex-shrink-0 ${checked ? 'border-[#206FF7] bg-[#206FF7]' : 'border-[#E5E7EB] bg-white'}`}>
                    {checked && <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                  </span>
                  <span className="text-sm" style={{ fontFamily: 'var(--font-montserrat)', color: '#0A0A0B' }}>{labels[val]}</span>
                </button>
              );
            })}
          </div>
          {errors.interest && <p className="mt-1 text-xs text-red-600">{errors.interest}</p>}
        </div>

        {/* How did you hear */}
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ fontFamily: 'var(--font-montserrat)', color: '#0A0A0B' }}>{t.hearAbout}</label>
          <select
            value={hearAbout} onChange={(e) => setHearAbout(e.target.value)} disabled={isSubmitting}
            className="block w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 pr-10 text-sm focus:border-[#206FF7] focus:ring-2 focus:ring-[#206FF7]/20 focus:outline-none disabled:opacity-60 appearance-none"
            style={{ fontFamily: 'var(--font-montserrat)', color: '#0A0A0B' }}
          >
            <option value="">{t.hearAboutPlaceholder}</option>
            {t.hearAboutOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>

        {/* Privacy */}
        <div className="pt-3 border-t border-[#E5E7EB]">
          <button
            type="button" disabled={isSubmitting}
            onClick={() => { setPrivacyConsent(!privacyConsent); setErrors(prev => { const n = { ...prev }; delete n.privacy; return n; }); }}
            className="flex items-start gap-3 w-full text-left disabled:opacity-60"
          >
            <span className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-md border-2 transition-all flex-shrink-0 ${privacyConsent ? 'border-[#206FF7] bg-[#206FF7]' : 'border-[#E5E7EB] bg-white'}`}>
              {privacyConsent && <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
            </span>
            <span className="text-sm leading-snug" style={{ fontFamily: 'var(--font-montserrat)', color: '#0A0A0B' }}>
              {t.privacy}{' '}
              <a href="#" data-open-privacy className="text-[#206FF7] hover:underline font-medium"
                onClick={(e) => e.stopPropagation()}>{t.privacyLink}</a>
              {t.privacySuffix}
            </span>
          </button>
          {errors.privacy && <p className="mt-1 text-xs text-red-600 ml-8">{errors.privacy}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit" disabled={isSubmitting}
          className="w-full rounded-full px-8 py-4 text-base font-semibold text-white bg-[#206FF7] hover:bg-[#1a5cd4] hover:shadow-lg hover:shadow-[#206FF7]/25 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed transition-all"
          style={{ fontFamily: 'var(--font-montserrat)' }}
        >
          {isSubmitting ? (
            <span className="inline-flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
              {t.submitting}
            </span>
          ) : t.submit}
        </button>
      </form>
    </div>
  );
}
