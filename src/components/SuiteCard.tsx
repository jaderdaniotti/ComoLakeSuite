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
    <article className={`grid grid-cols-1 lg:grid-cols-3 justify-center items-center  shadow-3xl  z-[${indice}] h-screen ${isPhotoLeft ? "bg-bianco" : "bg-grigio"}`}>
      <div className={`py-10 lg:col-span-2 h-full  flex items-center justify-center ${isPhotoLeft ? "lg:order-1" : "lg:order-2"}`}>
        <div className="relative aspect-4/3 w-full max-w-2xl overflow-hidden mx-auto">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes=""
          />
        </div>
      </div>
      <div className={`px-8 pb-4 max-w-2xl  md:mx-auto h-full flex flex-col md:justify-center ${isPhotoLeft ? "lg:order-2" : "lg:order-1"}`}>
        <p className="text-sm font-normal text-scuro">{sottotitolo}</p>
        <h2 className="mt-1.5 text-4xl font-extralight uppercase tracking-wide text-scuro md:text-5xl">
          {titolo}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-scuro/80">
          {descrizione}
        </p>
        <Link
          href={href}
          className="mt-8 inline-block rounded-sm bg-blu px-6 py-3.5 text-center text-sm font-medium uppercase tracking-wide text-bianco hover:bg-blu/90 transition-colors"
        >
          Leggi tutto e prenota
        </Link>
      </div>
    </article>
  );
}
