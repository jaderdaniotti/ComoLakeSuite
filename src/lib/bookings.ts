import path from "path";
import fs from "fs/promises";

/** Path del file JSON delle prenotazioni dirette (fuori da public/ per non esporlo) */
export const BOOKINGS_PATH = path.join(process.cwd(), "data", "bookings.json");

export type Booking = {
  id: string;           // UUID generato al momento del salvataggio
  suiteId: string;
  checkIn: string;      // YYYY-MM-DD
  checkOut: string;     // YYYY-MM-DD
  adults: number;
  children: number;
  totalEuro: number;
  paypalOrderId: string;
  payerEmail: string | null;
  /** Dati compilati sul sito prima del pagamento (assenti nelle prenotazioni salvate prima di questa funzione) */
  bookerName?: string;
  bookerEmail?: string;
  bookerPhone?: string;
  createdAt: string;    // ISO timestamp
};

/** Legge tutti i booking salvati. Restituisce [] se il file non esiste. */
export async function readBookings(): Promise<Booking[]> {
  try {
    const raw = await fs.readFile(BOOKINGS_PATH, "utf-8");
    return JSON.parse(raw) as Booking[];
  } catch {
    return [];
  }
}

/** Aggiunge un booking al file (crea la directory se necessario). */
export async function saveBooking(booking: Booking): Promise<void> {
  await fs.mkdir(path.dirname(BOOKINGS_PATH), { recursive: true });
  const bookings = await readBookings();
  bookings.push(booking);
  await fs.writeFile(BOOKINGS_PATH, JSON.stringify(bookings, null, 2), "utf-8");
}

/** Genera un UUID v4 semplice (no dipendenze esterne). */
export function generateId(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/** Aggiunge N giorni a una data ISO "YYYY-MM-DD" */
function addDays(iso: string, n: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d + n);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

/**
 * Restituisce tutte le date [checkIn, checkOut) di un booking come array ISO.
 * Utile per aggiornare blocked-dates.json immediatamente dopo un pagamento.
 */
export function bookingToDates(booking: Pick<Booking, "checkIn" | "checkOut">): string[] {
  const dates: string[] = [];
  let cursor = booking.checkIn;
  while (cursor < booking.checkOut) {
    dates.push(cursor);
    cursor = addDays(cursor, 1);
  }
  return dates;
}
