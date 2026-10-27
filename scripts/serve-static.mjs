import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, sep, extname } from 'node:path';

const root = resolve('out');
const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
const portIndex = process.argv.indexOf('--port');
const port = Number(portIndex >= 0 ? process.argv[portIndex + 1] : process.env.PORT || 3107);
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.txt': 'text/plain', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2', '.xml': 'application/xml' };

createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    const path = decodeURIComponent(url.pathname);
    if (base && path === base) {
      res.writeHead(301, { Location: `${base}/${url.search}` }); res.end(); return;
    }
    if (base && !path.startsWith(`${base}/`)) throw new Error('Not found');
    let file = resolve(root, `.${path.slice(base.length)}`);
    if (file !== root && !file.startsWith(`${root}${sep}`)) throw new Error('Not found');
    if ((await stat(file)).isDirectory()) {
      if (!path.endsWith('/')) { res.writeHead(301, { Location: `${path}/${url.search}` }); res.end(); return; }
      file = resolve(file, 'index.html');
    }
    const data = await readFile(file);
    const isPng = data[0] === 137 && data[1] === 80 && data[2] === 78;
    res.writeHead(200, { 'Content-Type': mime[extname(file)] || (isPng ? 'image/png' : 'application/octet-stream') });
    res.end(data);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(await readFile(resolve(root, '404.html')).catch(() => 'Not found'));
  }
}).listen(port, '127.0.0.1', () => console.log(`Static preview: http://127.0.0.1:${port}${base}/`));
