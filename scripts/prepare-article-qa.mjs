import { writeFile } from 'node:fs/promises';

// Browser fixture for the skill's headless runner. Temporary output must not be deployed.
const html = `<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Comprobación de artículos interactivos</title><style>body{background:#090c09;color:#f3eadc;font:16px system-ui;margin:16px}h1{font-size:24px}iframe{display:block;border:1px solid #777;width:100%;height:1100px;background:#090c09}#result{white-space:pre-wrap;line-height:1.5}</style><h1>Comprobación de artículos interactivos</h1><pre id="result">Ejecutando pruebas…</pre><iframe title="Artículo de prueba"></iframe><script type="module">
const output=document.querySelector('#result'), frame=document.querySelector('iframe'), lines=[];
const pause=ms=>new Promise(r=>setTimeout(r,ms));
async function until(test,message){for(let i=0;i<160;i++){if(test())return;await pause(50)}throw Error(message)}
function assert(value,message){if(!value)throw Error(message)}
const root=()=>frame.contentDocument.querySelector('[data-experience]');
const result=()=>root().querySelector('.play-result');
async function load(slug){frame.src='/blog/'+slug+'/';await until(()=>frame.contentDocument.location.pathname==='/blog/'+slug+'/'&&root()?.dataset.ready==='true','Hydration: '+slug);await frame.contentDocument.fonts.ready;}
const choose=(select,value)=>{select.value=value;select.dispatchEvent(new frame.contentWindow.Event('change',{bubbles:true}))};
async function click(element,test,message){element.click();await until(test,message)}
function checkBounds(width){const doc=frame.contentDocument, win=frame.contentWindow;assert(doc.documentElement.scrollWidth<=width+2,'Page overflow at '+width);for(const el of root().querySelectorAll('button,input,select,textarea,table')){const r=el.getBoundingClientRect();assert(r.left>=-1&&r.right<=width+1,'Control overflow: '+el.tagName+' at '+width);if(el.tagName==='BUTTON')assert(r.height>=43,'Button target: '+el.textContent)}}
try{
 await load('como-una-web-ayuda-a-vender');
 await click(root().querySelectorAll('.play-options button')[1],()=>root().textContent.includes('Reparación y mantenimiento'),'Clear website example');
 await click(root().querySelector('.play-action'),()=>result().textContent.includes('cambios de mi bicicleta'),'Contextual enquiry');
 await click(root().querySelectorAll('.play-options button')[0],()=>!result().textContent.includes('cambios de mi bicicleta'),'Website example resets enquiry');
 lines.push('PASS · Oferta clara/vaga, consulta contextual y reinicio.');
 await load('excel-o-sistema-para-mi-negocio');
 const checks=root().querySelectorAll('input');
 await click(checks[0],()=>result().textContent.includes('comprobar las conexiones'),'Repeated data');
 await click(checks[2],()=>result().textContent.includes('integración pequeña'),'Integration advice');
 await click(checks[3],()=>result().textContent.includes('roles y estados'),'Permissions advice');
 lines.push('PASS · Orientación de procesos según repetición, conexiones y permisos.');
 await load('cuanto-cuesta-pagina-web-peru');
 await click(root().querySelector('input[value="corporate"]'),()=>result().textContent.includes('US$ 300'),'Corporate plan');
 await click(root().querySelector('input[type="checkbox"]'),()=>result().textContent.includes('A medida'),'Integrations override price');
 await click(root().querySelector('input[value="landing"]'),()=>result().textContent.includes('A medida'),'Override persists across scope changes');
 await click(root().querySelector('input[type="checkbox"]'),()=>result().textContent.includes('US$ 70'),'Base price restored');
 lines.push('PASS · Planes, cambio de alcance y presupuesto a medida para integraciones.');
 await load('automatizacion-n8n-negocios');
 const select=root().querySelector('select');
 assert(root().querySelector('.play-controls button').disabled,'Initial previous button disabled');
 await click(root().querySelectorAll('.play-controls button')[1],()=>result().textContent.includes('Paso 2 de 4'),'Advance workflow');
 await click(root().querySelector('.play-controls button'),()=>result().textContent.includes('Paso 1 de 4'),'Previous workflow stage');
 for(const [scenario,expected] of [['valid','Ejemplo completado'],['incomplete','Revisión pendiente'],['duplicate','Sin aviso duplicado'],['unavailable','Aviso no entregado']]){
  choose(select,scenario);await until(()=>result().textContent.includes('Paso 1 de 4'),'Scenario resets step');
  await click(root().querySelectorAll('.play-flow button')[3],()=>result().textContent.includes(expected),'Workflow outcome: '+scenario);
  await click(root().querySelectorAll('.play-controls button')[1],()=>result().textContent.includes('Paso 1 de 4'),'Workflow restart');
 }
 lines.push('PASS · Flujo completo, validación, duplicados, aviso fallido y reinicio.');
 await load('seo-para-web-de-servicios');
 const input=root().querySelector('input'), area=root().querySelector('textarea');
 const set=(el,value,kind)=>{Object.getOwnPropertyDescriptor(frame.contentWindow[kind].prototype,'value').set.call(el,value);el.dispatchEvent(new frame.contentWindow.Event('input',{bubbles:true}))};
 set(input,'Taller de bicicletas en Lima','HTMLInputElement');
 set(area,'Revisión de frenos y cambios. Solicita información sobre el servicio.','HTMLTextAreaElement');
 await until(()=>root().querySelector('.play-snippet h3').textContent==='Taller de bicicletas en Lima'&&root().querySelector('.play-snippet p').textContent.includes('Revisión de frenos'),'Live SEO preview');
 set(input,'','HTMLInputElement');await until(()=>root().querySelector('.play-snippet h3').textContent.includes('Escribe un título'),'Empty SEO fallback');
 await click(root().querySelector('.play-action'),()=>input.value.includes('JAIAX Labs'),'SEO reset');
 lines.push('PASS · Vista SEO en vivo, texto vacío y restauración.');
 for(const [slug] of [['como-una-web-ayuda-a-vender'],['excel-o-sistema-para-mi-negocio'],['cuanto-cuesta-pagina-web-peru'],['automatizacion-n8n-negocios'],['seo-para-web-de-servicios']]){
  await load(slug);
  if(slug==='seo-para-web-de-servicios'){set(root().querySelector('input'),'X'.repeat(180),'HTMLInputElement');set(root().querySelector('textarea'),'Y'.repeat(500),'HTMLTextAreaElement');await pause(100)}
  for(const width of [1440,1024,768,390,320]){frame.style.width=width+'px';await pause(100);checkBounds(width)}
 }
 lines.push('PASS · Cinco artículos sin desbordamiento a 1440, 1024, 768, 390 y 320 px; botones de al menos 44 px.');
 output.textContent=lines.join('\\n')+'\\nTODAS LAS PRUEBAS PASARON';document.documentElement.dataset.qa='passed';
 frame.style.width='100%';await load('automatizacion-n8n-negocios');frame.contentWindow.scrollTo({top:root().getBoundingClientRect().top+frame.contentWindow.scrollY-100,behavior:'instant'});
}catch(error){output.textContent=lines.join('\\n')+'\\nFAIL · '+error.message;document.documentElement.dataset.qa='failed'}
</script></html>`;
await writeFile('out/__article-qa.html', html);
console.log('Prepared out/__article-qa.html; remove before publication.');
