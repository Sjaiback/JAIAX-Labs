"use client";
import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
export function ArticleTools({
  sections,
}: {
  sections: { id: string; title: string }[];
}) {
  const [active, setActive] = useState(sections[0]?.id || "");
  const [message, setMessage] = useState("");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-15% 0px -60% 0px" },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);
  return (
    <aside className="article-tools">
      <nav aria-label="En este artículo">
        <span className="eyebrow">EN ESTA IDEA</span>
        <ol>
          {sections.map((s, i) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={active === s.id ? "location" : undefined}
              >
                <span>0{i + 1}</span>
                {s.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <button
        className="article-share"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(
              `${location.origin}${location.pathname}`,
            );
            setMessage("Enlace copiado.");
          } catch {
            setMessage(
              "No se pudo copiar. Puedes compartir la URL de tu navegador.",
            );
          }
        }}
      >
        {message === "Enlace copiado." ? (
          <Check size={14} />
        ) : (
          <Copy size={14} />
        )}
        Copiar enlace
      </button>
      <p className="share-status" role="status">
        {message}
      </p>
    </aside>
  );
}
