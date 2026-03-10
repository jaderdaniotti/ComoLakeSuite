import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { ArrowRight } from "lucide-react";

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
  return (
    <div className="bg-bianco">
      <section className="relative h-screen min-h-[400px] bg-scuro">
        <Image
          src={heroSrc}
          alt={altHero}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 flex flex-col justify-center bg-gradient-to-t items-center from-scuro/80 to-transparent p-6 md:p-10">
          <h1 className="text-3xl font-light tracking-tight text-bianco md:text-9xl">{titolo}</h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-scuro/90 leading-relaxed">{descrizione}</p>
        <Link
          href="/contatti"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-scuro px-6 py-3 text-bianco font-medium hover:bg-scuro/90 transition-colors"
        >
          Prenota
          <ArrowRight size={18} />
        </Link>
      </section>

      {gallery.length > 0 && (
        <section className="border-t border-grigio bg-grigio/30 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((src, i) => (
                <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-grigio">
                  <Image
                    src={src}
                    alt={`${titolo} - immagine ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-medium uppercase tracking-wide text-scuro/70">
          Stile italiano
        </p>
        <h2 className="mt-2 text-2xl font-bold text-scuro">{dettagliTitolo}</h2>
        <p className="mt-4 text-scuro/90 leading-relaxed">{dettagliTesto}</p>
      </section>

      <section className="bg-chiaro py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-scuro/80">
            Verifica prezzi e disponibilità per {titolo}. Contattaci per prenotare.
          </p>
          <Link
            href="/contatti"
            className="mt-4 inline-flex items-center gap-2 text-scuro font-medium underline hover:no-underline"
          >
            Vai ai Contatti
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
