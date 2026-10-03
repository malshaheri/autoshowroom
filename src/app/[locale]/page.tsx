import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HomeShowroomViewer } from "@/components/HomeShowroomViewer";
import { vehicles } from "@/data/vehicles";
import { notFound } from "next/navigation";
import {
  locales,
  translations,
  type Locale,
} from "@/i18n/translations";

const featuredCars = [
  {
    slug: "mercedes-benz-c-class",
    name: "Mercedes-Benz C-Class",
    price: "€34,900",
    details: "2023 · 18,500 km · Automatic",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "bmw-3-series",
    name: "BMW 3 Series",
    price: "€32,500",
    details: "2022 · 24,000 km · Automatic",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "audi-a5-sportback",
    name: "Audi A5 Sportback",
    price: "€36,900",
    details: "2023 · 16,200 km · Automatic",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=85",
  },
];

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function Home({ params }: PageProps) {
  const { locale: rawLocale } = await params;

  if (!locales.includes(rawLocale as Locale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const t = translations[locale];
  const showcaseVehicle = vehicles[0];

  return (
    <main>
      <Header locale={locale} labels={t.nav} />

      <section className="hero">
        <video
          className="heroVideo"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/videos/hero-car.mp4" type="video/mp4" />
        </video>

        <div className="heroOverlay" />

        <div className="container heroContent">
          <div className="heroCopy">
            <span className="eyebrow">{t.hero.eyebrow}</span>

            <h1>
              {t.hero.titleStart}
              <span>{t.hero.titleHighlight}</span>
            </h1>

            <p className="heroText">{t.hero.description}</p>

            <div className="heroActions">
              <a className="primaryButton" href="#inventory">
                {t.hero.browse}
                <span>→</span>
              </a>

              <a className="secondaryButton" href="#virtual-showroom">
                {t.hero.explore}
              </a>
            </div>

            <div className="heroStats">
              <div>
                <strong>120+</strong>
                <span>{t.hero.vehicles}</span>
              </div>

              <div>
                <strong>360°</strong>
                <span>{t.hero.virtualView}</span>
              </div>

              <div>
                <strong>100%</strong>
                <span>{t.hero.experience}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="inventory">
        <div className="container">
          <div className="sectionTop">
            <div className="sectionHeading">
              <span className="eyebrow">{t.inventory.eyebrow}</span>
              <h2>{t.inventory.title}</h2>
              <p>{t.inventory.description}</p>
            </div>

            <a className="viewAllLink" href="#">
              {locale === "de" ? "Alle Fahrzeuge ansehen" : "View all cars"} →
            </a>
          </div>

          <div className="carGrid">
            {featuredCars.map((car) => (
              <article className="carCard" key={car.name}>
                <div className="carImageWrap">
                  <img src={car.image} alt={car.name} />
                  <button className="favoriteButton" type="button">
                    ♡
                  </button>
                </div>

                <div className="carCardContent">
                  <h3>{car.name}</h3>
                  <p>{car.details}</p>

                  <div className="carCardFooter">
                    <strong>{car.price}</strong>
                    <Link href={`/${locale}/cars/${car.slug}`}>
                      {t.inventory.details} →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section darkSection" id="virtual-showroom">
        <div className="container virtualGrid">
          <div className="virtualCopy">
            <span className="eyebrow">{t.virtual.eyebrow}</span>

            <h2>{t.virtual.title}</h2>

            <p>{t.virtual.description}</p>

            <Link className="lightButton" href={`/${locale}/cars/mercedes-benz-c-class`}>
              {t.virtual.button} →
            </Link>
          </div>

          <HomeShowroomViewer
              images={showcaseVehicle.exterior360 ?? [showcaseVehicle.image]}
              interiorPanorama={showcaseVehicle.interiorPanorama}
              locale={locale}
            />
          </div>
        </section>

      <section className="section" id="services">
        <div className="container">
          <div className="sectionHeading">
            <span className="eyebrow">{t.services.eyebrow}</span>
            <h2>{t.services.title}</h2>
          </div>

          <div className="serviceGrid">
            <article>
              <div className="serviceIcon">€</div>
              <div>
                <strong>{t.services.financing}</strong>
                <p>{t.services.financingText}</p>
              </div>
            </article>

            <article>
              <div className="serviceIcon">↔</div>
              <div>
                <strong>{t.services.tradeIn}</strong>
                <p>{t.services.tradeInText}</p>
              </div>
            </article>

            <article>
              <div className="serviceIcon">▣</div>
              <div>
                <strong>{t.services.testDrive}</strong>
                <p>{t.services.testDriveText}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="ctaSection" id="contact">
        <div className="container ctaInner">
          <div>
            <span className="eyebrow">{t.cta.eyebrow}</span>
            <h2>{t.cta.title}</h2>
          </div>

          <a className="primaryButton" href="#inventory">
            {t.cta.button} →
          </a>
        </div>
      </section>

      <Footer locale={locale} />
    </main>
  );
}