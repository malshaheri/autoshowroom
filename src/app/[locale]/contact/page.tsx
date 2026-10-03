import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppContactForm } from "@/components/WhatsAppContactForm";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import {
  locales,
  translations,
  type Locale,
} from "@/i18n/translations";

type ContactPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

const content = {
  de: {
    eyebrow: "Kontakt",
    title: "Lass uns über dein nächstes Fahrzeug sprechen.",
    description:
      "Du hast Fragen zu einem Fahrzeug, einer Probefahrt oder unseren Services? Schreib uns einfach direkt über WhatsApp.",
    whatsapp: "WhatsApp",
    email: "E-Mail",
    location: "Standort",
    hours: "Öffnungszeiten",
    locationValue: "Deutschland",
    hoursValue: "Mo–Fr 09:00–18:00 · Sa 10:00–15:00",
    mapEyebrow: "Standort",
    mapTitle: "Showroom Location",
    mapText:
      "Demo-Standort. Bei einem echten Kunden wird hier die Google-Maps-Karte des Autohauses eingebunden.",
  },

  en: {
    eyebrow: "Contact",
    title: "Let’s talk about your next vehicle.",
    description:
      "Have questions about a vehicle, test drive or our services? Contact us directly via WhatsApp.",
    whatsapp: "WhatsApp",
    email: "Email",
    location: "Location",
    hours: "Opening Hours",
    locationValue: "Germany",
    hoursValue: "Mon–Fri 09:00–18:00 · Sat 10:00–15:00",
    mapEyebrow: "Location",
    mapTitle: "Showroom Location",
    mapText:
      "Demo location. For a real client, the dealership's Google Maps location will be embedded here.",
  },
} as const;

export default async function ContactPage({
  params,
}: ContactPageProps) {
  const { locale: localeParam } = await params;

  if (!locales.includes(localeParam as Locale)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const t = translations[locale];
  const page = content[locale];

  return (
    <main className="contactPage">
      <Header
        locale={locale}
        labels={t.nav}
        variant="light"
      />

      <section className="contactHero">
        <div className="container contactHeroGrid">
          <div className="contactIntro">
            <span className="sectionEyebrow">
              {page.eyebrow}
            </span>

            <h1>{page.title}</h1>

            <p>{page.description}</p>

            <div className="contactInfoGrid">
              <div className="contactInfoCard">
                <span>{page.whatsapp}</span>
                <strong>+49 000 0000000</strong>
              </div>

              <div className="contactInfoCard">
                <span>{page.email}</span>
                <strong>hello@autoshowroom-demo.de</strong>
              </div>

              <div className="contactInfoCard">
                <span>{page.location}</span>
                <strong>{page.locationValue}</strong>
              </div>

              <div className="contactInfoCard">
                <span>{page.hours}</span>
                <strong>{page.hoursValue}</strong>
              </div>
            </div>

            <div className="contactSocials">
              <span className="contactSocialLabel">
                {locale === "de"
                  ? "Folge uns"
                  : "Follow us"}
              </span>

              <div className="contactSocialLinks">
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>

                <a
                  href="https://facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <FaFacebookF />
                </a>

                <a
                  href="https://tiktok.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                >
                  <FaTiktok />
                </a>
              </div>
            </div>
          </div>

          <WhatsAppContactForm locale={locale} />
        </div>
      </section>

      <section className="demoMapSection">
        <div className="container">
          <div className="demoMapCard">
            <div className="demoMapVisual">
              <div className="demoMapGrid" />
              <div className="demoMapRoad roadOne" />
              <div className="demoMapRoad roadTwo" />
              <div className="demoMapRoad roadThree" />

              <div className="demoMapPin">
                <span />
              </div>
            </div>

            <div className="demoMapCopy">
              <span className="sectionEyebrow">
                {page.mapEyebrow}
              </span>

              <h2>{page.mapTitle}</h2>

              <p>{page.mapText}</p>

              <div className="demoMapBadge">
                Google Maps · Client Setup
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer locale={locale} />
    </main>
  );
}