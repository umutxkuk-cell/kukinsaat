import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Intro } from "@/components/layout/Intro";
import { site } from "@/data/site";

const display = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kukinsaat.com";

export const metadata: Metadata = {
  title: {
    default: "Kuk İnşaat | Kocaeli İnşaat ve Mühendislik Firması",
    template: "%s | Kuk İnşaat",
  },
  description:
    "Kocaeli inşaat ve mühendislik firması Kuk İnşaat; konut, ticari ve karma kullanımlı yapıların projelendirme, mühendislik ve inşaat süreçlerini tek elden yürütür. Kaliteyle Kurulur.",
  keywords: [
    "Kuk İnşaat",
    "Kocaeli inşaat firması",
    "Kocaeli inşaat şirketi",
    "Kocaeli mühendislik firması",
    "Kocaeli yapı uygulamaları",
    "inşaat proje yönetimi Kocaeli",
    "teknik danışmanlık Kocaeli",
    "KUK Proje Mühendislik",
  ],
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Kuk İnşaat",
    url: siteUrl,
    title: "Kuk İnşaat | Kocaeli İnşaat ve Mühendislik Firması",
    description:
      "Kocaeli merkezli inşaat ve mühendislik firması. Konut, ticari ve karma kullanımlı yapıların projelendirme, mühendislik ve inşaat süreçleri — Kaliteyle Kurulur.",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  verification: {
    // Google Search Console site sahipliği doğrulaması (HTML etiketi yöntemi).
    google: "googledc53ece4919de5fe",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "@id": `${siteUrl}/#organization`,
  name: "Kuk İnşaat",
  legalName: site.legalName,
  slogan: site.slogan,
  url: siteUrl,
  email: site.contact.email,
  telephone: site.contact.phone,
  description: site.description,
  logo: `${siteUrl}/brand/kuk-monogram.svg`,
  image: `${siteUrl}/opengraph-image`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ovacık Mah. Çuhane Cad. No:176",
    addressLocality: "Başiskele",
    addressRegion: "Kocaeli",
    postalCode: "41140",
    addressCountry: "TR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 40.725542,
    longitude: 29.9999255,
  },
  hasMap: site.contact.mapsUrl,
  areaServed: { "@type": "AdministrativeArea", name: "Kocaeli" },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "18:00",
  },
  knowsAbout: [
    "İnşaat ve yapı uygulamaları",
    "Mühendislik hizmetleri",
    "Proje geliştirme ve teknik koordinasyon",
    "İnşaat proje yönetimi",
    "Teknik danışmanlık",
  ],
  sameAs: site.social.map((s) => s.href),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "Kuk İnşaat",
  inLanguage: "tr-TR",
  publisher: { "@id": `${siteUrl}/#organization` },
};

const gtagInit = site.gaId
  ? `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${site.gaId}');
`
  : "";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="tr" className={`${display.variable} ${sans.variable}`}>
      <head>
        {/* Google Analytics (gtag.js) — doğrudan head'de, Google'ın beklediği
            standart biçim. Ziyaret ölçümü sayfa açılışında başlar. */}
        {site.gaId ? (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${site.gaId}`}
            />
            <script dangerouslySetInnerHTML={{ __html: gtagInit }} />
          </>
        ) : null}
      </head>
      <body className="bg-bg text-ink antialiased">
        <a href="#main" className="skip-link">
          İçeriğe atla
        </a>
        <div className="grain-overlay" aria-hidden="true" />
        <Intro />
        <Header />
        <main id="main" className="pt-20">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
    </html>
  );
}