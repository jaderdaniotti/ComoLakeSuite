export const LANGUAGE_COOKIE = "lang";

export const SUPPORTED_LOCALES = ["it", "en"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "it";

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "it" || value === "en";
}

export function normalizeLocale(value: string | null | undefined): Locale {
  if (isLocale(value)) return value;
  return DEFAULT_LOCALE;
}

type CookieStoreLike = {
  get: (name: string) => { value?: string } | undefined;
};

export function getServerLocale(cookieStore: CookieStoreLike): Locale {
  return normalizeLocale(cookieStore.get(LANGUAGE_COOKIE)?.value);
}

export function t(locale: Locale, it: string, en: string): string {
  return locale === "en" ? en : it;
}

