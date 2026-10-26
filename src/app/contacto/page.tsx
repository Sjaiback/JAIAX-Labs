import type { Metadata } from "next";
import { Check, Code2, MessageCircle } from "lucide-react";
import { QuoteForm } from "@/components/forms/quote-form";
import { plans, services } from "@/data/site";
import { normalizePlanId } from "@/data/pricing";
import { pageMetadata } from "@/lib/seo";
export const metadata: Metadata = pageMetadata(
  "Cotiza desarrollo web, software o automatización",
  "Cuéntanos tu idea y prepara una solicitud de desarrollo web, software o automatización en Perú. Alcance y propuesta claros desde el inicio.",
  "/contacto",
);
export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string; tipo?: string }>;
}) {
  const params = await searchParams;
  const plan = normalizePlanId(params.plan);
  const projectType = services.some((s) => s.title === params.tipo)
    ? params.tipo
    : plans.some((p) => p.id === plan && p.id !== "avanzada")
      ? "Desarrollo de páginas web"
      : "";
  return (
    <main id="main" className="inner-main container">
      <div className="contact-grid">
        <div className="contact-aside">
          <span className="eyebrow">
            <span className="tiny-line" />
            HAGAMOS QUE SUCEDA
          </span>
          <h1>
            Todo empieza
            <br />
            con una buena
            <br />
            <span className="muted-heading">conversación.</span>
          </h1>
          <p>
            No necesitas tener todas las respuestas. Cuéntanos dónde estás y
            hacia dónde quieres ir. Encontraremos el siguiente paso.
          </p>
          <div className="contact-promises">
            <div>
              <MessageCircle />
              Comunicación directa, desde el primer día.
            </div>
            <div>
              <Check />
              Alcance y propuesta con total claridad.
            </div>
            <div>
              <Code2 />
              Una solución pensada para tu negocio.
            </div>
          </div>
          <div className="notice">
            Esta es una demo frontend. El envío al backend todavía no está
            conectado. Podrás revisar y copiar tu solicitud antes de
            compartirla.
          </div>
        </div>
        <QuoteForm
          key={`${plan}-${projectType}`}
          plan={plan}
          projectType={projectType}
        />
      </div>
    </main>
  );
}
