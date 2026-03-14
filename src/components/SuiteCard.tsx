import Link from "next/link";
import Image, { type StaticImageData } from "next/image";

type SuiteCardProps = {
  titolo: string;
  sottotitolo: string;
  descrizione: string;
  href: string;
  src: string | StaticImageData;
  alt: string;
};

export default function SuiteCard({
  titolo,
  sottotitolo,
  descrizione,
  href,
  src,
  alt,
}: SuiteCardProps) {
  return (
    <article className="grid grid-cols-1 lg:grid-cols-2 justify-center items-center bg-bianco">
      <div className=" pb-8">
        <div className="relative aspect-4/3 w-full max-w-lg overflow-hidden">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 512px"
          />
        </div>
      </div>
      <div className="px-8 pb-4">
        <p className="text-sm font-normal text-scuro">{sottotitolo}</p>
        <h2 className="mt-1.5 text-3xl font-extralight uppercase tracking-wide text-scuro md:text-4xl">
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
