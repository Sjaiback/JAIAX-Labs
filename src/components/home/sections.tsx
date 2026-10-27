"use client";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Code2,
  Workflow,
  Orbit,
  Globe,
  ShoppingBag,
  Sparkles,
  ChartNoAxesCombined,
  Plus,
  Minus,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { services, steps, testimonials } from "@/data/site";
import { ButtonLink, Reveal, SectionTitle } from "@/components/ui";
import { ProjectGrid } from "@/components/projects/project-grid";
import { OrbitalExplorer } from "@/components/motion/OrbitalExplorer";
import { servicePages } from "@/data/service-pages";
import { PricingCards } from "@/components/pricing/PricingCards";
import { basicPlan } from "@/data/pricing";
const icons = [
  Globe,
  ShoppingBag,
  Code2,
  Workflow,
  Sparkles,
  ChartNoAxesCombined,
];
export function FeaturedProjects() {
  return (
    <section id="proyectos" className="projects-section container section">
      <div className="projects-heading">
        <div>
          <span className="eyebrow">
            <span className="tiny-line" />
            PROYECTOS DESTACADOS
          </span>
          <h2>
            Ideas con dirección.
            <br />
            <span>Diseño con presencia.</span>
          </h2>
        </div>
        <p>
          Tres conceptos creados para mostrar cómo una buena idea puede sentirse
          clara, propia y lista para crecer.
        </p>
      </div>
      <ProjectGrid />
      <p className="section-note">
        Exploraciones visuales del estudio. No representan trabajos contratados
        ni resultados comerciales de clientes.
      </p>
    </section>
  );
}
export function Differentiators() {
  const items = [
    {
      Icon: Target,
      title: "ESTRATEGIA DIGITAL",
      text: "Soluciones pensadas para objetivos reales.",
    },
    {
      Icon: Code2,
      title: "DESARROLLO DE CALIDAD",
      text: "Interfaces rápidas, modernas y escalables.",
    },
    {
      Icon: Workflow,
      title: "AUTOMATIZACIÓN INTELIGENTE",
      text: "Procesos conectados que reducen trabajo manual.",
    },
    {
      Icon: Orbit,
      title: "TECNOLOGÍA CON PROPÓSITO",
      text: "Herramientas digitales adaptadas a cada negocio.",
    },
  ];
  return (
    <div className="differentiators container">
      {items.map(({ Icon, title, text }) => (
        <div key={title}>
          <Icon size={25} strokeWidth={1.2} />
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      ))}
    </div>
  );
}
export function Services() {
  return (
    <section id="servicios" className="section services-section container">
      <div className="split-heading">
        <SectionTitle
          eyebrow="LO QUE HACEMOS"
          title={
            <>
              Tecnología que hace
              <br />
              <span className="muted-heading">crecer tu negocio.</span>
            </>
          }
        />
        <p>
          De la primera idea al siguiente gran paso.
          <br />
          Unimos estrategia, diseño y desarrollo
          <br />
          para crear lo que tu negocio necesita.
        </p>
      </div>
      <div className="services-grid">
        {services.map((s, i) => {
          const Icon = icons[i];
          return (
            <Reveal key={s.id} delay={(i % 3) * 0.06}>
              <Link
                href={
                  servicePages.find((page) => page.id === s.id)
                    ? `/servicios/${servicePages.find((page) => page.id === s.id)!.slug}`
                    : `/contacto?tipo=${encodeURIComponent(s.title)}`
                }
                className="service-card"
              >
                <div className="service-top">
                  <span>0{i + 1}</span>
                  <Icon strokeWidth={1.2} size={29} />
                </div>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
                <span className="service-link">
                  Exploremos tu idea
                  <ArrowUpRight size={18} />
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
export function About() {
  return (
    <section id="nosotros" className="section about-section">
      <div className="container about-grid">
        <OrbitalExplorer />
        <div>
          <SectionTitle
            eyebrow="SOMOS JAIAX LABS"
            title={
              <>
                Mentes curiosas.
                <br />
                Ideas sin límites.
              </>
            }
            description="Creemos en la tecnología que se entiende, se siente y funciona. En hacer las preguntas correctas antes de escribir la primera línea de código."
          />
          <p className="about-copy">
            Somos un estudio digital con base en Perú y una mirada abierta al
            mundo. Trabajamos de cerca contigo para transformar la complejidad
            en experiencias simples, útiles y memorables.
          </p>
          <div className="about-values">
            <span>Visión estratégica</span>
            <span>Atención al detalle</span>
            <span>Comunicación directa</span>
          </div>
          <Link href="/contacto" className="text-link">
            Conversemos sobre tu idea <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
      <div className="container trust-strip">
        <span className="eyebrow">EXPERIENCIA EN PROYECTOS REALES</span>
        <p>
          Espacio reservado para casos y marcas con participación y publicación
          verificadas.
        </p>
        <div className="trust-placeholders">
          <span>ESTRATEGIA</span>
          <span>DISEÑO</span>
          <span>DESARROLLO</span>
          <span>EVOLUCIÓN</span>
        </div>
      </div>
    </section>
  );
}
export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  return (
    <section id="proceso" className="section container">
      <div className="split-heading">
        <SectionTitle
          eyebrow="CÓMO LO HACEMOS"
          title={
            <>
              Un proceso claro.
              <br />
              <span className="muted-heading">Un resultado con intención.</span>
            </>
          }
        />
        <ArrowDownRight className="heading-arrow" size={70} strokeWidth={0.7} />
      </div>
      <div className="process-grid" ref={ref}>
        <motion.div
          className="process-line"
          initial={{ scaleX: reduced ? 1 : 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.6 }}
        />
        {steps.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.1}>
            <span className="step-number">0{i + 1}</span>
            <h3>{s.title}</h3>
            <p>{s.description}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
export function Pricing() {
  return (
    <section id="precios" className="section pricing-section">
      <div className="container">
        <SectionTitle
          eyebrow="INVERSIÓN CON PROPÓSITO"
          title={
            <>
              El siguiente paso de tu
              <br />
              negocio empieza aquí.
            </>
          }
          description="Cuatro formas de empezar. Un alcance claro, un diseño cuidado y el plan que tu negocio necesita."
        />
        <PricingCards />
        <div className="pricing-terms">
          <p>
            <strong>Un pago por el desarrollo.</strong>Básica, Profesional y
            Negocio no tienen una suscripción mensual de desarrollo.
          </p>
          <p>
            <strong>Servicios por separado.</strong>Dominio, hosting,
            mantenimiento, licencias e impuestos aplicables se detallan aparte.
          </p>
          <p>
            <strong>Lo que tu idea requiera.</strong>El precio cubre el alcance
            publicado. Los extras y el plan Avanzada se cotizan antes de
            comenzar.
          </p>
        </div>
      </div>
    </section>
  );
}
export function Testimonials() {
  const published = testimonials.filter(
    (t) => t.status === "publicado" && t.approved,
  );
  return (
    <section className="section container testimony-section">
      <SectionTitle
        eyebrow={published.length ? "TESTIMONIOS" : "COMPROMISOS DEL ESTUDIO"}
        title={
          published.length ? (
            "Lo que dicen de nuestro trabajo."
          ) : (
            <>
              Tu proyecto merece
              <br />
              claridad en cada paso.
            </>
          )
        }
      />
      {published.length ? (
        <div className="services-grid">
          {published.map((t) => (
            <blockquote className="service-card" key={t.id}>
              <p>“{t.quote}”</p>
              <cite>
                {t.name} · {t.role} · {t.company}
              </cite>
              <time>{t.date}</time>
            </blockquote>
          ))}
        </div>
      ) : (
        <div className="commitments">
          {[
            [
              "01",
              "Sin letras pequeñas",
              "Un alcance definido, una propuesta transparente y expectativas alineadas desde el principio.",
            ],
            [
              "02",
              "Siempre en conversación",
              "Revisiones contigo y comunicación directa durante cada etapa del proyecto.",
            ],
            [
              "03",
              "Pensado para continuar",
              "Código organizado y documentación para que tu producto pueda seguir evolucionando.",
            ],
          ].map(([n, t, d]) => (
            <Reveal key={n}>
              <span className="eyebrow">{n} /</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
export function FinalCTA() {
  return (
    <section id="contacto" className="final-cta section">
      <div className="container">
        <span className="eyebrow">
          <span className="status-dot" /> EL FUTURO SE CONSTRUYE
        </span>
        <h2>
          Tu próxima gran idea
          <br />
          <span>empieza aquí.</span>
        </h2>
        <p>Hablemos de lo que podemos construir juntos.</p>
        <ButtonLink href="/contacto">Cotizar mi proyecto</ButtonLink>
      </div>
      <span className="cta-watermark" aria-hidden>
        JAIAX
      </span>
    </section>
  );
}
export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const questions = [
    [
      "¿El pago de desarrollo es mensual?",
      "No. Básica, Profesional y Negocio son de pago único por el desarrollo incluido. Dominio, hosting, mantenimiento y servicios de terceros tienen condiciones y renovaciones independientes.",
    ],
    [
      `¿Qué incluye el plan Básica de US$ ${basicPlan.price}?`,
      "Una landing responsive de una página, hasta cinco secciones, formulario, acceso a WhatsApp, optimización para buscadores y una ronda de ajustes. El precio cubre ese alcance; los adicionales se cotizan por separado.",
    ],
    [
      "¿El dominio y hosting están incluidos?",
      "No están incluidos en el precio base. Podemos orientarte en su elección y cotizarlos por separado. Tú mantienes la titularidad de tus servicios.",
    ],
    [
      "¿Cuánto demora el desarrollo?",
      "La fecha se acuerda después de revisar el alcance y recibir los textos, imágenes y accesos necesarios. El plazo queda definido en la propuesta.",
    ],
    [
      "¿Puedo ampliar mi web más adelante?",
      "Sí. Podemos cotizar nuevas páginas, funcionalidades, integraciones y mantenimiento conforme evolucione tu negocio.",
    ],
    [
      "¿Cómo empezamos?",
      "Prepara tu solicitud y compártela por WhatsApp cuando esté configurado. Antes de iniciar, recibirás una propuesta con alcance, condiciones y calendario.",
    ],
  ];
  return (
    <div className="faq-list">
      {questions.map(([q, a], i) => (
        <div className="faq-item" key={q}>
          <h3>
            <button
              aria-expanded={open === i}
              aria-controls={`faq-${i}`}
              onClick={() => setOpen(open === i ? null : i)}
            >
              {q}
              {open === i ? <Minus size={18} /> : <Plus size={18} />}
            </button>
          </h3>
          <div id={`faq-${i}`} hidden={open !== i}>
            <p>{a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
