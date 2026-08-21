#!/usr/bin/env node
// Renders every CV variant in data/ to dist/<name>.html and dist/<basename>.pdf.
// Usage: node build.mjs [variant ...]   (default: all variants)

import { readdir, mkdir, writeFile, copyFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const CHROME =
  process.env.CHROME_PATH ||
  (process.platform === 'darwin'
    ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    : 'google-chrome');
const ROOT = new URL('.', import.meta.url).pathname;
const DIST = path.join(ROOT, 'dist');

const render = (cv, updated) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${cv.name} — CV</title>
<style>
  :root {
    --ink: #1a1f24;
    --muted: #5a6672;
    --accent: #0b5d3b;
    --rule: #d8dde2;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body {
    font-family: "Helvetica Neue", Arial, sans-serif;
    color: var(--ink);
    font-size: 10.5pt;
    line-height: 1.45;
    max-width: 780px;
    margin: 0 auto;
    padding: 28px 32px;
    background: #fff;
  }
  @page { size: A4; margin: 14mm 16mm; }
  @media print { body { padding: 0; max-width: none; } }

  header h1 { font-size: 21pt; font-weight: 700; letter-spacing: -0.02em; }
  .tagline { font-size: 11.5pt; color: var(--muted); margin-top: 2px; }
  .contacts { margin-top: 6px; font-size: 9.5pt; color: var(--muted); }
  .contacts a { color: var(--accent); text-decoration: none; }
  .updated { margin-top: 16px; font-size: 8.5pt; color: var(--muted); }
  .target {
    margin-top: 10px; padding: 7px 10px; font-size: 9.5pt;
    background: #f2f7f4; border-left: 3px solid var(--accent); border-radius: 2px;
  }

  h2 {
    font-size: 10pt; text-transform: uppercase; letter-spacing: 0.09em;
    color: var(--accent); margin: 18px 0 8px;
    padding-bottom: 3px; border-bottom: 1px solid var(--rule);
  }
  h3 { font-size: 12.5pt; margin-top: 14px; color: var(--accent); letter-spacing: 0.01em; }
  .org-meta { color: var(--muted); font-weight: 400; font-size: 10pt; letter-spacing: 0; }
  .role { display: flex; justify-content: space-between; margin-top: 3px; font-size: 10.5pt; }
  .role .dates { color: var(--muted); white-space: nowrap; margin-left: 12px; }
  ul { margin: 5px 0 4px 18px; }
  li { margin-bottom: 3px; }
  p { margin-bottom: 6px; }
  .skills-line { margin-bottom: 4px; }
  .tech-tags { margin-top: 8px; display: flex; flex-wrap: wrap; gap: 4px 5px; }
  .tag {
    font-size: 8.5pt; color: var(--muted);
    background: #f0f2f4; border: 1px solid var(--rule);
    border-radius: 10px; padding: 1px 8px; white-space: nowrap;
  }
  .edu-item { display: flex; justify-content: space-between; margin-bottom: 4px; }
  .edu-item .dates { color: var(--muted); white-space: nowrap; margin-left: 12px; }
  .avoid-break { break-inside: avoid; }

  .pdf-btn {
    position: fixed; top: 16px; right: 16px;
    background: var(--accent); color: #fff;
    padding: 8px 14px; border-radius: 6px;
    font-size: 10pt; text-decoration: none;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  }
  .pdf-btn:hover { background: #0d6e46; }
  .print-only { display: none; }
  @media print {
    .pdf-btn { display: none; }
    .print-only { display: inline; }
  }
</style>
</head>
<body>

<a class="pdf-btn" href="./${cv.outputBasename}.pdf" download>Download PDF</a>

<header>
  <h1>${cv.name}</h1>
  <div class="tagline">${cv.tagline}</div>
  <div class="contacts">${cv.contacts.join(' ·\n    ')}</div>
  ${cv.target ? `<div class="target">${cv.target}</div>` : ''}
</header>

<section>
  <h2>Summary</h2>
  ${cv.summary.map((p) => `<p>${p}</p>`).join('\n  ')}
</section>

<section>
  <h2>Experience</h2>
${cv.experience
  .map(
    (job) => `
  <div class="avoid-break">
    <h3>${job.company} <span class="org-meta">— ${job.meta}</span></h3>
${job.roles
  .map(
    (r) =>
      `    <div class="role"><b>${r.title}</b><span class="dates">${r.dates}</span></div>` +
      (r.bullets
        ? `\n    <ul>\n${r.bullets.map((b) => `      <li>${b}</li>`).join('\n')}\n    </ul>`
        : ''),
  )
  .join('\n')}${
      job.bullets
        ? `\n    <ul>\n${job.bullets.map((b) => `      <li>${b}</li>`).join('\n')}\n    </ul>`
        : ''
    }
  </div>`,
  )
  .join('\n')}
</section>

<section class="avoid-break">
  <h2>Skills</h2>
  ${cv.skills.map((s) => `<div class="skills-line"><b>${s.label}:</b> ${s.items}</div>`).join('\n  ')}${
    cv.tech?.length
      ? `\n  <div class="tech-tags">${cv.tech.map((t) => `<span class="tag">${t}</span>`).join('')}</div>`
      : ''
  }
</section>

<section class="avoid-break">
  <h2>Education</h2>
  ${cv.education
    .map(
      (e) =>
        `<div class="edu-item"><span><b>${e.degree}</b> — ${e.org}</span><span class="dates">${e.dates}</span></div>`,
    )
    .join('\n  ')}
</section>

${
  cv.certifications?.length
    ? `<section class="avoid-break">
  <h2>Certifications</h2>
  ${cv.certifications
    .map(
      (c) =>
        `<div class="edu-item"><span><b>${c.name}</b> — ${c.org}</span><span class="dates">${c.dates}</span></div>`,
    )
    .join('\n  ')}
</section>

`
    : ''
}<section class="avoid-break">
  <h2>Languages</h2>
  <p>${cv.languages}</p>
</section>

<footer class="updated">CV Updated: ${updated}${
  cv.siteUrl
    ? `<span class="print-only"> · Latest version: <a href="${cv.siteUrl}">${cv.siteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}</a></span>`
    : ''
}</footer>

<script data-goatcounter="https://danyfedorov.goatcounter.com/count"
        async src="//gc.zgo.at/count.js"></script>
<script>
  // Skip the headless file:// pass that renders the PDF.
  if (location.protocol.startsWith('http')) {
    document.querySelectorAll('a[href$=".pdf"]').forEach((a) =>
      a.addEventListener('click', () =>
        window.goatcounter?.count({ path: 'pdf-download', title: 'PDF download', event: true }),
      ),
    );
    new IntersectionObserver((entries, obs) => {
      if (entries[0].isIntersecting) {
        window.goatcounter?.count({ path: 'scrolled-to-bottom', event: true });
        obs.disconnect();
      }
    }).observe(document.querySelector('footer'));
  }
</script>

</body>
</html>
`;

const requested = process.argv.slice(2);
const variants = (await readdir(path.join(ROOT, 'data')))
  .filter((f) => f.endsWith('.mjs'))
  .map((f) => f.replace(/\.mjs$/, ''))
  .filter((v) => requested.length === 0 || requested.includes(v));

if (variants.length === 0) {
  console.error(`No matching variants. Available: check data/*.mjs`);
  process.exit(1);
}

await mkdir(DIST, { recursive: true });

const now = new Date();
const updated = `${now.toLocaleString('en-US', { month: 'short' })} ${now.getFullYear()}`;
const stamp = updated.replace(' ', '_');

for (const variant of variants) {
  const { cv } = await import(`./data/${variant}.mjs`);
  const htmlPath = path.join(DIST, `${variant}.html`);
  const pdfPath = path.join(DIST, `${cv.outputBasename}_${stamp}.pdf`);
  await writeFile(htmlPath, render(cv, updated));
  execFileSync(CHROME, [
    '--headless',
    '--disable-gpu',
    '--no-pdf-header-footer',
    `--print-to-pdf=${pdfPath}`,
    `file://${htmlPath}`,
  ]);
  // Stable alias so shared links survive month-stamp changes.
  const aliasPath = path.join(DIST, `${cv.outputBasename}.pdf`);
  await copyFile(pdfPath, aliasPath);
  console.log(
    `${variant}: ${path.relative(ROOT, htmlPath)} → ${path.relative(ROOT, pdfPath)} (+ ${path.relative(ROOT, aliasPath)})`,
  );
}
