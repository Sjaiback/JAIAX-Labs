import Link from "@/components/ui/site-link";
import Image from "@/components/ui/site-image";
import { ArrowUpRight, Globe, ShoppingBag, Workflow, Sparkles } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { ExampleShowcase } from "@/components/examples/ExampleShowcase";
import { OrbitalExplorer } from "@/components/motion/OrbitalExplorer";
import { PricingCards } from "@/components/pricing/PricingCards";
import { Reveal, SectionTitle } from "@/components/ui";
import { examples } from "@/data/examples";
import { servicePages } from "@/data/service-pages";
import { international } from "@/i18n/international";
import { copy } from "@/i18n/copy";
import { localePath, type InternationalLocale } from "@/i18n/config";

export function InternationalHome({ locale }: { locale: InternationalLocale }) {
  const text = international[locale];
  const icons = [Globe, ShoppingBag, Workflow, Sparkles];
  return <main id="main" className="international-home">
    <Hero locale={locale} />
    <section id="proyectos" className="section container">
      <SectionTitle eyebrow={text.projects[0]} title={text.projects[1]} description={text.projects[2]} />
      <div className="international-projects">
        {examples.map((example, index) => <Reveal key={example.slug} delay={index * .08}><article>
          <Image src={example.image} width={1440} height={900} alt={`${example.name} — ${text.projects[index + 3]}`} />
          <div><span className="eyebrow">0{index + 1} / {text.projects[index + 3]}</span><h3>{example.name}</h3><Link href={`/ejemplos/${example.slug}/`} className="text-link" hrefLang="es">{copy[locale].showcase[11]} <ArrowUpRight size={16} /></Link></div>
        </article></Reveal>)}
      </div>
    </section>
    <ExampleShowcase locale={locale} />
    <section id="servicios" className="section container">
      <SectionTitle eyebrow={text.services[0]} title={text.services[1]} description={text.services[2]} />
      <div className="services-grid">
        {text.serviceData.map((service, index) => { const Icon = icons[index]; return <Reveal key={index} delay={index * .05}><Link href={localePath(locale, `/servicios/${servicePages[index].slug}/`)} className="service-card"><div className="service-top"><span>0{index + 1}</span><Icon size={29} strokeWidth={1.2} /></div><h3>{service.title}</h3><p>{service.intro}</p><span className="service-link">{text.services[3]} <ArrowUpRight size={18} /></span></Link></Reveal>; })}
      </div>
    </section>
    <section id="nosotros" className="section about-section"><div className="container about-grid">
      <OrbitalExplorer label={text.about[0]} />
      <div className="about-copy"><SectionTitle eyebrow={text.about[1]} title={text.about[2]} description={text.about[3]} /><p>{text.about[4]}</p><Link href={`/contacto?lang=${locale}`} className="text-link">{text.about[5]} <ArrowUpRight size={17} /></Link></div>
    </div></section>
    <section id="proceso" className="section container">
      <SectionTitle eyebrow={text.process[0]} title={text.process[1]} />
      <div className="process-grid">{[0,1,2,3].map(index => <Reveal key={index} delay={index * .08}><span className="step-number">0{index + 1}</span><h3>{text.process[2 + index * 2]}</h3><p>{text.process[3 + index * 2]}</p></Reveal>)}</div>
    </section>
    <section id="precios" className="section pricing-section"><div className="container">
      <SectionTitle eyebrow={text.pricing[0]} title={text.pricing[1]} description={text.pricing[2]} />
      <PricingCards locale={locale} />
      <div className="pricing-terms">{text.pricing.slice(3).map(term => <p key={term}>{term}</p>)}</div>
    </div></section>
    <section id="blog" className="section container"><SectionTitle eyebrow={text.journal[0]} title={text.journal[1]} description={text.journal[2]} /><Link href="/blog/" hrefLang="es" className="text-link">{text.journal[3]} <ArrowUpRight size={16} /></Link></section>
    <section id="contacto" className="final-cta section"><div className="container"><span className="eyebrow">{text.final[0]}</span><h2>{text.final[1]}</h2><p>{text.final[2]}</p><Link href={`/contacto?lang=${locale}`} className="button button-gold">{text.final[3]} <ArrowUpRight size={16} /></Link></div></section>
  </main>;
}
