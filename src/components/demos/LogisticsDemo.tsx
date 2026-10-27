"use client";
import { useMemo, useState } from "react";
import {
  Activity,
  ArrowDownToLine,
  ArrowUpRight,
  Bell,
  Box,
  CheckCheck,
  ChevronRight,
  CircleAlert,
  LayoutDashboard,
  MapPin,
  Package,
  Plus,
  Search,
  Truck,
} from "lucide-react";
import { DemoDialog } from "./DemoDialog";
import s from "./demos.module.css";
type Status = "En ruta" | "Entregado" | "Incidencia" | "Preparado";
type Shipment = {
  id: string;
  client: string;
  destination: string;
  driver: string;
  status: Status;
  eta: string;
  x: number;
  y: number;
};
const initial: Shipment[] = [
  {
    id: "NOD-2048",
    client: "Estudio Norte",
    destination: "Miraflores",
    driver: "Lucía Torres",
    status: "En ruta",
    eta: "14:35",
    x: 650,
    y: 325,
  },
  {
    id: "NOD-2047",
    client: "Casa Verde",
    destination: "San Isidro",
    driver: "Mateo Ruiz",
    status: "En ruta",
    eta: "14:20",
    x: 530,
    y: 190,
  },
  {
    id: "NOD-2046",
    client: "Café Central",
    destination: "Barranco",
    driver: "Ana López",
    status: "Incidencia",
    eta: "Por actualizar",
    x: 770,
    y: 370,
  },
  {
    id: "NOD-2045",
    client: "Taller Uno",
    destination: "Surco",
    driver: "Diego Ríos",
    status: "En ruta",
    eta: "15:10",
    x: 810,
    y: 220,
  },
  {
    id: "NOD-2044",
    client: "Mercado Local",
    destination: "San Miguel",
    driver: "Lucía Torres",
    status: "Entregado",
    eta: "13:42",
    x: 300,
    y: 170,
  },
  {
    id: "NOD-2043",
    client: "Origen Store",
    destination: "Lince",
    driver: "Mateo Ruiz",
    status: "Entregado",
    eta: "13:18",
    x: 470,
    y: 110,
  },
  {
    id: "NOD-2042",
    client: "Botánica",
    destination: "La Molina",
    driver: "Ana López",
    status: "Preparado",
    eta: "16:00",
    x: 860,
    y: 85,
  },
  {
    id: "NOD-2041",
    client: "Forma Studio",
    destination: "Pueblo Libre",
    driver: "Diego Ríos",
    status: "En ruta",
    eta: "14:50",
    x: 360,
    y: 275,
  },
];
function VolumeChart({ week }: { week: boolean }) {
  const values = week
    ? [42, 66, 53, 86, 70, 94, 82]
    : [15, 23, 43, 66, 85, 70, 42];
  return (
    <svg
      viewBox="0 0 620 180"
      className={s.volumeChart}
      role="img"
      aria-label={`Volumen de envíos de demostración por ${week ? "día" : "hora"}`}
    >
      {[30, 70, 110, 150].map((y) => (
        <path
          key={y}
          d={`M15 ${y}H610`}
          stroke="#e8edf0"
          strokeDasharray="3 5"
        />
      ))}
      {values.map((v, i) => (
        <g key={i}>
          <rect
            x={30 + i * 82}
            y={150 - v * 1.25}
            width="23"
            height={v * 1.25}
            rx="5"
            fill={i === 5 ? "#635bdf" : "#b7b2f1"}
          />
          <rect
            x={56 + i * 82}
            y={150 - v}
            width="16"
            height={v}
            rx="4"
            fill="#a7d7c5"
          />
          <text
            x={50 + i * 82}
            y="174"
            textAnchor="middle"
            fill="#87939d"
            fontSize="10"
          >
            {week
              ? ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"][i]
              : `${8 + i * 2}:00`}
          </text>
        </g>
      ))}
    </svg>
  );
}
export function LogisticsDemo() {
  const [shipments, setShipments] = useState(initial);
  const [view, setView] = useState("Resumen");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Todos");
  const [selected, setSelected] = useState("NOD-2048");
  const [detail, setDetail] = useState(false);
  const [create, setCreate] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [week, setWeek] = useState(true);
  const [notice, setNotice] = useState("");
  const filtered = useMemo(
    () =>
      shipments.filter(
        (item) =>
          (filter === "Todos" || item.status === filter) &&
          `${item.id} ${item.client} ${item.destination}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [shipments, filter, query],
  );
  const shipment = shipments.find((item) => item.id === selected)!;
  const color = (status: Status) =>
    status === "Incidencia"
      ? "#d68443"
      : status === "Entregado"
        ? "#218a6b"
        : "#635bdf";
  const statusClass = (status: Status) =>
    status === "Incidencia"
      ? s.warning
      : status === "Entregado"
        ? s.success
        : s.purple;
  const update = () => {
    setShipments((items) =>
      items.map((item) =>
        item.id === selected
          ? {
              ...item,
              status:
                shipment.status === "Incidencia" ? "En ruta" : "Entregado",
              eta: shipment.status === "Incidencia" ? "15:20" : "Completado",
            }
          : item,
      ),
    );
    setNotice(`Envío ${selected} actualizado en esta demo.`);
  };
  const exportRows = () => {
    const text =
      "Código,Cliente,Destino,Estado\n" +
      filtered
        .map((item) =>
          [item.id, item.client, item.destination, item.status].join(","),
        )
        .join("\n");
    const url = URL.createObjectURL(
      new Blob(["\uFEFF" + text], { type: "text/csv;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "nodo-envios-demo.csv";
    a.click();
    URL.revokeObjectURL(url);
    setNotice("CSV de los envíos visibles descargado.");
  };
  return (
    <div className={`${s.demoRoot} ${s.logistics}`} data-demo-app="logistica">
      <aside className={s.logSidebar}>
        <div className={s.nodoLogo}>
          <Box size={27} /> NODO<span>®</span>
        </div>
        <p className={s.sidebarLabel}>WORKSPACE / OPERACIONES</p>
        <nav aria-label="Panel logístico">
          {[
            { name: "Resumen", Icon: LayoutDashboard },
            { name: "Envíos", Icon: Truck },
            { name: "Analítica", Icon: Activity },
          ].map(({ name, Icon }) => (
            <button
              key={name}
              className={view === name ? s.navSelected : ""}
              onClick={() => setView(name)}
              aria-current={view === name ? "page" : undefined}
            >
              <Icon size={18} />
              {name}
              {name === "Envíos" && <span>{shipments.length}</span>}
            </button>
          ))}
        </nav>
        <div className={s.sideHelp}>
          <span className={s.liveDot} />
          Todo conectado<p>Tu operación, en un solo lugar.</p>
          <small>Entorno de demostración</small>
        </div>
        <div className={s.operator}>
          <span>JV</span>
          <div>
            Jaime Villaverde<small>Administrador · Demo</small>
          </div>
        </div>
      </aside>
      <div className={s.logMain}>
        <header className={s.logTop}>
          <span>
            Workspace <ChevronRight size={13} />{" "}
            <strong>Centro de control</strong>
          </span>
          <div>
            <span className={s.demoPill}>DATOS DE EJEMPLO</span>
            <button
              className={s.iconButton}
              onClick={() => setNotifications(true)}
              aria-label="Ver avisos de operaciones"
            >
              <Bell size={18} />
              <i />
            </button>
            <span className={s.avatar}>JV</span>
          </div>
        </header>
        <div className={s.logBody}>
          <div className={s.logTitle}>
            <div>
              <span className={s.overline}>LUNES, 26 DE OCTUBRE · DEMO</span>
              <h1>
                {view === "Resumen"
                  ? "Todo en movimiento."
                  : view === "Envíos"
                    ? "Cada envío, bajo control."
                    : "Decisiones con perspectiva."}
              </h1>
              <p>
                Una visión clara de tu operación. Menos fricción, más entregas.
              </p>
            </div>
            <button className={s.primaryPurple} onClick={() => setCreate(true)}>
              <Plus size={16} /> Nuevo envío
            </button>
          </div>
          {notice && (
            <div className={s.inlineNotice} role="status">
              <CheckCheck size={17} />
              {notice}
              <button onClick={() => setNotice("")} aria-label="Cerrar aviso">
                ×
              </button>
            </div>
          )}
          <div className={s.kpis}>
            {[
              {
                title: "Envíos de hoy",
                value: shipments.length,
                Icon: Package,
                note: "Una operación conectada",
              },
              {
                title: "En ruta",
                value: shipments.filter((x) => x.status === "En ruta").length,
                Icon: Truck,
                note: "Avanzando hacia su destino",
              },
              {
                title: "Entregados",
                value: shipments.filter((x) => x.status === "Entregado").length,
                Icon: CheckCheck,
                note: "El último kilómetro, completo",
              },
              {
                title: "Por atender",
                value: shipments.filter((x) => x.status === "Incidencia")
                  .length,
                Icon: CircleAlert,
                note: "Atención que marca la diferencia",
              },
            ].map(({ title, value, Icon, note }, i) => (
              <article key={title} className={i === 0 ? s.kpiFeatured : ""}>
                <div>
                  <span>{title}</span>
                  <Icon size={17} />
                </div>
                <strong>{String(value).padStart(2, "0")}</strong>
                <p>{note}</p>
              </article>
            ))}
          </div>
          {view === "Resumen" && (
            <div className={s.operationsGrid}>
              <section className={s.panel}>
                <div className={s.panelHeading}>
                  <div>
                    <h2>El pulso de tus rutas</h2>
                    <p>Lima Metropolitana · mapa esquemático</p>
                  </div>
                  <span className={s.smallPill}>
                    <span className={s.liveDot} />
                    {filtered.length} envíos visibles
                  </span>
                </div>
                <div className={s.routeMap}>
                  <svg
                    viewBox="0 0 1000 450"
                    role="img"
                    aria-label="Mapa esquemático de las rutas de demostración"
                  >
                    <defs>
                      <pattern
                        id="nodo-grid"
                        width="42"
                        height="42"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M42 0H0V42"
                          fill="none"
                          stroke="#dde6e5"
                          strokeWidth="1"
                        />
                      </pattern>
                    </defs>
                    <rect width="1000" height="450" fill="#f0f5f2" />
                    <path
                      d="M0 0H185L140 110 202 225 130 340 165 450H0Z"
                      fill="#d9e8ee"
                    />
                    <rect width="1000" height="450" fill="url(#nodo-grid)" />
                    <path
                      d="M130 400Q320 250 850 80M210 30Q430 200 910 330M170 330 920 330M380 0 480 450M720 0 670 450"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="15"
                    />
                    <path
                      d="M130 400Q320 250 850 80M210 30Q430 200 910 330"
                      fill="none"
                      stroke="#cdd9d6"
                      strokeWidth="2"
                    />
                    <g fill="#a5b8ac">
                      <rect x="540" y="45" width="80" height="40" rx="8" />
                      <rect x="570" y="255" width="60" height="40" rx="8" />
                      <rect x="330" y="345" width="80" height="60" rx="8" />
                    </g>
                    <g fill="#8a9f96" fontSize="13" fontFamily="Arial">
                      <text x="230" y="95">
                        SAN MIGUEL
                      </text>
                      <text x="530" y="155">
                        SAN ISIDRO
                      </text>
                      <text x="650" y="300">
                        MIRAFLORES
                      </text>
                      <text x="805" y="400">
                        BARRANCO
                      </text>
                      <text x="755" y="55">
                        LA MOLINA
                      </text>
                      <text
                        x="40"
                        y="280"
                        transform="rotate(-90 40 280)"
                        fill="#9db5bf"
                      >
                        OCÉANO PACÍFICO
                      </text>
                    </g>
                    {filtered.map((item) => (
                      <g key={item.id}>
                        <path
                          d={`M220 230Q${item.x - 130} ${item.y - 70} ${item.x} ${item.y}`}
                          fill="none"
                          stroke={item.id === selected ? "#6657d5" : "#b0c7bd"}
                          strokeWidth={item.id === selected ? 4 : 2}
                          strokeDasharray={
                            item.status === "Incidencia" ? "6 5" : undefined
                          }
                        />
                        <circle
                          cx={item.x}
                          cy={item.y}
                          r={item.id === selected ? 13 : 8}
                          fill={color(item.status)}
                          stroke="white"
                          strokeWidth="4"
                        />
                      </g>
                    ))}
                    <rect
                      x="202"
                      y="212"
                      width="36"
                      height="36"
                      rx="11"
                      fill="#202d38"
                    />
                    <path
                      d="M213 236V224L220 219 227 224V236Z"
                      fill="#d7eddc"
                    />
                  </svg>
                  <div className={s.mapKey}>
                    <span>
                      <i style={{ background: "#635bdf" }} />
                      En ruta
                    </span>
                    <span>
                      <i style={{ background: "#218a6b" }} />
                      Entregado
                    </span>
                    <span>
                      <i style={{ background: "#d68443" }} />
                      Incidencia
                    </span>
                  </div>
                  <div className={s.mapSelected}>
                    <span className={s.mapVehicle}>
                      <Truck size={18} />
                    </span>
                    <div>
                      <strong>
                        {shipment.id} · {shipment.destination}
                      </strong>
                      <small>
                        {shipment.driver} · {shipment.eta}
                      </small>
                    </div>
                    <button
                      onClick={() => setDetail(true)}
                      aria-label={`Ver detalle de ${shipment.id}`}
                    >
                      <ArrowUpRight size={17} />
                    </button>
                  </div>
                </div>
              </section>
              <section className={`${s.panel} ${s.activityPanel}`}>
                <div className={s.panelHeading}>
                  <h2>Lo que está pasando</h2>
                  <span className={s.liveDot} />
                </div>
                <div className={s.activityList}>
                  {[
                    {
                      time: "14:08",
                      title: "Una entrega, una sonrisa.",
                      text: "Mercado Local recibió su pedido.",
                      icon: CheckCheck,
                    },
                    {
                      time: "14:02",
                      title: "Ruta en movimiento",
                      text: "Lucía inició el recorrido a Miraflores.",
                      icon: Truck,
                    },
                    {
                      time: "13:56",
                      title: "Necesita tu atención",
                      text: "Dirección por confirmar en Barranco.",
                      icon: CircleAlert,
                    },
                    {
                      time: "13:42",
                      title: "Listo para salir",
                      text: "Botánica tiene un nuevo envío preparado.",
                      icon: Package,
                    },
                  ].map(({ time, title, text, icon: Icon }) => (
                    <div key={time}>
                      <span>
                        <Icon size={16} />
                      </span>
                      <div>
                        <small>{time} · SIMULACIÓN</small>
                        <strong>{title}</strong>
                        <p>{text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  className={s.quietButton}
                  onClick={() => {
                    setView("Envíos");
                    setFilter("Incidencia");
                  }}
                >
                  Revisar incidencias <ChevronRight size={14} />
                </button>
              </section>
            </div>
          )}
          {view === "Analítica" && (
            <section className={s.panel}>
              <div className={s.panelHeading}>
                <div>
                  <h2>El ritmo de tu operación</h2>
                  <p>Volumen ilustrativo para explorar el dashboard.</p>
                </div>
                <div className={s.segment}>
                  <button aria-pressed={!week} onClick={() => setWeek(false)}>
                    24 horas
                  </button>
                  <button aria-pressed={week} onClick={() => setWeek(true)}>
                    7 días
                  </button>
                </div>
              </div>
              <VolumeChart week={week} />
              <div className={s.analyticsNote}>
                <span>
                  <i style={{ background: "#635bdf" }} />
                  Envíos programados
                </span>
                <span>
                  <i style={{ background: "#a7d7c5" }} />
                  Entregas completadas
                </span>
              </div>
            </section>
          )}
          <section className={s.panel}>
            <div className={s.panelHeading}>
              <div>
                <h2>
                  {view === "Analítica"
                    ? "Detrás de cada número, un envío."
                    : "Envíos recientes"}
                </h2>
                <p>Filtra, explora una ruta o actualiza una entrega.</p>
              </div>
              <button className={s.outlineButton} onClick={exportRows}>
                <ArrowDownToLine size={14} />
                Exportar CSV
              </button>
            </div>
            <div className={s.tableTools}>
              <div className={s.filterPills}>
                {[
                  "Todos",
                  "En ruta",
                  "Entregado",
                  "Incidencia",
                  "Preparado",
                ].map((status) => (
                  <button
                    key={status}
                    aria-pressed={filter === status}
                    onClick={() => setFilter(status)}
                  >
                    {status}
                  </button>
                ))}
              </div>
              <label className={s.searchField}>
                <Search size={15} />
                <input
                  aria-label="Buscar envío"
                  placeholder="Buscar envío, cliente, destino…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </label>
            </div>
            <div className={s.tableScroller}>
              <table className={s.shipmentTable}>
                <thead>
                  <tr>
                    <th>ENVÍO / CLIENTE</th>
                    <th>DESTINO</th>
                    <th>RESPONSABLE</th>
                    <th>ESTADO</th>
                    <th>HORA ESTIMADA</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item) => (
                    <tr key={item.id} data-selected={selected === item.id}>
                      <td>
                        <button
                          onClick={() => {
                            setSelected(item.id);
                            setDetail(true);
                          }}
                        >
                          {item.id}
                        </button>
                        <small>{item.client}</small>
                      </td>
                      <td>
                        <MapPin size={12} />
                        {item.destination}
                      </td>
                      <td>
                        <span className={s.miniAvatar}>
                          {item.driver
                            .split(" ")
                            .map((x) => x[0])
                            .join("")}
                        </span>
                        {item.driver}
                      </td>
                      <td>
                        <span
                          className={`${s.badge} ${statusClass(item.status)}`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td>{item.eta}</td>
                      <td>
                        <button
                          className={s.iconButton}
                          onClick={() => {
                            setSelected(item.id);
                            setNotice(
                              `Ruta de ${item.id} seleccionada en el mapa.`,
                            );
                          }}
                          aria-label={`Seleccionar ruta ${item.id}`}
                        >
                          <ArrowUpRight size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {!filtered.length && (
              <div className={s.empty}>
                <Search size={25} />
                <h3>Ningún envío coincide.</h3>
                <p>Prueba otro término o restablece los filtros.</p>
                <button
                  onClick={() => {
                    setQuery("");
                    setFilter("Todos");
                  }}
                >
                  Ver todos los envíos
                </button>
              </div>
            )}
            <div className={s.tableFooter}>
              <span role="status">
                {filtered.length} de {shipments.length} envíos · datos de
                demostración
              </span>
              <span>Diseñado para avanzar. ↗</span>
            </div>
          </section>
          {view === "Resumen" && (
            <section className={s.panel}>
              <div className={s.panelHeading}>
                <h2>Volumen de la semana</h2>
                <div className={s.segment}>
                  <button aria-pressed={!week} onClick={() => setWeek(false)}>
                    24 h
                  </button>
                  <button aria-pressed={week} onClick={() => setWeek(true)}>
                    7 días
                  </button>
                </div>
              </div>
              <VolumeChart week={week} />
            </section>
          )}
        </div>
      </div>
      <DemoDialog
        open={detail}
        title={`Seguimiento · ${shipment.id}`}
        onClose={() => setDetail(false)}
      >
        <div className={s.dialogBody}>
          <span className={`${s.badge} ${statusClass(shipment.status)}`}>
            {shipment.status}
          </span>
          <h3 className={s.detailTitle}>{shipment.client}</h3>
          <p className={s.muted}>
            De almacén central a {shipment.destination}.
          </p>
          <div className={s.detailGrid}>
            <div>
              <small>RESPONSABLE</small>
              <strong>{shipment.driver}</strong>
            </div>
            <div>
              <small>HORA ESTIMADA</small>
              <strong>{shipment.eta}</strong>
            </div>
          </div>
          <ol className={s.trackingSteps}>
            {[
              "Pedido confirmado",
              "Preparado en almacén",
              "En camino",
              "Entrega completada",
            ].map((step, i) => (
              <li
                key={step}
                data-done={
                  i <=
                  (shipment.status === "Entregado"
                    ? 3
                    : shipment.status === "Preparado"
                      ? 1
                      : 2)
                }
              >
                <span>{i + 1}</span>
                <div>
                  <strong>{step}</strong>
                  <small>
                    {i === 0
                      ? "Solicitud recibida"
                      : i === 1
                        ? "Paquete listo para despacho"
                        : i === 2
                          ? shipment.driver
                          : "Recepción en destino"}
                  </small>
                </div>
              </li>
            ))}
          </ol>
          {shipment.status === "Incidencia" && (
            <p className={s.issueNote}>
              Dirección por confirmar. Puedes resolver esta incidencia para
              continuar la ruta de demostración.
            </p>
          )}
          {shipment.status !== "Entregado" && (
            <button className={s.primaryPurple} onClick={update}>
              {shipment.status === "Incidencia"
                ? "Resolver incidencia"
                : "Simular entrega completada"}
              <CheckCheck size={16} />
            </button>
          )}
          <p className={s.finePrint}>
            Los cambios solo afectan los datos de esta pestaña.
          </p>
        </div>
      </DemoDialog>
      <DemoDialog
        open={create}
        title="Preparemos un nuevo envío."
        onClose={() => setCreate(false)}
      >
        <form
          className={s.dialogBody}
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            const id = `NOD-${2049 + shipments.length - initial.length}`;
            setShipments((items) => [
              {
                id,
                client: String(data.get("client")),
                destination: String(data.get("destination")),
                driver: "Lucía Torres",
                status: "Preparado",
                eta: "Por programar",
                x: 420,
                y: 230,
              },
              ...items,
            ]);
            setCreate(false);
            setSelected(id);
            setNotice(
              `${id} creado. Ya aparece en tu operación de demostración.`,
            );
          }}
        >
          <label className={s.formField}>
            Cliente
            <input
              name="client"
              required
              maxLength={70}
              placeholder="Ej. Café de Barrio"
            />
          </label>
          <label className={s.formField}>
            Distrito de destino
            <select name="destination" required>
              {[
                "Miraflores",
                "San Isidro",
                "Barranco",
                "Surco",
                "San Miguel",
                "La Molina",
              ].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          <div className={s.issueNote}>
            <Package size={20} />
            <p>
              Se añadirá un envío preparado con responsable y seguimiento de
              ejemplo.
            </p>
          </div>
          <button className={s.primaryPurple} type="submit">
            Crear envío demo <Plus size={16} />
          </button>
        </form>
      </DemoDialog>
      <DemoDialog
        open={notifications}
        title="Tu operación, al día."
        onClose={() => setNotifications(false)}
      >
        <div className={s.dialogBody}>
          <p className={s.muted}>Avisos de demostración</p>
          <div className={s.notification}>
            <CircleAlert />
            <div>
              <h3>Una dirección por confirmar</h3>
              <p>
                Café Central · Barranco. Revísala en el filtro de incidencias.
              </p>
            </div>
          </div>
          <div className={s.notification}>
            <CheckCheck />
            <div>
              <h3>Dos entregas completadas</h3>
              <p>
                Los pedidos de Mercado Local y Origen Store llegaron a destino.
              </p>
            </div>
          </div>
          <button
            className={s.primaryPurple}
            onClick={() => {
              setView("Envíos");
              setFilter("Incidencia");
              setNotifications(false);
            }}
          >
            Revisar pendientes
          </button>
        </div>
      </DemoDialog>
    </div>
  );
}
