import type { Metadata } from "next";
import { Phone, Mail, MapPin, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Contatti - Como Lake Suites",
  description:
    "Contattaci per informazioni e prenotazioni. Massimiliano e Marilena sono a disposizione per suggerire servizi esclusivi e supportarti durante il soggiorno.",
};

export default function ContattiPage() {
  return (
    <div className="bg-chiaro">
      <section className="bg-scuro py-16 text-bianco">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Contatti</h1>
          <p className="mt-4 max-w-2xl mx-auto text-bianco/90">
            Contattaci per informazioni e prenotazioni
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-scuro/90 max-w-2xl mx-auto mb-12">
            Gli ospiti potranno contattarci in qualsiasi momento, possiamo suggerire ogni tipo di
            servizio esclusivo e supportarli durante il soggiorno.
          </p>

          <div className="grid gap-12 md:grid-cols-2">
            <div className="rounded-lg border border-grigio bg-bianco p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-scuro">Marilena</h2>
              <ul className="mt-6 space-y-4">
                <li className="flex items-center gap-3">
                  <Phone size={20} className="shrink-0 text-scuro" />
                  <a href="tel:+393331745544" className="text-scuro hover:underline">
                    +39 333 1745544
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={20} className="shrink-0 text-scuro" />
                  <a href="mailto:info@comolakesuites.com" className="text-scuro hover:underline">
                    info@comolakesuites.com
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={20} className="mt-0.5 shrink-0 text-scuro" />
                  <span className="text-scuro/90">
                    Piazza Cavour ang. Via Albertolli 22
                    <br />
                    22100 Como, Italia
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-grigio bg-bianco p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-scuro">Massimiliano</h2>
              <ul className="mt-6 space-y-4">
                <li className="flex items-center gap-3">
                  <Phone size={20} className="shrink-0 text-scuro" />
                  <a href="tel:+393409409123" className="text-scuro hover:underline">
                    +39 340 9409123
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={20} className="shrink-0 text-scuro" />
                  <a href="mailto:info@comolakesuites.com" className="text-scuro hover:underline">
                    info@comolakesuites.com
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={20} className="mt-0.5 shrink-0 text-scuro" />
                  <span className="text-scuro/90">
                    Piazza Cavour ang. Via Albertolli 22
                    <br />
                    22100 Como, Italia
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 rounded-lg border border-grigio bg-bianco p-8 shadow-sm max-w-2xl mx-auto">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-scuro">
              <MessageSquare size={24} />
              Scrivi un messaggio
            </h2>
            <p className="mt-2 text-sm text-scuro/70">
              Form di contatto (frontend only – da collegare al backend quando pronto).
            </p>
            <form className="mt-6 space-y-4">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-scuro">
                  Nome *
                </label>
                <input
                  id="nome"
                  type="text"
                  name="nome"
                  required
                  className="mt-1 w-full rounded border border-grigio bg-bianco px-4 py-2 text-scuro focus:border-scuro focus:outline-none focus:ring-1 focus:ring-scuro"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-scuro">
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  className="mt-1 w-full rounded border border-grigio bg-bianco px-4 py-2 text-scuro focus:border-scuro focus:outline-none focus:ring-1 focus:ring-scuro"
                />
              </div>
              <div>
                <label htmlFor="messaggio" className="block text-sm font-medium text-scuro">
                  Messaggio *
                </label>
                <textarea
                  id="messaggio"
                  name="messaggio"
                  rows={5}
                  required
                  className="mt-1 w-full rounded border border-grigio bg-bianco px-4 py-2 text-scuro focus:border-scuro focus:outline-none focus:ring-1 focus:ring-scuro"
                />
              </div>
              <button
                type="submit"
                className="rounded-full bg-scuro px-6 py-3 text-bianco font-medium hover:bg-scuro/90 transition-colors"
              >
                Invia messaggio
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
