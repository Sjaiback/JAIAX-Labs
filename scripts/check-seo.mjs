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
  "cuanto-cuesta-pagina-web-peru",
  "automatizacion-n8n-negocios",
  "seo-para-web-de-servicios",
];
const serviceSlugs = [
  "desarrollo-web-peru",
  "automatizacion-n8n",
  "inteligencia-artificial",
];
const paths = [
  "/",
  "/blog",
  "/contacto?plan=negocio",
  "/web-desde-70",
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
    assert.equal(new URL(canonical[1]).pathname, path.split("?")[0]);
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
    assert.equal(robots.includes("noindex"), !indexable, `Indexation: ${path}`);
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
for (const slug of articleSlugs) {
  const response = await fetch(`${base}/blog/${slug}/opengraph-image`);
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
])
  assert.equal((await fetch(base + path)).status, 404, path);
console.log(
  "OK: publication policy, metadata, JSON-LD, canonical URLs, sitemap, PNG cards and 404s.",
);
