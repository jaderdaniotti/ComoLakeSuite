import type { Metadata } from "next";
import LayoutSuite from "@/src/components/LayoutSuite";
import images from "@/src/images";
import { buildPageMetadata } from "@/src/lib/seo";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Suite Dante - Como Lake Suites",
    description:
      "Suite Dante nel cuore di Como. Due camere, fino a 6 posti letto, a pochi passi dal centro storico. Moderna, riservata e completa di ogni comfort.",
    pathname: "/le-suites/suite-dante",
  }),
};

export default function SuiteDantePage() {
  return (
    <LayoutSuite
      titolo="Suite Dante"
      sottotitolo="Stile italiano"
      descrizione="Ci troviamo nel cuore della città di Como, l'appartamento, di circa 80 mq è ammobiliato per rappresentare modernità e raffinatezza che caratterizza anche la città. È ideale per chi è alla ricerca di un alloggio moderno, riservato e completo di ogni comfort."
      dettagliTitolo="Cura nei dettagli"
      dettagliTesto="Suite curata in ogni minimo dettaglio. Due camere, fino a 6 posti letto, in pieno centro e con vista lago. Facilmente raggiungibile a piedi, perdetevi nelle vie del centro storico tra negozi e monumenti che caratterizzano la città."
      heroSrc={images.suiteDanteHero}
      gallery={images.suiteDanteGallery}
      altHero="Suite Dante - Como Lake Suites"
      suitePriceId="suite-dante"
    />
  );
}
