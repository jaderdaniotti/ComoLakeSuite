"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import images from "@/src/images";

const suiteLinks = [
  { href: "/le-suites/suite-volta", label: "Suite Volta" },
  { href: "/le-suites/suite-cavour", label: "Suite Cavour" },
  { href: "/le-suites/suite-cernobbio", label: "Suite Cernobbio" },
  { href: "/le-suites/suite-como-sole", label: "Suite Como Sole" },
  { href: "/le-suites/suite-dante", label: "Suite Dante" },
  { href: "/le-suites/suite-vista-duomo", label: "Suite Vista Duomo" },
];

export default function Header() {
  const [menuAperto, setMenuAperto] = useState(false);
  const [suiteAperto, setSuiteAperto] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-scuro text-bianco border-b border-scuro ">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center shrink-0" onClick={() => setMenuAperto(false)}>
          <Image
            src={images.logobianco}
            alt="Como Lake Suites"
            width={160}
            height={48}
            className="h-10 w-auto object-contain"
          />
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-8">
          <Link
            href="/"
            className="text-bianco hover:bg-bianco hover:text-scuro px-3 py-2 rounded transition-colors text-sm font-medium"
          >
            Home
          </Link>
          <div className="relative">
            <button
              type="button"
              onClick={() => setSuiteAperto(!suiteAperto)}
              className="flex items-center gap-1 text-bianco hover:bg-bianco hover:text-scuro px-3 py-2 rounded transition-colors text-sm font-medium"
            >
              Le Suites
            </button>
            {suiteAperto && (
              <div className="absolute left-0 top-full mt-0 w-56 rounded border border-grigio bg-bianco py-2 shadow-lg">
                {suiteLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 text-sm text-scuro hover:bg-chiaro"
                    onClick={() => setSuiteAperto(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link
            href="/i-nostri-servizi"
            className="text-bianco hover:bg-bianco hover:text-scuro px-3 py-2 rounded transition-colors text-sm font-medium"
          >
            Servizi
          </Link>
          <Link
            href="/contatti"
            className="text-bianco hover:bg-bianco hover:text-scuro px-3 py-2 rounded transition-colors text-sm font-medium"
          >
            Contatti
          </Link>
        </nav>

        <button
          type="button"
          className="md:hidden rounded p-2 text-bianco hover:bg-bianco/10"
          onClick={() => setMenuAperto(!menuAperto)}
          aria-label="Menu"
        >
          {menuAperto ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuAperto && (
        <div className="md:hidden border-t border-bianco/20 bg-scuro px-4 py-4">
          <div className="flex flex-col gap-1">
            <Link
              href="/"
              className="px-3 py-2 text-bianco hover:bg-bianco/10 rounded"
              onClick={() => setMenuAperto(false)}
            >
              Home
            </Link>
            <div className="py-2">
              <span className="block px-3 py-1 text-sm font-semibold text-bianco">Le Suites</span>
              {suiteLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-6 py-2 text-bianco hover:bg-bianco/10 rounded"
                  onClick={() => setMenuAperto(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <Link
              href="/i-nostri-servizi"
              className="px-3 py-2 text-bianco hover:bg-bianco/10 rounded"
              onClick={() => setMenuAperto(false)}
            >
              Servizi
            </Link>
            <Link
              href="/contatti"
              className="px-3 py-2 text-bianco hover:bg-bianco/10 rounded"
              onClick={() => setMenuAperto(false)}
            >
              Contatti
            </Link>
            <a
              href="https://www.comolakesuites.com/en/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-bianco hover:bg-bianco/10 rounded"
            >
              English
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
