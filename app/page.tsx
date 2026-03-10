import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Car,
  Wifi,
  Sun,
  Sparkle,
  Coffee,
  ChefHat,
  Shirt,
  Thermometer,
  LayoutGrid,
  Sofa,
  Sparkles,
  Bath,
  UtensilsCrossed,
} from "lucide-react";
import SuiteCard from "@/src/components/SuiteCard";
import images from "@/src/images";

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
    titolo: "Suite Como Sole",
    sottotitolo: "Moderna e raffinata",
    descrizione:
      "Suite in uno dei principali quartieri di Como per offrire comfort e relax.",
    href: "/le-suites/suite-como-sole",
    src: images.thumbComoSole,
    alt: "Suite Como Sole",
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
    titolo: "Suite Vista Duomo",
    sottotitolo: "Stile e modernità",
    descrizione:
      "Oasi di lusso e relax nel cuore della città con vista sull'iconico centro storico di Como.",
    href: "/le-suites/suite-vista-duomo",
    src: images.thumbVistaDuomo,
    alt: "Suite Vista Duomo",
  },
];

const serviziHome = [
  { icon: Car, titolo: "Parcheggio gratuito", testo: "Parcheggio custodito adiacente alle suites." },
  { icon: Wifi, titolo: "Free Wi-fi", testo: "Connessione a internet gratuita in entrambe le suites." },
  { icon: Sun, titolo: "Terrazza vista lago", testo: "Il terrazzo affaccia sullo splendido paesaggio del Lago di Como." },
  { icon: Sparkle, titolo: "Pulizie giornaliere", testo: "Servizio di pulizia giornaliera incluso per gli ospiti." },
  { icon: Coffee, titolo: "Colazione", testo: "Colazione italiana e internazionale a buffet." },
  { icon: ChefHat, titolo: "Cucina attrezzata", testo: "Cucina completa di elettrodomestici e ogni comfort." },
  { icon: Shirt, titolo: "Biancheria per la casa", testo: "Biancheria completa sia per le camere, sia per il bagno e kit di cortesia incluso." },
  { icon: Thermometer, titolo: "Climatizzatore", testo: "Climatizzazione in tutti gli ambienti per tutte le stagioni (caldo, freddo)." },
];

const esperienze = [
  { icon: LayoutGrid, titolo: "Design italiano", testo: "Un ambiente di classe, dove la tradizione del design italiano rende lo spazio caldo e accogliente." },
  { icon: Shirt, titolo: "Biancheria pregiata", testo: "Biancheria di alta qualità, pensata per il benessere personale." },
  { icon: Sofa, titolo: "Comfort superior", testo: "Un alloggio signorile e spazioso, arredato con cura e dotato dei più moderni comfort." },
  { icon: Sparkles, titolo: "Attenzione ai dettagli", testo: "La cura di ogni dettaglio crea un perfetto connubio tra design e comodità." },
  { icon: Bath, titolo: "Asciugamani personalizzati", testo: "La cura e l'attenzione sono presenti in ogni ambiente e dettaglio." },
  { icon: Sparkles, titolo: "Sapone artigianale", testo: "Saponi artigianali a base di prodotti naturali ed oli essenziali." },
  { icon: UtensilsCrossed, titolo: "Cucina attrezzata", testo: "La cucina ha uno spazio dedicato che la rende bella, pratica e funzionale." },
  { icon: Coffee, titolo: "Caffè italiano", testo: "Lo stile italiano è rappresentato anche dal caffè." },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[400px] bg-scuro">
        <Image
          src={images.heroHome}
          alt="Como Lake Suites - Lago di Como"
          fill
          className="object-cover opacity-80"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-scuro/40 px-4 text-center text-bianco">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Como Lake Suites
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-bianco/90">
            Top luxury services sul Lago di Como
          </p>
          <Link
            href="/le-suites"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-bianco px-6 py-3 text-scuro font-medium hover:bg-chiaro transition-colors"
          >
            Scopri le Suite
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Suite in evidenza (griglia 2x3) */}
      <section className="bg-chiaro py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {suiteCards.map((suite) => (
              <SuiteCard key={suite.href} {...suite} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/le-suites"
              className="inline-flex items-center gap-2 rounded-full border-2 border-scuro bg-bianco px-6 py-3 text-scuro font-medium hover:bg-scuro hover:text-bianco transition-colors"
            >
              Tutte le Suite
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Servizi 8 icone */}
      <section className="bg-bianco py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-scuro">I nostri servizi</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-scuro/80">
            Tutto ciò che serve per un soggiorno indimenticabile.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {serviziHome.map((s) => (
              <div key={s.titolo} className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-chiaro text-scuro">
                  <s.icon size={24} />
                </div>
                <h3 className="mt-4 font-semibold text-scuro">{s.titolo}</h3>
                <p className="mt-2 text-sm text-scuro/80">{s.testo}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/i-nostri-servizi"
              className="text-scuro font-medium underline hover:no-underline"
            >
              Scopri tutti i servizi
            </Link>
          </div>
        </div>
      </section>

      {/* Esperienza - 8 box */}
      <section className="bg-grigio py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium uppercase tracking-wide text-scuro/70">
            Vivi
          </p>
          <h2 className="mt-2 text-center text-3xl font-bold text-scuro">
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
                <h3 className="mt-4 font-semibold text-scuro">{e.titolo}</h3>
                <p className="mt-2 text-sm text-scuro/80">{e.testo}</p>
              </div>
            ))}
          </div>
          <div className="relative mt-16 aspect-video overflow-hidden rounded-lg bg-scuro">
            <Image
              src={images.esperienzaVideo}
              alt="Esperienza Lago di Como"
              fill
              className="object-cover opacity-90"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="rounded-full bg-bianco/90 px-6 py-3 text-scuro font-medium">
                Video esperienza
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Host */}
      <section className="bg-bianco py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-scuro">Host</h2>
          <div className="mt-12 grid gap-12 md:grid-cols-2">
            <div className="rounded-lg border border-grigio bg-grigio/30 p-8">
              <h3 className="text-2xl font-semibold text-scuro">Marilena</h3>
              <p className="mt-4 text-scuro/80">
                Per me viaggiare è una vera esperienza: credo che le persone debbano godersi la
                propria vacanza circondate da ogni comfort, quindi potete chiedermi qualsiasi
                informazione e servizio di cui abbiate bisogno durante il vostro soggiorno.
              </p>
            </div>
            <div className="rounded-lg border border-grigio bg-grigio/30 p-8">
              <h3 className="text-2xl font-semibold text-scuro">Massimiliano</h3>
              <p className="mt-4 text-scuro/80">
                Grazie alla mia esperienza pluriennale nel settore commerciale pongo la massima
                attenzione nella relazione con i clienti, il mio obiettivo è quello di farli sentire
                come se fossero a casa loro.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
