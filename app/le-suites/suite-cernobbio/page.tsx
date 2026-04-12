import type { Metadata } from "next";
import LayoutSuite from "@/src/components/LayoutSuite";
import images from "@/src/images";
import { buildPageMetadata } from "@/src/lib/seo";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Suite Cernobbio - Como Lake Suites",
    description:
      "Suite Cernobbio sulle rive del Lago di Como. Circa 60 mq, 4 posti letto. Comodità ed eleganza, passeggiate sul lungolago e gite in barca.",
    pathname: "/le-suites/suite-cernobbio",
  }),
};

export default function SuiteCernobbioPage() {
  return (
    <LayoutSuite
      titolo="Suite Cernobbio"
      sottotitolo="Comoda ed elegante"
      descrizione="Ci troviamo sulle rive del lago di Como, nella suggestiva località di Cernobbio, l'appartamento, di circa 60 mq è curato in ogni dettaglio e rappresenta comodità ed eleganza senza tempo. È ideale per chi è alla ricerca di un alloggio suggestivo e completo di ogni comfort."
      dettagliTitolo="Cura nei dettagli"
      dettagliTesto="Ci troviamo sulle rive del lago di Como, nella suggestiva località di Cernobbio, l’appartamento, di circa 60 mq è curato in ogni dettaglio e rappresenta comodità ed eleganza senza tempo.
È ideale per chi è alla ricerca di un alloggio suggestivo e completo di ogni comfort."
      heroSrc={images.suiteCernobbioHero}
      gallery={images.suiteCernobbioGallery}
      altHero="Suite Cernobbio - Como Lake Suites"
      suitePriceId="suite-cernobbio"
    />
  );
}
