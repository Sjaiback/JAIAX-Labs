import { ImageResponse } from "next/og";
export const alt = "JAIAX Labs — Creamos tecnología. Impulsamos negocios.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#050505",
          color: "#f5f5f3",
          display: "flex",
          flexDirection: "column",
          padding: "65px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 4, display: "flex" }}>
          JAIAX LABS{" "}
          <span style={{ color: "#c6a16b", marginLeft: 18 }}>✳</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 75,
            letterSpacing: -3,
            marginTop: 105,
            lineHeight: 1.1,
          }}
        >
          <span>Creamos tecnología.</span>
          <span style={{ color: "#c6a16b" }}>Impulsamos negocios.</span>
        </div>
        <div
          style={{
            fontSize: 17,
            color: "#a5a5a5",
            letterSpacing: 4,
            marginTop: 55,
            display: "flex",
          }}
        >
          DESARROLLO WEB · SOFTWARE · INTELIGENCIA ARTIFICIAL
        </div>
      </div>
    ),
    size,
  );
}
