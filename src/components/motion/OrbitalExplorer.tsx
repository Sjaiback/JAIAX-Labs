"use client";
import { animate, createScope, onScroll, svg, stagger } from "animejs";
import { useEffect, useId, useRef, useState } from "react";

const modes = [
  {
    name: "Estrategia",
    number: "01",
    text: "Primero, el porqué. Alineamos cada decisión con un objetivo de tu negocio.",
    angle: -24,
  },
  {
    name: "Diseño",
    number: "02",
    text: "Damos forma a lo complejo. Una experiencia clara, con intención en cada detalle.",
    angle: 0,
  },
  {
    name: "Código",
    number: "03",
    text: "Conectamos las piezas. Construimos una base que puede seguir evolucionando.",
    angle: 24,
  },
];
export function OrbitalExplorer() {
  const root = useRef<HTMLDivElement>(null);
  const drawing = useRef<SVGSVGElement>(null);
  const [mode, setMode] = useState(0);
  const id = useId().replace(/[^a-z0-9_-]/gi, "");
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;
    const scope = createScope({ root: element }).add(() => {
      animate(
        svg.createDrawable(element.querySelectorAll("[data-orbit-line]")),
        {
          draw: ["0 0", "0 1"],
          duration: 1600,
          delay: stagger(100),
          ease: "inOut(3)",
          autoplay: onScroll({
            target: element,
            enter: "bottom top",
            repeat: false,
          }),
        },
      );
    });
    const changed = () => {
      if (reduce.matches) {
        scope.revert();
        element.querySelectorAll("[data-orbit-line]").forEach((p) => {
          for (const a of [
            "draw",
            "pathLength",
            "stroke-dasharray",
            "stroke-dashoffset",
          ])
            p.removeAttribute(a);
        });
      }
    };
    reduce.addEventListener("change", changed);
    return () => {
      reduce.removeEventListener("change", changed);
      scope.revert();
    };
  }, []);
  useEffect(() => {
    if (
      !drawing.current ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const scope = createScope({ root: drawing.current }).add(() => {
      animate("[data-orbit-system]", {
        rotate: modes[mode].angle,
        duration: 850,
        ease: "out(4)",
      });
      animate("[data-orbit-core]", {
        scale: [0.85, 1],
        rotate: mode * 45,
        duration: 850,
        ease: "out(4)",
      });
    });
    return () => scope.revert();
  }, [mode]);
  return (
    <div ref={root} className="orbital-explorer">
      <span className="orbit-kicker">EL LABORATORIO / INTERACTIVO</span>
      <svg
        ref={drawing}
        viewBox="0 0 500 390"
        className="orbit-instrument"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={`${id}-halo`}>
            <stop stopColor="#c6a16b" stopOpacity=".14" />
            <stop offset="1" stopColor="#c6a16b" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="250" cy="190" r="185" fill={`url(#${id}-halo)`} />
        <g
          data-orbit-system
          style={{ transformOrigin: "250px 190px" }}
          fill="none"
          stroke="#c6a16b"
          strokeWidth=".75"
        >
          <circle data-orbit-line cx="250" cy="190" r="143" opacity=".55" />
          <ellipse
            data-orbit-line
            cx="250"
            cy="190"
            rx="143"
            ry="58"
            opacity=".7"
          />
          <ellipse
            data-orbit-line
            cx="250"
            cy="190"
            rx="66"
            ry="152"
            transform="rotate(14 250 190)"
            opacity=".45"
          />
          <path data-orbit-line d="M35 310 465 70" opacity=".3" />
          <circle cx="250" cy="47" r="4" fill="#e2c28f" stroke="none" />
          <circle cx="393" cy="190" r="3" fill="#c6a16b" stroke="none" />
        </g>
        <g
          data-orbit-core
          stroke="#c6a16b"
          strokeWidth="3"
          style={{ transformOrigin: "250px 190px" }}
        >
          {[0, 45, 90, 135].map((a) => (
            <path key={a} d="M250 146V234" transform={`rotate(${a} 250 190)`} />
          ))}
        </g>
        <circle cx="250" cy="190" r="8" fill="#e2c28f" />
      </svg>
      <div
        className="orbit-tabs"
        role="tablist"
        aria-label="Explorar nuestro enfoque"
      >
        {modes.map((m, i) => (
          <button
            id={`${id}-tab-${i}`}
            key={m.name}
            role="tab"
            aria-selected={mode === i}
            aria-controls={`${id}-panel`}
            tabIndex={mode === i ? 0 : -1}
            onClick={() => setMode(i)}
            onKeyDown={(e) => {
              let next = mode;
              if (e.key === "ArrowRight") next = (mode + 1) % 3;
              else if (e.key === "ArrowLeft") next = (mode + 2) % 3;
              else if (e.key === "Home") next = 0;
              else if (e.key === "End") next = 2;
              else return;
              e.preventDefault();
              setMode(next);
              document.getElementById(`${id}-tab-${next}`)?.focus();
            }}
          >
            <span>{m.number}</span>
            {m.name}
          </button>
        ))}
      </div>
      <p
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${mode}`}
        tabIndex={0}
        className="orbit-caption"
      >
        {modes[mode].text}
      </p>
    </div>
  );
}
