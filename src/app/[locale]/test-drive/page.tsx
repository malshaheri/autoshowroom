import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TestDriveForm } from "@/components/TestDriveForm";
import { getVehicleBySlug } from "@/data/vehicles";
import {
  locales,
  translations,
  type Locale,
} from "@/i18n/translations";

type TestDrivePageProps = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    car?: string;
  }>;
};

export default async function TestDrivePage({
  params,
  searchParams,
}: TestDrivePageProps) {
  const { locale: localeParam } = await params;
  const { car } = await searchParams;

  if (!locales.includes(localeParam as Locale)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const t = translations[locale];
  const selectedVehicle = car ? getVehicleBySlug(car) : undefined;

  return (
    <main className="testDrivePage">
      <Header
        locale={locale}
        labels={t.nav}
        variant="light"
        queryString={car ? `?car=${car}` : ""}
      />

      <section className="testDriveSection">
        <div className="container testDriveGrid">
          <div className="testDriveIntro">
            <span className="sectionEyebrow">
              {locale === "de" ? "Probefahrt" : "Test Drive"}
            </span>

            <h1>
              {locale === "de"
                ? "Buche deine Probefahrt."
                : "Book your test drive."}
            </h1>

            <p>
              {locale === "de"
                ? "Wähle deinen Wunschtermin und sende deine Anfrage direkt an das Autohaus."
                : "Choose your preferred date and send your request directly to the dealership."}
            </p>

            <div className="testDriveSteps">
              <div>
                <strong>01</strong>
                <span>
                  {locale === "de"
                    ? "Fahrzeug auswählen"
                    : "Choose vehicle"}
                </span>
              </div>

              <div>
                <strong>02</strong>
                <span>
                  {locale === "de"
                    ? "Termin auswählen"
                    : "Choose date"}
                </span>
              </div>

              <div>
                <strong>03</strong>
                <span>
                  {locale === "de"
                    ? "Probefahrt buchen"
                    : "Send request"}
                </span>
              </div>
            </div>

            {selectedVehicle ? (
              <div className="testDriveVehicleCard">
                <img
                  src={selectedVehicle.image}
                  alt={selectedVehicle.name}
                />

                <div>
                  <span>
                    {locale === "de"
                      ? "Ausgewähltes Fahrzeug"
                      : "Selected vehicle"}
                  </span>

                  <h2>{selectedVehicle.name}</h2>

                  <p>
                    {selectedVehicle.year} ·{" "}
                    {selectedVehicle.mileage} ·{" "}
                    {selectedVehicle.transmission}
                  </p>

                  <strong>{selectedVehicle.price}</strong>
                </div>
              </div>
            ) : null}
          </div>

          <TestDriveForm
            locale={locale}
            vehicleSlug={car ?? ""}
          />
        </div>
      </section>

      <Footer locale={locale} />
    </main>
  );
}