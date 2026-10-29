import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { site } from "@/data/site";
import "@/app/globals.css";
import "@/app/experience.css";
import "@/components/home/focused.css";
import "@/components/home/showroom.css";
import "@/components/home/home-sections.css";
import "@/components/i18n/language.css";
import { LanguageEntry } from "@/components/i18n/LanguageEntry";
import { copy } from "@/i18n/copy";
import { international } from "@/i18n/international";
import { ogLocales, type Locale } from "@/i18n/config";
import "@/components/pricing/pricing.css";
import { ExperienceMotion } from "@/components/motion/ExperienceMotion";
import { canIndex, JsonLd } from "@/lib/seo";
const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "JAIAX Labs — Tecnología con propósito",
    template: "%s | JAIAX Labs",
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "es_PE",
    siteName: site.name,
    title: "JAIAX Labs — Creamos tecnología. Impulsamos negocios.",
    description: site.description,
    images: [{ url: `${site.url}/social/site.png`, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION || undefined },
  robots: {
    index: canIndex,
    follow: true,
    googleBot: { index: canIndex, follow: true, "max-image-preview": "large" },
  },
};
export const viewport: Viewport = { themeColor: "#050505" };
export function rootMetadata(locale: Locale): Metadata {
  const content = copy[locale];
  return { ...metadata, description: locale === "es" ? site.description : international[locale].description, openGraph: { ...metadata.openGraph, locale: ogLocales[locale], title: `JAIAX Labs — ${content.hero[1]} ${content.hero[2]}` } };
}
export function RootShell({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <head><LanguageEntry /></head>
      <body className={geist.variable}>
        <noscript>
          <style>{`.reveal-item{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <Header locale={locale} />
        <ExperienceMotion backLabel={{ es: "Volver al inicio de la página", en: "Back to top", de: "Zurück zum Seitenanfang", it: "Torna all'inizio della pagina" }[locale]} />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": `${site.url}/#organization`,
                name: site.name,
                url: site.url,
                logo: `${site.url}/images/jaiax-logo.svg`,
                description: site.description,
                telephone: `+${site.whatsapp}`,
                email: site.email,
                areaServed: { "@type": "Country", name: "Perú" },
                contactPoint: {
                  "@type": "ContactPoint",
                  telephone: `+${site.whatsapp}`,
                email: site.email,
                  contactType: "sales",
                  availableLanguage: ["es", "en", "de", "it"],
                },
              },
              {
                "@type": "WebSite",
                "@id": `${site.url}/#website`,
                url: site.url,
                name: site.name,
                inLanguage: locale,
                publisher: { "@id": `${site.url}/#organization` },
              },
            ],
          }}
        />
        {children}
        <Footer locale={locale} />
      </body>
    </html>
  );
}
