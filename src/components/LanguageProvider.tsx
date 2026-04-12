"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  DEFAULT_LOCALE,
  LANGUAGE_COOKIE,
  normalizeLocale,
  type Locale,
} from "@/src/lib/i18n";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (nextLocale: Locale) => void;
  toggleLocale: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

type Props = {
  initialLocale: Locale;
  children: ReactNode;
};

export default function LanguageProvider({ initialLocale, children }: Props) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const router = useRouter();

  const writeCookie = useCallback((nextLocale: Locale) => {
    document.cookie = `${LANGUAGE_COOKIE}=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
  }, []);

  const setLocale = useCallback(
    (nextLocale: Locale) => {
      const normalized = normalizeLocale(nextLocale);
      setLocaleState(normalized);
      writeCookie(normalized);
      router.refresh();
    },
    [router, writeCookie],
  );

  const toggleLocale = useCallback(() => {
    setLocale(locale === "it" ? "en" : "it");
  }, [locale, setLocale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      toggleLocale,
    }),
    [locale, setLocale, toggleLocale],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    return {
      locale: DEFAULT_LOCALE,
      setLocale: () => undefined,
      toggleLocale: () => undefined,
    };
  }
  return ctx;
}

