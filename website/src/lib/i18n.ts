import en from './translations/en.json';
import de from './translations/de.json';
import pl from './translations/pl.json';

/** Supported language codes */
export type Lang = 'en' | 'de' | 'pl';

/** Shape of a translation file (derived from the English source of truth) */
export type Translations = typeof en;

const translations: Record<string, Translations> = { en, de, pl };

/**
 * Get the full translation object for a given language.
 * Falls back to English if the language is not found.
 *
 * @example
 * ```astro
 * ---
 * import { getTranslations } from '../lib/i18n';
 * const t = getTranslations('de');
 * ---
 * <h1>{t.header.waitlist}</h1>
 * ```
 */
export function getTranslations(lang: string): Translations {
  return translations[lang] || translations.en;
}

/**
 * Get a specific translation value by dot-notation key.
 * Falls back to English if the language is not found.
 * Returns the key itself if no translation exists at the path.
 *
 * @example
 * ```ts
 * t('en', 'footer.disclaimerTitle') // => "Medical disclaimer"
 * t('de', 'nav.howItWorks')         // => "Funktion"
 * t('en', 'missing.key')            // => "missing.key"
 * ```
 */
export function t(lang: string, key: string): string {
  const keys = key.split('.');
  let result: unknown = translations[lang] || translations.en;

  for (const k of keys) {
    if (result !== null && typeof result === 'object' && k in result) {
      result = (result as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }

  return typeof result === 'string' ? result : key;
}
