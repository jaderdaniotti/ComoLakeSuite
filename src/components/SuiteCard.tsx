import Link from "next/link";
import Image, { type StaticImageData } from "next/image";

type SuiteCardProps = {
  titolo: string;
  sottotitolo: string;
  descrizione: string;
  href: string;
  src: string | StaticImageData;
  alt: string;
  indice: number;
};

export default function SuiteCard({
  titolo,
  sottotitolo,
  descrizione,
  href,
  src,
  alt,
  indice
}: SuiteCardProps) {
  const isPhotoLeft = indice % 2 === 0;
  return (
    <article className="w-full">
      {/* Sfondo a tutta larghezza viewport; contenuto limitato a max-w-7xl */}
      <div
        className={`w-full ${isPhotoLeft ? "bg-bianco" : "bg-gray-500/30"}`}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center justify-center px-4 sm:px-6 lg:px-8 lg:grid-cols-3">
          <div
            className={`flex h-full items-center justify-center py-10 lg:col-span-2 ${isPhotoLeft ? "lg:order-1" : "lg:order-2"}`}
          >
            <div className="relative mx-auto aspect-4/3 w-full max-w-2xl overflow-hidden">
              <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            </div>
          </div>
          <div
            className={`flex h-full max-w-2xl flex-col items-center px-8 pb-4 md:mx-auto md:justify-center ${isPhotoLeft ? "lg:order-2" : "lg:order-1"}`}
          >
            <p className="text-xl font-semibold tracking-wide text-blu">{sottotitolo}</p>
            <h2 className="mt-1.5 text-4xl font-light text-center text-bluchiaro uppercase tracking-widest md:text-5xl">
              {titolo}
            </h2>
            <p className="mt-4 text-lg text-center leading-relaxed text-scuro/80">
              {descrizione}
            </p>
            <Link
              href={href}
              className="mt-8 inline-block rounded-sm bg-blu px-6 py-3.5 text-center text-sm font-medium uppercase tracking-wide text-bianco hover:bg-blu/90 transition-colors"
            >
              Leggi tutto e prenota
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
