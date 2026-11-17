"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import Link from "@/components/ui/site-link";
import { plans } from "@/data/pricing";
import { articleExperiences, processAdvice, recommendedPlan, workflowStages, type ExperienceKind, type ProcessNeeds, type WebScope, type WorkflowCase } from "@/data/article-experiences";
import "./article-playground.css";

function WebsiteExample() {
  const [clear, setClear] = useState(false);
  const [tried, setTried] = useState(false);
  return <>
    <div className="play-options" role="group" aria-label="Comparar la presentación del taller">
      <button type="button" aria-pressed={!clear} onClick={() => { setClear(false); setTried(false); }}>Oferta vaga</button>
      <button type="button" aria-pressed={clear} onClick={() => { setClear(true); setTried(false); }}>Oferta clara</button>
    </div>
    <div className="play-preview" aria-live="polite" aria-atomic="true">
      <span className="play-label">Ejemplo ficticio · Taller de bicicletas</span>
      <h3>{clear ? "Reparación y mantenimiento de bicicletas." : "Calidad y soluciones para ti."}</h3>
      <p>{clear ? "Revisamos frenos, cambios y transmisión. Cuéntanos qué le ocurre a tu bicicleta y te orientamos sobre la revisión que necesita." : "Somos tu mejor opción. Tenemos un gran equipo y un servicio excelente. Escríbenos para más información."}</p>
      <span className="play-action-preview">{clear ? "Solicitar una revisión" : "Más información"}</span>
    </div>
    <button className="play-action" type="button" onClick={() => setTried(true)}>Probar la consulta <ArrowRight size={16} aria-hidden="true" /></button>
    <div className="play-result" role="status" aria-atomic="true">
      {tried ? <><h3>Una posible consulta</h3><p>{clear ? "«Hola, los cambios de mi bicicleta saltan al pedalear. ¿Qué información necesitan para revisar el problema?»" : "«Hola, ¿qué servicios ofrecen?»"}</p><p>Es una posibilidad ilustrativa, no un resultado garantizado. {clear ? "El cliente ya conoce el servicio y puede explicar su necesidad." : "Todavía falta explicar qué hace el taller antes de hablar de una necesidad concreta."}</p></> : <p>Compara ambas versiones y prueba qué contexto podría llevar el cliente a la conversación.</p>}
    </div>
  </>;
}

const processOptions: { key: keyof ProcessNeeds; label: string }[] = [
  { key: "repeated", label: "Copiamos los mismos datos entre herramientas." },
  { key: "shared", label: "Varias personas trabajan con versiones distintas." },
  { key: "integrations", label: "Tenemos integraciones o API disponibles por confirmar." },
  { key: "permissions", label: "Necesitamos permisos por persona y estados de trabajo." },
];
function ProcessExample() {
  const [needs, setNeeds] = useState<ProcessNeeds>({ repeated: false, shared: false, integrations: false, permissions: false });
  const advice = processAdvice(needs);
  return <>
    <fieldset className="play-checks"><legend>¿Qué ocurre hoy en tu equipo?</legend>{processOptions.map(option => <label key={option.key}>
      <input type="checkbox" checked={needs[option.key]} onChange={e => setNeeds({ ...needs, [option.key]: e.target.checked })} />
      <span>{option.label}</span>
    </label>)}</fieldset>
    <div className="play-result" role="status" aria-atomic="true"><span className="play-label">Orientación inicial</span><h3>{advice.title}</h3><p>{advice.detail}</p></div>
    <p className="play-note">Estas señales orientan una conversación; no sustituyen la revisión del proceso, los costes y las opciones disponibles.</p>
  </>;
}

const scopeOptions: { value: WebScope; label: string }[] = [
  { value: "landing", label: "Una landing de hasta cinco secciones" },
  { value: "extended", label: "Una landing de hasta ocho secciones" },
  { value: "corporate", label: "Una web corporativa de hasta cinco páginas" },
  { value: "custom", label: "Una tienda online o un sistema a medida" },
];
function PricingExample() {
  const id = useId();
  const [scope, setScope] = useState<WebScope>("landing");
  const [integrations, setIntegrations] = useState(false);
  const plan = plans.find(item => item.id === recommendedPlan(scope, integrations))!;
  return <>
    <fieldset className="play-checks"><legend>¿Qué quieres construir?</legend>{scopeOptions.map(option => <label key={option.value}>
      <input type="radio" name={`${id}-scope`} value={option.value} checked={scope === option.value} onChange={() => setScope(option.value)} /><span>{option.label}</span>
    </label>)}</fieldset>
    <label className="play-check"><input type="checkbox" checked={integrations} onChange={e => setIntegrations(e.target.checked)} /><span>También necesito pagos, inventario o integraciones API.</span></label>
    <div className="play-result" role="status" aria-atomic="true">
      <span className="play-label">Plan para explorar</span><h3>{plan.name} · {plan.id === "avanzada" ? plan.price : `US$ ${plan.price}`}</h3><p>{plan.features[0]}. {plan.billing}.</p>
      <p>{plan.id === "avanzada" ? "Las funciones y dependencias deben evaluarse antes de fijar el precio." : "El precio corresponde al alcance publicado del plan; no es una cotización final de tu proyecto."}</p>
    </div>
    <div className="play-table" role="region" aria-label="Comparación de planes" tabIndex={0}><table><caption>Planes publicados de JAIAX Labs</caption><thead><tr><th scope="col">Plan</th><th scope="col">Desarrollo</th><th scope="col">Alcance principal</th></tr></thead><tbody>{plans.map(item => <tr key={item.id} data-selected={plan.id === item.id}><th scope="row">{item.name}</th><td>{item.id === "avanzada" ? item.price : `US$ ${item.price}`}</td><td>{item.features[0]}</td></tr>)}</tbody></table></div>
    <p className="play-note">Dominio, hosting y mantenimiento por separado. Los adicionales y las fechas se acuerdan en la propuesta.</p>
    <Link className="play-link" href="/planes/">Ver todas las características <ArrowRight size={16} aria-hidden="true" /></Link>
  </>;
}

const workflowCases: { value: WorkflowCase; label: string }[] = [
  { value: "valid", label: "Solicitud completa" }, { value: "incomplete", label: "Falta un contacto" },
  { value: "duplicate", label: "Solicitud duplicada" }, { value: "unavailable", label: "Falla el servicio de aviso" },
];
function WorkflowExample() {
  const id = useId();
  const [scenario, setScenario] = useState<WorkflowCase>("valid");
  const [step, setStep] = useState(0);
  const stages = workflowStages(scenario), current = stages[step];
  return <>
    <label className="play-field" htmlFor={id}>Caso de prueba<select id={id} value={scenario} onChange={e => { setScenario(e.target.value as WorkflowCase); setStep(0); }}>{workflowCases.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label>
    <ol className="play-flow" aria-label="Etapas de la simulación">{stages.map((item, index) => <li key={item.title}><button type="button" aria-current={step === index ? "step" : undefined} onClick={() => setStep(index)}><span>{index + 1}</span>{item.title}</button></li>)}</ol>
    <div className="play-result" role="status" aria-atomic="true"><span className="play-label">Paso {step + 1} de {stages.length} · {current.outcome}</span><h3>{current.title}</h3><p>{current.detail}</p></div>
    <div className="play-controls"><button type="button" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}><ArrowLeft size={16} aria-hidden="true" /> Anterior</button><button type="button" onClick={() => setStep(step === stages.length - 1 ? 0 : step + 1)}>{step === stages.length - 1 ? <><RotateCcw size={16} aria-hidden="true" /> Reiniciar</> : <>Siguiente paso <ArrowRight size={16} aria-hidden="true" /></>}</button></div>
    <p className="play-note">Puedes inspeccionar cualquier etapa. Avanzar a un paso detenido muestra por qué no se ejecutaría; no fuerza su ejecución.</p>
  </>;
}

const initialTitle = "Diseño de páginas web en Perú | JAIAX Labs";
const initialDescription = "Una web clara para presentar tu negocio. Compara planes, revisa qué incluyen y conversa con JAIAX Labs sobre tu proyecto.";
function SeoExample() {
  const id = useId();
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  return <>
    <label className="play-field" htmlFor={`${id}-title`}>Título de la página<input id={`${id}-title`} type="text" value={title} onChange={e => setTitle(e.target.value)} maxLength={180} /><span className="play-note">{title.length} caracteres</span></label>
    <label className="play-field" htmlFor={`${id}-description`}>Descripción<textarea id={`${id}-description`} rows={3} value={description} onChange={e => setDescription(e.target.value)} maxLength={500} /><span className="play-note">{description.length} caracteres</span></label>
    <div className="play-snippet"><span className="play-label">Vista orientativa</span><span className="play-url">jaiax.com › servicios › desarrollo-web-peru</span><h3>{title.trim() || "Escribe un título para tu servicio"}</h3><p>{description.trim() || "Explica qué ofreces y por qué esta página ayuda a quien busca tu servicio."}</p></div>
    <button className="play-action" type="button" onClick={() => { setTitle(initialTitle); setDescription(initialDescription); }}><RotateCcw size={16} aria-hidden="true" /> Restaurar el ejemplo</button>
    <p className="play-note">Google puede adaptar el título y el fragmento a cada búsqueda. La longitud, por sí sola, no determina la posición ni garantiza clics.</p>
  </>;
}

export function ArticlePlayground({ kind }: { kind: ExperienceKind }) {
  const content = articleExperiences[kind];
  const root = useRef<HTMLElement>(null);
  useEffect(() => { root.current?.setAttribute("data-ready", "true"); }, []);
  return <section ref={root} id="ejemplo-interactivo" className="article-playground" aria-labelledby="playground-title" data-experience={kind}>
    <span className="play-label">Explora el ejemplo</span><h2 id="playground-title">{content.title}</h2><p className="play-intro">{content.intro}</p>
    <noscript><p>Activa JavaScript para usar los controles. Puedes seguir leyendo la guía completa a continuación.</p></noscript>
    {kind === "website" ? <WebsiteExample /> : kind === "systems" ? <ProcessExample /> : kind === "pricing" ? <PricingExample /> : kind === "automation" ? <WorkflowExample /> : <SeoExample />}
  </section>;
}
