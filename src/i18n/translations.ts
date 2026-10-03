export type Locale = "de" | "en";

export const locales: Locale[] = ["de", "en"];

export const translations = {
  de: {
    nav: {
      cars: "Fahrzeuge",
      showroom: "360° Showroom",
      services: "Service",
      contact: "Kontakt",
      viewCars: "Fahrzeuge ansehen",
    },
    hero: {
      eyebrow: "Premium Automotive Experience",
      titleStart: "Finde ein Auto, das",
      titleHighlight: "zu dir passt.",
      description:
        "Entdecke hochwertige Fahrzeuge, detaillierte Informationen und immersive 360°-Ansichten, bevor du den Showroom besuchst.",
      browse: "Fahrzeuge ansehen",
      explore: "360° entdecken",
      vehicles: "Fahrzeuge",
      virtualView: "Virtuelle Ansicht",
      experience: "Demo Experience",
      premiumVehicle: "Premium Fahrzeug",
      preview: "Hero-Bild / 360° Vorschau",
    },
    inventory: {
      eyebrow: "Ausgewählte Fahrzeuge",
      title: "Aktuelle Fahrzeuge",
      description:
        "Eine Auswahl an Demo-Fahrzeugen für unser modernes digitales Showroom-Erlebnis.",
      vehicleImage: "Fahrzeugbild",
      details: "Details ansehen",
    },
    virtual: {
      eyebrow: "Virtueller Showroom",
      title: "Entdecke das Fahrzeug, bevor du uns besuchst.",
      description:
        "Bewege das Fahrzeug nach links oder rechts für eine vollständige 360°-Außenansicht und entdecke anschließend den Innenraum in einer immersiven Panoramaansicht.",
      button: "360° Experience starten",
      viewer: "Interaktive Fahrzeugansicht",
      drag: "Nach links oder rechts ziehen",
    },
    services: {
      eyebrow: "Alles an einem Ort",
      title: "Mehr als nur Fahrzeugangebote.",
      financing: "Finanzierung",
      financingText:
        "Flexible Finanzierungsmöglichkeiten passend zum Kunden.",
      tradeIn: "Inzahlungnahme",
      tradeInText:
        "Lass dein aktuelles Fahrzeug schnell und unkompliziert bewerten.",
      testDrive: "Probefahrt",
      testDriveText:
        "Sende direkt über die Fahrzeugseite eine Probefahrt-Anfrage.",
    },
    cta: {
      eyebrow: "Bereit loszulegen?",
      title: "Finde dein nächstes Fahrzeug.",
      button: "Fahrzeuge ansehen",
    },
  },

  en: {
    nav: {
      cars: "Cars",
      showroom: "360° Showroom",
      services: "Services",
      contact: "Contact",
      viewCars: "View Cars",
    },
    hero: {
      eyebrow: "Premium Automotive Experience",
      titleStart: "Find a car that",
      titleHighlight: "feels right.",
      description:
        "Explore premium vehicles, detailed specifications and immersive 360° views before you ever step into the showroom.",
      browse: "Browse Cars",
      explore: "Explore 360°",
      vehicles: "Vehicles",
      virtualView: "Virtual View",
      experience: "Demo Experience",
      premiumVehicle: "Premium Vehicle",
      preview: "Hero image / 360° preview",
    },
    inventory: {
      eyebrow: "Selected Vehicles",
      title: "Featured Cars",
      description:
        "A small selection of demo vehicles for the reusable showroom experience.",
      vehicleImage: "Vehicle image",
      details: "View Details",
    },
    virtual: {
      eyebrow: "Virtual Showroom",
      title: "Explore the car before you visit.",
      description:
        "Drag the vehicle left or right for a complete exterior 360° view, then step inside with an immersive panoramic interior experience.",
      button: "Try the 360° Experience",
      viewer: "Interactive vehicle viewer",
      drag: "Drag left or right",
    },
    services: {
      eyebrow: "Everything in one place",
      title: "More than just vehicle listings.",
      financing: "Financing",
      financingText:
        "Flexible financing options tailored to the customer.",
      tradeIn: "Trade-In",
      tradeInText:
        "Request an evaluation for your current vehicle.",
      testDrive: "Test Drive",
      testDriveText:
        "Send a quick test-drive request directly from the vehicle page.",
    },
    cta: {
      eyebrow: "Ready to explore?",
      title: "Find your next vehicle.",
      button: "Browse Inventory",
    },
  },
} as const;