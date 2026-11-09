'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Pause, Play, RotateCcw, X } from 'lucide-react';
import { labCopy } from '@/i18n/lab';
import type { Locale } from '@/i18n/config';

/** Automatic opening sequence on every homepage visit, followed by the live static page. */
export function BuildExperience({ locale }: { locale: Locale }) {
  const t = labCopy[locale];
  const dialog = useRef<HTMLDialogElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const elapsed = useRef(0);
  const paused = useRef(false);
  const rate = useRef(1);
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [phase, setPhase] = useState(0);
  const [run, setRun] = useState(0);
  const [still, setStill] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    let active = true;
    document.fonts.ready.then(() => {
      if (active && !matchMedia('(prefers-reduced-motion: reduce)').matches) setOpen(true);
    });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!open || !dialog.current || !stage.current) return;
    const modal = dialog.current, host = stage.current, returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const source = document.querySelector<HTMLElement>('main > .lab-hero');
    if (!source) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    modal.showModal();
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const clone = source.cloneNode(true) as HTMLElement;
    clone.querySelectorAll('dialog, script, noscript').forEach(node => node.remove());
    clone.querySelectorAll('[id]').forEach(node => node.removeAttribute('id'));
    clone.removeAttribute('id');
    clone.removeAttribute('aria-labelledby');
    clone.inert = true;
    const page = document.createElement('div');
    page.className = 'lab-home rebuild-page';
    page.setAttribute('aria-hidden', 'true');
    page.inert = true;
    page.append(clone);
    host.replaceChildren(page);
    const width = source.offsetWidth, height = source.offsetHeight;
    const scale = Math.min(host.clientWidth / width, host.clientHeight / height);
    page.style.cssText = `width:${width}px;height:${height}px;transform:scale(${scale});left:${(host.clientWidth-width*scale)/2}px;top:${(host.clientHeight-height*scale)/2}px`;
    const animations: Animation[] = [];
    const duration = 11000;
    const targets = [...clone.querySelectorAll<HTMLElement>('[data-build]')];
    const cursors: HTMLElement[] = [];
    const geometry: {x: number; y: number; w: number; h: number}[] = [];
    const bounds = host.getBoundingClientRect();
    targets.forEach((target, i) => {
      const r = target.getBoundingClientRect();
      const rect = {x:r.left-bounds.left, y:r.top-bounds.top, w:r.width, h:r.height};
      geometry.push(rect);
      if (reduced.matches) return;
      const start = 450 + i * 1050;
      const reveal = target.animate([{clipPath:'inset(0 100% 0 0)',opacity:0}, {clipPath:'inset(0 0% 0 0)',opacity:1}], {duration:950, delay:start, fill:'both', easing:'cubic-bezier(.22,1,.36,1)'});
      reveal.pause(); animations.push(reveal);
      const wire = document.createElement('div');
      wire.className = `rebuild-wire rebuild-tone-${i%3}`;
      wire.style.cssText = `left:${rect.x}px;top:${rect.y}px;width:${rect.w}px;height:${rect.h}px`;
      wire.setAttribute('aria-hidden','true');
      host.append(wire);
      const draw = wire.animate([{opacity:0,clipPath:'inset(0 100% 0 0)'},{opacity:.8,clipPath:'inset(0 0% 0 0)',offset:.3},{opacity:.8,offset:.7},{opacity:0}], {duration:1600,delay:Math.max(0,start-350),fill:'both'});
      draw.pause(); animations.push(draw);
    });
    if (!reduced.matches) t.demoAgents.forEach((name, i) => {
      const cursor = document.createElement('div');
      cursor.className = `rebuild-cursor rebuild-tone-${i}`;
      cursor.setAttribute('aria-hidden','true');
      // All text is our localized catalog; this SVG is a generic cursor, not another brand's asset.
      cursor.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M3 2v18l5-5 4 7 3-2-4-7 7-1z" fill="currentColor" stroke="#090b0b" stroke-width="1.4"/></svg><span></span>';
      cursor.querySelector('span')!.textContent = name;
      host.append(cursor); cursors.push(cursor);
      const points: Keyframe[] = [{transform:`translate(${host.clientWidth*(.2+i*.25)}px,16px)`,opacity:0,offset:0}];
      geometry.forEach((r, index) => {
        if (index % 3 !== i) return;
        const start = (450+index*1050)/duration;
        points.push({transform:`translate(${r.x+6}px,${r.y+6}px)`,opacity:1,offset:start});
        points.push({transform:`translate(${Math.min(host.clientWidth-100,r.x+r.w-12)}px,${r.y+Math.min(r.h-4,32)}px)`,opacity:1,offset:Math.min(.92,start+900/duration)});
      });
      points.push({transform:`translate(${host.clientWidth*(.2+i*.25)}px,${host.clientHeight-30}px)`,opacity:0,offset:1});
      const movement=cursor.animate(points,{duration,fill:'both',easing:'ease-in-out'});
      movement.pause(); animations.push(movement);
    });
    elapsed.current = reduced.matches ? duration : 0;
    paused.current = false;
    let frame = 0, last = 0, lastPhase = -1;
    let finishTimer: ReturnType<typeof setTimeout> | undefined;
    const finishStill = () => { if(reduced.matches) { elapsed.current=duration; animations.forEach(a=>a.currentTime=duration); cursors.forEach(c=>c.hidden=true); setStill(true); } };
    finishStill();
    const tick = (now: number) => {
      if (last && !paused.current && document.visibilityState === 'visible') elapsed.current = Math.min(duration, elapsed.current + Math.min(80,now-last)*rate.current);
      last=now;
      animations.forEach(a => { a.currentTime=elapsed.current; });
      const p=elapsed.current/duration;
      if(progress.current) progress.current.style.transform=`scaleX(${p})`;
      const next=p >= 1 ? 3 : Math.min(2,Math.floor(p*3));
      if(next!==lastPhase) {lastPhase=next;setPhase(next);}
      if(elapsed.current<duration) frame=requestAnimationFrame(tick);
      else {
        setPlaying(false);setPhase(3);
        if (reduced.matches) close();
        else finishTimer=setTimeout(()=>{
          const fade=modal.animate([{opacity:1},{opacity:0}],{duration:400,easing:'ease-out'});
          fade.onfinish=close;animations.push(fade);
        },650);
      }
    };
    frame=requestAnimationFrame(tick);
    const onResize=()=>close();
    reduced.addEventListener('change',finishStill);
    window.addEventListener('resize',onResize);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(finishTimer);
      reduced.removeEventListener('change',finishStill);
      window.removeEventListener('resize',onResize);
      animations.forEach(a=>a.cancel());
      host.replaceChildren();
      modal.close();
      document.body.style.overflow=oldOverflow;
      returnFocus?.focus({preventScroll:true});
    };
  }, [open, run, t, close]);

  return <dialog ref={dialog} className="rebuild-dialog" aria-labelledby="rebuild-title" aria-describedby="rebuild-description" onCancel={event=>{event.preventDefault();close();}} >
      <div className="rebuild-top"><div><span className="rebuild-status-dot"/><span>JAIAX / Live build</span></div><button type="button" onClick={close} aria-label={t.demoClose} autoFocus><X size={22}/></button></div>
      <div className="rebuild-heading"><h2 id="rebuild-title">{t.demoTitle}</h2><p id="rebuild-description">{t.demoDesc}</p></div>
      <div className="rebuild-stage" ref={stage}/>
      <div className="rebuild-toolbar">
        <div className="rebuild-phase" role="status" aria-live="polite"><span>0{phase+1} / 04</span><strong>{still?t.demoReduced:t.demoPhases[phase]}</strong></div>
        <div className="rebuild-controls">
          {!still && phase<3 && <><button type="button" onClick={()=>{paused.current=!paused.current;setPlaying(!paused.current);}} aria-label={playing?t.demoPause:t.demoPlay}>{playing?<Pause size={17}/>:<Play size={17}/>}<span>{playing?t.demoPause:t.demoPlay}</span></button><button type="button" aria-label={t.demoSpeed} onClick={()=>{const value=rate.current===1?2:1;rate.current=value;setSpeed(value);}}>{speed}×</button></>}
          {!still && <button type="button" onClick={()=>{paused.current=false;setPlaying(true);setPhase(0);setRun(v=>v+1);}} aria-label={t.demoReplay}><RotateCcw size={17}/><span>{t.demoReplay}</span></button>}
          <button type="button" className="rebuild-exit" onClick={close}>{t.demoClose}<ArrowUpRight size={16}/></button>
        </div>
        <div className="rebuild-progress" aria-hidden="true"><div ref={progress}/></div>
      </div>
    </dialog>;
}
