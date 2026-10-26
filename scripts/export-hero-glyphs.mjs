import { createRequire } from "node:module";
import { readFile, writeFile } from "node:fs/promises";
const require = createRequire(import.meta.url);
// Build-time only: use Next's bundled Geist reader, never ship a font parser.
const createFont =
  require("next/dist/compiled/@next/font/dist/fontkit").default;
const font = createFont(
  await readFile(
    require.resolve("next/dist/next-devtools/server/font/geist-latin.woff2"),
  ),
);
const text = "Creamos tecnología.Impulsamos negocios.";
const glyphs = Object.fromEntries(
  [...new Set(text)]
    .filter((c) => c !== " ")
    .map((c) => [c, font.layout(c).glyphs[0].path.toSVG()]),
);
await writeFile(
  new URL("../src/data/hero-glyphs.ts", import.meta.url),
  `// Generated Geist 400 outlines. Regenerate with node scripts/export-hero-glyphs.mjs.\nexport const heroGlyphs: Record<string, string> = ${JSON.stringify(glyphs, null, 2)};\nexport const heroFontMetrics = { unitsPerEm: ${font.unitsPerEm}, ascent: ${font.ascent} };\n`,
);
console.log("Hero headline exported as editable glyph paths.");
