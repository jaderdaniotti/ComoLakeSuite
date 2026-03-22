"use client";

import { useMemo, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Sparkles,
  Car,
  ShieldCheck,
  CircleParking,
  Wifi,
  Sun,
  Coffee,
  EggFried,
  Bath,
  Thermometer,
  Tv,
  UtensilsCrossed,
  Building2,
  Key,
  Languages,
  Lock,
  Wind,
  ChefHat,
  Package,
  Sofa,
  Scissors,
  Bike,
  Mountain,
  Flame,
  Star,
  Baby,
  Palmtree,
  Waves,
  Dumbbell,
  Gamepad2,
} from "lucide-react";

type ServizioItem = { iconKey: string; titolo: string };

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Car,
  ShieldCheck,
  CircleParking,
  Wifi,
  Sun,
  Coffee,
  EggFried,
  Bath,
  Thermometer,
  Tv,
  UtensilsCrossed,
  Building2,
  Key,
  Languages,
  Lock,
  Wind,
  ChefHat,
  Package,
  Sofa,
  Scissors,
  Bike,
  Mountain,
  Flame,
  Star,
  Baby,
  Palmtree,
  Waves,
  Dumbbell,
  Gamepad2,
};

function chunkArray<T>(arr: T[], size: number): T[][] {
  if (size <= 0) return [];
  const pages: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    pages.push(arr.slice(i, i + size));
  }
  return pages;
}

export default function ServicesOneRowCarousel({
  items,
  cols,
  chunkSize,
  visibilityClass,
}: {
  items: ServizioItem[];
  cols: 1 | 2 | 3 | 4;
  chunkSize: number;
  visibilityClass: string;
}) {
  const pages = useMemo(() => chunkArray(items, chunkSize), [items, chunkSize]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activePage, setActivePage] = useState(0);

  const gridColsClassByCols: Record<typeof cols, string> = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  };

  const scrollToPage = (index: number) => {
    const el = containerRef.current;
    if (!el) return;
    const width = el.clientWidth;
    el.scrollTo({ left: width * index, behavior: "smooth" });
  };

  const onScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const width = el.clientWidth;
    if (width <= 0) return;
    const next = Math.round(el.scrollLeft / width);
    if (next !== activePage) setActivePage(next);
  };

  if (pages.length === 0) return null;

  const prevDisabled = pages.length <= 1;
  const prevPageIndex = activePage === 0 ? pages.length - 1 : activePage - 1;
  const nextPageIndex =
    activePage === pages.length - 1 ? 0 : activePage + 1;

  return (
    <div className={`relative ${visibilityClass}`}>
      <div
        ref={containerRef}
        className="overflow-x-auto scroll-smooth snap-x snap-mandatory"
        onScroll={onScroll}
      >
        <div className="flex">
          {pages.map((pageItems, pageIndex) => (
            <div
              key={pageIndex}
              className="min-w-full snap-start px-0"
              aria-label={`Servizi pagina ${pageIndex + 1}`}
            >
              <ul
                className={`grid ${gridColsClassByCols[cols]} gap-x-6 gap-y-3 w-full`}
              >
                {pageItems.map((s, i) => {
                  const IconS = iconMap[s.iconKey];
                  const RenderIcon = IconS ?? Sparkles;

                  return (
                    <li
                      key={`${s.titolo}-${pageIndex}-${i}`}
                      className="flex flex-col justify-center bg-grigio px-2 py-12 items-center gap-3 text-bluchiaro/90"
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center text-blu">
                        <RenderIcon className="size-full" strokeWidth={1} />
                      </span>
                      <span className="font-normal text-center text-lg text-bluchiaro">
                        {s.titolo}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {pages.length > 1 && (
        <div className="pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between px-2">
          <button
            type="button"
            disabled={prevDisabled}
            onClick={() => scrollToPage(prevPageIndex)}
            className="btn btn-circle btn-sm pointer-events-auto"
            aria-label="Servizi precedenti"
          >
            ❮
          </button>
          <button
            type="button"
            disabled={prevDisabled}
            onClick={() => scrollToPage(nextPageIndex)}
            className="btn btn-circle btn-sm pointer-events-auto"
            aria-label="Servizi successivi"
          >
            ❯
          </button>
        </div>
      )}
    </div>
  );
}

