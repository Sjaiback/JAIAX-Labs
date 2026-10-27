import type { Metadata } from "next";
import Image from "@/components/ui/site-image";
import { Check } from "lucide-react";
import { Orb } from "@/components/home/hero";
import { QuoteForm } from "@/components/forms/quote-form";
import { AdCTA } from "@/components/forms/ad-cta";
import { SectionTitle } from "@/components/ui";
import { FAQ, Process } from "@/components/home/sections";
import { basicPlan, offerPath } from "@/data/pricing";
import { pageMetadata } from "@/lib/seo";
export const metadata: Metadata = pageMetadata(
  `Página web Básica por US$ ${basicPlan.price} en Perú — pago único`,
  `Tu landing responsive de hasta cinco secciones por US$ ${basicPlan.price}: formulario, WhatsApp y optimización para buscadores. Pago único de desarrollo. Dominio y hosting por separado.`,
  offerPath,
);
export default function BasicLanding() {
  return (
    <main id="main" className="ad-page">
      <section className="ad-hero">
        <Orb />
        <div className="container ad-grid">
          <div>
            <span className="eyebrow">
              <span className="status-dot" />
              TU NEGOCIO MERECE UNA GRAN WEB
            </span>
            <h1 className="ad-title">
              De una buena idea
              <br />a tu próxima
              <br />
              <span className="muted-heading">gran oportunidad.</span>
            </h1>
            <div className="ad-price">
              <span>US$</span>
              {basicPlan.price}
            </div>
            <p className="ad-description">
              Una página profesional que presenta lo que haces, transmite
              confianza y abre la puerta a nuevas conversaciones.
            </p>
            <div className="ad-checks">
              <span>
                <Check size={15} />
                Diseño responsive y hasta cinco secciones.
              </span>
              <span>
                <Check size={15} />
                Formulario, WhatsApp y optimización para buscadores.
              </span>
              <span>
                <Check size={15} />
                Alcance definido antes de comenzar.
              </span>
            </div>
            <p className="form-note">
              Pago único de desarrollo, sin suscripción. Dominio, hosting y
              mantenimiento por separado. Los adicionales se cotizan antes de
              comenzar.
            </p>
          </div>
          <div id="cotizar">
            <QuoteForm short />
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="ad-grid">
          <SectionTitle
            eyebrow="UNA PRIMERA IMPRESIÓN QUE IMPORTA"
            title={
              <>
                Tu negocio ya es bueno.
                <br />
                Haz que se vea.
              </>
            }
            description="Una experiencia clara en móvil y escritorio. Contenido organizado, llamadas a la acción visibles y una identidad que se siente tuya."
          />
          <div className="ad-visuals">
            <Image
              src="/images/forma.svg"
              alt="Ejemplo conceptual de web corporativa"
              width={1000}
              height={720}
            />
            <Image
              src="/images/origen.svg"
              alt="Ejemplo conceptual de dirección visual"
              width={700}
              height={504}
            />
          </div>
        </div>
        <p className="section-note">
          Ejemplos conceptuales de estilo. El plan Básica corresponde a una
          landing; no incluye tienda online.
        </p>
        <div className="ad-includes">
          <div>
            <span className="eyebrow">01 / EL PUNTO DE PARTIDA</span>
            <h3>Lo que incluye.</h3>
            <ul>
              {basicPlan.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
          <div>
            <span className="eyebrow">02 / CON TOTAL CLARIDAD</span>
            <h3>Lo que se cotiza aparte.</h3>
            <ul>
              <li>Dominio, hosting e impuestos aplicables.</li>
              <li>Redacción, fotografía y licencias de terceros.</li>
              <li>Tienda online, pagos o sistemas de usuarios.</li>
              <li>Secciones, cambios o integraciones adicionales.</li>
              <li>Mantenimiento después del lanzamiento.</li>
            </ul>
          </div>
        </div>
      </section>
      <Process />
      <section className="section container faq-layout">
        <SectionTitle
          eyebrow="ANTES DE EMPEZAR"
          title={
            <>
              Buenas preguntas.
              <br />
              Respuestas claras.
            </>
          }
        />
        <FAQ />
      </section>
      <AdCTA />
    </main>
  );
}
