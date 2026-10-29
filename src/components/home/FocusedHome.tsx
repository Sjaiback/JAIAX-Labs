import Link from '@/components/ui/site-link';
import { ArrowUpRight, Mail, MessageCircle, Plus } from 'lucide-react';
import { Hero } from './hero';
import { VisualShowroom } from './VisualShowroom';
import { experience } from '@/i18n/experience';
import { homeCopy } from '@/i18n/home';
import { PricingCards } from '@/components/pricing/PricingCards';
import { site } from '@/data/site';
import type { Locale } from '@/i18n/config';

export function FocusedHome({ locale = 'es' }: { locale?: Locale }) {
  const t = experience[locale];
  const home = homeCopy[locale];
  return <main id="main" className="focused-home visual-home">
    <Hero locale={locale} />
    <VisualShowroom locale={locale}/>
    <section id="precios" className="container home-prices" aria-labelledby="home-prices-title">
      <div className="home-section-heading"><h2 id="home-prices-title">{home.prices}</h2><p>{home.priceText}</p></div>
      <PricingCards locale={locale} compact/><p className="focus-note">{t.terms}</p>
    </section>
    <section className="container home-questions" aria-labelledby="home-faq-title">
      <h2 id="home-faq-title">{home.faqTitle}</h2>
      <div>{home.faqs.map(([question,answer]) => <details key={question}><summary>{question}<Plus size={19} aria-hidden="true"/></summary><p>{answer}</p></details>)}</div>
    </section>
    <section id="contacto" className="container home-contact" aria-labelledby="home-contact-title">
      <div><h2 id="home-contact-title">{home.contact}</h2><p>{home.contactText}</p></div>
      <div className="home-contact-links"><Link className="button button-gold" href={`/contacto?lang=${locale}`}><MessageCircle size={18}/>{home.whatsapp}<ArrowUpRight size={18}/></Link><a href={`mailto:${site.email}`} className="home-email"><Mail size={18} aria-hidden="true"/><span>{site.email}</span></a><span className="home-phone">+51 924 488 034</span></div>
    </section>
  </main>;
}
