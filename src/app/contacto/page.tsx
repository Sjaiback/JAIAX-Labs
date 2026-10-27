import type { Metadata } from "next";
import { Check, Code2, MessageCircle } from "lucide-react";
import { QuoteForm } from "@/components/forms/quote-form";
import { Suspense } from "react";
import { ContactQueryForm } from "@/components/forms/contact-query-form";
import { pageMetadata } from "@/lib/seo";
export const metadata: Metadata = pageMetadata(
  "Cotiza desarrollo web, software o automatización",
  "Cuéntanos tu idea y prepara una solicitud de desarrollo web, software o automatización en Perú. Alcance y propuesta claros desde el inicio.",
  "/contacto",
);
export default function Contact() {
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
        <Suspense fallback={<QuoteForm />}><ContactQueryForm /></Suspense>
      </div>
    </main>
  );
}
