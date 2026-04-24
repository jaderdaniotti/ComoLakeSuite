import type { Metadata } from "next";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import images from "@/src/images";
import { buildPageMetadata } from "@/src/lib/seo";
import { getServerLocale, t } from "@/src/lib/i18n";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Tour Lago di Como - Como Lake Suites",
    description:
      "Scopri i tour privati sul Lago di Como proposti da Como Private Driver: itinerari con chauffeur, tappe personalizzate e transfer esclusivi.",
    pathname: "/tour",
    keywords: [
      "tour lago di como privati",
      "como lake tour",
      "private chauffeur como",
      "tour bellagio varenna menaggio",
      "como private driver",
    ],
  }),
};

type TourItem = {
  id: string;
  titleIt: string;
  titleEn: string;
  textIt: string;
  textEn: string;
  highlightsIt: string[];
  highlightsEn: string[];
};

const tourItems: TourItem[] = [
  {
    id: "01",
    titleIt: "Natura e Romanticismo",
    titleEn: "Nature and Romance",
    textIt:
      "Orrido di Bellano, Varenna e Bellagio: dalla gola naturale ai borghi iconici del lago.",
    textEn:
      "Orrido di Bellano, Varenna, and Bellagio: from natural wonders to iconic lake villages.",
    highlightsIt: ["5 tappe", "Tour privato", "Ideale per coppie"],
    highlightsEn: ["5 stops", "Private tour", "Ideal for couples"],
  },
  {
    id: "02",
    titleIt: "Le Perle del Centro Lago",
    titleEn: "The Pearls of the Central Lake",
    textIt:
      "Lenno, Tremezzo e Bellagio tra ville storiche, panorami e attraversamenti suggestivi.",
    textEn:
      "Lenno, Tremezzo, and Bellagio with historic villas, scenic views, and memorable crossings.",
    highlightsIt: ["Ville storiche", "Percorso panoramico", "Centro Lago"],
    highlightsEn: ["Historic villas", "Scenic route", "Central Lake"],
  },
  {
    id: "03",
    titleIt: "Tra Italia e Svizzera",
    titleEn: "Between Italy and Switzerland",
    textIt:
      "Bellagio, Menaggio e Lugano: un itinerario internazionale tra lago, cultura e lifestyle.",
    textEn:
      "Bellagio, Menaggio, and Lugano: an international itinerary with lake views, culture, and lifestyle.",
    highlightsIt: ["Italia + Svizzera", "Tour su misura", "Esperienza premium"],
    highlightsEn: ["Italy + Switzerland", "Tailored tour", "Premium experience"],
  },
];

export default async function TourPage() {
  const locale = getServerLocale(await cookies());

  return (
    <div>
      <section className="relative isolate overflow-hidden min-h-[70svh] md:min-h-screen">
        <Image
          src={images.fotocomo}
          alt={t(locale, "Tour Lago di Como", "Como Lake tours")}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-linear-to-t from-black/85 to-transparent px-4 py-10 md:p-10">
          <p className="text-center text-sm font-medium uppercase tracking-[0.2em] text-bianco/70 md:text-base">
            {t(locale, "Tour Experience", "Tour Experience")}
          </p>
          <h1 className="mt-2 text-center text-4xl font-extralight tracking-tight text-bianco md:text-7xl lg:text-8xl">
            {t(
              locale,
              "Tour Lago di Como con chauffeur privato",
              "Como Lake tours with private chauffeur",
            )}
          </h1>
          <p className="mt-5 max-w-3xl text-center text-sm leading-relaxed text-bianco/80 md:text-lg">
            {t(
              locale,
              "Una selezione di itinerari esclusivi proposta da Como Private Driver, con soste su misura e transfer dedicati.",
              "A curated selection of exclusive itineraries by Como Private Driver, with tailored stops and dedicated transfers.",
            )}
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="https://www.comoprivatedriver.it/tour"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-bianco px-6 py-3 text-sm font-semibold text-scuro transition hover:bg-bianco/90"
            >
              {t(locale, "Scopri tutti i tour", "See all tours")}
              <ArrowUpRight size={16} />
            </Link>
            <Link
              href="https://www.comoprivatedriver.it/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-bianco/60 px-6 py-3 text-sm font-semibold text-bianco transition hover:bg-bianco/10"
            >
              {t(locale, "Vai a Como Private Driver", "Go to Como Private Driver")}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-bianco py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-scuro/60">
              {t(locale, "Itinerari suggeriti", "Suggested itineraries")}
            </p>
            <h2 className="mt-3 text-3xl font-extralight tracking-tight text-scuro md:text-5xl">
              {t(locale, "Scegli il tuo stile di tour", "Choose your tour style")}
            </h2>
          </div>
          <div className="mt-10 grid items-stretch gap-5 md:grid-cols-3">
            {tourItems.map((tour) => (
              <article
                key={tour.id}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-grigio bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)]"
              >
                <div
                  className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blu/8"
                  aria-hidden
                />
                <p className="inline-flex rounded-fullpx-3 py-1 text-xs uppercase tracking-wider text-blu">
                  {t(locale, "Itinerario", "Itinerary")} {tour.id}
                </p>
                <h2 className="mt-4 text-2xl font-light text-scuro">
                  {t(locale, tour.titleIt, tour.titleEn)}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-scuro/75 md:text-base">
                  {t(locale, tour.textIt, tour.textEn)}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {(locale === "en" ? tour.highlightsEn : tour.highlightsIt).map(
                    (item) => (
                      <span
                        key={`${tour.id}-${item}`}
                        className="rounded-full border border-grigio bg-grigioscuro px-3 py-1 text-xs font-medium text-scuro/80"
                      >
                        {item}
                      </span>
                    ),
                  )}
                </div>
                <Link
                  href="https://www.comoprivatedriver.it/tour"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto pt-6 inline-flex items-center gap-2 text-sm font-medium text-blu transition hover:text-blu/80"
                >
                  {t(locale, "Vedi itinerario completo", "View full itinerary")}
                  <ArrowUpRight size={15} />
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Link
              href="https://www.comoprivatedriver.it/tour"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-scuro px-7 py-3 text-sm font-semibold text-scuro transition hover:bg-scuro hover:text-bianco"
            >
              {t(locale, "Richiedi il tuo tour personalizzato", "Request your custom tour")}
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
