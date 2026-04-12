import type { Metadata } from "next";
import LayoutSuite from "@/src/components/LayoutSuite";
import images from "@/src/images";
import { buildPageMetadata } from "@/src/lib/seo";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Suite Como Sole - Como Lake Suites",
    description:
      "Suite Como Sole in uno dei principali quartieri di Como. Circa 80 mq, fino a 4 posti letto, ampio parcheggio. Comfort e relax per famiglie e gruppi.",
    pathname: "/le-suites/suite-como-sole",
  }),
};

export default function SuiteComoSolePage() {
  return (
    <LayoutSuite
      titolo="Suite Como Sole"
      sottotitolo="Moderna e raffinata"
      descrizione="Ci troviamo in uno dei principali quartieri di Como, a pochi km dal centro storico e dal lago. L'appartamento, di circa 80 mq, è progettato per offrire comfort e relax, ideale per chi cerca una soluzione comoda per visitare la città di Como, anche per gruppi o famiglie."
      dettagliTitolo="Cura nei dettagli"
      dettagliTesto="Suite curata in ogni minimo dettaglio. Due camere, fino a 4 posti letto, con ampio parcheggio. In uno dei principali quartieri di Como, per alloggiare in una zona comoda e tranquilla."
      heroSrc={images.suiteComoSoleHero}
      gallery={images.suiteComoSoleGallery}
      altHero="Suite Como Sole - Como Lake Suites"
      suitePriceId="suite-como-sole"
    />
  );
}
