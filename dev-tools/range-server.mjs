// Minimal static server WITH HTTP Range support (Chrome needs it to seek in MP4). Serves D:\Portfolio2 on :8766.  node range-server.mjs
import { createServer } from 'http';
import { createReadStream, statSync } from 'fs';
import { extname, join, normalize } from 'path';

const ROOT = 'D:/Portfolio2';
const TYPES = { '.mp4': 'video/mp4', '.png': 'image/png', '.html': 'text/html', '.json': 'application/json' };

createServer((req, res) => {
  const filePath = normalize(join(ROOT, decodeURIComponent(req.url.split('?')[0])));
  if (!filePath.replace(/\\/g, '/').startsWith(ROOT)) { res.writeHead(403).end(); return; }
  let size;
  try { const st = statSync(filePath); if (!st.isFile()) throw new Error('not a file'); size = st.size; } catch { res.writeHead(404).end(); return; }
  const headers = { 'Content-Type': TYPES[extname(filePath)] || 'application/octet-stream', 'Accept-Ranges': 'bytes', 'Access-Control-Allow-Origin': '*' };
  const range = /bytes=(\d*)-(\d*)/.exec(req.headers.range || '');
  if (range) {
    const start = range[1] ? Number(range[1]) : 0;
    const end = range[2] ? Number(range[2]) : size - 1;
    res.writeHead(206, { ...headers, 'Content-Range': `bytes ${start}-${end}/${size}`, 'Content-Length': end - start + 1 });
    createReadStream(filePath, { start, end }).pipe(res);
  } else {
    res.writeHead(200, { ...headers, 'Content-Length': size });
    createReadStream(filePath).pipe(res);
  }
}).on('error', (e) => console.error(e)).listen(8766, () => console.log('range server on :8766'));
