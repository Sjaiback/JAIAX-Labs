"use client";
import { useState } from "react";
import Image from "next/image";
import {
  LayoutDashboard,
  FolderKanban,
  Layers,
  CreditCard,
  MessageSquareQuote,
  Inbox,
  FileText,
  Images,
  Settings,
  Search,
  Plus,
  ShieldAlert,
  ArrowUpRight,
  RotateCcw,
} from "lucide-react";
import { projects, services, plans, site } from "@/data/site";
import { basicPlan, offerPath } from "@/data/pricing";
import type { PublicationStatus } from "@/types";
type Module =
  | "Dashboard"
  | "Proyectos"
  | "Servicios"
  | "Precios"
  | "Testimonios"
  | "Solicitudes"
  | "Contenido"
  | "Imágenes"
  | "Configuración"
  | "SEO";
type Row = {
  id: string;
  title: string;
  description: string;
  category: string;
  status: PublicationStatus;
  approved: boolean;
  price: string;
  features: string;
  slug: string;
  image: string;
};
const modules: { name: Module; icon: typeof LayoutDashboard }[] = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Proyectos", icon: FolderKanban },
  { name: "Servicios", icon: Layers },
  { name: "Precios", icon: CreditCard },
  { name: "Testimonios", icon: MessageSquareQuote },
  { name: "Solicitudes", icon: Inbox },
  { name: "Contenido", icon: FileText },
  { name: "Imágenes", icon: Images },
  { name: "Configuración", icon: Settings },
  { name: "SEO", icon: Search },
];
const row = (
  id: string,
  title: string,
  description: string,
  rest: Partial<Row> = {},
): Row => ({
  id,
  title,
  description,
  category: "General",
  status: "borrador",
  approved: false,
  price: "",
  features: "",
  slug: "",
  image: "",
  ...rest,
});
const initial: Record<Module, Row[]> = {
  Dashboard: [],
  Proyectos: projects.map((p) =>
    row(p.id, p.name, p.description, {
      category: p.category,
      status: p.status,
      approved: p.authorized,
      slug: p.slug,
      image: p.cover,
      features: p.technologies.join("\n"),
    }),
  ),
  Servicios: services.map((s) =>
    row(s.id, s.title, s.description, { status: "publicado", approved: true }),
  ),
  Precios: plans.map((p) =>
    row(p.id, p.name, p.description, {
      price: p.price,
      features: p.features.join("\n"),
      status: "publicado",
      approved: true,
    }),
  ),
  Testimonios: [],
  Solicitudes: [],
  Contenido: [
    row(
      "hero",
      "Creamos tecnología. Impulsamos negocios.",
      "Desarrollamos sitios web, sistemas inteligentes y automatizaciones que transforman ideas en soluciones digitales.",
      { status: "publicado", approved: true },
    ),
    row(
      "cta",
      "Tu próxima gran idea empieza aquí.",
      "Hablemos de lo que podemos construir juntos.",
      { status: "publicado", approved: true },
    ),
  ],
  Imágenes: projects
    .filter((p) => p.concept)
    .map((p) =>
      row(p.id, p.name, "Ilustración SVG original del concepto.", {
        image: p.cover,
        category: "image/svg+xml",
        status: "publicado",
        approved: true,
      }),
    ),
  Configuración: [
    row(
      "whatsapp",
      "WhatsApp",
      "Pendiente. Configurar NEXT_PUBLIC_WHATSAPP_NUMBER en el entorno.",
    ),
    row("site", "URL del sitio", site.url),
  ],
  SEO: [
    row(
      "home",
      "JAIAX Labs — Tecnología con propósito",
      "Desarrollo web, software e inteligencia artificial en Perú.",
      { slug: "/", status: "publicado", approved: true },
    ),
    row(
      "basica",
      `Tu página web Básica por US$ ${basicPlan.price} — pago único`,
      "Landing responsive para presentar tu negocio y captar contactos.",
      { slug: offerPath, status: "publicado", approved: true },
    ),
  ],
};
export function AdminDemo() {
  const [module, setModule] = useState<Module>("Dashboard");
  const [data, setData] = useState(initial);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("todos");
  const [editing, setEditing] = useState<Row | null>(null);
  const [preview, setPreview] = useState(false);
  const [toast, setToast] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const update = (patch: Partial<Row>) =>
    setEditing((e) => (e ? { ...e, ...patch } : null));
  const switchModule = (m: Module) => {
    setModule(m);
    setEditing(null);
    setQuery("");
    setStatus("todos");
    setToast("");
    setDeleting(null);
  };
  const list = data[module].filter(
    (r) =>
      `${r.title} ${r.description}`
        .toLowerCase()
        .includes(query.toLowerCase()) &&
      (status === "todos" || r.status === status),
  );
  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    if (
      editing.status === "publicado" &&
      !editing.approved &&
      (module === "Proyectos" || module === "Testimonios")
    ) {
      setToast(
        "Para publicar se requiere confirmar la verificación y autorización.",
      );
      return;
    }
    setData((prev) => ({
      ...prev,
      [module]: prev[module].some((r) => r.id === editing.id)
        ? prev[module].map((r) => (r.id === editing.id ? editing : r))
        : [...prev[module], editing],
    }));
    setEditing(null);
    setToast(
      "Cambios guardados solo en la memoria de esta demo. El sitio público no se ha modificado.",
    );
  };
  return (
    <>
      <div className="admin-warning">
        <ShieldAlert size={26} />
        <div>
          <strong>DEMO SIN SEGURIDAD DE PRODUCCIÓN</strong>
          <br />
          Sin autenticación. Datos temporales en memoria. No ingreses
          información personal real. Este panel devuelve 404 en producción.
        </div>
      </div>
      <div className="admin-shell">
        <aside className="admin-sidebar">
          <span className="eyebrow">JAIAX / CONTROL</span>
          {modules.map(({ name, icon: Icon }) => (
            <button
              key={name}
              className={module === name ? "active" : ""}
              onClick={() => switchModule(name)}
              aria-current={module === name ? "page" : undefined}
            >
              <Icon size={17} />
              {name}
            </button>
          ))}
        </aside>
        <div className="admin-content">
          <div className="admin-title">
            <div>
              <h1>{module}</h1>
              <p>Entorno de demostración · sin conexión al backend</p>
            </div>
            {module === "Dashboard" ? (
              <button
                className="button button-outline"
                onClick={() => {
                  setData(initial);
                  setToast("Datos de la demo restablecidos.");
                }}
              >
                <RotateCcw size={14} />
                Restablecer
              </button>
            ) : (
              <button
                className="button button-gold"
                onClick={() => {
                  setEditing(row(crypto.randomUUID(), "", ""));
                  setPreview(false);
                }}
              >
                <Plus size={14} />
                Nuevo
              </button>
            )}
          </div>
          {toast && (
            <p className="admin-toast" role="status">
              {toast}
            </p>
          )}
          {editing && (
            <form className="admin-editor" onSubmit={save}>
              <h2>
                {data[module].some((r) => r.id === editing.id)
                  ? "Editar registro"
                  : "Crear registro"}
              </h2>
              <div className="form-grid">
                <div className="field">
                  <label htmlFor="edit-title">
                    {module === "Testimonios"
                      ? "Nombre de la persona"
                      : "Título / nombre"}
                  </label>
                  <input
                    id="edit-title"
                    required
                    value={editing.title}
                    onChange={(e) => update({ title: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label htmlFor="edit-category">
                    {module === "Testimonios"
                      ? "Empresa · cargo · fecha"
                      : "Categoría"}
                  </label>
                  <input
                    id="edit-category"
                    value={editing.category}
                    onChange={(e) => update({ category: e.target.value })}
                  />
                </div>
                <div className="field field-full">
                  <label htmlFor="edit-description">
                    {module === "Testimonios"
                      ? "Testimonio"
                      : "Descripción / valor"}
                  </label>
                  <textarea
                    id="edit-description"
                    required
                    value={editing.description}
                    onChange={(e) => update({ description: e.target.value })}
                  />
                </div>
                {module === "Precios" && (
                  <>
                    <div className="field">
                      <label htmlFor="edit-price">Precio US$ / a medida</label>
                      <input
                        id="edit-price"
                        required
                        value={editing.price}
                        onChange={(e) => update({ price: e.target.value })}
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="edit-features">
                        Características (una por línea)
                      </label>
                      <textarea
                        id="edit-features"
                        value={editing.features}
                        onChange={(e) => update({ features: e.target.value })}
                      />
                    </div>
                  </>
                )}
                {["Proyectos", "SEO"].includes(module) && (
                  <div className="field">
                    <label htmlFor="edit-slug">Slug / ruta</label>
                    <input
                      id="edit-slug"
                      value={editing.slug}
                      onChange={(e) => update({ slug: e.target.value })}
                    />
                  </div>
                )}
                {module === "Imágenes" && (
                  <div className="field">
                    <label htmlFor="edit-image">Imagen local disponible</label>
                    <select
                      id="edit-image"
                      value={editing.image}
                      onChange={(e) => update({ image: e.target.value })}
                    >
                      <option value="">Selecciona una imagen</option>
                      {projects
                        .filter((p) => p.concept)
                        .map((p) => (
                          <option key={p.id} value={p.cover}>
                            {p.name}
                          </option>
                        ))}
                    </select>
                  </div>
                )}
                <div className="field">
                  <label htmlFor="edit-status">Estado</label>
                  <select
                    id="edit-status"
                    value={editing.status}
                    onChange={(e) =>
                      update({ status: e.target.value as PublicationStatus })
                    }
                  >
                    <option value="borrador">Borrador</option>
                    <option value="pendiente">Pendiente de verificación</option>
                    <option value="publicado">Publicado</option>
                  </select>
                </div>
              </div>
              {["Proyectos", "Testimonios"].includes(module) && (
                <label className="admin-inline-check">
                  <input
                    type="checkbox"
                    checked={editing.approved}
                    onChange={(e) => update({ approved: e.target.checked })}
                  />
                  Participación, contenido y autorización verificados
                </label>
              )}
              <div className="form-actions">
                <button className="button button-gold" type="submit">
                  Guardar demo
                </button>
                <button
                  className="button button-outline"
                  type="button"
                  onClick={() => setPreview(!preview)}
                >
                  Previsualizar
                  <ArrowUpRight size={14} />
                </button>
                <button
                  className="text-link"
                  type="button"
                  onClick={() => setEditing(null)}
                >
                  Cancelar
                </button>
              </div>
              {preview && (
                <div className="admin-preview">
                  <span className="eyebrow">
                    PREVISUALIZACIÓN / {editing.status}
                  </span>
                  <h3>{editing.title || "Título pendiente"}</h3>
                  {editing.image && (
                    <Image
                      src={editing.image}
                      alt={editing.title || "Vista previa"}
                      width={600}
                      height={432}
                    />
                  )}
                  <p>{editing.description}</p>
                  {editing.price && (
                    <h3>
                      {Number.isFinite(Number(editing.price))
                        ? `US$ ${editing.price}`
                        : editing.price}
                    </h3>
                  )}
                  {editing.features && <p>{editing.features}</p>}
                </div>
              )}
            </form>
          )}
          {module === "Dashboard" ? (
            <>
              <div className="admin-stats">
                <div className="admin-stat">
                  <span>Conceptos publicados</span>
                  <strong>
                    {
                      data.Proyectos.filter((p) => p.status === "publicado")
                        .length
                    }
                  </strong>
                </div>
                <div className="admin-stat">
                  <span>Pendientes de verificar</span>
                  <strong>
                    {
                      data.Proyectos.filter((p) => p.status === "pendiente")
                        .length
                    }
                  </strong>
                </div>
                <div className="admin-stat">
                  <span>Solicitudes reales</span>
                  <strong>0</strong>
                </div>
              </div>
              <div className="admin-chart">
                <h2>Un estudio listo para construir.</h2>
                <p>
                  La demo permite editar, crear, filtrar, previsualizar y
                  eliminar registros. Los cambios se descartan al recargar. No
                  hay estadísticas de visitas ni conversiones simuladas.
                </p>
                <div className="admin-bar">
                  <span />
                </div>
                <p>
                  {
                    data.Proyectos.filter((p) => p.status === "publicado")
                      .length
                  }{" "}
                  conceptos publicados / {data.Proyectos.length} espacios de
                  proyecto
                </p>
                <button
                  className="button button-outline"
                  style={{ marginTop: 25 }}
                  onClick={() => switchModule("Proyectos")}
                >
                  Gestionar proyectos
                  <ArrowUpRight size={15} />
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="admin-tools">
                <input
                  type="search"
                  aria-label="Buscar registros"
                  placeholder="Buscar registros…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <select
                  aria-label="Filtrar por estado"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="todos">Todos los estados</option>
                  <option value="borrador">Borrador</option>
                  <option value="pendiente">Pendiente</option>
                  <option value="publicado">Publicado</option>
                </select>
              </div>
              {module === "Solicitudes" && (
                <p className="notice" style={{ marginBottom: 20 }}>
                  No se reciben leads reales. Si pruebas este módulo, usa
                  exclusivamente nombres y contactos ficticios.
                </p>
              )}
              {list.length ? (
                module === "Imágenes" ? (
                  <div className="image-library">
                    {list.map((r) => (
                      <div key={r.id}>
                        {r.image && (
                          <Image
                            src={r.image}
                            alt={r.title}
                            width={500}
                            height={360}
                          />
                        )}
                        <p>
                          {r.title} · {r.category}
                        </p>
                        <button
                          className="text-link"
                          onClick={() => {
                            setEditing(r);
                            setPreview(true);
                          }}
                        >
                          Editar y previsualizar
                          <ArrowUpRight size={13} />
                        </button>
                        <button
                          className="text-link"
                          style={{ marginTop: 8 }}
                          onClick={() => setDeleting(r.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="admin-table-wrap">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Nombre</th>
                          <th>
                            {module === "Precios" ? "Precio US$" : "Categoría"}
                          </th>
                          <th>Estado</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {list.map((r) => (
                          <tr key={r.id}>
                            <td>{r.title}</td>
                            <td>
                              {module === "Precios" ? r.price : r.category}
                            </td>
                            <td>
                              <span className="badge">{r.status}</span>
                            </td>
                            <td>
                              <button
                                onClick={() => {
                                  setEditing(r);
                                  setPreview(false);
                                }}
                              >
                                Editar
                              </button>
                              <button
                                onClick={() => {
                                  setEditing(r);
                                  setPreview(true);
                                }}
                              >
                                Ver
                              </button>
                              <button onClick={() => setDeleting(r.id)}>
                                Eliminar
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              ) : (
                <div className="admin-empty">
                  <Inbox size={30} />
                  <h2>
                    {query || status !== "todos"
                      ? "Sin coincidencias."
                      : "Un espacio por completar."}
                  </h2>
                  <p>
                    {module === "Testimonios"
                      ? "Solo se publicarán testimonios reales aprobados."
                      : module === "Solicitudes"
                        ? "No hay solicitudes. La captura de leads no está conectada."
                        : "Crea un registro o ajusta los filtros."}
                  </p>
                </div>
              )}
            </>
          )}
          {deleting && (
            <div
              className="admin-editor"
              role="alertdialog"
              aria-modal="false"
              aria-labelledby="delete-title"
              style={{ marginTop: 20 }}
            >
              <h2 id="delete-title">¿Eliminar este registro de la demo?</h2>
              <p className="form-note">
                El cambio se puede revertir con “Restablecer” en Dashboard.
              </p>
              <div className="form-actions">
                <button
                  className="button button-gold"
                  onClick={() => {
                    setData((prev) => ({
                      ...prev,
                      [module]: prev[module].filter((r) => r.id !== deleting),
                    }));
                    setDeleting(null);
                    setToast("Registro eliminado de la demo.");
                  }}
                >
                  Eliminar registro
                </button>
                <button
                  className="button button-outline"
                  onClick={() => setDeleting(null)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
