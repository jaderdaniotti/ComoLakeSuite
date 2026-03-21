"use client";

import Image, { type StaticImageData } from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type Props = {
  titolo: string;
  sottotitolo: string;
  descrizione: string;
  dettagliTitolo: string;
  dettagliTesto: string;
  heroSrc: string | StaticImageData;
  gallery: (string | StaticImageData)[];
  altHero: string;
};

export default function LayoutSuite({
  titolo,
  sottotitolo,
  descrizione,
  dettagliTitolo,
  dettagliTesto,
  heroSrc,
  gallery,
  altHero,
}: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxLoading, setLightboxLoading] = useState(false);
  const [lightboxNavDir, setLightboxNavDir] = useState<"next" | "prev" | null>(
    null,
  );
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });

  const addMonths = (date: Date, amount: number) =>
    new Date(date.getFullYear(), date.getMonth() + amount, 1);

  const nextMonth = addMonths(currentMonth, 1);

  const formatDisplayDate = (date: Date | null) =>
    date
      ? date.toLocaleDateString("it-IT", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "Seleziona data";

  const getMonthMatrix = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay(); // 0 (dom) - 6 (sab)
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // In Italia la settimana parte da lunedì, quindi normalizziamo
    const offset = (firstDay + 6) % 7;

    const cells: (Date | null)[] = [];
    for (let i = 0; i < offset; i++) {
      cells.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      cells.push(new Date(year, month, day));
    }
    return cells;
  };

  const isSameDay = (a: Date | null, b: Date | null) =>
    !!a && !!b && a.toDateString() === b.toDateString();

  const isInRange = (day: Date) =>
    checkIn && checkOut && day > checkIn && day < checkOut;

  const handleDayClick = (day: Date) => {
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(day);
      setCheckOut(null);
      return;
    }

    if (day < checkIn) {
      setCheckIn(day);
      setCheckOut(null);
      return;
    }

    setCheckOut(day);
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    setLightboxLoading(false);
    setLightboxNavDir(null);
  }, []);

  const goLightboxPrev = useCallback(() => {
    if (lightboxIndex === null || gallery.length === 0) return;
    setLightboxLoading(true);
    setLightboxNavDir("prev");
    const prev = (lightboxIndex - 1 + gallery.length) % gallery.length;
    setLightboxIndex(prev);
    setActiveIndex(prev);
  }, [lightboxIndex, gallery.length]);

  const goLightboxNext = useCallback(() => {
    if (lightboxIndex === null || gallery.length === 0) return;
    setLightboxLoading(true);
    setLightboxNavDir("next");
    const next = (lightboxIndex + 1) % gallery.length;
    setLightboxIndex(next);
    setActiveIndex(next);
  }, [lightboxIndex, gallery.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goLightboxPrev();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goLightboxNext();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex, closeLightbox, goLightboxPrev, goLightboxNext]);

  return (
    <div className="bg-bianco">
      {/* hero */}
      <section className="relative md:min-h-screen min-h-[600px] bg-scuro">
        <Image
          src={heroSrc}
          alt={altHero}
          fill
          className="object-cover"
          priority
          sizes=""
        />
        <div className="absolute inset-0 flex flex-col justify-center bg-linear-to-t items-center from-scuro/80 to-transparent p-6 md:p-10">
          <p className="text-sm font-medium uppercase tracking-wide  text-bianco/70 ">
            {sottotitolo}
          </p>
          <h1 className="text-3xl font-extralight tracking-tighter text-bianco md:text-9xl">
            {titolo}
          </h1>
        </div>
      </section>

      {/* descrizione */}
      <section className="mx-auto  px-4 py-16 sm:px-6 lg:px-8 bg-grigio">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
          <p className="text-sm font-medium uppercase tracking-wide text-scuro/70">
            Stile italiano
          </p>
          <h2 className="mt-2 text-5xl font-normal text-blu text-center">
            {dettagliTitolo}
          </h2>
          <p className="mt-4 leading-relaxed max-w-2xl text-blu text-center">
            {dettagliTesto}
          </p>
        </div>
      </section>

      {/* immagini */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 border-t border-blu mt-6">
        <p className="text-4xl font-light uppercase tracking-wide text-center text-scuro/70">
          Immagini della suite
        </p>
        {gallery.length > 0 && (
          <section className="py-6 space-y-4">
            {/* Grid anteprime - click per lightbox a tutto schermo */}
            <div className="">
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 max-w-5xl mx-auto">
                {gallery.map((src, index) => (
                  <div className="flex flex-col text-center" key={index}>
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      setActiveIndex(index);
                      setLightboxNavDir(null);
                      setLightboxLoading(true);
                      setLightboxIndex(index);
                    }}
                    className={`relative aspect-4/3 overflow-hidden bg-grigio transition ${
                      index === activeIndex
                        ? "border-blu/70"
                        : "border-transparent hover:border-grigio/80"
                    }`}
                    aria-label={`Apri immagine ${index + 1}`}
                  >
                    <Image
                      src={src}
                      alt={`${titolo} - foto ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-all duration-300"
                      sizes="(max-width: 768px) 45vw, 18vw"
                    />
                  </button>
                  {/* <p className="text-sm text-scuro/70">{index + 1}</p> */}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Anteprima immagine ${lightboxIndex + 1} di ${gallery.length}`}
          onClick={closeLightbox}
        >
          <div
            className="relative w-full max-w-7xl h-[80vh] md:h-[88vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute right-2 top-2 z-20 btn btn-circle btn-sm bg-bianco/90 hover:bg-bianco"
              aria-label="Chiudi"
            >
              ✕
            </button>

            {gallery.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goLightboxPrev();
                  }}
                  className="absolute left-1 top-1/2 z-20 -translate-y-1/2 btn btn-circle btn-md border-0 bg-bianco/90 text-scuro shadow-md hover:bg-bianco md:left-2"
                  aria-label="Immagine precedente"
                >
                  <ChevronLeft className="h-6 w-6" strokeWidth={1.75} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goLightboxNext();
                  }}
                  className="absolute right-1 top-1/2 z-20 -translate-y-1/2 btn btn-circle btn-md border-0 bg-bianco/90 text-scuro shadow-md hover:bg-bianco md:right-2"
                  aria-label="Immagine successiva"
                >
                  <ChevronRight className="h-6 w-6" strokeWidth={1.75} />
                </button>
              </>
            )}

            <p className="absolute bottom-2 left-1/2 z-20 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs text-bianco/90">
              {lightboxIndex + 1} / {gallery.length}
            </p>

            <div className="relative w-full h-full rounded-lg overflow-hidden">
              {/* Overlay animato: attivo per tutta la durata del caricamento */}
              <div
                className={`pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 ${
                  lightboxLoading ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden
              >
                <div className="absolute inset-0 bg-scuro/25" />
                <div
                  className={`absolute inset-0 bg-linear-to-r from-transparent via-bianco/25 to-transparent ${
                    lightboxLoading ? "animate-lightbox-shimmer" : ""
                  }`}
                />
                <div className="absolute inset-x-0 top-0 h-0.5 overflow-hidden bg-bianco/10">
                  <div
                    className={`h-full w-2/5 rounded-full bg-bianco/70 shadow-[0_0_12px_rgba(255,255,255,0.6)] ${
                      lightboxLoading ? "animate-lightbox-bar" : ""
                    }`}
                  />
                </div>
              </div>

              <div
                key={lightboxIndex}
                className={`relative h-full w-full transition-[transform,opacity] duration-500 ease-out ${
                  lightboxLoading && lightboxNavDir === "next"
                    ? "translate-x-6 opacity-50 md:translate-x-8"
                    : lightboxLoading && lightboxNavDir === "prev"
                      ? "-translate-x-6 opacity-50 md:-translate-x-8"
                      : lightboxLoading && lightboxNavDir === null
                        ? "scale-[0.99] opacity-60"
                        : "translate-x-0 scale-100 opacity-100"
                }`}
              >
                <Image
                  src={gallery[lightboxIndex]}
                  alt={`${titolo} - immagine ${lightboxIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 95vw, 70vw"
                  priority
                  onLoadingComplete={() => setLightboxLoading(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* prenotazione */}
      <section className="bg-grigio/40">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-scuro/60">
              Verifica prezzi e disponibilità
            </p>
            <h2 className="text-2xl font-light text-scuro md:text-3xl">
              Prenota la tua permanenza in {titolo}
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
            {/* Form compatto */}
            <div className="space-y-4 rounded-2xl bg-bianco p-4 shadow-sm md:p-6">
              <p className="text-sm text-scuro/80">{descrizione}</p>

              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium uppercase tracking-wide text-scuro/60">
                    Arrivo
                  </label>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-lg border border-grigio/60 bg-bianco px-3 py-2.5 text-left text-sm text-scuro hover:border-blu focus:outline-none focus:ring-2 focus:ring-blu/40"
                  >
                    <span>{formatDisplayDate(checkIn)}</span>
                  </button>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium uppercase tracking-wide text-scuro/60">
                    Partenza
                  </label>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-lg border border-grigio/60 bg-bianco px-3 py-2.5 text-left text-sm text-scuro hover:border-blu focus:outline-none focus:ring-2 focus:ring-blu/40"
                  >
                    <span>{formatDisplayDate(checkOut)}</span>
                  </button>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium uppercase tracking-wide text-scuro/60">
                    Adulti
                  </label>
                  <select
                    className="w-full rounded-lg border border-grigio/60 bg-bianco px-3 py-2.5 text-sm text-scuro focus:outline-none focus:ring-2 focus:ring-blu/40"
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                  >
                    {[1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium uppercase tracking-wide text-scuro/60">
                    Bambini (max 1 anno)
                  </label>
                  <select
                    className="w-full rounded-lg border border-grigio/60 bg-bianco px-3 py-2.5 text-sm text-scuro focus:outline-none focus:ring-2 focus:ring-blu/40"
                    value={children}
                    onChange={(e) => setChildren(Number(e.target.value))}
                  >
                    {[0, 1, 2, 3].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="button"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-blu px-6 py-3 text-sm font-medium text-bianco shadow-sm transition hover:bg-blu/90 focus:outline-none focus:ring-2 focus:ring-blu/50"
              >
                Cerca disponibilità
                <ArrowRight size={16} />
              </button>

              <p className="text-xs text-scuro/60">
                In futuro questo calendario sarà sincronizzato con Airbnb,
                Booking.com ed Expedia.
              </p>
            </div>

            {/* Calendario doppio mese */}
            <div className="space-y-4 rounded-2xl bg-bianco p-4 shadow-sm md:p-6">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-grigio/60 text-scuro hover:border-blu hover:text-blu focus:outline-none focus:ring-2 focus:ring-blu/40"
                >
                  <ChevronLeft size={16} />
                </button>
                <p className="text-sm font-medium text-scuro">
                  {currentMonth.toLocaleDateString("it-IT", {
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  -{" "}
                  {nextMonth.toLocaleDateString("it-IT", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <button
                  type="button"
                  onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-grigio/60 text-scuro hover:border-blu hover:text-blu focus:outline-none focus:ring-2 focus:ring-blu/40"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {[currentMonth, nextMonth].map((monthDate) => {
                  const cells = getMonthMatrix(monthDate);
                  const monthLabel = monthDate.toLocaleDateString("it-IT", {
                    month: "long",
                    year: "numeric",
                  });

                  return (
                    <div key={monthLabel} className="space-y-2">
                      <p className="text-sm font-medium text-scuro">
                        {monthLabel}
                      </p>
                      <div className="grid grid-cols-7 gap-1 text-center text-[11px] uppercase tracking-wide text-scuro/60">
                        {["Lu", "Ma", "Me", "Gi", "Ve", "Sa", "Do"].map((d) => (
                          <span key={d}>{d}</span>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-1 text-sm">
                        {cells.map((day, idx) => {
                          if (!day) {
                            return <span key={idx} />;
                          }

                          const selectedStart = isSameDay(day, checkIn);
                          const selectedEnd = isSameDay(day, checkOut);
                          const inRange = isInRange(day);

                          const isSelected = selectedStart || selectedEnd;

                          return (
                            <button
                              key={day.toISOString()}
                              type="button"
                              onClick={() => handleDayClick(day)}
                              className={`flex h-9 w-9 items-center justify-center rounded-full text-xs transition ${
                                isSelected
                                  ? "bg-blu text-bianco"
                                  : inRange
                                    ? "bg-blu/10 text-scuro"
                                    : "text-scuro hover:bg-grigio/40"
                              }`}
                            >
                              {day.getDate()}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center gap-3 text-xs text-scuro/60">
                <span className="inline-flex h-3 w-3 rounded-full bg-blu" />
                <span>Data selezionata</span>
                <span className="inline-flex h-3 w-3 rounded-full bg-blu/10 border border-blu/40" />
                <span>Intervallo soggiorno</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
