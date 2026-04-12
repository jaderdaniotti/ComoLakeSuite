import type { Metadata } from "next";
import { cookies } from "next/headers";
import LayoutSuite from "@/src/components/LayoutSuite";
import images from "@/src/images";
import { buildPageMetadata } from "@/src/lib/seo";
import { getServerLocale, t } from "@/src/lib/i18n";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Suite Dante - Como Lake Suites",
    description:
      "Suite Dante nel cuore di Como. Due camere, fino a 6 posti letto, a pochi passi dal centro storico. Moderna, riservata e completa di ogni comfort.",
    pathname: "/le-suites/suite-dante",
    keywords: [
      "Suite Dante Como",
      "suite vicino centro storico Como",
      "alloggio moderno Como",
    ],
  }),
};

export default async function SuiteDantePage() {
  const locale = getServerLocale(await cookies());
  return (
    <LayoutSuite
      titolo="Suite Dante"
      sottotitolo={t(locale, "Stile italiano", "Italian style")}
      descrizione={t(
        locale,
        "Ci troviamo nel cuore della città di Como, l'appartamento, di circa 80 mq è ammobiliato per rappresentare modernità e raffinatezza che caratterizza anche la città. È ideale per chi è alla ricerca di un alloggio moderno, riservato e completo di ogni comfort.",
        "Located in the heart of Como, this 80 sqm apartment is furnished to express the same modernity and refinement that define the city. It is ideal for guests looking for modern, private accommodation with every comfort.",
      )}
      dettagliTitolo={t(locale, "Cura nei dettagli", "Attention to detail")}
      dettagliTesto={t(
        locale,
        "Suite curata in ogni minimo dettaglio. Due camere, fino a 6 posti letto, in pieno centro e con vista lago. Facilmente raggiungibile a piedi, perdetevi nelle vie del centro storico tra negozi e monumenti che caratterizzano la città.",
        "A suite refined in every detail. Two bedrooms, up to 6 sleeping places, right in the city center with lake view. Easy to reach on foot, and perfect for exploring historic streets, shops, and landmarks.",
      )}
      heroSrc={images.suiteDanteHero}
      gallery={images.suiteDanteGallery}
      altHero="Suite Dante - Como Lake Suites"
      suitePriceId="suite-dante"
    />
  );
}
