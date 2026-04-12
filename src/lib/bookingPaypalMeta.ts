/**
 * Meta prenotazione serializzata in PayPal `purchase_units[].custom_id` (max 127 caratteri).
 * Chiavi corte per restare nel limite; supporta anche il vecchio formato con chiavi lunghe.
 */
export type BookingPayPalMeta = {
  suiteId: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  bookerName: string;
  bookerEmail: string;
  bookerPhone: string;
};

const MAX_CUSTOM_ID = 127;

type Compact = {
  s: string;
  i: string;
  o: string;
  a: number;
  c: number;
  n: string;
  e: string;
  p: string;
};

function toCompact(m: BookingPayPalMeta): Compact {
  return {
    s: m.suiteId,
    i: m.checkIn,
    o: m.checkOut,
    a: m.adults,
    c: m.children,
    n: m.bookerName.trim(),
    e: m.bookerEmail.trim().toLowerCase(),
    p: (m.bookerPhone ?? "").trim(),
  };
}

/** Serializza per PayPal, troncando se necessario per rispettare il limite. */
export function stringifyBookingPayPalMeta(m: BookingPayPalMeta): string {
  let n = m.bookerName.trim();
  let e = m.bookerEmail.trim().toLowerCase();
  let p = (m.bookerPhone ?? "").trim();
  for (let attempt = 0; attempt < 40; attempt++) {
    const json = JSON.stringify(toCompact({ ...m, bookerName: n, bookerEmail: e, bookerPhone: p }));
    if (json.length <= MAX_CUSTOM_ID) return json;
    if (n.length > 3) n = n.slice(0, Math.max(3, n.length - 5));
    else if (e.length > 8) e = e.slice(0, Math.max(8, e.length - 6));
    else if (p.length > 0) p = p.slice(0, Math.max(0, p.length - 3));
    else break;
  }
  return JSON.stringify(toCompact({ ...m, bookerName: n, bookerEmail: e, bookerPhone: p }));
}

export function parseBookingPayPalMeta(raw: string): BookingPayPalMeta {
  const v = JSON.parse(raw) as Record<string, unknown>;

  if (typeof v.s === "string") {
    return {
      suiteId: v.s,
      checkIn: String(v.i ?? ""),
      checkOut: String(v.o ?? ""),
      adults: Number(v.a ?? 0),
      children: Number(v.c ?? 0),
      bookerName: String(v.n ?? "").trim(),
      bookerEmail: String(v.e ?? "").trim(),
      bookerPhone: String(v.p ?? "").trim(),
    };
  }

  return {
    suiteId: String(v.suiteId ?? ""),
    checkIn: String(v.checkIn ?? ""),
    checkOut: String(v.checkOut ?? ""),
    adults: Number(v.adults ?? 0),
    children: Number(v.children ?? 0),
    bookerName: String(v.bookerName ?? "").trim(),
    bookerEmail: String(v.bookerEmail ?? "").trim(),
    bookerPhone: String(v.bookerPhone ?? "").trim(),
  };
}
