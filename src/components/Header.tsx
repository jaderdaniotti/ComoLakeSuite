"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import images from "@/src/images";

const suiteLinks = [
  { href: "/le-suites/suite-volta", label: "Suite Volta" },
  { href: "/le-suites/suite-cavour", label: "Suite Cavour" },
  { href: "/le-suites/suite-vista-duomo", label: "Suite Vista Duomo" },
  { href: "/le-suites/suite-cernobbio", label: "Suite Cernobbio" },
  { href: "/le-suites/suite-dante", label: "Suite Dante" },
  { href: "/le-suites/suite-como-sole", label: "Suite Como Sole" },
];

export default function Header() {
  const [suiteAperto, setSuiteAperto] = useState(false);

  const chiudiDrawer = () => {
    const checkbox = document.getElementById(
      "drawer-nav",
    ) as HTMLInputElement | null;
    if (checkbox) checkbox.checked = false;
  };

  const chiudiTutto = () => {
    setSuiteAperto(false); // Chiude il dropdown desktop
    chiudiDrawer();        // Chiude il drawer mobile (quello che già avevi)
  };

  return (
    <div className="drawer drawer-end z-9999 absolute">
      <input id="drawer-nav" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <header className=" w-full z-50 flex">
          <div className=" flex w-full md:w-min items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center justify-center shrink-0" onClick={chiudiTutto}>
              <Image
                src={images.logobianco}
                alt="Como Lake Suites"
                className="h-40  object-contain"
              />
            </Link>

            <label
              htmlFor="drawer-nav"
              aria-label="Apri menu"
              className="btn btn-square btn-ghost md:hidden text-bianco hover:bg-bianco/10 hover:text-bianco"
            >
              <Menu className="h-6 w-6" />
            </label>
          </div>
            <nav className="hidden mx-auto md:flex md:items-center md:gap-8 font-light tracking-wide text-2xl">
              <Link href="/" className="link-nav text-bianco" onClick={chiudiTutto}>
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
                  <div className="absolute left-0 top-full mt-5 w-65 bg-gray-800 py-2 p-4 shadow-sm">
                    {suiteLinks.map((link) => (
                      <>
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block px-4 py-2 text-gray-200 font-normal link-nav"
                          onClick={() => setSuiteAperto(false)}
                        >
                          {link.label}
                        </Link>
                        <hr className="border-bianco/10" />
                      </>
                    ))}
                  </div>
                )}
              </div>
              <Link href="/i-nostri-servizi" className="link-nav text-bianco" onClick={chiudiTutto}>
                Servizi
              </Link>
              <Link href="/contatti" className="link-nav text-bianco" onClick={chiudiTutto}>
                Contatti
              </Link>
            </nav>
        </header>
      </div>

      <div className="drawer-side w-full z-60 md:hidden">
        <label
          htmlFor="drawer-nav"
          aria-label="Chiudi menu"
          className="drawer-overlay"
        />
        <label
          htmlFor="drawer-nav"
          aria-label="Chiudi menu"
          className="absolute right-4 top-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center text-bianco hover:bg-bianco/10"
        >
          <X className="h-6 w-6" />
        </label>
        <ul className=" menu p-4 w-full min-h-full bg-blu/90 text-2xl font-normal rounded-none uppercase tracking-wide items-center ">
          <div className="flex mt-3 justify-center pb-6 border-b border-bianco w-full ">
            <Image
              src={images.logobianco}
              alt="Como Lake Suites"
              width={100}
              height={100}
            />
          </div>

          <div className="flex flex-col gap-1 border-b border-bianco w-full py-6 justify-center items-center">
            <li>
              <Link
                href="/"
                className="text-bianco rounded-none"
                onClick={chiudiDrawer}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/i-nostri-servizi"
                className="text-bianco rounded-none"
                onClick={chiudiDrawer}
              >
                Servizi
              </Link>
            </li>
            <li>
              <Link
                href="/contatti"
                className="text-bianco rounded-none"
                onClick={chiudiDrawer}
              >
                Contatti
              </Link>
            </li>
          </div>
          <div className="flex flex-col gap-2 border-b border-bianco w-full py-3 justify-center items-center">
            <li className="menu-title">
              <span className="text-bianco border-b border-bianco rounded-none pb-0 tracking-wide uppercase tracking-widest flex items-center gap-2 font-medium text-2xl">
                Le Suites
              </span>
            </li>
            {suiteLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-lg text-bianco m-0 p-0 tracking-wide"
                  onClick={chiudiDrawer}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
}
