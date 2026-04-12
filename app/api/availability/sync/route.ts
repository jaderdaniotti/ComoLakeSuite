import { NextRequest, NextResponse } from "next/server";
import { syncAllSuites } from "@/src/lib/blockedDates";

/**
 * GET /api/availability/sync
 *
 * Scarica tutti i feed iCal configurati (Booking.com, Airbnb, Expedia)
 * per ogni suite e salva i giorni bloccati in public/ota-dates.json.
 *
 * Chiamato dal cron job di Vercel una volta al giorno (vedi vercel.json; UTC) e,
 * opzionalmente, da GitHub Actions ogni 5 min (workflow sync-availability).
 * Protetto da CRON_SECRET: query ?key=, header x-cron-secret, oppure
 * Authorization: Bearer … (così invoca anche il cron nativo Vercel).
 */

function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  // In sviluppo senza secret configurato: accesso libero
  if (!secret) return true;
  const qp = req.nextUrl.searchParams.get("key");
  if (qp === secret) return true;
  if (req.headers.get("x-cron-secret") === secret) return true;
  const auth = req.headers.get("authorization");
  if (auth === `Bearer ${secret}`) return true;
  return false;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await syncAllSuites();
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("[availability/sync] fatal error:", err);
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
