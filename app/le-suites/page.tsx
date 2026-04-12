import type { Metadata } from "next";
import { cookies } from "next/headers";
import SuiteCard from "@/src/components/SuiteCard";
import images from "@/src/images";
import { buildPageMetadata } from "@/src/lib/seo";
import { getServerLocale, t } from "@/src/lib/i18n";

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
  ...buildPageMetadata({
    title: "Le Suites - Como Lake Suites",
    description:
      "Scopri le nostre suite: Volta, Cavour, Cernobbio, Como Sole, Dante, Vista Duomo. Alloggi di charme sul Lago di Como.",
    pathname: "/le-suites",
    keywords: [
      "suite Como centro",
      "suite vista lago Como",
      "suite Cavour Como",
      "suite Volta Como",
      "suite Vista Duomo",
      "suite Cernobbio",
    ],
  }),
};

export default async function LeSuitesPage() {
  const locale = getServerLocale(await cookies());
  const suitesLocalized = suites.map((suite) => ({
    ...suite,
    sottotitolo: t(
      locale,
      suite.sottotitolo,
      {
        "Elegante e con vista incantevole": "Elegant with an enchanting view",
        "Esclusiva e di prestigio": "Exclusive and prestigious",
        "Comoda ed elegante": "Comfortable and elegant",
        "Moderna e raffinata": "Modern and refined",
        "Stile italiano": "Italian style",
        "Stile e modernità": "Style and modernity",
      }[suite.sottotitolo] ?? suite.sottotitolo,
    ),
    descrizione: t(
      locale,
      suite.descrizione,
      {
        "Superata la porta d'ingresso veniamo avvolti dalla luce, che riempie l'intero perimetro della casa, dotata di un grande balcone, dal quale si può godere della vista sul Lago. Caldo e accogliente e signorile, i suoi spazi sono perfetti sia per 2 che per 4 persone. Parcheggio, pulizie e colazione inclusi.":
          "Step through the front door and you are welcomed by natural light filling the entire apartment, complete with a large balcony overlooking the lake. Warm, elegant, and cozy, its spaces are perfect for both 2 and 4 guests. Parking, cleaning, and breakfast included.",
        "L'ingresso si apre su un ampio corridoio che si affaccia su tutte le stanze e porta ad uno spazioso soggiorno che offre una meravigliosa vista lago ma anche sulla splendida città di Como. Ideale per 4 o 6 persone. Parcheggio, colazione e pulizie inclusi.":
          "The entrance opens onto a wide corridor connecting every room and leading to a spacious living area with a wonderful lake view and a beautiful view of Como. Ideal for 4 to 6 guests. Parking, breakfast, and cleaning included.",
        "Situata in una suggestiva località sulle rive dell'iconico lago di Como, la suite Cernobbio è dotata di ogni comfort con circa 60 mq per un complessivo di 4 posti letto. Ideale per chi cerca comodità ed eleganza, passeggiate sul lungolago e gite in barca.":
          "Located in a charming area on the shores of iconic Lake Como, Suite Cernobbio offers all comforts in about 60 sqm with up to 4 sleeping places. Ideal for guests seeking comfort and elegance, lakeside walks, and boat trips.",
        "Progettata per offrire il massimo comfort e relax, la suite Como Sole è perfetta per chi viaggia da solo, in coppia, con la famiglia o con un gruppo di amici. Due camere, fino a 4 posti letto, con ampio parcheggio, a pochi chilometri dal centro storico e dal lago.":
          "Designed for maximum comfort and relaxation, Suite Como Sole is perfect for solo travelers, couples, families, or groups of friends. Two bedrooms, up to 4 guests, large parking area, just a few kilometers from the historic center and the lake.",
        "Suite Dante è dotata di due camere, fino a 6 posti letto, a pochi passi dal centro storico di Como. Facilmente raggiungibile a piedi, ideale per chi desidera trovare comfort e tranquillità dopo una giornata tra le vie del centro.":
          "Suite Dante has two bedrooms and can host up to 6 guests, just a short walk from Como's historic center. Easy to reach on foot, ideal for those seeking comfort and tranquility after a day in town.",
        "La Suite Vista Duomo è una vera e propria oasi di lusso e relax nel cuore della città. Un appartamento di 65mq dove lusso, comfort e bellezza si uniscono a una vista sull'iconico centro storico di Como.":
          "Suite Vista Duomo is a true oasis of luxury and relaxation in the heart of the city. A 65 sqm apartment where luxury, comfort, and beauty come together with a view of Como's iconic historic center.",
      }[suite.descrizione] ?? suite.descrizione,
    ),
  }));

  return (
    <div className="bg-chiaro">
      <section className="bg-scuro py-16 text-bianco">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            {t(locale, "Le Suites", "Suites")}
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {suitesLocalized.map((suite, indice) => (
              <SuiteCard
                key={suite.href}
                {...suite}
                indice={indice}
                ctaLabel={t(locale, "Leggi tutto e prenota", "Read more and book")}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
