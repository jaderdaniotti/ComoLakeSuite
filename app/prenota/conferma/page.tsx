import { Suspense } from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import ConfermaContent from "./ConfermaContent";
import { buildPageMetadata } from "@/src/lib/seo";
import { getServerLocale, t } from "@/src/lib/i18n";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Conferma Prenotazione - Como Lake Suites",
    description:
      "Pagina di conferma prenotazione di Como Lake Suites con riepilogo finale e dettagli del soggiorno.",
    pathname: "/prenota/conferma",
    noIndex: true,
  }),
};

export default async function ConfermaPage() {
  const locale = getServerLocale(await cookies());
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-grigioscuro">
          <p className="text-scuro/60">{t(locale, "Caricamento…", "Loading…")}</p>
        </div>
      }
    >
      <ConfermaContent />
    </Suspense>
  );
}
