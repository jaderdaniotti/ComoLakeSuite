import { NextRequest, NextResponse } from "next/server";
import {
  stringifyBookingPayPalMeta,
  type BookingPayPalMeta,
} from "@/src/lib/bookingPaypalMeta";

/**
 * Ottieni un access token OAuth 2.0 da PayPal.
 * Usa Basic Auth con clientId:secret (server-side only).
 */
async function getPayPalAccessToken(): Promise<string> {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET!;
  const apiBase = process.env.PAYPAL_API_BASE!;

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );

  const res = await fetch(`${apiBase}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PayPal token error (${res.status}): ${text}`);
  }

  const data = await res.json();
  return data.access_token as string;
}

/**
 * POST /api/paypal/create-order
 *
 * Body: { amount, suiteId, checkIn, checkOut, adults, children, bookerName, bookerEmail, bookerPhone? }
 * Response: { orderId: string }
 */
function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      amount,
      suiteId,
      checkIn,
      checkOut,
      adults,
      children,
      bookerName,
      bookerEmail,
      bookerPhone,
    } = body as {
      amount: number;
      suiteId: string;
      checkIn: string;
      checkOut: string;
      adults: number;
      children: number;
      bookerName?: string;
      bookerEmail?: string;
      bookerPhone?: string;
    };

    const bn = (bookerName ?? "").trim();
    const be = (bookerEmail ?? "").trim().toLowerCase();
    const bp = (bookerPhone ?? "").trim();

    if (bn.length < 2 || bn.length > 80) {
      return NextResponse.json(
        { error: "Indica nome e cognome del prenotante (2–80 caratteri)." },
        { status: 400 }
      );
    }
    if (!be || !isValidEmail(be) || be.length > 120) {
      return NextResponse.json(
        { error: "Indica un’email di contatto valida per il prenotante." },
        { status: 400 }
      );
    }
    if (bp.length > 40) {
      return NextResponse.json(
        { error: "Il numero di telefono è troppo lungo." },
        { status: 400 }
      );
    }

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Importo non valido" },
        { status: 400 }
      );
    }

    const apiBase = process.env.PAYPAL_API_BASE!;
    const accessToken = await getPayPalAccessToken();

    const nights = Math.round(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
        (1000 * 60 * 60 * 24)
    );

    const description = `${suiteId} | ${checkIn} - ${checkOut} | ${nights} notti | ${adults} adulti${children > 0 ? ` + ${children} bambini` : ""}`;

    const meta: BookingPayPalMeta = {
      suiteId,
      checkIn,
      checkOut,
      adults: Number(adults),
      children: Number(children),
      bookerName: bn,
      bookerEmail: be,
      bookerPhone: bp,
    };

    const orderPayload = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "EUR",
            // value: amount.toFixed(2), // In produzione, usare l'importo reale calcolatok
            value: 0.01.toFixed(2), // Per test, usare un importo fisso di 0.10 EUR. In produzione, sostituire con amount.toFixed(2)     
          },
          description,
          custom_id: stringifyBookingPayPalMeta(meta),
        },
      ],
      application_context: {
        brand_name: "Como Lake Suites",
        shipping_preference: "NO_SHIPPING",
        user_action: "PAY_NOW",
      },
    };

    const res = await fetch(`${apiBase}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "PayPal-Request-Id": `cls-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      },
      body: JSON.stringify(orderPayload),
    });

    if (!res.ok) {
      const errBody = await res.json();
      console.error("PayPal create-order error:", errBody);
      return NextResponse.json(
        { error: "Errore nella creazione dell'ordine PayPal" },
        { status: 502 }
      );
    }

    const order = await res.json();
    return NextResponse.json({ orderId: order.id });
  } catch (err) {
    console.error("create-order internal error:", err);
    return NextResponse.json({ error: "Errore interno del server" }, { status: 500 });
  }
}
