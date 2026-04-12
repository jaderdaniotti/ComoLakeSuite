import { NextRequest, NextResponse } from "next/server";
import { syncAllSuites } from "@/src/lib/blockedDates";

/**
 * GET /api/availability/sync
 *
 * Scarica tutti i feed iCal configurati (Booking.com, Airbnb, Expedia)
 * per ogni suite e salva i giorni bloccati su Blob (ota-dates.json).
 *
 * Chiamato da:
 * - GitHub Actions ogni 5 min (workflow sync-availability) con header x-cron-secret
 * - Client-side on-demand (quando l'utente apre una pagina suite) senza auth
 * - Manualmente con ?key= o header per forzare sync
 *
 * Throttling: max 1 sync effettiva ogni 5 min; richieste intermedie ricevono cache.
 */

function hasAuthToken(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const qp = req.nextUrl.searchParams.get("key");
  if (qp === secret) return true;
  if (req.headers.get("x-cron-secret") === secret) return true;
  const auth = req.headers.get("authorization");
  if (auth === `Bearer ${secret}`) return true;
  return false;
}

export async function GET(req: NextRequest) {
  try {
    // Se ha token valido, forza sync (bypassa throttling)
    const force = hasAuthToken(req);
    const result = await syncAllSuites(force);
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("[availability/sync] fatal error:", err);
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
