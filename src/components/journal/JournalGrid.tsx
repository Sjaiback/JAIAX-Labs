"use client";
import Link from "@/components/ui/site-link";
import { ArrowUpRight, Search, X } from "lucide-react";
import { useState } from "react";
import { JournalArt } from "./JournalArt";
import type { PostSummary } from "@/data/journal";
export function JournalCard({
  post,
  index = 0,
}: {
  post: PostSummary;
  index?: number;
}) {
  return (
    <Link href={`/blog/${post.slug}`} className="journal-card">
      <div className="journal-cover">
        <JournalArt variant={post.art} />
        <span className="journal-index">0{index + 1}</span>
        <span className="journal-arrow">
          <ArrowUpRight size={21} />
        </span>
      </div>
      <div className="journal-meta">
        <span>{post.category}</span>
        <span>{post.minutes} MIN DE LECTURA</span>
      </div>
      <h3>{post.title}</h3>
      <p>{post.description}</p>
      <span className="journal-read">
        Leer la idea <ArrowUpRight size={15} />
      </span>
    </Link>
  );
}
export function JournalGrid({ posts }: { posts: PostSummary[] }) {
  const [category, setCategory] = useState("Todas las ideas");
  const [query, setQuery] = useState("");
  const normalize = (s: string) =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  const filtered = posts.filter(
    (p) =>
      (category === "Todas las ideas" || p.category === category) &&
      normalize(`${p.title} ${p.description} ${p.category}`).includes(
        normalize(query),
      ),
  );
  return (
    <>
      <div className="journal-toolbar">
        <div
          className="filters"
          role="group"
          aria-label="Filtrar artículos por tema"
        >
          {["Todas las ideas", ...new Set(posts.map((p) => p.category))].map(
            (c) => (
              <button
                key={c}
                aria-pressed={category === c}
                className={category === c ? "selected" : ""}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ),
          )}
        </div>
        <div className="journal-search">
          <Search size={15} />
          <span className="sr-only">Buscar en el blog</span>
          <input
            aria-label="Buscar en el blog"
            type="search"
            placeholder="¿Qué quieres explorar?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button aria-label="Limpiar búsqueda" onClick={() => setQuery("")}>
              <X size={14} />
            </button>
          )}
        </div>
      </div>
      <p className="journal-count" role="status">
        {filtered.length}{" "}
        {filtered.length === 1 ? "idea para explorar" : "ideas para explorar"}
      </p>
      <div className="journal-grid">
        {filtered.map((post, i) => (
          <JournalCard key={post.slug} post={post} index={i} />
        ))}
      </div>
      {!filtered.length && (
        <div className="journal-empty">
          <span className="eyebrow">UN NUEVO PUNTO DE PARTIDA</span>
          <h2>Todavía no hay una idea con ese nombre.</h2>
          <p>Prueba otro término o explora todos los temas.</p>
          <button
            className="button button-outline"
            onClick={() => {
              setQuery("");
              setCategory("Todas las ideas");
            }}
          >
            Ver todas las ideas
            <ArrowUpRight size={16} />
          </button>
        </div>
      )}
    </>
  );
}
