import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

const moduleUrl = source => `data:text/javascript;base64,${Buffer.from(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } }).outputText).toString('base64')}`;
const config = await import(moduleUrl(await readFile('src/i18n/config.ts', 'utf8')));
const { copy } = await import(moduleUrl(await readFile('src/i18n/copy.ts', 'utf8')));
const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
const root = await readFile('out/index.html', 'utf8');
const entry = root.match(/<script id="language-entry">([\s\S]*?)<\/script>/)?.[1];
assert(entry, 'Early language detection script is exported');
assert(root.includes('noindex'), 'Language entry is not a duplicate indexed homepage');
function detect(languages, saved, path = `${base}/`, blocked = false) {
  let target;
  runInNewContext(entry, { navigator: { languages, language: languages[0] }, localStorage: { getItem() { if (blocked) throw Error('Storage blocked'); return saved; } }, location: { pathname: path, search: '?utm_source=test', hash: '#precios', replace(value) { target = value; } } });
  return target;
}
for (const [languages, saved, result] of [[['es-PE'],null,'es'],[['en-GB'],null,'en'],[['de-AT'],null,'de'],[['it-CH'],null,'it'],[['fr-FR','de-DE'],null,'de'],[['fr-FR'],null,'en'],[['en-US'],'es','es'],[['it-IT'],'invalid','it']]) {
  assert.equal(detect(languages,saved), `${base}/${result}/?utm_source=test#precios`);
}
assert.equal(detect(['de-DE'],null,`${base}/`,true),`${base}/de/?utm_source=test#precios`);
assert.equal(detect(['en-US'],'de',`${base}/it/`),undefined,'Explicit locale URLs are not redirected');
assert.equal(detect(['en-US'],null,`${base}/blog/`),undefined,'Original editorial URLs remain accessible');
assert.equal(config.switchLanguagePath('/de/servicios/desarrollo-web-peru/','it'),'/it/servicios/desarrollo-web-peru/');
assert.equal(config.switchLanguagePath('/de/servicios/desarrollo-web-peru/','es'),'/servicios/desarrollo-web-peru/');
assert.equal(config.preferredLocale(['de-DE'],'it'),'it','Manual preference wins');
for (const locale of config.locales) {
  const html = await readFile(`out/${locale}/index.html`,'utf8');
  assert(html.includes(`<html lang="${locale}"`),`SSR language ${locale}`);
  assert(html.includes(copy[locale].hero[1]),`Translated headline ${locale}`);
  assert.equal((html.match(/<h1[\s>]/g)||[]).length,1,`One H1 in ${locale}`);
  assert(html.includes(`aria-label="${copy[locale].language}"`),`Accessible language selector ${locale}`);
  for (const alternate of config.locales) assert(html.includes(`hrefLang="${alternate}"`) || html.includes(`hreflang="${alternate}"`),`Hreflang ${alternate} in ${locale}`);
  const pricingPath = locale === 'es' ? 'planes' : `${locale}/planes`;
  const pricingHtml = await readFile(`out/${pricingPath}/index.html`, 'utf8');
  for (const [index,id] of ['basica','profesional','negocio','avanzada'].entries()) {
    const card = pricingHtml.match(new RegExp(`<article[^>]*data-plan="${id}"[\\s\\S]*?</article>`))?.[0];
    assert(card,`${locale} ${id} plan`);
    const href=card.match(/href="(https:\/\/wa\.me\/[^"\s]+)"/)?.[1];
    assert(href,`WhatsApp link ${locale} ${id}`);
    const decoded = href.replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code,16))).replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code))).replace(/&amp;/g,'&');
    const url=new URL(decoded);
    assert.equal(url.pathname,'/51924488034');
    assert(url.searchParams.get('text').includes(copy[locale].plans[index][0]),`Localized plan message ${locale} ${id}`);
  }
  if (locale !== 'es') for (const slug of ['desarrollo-web-peru','tiendas-online-peru','automatizacion-n8n','inteligencia-artificial']) {
    const service = await readFile(`out/${locale}/servicios/${slug}/index.html`,'utf8');
    assert(service.includes(`<html lang="${locale}"`),`Localized service ${locale} ${slug}`);
  }
}
console.log('Languages OK: ES/EN/DE/IT, automatic matching, saved preference, blocked storage, explicit links, SSR lang, hreflang, 16 plan messages and 12 localized services.');
