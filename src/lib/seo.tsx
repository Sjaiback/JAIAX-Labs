import type { Metadata } from "next";
import { site } from "@/data/site";
import { isIndexableSite } from "./publication";

export const canIndex = isIndexableSite(
  site.url,
  process.env.NEXT_PUBLIC_INDEXABLE === "true",
);
export function pageMetadata(
  title: string,
  description: string,
  path: string,
  type: "website" | "article" = "website",
  image = "/social/site.png",
): Metadata {
  return {
    title: { absolute: `${title} | JAIAX Labs` },
    description,
    alternates: { canonical: `${site.url}${path}` },
    openGraph: {
      type,
      title,
      description,
      url: `${site.url}${path}`,
      locale: "es_PE",
      siteName: site.name,
      images: [
        {
          url: `${site.url}${image}`,
          width: 1200,
          height: 630,
          alt: "JAIAX Labs — Desarrollo web, software y automatización en Perú",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${site.url}${image}`],
    },
  };
}
export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
