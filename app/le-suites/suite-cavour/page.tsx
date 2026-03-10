import type { Metadata } from "next";
import LayoutSuite from "@/src/components/LayoutSuite";
import images from "@/src/images";

export const metadata: Metadata = {
  title: "Suite Cavour - Como Lake Suites",
  description:
    "Suite Cavour nel centro storico di Como. Appartamento 65mq con grande balcone e vista sul Lago. Perfetta per 2 o 4 persone. Parcheggio, pulizie e colazione inclusi.",
};

export default function SuiteCavourPage() {
  return (
    <LayoutSuite
      titolo="Suite Cavour"
      sottotitolo="Una camera con vista"
      descrizione="La vista dal terrazzo toglie il fiato: lo sguardo si perde all'orizzonte grazie allo splendido Lago di Como. Ci troviamo nel centro storico di Como, all'interno di un meraviglioso appartamento di 65mq, accogliente, caldo e signorile."
      dettagliTitolo="Eleganza & Calore"
      dettagliTesto="Suite dotata di ogni comfort. Ideale per chi è alla ricerca di un alloggio tranquillo e di prestigio. Dispone di 4 posti letto e di una master bedroom con vista sul lago. I bambini fino ad un anno alloggiano gratuitamente."
      heroSrc={images.suiteCavourHero}
      gallery={images.suiteCavourGallery}
      altHero="Suite Cavour - Como Lake Suites"
    />
  );
}
