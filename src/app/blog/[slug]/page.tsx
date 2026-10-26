import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { journalPosts, postSummaries, publishedDate } from "@/data/journal";
import { site } from "@/data/site";
import { JournalArt } from "@/components/journal/JournalArt";
import { ArticleTools } from "@/components/journal/ArticleTools";
import { JournalCard } from "@/components/journal/JournalGrid";
import { JsonLd, breadcrumbs, pageMetadata } from "@/lib/seo";
export function generateStaticParams() {
  return journalPosts.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = journalPosts.find((p) => p.slug === slug);
  if (!p) return { title: "Artículo no encontrado", robots: { index: false } };
  const base = pageMetadata(
    p.title,
    p.description,
    `/blog/${p.slug}`,
    "article",
    `/blog/${p.slug}/opengraph-image`,
  );
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      publishedTime: `${p.date}T12:00:00-05:00`,
      modifiedTime: `${p.date}T12:00:00-05:00`,
      authors: [`${site.url}/#nosotros`],
      section: p.category,
    },
  };
}
export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = journalPosts.find((p) => p.slug === slug);
  if (!p) notFound();
  return (
    <main id="main" className="inner-main article-page">
      <div className="container">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: p.title,
            description: p.description,
            datePublished: `${p.date}T12:00:00-05:00`,
            dateModified: `${p.date}T12:00:00-05:00`,
            inLanguage: "es-PE",
            mainEntityOfPage: `${site.url}/blog/${p.slug}`,
            author: {
              "@type": "Organization",
              name: site.name,
              url: `${site.url}/#nosotros`,
            },
            publisher: { "@id": `${site.url}/#organization` },
            image: [`${site.url}/blog/${p.slug}/opengraph-image`],
          }}
        />
        <JsonLd
          data={breadcrumbs([
            { name: "Inicio", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: p.title, path: `/blog/${p.slug}` },
          ])}
        />
        <Link className="text-link" href="/blog">
          <ArrowLeft size={15} />
          Volver a las ideas
        </Link>
        <header className="article-header">
          <span className="eyebrow">{p.category} / JAIAX JOURNAL</span>
          <h1>{p.title}</h1>
          <p>{p.description}</p>
          <div className="article-byline">
            <span>POR JAIAX LABS</span>
            <time dateTime={p.date}>{publishedDate(p.date)}</time>
            <span>{p.minutes} min de lectura</span>
          </div>
        </header>
        <div className="article-visual">
          <JournalArt variant={p.art} />
        </div>
        <div className="article-layout">
          <ArticleTools
            sections={p.sections.map((s) => ({ id: s.id, title: s.title }))}
          />
          <article className="article-body" data-reading-body>
            <div className="article-takeaway">
              <span className="eyebrow">LA IDEA CLAVE</span>
              <p>{p.takeaway}</p>
            </div>
            {p.sections.map((s, i) => (
              <section id={s.id} key={s.id}>
                <span className="article-section-number">0{i + 1} /</span>
                <h2>{s.title}</h2>
                {s.paragraphs.map((text) => (
                  <p key={text.slice(0, 50)}>{text}</p>
                ))}
                {s.points && (
                  <ul>
                    {s.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            {p.sources.length > 0 && (
              <section className="article-sources">
                <h2>Para seguir explorando</h2>
                <ul>
                  {p.sources.map((s) => (
                    <li key={s.url}>
                      <a href={s.url} target="_blank" rel="noopener noreferrer">
                        {s.title}
                        <ArrowUpRight size={14} />
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            <div className="article-next-step">
              <span className="eyebrow">DE LA IDEA AL SIGUIENTE PASO</span>
              <h2>¿Lo llevamos a tu negocio?</h2>
              <p>
                Exploremos el alcance de una solución para lo que necesitas.
              </p>
              <Link
                href={`/servicios/${p.relatedService}`}
                className="button button-gold"
              >
                Conocer el servicio
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </article>
        </div>
        <section className="section">
          <div className="section-row">
            <span className="eyebrow">SIGUE LA ÓRBITA</span>
            <Link href="/blog" className="text-link">
              Todas las ideas
              <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="journal-grid">
            {postSummaries
              .filter((item) => item.slug !== slug)
              .map((item, i) => (
                <JournalCard key={item.slug} post={item} index={i} />
              ))}
          </div>
        </section>
      </div>
    </main>
  );
}
