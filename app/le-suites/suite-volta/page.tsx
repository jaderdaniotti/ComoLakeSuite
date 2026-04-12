import type { Metadata } from "next";
import { cookies } from "next/headers";
import LayoutSuite from "@/src/components/LayoutSuite";
import images from "@/src/images";
import { buildPageMetadata } from "@/src/lib/seo";
import { getServerLocale, t } from "@/src/lib/i18n";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Suite Volta - Como Lake Suites",
    description:
      "Suite Volta nel cuore del centro storico di Como. Appartamento di circa 130 mq, curato in ogni dettaglio, eleganza e calore. Fino a 6 posti letto, vista lago.",
    pathname: "/le-suites/suite-volta",
    keywords: [
      "Suite Volta Como",
      "suite 6 posti letto Como",
      "suite vista lago centro Como",
    ],
  }),
};

export default async function SuiteVoltaPage() {
  const locale = getServerLocale(await cookies());
  return (
    <LayoutSuite
      titolo="Suite Volta"
      sottotitolo={t(locale, "Moderna e raffinata", "Modern and refined")}
      descrizione={t(
        locale,
        "Ci troviamo nel cuore del centro storico di Como, l'appartamento, di circa 130 mq è curato in ogni dettaglio e rappresenta eleganza e calore. È ideale per chi è alla ricerca di un alloggio riservato, di prestigio e completo di ogni comfort.",
        "Located in the heart of Como's historic center, this 130 sqm apartment is crafted in every detail and combines elegance and warmth. It is ideal for those seeking private, prestigious accommodation with every comfort.",
      )}
      dettagliTitolo={t(locale, "Cura nei dettagli", "Attention to detail")}
      dettagliTesto={t(
        locale,
        "Suite curata in ogni minimo dettaglio. Due bagni e tre camere, fino a 4 posti letto, in pieno centro e con vista lago. La cucina ben attrezzata presenta un piano cottura, un frigorifero, una lavastoviglie e utensili da cucina.",
        "A suite refined in every detail. Two bathrooms and three bedrooms, up to 4 sleeping places, in the city center with lake view. The fully equipped kitchen includes a stovetop, refrigerator, dishwasher, and kitchenware.",
      )}
      heroSrc={images.suiteVoltaHero}
      gallery={images.suiteVoltaGallery}
      altHero="Suite Volta - Como Lake Suites"
      suitePriceId="suite-volta"
    />
  );
}
