"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/translations";

type HeaderProps = {
  variant?: "default" | "light";
  locale: Locale;
  queryString?: string;
  labels: {
    cars: string;
    showroom: string;
    services: string;
    contact: string;
    viewCars: string;
  };
};

export function Header({
  locale,
  labels,
  variant = "default",
  queryString = "",
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isServicesPage = pathname.includes("/services");
  const isContactPage = pathname.includes("/contact");

  const localePath = (targetLocale: Locale) => {
    const segments = pathname.split("/");

    if (segments[1] === "de" || segments[1] === "en") {
      segments[1] = targetLocale;
      return `${segments.join("/") || `/${targetLocale}`}${queryString}`;
    }

    return `/${targetLocale}${queryString}`;
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <header
      className={`siteHeader ${
        variant === "light" ? "lightHeader" : ""
      }`}
    >
      <div className="container headerInner">
        <Link className="brand" href={`/${locale}`}>
          Auto<span>Showroom</span>
        </Link>

        <nav className="mainNav">
          <Link href={`/${locale}#inventory`}>
            {labels.cars}
          </Link>

          <Link href={`/${locale}#virtual-showroom`}>
            {labels.showroom}
          </Link>

          <Link className={isServicesPage ? "active" : ""} href={`/${locale}/services`}>
            {labels.services}
          </Link>

          <Link className={isContactPage ? "active" : ""} href={`/${locale}/contact`}>
            {labels.contact}
          </Link>
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

          <Link
            className="headerButton"
            href={`/${locale}#inventory`}
          >
            {labels.viewCars}
          </Link>

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
          <Link
            href={`/${locale}#inventory`}
            onClick={closeMenu}
          >
            {labels.cars}
          </Link>

          <Link
            href={`/${locale}#virtual-showroom`}
            onClick={closeMenu}
          >
            {labels.showroom}
          </Link>

          <Link
            href={`/${locale}/services`}
            onClick={closeMenu}
          >
            {labels.services}
          </Link>

          <Link
            href={`/${locale}/contact`}
            onClick={closeMenu}
          >
            {labels.contact}
          </Link>

          <div className="languageSwitch mobileLanguage">
            <Link
              className={locale === "de" ? "active" : ""}
              href={localePath("de")}
              onClick={closeMenu}
            >
              DE
            </Link>

            <span>|</span>

            <Link
              className={locale === "en" ? "active" : ""}
              href={localePath("en")}
              onClick={closeMenu}
            >
              EN
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}