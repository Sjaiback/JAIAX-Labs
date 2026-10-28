import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import sharp from 'sharp';

// Use the existing JX geometry; a filled silhouette stays legible at 16–32 px.
const source = await readFile(new URL('../src/data/jaiax-logo.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
const { jaiaxLogo } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
const paths = jaiaxLogo.paths.filter(path => path.group === 'symbol').flatMap(path => path.d);
const stops = jaiaxLogo.symbolGradient.map(([offset, color]) => `<stop offset="${offset}" stop-color="${color}"/>`).join('');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><title>JX — JAIAX Labs</title><rect width="64" height="64" rx="14" fill="#10110e"/><defs><linearGradient id="jx" gradientUnits="userSpaceOnUse" x1="460" y1="400" x2="1044" y2="400">${stops}</linearGradient></defs><g transform="translate(4 17) scale(.096) translate(-460 -250)" fill="url(#jx)">${paths.map(d => `<path d="${d}"/>`).join('')}</g></svg>\n`;
await writeFile(new URL('../src/app/icon.svg', import.meta.url), svg);
await sharp(Buffer.from(svg)).resize(180,180).png().toFile(fileURLToPath(new URL('../src/app/apple-icon.png', import.meta.url)));

// PNG frames in an ICO container support browsers that request /favicon.ico.
const sizes = [16,32,48];
const frames = await Promise.all(sizes.map(size => sharp(Buffer.from(svg)).resize(size,size).png().toBuffer()));
const header = Buffer.alloc(6 + frames.length * 16);
header.writeUInt16LE(1,2); header.writeUInt16LE(frames.length,4);
let offset = header.length;
frames.forEach((frame,index) => {
  const entry = 6 + index * 16;
  header[entry] = sizes[index]; header[entry+1] = sizes[index];
  header.writeUInt16LE(1,entry+4); header.writeUInt16LE(32,entry+6);
  header.writeUInt32LE(frame.length,entry+8); header.writeUInt32LE(offset,entry+12);
  offset += frame.length;
});
await writeFile(new URL('../src/app/favicon.ico', import.meta.url), Buffer.concat([header,...frames]));
console.log(`JX icons generated from ${paths.length} original symbol paths: SVG, ICO (16/32/48), Apple PNG (180).`);
