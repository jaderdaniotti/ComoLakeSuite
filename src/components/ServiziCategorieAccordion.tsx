"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  ChefHat,
  Sofa,
  Bath,
  Sun,
  Building2,
  Sparkles,
  Coffee,
  Mountain,
  Gamepad2,
  Bubbles,
  Package,
  CircleParking,
  Wifi,
  Tv,
  Car,
  Key,
  MapPin,
  Lock,
  Languages,
  Flame,
} from "lucide-react";
import ServicesOneRowCarousel from "@/src/components/ServicesOneRowCarousel";

const categoryHeaderIcons: Record<string, LucideIcon> = {
  cucina: ChefHat,
  camera: Sofa,
  bagno: Bath,
  soggiorno: Sofa,
  esterni: Sun,
  comuni: Building2,
  benessere: Sparkles,
  ristorazione: Coffee,
  attivita: Mountain,
  intrattenimento: Gamepad2,
  pulizie: Bubbles,
  negozi: Package,
  parcheggio: CircleParking,
  internet: Wifi,
  media: Tv,
  accessibilita: Building2,
  trasporti: Car,
  accoglienza: Key,
  vista: MapPin,
  edificio: Building2,
  sicurezza: Lock,
  lingue: Languages,
  varie: Flame,
};

export type ServizioCategoriaItem = {
  id: string;
  label: string;
  items: { iconKey: string; titolo: string }[];
};

type Props = {
  categorie: ServizioCategoriaItem[];
};

export default function ServiziCategorieAccordion({ categorie }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="divide-y divide-grigio/60 border-y border-grigio/60">
      {categorie.map((cat) => {
        const IconCat = categoryHeaderIcons[cat.id] ?? Sparkles;
        const isOpen = openId === cat.id;
        const panelId = `servizi-panel-${cat.id}`;
        const buttonId = `servizi-trigger-${cat.id}`;

        return (
          <div key={cat.id}>
            <button
              id={buttonId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(cat.id)}
              className="flex w-full items-center justify-between gap-4 py-10 text-left px-3 transition-colors hover:bg-grigioscuro focus:outline-none focus-visible:ring-2 focus-visible:ring-blu focus-visible:ring-offset-2"
            >
              <div className="flex min-w-0 flex-1 flex-col items-center gap-3 sm:flex-row sm:gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center text-bluchiaro">
                  <IconCat className="size-full" strokeWidth={1.4} />
                </span>
                <span className="text-xl font-medium text-bluchiaro">{cat.label}</span>
              </div>
              <ChevronDown
                className={`size-6 shrink-0 text-scuro/70 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
                aria-hidden
              />
            </button>

            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="relative pb-10 pt-2 px-3"
              >
                <ServicesOneRowCarousel
                  items={cat.items}
                  cols={1}
                  chunkSize={1}
                  visibilityClass="sm:hidden"
                />
                <ServicesOneRowCarousel
                  items={cat.items}
                  cols={2}
                  chunkSize={2}
                  visibilityClass="hidden sm:block lg:hidden"
                />
                <ServicesOneRowCarousel
                  items={cat.items}
                  cols={3}
                  chunkSize={3}
                  visibilityClass="hidden lg:block xl:hidden"
                />
                <ServicesOneRowCarousel
                  items={cat.items}
                  cols={4}
                  chunkSize={4}
                  visibilityClass="hidden xl:block"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
