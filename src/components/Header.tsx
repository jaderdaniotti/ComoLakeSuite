"use client";

import Link from "next/link";
import Image from "next/image";
import { Fragment, useState } from "react";
import { Menu, X } from "lucide-react";
import images from "@/src/images";
import { useLanguage } from "@/src/components/LanguageProvider";

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
  const { locale, toggleLocale } = useLanguage();

  const labels = {
    home: "Home",
    suites: locale === "en" ? "Suites" : "Le Suites",
    services: locale === "en" ? "Services" : "Servizi",
    tours: locale === "en" ? "Tours" : "Tour",
    contacts: locale === "en" ? "Contacts" : "Contatti",
    openMenu: locale === "en" ? "Open menu" : "Apri menu",
    closeMenu: locale === "en" ? "Close menu" : "Chiudi menu",
    switchLanguage: locale === "en" ? "Italiano" : "English",
  };

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
          <div className=" flex w-full lg:w-min items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center justify-center shrink-0" onClick={chiudiTutto}>
              <Image
                src={images.logobianco}
                alt="Como Lake Suites"
                className="h-40  object-contain"
              />
            </Link>

            <label
              htmlFor="drawer-nav"
              aria-label={labels.openMenu}
              className="btn btn-square btn-ghost lg:hidden text-bianco hover:bg-bianco/10 hover:text-bianco"
            >
              <Menu className="h-6 w-6" />
            </label>
          </div>
            <nav className="hidden mx-auto lg:flex md:items-center md:gap-8 font-light tracking-wide text-2xl">
              <Link href="/" className="link-nav text-bianco" onClick={chiudiTutto}>
                {labels.home}
              </Link>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setSuiteAperto(!suiteAperto)}
                  className="link-nav text-bianco"
                >
                  {labels.suites}
                </button>
                {suiteAperto && (
                  <div className="absolute left-0 top-full mt-5 w-65 bg-gray-800 py-2 p-4 shadow-sm">
                    {suiteLinks.map((link, index) => (
                      <Fragment key={link.href}>
                        <Link
                          href={link.href}
                          className="block px-4 py-2 text-gray-200 font-normal link-nav"
                          onClick={() => setSuiteAperto(false)}
                        >
                          {link.label}
                        </Link>
                        {index < suiteLinks.length - 1 && <hr className="border-bianco/10" />}
                      </Fragment>
                    ))}
                  </div>
                )}
              </div>
              <Link href="/i-nostri-servizi" className="link-nav text-bianco" onClick={chiudiTutto}>
                {labels.services}
              </Link>
              <Link href="/tour" className="link-nav text-bianco" onClick={chiudiTutto}>
                {labels.tours}
              </Link>
              <Link href="/contatti" className="link-nav text-bianco" onClick={chiudiTutto}>
                {labels.contacts}
              </Link>
              <button type="button" className="link-nav text-bianco" onClick={toggleLocale}>
                {labels.switchLanguage}
              </button>
            </nav>
        </header>
      </div>

      <div className="drawer-side w-full z-60 lg:hidden">
        <label
          htmlFor="drawer-nav"
          aria-label={labels.closeMenu}
          className="drawer-overlay"
        />
        <label
          htmlFor="drawer-nav"
          aria-label={labels.closeMenu}
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
                {labels.home}
              </Link>
            </li>
            <li>
              <Link
                href="/i-nostri-servizi"
                className="text-bianco rounded-none"
                onClick={chiudiDrawer}
              >
                {labels.services}
              </Link>
            </li>
            <li>
              <Link
                href="/tour"
                className="text-bianco rounded-none"
                onClick={chiudiDrawer}
              >
                {labels.tours}
              </Link>
            </li>
            <li>
              <Link
                href="/contatti"
                className="text-bianco rounded-none"
                onClick={chiudiDrawer}
              >
                {labels.contacts}
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="text-bianco rounded-none"
                onClick={() => {
                  toggleLocale();
                  chiudiDrawer();
                }}
              >
                {labels.switchLanguage}
              </button>
            </li>
          </div>
          <div className="flex flex-col gap-2 border-b border-bianco w-full py-3 justify-center items-center">
            <li className="menu-title">
              <span className="text-bianco border-b border-bianco rounded-none pb-0 uppercase tracking-widest flex items-center gap-2 font-medium text-2xl">
                {labels.suites}
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
