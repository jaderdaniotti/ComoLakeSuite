"use client";

import { useState } from "react";

export default function ContattiForm() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Dopo `await`, l’evento sintetico può non avere più `currentTarget`: salva il form subito.
    const form = e.currentTarget;
    setError(null);
    const fd = new FormData(form);
    const nome = String(fd.get("nome") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const messaggio = String(fd.get("messaggio") ?? "").trim();

    setPending(true);
    try {
      const res = await fetch("/api/contatti", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, messaggio }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        reason?: string;
      };
      if (!res.ok) {
        const extra =
          data.reason === "not_configured"
            ? " (sviluppo: not_configured)"
            : data.reason === "provider_error"
              ? " (sviluppo: provider_error — vedi log del server)"
              : "";
        setError((data.error ?? "Invio non riuscito. Riprova tra poco.") + extra);
        return;
      }
      setDone(true);
      form.reset();
    } catch {
      setError("Connessione non disponibile. Riprova tra poco.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative z-20 flex flex-col gap-6 rounded-lg bg-grigioscuro p-6 md:gap-7"
    >
      {done && (
        <p
          className="border border-[#101443]/20 bg-[#E8E8E8] px-4 py-3 text-sm text-[#101443]"
          role="status"
        >
          Messaggio inviato. Riceverai a breve un messaggio di conferma al tuo
          indirizzo email; ti risponderemo al più presto.
        </p>
      )}
      {error && (
        <p
          className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          role="alert"
        >
          {error}
        </p>
      )}

      <div>
        <label htmlFor="nome" className="sr-only">
          Nome (obbligatorio)
        </label>
        <input
          id="nome"
          type="text"
          name="nome"
          required
          minLength={2}
          maxLength={200}
          autoComplete="name"
          disabled={pending}
          placeholder="Nome e cognome"
          className="w-full rounded-none border border-[#CCCCCC] bg-[#E8E8E8] px-4 py-3.5 text-sm text-black placeholder:text-[#666666] focus:border-[#1A1B35] focus:outline-none focus:ring-1 focus:ring-[#1A1B35] disabled:opacity-60"
        />
      </div>
      <div>
        <label htmlFor="email" className="sr-only">
          Email (obbligatorio)
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          maxLength={320}
          autoComplete="email"
          disabled={pending}
          placeholder="Indirizzo email"
          className="w-full rounded-none border border-[#CCCCCC] bg-[#E8E8E8] px-4 py-3.5 text-sm text-black placeholder:text-[#666666] focus:border-[#1A1B35] focus:outline-none focus:ring-1 focus:ring-[#1A1B35] disabled:opacity-60"
        />
      </div>
      <div>
        <label htmlFor="messaggio" className="sr-only">
          Messaggio (obbligatorio)
        </label>
        <textarea
          id="messaggio"
          name="messaggio"
          rows={7}
          required
          minLength={10}
          maxLength={10000}
          disabled={pending}
          placeholder="Messaggio"
          className="w-full resize-none rounded-none border border-[#CCCCCC] bg-[#E8E8E8] px-4 py-3.5 text-sm text-black placeholder:text-[#666666] focus:border-[#1A1B35] focus:outline-none focus:ring-1 focus:ring-[#1A1B35] disabled:opacity-60"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-none bg-[#1A1B35] px-8 py-3.5 text-center text-sm font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#14152a] disabled:opacity-60 sm:w-auto sm:min-w-[140px]"
      >
        {pending ? "Invio…" : "Invia"}
      </button>
    </form>
  );
}
