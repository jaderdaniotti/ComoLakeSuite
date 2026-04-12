import type { StaticImageData } from "next/image";
import images from "@/src/images";

/** Immagine “copertina” per suite (prenota, conferma, ecc.) */
export const SUITE_HERO: Record<string, StaticImageData> = {
  "suite-cavour": images.suiteCavourHero,
  "suite-volta": images.suiteVoltaHero,
  "suite-vista-duomo": images.suiteVistaDuomoHero,
  "suite-dante": images.suiteDanteHero,
  "suite-cernobbio": images.suiteCernobbioHero,
  "suite-como-sole": images.suiteComoSoleHero,
};

export function suiteHeroImage(suiteId: string): StaticImageData {
  return SUITE_HERO[suiteId] ?? images.fotocomo;
}
