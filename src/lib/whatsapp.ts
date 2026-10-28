import { site } from "@/data/site";
import { normalizePlanId, plans } from "@/data/pricing";
import { copy } from "@/i18n/copy";
import { isLocale, type Locale } from "@/i18n/config";
export function contactLocale(contactPath: string): Locale {
  const candidate = new URL(contactPath, "https://jaiax.invalid").searchParams.get("lang");
  return isLocale(candidate) ? candidate : "es";
}

/** Opens a draft conversation; the visitor chooses whether to send it. */
export function whatsappContactHref(contactPath = "/contacto"): string {
  const query = new URL(contactPath, "https://jaiax.invalid").searchParams;
  const plan = normalizePlanId(query.get("plan"));
  const service = query.get("tipo");
  const locale = contactLocale(contactPath);
  const text = copy[locale];
  const index = plans.findIndex(item => item.id === plan);
  const label = index < 0 ? "" : `${text.plans[index][0]} — ${plan === "avanzada" ? text.planUi[3] : `US$ ${plans[index].price}`}`;
  const message = plan
    ? `${text.whatsapp[0]} ${label}. ${text.whatsapp[1]}`
    : service
      ? `${text.whatsapp[2]} ${service}. ${text.whatsapp[3]}`
      : text.whatsapp[4];
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
