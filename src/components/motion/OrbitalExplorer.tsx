"use client";
import { useEffect, useId, useRef } from "react";

export function OrbitalExplorer({ label = "EL LABORATORIO / INTERACTIVO" }: { label?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const id = useId().replace(/[^a-z0-9_-]/gi, "");
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let active = true,
      loading = false;
    let dispose: (() => void) | undefined;
    // Keep Three.js out of the initial hero bundle and reserve the layout in SVG.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || loading) return;
        loading = true;
        observer.disconnect();
        import("./OrbitalSphere")
          .then(({ mountOrbitalSphere }) => {
            if (active) dispose = mountOrbitalSphere(element);
          })
          .catch(() => {
            // The editable SVG remains available if WebGL or module loading fails.
            const root = element.closest<HTMLElement>(".orbital-explorer");
            if (active && root) root.dataset.orbitRenderer = "svg";
          });
      },
      { rootMargin: "250px" },
    );
    observer.observe(element);
    return () => {
      active = false;
      observer.disconnect();
      dispose?.();
    };
  }, []);
  return (
    <div
      className="orbital-explorer"
      data-orbit-renderer="svg"
      data-orbit-active="false"
    >
      <span className="orbit-kicker">{label}</span>
      <div className="orbital-viewport">
        <svg
          viewBox="0 0 500 390"
          className="orbit-instrument orbit-fallback"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id={`${id}-halo`}>
              <stop stopColor="#c6a16b" stopOpacity=".12" />
              <stop offset="1" stopColor="#c6a16b" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="250" cy="195" r="185" fill={`url(#${id}-halo)`} />
          <g fill="none" stroke="#c6a16b" strokeWidth=".75">
            <circle cx="250" cy="195" r="143" opacity=".4" />
            {Array.from({ length: 10 }, (_, index) => (
              <ellipse
                key={index}
                cx="250"
                cy="195"
                rx="143"
                ry={25 + (index % 5) * 23}
                transform={`rotate(${index * 29} 250 195)`}
                opacity={0.2 + (index % 3) * 0.1}
              />
            ))}
          </g>
          <g stroke="#c6a16b" strokeWidth="3">
            {[0, 45, 90, 135].map((angle) => (
              <path
                key={angle}
                d="M250 151V239"
                transform={`rotate(${angle} 250 195)`}
              />
            ))}
          </g>
          <circle cx="250" cy="195" r="8" fill="#e2c28f" />
        </svg>
        <div ref={host} className="orbital-canvas" aria-hidden="true" />
      </div>
    </div>
  );
}
