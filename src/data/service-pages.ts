import { plans, planLabel } from "./pricing";
export const servicePages = [
  {
    id: "web",
    slug: "desarrollo-web-peru",
    title: "Desarrollo de páginas web en Perú",
    description:
      "Diseñamos y desarrollamos páginas web para presentar tu negocio, comunicar tus servicios y facilitar el contacto. Landing pages y webs corporativas con alcance claro.",
    eyebrow: "DESARROLLO WEB / PERÚ",
    headline: "Una web que se siente tuya. Y trabaja para tu negocio.",
    art: "web" as const,
    intro:
      "Tu sitio debe ayudar a las personas a entender lo que haces y dar el siguiente paso. Partimos de tu objetivo, organizamos el contenido y construimos una experiencia que se adapta a móvil y escritorio.",
    deliverables: [
      "Estructura de contenido y llamadas a la acción acordes al objetivo.",
      "Diseño responsive y navegación accesible.",
      "Desarrollo de páginas y componentes según el alcance acordado.",
      "Metadatos, encabezados, enlaces y base técnica de SEO.",
      "Formulario y canales de contacto definidos en la propuesta.",
      "Revisiones y acompañamiento al lanzamiento según la cotización.",
    ],
    considerations: `Planes de pago único: ${plans
      .filter((p) => p.id !== "avanzada")
      .map((p) => planLabel(p.id))
      .join(
        "; ",
      )}. El plan Avanzada se cotiza según los requerimientos. Dominio, hosting, mantenimiento, textos, fotografías, licencias e integraciones adicionales se detallan por separado. El formulario de esta demo prepara un resumen; el envío real requiere conectar el backend.`,
    questions: [
      {
        q: "¿Landing o web multipágina?",
        a: "Una landing puede concentrar una oferta o servicio. Una web multipágina permite desarrollar varias áreas del negocio. Lo elegimos a partir de tu contenido y objetivo.",
      },
      {
        q: "¿Pueden garantizar posiciones en Google?",
        a: "No. Preparamos una base técnica y contenido que ayuden a comprender tu web. El posicionamiento depende también de competencia, relevancia, publicación y evolución del sitio.",
      },
      {
        q: "¿Qué necesito para empezar?",
        a: "Una descripción de tu negocio, la acción principal que buscas y los textos o imágenes disponibles. Definimos los materiales pendientes antes de comenzar.",
      },
    ],
    article: "cuanto-cuesta-pagina-web-peru",
    type: "Desarrollo de páginas web",
  },
  {
    id: "automation",
    slug: "automatizacion-n8n",
    title: "Automatización con n8n y Python para negocios",
    description:
      "Evaluamos procesos repetitivos y diseñamos automatizaciones con n8n o Python. Integraciones, validaciones y tratamiento de errores según tus herramientas y operación.",
    eyebrow: "AUTOMATIZACIÓN / N8N + PYTHON",
    headline: "Menos pasos repetidos. Más espacio para avanzar.",
    art: "automation" as const,
    intro:
      "Primero entendemos el proceso; después conectamos las herramientas. Diseñamos flujos con entradas, reglas, salidas y responsables claros, empezando por un piloto que puedas revisar.",
    deliverables: [
      "Revisión del flujo actual y de sus excepciones.",
      "Definición de los accesos e integraciones disponibles.",
      "Diseño y desarrollo del flujo según alcance.",
      "Validaciones, detección de duplicados y tratamiento de errores.",
      "Pruebas con datos ficticios y revisión de resultados.",
      "Documentación del flujo y condiciones de operación.",
    ],
    considerations:
      "La viabilidad depende de las herramientas, sus API, permisos y condiciones. Licencias, infraestructura, consumo y mantenimiento se cotizan según el caso. No prometemos ahorros concretos antes de evaluar y medir el proceso.",
    questions: [
      {
        q: "¿Todo proceso puede automatizarse?",
        a: "No siempre conviene. Revisamos si las reglas son claras, qué excepciones aparecen y dónde debe seguir participando una persona.",
      },
      {
        q: "¿Debo usar n8n o Python?",
        a: "La elección depende de las integraciones, la lógica necesaria y la operación. Podemos combinar herramientas cuando aporta claridad al alcance.",
      },
      {
        q: "¿Qué pasa si una conexión falla?",
        a: "El diseño debe definir cómo se detecta el error, qué se registra y quién revisa el caso. Es parte de la evaluación, no un detalle que se deja para el final.",
      },
    ],
    article: "automatizacion-n8n-negocios",
    type: "Automatización inteligente",
  },
  {
    id: "ai",
    slug: "inteligencia-artificial",
    title: "Integraciones de inteligencia artificial para empresas en Perú",
    description:
      "Exploramos asistentes e integraciones con modelos de lenguaje para tareas concretas. Diseño de flujos, evaluación y supervisión humana con alcance definido.",
    eyebrow: "INTELIGENCIA ARTIFICIAL / INTEGRACIONES",
    headline: "Una buena pregunta. Una integración con propósito.",
    art: "seo" as const,
    intro:
      "La inteligencia artificial aporta valor cuando responde a una necesidad concreta. Evaluamos el contexto, las fuentes disponibles y cómo una persona verificará el resultado antes de integrar un modelo en tu operación.",
    deliverables: [
      "Definición de la tarea y de sus criterios de evaluación.",
      "Revisión de fuentes, accesos y datos necesarios.",
      "Diseño del flujo de interacción y sus límites.",
      "Integración con el proveedor o herramienta acordados.",
      "Pruebas con ejemplos y situaciones que requieren revisión.",
      "Documentación de uso, supervisión y dependencias.",
    ],
    considerations:
      "Las respuestas de un modelo pueden ser incorrectas. El diseño debe contemplar revisión humana y límites de uso. Consumo de API, licencias, tratamiento de datos y mantenimiento se evalúan y cotizan por separado.",
    questions: [
      {
        q: "¿Qué tipo de solución podemos explorar?",
        a: "Podemos evaluar asistentes de consulta, clasificación o apoyo a tareas de contenido. La propuesta concreta depende de las fuentes, permisos y nivel de supervisión que necesite tu negocio.",
      },
      {
        q: "¿La IA reemplaza la revisión de una persona?",
        a: "No se debe asumir. Definimos qué resultados requieren revisión, qué fuentes deben consultarse y qué decisiones quedan fuera del flujo automático.",
      },
      {
        q: "¿La web demo ya tiene una IA conectada?",
        a: "No. Esta fase presenta el servicio y permite preparar una solicitud. La integración se desarrolla después de acordar alcance, proveedor y condiciones.",
      },
    ],
    article: "automatizacion-n8n-negocios",
    type: "Inteligencia artificial",
  },
] as const;
