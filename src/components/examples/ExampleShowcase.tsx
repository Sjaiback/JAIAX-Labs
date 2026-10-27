"use client";

import { useEffect, useId, useRef } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Monitor, Smartphone } from "lucide-react";
import { examples } from "@/data/examples";
import { ExampleSite } from "./ExampleSite";
import styles from "./examples.module.css";

const featured = examples[0];

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const smooth = (value: number) => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};

export function ExampleShowcase() {
  const root = useRef<HTMLElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const id = useId();

  useEffect(() => {
    const element = root.current;
    if (!element) return;

    const phone = element.querySelector<HTMLElement>("[data-journey-phone]");
    const phonePage = element.querySelector<HTMLElement>("[data-journey-page]");
    const laptop = element.querySelector<HTMLElement>("[data-journey-laptop]");
    const lid = element.querySelector<HTMLElement>("[data-journey-lid]");
    const mobileStep = element.querySelector<HTMLElement>("[data-step=mobile]");
    const morphStep = element.querySelector<HTMLElement>("[data-step=morph]");
    const desktopStep = element.querySelector<HTMLElement>("[data-step=desktop]");
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    if (!phone || !phonePage || !laptop || !lid) return;

    let frame = 0;
    let enabled = false;

    const clearInlineStyles = () => {
      [phone, phonePage, laptop, lid, mobileStep, morphStep, desktopStep].forEach(
        (node) => node?.removeAttribute("style"),
      );
      progress.current?.removeAttribute("style");
    };

    const render = () => {
      frame = 0;
      if (!enabled) return;

      const top = element.getBoundingClientRect().top;
      const distance = Math.max(1, element.offsetHeight - innerHeight + 80);
      const value = clamp((80 - top) / distance);

      const entrance = smooth(value / 0.1);
      const screenScroll = smooth((value - 0.1) / 0.34);
      const morph = smooth((value - 0.5) / 0.22);
      const settle = smooth((value - 0.72) / 0.18);

      phone.style.opacity = String(1 - smooth((value - 0.58) / 0.14));
      phone.style.transform = `translate(-50%, -50%) scale(${0.82 + entrance * 0.18 + morph * 0.55}) rotateY(${-morph * 8}deg)`;
      phonePage.style.transform = `translateY(${-37.5 * screenScroll}%)`;

      laptop.style.opacity = String(morph);
      laptop.style.transform = `translate(-50%, -50%) scale(${0.58 + morph * 0.42 + settle * 0.025}) rotateX(${(1 - morph) * 22 - settle * 2}deg)`;
      lid.style.transform = `rotateX(${(1 - morph) * -34}deg)`;

      if (mobileStep) mobileStep.style.opacity = String(1 - smooth((value - 0.43) / 0.1));
      if (morphStep)
        morphStep.style.opacity = String(
          smooth((value - 0.43) / 0.1) * (1 - smooth((value - 0.7) / 0.1)),
        );
      if (desktopStep) desktopStep.style.opacity = String(smooth((value - 0.7) / 0.1));
      if (progress.current) progress.current.style.transform = `scaleX(${value})`;

      element.dataset.phase = value < 0.48 ? "mobile" : value < 0.72 ? "morph" : "desktop";
    };

    const requestRender = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    const configure = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      enabled = !media.matches && innerWidth >= 768 && innerHeight >= 620;
      clearInlineStyles();
      if (enabled) {
        element.dataset.journeyActive = "true";
        render();
      } else {
        delete element.dataset.journeyActive;
        delete element.dataset.phase;
      }
    };

    configure();
    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", configure);
    media.addEventListener("change", configure);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestRender);
      window.removeEventListener("resize", configure);
      media.removeEventListener("change", configure);
    };
  }, []);

  return (
    <section
      ref={root}
      id="ejemplos"
      className={`${styles.showcase} ${styles.journey}`}
      aria-labelledby={`${id}-title`}
    >
      <div className={`${styles.scrollFrame} container`}>
        <div className={styles.heading}>
          <div>
            <span className="eyebrow">
              <span className="tiny-line" />
              UNA WEB, TODAS TUS PANTALLAS
            </span>
            <h2 id={`${id}-title`}>
              Primero, en tu mano.
              <br />
              <span>Después, en grande.</span>
            </h2>
          </div>
          <p>
            Recorre la experiencia.
            <br />
            <span className={styles.scrollHint}>
              Desliza para transformarla <ArrowDown size={14} />
            </span>
          </p>
        </div>

        <div className={styles.journeyStage} aria-hidden="true">
          <div className={styles.journeyGrid} />

          <div className={styles.phoneHero} data-journey-phone>
            <span className={styles.phoneNotch} />
            <div className={styles.phoneViewport}>
              <div className={styles.phonePage} data-journey-page>
                <div className={styles.phonePanel}>
                  <ExampleSite example={featured} preview mobile />
                </div>
                <div className={`${styles.phonePanel} ${styles.phonePanelDetail}`}>
                  <ExampleSite example={featured} preview />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.laptopHero} data-journey-laptop>
            <div className={styles.laptopHeroLid} data-journey-lid>
              <span className={styles.camera} />
              <div className={styles.desktopScreen}>
                <ExampleSite example={featured} preview />
              </div>
            </div>
            <div className={styles.laptopHeroBase}>
              <span />
            </div>
          </div>

          <div className={styles.phaseLabel}>
            <span data-step="mobile">01 · RECORRE LA VISTA MÓVIL</span>
            <span data-step="morph">02 · CAMBIA DE DIMENSIÓN</span>
            <span data-step="desktop">03 · CONTINÚA EN ESCRITORIO</span>
          </div>
        </div>

        <div className={styles.caption}>
          <div className={styles.exampleInfo}>
            <span className={styles.count}>PULSO / RESPONSIVE</span>
            <div>
              <h3>
                La misma experiencia.
                <span> / Sin perder contexto</span>
              </h3>
              <p>
                El contenido se adapta al dispositivo, pero la intención se mantiene.
              </p>
            </div>
          </div>
          <Link className="button button-gold" href="/ejemplos/control-logistico">
            Explorar demo <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className={styles.scrollProgress} aria-hidden="true">
          <span ref={progress} />
        </div>

        <div className={styles.bottom}>
          <span>
            <Monitor size={14} />
            <Smartphone size={13} /> Diseño responsive
          </span>
          <nav className={styles.chapterLinks} aria-label="Abrir demos de los proyectos">
            {examples.map((example, index) => (
              <Link key={example.slug} href={`/ejemplos/${example.slug}`}>
                <span>0{index + 1}</span> {example.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
