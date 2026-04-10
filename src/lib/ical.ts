/**
 * Parser iCal minimalista — zero dipendenze esterne.
 *
 * Supporta feed di Airbnb, Booking.com, Expedia (RFC 5545):
 *  - DTSTART;VALUE=DATE:20260501          (data pura, all-day)
 *  - DTSTART:20260501T120000Z             (datetime UTC)
 *  - DTSTART;TZID=Europe/Rome:20260501T120000  (datetime con timezone)
 *
 * DTSTART è inclusivo, DTEND è esclusivo (standard iCal).
 */

/** Estrae "YYYY-MM-DD" da una riga DTSTART/DTEND iCal */
function parseICalDate(line: string): string | null {
  // Rimuove tutto fino ai ":" incluso
  const value = line.replace(/^[^:]+:/, "").trim();

  // Formato puro: 20260501
  if (/^\d{8}$/.test(value)) {
    return `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`;
  }

  // Formato datetime: 20260501T120000Z o 20260501T120000
  if (/^\d{8}T\d{6}/.test(value)) {
    const d = value.slice(0, 8);
    return `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`;
  }

  return null;
}

/** Aggiunge N giorni a una data ISO "YYYY-MM-DD" */
function addDays(iso: string, n: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d + n);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

/**
 * Scarica un feed iCal e restituisce l'array ordinato di date ISO bloccate.
 * Ogni data restituita è un giorno occupato (DTSTART inclusivo, DTEND esclusivo).
 */
export async function fetchBlockedDates(icalUrl: string): Promise<string[]> {
  const res = await fetch(icalUrl, {
    cache: "no-store",
    headers: { "User-Agent": "ComoLakeSuites-CalendarSync/1.0" },
  });

  if (!res.ok) {
    throw new Error(`iCal fetch failed (${res.status}): ${icalUrl}`);
  }

  const text = await res.text();
  const blocked = new Set<string>();

  // Divide in blocchi VEVENT
  const events = text.split("BEGIN:VEVENT");
  for (let i = 1; i < events.length; i++) {
    const lines = events[i].split(/\r?\n/);

    const startLine = lines.find((l) => l.trimStart().startsWith("DTSTART"));
    const endLine = lines.find((l) => l.trimStart().startsWith("DTEND"));

    if (!startLine) continue;

    const start = parseICalDate(startLine);
    const end = endLine ? parseICalDate(endLine) : null;

    if (!start) continue;

    if (!end || end <= start) {
      // Evento single-day o DTEND mancante
      blocked.add(start);
    } else {
      // Espandi [start, end) — DTEND esclusivo per standard iCal
      let cursor = start;
      while (cursor < end) {
        blocked.add(cursor);
        cursor = addDays(cursor, 1);
      }
    }
  }

  return Array.from(blocked).sort();
}
