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

/** Path assoluto del file JSON con i giorni bloccati (in public/ per semplicità) */
export const BLOCKED_DATES_PATH = path.join(
  process.cwd(),
  "public",
  "blocked-dates.json"
);

export type BlockedDatesStore = Record<string, string[]>; // suiteId → YYYY-MM-DD[]

/** Legge lo store da disco. Restituisce {} se il file non esiste. */
export async function readBlockedDates(): Promise<BlockedDatesStore> {
  try {
    const raw = await fs.readFile(BLOCKED_DATES_PATH, "utf-8");
    return JSON.parse(raw) as BlockedDatesStore;
  } catch {
    return {};
  }
}

/** Scrive lo store su disco in modo atomico-like (sovrascrittura). */
export async function writeBlockedDates(data: BlockedDatesStore): Promise<void> {
  await fs.writeFile(BLOCKED_DATES_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export type SyncResult = {
  synced: string[];
  errors: string[];
  syncedAt: string;
};

/**
 * Scarica tutti i feed iCal configurati per tutte le suite,
 * fa il merge dei giorni bloccati e salva in blocked-dates.json.
 */
export async function syncAllSuites(): Promise<SyncResult> {
  const current = await readBlockedDates();
  const synced: string[] = [];
  const errors: string[] = [];

  for (const [suiteId, feeds] of Object.entries(ICAL_URLS)) {
    const merged = new Set<string>();

    for (const [source, url] of Object.entries(feeds)) {
      if (!url) continue;
      try {
        const dates = await fetchBlockedDates(url);
        dates.forEach((d) => merged.add(d));
        synced.push(`${suiteId}:${source} (${dates.length} giorni)`);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        errors.push(`${suiteId}:${source} → ${msg}`);
        console.error(`[ical-sync] ${suiteId}:${source}`, err);
      }
    }

    // Aggiorna solo la suite, mantieni le altre intatte
    current[suiteId] = Array.from(merged).sort();
  }

  await writeBlockedDates(current);

  return { synced, errors, syncedAt: new Date().toISOString() };
}
