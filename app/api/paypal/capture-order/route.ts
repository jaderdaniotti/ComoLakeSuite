import { NextRequest, NextResponse } from "next/server";
import { saveBooking, generateId, bookingToDates } from "@/src/lib/bookings";
import { addDirectBookingDates } from "@/src/lib/blockedDates";
import { sendBookingEmails } from "@/src/lib/mail";
import { parseBookingPayPalMeta } from "@/src/lib/bookingPaypalMeta";
import { isValidEmail } from "@/src/lib/email";

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
          "Prefer": "return=representation",
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

    // ── Persisti il booking e aggiorna subito i giorni bloccati ──────────────
    if (captureStatus === "COMPLETED" && customId) {
      try {
        const meta = parseBookingPayPalMeta(customId);
        const bookerEmailStored =
          isValidEmail(meta.bookerEmail) && meta.bookerEmail
            ? meta.bookerEmail
            : payerEmail?.trim() ?? "";

        const booking = {
          id: generateId(),
          suiteId: meta.suiteId,
          checkIn: meta.checkIn,
          checkOut: meta.checkOut,
          adults: Number(meta.adults),
          children: Number(meta.children),
          totalEuro: amount ? parseFloat(amount) : 0,
          paypalOrderId: captureData.id,
          payerEmail,
          bookerName: meta.bookerName,
          bookerEmail: bookerEmailStored,
          bookerPhone: meta.bookerPhone,
          createdAt: new Date().toISOString(),
        };

        // Salva il booking su Vercel Blob
        await saveBooking(booking);

        // Aggiorna immediatamente il calendario diretto (persistente su Blob)
        await addDirectBookingDates(meta.suiteId, bookingToDates(booking));

        try {
          await sendBookingEmails({
            suiteId: meta.suiteId,
            checkIn: meta.checkIn,
            checkOut: meta.checkOut,
            adults: Number(meta.adults),
            children: Number(meta.children),
            totalEuro: amount ? parseFloat(amount) : 0,
            paypalOrderId: captureData.id,
            payerEmail,
            bookerName: meta.bookerName,
            bookerEmail: bookerEmailStored,
            bookerPhone: meta.bookerPhone,
          });
        } catch (e) {
          console.error("capture-order: invio email:", e);
        }
      } catch (err) {
        // Non bloccare la risposta al client per un errore di persistenza
        console.error("capture-order: errore salvataggio booking:", err);
      }
    }
    // ────────────────────────────────────────────────────────────────────────

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
