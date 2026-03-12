"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu } from "lucide-react";
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
  const [suiteAperto, setSuiteAperto] = useState(false);

  const chiudiDrawer = () => {
    const checkbox = document.getElementById("drawer-nav") as HTMLInputElement | null;
    if (checkbox) checkbox.checked = false;
  };

  return (
    <div className="drawer drawer-end">
      <input id="drawer-nav" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <header className="fixed w-full top-0 z-50 glassbg text-bianco border-b border-scuro">
          <div className="mx-auto flex h-25 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center shrink-0">
              <Image
                src={images.logobianco}
                alt="Como Lake Suites"
                className="h-20 w-auto object-contain"
              />
            </Link>

            <nav className="hidden md:flex md:items-center md:gap-8 font-light tracking-wide text-md">
              <Link href="/" className="link-nav text-bianco">
                Home
              </Link>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setSuiteAperto(!suiteAperto)}
                  className="link-nav text-bianco"
                >
                  Le Suites
                </button>
                {suiteAperto && (
                  <div className="absolute left-0 top-full mt-0 w-56 rounded border border-white glassbg py-2 shadow-lg">
                    {suiteLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-4 py-2 text-bianco link-nav"
                        onClick={() => setSuiteAperto(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link href="/i-nostri-servizi" className="link-nav text-bianco">
                Servizi
              </Link>
              <Link href="/contatti" className="link-nav text-bianco">
                Contatti
              </Link>
            </nav>

            <label
              htmlFor="drawer-nav"
              aria-label="Apri menu"
              className="btn btn-square btn-ghost md:hidden text-bianco hover:bg-bianco/10 hover:text-bianco"
            >
              <Menu className="h-6 w-6" />
            </label>
          </div>
        </header>
      </div>

      <div className="drawer-side z-[60] md:hidden">
        <label
          htmlFor="drawer-nav"
          aria-label="Chiudi menu"
          className="drawer-overlay"
        />
        <ul className="menu p-4 w-80 min-h-full bg-blu text-2xl font-extralight pt-12 tracking-wide">
          <li>
            <Link href="/" className="text-bianco hover:bg-bianco/10" onClick={chiudiDrawer}>
              Home
            </Link>
          </li>
         
          <li>
            <Link href="/i-nostri-servizi" className="text-bianco hover:bg-bianco/10" onClick={chiudiDrawer}>
              Servizi
            </Link>
          </li>
          <li>
            <Link href="/contatti" className="text-bianco hover:bg-bianco/10" onClick={chiudiDrawer}>
              Contatti
            </Link>
          </li>
          <li className="menu-title">
            <span className="text-bianco/80 text-sm uppercase tracking-widest">
              Le Suites
            </span>
          </li>
          {suiteLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-bianco hover:bg-bianco/10 pl-6"
                onClick={chiudiDrawer}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
