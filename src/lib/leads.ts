import { z } from "zod";
import type { LeadGateway } from "@/types";
import { planLabel, normalizePlanId } from "@/data/pricing";
export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Escribe tu nombre (mínimo 2 caracteres).")
    .max(100),
  company: z.string().trim().max(150).optional(),
  whatsapp: z
    .string()
    .trim()
    .regex(
      /^\+?[\d\s()-]{7,20}$/,
      "Ingresa un teléfono válido con código de país.",
    ),
  email: z.email("Ingresa un correo válido."),
  projectType: z.string().min(1, "Selecciona el tipo de proyecto."),
  budget: z.string().min(1, "Selecciona un presupuesto aproximado."),
  description: z
    .string()
    .trim()
    .min(15, "Cuéntanos tu idea en al menos 15 caracteres.")
    .max(3000, "Máximo 3000 caracteres."),
  deadline: z.string().min(1, "Selecciona un plazo."),
  consent: z
    .boolean()
    .refine(
      (v) => v,
      "Necesitamos tu consentimiento para preparar la solicitud.",
    ),
  plan: z
    .string()
    .optional()
    .refine(
      (value) => !value || normalizePlanId(value) === value,
      "Selecciona un plan vigente.",
    ),
});
export type LeadInput = z.infer<typeof leadSchema>;
export const mockLeadGateway: LeadGateway = {
  async submit() {
    return {
      delivered: false,
      message:
        "Tu resumen está listo. Revísalo y abre WhatsApp para compartirlo con JAIAX Labs. Todavía no se ha enviado ningún mensaje.",
    };
  },
};
export function whatsappMessage(data: LeadInput) {
  return `Hola JAIAX Labs, me gustaría cotizar un proyecto.\n\nNombre: ${data.name}\nEmpresa: ${data.company || "—"}\nCorreo: ${data.email}\nWhatsApp: ${data.whatsapp}\nProyecto: ${data.projectType}\nPlan: ${planLabel(data.plan)}\nPresupuesto: ${data.budget}\nPlazo: ${data.deadline}\n\n${data.description}`;
}
