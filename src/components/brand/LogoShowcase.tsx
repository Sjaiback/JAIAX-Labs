"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import { AnimatedJaiaxLogo } from "./AnimatedJaiaxLogo";
import { JaiaxLogoIntro } from "./JaiaxLogoIntro";
import styles from "./LogoShowcase.module.css";

export function LogoShowcase() {
  const [run, setRun] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [mounted, setMounted] = useState(true);
  const [size, setSize] = useState(400);
  const [completeCount, setCompleteCount] = useState(0);
  const [elapsed, setElapsed] = useState<number | null>(null);
  const [status, setStatus] = useState("Construyendo el logotipo…");
  const [intro, setIntro] = useState(false);
  const started = useRef<number | null>(null);
  const completed = () => {
    setCompleteCount((count) => count + 1);
    setStatus("Logotipo completo y visible.");
    setElapsed(
      started.current === null
        ? null
        : Math.round(performance.now() - started.current),
    );
  };
  const play = () => {
    started.current = performance.now();
    setElapsed(null);
    setAutoplay(true);
    setMounted(true);
    setRun((value) => value + 1);
    setStatus(
      reduced
        ? "Movimiento reducido: versión completa."
        : "Construyendo el logotipo…",
    );
  };
  return (
    <>
      {intro && (
        <JaiaxLogoIntro
          reducedMotion={reduced}
          onComplete={() => {
            setIntro(false);
            setStatus("Presentación completada.");
          }}
          onSkip={() => {
            setIntro(false);
            setStatus("Presentación omitida.");
          }}
        />
      )}
      <div className="page-intro">
        <span className="eyebrow">
          <span className="tiny-line" />
          IDENTIDAD EN MOVIMIENTO
        </span>
        <h1>
          De un trazo.
          <br />A una nueva posibilidad.
        </h1>
        <p>
          El logotipo original se construye con luz. Símbolo, nombre y firma, en
          una secuencia de tres segundos.
        </p>
      </div>
      <div className={styles.layout}>
        <div className={styles.stage} data-testid="logo-stage">
          <span className={styles.stageLabel}>
            JAIAX LABS / MOTION STUDY 01
          </span>
          {mounted && (
            <AnimatedJaiaxLogo
              key={run}
              size={size}
              autoplay={autoplay}
              reducedMotion={reduced}
              onComplete={completed}
            />
          )}
          <div className={styles.stageFoot}>
            <span>01 / SÍMBOLO</span>
            <span>02 / JAIAX</span>
            <span>03 / LABS</span>
          </div>
        </div>
        <aside
          className={styles.controls}
          aria-label="Controles de la animación"
        >
          <span className="eyebrow">EXPLORA EL MOVIMIENTO</span>
          <h2>Precisión en cada línea.</h2>
          <p>
            Rutas SVG editables. Degradados cian, azul y violeta. Un punto de
            luz recorre cada trazo.
          </p>
          <button className="button button-gold" onClick={play}>
            <RotateCcw size={15} />
            Reproducir de nuevo
          </button>
          <button
            className="button button-outline"
            onClick={() => setIntro(true)}
          >
            Probar intro opcional
            <ArrowUpRight size={15} />
          </button>
          <label className={styles.check}>
            <input
              type="checkbox"
              checked={autoplay}
              onChange={(event) => {
                started.current = event.target.checked
                  ? performance.now()
                  : null;
                setElapsed(null);
                setAutoplay(event.target.checked);
                setStatus(
                  event.target.checked
                    ? "Construyendo el logotipo…"
                    : "Autoplay desactivado: logotipo estático.",
                );
              }}
            />
            Autoplay
          </label>
          <label className={styles.check}>
            <input
              type="checkbox"
              checked={reduced}
              onChange={(event) => {
                started.current = null;
                setElapsed(null);
                setReduced(event.target.checked);
              }}
            />
            Forzar movimiento reducido
          </label>
          <label className={styles.range}>
            Ancho solicitado: {size} px
            <input
              aria-label="Tamaño del logotipo"
              type="range"
              min="180"
              max="520"
              step="10"
              value={size}
              onChange={(event) => setSize(Number(event.target.value))}
            />
          </label>
          <button
            className={styles.mount}
            onClick={() => setMounted((value) => !value)}
          >
            {mounted ? "Desmontar componente" : "Montar componente"}
          </button>
          <div className={styles.status} role="status">
            <span>{status}</span>
            <span data-testid="completion-count">
              Finalizaciones: {completeCount}
            </span>
            {elapsed !== null && (
              <span data-testid="elapsed">Tiempo observado: {elapsed} ms</span>
            )}
          </div>
        </aside>
      </div>
      <div className={styles.details}>
        <div>
          <span className="eyebrow">UN MISMO VECTOR, CUALQUIER TAMAÑO.</span>
          <p>
            Se adapta al hero y a una presentación opcional sin reemplazar el
            logo por una imagen.
          </p>
        </div>
        <AnimatedJaiaxLogo size={100} autoplay={false} />
        <a href="/images/jaiax-logo.svg" download className="text-link">
          Descargar SVG editable <ArrowUpRight size={16} />
        </a>
      </div>
    </>
  );
}
