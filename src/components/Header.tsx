"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/translations";

type HeaderProps = {
  variant?: "default" | "light";
  locale: Locale;
  labels: {
    cars: string;
    showroom: string;
    services: string;
    contact: string;
    viewCars: string;
  };
};

export function Header({ locale, labels, variant = "default" }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const localePath = (targetLocale: Locale) => {
    const segments = pathname.split("/");

    if (segments[1] === "de" || segments[1] === "en") {
      segments[1] = targetLocale;
      return segments.join("/") || `/${targetLocale}`;
    }

    return `/${targetLocale}`;
  };

  return (
    <header className={`siteHeader ${variant === "light" ? "lightHeader" : ""}`}>
      <div className="container headerInner">
        <Link className="brand" href={`/${locale}`}>
          Auto<span>Showroom</span>
        </Link>

        <nav className="mainNav">
          <a href="#inventory">{labels.cars}</a>
          <a href="#virtual-showroom">{labels.showroom}</a>
          <a href="#services">{labels.services}</a>
          <a href="#contact">{labels.contact}</a>
        </nav>

        <div className="headerActions">
          <div className="languageSwitch desktopLanguage">
            <Link
              className={locale === "de" ? "active" : ""}
              href={localePath("de")}
            >
              DE
            </Link>

            <span>|</span>

            <Link
              className={locale === "en" ? "active" : ""}
              href={localePath("en")}
            >
              EN
            </Link>
          </div>

          <a className="headerButton" href="#inventory">
            {labels.viewCars}
          </a>

          <button
            className={`menuButton ${isOpen ? "open" : ""}`}
            type="button"
            aria-label="Open menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`mobileMenu ${isOpen ? "open" : ""}`}>
        <div className="container mobileMenuInner">
          <a href="#inventory" onClick={() => setIsOpen(false)}>
            {labels.cars}
          </a>

          <a href="#virtual-showroom" onClick={() => setIsOpen(false)}>
            {labels.showroom}
          </a>

          <a href="#services" onClick={() => setIsOpen(false)}>
            {labels.services}
          </a>

          <a href="#contact" onClick={() => setIsOpen(false)}>
            {labels.contact}
          </a>

          <div className="languageSwitch mobileLanguage">
            <Link
              className={locale === "de" ? "active" : ""}
              href={localePath("de")}
              onClick={() => setIsOpen(false)}
            >
              DE
            </Link>

            <span>|</span>

            <Link
              className={locale === "en" ? "active" : ""}
              href={localePath("en")}
              onClick={() => setIsOpen(false)}
            >
              EN
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}