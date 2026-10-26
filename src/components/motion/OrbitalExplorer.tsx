"use client";
import { animate, createScope, onScroll, svg, stagger } from "animejs";
import { useEffect, useId, useRef } from "react";

export function OrbitalExplorer() {
  const root = useRef<HTMLDivElement>(null);
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
    const element = root.current;
    if (!element) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0;
    let x = 0,
      y = 0;
    let visible = false;
    const playback = () => {
      element.dataset.orbitActive = String(
        visible && !document.hidden && !reduce.matches,
      );
    };
    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      element.style.setProperty("--orbit-x", "0");
      element.style.setProperty("--orbit-y", "0");
      playback();
    };
    const move = (event: PointerEvent) => {
      if (reduce.matches || !fine.matches || event.pointerType === "touch")
        return;
      const box = element.getBoundingClientRect();
      x = Math.max(
        -1,
        Math.min(1, ((event.clientX - box.left) / box.width) * 2 - 1),
      );
      y = Math.max(
        -1,
        Math.min(1, ((event.clientY - box.top) / box.height) * 2 - 1),
      );
      if (!frame)
        frame = requestAnimationFrame(() => {
          element.style.setProperty("--orbit-x", String(x));
          element.style.setProperty("--orbit-y", String(y));
          frame = 0;
        });
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      playback();
    });
    observer.observe(element);
    element.addEventListener("pointermove", move, { passive: true });
    element.addEventListener("pointerleave", reset);
    document.addEventListener("visibilitychange", playback);
    reduce.addEventListener("change", reset);
    fine.addEventListener("change", reset);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", reset);
      document.removeEventListener("visibilitychange", playback);
      reduce.removeEventListener("change", reset);
      fine.removeEventListener("change", reset);
    };
  }, []);
  return (
    <div ref={root} className="orbital-explorer" data-orbit-active="false">
      <span className="orbit-kicker">EL LABORATORIO / INTERACTIVO</span>
      <svg
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
    </div>
  );
}
