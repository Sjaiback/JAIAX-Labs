import { notFound } from "next/navigation";
import Link from "@/components/ui/site-link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { journalPosts, postSummaries, publishedDate } from "@/data/journal";
import { site } from "@/data/site";
import { servicePages } from "@/data/service-pages";
import Image from "@/components/ui/site-image";
import { ArticleTools } from "@/components/journal/ArticleTools";
import { ArticlePlayground } from "@/components/journal/ArticlePlayground";
import { articleExperiences } from "@/data/article-experiences";
import { JournalCard } from "@/components/journal/JournalGrid";
import { JsonLd, breadcrumbs, pageMetadata } from "@/lib/seo";
import { assetPath } from "@/lib/paths";
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
    p.image.src,
  );
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      images: [{ url: `${site.url}${p.image.src}`, width: p.image.width, height: p.image.height, alt: p.image.alt }],
      publishedTime: `${p.date}T12:00:00-05:00`,
      modifiedTime: `${p.updated || p.date}T12:00:00-05:00`,
      authors: [`${site.url}/estudio/`],
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
  const service = servicePages.find((item) => item.slug === p.relatedService)!;
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
            dateModified: `${p.updated || p.date}T12:00:00-05:00`,
            inLanguage: "es-PE",
            mainEntityOfPage: `${site.url}/blog/${p.slug}`,
            author: {
              "@type": "Organization",
              name: site.name,
              url: `${site.url}/estudio/`,
            },
            publisher: { "@id": `${site.url}/#organization` },
            image: [`${site.url}${p.image.src}`],
          }}
        />
        <JsonLd
          data={breadcrumbs([
            { name: "Inicio", path: "/es/" },
            { name: "Blog", path: "/blog" },
            { name: p.title, path: `/blog/${p.slug}` },
          ])}
        />
        <Link className="text-link" href="/blog">
          <ArrowLeft size={15} />
          Volver a las ideas
        </Link>
        <header className="article-header">

          <h1>{p.title}</h1>
          <p>{p.takeaway}</p>
          <a className="text-link article-try-link" href="#ejemplo-interactivo">Probar el ejemplo interactivo <ArrowUpRight size={15} aria-hidden="true" /></a>
          <div className="article-byline">
            <span>POR JAIAX LABS</span>
            <time dateTime={p.date}>{publishedDate(p.date)}</time>
            {p.updated && <span>Actualizado el <time dateTime={p.updated}>{publishedDate(p.updated)}</time></span>}
            <span>{p.minutes} min de lectura</span>
          </div>
        </header>
        <div className="article-visual">
          <picture>
            <source media="(max-width: 700px)" srcSet={assetPath(p.image.thumbnail)} />
            <Image className="journal-illustration" src={p.image.src} alt={p.image.alt} width={p.image.width} height={p.image.height} loading="eager" fetchPriority="high" />
          </picture>
        </div>
        <div className="article-layout">
          <ArticleTools
            sections={[{ id: "ejemplo-interactivo", title: articleExperiences[p.experience].title }, ...p.sections.map((s) => ({ id: s.id, title: s.title }))]}
          />
          <article className="article-body" data-reading-body>
            <ArticlePlayground kind={p.experience} />
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
                {s.links && <ul>{s.links.map((link) => (
                  <li key={link.href}><Link className="text-link" href={link.href}>{link.label}<ArrowUpRight size={14} /></Link></li>
                ))}</ul>}
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

              <h2>{service.id === "web" ? "¿Necesitas una web para tu negocio?" : "¿Quieres automatizar un proceso?"}</h2>
              <p>
                {service.intro}
              </p>
              <Link
                href={`/servicios/${p.relatedService}`}
                className="button button-gold"
              >
                {service.id === "web" ? "Ver el servicio de desarrollo web" : "Ver el servicio de automatización con n8n"}
                <ArrowUpRight size={16} />
              </Link>
              <p><Link className="text-link" href={`/contacto?tipo=${encodeURIComponent(service.type)}`}>Cotizar por WhatsApp <ArrowUpRight size={14} /></Link></p>
            </div>
          </article>
        </div>
        <section className="section">
          <div className="section-row">

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
