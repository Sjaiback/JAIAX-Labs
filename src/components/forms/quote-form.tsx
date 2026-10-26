"use client";
import { useEffect, useId, useState } from "react";
import { useForm, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, Check, Copy, MessageCircle } from "lucide-react";
import Link from "next/link";
import {
  leadSchema,
  mockLeadGateway,
  whatsappMessage,
  type LeadInput,
} from "@/lib/leads";
import { site, services } from "@/data/site";
import {
  basicPlan,
  plans,
  budgetOptions,
  normalizePlanId,
  planLabel,
} from "@/data/pricing";
import { trackConversion } from "@/lib/analytics";
export function QuoteForm({
  short = false,
  plan = "",
  projectType = "",
}: {
  short?: boolean;
  plan?: string;
  projectType?: string;
}) {
  const id = useId();
  const [summary, setSummary] = useState<LeadInput | null>(null);
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");
  const selectedPlanId = normalizePlanId(short ? basicPlan.id : plan);
  const selectedPlan = plans.find((p) => p.id === selectedPlanId);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      company: "",
      whatsapp: "",
      email: "",
      projectType: short ? "Desarrollo de páginas web" : projectType,
      budget: selectedPlan?.budget || "",
      description: "",
      deadline: short ? "Por definir" : "",
      consent: false,
      plan: selectedPlanId,
    },
  });
  const values = watch();
  useEffect(() => {
    trackConversion("quote_started", { plan: selectedPlanId });
  }, [selectedPlanId]);
  const changed = summary && JSON.stringify(summary) !== JSON.stringify(values);
  const error = (key: FieldPath<LeadInput>) => errors[key]?.message;
  const field = (
    key: FieldPath<LeadInput>,
    label: string,
    placeholder: string,
    type = "text",
    full = false,
  ) => (
    <div className={`field ${full ? "field-full" : ""}`}>
      <label htmlFor={`${id}-${key}`}>{label}</label>
      <input
        id={`${id}-${key}`}
        type={type}
        placeholder={placeholder}
        autoComplete={
          key === "name"
            ? "name"
            : key === "email"
              ? "email"
              : key === "whatsapp"
                ? "tel"
                : key === "company"
                  ? "organization"
                  : "off"
        }
        {...register(key)}
        aria-invalid={!!error(key)}
        aria-describedby={error(key) ? `${id}-${key}-error` : undefined}
      />
      {error(key) && (
        <span id={`${id}-${key}-error`} className="field-error">
          {error(key)}
        </span>
      )}
    </div>
  );
  const select = (
    key: FieldPath<LeadInput>,
    label: string,
    options: string[],
  ) => (
    <div className="field">
      <label htmlFor={`${id}-${key}`}>{label}</label>
      <select
        id={`${id}-${key}`}
        {...register(key)}
        aria-invalid={!!error(key)}
        aria-describedby={error(key) ? `${id}-${key}-error` : undefined}
      >
        <option value="">Seleccionar</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      {error(key) && (
        <span id={`${id}-${key}-error`} className="field-error">
          {error(key)}
        </span>
      )}
    </div>
  );
  const submit = handleSubmit(async (data) => {
    const result = await mockLeadGateway.submit(data);
    setSummary(data);
    setMessage(result.message);
    setCopied(false);
    trackConversion("quote_prepared", { plan: data.plan || "custom" });
    requestAnimationFrame(() =>
      document.getElementById(`${id}-summary`)?.focus(),
    );
  });
  const configured = /^\d{8,15}$/.test(site.whatsapp);
  return (
    <form
      className={`quote-form ${short ? "short-form" : ""}`}
      onSubmit={submit}
      noValidate
    >
      <div className="form-header">
        <h2>
          {short ? "Empecemos con tu idea." : "Cuéntanos sobre tu proyecto."}
        </h2>
        <span>
          {values.plan
            ? `PLAN ${plans.find((p) => p.id === values.plan)?.name.toUpperCase() || "A MEDIDA"}`
            : "01 / CONVERSEMOS"}
        </span>
      </div>
      <div className="form-grid">
        {field("name", "Nombre *", "Tu nombre")}
        {field("email", "Correo *", "tucorreo@empresa.com", "email")}
        {field("whatsapp", "WhatsApp *", "+51 999 999 999", "tel")}
        {!short &&
          field("company", "Empresa (opcional)", "Nombre de tu empresa")}
        {!short &&
          select(
            "projectType",
            "Tipo de proyecto *",
            services.map((s) => s.title),
          )}
        {select("budget", "Presupuesto aproximado *", budgetOptions)}
        {!short &&
          select("deadline", "Plazo deseado *", [
            "Lo antes posible",
            "En un mes",
            "En 2–3 meses",
            "Por definir",
          ])}
        <div className="field field-full">
          <label htmlFor={`${id}-description`}>
            {short ? "¿Qué tienes en mente? *" : "Descripción del proyecto *"}
          </label>
          <textarea
            id={`${id}-description`}
            placeholder="Cuéntanos qué hace tu negocio y qué te gustaría construir…"
            {...register("description")}
            aria-invalid={!!error("description")}
            aria-describedby={
              error("description") ? `${id}-description-error` : undefined
            }
          />
          {error("description") && (
            <span className="field-error" id={`${id}-description-error`}>
              {error("description")}
            </span>
          )}
        </div>
        {!short && (
          <div className="field field-full">
            <label htmlFor={`${id}-plan`}>Plan de interés</label>
            <select
              id={`${id}-plan`}
              aria-invalid={!!error("plan")}
              aria-describedby={error("plan") ? `${id}-plan-error` : undefined}
              {...register("plan", {
                onChange: (event) => {
                  const selected = plans.find(
                    (p) => p.id === event.target.value,
                  );
                  if (selected)
                    setValue("budget", selected.budget, {
                      shouldDirty: true,
                      shouldValidate: true,
                    });
                },
              })}
            >
              <option value="">Por definir</option>
              {plans.map((p) => (
                <option key={p.id} value={p.id}>
                  {planLabel(p.id)}
                </option>
              ))}
            </select>
            {error("plan") && (
              <span className="field-error" id={`${id}-plan-error`}>
                {error("plan")}
              </span>
            )}
          </div>
        )}
      </div>
      <label className="consent">
        <input
          type="checkbox"
          {...register("consent")}
          aria-invalid={!!error("consent")}
          aria-describedby={
            error("consent") ? `${id}-consent-error` : undefined
          }
        />
        <span>
          Acepto la{" "}
          <Link href="/privacidad" target="_blank">
            política de privacidad
          </Link>{" "}
          y autorizo el uso de mis datos para atender esta solicitud. *
        </span>
      </label>
      {error("consent") && (
        <p className="field-error" id={`${id}-consent-error`}>
          {error("consent")}
        </p>
      )}
      <div className="form-actions">
        <button
          className="button button-gold"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Preparando…" : "Preparar mi solicitud"}
          <ArrowUpRight size={16} />
        </button>
        <span>Sin compromiso.</span>
      </div>
      <p className="form-note">
        Demo frontend: tus datos permanecen en esta pestaña. Preparar la
        solicitud no la envía ni la guarda.
      </p>
      {summary && (
        <div
          className="form-summary"
          id={`${id}-summary`}
          tabIndex={-1}
          role="region"
          aria-label="Resumen de tu solicitud"
        >
          <h3>Tu idea, lista para compartir.</h3>
          <p role="status">
            {changed
              ? "Cambiaste el formulario. Prepara nuevamente la solicitud para actualizar este resumen."
              : message}
          </p>
          <dl>
            <dt>Nombre</dt>
            <dd>{summary.name}</dd>
            <dt>Empresa</dt>
            <dd>{summary.company || "—"}</dd>
            <dt>Correo</dt>
            <dd>{summary.email}</dd>
            <dt>WhatsApp</dt>
            <dd>{summary.whatsapp}</dd>
            <dt>Proyecto</dt>
            <dd>{summary.projectType}</dd>
            <dt>Plan</dt>
            <dd>{planLabel(summary.plan)}</dd>
            <dt>Presupuesto</dt>
            <dd>{summary.budget}</dd>
            <dt>Plazo</dt>
            <dd>{summary.deadline}</dd>
          </dl>
          <p>{summary.description}</p>
          <div className="summary-actions">
            <button
              type="button"
              className="button button-outline"
              disabled={!!changed}
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(whatsappMessage(summary));
                  setCopied(true);
                } catch {
                  setMessage(
                    "No se pudo copiar automáticamente. Selecciona el resumen y cópialo manualmente.",
                  );
                }
              }}
            >
              {copied ? "Copiado" : "Copiar solicitud"}
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
            <button
              type="button"
              className="button button-gold"
              disabled={!configured || !!changed}
              onClick={() => {
                trackConversion("whatsapp_opened", {
                  plan: summary.plan || "custom",
                });
                window.open(
                  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(whatsappMessage(summary))}`,
                  "_blank",
                  "noopener,noreferrer",
                );
              }}
            >
              Abrir WhatsApp
              <MessageCircle size={14} />
            </button>
            <button
              type="button"
              className="text-link"
              onClick={() => {
                setSummary(null);
                setValue("consent", false);
              }}
            >
              Volver a editar
            </button>
          </div>
          {!configured && (
            <p>
              WhatsApp pendiente de configuración. Puedes copiar la solicitud;
              no se ha enviado ningún dato.
            </p>
          )}
          {configured && (
            <p>
              WhatsApp se abrirá con el mensaje preparado. Debes enviarlo allí
              para completar el contacto.
            </p>
          )}
        </div>
      )}
    </form>
  );
}
