import type { Metadata } from "next";
import LayoutSuite from "@/src/components/LayoutSuite";
import images from "@/src/images";

export const metadata: Metadata = {
  title: "Suite Cernobbio - Como Lake Suites",
  description:
    "Suite Cernobbio sulle rive del Lago di Como. Circa 60 mq, 4 posti letto. Comodità ed eleganza, passeggiate sul lungolago e gite in barca.",
};

export default function SuiteCernobbioPage() {
  return (
    <LayoutSuite
      titolo="Suite Cernobbio"
      sottotitolo="Comoda ed elegante"
      descrizione="Ci troviamo sulle rive del lago di Como, nella suggestiva località di Cernobbio, l'appartamento, di circa 60 mq è curato in ogni dettaglio e rappresenta comodità ed eleganza senza tempo. È ideale per chi è alla ricerca di un alloggio suggestivo e completo di ogni comfort."
      dettagliTitolo="Cura nei dettagli"
      dettagliTesto="Suite curata in ogni minimo dettaglio. Una camera e un divano letto per un complessivo di 4 posti letto, in una località da sogno sulle rive del lago di Como: passeggiate sul lungolago e gite in barca con il pratico sistema di navigazione ti aspettano."
      heroSrc={images.suiteCernobbioHero}
      gallery={images.suiteCernobbioGallery}
      altHero="Suite Cernobbio - Como Lake Suites"
    />
  );
}
