import type { Locale } from "@/i18n/translations";

type FooterProps = {
  locale: Locale;
};

export function Footer({ locale }: FooterProps) {
  return (
    <footer className="siteFooter simpleFooter">
      <div className="container simpleFooterInner">
        <span>
          © 2026 AutoShowroom.{" "}
          {locale === "de"
            ? "Alle Rechte vorbehalten."
            : "All rights reserved."}
        </span>

        <span>
          {locale === "de" ? "Entwickelt von" : "Developed by"}{" "}
          <strong>Mohammed Alshaheri</strong>
        </span>
      </div>
    </footer>
  );
}