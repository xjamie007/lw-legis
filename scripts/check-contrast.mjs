/**
 * scripts/check-contrast.mjs
 *
 * Prueft jede im Entwurf vorgesehene Farbkombination programmatisch gegen
 * WCAG 2.2 AA und schreibt das Ergebnis nach docs/kontrast.md.
 *
 * Schwellen:
 *   4.5:1  Fliesstext und kleiner Text
 *   3.0:1  grosser Text (ab 24px, oder ab 18.66px fett) und
 *          Bedienelemente / grafische Abgrenzungen (WCAG 1.4.11)
 *
 * Aufruf:  npm run check:contrast
 * Bricht mit Code 1 ab, sobald eine als verbindlich markierte Kombination
 * durchfaellt. Dann wird der Farbwert abgedunkelt, nicht die Pruefung.
 */
import { writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

/**
 * Die Palette.
 *
 * Zweite Fassung: waermer und mit vier Flaechen statt zwei. Die erste war
 * ein kuehles Graugruen; seit auf der Seite Fotos mit warmem Holz, cremem
 * Leder und Parkett liegen, wirkte sie daneben fahl.
 *
 * Geblieben ist der Gedanke: Tinte, Grenzfarbe, Messing. Gewandert ist der
 * Farbton — aus Blaugruen wurde Waldgruen, aus Fast-Schwarz mit Gruenstich
 * ein warmes Nussbaumschwarz, aus dem graugruenen Papier ein warmer Sand.
 */
export const PALETTE = {
  marine: '#13294B',
  'marine-tief': '#0C1C36',
  encre: '#0E1A2B',
  texte: '#2B3442',
  gris: '#5B6575',
  trait: '#D9DDE3',
  brume: '#F3F4F6',
  blanc: '#FFFFFF',
  /** Gold des Wappens — nur Linien und Logo, kein Text auf Weiss. */
  or: '#A07C3C',
  /** Gold fuer Schrift auf Marine. */
  'or-clair': '#CDB27F',
  /** Zweitschrift auf Marine. */
  'marine-texte': '#B9C3D3',
  erreur: '#A32020',
  bordure: '#858E9B',
};

export const DERIVED = {};

function srgbToLinear(c) {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

export function relativeLuminance(hex) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return (
    0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b)
  );
}

export function contrast(a, b) {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

const ALL = { ...PALETTE, ...DERIVED };
const hex = (name) => ALL[name] ?? name;

/**
 * Jede Kombination, die im Entwurf tatsaechlich vorkommt.
 * `min` ist die Schwelle, die diese Kombination erfuellen MUSS.
 * `binding: false` heisst: wird geprueft und dokumentiert, ist aber im
 * Entwurf nicht als Textfarbe eingesetzt (dient der Begruendung).
 */
const CHECKS = [
  { fg: 'texte', bg: 'blanc', min: 4.5, use: 'Fließtext' },
  { fg: 'texte', bg: 'brume', min: 4.5, use: 'Fließtext auf hellgrauen Bändern' },
  { fg: 'encre', bg: 'blanc', min: 4.5, use: 'Überschriften, Menü' },
  { fg: 'encre', bg: 'brume', min: 4.5, use: 'Überschriften auf hellgrauen Bändern' },
  { fg: 'gris', bg: 'blanc', min: 4.5, use: 'Sekundärtext, Einleitungen' },
  { fg: 'gris', bg: 'brume', min: 4.5, use: 'Sekundärtext auf hellgrauen Bändern' },
  { fg: 'marine', bg: 'blanc', min: 4.5, use: 'Links, Knöpfe als Text' },
  { fg: 'marine', bg: 'brume', min: 4.5, use: 'Links auf hellgrauen Bändern' },
  { fg: 'blanc', bg: 'marine', min: 4.5, use: 'Schrift auf Marine (Hero, Bänder, Knöpfe)' },
  { fg: 'marine-texte', bg: 'marine', min: 4.5, use: 'Zweitschrift auf Marine' },
  { fg: 'or-clair', bg: 'marine', min: 4.5, use: 'Gold als Schrift auf Marine' },
  { fg: 'marine-tief', bg: 'or-clair', min: 4.5, use: 'Schrift auf dem goldenen Knopf' },
  { fg: 'blanc', bg: 'marine-tief', min: 4.5, use: 'Schrift im Fußbereich und in der Leiste' },
  { fg: 'marine-texte', bg: 'marine-tief', min: 4.5, use: 'Zweitschrift im Fußbereich' },
  { fg: 'or-clair', bg: 'marine-tief', min: 4.5, use: 'Gold als Schrift im Fußbereich' },
  { fg: 'erreur', bg: 'blanc', min: 4.5, use: 'Fehlermeldungen im Formular' },
  { fg: 'or', bg: 'blanc', min: 3.0, use: 'Goldlinien, Pfeile, Fokusring (grafisch, WCAG 1.4.11)' },
  { fg: 'or', bg: 'brume', min: 3.0, use: 'Goldlinien auf hellgrauen Bändern' },
  { fg: 'bordure', bg: 'blanc', min: 3.0, use: 'Rahmen der Formularfelder (WCAG 1.4.11)' },
  { fg: 'or', bg: 'blanc', min: 4.5, binding: false, use: 'Gold als Text auf Weiß — NICHT eingesetzt' },
];

const rows = CHECKS.map((c) => {
  const ratio = contrast(hex(c.fg), hex(c.bg));
  const pass = ratio >= c.min;
  return { ...c, ratio, pass, binding: c.binding !== false };
});

const failures = rows.filter((r) => r.binding && !r.pass);

const fmt = (n) => n.toFixed(2).replace('.', ',');

let md = `# Kontrastprüfung — WCAG 2.2 AA

Erzeugt von \`scripts/check-contrast.mjs\`. Neu erzeugen mit \`npm run check:contrast\`.

Geprüft wird jede Farbkombination, die im Entwurf tatsächlich vorkommt.
Schwellen nach WCAG 2.2: **4,5:1** für Fließtext und kleinen Text,
**3,0:1** für großen Text, Bedienelemente und grafische Abgrenzungen
(Erfolgskriterium 1.4.11).

## Palette

| Token | Hex |
|---|---|
${Object.entries(PALETTE)
  .map(([k, v]) => `| \`${k}\` | \`${v}\` |`)
  .join('\n')}

## Ergebnisse

| Kombination | Verhältnis | Mindestens | Verwendung |
|---|---|---|---|
${rows.map((r) => `| \`${r.fg}\` auf \`${r.bg}\` | ${fmt(r.ratio)}:1 | ${r.min} | ${r.use}${r.binding ? '' : ' (nicht verbindlich)'} |`).join('\n')}

## Befunde

**Gold traegt auf Weiss keinen Text.** Das Gold des Wappens erreicht gegen
Weiss nur ${fmt(contrast(PALETTE.or, PALETTE.blanc))}:1. Es steht deshalb nur
als Linie, Pfeil, Fokusring und im Logo. Als Schrift erscheint Gold nur auf
Marine, in der helleren Fassung \`or-clair\`.
`;

await mkdir(join(ROOT, 'docs'), { recursive: true });
await writeFile(join(ROOT, 'docs', 'kontrast.md'), md, 'utf8');

for (const r of rows) {
  const mark = r.binding ? (r.pass ? 'OK  ' : 'FAIL') : r.pass ? '(ok)' : '(--)';
  console.log(
    `${mark}  ${fmt(r.ratio).padStart(6)}:1  (min ${r.min.toFixed(1)})  ${r.fg} auf ${r.bg}  — ${r.use}`,
  );
}
console.log(`\ndocs/kontrast.md geschrieben. ${rows.filter((r) => r.binding).length} verbindliche Kombinationen geprueft.`);

if (failures.length > 0) {
  console.error(`\n${failures.length} verbindliche Kombination(en) durchgefallen.`);
  process.exit(1);
}
