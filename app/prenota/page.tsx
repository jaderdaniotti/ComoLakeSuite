"use client";

import { Suspense } from "react";
import PrenotaContent from "./PrenotaContent";

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
