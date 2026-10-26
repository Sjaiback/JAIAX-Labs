"use client";
import { useLayoutEffect, useRef, type ReactNode } from "react";
import { createScope, createTimeline, svg, stagger } from "animejs";
import { heroFontMetrics, heroGlyphs } from "@/data/hero-glyphs";
import "./hero-entrance.css";

const ns = "http://www.w3.org/2000/svg";
function path(d: string, color: string, width: number) {
  const element = document.createElementNS(ns, "path");
  element.setAttribute("d", d);
  element.setAttribute("fill", "none");
  element.setAttribute("stroke", color);
  element.setAttribute("stroke-width", String(width));
  element.setAttribute("stroke-linejoin", "round");
  return element;
}

/** One timeline constructs the hero, leaving semantic HTML intact underneath. */
export function HeroEntrance({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let active = true;
    let startedAt = 0;
    let scope: ReturnType<typeof createScope> | undefined;
    let overlay: SVGSVGElement | undefined;
    const finish = () => {
      if (startedAt)
        element.dataset.heroElapsed = String(
          Math.round(performance.now() - startedAt),
        );
      element.dataset.heroState = "complete";
      overlay?.remove();
      element
        .querySelectorAll<HTMLElement>(
          "[data-hero-copy],.hero-actions .button,.orb,.orb-glow",
        )
        .forEach((node) => {
          for (const property of ["opacity", "color", "background-color"])
            node.style.removeProperty(property);
        });
      element.querySelectorAll("[data-hero-drawn]").forEach((p) => {
        for (const attribute of [
          "draw",
          "pathLength",
          "stroke-dasharray",
          "stroke-dashoffset",
        ])
          p.removeAttribute(attribute);
        p.removeAttribute("data-hero-drawn");
      });
    };
    const stop = () => {
      scope?.revert();
      finish();
    };
    const preference = () => {
      if (media.matches) stop();
    };
    element.addEventListener("focusin", stop);
    window.addEventListener("resize", stop, { once: true });
    media.addEventListener("change", preference);
    if (media.matches) finish();
    else
      document.fonts.ready.then(() => {
        if (!active || element.dataset.heroState === "complete") return;
        try {
          const bounds = element.getBoundingClientRect();
          overlay = document.createElementNS(ns, "svg");
          overlay.setAttribute(
            "viewBox",
            `0 0 ${bounds.width} ${bounds.height}`,
          );
          overlay.setAttribute("aria-hidden", "true");
          overlay.classList.add("hero-drawing-layer");
          element.append(overlay);
          const letters: { node: SVGPathElement; start: number }[] = [];
          let ordinal = 0;
          element
            .querySelectorAll<HTMLElement>("[data-hero-ink]")
            .forEach((line, lineIndex) => {
              const text = line.firstChild;
              if (!text || text.nodeType !== Node.TEXT_NODE) return;
              const style = getComputedStyle(line);
              const size = parseFloat(style.fontSize);
              const scale = size / heroFontMetrics.unitsPerEm;
              const color = style.getPropertyValue("--hero-ink").trim();
              [...(text.textContent || "")].forEach((char, i) => {
                const d = heroGlyphs[char];
                if (!d) return;
                const range = document.createRange();
                range.setStart(text, i);
                range.setEnd(text, i + 1);
                const r = range.getBoundingClientRect();
                const glyph = path(d, color, 0.75 / scale);
                glyph.setAttribute("fill", color);
                glyph.setAttribute("fill-opacity", "0");
                glyph.setAttribute(
                  "transform",
                  `translate(${r.left - bounds.left} ${r.top - bounds.top + heroFontMetrics.ascent * scale}) scale(${scale} ${-scale})`,
                );
                overlay!.append(glyph);
                letters.push({
                  node: glyph,
                  start: 450 + lineIndex * 220 + ordinal++ * 22,
                });
              });
            });
          const orb = element.querySelector<HTMLElement>(".orb")!;
          element.dataset.heroGlyphs = String(letters.length);
          const globe = orb.getBoundingClientRect();
          const radius = globe.width / 2;
          const cx = globe.left - bounds.left + radius;
          const cy = globe.top - bounds.top + radius;
          const horizon = path(
            `M${cx - radius} ${cy} A${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`,
            "#e2c28f",
            1.1,
          );
          overlay.append(horizon);
          const buttons: SVGPathElement[] = [];
          element
            .querySelectorAll<HTMLElement>(".hero-actions .button")
            .forEach((button) => {
              const r = button.getBoundingClientRect();
              const x = r.left - bounds.left,
                y = r.top - bounds.top;
              const border = path(
                `M${x} ${y + r.height}V${y}H${x + r.width}V${y + r.height}Z`,
                "#c6a16b",
                1,
              );
              overlay!.append(border);
              buttons.push(border);
            });
          scope = createScope({ root: element }).add(() => {
            const timeline = createTimeline({
              autoplay: false,
              defaults: { ease: "linear" },
              onComplete: finish,
            });
            const draw = (
              node: SVGElement,
              start: number,
              duration: number,
            ) => {
              node.setAttribute("data-hero-drawn", "");
              const [drawable] = svg.createDrawable(node);
              drawable.setAttribute("draw", "0 0");
              timeline.add(drawable, { draw: ["0 0", "0 1"], duration }, start);
            };
            element
              .querySelectorAll(".orbit-lines ellipse")
              .forEach((line, i) => draw(line as SVGElement, i * 100, 1700));
            draw(horizon, 100, 2100);
            letters.forEach(({ node, start }) => {
              draw(node, start, 900);
              timeline.add(
                node,
                { fillOpacity: [0, 1], duration: 440 },
                start + 650,
              );
            });
            buttons.forEach((node, i) => draw(node, 2050 + i * 120, 650));
            timeline.add(
              "[data-hero-copy]",
              { opacity: [0, 1], duration: 380, delay: stagger(95) },
              1900,
            );
            timeline.add(
              ".hero-actions .button",
              {
                color: ["rgba(240,232,219,0)", "#f0e8db"],
                duration: 300,
                delay: stagger(100),
              },
              2600,
            );
            timeline.add(
              ".hero-actions .button-gold",
              {
                backgroundColor: ["rgba(198,161,107,0)", "#c6a16b"],
                color: ["rgba(19,16,12,0)", "#13100c"],
                duration: 350,
              },
              2750,
            );
            timeline.add(orb, { opacity: [0, 1], duration: 1200 }, 1100);
            timeline.add(".orb-glow", { opacity: [0, 1], duration: 700 }, 2100);
            // Hold the fully inked title briefly before handing over to native text.
            timeline.add({ duration: 1 }, 3300);
            element.dataset.heroState = "drawing";
            startedAt = performance.now();
            timeline.play();
          });
        } catch {
          // A layout/font failure must never hide the page or block its links.
          stop();
        }
      });
    return () => {
      active = false;
      element.removeEventListener("focusin", stop);
      window.removeEventListener("resize", stop);
      media.removeEventListener("change", preference);
      scope?.revert();
      overlay?.remove();
    };
  }, []);
  return (
    <section ref={root} id="inicio" className="hero" data-hero-state="pending">
      {children}
      <noscript>
        <style>{`.hero [data-hero-ink]{color:var(--hero-ink)!important}.hero [data-hero-copy],.hero .orb,.hero .orb-glow{opacity:1!important}.hero .hero-actions .button{color:#f0e8db!important;border-color:#c6a16b!important}.hero .hero-actions .button-gold{background:#c6a16b!important;color:#13100c!important}`}</style>
      </noscript>
    </section>
  );
}
