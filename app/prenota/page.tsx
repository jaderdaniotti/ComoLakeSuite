import { Suspense } from "react";
import type { Metadata } from "next";
import PrenotaContent from "./PrenotaContent";
import { buildPageMetadata } from "@/src/lib/seo";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Prenota - Como Lake Suites",
    description:
      "Prenota il tuo soggiorno nelle suite Como Lake Suites e verifica disponibilità e prezzi in tempo reale.",
    pathname: "/prenota",
  }),
};

export default function PrenotaPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-grigioscuro">
          <p className="text-scuro/60">Caricamento…</p>
        </div>
      }
    >
      <PrenotaContent />
    </Suspense>
  );
}
