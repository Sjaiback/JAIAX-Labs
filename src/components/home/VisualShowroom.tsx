"use client";

import { useRef, useState, type KeyboardEvent } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from '@/components/ui/site-link';
import Image from '@/components/ui/site-image';
import { experience } from '@/i18n/experience';
import { localePath, type Locale } from '@/i18n/config';
import { examples } from '@/data/examples';

const visuals = [
  { concept: '/images/umbral-web-concept-v3.png', name: 'UMBRAL', demo: examples[2], path: '/servicios/desarrollo-web-peru/' },
  { concept: '/images/soma-web-concept-v3.png', name: 'SOMA', demo: examples[1], path: '/servicios/tiendas-online-peru/' },
  { concept: '/images/nodo-web-concept-v3.png', name: 'NODO', demo: examples[0], path: '/sistemas/' },
];
const labels = {
  es: { tabs: ['Página web', 'Tienda online', 'Sistema / ERP'], title: 'Míralo. Pruébalo. Imagínalo tuyo.', eyebrow: '¿QUÉ QUIERES CREAR?', concept: 'Concepto visual', demo: 'Probar demo', note: 'Exploraciones del estudio. Las demos relacionadas se abren por separado.', view: 'Ver servicio' },
  en: { tabs: ['Website', 'Online store', 'System / ERP'], title: 'See it. Try it. Make it yours.', eyebrow: 'WHAT WOULD YOU LIKE TO BUILD?', concept: 'Visual concept', demo: 'Try demo (ES)', note: 'Studio explorations. Related demos open separately in Spanish.', view: 'Explore service' },
  de: { tabs: ['Website', 'Onlineshop', 'System / ERP'], title: 'Ansehen. Ausprobieren. Weiterdenken.', eyebrow: 'WAS MÖCHTEN SIE ENTWICKELN?', concept: 'Visuelles Konzept', demo: 'Demo testen (ES)', note: 'Studiokonzepte. Zugehörige Demos öffnen separat auf Spanisch.', view: 'Leistung ansehen' },
  it: { tabs: ['Sito web', 'Negozio online', 'Sistema / ERP'], title: 'Guardalo. Provalo. Immaginalo tuo.', eyebrow: 'COSA VUOI REALIZZARE?', concept: 'Concept visivo', demo: 'Prova demo (ES)', note: 'Concept dello studio. Le demo correlate si aprono separatamente in spagnolo.', view: 'Esplora servizio' },
};

export function VisualShowroom({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: stage, offset: ['start end', 'center center'] });
  const tilt = useTransform(scrollYProgress, [0, 1], [13, 0]);
  const rise = useTransform(scrollYProgress, [0, 1], [65, 0]);
  const t = labels[locale];
  const copy = experience[locale];
  function keyboard(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if(event.key === 'ArrowRight') next = (index + 1) % 3;
    else if(event.key === 'ArrowLeft') next = (index + 2) % 3;
    else if(event.key === 'Home') next = 0;
    else if(event.key === 'End') next = 2;
    else return;
    event.preventDefault(); setActive(next);
    event.currentTarget.parentElement?.querySelectorAll('button')[next]?.focus();
  }
  return <section id="servicios" className="visual-showroom container" aria-labelledby="showroom-title">
    <span id="proyectos" className="showroom-anchor" /><span id="precios" className="showroom-anchor" />
    <div className="showroom-heading"><span className="eyebrow">{t.eyebrow}</span><h2 id="showroom-title">{t.title}</h2></div>
    <div className="showroom-tabs" role="tablist" aria-label={copy.title}>
      {t.tabs.map((label, index) => <button type="button" key={label} id={`solution-tab-${index}`} role="tab" aria-selected={index === active} aria-controls={`solution-panel-${index}`} tabIndex={index === active ? 0 : -1} onClick={()=>setActive(index)} onKeyDown={event=>keyboard(event,index)}><span>0{index+1}</span>{label}</button>)}
    </div>
    <div ref={stage} className="showroom-stage">
      {visuals.map((visual,index) => <div className="visual-panel" key={visual.name} id={`solution-panel-${index}`} role="tabpanel" aria-labelledby={`solution-tab-${index}`} hidden={active !== index}>
        <motion.div className="device-scene" style={{ rotateX: reduced ? 0 : tilt, y: reduced ? 0 : rise }}>
          <div className="device-halo" />
          <div className="showroom-laptop"><div className="laptop-screen"><span className="laptop-camera"/><Image src={visual.concept} width={1536} height={1024} sizes="(max-width: 680px) 90vw, 70vw" alt={`${visual.name} — ${t.concept}: ${t.tabs[index]}`} loading="lazy"/></div><div className="laptop-deck"><span/></div></div>
          <div className="showroom-phone phone-left" aria-hidden="true"><Image src={visual.demo.mobileImage} width={390} height={844} sizes="(max-width: 680px) 24vw, 15vw" alt=""/><span className="device-notch"/></div>
          <div className="showroom-phone phone-right" aria-hidden="true"><Image src={visual.demo.mobileImage} width={390} height={844} sizes="(max-width: 680px) 24vw, 15vw" alt=""/><span className="device-notch"/></div>
        </motion.div>
        <div className="showroom-detail"><div><span className="showroom-caption">{visual.name} / {t.concept}</span><h3>{copy.routes[index][0]}</h3><p>{copy.routes[index][1]}</p></div><div className="showroom-actions"><Link href={localePath(locale,visual.path)} className="button button-gold">{t.view}<ArrowUpRight size={17}/></Link><Link href={`/ejemplos/${visual.demo.slug}/`} hrefLang="es" className="text-link">{t.demo}<ArrowUpRight size={17}/></Link></div></div>
      </div>)}
    </div>
    <p className="showroom-note">{t.note}</p>
  </section>;
}
