import { ArrowDown, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/ui";
import { AnimatedJaiaxLogo } from "@/components/brand/AnimatedJaiaxLogo";
import { basicPlan, offerPath } from "@/data/pricing";
export function Orb({ small = false }: { small?: boolean }) {
  return (
    <div className={`orb-scene ${small ? "orb-small" : ""}`} aria-hidden>
      <svg
        className="orbit-lines"
        viewBox="0 0 1440 740"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="orbit-gold">
            <stop stopColor="#C6A16B" stopOpacity="0" />
            <stop offset=".5" stopColor="#C6A16B" stopOpacity=".6" />
            <stop offset="1" stopColor="#C6A16B" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3, 4].map((i) => (
          <ellipse
            key={i}
            cx="720"
            cy={520 + i * 16}
            rx={880 + i * 85}
            ry={235 + i * 29}
            fill="none"
            stroke="url(#orbit-gold)"
            strokeWidth=".55"
            transform={`rotate(${-9 + i * 4} 720 480)`}
          />
        ))}
      </svg>
      <div className="orb-glow" />
      <div className="orb" />
      <div className="orb-fade" />
    </div>
  );
}
export function Hero() {
  return (
    <section id="inicio" className="hero">
      <Orb />
      <div className="hero-coordinate" aria-hidden>
        12°02′ S &nbsp; 77°01′ O<br />
        <span>LIMA, PERÚ · ESTUDIO DIGITAL</span>
      </div>
      <div className="hero-content container">
        <div className="hero-brand">
          <AnimatedJaiaxLogo size={156} />
        </div>
        <Reveal>
          <span className="eyebrow hero-eyebrow">
            <span className="status-dot" /> DESARROLLO WEB · SOFTWARE ·
            INTELIGENCIA ARTIFICIAL
          </span>
          <h1>
            Creamos tecnología.
            <br />
            <span>Impulsamos negocios.</span>
          </h1>
          <p className="hero-description">
            Desarrollamos sitios web, sistemas inteligentes y automatizaciones
            <br className="desktop-break" /> que transforman ideas en soluciones
            digitales.
          </p>
          <div className="hero-offer">
            <span className="tiny-line" /> TU PÁGINA WEB PROFESIONAL POR{" "}
            <strong>US$ {basicPlan.price}</strong>
          </div>
          <div className="hero-actions">
            <Link href={offerPath} className="button button-gold">
              Crear mi página web
              <ArrowUpRight size={18} />
            </Link>
            <Link href="#proyectos" className="button button-outline">
              Explorar proyectos
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </Reveal>
      </div>
      <div className="hero-bottom container">
        <span>ESTRATEGIA. DISEÑO. CÓDIGO.</span>
        <Link href="#proyectos">
          DESLIZA PARA EXPLORAR
          <ArrowDown size={14} />
        </Link>
        <span>INDEPENDIENTES POR NATURALEZA.</span>
      </div>
    </section>
  );
}
