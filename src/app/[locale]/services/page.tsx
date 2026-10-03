import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  locales,
  translations,
  type Locale,
} from "@/i18n/translations";

type ServicesPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

const pageContent = {
  de: {
    eyebrow: "Unsere Leistungen",
    title: "Alles rund um dein nächstes Fahrzeug.",
    description:
      "Vom ersten Interesse bis zur Fahrzeugübergabe begleiten wir unsere Kunden mit modernen, unkomplizierten Services.",
    items: [
      {
        number: "01",
        title: "Finanzierung",
        text:
          "Flexible Finanzierungsmöglichkeiten für unterschiedliche Budgets und Anforderungen.",
      },
      {
        number: "02",
        title: "Inzahlungnahme",
        text:
          "Lass dein aktuelles Fahrzeug unkompliziert bewerten und beim Fahrzeugwechsel berücksichtigen.",
      },
      {
        number: "03",
        title: "Probefahrt",
        text:
          "Vereinbare eine persönliche Probefahrt für dein Wunschfahrzeug.",
      },
      {
        number: "04",
        title: "Fahrzeugsuche",
        text:
          "Du suchst ein bestimmtes Modell? Wir unterstützen dich bei der Suche nach dem passenden Fahrzeug.",
      },
      {
        number: "05",
        title: "Garantie & Service",
        text:
          "Informationen zu Garantie, Fahrzeugübergabe und weiteren Serviceleistungen aus einer Hand.",
      },
    ],
    ctaEyebrow: "Dein nächstes Auto",
    ctaTitle: "Entdecke unsere aktuellen Fahrzeuge.",
    ctaButton: "Fahrzeuge ansehen",
  },

  en: {
    eyebrow: "Our Services",
    title: "Everything around your next vehicle.",
    description:
      "From the first enquiry to vehicle handover, we support customers with modern and straightforward automotive services.",
    items: [
      {
        number: "01",
        title: "Financing",
        text:
          "Flexible financing options designed for different budgets and requirements.",
      },
      {
        number: "02",
        title: "Trade-In",
        text:
          "Request an evaluation of your current vehicle and make changing cars easier.",
      },
      {
        number: "03",
        title: "Test Drive",
        text:
          "Arrange a personal test drive for the vehicle you are interested in.",
      },
      {
        number: "04",
        title: "Vehicle Sourcing",
        text:
          "Looking for a particular model? We can help you find a vehicle that matches your requirements.",
      },
      {
        number: "05",
        title: "Warranty & Service",
        text:
          "Clear information about warranty, vehicle handover and additional automotive services.",
      },
    ],
    ctaEyebrow: "Your next car",
    ctaTitle: "Explore our current vehicles.",
    ctaButton: "Browse Vehicles",
  },
} as const;

export default async function ServicesPage({
  params,
}: ServicesPageProps) {
  const { locale: localeParam } = await params;

  if (!locales.includes(localeParam as Locale)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const t = translations[locale];
  const content = pageContent[locale];

  return (
    <main className="servicesPage">
      <Header
        locale={locale}
        labels={t.nav}
        variant="light"
      />

      <section className="servicesHero">
        <div className="container">
          <div className="servicesHeroInner">
            <span className="sectionEyebrow">
              {content.eyebrow}
            </span>

            <h1>{content.title}</h1>

            <p>{content.description}</p>
          </div>
        </div>
      </section>

      <section className="servicesListSection">
        <div className="container">
          <div className="servicesPageGrid">
            {content.items.map((service) => (
              <article
                className="servicesPageCard"
                key={service.number}
              >
                <span className="serviceNumber">
                  {service.number}
                </span>

                <h2>{service.title}</h2>

                <p>{service.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="servicesPageCta">
        <div className="container">
          <div className="servicesPageCtaInner">
            <div>
              <span className="sectionEyebrow">
                {content.ctaEyebrow}
              </span>

              <h2>{content.ctaTitle}</h2>
            </div>

            <Link
              className="primaryButton"
              href={`/${locale}#inventory`}
            >
              {content.ctaButton}
            </Link>
          </div>
        </div>
      </section>
      <Footer locale={locale} />
    </main>
  );
}