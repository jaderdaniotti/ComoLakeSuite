import { NextRequest, NextResponse } from "next/server";

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
 * Body: { amount: number, suiteId: string, checkIn: string, checkOut: string, adults: number, children: number }
 * Response: { orderId: string }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, suiteId, checkIn, checkOut, adults, children } = body as {
      amount: number;
      suiteId: string;
      checkIn: string;
      checkOut: string;
      adults: number;
      children: number;
    };

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

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    const orderPayload = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "EUR",
            value: amount.toFixed(2),
          },
          description,
          custom_id: JSON.stringify({ suiteId, checkIn, checkOut, adults, children }),
        },
      ],
      // payment_source.paypal.experience_context sostituisce il deprecato
      // application_context nelle PayPal Orders v2 API
      payment_source: {
        paypal: {
          experience_context: {
            payment_method_preference: "IMMEDIATE_PAYMENT_REQUIRED",
            brand_name: "Como Lake Suites",
            landing_page: "LOGIN",
            shipping_preference: "NO_SHIPPING",
            user_action: "PAY_NOW",
            return_url: `${siteUrl}/prenota/conferma`,
            cancel_url: `${siteUrl}/prenota`,
          },
        },
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
