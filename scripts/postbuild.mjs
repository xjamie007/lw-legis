/**
 * scripts/postbuild.mjs — Nach dem Build.
 *
 * Misst das, was ein Besucher tatsaechlich herunterlaedt: fuer jede
 * gebaute Seite werden die von IHR eingebundenen Skripte und Stile
 * zusammengezaehlt, komprimiert. Die Summe aller Dateien im Ausgabeordner
 * waere die falsche Zahl — dort liegen auch Dateien, die keine
 * oeffentliche Seite anfordert (etwa die React-Laufzeit, die nur der
 * Redaktionsbereich braucht).
 *
 * Schreibt ausserdem `_headers` und `_redirects` fuer das Hosting.
 */
import { readdir, writeFile, readFile } from 'node:fs/promises';
import { join, dirname, extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');

/** Budget je Seite fuer ausgeliefertes JavaScript, komprimiert. */
const BUDGET_JS_GZIP = 100 * 1024;

async function parcourir(dir, acc = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) await parcourir(p, acc);
    else acc.push(p);
  }
  return acc;
}

const fichiers = await parcourir(DIST);
const pages = fichiers.filter((f) => f.endsWith('.html'));

/** Groesse einer Datei, komprimiert — mit Zwischenspeicher. */
const tailles = new Map();
async function gzip(chemin) {
  if (tailles.has(chemin)) return tailles.get(chemin);
  let n = 0;
  try {
    n = gzipSync(await readFile(chemin)).length;
  } catch {
    n = 0;
  }
  tailles.set(chemin, n);
  return n;
}

const mesures = [];
for (const page of pages) {
  const html = await readFile(page, 'utf8');
  const refs = [...html.matchAll(/(?:src|href)="(\/_astro\/[^"]+)"/g)].map((m) => m[1]);
  let js = 0;
  let css = 0;
  for (const r of new Set(refs)) {
    const abs = join(DIST, r.replace(/^\//, ''));
    const n = await gzip(abs);
    if (extname(r) === '.js') js += n;
    else if (extname(r) === '.css') css += n;
  }
  // Astro bettet kleine Bundles direkt ins HTML ein. Wer das nicht
  // mitzaehlt, misst zu wenig — genau diese Skripte sind es, die der
  // Besucher am haeufigsten bekommt.
  const scriptsEnLigne = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)]
    .filter((m) => !/type="application\/ld\+json"/.test(m[0]))
    .map((m) => m[1])
    .join('');
  if (scriptsEnLigne.trim()) js += gzipSync(Buffer.from(scriptsEnLigne)).length;

  const stylesEnLigne = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)]
    .map((m) => m[1])
    .join('');
  if (stylesEnLigne.trim()) css += gzipSync(Buffer.from(stylesEnLigne)).length;

  mesures.push({
    chemin: '/' + relative(DIST, page).replace(/index\.html$/, '').replace(/\\/g, '/'),
    js,
    css,
    html: gzipSync(Buffer.from(html)).length,
  });
}

/**
 * Welche gebauten Dateien fordert keine oeffentliche Seite an?
 * Das ist normalerweise die React-Laufzeit: sie wird nur vom
 * Redaktionsbereich gebraucht und darf deshalb auf keiner oeffentlichen
 * Seite auftauchen. Taucht hier etwas ANDERES auf, stimmt etwas nicht.
 */
const referencees = new Set();
for (const page of pages) {
  const html = await readFile(page, 'utf8');
  for (const m of html.matchAll(/(?:src|href)="(\/_astro\/[^"]+)"/g)) referencees.add(m[1]);
}
const orphelins = fichiers
  .filter((f) => f.includes('_astro') && ['.js', '.css'].includes(extname(f)))
  .map((f) => '/' + relative(DIST, f).replace(/\\/g, '/'))
  .filter((n) => !referencees.has(n));

const pire = mesures.reduce((a, b) => (b.js > a.js ? b : a), mesures[0]);
const maxCss = mesures.reduce((a, b) => (b.css > a.css ? b : a), mesures[0]);
const maxHtml = mesures.reduce((a, b) => (b.html > a.html ? b : a), mesures[0]);

// --- Kopfzeilen fuer das Hosting -------------------------------------------
// Netlify und Cloudflare Pages lesen beide `_headers`.
const headers = `# Erzeugt von scripts/postbuild.mjs

/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: SAMEORIGIN
  Permissions-Policy: geolocation=(), microphone=(), camera=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains

# Schriften sind unveränderlich und dürfen lange liegenbleiben.
/fonts/*
  Cache-Control: public, max-age=31536000, immutable

# Vom Build erzeugte Dateien tragen einen Hash im Namen.
/_astro/*
  Cache-Control: public, max-age=31536000, immutable

# Der Redaktionsbereich wird nicht indexiert — zusätzlich zu noindex im
# Dokument und dem Ausschluss in robots.txt. Ein noindex-Kopf wirkt auch
# dort, wo ein Crawler das Dokument gar nicht erst liest.
/admin
  X-Robots-Tag: noindex, nofollow
  Cache-Control: no-store
/admin/*
  X-Robots-Tag: noindex, nofollow
  Cache-Control: no-store

# PDF-Dokumente vom eigenen Server, mit korrektem Typ.
/documents/*
  Content-Type: application/pdf
  Cache-Control: public, max-age=86400
`;
await writeFile(join(DIST, '_headers'), headers, 'utf8');

/**
 * Die Adressen der alten Website (cabinet-avocats-lorang.com/*.php) fuehren
 * mit 301 auf die neue Seite. So bleiben Lesezeichen, Links von anderen
 * Seiten und die Positionen bei Google erhalten.
 */
const snap = JSON.parse(await readFile(join(DIST, '..', 'content', 'snapshot.json'), 'utf8'));
const { ACTIVITES } = await import('../content/source/activites.mjs');
const { DOSSIERS, CONFERENCES } = await import('../content/source/publications.mjs');
const SEG = {
  fr: { activites: 'activites', dossiers: 'dossiers-thematiques' },
  en: { activites: 'practice-areas', dossiers: 'thematic-files' },
};
const anciennes = [
  ['index.php', '/fr/'],
  ['index-en.php', '/en/'],
  ['cabinet-avocats-lorang-luxembourg.php', '/fr/avocats/'],
  ['law-firm-lorang-luxembourg.php', '/en/lawyers/'],
  ['activites-avocat-luxembourg.php', '/fr/activites/'],
  ['activities-lawyer-luxembourg.php', '/en/practice-areas/'],
  ['cabinet-avocats-dossiers-thematiques-luxembourg.php', '/fr/dossiers-thematiques/'],
  ['law-firm-thematic-files-luxembourg.php', '/en/thematic-files/'],
  ['conferences-avocat-avocat-lorang-luxembourg.php', '/fr/conferences/'],
  ['conferences-avocat-lorang-luxembourg.php', '/fr/conferences/'],
  ['cabinet-avocats-luxembourg-partenaires.php', '/fr/partenaires/'],
  ['law-firm-luxembourg-partners.php', '/en/partners/'],
  ['contact-cabinet-avocats-luxembourg.php', '/fr/contact/'],
  ['contact-law-firm-luxembourg.php', '/en/contact/'],
  ['conditions-generales.php', '/fr/conditions-generales/'],
  ['general-conditions.php', '/en/terms/'],
  ['mentions-legales.php', '/fr/mentions-legales/'],
  // Doppelte oder falsch geschriebene Adressen der alten Seite
  ['avocat-domicialiation-societe-luxembourg.php', '/fr/activites/'],
];
// Taetigkeiten und Dossiers: alte Adresse je Sprache -> heutige Adresse.
// Die heutige Adresse kommt aus dem Schnappschuss (dort koennte die
// Kanzlei einen Slug geaendert haben), die alte aus den Quelldateien.
const nachId = (liste) => Object.fromEntries(liste.map((x) => [x.id, x]));
const fam = nachId(snap.familles);
const pub = nachId(snap.publications);
for (const [quelle, aktuell, art] of [
  [ACTIVITES, fam, 'activites'],
  [DOSSIERS, pub, 'dossiers'],
]) {
  for (const x of quelle) {
    for (const l of ['fr', 'en']) {
      const alt = x.ancienne_url?.[l];
      const slug = aktuell[x.id]?.slug?.[l];
      if (alt && slug) anciennes.push([alt, `/${l}/${SEG[l][art]}/${slug}/`]);
      else if (alt) anciennes.push([alt, `/${l}/${SEG[l][art]}/`]);
    }
  }
}
// Konferenz-PDFs: alter Pfad -> neue Datei.
for (const c of CONFERENCES) {
  if (typeof c.ancienne_url === 'string' && c.ancienne_url.endsWith('.pdf') && c.pdf?.chemin) {
    anciennes.push([c.ancienne_url, c.pdf.chemin]);
  }
}
const vus = new Set();
const lignesAnciennes = anciennes
  .filter(([alt]) => !vus.has(alt) && vus.add(alt))
  .map(([alt, neu]) => `/${encodeURI(alt).replace(/^\/+/, '')}  ${neu}  301`)
  .join('\n');

const redirects = `# Erzeugt von scripts/postbuild.mjs

# Die Wurzel führt auf die Standardsprache. Eine echte Weiterleitung ist
# besser als das meta-refresh in index.html; dieses bleibt als Rückfall
# für Hosts, die keine Weiterleitungsregeln kennen.
/            /fr/    302

# Der Redaktionsbereich ist eine Anwendung mit eigenen Unterpfaden.
/admin/*     /admin/index.html   200

# Adressen der alten Website
${lignesAnciennes}
`;
await writeFile(join(DIST, '_redirects'), redirects, 'utf8');

const ko = (n) => `${(n / 1024).toFixed(1)} kB`;
console.log('');
console.log('Build fertig.');
console.log(`   HTML-Seiten:              ${pages.length}`);
console.log(`   JavaScript, schlimmste Seite:  ${ko(pire.js)}  (${pire.chemin})`);
console.log(`   CSS, schlimmste Seite:         ${ko(maxCss.css)}  (${maxCss.chemin})`);
console.log(`   HTML, schlimmste Seite:        ${ko(maxHtml.html)}  (${maxHtml.chemin})`);
console.log(`   alle Angaben komprimiert (gzip)`);
console.log(`   _headers und _redirects geschrieben`);
if (orphelins.length > 0) {
  console.log('');
  console.log('   Nicht von öffentlichen Seiten angefordert (nur /admin braucht das):');
  for (const o of orphelins) {
    const n = await gzip(join(DIST, o.replace(/^\//, '')));
    console.log(`      ${o}  ${ko(n)}`);
  }
}

if (pire.js > BUDGET_JS_GZIP) {
  console.error(`\n   JavaScript-Budget überschritten: ${ko(pire.js)} > ${ko(BUDGET_JS_GZIP)}`);
  process.exit(1);
}
console.log(`   JavaScript-Budget:        ${ko(pire.js)} von ${ko(BUDGET_JS_GZIP)}`);
console.log('');
