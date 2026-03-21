"use client";

import { useState } from "react";
import { X } from "lucide-react";

/** Stessi numeri della sezione contatti / footer */
const CONTATTI_WHATSAPP = [
  { nome: "Massimiliano", tel: "393409409123" },
  { nome: "Marilena", tel: "393331745544" },
] as const;

function IconaWhatsApp({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function WhatsAppFab() {
  const [aperto, setAperto] = useState(false);

  return (
    <div className="fixed bottom-12 right-5 z-100 flex flex-col items-end gap-2 sm:bottom-12 sm:right-6">
      {aperto && (
        <div className="flex flex-col items-end gap-2" role="group" aria-label="Contatti WhatsApp">
          {CONTATTI_WHATSAPP.map(({ nome, tel }) => (
            <a
              key={tel}
              href={`https://wa.me/${tel}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-w-[200px] items-center justify-center gap-2 rounded-sm bg-[#25D366] px-4 py-3 text-sm font-medium text-white shadow-md transition-colors hover:bg-[#20bd5a]"
            >
              <IconaWhatsApp className="h-5 w-5 shrink-0" />
              <span>{nome}</span>
            </a>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => setAperto((v) => !v)}
        aria-expanded={aperto}
        aria-label={
          aperto ? "Chiudi menu WhatsApp" : "Apri contatti WhatsApp"
        }
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:bg-[#20bd5a] hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-blu focus-visible:ring-offset-2"
      >
        {aperto ? (
          <X className="h-7 w-7" strokeWidth={2} aria-hidden />
        ) : (
          <IconaWhatsApp className="h-8 w-8" />
        )}
      </button>
    </div>
  );
}
