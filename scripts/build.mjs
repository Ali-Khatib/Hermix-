// Builds the Hermix website's shared parts and sub-pages.
//   node scripts/build.mjs
// - Stamps the waitlist section and footer into index.html between <!-- site:… --> markers.
// - Writes every page in scripts/pages/ with the shared header, waitlist, and footer.
// Edit copy in scripts/pages/*.mjs and settings in site.config.json, then re-run.
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const cfg = JSON.parse(readFileSync(join(root, "site.config.json"), "utf8"));
const { header, footer, waitlist, esc } = await import(pathToFileURL(join(root, "scripts/partials.mjs")));

const pagesDir = join(root, "scripts/pages");
const pages = [];
for (const f of readdirSync(pagesDir).filter((f) => f.endsWith(".mjs")).sort()) {
  pages.push((await import(pathToFileURL(join(pagesDir, f)))).default);
}

const stamp = (html, name, content) => {
  const re = new RegExp(`(<!-- site:${name} -->)[\\s\\S]*?(<!-- /site:${name} -->)`);
  if (!re.test(html)) throw new Error(`index.html is missing the site:${name} markers`);
  return html.replace(re, `$1\n${content}\n  $2`);
};

// index.html
const indexPath = join(root, "index.html");
let index = readFileSync(indexPath, "utf8");
index = stamp(index, "waitlist", waitlist("", cfg));
index = stamp(index, "footer", footer("", cfg));
writeFileSync(indexPath, index);

// sub-pages
for (const p of pages) {
  const out = join(root, p.file);
  mkdirSync(dirname(out), { recursive: true });
  const depth = p.file.split("/").length - 1;
  const base = depth ? "../".repeat(depth) : "";
  const canonical = cfg.siteUrl ? `\n  <link rel="canonical" href="${esc(cfg.siteUrl.replace(/\/$/, ""))}/${p.file.replace(/\.html$/, "")}" />` : "";
  const legalNav = p.legal
    ? `<nav class="legal-nav" aria-label="Legal pages"><p class="kicker">Legal</p><ul>${pages
        .filter((q) => q.legal)
        .map((q) => `<li><a href="${base}${q.file}"${q.file === p.file ? ' aria-current="page"' : ""}>${esc(q.short || q.title)}</a></li>`)
        .join("")}</ul></nav>`
    : "";
  const dates = p.legal ? `<p class="page-dates">Effective ${esc(cfg.policyDate)} · Last updated ${esc(cfg.policyDate)}</p>` : "";
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(p.title)} — Hermix</title>
  <meta name="description" content="${esc(p.description)}" />${canonical}
  <meta name="theme-color" content="#f6f1e8" />
  <link rel="icon" href="${base}media/landing/favicon.svg" type="image/svg+xml" />
  <link rel="stylesheet" href="${base}styles.css?v=${cfg.assetVersion || 1}" />
  <link rel="stylesheet" href="${base}page.css?v=${cfg.assetVersion || 1}" />
</head>
<body class="subpage">
  <a class="skip" href="#content">Skip to content</a>
${header(base, cfg, p.waitlist !== false)}
  <main id="content">
    <header class="page-head">
      <a class="back" href="${base}index.html">← Back to Hermix</a>
      <p class="kicker">${esc(p.kicker)}</p>
      <h1>${esc(p.heading || p.title)}</h1>
      ${p.lede ? `<p class="page-lede">${p.lede}</p>` : ""}
      ${dates}
    </header>
    <div class="page-body${p.legal ? " with-nav" : ""}">
      ${legalNav}
      <article class="prose">
${p.body(cfg, base)}
      </article>
    </div>
${p.waitlist === false ? "" : waitlist(base, cfg)}
  </main>
${footer(base, cfg)}
  <script src="${base}media/vendor/lenis.min.js"></script>
  <script src="${base}smooth.js?v=${cfg.assetVersion || 1}"></script>
  <script src="${base}forms.js?v=${cfg.assetVersion || 1}"></script>
</body>
</html>
`;
  writeFileSync(out, html);
  console.log("wrote", relative(root, out));
}
console.log("stamped index.html");
