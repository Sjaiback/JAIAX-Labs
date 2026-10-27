import assert from "node:assert/strict";

const base = (process.argv[2] || "http://127.0.0.1:3107").replace(/\/$/, "");
const home = await (await fetch(base)).text();
for (const [id, price] of [
  ["basica", "70"],
  ["profesional", "120"],
  ["negocio", "300"],
  ["avanzada", "A medida"],
]) {
  const card = home.match(
    new RegExp(`<article[^>]*data-plan="${id}"[\\s\\S]*?</article>`),
  )?.[0];
  assert.ok(card, `Missing ${id} card`);
  assert.ok(card.includes(price), `Wrong ${id} price`);
  assert.ok(card.includes(`/contacto/?plan=${id}`), `Wrong ${id} destination`);
}
const legacy = await fetch(`${base}/web-desde-100/?utm_source=demo&utm_campaign=revision&tag=a&tag=b`);
assert.equal(legacy.status, 200);
assert.ok((await legacy.text()).includes('/web-desde-70/'), 'Static redirect fallback');
const offer = await fetch(`${base}/web-desde-70/`);
assert.equal(offer.status, 200);
assert.ok((await offer.text()).includes("70"));
console.log(
  "Pricing OK: four plans, contact links, static legacy fallback and offer page.",
);
