"use client";

import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
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
  es: { tabs: ['Inspirar', 'Vender', 'Organizar'], title: 'Míralo. Pruébalo. Imagínalo tuyo.', concept: 'Concepto visual', demo: 'Probar demo', note: 'Exploraciones del estudio. Las demos relacionadas se abren por separado.', view: 'Ver servicio' },
  en: { tabs: ['Inspire', 'Sell', 'Organise'], title: 'See it. Try it. Make it yours.', concept: 'Visual concept', demo: 'Try demo (ES)', note: 'Studio explorations. Related demos open separately in Spanish.', view: 'Explore service' },
  de: { tabs: ['Inspirieren', 'Verkaufen', 'Organisieren'], title: 'Ansehen. Ausprobieren. Weiterdenken.', concept: 'Visuelles Konzept', demo: 'Demo testen (ES)', note: 'Studiokonzepte. Zugehörige Demos öffnen separat auf Spanisch.', view: 'Leistung ansehen' },
  it: { tabs: ['Ispirare', 'Vendere', 'Organizzare'], title: 'Guardalo. Provalo. Immaginalo tuo.', concept: 'Concept visivo', demo: 'Prova demo (ES)', note: 'Concept dello studio. Le demo correlate si aprono separatamente in spagnolo.', view: 'Esplora servizio' },
};

export function VisualShowroom({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: stage, offset: ['start end', 'center center'] });
  const tilt = useTransform(scrollYProgress, [0, 1], [13, 0]);
  const rise = useTransform(scrollYProgress, [0, 1], [65, 0]);
  const inView = useInView(stage, { margin: '100px' });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const pointerYaw = useSpring(mouseX, { stiffness: 95, damping: 24 });
  const pointerPitch = useSpring(mouseY, { stiffness: 95, damping: 24 });
  const floating = inView && !reduced;
  function pointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'mouse' || reduced) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    mouseX.set(((event.clientX - bounds.left) / bounds.width - .5) * 7);
    mouseY.set(-((event.clientY - bounds.top) / bounds.height - .5) * 4);
  }
  function resetPointer() { mouseX.set(0); mouseY.set(0); }
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
    <div className="showroom-heading"><h2 id="showroom-title">{t.title}</h2></div>
    <div className="showroom-tabs" role="tablist" aria-label={copy.title}>
      {t.tabs.map((label, index) => <button type="button" key={label} id={`solution-tab-${index}`} role="tab" aria-selected={index === active} aria-controls={`solution-panel-${index}`} tabIndex={index === active ? 0 : -1} onClick={()=>{setActive(index); resetPointer();}} onKeyDown={event=>keyboard(event,index)}>{active === index && <motion.i className="showroom-selection" layoutId={`showroom-selection-${locale}`} transition={reduced ? {duration:0} : {type:'spring',stiffness:380,damping:32}} aria-hidden="true"/>}{label}</button>)}
    </div>
    <div ref={stage} className="showroom-stage" onPointerMove={pointerMove} onPointerLeave={resetPointer}>
      {visuals.map((visual,index) => <div className="visual-panel" key={visual.name} id={`solution-panel-${index}`} role="tabpanel" aria-labelledby={`solution-tab-${index}`} hidden={active !== index}>
        <motion.div className="device-interaction" style={{rotateY: reduced ? 0 : pointerYaw, rotateX: reduced ? 0 : pointerPitch}}>
        <motion.div className="device-scene" style={{ rotateX: reduced ? 0 : tilt, y: reduced ? 0 : rise }}>
          <div className="device-halo" />
          <div className="showroom-laptop"><div className="laptop-screen"><span className="laptop-camera"/><Image src={visual.concept} width={1536} height={1024} sizes="(max-width: 680px) 90vw, 70vw" alt={`${visual.name} — ${t.concept}: ${t.tabs[index]}`} loading="lazy"/></div><div className="laptop-deck"><span/></div></div>
          <motion.div className="showroom-phone phone-left" aria-hidden="true" animate={{y: floating && active === index ? [0,-9,0] : 0, rotateZ:-6, rotateY:8}} transition={floating && active === index ? {duration:5.8, repeat:Infinity, ease:"easeInOut"} : {duration:0}}><Image src={visual.demo.mobileImage} width={390} height={844} sizes="(max-width: 680px) 24vw, 15vw" alt=""/><span className="device-notch"/></motion.div>
          <motion.div className="showroom-phone phone-right" aria-hidden="true" animate={{y: floating && active === index ? [0,8,0] : 0, rotateZ:6, rotateY:-8}} transition={floating && active === index ? {duration:6.6, repeat:Infinity, ease:"easeInOut"} : {duration:0}}><Image src={visual.demo.mobileImage} width={390} height={844} sizes="(max-width: 680px) 24vw, 15vw" alt=""/><span className="device-notch"/></motion.div>
        </motion.div></motion.div>
        <div className="showroom-detail"><div><h3>{visual.name}</h3><p>{copy.routes[index][1]}</p></div><div className="showroom-actions"><Link href={localePath(locale,visual.path)} className="button button-gold">{t.view}<ArrowUpRight size={17}/></Link><Link href={`/ejemplos/${visual.demo.slug}/`} hrefLang="es" className="text-link">{t.demo}<ArrowUpRight size={17}/></Link></div></div>
      </div>)}
    </div>
    <p className="showroom-note">{t.note}</p>
  </section>;
}
