"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { APARTMENTS } from "@/src/data/apartmentsMapData";

const ApartmentsMap = dynamic(
  () => import("@/src/components/ApartmentsMap").then((m) => m.default),
  { ssr: false }
);

type Props = {
  thumbnailSrcs: string[];
};

export default function ContattiMapSection({ thumbnailSrcs }: Props) {
  const apartments = useMemo(
    () =>
      APARTMENTS.map((apt, i) => ({
        ...apt,
        thumbnailSrc: thumbnailSrcs[i] ?? "",
      })),
    [thumbnailSrcs]
  );
  return <ApartmentsMap apartments={apartments} />;
}
