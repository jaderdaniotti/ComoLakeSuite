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
    <article className="group relative aspect-4/3 rounded-lg bg-bianco border border-grigio shadow-sm hover:shadow-md transition-shadow">
      <Link href={href} className="block">
        <div className="absolute inset-0  overflow-hidden bg-grigio border border-blu">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover group-hover:scale-103 transition-all duration-300 "
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="px-2 py-1 absolute -top-5 left-1/2 -translate-x-1/2 right-0 bg-grigio border border-blu z-20 w-fit">
          {/* <p className="text-sm font-medium text-scuro/70 uppercase tracking-wide">
            {sottotitolo}
          </p> */}
          <h2 className=" text-xl font-light text-blu ">{titolo}</h2>
          {/* <p className="mt-3 text-sm text-scuro/80 line-clamp-2">{descrizione}</p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-scuro group-hover:underline">
            Leggi tutto e prenota
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </span> */}
        </div>
      </Link>
    </article>
  );
}
