import type { SuitePriceId } from "@/src/data/suitePrices";
import { fetchBlockedDates } from "./ical";
import path from "path";
import fs from "fs/promises";
import { get, put } from "@vercel/blob";

type BlobAccess = "public" | "private";

/** Pathname nello store Blob. */
const OTA_BLOB_PATHNAME = "availability/ota-dates.json";
const DIRECT_BLOB_PATHNAME = "availability/direct-dates.json";

function hasOtaBlobStore(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
}

function getBlobAccessOption(): BlobAccess {
  const raw = (process.env.BLOB_OBJECT_ACCESS ?? "").trim().toLowerCase();
  if (raw === "public" || raw === "private") {
    return raw;
  }
  return "private";
}

async function readOtaFromBlob(): Promise<BlockedDatesStore> {
  const result = await get(OTA_BLOB_PATHNAME, { access: getBlobAccessOption() });
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
  const access = getBlobAccessOption();
  await put(OTA_BLOB_PATHNAME, JSON.stringify(data), {
    access,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

async function readDirectFromBlob(): Promise<BlockedDatesStore> {
  const result = await get(DIRECT_BLOB_PATHNAME, { access: getBlobAccessOption() });
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

async function writeDirectToBlob(data: BlockedDatesStore): Promise<void> {
  const access = getBlobAccessOption();
  await put(DIRECT_BLOB_PATHNAME, JSON.stringify(data), {
    access,
    allowOverwrite: true,
    contentType: "application/json",
  });
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

const THROTTLE_MS = 5 * 60 * 1000; // 5 minuti
let lastSyncTime = 0;
let lastSyncResult: SyncResult | null = null;

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
 * Legge i blocchi OTA:
 * - Blob se configurato
 * - su Vercel senza Blob: sync live + cache in-memory
 * - in locale: file public/ota-dates.json
 */
async function readOtaStore(): Promise<BlockedDatesStore> {
  if (hasOtaBlobStore()) {
    return readOtaFromBlob();
  }
  return readStore(OTA_DATES_PATH);
}

/**
 * Legge i blocchi diretti (prenotazioni dal sito):
 * - su Vercel: Blob `availability/direct-dates.json` se configurato
 * - in locale: file public/blocked-dates.json
 */
async function readDirectStore(): Promise<BlockedDatesStore> {
  if (hasOtaBlobStore()) {
    return readDirectFromBlob();
  }
  return readStore(DIRECT_DATES_PATH);
}

async function writeOtaStore(data: BlockedDatesStore): Promise<void> {
  if (hasOtaBlobStore()) {
    await writeOtaToBlob(data);
    return;
  }
  if (process.env.VERCEL) {
    throw new Error(
      "BLOB_READ_WRITE_TOKEN non configurato in Vercel: impossibile salvare ota-dates in produzione."
    );
  }
  await fs.writeFile(OTA_DATES_PATH, JSON.stringify(data, null, 2), "utf-8");
}

async function writeDirectStore(data: BlockedDatesStore): Promise<void> {
  if (hasOtaBlobStore()) {
    await writeDirectToBlob(data);
    return;
  }
  if (process.env.VERCEL) {
    throw new Error(
      "BLOB_READ_WRITE_TOKEN non configurato in Vercel: impossibile salvare direct-dates in produzione."
    );
  }
  await fs.writeFile(DIRECT_DATES_PATH, JSON.stringify(data, null, 2), "utf-8");
}

/**
 * Legge e unisce le date dirette + OTA per tutte le suite.
 * Usato da /api/availability/blocked e /api/availability/check.
 */
export async function readBlockedDates(): Promise<BlockedDatesStore> {
  const [direct, ota] = await Promise.all([
    readDirectStore(),
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
  await writeDirectStore(data);
}

/** Aggiunge subito al calendario diretto le date di una nuova prenotazione. */
export async function addDirectBookingDates(
  suiteId: string,
  dates: string[]
): Promise<void> {
  const direct = await readDirectStore();
  const set = new Set([...(direct[suiteId] ?? []), ...dates]);
  direct[suiteId] = Array.from(set).sort();
  await writeDirectStore(direct);
}

export type SyncResult = {
  synced: string[];
  errors: string[];
  syncedAt: string;
  fromCache?: boolean; // true se restituito da cache (throttling attivo)
};

async function fetchAllOtaSuites(): Promise<{
  store: BlockedDatesStore;
  synced: string[];
  errors: string[];
}> {
  const previous = await readOtaStore();
  const current: BlockedDatesStore = {};
  const synced: string[] = [];
  const errors: string[] = [];

  for (const [suiteId, feeds] of Object.entries(ICAL_URLS)) {
    const otaDates = new Set<string>();
    let hasConfiguredFeed = false;
    let hasSuccessfulFeed = false;

    for (const [source, url] of Object.entries(feeds)) {
      if (!url) continue;
      hasConfiguredFeed = true;
      try {
        const dates = await fetchBlockedDates(url);
        dates.forEach((d) => otaDates.add(d));
        hasSuccessfulFeed = true;
        synced.push(`${suiteId}:${source} (${dates.length} giorni)`);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        errors.push(`${suiteId}:${source} -> ${msg}`);
        console.error(`[ical-sync] ${suiteId}:${source}`, err);
      }
    }

    // Se tutti i feed della suite falliscono, mantieni l'ultimo dato noto.
    if (hasConfiguredFeed && !hasSuccessfulFeed) {
      current[suiteId] = [...(previous[suiteId] ?? [])];
      continue;
    }

    current[suiteId] = Array.from(otaDates).sort();
  }

  return { store: current, synced, errors };
}

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

  const { store, synced, errors } = await fetchAllOtaSuites();
  await writeOtaStore(store);

  const result: SyncResult = { synced, errors, syncedAt: new Date().toISOString() };
  lastSyncResult = result;
  lastSyncTime = now;

  console.log(`[sync] ✅ Sincronizzazione completata: ${synced.length} feed scaricati, ${errors.length} errori`);

  return result;
}
