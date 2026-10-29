import { JournalGrid } from "@/components/journal/JournalGrid";
import { postSummaries } from "@/data/journal";
import { site } from "@/data/site";
import { JsonLd, pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Blog de desarrollo web y automatización en Perú",
  "Guías de JAIAX Labs sobre desarrollo web, automatización con n8n y estrategia digital. Ideas útiles para decidir el siguiente paso de tu negocio.",
  "/blog",
);
export default function Blog() {
  return (
    <main id="main" className="inner-main container journal-index">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Ideas en órbita — JAIAX Labs",
          url: `${site.url}/blog`,
          inLanguage: "es-PE",
          publisher: { "@id": `${site.url}/#organization` },
          blogPost: postSummaries.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: `${site.url}/blog/${p.slug}`,
          })),
        }}
      />
      <div className="journal-intro">

        <h1>
          Ideas para hacer
          <br />
          <span>crecer tu negocio.</span>
        </h1>
        <div className="journal-intro-bottom">
          <p>
            Cómo una web ayuda a vender. Cuándo pasar de Excel a un sistema.
            <br />
            {" "}
            Guías prácticas para decidir tu siguiente paso.
          </p>

        </div>
      </div>
      <JournalGrid posts={postSummaries} />
    </main>
  );
}
