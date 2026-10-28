import type { MetadataRoute } from "next";
import { site, publicProjects } from "@/data/site";
import { journalPosts } from "@/data/journal";
import { servicePages } from "@/data/service-pages";
import { canIndex } from "@/lib/seo";
import { offerPath } from "@/data/pricing";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!canIndex) return [];
  return [
    "",
    "/proyectos",
    "/contacto",
    offerPath,
    "/blog",
    ...journalPosts.map((p) => `/blog/${p.slug}`),
    ...servicePages.map((s) => `/servicios/${s.slug}`),
    ...publicProjects.map((p) => `/proyectos/${p.slug}`),
  ].map((path) => ({
    url: `${site.url}${path}/`,
    changeFrequency: "monthly",
    priority: path ? 0.7 : 1,
  }));
}
