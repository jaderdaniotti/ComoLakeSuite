"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  type ReactPayPalScriptOptions,
} from "@paypal/react-paypal-js";
import { formatEuro } from "@/src/lib/pricing";
import { ArrowLeft, CalendarDays, Users, BedDouble, User, Mail, Phone } from "lucide-react";
import { SUITE_LABELS } from "@/src/lib/suiteLabels";
import { suiteHeroImage } from "@/src/lib/suiteHeroImages";

const paypalScriptOptions: ReactPayPalScriptOptions = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
  currency: "EUR",
  intent: "capture",
  // commit:true deve corrispondere a user_action:"PAY_NOW" nel create-order API
  commit: true,
  // NOTA: buyer-country:"IT" è valido SOLO in sandbox per simulare il paese
  // del compratore. NON va passato in produzione (live). Decommentare solo
  // se si ritorna in sandbox:
  // "buyer-country": "IT",
};

export default function PrenotaContent() {
  const router = useRouter();
  const params = useSearchParams();

  const suiteId = params.get("suiteId") ?? "";
  const checkIn = params.get("checkIn") ?? "";
  const checkOut = params.get("checkOut") ?? "";
  const adults = Number(params.get("adults") ?? 2);
  const children = Number(params.get("children") ?? 0);
  const total = Number(params.get("total") ?? 0);
  const nights = Number(params.get("nights") ?? 0);
  const avgPerNight = Number(params.get("avgPerNight") ?? 0);

  const suiteLabel = SUITE_LABELS[suiteId] ?? suiteId;
  const heroSrc = suiteHeroImage(suiteId);

  const [payError, setPayError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookerName, setBookerName] = useState("");
  const [bookerEmail, setBookerEmail] = useState("");
  const [bookerPhone, setBookerPhone] = useState("");

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookerEmail.trim());
  const canPay =
    bookerName.trim().length >= 2 &&
    bookerName.trim().length <= 80 &&
    emailOk &&
    bookerPhone.trim().length <= 40;

  // Redirect back if params are missing / invalid
  useEffect(() => {
    if (!suiteId || !checkIn || !checkOut || total <= 0) {
      router.replace("/le-suites");
    }
  }, [suiteId, checkIn, checkOut, total, router]);

  const formatDate = (iso: string) => {
    if (!iso) return "–";
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // Called by PayPal SDK to create an order server-side
  const createOrder = async (): Promise<string> => {
    setPayError(null);
    const res = await fetch("/api/paypal/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: total,
        suiteId,
        checkIn,
        checkOut,
        adults,
        children,
        bookerName: bookerName.trim(),
        bookerEmail: bookerEmail.trim(),
        bookerPhone: bookerPhone.trim(),
      }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error ?? "Errore nella creazione dell'ordine");
    }
    const data = await res.json();
    return data.orderId as string;
  };

  // Called by PayPal SDK after buyer approves
  const onApprove = async (data: { orderID: string }) => {
    setIsProcessing(true);
    setPayError(null);
    try {
      const res = await fetch("/api/paypal/capture-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: data.orderID }),
      });
      const capture = await res.json();
      if (!res.ok || capture.status !== "COMPLETED") {
        throw new Error(capture.error ?? "Pagamento non completato");
      }
      // Redirect to confirmation page passing relevant info
      const q = new URLSearchParams({
        suiteId,
        checkIn,
        checkOut,
        adults: String(adults),
        children: String(children),
        total: String(total),
        nights: String(nights),
        orderId: capture.orderId,
        payerEmail: capture.payerEmail ?? "",
        bookerName: bookerName.trim(),
        bookerEmail: bookerEmail.trim(),
        bookerPhone: bookerPhone.trim(),
      });
      router.push(`/prenota/conferma?${q.toString()}`);
    } catch (err) {
      setPayError(
        err instanceof Error ? err.message : "Errore durante il pagamento"
      );
      setIsProcessing(false);
    }
  };

  const onError = (err: Record<string, unknown>) => {
    console.error("PayPal error:", err);
    setPayError("Si è verificato un errore con PayPal. Riprova o contattaci.");
    setIsProcessing(false);
  };

  if (!suiteId || total <= 0) return null;

  return (
    <div className="relative min-h-screen pt-50">
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <Image
          src={heroSrc}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-scuro/70 via-scuro/45 to-scuro/55" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 pb-10 sm:px-6 lg:px-8">
        {/* Back button */}
        <div className="mb-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm text-bianco/75 hover:text-bianco transition"
          >
            <ArrowLeft size={16} />
            Torna alla suite
          </button>
        </div>

        <div className="mb-8 space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bianco/60">
            Pagamento sicuro
          </p>
          <h1 className="text-2xl font-light text-bianco md:text-3xl">
            Conferma prenotazione
          </h1>
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_380px]">
          {/* Left: booking summary */}
          <div className="rounded-2xl bg-bianco p-6 shadow-sm space-y-6">
            <h2 className="text-base font-semibold text-scuro uppercase tracking-wide">
              Riepilogo soggiorno
            </h2>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <BedDouble size={18} className="mt-0.5 shrink-0 text-blu" />
                <div>
                  <p className="text-xs text-scuro/55 uppercase tracking-wide">Suite</p>
                  <p className="font-medium text-scuro">{suiteLabel}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CalendarDays size={18} className="mt-0.5 shrink-0 text-blu" />
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div>
                    <p className="text-xs text-scuro/55 uppercase tracking-wide">Check-in</p>
                    <p className="font-medium text-scuro">{formatDate(checkIn)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-scuro/55 uppercase tracking-wide">Check-out</p>
                    <p className="font-medium text-scuro">{formatDate(checkOut)}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users size={18} className="mt-0.5 shrink-0 text-blu" />
                <div>
                  <p className="text-xs text-scuro/55 uppercase tracking-wide">Ospiti</p>
                  <p className="font-medium text-scuro">
                    {adults} adult{adults === 1 ? "o" : "i"}
                    {children > 0
                      ? ` + ${children} bambin${children === 1 ? "o" : "i"} (≤1 anno, gratuiti)`
                      : ""}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-blu/15 bg-blu/5 p-4 space-y-2 text-sm">
              <div className="flex justify-between text-scuro/70">
                <span>{nights} nott{nights === 1 ? "e" : "i"}</span>
                <span className="tabular-nums">{formatEuro(total)}</span>
              </div>
              {avgPerNight > 0 && (
                <div className="flex justify-between text-scuro/60 text-xs">
                  <span>Media a notte</span>
                  <span className="tabular-nums">{formatEuro(avgPerNight)}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-blu/15 pt-2 font-semibold text-base text-scuro">
                <span>Totale da pagare</span>
                <span className="text-blu tabular-nums">{formatEuro(total)}</span>
              </div>
            </div>

            <p className="text-xs text-scuro/50">
              Il pagamento è gestito in modo sicuro tramite PayPal. Accettati
              anche carta di credito/debito senza conto PayPal.
            </p>
          </div>

          {/* Right: dati prenotante + PayPal */}
          <div className="rounded-2xl bg-bianco p-6 shadow-sm space-y-5">
            <h2 className="text-base font-semibold text-scuro uppercase tracking-wide">
              Dati del prenotante
            </h2>
            <p className="text-xs text-scuro/55 leading-relaxed">
              Compila nome, email e telefono prima di pagare: servono per la conferma e per
              contattarti in caso di necessità.
            </p>
            <div className="space-y-4">
              <div>
                <label htmlFor="booker-name" className="sr-only">
                  Nome e cognome
                </label>
                <div className="relative">
                  <User
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-scuro/40"
                    aria-hidden
                  />
                  <input
                    id="booker-name"
                    type="text"
                    autoComplete="name"
                    value={bookerName}
                    onChange={(e) => setBookerName(e.target.value)}
                    maxLength={80}
                    placeholder="Nome e cognome"
                    className="w-full rounded-lg border border-blu/15 bg-bianco py-3 pl-10 pr-3 text-sm text-scuro placeholder:text-scuro/40 focus:border-blu focus:outline-none focus:ring-1 focus:ring-blu"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="booker-email" className="sr-only">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-scuro/40"
                    aria-hidden
                  />
                  <input
                    id="booker-email"
                    type="email"
                    autoComplete="email"
                    value={bookerEmail}
                    onChange={(e) => setBookerEmail(e.target.value)}
                    maxLength={120}
                    placeholder="Email"
                    className="w-full rounded-lg border border-blu/15 bg-bianco py-3 pl-10 pr-3 text-sm text-scuro placeholder:text-scuro/40 focus:border-blu focus:outline-none focus:ring-1 focus:ring-blu"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="booker-phone" className="sr-only">
                  Telefono (opzionale)
                </label>
                <div className="relative">
                  <Phone
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-scuro/40"
                    aria-hidden
                  />
                  <input
                    id="booker-phone"
                    type="tel"
                    autoComplete="tel"
                    value={bookerPhone}
                    onChange={(e) => setBookerPhone(e.target.value)}
                    maxLength={40}
                    placeholder="Telefono (consigliato)"
                    className="w-full rounded-lg border border-blu/15 bg-bianco py-3 pl-10 pr-3 text-sm text-scuro placeholder:text-scuro/40 focus:border-blu focus:outline-none focus:ring-1 focus:ring-blu"
                  />
                </div>
              </div>
            </div>

            <h2 className="text-base font-semibold text-scuro uppercase tracking-wide pt-2 border-t border-blu/10">
              Metodo di pagamento
            </h2>

            <PayPalScriptProvider options={paypalScriptOptions}>
              <div className="relative">
                {isProcessing && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-xl bg-bianco/90">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-blu border-t-transparent" />
                    <p className="text-sm text-scuro/60">Conferma pagamento in corso…</p>
                  </div>
                )}
                <PayPalButtons
                  style={{
                    layout: "vertical",
                    color: "blue",
                    shape: "rect",
                    label: "pay",
                    height: 48,
                  }}
                  createOrder={createOrder}
                  onApprove={onApprove}
                  onError={onError}
                  onCancel={() => { setPayError(null); setIsProcessing(false); }}
                  disabled={isProcessing || !canPay}
                />
              </div>
            </PayPalScriptProvider>
            {!canPay && (
              <p className="text-xs text-scuro/50 text-center">
                Compila nome (2–80 caratteri) e un’email valida per abilitare il pagamento.
              </p>
            )}

            {payError && (
              <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                {payError}
              </div>
            )}

            <p className="text-xs text-scuro/45 text-center">
              Cliccando su PayPal verrai reindirizzato alla pagina di pagamento
              sicura. Puoi pagare anche con carta senza conto PayPal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
