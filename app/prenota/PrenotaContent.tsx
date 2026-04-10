"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  type ReactPayPalScriptOptions,
} from "@paypal/react-paypal-js";
import { formatEuro } from "@/src/lib/pricing";
import { ArrowLeft, CalendarDays, Users, BedDouble } from "lucide-react";

const SUITE_LABELS: Record<string, string> = {
  "suite-cavour": "Suite Cavour",
  "suite-volta": "Suite Volta",
  "suite-vista-duomo": "Suite Vista Duomo",
  "suite-dante": "Suite Dante",
  "suite-cernobbio": "Suite Cernobbio",
  "suite-como-sole": "Suite Como Sole",
};

const paypalScriptOptions: ReactPayPalScriptOptions = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
  currency: "EUR",
  intent: "capture",
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

  const [payError, setPayError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

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
      body: JSON.stringify({ amount: total, suiteId, checkIn, checkOut, adults, children }),
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
    <div className="min-h-screen bg-grigioscuro pt-50">
      <div className="mx-auto max-w-4xl px-4 pb-10 sm:px-6 lg:px-8">
        {/* Back button */}
        <div className="mb-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm text-scuro/60 hover:text-scuro transition"
          >
            <ArrowLeft size={16} />
            Torna alla suite
          </button>
        </div>

        <div className="mb-8 space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-scuro/50">
            Pagamento sicuro
          </p>
          <h1 className="text-2xl font-light text-scuro md:text-3xl">
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

          {/* Right: PayPal buttons */}
          <div className="rounded-2xl bg-bianco p-6 shadow-sm space-y-5">
            <h2 className="text-base font-semibold text-scuro uppercase tracking-wide">
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
                  disabled={isProcessing}
                />
              </div>
            </PayPalScriptProvider>

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
