import type { Project, Service, Testimonial } from "@/types";
export { plans } from "./pricing";

export const site = {
  name: "JAIAX Labs",
  descriptor: "DIGITAL STUDIO",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3107").replace(
    /\/$/,
    "",
  ),
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "51924488034",
  description:
    "Desarrollo de páginas web y tiendas online en Perú para atraer clientes y facilitar ventas. Diseño web, software a medida y automatización para negocios.",
};
export const navigation = [
  ["inicio", "Inicio"],
  ["servicios", "Servicios"],
  ["proyectos", "Proyectos"],
  ["nosotros", "Nosotros"],
  ["proceso", "Proceso"],
  ["precios", "Precios"],
  ["blog", "Blog"],
  ["contacto", "Contacto"],
];
export const services: Service[] = [
  {
    id: "web",
    title: "Desarrollo de páginas web",
    description:
      "Tu mejor primera impresión. Sitios rápidos, memorables y diseñados para convertir.",
    icon: "Globe",
  },
  {
    id: "ecommerce",
    title: "Tiendas online",
    description:
      "Una experiencia de compra intuitiva, desde el primer clic hasta el checkout.",
    icon: "ShoppingBag",
  },
  {
    id: "software",
    title: "Sistemas y aplicaciones",
    description:
      "Software a la medida de tu operación. Una base sólida para lo que viene.",
    icon: "Code2",
  },
  {
    id: "automation",
    title: "Automatización inteligente",
    description:
      "Conectamos tus herramientas con n8n y Python para liberar tiempo valioso.",
    icon: "Workflow",
  },
  {
    id: "ai",
    title: "Inteligencia artificial",
    description:
      "Integramos modelos de lenguaje y asistentes en los procesos donde aportan valor.",
    icon: "Sparkles",
  },
  {
    id: "data",
    title: "Dashboards y datos",
    description:
      "Transformamos información dispersa en una visión clara para tomar decisiones.",
    icon: "ChartNoAxesCombined",
  },
];
export const projects: Project[] = [
  {
    id: "p1",
    slug: "nodo",
    name: "NODO",
    category: "PLATAFORMA LOGÍSTICA",
    description:
      "Un centro de operaciones que convierte rutas, entregas e incidencias en decisiones claras.",
    technologies: ["Producto digital", "Operaciones", "Datos"],
    cover: "/images/nodo-web-concept-v3.png",
    status: "publicado",
    authorized: true,
    concept: true,
    problem:
      "Reunir el pulso de una operación logística en una interfaz fácil de leer y accionar.",
    solution:
      "Un dashboard con jerarquía operativa, seguimiento de rutas y estados visibles de un vistazo.",
    results: [],
  },
  {
    id: "p2",
    slug: "soma",
    name: "SOMA",
    category: "COMERCIO DIGITAL",
    description:
      "Una experiencia de compra serena donde el producto, el relato y la decisión comparten el mismo espacio.",
    technologies: ["Ecommerce", "Dirección de arte", "UX"],
    cover: "/images/soma-web-concept-v3.png",
    status: "publicado",
    authorized: true,
    concept: true,
    problem:
      "Dar personalidad a un catálogo sin añadir ruido al recorrido de compra.",
    solution:
      "Una vitrina editorial con producto protagonista, navegación mínima y una identidad cálida.",
    results: [],
  },
  {
    id: "p3",
    slug: "umbral",
    name: "UMBRAL",
    category: "PLATAFORMA EDITORIAL",
    description:
      "Una revista digital que hace de cada historia una pausa visual, no otra pieza de contenido.",
    technologies: ["Editorial", "Contenido", "Identidad"],
    cover: "/images/umbral-web-concept-v3.png",
    status: "publicado",
    authorized: true,
    concept: true,
    problem:
      "Organizar ideas y lecturas con una voz editorial reconocible desde la primera pantalla.",
    solution:
      "Una portada de ritmo pausado, tipografía expresiva y módulos pensados para descubrir sin prisa.",
    results: [],
  },
  ...["PROMPERÚ", "ASCENCIO PERÚ", "GERALTIMPORT"].map(
    (name, i): Project => ({
      id: `pending-${i}`,
      slug: `pendiente-${i}`,
      name,
      category: "POR VERIFICAR",
      description: "Participación y autorización pendientes de confirmar.",
      technologies: [],
      cover: "/images/territorio.svg",
      status: "pendiente",
      authorized: false,
      concept: false,
      problem: "",
      solution: "",
      results: [],
    }),
  ),
  ...[1, 2].map(
    (i): Project => ({
      id: `future-${i}`,
      slug: `futuro-${i}`,
      name: `Próximo proyecto ${i}`,
      category: "ESPACIO EDITABLE",
      description: "Completa este espacio desde la demo.",
      technologies: [],
      cover: "/images/forma.svg",
      status: "borrador",
      authorized: false,
      concept: false,
      problem: "",
      solution: "",
      results: [],
    }),
  ),
];
export const publicProjects = projects.filter(
  (p) => p.status === "publicado" && p.authorized,
);
export const testimonials: Testimonial[] = [];
export const steps = [
  {
    title: "Descubrimiento",
    description:
      "Escuchamos tu idea, entendemos tu negocio y definimos lo que realmente necesitas.",
  },
  {
    title: "Diseño y estrategia",
    description:
      "Convertimos los objetivos en una experiencia clara. Validamos el diseño contigo.",
  },
  {
    title: "Desarrollo",
    description:
      "Construimos con precisión, probamos cada interacción y cuidamos el rendimiento.",
  },
  {
    title: "Lanzamiento y evolución",
    description:
      "Publicamos, te acompañamos y dejamos una base lista para seguir creciendo.",
  },
];
