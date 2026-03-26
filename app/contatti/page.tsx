import type { Metadata } from "next";
import { MapPin, Mail, Phone } from "lucide-react";
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
        <div className="absolute inset-0 flex flex-col justify-center bg-linear-to-t from-black/80 to-transparent p-6 md:p-10">
          <p className="text-center text-sm font-medium uppercase tracking-[0.2em] text-bianco/70">
            Contattaci per informazioni e prenotazioni
          </p>
          <h1 className="text-center text-4xl font-extralight tracking-tight text-bianco md:text-7xl lg:text-8xl">
            Contatti
          </h1>
        </div>
      </section>

      {/* Contattaci: layout bianco 20% + grigio, testo + form */}
      <section className="relative isolate w-full bg-bianco my-6 mx-auto overflow-hidden">
        {/* Sfondo grigio 2/3: sotto al contenuto (z-index richiede position sul layer sopra) */}

        <div className="relative z-10 flex flex-col lg:flex-row lg:min-h-0">
          <div className="flex-1  px-6 py-14 sm:px-10 md:px-12 md:py-16 lg:px-14 lg:py-20 xl:px-20">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-x-16 xl:gap-x-24">
              <div className="text-left">
                <h2 className="text-3xl font-extralight uppercase tracking-[0.12em] text-black md:text-6xl">
                  Contattaci
                </h2>
                <p className="mt-6 max-w-sm text-md leading-[1.75] text-[#666666] md:text-md">
                  Gli ospiti potranno contattarci in qualsiasi momento, possiamo
                  suggerire ogni tipo di servizio esclusivo e supportarli durante
                  il soggiorno.
                </p>
                <div className="mt-10 grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-12 md:gap-x-20">
                  <div>
                    <p className="font-normal text-3xl text-black">
                      Marilena
                    </p>
                    <ul className="mt-4 space-y-4 text-sm text-black">
                      <li className="flex gap-1">
                        <Phone
                          className="mt-0.5 h-4 w-4 shrink-0 text-black"
                          strokeWidth={1.5}
                          aria-hidden
                        />
                        <a
                          href="tel:+393331745544"
                          className="leading-snug hover:underline"
                        >
                          +39 333 1745544
                        </a>
                      </li>
                      <li className="flex gap-1">
                        <Mail
                          className="mt-0.5 h-4 w-4 shrink-0 text-black"
                          strokeWidth={1.5}
                          aria-hidden
                        />
                        <a
                          href="mailto:info@comolakesuites.com"
                          className="leading-snug break-all hover:underline"
                        >
                          info@comolakesuites.com
                        </a>
                      </li>
                      <li className="flex gap-1">
                        <MapPin
                          className="mt-0.5 h-4 w-4 shrink-0 text-black"
                          strokeWidth={1.5}
                          aria-hidden
                        />
                        <span className="leading-snug">
                          Piazza Cavour ang. Via Albertolli 22
                          <br />
                          22100 Como,
                          <br />
                          Italia
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-normal text-3xl text-black">
                      Massimiliano
                    </p>
                    <ul className="mt-4 space-y-4 text-sm text-black">
                      <li className="flex gap-1">
                        <Phone
                          className="mt-0.5 h-4 w-4 shrink-0 text-black"
                          strokeWidth={1.5}
                          aria-hidden
                        />
                        <a
                          href="tel:+393409409123"
                          className="leading-snug hover:underline"
                        >
                          +39 340 9409123
                        </a>
                      </li>
                      <li className="flex gap-1">
                        <Mail
                          className="mt-0.5 h-4 w-4 shrink-0 text-black"
                          strokeWidth={1.5}
                          aria-hidden
                        />
                        <a
                          href="mailto:info@comolakesuites.com"
                          className="leading-snug break-all hover:underline"
                        >
                          info@comolakesuites.com
                        </a>
                      </li>
                      <li className="flex gap-1">
                        <MapPin
                          className="mt-0.5 h-4 w-4 shrink-0 text-black"
                          strokeWidth={1.5}
                          aria-hidden
                        />
                        <span className="leading-snug">
                          Piazza Cavour ang. Via Albertolli 22
                          <br />
                          22100 Como,
                          <br />
                          Italia
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="lg:pt-1 relative ">
                <div className="absolute inset-0"/>
                <form className="flex flex-col gap-6 md:gap-7 z-20 bg-grigioscuro p-6 rounded-lg">
                  <div>
                    <label htmlFor="nome" className="sr-only">
                      Nome (obbligatorio)
                    </label>
                    <input
                      id="nome"
                      type="text"
                      name="nome"
                      required
                      autoComplete="name"
                      placeholder="Your Name*"
                      className="w-full rounded-none border border-[#CCCCCC] bg-[#E8E8E8] px-4 py-3.5 text-sm text-black placeholder:text-[#666666] focus:border-[#1A1B35] focus:outline-none focus:ring-1 focus:ring-[#1A1B35]"
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
                      autoComplete="email"
                      placeholder="Email address*"
                      className="w-full rounded-none border border-[#CCCCCC] bg-[#E8E8E8] px-4 py-3.5 text-sm text-black placeholder:text-[#666666] focus:border-[#1A1B35] focus:outline-none focus:ring-1 focus:ring-[#1A1B35]"
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
                      placeholder="Write Message*"
                      className="w-full resize-none rounded-none border border-[#CCCCCC] bg-[#E8E8E8] px-4 py-3.5 text-sm text-black placeholder:text-[#666666] focus:border-[#1A1B35] focus:outline-none focus:ring-1 focus:ring-[#1A1B35]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-none bg-[#1A1B35] px-8 py-3.5 text-center text-sm font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#14152a] sm:w-auto sm:min-w-[140px]"
                  >
                    SEND
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mappa come in homepage – segnalibro su Piazza Cavour */}
      <section className="border-t border-grigio bg-grigioscuro py-14 md:py-20">
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
