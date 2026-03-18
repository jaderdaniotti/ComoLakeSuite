import type { Metadata } from "next";
import { MapPin, MessageSquare } from "lucide-react";
import images from "@/src/images";
import Image from "next/image";
import ContattiMapSection from "@/src/components/ContattiMapSection";

export const metadata: Metadata = {
  title: "Contatti - Como Lake Suites",
  description:
    "Contattaci per informazioni e prenotazioni. Massimiliano e Marilena sono a disposizione per suggerire servizi esclusivi e supportarti durante il soggiorno.",
};

export default function ContattiPage() {
  return (
    <div className="">
      {/* Hero */}
      <section className="relative min-h-[600px] md:min-h-screen overflow-hidden">
        <Image
          src={images.fotocomo}
          alt="Como Lake Suites - Contatti"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 flex flex-col justify-center bg-linear-to-t from-scuro/80 to-transparent p-6 md:p-10">
          <p className="text-center text-sm font-medium uppercase tracking-[0.2em] text-bianco/70">
            Contattaci per informazioni e prenotazioni
          </p>
          <h1 className="text-center text-4xl font-extralight tracking-tight text-bianco md:text-7xl lg:text-8xl">
            Contatti
          </h1>
        </div>
      </section>

      {/* Contattaci + intro */}
      <section className="relative z-10 bg-bianco py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light uppercase tracking-wide text-blu md:text-3xl">
            Contattaci
          </h2>
          <p className="mt-5 max-w-2xl mx-auto text-scuro/80 leading-relaxed">
            Gli ospiti potranno contattarci in qualsiasi momento. Possiamo
            suggerire ogni tipo di servizio esclusivo e supportarli durante il
            soggiorno.
          </p>
        </div>
        <div className="mx-auto max-w-5xl xl:max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-x-10 gap-y-4 text-center md:gap-x-14">
            <a
              href="tel:+393409409123"
              className="text-scuro hover:text-blu transition-colors"
            >
              <span className="block text-xs uppercase tracking-wider text-scuro/60">
                Massimiliano
              </span>
              <span className="mt-0.5 block text-lg font-light tracking-wide md:text-xl">
                +39 340 9409123
              </span>
            </a>
            <a
              href="tel:+393331745544"
              className="text-scuro hover:text-blu transition-colors"
            >
              <span className="block text-xs uppercase tracking-wider text-scuro/60">
                Marilena
              </span>
              <span className="mt-0.5 block text-lg font-light tracking-wide md:text-xl">
                +39 333 1745544
              </span>
            </a>
            <a
              href="mailto:info@comolakesuites.com"
              className="text-scuro hover:text-blu transition-colors"
            >
              <span className="block text-xs uppercase tracking-wider text-scuro/60">
                Email
              </span>
              <span className="mt-0.5 block text-lg font-light tracking-wide md:text-xl">
                info@comolakesuites.com
              </span>
            </a>
            <div>
              <span className="block text-xs uppercase tracking-wider text-scuro/60">
                Indirizzo
              </span>
              <span className="mt-0.5 block text-lg font-light tracking-wide text-scuro/90 md:text-xl">
                Piazza Cavour ang. Via Albertolli 22 · 22100 Como
              </span>
            </div>
          </div>
        </div>
      </section>

      <hr />


      {/* Scrivi un messaggio */}
      <section className="border-t border-grigio bg-bianco py-14 md:py-20">
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
          <h2 className="flex items-center justify-center gap-2 text-xl font-light uppercase tracking-wide text-blu">
            <MessageSquare size={22} className="text-blu/80" />
            Scrivi un messaggio
          </h2>
          <form className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="nome"
                className="block text-xs font-medium uppercase tracking-wider text-scuro/70"
              >
                Nome *
              </label>
              <input
                id="nome"
                type="text"
                name="nome"
                required
                className="mt-2 w-full rounded-sm border border-grigio bg-bianco px-4 py-3 text-scuro placeholder:text-scuro/40 focus:border-blu focus:outline-none focus:ring-1 focus:ring-blu"
                placeholder="Mario Rossi"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium uppercase tracking-wider text-scuro/70"
              >
                Email *
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                className="mt-2 w-full rounded-sm border border-grigio bg-bianco px-4 py-3 text-scuro placeholder:text-scuro/40 focus:border-blu focus:outline-none focus:ring-1 focus:ring-blu"
                placeholder="mariorossi@gmail.com"
              />
            </div>
            <div>
              <label
                htmlFor="messaggio"
                className="block text-xs font-medium uppercase tracking-wider text-scuro/70"
              >
                Messaggio *
              </label>
              <textarea
                id="messaggio"
                name="messaggio"
                rows={5}
                required
                className="mt-2 w-full rounded-sm border border-grigio bg-bianco px-4 py-3 text-scuro placeholder:text-scuro/40 focus:border-blu focus:outline-none focus:ring-1 focus:ring-blu resize-none"
                placeholder="Ciao, voglio sapere se avete disponibilità per il ..."
              />
            </div>
            <button
              type="submit"
              className="mx-auto bg-blu px-6 py-3.5 text-bianco font-normal tracking-wide hover:bg-blu/90 transition-colors md:w-auto md:px-10"
            >
              Invia messaggio
            </button>
          </form>
        </div>
      </section>

      {/* Mappa come in homepage – segnalibro su Piazza Cavour */}
      <section className="border-t border-grigio bg-grigio py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="flex items-center justify-center gap-2 text-xl font-light uppercase tracking-wide text-blu md:text-2xl">
            <MapPin size={22} className="text-blu/80" />
            Dove trovarci
          </h2>
          <p className="mt-2 text-center text-sm text-scuro/70">
            Piazza Cavour ang. Via Albertolli 22 · 22100 Como, Italia
          </p>
          <div className="mt-6">
            <ContattiMapSection
              thumbnailSrc={(images.logonero as { src: string }).src}
            />
          </div>
        </div>
      </section>

      <hr />



    </div>
  );
}
