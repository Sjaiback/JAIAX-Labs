import assert from "node:assert/strict";

const base = (process.argv[2] || "http://127.0.0.1:3107").replace(/\/$/, "");
const home = await (await fetch(`${base}/planes/`)).text();
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
  const whatsapp = card.match(/href="(https:\/\/wa\.me\/[^"\s]+)"/)?.[1];
  assert.ok(whatsapp, `WhatsApp link for ${id}`);
  const destination = new URL(whatsapp.replace(/&amp;/g, '&'));
  assert.equal(destination.pathname, '/51924488034', `WhatsApp number for ${id}`);
  const message = destination.searchParams.get('text');
  const name = { basica: 'Básica', profesional: 'Profesional', negocio: 'Negocio', avanzada: 'Avanzada' }[id];
  assert.ok(message.includes(name) && message.includes(price), `Plan and price in ${id} message`);
}
const legacy = await fetch(`${base}/web-desde-100/?utm_source=demo&utm_campaign=revision&tag=a&tag=b`);
assert.equal(legacy.status, 200);
assert.ok((await legacy.text()).includes('/web-desde-70/'), 'Static redirect fallback');
const offer = await fetch(`${base}/web-desde-70/`);
assert.equal(offer.status, 200);
assert.ok((await offer.text()).includes("70"));
console.log(
  "Pricing OK: four WhatsApp links, correct number, unique plan messages/prices, static legacy fallback and offer page.",
);
