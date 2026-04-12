import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { cookies } from "next/headers";
import {
  CircleParking,
  Wifi,
  Sun,
  Bubbles,
  ChefHat,
  Shirt,
  Thermometer,
  EggFried,
} from "lucide-react";
import SuiteCard from "@/src/components/SuiteCard";
import HeroCarousel from "@/src/components/HeroCarousel";
import HomeMapSection from "@/src/components/HomeMapSection";
import images from "@/src/images";
import { getServerLocale, t } from "@/src/lib/i18n";

const mapThumbnailSrcs = [
  (images.thumbVolta as { src: string }).src,
  (images.thumbDante as { src: string }).src,
  (images.thumbVistaDuomo as { src: string }).src,
  (images.thumbCernobbio as { src: string }).src,
];

const suiteCards = [
  {
    titolo: "Suite Cavour",
    sottotitolo: "Una camera con vista",
    descrizione:
      "Minimal ed elegante appartamento con 4 posti letto e una vista da lasciare incantati.",
    href: "/le-suites/suite-cavour",
    src: images.thumbCavour,
    alt: "Suite Cavour",
  },
  {
    titolo: "Suite Volta",
    sottotitolo: "Moderna e raffinata",
    descrizione:
      "Suite curata in ogni minimo dettaglio. Due camere, fino a 6 posti letto, a due passi dal centro città e con vista lago.",
    href: "/le-suites/suite-volta",
    src: images.thumbVolta,
    alt: "Suite Volta",
  },
  {
    titolo: "Suite Duomo",
    sottotitolo: "Stile e modernità",
    descrizione:
      "Oasi di lusso e relax nel cuore della città con vista sull'iconico centro storico di Como.",
    href: "/le-suites/suite-vista-duomo",
    src: images.thumbVistaDuomo,
    alt: "Suite Duomo",
  },
  {
    titolo: "Suite Cernobbio",
    sottotitolo: "Una camera con vista",
    descrizione:
      "Alloggio in una delle località più suggestive del lago di Como per un soggiorno da sogno.",
    href: "/le-suites/suite-cernobbio",
    src: images.thumbCernobbio,
    alt: "Suite Cernobbio",
  },
  {
    titolo: "Suite Dante",
    sottotitolo: "Una camera con vista",
    descrizione:
      "Suite curata in ogni minimo dettaglio per chi cerca un alloggio moderno e riservato.",
    href: "/le-suites/suite-dante",
    src: images.thumbDante,
    alt: "Suite Dante",
  },
  {
    titolo: "Suite Como Sole",
    sottotitolo: "Una camera con vista",
    descrizione:
      "Suite in uno dei principali quartieri di Como per offrire comfort e relax.",
    href: "/le-suites/suite-como-sole",
    src: images.thumbComoSole,
    alt: "Suite Como Sole",
  },
];

const serviziHome = [
  {
    icon: CircleParking,
    titolo: "Parcheggio",
    testo: "Parcheggio custodito adiacente alle suites.",
  },
  {
    icon: Wifi,
    titolo: "Free Wi-fi",
    testo: "Connessione a internet gratuita in entrambe le suites.",
  },
  {
    icon: Sun,
    titolo: "Terrazza vista lago",
    testo: "Il terrazzo affaccia sullo splendido paesaggio del Lago di Como.",
  },
  {
    icon: Bubbles,
    titolo: "Pulizie ogni 2 giorni",
    testo: "Servizio di pulizia incluso per gli ospiti.",
  },
  {
    icon: EggFried,
    titolo: "Colazione",
    testo: "Colazione italiana e internazionale a buffet.",
  },
  {
    icon: ChefHat,
    titolo: "Cucina attrezzata",
    testo: "Cucina completa di elettrodomestici e ogni comfort.",
  },
  {
    icon: Shirt,
    titolo: "Biancheria per la casa",
    testo:
      "Biancheria completa sia per le camere, sia per il bagno e kit di cortesia incluso.",
  },
  {
    icon: Thermometer,
    titolo: "Climatizzatore",
    testo:
      "Climatizzazione in tutti gli ambienti per tutte le stagioni (caldo, freddo).",
  },
];

const esperienze = [
  {
    src: images.design,
    titolo: "Design italiano",
    testo:
      "Un ambiente di classe, dove la tradizione del design italiano rende lo spazio caldo e accogliente.",
  },
  {
    src: images.biancheria,
    titolo: "Biancheria pregiata",
    testo: "Biancheria di alta qualità, pensata per il benessere personale.",
  },
  {
    src: images.comfort,
    titolo: "Comfort superior",
    testo:
      "Un alloggio signorile e spazioso, arredato con cura e dotato dei più moderni comfort.",
  },
  {
    src: images.dettagli,
    titolo: "Attenzione ai dettagli",
    testo:
      "La cura di ogni dettaglio crea un perfetto connubio tra design e comodità.",
  },
  {
    src: images.asciugamani,
    titolo: "Asciugamani personalizzati",
    testo: "La cura e l'attenzione sono presenti in ogni ambiente e dettaglio.",
  },
  {
    src: images.sapone,
    titolo: "Sapone artigianale",
    testo: "Saponi artigianali a base di prodotti naturali ed oli essenziali.",
  },
  {
    src: images.cucina,
    titolo: "Cucina attrezzata",
    testo:
      "La cucina ha uno spazio dedicato che la rende bella, pratica e funzionale.",
  },
  {
    src: images.caffe,
    titolo: "Caffè italiano",
    testo: "Lo stile italiano è rappresentato anche dal caffè.",
  },
];

function chunkArray<T>(arr: T[], size: number): T[][] {
  if (size <= 0) return [];
  const pages: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    pages.push(arr.slice(i, i + size));
  }
  return pages;
}

export default async function HomePage() {
  const locale = getServerLocale(await cookies());
  const ctaVisitLabel = locale === "en" ? "Visit" : "Visita";
  const suiteCtaLabel =
    locale === "en" ? "Read more and book" : "Leggi tutto e prenota";

  const localizedSuiteCards = suiteCards.map((card) => ({
    ...card,
    sottotitolo: t(
      locale,
      card.sottotitolo,
      {
        "Una camera con vista": "A room with a view",
        "Moderna e raffinata": "Modern and refined",
        "Stile e modernità": "Style and modernity",
      }[card.sottotitolo] ?? card.sottotitolo,
    ),
    descrizione: t(
      locale,
      card.descrizione,
      {
        "Minimal ed elegante appartamento con 4 posti letto e una vista da lasciare incantati.":
          "A minimal and elegant apartment with 4 beds and a breathtaking view.",
        "Suite curata in ogni minimo dettaglio. Due camere, fino a 6 posti letto, a due passi dal centro città e con vista lago.":
          "A suite designed down to every detail. Two bedrooms, up to 6 guests, just steps from the city center with a lake view.",
        "Oasi di lusso e relax nel cuore della città con vista sull'iconico centro storico di Como.":
          "An oasis of luxury and relaxation in the heart of the city, overlooking Como's iconic historic center.",
        "Alloggio in una delle località più suggestive del lago di Como per un soggiorno da sogno.":
          "Accommodation in one of Lake Como's most charming locations for a dream stay.",
        "Suite curata in ogni minimo dettaglio per chi cerca un alloggio moderno e riservato.":
          "A suite refined in every detail for guests looking for modern and private accommodation.",
        "Suite in uno dei principali quartieri di Como per offrire comfort e relax.":
          "A suite in one of Como's main neighborhoods, designed for comfort and relaxation.",
      }[card.descrizione] ?? card.descrizione,
    ),
  }));

  const localizedServiziHome = serviziHome.map((item) => ({
    ...item,
    titolo: t(
      locale,
      item.titolo,
      {
        Parcheggio: "Parking",
        "Free Wi-fi": "Free Wi-Fi",
        "Terrazza vista lago": "Lake-view terrace",
        "Pulizie ogni 2 giorni": "Cleaning every 2 days",
        Colazione: "Breakfast",
        "Cucina attrezzata": "Equipped kitchen",
        "Biancheria per la casa": "House linen",
        Climatizzatore: "Air conditioning",
      }[item.titolo] ?? item.titolo,
    ),
    testo: t(
      locale,
      item.testo,
      {
        "Parcheggio custodito adiacente alle suites.":
          "Secure parking adjacent to the suites.",
        "Connessione a internet gratuita in entrambe le suites.":
          "Free internet connection in all suites.",
        "Il terrazzo affaccia sullo splendido paesaggio del Lago di Como.":
          "The terrace overlooks the stunning Lake Como scenery.",
        "Servizio di pulizia incluso per gli ospiti.":
          "Cleaning service included for guests.",
        "Colazione italiana e internazionale a buffet.":
          "Italian and international buffet breakfast.",
        "Cucina completa di elettrodomestici e ogni comfort.":
          "Fully equipped kitchen with appliances and every comfort.",
        "Biancheria completa sia per le camere, sia per il bagno e kit di cortesia incluso.":
          "Complete linen for bedrooms and bathrooms, with courtesy kit included.",
        "Climatizzazione in tutti gli ambienti per tutte le stagioni (caldo, freddo).":
          "Air conditioning in all rooms for every season (heating and cooling).",
      }[item.testo] ?? item.testo,
    ),
  }));

  const localizedEsperienze = esperienze.map((item) => ({
    ...item,
    titolo: t(
      locale,
      item.titolo,
      {
        "Design italiano": "Italian design",
        "Biancheria pregiata": "Premium linen",
        "Comfort superior": "Superior comfort",
        "Attenzione ai dettagli": "Attention to detail",
        "Asciugamani personalizzati": "Personalized towels",
        "Sapone artigianale": "Artisanal soap",
        "Cucina attrezzata": "Equipped kitchen",
        "Caffè italiano": "Italian coffee",
      }[item.titolo] ?? item.titolo,
    ),
    testo: t(
      locale,
      item.testo,
      {
        "Un ambiente di classe, dove la tradizione del design italiano rende lo spazio caldo e accogliente.":
          "A classy environment where Italian design tradition makes the space warm and welcoming.",
        "Biancheria di alta qualità, pensata per il benessere personale.":
          "High-quality linen designed for personal wellbeing.",
        "Un alloggio signorile e spazioso, arredato con cura e dotato dei più moderni comfort.":
          "A refined and spacious accommodation, carefully furnished and equipped with modern comforts.",
        "La cura di ogni dettaglio crea un perfetto connubio tra design e comodità.":
          "Attention to every detail creates a perfect blend of design and comfort.",
        "La cura e l'attenzione sono presenti in ogni ambiente e dettaglio.":
          "Care and attention are present in every room and detail.",
        "Saponi artigianali a base di prodotti naturali ed oli essenziali.":
          "Artisanal soaps made with natural products and essential oils.",
        "La cucina ha uno spazio dedicato che la rende bella, pratica e funzionale.":
          "The kitchen has a dedicated area that makes it beautiful, practical, and functional.",
        "Lo stile italiano è rappresentato anche dal caffè.":
          "Italian style is also expressed through coffee.",
      }[item.testo] ?? item.testo,
    ),
  }));

  return (
    <>
      {/* Hero carosello suite */}
      <HeroCarousel
        slides={localizedSuiteCards}
        ctaLabel={ctaVisitLabel}
        previousLabel={t(locale, "Slide precedente", "Previous slide")}
        nextLabel={t(locale, "Slide successiva", "Next slide")}
        goToSlideLabelPrefix={t(locale, "Vai alla slide", "Go to slide")}
      />



      {/* Suite in evidenza (griglia 2x3) */}
      <section className="bg-grigioscuro z-9 pt-16 md:pt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mt-2 text-center text-3xl md:text-5xl text-blu font-light">
            {t(locale, "Le Suites", "Suites")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-scuro/80">
            {t(
              locale,
              "Scegli e vivi la tua vacanza in un'atmosfera unica.",
              "Choose your stay and enjoy your vacation in a unique atmosphere.",
            )}
          </p>
        </div>
        {/* Card a larghezza piena per lo sfondo bianco/grigio; padding solo nel contenuto (SuiteCard) */}
        <div className="mt-12 w-full pt-10">
          {localizedSuiteCards.map((suite, index) => (
            <SuiteCard
              key={suite.href}
              {...suite}
              indice={index}
              ctaLabel={suiteCtaLabel}
            />
          ))}
        </div>
      </section>
      {/* Servizi 8 icone */}
      <section className="bg-bianco py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mt-2 text-center text-3xl md:text-5xl text-blu font-light">
            {t(locale, "Servizi", "Services")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-scuro/80">
            {t(
              locale,
              "Tutto ciò che serve per un soggiorno indimenticabile.",
              "Everything you need for an unforgettable stay.",
            )}
          </p>
          <div className="mt-12 grid gap-8 grid-cols-2 lg:grid-cols-4">
            {localizedServiziHome.map((s) => (
              <div
                key={s.titolo}
                className="flex flex-col items-center text-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-chiaro text-bluchiaro">
                  <s.icon size={24} />
                </div>
                <h3 className="mt-4 font-medium text-bluchiaro text-sm">{s.titolo}</h3>
                <p className="mt-2 text-sm font-light text-scuro/80">
                  {s.testo}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center flex justify-center items-center">
            <Link
              href="/i-nostri-servizi"
              className="flex justify-center border border-blu gap-2 items-center mx-auto shadow-xl text-lg bg-blu text-bianco backdrop-blur-md lg:font-medium isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500  before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-6 py-2 overflow-hidden  group mt-3"
            >
              {ctaVisitLabel}
            </Link>
          </div>
        </div>
      </section>
      {/* Esperienza - 8 box */}
      <section className="bg-bianco py-16 md:py-24 ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium uppercase tracking-wide text-scuro/70">
            {t(locale, "Vivi", "Live")}
          </p>
          <h2 className="mt-2 text-center text-3xl md:text-5xl text-blu font-light">
            {t(locale, "L'esperienza", "The experience")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-scuro/80">
            {t(
              locale,
              "Immersione nell'atmosfera del Lago di Como con i nostri video.",
              "Immerse yourself in the Lake Como atmosphere with our videos.",
            )}
          </p>
          <div className="mt-12">
            {/* Carosello "custom" via scroll orizzontale + snap.
                Telefono: 2 esperienze in 1 riga.
                sm: 4 esperienze per pagina (2 colonne -> 2 righe).
                lg+: 8 esperienze per pagina (4 colonne -> 2 righe). */}
            {localizedEsperienze.length > 0 && (
              <>
                <div className="sm:hidden relative">
                  <div
                    id="exp-carousel-xs"
                    data-exp-carousel
                    className="overflow-x-auto snap-x snap-mandatory touch-pan-x"
                  >
                    <div className="flex">
                      {chunkArray(localizedEsperienze, 1).map((pageItems, pageIndex) => (
                        <div
                          key={pageIndex}
                          className="exp-page min-w-full snap-start px-0"
                        >
                          <div className="grid gap-6 grid-cols-1 justify-center items-start">
                            {pageItems.map((e) => (
                              <div
                                key={e.titolo}
                                className="mx-auto flex w-full max-w-xs flex-col"
                              >
                                <div className="relative w-full overflow-hidden">
                                  <div
                                    className="relative w-full overflow-hidden"
                                    style={{ aspectRatio: "3/4" }}
                                  >
                                    <Image
                                      src={e.src}
                                      alt={e.titolo}
                                      fill
                                      className="object-cover"
                                      sizes="(min-width: 1024px) 20vw, (min-width: 640px) 40vw, 80vw"
                                    />
                                  </div>
                                </div>
                                <h3 className="mt-4 text-2xl font-normal uppercase tracking-wide text-bluchiaro">
                                  {e.titolo}
                                </h3>
                                <p className="mt-2 text-sm font-light text-scuro/90">
                                  {e.testo}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {chunkArray(localizedEsperienze, 2).length > 1 && (
                    <>
                      <button
                        type="button"
                        data-exp-target="exp-carousel-xs"
                        data-exp-dir="prev"
                        className="btn btn-circle btn-sm pointer-events-auto absolute left-2 top-1/2 -translate-y-1/2"
                        aria-label={t(locale, "Esperienze precedenti", "Previous experiences")}
                      >
                        ❮
                      </button>
                      <button
                        type="button"
                        data-exp-target="exp-carousel-xs"
                        data-exp-dir="next"
                        className="btn btn-circle btn-sm pointer-events-auto absolute right-2 top-1/2 -translate-y-1/2"
                        aria-label={t(locale, "Esperienze successive", "Next experiences")}
                      >
                        ❯
                      </button>
                    </>
                  )}
                </div>

                <div className="hidden sm:block lg:hidden relative">
                  <div
                    id="exp-carousel-sm"
                    data-exp-carousel
                    className="overflow-x-auto snap-x snap-mandatory touch-pan-x"
                  >
                    <div className="flex">
                      {chunkArray(localizedEsperienze, 4).map((pageItems, pageIndex) => (
                        <div
                          key={pageIndex}
                          className="exp-page min-w-full snap-start px-0"
                        >
                          <div className="grid gap-10 grid-cols-2 justify-center items-start">
                            {pageItems.map((e) => (
                              <div
                                key={e.titolo}
                                className="mx-auto flex w-full max-w-xs flex-col"
                              >
                                <div className="relative w-full overflow-hidden">
                                  <div
                                    className="relative w-full overflow-hidden"
                                    style={{ aspectRatio: "3/4" }}
                                  >
                                    <Image
                                      src={e.src}
                                      alt={e.titolo}
                                      fill
                                      className="object-cover"
                                      sizes="(min-width: 1024px) 20vw, (min-width: 640px) 40vw, 80vw"
                                    />
                                  </div>
                                </div>
                                <h3 className="mt-4 text-2xl font-normal uppercase tracking-wide text-scuro">
                                  {e.titolo}
                                </h3>
                                <p className="mt-2 text-sm font-light text-scuro/90">
                                  {e.testo}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {chunkArray(localizedEsperienze, 4).length > 1 && (
                    <>
                      <button
                        type="button"
                        data-exp-target="exp-carousel-sm"
                        data-exp-dir="prev"
                        className="btn btn-circle btn-sm pointer-events-auto absolute left-2 top-1/2 -translate-y-1/2"
                        aria-label={t(locale, "Esperienze precedenti", "Previous experiences")}
                      >
                        ❮
                      </button>
                      <button
                        type="button"
                        data-exp-target="exp-carousel-sm"
                        data-exp-dir="next"
                        className="btn btn-circle btn-sm pointer-events-auto absolute right-2 top-1/2 -translate-y-1/2"
                        aria-label={t(locale, "Esperienze successive", "Next experiences")}
                      >
                        ❯
                      </button>
                    </>
                  )}
                </div>

                <div className="hidden lg:block relative">
                  <div
                    id="exp-carousel-lg"
                    data-exp-carousel
                    className="overflow-x-auto snap-x snap-mandatory touch-pan-x"
                  >
                    <div className="flex">
                      {chunkArray(localizedEsperienze, 8).map((pageItems, pageIndex) => (
                        <div
                          key={pageIndex}
                          className="exp-page min-w-full snap-start px-0"
                        >
                          <div className="grid gap-10 grid-cols-4 justify-center items-start">
                            {pageItems.map((e) => (
                              <div
                                key={e.titolo}
                                className="mx-auto flex w-full max-w-xs flex-col"
                              >
                                <div className="relative w-full overflow-hidden">
                                  <div
                                    className="relative w-full overflow-hidden"
                                    style={{ aspectRatio: "3/4" }}
                                  >
                                    <Image
                                      src={e.src}
                                      alt={e.titolo}
                                      fill
                                      className="object-cover"
                                      sizes="(min-width: 1024px) 20vw, (min-width: 640px) 40vw, 80vw"
                                    />
                                  </div>
                                </div>
                                <h3 className="mt-4 text-2xl font-normal uppercase tracking-wide text-scuro">
                                  {e.titolo}
                                </h3>
                                <p className="mt-2 text-sm font-light text-scuro/90">
                                  {e.testo}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {chunkArray(localizedEsperienze, 8).length > 1 && (
                    <>
                      <button
                        type="button"
                        data-exp-target="exp-carousel-lg"
                        data-exp-dir="prev"
                        className="btn btn-circle btn-sm pointer-events-auto absolute left-2 top-1/2 -translate-y-1/2"
                        aria-label={t(locale, "Esperienze precedenti", "Previous experiences")}
                      >
                        ❮
                      </button>
                      <button
                        type="button"
                        data-exp-target="exp-carousel-lg"
                        data-exp-dir="next"
                        className="btn btn-circle btn-sm pointer-events-auto absolute right-2 top-1/2 -translate-y-1/2"
                        aria-label={t(locale, "Esperienze successive", "Next experiences")}
                      >
                        ❯
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          <Script id="exp-carousel-nav" strategy="afterInteractive">{`
            (function () {
              function setupCarousel(carouselEl) {
                if (!carouselEl || !carouselEl.id) return;
                var targetId = carouselEl.id;
                var pages = carouselEl.querySelectorAll('.exp-page');
                var pagesCount = pages ? pages.length : 0;
                if (!pagesCount || pagesCount <= 1) return;

                var btnPrev = document.querySelector('[data-exp-target="' + targetId + '"][data-exp-dir="prev"]');
                var btnNext = document.querySelector('[data-exp-target="' + targetId + '"][data-exp-dir="next"]');
                if (!btnPrev || !btnNext) return;

                function computeIndex() {
                  var w = carouselEl.clientWidth || 1;
                  return Math.max(0, Math.min(pagesCount - 1, Math.round(carouselEl.scrollLeft / w)));
                }

                var state = { index: computeIndex() };
                carouselEl.addEventListener('scroll', function () {
                  state.index = computeIndex();
                }, { passive: true });

                function scrollToIndex(idx) {
                  var w = carouselEl.clientWidth || 1;
                  carouselEl.scrollTo({ left: w * idx, behavior: 'smooth' });
                }

                btnPrev.addEventListener('click', function () {
                  var newIndex = state.index - 1;
                  if (newIndex < 0) newIndex = pagesCount - 1;
                  state.index = newIndex;
                  scrollToIndex(newIndex);
                });

                btnNext.addEventListener('click', function () {
                  var newIndex = state.index + 1;
                  if (newIndex > pagesCount - 1) newIndex = 0;
                  state.index = newIndex;
                  scrollToIndex(newIndex);
                });
              }

              var carousels = document.querySelectorAll('[data-exp-carousel]');
              carousels.forEach(setupCarousel);
            })();
          `}</Script>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-1 ">
            <div className="aspect-video w-full overflow-hidden rounded-lg bg-scuro">
              <iframe
                src="https://www.youtube.com/embed/NExwdwH2_eU?rel=0"
                title={t(locale, "Video esperienza Lago di Como 1", "Lake Como experience video 1")}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Host — mobile: card ~90%, foto ~68% con overlap sul grigio; sm+: riga classica */}
      <section className="bg-bianco py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-light text-blu md:text-5xl">
            {t(locale, "Host", "Hosts")}
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-16 max-sm:pt-12 xl:grid-cols-2 xl:gap-10">
            {/* Card Marilena */}
            <article className="relative mx-auto w-[90%] max-w-[420px] overflow-visible sm:mx-0 sm:mb-0 sm:flex sm:w-full sm:max-w-none sm:flex-row sm:items-stretch sm:gap-7 sm:bg-[#F2F2F2] sm:p-8">
              <div className="relative w-full bg-[#F2F2F2] sm:contents">
                <div className="absolute left-1/2 top-0 z-10 aspect-3/4 w-[68%] -translate-x-1/2 -translate-y-[22%] overflow-hidden sm:relative sm:left-auto sm:top-auto sm:aspect-3/4 sm:w-[42%] sm:max-w-none sm:shrink-0 sm:translate-x-0 sm:translate-y-0 sm:self-stretch">
                  <Image
                    src={images.marilena}
                    alt="Marilena - Host Como Lake Suites"
                    fill
                    sizes="(max-width: 639px) 62vw, 20vw"
                    className="object-cover object-center"
                  />
                </div>
                <div className="relative z-0 flex min-w-0 flex-col justify-center px-6 pb-8 pt-[70.7%] text-left sm:flex sm:flex-1 sm:px-0 sm:pb-0 sm:pt-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blu md:text-xs">
                    {t(locale, "Host", "Host")}
                  </p>
                  <h3 className="mt-0.5 text-3xl font-normal tracking-tight text-bluchiaro md:text-[2.125rem] md:leading-tight">
                    Marilena
                  </h3>
                  <p className="mt-5 text-[15px] font-normal leading-[1.5] text-blu md:text-base">
                    {t(
                      locale,
                      "Per me viaggiare è una vera esperienza: credo che le persone debbano godersi la propria vacanza circondate da ogni comfort, quindi potete chiedermi qualsiasi informazione e servizio di cui abbiate bisogno durante il vostro soggiorno.",
                      "For me, traveling is a true experience: I believe people should enjoy their vacation surrounded by comfort, so feel free to ask me for any information or service you need during your stay.",
                    )}
                  </p>
                </div>
              </div>
            </article>
            {/* Card Massimiliano */}
            <article className="relative mx-auto w-[90%] max-w-[420px] overflow-visible sm:mx-0 sm:mb-0 sm:flex sm:w-full sm:max-w-none sm:flex-row sm:items-stretch sm:gap-7 sm:bg-[#F2F2F2] sm:p-8">
              <div className="relative w-full bg-[#F2F2F2] sm:contents">
                <div className="absolute left-1/2 top-0 z-10 aspect-3/4 w-[68%] -translate-x-1/2 -translate-y-[22%] overflow-hidden sm:relative sm:left-auto sm:top-auto sm:aspect-3/4 sm:w-[42%] sm:max-w-none sm:shrink-0 sm:translate-x-0 sm:translate-y-0 sm:self-stretch">
                  <Image
                    src={images.massimiliano}
                    alt="Massimiliano - Host Como Lake Suites"
                    fill
                    sizes="(max-width: 639px) 62vw, 20vw"
                    className="object-cover object-center"
                  />
                </div>
                <div className="relative z-0 flex min-w-0 flex-col justify-center px-6 pb-8 pt-[70.7%] text-left sm:flex sm:flex-1 sm:px-0 sm:pb-0 sm:pt-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blu md:text-xs">
                    {t(locale, "Host", "Host")}
                  </p>
                  <h3 className="mt-0.5 text-3xl font-normal tracking-tight text-bluchiaro md:text-[2.125rem] md:leading-tight">
                    Massimiliano
                  </h3>
                  <p className="mt-5 text-[15px] font-normal leading-[1.5] text-blu md:text-base">
                    {t(
                      locale,
                      "Grazie alla mia esperienza pluriennale nel settore commerciale pongo la massima attenzione nella relazione con i clienti, il mio obiettivo è quello di farli sentire come se fossero a casa loro.",
                      "Thanks to my many years of commercial experience, I pay the utmost attention to guest relationships; my goal is to make everyone feel at home.",
                    )}
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Mappa Google – Dove siamo */}
      <section className="bg-bianco py-16 md:py-24 min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-2 text-center text-2xl font-semibold text-blu md:text-3xl">
            {t(locale, "Dove siamo", "Where we are")}
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-scuro/80">
            {t(
              locale,
              "Le nostre suite a Como e Cernobbio: Via Albertolli 22, Via Dante 25, Via Cinque Giornate 26, Via Giuseppe Garibaldi 15.",
              "Our suites in Como and Cernobbio: Via Albertolli 22, Via Dante 25, Via Cinque Giornate 26, Via Giuseppe Garibaldi 15.",
            )}
          </p>
          <HomeMapSection thumbnailSrcs={mapThumbnailSrcs} />
        </div>
      </section>
    </>
  );
}
