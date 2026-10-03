import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AutoShowroom | Premium Automotive Experience",
    template: "%s | AutoShowroom",
  },
  description:
    "Modern bilingual automotive showroom demo featuring interactive 360° exterior views, immersive interior panoramas, vehicle details, test drive requests and financing enquiries.",
  applicationName: "AutoShowroom",
  keywords: [
    "AutoShowroom",
    "automotive showroom",
    "car dealership demo",
    "360 car viewer",
    "virtual showroom",
    "Next.js",
  ],
  authors: [{ name: "Mohammed Alshaheri" }],
  creator: "Mohammed Alshaheri",
  openGraph: {
    type: "website",
    title: "AutoShowroom | Premium Automotive Experience",
    description:
      "Modern bilingual automotive showroom demo with interactive 360° vehicle experiences.",
    siteName: "AutoShowroom",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${manrope.variable} ${spaceGrotesk.variable}`}>
        {children}
      </body>
    </html>
  );
}