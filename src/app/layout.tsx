import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { site } from "@/data/site";
import "./globals.css";
import "./experience.css";
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
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" data-scroll-behavior="smooth">
      <body className={geist.variable}>
        <noscript>
          <style>{`.reveal-item{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <Header />
        <ExperienceMotion />
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
              },
              {
                "@type": "WebSite",
                "@id": `${site.url}/#website`,
                url: site.url,
                name: site.name,
                inLanguage: "es-PE",
                publisher: { "@id": `${site.url}/#organization` },
              },
            ],
          }}
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}
