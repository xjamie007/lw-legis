/**
 * scripts/fetch-fonts.mjs
 *
 * Holt Literata und Atkinson Hyperlegible Next einmalig als WOFF2 ins
 * Projekt (public/fonts) und erzeugt src/styles/fonts.css.
 *
 * Warum ueberhaupt ein Skript und kein <link> auf fonts.googleapis.com:
 * Ein solcher Link uebertraegt bei jedem Seitenaufruf die IP-Adresse des
 * Besuchers an Google in die USA. Das ist in der EU abgemahnt worden.
 * Die Schriften werden deshalb heruntergeladen, ins Repository gelegt und
 * vom eigenen Server ausgeliefert.
 *
 * Beide Schriften stehen unter der SIL Open Font License 1.1, die das
 * Selbsthosten ausdruecklich erlaubt. Die Lizenztexte liegen unter
 * public/fonts/OFL-*.txt.
 *
 * Aufruf:  npm run fonts
 * Das Ergebnis wird mit committet — der Build braucht danach kein Netz.
 */
import { mkdir, writeFile, readFile, access } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = join(ROOT, 'public', 'fonts');
const CSS_OUT = join(ROOT, 'src', 'styles', 'fonts.css');

// Ein moderner User-Agent ist noetig, sonst liefert Google TTF statt WOFF2.
const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

/**
 * Nur diese beiden Subsets werden geholt.
 * latin      — deckt Franzoesisch, Englisch und Deutsch ab
 * latin-ext  — deckt die restlichen Diakritika ab, u. a. fuer
 *              Letzebuergesch und eingedeutschte Eigennamen
 * Kyrillisch, Griechisch und Vietnamesisch werden bewusst weggelassen.
 */
const WANTED_SUBSETS = new Set(['latin', 'latin-ext']);

const FAMILIES = [
  {
    query: 'Literata:ital,opsz,wght@0,7..72,400..700;1,7..72,400..700',
    family: 'Literata',
    slug: 'literata',
    licence: 'https://raw.githubusercontent.com/googlefonts/literata/main/OFL.txt',
  },
  {
    query: 'Atkinson+Hyperlegible+Next:wght@400..700',
    family: 'Atkinson Hyperlegible Next',
    slug: 'atkinson-hyperlegible-next',
    licence:
      'https://raw.githubusercontent.com/googlefonts/atkinson-hyperlegible/main/OFL.txt',
  },
];

/** Zerlegt die von Google gelieferte CSS in einzelne @font-face-Bloecke. */
function parseFontFaces(css) {
  const faces = [];
  const blockRe = /\/\*\s*([a-z-]+)\s*\*\/\s*@font-face\s*\{([^}]+)\}/g;
  let m;
  while ((m = blockRe.exec(css)) !== null) {
    const subset = m[1];
    const body = m[2];
    const pick = (prop) => {
      const r = new RegExp(`${prop}:\\s*([^;]+);`).exec(body);
      return r ? r[1].trim() : null;
    };
    const srcRaw = pick('src');
    const url = srcRaw ? /url\(([^)]+)\)/.exec(srcRaw)?.[1] : null;
    if (!url) continue;
    faces.push({
      subset,
      style: pick('font-style') ?? 'normal',
      weight: pick('font-weight') ?? '400',
      unicodeRange: pick('unicode-range'),
      url,
    });
  }
  return faces;
}

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const cssParts = [
    '/*',
    ' * src/styles/fonts.css — ERZEUGT von scripts/fetch-fonts.mjs.',
    ' * Nicht von Hand aendern. Neu erzeugen mit: npm run fonts',
    ' *',
    ' * Literata und Atkinson Hyperlegible Next, beide SIL Open Font License 1.1.',
    ' * Die Dateien liegen unter public/fonts und werden vom eigenen Server',
    ' * ausgeliefert — kein Aufruf an fonts.googleapis.com, keine',
    ' * IP-Uebertragung des Besuchers an Dritte.',
    ' */',
    '',
  ];

  let downloaded = 0;
  let reused = 0;

  for (const fam of FAMILIES) {
    const url = `https://fonts.googleapis.com/css2?family=${fam.query}&display=swap`;
    const res = await fetch(url, { headers: { 'User-Agent': UA } });
    if (!res.ok) throw new Error(`Google Fonts antwortete ${res.status} fuer ${fam.family}`);
    const css = await res.text();
    const faces = parseFontFaces(css).filter((f) => WANTED_SUBSETS.has(f.subset));

    if (faces.length === 0) {
      throw new Error(`Keine passenden Subsets fuer ${fam.family} gefunden.`);
    }

    for (const face of faces) {
      const italic = face.style === 'italic';
      const name = `${fam.slug}-${italic ? 'italic' : 'roman'}-${face.subset}.woff2`;
      const dest = join(OUT_DIR, name);

      if (await exists(dest)) {
        reused++;
      } else {
        const bin = await fetch(face.url, { headers: { 'User-Agent': UA } });
        if (!bin.ok) throw new Error(`Download fehlgeschlagen: ${face.url}`);
        await writeFile(dest, Buffer.from(await bin.arrayBuffer()));
        downloaded++;
      }

      const size = (await readFile(dest)).length;
      cssParts.push(
        `/* ${fam.family} — ${face.style}, ${face.subset}, ${(size / 1024).toFixed(1)} kB */`,
        '@font-face {',
        `  font-family: '${fam.family}';`,
        `  font-style: ${face.style};`,
        `  font-weight: ${face.weight};`,
        '  font-display: swap;',
        `  src: url('/fonts/${name}') format('woff2');`,
        face.unicodeRange ? `  unicode-range: ${face.unicodeRange};` : '',
        '}',
        '',
      );
    }

    // Lizenztext mit ablegen — Pflicht der OFL.
    const licPath = join(OUT_DIR, `OFL-${fam.slug}.txt`);
    if (!(await exists(licPath))) {
      try {
        const lic = await fetch(fam.licence);
        if (lic.ok) await writeFile(licPath, await lic.text());
      } catch {
        console.warn(`  Hinweis: Lizenztext fuer ${fam.family} konnte nicht geholt werden.`);
      }
    }
  }

  await writeFile(CSS_OUT, cssParts.filter((l) => l !== '').join('\n') + '\n', 'utf8');
  console.log(
    `Schriften fertig: ${downloaded} geladen, ${reused} bereits vorhanden.\n` +
      `  Dateien:  public/fonts/\n  CSS:      src/styles/fonts.css`,
  );
}

main().catch((err) => {
  console.error('\nSchriften konnten nicht geholt werden:', err.message);
  console.error('Die vorhandenen Dateien unter public/fonts bleiben unveraendert.');
  process.exit(1);
});
