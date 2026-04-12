import { Suspense } from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import PrenotaContent from "./PrenotaContent";
import { buildPageMetadata } from "@/src/lib/seo";
import { getServerLocale, t } from "@/src/lib/i18n";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Prenota - Como Lake Suites",
    description:
      "Prenota il tuo soggiorno nelle suite Como Lake Suites e verifica disponibilità e prezzi in tempo reale.",
    pathname: "/prenota",
    keywords: [
      "prenota suite Como",
      "disponibilità suite Lago di Como",
      "prezzi suite Como",
      "booking Como Lake Suites",
    ],
  }),
};

export default async function PrenotaPage() {
  const locale = getServerLocale(await cookies());
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-grigioscuro">
          <p className="text-scuro/60">{t(locale, "Caricamento…", "Loading…")}</p>
        </div>
      }
    >
      <PrenotaContent />
    </Suspense>
  );
}
