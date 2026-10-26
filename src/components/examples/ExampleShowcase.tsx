"use client";
import { useEffect, useId, useRef } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Monitor, Smartphone } from "lucide-react";
import { createScope, createTimeline } from "animejs";
import { examples } from "@/data/examples";
import { ExampleSite } from "./ExampleSite";
import styles from "./examples.module.css";

export function ExampleShowcase() {
  const root = useRef<HTMLElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const id = useId();
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const scenes = [
      ...element.querySelectorAll<HTMLElement>("[data-example-scene]"),
    ];
    let scope: ReturnType<typeof createScope> | undefined;
    let timeline: ReturnType<typeof createTimeline> | undefined;
    let frame = 0;
    let previous = -1;
    let selected = -1;
    const total = 2800;
    const render = () => {
      frame = 0;
      if (!timeline) return;
      const top = element.getBoundingClientRect().top;
      const distance = Math.max(1, element.offsetHeight - innerHeight + 80);
      const value = Math.max(0, Math.min(1, (80 - top) / distance));
      if (Math.abs(value - previous) < 0.0001) return;
      previous = value;
      timeline.seek(value * total, true);
      const ease = (x: number) => {
        const t = Math.max(0, Math.min(1, x));
        return t * t * (3 - 2 * t);
      };
      scenes.forEach((scene, index) => {
        const local = value * total - index * 900;
        const enter = ease(local / 200);
        const exit =
          index === scenes.length - 1 ? 1 : 1 - ease((local - 820) / 200);
        scene.style.opacity = String(enter * exit);
      });
      element.dataset.scrollProgress = value.toFixed(3);
      if (progress.current)
        progress.current.style.transform = `scaleX(${value})`;
      const next = Math.min(
        examples.length - 1,
        Math.max(0, Math.floor((value * total - 50) / 900)),
      );
      if (next !== selected) {
        selected = next;
        scenes.forEach((scene, index) => {
          scene.inert = index !== next;
          scene.setAttribute("aria-hidden", String(index !== next));
          scene.dataset.active = String(index === next);
        });
        element
          .querySelectorAll("[data-example-index]")
          .forEach((link, index) => {
            if (index === next) link.setAttribute("aria-current", "true");
            else link.removeAttribute("aria-current");
          });
      }
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    const configure = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      timeline = undefined;
      scope?.revert();
      delete element.dataset.scrollShowcase;
      scenes.forEach((scene) => {
        scene.style.removeProperty("opacity");
        scene.inert = false;
        scene.removeAttribute("aria-hidden");
        delete scene.dataset.active;
      });
      element
        .querySelectorAll("[data-example-index]")
        .forEach((link) => link.removeAttribute("aria-current"));
      if (media.matches || innerHeight < 560) return;
      const amplitude = innerWidth < 700 ? 0.5 : 1;
      element.dataset.scrollShowcase = "true";
      scope = createScope({ root: element }).add(() => {
        timeline = createTimeline({
          autoplay: false,
          defaults: { ease: "inOut(2)" },
        });
        scenes.forEach((scene, index) => {
          const at = index * 900;
          const laptop = scene.querySelector<HTMLElement>(
            "[data-device=laptop]",
          )!;
          const lid = scene.querySelector<HTMLElement>("[data-device=lid]")!;
          const left = scene.querySelector<HTMLElement>("[data-device=left]")!;
          const right = scene.querySelector<HTMLElement>(
            "[data-device=right]",
          )!;
          timeline!.add(
            laptop,
            {
              x: [110 * amplitude, 0],
              y: [90 * amplitude, 0],
              z: [-400 * amplitude, 0],
              rotateX: [48, 0],
              rotateY: [-24, 0],
              scale: [0.74, 1],
              duration: 300,
              ease: "out(3)",
            },
            at,
          );
          timeline!.add(
            lid,
            { rotateX: [-42, 0], duration: 380, ease: "out(3)" },
            at,
          );
          timeline!.add(
            left,
            {
              x: [-170 * amplitude, 0],
              y: [110 * amplitude, 0],
              z: [180 * amplitude, 38],
              rotateY: [45, -10],
              rotateZ: [-24, -4],
              scale: [0.8, 1],
              duration: 360,
              ease: "out(3)",
            },
            at + 45,
          );
          timeline!.add(
            right,
            {
              x: [180 * amplitude, 0],
              y: [-80 * amplitude, 0],
              z: [250 * amplitude, 65],
              rotateY: [-45, 10],
              rotateZ: [23, 4],
              scale: [0.8, 1],
              duration: 380,
              ease: "out(3)",
            },
            at + 90,
          );
          timeline!.add(
            laptop,
            {
              rotateY: [0, 5],
              rotateX: [0, -3],
              duration: 430,
              ease: "linear",
            },
            at + 340,
          );
          timeline!.add(
            left,
            {
              y: [0, -14 * amplitude],
              rotateY: [-10, 0],
              duration: 380,
              ease: "linear",
            },
            at + 410,
          );
          timeline!.add(
            right,
            {
              y: [0, 13 * amplitude],
              rotateY: [10, 0],
              duration: 380,
              ease: "linear",
            },
            at + 470,
          );
          if (index < scenes.length - 1) {
            timeline!.add(
              laptop,
              {
                x: -100 * amplitude,
                z: -260 * amplitude,
                rotateY: -20,
                scale: 0.86,
                duration: 250,
              },
              at + 790,
            );
            timeline!.add(
              left,
              { x: -120 * amplitude, rotateY: -35, duration: 220 },
              at + 810,
            );
            timeline!.add(
              right,
              { x: 130 * amplitude, rotateY: 35, duration: 220 },
              at + 810,
            );
          }
        });
        timeline.add({ duration: 1 }, total);
      });
      previous = -1;
      selected = -1;
      render();
    };
    configure();
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", configure);
    media.addEventListener("change", configure);
    return () => {
      cancelAnimationFrame(frame);
      scope?.revert();
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", configure);
      media.removeEventListener("change", configure);
    };
  }, []);
  return (
    <section
      ref={root}
      id="ejemplos"
      className={styles.showcase}
      aria-labelledby={`${id}-title`}
    >
      <div className={`${styles.scrollFrame} container`}>
        <div className={styles.heading}>
          <div>
            <span className="eyebrow">
              <span className="tiny-line" />
              DISEÑOS PARA IMAGINAR TU WEB
            </span>
            <h2 id={`${id}-title`}>
              Tu próxima página.
              <br />
              <span>En otra dimensión.</span>
            </h2>
          </div>
          <p>
            Una idea. Todas las pantallas.
            <br />
            <span className={styles.scrollHint}>
              Desliza para explorar <ArrowDown size={14} />
            </span>
          </p>
        </div>
        <div className={styles.sceneStack}>
          {examples.map((example, index) => (
            <article
              className={styles.scene}
              data-example-scene
              key={example.slug}
              aria-label={`${example.name}: ${example.category}`}
            >
              <div className={styles.stage} aria-hidden="true" inert>
                <div
                  className={`${styles.phone} ${styles.phoneLeft}`}
                  data-device="left"
                >
                  <div className={styles.phoneScreen}>
                    <ExampleSite example={example} preview mobile />
                  </div>
                </div>
                <div className={styles.laptop} data-device="laptop">
                  <div className={styles.laptopLid} data-device="lid">
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
                  data-device="right"
                >
                  <div className={styles.phoneScreen}>
                    <ExampleSite
                      example={examples[(index + 1) % examples.length]}
                      preview
                      mobile
                    />
                  </div>
                </div>
              </div>
              <div className={styles.caption}>
                <div className={styles.exampleInfo}>
                  <span className={styles.count}>
                    0{index + 1} / 0{examples.length}
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
            </article>
          ))}
        </div>
        <div className={styles.scrollProgress} aria-hidden="true">
          <span ref={progress} />
        </div>
        <div className={styles.bottom}>
          <span>
            <Monitor size={14} />
            <Smartphone size={13} /> Conceptos de estudio
          </span>
          <nav
            className={styles.chapterLinks}
            aria-label="Abrir demos de los proyectos"
          >
            {examples.map((example, index) => (
              <Link
                key={example.slug}
                href={`/ejemplos/${example.slug}`}
                data-example-index
              >
                <span>0{index + 1}</span> {example.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
