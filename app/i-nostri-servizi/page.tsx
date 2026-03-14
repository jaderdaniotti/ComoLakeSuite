import type { Metadata } from "next";
import {
  CircleParking,
  Wifi,
  Sun,
  Bubbles,
  EggFried,
  ChefHat,
  Shirt,
  Thermometer,
  MonitorCheck,
  Baby,
  Building2,
  CreditCard,
  Shirt as ShirtIcon,
  MapPin,
  Lock,
  Star,
} from "lucide-react";
import Image from "next/image";
import images from "@/src/images";

export const metadata: Metadata = {
  title: "Servizi - Como Lake Suites",
  description:
    "Parcheggio gratuito, Wi-fi, terrazza vista lago, pulizie giornaliere, colazione, cucina attrezzata, biancheria, climatizzatore e molti altri servizi.",
};

const servizi = [
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
    testo: "Il terrazzo affaccia direttamente sullo splendido Lago di Como.",
  },
  {
    icon: Bubbles,
    titolo: "Pulizie giornaliere",
    testo:
      "Servizio di pulizia giornaliera degli appartamenti incluso per gli ospiti.",
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
    testo: "Biancheria completa sia per le camere, sia per il bagno.",
  },
  {
    icon: Thermometer,
    titolo: "Climatizzatore",
    testo:
      "Climatizzazione in tutti gli ambienti per tutte le stagioni (caldo, freddo).",
  },
  {
    icon: MonitorCheck,
    titolo: "Pay TV",
    testo: "Una vasta scelta di canali, anche in lingua originale.",
  },
  {
    icon: Baby,
    titolo: "Family Friendly",
    testo:
      "Accoglienza studiata per tutta la famiglia, presenti culle e seggioloni.",
  },
  {
    icon: Building2,
    titolo: "Ascensore",
    testo: "Il palazzo è dotato di ascensore che porta a tutti i piani.",
  },
  {
    icon: CreditCard,
    titolo: "Pagamenti accettati",
    testo: "Amex, Visa, MasterCard, Diners Card, UnionPay, CartaSì e Maestro.",
  },
  {
    icon: ShirtIcon,
    titolo: "Lavatrice",
    testo:
      "Lavatrice in suite con accessori per il lavaggio del proprio bucato.",
  },
  {
    icon: MapPin,
    titolo: "Ottima posizione",
    testo:
      "Le suites si trovano nel centro della città, situato sul lungolago.",
  },
  {
    icon: Lock,
    titolo: "Cassaforte",
    testo:
      "Disponibile in suite una cassaforte per custodire oggetti di valore.",
  },
  {
    icon: Star,
    titolo: "Servizi esclusivi",
    testo:
      "Su richiesta, boat service, ncc, spa, tour in elicottero e molto altro.",
  },
];

export default function ServiziPage() {
  return (
    <div className="bg-bianco">
      <section className="relative pt-12 min-h-[600px] md:min-h-screen bg-scuro">
        <Image
          src={images.serviziHero}
          alt="Servizi"
          fill
          className="object-cover"
          priority
          sizes=""
        />
        <div className="absolute inset-0 flex flex-col justify-center bg-linear-to-t items-center from-scuro/80 to-transparent p-6 md:p-10">
          <p className="text-sm font-medium uppercase tracking-wide text-center text-bianco/70 ">
            Tutto ciò che serve per un soggiorno indimenticabile.
          </p>
          <h1 className="text-3xl font-extralight tracking-tighter text-bianco md:text-9xl">
            Servizi
          </h1>
        </div>
      </section>

      {/* Elenco servizi – stile [comolakesuites.com/i-nostri-servizi](https://www.comolakesuites.com/i-nostri-servizi/) */}
      <section className="py-16 md:py-24 bg-bianco">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {servizi.map((s) => (
              <div
                key={s.titolo}
                className="bg-bianco p-6"
              >
                <div className="mt-6 flex w-full aspect-4/3 items-center justify-center bg-grigio text-scuro">
                  <s.icon size={45} strokeWidth={1.5} />
                </div>
                <h2 className="text-2xl md:text-xl mt-3 font-light uppercase md:normal-case tracking-wide text-center text-scuro">
                  {s.titolo}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-center text-scuro/70">
                  {s.testo}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
