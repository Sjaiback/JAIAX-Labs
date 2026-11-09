'use client';

import { useEffect } from 'react';

/** Scroll adds to the page; it never takes ownership of scrolling or hides the server-rendered content. */
export function LabMotion() {
  useEffect(()=>{
    const root=document.querySelector<HTMLElement>('main.lab-home');
    if(!root) return;
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');
    const desktop=matchMedia('(min-width: 821px)');
    const sections=[...root.querySelectorAll<HTMLElement>('.lab-section')];
    const images=[...root.querySelectorAll<HTMLElement>('.lab-project-image')];
    const played=new WeakSet<Element>();
    const animations=new Set<Animation>();
    let frame=0;
    const paint=()=>{
      frame=0;
      const vh=innerHeight;
      for(const section of sections){
        const r=section.getBoundingClientRect();
        const progress=reduced.matches?1:Math.max(0,Math.min(1,(vh*.9-r.top)/(vh*.65)));
        section.style.setProperty('--section-line',String(progress));
      }
      for(const image of images){
        const r=image.getBoundingClientRect();
        const p=Math.max(-1,Math.min(1,(r.top+r.height/2-vh/2)/vh));
        image.style.setProperty('--image-travel',`${!reduced.matches&&desktop.matches?p*24:0}px`);
      }
    };
    const schedule=()=>{if(!frame)frame=requestAnimationFrame(paint);};
    const observer=new IntersectionObserver(entries=>{
      for(const entry of entries){
        if(!entry.isIntersecting||reduced.matches||played.has(entry.target)) continue;
        played.add(entry.target);
        const animation=entry.target.animate([{transform:'translateY(24px)'},{transform:'translateY(0)'}],{duration:750,easing:'cubic-bezier(.22,1,.36,1)'});
        animations.add(animation);
        animation.onfinish=()=>animations.delete(animation);
      }
    },{threshold:.35,rootMargin:'0px 0px -40px 0px'});
    root.querySelectorAll('.lab-section-heading h2,.lab-faq-grid>h2,.lab-contact h2').forEach(node=>observer.observe(node));
    const preference=()=>{if(reduced.matches){animations.forEach(a=>a.cancel());animations.clear();}schedule();};
    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',schedule);
    reduced.addEventListener('change',preference);
    desktop.addEventListener('change',schedule);
    paint();
    return ()=>{
      cancelAnimationFrame(frame);observer.disconnect();animations.forEach(a=>a.cancel());
      window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);
      reduced.removeEventListener('change',preference);desktop.removeEventListener('change',schedule);
      sections.forEach(node=>node.style.removeProperty('--section-line'));
      images.forEach(node=>node.style.removeProperty('--image-travel'));
    };
  },[]);
  return null;
}
