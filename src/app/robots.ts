import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { canIndex } from "@/lib/seo";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: canIndex
      ? { userAgent: "*", allow: "/", disallow: ["/logo"] }
      : { userAgent: "*", disallow: "/" },
    sitemap: canIndex ? `${site.url}/sitemap.xml` : undefined,
  };
}
