"use client";

import Image, { type StaticImageData } from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

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
          <p className="mt-4 text-scuro/90 leading-relaxed max-w-2xl text-center">
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
          <section className="py-12 space-y-4">
            <div className="carousel w-full max-w-5xl mx-auto rounded-xl overflow-hidden bg-grigio flex justify-center items-center">
              <div className="carousel-item relative w-full">
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={gallery[activeIndex]}
                    alt={`${titolo} - immagine ${activeIndex + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 75vw"
                    priority={activeIndex === 0}
                  />
                </div>
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <button
                    type="button"
                    className="btn btn-circle"
                    onClick={() =>
                      setActiveIndex(
                        (prev) => (prev - 1 + gallery.length) % gallery.length,
                      )
                    }
                  >
                    ❮
                  </button>
                  <button
                    type="button"
                    className="btn btn-circle"
                    onClick={() =>
                      setActiveIndex((prev) => (prev + 1) % gallery.length)
                    }
                  >
                    ❯
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="flex gap-2 overflow-x-auto pb-2 max-w-5xl">
                {gallery.map((src, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`relative block h-16 w-24 sm:h-20 sm:w-28 lg:h-24 lg:w-32 shrink-0 rounded-md overflow-hidden border transition ${
                      index === activeIndex
                        ? "border-blu"
                        : "border-transparent hover:border-blu/70"
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`${titolo} - miniatura ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 128px, (min-width: 640px) 112px, 96px"
                    />
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}
      </section>

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
