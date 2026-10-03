import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FinancingForm } from "@/components/FinancingForm";
import { getVehicleBySlug } from "@/data/vehicles";
import {
  locales,
  translations,
  type Locale,
} from "@/i18n/translations";

type FinancingPageProps = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    car?: string;
  }>;
};

export default async function FinancingPage({
  params,
  searchParams,
}: FinancingPageProps) {
  const { locale: localeParam } = await params;
  const { car } = await searchParams;

  if (!locales.includes(localeParam as Locale)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const t = translations[locale];
  const selectedVehicle = car ? getVehicleBySlug(car) : undefined;

  return (
    <main className="financingPage">
      <Header
        locale={locale}
        labels={t.nav}
        variant="light"
        queryString={car ? `?car=${car}` : ""}
      />

      <section className="financingSection">
        <div className="container financingGrid">
          <div className="financingIntro">
            <span className="sectionEyebrow">
              {locale === "de" ? "Finanzierung" : "Financing"}
            </span>

            <h1>
              {locale === "de"
                ? "Finde die passende Finanzierung."
                : "Find the right financing option."}
            </h1>

            <p>
              {locale === "de"
                ? "Teile uns deine Wünsche mit und sende deine Finanzierungsanfrage direkt an das Autohaus."
                : "Tell us what you are looking for and send your financing request directly to the dealership."}
            </p>

            <div className="financingSteps">
              <div>
                <strong>01</strong>
                <span>
                  {locale === "de"
                    ? "Fahrzeug bestätigen"
                    : "Confirm vehicle"}
                </span>
              </div>

              <div>
                <strong>02</strong>
                <span>
                  {locale === "de"
                    ? "Finanzierungswunsch angeben"
                    : "Add financing preferences"}
                </span>
              </div>

              <div>
                <strong>03</strong>
                <span>
                  {locale === "de"
                    ? "Anfrage senden"
                    : "Send request"}
                </span>
              </div>
            </div>

            {selectedVehicle ? (
              <div className="financingVehicleCard">
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

          <FinancingForm
            locale={locale}
            vehicleSlug={car ?? ""}
          />
        </div>
      </section>

      <Footer locale={locale} />
    </main>
  );
}