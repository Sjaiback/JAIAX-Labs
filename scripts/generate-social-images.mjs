import { readFile, writeFile, mkdir } from 'node:fs/promises';
import ts from 'typescript';
import { createElement as h } from 'react';
import { ImageResponse } from 'next/og.js';

const moduleUrl = (source) => `data:text/javascript;base64,${Buffer.from(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } }).outputText).toString('base64')}`;
const pricingUrl = moduleUrl(await readFile(new URL('../src/data/pricing.ts', import.meta.url), 'utf8'));
const journalSource = (await readFile(new URL('../src/data/journal.ts', import.meta.url), 'utf8')).replace('"./pricing"', JSON.stringify(pricingUrl));
const { journalPosts } = await import(moduleUrl(journalSource));
const { copy } = await import(moduleUrl(await readFile(new URL('../src/i18n/copy.ts', import.meta.url), 'utf8')));
const directory = new URL('../public/social/', import.meta.url);
await mkdir(directory, { recursive: true });
for (const post of [{ slug: 'site', title: 'Creamos tecnología. Impulsamos negocios.', category: 'TECNOLOGÍA CON PROPÓSITO' }, ...['en','de','it'].map(locale => ({ slug: `site-${locale}`, title: `${copy[locale].hero[1]} ${copy[locale].hero[2]}`, category: copy[locale].hero[0], locale })), ...journalPosts]) {
  const response = new ImageResponse(h('div', { style: { width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: 65, background: '#080807', color: '#f5f5f3', fontFamily: 'sans-serif' } },
    h('div', { style: { display: 'flex', fontSize: 24, letterSpacing: 4, color: '#c6a16b' } }, 'JAIAX LABS'),
    h('div', { style: { display: 'flex', marginTop: 65, fontSize: 15, letterSpacing: 3, color: '#c6a16b' } }, post.category.toUpperCase()),
    h('div', { style: { display: 'flex', marginTop: 25, fontSize: 63, lineHeight: 1.12, letterSpacing: -2 } }, post.title),
    h('div', { style: { display: 'flex', marginTop: 'auto', paddingTop: 25, borderTop: '1px solid #ffffff22', fontSize: 16, color: '#a5a5a5' } }, post.locale ? copy[post.locale].footer[3] : 'DESARROLLO WEB · AUTOMATIZACIÓN · ESTRATEGIA DIGITAL')
  ), { width: 1200, height: 630 });
  await writeFile(new URL(`${post.slug}.png`, directory), Buffer.from(await response.arrayBuffer()));
}
console.log(`Generated ${journalPosts.length + 4} static social images.`);
