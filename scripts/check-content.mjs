/**
 * scripts/check-content.mjs — Die Build-Pruefung.
 *
 * Laeuft vor jedem Build und sagt im Klartext, was noch fehlt:
 *   - offene Schluessel je Sprache (vor allem Luxemburgisch)
 *   - Konstellationen, die nicht gebaut werden, und warum
 *   - Dokumente, die nicht gebaut werden, und warum
 *   - Title und Description ausserhalb der Laengengrenzen
 *   - offene Punkte, die einem Livegang entgegenstehen
 *
 * Die Pruefung BRICHT NICHT AB. Ein unfertiger Inhalt ist kein Fehler,
 * sondern der erwartete Zustand vor der Uebergabe — er wird uebersprungen
 * und aufgelistet. Abgebrochen wird nur, wenn der Schnappschuss selbst
 * kaputt ist, denn dann waere die gebaute Seite falsch.
 *
 * Mit --strict bricht sie auch bei offenen Inhalten ab. Das ist fuer den
 * Tag gedacht, an dem die Seite live gehen soll.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const STRICT = process.argv.includes('--strict');

const LANGS = ['fr', 'de', 'en', 'lb'];
const LANG_DEFAUT = 'fr';
const SEUIL_MOTS = 400;

const lire = async (p) => JSON.parse(await readFile(join(ROOT, p), 'utf8'));

const snapshot = await lire('content/snapshot.json');
const tables = Object.fromEntries(
  await Promise.all(LANGS.map(async (l) => [l, await lire(`src/i18n/${l}.json`)])),
);

const estOuvert = (v) =>
  v === undefined || v === null || String(v).trim() === '' || /^\[[A-Z]{2} FEHLT\]$/.test(String(v).trim());

const aValeur = (champ, l) => {
  const v = champ?.[l];
  return typeof v === 'string' && v.trim() !== '';
};

const compterMots = (...xs) =>
  xs
    .filter((x) => typeof x === 'string')
    .join(' ')
    .replace(/<[^>]*>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;

const rapport = [];
const dit = (s = '') => {
  rapport.push(s);
  console.log(s);
};

dit('');
dit('════════════════════════════════════════════════════════════════');
dit('  LW LEGIS — Inhaltspruefung vor dem Build');
dit(`  ${new Date().toLocaleString('de-DE', { timeZone: 'Europe/Luxembourg' })}`);
dit('════════════════════════════════════════════════════════════════');

// ---------------------------------------------------------------------------
// 1. Oberflaechen-Uebersetzungen
// ---------------------------------------------------------------------------
dit('');
dit('1. OBERFLÄCHENTEXTE');
const reference = Object.keys(tables[LANG_DEFAUT]);
const ouvertsParLangue = {};
for (const l of LANGS) {
  const manquants = reference.filter((c) => estOuvert(tables[l]?.[c]));
  const surplus = Object.keys(tables[l] ?? {}).filter((c) => !reference.includes(c));
  ouvertsParLangue[l] = manquants;
  const etat = manquants.length === 0 ? 'vollständig' : `${manquants.length} von ${reference.length} offen`;
  dit(`   ${l}: ${etat}`);
  if (surplus.length > 0) {
    dit(`      ! Schlüssel, die es in fr nicht gibt: ${surplus.join(', ')}`);
  }
}

// ---------------------------------------------------------------------------
// 2. Welche Sprachfassungen werden gebaut
// ---------------------------------------------------------------------------
dit('');
dit('2. SPRACHFASSUNGEN');
const languesPretes = LANGS.filter((l) => ouvertsParLangue[l].length === 0);
const languesOuvertes = LANGS.filter((l) => !languesPretes.includes(l));
dit(`   gebaut:          ${languesPretes.join(', ') || '—'}`);
dit(`   nicht gebaut:    ${languesOuvertes.join(', ') || '—'}`);
if (languesOuvertes.length > 0) {
  dit('   Begründung: eine halb übersetzte Fassung wird nicht ausgeliefert.');
  dit('   Sie erscheint weder in der Sitemap noch in den hreflang-Angaben.');
}

// ---------------------------------------------------------------------------
// 3. Situationsmatrix
// ---------------------------------------------------------------------------
dit('');
dit('3. SITUATIONSMATRIX');
const REQUIS_SIT = ['worum', 'cadre', 'notre_role', 'vos_pieces'];
const sitOuvertes = [];
let sitConstruites = 0;
for (const s of snapshot.situations) {
  for (const l of languesPretes) {
    const champsManquants = REQUIS_SIT.filter((c) => !aValeur(s[c], l));
    const titreOk = aValeur(s.titre, l);
    const mots = compterMots(...REQUIS_SIT.map((c) => s[c]?.[l]));
    const publie = s.statut === 'publie';
    if (publie && titreOk && champsManquants.length === 0 && mots >= SEUIL_MOTS) {
      sitConstruites++;
    } else {
      const raisons = [];
      if (!publie) raisons.push('Status Entwurf');
      if (!titreOk) raisons.push('Titel fehlt');
      if (champsManquants.length > 0) raisons.push(`Abschnitte fehlen: ${champsManquants.join(', ')}`);
      else if (mots < SEUIL_MOTS) raisons.push(`nur ${mots} statt ${SEUIL_MOTS} Wörter`);
      sitOuvertes.push({ id: s.id, lang: l, raisons });
    }
  }
}
dit(`   gebaut:          ${sitConstruites}`);
dit(`   übersprungen:    ${sitOuvertes.length}`);
if (sitOuvertes.length > 0) {
  const parRaison = {};
  for (const o of sitOuvertes) {
    const k = o.raisons.join('; ');
    parRaison[k] = (parRaison[k] ?? 0) + 1;
  }
  for (const [k, n] of Object.entries(parRaison)) dit(`      ${n}×  ${k}`);
  dit('   Diese Konstellationen stehen nicht in der Sitemap und werden nirgends');
  dit('   verlinkt. Im Auswahlmenü führen sie auf das zugehörige Tätigkeitsgebiet.');
}

// ---------------------------------------------------------------------------
// 4. Dokumente
// ---------------------------------------------------------------------------
dit('');
dit('4. FONDS DOCUMENTAIRE');
const docOuverts = [];
let docConstruits = 0;
for (const p of snapshot.publications) {
  for (const l of languesPretes) {
    const raisons = [];
    if (p.statut !== 'publie') raisons.push('Status Entwurf');
    if (!p.etat_du_droit) raisons.push('Rechtsstand fehlt (Pflichtfeld)');
    if (!aValeur(p.titre, l)) raisons.push('Titel fehlt');
    if (!aValeur(p.resume, l)) raisons.push('Kurzfassung fehlt');
    if (!aValeur(p.corps, l)) raisons.push('Volltext fehlt');
    if (raisons.length === 0) docConstruits++;
    else docOuverts.push({ id: p.id, lang: l, raisons });
  }
}
dit(`   gebaut:          ${docConstruits}`);
dit(`   übersprungen:    ${docOuverts.length}`);
if (docOuverts.length > 0) {
  const parRaison = {};
  for (const o of docOuverts) {
    for (const r of o.raisons) parRaison[r] = (parRaison[r] ?? 0) + 1;
  }
  for (const [k, n] of Object.entries(parRaison)) dit(`      ${n}×  ${k}`);
}

// ---------------------------------------------------------------------------
// 5. Titel und Beschreibungen
// ---------------------------------------------------------------------------
dit('');
dit('5. TITLE UND DESCRIPTION');
const L = snapshot.seo_limites;
const fautesSeo = [];
for (const [id, m] of Object.entries(snapshot.seo)) {
  if (m.noindex) continue;
  for (const l of languesPretes) {
    const t = m.titre?.[l];
    const d = m.description?.[l];
    if (!t || !d) {
      fautesSeo.push(`${id} (${l}): fehlt`);
      continue;
    }
    if (t.length < L.titre.min || t.length > L.titre.max)
      fautesSeo.push(`${id} (${l}): Title ${t.length} Zeichen, Ziel ${L.titre.min}–${L.titre.max}`);
    if (d.length < L.description.min || d.length > L.description.max)
      fautesSeo.push(
        `${id} (${l}): Description ${d.length} Zeichen, Ziel ${L.description.min}–${L.description.max}`,
      );
  }
}
if (fautesSeo.length === 0) dit('   alle im Zielbereich');
else for (const f of fautesSeo) dit(`      ! ${f}`);

// ---------------------------------------------------------------------------
// 6. Offene Punkte
// ---------------------------------------------------------------------------
dit('');
dit('6. OFFENE PUNKTE');
const ouvertes = Object.entries(snapshot.ouvertes);
const bloquants = ouvertes.filter(([, o]) => o.bloquant);
dit(`   insgesamt:       ${ouvertes.length}`);
dit(`   davon blockierend: ${bloquants.length}`);
const parDomaine = {};
for (const [, o] of ouvertes) parDomaine[o.domaine] = (parDomaine[o.domaine] ?? 0) + 1;
for (const [d, n] of Object.entries(parDomaine).sort((a, b) => b[1] - a[1])) {
  dit(`      ${String(n).padStart(2)}  ${d}`);
}

// ---------------------------------------------------------------------------
// 7. Verlässlichkeit des Schnappschusses
// ---------------------------------------------------------------------------
dit('');
dit('7. SCHNAPPSCHUSS');
const erreursDures = [];
for (const cle of [
  'settings',
  'avocat',
  'familles',
  'situations',
  'publications',
  'pages',
  'seo',
  'ouvertes',
]) {
  if (!snapshot[cle]) erreursDures.push(`Abschnitt "${cle}" fehlt im Schnappschuss`);
}
// Adressen dürfen sich nicht doppeln.
const adresses = new Map();
for (const p of snapshot.publications) {
  for (const l of LANGS) {
    const s = p.slug?.[l];
    if (!s) continue;
    const k = `${l}/${s}`;
    if (adresses.has(k)) erreursDures.push(`Doppelte Dokumentadresse ${k}: ${adresses.get(k)} und ${p.id}`);
    adresses.set(k, p.id);
  }
}
// NAP-Konsistenz: die Adresse muss mit der Einzeiler-Fassung übereinstimmen.
const a = snapshot.settings.adresse;
const attendu = `${a.rue}, ${a.code_postal} ${a.ville}`;
if (a.une_ligne !== attendu) {
  erreursDures.push(`NAP: une_ligne "${a.une_ligne}" weicht ab von "${attendu}"`);
}
if (snapshot.settings.courriel !== 'contact@cabinet-avocats-lorang.com') {
  erreursDures.push(
    `E-Mail-Adresse weicht ab: "${snapshot.settings.courriel}". Die alte Seite nannte fälschlich "cabinets-" mit s.`,
  );
}
dit(`   erzeugt:         ${snapshot.meta?.genere_le ?? 'unbekannt'}`);
dit(`   Quelle:          ${snapshot.meta?.source ?? 'unbekannt'}`);
if (erreursDures.length === 0) dit('   in Ordnung');
else for (const e of erreursDures) dit(`      FEHLER: ${e}`);

// ---------------------------------------------------------------------------
dit('');
dit('════════════════════════════════════════════════════════════════');
const resume = [
  `${languesPretes.length} von ${LANGS.length} Sprachfassungen`,
  `${sitConstruites} von ${snapshot.situations.length * languesPretes.length} Konstellationen`,
  `${docConstruits} von ${snapshot.publications.length * languesPretes.length} Dokumenten`,
  `${bloquants.length} blockierende offene Punkte`,
];
dit(`  ${resume.join('  ·  ')}`);
dit('════════════════════════════════════════════════════════════════');
dit('');

await mkdir(join(ROOT, 'docs'), { recursive: true });
await writeFile(join(ROOT, 'docs', 'build-bericht.txt'), rapport.join('\n') + '\n', 'utf8');

if (erreursDures.length > 0) {
  console.error('Der Schnappschuss ist fehlerhaft. Der Build wird abgebrochen.');
  process.exit(1);
}
if (STRICT && (languesOuvertes.length > 0 || bloquants.length > 0)) {
  console.error('--strict: es stehen noch Punkte offen. Für den Livegang zuerst OFFENE-PUNKTE.md abarbeiten.');
  process.exit(1);
}
