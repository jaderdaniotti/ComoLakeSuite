"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, CalendarDays, Users, BedDouble, Phone, Mail, CalendarPlus } from "lucide-react";
import { formatEuro } from "@/src/lib/pricing";

const SUITE_LABELS: Record<string, string> = {
  "suite-cavour": "Suite Cavour",
  "suite-volta": "Suite Volta",
  "suite-vista-duomo": "Suite Vista Duomo",
  "suite-dante": "Suite Dante",
  "suite-cernobbio": "Suite Cernobbio",
  "suite-como-sole": "Suite Como Sole",
};

export default function ConfermaContent() {
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

  const suiteLabel = SUITE_LABELS[suiteId] ?? suiteId;

  // Link "Aggiungi al calendario" in formato Google Calendar
  const googleCalUrl = (() => {
    if (!checkIn || !checkOut) return null;
    const start = checkIn.replace(/-/g, "");
    const end = checkOut.replace(/-/g, "");
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: `Soggiorno – ${suiteLabel}`,
      dates: `${start}/${end}`,
      details: `Prenotazione confermata presso ${suiteLabel}. ID ordine PayPal: ${orderId}`,
      location: "Como, Italia",
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  })();

  const formatDate = (iso: string) => {
    if (!iso) return "–";
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString("it-IT", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-grigioscuro pt-40">
      <div className="mx-auto max-w-3xl px-4 pb-14 sm:px-6 lg:px-8">
        {/* Success header */}
        <div className="mb-10 flex flex-col items-center text-center space-y-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
            <CheckCircle size={36} strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-light text-scuro md:text-3xl">
            Prenotazione confermata!
          </h1>
          <p className="max-w-md text-sm text-scuro/65">
            Il pagamento è stato ricevuto con successo. Riceverai a breve una
            conferma{payerEmail ? ` all'indirizzo ${payerEmail}` : " via email"}.
          </p>
          {orderId && (
            <p className="text-xs text-scuro/45 font-mono">
              ID ordine: {orderId}
            </p>
          )}
        </div>

        {/* Booking summary card */}
        <div className="rounded-2xl bg-bianco p-6 shadow-sm space-y-6 mb-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-scuro/60">
            Dettagli soggiorno
          </h2>

          <div className="space-y-5 text-sm">
            <div className="flex items-start gap-3">
              <BedDouble size={18} className="mt-0.5 shrink-0 text-blu" />
              <div>
                <p className="text-xs text-scuro/50 uppercase tracking-wide">Suite</p>
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
                <p className="text-xs text-scuro/50 uppercase tracking-wide">Ospiti</p>
                <p className="font-medium text-scuro">
                  {adults} adult{adults === 1 ? "o" : "i"}
                  {children > 0
                    ? ` + ${children} bambin${children === 1 ? "o" : "i"} (≤1 anno, gratuiti)`
                    : ""}
                </p>
              </div>
            </div>
          </div>

          {total > 0 && (
            <div className="rounded-xl border border-blu/15 bg-blu/5 px-4 py-3 flex justify-between items-center">
              <span className="text-sm text-scuro/70">
                {nights} nott{nights === 1 ? "e" : "i"} · totale pagato
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
              Aggiungi al calendario Google
            </a>
          )}
        </div>

        {/* Contacts card */}
        <div className="rounded-2xl bg-bianco p-6 shadow-sm space-y-4 mb-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-scuro/60">
            Hai bisogno di aiuto?
          </h2>
          <p className="text-sm text-scuro/70">
            Per informazioni sull'arrivo, modifiche o qualsiasi necessità,
            contattaci direttamente:
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
                href="mailto:info@comolakedsuites.it"
                className="flex items-center gap-2 text-blu hover:underline"
              >
                <Mail size={14} />
                info@comolakedsuites.it
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
            Torna alla home
          </Link>
        </div>
      </div>
    </div>
  );
}
