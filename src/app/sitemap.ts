import type { MetadataRoute } from "next";
import { site, publicProjects } from "@/data/site";
import { journalPosts } from "@/data/journal";
import { servicePages } from "@/data/service-pages";
import { canIndex } from "@/lib/seo";
import { offerPath } from "@/data/pricing";
import { locales, internationalLocales, languageAlternates } from "@/i18n/config";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!canIndex) return [];
  return [
    ...locales.map(locale => `/${locale}`),
    ...locales.flatMap(locale => ["planes", "estudio", "sistemas"].map(section => locale === "es" ? `/${section}` : `/${locale}/${section}`)),
    "/proyectos",
    "/contacto",
    offerPath,
    "/blog",
    ...journalPosts.map((p) => `/blog/${p.slug}`),
    ...servicePages.map((s) => `/servicios/${s.slug}`),
    ...internationalLocales.flatMap(locale => servicePages.map(service => `/${locale}/servicios/${service.slug}`)),
    ...publicProjects.map((p) => `/proyectos/${p.slug}`),
  ].map((path) => ({
    url: `${site.url}${path}/`,
    changeFrequency: "monthly",
    priority: locales.some(locale => path === `/${locale}`) ? 1 : 0.7,
    alternates: { languages: languageAlternates(`${path}/`) },
  }));
}
