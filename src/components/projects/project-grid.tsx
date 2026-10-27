"use client";
import Image from "@/components/ui/site-image";
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
              <article
                className={`project-card ${i === 0 ? "project-card--lead" : ""}`}
                aria-labelledby={`project-${p.id}`}
              >
                <div className="project-cover">
                  <Image
                    src={p.cover}
                    alt={`Vista del concepto digital ${p.name}`}
                    width={1440}
                    height={900}
                    sizes={
                      i === 0
                        ? "(max-width: 800px) 92vw, 63vw"
                        : "(max-width: 800px) 92vw, 37vw"
                    }
                    priority={i === 0}
                  />
                </div>
                <div className="project-copy">
                  <div className="project-meta">
                    <span>0{i + 1} / 03 · {p.category}</span>
                    <h3 id={`project-${p.id}`}>{p.name}</h3>
                  </div>
                  <p>{p.description}</p>
                  <div className="tech-tags" aria-label="Áreas del concepto">
                    {p.technologies.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
      </div>
    </>
  );
}
