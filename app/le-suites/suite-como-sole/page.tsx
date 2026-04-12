import type { Metadata } from "next";
import { cookies } from "next/headers";
import LayoutSuite from "@/src/components/LayoutSuite";
import images from "@/src/images";
import { buildPageMetadata } from "@/src/lib/seo";
import { getServerLocale, t } from "@/src/lib/i18n";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Suite Como Sole - Como Lake Suites",
    description:
      "Suite Como Sole in uno dei principali quartieri di Como. Circa 80 mq, fino a 4 posti letto, ampio parcheggio. Comfort e relax per famiglie e gruppi.",
    pathname: "/le-suites/suite-como-sole",
    keywords: [
      "Suite Como Sole",
      "suite con parcheggio Como",
      "alloggio famiglie Como",
    ],
  }),
};

export default async function SuiteComoSolePage() {
  const locale = getServerLocale(await cookies());
  return (
    <LayoutSuite
      titolo="Suite Como Sole"
      sottotitolo={t(locale, "Moderna e raffinata", "Modern and refined")}
      descrizione={t(
        locale,
        "Ci troviamo in uno dei principali quartieri di Como, a pochi km dal centro storico e dal lago. L'appartamento, di circa 80 mq, è progettato per offrire comfort e relax, ideale per chi cerca una soluzione comoda per visitare la città di Como, anche per gruppi o famiglie.",
        "Located in one of Como's main neighborhoods, just a few kilometers from the historic center and the lake. This 80 sqm apartment is designed for comfort and relaxation, ideal for guests, families, or groups visiting Como.",
      )}
      dettagliTitolo={t(locale, "Cura nei dettagli", "Attention to detail")}
      dettagliTesto={t(
        locale,
        "Suite curata in ogni minimo dettaglio. Due camere, fino a 4 posti letto, con ampio parcheggio. In uno dei principali quartieri di Como, per alloggiare in una zona comoda e tranquilla.",
        "A suite refined in every detail. Two bedrooms, up to 4 sleeping places, and ample parking. Located in one of Como's main neighborhoods for a convenient and quiet stay.",
      )}
      heroSrc={images.suiteComoSoleHero}
      gallery={images.suiteComoSoleGallery}
      altHero="Suite Como Sole - Como Lake Suites"
      suitePriceId="suite-como-sole"
    />
  );
}
