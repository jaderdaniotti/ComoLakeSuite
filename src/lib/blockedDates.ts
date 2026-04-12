import type { SuitePriceId } from "@/src/data/suitePrices";
import { fetchBlockedDates } from "./ical";
import path from "path";
import fs from "fs/promises";

/** Mappa suiteId → feed iCal per OTA (solo variabili env configurate) */
export const ICAL_URLS: Record<SuitePriceId, Record<string, string | undefined>> = {
  "suite-cavour": {
    booking: process.env.BOOKING_ICAL_SUITE_CAVOUR,
    airbnb: process.env.AIRBNB_ICAL_SUITE_CAVOUR,
    // expedia: process.env.EXPEDIA_ICAL_SUITE_CAVOUR,
  },
  "suite-volta": {
    booking: process.env.BOOKING_ICAL_SUITE_VOLTA,
    airbnb: process.env.AIRBNB_ICAL_SUITE_VOLTA,
    // expedia: process.env.EXPEDIA_ICAL_SUITE_VOLTA,
  },
  "suite-vista-duomo": {
    booking: process.env.BOOKING_ICAL_SUITE_DUOMO,
    airbnb: process.env.AIRBNB_ICAL_SUITE_DUOMO,
    // expedia: process.env.EXPEDIA_ICAL_SUITE_DUOMO,
  },
  "suite-dante": {
    booking: process.env.BOOKING_ICAL_SUITE_DANTE,
    airbnb: process.env.AIRBNB_ICAL_SUITE_DANTE,
    // expedia: process.env.EXPEDIA_ICAL_SUITE_DANTE,
  },
  "suite-cernobbio": {
    booking: process.env.BOOKING_ICAL_SUITE_CERNOBBIO,
    airbnb: process.env.AIRBNB_ICAL_SUITE_CERNOBBIO,
    // expedia: process.env.EXPEDIA_ICAL_SUITE_CERNOBBIO,
  },
  "suite-como-sole": {
    booking: process.env.BOOKING_ICAL_SUITE_COMOSOLE,
    airbnb: process.env.AIRBNB_ICAL_SUITE_COMOSOLE,
    // expedia: process.env.EXPEDIA_ICAL_SUITE_COMOSOLE,
  },
};

export type BlockedDatesStore = Record<string, string[]>; // suiteId → YYYY-MM-DD[]

/**
 * blocked-dates.json → solo prenotazioni dirette dal sito (PayPal).
 * Scritto da capture-order dopo ogni pagamento.
 */
const DIRECT_DATES_PATH = path.join(process.cwd(), "public", "blocked-dates.json");

/**
 * ota-dates.json → cache delle date dai feed iCal OTA (Booking.com, Airbnb, …).
 * Aggiornato dal cron Vercel (max 1/giorno su Hobby) tramite syncAllSuites().
 */
const OTA_DATES_PATH = path.join(process.cwd(), "public", "ota-dates.json");

/** Legge un file JSON dello store. Restituisce {} se non esiste. */
async function readStore(filePath: string): Promise<BlockedDatesStore> {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as BlockedDatesStore;
  } catch {
    return {};
  }
}

/**
 * Legge e unisce le date dirette + OTA per tutte le suite.
 * Usato da /api/availability/blocked e /api/availability/check.
 */
export async function readBlockedDates(): Promise<BlockedDatesStore> {
  const [direct, ota] = await Promise.all([
    readStore(DIRECT_DATES_PATH),
    readStore(OTA_DATES_PATH),
  ]);

  const merged: BlockedDatesStore = { ...ota };
  for (const [suiteId, dates] of Object.entries(direct)) {
    const set = new Set([...(merged[suiteId] ?? []), ...dates]);
    merged[suiteId] = Array.from(set).sort();
  }
  return merged;
}

/**
 * Scrive le date dei booking diretti (PayPal) in blocked-dates.json.
 * NON tocca ota-dates.json.
 */
export async function writeBlockedDates(data: BlockedDatesStore): Promise<void> {
  await fs.writeFile(DIRECT_DATES_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export type SyncResult = {
  synced: string[];
  errors: string[];
  syncedAt: string;
};

/**
 * Scarica tutti i feed iCal OTA configurati e salva il risultato in ota-dates.json.
 * NON tocca blocked-dates.json (prenotazioni dirette): i due file sono indipendenti.
 * Chiamato dal cron Vercel (schedulazione in vercel.json).
 */
export async function syncAllSuites(): Promise<SyncResult> {
  const current = await readStore(OTA_DATES_PATH);
  const synced: string[] = [];
  const errors: string[] = [];

  for (const [suiteId, feeds] of Object.entries(ICAL_URLS)) {
    const otaDates = new Set<string>();

    for (const [source, url] of Object.entries(feeds)) {
      if (!url) continue;
      try {
        const dates = await fetchBlockedDates(url);
        dates.forEach((d) => otaDates.add(d));
        synced.push(`${suiteId}:${source} (${dates.length} giorni)`);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        errors.push(`${suiteId}:${source} → ${msg}`);
        console.error(`[ical-sync] ${suiteId}:${source}`, err);
      }
    }

    // Aggiorna solo la suite corrente, mantieni le altre intatte
    current[suiteId] = Array.from(otaDates).sort();
  }

  await fs.writeFile(OTA_DATES_PATH, JSON.stringify(current, null, 2), "utf-8");

  return { synced, errors, syncedAt: new Date().toISOString() };
}
