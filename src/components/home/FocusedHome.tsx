import Link from '@/components/ui/site-link';
import Image from '@/components/ui/site-image';
import { ArrowUpRight, Globe, ShoppingBag, PanelsTopLeft } from 'lucide-react';
import { Hero } from './hero';
import { examples } from '@/data/examples';
import { experience } from '@/i18n/experience';
import { localePath, type Locale } from '@/i18n/config';

export function FocusedHome({ locale = 'es' }: { locale?: Locale }) {
  const t = experience[locale];
  const icons = [Globe, ShoppingBag, PanelsTopLeft];
  const paths = ['/servicios/desarrollo-web-peru/', '/servicios/tiendas-online-peru/', '/sistemas/'];
  return <main id="main" className="focused-home">
    <Hero locale={locale} />
    <section id="servicios" className="container focus-section">
      <div className="focus-heading"><span className="eyebrow">{t.eyebrow}</span><h2>{t.title}</h2></div>
      <div className="solution-grid">{t.routes.map((route, index) => {
        const Icon = icons[index];
        return <Link key={route[0]} className="solution-card" id={index === 0 ? "precios" : undefined} href={localePath(locale, paths[index])}>
          <div className="solution-top"><span>0{index + 1}</span><Icon size={26} strokeWidth={1.3} /></div>
          <h3>{route[0]}</h3><p>{route[1]}</p><span className="solution-meta">{route[2]}</span>
          <span className="solution-action">{route[3]} <ArrowUpRight size={18} /></span>
        </Link>;
      })}</div>
    </section>
    <section id="proyectos" className="container focus-section demo-section">
      <div className="focus-heading"><span className="eyebrow">{t.demoEyebrow}</span><h2>{t.demoTitle}</h2></div>
      <div className="demo-grid">{examples.map((demo, index) => <Link href={`/ejemplos/${demo.slug}/`} hrefLang="es" className="demo-card" key={demo.slug}>
        <div className="demo-preview"><Image src={demo.image} width={1440} height={900} sizes="(max-width: 680px) 100vw, 33vw" alt={`${demo.name}: ${t.demos[index]}`} /></div>
        <div className="demo-caption"><div><span>{t.demos[index]}</span><h3>{demo.name}</h3></div><span className="demo-open">{t.demoLink}<ArrowUpRight size={18} /></span></div>
      </Link>)}</div><p className="focus-note">{t.demoNote}</p>
    </section>
    <section className="container focus-contact"><div><h2>{t.finalTitle}</h2><p>{t.finalText}</p></div><Link className="button button-gold" href={`/contacto?lang=${locale}`}>{t.talk}<ArrowUpRight size={18}/></Link></section>
  </main>;
}
