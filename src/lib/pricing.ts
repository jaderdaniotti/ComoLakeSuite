import {
  SUITE_PRICES,
  type SuitePriceId,
  type SuitePriceSeason,
} from "@/src/data/suitePrices";

export type StayQuoteOk = {
  ok: true;
  nights: number;
  totalEuro: number;
  averagePerNightEuro: number;
  nightly: { date: string; euro: number }[];
};

export type StayQuoteErr = {
  ok: false;
  reason:
    | "invalid_dates"
    | "no_nights"
    | "missing_price"
    | "guests_not_supported";
  /** ISO date del primo giorno senza listino */
  firstMissingDate?: string;
};

export type StayQuoteResult = StayQuoteOk | StayQuoteErr;

/** Parsing YYYY-MM-DD in calendario locale (mezzanotte locale) */
export function parseISODateLocal(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function dayTime(d: Date): number {
  return startOfDay(d).getTime();
}

export function formatISODateLocal(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function addDaysLocal(d: Date, days: number): Date {
  const x = startOfDay(d);
  x.setDate(x.getDate() + days);
  return x;
}

export function countNights(checkIn: Date, checkOut: Date): number {
  const ms = dayTime(checkOut) - dayTime(checkIn);
  return Math.round(ms / 86_400_000);
}

function findSeasonForDate(
  suiteId: SuitePriceId,
  day: Date,
): SuitePriceSeason | null {
  const t = dayTime(day);
  const seasons = SUITE_PRICES[suiteId];
  for (const s of seasons) {
    const start = dayTime(parseISODateLocal(s.start));
    const end = dayTime(parseISODateLocal(s.end));
    if (t >= start && t <= end) return s;
  }
  return null;
}

/**
 * Prezzo per una notte (la notte che inizia il giorno `day`).
 * `guests`: numero persone (1–6) come da listino.
 */
export function getPricePerNightEuro(
  suiteId: SuitePriceId,
  day: Date,
  guests: number,
): number | null {
  if (guests < 1 || guests > 6) return null;
  const g = guests as 1 | 2 | 3 | 4 | 5 | 6;
  const season = findSeasonForDate(suiteId, day);
  if (!season) return null;
  const p = season.pricesEUR[g];
  return p === undefined ? null : p;
}

/** Min/max ospiti coperti dal listino (unione di tutte le stagioni) */
export function getSuiteGuestRange(suiteId: SuitePriceId): {
  min: number;
  max: number;
} {
  let min = 99;
  let max = 0;
  for (const s of SUITE_PRICES[suiteId]) {
    for (const k of [1, 2, 3, 4, 5, 6] as const) {
      if (s.pricesEUR[k] !== undefined) {
        min = Math.min(min, k);
        max = Math.max(max, k);
      }
    }
  }
  if (min > max) return { min: 1, max: 6 };
  return { min, max };
}

export function formatEuro(n: number): string {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

/**
 * Calcolo soggiorno: somma del prezzo di ogni notte (check-in incluso, check-out escluso).
 */
export function getStayQuote(
  suiteId: SuitePriceId,
  checkIn: Date,
  checkOut: Date,
  guests: number,
): StayQuoteResult {
  if (dayTime(checkOut) <= dayTime(checkIn)) {
    return { ok: false, reason: "invalid_dates" };
  }

  const nights = countNights(checkIn, checkOut);
  if (nights <= 0) return { ok: false, reason: "no_nights" };

  if (guests < 1 || guests > 6) {
    return { ok: false, reason: "guests_not_supported" };
  }

  const range = getSuiteGuestRange(suiteId);
  if (guests < range.min || guests > range.max) {
    return { ok: false, reason: "guests_not_supported" };
  }

  const nightly: { date: string; euro: number }[] = [];
  for (let i = 0; i < nights; i++) {
    const day = addDaysLocal(checkIn, i);
    const euro = getPricePerNightEuro(suiteId, day, guests);
    const iso = formatISODateLocal(day);
    if (euro === null) {
      return {
        ok: false,
        reason: "missing_price",
        firstMissingDate: iso,
      };
    }
    nightly.push({ date: iso, euro });
  }

  const totalEuro = nightly.reduce((s, n) => s + n.euro, 0);
  return {
    ok: true,
    nights,
    totalEuro,
    averagePerNightEuro: totalEuro / nights,
    nightly,
  };
}
