import type { Metadata } from "next";
import { cookies } from "next/headers";
import LayoutSuite from "@/src/components/LayoutSuite";
import images from "@/src/images";
import { buildPageMetadata } from "@/src/lib/seo";
import { getServerLocale, t } from "@/src/lib/i18n";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Suite Vista Duomo - Como Lake Suites",
    description:
      "Suite Vista Duomo: oasi di lusso e relax nel cuore di Como. Appartamento 65mq con vista sull'iconico centro storico.",
    pathname: "/le-suites/suite-vista-duomo",
    keywords: [
      "Suite Vista Duomo Como",
      "suite con vista duomo Como",
      "alloggio lusso centro Como",
    ],
  }),
};

export default async function SuiteVistaDuomoPage() {
  const locale = getServerLocale(await cookies());
  return (
    <LayoutSuite
      titolo="Suite Vista Duomo"
      sottotitolo={t(locale, "Stile e modernità", "Style and modernity")}
      descrizione={t(
        locale,
        "La Suite Vista Duomo è una vera e propria oasi di lusso e relax nel cuore della città. Un appartamento di 65mq dove lusso, comfort e bellezza si uniscono a una vista sull'iconico centro storico di Como.",
        "Suite Vista Duomo is a true oasis of luxury and relaxation in the heart of the city. A 65 sqm apartment where luxury, comfort, and beauty meet a unique view over Como's iconic historic center.",
      )}
      dettagliTitolo={t(locale, "Lusso nel cuore di Como", "Luxury in the heart of Como")}
      dettagliTesto={t(
        locale,
        "Un appartamento di pregio nel cuore della città, con ogni comfort e una vista unica sul centro storico e sul Duomo di Como.",
        "A prestigious apartment in the city center, with every comfort and a unique view over Como's historic center and cathedral.",
      )}
      heroSrc={images.suiteVistaDuomoHero}
      gallery={images.suiteVistaDuomoGallery}
      altHero="Suite Vista Duomo - Como Lake Suites"
      suitePriceId="suite-vista-duomo"
    />
  );
}
