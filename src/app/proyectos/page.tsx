import type { Metadata } from "next";
import { ProjectGrid } from "@/components/projects/project-grid";
import { FinalCTA } from "@/components/home/sections";
import { pageMetadata } from "@/lib/seo";
export const metadata: Metadata = pageMetadata(
  "Conceptos de diseño y desarrollo web",
  "Explora conceptos de experiencias web, identidad digital y comercio electrónico de JAIAX Labs. Exploraciones del estudio identificadas como demostraciones.",
  "/proyectos",
);
export default function Projects() {
  return (
    <main id="main" className="inner-main">
      <div className="container section" style={{ paddingTop: 0 }}>
        <div className="page-intro">
          <span className="eyebrow">
            <span className="tiny-line" />
            DISEÑO CON INTENCIÓN
          </span>
          <h1>Ideas que toman forma.</h1>
          <p>
            Una selección de exploraciones visuales. Cada concepto imagina una
            manera distinta de conectar marcas y personas.
          </p>
        </div>
        <ProjectGrid filterable />
        <p className="section-note">
          Conceptos originales de demostración. No son casos de clientes ni
          acreditan resultados comerciales. Los casos reales se publicarán tras
          verificar la participación y la autorización.
        </p>
      </div>
      <FinalCTA />
    </main>
  );
}
