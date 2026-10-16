import http from 'node:http';
import { readFile } from 'node:fs/promises';
const assets = new Map([['/', ['index.html', 'text/html']], ['/index.html', ['index.html', 'text/html']], ['/styles.css', ['styles.css', 'text/css']], ['/script.js', ['script.js', 'text/javascript']], ['/favicon.svg', ['favicon.svg', 'image/svg+xml']]]);
const server = http.createServer(async (req, res) => {
  const asset = assets.get(new URL(req.url, 'http://localhost').pathname);
  if (!asset) { res.writeHead(404); res.end('Not found'); return; }
  try { const body = await readFile(new URL(asset[0], import.meta.url)); res.writeHead(200, { 'Content-Type': asset[1] + '; charset=utf-8', 'X-Content-Type-Options': 'nosniff' }); res.end(body); }
  catch { res.writeHead(500); res.end('Unable to load page'); }
});
server.listen(3000, '127.0.0.1', () => console.log('Portfolio: http://127.0.0.1:3000'));
