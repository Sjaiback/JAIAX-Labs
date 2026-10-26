import { ImageResponse } from "next/og";
import { journalPosts } from "@/data/journal";
export const alt = "Ideas en órbita — JAIAX Labs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function ArticleImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = journalPosts.find((p) => p.slug === slug);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: 65,
          background: "#080807",
          color: "#f5f5f3",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 18,
            letterSpacing: 4,
            color: "#c6a16b",
          }}
        >
          <span>JAIAX LABS</span>
          <span>JOURNAL / IDEAS EN ÓRBITA</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 70,
            fontSize: 12,
            letterSpacing: 4,
            color: "#a58d68",
            textTransform: "uppercase",
          }}
        >
          {p?.category || "Estrategia digital"}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 63,
            lineHeight: 1.12,
            letterSpacing: -2,
            marginTop: 25,
            maxWidth: 1060,
          }}
        >
          {p?.title || "Ideas que abren nuevas posibilidades."}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "auto",
            paddingTop: 25,
            borderTop: "1px solid #ffffff22",
            fontSize: 16,
            color: "#a5a5a5",
          }}
        >
          DESARROLLO WEB · AUTOMATIZACIÓN · ESTRATEGIA DIGITAL
        </div>
      </div>
    ),
    size,
  );
}
