import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import ts from "typescript";

const base = (process.argv[2] || "http://localhost:3107").replace(/\/$/, "");
const indexable = process.argv.includes("--indexable");
const source = await readFile(
  new URL("../src/lib/publication.ts", import.meta.url),
  "utf8",
);
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2020,
  },
}).outputText;
const { isIndexableSite } = await import(
  `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`
);
assert.equal(isIndexableSite("http://localhost:3107", true), false);
assert.equal(isIndexableSite("https://127.0.0.1", true), false);
assert.equal(isIndexableSite("https://preview.localhost", true), false);
assert.equal(isIndexableSite("not a URL", true), false);
assert.equal(isIndexableSite("http://example.test", true), false);
assert.equal(isIndexableSite("https://example.test", false), false);
assert.equal(isIndexableSite("https://example.test", true), true);

const articleSlugs = [
  "excel-o-sistema-para-mi-negocio",
  "como-una-web-ayuda-a-vender",
  "cuanto-cuesta-pagina-web-peru",
  "automatizacion-n8n-negocios",
  "seo-para-web-de-servicios",
];
const serviceSlugs = [
  "desarrollo-web-peru",
  "tiendas-online-peru",
  "automatizacion-n8n",
  "inteligencia-artificial",
];
const paths = [
  "/",
  "/es/",
  ...["planes", "estudio", "sistemas"].flatMap(section => [`/${section}/`, ...["en","de","it"].map(locale => `/${locale}/${section}/`)]),
  "/en/",
  "/de/",
  "/it/",
  "/blog",
  "/contacto?plan=negocio",
  "/web-desde-70",
  "/proyectos/",
  ...["nodo", "soma", "umbral"].map(slug => `/proyectos/${slug}/`),
  "/de/servicios/automatizacion-n8n/",
  ...["control-logistico", "ecommerce", "blog-editorial"].map(
    (s) => `/ejemplos/${s}`,
  ),
  ...articleSlugs.map((s) => `/blog/${s}`),
  ...serviceSlugs.map((s) => `/servicios/${s}`),
];
const results = await Promise.all(
  paths.map(async (path) => {
    const response = await fetch(base + path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `One H1: ${path}`);
    const canonical = html.match(
      /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/,
    );
    assert(canonical, `Canonical: ${path}`);
    assert.equal(new URL(canonical[1]).pathname.replace(/\/$/, ""), `${new URL(base).pathname.replace(/\/$/, "")}${path === "/" ? "/es/" : path.split("?")[0]}`.replace(/\/$/, ""));
    assert.equal(
      (html.match(/<link[^>]+rel="canonical"/g) || []).length,
      1,
      `Unique canonical: ${path}`,
    );
    assert(
      /<meta name="description" content="[^"]+"/.test(html),
      `Description: ${path}`,
    );
    assert(
      /<meta property="og:title" content="[^"]+"/.test(html),
      `OG title: ${path}`,
    );
    const robots = html.match(/<meta name="robots" content="([^"]+)"/)?.[1];
    assert(robots, `Robots: ${path}`);
    assert.equal(robots.includes("noindex"), !indexable || path === "/" || path.startsWith("/ejemplos/"), `Indexation: ${path}`);
    const blocks = [
      ...html.matchAll(
        /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
      ),
    ].map((m) => JSON.parse(m[1]));
    assert(
      blocks.some((b) =>
        b["@graph"]?.some((item) => item["@type"] === "Organization"),
      ),
      `Publisher: ${path}`,
    );
    if (path.startsWith("/blog/")) {
      const post = blocks.find((b) => b["@type"] === "BlogPosting");
      assert(post, `Article schema: ${path}`);
      assert(
        post.headline &&
          post.author?.name &&
          post.datePublished &&
          post.image?.length,
        `Article fields: ${path}`,
      );
      assert(
        blocks.some((b) => b["@type"] === "BreadcrumbList"),
        "Article breadcrumbs",
      );
      assert(
        html.includes("data-reading-body"),
        "Server-rendered article body",
      );
      assert(html.includes('id="ejemplo-interactivo"'), `Interactive article example: ${path}`);
      assert(html.includes('href="#ejemplo-interactivo"'), `Direct example link: ${path}`);
      assert(Number.isFinite(Date.parse(post.dateModified)), `Article modification date: ${path}`);
      assert(Date.parse(post.dateModified) >= Date.parse(post.datePublished), `Article date order: ${path}`);
      assert(html.includes(`<time dateTime="${post.dateModified.slice(0, 10)}"`) || html.includes(`<time datetime="${post.dateModified.slice(0, 10)}"`), `Visible article date: ${path}`);
      const cover = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
      assert(cover?.includes("/images/blog/") && cover.endsWith(".webp"), `Editorial share image: ${path}`);
      assert(post.image.includes(cover), `Schema and share image agree: ${path}`);
      const coverPath = new URL(cover).pathname;
      assert(html.includes(`src="${coverPath}"`), `Visible editorial image: ${path}`);
      const coverResponse = await fetch(new URL(coverPath, base));
      assert.equal(coverResponse.status, 200, `Editorial image response: ${path}`);
      assert(coverResponse.headers.get("content-type")?.includes("image/webp"), `WebP type: ${path}`);
      const coverBytes = Buffer.from(await coverResponse.arrayBuffer());
      assert.equal(coverBytes.toString("ascii", 8, 12), "WEBP", `WebP file: ${path}`);
      assert(coverBytes.length < 200_000, `Editorial image weight: ${path}`);
    }
    if (path.startsWith("/servicios/"))
      assert(
        blocks.some((b) => b["@type"] === "Service"),
        "Service schema",
      );
    return `200 + SEO: ${path}`;
  }),
);
for (const line of results) console.log(line);
const robots = await (await fetch(base + "/robots.txt")).text();
assert.equal(
  robots.includes("Disallow: /\n"),
  !indexable,
  "Preview robots gate",
);
const sitemap = await (await fetch(base + "/sitemap.xml")).text();
assert.equal(sitemap.includes("<loc>"), indexable, "Sitemap publication gate");
if (indexable) {
  const entries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(match => match[1]);
  for (const path of ["/web-desde-70/", "/proyectos/nodo/", "/proyectos/soma/", "/proyectos/umbral/", "/blog/excel-o-sistema-para-mi-negocio/", "/contacto/", "/de/servicios/automatizacion-n8n/"]) {
    assert(entries.some(entry => entry.match(/<loc>([^<]+)<\/loc>/)?.[1].endsWith(path)), `Discovered URL in sitemap: ${path}`);
  }
  for (const slug of articleSlugs) {
    const entry = entries.find(entry => entry.includes(`/blog/${slug}/</loc>`));
    assert(entry?.includes("<lastmod>"), `Article update in sitemap: ${slug}`);
  }
}
for (const slug of articleSlugs) {
  const response = await fetch(`${base}/social/${slug}.png`);
  assert.equal(response.status, 200);
  assert(response.headers.get("content-type")?.includes("image/png"));
  const bytes = new Uint8Array(await response.arrayBuffer());
  assert.deepEqual([...bytes.slice(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
  console.log("PNG social card: " + slug);
}
for (const path of [
  "/blog/no-existe",
  "/servicios/no-existe",
  "/ejemplos/no-existe",
  "/admin/",
])
  assert.equal((await fetch(base + path)).status, 404, path);
console.log(
  "OK: publication policy, metadata, JSON-LD, canonical URLs, sitemap, PNG cards and 404s.",
);
