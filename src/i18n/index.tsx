import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { Dictionary, Locale } from './types';
import { pt } from './pt';
import { en } from './en';

const dictionaries: Record<Locale, Dictionary> = { pt, en };

const STORAGE_KEY = 'bm-locale';

function detectInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'pt';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'pt' || stored === 'en') return stored;
  const nav = window.navigator.language?.toLowerCase() ?? '';
  return nav.startsWith('pt') ? 'pt' : 'en';
}

interface I18nContextValue {
  locale: Locale;
  t: Dictionary;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectInitialLocale);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, next);
      document.documentElement.lang = dictionaries[next].htmlLang;
    }
  };

  const toggleLocale = () => setLocale(locale === 'pt' ? 'en' : 'pt');

  const value = useMemo<I18nContextValue>(
    () => ({ locale, t: dictionaries[locale], setLocale, toggleLocale }),
    [locale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
