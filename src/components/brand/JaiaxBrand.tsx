"use client";
import { useId } from "react";
import { jaiaxLogo } from "@/data/jaiax-logo";

/** Horizontal lockup from the same editable paths as the animated identity. */
export function JaiaxBrand() {
  const id = `brand-${useId().replace(/[^a-z0-9_-]/gi, "")}`;
  const paths = (symbol: boolean) =>
    jaiaxLogo.paths
      .filter((glyph) => (glyph.group === "symbol") === symbol)
      .flatMap((glyph) =>
        glyph.d.map((d, i) => (
          <path
            key={`${glyph.id}-${i}`}
            d={d}
            strokeWidth={glyph.width}
            stroke={
              glyph.group === "jaiax" ? jaiaxLogo.wordColor : `url(#${id})`
            }
          />
        )),
      );
  return (
    <svg
      className="brand-vector"
      viewBox="0 0 220 52"
      width="190"
      height="45"
      role="img"
      aria-label="JAIAX Labs"
    >
      <title>JAIAX Labs</title>
      <defs>
        <linearGradient id={id}>
          <stop stopColor="#e2c28f" />
          <stop offset=".45" stopColor="#c6a16b" />
          <stop offset="1" stopColor="#a77c46" />
        </linearGradient>
      </defs>
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <svg x="0" y="5" width="75" height="41" viewBox="454 242 600 323">
          {paths(true)}
        </svg>
        <svg x="88" y="5" width="132" height="42" viewBox="400 613 733 180">
          {paths(false)}
        </svg>
      </g>
    </svg>
  );
}
