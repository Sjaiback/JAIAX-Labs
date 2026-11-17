export type ExperienceKind = "website" | "systems" | "pricing" | "automation" | "seo";
export const articleExperiences: Record<ExperienceKind, { title: string; intro: string }> = {
  website: { title: "Prueba cómo cambia una consulta", intro: "Un taller de bicicletas ficticio nos sirve para comparar una oferta vaga con otra que responde las dudas del cliente." },
  systems: { title: "¿Ordenar Excel, conectar herramientas o crear un sistema?", intro: "Marca las situaciones de tu equipo. La orientación cambia según el problema; no necesitas completar un formulario de contacto." },
  pricing: { title: "Encuentra un punto de partida para tu web", intro: "Elige lo que necesitas y compara los planes publicados de JAIAX. El alcance definitivo se confirma en una cotización." },
  automation: { title: "Recorre una automatización paso a paso", intro: "Cambia el caso y avanza por un flujo de solicitud comercial. Los datos y los resultados son simulados: no hay servicios conectados." },
  seo: { title: "Prueba cómo presentarías tu servicio en Google", intro: "Edita el título y la descripción para ver una presentación orientativa. Este ejercicio no modifica los metadatos de tu web." },
};

export type WebScope = "landing" | "extended" | "corporate" | "custom";
export function recommendedPlan(scope: WebScope, integrations: boolean) {
  if (integrations || scope === "custom") return "avanzada";
  return { landing: "basica", extended: "profesional", corporate: "negocio" }[scope];
}

export interface ProcessNeeds { repeated: boolean; shared: boolean; integrations: boolean; permissions: boolean }
export function processAdvice(needs: ProcessNeeds) {
  if (needs.permissions) return { title: "Evaluar un sistema con roles y estados", detail: "Define quién puede consultar o cambiar cada registro. Un sistema puede organizar ese recorrido; también conviene evaluar herramientas existentes antes de desarrollar una propia." };
  if (needs.repeated && needs.integrations) return { title: "Probar una integración pequeña", detail: "Elige un traspaso de datos repetitivo y comprueba que las API y permisos permiten conectarlo. Un piloto con n8n o Python puede ayudarte a evaluar el resultado antes de ampliar." };
  if (needs.repeated) return { title: "Ordenar el proceso y comprobar las conexiones", detail: "Identifica el dato que se copia, sus reglas y los errores habituales. Después verifica si las herramientas ofrecen API o exportaciones que puedan conectarse." };
  if (needs.shared) return { title: "Acordar una fuente compartida y responsables", detail: "Revisa versiones, campos y responsables de edición. Una hoja compartida bien organizada puede bastar si no necesitas reglas o permisos más complejos." };
  return { title: "Empieza por el problema que quieres resolver", detail: "Si tu hoja funciona y el equipo encuentra lo que necesita, no hay que reemplazarla por costumbre. Marca las situaciones que sí ocurren para explorar otra opción." };
}

export type WorkflowCase = "valid" | "incomplete" | "duplicate" | "unavailable";
export function workflowStages(scenario: WorkflowCase) {
  const invalid = scenario === "incomplete", duplicate = scenario === "duplicate", unavailable = scenario === "unavailable";
  return [
    { title: "Recibir", detail: invalid ? "Solicitud DEMO-104: falta un medio de contacto." : "Solicitud DEMO-104: un negocio pide información sobre su web.", outcome: "Entrada simulada" },
    { title: "Validar", detail: invalid ? "La solicitud queda pendiente de revisión. Sin contacto no se continúa al registro ni al aviso." : "Los campos del ejemplo están completos. Se comprueba el identificador para evitar duplicados.", outcome: invalid ? "Requiere revisión" : "Validación correcta" },
    { title: "Registrar", detail: invalid ? "Paso detenido por la validación: no se crea un registro." : duplicate ? "DEMO-104 ya existe. Se conserva el registro anterior y no se crea otro." : "Se crea un único registro de prueba con el estado «Pendiente de atención».", outcome: invalid ? "Sin ejecutar" : duplicate ? "Duplicado evitado" : "1 registro simulado" },
    { title: "Avisar", detail: invalid ? "El flujo sigue detenido. Una persona debe completar o descartar la solicitud." : duplicate ? "No se repite el aviso comercial de una solicitud ya procesada." : unavailable ? "El servicio de aviso no responde. El registro se conserva y el fallo queda pendiente de revisión; no se marca como entregado." : "Se prepara un aviso interno para la persona que atenderá la consulta. En este ejemplo no se envía ningún mensaje.", outcome: invalid ? "Revisión pendiente" : duplicate ? "Sin aviso duplicado" : unavailable ? "Aviso no entregado" : "Ejemplo completado" },
  ];
}
