import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CircleParking,
  Wifi,
  Sun,
  Bubbles,
  Coffee,
  ChefHat,
  Shirt,
  Thermometer,
  LayoutGrid,
  Sofa,
  Sparkles,
  Bath,
  UtensilsCrossed,
  EggFried,
  
} from "lucide-react";
import SuiteCard from "@/src/components/SuiteCard";
import HeroCarousel from "@/src/components/HeroCarousel";
import HomeMapSection from "@/src/components/HomeMapSection";
import images from "@/src/images";

const mapThumbnailSrcs = [
  (images.thumbVolta as { src: string }).src,
  (images.thumbDante as { src: string }).src,
  (images.thumbVistaDuomo as { src: string }).src,
  (images.thumbCernobbio as { src: string }).src,
];

const suiteCards = [
  {
    titolo: "Suite Cernobbio",
    sottotitolo: "Una camera con vista",
    descrizione:
      "Alloggio in una delle località più suggestive del lago di Como per un soggiorno da sogno.",
    href: "/le-suites/suite-cernobbio",
    src: images.thumbCernobbio,
    alt: "Suite Cernobbio",
  },
  {
    titolo: "Suite Dante",
    sottotitolo: "Una camera con vista",
    descrizione:
      "Suite curata in ogni minimo dettaglio per chi cerca un alloggio moderno e riservato.",
    href: "/le-suites/suite-dante",
    src: images.thumbDante,
    alt: "Suite Dante",
  },
  {
    titolo: "Suite Volta",
    sottotitolo: "Moderna e raffinata",
    descrizione:
      "Suite curata in ogni minimo dettaglio. Due camere, fino a 6 posti letto, a due passi dal centro città e con vista lago.",
    href: "/le-suites/suite-volta",
    src: images.thumbVolta,
    alt: "Suite Volta",
  },
  {
    titolo: "Suite Cavour",
    sottotitolo: "Una camera con vista",
    descrizione:
      "Minimal ed elegante appartamento con 4 posti letto e una vista da lasciare incantati.",
    href: "/le-suites/suite-cavour",
    src: images.thumbCavour,
    alt: "Suite Cavour",
  },
  {
    titolo: "Suite Duomo",
    sottotitolo: "Stile e modernità",
    descrizione:
      "Oasi di lusso e relax nel cuore della città con vista sull'iconico centro storico di Como.",
    href: "/le-suites/suite-vista-duomo",
    src: images.thumbVistaDuomo,
    alt: "Suite Duomo",
  },
];

const serviziHome = [
  {
    icon: CircleParking,
    titolo: "Parcheggio gratuito",
    testo: "Parcheggio custodito adiacente alle suites.",
  },
  {
    icon: Wifi,
    titolo: "Free Wi-fi",
    testo: "Connessione a internet gratuita in entrambe le suites.",
  },
  {
    icon: Sun,
    titolo: "Terrazza vista lago",
    testo: "Il terrazzo affaccia sullo splendido paesaggio del Lago di Como.",
  },
  {
    icon: Bubbles,
    titolo: "Pulizie giornaliere",
    testo: "Servizio di pulizia giornaliera incluso per gli ospiti.",
  },
  {
    icon: EggFried,
    titolo: "Colazione",
    testo: "Colazione italiana e internazionale a buffet.",
  },
  {
    icon: ChefHat,
    titolo: "Cucina attrezzata",
    testo: "Cucina completa di elettrodomestici e ogni comfort.",
  },
  {
    icon: Shirt,
    titolo: "Biancheria per la casa",
    testo:
      "Biancheria completa sia per le camere, sia per il bagno e kit di cortesia incluso.",
  },
  {
    icon: Thermometer,
    titolo: "Climatizzatore",
    testo:
      "Climatizzazione in tutti gli ambienti per tutte le stagioni (caldo, freddo).",
  },
];

const esperienze = [
  {
    icon: LayoutGrid,
    titolo: "Design italiano",
    testo:
      "Un ambiente di classe, dove la tradizione del design italiano rende lo spazio caldo e accogliente.",
  },
  {
    icon: Shirt,
    titolo: "Biancheria pregiata",
    testo: "Biancheria di alta qualità, pensata per il benessere personale.",
  },
  {
    icon: Sofa,
    titolo: "Comfort superior",
    testo:
      "Un alloggio signorile e spazioso, arredato con cura e dotato dei più moderni comfort.",
  },
  {
    icon: Sparkles,
    titolo: "Attenzione ai dettagli",
    testo:
      "La cura di ogni dettaglio crea un perfetto connubio tra design e comodità.",
  },
  {
    icon: Bath,
    titolo: "Asciugamani personalizzati",
    testo: "La cura e l'attenzione sono presenti in ogni ambiente e dettaglio.",
  },
  {
    icon: Sparkles,
    titolo: "Sapone artigianale",
    testo: "Saponi artigianali a base di prodotti naturali ed oli essenziali.",
  },
  {
    icon: UtensilsCrossed,
    titolo: "Cucina attrezzata",
    testo:
      "La cucina ha uno spazio dedicato che la rende bella, pratica e funzionale.",
  },
  {
    icon: Coffee,
    titolo: "Caffè italiano",
    testo: "Lo stile italiano è rappresentato anche dal caffè.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero carosello suite */}
      <HeroCarousel slides={suiteCards} />

      {/* Servizi 8 icone */}
      <section className="bg-bianco py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mt-2 text-center text-3xl md:text-5xl text-blu font-light">
            Servizi
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-scuro/80">
            Tutto ciò che serve per un soggiorno indimenticabile.
          </p>
          <div className="mt-12 grid gap-8 grid-cols-2 lg:grid-cols-4">
            {serviziHome.map((s) => (
              <div
                key={s.titolo}
                className="flex flex-col items-center text-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-chiaro text-scuro">
                  <s.icon size={24} />
                </div>
                <h3 className="mt-4 font-medium text-scuro text-sm">{s.titolo}</h3>
                <p className="mt-2 text-sm font-light text-scuro/80">
                  {s.testo}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center flex justify-center items-center">
            <Link
              href="/i-nostri-servizi"
              className="flex justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-medium isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500  before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group text-blu mt-3"
            >
              Visita
              <svg
                className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-blu text-blu p-2 rotate-45"
                viewBox="0 0 16 19"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                  className="fill-gray-800 group-hover:fill-gray-800"
                ></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Suite in evidenza (griglia 2x3) */}
      <section className="bg-grigio z-9 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mt-2 text-center text-3xl md:text-5xl text-blu font-light">
            Le Suites
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-scuro/80">
            Scegli e vivi la tua vacanza in un&apos;atmosfera unica.
          </p>
          <div className="grid gap-8 grid-cols-1  mt-12 justify-center items-center">
            {suiteCards.map((suite) => (
              <SuiteCard key={suite.href} {...suite} />
            ))}
          </div>
        </div>
      </section>

      {/* Esperienza - 8 box */}
      <section className="bg-bianco py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium uppercase tracking-wide text-scuro/70">
            Vivi
          </p>
          <h2 className="mt-2 text-center text-3xl md:text-5xl text-blu font-light">
            L&apos;esperienza
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-scuro/80">
            Immersione nell&apos;atmosfera del Lago di Como con i nostri video.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {esperienze.map((e) => (
              <div
                key={e.titolo}
                className="rounded-lg bg-bianco p-6 shadow-sm border border-grigio"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chiaro text-scuro">
                  <e.icon size={20} />
                </div>
                <h3 className="mt-4 font-medium text-scuro">{e.titolo}</h3>
                <p className="mt-2 text-sm font-light text-scuro/80">
                  {e.testo}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-1 ">
            <div className="aspect-video w-full overflow-hidden rounded-lg bg-scuro">
              <iframe
                src="https://www.youtube.com/embed/NExwdwH2_eU?rel=0"
                title="Video esperienza Lago di Como 1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
            <div className="aspect-video w-full overflow-hidden rounded-lg bg-scuro">
              <iframe
                src="https://www.youtube.com/embed/dDRx1i1kumg?rel=0"
                title="Video esperienza Lago di Como 2"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Host */}
      <section className="bg-grigio py-16 md:py-24 min-h-screen flex flex-col justify-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mt-2 text-center text-3xl md:text-5xl text-blu font-light">
            Host
          </h2>
          <div className="mt-12 grid gap-10 grid-cols-1 lg:grid-cols-4">
            {/* Card Marilena */}
            <article className="group py-3 overflow-hidden flex flex-col md:grid grid-cols-2 md:col-span-2 w-full border-y">
              <div className="relative w-full max-w-96 mx-auto aspect-3/4 md:aspect-auto md:col-span-1">
                <Image
                  src={images.marilena}
                  alt="Marilena - Host Como Lake Suites"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-1 flex-col justify-center px-6 py-8 md:px-8 ">
                <p className="text-xs font-normal uppercase tracking-[0.2em] text-scuro/60">
                  Host
                </p>
                <h3 className="mt-1 text-2xl font-normal uppercase tracking-wide text-blu">
                  Marilena
                </h3>
                <p className="mt-4 text-sm leading-relaxed font-normal text-scuro/80">
                  Per me viaggiare è una vera esperienza: credo che le persone
                  debbano godersi la propria vacanza circondate da ogni comfort,
                  quindi potete chiedermi qualsiasi informazione e servizio di
                  cui abbiate bisogno durante il vostro soggiorno.
                </p>
              </div>
            </article>
            <div className="hidden md:block md:col-span-2" />
            <div className="hidden md:block md:col-span-2" />
            {/* Card Massimiliano */}
            <article className="group py-3 overflow-hidden flex flex-col md:grid grid-cols-2 md:col-span-2 w-full border-y ">
              <div className="flex flex-1 flex-col justify-center px-6 py-8 md:px-8">
                <p className="text-xs font-normal uppercase tracking-[0.2em] text-scuro/60">
                  Host
                </p>
                <h3 className="mt-1 text-2xl font-normal uppercase tracking-wide text-blu">
                  Massimiliano
                </h3>
                <p className="mt-4 text-sm leading-relaxed font-normal text-scuro/80">
                  Grazie alla mia esperienza pluriennale nel settore commerciale
                  pongo la massima attenzione nella relazione con i clienti, il
                  mio obiettivo è quello di farli sentire come se fossero a casa
                  loro.
                </p>
              </div>
              <div className="relative w-full max-w-96 mx-auto aspect-3/4 md:aspect-auto md:col-span-1">
                <Image
                  src={images.massimiliano}
                  alt="Massimiliano - Host Como Lake Suites"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Mappa Google – Dove siamo */}
      <section className="bg-bianco py-16 md:py-24 min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-2 text-center text-2xl font-semibold text-scuro md:text-3xl">
            Dove siamo
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-scuro/80">
            Le nostre suite a Como e Cernobbio: Via Albertolli 22, Via Dante 25, Via Cinque Giornate 26, Via Giuseppe Garibaldi 15.
          </p>
          <HomeMapSection thumbnailSrcs={mapThumbnailSrcs} />
        </div>
      </section>
    </>
  );
}
