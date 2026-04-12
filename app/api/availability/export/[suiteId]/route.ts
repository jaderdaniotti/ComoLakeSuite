import { NextRequest, NextResponse } from "next/server";
import { readBookings } from "@/src/lib/bookings";

const SUITE_LABELS: Record<string, string> = {
  "suite-cavour": "Suite Cavour",
  "suite-volta": "Suite Volta",
  "suite-vista-duomo": "Suite Vista Duomo",
  "suite-dante": "Suite Dante",
  "suite-cernobbio": "Suite Cernobbio",
  "suite-como-sole": "Suite Como Sole",
};

/** Formatta una data ISO "YYYY-MM-DD" nel formato iCal VALUE=DATE: "YYYYMMDD" */
function toICalDate(iso: string): string {
  return iso.replace(/-/g, "");
}

/** Formatta un timestamp ISO in formato iCal DTSTAMP: "YYYYMMDDTHHmmssZ" */
function toICalStamp(iso: string): string {
  return iso.replace(/[-:]/g, "").replace(/\.\d+/, "").replace("Z", "Z");
}

/**
 * GET /api/availability/export/[suiteId]
 *
 * Genera un feed iCal (.ics) con tutte le prenotazioni confermate (pagate via PayPal)
 * per la suite indicata. Questo URL va incollato nel campo "Importa calendario" di
 * Airbnb, Booking.com ed Expedia per bloccare le date anche sugli OTA.
 *
 * Il feed è pubblico (non richiede autenticazione) — l'URL stesso funge da segreto.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ suiteId: string }> }
) {
  const { suiteId } = await params;

  if (!suiteId) {
    return new NextResponse("suiteId mancante", { status: 400 });
  }

  const allBookings = await readBookings();
  const suiteBookings = allBookings.filter((b) => b.suiteId === suiteId);
  const suiteLabel = SUITE_LABELS[suiteId] ?? suiteId;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.comolakesuites.com";

  const events = suiteBookings
    .map((b) => {
      const stamp = toICalStamp(b.createdAt);
      const uid = `${b.id}@comolakesuites.com`;
      return [
        "BEGIN:VEVENT",
        `UID:${uid}`,
        `DTSTAMP:${stamp}`,
        `DTSTART;VALUE=DATE:${toICalDate(b.checkIn)}`,
        `DTEND;VALUE=DATE:${toICalDate(b.checkOut)}`,
        `SUMMARY:Prenotazione ${suiteLabel}`,
        `DESCRIPTION:Ospiti: ${b.adults} adulti${b.children > 0 ? ` + ${b.children} bambini` : ""} | PayPal: ${b.paypalOrderId}${b.bookerName ? ` | Prenotante: ${b.bookerName}` : ""}`,
        "END:VEVENT",
      ].join("\r\n");
    })
    .join("\r\n");

  const ical = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//Como Lake Suites//Calendar Export//IT`,
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${suiteLabel} - Prenotazioni`,
    `X-WR-CALDESC:Prenotazioni confermate via ${siteUrl}`,
    events,
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");

  return new NextResponse(ical, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${suiteId}.ics"`,
      // Gli OTA aggiornano i feed importati ogni 15-60 min: niente cache lato CDN
      "Cache-Control": "no-store",
    },
  });
}
