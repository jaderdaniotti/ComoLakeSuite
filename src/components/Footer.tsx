"use client";

import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  ChevronUp,
} from "lucide-react";
import images from "@/src/images";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-bianco min-h-screen flex flex-col justify-center text-gray-800 border-t border-blu py-12">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-4">
          <div>
            <p className="text-blu text-md">I nostri</p>
            <h2 className="text-4xl md:text-5xl font-light uppercase tracking-wide text-blu">
              ContattI
            </h2>
          </div>

          <div>
            <h3 className="text-3xl font-light uppercase tracking-wide text-blu">Massimiliano</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={18} className="shrink-0 text-blu" />
                <a href="tel:+393409409123" className="hover:underline">
                  +39 340 9409123
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="shrink-0 text-blu" />
                <a href="mailto:info@comolakesuites.com" className="hover:underline">
                  info@comolakesuites.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={18} className="mt-0.5 shrink-0 text-blu" />
                <span>
                  Piazza Cavour ang. Via Albertolli 22
                  <br />
                  22100 Como, Italia
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-3xl font-light uppercase tracking-wide text-blu">Marilena</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={18} className="shrink-0 text-blu" />
                <a href="tel:+393331745544" className="hover:underline">
                  +39 333 1745544
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="shrink-0 text-blu" />
                <a href="mailto:info@comolakesuites.com" className="hover:underline">
                  info@comolakesuites.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={18} className="mt-0.5 shrink-0 text-blu" />
                <span>
                  Piazza Cavour ang. Via Albertolli 22
                  <br />
                  22100 Como, Italia
                </span>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-4xl font-light uppercase tracking-wide text-blu">Trovaci su:</p>
            <ul className="mt-3 space-y-1">
              <li>
                <a
                  href="https://www.booking.com/hotel/it/como-lake-suites.it.html?label=gen173nr-1FCAsocUIQY29tby1sYWtlLXN1aXRlc0gUWARocYgBAZgBFLgBGMgBDNgBAegBAfgBA4gCAagCBLgCzqDb6QXAAgE;logged_out=1;room1=A%2CA;sb_price_type=total;sid=0cc13934770785a9f439e26bc2966da8;type=total"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blu hover:underline"
                >
                  Booking.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.airbnb.it/manage-your-space/33795851/details"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blu hover:underline"
                >
                  AirBNB
                </a>
              </li>
              <li>
                <a
                  href="https://www.expedia.it/Como-Hotel-Como-Lake-Suites.h38392015.Informazioni-Hotel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blu hover:underline"
                >
                  Expedia
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
<div className="w-full text-center text-sm bottom-0 absolute pb-3">
  <p>Made with ❤️ by <a href="https://jaderdaniotti.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-blu hover:underline">Jader</a></p>
</div>
      <button
        type="button"
        onClick={scrollToTop}
        className="absolute bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#1e3a5f] text-blu hover:bg-[#2a4a6f] transition-colors"
        aria-label="Torna su"
      >
        <ChevronUp size={24} className="text-bianco" />
      </button>
    </footer>
  );
}
