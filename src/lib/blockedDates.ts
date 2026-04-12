import type { SuitePriceId } from "@/src/data/suitePrices";
import { fetchBlockedDates } from "./ical";
import path from "path";
import fs from "fs/promises";
import { get, put } from "@vercel/blob";

/** Pathname nello store Blob (stesso file aggiornato da syncAllSuites). */
const OTA_BLOB_PATHNAME = "availability/ota-dates.json";

function useOtaBlobStore(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
}

async function readOtaFromBlob(): Promise<BlockedDatesStore> {
  const result = await get(OTA_BLOB_PATHNAME, { access: "public" });
  if (!result || result.statusCode !== 200 || !result.stream) {
    return {};
  }
  const text = await new Response(result.stream).text();
  try {
    return JSON.parse(text) as BlockedDatesStore;
  } catch {
    return {};
  }
}

async function writeOtaToBlob(data: BlockedDatesStore): Promise<void> {
  await put(OTA_BLOB_PATHNAME, JSON.stringify(data), {
    access: "public",
    allowOverwrite: true,
    contentType: "application/json",
  });
}

/** Legge la cache OTA: Blob su Vercel se configurato, altrimenti file locale. */
async function readOtaStore(): Promise<BlockedDatesStore> {
  if (useOtaBlobStore()) {
    return readOtaFromBlob();
  }
  return readStore(OTA_DATES_PATH);
}

/** Scrive la cache OTA: Blob se configurato, altrimenti public/ota-dates.json (solo dev / filesystem scrivibile). */
async function writeOtaStore(data: BlockedDatesStore): Promise<void> {
  if (useOtaBlobStore()) {
    await writeOtaToBlob(data);
    return;
  }
  if (process.env.VERCEL) {
    throw new Error(
      "Su Vercel la sync OTA non può scrivere su disco. Aggiungi lo store Blob: Vercel Dashboard → Storage → Blob, poi la variabile BLOB_READ_WRITE_TOKEN nel progetto (Production)."
    );
  }
  await fs.writeFile(OTA_DATES_PATH, JSON.stringify(data, null, 2), "utf-8");
}

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
 * Cache date dai feed iCal OTA (Booking.com, Airbnb, …):
 * - in produzione su Vercel: file Blob `availability/ota-dates.json` (richiede BLOB_READ_WRITE_TOKEN);
 * - in locale: `public/ota-dates.json`.
 * Aggiornato da syncAllSuites() (cron Vercel e/o GitHub Actions).
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
    readOtaStore(),
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
  fromCache?: boolean; // true se restituito da cache (throttling attivo)
};

let lastSyncTime = 0;
let lastSyncResult: SyncResult | null = null;
const THROTTLE_MS = 5 * 60 * 1000; // 5 minuti

/**
 * Scarica tutti i feed iCal OTA configurati e salva il risultato in ota-dates.json.
 * NON tocca blocked-dates.json (prenotazioni dirette): i due file sono indipendenti.
 * Chiamato da GitHub Actions (ogni 5 min) e on-demand dal client (con throttling).
 *
 * @param force - Se true, bypassa il throttling e forza una nuova sync.
 */
export async function syncAllSuites(force = false): Promise<SyncResult> {
  const now = Date.now();

  // Throttling: se l'ultima sync è < 5 min fa, restituisci quella cached
  if (!force && lastSyncResult && now - lastSyncTime < THROTTLE_MS) {
    const ageSeconds = Math.floor((now - lastSyncTime) / 1000);
    console.log(`[sync] ⚡ Cache hit: restituisco dati di ${ageSeconds}s fa (throttling attivo)`);
    return { ...lastSyncResult, fromCache: true };
  }

  console.log(`[sync] 🔄 Nuova sincronizzazione: scarico feed iCal da Booking/Airbnb...`);

  const current = await readOtaStore();
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

  await writeOtaStore(current);

  const result: SyncResult = { synced, errors, syncedAt: new Date().toISOString() };
  lastSyncResult = result;
  lastSyncTime = now;

  console.log(`[sync] ✅ Sincronizzazione completata: ${synced.length} feed scaricati, ${errors.length} errori`);

  return result;
}
