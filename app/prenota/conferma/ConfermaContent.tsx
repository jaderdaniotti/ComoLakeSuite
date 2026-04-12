"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, CalendarDays, Users, BedDouble, Phone, Mail, CalendarPlus, User } from "lucide-react";
import { formatEuro } from "@/src/lib/pricing";
import { SUITE_LABELS } from "@/src/lib/suiteLabels";
import { suiteHeroImage } from "@/src/lib/suiteHeroImages";
import { useLanguage } from "@/src/components/LanguageProvider";

export default function ConfermaContent() {
  const { locale } = useLanguage();
  const params = useSearchParams();

  const suiteId = params.get("suiteId") ?? "";
  const checkIn = params.get("checkIn") ?? "";
  const checkOut = params.get("checkOut") ?? "";
  const adults = Number(params.get("adults") ?? 2);
  const children = Number(params.get("children") ?? 0);
  const total = Number(params.get("total") ?? 0);
  const nights = Number(params.get("nights") ?? 0);
  const orderId = params.get("orderId") ?? "";
  const payerEmail = params.get("payerEmail") ?? "";
  const bookerName = params.get("bookerName") ?? "";
  const bookerEmail = params.get("bookerEmail") ?? "";
  const bookerPhone = params.get("bookerPhone") ?? "";

  const suiteLabel = SUITE_LABELS[suiteId] ?? suiteId;
  const confirmEmail = bookerEmail.trim() || payerEmail.trim();
  const heroSrc = suiteHeroImage(suiteId);

  // Link "Aggiungi al calendario" in formato Google Calendar
  const googleCalUrl = (() => {
    if (!checkIn || !checkOut) return null;
    const start = checkIn.replace(/-/g, "");
    const end = checkOut.replace(/-/g, "");
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: locale === "en" ? `Stay – ${suiteLabel}` : `Soggiorno – ${suiteLabel}`,
      dates: `${start}/${end}`,
      details:
        locale === "en"
          ? `Booking confirmed at ${suiteLabel}. PayPal order ID: ${orderId}`
          : `Prenotazione confermata presso ${suiteLabel}. ID ordine PayPal: ${orderId}`,
      location: locale === "en" ? "Como, Italy" : "Como, Italia",
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  })();

  const formatDate = (iso: string) => {
    if (!iso) return "–";
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString(locale === "en" ? "en-US" : "it-IT", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <Image
          src={heroSrc}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-scuro/80 via-scuro/55 to-scuro/75" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 pb-14 pt-40 sm:px-6 lg:px-8">
        {/* Success header (testo chiaro sul layer scuro) */}
        <div className="mb-10 flex flex-col items-center text-center space-y-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-bianco/95 text-green-600 shadow-sm">
            <CheckCircle size={36} strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-light text-bianco md:text-3xl">
            {locale === "en" ? "Booking confirmed!" : "Prenotazione confermata!"}
          </h1>
          <p className="max-w-md text-sm text-bianco/85 leading-relaxed">
            {locale === "en"
              ? "Your payment has been received successfully."
              : "Il pagamento è stato ricevuto con successo."}
            {confirmEmail
              ? locale === "en"
                ? ` We sent confirmation to ${confirmEmail}.`
                : ` Abbiamo inviato la conferma all’indirizzo ${confirmEmail}.`
              : locale === "en"
                ? " You will receive an email confirmation shortly when available."
                : " Riceverai a breve una conferma via email se disponibile."}
          </p>
          {orderId && (
            <p className="text-xs text-bianco/55 font-mono">
              {locale === "en" ? "Order ID" : "ID ordine"}: {orderId}
            </p>
          )}
        </div>

        {/* Booking summary card */}
        <div className="rounded-2xl bg-bianco p-6 shadow-sm space-y-6 mb-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-scuro/60">
            {locale === "en" ? "Stay details" : "Dettagli soggiorno"}
          </h2>

          <div className="space-y-5 text-sm">
            <div className="flex items-start gap-3">
              <BedDouble size={18} className="mt-0.5 shrink-0 text-blu" />
              <div>
                <p className="text-xs text-scuro/50 uppercase tracking-wide">
                  {locale === "en" ? "Suite" : "Suite"}
                </p>
                <p className="font-semibold text-scuro text-base">{suiteLabel}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CalendarDays size={18} className="mt-0.5 shrink-0 text-blu" />
              <div className="grid grid-cols-2 gap-4 w-full">
                <div>
                  <p className="text-xs text-scuro/50 uppercase tracking-wide">Check-in</p>
                  <p className="font-medium text-scuro">{formatDate(checkIn)}</p>
                </div>
                <div>
                  <p className="text-xs text-scuro/50 uppercase tracking-wide">Check-out</p>
                  <p className="font-medium text-scuro">{formatDate(checkOut)}</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Users size={18} className="mt-0.5 shrink-0 text-blu" />
              <div>
                  <p className="text-xs text-scuro/50 uppercase tracking-wide">
                    {locale === "en" ? "Guests" : "Ospiti"}
                  </p>
                <p className="font-medium text-scuro">
                  {adults}{" "}
                  {locale === "en"
                    ? `adult${adults === 1 ? "" : "s"}`
                    : `adult${adults === 1 ? "o" : "i"}`}
                  {children > 0
                    ? locale === "en"
                      ? ` + ${children} child${children === 1 ? "" : "ren"} (≤1 year old, free)`
                      : ` + ${children} bambin${children === 1 ? "o" : "i"} (≤1 anno, gratuiti)`
                    : ""}
                </p>
              </div>
            </div>

            {(bookerName || bookerEmail || bookerPhone) && (
              <div className="rounded-xl border border-blu/10 bg-scuro/2 p-4 space-y-3 text-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-scuro/55 flex items-center gap-2">
                  <User size={14} className="text-blu" aria-hidden />
                  {locale === "en" ? "Booker" : "Prenotante"}
                </p>
                {bookerName && (
                  <p className="font-medium text-scuro">{bookerName}</p>
                )}
                {bookerEmail && (
                  <a href={`mailto:${bookerEmail}`} className="flex items-center gap-2 text-blu hover:underline">
                    <Mail size={14} />
                    {bookerEmail}
                  </a>
                )}
                {bookerPhone && (
                  <a href={`tel:${bookerPhone.replace(/\s/g, "")}`} className="flex items-center gap-2 text-blu hover:underline">
                    <Phone size={14} />
                    {bookerPhone}
                  </a>
                )}
              </div>
            )}
          </div>

          {total > 0 && (
            <div className="rounded-xl border border-blu/15 bg-blu/5 px-4 py-3 flex justify-between items-center">
              <span className="text-sm text-scuro/70">
                {nights}{" "}
                {locale === "en"
                  ? `night${nights === 1 ? "" : "s"}`
                  : `nott${nights === 1 ? "e" : "i"}`}{" "}
                · {locale === "en" ? "total paid" : "totale pagato"}
              </span>
              <span className="font-bold text-lg text-blu tabular-nums">
                {formatEuro(total)}
              </span>
            </div>
          )}

          {/* Aggiungi al calendario */}
          {googleCalUrl && (
            <a
              href={googleCalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-blu hover:underline"
            >
              <CalendarPlus size={16} />
              {locale === "en"
                ? "Add to Google Calendar"
                : "Aggiungi al calendario Google"}
            </a>
          )}
        </div>

        {/* Contacts card */}
        <div className="rounded-2xl bg-bianco p-6 shadow-sm space-y-4 mb-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-scuro/60">
            {locale === "en" ? "Need help?" : "Hai bisogno di aiuto?"}
          </h2>
          <p className="text-sm text-scuro/70">
            {locale === "en"
              ? "For arrival details, changes, or any need, contact us directly:"
              : "Per informazioni sull'arrivo, modifiche o qualsiasi necessità, contattaci direttamente:"}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 text-sm">
            <div className="space-y-1">
              <p className="font-semibold text-scuro">Massimiliano</p>
              <a
                href="tel:+393409409123"
                className="flex items-center gap-2 text-blu hover:underline"
              >
                <Phone size={14} />
                +39 340 940 9123
              </a>
              <a
                href="mailto:info@comolakesuites.com"
                className="flex items-center gap-2 text-blu hover:underline"
              >
                <Mail size={14} />
                info@comolakesuites.com
              </a>
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-scuro">Marilena</p>
              <a
                href="tel:+393331745544"
                className="flex items-center gap-2 text-blu hover:underline"
              >
                <Phone size={14} />
                +39 333 174 5544
              </a>
            </div>
          </div>
        </div>

        {/* CTA back home */}
        <div className="flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-blu px-8 py-3 text-sm font-medium text-bianco shadow-sm hover:bg-blu/90 transition"
          >
            {locale === "en" ? "Back to home" : "Torna alla home"}
          </Link>
        </div>
      </div>
    </div>
  );
}
