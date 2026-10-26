import type { Plan } from "@/types";

/** One source for cards, the quote form, campaign landing and editorial references. */
export const plans: Plan[] = [
  {
    id: "basica",
    name: "Básica",
    price: "70",
    description: "Tu primera web. Un solo pago.",
    featured: false,
    billing: "Pago único de desarrollo",
    budget: "US$ 70",
    features: [
      "Landing responsive de una página",
      "Hasta cinco secciones",
      "Formulario de contacto",
      "Botón de WhatsApp",
      "SEO básico",
      "Una ronda de ajustes",
    ],
  },
  {
    id: "profesional",
    name: "Profesional",
    price: "120",
    description: "Más detalle. Más posibilidades.",
    featured: true,
    billing: "Pago único de desarrollo",
    budget: "US$ 120",
    features: [
      "Landing de hasta ocho secciones",
      "Diseño visual personalizado",
      "Formulario de captación",
      "WhatsApp y enlaces sociales",
      "SEO y metadatos sociales",
      "Dos rondas de ajustes",
    ],
  },
  {
    id: "negocio",
    name: "Negocio",
    price: "300",
    description: "Una presencia completa para tu marca.",
    featured: false,
    billing: "Pago único de desarrollo",
    budget: "US$ 300",
    features: [
      "Web corporativa de hasta cinco páginas",
      "Diseño personalizado y responsive",
      "Formularios de captación",
      "Integración de analítica acordada",
      "SEO técnico inicial",
      "Dos rondas de ajustes",
    ],
  },
  {
    id: "avanzada",
    name: "Avanzada",
    price: "A medida",
    description: "Lo que tu proyecto realmente necesite.",
    featured: false,
    billing: "Cotización personalizada",
    budget: "Más de US$ 300",
    features: [
      "Ecommerce y aplicaciones web",
      "Sistemas y paneles administrativos",
      "Integraciones API",
      "Automatización e inteligencia artificial",
      "Funcionalidades según requerimientos",
      "Alcance, plazos y soporte acordados",
    ],
  },
];
export const basicPlan = plans[0];
export const offerPath = "/web-desde-70";
export const budgetOptions = [
  ...plans.slice(0, 3).map((p) => p.budget),
  "Más de US$ 300",
  "Necesito orientación",
];

const legacyPlans: Record<string, string> = {
  starter: "basica",
  business: "negocio",
  advanced: "avanzada",
};
export function normalizePlanId(value: unknown): string {
  if (typeof value !== "string") return "";
  const id = legacyPlans[value] || value;
  return plans.some((p) => p.id === id) ? id : "";
}
export function planLabel(value?: string): string {
  const plan = plans.find((p) => p.id === normalizePlanId(value));
  return plan
    ? `${plan.name} — ${plan.id === "avanzada" ? plan.price : `US$ ${plan.price}`}`
    : "Por definir";
}
