import { NextRequest, NextResponse } from "next/server";
import { sendContactFormEmails } from "@/src/lib/mail";
import { isValidEmail } from "@/src/lib/email";

const MAX_LEN = {
  nome: 200,
  email: 320,
  messaggio: 10000,
};

/**
 * POST /api/contatti
 * Body JSON: { nome, email, messaggio }
 */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const nome = typeof body.nome === "string" ? body.nome.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const messaggio =
      typeof body.messaggio === "string" ? body.messaggio.trim() : "";

    if (nome.length < 2 || nome.length > MAX_LEN.nome) {
      return NextResponse.json(
        { error: "Indica un nome valido." },
        { status: 400 }
      );
    }
    if (!email || !isValidEmail(email) || email.length > MAX_LEN.email) {
      return NextResponse.json(
        { error: "Indica un indirizzo email valido." },
        { status: 400 }
      );
    }
    if (messaggio.length < 10 || messaggio.length > MAX_LEN.messaggio) {
      return NextResponse.json(
        { error: "Il messaggio deve contenere almeno 10 caratteri." },
        { status: 400 }
      );
    }

    const sent = await sendContactFormEmails({ nome, email, messaggio });
    if (!sent.ok) {
      const isDev = process.env.NODE_ENV === "development";
      const base =
        sent.reason === "not_configured"
          ? "Email non configurata sul server (imposta GMAIL_USER e GMAIL_APP_PASSWORD nel .env o su Vercel)."
          : "L’invio via Gmail non è riuscito. Controlla il terminale del server (password app, mittente EMAIL_FROM, ecc.).";
      return NextResponse.json(
        {
          error: `${base} Puoi scrivere a comolakesuitesvistalago@gmail.com o chiamare i numeri in pagina.`,
          ...(isDev ? { reason: sent.reason } : {}),
        },
        { status: 503 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Richiesta non valida." }, { status: 400 });
  }
}
