/** Browser checks against the actual static export. Generate, then run Taste Skill shoot.mjs.
 * --hero captures the live page; --capture pauses the automatically started introduction.
 * out/__lab-qa.html is temporary and must be removed before deployment.
 */
import { writeFile } from 'node:fs/promises';
const base=process.env.NEXT_PUBLIC_BASE_PATH||'';
const capture=process.argv.includes('--capture'),hero=process.argv.includes('--hero');
const html=`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>JAIAX automatic intro checks</title><style>html,body{margin:0;background:#090b0b;color:#f3f1e9;font:12px monospace}iframe{display:block;border:0;width:100vw;height:100vh}#report{position:fixed;top:4px;left:4px;max-width:calc(100vw - 40px);background:#142519f5;border:1px solid #acccaa;padding:12px;z-index:5;white-space:pre-wrap}#report.fail{background:#441c18;border-color:#ff9a85}</style></head><body><iframe title="JAIAX exported homepage" src="${base}/es/"></iframe><pre id="report">Waiting for hydration…</pre><script>
const report=document.querySelector('#report'),frame=document.querySelector('iframe'),lines=[];
const delay=ms=>new Promise(r=>setTimeout(r,ms));
function check(ok,text){if(!ok)throw Error(text);lines.push('PASS '+text);report.textContent=lines.join('\\n');}
async function visit(path){const loaded=new Promise(r=>frame.addEventListener('load',r,{once:true}));frame.src='${base}'+path;await loaded;await frame.contentDocument.fonts.ready;await delay(450);}
function cancelIntro(){const dialog=frame.contentDocument.querySelector('.rebuild-dialog');if(dialog?.open)dialog.dispatchEvent(new Event('cancel',{cancelable:true}));}
(async()=>{try{
 await new Promise(r=>frame.addEventListener('load',r,{once:true}));await delay(900);
 let w=frame.contentWindow,d=frame.contentDocument;
 const quiet=w.matchMedia('(prefers-reduced-motion: reduce)').matches;
 check(!d.querySelector('.lab-demo-trigger'),'manual start button removed');
 check(!d.querySelector('.lab-hero-actions').textContent.includes('¿Quieres ver'),'old question removed from page');
 check(d.querySelectorAll('main>.lab-hero h1').length===1,'one live-page headline');
 let modal=d.querySelector('.rebuild-dialog');
 if(${hero}){cancelIntro();report.hidden=true;return;}
 if(quiet){check(!modal.open,'reduced motion skips the automatic intro');check(d.body.style.overflow!=='hidden','page immediately scrollable');}
 else {
 check(modal.open,'intro starts automatically without a click');
 check(d.querySelectorAll('.rebuild-page').length===1&&d.querySelector('.rebuild-page').inert,'one inert copy of the live hero');
 check(d.querySelectorAll('.rebuild-cursor').length===3,'three construction cursors');
 if(${capture}){await delay(6000);d.querySelector('[aria-label="Pausar"]').click();report.hidden=true;return;}
 check(modal.contains(d.activeElement),'focus is contained in intro');
 d.querySelector('[aria-label="Pausar"]').click();await delay(80);
 const bar=d.querySelector('.rebuild-progress>div'),before=bar.style.transform;await delay(250);check(bar.style.transform===before,'pause freezes progress');
 d.querySelector('[aria-label="Continuar"]').click();await delay(150);check(bar.style.transform!==before,'resume advances progress');
 d.querySelector('[aria-label="Cambiar velocidad"]').click();await delay(80);check(d.querySelector('[aria-label="Cambiar velocidad"]').textContent.includes('2'),'speed switches to 2×');
 d.querySelector('[aria-label="Repetir"]').click();await delay(150);check(d.querySelectorAll('.rebuild-page').length===1,'replay cleans its previous copy');
 await delay(7000);check(!modal.open,'completed intro automatically hands over to website');
 check(d.body.style.overflow!=='hidden'&&d.querySelectorAll('.rebuild-page').length===0,'handover restores scrolling and clears preview');
 await visit('/es/');d=frame.contentDocument;w=frame.contentWindow;modal=d.querySelector('.rebuild-dialog');check(modal.open,'intro starts again on next visit');
 cancelIntro();await delay(100);check(!modal.open,'Escape skips intro');
 await visit('/es/');d=frame.contentDocument;w=frame.contentWindow;modal=d.querySelector('.rebuild-dialog');check(modal.open,'intro is not limited by session storage');
 d.querySelector('.rebuild-exit').click();await delay(100);check(!modal.open,'exit button skips intro');
 }
 const strokes=[...d.querySelectorAll('main>.lab-hero .masthead-stroke')];check(strokes.length===10&&strokes.every(p=>w.getComputedStyle(p).fill==='none'),'JAIAX and star remain unfilled line paths');
 const faq=d.querySelector('.lab-faq summary');faq.click();check(faq.parentElement.open,'FAQ remains usable');faq.click();
 const pricing=[...d.querySelectorAll('.lab-prices [data-plan] a')];check(pricing.length===4&&pricing.every(a=>new URL(a.href).hostname==='api.whatsapp.com'),'four plan contact links remain valid');
 for(const width of [1440,1024,820,768,390,320]){frame.style.width=width+'px';await delay(100);check(d.documentElement.scrollWidth<=width+1,'no horizontal overflow at '+width+'px');}
 frame.style.width='100vw';
 for(const locale of ['en','de','it']){await visit('/'+locale+'/');cancelIntro();check(!frame.contentDocument.querySelector('.lab-demo-trigger'),locale+' has no manual intro button');}
 await visit('/es/');cancelIntro();
 const navigated=new Promise(r=>frame.addEventListener('load',r,{once:true}));frame.contentDocument.querySelector('.lab-project').click();await navigated;check(frame.contentWindow.location.pathname.endsWith('/ejemplos/blog-editorial/'),'static demo navigation works');
 await visit('/es/');cancelIntro();
 lines.push('BROWSER CHECKS COMPLETE');report.textContent=lines.join('\\n');
 }catch(error){report.className='fail';report.textContent=lines.join('\\n')+'\\nFAIL '+error.message;}})();
</script></body></html>`;
await writeFile('out/__lab-qa.html',html);console.log('Prepared temporary automatic-intro browser checks.');
