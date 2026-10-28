import Link from '@/components/ui/site-link';
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import { PricingCards } from '@/components/pricing/PricingCards';
import { OrbitalExplorer } from '@/components/motion/OrbitalExplorer';
import { experience } from '@/i18n/experience';
import { copy } from '@/i18n/copy';
import { localePath, type Locale } from '@/i18n/config';

export function DetailPage({ locale = 'es', section }: { locale?: Locale; section: 'planes' | 'estudio' | 'sistemas' }) {
  const t = experience[locale];
  return <main id="main" className={`inner-main container focused-detail detail-${section}`}>
    <Link href={`${localePath(locale)}#servicios`} className="text-link"><ArrowLeft size={16}/>{t.choose}</Link>
    <header className="detail-heading"><span className="eyebrow">JAIAX LABS / {section === 'planes' ? copy[locale].nav[5] : section === 'estudio' ? t.studio : t.routes[2][0]}</span><h1>{section === 'planes' ? t.plansTitle : section === 'estudio' ? t.studioTitle : t.systemsTitle}</h1><p>{section === 'planes' ? t.plansText : section === 'estudio' ? t.studioText : t.systemsText}</p></header>
    {section === 'planes' ? <section id="planes"><PricingCards locale={locale}/><p className="focus-note">{t.terms}</p></section> : section === 'estudio' ? <>
      <div className="studio-orbit"><OrbitalExplorer label={t.studio}/></div>
      <section id="proceso" className="focus-steps">{t.process.map((step, i) => <article key={step}><span className="eyebrow">0{i+1}</span><h2>{step}</h2><p>{t.processText[i]}</p></article>)}</section>
    </> : <>
      <section className="system-modules">{t.systemsItems.map(item => <div key={item}><Check size={20}/><h2>{item}</h2></div>)}</section>
      <Link href="/ejemplos/control-logistico/" hrefLang="es" className="button button-outline">{t.demoLink}<ArrowUpRight size={16}/></Link>
      <details className="focus-faq"><summary>{t.systemsFaq[0]}</summary><p>{t.systemsFaq[1]}</p></details>
      <p className="focus-note">{t.systemsNote}</p>
      <div className="related-services"><span>{t.more}</span><Link href={localePath(locale,'/servicios/automatizacion-n8n/')}>{t.automation}<ArrowUpRight size={16}/></Link><Link href={localePath(locale,'/servicios/inteligencia-artificial/')}>{t.ai}<ArrowUpRight size={16}/></Link></div>
    </>}
    <section className="focus-contact"><div><h2>{t.finalTitle}</h2><p>{t.finalText}</p></div><Link href={`/contacto?lang=${locale}${section === 'sistemas' ? '&tipo=ERP%20y%20software%20a%20medida' : ''}`} className="button button-gold">{t.talk}<ArrowUpRight size={18}/></Link></section>
  </main>;
}
