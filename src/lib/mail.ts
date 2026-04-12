/**
 * Email transazionali via Nodemailer + Gmail (SMTP).
 *
 * .env (obbligatorio):
 *   GMAIL_USER=comolakesuitesvistalago@gmail.com
 *   GMAIL_APP_PASSWORD=xxxx    ← password per le app (Google Account → Sicurezza), senza spazi
 *
 * Opzionale:
 *   EMAIL_FROM="Como Lake Suites <stessa-o-alias-gmail>"   ← deve coincidere con account o “Invia come” in Gmail
 *   EMAIL_NOTIFY_TO=… oppure OWNER_EMAIL=…                  ← destinatario notifiche (default: comolakesuitesvistalago@gmail.com)
 */
import nodemailer from "nodemailer";
import { suiteDisplayName } from "@/src/lib/suiteLabels";

const BRAND = "Como Lake Suites";
const FOOTER_ADDRESS =
  "Piazza Cavour ang. Via Albertolli 22 · 22100 Como · Italia";

const NOTIFY_DEFAULT = "comolakesuitesvistalago@gmail.com";

export type MailFailureReason = "not_configured" | "provider_error";

function getNotifyTo(): string {
  return (
    process.env.EMAIL_NOTIFY_TO?.trim() ||
    process.env.OWNER_EMAIL?.trim() ||
    NOTIFY_DEFAULT
  );
}

function getGmailCredentials(): { user: string; pass: string } | null {
  const user = process.env.GMAIL_USER?.trim();
  const pass = (process.env.GMAIL_APP_PASSWORD ?? "").replace(/\s/g, "");
  if (!user || !pass) return null;
  return { user, pass };
}

/** Mittente SMTP: EMAIL_FROM se impostato, altrimenti nome brand + GMAIL_USER. */
function getFromHeader(): string {
  const custom = process.env.EMAIL_FROM?.trim();
  if (custom) return custom;
  const user = process.env.GMAIL_USER?.trim() ?? "";
  return `"${BRAND}" <${user}>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatDateIt(iso: string): string {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return new Date(y, m - 1, d).toLocaleDateString("it-IT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatEuro(n: number): string {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
  }).format(n);
}

/** Wrapper tabella: sfondo chiaro, card bianca, bordo superiore blu sito */
function layout(inner: string): string {
  return `<!DOCTYPE html>
<html lang="it">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#f1f1f1;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f1f1;padding:28px 14px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e8e8e8;">
<tr><td style="padding:32px 36px;border-top:3px solid #101443;">
${inner}
</td></tr>
<tr><td style="padding:18px 36px 28px;border-top:1px solid #eeeeee;font-size:12px;line-height:1.6;color:#666666;font-family:Arial,Helvetica,sans-serif;">
${escapeHtml(FOOTER_ADDRESS)}
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

function row(label: string, value: string): string {
  return `<tr>
<td style="padding:10px 0;border-bottom:1px solid #eeeeee;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#888888;font-family:Arial,Helvetica,sans-serif;width:38%;vertical-align:top;">${escapeHtml(label)}</td>
<td style="padding:10px 0;border-bottom:1px solid #eeeeee;font-size:15px;line-height:1.5;color:#101443;font-family:Georgia,'Times New Roman',serif;vertical-align:top;">${value}</td>
</tr>`;
}

function detailsTable(rows: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:8px;">${rows}</table>`;
}

function heading(kicker: string, title: string, introHtml?: string): string {
  let h = `<p style="margin:0 0 6px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#666666;font-family:Arial,Helvetica,sans-serif;">${escapeHtml(kicker)}</p>
<h1 style="margin:0 0 14px;font-size:22px;font-weight:400;color:#101443;font-family:Georgia,'Times New Roman',serif;line-height:1.25;">${escapeHtml(title)}</h1>`;
  if (introHtml) {
    h += `<p style="margin:0 0 22px;font-size:14px;line-height:1.65;color:#444444;font-family:Arial,Helvetica,sans-serif;">${introHtml}</p>`;
  }
  return h;
}

async function sendMail(opts: {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}): Promise<{ ok: true } | { ok: false; reason: MailFailureReason }> {
  const auth = getGmailCredentials();
  if (!auth) {
    console.warn(
      "[mail] Invio saltato: imposta GMAIL_USER e GMAIL_APP_PASSWORD nel .env (password per le app Google, senza spazi)."
    );
    return { ok: false, reason: "not_configured" };
  }

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: { user: auth.user, pass: auth.pass },
  });

  const from = getFromHeader();

  try {
    await transport.sendMail({
      from,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      text: opts.text,
      ...(opts.replyTo ? { replyTo: opts.replyTo } : {}),
    });
    return { ok: true };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[mail] Errore SMTP Gmail:", msg, "| from:", from);
    return { ok: false, reason: "provider_error" };
  }
}

export type BookingMailPayload = {
  suiteId: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  totalEuro: number;
  paypalOrderId: string;
  payerEmail: string | null;
};

/** Notifica allo staff + conferma all'ospite (se email PayPal disponibile). */
export async function sendBookingEmails(payload: BookingMailPayload): Promise<void> {
  const suite = suiteDisplayName(payload.suiteId);
  const checkIn = formatDateIt(payload.checkIn);
  const checkOut = formatDateIt(payload.checkOut);
  const guests =
    `${payload.adults} adult${payload.adults === 1 ? "o" : "i"}` +
    (payload.children > 0
      ? `, ${payload.children} bambin${payload.children === 1 ? "o" : "i"} (≤1 anno)`
      : "");
  const total = formatEuro(payload.totalEuro);
  const payer = payload.payerEmail?.trim() || null;

  const adminRows =
    row("Suite", escapeHtml(suite)) +
    row("Check-in", escapeHtml(checkIn)) +
    row("Check-out", escapeHtml(checkOut)) +
    row("Ospiti", escapeHtml(guests)) +
    row("Totale pagato", escapeHtml(total)) +
    row("Ordine PayPal", escapeHtml(payload.paypalOrderId)) +
    (payer ? row("Email pagatore", escapeHtml(payer)) : "");

  const adminHtml = layout(
    heading(BRAND, "Nuova prenotazione confermata") + detailsTable(adminRows)
  );

  const adminText = [
    `${BRAND} — Nuova prenotazione confermata`,
    "",
    `Suite: ${suite}`,
    `Check-in: ${checkIn}`,
    `Check-out: ${checkOut}`,
    `Ospiti: ${guests}`,
    `Totale pagato: ${total}`,
    `Ordine PayPal: ${payload.paypalOrderId}`,
    payer ? `Email pagatore: ${payer}` : "",
    "",
    FOOTER_ADDRESS,
  ]
    .filter(Boolean)
    .join("\n");

  await sendMail({
    to: getNotifyTo(),
    subject: `Prenotazione: ${suite} · ${checkIn}`,
    html: adminHtml,
    text: adminText,
    replyTo: payer || undefined,
  });

  if (!payer) return;

  const guestRows =
    row("Suite", escapeHtml(suite)) +
    row("Check-in", escapeHtml(checkIn)) +
    row("Check-out", escapeHtml(checkOut)) +
    row("Ospiti", escapeHtml(guests)) +
    row("Totale", escapeHtml(total)) +
    row("Riferimento ordine", escapeHtml(payload.paypalOrderId));

  const guestIntroHtml = `Grazie per aver scelto ${escapeHtml(BRAND)}. Abbiamo registrato il pagamento e la prenotazione. Riceverai ulteriori dettagli o comunicazioni da parte nostra se necessario.`;
  const guestIntroText = `Grazie per aver scelto ${BRAND}. Abbiamo registrato il pagamento e la prenotazione. Riceverai ulteriori dettagli o comunicazioni da parte nostra se necessario.`;

  const guestHtml = layout(
    heading(BRAND, "Prenotazione ricevuta", guestIntroHtml) +
      detailsTable(guestRows)
  );

  const guestText = [
    `${BRAND}`,
    "",
    "Prenotazione ricevuta",
    "",
    guestIntroText,
    "",
    `Suite: ${suite}`,
    `Check-in: ${checkIn}`,
    `Check-out: ${checkOut}`,
    `Ospiti: ${guests}`,
    `Totale: ${total}`,
    `Riferimento ordine: ${payload.paypalOrderId}`,
    "",
    FOOTER_ADDRESS,
  ].join("\n");

  await sendMail({
    to: payer,
    subject: `Conferma prenotazione · ${suite}`,
    html: guestHtml,
    text: guestText,
    replyTo: getNotifyTo(),
  });
}

export type ContactMailPayload = {
  nome: string;
  email: string;
  messaggio: string;
};

export async function sendContactStaffEmail(
  payload: ContactMailPayload
): Promise<{ ok: true } | { ok: false; reason: MailFailureReason }> {
  const nome = payload.nome.trim();
  const email = payload.email.trim();
  const msg = payload.messaggio.trim();

  const adminRows =
    row("Nome", escapeHtml(nome)) +
    row("Email", escapeHtml(email)) +
    `<tr><td colspan="2" style="padding:14px 0 0;font-size:14px;line-height:1.65;color:#101443;font-family:Georgia,'Times New Roman',serif;">${escapeHtml(msg).replace(/\n/g, "<br/>")}</td></tr>`;

  const adminHtml = layout(
    heading(BRAND, "Messaggio dal modulo contatti") + detailsTable(adminRows)
  );

  const adminText = [
    `${BRAND} — Messaggio dal modulo contatti`,
    "",
    `Nome: ${nome}`,
    `Email: ${email}`,
    "",
    msg,
    "",
    FOOTER_ADDRESS,
  ].join("\n");

  return sendMail({
    to: getNotifyTo(),
    subject: `Contatti: ${nome}`,
    html: adminHtml,
    text: adminText,
    replyTo: email,
  });
}

/** Conferma al mittente: messaggio ricevuto, risponderemo a breve. */
export async function sendContactAutoReplyToVisitor(payload: {
  nome: string;
  email: string;
}): Promise<{ ok: true } | { ok: false; reason: MailFailureReason }> {
  const nome = payload.nome.trim();
  const email = payload.email.trim();

  const introHtml = `${escapeHtml(nome)}, grazie per averci scritto tramite il modulo contatti del sito. Abbiamo ricevuto il tuo messaggio e ti risponderemo a breve.`;
  const introText = `${nome}, grazie per averci scritto tramite il modulo contatti del sito. Abbiamo ricevuto il tuo messaggio e ti risponderemo a breve.`;

  const visitorHtml = layout(
    heading(BRAND, "Messaggio ricevuto", introHtml)
  );

  const visitorText = [
    BRAND,
    "",
    "Messaggio ricevuto",
    "",
    introText,
    "",
    FOOTER_ADDRESS,
  ].join("\n");

  return sendMail({
    to: email,
    subject: `Abbiamo ricevuto il tuo messaggio · ${BRAND}`,
    html: visitorHtml,
    text: visitorText,
    replyTo: getNotifyTo(),
  });
}

/** Notifica allo staff + conferma automatica al visitatore. */
export async function sendContactFormEmails(
  payload: ContactMailPayload
): Promise<{ ok: true } | { ok: false; reason: MailFailureReason }> {
  const staff = await sendContactStaffEmail(payload);
  if (!staff.ok) return staff;

  const ack = await sendContactAutoReplyToVisitor({
    nome: payload.nome,
    email: payload.email,
  });
  if (!ack.ok) {
    console.warn(
      "[mail] Conferma al visitatore non inviata; il messaggio è stato comunque inviato alla struttura."
    );
  }
  return { ok: true };
}
