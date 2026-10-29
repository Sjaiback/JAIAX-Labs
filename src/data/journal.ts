import { basicPlan, planLabel, plans } from "./pricing";
export interface ArticleSection {
  id: string;
  title: string;
  paragraphs: string[];
  points?: string[];
}
export interface JournalPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  minutes: number;
  art: "web" | "automation" | "seo";
  takeaway: string;
  sections: ArticleSection[];
  relatedService: string;
  sources: { title: string; url: string }[];
}
export type PostSummary = Omit<JournalPost, "sections" | "sources">;
const journalEntries: Omit<JournalPost, "minutes">[] = [
  {
    slug: "como-una-web-ayuda-a-vender",
    title: "Tu cliente tiene dudas. Tu web puede ayudarle a decidir.",
    description: "Cómo una página clara conecta tus redes con consultas mejor informadas: servicios, ejemplos, confianza y un siguiente paso fácil.",
    category: "Negocios y ventas", date: "2026-10-28", art: "web",
    takeaway: "Una web ayuda cuando responde lo que el cliente necesita saber antes de escribirte. El diseño tiene que facilitar esa decisión.",
    relatedService: "desarrollo-web-peru", sources: [],
    sections: [
      { id: "decidir", title: "Piensa en la última consulta que recibiste", paragraphs: [
        "¿Qué vendes? ¿Atiendes mi zona? ¿Cómo puedo pedirlo? Si estas preguntas llegan una y otra vez por chat, ahí tienes el contenido más útil para tu página. Una persona que descubre tu negocio no conoce tu proceso: necesita entender rápidamente si puedes ayudarla y qué hacer después.",
        "Imagina un taller que publica buenos trabajos en Instagram, pero no explica qué servicios ofrece ni cómo reservar. Una web puede reunir esos servicios, fotografías propias, ubicación, horarios y un botón para solicitar una cita. Ese recorrido permite llegar al chat con más contexto, aunque no garantiza que cada visita termine en una venta."
      ], points: ["Explica qué haces y para quién en la primera pantalla.", "Muestra ejemplos reales y con permiso de publicación.", "Responde las dudas que suelen frenar una consulta."] },
      { id: "redes", title: "Dales un destino a tus redes y campañas", paragraphs: [
        "Las redes permiten descubrirte y conversar. La web puede ser el lugar donde desarrollas tu propuesta con orden. En vez de enviar al cliente a buscar información entre publicaciones, comparte una página dedicada al servicio por el que preguntó.",
        "Si ofreces servicios y productos, evita mezclar todos los recorridos. Quien busca una cotización necesita información distinta de quien quiere comprar un artículo. Una entrada clara para cada necesidad permite profundizar sin llenar la portada de texto."
      ] },
      { id: "contacto", title: "Haz que preguntar sea fácil desde el celular", paragraphs: [
        "El botón de contacto debe aparecer donde la persona ya tiene información para decidir. Un mensaje de WhatsApp que mencione el servicio elegido le ahorra explicaciones. Antes de publicar, prueba el recorrido con un teléfono: lee el texto, abre los ejemplos y comprueba que el enlace llega al número correcto.",
        "No necesitas empezar con un sitio enorme. Una página con una propuesta clara, buenos ejemplos, preguntas frecuentes y contacto puede ser un primer alcance razonable. Si necesitas pagos, reservas o un catálogo administrable, define esas funciones aparte para elegir la herramienta adecuada."
      ] },
      { id: "medir", title: "Mira qué pasa después de publicar", paragraphs: [
        "Recoge las preguntas que siguen apareciendo por chat: pueden revelar información que falta en el sitio. Cuando configures una medición apropiada y el consentimiento que corresponda, revisa visitas a servicios y clics de contacto junto con la calidad de las consultas recibidas.",
        "La web acompaña a tu oferta, atención y capacidad de entrega. Para evaluar su utilidad, acuerda qué quieres mejorar y compara períodos similares. Más animaciones o más páginas por sí solas no sustituyen una propuesta que se entiende."
      ] }
    ]
  },
  {
    slug: "excel-o-sistema-para-mi-negocio",
    title: "¿Excel o un sistema? Mira dónde se atasca tu negocio.",
    description: "Señales para decidir si seguir con hojas de cálculo, conectar herramientas o crear un sistema que organice ventas, inventario y trabajo en equipo.",
    category: "Operaciones", date: "2026-10-28", art: "automation",
    takeaway: "El cambio tiene sentido cuando resuelve un problema concreto del trabajo diario. Empieza por un proceso y comprueba el resultado antes de ampliarlo.",
    relatedService: "automatizacion-n8n", sources: [],
    sections: [
      { id: "excel", title: "Excel puede seguir siendo una buena herramienta", paragraphs: [
        "Una hoja de cálculo resulta práctica para explorar datos, preparar presupuestos o llevar un registro sencillo. Si una persona mantiene un archivo claro y el equipo encuentra lo que necesita, quizá el primer paso sea mejorar esa estructura. No todas las empresas necesitan un ERP completo.",
        "La pregunta útil es qué ocurre alrededor del archivo. ¿Copias el mismo pedido en varias hojas? ¿El almacén y ventas manejan cifras distintas? ¿Necesitas preguntar por chat cuál es la versión vigente? Describe esos casos antes de elegir software."
      ] },
      { id: "pedido", title: "Sigue un pedido desde que entra hasta que se entrega", paragraphs: [
        "Imagina que ventas registra una compra, almacén actualiza las existencias y administración confirma el pago en documentos separados. Si nadie conecta esos pasos, el equipo puede trabajar con información incompleta. El problema es el recorrido de los datos, no necesariamente el formato de la hoja.",
        "Un sistema diseñado para ese flujo puede compartir registros, validar campos y mostrar estados según el rol de cada persona. Una automatización también puede conectar herramientas existentes. Ambas opciones requieren definir qué se actualiza, quién tiene permisos y cómo se gestionan los errores."
      ], points: ["¿Cuántas veces se vuelve a escribir el mismo dato?", "¿Quién confirma que un estado cambió?", "¿Qué pasa si dos personas modifican el mismo pedido?", "¿Cómo se detecta y corrige una diferencia de inventario?"] },
      { id: "piloto", title: "Prueba un módulo antes de cambiar toda la operación", paragraphs: [
        "Elige un proceso que puedas describir y medir, por ejemplo el seguimiento de pedidos. Acuerda los campos, los estados, las personas responsables y las excepciones. Usa datos de prueba y verifica que el equipo entiende el recorrido antes de incorporar información real.",
        "Registra una referencia inicial: tiempo dedicado a copiar datos, incidencias o pedidos que requieren aclaraciones. Después del piloto podrás comprobar si el cambio ayudó. Una interfaz atractiva aporta claridad, pero el valor se demuestra en el trabajo que el equipo puede resolver."
      ] },
      { id: "continuidad", title: "Incluye la continuidad en la decisión", paragraphs: [
        "Una demo muestra cómo podría usarse una solución; no demuestra que ya esté conectada a tu empresa. Para ponerla en producción hay que acordar almacenamiento, accesos, copias de seguridad, migración de datos, formación y soporte. Los costos dependen de esos requisitos y del alcance.",
        "En JAIAX Labs podemos revisar contigo si conviene ordenar una hoja, integrar herramientas o desarrollar un sistema. Podemos comenzar por ventas, inventario o un panel operativo. La meta es que la solución acompañe a tu negocio y que sepas cómo mantenerla."
      ] }
    ]
  },
  {
    slug: "cuanto-cuesta-pagina-web-peru",
    title: "¿Cuánto cuesta una página web en Perú? Empieza por el alcance.",
    description: `Qué comparar en una cotización web: páginas, contenido, dominio y mantenimiento. Conoce el plan Básica de JAIAX Labs por US$ ${basicPlan.price}, de pago único.`,
    category: "Desarrollo web",
    date: "2026-10-26",
    art: "web",
    takeaway:
      "El precio solo tiene sentido cuando sabes qué vas a recibir, qué debes aportar y qué se cotiza por separado.",
    relatedService: "desarrollo-web-peru",
    sources: [],
    sections: [
      {
        id: "objetivo",
        title: "Primero define qué necesita conseguir tu web",
        paragraphs: [
          "Pedir una página web sin definir su objetivo suele producir cotizaciones difíciles de comparar. Una web que presenta un servicio y abre conversaciones necesita una estructura diferente de una tienda con catálogo, pagos y seguimiento de pedidos. Antes de hablar de tecnología, escribe qué debería poder hacer una persona después de visitar tu sitio.",
          "Para un negocio que empieza en Perú, ese primer objetivo puede ser explicar un servicio, mostrar un catálogo informativo o preparar una solicitud de cotización. Elegir uno como prioridad ayuda a decidir el contenido y a evitar funcionalidades que todavía no necesitas.",
        ],
        points: [
          "¿A quién está dirigida la página?",
          "¿Qué información necesita para confiar en tu negocio?",
          "¿Cuál será la acción principal: llamar, cotizar o comprar?",
        ],
      },
      {
        id: "alcance",
        title:
          "Una landing y una web corporativa resuelven necesidades distintas",
        paragraphs: [
          "Una landing concentra una propuesta en una sola página. Puede organizar servicios, beneficios, preguntas y un formulario en un recorrido breve. Una web corporativa reparte la información en varias páginas y permite desarrollar con más detalle cada servicio o área del negocio.",
          `En JAIAX Labs ofrecemos cuatro planes: ${plans.map((p) => planLabel(p.id)).join("; ")}. Básica incluye una landing de hasta cinco secciones, formulario, WhatsApp, optimización para buscadores y una ronda de ajustes. Profesional amplía la landing a ocho secciones y dos rondas de ajustes; Negocio cubre una web corporativa de hasta cinco páginas. Los tres tienen un pago único de desarrollo. Avanzada se define según los requerimientos. Son precios propios para los alcances publicados; no representan un promedio del mercado peruano.`,
          "Una tienda online o un sistema con usuarios requiere una evaluación aparte. Cobrar, administrar inventario o gestionar información interna agrega decisiones sobre seguridad, datos, operación y soporte que no están incluidas automáticamente en una landing.",
        ],
      },
      {
        id: "incluido",
        title: "Compara lo que incluye cada propuesta",
        paragraphs: [
          "Solicita un documento que detalle páginas, secciones, funcionalidades y entregables. Pregunta también quién prepara los textos y las imágenes, cuántas revisiones existen y qué ocurre si cambia el alcance. Dos propuestas con el mismo precio pueden exigir aportes muy diferentes de tu parte.",
          "El diseño responsive debe contemplar cómo se lee y se usa el contenido desde un teléfono. No basta con reducir la versión de escritorio. Los formularios, el tamaño de los botones y la navegación deben seguir siendo claros en una pantalla pequeña.",
        ],
        points: [
          "Cantidad de páginas y secciones acordadas.",
          "Formularios e integraciones que realmente se conectarán.",
          "Textos, imágenes y accesos que deberás entregar.",
          "Revisiones, aprobación final y forma de entrega.",
        ],
      },
      {
        id: "costos",
        title: "Separa desarrollo, dominio, hosting y continuidad",
        paragraphs: [
          "El dominio es el nombre que las personas usarán para encontrar tu sitio; el hosting es el servicio donde se publicará. Su contratación, renovaciones y titularidad deben quedar claras. No están incluidos en el pago de desarrollo salvo que una cotización los detalle expresamente.",
          "Licencias, herramientas de terceros, impuestos aplicables, mantenimiento y nuevas funcionalidades también deben acordarse. Pregunta qué tareas se incluyen después del lanzamiento y cómo se cotizan los cambios. Una propuesta transparente distingue la entrega inicial de los servicios recurrentes.",
        ],
      },
      {
        id: "preparar",
        title: "Lleva un brief breve para recibir una mejor cotización",
        paragraphs: [
          "No necesitas un documento técnico. Prepara una descripción del negocio, el público, el objetivo de la página, las secciones que imaginas y los materiales disponibles. Añade dos o tres referencias explicando qué te interesa de cada una, sin pedir una copia literal.",
          "Con esa base podemos conversar sobre prioridades y preparar una propuesta con alcance, condiciones y fechas acordadas. El resultado útil de la cotización no es solo un precio: es una decisión compartida sobre lo que construiremos primero.",
        ],
      },
    ],
  },
  {
    slug: "automatizacion-n8n-negocios",
    title:
      "Automatización con n8n: encuentra el primer proceso que vale la pena conectar.",
    description:
      "Una guía para elegir un proceso repetitivo, definir entradas y salidas, tratar errores y probar una automatización antes de usar datos reales.",
    category: "Automatización",
    date: "2026-10-26",
    art: "automation",
    takeaway:
      "Empieza con un flujo pequeño, medible y reversible. Define quién lo supervisa y qué debe ocurrir cuando algo falla.",
    relatedService: "automatizacion-n8n",
    sources: [
      {
        title: "Cómo se organiza un workflow en n8n",
        url: "https://docs.n8n.io/workflows/",
      },
    ],
    sections: [
      {
        id: "detectar",
        title: "Busca repetición antes que complejidad",
        paragraphs: [
          "Copiar un dato entre herramientas, revisar si llegó una solicitud y avisar a otra persona son tareas distintas, pero comparten una pregunta: ¿se repiten con reglas que puedes explicar? Ese suele ser un buen punto de partida para explorar una automatización.",
          "Una tarea ocasional o llena de excepciones puede requerir primero ordenar el proceso. Automatizar una secuencia confusa no la vuelve clara. Antes de elegir herramientas, dibuja cómo se realiza hoy y marca dónde se repiten pasos, se pierde información o se necesita una decisión humana.",
        ],
      },
      {
        id: "flujo",
        title: "Define la entrada, las reglas y la salida",
        paragraphs: [
          "En n8n, un workflow conecta nodos para automatizar un proceso. Esa estructura técnica resulta más útil cuando responde a una descripción sencilla del negocio: qué inicia el flujo, qué condiciones deben cumplirse y qué resultado esperamos.",
          "Por ejemplo, una solicitud de contacto podría validarse, clasificarse y preparar un aviso interno. Eso es un escenario de diseño, no una integración que ya esté activa en esta demo. Para implementarlo hay que confirmar los servicios disponibles, sus permisos y la forma de tratar los datos.",
        ],
        points: [
          "Entrada: el evento que inicia el proceso.",
          "Reglas: datos obligatorios, condiciones y excepciones.",
          "Salida: un registro o acción que puedas comprobar.",
          "Responsable: quién revisa los casos que no se resuelven automáticamente.",
        ],
      },
      {
        id: "errores",
        title: "Diseña también el camino cuando algo falla",
        paragraphs: [
          "Una herramienta puede dejar de responder, cambiar un formato o recibir una solicitud incompleta. Define cómo detectar esos casos y quién debe revisarlos. La automatización necesita una respuesta explícita ante los errores; un flujo que termina sin avisar puede dar una falsa sensación de que todo está funcionando.",
          "También conviene prever duplicados. Si una misma entrada se procesa dos veces, el resultado no debería producir acciones repetidas sin control. Según el caso se utilizan identificadores y registros de estado para saber qué se ejecutó y qué sigue pendiente.",
        ],
      },
      {
        id: "piloto",
        title: "Prueba un piloto con datos ficticios",
        paragraphs: [
          "Antes de conectar información real, prepara ejemplos normales, incompletos y duplicados. Comprueba que cada caso produce una salida comprensible y que los avisos de error llegan al responsable acordado. Documenta los accesos necesarios y evita incorporar credenciales en el contenido del sitio o en archivos públicos.",
          "El piloto también permite revisar si la automatización conserva suficiente contexto para la persona que la supervisa. No se trata solo de mover datos, sino de que alguien pueda entender qué ocurrió y decidir el siguiente paso.",
        ],
      },
      {
        id: "medir",
        title: "Evalúa el resultado antes de ampliar",
        paragraphs: [
          "Acuerda qué observarás: tareas manuales que siguen pendientes, frecuencia de errores o tiempo que tarda un caso en pasar de una etapa a otra. Registra la situación inicial para poder comparar después. Sin esa referencia es difícil saber si la solución aportó valor.",
          "Cuando el primer flujo sea estable, revisa qué parte del proceso merece conectarse a continuación. En JAIAX Labs podemos ayudarte a evaluar el alcance de una automatización con n8n o Python, sus dependencias y su operación. No prometemos un ahorro concreto sin entender y medir tu proceso.",
        ],
      },
    ],
  },
  {
    slug: "seo-para-web-de-servicios",
    title:
      "SEO para una web de servicios: ayuda a que te encuentren y te entiendan.",
    description:
      "Contenido útil, páginas de servicio claras, enlaces internos y SEO técnico. Una base para mejorar la visibilidad sin prometer posiciones en Google.",
    category: "Estrategia digital",
    date: "2026-10-26",
    art: "seo",
    takeaway:
      "Una página debe resolver una necesidad real antes de intentar posicionarse para una palabra clave.",
    relatedService: "desarrollo-web-peru",
    sources: [
      {
        title: "Guía de SEO de Google Search Central",
        url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide",
      },
      {
        title: "Contenido útil y centrado en las personas",
        url: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content",
      },
    ],
    sections: [
      {
        id: "intencion",
        title: "Responde a la intención de la búsqueda",
        paragraphs: [
          "Una persona que busca desarrollo web puede estar explorando opciones, comparando alcances o intentando contratar un servicio. El contenido debe ayudarle a entender si tu propuesta encaja. Empieza por las preguntas que recibes de tus clientes potenciales y las decisiones que necesitan tomar.",
          "Para una web de servicios, describe qué construyes, para quién puede ser útil y qué pasos necesita dar alguien para cotizar. Si trabajas en Perú, menciona ese contexto de forma natural cuando sea relevante. Repetir nombres de ciudades o palabras clave sin aportar información no mejora la experiencia de lectura.",
        ],
      },
      {
        id: "paginas",
        title: "Dale espacio propio a cada servicio",
        paragraphs: [
          "Una página que mezcla todos los temas puede resultar difícil de recorrer. Una estructura de servicios permite explicar una necesidad con ejemplos, entregables y preguntas concretas. El objetivo no es multiplicar páginas, sino que cada una tenga un propósito distinto y suficiente contenido útil.",
          "Enlaza una guía del blog con el servicio que ayuda a resolver esa necesidad. Por ejemplo, una explicación sobre cómo comparar cotizaciones puede conducir a la página de desarrollo web y, desde allí, al formulario. El recorrido debe ayudar al lector sin obligarlo a repetir pasos ni ocultar información importante.",
        ],
      },
      {
        id: "tecnico",
        title: "Cuida una base técnica que se pueda revisar",
        paragraphs: [
          "Usa títulos descriptivos, descripciones coherentes y URLs comprensibles. Mantén enlaces internos reales y una jerarquía de encabezados que refleje la estructura del contenido. La versión móvil debe permitir leer, navegar y completar las acciones principales con comodidad.",
          "Los enlaces canónicos ayudan a indicar la versión preferida de una URL, y el sitemap organiza las páginas que quieres comunicar a los buscadores. Su configuración necesita el dominio definitivo. Mientras un sitio sea una vista previa, conviene diferenciarlo claramente de la versión que se publicará.",
        ],
        points: [
          "Una URL principal por contenido y títulos propios para cada página.",
          "Contenido accesible en el HTML, sin depender solo de efectos visuales.",
          "Imágenes con texto alternativo cuando aporten información.",
          "Datos estructurados que describan lo que la página muestra realmente.",
        ],
      },
      {
        id: "confianza",
        title: "Publica información que puedas respaldar",
        paragraphs: [
          "Explica quién publica el contenido y cuándo se actualizó. Si incorporas datos externos, enlaza la fuente correspondiente y distingue los hechos de tus propuestas. No agregues reseñas, cifras de resultados o logotipos de clientes sin verificación.",
          "Una buena guía puede resolver una duda concreta sin prometer una respuesta universal. Los datos estructurados ayudan a describir el contenido, pero no sustituyen su calidad ni garantizan que se muestre un resultado enriquecido. La utilidad y la transparencia deben seguir siendo visibles para la persona que visita la página.",
        ],
      },
      {
        id: "despues",
        title: "Después de publicar: observar y mejorar",
        paragraphs: [
          "Una vez que el dominio esté activo y bajo tu control, podrás verificarlo en Google Search Console y comunicar el sitemap. Revisa qué páginas se indexan, qué consultas generan impresiones y dónde las personas encuentran dificultades. Usa esa información para corregir contenido y recorridos.",
          "Nadie puede garantizar el primer lugar para cada búsqueda. La competencia, la intención, la ubicación y la evaluación del buscador influyen en los resultados. La estrategia sostenible consiste en publicar información útil, mantener la web accesible y mejorar a partir de datos reales.",
        ],
      },
    ],
  },
];
export const journalPosts: JournalPost[] = journalEntries.map((p) => ({
  ...p,
  minutes: Math.max(
    1,
    Math.ceil(
      p.sections
        .flatMap((s) => [s.title, ...s.paragraphs, ...(s.points || [])])
        .join(" ")
        .split(/\s+/).length / 180,
    ),
  ),
}));
export const postSummaries: PostSummary[] = journalPosts.map((p) => ({
  slug: p.slug,
  title: p.title,
  description: p.description,
  category: p.category,
  date: p.date,
  minutes: p.minutes,
  art: p.art,
  takeaway: p.takeaway,
  relatedService: p.relatedService,
}));
export const publishedDate = (date: string) =>
  new Date(`${date}T12:00:00-05:00`).toLocaleDateString("es-PE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "America/Lima",
  });
