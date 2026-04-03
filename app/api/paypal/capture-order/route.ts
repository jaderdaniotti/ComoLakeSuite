import { NextRequest, NextResponse } from "next/server";

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
 * POST /api/paypal/capture-order
 *
 * Body: { orderId: string }
 * Response: { status: string, orderId: string, payerEmail: string | null, amount: string }
 */
export async function POST(req: NextRequest) {
  try {
    const { orderId } = (await req.json()) as { orderId: string };

    if (!orderId) {
      return NextResponse.json({ error: "orderId mancante" }, { status: 400 });
    }

    const apiBase = process.env.PAYPAL_API_BASE!;
    const accessToken = await getPayPalAccessToken();

    const res = await fetch(
      `${apiBase}/v2/checkout/orders/${orderId}/capture`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const captureData = await res.json();

    if (!res.ok) {
      console.error("PayPal capture-order error:", captureData);
      return NextResponse.json(
        { error: "Errore nella cattura del pagamento" },
        { status: 502 }
      );
    }

    const captureStatus = captureData.status; // "COMPLETED" | "PAYER_ACTION_REQUIRED" | ...
    const capture =
      captureData.purchase_units?.[0]?.payments?.captures?.[0];
    const amount = capture?.amount?.value ?? null;
    const payerEmail = captureData.payer?.email_address ?? null;
    const customId = captureData.purchase_units?.[0]?.custom_id ?? null;

    return NextResponse.json({
      status: captureStatus,
      orderId: captureData.id,
      payerEmail,
      amount,
      customId,
    });
  } catch (err) {
    console.error("capture-order internal error:", err);
    return NextResponse.json(
      { error: "Errore interno del server" },
      { status: 500 }
    );
  }
}
