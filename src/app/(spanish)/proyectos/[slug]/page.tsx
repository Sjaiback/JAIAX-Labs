import type { Metadata } from "next";
import Image from "@/components/ui/site-image";
import Link from "@/components/ui/site-link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { publicProjects } from "@/data/site";
import { FinalCTA } from "@/components/home/sections";
import { pageMetadata } from "@/lib/seo";
export function generateStaticParams() {
  return publicProjects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = publicProjects.find((p) => p.slug === slug);
  return p
    ? pageMetadata(
        `${p.name} — concepto de diseño web`,
        p.description,
        `/proyectos/${slug}`,
      )
    : { title: "Proyecto no encontrado", robots: { index: false } };
}
export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = publicProjects.find((p) => p.slug === slug);
  if (!p) notFound();
  const next =
    publicProjects[(publicProjects.indexOf(p) + 1) % publicProjects.length];
  return (
    <main id="main" className="inner-main">
      <article className="container">
        <Link href="/proyectos" className="text-link">
          <ArrowLeft size={14} />
          Todos los proyectos
        </Link>
        <div className="page-intro" style={{ marginTop: 35, marginBottom: 25 }}>
          <span className="eyebrow">{p.category} / CONCEPTO DE ESTUDIO</span>
          <h1>{p.name}</h1>
          <p>{p.description}</p>
          <div className="tech-tags">
            {p.technologies.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
        <div className="notice">
          Exploración conceptual creada para esta demo. No corresponde a un
          encargo comercial ni presenta métricas de clientes.
        </div>
        <Image
          className="project-detail-cover"
          src={p.cover}
          width={1400}
          height={1008}
          priority
          alt={`Vista completa del concepto ${p.name}`}
        />
        <div className="detail-columns">
          <div>
            <span className="eyebrow">01 / EL RETO</span>
            <h2>Una oportunidad para explorar.</h2>
            <p>{p.problem}</p>
          </div>
          <div>
            <span className="eyebrow">02 / LA PROPUESTA</span>
            <h2>La idea, hecha experiencia.</h2>
            <p>{p.solution}</p>
          </div>
        </div>
        <div className="detail-gallery">
          <Image
            src={p.cover}
            alt={`Composición editorial de ${p.name}`}
            width={900}
            height={648}
          />
          <div className="gallery-detail">
            <Image
              src={p.cover}
              alt={`Detalle ampliado de dirección artística de ${p.name}`}
              width={900}
              height={648}
            />
          </div>
        </div>
        <div className="detail-columns">
          <div>
            <span className="eyebrow">03 / RESULTADOS</span>
            <h2>
              {p.results.length
                ? "Resultados verificables."
                : "Un concepto abierto a posibilidades."}
            </h2>
            <p>
              {p.results.length
                ? p.results.join(" ")
                : "Al tratarse de una exploración, no existen métricas comerciales ni resultados de producción que publicar."}
            </p>
          </div>
          <div style={{ alignSelf: "center" }}>
            <Link
              href={`/proyectos/${next.slug}`}
              className="button button-outline"
            >
              Siguiente concepto: {next.name}
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </article>
      <FinalCTA />
    </main>
  );
}
