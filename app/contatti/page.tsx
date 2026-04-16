import type { Metadata } from "next";
import { cookies } from "next/headers";
import { MapPin, Mail, Phone } from "lucide-react";
import images from "@/src/images";
import Image from "next/image";
import ContattiMapSection from "@/src/components/ContattiMapSection";
import ContattiForm from "@/src/components/ContattiForm";
import { buildPageMetadata } from "@/src/lib/seo";
import { getServerLocale, t } from "@/src/lib/i18n";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Contatti - Como Lake Suites",
    description:
      "Contattaci per informazioni e prenotazioni. Massimiliano e Marilena sono a disposizione per suggerire servizi esclusivi e supportarti durante il soggiorno.",
    pathname: "/contatti",
    keywords: [
      "contatti Como Lake Suites",
      "prenotazioni suite Como",
      "telefono Como Lake Suites",
      "email Como Lake Suites",
      "assistenza soggiorno Como",
    ],
  }),
};

export default async function ContattiPage() {
  const locale = getServerLocale(await cookies());
  return (
    <div className="">
      {/* Hero */}
      <section className="relative min-h-[600px] md:min-h-screen overflow-hidden">
        <Image
          src={images.fotocomo}
          alt={t(locale, "Como Lake Suites - Contatti", "Como Lake Suites - Contacts")}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 flex flex-col justify-center bg-linear-to-t from-black/80 to-transparent p-6 md:p-10">
          <p className="text-center text-sm font-medium uppercase tracking-[0.2em] text-bianco/70">
            {t(
              locale,
              "Contattaci per informazioni e prenotazioni",
              "Contact us for information and bookings",
            )}
          </p>
          <h1 className="text-center text-4xl font-extralight tracking-tight text-bianco md:text-7xl lg:text-8xl">
            {t(locale, "Contatti", "Contacts")}
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
                  {t(locale, "Contattaci", "Contact us")}
                </h2>
                <p className="mt-6 max-w-sm text-md leading-[1.75] text-[#666666] md:text-md">
                  {t(
                    locale,
                    "Gli ospiti potranno contattarci in qualsiasi momento, possiamo suggerire ogni tipo di servizio esclusivo e supportarli durante il soggiorno.",
                    "Guests can contact us at any time. We can suggest exclusive services and support them throughout their stay.",
                  )}
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
                          href="mailto:comolakesuitesvistalago@gmail.com"
                          className="leading-snug break-all hover:underline"
                        >
                          comolakesuitesvistalago@gmail.com
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
                          {t(locale, "Italia", "Italy")}
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
                          href="mailto:comolakesuitesvistalago@gmail.com"
                          className="leading-snug break-all hover:underline"
                        >
                          comolakesuitesvistalago@gmail.com
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
                          {t(locale, "Italia", "Italy")}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="relative lg:pt-1">
                <div className="absolute inset-0" aria-hidden />
                <ContattiForm />
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
            {t(locale, "Dove trovarci", "Where to find us")}
          </h2>
          <p className="mt-2 text-center text-sm text-scuro/70">
            Piazza Cavour ang. Via Albertolli 22 · 22100 Como,{" "}
            {t(locale, "Italia", "Italy")}
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
