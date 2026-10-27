import assert from 'node:assert/strict';
import { readdir, readFile, access } from 'node:fs/promises';
import { resolve, join } from 'node:path';

const root = resolve('out');
const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
const files = [];
async function visit(dir) {
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, item.name);
    if (item.isDirectory()) await visit(path);
    else if (path.endsWith('.html')) files.push(path);
  }
}
await visit(root);
assert(files.length > 20, 'Exported routes');
assert(!(await readdir(root)).includes('admin'), 'Admin must not be exported');
let checked = 0;
for (const file of files) {
  const html = await readFile(file, 'utf8');
  for (const match of html.matchAll(/(?:href|src)="(\/[^"<>]*)"/g)) {
    const path = decodeURIComponent(match[1].split(/[?#]/)[0]);
    if (path.startsWith('//')) continue;
    assert(!base || path === base || path.startsWith(`${base}/`), `Missing Pages prefix: ${path}`);
    const local = resolve(root, `.${path.slice(base.length)}`);
    await access(local).catch(() => { throw new Error(`Missing export asset or page: ${path} (${file})`); });
    checked++;
  }
}
console.log(`Static export OK: ${files.length} HTML files, ${checked} local references, no /admin.`);
