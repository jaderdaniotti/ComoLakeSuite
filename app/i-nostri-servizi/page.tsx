import type { Metadata } from "next";
import {
  Car,
  Wifi,
  Sun,
  Sparkle,
  Coffee,
  ChefHat,
  Shirt,
  Thermometer,
  Tv,
  Baby,
  Building2,
  CreditCard,
  Shirt as ShirtIcon,
  MapPin,
  Lock,
  Star,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Servizi - Como Lake Suites",
  description:
    "Parcheggio gratuito, Wi-fi, terrazza vista lago, pulizie giornaliere, colazione, cucina attrezzata, biancheria, climatizzatore e molti altri servizi.",
};

const servizi = [
  {
    icon: Car,
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
    icon: Sparkle,
    titolo: "Pulizie giornaliere",
    testo: "Servizio di pulizia giornaliera degli appartamenti incluso per gli ospiti.",
  },
  {
    icon: Coffee,
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
    testo: "Climatizzazione in tutti gli ambienti per tutte le stagioni (caldo, freddo).",
  },
  {
    icon: Tv,
    titolo: "Pay TV",
    testo: "Una vasta scelta di canali, anche in lingua originale.",
  },
  {
    icon: Baby,
    titolo: "Family Friendly",
    testo: "Accoglienza studiata per tutta la famiglia, presenti culle e seggioloni.",
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
    testo: "Lavatrice in suite con accessori per il lavaggio del proprio bucato.",
  },
  {
    icon: MapPin,
    titolo: "Ottima posizione",
    testo: "Le suites si trovano nel centro della città, situato sul lungolago.",
  },
  {
    icon: Lock,
    titolo: "Cassaforte",
    testo: "Disponibile in suite una cassaforte per custodire oggetti di valore.",
  },
  {
    icon: Star,
    titolo: "Servizi esclusivi",
    testo: "Su richiesta, boat service, ncc, spa, tour in elicottero e molto altro.",
  },
];

export default function ServiziPage() {
  return (
    <div className="bg-chiaro">
      <section className="bg-scuro py-16 text-bianco">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Servizi</h1>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {servizi.map((s) => (
              <div
                key={s.titolo}
                className="rounded-lg border border-grigio bg-bianco p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-scuro text-bianco">
                  <s.icon size={24} />
                </div>
                <h2 className="mt-4 font-semibold text-scuro">{s.titolo}</h2>
                <p className="mt-2 text-sm text-scuro/80">{s.testo}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
