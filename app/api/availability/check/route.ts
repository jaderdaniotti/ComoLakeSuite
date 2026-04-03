import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/availability/check
 *
 * Verifica la disponibilità di una suite per le date richieste.
 *
 * Attualmente la risposta è mockata (sempre disponibile).
 * In futuro qui verranno integrate le chiamate alle API degli OTA:
 *  - Airbnb  → iCal / API host (https://www.airbnb.com/calendar/ical/<listing_id>.ics)
 *  - Booking.com → Connectivity API / iCal export
 *  - Expedia → EPS Rapid API (https://developers.expediagroup.com/docs/products/rapid)
 *
 * Il flusso previsto sarà:
 *  1. Recuperare i calendari iCal (o chiamare le API) per la suite indicata.
 *  2. Verificare che nessun giorno tra checkIn e checkOut (escluso) sia bloccato.
 *  3. Restituire { available: true } o { available: false, reason: string }.
 *
 * Body: { suiteId: string, checkIn: string (YYYY-MM-DD), checkOut: string (YYYY-MM-DD) }
 * Response: { available: boolean, reason?: string }
 */
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

    // ─── TODO: sostituire con chiamate reali agli OTA ────────────────────────
    //
    // Esempio Airbnb iCal:
    //   const icalUrl = `https://www.airbnb.com/calendar/ical/${AIRBNB_IDS[suiteId]}.ics`;
    //   const ical = await fetch(icalUrl).then(r => r.text());
    //   const blocked = parseICalBlockedDates(ical);
    //   const isAvailable = !blocked.some(d => d >= checkIn && d < checkOut);
    //
    // Esempio Booking.com Connectivity API:
    //   const res = await fetch(`https://supply-xml.booking.com/hotels/ota/...`);
    //   ...
    //
    // Esempio Expedia EPS Rapid:
    //   const res = await fetch(`https://test.ean.com/v3/properties/availability?...`);
    //   ...
    //
    // ─────────────────────────────────────────────────────────────────────────

    // MOCK: disponibilità sempre confermata
    const available = true;

    // Simula una piccola latenza di rete (rimuovere in produzione)
    await new Promise((r) => setTimeout(r, 600));

    return NextResponse.json({ available });
  } catch (err) {
    console.error("availability/check error:", err);
    return NextResponse.json(
      { available: false, reason: "Errore interno del server." },
      { status: 500 }
    );
  }
}
