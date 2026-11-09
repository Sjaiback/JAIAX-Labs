import Link from '@/components/ui/site-link';
import Image from '@/components/ui/site-image';
import { ArrowDown, ArrowUpRight, Plus } from 'lucide-react';
import { LabPricing } from './LabPricing';
import { BuildExperience } from './BuildExperience';
import { StudioMoment } from './StudioMoment';
import { StudioWordmark } from '@/components/brand/StudioWordmark';
import { LabMotion } from './LabMotion';
import { labCopy } from '@/i18n/lab';
import { homeCopy } from '@/i18n/home';
import { experience } from '@/i18n/experience';
import { copy } from '@/i18n/copy';
import { localePath, type Locale } from '@/i18n/config';

const projects = [
  { name: 'UMBRAL', image: '/images/umbral-studio.webp', href: '/ejemplos/blog-editorial/' },
  { name: 'SOMA', image: '/images/soma-studio.webp', href: '/ejemplos/ecommerce/' },
  { name: 'NODO', image: '/images/nodo-studio.webp', href: '/ejemplos/control-logistico/' },
];

export function LabHome({ locale = 'es' }: { locale?: Locale }) {
  const t = labCopy[locale], home = homeCopy[locale], exp = experience[locale];
  return <main id="main" className="lab-home">
    <BuildExperience locale={locale}/>
    <section id="inicio" className="lab-hero" data-enter aria-labelledby="lab-title">
      <div className="lab-wrap wrap">
        <div className="lab-index" data-build><span>01 / JAIAX Labs</span><span><span className="lab-location">{t.location}</span><span className="lab-mobile-fact">{exp.routes[0][2]}</span><i /></span></div>
        <div className="lab-masthead" aria-hidden="true" data-build><StudioWordmark/><small>Digital<br/>studio.</small></div>
        <div className="lab-hero-grid">
          <div className="lab-hero-copy">
            <h1 id="lab-title" data-build>{copy[locale].hero[1]}<br/><span>{copy[locale].hero[2]}</span></h1>
            <p data-build>{exp.intro}</p>
            <div className="lab-hero-actions" data-build>
              <Link href={`/contacto?lang=${locale}`} className="lab-button lab-primary">{t.quote}<ArrowUpRight size={18}/></Link>
            </div>
            <div className="lab-hero-fact" data-build><span>US$ 70</span><span>{t.priceNote}</span><a href="#precios" aria-label={t.prices}><ArrowDown size={19}/></a></div>
          </div>
          <div className="lab-preview" data-build>
            <div className="lab-browser-bar"><span><i/><i/><i/></span><span>jaiax / studio / umbral</span><ArrowUpRight size={15}/></div>
            <Link href="/ejemplos/blog-editorial/" hrefLang="es" className="lab-preview-link" aria-label={`${t.tryDemo} — UMBRAL`}>
              <Image src="/images/umbral-studio.webp" width={1200} height={800} sizes="(max-width: 820px) 90vw, 48vw" alt={t.previewAlt} priority/>
              <span className="lab-preview-open">{t.tryDemo}<ArrowUpRight size={17}/></span>
            </Link>
            <div className="lab-preview-foot"><span><i/>{t.previewLabel}</span><span>HTML / CSS / React</span></div>
          </div>
        </div>
        <div className="lab-hero-bottom" data-build><span>{t.discipline}</span><a href="#proyectos">{t.scroll}<ArrowDown size={14}/></a></div>
      </div>
    </section>
    <section id="proyectos" className="lab-section lab-projects" aria-labelledby="lab-projects-title">
      <div className="lab-wrap wrap">
        <div className="lab-index"><span>02 / {t.workLabel}</span><span>UMBRAL · SOMA · NODO</span></div>
        <div className="lab-section-heading"><h2 id="lab-projects-title">{t.workTitle}</h2><p>{exp.demoNote}</p></div>
        <div className="lab-project-grid">{projects.map((project, index) => <Link href={project.href} hrefLang="es" className="lab-project" key={project.name} aria-label={`${t.tryDemo} — ${project.name}`}>
          <div className="lab-project-top"><span>0{index + 1} / {exp.demos[2 - index]}</span><ArrowUpRight size={20}/></div>
          <h3>{project.name}</h3>
          <div className="lab-project-image"><Image src={project.image} width={1200} height={800} sizes="(max-width: 820px) 90vw, 30vw" alt={`${project.name} — ${exp.demos[2 - index]}`} loading="lazy"/></div>
          <span className="lab-project-link">{t.tryDemo}<ArrowUpRight size={16}/></span>
        </Link>)}</div>
      </div>
    </section>
    <section id="servicios" className="lab-section lab-services" aria-labelledby="lab-services-title">
      <div className="lab-wrap wrap">
        <div className="lab-index"><span>03 / {t.servicesLabel}</span><span>Web / Software / IA</span></div>
        <div className="lab-section-heading"><h2 id="lab-services-title">{t.servicesTitle}</h2><p>{t.servicesText}</p></div>
        <div className="lab-service-list">{t.services.map((service, index) => <Link key={service[0]} href={localePath(locale, ['/servicios/desarrollo-web-peru/', '/servicios/tiendas-online-peru/', '/sistemas/', '/servicios/automatizacion-n8n/'][index])} className="lab-service-row">
          <span className="lab-service-number">0{index + 1}</span><h3>{service[0]}</h3><p>{service[1]}</p><ArrowUpRight size={24}/>
        </Link>)}</div>
      </div>
    </section>
    <section id="proceso" className="lab-section lab-process" aria-labelledby="lab-process-title" data-moment="word-highlight">
      <div className="lab-wrap wrap">
        <div className="lab-index"><span>04 / {t.processLabel}</span><span>{t.processTag}</span></div>
        <h2 id="lab-process-title">{t.processTitle}</h2>
        <p className="mo-wh__text lab-statement">{t.statement[0]} <strong>{t.statement[1]}</strong> {t.statement[2]}</p>
        <div className="lab-process-grid">{exp.process.map((title, index) => <div key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{exp.processText[index]}</p></div>)}</div>
        <StudioMoment/>
      </div>
    </section>
    <section id="precios" className="lab-section lab-prices" aria-labelledby="lab-prices-title">
      <div className="lab-wrap wrap">
        <div className="lab-index"><span>05 / {t.prices}</span><span>USD</span></div>
        <div className="lab-section-heading"><h2 id="lab-prices-title">{t.pricesTitle}</h2><p>{exp.plansText}</p></div>
        <LabPricing locale={locale}/>
        <p className="lab-terms">{exp.terms}</p>
      </div>
    </section>
    <section id="preguntas" className="lab-section lab-faq" aria-labelledby="lab-faq-title">
      <div className="lab-wrap wrap">
        <div className="lab-index"><span>06 / {t.faqLabel}</span><span>JAIAX / FAQ</span></div>
        <div className="lab-faq-grid"><h2 id="lab-faq-title">{t.faqTitle}</h2><div>{home.faqs.map(([question, answer]) => <details key={question}><summary>{question}<Plus size={20} aria-hidden="true"/></summary><p>{answer}</p></details>)}</div></div>
      </div>
    </section>
    <LabMotion/>
  </main>;
}
