import { readFile, writeFile } from "node:fs/promises";
import ts from "typescript";
const source = await readFile(
  new URL("../src/data/jaiax-logo.ts", import.meta.url),
  "utf8",
);
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext },
}).outputText;
const { jaiaxLogo: logo } = await import(
  `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`
);
const gradient = (id, stops) =>
  `<linearGradient id="${id}">${stops.map(([offset, color]) => `<stop offset="${offset}" stop-color="${color}"/>`).join("")}</linearGradient>`;
const paths = logo.paths
  .flatMap((g) =>
    g.d.map(
      (d) =>
        `<path d="${d}" stroke-width="${g.width}" stroke="${g.group === "jaiax" ? logo.wordColor : `url(#${g.group})`}"/>`,
    ),
  )
  .join("");
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${logo.viewBox}" width="${logo.width}" height="${logo.height}" role="img" aria-label="JAIAX Labs"><title>JAIAX Labs</title><defs>${gradient("symbol", logo.symbolGradient)}${gradient("labs", logo.labsGradient)}</defs><g fill="none" stroke-linecap="round" stroke-linejoin="round">${paths}</g></svg>\n`;
await writeFile(
  new URL("../public/images/jaiax-logo.svg", import.meta.url),
  svg,
);
console.log("Editable SVG exported with the website palette.");
