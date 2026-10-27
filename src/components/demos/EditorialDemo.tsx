"use client";
import { useId, useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  Check,
  Moon,
  Search,
  Sun,
} from "lucide-react";
import { DemoDialog } from "./DemoDialog";
import s from "./demos.module.css";
const stories = [
  {
    id: "humano",
    category: "Diseño",
    title: "Un internet más humano empieza en los pequeños detalles.",
    lead: "La próxima gran interacción quizá no sea un efecto. Quizá sea hacer que alguien se sienta comprendido.",
    art: 0,
    quote: "Diseñar también es decidir qué no exigirle a una persona.",
    sections: [
      {
        title: "La claridad es una forma de respeto",
        text: "Una interfaz aparece en medio de la vida de alguien. Entre una reunión y un mensaje, en un autobús o al final de una jornada. Rara vez recibe toda su atención. Por eso, la claridad no es una concesión estética: es la manera de acompañar a quien llega. Una acción bien nombrada, un error explicado sin culpar y un siguiente paso visible pueden hacer más que una pantalla llena de promesas.",
      },
      {
        title: "El detalle que permite continuar",
        text: "Pensemos en un formulario que conserva lo que ya escribiste cuando algo falla. En un carrito que deja corregir una cantidad sin empezar de nuevo. En un artículo que recuerda por dónde vas. Son gestos pequeños que reconocen el esfuerzo de una persona. El diseño empieza a sentirse humano cuando ese esfuerzo importa más que la apariencia de perfección.",
      },
      {
        title: "La sorpresa necesita un lugar",
        text: "El movimiento y la personalidad tienen mucho que aportar. Pueden orientar, crear una pausa o convertir una transición en un momento memorable. Pero una sorpresa funciona mejor cuando hay una base de confianza: sabemos dónde estamos, qué podemos hacer y cómo volver. La emoción no necesita competir con la claridad. Puede nacer de ella.",
      },
    ],
  },
  {
    id: "objetos",
    category: "Cultura",
    title: "Los objetos que elegimos también cuentan una historia.",
    lead: "Sobre las cosas que se quedan, el valor de reparar y la belleza de usar algo todos los días.",
    art: 1,
    quote: "Lo cotidiano merece tanta intención como lo extraordinario.",
    sections: [
      {
        title: "Lo que permanece",
        text: "Una taza que se vuelve parte de una mañana. Una lámpara que cambia el carácter de una habitación. Los objetos dejan de ser únicamente formas cuando entran en nuestras rutinas. Les damos contexto, recuerdos y una manera propia de usarlos. Pensar en su diseño exige imaginar esa relación, no solo el momento de la compra.",
      },
      {
        title: "Elegir con atención",
        text: "Antes de añadir algo, podemos preguntarnos qué espacio ocupará en nuestra vida. No se trata de perseguir una casa vacía ni de convertir cada compra en una declaración. Se trata de mirar un poco más: cómo se siente una superficie, qué pasa al sostener una pieza y si seguirá teniendo sentido después de la primera impresión.",
      },
      {
        title: "Una belleza que se usa",
        text: "El diseño encuentra otra dimensión cuando acepta el paso del tiempo. Una marca puede ser parte de la historia de una pieza, no necesariamente el final de su valor. En esa mirada, cuidar, reparar y compartir se convierten en formas de seguir diseñando lo que nos rodea.",
      },
    ],
  },
  {
    id: "automatizar",
    category: "Tecnología",
    title: "Automatizar para recuperar tiempo, no para llenar más la agenda.",
    lead: "Una mirada a la tecnología que se aparta del camino y deja espacio para lo importante.",
    art: 2,
    quote:
      "Una buena herramienta nos devuelve algo, no solo nos pide atención.",
    sections: [
      {
        title: "El tiempo que no vemos",
        text: "Copiar un dato parece una tarea pequeña. Buscarlo, comprobarlo y enviarlo a otra persona también. Pero cuando esas acciones se repiten cada día, forman una parte silenciosa del trabajo. Mirarlas con atención puede revelar oportunidades para conectar información y reducir interrupciones.",
      },
      {
        title: "Empezar por una pregunta",
        text: "Antes de hablar de herramientas, conviene definir qué debería mejorar. ¿Menos errores? ¿Una respuesta más clara? ¿Evitar que alguien espere un dato que ya existe? Una automatización con propósito necesita un resultado reconocible, una persona que pueda supervisarlo y una forma sencilla de actuar cuando algo cambia.",
      },
      {
        title: "Dejar espacio a la decisión",
        text: "No todo merece convertirse en una regla. Hay conversaciones, excepciones y decisiones que necesitan criterio. La tecnología resulta más útil cuando ayuda a preparar esas decisiones y libera a las personas de la repetición que no aporta valor. Recuperar tiempo también significa poder elegir qué hacer con él.",
      },
    ],
  },
  {
    id: "silencio",
    category: "Ideas",
    title: "El espacio en blanco también tiene algo que decir.",
    lead: "En una pantalla que compite por atención, una pausa puede ser la decisión más poderosa.",
    art: 3,
    quote: "A veces, hacer espacio es la mejor forma de destacar una idea.",
    sections: [
      {
        title: "Una pausa entre las cosas",
        text: "Una página necesita ritmo. Si todo tiene el mismo peso, nada parece importante. El espacio entre bloques permite entender relaciones, anticipar una sección y descansar antes de continuar. No es un hueco que deba llenarse. Es parte de la estructura de lo que estamos contando.",
      },
      {
        title: "Elegir una prioridad",
        text: "Cuando dejamos respirar una composición, también elegimos qué merece protagonismo. Esa elección obliga a ordenar el mensaje y a confiar en él. Una sola frase clara puede sostener una pantalla si su tamaño, su posición y su contexto están al servicio de una intención.",
      },
      {
        title: "El ritmo de quien lee",
        text: "Hay personas que recorren una página por encima y otras que se detienen en cada línea. Una buena jerarquía deja entrar a ambas. Ofrece puntos de apoyo, títulos comprensibles y pequeñas pausas. La atención se acompaña mejor cuando no intentamos ocuparla toda.",
      },
    ],
  },
  {
    id: "ciudad",
    category: "Diseño",
    title: "¿Y si diseñáramos las pantallas como una buena ciudad?",
    lead: "Entradas claras, recorridos legibles y lugares en los que vale la pena detenerse.",
    art: 4,
    quote:
      "Una buena experiencia permite orientarse sin tener que preguntar a cada paso.",
    sections: [
      {
        title: "Saber dónde estás",
        text: "Una ciudad se vuelve cercana cuando reconocemos sus señales. En una interfaz sucede algo parecido: una navegación consistente y un título que explica el lugar nos permiten construir un mapa mental. Cada pantalla puede tener personalidad sin romper el lenguaje de las demás.",
      },
      {
        title: "Recorridos que tienen sentido",
        text: "La distancia más corta no siempre es la más cómoda. Una transición que explica lo que está ocurriendo o una confirmación antes de una decisión importante pueden mejorar el recorrido. El objetivo no es eliminar cada paso, sino hacer que cada uno tenga sentido.",
      },
      {
        title: "Espacios para volver",
        text: "Los lugares memorables invitan a regresar porque ofrecen algo que valoramos. Una herramienta útil, una colección bien curada o una lectura que abre una pregunta pueden cumplir esa función. La experiencia continúa después de la primera visita, en la razón que alguien encuentra para volver.",
      },
    ],
  },
  {
    id: "curiosidad",
    category: "Cultura",
    title:
      "La curiosidad no debería terminar cuando encontramos una respuesta.",
    lead: "Aprender a mirar otra vez en una época de respuestas inmediatas.",
    art: 5,
    quote:
      "Una buena pregunta puede abrir más caminos que una respuesta perfecta.",
    sections: [
      {
        title: "Lo que queda por mirar",
        text: "Encontrar una respuesta es útil. Pero a veces la parte más interesante empieza justo después: qué supuestos estamos aceptando, qué contexto falta y cómo lo ve otra persona. La curiosidad necesita ese pequeño espacio para continuar la conversación.",
      },
      {
        title: "Cambiar de escala",
        text: "Una idea puede verse distinta al acercarnos a un detalle o al mirar el conjunto. Cambiar de disciplina, hablar con alguien de otra experiencia o dibujar una pregunta puede ayudarnos a salir de un recorrido demasiado conocido. No siempre necesitamos más información; a veces necesitamos otra perspectiva.",
      },
      {
        title: "Aprender en compañía",
        text: "Compartir lo que todavía no entendemos también es una forma de aprender. Permite que otras personas completen una idea, la discutan o propongan otra dirección. Una cultura curiosa no exige tener todas las respuestas antes de participar. Ofrece un lugar para construirlas.",
      },
    ],
  },
];
type Story = (typeof stories)[number];
function EditorialArt({
  variant = 0,
  className = "",
}: {
  variant?: number;
  className?: string;
}) {
  const id = useId().replace(/[^a-z0-9]/gi, "");
  const palette = [
    ["#d9e8c8", "#8da67e", "#263c2b"],
    ["#e6c7a3", "#b97952", "#784832"],
    ["#c7cce8", "#7c86b1", "#263b65"],
    ["#eee4cf", "#c3aa81", "#6d6250"],
    ["#d8dfd8", "#96aaa0", "#3c5d50"],
    ["#e4c7bb", "#bc826d", "#713d3d"],
  ][variant % 6];
  return (
    <svg viewBox="0 0 900 650" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}bg`} x2="1" y2="1">
          <stop stopColor={palette[0]} />
          <stop offset="1" stopColor={palette[1]} />
        </linearGradient>
        <linearGradient id={`${id}shade`} x2="1">
          <stop stopColor={palette[2]} />
          <stop offset=".5" stopColor={palette[1]} />
          <stop offset="1" stopColor={palette[2]} />
        </linearGradient>
      </defs>
      <rect width="900" height="650" fill={`url(#${id}bg)`} />
      {variant % 3 === 0 ? (
        <>
          <circle cx="460" cy="310" r="190" fill={palette[0]} />
          <g fill="none" stroke={palette[2]} strokeWidth="1.2" opacity=".65">
            {Array.from({ length: 13 }, (_, i) => (
              <ellipse
                key={i}
                cx="450"
                cy="325"
                rx={95 + i * 12}
                ry="205"
                transform={`rotate(${i * 14} 450 325)`}
              />
            ))}
          </g>
          <circle cx="450" cy="325" r="28" fill={palette[2]} />
        </>
      ) : variant % 3 === 1 ? (
        <>
          <path d="M160 650V210L430 70 700 210V650" fill={`url(#${id}shade)`} />
          <path d="M275 650V320Q450 70 625 320V650" fill={palette[0]} />
          <path d="M340 650V350Q450 190 560 350V650" fill={palette[2]} />
          <path
            d="M100 560H800M130 600H780"
            stroke={palette[1]}
            strokeWidth="2"
          />
          <circle cx="450" cy="405" r="58" fill={palette[1]} />
        </>
      ) : (
        <>
          <g transform="translate(450 325) rotate(-25)">
            {Array.from({ length: 8 }, (_, i) => (
              <rect
                key={i}
                x={-250 + i * 61}
                y={-170 + (i % 2) * 35}
                width="48"
                height="345"
                rx="24"
                fill={`url(#${id}shade)`}
              />
            ))}
          </g>
          <circle cx="270" cy="470" r="105" fill={palette[0]} opacity=".7" />
        </>
      )}
      <path
        d="M30 30H95M30 30V95M870 620H805M870 620V555"
        stroke={palette[2]}
        fill="none"
        opacity=".6"
      />
      <text
        x="45"
        y="607"
        fill={palette[2]}
        fontFamily="Arial"
        fontSize="12"
        letterSpacing="4"
      >
        LÚMINA / ESTUDIOS VISUALES 0{variant + 1}
      </text>
    </svg>
  );
}
const readTime = (story: Story) =>
  Math.max(
    1,
    Math.ceil(
      (story.lead + story.sections.map((s) => s.text).join(" ")).split(/\s+/)
        .length / 180,
    ),
  );
export function EditorialDemo() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");
  const [saved, setSaved] = useState<string[]>([]);
  const [library, setLibrary] = useState(false);
  const [dark, setDark] = useState(false);
  const [article, setArticle] = useState<Story | null>(null);
  const [fontSize, setFontSize] = useState(18);
  const [subscribed, setSubscribed] = useState(false);
  const grid = useRef<HTMLElement>(null);
  const search = useRef<HTMLInputElement>(null);
  const reader = useRef<HTMLDivElement>(null);
  const readingProgress = useRef<HTMLSpanElement>(null);
  const filtered = useMemo(
    () =>
      stories.filter(
        (story) =>
          (category === "Todos" || story.category === category) &&
          (!library || saved.includes(story.id)) &&
          `${story.title} ${story.lead} ${story.category}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [category, query, library, saved],
  );
  const save = (id: string) =>
    setSaved((items) =>
      items.includes(id) ? items.filter((x) => x !== id) : [...items, id],
    );
  const open = (story: Story) => {
    setArticle(story);
    setFontSize(18);
    reader.current?.scrollTo({ top: 0 });
    if (readingProgress.current)
      readingProgress.current.style.transform = "scaleX(0)";
  };
  const browse = () =>
    grid.current?.scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "start",
    });
  return (
    <div
      className={`${s.demoRoot} ${s.editorial} ${dark ? s.editorialDark : ""}`}
      data-demo-app="blog"
    >
      <header className={s.editorialHeader}>
        <div className={s.edition}>
          <span>EDICIÓN 001</span>
          <span>OCTUBRE, 2026</span>
        </div>
        <a className={s.umbralLogo} href="#umbral-inicio">
          LÚMINA<span>®</span>
        </a>
        <div className={s.editorialHeaderActions}>
          <button
            className={s.iconButton}
            onClick={() => setDark(!dark)}
            aria-label={dark ? "Activar modo claro" : "Activar modo nocturno"}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className={s.iconButton}
            aria-label="Buscar en la revista"
            onClick={() => {
              browse();
              search.current?.focus({ preventScroll: true });
            }}
          >
            <Search size={19} />
          </button>
        </div>
      </header>
      <nav className={s.editorialNav} aria-label="Revista LÚMINA">
        <span>UNA REVISTA PARA MIRAR DISTINTO.</span>
        <div>
          <button
            onClick={() => {
              setLibrary(false);
              browse();
            }}
          >
            Explorar <ArrowDown size={12} />
          </button>
          <button
            onClick={() => {
              setLibrary(!library);
              browse();
            }}
            aria-pressed={library}
          >
            <Bookmark size={13} />
            Tu biblioteca <b>{saved.length}</b>
          </button>
        </div>
      </nav>
      <section className={s.editorialHero} id="umbral-inicio">
        <div className={s.editorialHeroCopy}>
          <span className={s.editorialEyebrow}>
            PERSPECTIVAS / DISEÑO / CULTURA DIGITAL
          </span>
          <h1>
            Lo que viene
            <br />
            se <em>imagina.</em>
          </h1>
          <p>
            Ideas que abren conversaciones.
            <br />
            Historias para leer con curiosidad, no con prisa.
          </p>
          <button onClick={() => open(stories[0])} className={s.editorialRead}>
            Abre una nueva perspectiva <ArrowUpRight size={20} />
          </button>
          <div className={s.editorialHeroBottom}>
            <span>LECTURA DESTACADA</span>
            <span>01 — 06</span>
          </div>
        </div>
        <button
          className={s.editorialFeature}
          onClick={() => open(stories[0])}
          aria-label={`Leer ${stories[0].title}`}
        >
          <EditorialArt variant={0} />
          <span className={s.featureLabel}>DISEÑO PARA LAS PERSONAS</span>
          <div>
            <span>EL EDITORIAL / {readTime(stories[0])} MIN</span>
            <h2>{stories[0].title}</h2>
            <span className={s.roundArrow}>
              <ArrowUpRight size={22} />
            </span>
          </div>
        </button>
      </section>
      <div className={s.editorialStatement}>
        <span>NO VENIMOS A TENER LA ÚLTIMA PALABRA.</span>
        <strong>Venimos a hacer la siguiente pregunta. ↗</strong>
      </div>
      <section className={s.storiesSection} id="umbral-historias" ref={grid}>
        <div className={s.storiesHeading}>
          <div>
            <span className={s.editorialEyebrow}>PARA TU PRÓXIMA PAUSA</span>
            <h2>
              {library ? "Tu biblioteca personal." : "Ideas en conversación."}
            </h2>
          </div>
          <label className={s.editorialSearch}>
            <Search size={17} />
            <input
              ref={search}
              aria-label="Buscar historias"
              placeholder="¿Qué despierta tu curiosidad?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>
        <div className={s.editorialFilters}>
          {["Todos", "Diseño", "Tecnología", "Cultura", "Ideas"].map((c) => (
            <button
              key={c}
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
          <span role="status">{filtered.length} lecturas</span>
        </div>
        {library && (
          <button className={s.clearFilter} onClick={() => setLibrary(false)}>
            Explorar todas las lecturas ×
          </button>
        )}
        <div className={s.storyGrid}>
          {filtered.map((story, index) => (
            <article key={story.id} className={s.storyCard}>
              <div className={s.storyArt}>
                <button
                  aria-label={`Leer ${story.title}`}
                  onClick={() => open(story)}
                >
                  <EditorialArt variant={story.art} />
                </button>
                <button
                  className={s.storySave}
                  aria-label={`${saved.includes(story.id) ? "Quitar de guardados" : "Guardar"} ${story.title}`}
                  aria-pressed={saved.includes(story.id)}
                  onClick={() => save(story.id)}
                >
                  <Bookmark
                    size={17}
                    fill={saved.includes(story.id) ? "currentColor" : "none"}
                  />
                </button>
                <span>0{story.art + 1}</span>
              </div>
              <div className={s.storyMeta}>
                <span>{story.category}</span>
                <span>{readTime(story)} MIN DE LECTURA</span>
              </div>
              <h3>
                <button onClick={() => open(story)}>{story.title}</button>
              </h3>
              <p>{story.lead}</p>
              <button className={s.storyRead} onClick={() => open(story)}>
                Seguir la idea <ArrowUpRight size={16} />
              </button>
              <span className={s.storyIndex}>
                LÚMINA / {String(index + 1).padStart(2, "0")}
              </span>
            </article>
          ))}
        </div>
        {!filtered.length && (
          <div className={s.empty}>
            <Bookmark size={28} />
            <h3>
              {library
                ? "Un lugar para las ideas que se quedan."
                : "Todavía no encontramos esa historia."}
            </h3>
            <p>
              {library
                ? "Guarda una lectura y vuelve a ella cuando quieras."
                : "Prueba otra palabra o explora los temas de la revista."}
            </p>
            <button
              onClick={() => {
                setQuery("");
                setCategory("Todos");
                setLibrary(false);
              }}
            >
              Volver a explorar
            </button>
          </div>
        )}
      </section>
      <section className={s.editorialQuote}>
        <span className={s.editorialEyebrow}>UNA IDEA PARA LLEVARTE</span>
        <blockquote>
          “La curiosidad es
          <br />
          una forma de <em>estar presente.</em>”
        </blockquote>
        <span>EL EQUIPO DE LÚMINA / MANIFIESTO 001</span>
      </section>
      <section className={s.newsletter}>
        <div>
          <span className={s.editorialEyebrow}>SIN PRISA. CON INTENCIÓN.</span>
          <h2>
            Una buena idea
            <br />
            puede cambiar tu semana.
          </h2>
          <p>Explora cómo sería recibir una selección editorial.</p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubscribed(true);
            e.currentTarget.reset();
          }}
        >
          {subscribed ? (
            <div className={s.newsletterSuccess} role="status">
              <Check size={25} />
              <h3>Gracias por la curiosidad.</h3>
              <p>
                Suscripción simulada: tu correo no se ha enviado ni guardado.
              </p>
              <button type="button" onClick={() => setSubscribed(false)}>
                Probar otra vez ↗
              </button>
            </div>
          ) : (
            <>
              <label htmlFor="umbral-email">
                Tu correo, para esta demostración
              </label>
              <div>
                <input
                  id="umbral-email"
                  type="email"
                  required
                  placeholder="hola@tucorreo.com"
                  autoComplete="email"
                />
                <button type="submit" aria-label="Probar suscripción">
                  <ArrowUpRight size={23} />
                </button>
              </div>
              <p>
                Formulario de demostración. No envía correos ni registra
                suscriptores.
              </p>
            </>
          )}
        </form>
      </section>
      <footer className={s.editorialFooter}>
        <strong>LÚMINA®</strong>
        <span>
          Una revista de demostración creada por JAIAX Labs.
          <br />
          Textos e ilustraciones originales para explorar esta experiencia.
        </span>
        <a href="#umbral-inicio">Vuelve a mirar ↑</a>
      </footer>
      <DemoDialog
        open={!!article}
        title="Lectura / LÚMINA"
        onClose={() => setArticle(null)}
        wide
      >
        {article && (
          <>
            <div className={s.readerTools}>
              <span>
                {article.category} · {readTime(article)} MIN
              </span>
              <div>
                <button
                  aria-label="Reducir tamaño de lectura"
                  onClick={() => setFontSize((n) => Math.max(16, n - 1))}
                  disabled={fontSize === 16}
                >
                  A−
                </button>
                <button
                  aria-label="Aumentar tamaño de lectura"
                  onClick={() => setFontSize((n) => Math.min(23, n + 1))}
                  disabled={fontSize === 23}
                >
                  A+
                </button>
                <button
                  aria-pressed={saved.includes(article.id)}
                  onClick={() => save(article.id)}
                >
                  <Bookmark
                    size={15}
                    fill={saved.includes(article.id) ? "currentColor" : "none"}
                  />
                  {saved.includes(article.id) ? "Guardado" : "Guardar"}
                </button>
              </div>
            </div>
            <div className={s.readerProgress}>
              <span ref={readingProgress} />
            </div>
            <div
              ref={reader}
              className={s.reader}
              style={{ fontSize }}
              onScroll={(e) => {
                const node = e.currentTarget;
                const value =
                  node.scrollTop /
                  Math.max(1, node.scrollHeight - node.clientHeight);
                if (readingProgress.current)
                  readingProgress.current.style.transform = `scaleX(${value})`;
              }}
            >
              <EditorialArt variant={article.art} className={s.readerArt} />
              <article className={s.readerBody}>
                <span className={s.editorialEyebrow}>
                  POR EL EQUIPO LÚMINA / EDICIÓN 001
                </span>
                <h2>{article.title}</h2>
                <p className={s.readerLead}>{article.lead}</p>
                <nav className={s.readerIndex} aria-label="En esta lectura">
                  <span>EN ESTA LECTURA</span>
                  {article.sections.map((section, index) => (
                    <button
                      key={section.title}
                      onClick={() =>
                        document
                          .getElementById(`umbral-${article.id}-${index}`)
                          ?.scrollIntoView({
                            behavior: matchMedia(
                              "(prefers-reduced-motion: reduce)",
                            ).matches
                              ? "instant"
                              : "smooth",
                            block: "start",
                          })
                      }
                    >
                      {String(index + 1).padStart(2, "0")} / {section.title}
                      <ArrowDown size={12} />
                    </button>
                  ))}
                </nav>
                {article.sections.map((section, index) => (
                  <section
                    key={section.title}
                    id={`umbral-${article.id}-${index}`}
                  >
                    <h3>{section.title}</h3>
                    <p>{section.text}</p>
                    {index === 1 && <blockquote>{article.quote}</blockquote>}
                  </section>
                ))}
                <div className={s.readerEnd}>
                  <span>UNA IDEA TERMINA. OTRA EMPIEZA.</span>
                  <button
                    onClick={() => {
                      const next =
                        stories[
                          (stories.findIndex((s) => s.id === article.id) + 1) %
                            stories.length
                        ];
                      open(next);
                      reader.current?.scrollTo({ top: 0 });
                    }}
                  >
                    Leer la siguiente perspectiva <ArrowRight size={17} />
                  </button>
                </div>
              </article>
            </div>
          </>
        )}
      </DemoDialog>
    </div>
  );
}
