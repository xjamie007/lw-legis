/**
 * scripts/check-content.mjs — Was wird gebaut, und was fehlt?
 *
 * Liest content/snapshot.json und die Oberflaechentexte und sagt in
 * Klartext, welche Seiten in welcher Sprache entstehen und welche nicht —
 * meist, weil die alte Website keine englische Fassung hatte. Das ist kein
 * Fehler, sondern eine Auskunft fuer die Kanzlei.
 *
 * Abgebrochen wird nur bei echten Fehlern im Schnappschuss: fehlende
 * Abschnitte, doppelte Adressen, abweichende Stammdaten.
 *
 * Aufruf:  node scripts/check-content.mjs
 * Ergebnis zusaetzlich in docs/build-bericht.txt
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const LANGS = ['fr', 'en'];

const lire = async (p) => JSON.parse(await readFile(join(ROOT, p), 'utf8'));
const snapshot = await lire('content/snapshot.json');
const ui = Object.fromEntries(await Promise.all(LANGS.map(async (l) => [l, await lire(`src/i18n/${l}.json`)])));

const a = (champ, l) => typeof champ?.[l] === 'string' && champ[l].trim() !== '';

const rapport = [];
const dit = (s = '') => {
  rapport.push(s);
  console.log(s);
};
const erreurs = [];

dit('');
dit('Inhalte — was gebaut wird');
dit('─────────────────────────');

// --- Oberflaeche ----------------------------------------------------------
for (const l of LANGS) {
  const fehlt = Object.keys(ui.fr).filter((k) => !ui[l][k]);
  if (fehlt.length) erreurs.push(`Oberfläche ${l.toUpperCase()}: ${fehlt.length} Texte fehlen (${fehlt.slice(0, 5).join(', ')})`);
}

// --- Taetigkeiten, Dossiers, Konferenzen, Anwaelte -----------------------
const zeile = (nom, liste, ok) => {
  dit(`${nom}`);
  for (const l of LANGS) {
    const gebaut = liste.filter((x) => ok(x, l));
    const fehlen = liste.filter((x) => !ok(x, l)).map((x) => x.id);
    dit(`   ${l.toUpperCase()}: ${gebaut.length} von ${liste.length}${fehlen.length ? `  — ohne: ${fehlen.join(', ')}` : ''}`);
  }
};

zeile('Tätigkeiten', snapshot.familles, (x, l) => a(x.slug, l) && a(x.terme, l) && a(x.texte, l));
const dossiers = snapshot.publications.filter((p) => p.type === 'dossier');
zeile('Dossiers', dossiers, (x, l) => x.statut === 'publie' && a(x.slug, l) && a(x.titre, l) && a(x.corps, l));
const conferences = snapshot.publications.filter((p) => p.type === 'conference');
const publiees = conferences.filter((c) => c.statut === 'publie');
dit('Konferenzen');
dit(`   ${publiees.length} von ${conferences.length} veröffentlicht (Entwürfe: ${conferences.filter((c) => c.statut !== 'publie').map((c) => c.id).join(', ') || 'keine'})`);
dit(`   englischer Titel: ${publiees.filter((c) => a(c.titre, 'en')).length} — die übrigen erscheinen auf der englischen Seite als französisch gekennzeichnet`);
zeile('Anwälte', snapshot.team, (x, l) => x.statut === 'publie' && a(x.bio, l));
zeile(
  'Rechtstexte',
  Object.entries(snapshot.legal).map(([id, x]) => ({ id, ...x })),
  (x, l) => a(x.corps, l),
);

// --- Schnappschuss ----------------------------------------------------------
for (const cle of ['settings', 'pages', 'familles', 'publications', 'team', 'legal', 'seo', 'bilder']) {
  if (!snapshot[cle]) erreurs.push(`Abschnitt "${cle}" fehlt im Schnappschuss`);
}
const adresses = new Map();
for (const x of [...snapshot.familles.map((f) => ({ ...f, t: 'a' })), ...dossiers.map((d) => ({ ...d, t: 'd' }))]) {
  for (const l of LANGS) {
    const s = x.slug?.[l];
    if (!s) continue;
    const k = `${x.t}/${l}/${s}`;
    if (adresses.has(k)) erreurs.push(`Doppelte Adresse ${k}: ${adresses.get(k)} und ${x.id}`);
    adresses.set(k, x.id);
  }
}
const ad = snapshot.settings.adresse;
if (ad.une_ligne !== `${ad.rue}, ${ad.code_postal} ${ad.ville}`) erreurs.push(`Adresse: une_ligne weicht von rue/code_postal/ville ab`);

dit('');
if (erreurs.length === 0) dit('Schnappschuss in Ordnung.');
else for (const e of erreurs) dit(`FEHLER: ${e}`);
dit('');

await mkdir(join(ROOT, 'docs'), { recursive: true });
await writeFile(join(ROOT, 'docs', 'build-bericht.txt'), rapport.join('\n') + '\n', 'utf8');

if (erreurs.length > 0) {
  console.error('Der Schnappschuss ist fehlerhaft. Der Build wird abgebrochen.');
  process.exit(1);
}
