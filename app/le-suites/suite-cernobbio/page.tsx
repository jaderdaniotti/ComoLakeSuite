import type { Metadata } from "next";
import { cookies } from "next/headers";
import LayoutSuite from "@/src/components/LayoutSuite";
import images from "@/src/images";
import { buildPageMetadata } from "@/src/lib/seo";
import { getServerLocale, t } from "@/src/lib/i18n";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Suite Cernobbio - Como Lake Suites",
    description:
      "Suite Cernobbio sulle rive del Lago di Como. Circa 60 mq, 4 posti letto. Comodità ed eleganza, passeggiate sul lungolago e gite in barca.",
    pathname: "/le-suites/suite-cernobbio",
    keywords: [
      "Suite Cernobbio",
      "alloggio Cernobbio Lago di Como",
      "suite vicino lungolago Cernobbio",
    ],
  }),
};

export default async function SuiteCernobbioPage() {
  const locale = getServerLocale(await cookies());
  return (
    <LayoutSuite
      titolo="Suite Cernobbio"
      sottotitolo={t(locale, "Comoda ed elegante", "Comfortable and elegant")}
      descrizione={t(
        locale,
        "Ci troviamo sulle rive del lago di Como, nella suggestiva località di Cernobbio, l'appartamento, di circa 60 mq è curato in ogni dettaglio e rappresenta comodità ed eleganza senza tempo. È ideale per chi è alla ricerca di un alloggio suggestivo e completo di ogni comfort.",
        "Located on the shores of Lake Como, in the charming town of Cernobbio, this 60 sqm apartment is refined in every detail and offers timeless comfort and elegance. It is ideal for guests looking for charming accommodation with every comfort.",
      )}
      dettagliTitolo={t(locale, "Cura nei dettagli", "Attention to detail")}
      dettagliTesto={t(
        locale,
        "Ci troviamo sulle rive del lago di Como, nella suggestiva località di Cernobbio, l’appartamento, di circa 60 mq è curato in ogni dettaglio e rappresenta comodità ed eleganza senza tempo.\nÈ ideale per chi è alla ricerca di un alloggio suggestivo e completo di ogni comfort.",
        "Located on the shores of Lake Como, in the charming town of Cernobbio, this 60 sqm apartment is refined in every detail and expresses timeless comfort and elegance.\nIt is ideal for guests looking for charming accommodation with every comfort.",
      )}
      heroSrc={images.suiteCernobbioHero}
      gallery={images.suiteCernobbioGallery}
      altHero="Suite Cernobbio - Como Lake Suites"
      suitePriceId="suite-cernobbio"
    />
  );
}
