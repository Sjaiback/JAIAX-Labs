import { site } from "@/data/site";
import { normalizePlanId, planLabel } from "@/data/pricing";

/** Opens a draft conversation; the visitor chooses whether to send it. */
export function whatsappContactHref(contactPath = "/contacto"): string {
  const query = new URL(contactPath, "https://jaiax.invalid").searchParams;
  const plan = normalizePlanId(query.get("plan"));
  const service = query.get("tipo");
  const message = plan
    ? `Hola JAIAX Labs, me interesa el plan ${planLabel(plan)}. Quiero conocer el alcance y cómo empezar con mi negocio.`
    : service
      ? `Hola JAIAX Labs, me interesa ${service}. Quisiera conversar sobre mi proyecto y recibir una cotización.`
      : "Hola JAIAX Labs, quiero una solución digital para mi negocio. Me gustaría conversar sobre mi proyecto y recibir una cotización.";
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
