import Link from "@/components/ui/site-link";
import { Check, ArrowUpRight, ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { servicePages } from "@/data/service-pages";
import { journalPosts } from "@/data/journal";
import { site } from "@/data/site";
import { basicPlan, plans } from "@/data/pricing";
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
          { name: "Inicio", path: "/es/" },
          { name: "Servicios", path: "/es/#servicios" },
          { name: s.title, path: `/servicios/${s.slug}` },
        ])}
      />
      <Link className="text-link" href="/es/#servicios">
        <ArrowLeft size={14} />
        Todos los servicios
      </Link>
      <div className="service-page-hero">
        <div>

          <h1>{s.headline}</h1>
          <p>{s.intro}</p>
          <Link
            href={`/contacto?tipo=${encodeURIComponent(s.type)}`}
            className="button button-gold"
          >
            Cotizar este servicio
            <ArrowUpRight size={16} />
          </Link>
          {s.id === "web" && <Link href="/planes/" className="text-link service-plans-link">Ver planes desde US$ {basicPlan.price} <ArrowUpRight size={16}/></Link>}
        </div>
        <JournalArt variant={s.art} />
      </div>
      {s.id === "web" && <section className="section" aria-labelledby="web-plans-title">
        <h2 id="web-plans-title">¿Qué tipo de web necesita tu negocio?</h2>
        <ul>{plans.map((plan) => <li key={plan.id}>
          <p><strong>{plan.name} — {plan.id === "avanzada" ? plan.price : `US$ ${plan.price}`}</strong>: {plan.features[0]}. {plan.billing}.</p>
        </li>)}</ul>
        <p>Dominio, hosting y mantenimiento por separado. El alcance y las fechas se confirman en la propuesta.</p>
        <Link className="text-link" href="/planes/">Comparar características de los planes <ArrowUpRight size={16} /></Link>
        <p><Link className="text-link" href="/proyectos/">Explorar los proyectos conceptuales y su alcance <ArrowUpRight size={16} /></Link></p>
      </section>}
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
      <details className="focus-faq"><summary>Alcance y condiciones</summary><p>{s.considerations}</p></details>
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

          <h2>{article.title}</h2>
        </div>
        <Link href={`/blog/${article.slug}`} className="button button-outline">
          {s.id === "web" || s.id === "ecommerce" ? "Consultar precios y costos de una web" : "Qué es n8n y para qué sirve"}
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
