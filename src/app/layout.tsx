import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const SITE_URL = "https://www.imfp.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "IMFP – Institut des Métiers et de la Formation Professionnelle | Dakar",
    template: "%s | IMFP Dakar",
  },
  description:
    "L'IMFP vous prépare aux métiers de demain à Dakar. BTS, Licences Professionnelles et Masters Pro accrédités ANAQ-Sup. Inscriptions ouvertes — Prenez rendez-vous dès aujourd'hui.",
  keywords: [
    "IMFP", "formation professionnelle Dakar", "BTS Sénégal", "Licence Pro Dakar",
    "Master Pro Sénégal", "ANAQ-Sup", "école supérieure Dakar", "études supérieures Sénégal",
    "Institut des Métiers", "formation accréditée", "Sacré-Cœur Dakar",
  ],
  authors: [{ name: "IMFP", url: SITE_URL }],
  creator: "IMFP",
  publisher: "Institut des Métiers et de la Formation Professionnelle",

  alternates: {
    canonical: "/",
    languages: { "fr-SN": "/" },
  },

  openGraph: {
    title: "IMFP – Institut des Métiers et de la Formation Professionnelle | Dakar",
    description:
      "Formations BTS, Licences Pro et Masters Pro à Dakar, accrédités ANAQ-Sup. Rejoignez 2 000+ diplômés et construisez votre avenir.",
    url: SITE_URL,
    siteName: "IMFP Dakar",
    locale: "fr_SN",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "IMFP – Institut des Métiers et de la Formation Professionnelle, Dakar",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "IMFP – Formation Professionnelle à Dakar",
    description:
      "BTS, Licences Pro, Masters Pro accrédités ANAQ-Sup. Sacré-Cœur 2, Dakar. Prenez rendez-vous !",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  verification: {
    google: "your-google-verification-code",
  },

  category: "education",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-screen bg-white text-[#0A1F44] antialiased">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
