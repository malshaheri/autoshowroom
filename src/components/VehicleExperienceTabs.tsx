"use client";

import { useState } from "react";
import { Vehicle360Viewer } from "@/components/Vehicle360Viewer";
import { Interior360Viewer } from "@/components/Interior360Viewer";
import { VehicleGallery } from "@/components/VehicleGallery";

type VehicleExperienceTabsProps = {
  vehicleName: string;
  gallery: string[];
  exterior360: string[];
  interiorPanorama?: string;
  locale: "de" | "en";
};

export function VehicleExperienceTabs({
  vehicleName,
  gallery,
  exterior360,
  interiorPanorama,
  locale,
}: VehicleExperienceTabsProps) {
  const [activeTab, setActiveTab] = useState<
    "gallery" | "exterior" | "interior"
  >("gallery");

  const labels =
    locale === "de"
      ? {
          gallery: "Galerie",
          exterior: "360° Außenansicht",
          interior: "360° Innenraum",
          drag: "Nach links oder rechts ziehen",
          noInterior: "Innenraum-Panorama folgt",
        }
      : {
          gallery: "Gallery",
          exterior: "360° Exterior",
          interior: "360° Interior",
          drag: "Drag left or right",
          noInterior: "Interior panorama coming soon",
        };

  return (
    <section className="vehicleExperience">
      <div className="experienceTabs">
        <button
          type="button"
          className={activeTab === "gallery" ? "active" : ""}
          onClick={() => setActiveTab("gallery")}
        >
          {labels.gallery}
        </button>

        <button
          type="button"
          className={activeTab === "exterior" ? "active" : ""}
          onClick={() => setActiveTab("exterior")}
        >
          {labels.exterior}
        </button>

        <button
          type="button"
          className={activeTab === "interior" ? "active" : ""}
          onClick={() => setActiveTab("interior")}
        >
          {labels.interior}
        </button>
      </div>

      {activeTab === "gallery" && (
        <VehicleGallery
          images={gallery}
          vehicleName={vehicleName}
        />
      )}

      {activeTab === "exterior" && (
        <div className="experienceViewer">
          <Vehicle360Viewer
            images={exterior360}
            alt={vehicleName}
            hint={labels.drag}
          />
        </div>
      )}

      {activeTab === "interior" && (
        <div className="experienceViewer">
          {interiorPanorama ? (
            <Interior360Viewer
              panorama={interiorPanorama}
              alt={vehicleName}
            />
          ) : (
            <div className="interiorPlaceholder">
              {labels.noInterior}
            </div>
          )}
        </div>
      )}
    </section>
  );
}