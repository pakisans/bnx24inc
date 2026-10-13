/**
 * Minimal static server for the exported `out/` directory that mirrors the
 * Cloudflare Pages behavior this site relies on:
 *  - /path/ serves /path/index.html
 *  - /path (a directory) redirects 308 to /path/
 *  - /path/index.html redirects 308 to /path/
 *  - unknown paths serve /404.html with status 404
 *  - text responses are gzip-compressed, as Cloudflare compresses them
 * Usage: npm run preview [-- --port 4173]
 */
import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { createGzip } from "node:zlib";
import { stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../out");
const portArg = process.argv.indexOf("--port");
const port = Number(portArg > -1 ? process.argv[portArg + 1] : process.env.PORT || 4173);

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".webmanifest": "application/manifest+json",
};

const isFile = async (p) => (await stat(p).catch(() => null))?.isFile() ?? false;
const isDir = async (p) => (await stat(p).catch(() => null))?.isDirectory() ?? false;

const compressible = new Set([".html", ".css", ".js", ".json", ".txt", ".xml", ".svg", ".webmanifest"]);

function send(req, res, file, status = 200) {
  const ext = path.extname(file);
  const headers = { "Content-Type": types[ext] ?? "application/octet-stream" };
  const gzip = compressible.has(ext) && /\bgzip\b/.test(req.headers["accept-encoding"] ?? "");
  if (gzip) headers["Content-Encoding"] = "gzip";
  res.writeHead(status, headers);
  const stream = createReadStream(file);
  (gzip ? stream.pipe(createGzip()) : stream).pipe(res);
}

createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", "http://localhost");
  const pathname = decodeURIComponent(url.pathname);
  const target = path.join(root, pathname);
  if (!target.startsWith(root)) return res.writeHead(400).end();

  if (pathname.endsWith("/index.html")) {
    res.writeHead(308, { Location: pathname.slice(0, -"index.html".length) + url.search });
    return res.end();
  }
  if (pathname.endsWith("/")) {
    const index = path.join(target, "index.html");
    if (await isFile(index)) return send(req, res, index);
  } else if (await isFile(target)) {
    return send(req, res, target);
  } else if (await isDir(target)) {
    res.writeHead(308, { Location: `${pathname}/${url.search}` });
    return res.end();
  }
  send(req, res, path.join(root, "404.html"), 404);
}).listen(port, () => console.log(`Serving out/ at http://localhost:${port}`));
