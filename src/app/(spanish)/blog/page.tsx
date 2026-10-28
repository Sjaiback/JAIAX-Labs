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
        <span className="eyebrow">
          <span className="tiny-line" />
          JAIAX JOURNAL / DESDE PERÚ
        </span>
        <h1>
          Ideas que abren
          <br />
          <span>nuevas posibilidades.</span>
        </h1>
        <div className="journal-intro-bottom">
          <p>
            Desarrollo web, automatización y estrategia digital.
            <br />
            {" "}
            Una mirada clara a las decisiones que hacen avanzar tu negocio.
          </p>
          <span className="journal-edition">
            VOL. 01 — EL PUNTO DE PARTIDA
            <br />
            PENSAR. CONSTRUIR. COMPARTIR.
          </span>
        </div>
      </div>
      <JournalGrid posts={postSummaries} />
    </main>
  );
}
