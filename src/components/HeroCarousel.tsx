"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { StaticImageData } from "next/image";

export type HeroSlide = {
  titolo: string;
  sottotitolo: string;
  descrizione: string;
  href: string;
  src: string | StaticImageData;
  alt: string;
};

const AUTOPLAY_MS = 7600;

type Props = {
  slides: HeroSlide[];
  ctaLabel?: string;
  previousLabel?: string;
  nextLabel?: string;
  goToSlideLabelPrefix?: string;
};

export default function HeroCarousel({
  slides,
  ctaLabel = "Visita",
  previousLabel = "Slide precedente",
  nextLabel = "Slide successiva",
  goToSlideLabelPrefix = "Vai alla slide",
}: Props) {
  const [index, setIndex] = useState(0);
  const total = slides.length;

  const goTo = useCallback(
    (i: number) => {
      setIndex(() => {
        let next = i;
        if (next >= total) next = 0;
        if (next < 0) next = total - 1;
        return next;
      });
    },
    [total],
  );

  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  useEffect(() => {
    const t = setInterval(() => goTo(index + 1), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [index, goTo]);

  if (total === 0) return null;

  return (
    <section className=" h-screen min-h-[400px] overflow-hidden ">
      {/* Immagini: tutte in stack, solo quella attiva visibile */}
      {slides.map((s, i) => (
        <div
          key={s.href}
          className="absolute inset-0 transition-opacity duration-700 ease-out"
          style={{ opacity: i === index ? 1 : 0, zIndex: i === index ? 1 : 0 }}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Overlay e contenuto */}
      <div
        className="absolute inset-0 bg-black/20 z-3"
        aria-hidden
      />
      {slides.map((s, i) =>
        i === index ? (
          <div
            key={s.href}
            className="absolute inset-0 z-3 flex flex-col items-center justify-end pb-16 pt-24 px-4 text-center text-bianco md:justify-center md:pb-24 opacità"
          >
            <p className="text-sm font-medium uppercase tracking-wide text-bianco/90">
              {s.sottotitolo}
            </p>
            <h1 className="mt-2 text-4xl font-extralight tracking-tight sm:text-5xl md:text-7xl">
              {s.titolo}
            </h1>
            <p className="mt-4 max-w-2xl text-lg md:text-2xl leading-tight tracking-tight text-bianco/90">
              {s.descrizione}
            </p>
            <Link
              href={s.href}
              className="flex justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-medium isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500  before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-6 py-2 overflow-hidden  group text-blu mt-3"
            >
              {ctaLabel}
            </Link>
          </div>
        ) : null,
      )}

      {/* Pulsanti prev/next */}
      <button
        type="button"
        onClick={prev}
        className="absolute left-2 top-1/2 z-4 -translate-y-1/2 rounded-full bg-bianco/20 p-2 text-bianco hover:bg-bianco/40 transition-colors md:left-4 "
        aria-label={previousLabel}
      >
        <ChevronLeft size={28} />
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-2 top-1/2 z-4 -translate-y-1/2 rounded-full bg-bianco/20 p-2 text-bianco hover:bg-bianco/40 transition-colors md:right-4"
        aria-label={nextLabel}
      >
        <ChevronRight size={28} />
      </button>

      {/* Indicatori (pallini) */}
      <div className="absolute bottom-6 left-1/2 z-4 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: i === index ? 24 : 10,
              backgroundColor:
                i === index ? "#FFFFFF" : "rgba(255,255,255,0.4)",
            }}
            aria-label={`${goToSlideLabelPrefix} ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
