"use client";

import {
  Phone,
  Mail,
  MapPin,
  ChevronUp,
} from "lucide-react";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-scuro text-bianco">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-grigio text-sm">Rimani in</p>
            <h2 className="text-2xl font-semibold uppercase tracking-wide text-bianco">
              Contatto
            </h2>
            <p className="mt-2 text-sm text-grigio">Puoi anche trovarci su:</p>
            <ul className="mt-3 space-y-1">
              <li>
                <a
                  href="https://www.booking.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bianco hover:underline"
                >
                  Booking.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.airbnb.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bianco hover:underline"
                >
                  AirB&B
                </a>
              </li>
              <li>
                <a
                  href="https://www.expedia.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bianco hover:underline"
                >
                  Expedia
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-bianco">Massimiliano</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={18} className="shrink-0 text-bianco" />
                <a href="tel:+393409409123" className="hover:underline">
                  +39 340 9409123
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="shrink-0 text-bianco" />
                <a href="mailto:info@comolakesuites.com" className="hover:underline">
                  info@comolakesuites.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={18} className="mt-0.5 shrink-0 text-bianco" />
                <span>
                  Piazza Cavour ang. Via Albertolli 22
                  <br />
                  22100 Como, Italia
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-bianco">Marilena</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={18} className="shrink-0 text-bianco" />
                <a href="tel:+393331745544" className="hover:underline">
                  +39 333 1745544
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="shrink-0 text-bianco" />
                <a href="mailto:info@comolakesuites.com" className="hover:underline">
                  info@comolakesuites.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={18} className="mt-0.5 shrink-0 text-bianco" />
                <span>
                  Piazza Cavour ang. Via Albertolli 22
                  <br />
                  22100 Como, Italia
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={scrollToTop}
        className="absolute bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#1e3a5f] text-bianco hover:bg-[#2a4a6f] transition-colors"
        aria-label="Torna su"
      >
        <ChevronUp size={24} />
      </button>
    </footer>
  );
}
