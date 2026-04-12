import { NextRequest, NextResponse } from "next/server";
import { readBlockedDates } from "@/src/lib/blockedDates";

/**
 * POST /api/availability/check
 *
 * Verifica la disponibilità di una suite per le date richieste
 * leggendo i giorni bloccati da public/blocked-dates.json
 * (date OTA aggiornate al massimo una volta al giorno dal cron Vercel su /api/availability/sync).
 *
 * Body: { suiteId: string, checkIn: string (YYYY-MM-DD), checkOut: string (YYYY-MM-DD) }
 * Response: { available: boolean, reason?: string }
 */

function addOneDay(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d + 1);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { suiteId, checkIn, checkOut } = body as {
      suiteId: string;
      checkIn: string;
      checkOut: string;
    };

    if (!suiteId || !checkIn || !checkOut) {
      return NextResponse.json(
        { available: false, reason: "Parametri mancanti." },
        { status: 400 }
      );
    }

    const store = await readBlockedDates();
    const blocked = new Set(store[suiteId] ?? []);

    // Controlla ogni giorno [checkIn, checkOut) — il giorno di checkout non conta
    let cursor = checkIn;
    while (cursor < checkOut) {
      if (blocked.has(cursor)) {
        return NextResponse.json({
          available: false,
          reason: `La suite non è disponibile per alcune delle date selezionate. Prova con altre date.`,
        });
      }
      cursor = addOneDay(cursor);
    }

    return NextResponse.json({ available: true });
  } catch (err) {
    console.error("availability/check error:", err);
    return NextResponse.json(
      { available: false, reason: "Errore interno del server." },
      { status: 500 }
    );
  }
}
