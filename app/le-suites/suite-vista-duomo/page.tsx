import type { Metadata } from "next";
import LayoutSuite from "@/src/components/LayoutSuite";
import images from "@/src/images";

export const metadata: Metadata = {
  title: "Suite Vista Duomo - Como Lake Suites",
  description:
    "Suite Vista Duomo: oasi di lusso e relax nel cuore di Como. Appartamento 65mq con vista sull'iconico centro storico.",
};

export default function SuiteVistaDuomoPage() {
  return (
    <LayoutSuite
      titolo="Suite Vista Duomo"
      sottotitolo="Stile e modernità"
      descrizione="La Suite Vista Duomo è una vera e propria oasi di lusso e relax nel cuore della città. Un appartamento di 65mq dove lusso, comfort e bellezza si uniscono a una vista sull'iconico centro storico di Como."
      dettagliTitolo="Lusso nel cuore di Como"
      dettagliTesto="Un appartamento di pregio nel cuore della città, con ogni comfort e una vista unica sul centro storico e sul Duomo di Como."
      heroSrc={images.suiteVistaDuomoHero}
      gallery={images.suiteVistaDuomoGallery}
      altHero="Suite Vista Duomo - Como Lake Suites"
    />
  );
}
