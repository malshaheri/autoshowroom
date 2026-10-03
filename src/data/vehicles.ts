export type Vehicle = {
  exterior360?: string[];
  slug: string;
  name: string;
  price: string;
  year: number;
  mileage: string;
  transmission: string;
  fuel: string;
  power: string;
  color: string;
  image: string;
  gallery: string[];
};

export const vehicles: Vehicle[] = [
  {
    slug: "mercedes-benz-c-class",
    name: "Mercedes-Benz C-Class",
    price: "€34,900",
    year: 2023,
    mileage: "18,500 km",
    transmission: "Automatic",
    fuel: "Petrol",
    power: "204 PS",
    color: "Graphite Grey",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1600&q=90",
    exterior360: Array.from(
      { length: 36 },
      (_, index) =>
        `/vehicles/mercedes-c-class/360/exterior/frame-${String(index + 1).padStart(2, "0")}.webp`,
    ),
    gallery: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=1600&q=90",
    ],
  },
  {
    slug: "bmw-3-series",
    name: "BMW 3 Series",
    price: "€32,500",
    year: 2022,
    mileage: "24,000 km",
    transmission: "Automatic",
    fuel: "Diesel",
    power: "190 PS",
    color: "Alpine White",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1600&q=90",
    exterior360: Array.from(
      { length: 36 },
      (_, index) =>
        `/vehicles/mercedes-c-class/360/exterior/frame-${String(index + 1).padStart(2, "0")}.webp`,
    ),
    gallery: [],
  },
  {
    slug: "audi-a5-sportback",
    name: "Audi A5 Sportback",
    price: "€36,900",
    year: 2023,
    mileage: "16,200 km",
    transmission: "Automatic",
    fuel: "Petrol",
    power: "265 PS",
    color: "Mythos Black",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1600&q=90",
    exterior360: Array.from(
      { length: 36 },
      (_, index) =>
        `/vehicles/mercedes-c-class/360/exterior/frame-${String(index + 1).padStart(2, "0")}.webp`,
    ),
    gallery: [],
  },
];

export function getVehicleBySlug(slug: string) {
  return vehicles.find((vehicle) => vehicle.slug === slug);
}