import { Suspense } from "react";
import ConfermaContent from "./ConfermaContent";

export default function ConfermaPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-grigioscuro">
          <p className="text-scuro/60">Caricamento…</p>
        </div>
      }
    >
      <ConfermaContent />
    </Suspense>
  );
}
