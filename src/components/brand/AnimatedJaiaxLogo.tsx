"use client";

import { createScope, createTimeline, svg } from "animejs";
import { useId, useLayoutEffect, useRef, type CSSProperties } from "react";
import { jaiaxLogo } from "@/data/jaiax-logo";
import styles from "./AnimatedJaiaxLogo.module.css";

export interface AnimatedJaiaxLogoProps {
  /** Width in CSS pixels, or a CSS length such as "min(70vw, 480px)". */
  size?: number | string;
  /** false renders the finished logo; switch to true or remount to play. */
  autoplay?: boolean;
  onComplete?: () => void;
  /** true forces the static version; the OS preference is always respected. */
  reducedMotion?: boolean;
  className?: string;
}

const strokes = jaiaxLogo.paths.flatMap((glyph, index) => {
  const start =
    glyph.group === "symbol"
      ? index * 90
      : glyph.group === "jaiax"
        ? 1380 + (index - 4) * 120
        : 2350 + (index - 9) * 110;
  const duration =
    glyph.group === "symbol"
      ? [1240, 1270, 1000, 850][index]
      : glyph.group === "jaiax"
        ? glyph.letter === "I"
          ? 280
          : 420
        : 320;
  return glyph.d.map((d, part) => ({
    key: `${glyph.id}-${part}`,
    d,
    group: glyph.group,
    width: glyph.width,
    start: start + part * 18,
    duration: duration - part * 18,
  }));
});

/** A centerline SVG reconstruction of the supplied PNG, animated with Anime.js v4. */
export function AnimatedJaiaxLogo({
  size = 320,
  autoplay = true,
  onComplete,
  reducedMotion = false,
  className = "",
}: AnimatedJaiaxLogoProps) {
  const root = useRef<SVGSVGElement>(null);
  const callback = useRef(onComplete);
  const playback = useRef({ signature: "", completed: false });
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const symbolId = `${id}-symbol`;
  const labsId = `${id}-labs`;
  const glowId = `${id}-glow`;

  useLayoutEffect(() => {
    callback.current = onComplete;
  }, [onComplete]);

  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;
    const signature = `${autoplay}:${reducedMotion}`;
    if (playback.current.signature !== signature)
      playback.current = { signature, completed: false };
    let active = true;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const paths = Array.from(
      element.querySelectorAll<SVGPathElement>("[data-logo-path]"),
    );
    const finish = () => {
      for (const path of paths) {
        path.removeAttribute("draw");
        path.removeAttribute("stroke-dasharray");
        path.removeAttribute("stroke-dashoffset");
        path.removeAttribute("pathLength");
        path.style.removeProperty("stroke-linecap");
      }
      element.dataset.state = autoplay ? "complete" : "idle";
      element.style.visibility = "visible";
      element
        .querySelectorAll<SVGPathElement>("[data-logo-tip]")
        .forEach((path) => {
          path.style.visibility = "hidden";
        });
      if (active && autoplay && !playback.current.completed) {
        playback.current.completed = true;
        callback.current?.();
      }
    };

    if (!autoplay || reducedMotion || media.matches) {
      finish();
      return () => {
        active = false;
      };
    }

    element.style.visibility = "hidden";
    element.dataset.state = "drawing";
    const scope = createScope({ root: element }).add(() => {
      const timeline = createTimeline({
        autoplay: false,
        defaults: { ease: "linear" },
        onComplete: finish,
      });
      strokes.forEach((stroke) => {
        const main = element.querySelector<SVGPathElement>(
          `[data-logo-stroke="${stroke.key}"]`,
        )!;
        const tip = element.querySelector<SVGPathElement>(
          `[data-logo-tip="${stroke.key}"]`,
        )!;
        // createDrawable mutates pathLength and caps: reset both on every playback.
        for (const path of [main, tip]) {
          path.removeAttribute("pathLength");
          path.style.removeProperty("stroke-linecap");
          path.style.removeProperty("visibility");
        }
        const [line] = svg.createDrawable(main);
        const [light] = svg.createDrawable(tip);
        line.setAttribute("draw", "0 0");
        light.setAttribute("draw", "0 0");
        timeline.add(
          line,
          { draw: ["0 0", "0 1"], duration: stroke.duration },
          stroke.start,
        );
        timeline.add(
          light,
          {
            draw: [
              { from: "0 0", to: "0 .035", duration: 40 },
              { to: ".965 1", duration: stroke.duration - 80 },
              { to: "1 1", duration: 40 },
            ],
          },
          stroke.start,
        );
      });
      element.style.visibility = "visible";
      timeline.play();
    });
    const preferenceChanged = () => {
      if (media.matches) {
        scope.revert();
        finish();
      }
    };
    media.addEventListener("change", preferenceChanged);
    return () => {
      active = false;
      media.removeEventListener("change", preferenceChanged);
      scope.revert();
      // React Strict Mode re-runs effects; do not leave Anime's proxy attributes behind.
      for (const path of paths) {
        for (const attribute of [
          "draw",
          "pathLength",
          "stroke-dasharray",
          "stroke-dashoffset",
        ])
          path.removeAttribute(attribute);
        path.style.removeProperty("stroke-linecap");
        path.style.removeProperty("visibility");
      }
    };
  }, [autoplay, reducedMotion]);

  const style: CSSProperties = {
    width: size,
    visibility: autoplay && !reducedMotion ? "hidden" : "visible",
  };
  return (
    <>
      <svg
        ref={root}
        className={`${styles.logo} jaiax-animated-logo ${className}`}
        style={style}
        width={jaiaxLogo.width}
        height={jaiaxLogo.height}
        viewBox={jaiaxLogo.viewBox}
        role="img"
        aria-label="JAIAX Labs"
        data-autoplay={autoplay}
        data-reduced-motion={reducedMotion}
        data-state={autoplay ? "pending" : "idle"}
      >
        <title>JAIAX Labs</title>
        <defs>
          <linearGradient
            id={symbolId}
            gradientUnits="userSpaceOnUse"
            x1="468"
            y1="0"
            x2="1035"
            y2="0"
          >
            {jaiaxLogo.symbolGradient.map(([offset, color]) => (
              <stop key={offset} offset={offset} stopColor={color} />
            ))}
          </linearGradient>
          <linearGradient
            id={labsId}
            gradientUnits="userSpaceOnUse"
            x1="587"
            y1="0"
            x2="945"
            y2="0"
          >
            {jaiaxLogo.labsGradient.map(([offset, color]) => (
              <stop key={offset} offset={offset} stopColor={color} />
            ))}
          </linearGradient>
          <filter
            id={glowId}
            x="-10%"
            y="-12%"
            width="120%"
            height="124%"
            colorInterpolationFilters="sRGB"
          >
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="1.5"
              floodColor="#c6a16b"
              floodOpacity="0.18"
            />
          </filter>
        </defs>
        <g
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#${glowId})`}
        >
          {strokes.map((stroke) => (
            <path
              key={stroke.key}
              data-logo-path
              data-logo-stroke={stroke.key}
              d={stroke.d}
              strokeWidth={stroke.width}
              stroke={
                stroke.group === "jaiax"
                  ? jaiaxLogo.wordColor
                  : `url(#${stroke.group === "symbol" ? symbolId : labsId})`
              }
            />
          ))}
          {strokes.map((stroke) => (
            <path
              key={`tip-${stroke.key}`}
              data-logo-path
              data-logo-tip={stroke.key}
              d={stroke.d}
              strokeWidth={stroke.width * 0.27}
              stroke="#fff0d5"
              opacity=".8"
              style={{ visibility: "hidden" }}
              aria-hidden="true"
            />
          ))}
        </g>
      </svg>
      <noscript>
        <style>{`.jaiax-animated-logo{visibility:visible!important}`}</style>
      </noscript>
    </>
  );
}

export default AnimatedJaiaxLogo;
