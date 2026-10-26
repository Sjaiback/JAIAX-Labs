import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { canIndex } from "@/lib/seo";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: canIndex
      ? { userAgent: "*", allow: "/", disallow: ["/admin", "/logo"] }
      : { userAgent: "*", disallow: "/" },
    sitemap: canIndex ? `${site.url}/sitemap.xml` : undefined,
  };
}
