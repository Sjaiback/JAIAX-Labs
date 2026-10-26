"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { publicProjects } from "@/data/site";
import { Reveal } from "@/components/ui";
export function ProjectGrid({ filterable = false }: { filterable?: boolean }) {
  const [filter, setFilter] = useState("Todos");
  const categories = ["Todos", ...publicProjects.map((p) => p.category)];
  return (
    <>
      {filterable && (
        <div className="filters" role="group" aria-label="Filtrar proyectos">
          {categories.map((c) => (
            <button
              key={c}
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              className={filter === c ? "selected" : ""}
            >
              {c}
            </button>
          ))}
        </div>
      )}
      <div className="project-grid">
        {publicProjects
          .filter((p) => filter === "Todos" || p.category === filter)
          .map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <Link className="project-card" href={`/proyectos/${p.slug}`}>
                <div className="project-cover">
                  <Image
                    src={p.cover}
                    alt={`Exploración visual de ${p.name}`}
                    width={900}
                    height={650}
                    sizes="(max-width: 700px) 90vw, 33vw"
                    loading="eager"
                  />
                  <span className="concept-badge">CONCEPTO DE ESTUDIO</span>
                  <span className="project-arrow">
                    <ArrowUpRight size={23} />
                  </span>
                </div>
                <div className="project-meta">
                  <h3>{p.name}</h3>
                  <span>{p.category}</span>
                </div>
                <p>{p.description}</p>
                <div className="tech-tags">
                  {p.technologies.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </Link>
            </Reveal>
          ))}
      </div>
    </>
  );
}
