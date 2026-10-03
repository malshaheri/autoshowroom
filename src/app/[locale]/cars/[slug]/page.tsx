import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FaWhatsapp } from "react-icons/fa";
import { VehicleExperienceTabs } from "@/components/VehicleExperienceTabs";
import {
  locales,
  translations,
  type Locale,
} from "@/i18n/translations";
import { getVehicleBySlug } from "@/data/vehicles";

type PageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export default async function VehiclePage({ params }: PageProps) {
  const { locale: rawLocale, slug } = await params;

  if (!locales.includes(rawLocale as Locale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const t = translations[locale];
  const vehicle = getVehicleBySlug(slug);

  const vehicleValues =
    locale === "de"
      ? {
          automatic: "Automatik",
          petrol: "Benzin",
          diesel: "Diesel",
          graphiteGrey: "Graphitgrau",
          alpineWhite: "Alpinweiß",
          mythosBlack: "Mythosschwarz",
        }
      : {
          automatic: "Automatic",
          petrol: "Petrol",
          diesel: "Diesel",
          graphiteGrey: "Graphite Grey",
          alpineWhite: "Alpine White",
          mythosBlack: "Mythos Black",
        };

  if (!vehicle) {
    notFound();
  }

  const labels =
    locale === "de"
      ? {
          back: "Zurück zu den Fahrzeugen",
          overview: "Fahrzeugübersicht",
          mileage: "Kilometerstand",
          transmission: "Getriebe",
          fuel: "Kraftstoff",
          power: "Leistung",
          color: "Farbe",
          year: "Erstzulassung",
          gallery: "Galerie",
          exterior: "360° Außenansicht",
          interior: "360° Innenraum",
          testDrive: "Probefahrt buchen",
          financing: "Finanzierung anfragen",
          whatsapp: "Schreib uns",
          description:
            "Entdecke dieses Fahrzeug im Detail und erlebe es digital, bevor du den Showroom besuchst.",
        }
      : {
          back: "Back to vehicles",
          overview: "Vehicle Overview",
          mileage: "Mileage",
          transmission: "Transmission",
          fuel: "Fuel",
          power: "Power",
          color: "Color",
          year: "First Registration",
          gallery: "Gallery",
          exterior: "360° Exterior",
          interior: "360° Interior",
          testDrive: "Book a Test Drive",
          financing: "Ask About Financing",
          whatsapp: "Send us",
          description:
            "Explore this vehicle in detail and experience it digitally before visiting the showroom.",
        };

  return (
    <main>
      <Header locale={locale} labels={t.nav} variant="light" />

      <section className="vehiclePage">
        <div className="container">
          <Link className="vehicleBackLink" href={`/${locale}#inventory`}>
            ← {labels.back}
          </Link>

          <div className="vehicleHero">
            <div className="vehicleHeroCopy">
              <span className="eyebrow">{labels.overview}</span>

              <h1>{vehicle.name}</h1>

              <p>{labels.description}</p>

              <div className="vehiclePrice">{vehicle.price}</div>

              <div className="vehicleActions">
                <a
  className="vehicleWhatsappButton"
  href={`https://wa.me/490000000000?text=${encodeURIComponent(
    locale === "de"
      ? `Hallo AutoShowroom, ich interessiere mich für den ${vehicle.name} (${vehicle.price}).`
      : `Hello AutoShowroom, I am interested in the ${vehicle.name} (${vehicle.price}).`
  )}`}
  target="_blank"
  rel="noopener noreferrer"
>
  <FaWhatsapp className="vehicleWhatsappIcon" aria-hidden="true" />
  <span>{labels.whatsapp}</span>
</a>

                <Link
                    className="secondaryDarkButton"
                    href={`/${locale}/test-drive?car=${vehicle.slug}`}
                  >
                    {labels.testDrive}
                  </Link>

                <Link
                    className="outlineButton"
                    href={`/${locale}/financing?car=${vehicle.slug}`}
                  >
                    {labels.financing}
                  </Link>
              </div>
            </div>

            <div className="vehicleMainImage">
              <img src={vehicle.image} alt={vehicle.name} />
            </div>
          </div>

          <div className="vehicleSpecs">
            <div>
              <span>{labels.year}</span>
              <strong>{vehicle.year}</strong>
            </div>

            <div>
              <span>{labels.mileage}</span>
              <strong>{vehicle.mileage}</strong>
            </div>

            <div>
              <span>{labels.transmission}</span>
              <strong>{vehicleValues.automatic}</strong>
            </div>

            <div>
              <span>{labels.fuel}</span>
              <strong>
                {vehicle.fuel === "Diesel"
                  ? vehicleValues.diesel
                  : vehicleValues.petrol}
              </strong>
            </div>

            <div>
              <span>{labels.power}</span>
              <strong>{vehicle.power}</strong>
            </div>

            <div>
              <span>{labels.color}</span>
              <strong>
                {vehicle.color === "Alpine White"
                  ? vehicleValues.alpineWhite
                  : vehicle.color === "Mythos Black"
                    ? vehicleValues.mythosBlack
                    : vehicleValues.graphiteGrey}
              </strong>
            </div>
          </div>

          <VehicleExperienceTabs
            vehicleName={vehicle.name}
            gallery={vehicle.gallery}
            exterior360={vehicle.exterior360 ?? [vehicle.image]}
            interiorPanorama={vehicle.interiorPanorama}
            locale={locale}
          />
        </div>
      </section>

      <Footer locale={locale} />
    </main>
  );
}