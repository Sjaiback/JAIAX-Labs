import { ArrowUpRight } from "lucide-react";
import Link from "@/components/ui/site-link";
import { HeroEntrance } from "@/components/motion/HeroEntrance";
import { AnimatedJaiaxLogo } from "@/components/brand/AnimatedJaiaxLogo";
import { experience } from "@/i18n/experience";
import { copy } from "@/i18n/copy";
import { localePath, type Locale } from "@/i18n/config";
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
export function Hero({ locale = "es" }: { locale?: Locale }) {
  const text = copy[locale].hero;
  const compact = experience[locale];
  return (
    <HeroEntrance>
      <Orb />
      <div className="hero-content container">
        <div className="hero-brand">
          <AnimatedJaiaxLogo size={112} />
        </div>
        <div>
          <span className="eyebrow hero-eyebrow" data-hero-copy>
            <span className="status-dot" /> JAIAX LABS · DIGITAL STUDIO
          </span>
          <h1>
            <span className="hero-title-light" data-hero-ink>
              {text[1]}
            </span>
            <br />
            <span data-hero-ink>{text[2]}</span>
          </h1>
          <p className="hero-description" data-hero-copy>
            {compact.intro}
          </p>
          <div className="hero-actions">
            <Link href={`${localePath(locale)}#servicios`} className="button button-gold">
              {compact.choose}
              <ArrowUpRight size={18} />
            </Link>
            <Link href={`/contacto?lang=${locale}`} className="button button-outline">
              {compact.talk}
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </HeroEntrance>
  );
}
