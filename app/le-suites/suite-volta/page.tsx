import type { Metadata } from "next";
import LayoutSuite from "@/src/components/LayoutSuite";
import images from "@/src/images";
import { buildPageMetadata } from "@/src/lib/seo";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Suite Volta - Como Lake Suites",
    description:
      "Suite Volta nel cuore del centro storico di Como. Appartamento di circa 130 mq, curato in ogni dettaglio, eleganza e calore. Fino a 6 posti letto, vista lago.",
    pathname: "/le-suites/suite-volta",
  }),
};

export default function SuiteVoltaPage() {
  return (
    <LayoutSuite
      titolo="Suite Volta"
      sottotitolo="Moderna e raffinata"
      descrizione="Ci troviamo nel cuore del centro storico di Como, l'appartamento, di circa 130 mq è curato in ogni dettaglio e rappresenta eleganza e calore. È ideale per chi è alla ricerca di un alloggio riservato, di prestigio e completo di ogni comfort."
      dettagliTitolo="Cura nei dettagli"
      dettagliTesto="Suite curata in ogni minimo dettaglio. Due bagni e tre camere, fino a 4 posti letto, in pieno centro e con vista lago. La cucina ben attrezzata presenta un piano cottura, un frigorifero, una lavastoviglie e utensili da cucina."
      heroSrc={images.suiteVoltaHero}
      gallery={images.suiteVoltaGallery}
      altHero="Suite Volta - Como Lake Suites"
      suitePriceId="suite-volta"
    />
  );
}
