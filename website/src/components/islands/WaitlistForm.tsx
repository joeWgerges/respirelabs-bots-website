import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface WaitlistFormProps {
  lang?: 'en' | 'de' | 'pl';
  source?: string;
  compact?: boolean;
}

interface WaitlistFormData {
  email: string;
  firstName: string;
  interest: string[];
  hearAbout: string;
  privacyConsent: boolean;
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
    alreadySignedUp: "You're already on the waitlist!",
    alreadySignedUpBody: "We'll notify you when early access is available.",
    required: 'This field is required',
    invalidEmail: 'Please enter a valid email',
    minName: 'Must be at least 2 characters',
    selectOne: 'Please select at least one option',
    acceptPrivacy: 'Please accept the privacy policy',
    errorTitle: 'Something went wrong',
    errorBody: 'Please try again in a moment.',
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
    successBody: 'Wir senden eine Bestatigung an deine E-Mail. Bleib gespannt auf den Early Access.',
    alreadySignedUp: 'Du bist bereits auf der Warteliste!',
    alreadySignedUpBody: 'Wir benachrichtigen dich, sobald der Early Access verfugbar ist.',
    required: 'Dieses Feld ist erforderlich',
    invalidEmail: 'Bitte gib eine gultige E-Mail ein',
    minName: 'Muss mindestens 2 Zeichen lang sein',
    selectOne: 'Bitte wahle mindestens eine Option',
    acceptPrivacy: 'Bitte akzeptiere die Datenschutzerklarung',
    errorTitle: 'Etwas ist schiefgelaufen',
    errorBody: 'Bitte versuche es in einem Moment erneut.',
  },
  pl: {
    email: 'Adres e-mail',
    emailPlaceholder: 'anna@example.com',
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
    successBody: 'Wyslemy potwierdzenie na Twoj e-mail. Czekaj na wczesny dostep.',
    alreadySignedUp: 'Jestes juz na liscie oczekujacych!',
    alreadySignedUpBody: 'Powiadomimy Cie, gdy wczesny dostep bedzie dostepny.',
    required: 'To pole jest wymagane',
    invalidEmail: 'Prosze podac poprawny e-mail',
    minName: 'Musi miec co najmniej 2 znaki',
    selectOne: 'Prosze wybrac co najmniej jedna opcje',
    acceptPrivacy: 'Prosze zaakceptowac polityke prywatnosci',
    errorTitle: 'Cos poszlo nie tak',
    errorBody: 'Sprobuj ponownie za chwile.',
  },
} as const;

const privacyPaths: Record<string, string> = {
  en: '/en/privacy',
  de: '/de/datenschutz',
  pl: '/pl/polityka-prywatnosci',
};

const STORAGE_KEY = 'respirelabs_waitlist_submitted';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getStoredEmail(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function storeEmail(email: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, email);
  } catch {
    // localStorage unavailable (e.g. private browsing) -- silently ignore
  }
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function Spinner() {
  return (
    <svg
      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline-block"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

function CheckmarkIcon() {
  return (
    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
      <svg
        className="h-8 w-8 text-green-600 dark:text-green-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2.5"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
  );
}

/** Custom checkbox indicator -- renders the box with optional checkmark */
function CheckboxIndicator({ checked }: { checked: boolean }) {
  return (
    <span
      className={`flex h-5 w-5 items-center justify-center rounded-md border-2 transition-all duration-200 flex-shrink-0
        ${checked ? 'border-[#206FF7] bg-[#206FF7]' : 'border-[#E5E7EB] bg-white dark:border-white/10 dark:bg-[#1F2937] group-hover:border-[#206FF7]/50'}`}
      aria-hidden="true"
    >
      <svg
        className={`h-3 w-3 text-white transition-opacity duration-150 ${checked ? 'opacity-100' : 'opacity-0'}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="3"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );
}

function ErrorBanner({ title, body, onDismiss }: { title: string; body: string; onDismiss: () => void }) {
  return (
    <div
      className="mb-6 rounded-xl border border-red-200 dark:border-red-800/30 bg-red-50 dark:bg-red-900/20 p-4 flex items-start gap-3"
      role="alert"
    >
      <svg
        className="h-5 w-5 text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
        />
      </svg>
      <div className="flex-1">
        <p className="text-sm font-semibold text-red-800 dark:text-red-300" style={{ fontFamily: 'var(--font-montserrat)' }}>
          {title}
        </p>
        <p className="text-sm text-red-700 dark:text-red-400 mt-0.5" style={{ fontFamily: 'var(--font-montserrat)' }}>
          {body}
        </p>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="text-red-400 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors flex-shrink-0"
        aria-label="Dismiss"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Compact form (email-only for sticky bar / popup)
// ---------------------------------------------------------------------------

function CompactForm({ lang, source, t }: { lang: string; source: string; t: typeof translations.en }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({ mode: 'onBlur' });

  const [status, setStatus] = useState<FormStatus>('idle');
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

  useEffect(() => {
    if (getStoredEmail()) setAlreadySubmitted(true);
  }, []);

  const onSubmit: SubmitHandler<{ email: string }> = async (data) => {
    setStatus('submitting');
    try {
      // Simulate API call -- replace with real POST /api/waitlist when ready
      await new Promise((resolve) => setTimeout(resolve, 1500));
      storeEmail(data.email);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (alreadySubmitted || status === 'success') {
    return (
      <p
        className="text-sm font-medium text-green-700 dark:text-green-400"
        style={{ fontFamily: 'var(--font-montserrat)' }}
      >
        {status === 'success' ? t.successTitle : t.alreadySignedUp}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-start gap-3 w-full" noValidate>
      <div className="flex-1">
        <label htmlFor="compact-email" className="sr-only">
          {t.email}
        </label>
        <input
          id="compact-email"
          type="email"
          placeholder={t.emailPlaceholder}
          disabled={status === 'submitting'}
          {...register('email', {
            required: t.required,
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: t.invalidEmail },
          })}
          className={`block w-full rounded-xl border bg-white dark:bg-[#1F2937] px-4 py-3 text-sm transition-colors placeholder:text-[#6B7280] dark:placeholder:text-[#9CA3AF]
            ${errors.email ? 'border-red-400 focus:border-red-500 focus:ring-red-200 dark:border-red-500 dark:focus:ring-red-500/20' : 'border-[#E5E7EB] dark:border-white/10 focus:border-[#206FF7] focus:ring-[#206FF7]/20'}
            focus:outline-none focus:ring-2 disabled:opacity-60 disabled:cursor-not-allowed`}
          style={{ fontFamily: 'var(--font-montserrat)', color: 'var(--text-primary)' }}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-600 dark:text-red-400" style={{ fontFamily: 'var(--font-montserrat)' }}>
            {errors.email.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white transition-all duration-200
          bg-[#206FF7] hover:bg-[#1a5cd4] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
        style={{ fontFamily: 'var(--font-montserrat)' }}
      >
        {status === 'submitting' && <Spinner />}
        {status === 'submitting' ? t.submitting : t.submit}
      </button>
    </form>
  );
}

// ---------------------------------------------------------------------------
// Full form
// ---------------------------------------------------------------------------

export default function WaitlistForm({ lang = 'en', source = 'waitlist', compact = false }: WaitlistFormProps) {
  const t = translations[lang] || translations.en;
  const privacyPath = privacyPaths[lang] || privacyPaths.en;

  const [status, setStatus] = useState<FormStatus>('idle');
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

  useEffect(() => {
    if (getStoredEmail()) setAlreadySubmitted(true);
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<WaitlistFormData>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      firstName: '',
      interest: [],
      hearAbout: '',
      privacyConsent: false,
    },
  });

  // Watch checkbox values so we can render custom indicators
  const interestValues = watch('interest') || [];
  const privacyConsentValue = watch('privacyConsent');

  // Compact variant
  if (compact) {
    return <CompactForm lang={lang} source={source} t={t} />;
  }

  // Already-submitted screen
  if (alreadySubmitted) {
    return (
      <div className="text-center py-12 px-4">
        <CheckmarkIcon />
        <h3
          className="text-2xl font-bold mb-3"
          style={{ fontFamily: 'var(--font-oddval)', color: 'var(--text-primary)' }}
        >
          {t.alreadySignedUp}
        </h3>
        <p
          className="text-base max-w-sm mx-auto"
          style={{ fontFamily: 'var(--font-montserrat)', color: 'var(--text-secondary)' }}
        >
          {t.alreadySignedUpBody}
        </p>
      </div>
    );
  }

  // Success screen
  if (status === 'success') {
    return (
      <div className="text-center py-12 px-4">
        <CheckmarkIcon />
        <h3
          className="text-2xl font-bold mb-3"
          style={{ fontFamily: 'var(--font-oddval)', color: 'var(--text-primary)' }}
        >
          {t.successTitle}
        </h3>
        <p
          className="text-base max-w-sm mx-auto"
          style={{ fontFamily: 'var(--font-montserrat)', color: 'var(--text-secondary)' }}
        >
          {t.successBody}
        </p>
      </div>
    );
  }

  const onSubmit: SubmitHandler<WaitlistFormData> = async (data) => {
    setStatus('submitting');
    try {
      // Simulate API call -- replace with real POST /api/waitlist when endpoint exists
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Uncomment when API is ready:
      // const response = await fetch('/api/waitlist', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     email: data.email,
      //     firstName: data.firstName,
      //     interest: data.interest,
      //     hearAbout: data.hearAbout,
      //     source,
      //     lang,
      //   }),
      // });
      // if (!response.ok) throw new Error('Failed to submit');

      storeEmail(data.email);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const isSubmitting = status === 'submitting';

  return (
    <div>
      {status === 'error' && (
        <ErrorBanner
          title={t.errorTitle}
          body={t.errorBody}
          onDismiss={() => setStatus('idle')}
        />
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        {/* Name + Email row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* First name */}
          <div>
            <label
              htmlFor="wf-firstName"
              className="block text-sm font-medium mb-2"
              style={{ fontFamily: 'var(--font-montserrat)', color: 'var(--text-primary)' }}
            >
              {t.firstName} <span className="text-red-500">*</span>
            </label>
            <input
              id="wf-firstName"
              type="text"
              disabled={isSubmitting}
              placeholder={t.firstNamePlaceholder}
              {...register('firstName', {
                required: t.required,
                minLength: { value: 2, message: t.minName },
              })}
              className={`block w-full rounded-xl border bg-white dark:bg-[#1F2937] px-4 py-3 text-sm transition-colors placeholder:text-[#6B7280] dark:placeholder:text-[#9CA3AF]
                ${errors.firstName ? 'border-red-400 focus:border-red-500 focus:ring-red-200 dark:border-red-500 dark:focus:ring-red-500/20' : 'border-[#E5E7EB] dark:border-white/10 focus:border-[#206FF7] focus:ring-[#206FF7]/20'}
                focus:outline-none focus:ring-2 disabled:opacity-60 disabled:cursor-not-allowed`}
              style={{ fontFamily: 'var(--font-montserrat)', color: 'var(--text-primary)' }}
            />
            {errors.firstName && (
              <p className="mt-1.5 text-xs text-red-600 dark:text-red-400" style={{ fontFamily: 'var(--font-montserrat)' }}>
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="wf-email"
              className="block text-sm font-medium mb-2"
              style={{ fontFamily: 'var(--font-montserrat)', color: 'var(--text-primary)' }}
            >
              {t.email} <span className="text-red-500">*</span>
            </label>
            <input
              id="wf-email"
              type="email"
              disabled={isSubmitting}
              placeholder={t.emailPlaceholder}
              {...register('email', {
                required: t.required,
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: t.invalidEmail,
                },
              })}
              className={`block w-full rounded-xl border bg-white dark:bg-[#1F2937] px-4 py-3 text-sm transition-colors placeholder:text-[#6B7280] dark:placeholder:text-[#9CA3AF]
                ${errors.email ? 'border-red-400 focus:border-red-500 focus:ring-red-200 dark:border-red-500 dark:focus:ring-red-500/20' : 'border-[#E5E7EB] dark:border-white/10 focus:border-[#206FF7] focus:ring-[#206FF7]/20'}
                focus:outline-none focus:ring-2 disabled:opacity-60 disabled:cursor-not-allowed`}
              style={{ fontFamily: 'var(--font-montserrat)', color: 'var(--text-primary)' }}
            />
            {errors.email && (
              <p className="mt-1.5 text-xs text-red-600 dark:text-red-400" style={{ fontFamily: 'var(--font-montserrat)' }}>
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* Interest checkboxes */}
        <fieldset>
          <legend
            className="block text-sm font-medium mb-3"
            style={{ fontFamily: 'var(--font-montserrat)', color: 'var(--text-primary)' }}
          >
            {t.interest} <span className="text-red-500">*</span>
          </legend>
          <div className="space-y-3">
            {(['app', 'tape', 'both'] as const).map((value) => {
              const labelMap = { app: t.app, tape: t.tape, both: t.both };
              const isChecked = Array.isArray(interestValues) && interestValues.includes(value);
              return (
                <label
                  key={value}
                  className={`flex items-center gap-3 cursor-pointer select-none group ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  <input
                    type="checkbox"
                    value={value}
                    disabled={isSubmitting}
                    {...register('interest', {
                      validate: (v) => (v && v.length > 0) || t.selectOne,
                    })}
                    className="sr-only"
                  />
                  <CheckboxIndicator checked={isChecked} />
                  <span
                    className="text-sm"
                    style={{ fontFamily: 'var(--font-montserrat)', color: 'var(--text-primary)' }}
                  >
                    {labelMap[value]}
                  </span>
                </label>
              );
            })}
          </div>
          {errors.interest && (
            <p className="mt-1.5 text-xs text-red-600 dark:text-red-400" style={{ fontFamily: 'var(--font-montserrat)' }}>
              {errors.interest.message}
            </p>
          )}
        </fieldset>

        {/* How did you hear about us */}
        <div>
          <label
            htmlFor="wf-hearAbout"
            className="block text-sm font-medium mb-2"
            style={{ fontFamily: 'var(--font-montserrat)', color: 'var(--text-primary)' }}
          >
            {t.hearAbout}
          </label>
          <div className="relative">
            <select
              id="wf-hearAbout"
              disabled={isSubmitting}
              {...register('hearAbout')}
              className="block w-full rounded-xl border border-[#E5E7EB] dark:border-white/10 bg-white dark:bg-[#1F2937] px-4 py-3 pr-10 text-sm transition-colors
                focus:border-[#206FF7] focus:ring-2 focus:ring-[#206FF7]/20 focus:outline-none
                disabled:opacity-60 disabled:cursor-not-allowed appearance-none"
              style={{ fontFamily: 'var(--font-montserrat)', color: 'var(--text-primary)' }}
            >
              <option value="">{t.hearAboutPlaceholder}</option>
              {t.hearAboutOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <svg
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#6B7280] dark:text-[#9CA3AF]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Privacy consent */}
        <div className="pt-4 border-t border-[#E5E7EB] dark:border-white/10">
          <label
            className={`flex items-start gap-3 cursor-pointer select-none group ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            <input
              type="checkbox"
              disabled={isSubmitting}
              {...register('privacyConsent', {
                required: t.acceptPrivacy,
              })}
              className="sr-only"
            />
            <span className="mt-0.5">
              <CheckboxIndicator checked={!!privacyConsentValue} />
            </span>
            <span
              className="text-sm leading-snug"
              style={{ fontFamily: 'var(--font-montserrat)', color: 'var(--text-primary)' }}
            >
              {t.privacy}{' '}
              <a
                href={privacyPath}
                className="text-[#206FF7] dark:text-[#60a5fa] hover:underline font-medium"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                {t.privacyLink}
              </a>
              {t.privacySuffix}
            </span>
          </label>
          {errors.privacyConsent && (
            <p className="mt-1.5 text-xs text-red-600 dark:text-red-400 ml-8" style={{ fontFamily: 'var(--font-montserrat)' }}>
              {errors.privacyConsent.message}
            </p>
          )}
        </div>

        {/* Submit button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold text-white transition-all duration-200
              bg-[#206FF7] hover:bg-[#1a5cd4] hover:shadow-lg hover:shadow-[#206FF7]/25
              active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            style={{ fontFamily: 'var(--font-montserrat)' }}
          >
            {isSubmitting && <Spinner />}
            {isSubmitting ? t.submitting : t.submit}
          </button>
        </div>
      </form>
    </div>
  );
}
