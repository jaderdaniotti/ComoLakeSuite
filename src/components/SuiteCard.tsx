import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { ArrowRight } from "lucide-react";

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
    <article className="group overflow-hidden rounded-lg bg-bianco border border-grigio shadow-sm hover:shadow-md transition-shadow">
      <Link href={href} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-grigio">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="p-5">
          <p className="text-sm font-medium text-scuro/70 uppercase tracking-wide">
            {sottotitolo}
          </p>
          <h2 className="mt-1 text-xl font-semibold text-scuro">{titolo}</h2>
          <p className="mt-3 text-sm text-scuro/80 line-clamp-2">{descrizione}</p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-scuro group-hover:underline">
            Leggi tutto e prenota
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </article>
  );
}
