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
    default: "Kuk İnşaat — İnşaat, Proje & Mühendislik | Kocaeli",
    template: "%s | Kuk İnşaat",
  },
  description:
    "Kuk İnşaat, Kocaeli Başiskele merkezli bir inşaat ve mühendislik firmasıdır. Konut, ticari ve karma kullanımlı yapıların projelendirme ve inşaat süreçlerini tek elden yürütür.",
  keywords: ["Kuk İnşaat", "KUK Proje Mühendislik", "inşaat Kocaeli", "Başiskele inşaat", "mühendislik", "proje geliştirme"],
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Kuk İnşaat",
    url: siteUrl,
    title: "Kuk İnşaat — Kaliteyle Kurulur",
    description:
      "Kocaeli Başiskele merkezli inşaat ve mühendislik firması. Konut, ticari ve karma kullanımlı yapıların projelendirme ve inşaat süreçleri.",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: "Kuk İnşaat",
  legalName: site.legalName,
  slogan: site.slogan,
  url: siteUrl,
  email: site.contact.email,
  description: site.description,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ovacık Mah. Çuhane Cad. No:176",
    addressLocality: "Başiskele",
    addressRegion: "Kocaeli",
    addressCountry: "TR",
  },
  sameAs: site.social.map((s) => s.href),
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
      </body>
    </html>
  );
}