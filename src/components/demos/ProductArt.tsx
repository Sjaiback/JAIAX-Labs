import { useId } from "react";
export function ProductArt({
  kind,
  color = "#323730",
  className = "",
}: {
  kind: "headphones" | "lamp" | "chair" | "speaker" | "vase" | "clock";
  color?: string;
  className?: string;
}) {
  const id = useId().replace(/[^a-z0-9]/gi, "");
  return (
    <svg className={className} viewBox="0 0 600 560" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}metal`} x1="0" x2="1">
          <stop stopColor="#777c72" />
          <stop offset=".3" stopColor="#e2e4da" />
          <stop offset=".6" stopColor="#a6ab9e" />
          <stop offset="1" stopColor="#4e554c" />
        </linearGradient>
        <linearGradient id={`${id}body`} x1="0" x2="1" y2=".8">
          <stop stopColor={color} />
          <stop offset=".45" stopColor={color} />
          <stop offset="1" stopColor="#131a16" />
        </linearGradient>
        <radialGradient id={`${id}light`}>
          <stop stopColor="#fff8cd" stopOpacity=".8" />
          <stop offset="1" stopColor="#fff8cd" stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}blur`}>
          <feGaussianBlur stdDeviation="13" />
        </filter>
      </defs>
      <ellipse
        cx="300"
        cy="478"
        rx="155"
        ry="18"
        fill="#142019"
        opacity=".14"
        filter={`url(#${id}blur)`}
      />
      {kind === "headphones" && (
        <g transform="rotate(-15 300 280)">
          <path
            d="M168 325V244C168 63 431 63 431 244V325"
            fill="none"
            stroke={`url(#${id}metal)`}
            strokeWidth="38"
          />
          <path
            d="M174 226C177 61 421 61 425 226"
            fill="none"
            stroke={color}
            strokeWidth="24"
          />
          <path
            d="M156 279V349M444 279V349"
            stroke={`url(#${id}metal)`}
            strokeWidth="18"
          />
          <rect
            x="122"
            y="275"
            width="86"
            height="157"
            rx="41"
            fill={`url(#${id}body)`}
          />
          <rect
            x="392"
            y="275"
            width="86"
            height="157"
            rx="41"
            fill={`url(#${id}body)`}
          />
          <ellipse cx="202" cy="354" rx="17" ry="65" fill="#151c17" />
          <ellipse cx="398" cy="354" rx="17" ry="65" fill="#1b231d" />
          <path
            d="M140 306V385M458 306V385"
            stroke="#ffffff25"
            strokeWidth="2"
          />
          <circle cx="451" cy="387" r="3" fill="#d1ea97" />
        </g>
      )}
      {kind === "lamp" && (
        <g>
          <ellipse
            cx="300"
            cy="480"
            rx="100"
            ry="70"
            fill={`url(#${id}light)`}
          />
          <path d="M300 390V245" stroke={`url(#${id}metal)`} strokeWidth="13" />
          <ellipse cx="300" cy="439" rx="91" ry="17" fill={`url(#${id}body)`} />
          <path d="M209 438Q209 419 300 415Q391 419 391 438" fill={color} />
          <path
            d="M300 116C225 116 163 179 151 258Q300 296 449 258C437 179 375 116 300 116"
            fill={`url(#${id}body)`}
          />
          <ellipse cx="300" cy="258" rx="149" ry="25" fill="#d9ddb8" />
          <ellipse cx="300" cy="257" rx="110" ry="16" fill="#f8e9b7" />
          <path
            d="M190 222Q215 140 282 133"
            fill="none"
            stroke="#ffffff22"
            strokeWidth="4"
          />
        </g>
      )}
      {kind === "chair" && (
        <g transform="translate(0 -10)">
          <path
            d="M191 337 163 465M386 337 421 465M232 326 216 450M357 326 365 450"
            stroke="#675440"
            strokeWidth="13"
            strokeLinecap="round"
          />
          <path
            d="M189 309 165 172Q165 127 208 130L375 141Q409 143 413 181L395 320Z"
            fill={`url(#${id}body)`}
          />
          <path
            d="M172 305Q275 271 407 315L415 350Q275 388 171 345Z"
            fill={color}
          />
          <path
            d="M185 182Q259 154 391 179M190 196Q260 169 392 194"
            stroke="#ffffff16"
            fill="none"
            strokeWidth="3"
          />
        </g>
      )}
      {kind === "speaker" && (
        <g transform="rotate(-8 300 280)">
          <rect
            x="178"
            y="131"
            width="245"
            height="300"
            rx="65"
            fill={`url(#${id}body)`}
          />
          <rect
            x="190"
            y="143"
            width="220"
            height="276"
            rx="53"
            fill="none"
            stroke="#ffffff19"
            strokeWidth="2"
          />
          {Array.from({ length: 22 }, (_, i) => (
            <path
              key={i}
              d={`M${205 + i * 8} 175V385`}
              stroke="#ffffff14"
              strokeWidth="2"
            />
          ))}
          <circle cx="299" cy="269" r="67" fill="#101813" opacity=".5" />
          <path
            d="M262 151H333"
            stroke="#d1ea97"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      )}
      {kind === "vase" && (
        <g>
          <path
            d="M266 127V204C245 243 195 287 195 360C195 420 242 445 300 445S405 420 405 360C405 287 355 243 334 204V127Z"
            fill={`url(#${id}body)`}
          />
          <ellipse cx="300" cy="128" rx="34" ry="10" fill="#b6a48b" />
          <ellipse cx="300" cy="128" rx="23" ry="5" fill="#433e31" />
          <path
            d="M297 127Q271 62 240 45M302 127Q331 58 369 35"
            stroke="#6f7553"
            strokeWidth="3"
            fill="none"
          />
          <ellipse
            cx="252"
            cy="62"
            rx="12"
            ry="30"
            transform="rotate(-32 252 62)"
            fill="#7c8460"
          />
          <ellipse
            cx="351"
            cy="62"
            rx="12"
            ry="35"
            transform="rotate(38 351 62)"
            fill="#8d9670"
          />
        </g>
      )}
      {kind === "clock" && (
        <g transform="rotate(-8 300 280)">
          <circle cx="300" cy="280" r="157" fill={`url(#${id}body)`} />
          <circle cx="300" cy="280" r="144" fill="#e8e8da" />
          {Array.from({ length: 12 }, (_, i) => (
            <path
              key={i}
              d="M300 150V166"
              stroke="#333b30"
              strokeWidth="3"
              transform={`rotate(${i * 30} 300 280)`}
            />
          ))}
          <path
            d="M300 204V280L362 310"
            stroke="#30392d"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="300" cy="280" r="8" fill="#a79f77" />
        </g>
      )}
    </svg>
  );
}
