import { NextRequest, NextResponse } from "next/server";
import { readBlockedDates } from "@/src/lib/blockedDates";

/**
 * GET /api/availability/blocked?suiteId=suite-cavour
 *
 * Restituisce l'array di date ISO bloccate per la suite richiesta,
 * lette da public/blocked-dates.json (aggiornato dal cron di sync).
 *
 * Response: { suiteId: string, blocked: string[] }
 */
export async function GET(req: NextRequest) {
  const suiteId = req.nextUrl.searchParams.get("suiteId");

  if (!suiteId) {
    return NextResponse.json({ error: "suiteId mancante" }, { status: 400 });
  }

  const store = await readBlockedDates();
  const blocked = store[suiteId] ?? [];

  return NextResponse.json(
    { suiteId, blocked },
    {
      headers: {
        // Risposta sempre fresca: dopo una prenotazione le date devono riflettersi subito.
        "Cache-Control": "no-store",
      },
    }
  );
}
