import Link from "next/link";
import { Check, ArrowUpRight, ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { servicePages } from "@/data/service-pages";
import { journalPosts } from "@/data/journal";
import { site } from "@/data/site";
import { breadcrumbs, JsonLd, pageMetadata } from "@/lib/seo";
import { JournalArt } from "@/components/journal/JournalArt";
import { SectionTitle } from "@/components/ui";
export function generateStaticParams() {
  return servicePages.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = servicePages.find((s) => s.slug === slug);
  return s
    ? pageMetadata(s.title, s.description, `/servicios/${slug}`)
    : { title: "Servicio no encontrado", robots: { index: false } };
}
export default async function Service({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = servicePages.find((s) => s.slug === slug);
  if (!s) notFound();
  const article = journalPosts.find((p) => p.slug === s.article)!;
  return (
    <main id="main" className="inner-main container service-page">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.title,
          description: s.description,
          url: `${site.url}/servicios/${s.slug}`,
          provider: { "@id": `${site.url}/#organization` },
          areaServed: { "@type": "Country", name: "Perú" },
        }}
      />
      <JsonLd
        data={breadcrumbs([
          { name: "Inicio", path: "/" },
          { name: "Servicios", path: "/#servicios" },
          { name: s.title, path: `/servicios/${s.slug}` },
        ])}
      />
      <Link className="text-link" href="/#servicios">
        <ArrowLeft size={14} />
        Todos los servicios
      </Link>
      <div className="service-page-hero">
        <div>
          <span className="eyebrow">{s.eyebrow}</span>
          <h1>{s.headline}</h1>
          <p>{s.intro}</p>
          <Link
            href={`/contacto?tipo=${encodeURIComponent(s.type)}`}
            className="button button-gold"
          >
            Exploremos tu proyecto
            <ArrowUpRight size={16} />
          </Link>
        </div>
        <JournalArt variant={s.art} />
      </div>
      <section className="section service-deliverables">
        <SectionTitle
          eyebrow="UN ALCANCE QUE SE ENTIENDE"
          title="De la conversación a lo concreto."
          description={s.description}
        />
        <ul>
          {s.deliverables.map((d, i) => (
            <li key={d}>
              <span>0{i + 1}</span>
              <p>{d}</p>
              <Check size={16} />
            </li>
          ))}
        </ul>
      </section>
      <div className="notice">{s.considerations}</div>
      <section className="section faq-layout">
        <SectionTitle
          eyebrow="ANTES DE CONSTRUIR"
          title="Con claridad desde el inicio."
        />
        <div className="service-questions">
          {s.questions.map((q) => (
            <details key={q.q}>
              <summary>
                {q.q}
                <span aria-hidden>+</span>
              </summary>
              <p>{q.a}</p>
            </details>
          ))}
        </div>
      </section>
      <div className="service-reading">
        <div>
          <span className="eyebrow">UNA IDEA PARA SEGUIR EXPLORANDO</span>
          <h2>{article.title}</h2>
        </div>
        <Link href={`/blog/${article.slug}`} className="button button-outline">
          Leer la guía
          <ArrowUpRight size={16} />
        </Link>
      </div>
      <section className="service-final">
        <h2>El siguiente paso empieza contigo.</h2>
        <Link
          href={`/contacto?tipo=${encodeURIComponent(s.type)}`}
          className="button button-gold"
        >
          Preparar una cotización
          <ArrowUpRight size={16} />
        </Link>
      </section>
    </main>
  );
}
