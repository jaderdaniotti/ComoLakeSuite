import { NextRequest, NextResponse } from "next/server";
import { syncAllSuites } from "@/src/lib/blockedDates";

/**
 * GET /api/availability/sync
 *
 * Scarica tutti i feed iCal configurati (Booking.com, Airbnb, Expedia)
 * per ogni suite e salva i giorni bloccati in public/blocked-dates.json.
 *
 * Chiamato dal cron job di Vercel ogni ora (vedi vercel.json).
 * Protetto dal parametro ?key=CRON_SECRET o header x-cron-secret.
 */

function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  // In sviluppo senza secret configurato: accesso libero
  if (!secret) return true;
  const key =
    req.nextUrl.searchParams.get("key") ??
    req.headers.get("x-cron-secret");
  return key === secret;
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
