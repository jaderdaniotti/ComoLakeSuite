import type { Metadata } from "next";
import { cookies } from "next/headers";
import LayoutSuite from "@/src/components/LayoutSuite";
import images from "@/src/images";
import { buildPageMetadata } from "@/src/lib/seo";
import { getServerLocale, t } from "@/src/lib/i18n";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Suite Cavour - Como Lake Suites",
    description:
      "Suite Cavour nel centro storico di Como. Appartamento 65mq con grande balcone e vista sul Lago. Perfetta per 2 o 4 persone. Parcheggio, pulizie e colazione inclusi.",
    pathname: "/le-suites/suite-cavour",
    keywords: [
      "Suite Cavour Como",
      "suite con balcone vista lago Como",
      "alloggio centro storico Como",
    ],
  }),
};

export default async function SuiteCavourPage() {
  const locale = getServerLocale(await cookies());
  return (
    <LayoutSuite
      titolo="Suite Cavour"
      sottotitolo={t(locale, "Una camera con vista", "A room with a view")}
      descrizione={t(
        locale,
        "La vista dal terrazzo toglie il fiato: lo sguardo si perde all'orizzonte grazie allo splendido Lago di Como. Ci troviamo nel centro storico di Como, all'interno di un meraviglioso appartamento di 65mq, accogliente, caldo e signorile.",
        "The terrace view is breathtaking: your gaze drifts to the horizon over stunning Lake Como. We are in Como's historic center, inside a wonderful 65 sqm apartment, welcoming, warm, and elegant.",
      )}
      dettagliTitolo={t(locale, "Eleganza & Calore", "Elegance & Warmth")}
      dettagliTesto={t(
        locale,
        "Suite dotata di ogni comfort. Ideale per chi è alla ricerca di un alloggio tranquillo e di prestigio. Dispone di 4 posti letto e di una master bedroom con vista sul lago. I bambini fino ad un anno alloggiano gratuitamente.",
        "A suite with every comfort. Ideal for guests looking for quiet and prestige accommodation. It features 4 sleeping places and a master bedroom with lake view. Children up to one year old stay free.",
      )}
      heroSrc={images.suiteCavourHero}
      gallery={images.suiteCavourGallery}
      altHero="Suite Cavour - Como Lake Suites"
      suitePriceId="suite-cavour"
    />
  );
}
