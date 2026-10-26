"use client";
import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Monitor,
  Smartphone,
} from "lucide-react";
import { animate, createScope, stagger } from "animejs";
import { examples } from "@/data/examples";
import { ExampleSite } from "./ExampleSite";
import styles from "./examples.module.css";

export function ExampleShowcase() {
  const [selected, setSelected] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const id = useId();
  const example = examples[selected];
  const neighbor = examples[(selected + 1) % examples.length];
  useEffect(() => {
    if (!root.current) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    const scope = createScope({ root: root.current }).add(() => {
      animate("[data-example-device]", {
        opacity: [0.5, 1],
        y: [18, 0],
        duration: 650,
        delay: stagger(70),
        ease: "out(3)",
      });
    });
    const change = () => {
      if (media.matches) scope.revert();
    };
    media.addEventListener("change", change);
    return () => {
      media.removeEventListener("change", change);
      scope.revert();
    };
  }, [selected]);
  const choose = (index: number, focus = false) => {
    const next = (index + examples.length) % examples.length;
    setSelected(next);
    if (focus)
      root.current
        ?.querySelector<HTMLButtonElement>(`[data-example-tab="${next}"]`)
        ?.focus();
  };
  return (
    <section
      id="ejemplos"
      className={styles.showcase}
      aria-labelledby={`${id}-title`}
    >
      <div className="container" ref={root}>
        <div className={styles.heading}>
          <div>
            <span className="eyebrow">
              <span className="tiny-line" />
              DISEÑOS PARA IMAGINAR TU WEB
            </span>
            <h2 id={`${id}-title`}>
              Tu próxima página.
              <br />
              <span>Ya puedes imaginarla.</span>
            </h2>
          </div>
          <p>
            Explora distintas formas de presentar un negocio. El mismo diseño,
            pensado para sentirse bien en cada pantalla.
          </p>
        </div>
        <div
          className={styles.selector}
          role="tablist"
          aria-label="Elegir página de ejemplo"
        >
          {examples.map((item, i) => (
            <button
              key={item.slug}
              data-example-tab={i}
              type="button"
              role="tab"
              id={`${id}-tab-${i}`}
              aria-controls={`${id}-panel`}
              aria-selected={selected === i}
              tabIndex={selected === i ? 0 : -1}
              onClick={() => choose(i)}
              onKeyDown={(e) => {
                if (
                  ["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)
                ) {
                  e.preventDefault();
                  choose(
                    e.key === "Home"
                      ? 0
                      : e.key === "End"
                        ? examples.length - 1
                        : selected + (e.key === "ArrowRight" ? 1 : -1),
                    true,
                  );
                }
              }}
            >
              <span>0{i + 1}</span>
              {item.category}
            </button>
          ))}
        </div>
        <div
          role="tabpanel"
          id={`${id}-panel`}
          aria-labelledby={`${id}-tab-${selected}`}
          tabIndex={0}
          className={styles.panel}
        >
          <div className={styles.stage} aria-hidden="true" inert>
            <div
              className={`${styles.phone} ${styles.phoneLeft}`}
              data-example-device
            >
              <div className={styles.phoneScreen}>
                <ExampleSite example={neighbor} preview mobile />
              </div>
            </div>
            <div className={styles.laptop} data-example-device>
              <div className={styles.laptopLid}>
                <div className={styles.camera} />
                <div className={styles.desktopScreen}>
                  <ExampleSite example={example} preview />
                </div>
              </div>
              <div className={styles.laptopBase}>
                <span />
              </div>
            </div>
            <div
              className={`${styles.phone} ${styles.phoneRight}`}
              data-example-device
            >
              <div className={styles.phoneScreen}>
                <ExampleSite example={example} preview mobile />
              </div>
            </div>
          </div>
          <div className={styles.caption}>
            <div className={styles.exampleInfo}>
              <span className={styles.count}>
                0{selected + 1} / 0{examples.length}
              </span>
              <div>
                <h3>
                  {example.name}
                  <span> / {example.category}</span>
                </h3>
                <p>{example.detail}</p>
              </div>
            </div>
            <Link
              className="button button-gold"
              href={`/ejemplos/${example.slug}`}
            >
              Explorar demo <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
        <div className={styles.bottom}>
          <span>
            <Monitor size={14} />
            <Smartphone size={13} /> Diseño responsive · Conceptos de estudio
          </span>
          <div>
            <button
              type="button"
              aria-label="Ejemplo anterior"
              onClick={() => choose(selected - 1)}
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Siguiente ejemplo"
              onClick={() => choose(selected + 1)}
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
