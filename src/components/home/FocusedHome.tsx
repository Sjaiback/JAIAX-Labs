import Link from '@/components/ui/site-link';
import { ArrowUpRight } from 'lucide-react';
import { Hero } from './hero';
import { VisualShowroom } from './VisualShowroom';
import { experience } from '@/i18n/experience';
import type { Locale } from '@/i18n/config';

export function FocusedHome({ locale = 'es' }: { locale?: Locale }) {
  const t = experience[locale];
  return <main id="main" className="focused-home visual-home">
    <Hero locale={locale} />
    <VisualShowroom locale={locale}/>
    <section className="container focus-contact"><div><h2>{t.finalTitle}</h2><p>{t.finalText}</p></div><Link className="button button-gold" href={`/contacto?lang=${locale}`}>{t.talk}<ArrowUpRight size={18}/></Link></section>
  </main>;
}
