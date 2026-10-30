/**
 * scripts/check-links.mjs
 *
 * Prueft das gebaute `dist/` auf tote Links und tote Anker — intern.
 * Externe Adressen werden nicht abgefragt: das waere langsam, unzuverlaessig
 * und wuerde den Build von fremden Servern abhaengig machen.
 *
 * Geprueft wird ausserdem, was auf dieser Seite besonders leicht schiefgeht:
 *   - hreflang zeigt nur auf Seiten, die es wirklich gibt
 *   - jede Seite hat genau eine <h1>
 *   - die Ueberschriftenhierarchie ueberspringt keine Ebene
 *   - jedes Bild hat ein alt-Attribut
 *   - /admin steht nicht in der Sitemap
 *   - die Anschrift steht ueberall gleich (NAP)
 *
 * Aufruf:  npm run check:links   (laeuft auch im Build)
 */
import { readdir, readFile } from 'node:fs/promises';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');

/** Die Anschrift, exakt so, wie sie ueberall stehen muss. */
const ADRESSE = '41, avenue du X Septembre';
const COURRIEL = 'contact@cabinet-avocats-lorang.com';

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

/** Welche Adressen gibt es? */
/**
 * Unterpfad der Auslieferung — '' in der Wurzel, sonst z. B. '/lw-legis'.
 * Im gebauten HTML tragen alle internen Adressen diesen Praefix; `dist/`
 * selbst kennt ihn nicht. Beides muss hier zusammengefuehrt werden.
 */
const BASE = (process.env.PUBLIC_BASE_PATH || '/').replace(/\/+$/, '');

/**
 * Nimmt den Praefix wieder ab. Fehlt er, ist der Link kaputt — er zeigt
 * an der ausgelieferten Seite vorbei. Diese Pruefung ist der eigentliche
 * Zweck der Funktion: genau diesen Fehler macht man beim Umstellen.
 */
function sansBase(adresse) {
  if (!BASE) return adresse;
  if (adresse === BASE) return '/';
  if (adresse.startsWith(`${BASE}/`)) return adresse.slice(BASE.length);
  return null;
}

const adressesConnues = new Set();
for (const f of fichiers) {
  const rel = '/' + relative(DIST, f).replace(/\\/g, '/');
  adressesConnues.add(rel);
  if (rel.endsWith('/index.html')) {
    adressesConnues.add(rel.replace(/index\.html$/, ''));
  }
}
// Dateien im Auslieferungsordner, die nicht vom Build stammen.
for (const p of ['/fonts/', '/documents/', '/og/']) adressesConnues.add(p);

const problemes = [];
const signaler = (fichier, type, detail) =>
  problemes.push({ fichier: '/' + relative(DIST, fichier).replace(/\\/g, '/'), type, detail });

/** Anker je Seite. */
const ancresParPage = new Map();
for (const f of pages) {
  const html = await readFile(f, 'utf8');
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  const rel = '/' + relative(DIST, f).replace(/\\/g, '/').replace(/index\.html$/, '');
  ancresParPage.set(rel, ids);
}

for (const f of pages) {
  const brut = await readFile(f, 'utf8');
  // Inline-Skripte und -Stile herausnehmen, BEVOR nach Links gesucht wird.
  // Sonst haelt der Pruefer eine Zeichenkette wie href="${url}" im
  // JavaScript fuer einen Link und meldet ihn als tot.
  const html = brut
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '');
  const rel = '/' + relative(DIST, f).replace(/\\/g, '/').replace(/index\.html$/, '');

  // --- Links ---------------------------------------------------------------
  for (const m of html.matchAll(/<a\b[^>]*\shref="([^"]*)"/g)) {
    const href = m[1];
    if (!href || href.startsWith('#')) {
      // Anker auf derselben Seite
      if (href.length > 1) {
        const ids = ancresParPage.get(rel) ?? new Set();
        if (!ids.has(href.slice(1))) signaler(f, 'toter Anker', href);
      }
      continue;
    }
    if (/^(https?:|mailto:|tel:|data:)/i.test(href)) continue;
    if (!href.startsWith('/')) {
      signaler(f, 'relativer Link', href);
      continue;
    }

    const [avecRequete, ancre] = href.split('#');
    // `?domaine=…` waehlt im Formular vor; die Seite ist dieselbe.
    const cheminBrut = avecRequete.split('?')[0];
    const chemin = sansBase(cheminBrut);
    if (chemin === null) {
      signaler(f, 'Link ohne Auslieferungspräfix', href);
      continue;
    }
    const cible = chemin.endsWith('/') ? chemin : `${chemin}/`;
    const existe =
      adressesConnues.has(chemin) ||
      adressesConnues.has(cible) ||
      adressesConnues.has(`${cible}index.html`) ||
      fichiers.some((x) => '/' + relative(DIST, x).replace(/\\/g, '/') === chemin);

    if (!existe) {
      signaler(f, 'toter Link', href);
      continue;
    }
    if (ancre) {
      const ids = ancresParPage.get(cible);
      if (ids && !ids.has(ancre)) signaler(f, 'toter Anker', href);
    }
  }

  // --- hreflang ------------------------------------------------------------
  for (const m of html.matchAll(/<link\b[^>]*rel="alternate"[^>]*href="([^"]+)"/g)) {
    try {
      const u = new URL(m[1]);
      const cible = sansBase(u.pathname);
      if (cible === null) {
        signaler(f, 'hreflang ohne Auslieferungspräfix', u.pathname);
        continue;
      }
      if (!adressesConnues.has(cible) && !adressesConnues.has(`${cible}index.html`)) {
        signaler(f, 'hreflang zeigt ins Leere', cible);
      }
    } catch {
      signaler(f, 'hreflang unlesbar', m[1]);
    }
  }

  // --- Überschriften -------------------------------------------------------
  const h1 = [...html.matchAll(/<h1\b/g)].length;
  // Der Redaktionsbereich ist eine Anwendung, die erst im Browser
  // entsteht (client:only). Seine <h1> steht zur Laufzeit da, nicht im
  // ausgelieferten HTML — hier zu meckern waere falsch.
  const estAdmin = rel.startsWith('/admin');
  if (h1 === 0 && !estAdmin) signaler(f, 'keine <h1>', '');
  if (h1 > 1) signaler(f, 'mehr als eine <h1>', String(h1));

  const niveaux = [...html.matchAll(/<h([1-6])\b/g)].map((m) => Number(m[1]));
  let precedent = 0;
  for (const n of niveaux) {
    if (precedent !== 0 && n > precedent + 1) {
      signaler(f, 'Überschriftenebene übersprungen', `h${precedent} → h${n}`);
      break;
    }
    precedent = n;
  }

  // --- Bilder --------------------------------------------------------------
  for (const m of html.matchAll(/<img\b([^>]*)>/g)) {
    // `alt=""` schreibt Astro als blosses `alt`. Beides ist gueltig und
    // bedeutet dasselbe: ein Schmuckbild ohne Lesenamen. Der erste
    // Entwurf verlangte ein `=` und hat deshalb 53 korrekte Bilder
    // angemeckert.
    if (!/\salt(=|[\s>])/.test(m[1] + '>')) {
      signaler(f, 'Bild ohne alt', m[0].slice(0, 70));
    }
  }

  // --- NAP -----------------------------------------------------------------
  // Wo die Strasse steht, muss sie exakt so stehen.
  if (/avenue du X\s*Septembre/i.test(html) && !html.includes(ADRESSE)) {
    signaler(f, 'Anschrift weicht ab', 'erwartet: ' + ADRESSE);
  }
  if (/cabinets-avocats-lorang/.test(html)) {
    signaler(f, 'falsche E-Mail-Adresse', 'cabinets- statt cabinet-');
  }
}

// --- Sitemap ---------------------------------------------------------------
const sitemap = fichiers.find((f) => f.endsWith('sitemap.xml'));
if (!sitemap) {
  problemes.push({ fichier: '/sitemap.xml', type: 'fehlt', detail: '' });
} else {
  const xml = await readFile(sitemap, 'utf8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  for (const loc of locs) {
    const chemin = sansBase(new URL(loc).pathname);
    if (chemin === null) {
      signaler('sitemap.xml', 'Eintrag ohne Auslieferungspräfix', loc);
      continue;
    }
    if (!adressesConnues.has(chemin) && !adressesConnues.has(`${chemin}index.html`)) {
      problemes.push({ fichier: '/sitemap.xml', type: 'Adresse gibt es nicht', detail: chemin });
    }
  }
  if (/\/admin/.test(xml)) {
    problemes.push({ fichier: '/sitemap.xml', type: '/admin steht in der Sitemap', detail: '' });
  }
  console.log(`   sitemap.xml: ${locs.length} Adressen`);
}

// --- robots.txt ------------------------------------------------------------
const robots = fichiers.find((f) => f.endsWith('robots.txt'));
if (!robots) {
  problemes.push({ fichier: '/robots.txt', type: 'fehlt', detail: '' });
} else {
  const txt = await readFile(robots, 'utf8');
  // Eine Vorschau sperrt alles. Dann sind Adminausschluss und
  // Sitemap-Verweis nicht nur entbehrlich, sondern falsch.
  const allesGesperrt = /^\s*Disallow:\s*\/\s*$/m.test(txt);
  if (!allesGesperrt) {
    if (!new RegExp(`Disallow:\\s*${BASE}/admin`).test(txt)) {
      problemes.push({ fichier: '/robots.txt', type: '/admin nicht ausgeschlossen', detail: '' });
    }
    if (!/Sitemap:/.test(txt)) {
      problemes.push({ fichier: '/robots.txt', type: 'kein Sitemap-Verweis', detail: '' });
    }
  }
}

// --- Bericht ---------------------------------------------------------------
console.log(`   ${pages.length} Seiten geprüft`);
if (problemes.length === 0) {
  console.log('   keine toten Links, keine toten Anker, keine Auffälligkeiten.');
  process.exit(0);
}

const parType = {};
for (const p of problemes) (parType[p.type] ??= []).push(p);

console.error('');
console.error(`   ${problemes.length} Auffälligkeit(en):`);
for (const [type, liste] of Object.entries(parType)) {
  console.error(`\n   ${type} (${liste.length}×)`);
  for (const p of liste.slice(0, 12)) {
    console.error(`      ${p.fichier}  ${p.detail}`);
  }
  if (liste.length > 12) console.error(`      … und ${liste.length - 12} weitere`);
}
process.exit(1);
