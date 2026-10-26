"use client";
import { useId } from "react";
export function JournalArt({
  variant,
}: {
  variant: "web" | "automation" | "seo";
}) {
  const id = useId().replace(/[^a-z0-9_-]/gi, "");
  return (
    <svg
      className={`journal-art art-${variant}`}
      viewBox="0 0 800 480"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={id}>
          <stop stopColor="#c6a16b" stopOpacity=".16" />
          <stop offset="1" stopColor="#c6a16b" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="480" fill="#0a0a09" />
      <circle cx="400" cy="240" r="300" fill={`url(#${id})`} />
      <g stroke="#c6a16b" strokeWidth="1">
        {variant === "web" ? (
          <>
            <g className="art-drift">
              <rect
                x="193"
                y="90"
                width="420"
                height="285"
                rx="5"
                strokeOpacity=".6"
              />
              <path d="M193 125H613" strokeOpacity=".35" />
              <circle cx="212" cy="108" r="2" />
              <circle cx="224" cy="108" r="2" />
              <circle cx="236" cy="108" r="2" />
              <path
                d="M230 166H376M230 188H435M230 210H340M230 254H316V280H230Z"
                strokeOpacity=".7"
              />
              <rect
                x="465"
                y="157"
                width="112"
                height="150"
                strokeOpacity=".25"
              />
              <circle cx="521" cy="220" r="35" />
              <path
                d="M230 332H575M357 332V356M473 332V356"
                strokeOpacity=".3"
              />
            </g>
            <path d="M115 399H685" strokeOpacity=".15" />
            <circle cx="646" cy="143" r="44" strokeOpacity=".16" />
          </>
        ) : variant === "automation" ? (
          <>
            <path d="M160 240H302M350 240H450M498 240H640" strokeOpacity=".4" />
            <path
              d="M326 216V130H475V216M326 264V350H475V264"
              strokeDasharray="4 7"
              strokeOpacity=".3"
            />
            <g className="art-drift">
              {[160, 326, 475, 640].map((x, i) => (
                <g key={x}>
                  <rect
                    x={x - 30}
                    y="210"
                    width="60"
                    height="60"
                    rx="12"
                    strokeOpacity={i === 1 ? 1 : 0.4}
                  />
                  <circle
                    cx={x}
                    cy="240"
                    r="6"
                    fill={i === 1 ? "#c6a16b" : "#19160f"}
                  />
                </g>
              ))}
            </g>
            <circle cx="400" cy="240" r="175" strokeOpacity=".1" />
            <circle cx="400" cy="240" r="130" strokeOpacity=".15" />
          </>
        ) : (
          <>
            <g className="art-drift">
              <circle cx="380" cy="214" r="100" strokeOpacity=".7" />
              <circle cx="380" cy="214" r="72" strokeOpacity=".2" />
              <path
                d="M451 287 535 370"
                strokeWidth="14"
                strokeLinecap="round"
                strokeOpacity=".65"
              />
              <path d="M323 240 363 203 392 222 443 165" strokeOpacity=".85" />
              <path d="M424 165H443V184" />
            </g>
            <path
              d="M170 350H420M170 320H230M520 122H637M560 153H637"
              strokeOpacity=".25"
            />
            <circle
              cx="380"
              cy="214"
              r="147"
              strokeDasharray="2 8"
              strokeOpacity=".2"
            />
          </>
        )}
      </g>
      <text
        x="40"
        y="438"
        fill="#8b795c"
        fontSize="9"
        letterSpacing="4"
        fontFamily="Arial,sans-serif"
      >
        JAIAX LABS / IDEAS EN ÓRBITA
      </text>
    </svg>
  );
}
