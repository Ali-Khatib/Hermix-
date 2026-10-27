// Local preview with working forms.
//   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/serve.mjs
// Without those variables the forms show "This form isn't switched on yet".
// Opens http://localhost:3000
import http from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { join, extname, dirname, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const api = { waitlist: require(join(root, "api/waitlist.js")), contact: require(join(root, "api/contact.js")) };
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".json": "application/json", ".svg": "image/svg+xml", ".webp": "image/webp", ".png": "image/png", ".woff2": "font/woff2", ".mp4": "video/mp4", ".webm": "video/webm" };
const port = Number(process.env.PORT) || 3000;

http.createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");
  const name = url.pathname.match(/^\/api\/([a-z]+)$/)?.[1];
  if (name) return api[name] ? api[name](req, res) : ((res.statusCode = 404), res.end());
  let file = normalize(join(root, decodeURIComponent(url.pathname)));
  if (!file.startsWith(root)) return ((res.statusCode = 403), res.end());
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  if (!existsSync(file)) return ((res.statusCode = 404), res.end("Not found"));
  const size = statSync(file).size;
  res.setHeader("Content-Type", types[extname(file)] || "application/octet-stream");
  res.setHeader("Accept-Ranges", "bytes");
  const range = req.headers.range?.match(/bytes=(\d*)-(\d*)/);
  if (range) { // videos need byte ranges to seek
    const start = range[1] ? Number(range[1]) : 0;
    const end = range[2] ? Number(range[2]) : size - 1;
    res.writeHead(206, { "Content-Range": `bytes ${start}-${end}/${size}`, "Content-Length": end - start + 1 });
    return createReadStream(file, { start, end }).pipe(res);
  }
  res.setHeader("Content-Length", size);
  createReadStream(file).pipe(res);
}).listen(port, () => console.log(`Hermix site on http://localhost:${port}${process.env.SUPABASE_URL ? "" : "  (forms not connected: set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY)"}`));
