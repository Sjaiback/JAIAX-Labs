"use client";
import { useSearchParams } from "next/navigation";
import { QuoteForm } from "./quote-form";
import { normalizePlanId } from "@/data/pricing";
import { plans, services } from "@/data/site";
export function ContactQueryForm() {
  const params = useSearchParams();
  const plan = normalizePlanId(params.get("plan") || "");
  const type = params.get("tipo") || "";
  const projectType = services.some((service) => service.title === type)
    ? type
    : plans.some((item) => item.id === plan && item.id !== "avanzada")
      ? "Desarrollo de páginas web"
      : "";
  return <QuoteForm key={`${plan}-${projectType}`} plan={plan} projectType={projectType} />;
}
