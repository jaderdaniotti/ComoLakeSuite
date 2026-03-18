"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { CONTATTI_MARKER } from "@/src/data/apartmentsMapData";

const ApartmentsMap = dynamic(
  () => import("@/src/components/ApartmentsMap").then((m) => m.default),
  { ssr: false }
);

type Props = {
  /** URL dell'immagine usata come thumbnail del marker (es. logo) */
  thumbnailSrc: string;
};

export default function ContattiMapSection({ thumbnailSrc }: Props) {
  const apartments = useMemo(
    () => [{ ...CONTATTI_MARKER, thumbnailSrc }],
    [thumbnailSrc]
  );
  return <ApartmentsMap apartments={apartments} />;
}
