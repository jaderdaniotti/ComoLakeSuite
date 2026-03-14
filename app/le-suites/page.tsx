import type { Metadata } from "next";
import SuiteCard from "@/src/components/SuiteCard";
import images from "@/src/images";

const suites = [
  {
    titolo: "Suite Cavour",
    sottotitolo: "Elegante e con vista incantevole",
    descrizione:
      "Superata la porta d'ingresso veniamo avvolti dalla luce, che riempie l'intero perimetro della casa, dotata di un grande balcone, dal quale si può godere della vista sul Lago. Caldo e accogliente e signorile, i suoi spazi sono perfetti sia per 2 che per 4 persone. Parcheggio, pulizie e colazione inclusi.",
    href: "/le-suites/suite-cavour",
    src: images.thumbCavour,
    alt: "Suite Cavour",
    
  },
  {
    titolo: "Suites Volta",
    sottotitolo: "Esclusiva e di prestigio",
    descrizione:
      "L'ingresso si apre su un ampio corridoio che si affaccia su tutte le stanze e porta ad uno spazioso soggiorno che offre una meravigliosa vista lago ma anche sulla splendida città di Como. Ideale per 4 o 6 persone. Parcheggio, colazione e pulizie inclusi.",
    href: "/le-suites/suite-volta",
    src: images.thumbVolta,
    alt: "Suite Volta",
  },
  {
    titolo: "Suite Cernobbio",
    sottotitolo: "Comoda ed elegante",
    descrizione:
      "Situata in una suggestiva località sulle rive dell'iconico lago di Como, la suite Cernobbio è dotata di ogni comfort con circa 60 mq per un complessivo di 4 posti letto. Ideale per chi cerca comodità ed eleganza, passeggiate sul lungolago e gite in barca.",
    href: "/le-suites/suite-cernobbio",
    src: images.thumbCernobbio,
    alt: "Suite Cernobbio",
  },
  {
    titolo: "Suites Como Sole",
    sottotitolo: "Moderna e raffinata",
    descrizione:
      "Progettata per offrire il massimo comfort e relax, la suite Como Sole è perfetta per chi viaggia da solo, in coppia, con la famiglia o con un gruppo di amici. Due camere, fino a 4 posti letto, con ampio parcheggio, a pochi chilometri dal centro storico e dal lago.",
    href: "/le-suites/suite-como-sole",
    src: images.thumbComoSole,
    alt: "Suite Como Sole",
  },
  {
    titolo: "Suite Dante",
    sottotitolo: "Stile italiano",
    descrizione:
      "Suite Dante è dotata di due camere, fino a 6 posti letto, a pochi passi dal centro storico di Como. Facilmente raggiungibile a piedi, ideale per chi desidera trovare comfort e tranquillità dopo una giornata tra le vie del centro.",
    href: "/le-suites/suite-dante",
    src: images.thumbDante,
    alt: "Suite Dante",
  },
  {
    titolo: "Suites Vista Duomo",
    sottotitolo: "Stile e modernità",
    descrizione:
      "La Suite Vista Duomo è una vera e propria oasi di lusso e relax nel cuore della città. Un appartamento di 65mq dove lusso, comfort e bellezza si uniscono a una vista sull'iconico centro storico di Como.",
    href: "/le-suites/suite-vista-duomo",
    src: images.thumbVistaDuomo,
    alt: "Suite Vista Duomo",
  },
];

export const metadata: Metadata = {
  title: "Le Suites - Como Lake Suites",
  description:
    "Scopri le nostre suite: Volta, Cavour, Cernobbio, Como Sole, Dante, Vista Duomo. Alloggi di charme sul Lago di Como.",
};

export default function LeSuitesPage() {
  return (
    <div className="bg-chiaro">
      <section className="bg-scuro py-16 text-bianco">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Le Suites</h1>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {suites.map((suite, indice) => (
              <SuiteCard key={suite.href} {...suite} indice={indice} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
