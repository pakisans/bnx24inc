/**
 * Renders raster brand assets (social image, PNG icons, favicon.ico) from the
 * SVG logo and self-hosted fonts, using Playwright's Chromium.
 * Outputs are committed; re-run only after changing the brand:
 *
 *   npx playwright install chromium   # once
 *   npm run brand:render
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { chromium } from "@playwright/test";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const p = (...s) => path.join(root, ...s);

const dataUri = async (file, type) => `data:${type};base64,${(await readFile(p(file))).toString("base64")}`;

const fonts = `
@font-face { font-family: "Inter"; src: url("${await dataUri("src/fonts/inter-latin-wght.woff2", "font/woff2")}") format("woff2"); font-weight: 100 900; }
@font-face { font-family: "Source Serif"; src: url("${await dataUri("src/fonts/source-serif-4-latin-wght.woff2", "font/woff2")}") format("woff2"); font-weight: 200 900; }
`;
const logoDark = await dataUri("public/brand/bnx24-logo-dark.svg", "image/svg+xml");
const mono = await dataUri("public/brand/bnx24-monogram.svg", "image/svg+xml");

const ogHtml = `<!doctype html><html><head><style>${fonts}
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; background: #0B1F33; font-family: Inter; color: #F8F6F1; position: relative; overflow: hidden; }
.grid { position: absolute; inset: 0; background-image: linear-gradient(#24405C 1px, transparent 1px), linear-gradient(90deg, #24405C 1px, transparent 1px); background-size: 80px 80px; background-position: -1px -1px; opacity: .35; }
.panel { position: absolute; inset: 64px 72px; }
.corner { position: absolute; width: 36px; height: 36px; border-color: #6FCFC2; border-style: solid; }
.tl { top: 0; left: 0; border-width: 3px 0 0 3px; } .br { right: 0; bottom: 0; border-width: 0 3px 3px 0; }
.inner { position: absolute; inset: 52px 56px; display: flex; flex-direction: column; }
.logo { height: 46px; width: auto; align-self: flex-start; }
h1 { font-family: "Source Serif"; font-weight: 500; font-size: 68px; line-height: 1.06; letter-spacing: -0.02em; margin-top: 54px; max-width: 900px; }
p { margin-top: auto; font-size: 24px; white-space: nowrap; gap: 32px; color: #A9B4BF; display: flex; justify-content: space-between; align-items: flex-end; }
p b { color: #6FCFC2; font-weight: 600; font-size: 22px; letter-spacing: .02em; }
</style></head><body><div class="grid"></div><div class="panel"><span class="corner tl"></span><span class="corner br"></span>
<div class="inner"><img class="logo" src="${logoDark}" alt="">
<h1>Building Better Businesses Through Strategy.</h1>
<p><span>Business consulting for companies across the United States</span><b>bnx24consulting.com</b></p></div></div></body></html>`;

const iconHtml = (size, pad = 0, bg = "transparent") => `<!doctype html><html><head><style>
* { margin: 0; } body { width: ${size}px; height: ${size}px; background: ${bg}; display: grid; place-items: center; }
img { width: ${size - pad * 2}px; height: ${size - pad * 2}px; }
</style></head><body><img src="${mono}" alt=""></body></html>`;

/** Packs PNG buffers into a .ico container (PNG-compressed entries). */
function toIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  const entries = [];
  let offset = 6 + images.length * 16;
  for (const { size, data } of images) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    entries.push(e);
  }
  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

const browser = await chromium.launch();
async function render(html, width, height, { transparent = false } = {}) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  const buf = await page.screenshot({ type: "png", omitBackground: transparent });
  await page.close();
  return buf;
}

await mkdir(p("public/og"), { recursive: true });
await writeFile(p("public/og/bnx24-og.png"), await render(ogHtml, 1200, 630));

for (const size of [192, 512]) {
  await writeFile(p(`public/brand/icon-${size}.png`), await render(iconHtml(size), size, size, { transparent: true }));
}
// Maskable icon: full-bleed navy with the mark inside the safe zone.
await writeFile(p("public/brand/icon-maskable-512.png"), await render(iconHtml(512, 72, "#0B1F33"), 512, 512));
// Square logo for structured data.
await writeFile(p("public/brand/bnx24-logo-512.png"), await render(iconHtml(512, 48, "#F8F6F1"), 512, 512));
// Apple touch icon: opaque, iOS applies its own corner mask.
await writeFile(p("src/app/apple-icon.png"), await render(iconHtml(180, 0, "#0B1F33"), 180, 180));

const ico = [];
for (const size of [16, 32, 48]) {
  ico.push({ size, data: await render(iconHtml(size), size, size, { transparent: true }) });
}
await writeFile(p("src/app/favicon.ico"), toIco(ico));

await browser.close();
console.log("Brand assets rendered.");
