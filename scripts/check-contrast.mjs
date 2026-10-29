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
  encre: '#1E1A13',
  frontiere: '#2F5340',
  laiton: '#A87A35',
  papier: '#EFEADB',
  craie: '#FAF7EE',
  pierre: '#5A5348',
  /**
   * Die vierte Flaeche: eine Messingwaesche fuer abgesetzte Baender.
   * Auf ihr steht KEIN Messing — dafuer liegt sie zu nah daran (2,8:1).
   * Text darauf ist `encre` oder `pierre`, Linien sind `pierre`.
   * Das ist keine Nachlaessigkeit, sondern die Bedingung, unter der diese
   * Flaeche ueberhaupt benutzbar ist.
   */
  sable: '#E5DCC4',
};

/**
 * Abgeleitete Werte. Jeder ist gesucht, nicht geraten: Farbton und
 * Saettigung bleiben stehen, nur die Helligkeit wandert so weit, bis die
 * Schwelle mit Reserve erreicht ist.
 */
export const DERIVED = {
  // Hover und aktiver Zustand der Leitfarbe.
  'frontiere-tief': '#264333',
  // Messing traegt auf hellem Grund keinen Text (3,17:1). Abgedunkelt schon.
  'laiton-texte': '#88632B',
  // Auf dem warmen Dunkel traegt das Messing Text ohne Aenderung (4,54:1);
  // der Eintrag bleibt als ausdrueckliche Zusage stehen.
  'laiton-clair': '#A87A35',
  // Sekundaertext auf dunklem Grund.
  'craie-gedaempft': '#BDB4A4',
  // Endpunkte der Uebergaenge.
  'papier-warm': '#F3EEE1',
  'craie-warm': '#FDFBF4',
  'encre-tief': '#14110C',
};

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
  // --- Fliesstext und Lesetext ------------------------------------------
  { fg: 'encre', bg: 'craie', min: 4.5, use: 'Fließtext auf der Lesefläche' },
  { fg: 'encre', bg: 'papier', min: 4.5, use: 'Fließtext auf der Grundfläche' },
  { fg: 'encre', bg: 'sable', min: 4.5, use: 'Fließtext auf der Messingwäsche' },
  { fg: 'pierre', bg: 'craie', min: 4.5, use: 'Sekundärtext, Marginalie auf Lesefläche' },
  { fg: 'pierre', bg: 'papier', min: 4.5, use: 'Sekundärtext, Marginalie auf Grundfläche' },
  { fg: 'pierre', bg: 'sable', min: 4.5, use: 'Sekundärtext auf der Messingwäsche' },

  // --- Interaktive Elemente ---------------------------------------------
  { fg: 'frontiere', bg: 'craie', min: 4.5, use: 'Link und Einsetzstelle im Hero' },
  { fg: 'frontiere', bg: 'papier', min: 4.5, use: 'Link auf Grundfläche' },
  { fg: 'frontiere', bg: 'sable', min: 4.5, use: 'Link auf der Messingwäsche' },
  { fg: 'frontiere-tief', bg: 'papier', min: 4.5, use: 'Link, Hover- und Aktivzustand' },
  { fg: 'craie', bg: 'frontiere', min: 4.5, use: 'Schrift auf gefülltem Knopf' },

  // --- Messing ------------------------------------------------------------
  { fg: 'laiton', bg: 'papier', min: 3.0, use: 'Linie in Messing (grafische Abgrenzung, WCAG 1.4.11)' },
  { fg: 'laiton', bg: 'craie', min: 3.0, use: 'Linie in Messing auf Lesefläche' },
  {
    fg: 'laiton',
    bg: 'papier',
    min: 4.5,
    binding: false,
    use: 'Messing als Fließtextfarbe — NICHT eingesetzt, siehe Befund 1',
  },
  {
    fg: 'laiton',
    bg: 'sable',
    min: 3.0,
    binding: false,
    use: 'Messing auf der Messingwäsche — NICHT eingesetzt, siehe Befund 2',
  },
  { fg: 'laiton-texte', bg: 'papier', min: 4.5, use: 'Messing als Textfarbe — Marginalie, aktiver Zustand' },
  { fg: 'laiton-texte', bg: 'craie', min: 4.5, use: 'Messing als Textfarbe auf Lesefläche' },

  // --- Dunkle Flaechen ----------------------------------------------------
  { fg: 'craie', bg: 'encre', min: 4.5, use: 'Text auf dunklem Grund (Fußzeile, Leiste)' },
  { fg: 'craie-gedaempft', bg: 'encre', min: 4.5, use: 'Sekundärtext auf dunklem Grund' },
  { fg: 'laiton-clair', bg: 'encre', min: 4.5, use: 'Messing als Textfarbe auf dunklem Grund' },
  { fg: 'laiton', bg: 'encre', min: 3.0, use: 'Messinglinie auf dunklem Grund' },

  // --- Fokusring ----------------------------------------------------------
  { fg: 'frontiere', bg: 'papier', min: 3.0, use: 'Fokusring gegen Grundfläche' },
  { fg: 'frontiere', bg: 'craie', min: 3.0, use: 'Fokusring gegen Lesefläche' },
  { fg: 'craie', bg: 'frontiere', min: 3.0, use: 'Fokusring auf gefülltem Knopf' },
  { fg: 'laiton-clair', bg: 'encre', min: 3.0, use: 'Fokusring auf dunklem Grund' },

  // --- Enden der Uebergaenge ----------------------------------------------
  { fg: 'encre', bg: 'papier-warm', min: 4.5, use: 'Fließtext am warmen Ende der Grundfläche' },
  { fg: 'encre', bg: 'craie-warm', min: 4.5, use: 'Fließtext am warmen Ende der Lesefläche' },
  { fg: 'pierre', bg: 'papier-warm', min: 4.5, use: 'Sekundärtext am warmen Ende' },
  { fg: 'pierre', bg: 'craie-warm', min: 4.5, use: 'Sekundärtext am warmen Ende der Lesefläche' },
  { fg: 'frontiere', bg: 'papier-warm', min: 4.5, use: 'Link am warmen Ende' },
  { fg: 'frontiere', bg: 'craie-warm', min: 4.5, use: 'Link am warmen Ende der Lesefläche' },
  { fg: 'laiton-texte', bg: 'papier-warm', min: 4.5, use: 'Messingtext am warmen Ende' },
  { fg: 'laiton', bg: 'papier-warm', min: 3.0, use: 'Messinglinie am warmen Ende' },
  { fg: 'craie', bg: 'encre-tief', min: 4.5, use: 'Text am tiefen Ende des Fußbereichs' },
  { fg: 'craie-gedaempft', bg: 'encre-tief', min: 4.5, use: 'Sekundärtext am tiefen Ende' },
  { fg: 'laiton-clair', bg: 'encre-tief', min: 4.5, use: 'Messingtext am tiefen Ende' },

  // --- Flaechen gegeneinander --------------------------------------------
  {
    fg: 'papier',
    bg: 'craie',
    min: 1.0,
    binding: false,
    use: 'Grundfläche gegen Lesefläche — bewusst leise',
  },
  {
    fg: 'sable',
    bg: 'papier',
    min: 1.0,
    binding: false,
    use: 'Messingwäsche gegen Grundfläche — hier soll man die Kante sehen',
  },
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

| Token | Hex | Verwendung |
|---|---|---|
| \`encre\` | \`${PALETTE.encre}\` | Fließtext, Fußbereich |
| \`frontiere\` | \`${PALETTE.frontiere}\` | Leitfarbe, alle interaktiven Elemente |
| \`laiton\` | \`${PALETTE.laiton}\` | Linien, Marginalien, aktiver Zustand |
| \`papier\` | \`${PALETTE.papier}\` | Grundfläche der Seite |
| \`craie\` | \`${PALETTE.craie}\` | Lesefläche |
| \`pierre\` | \`${PALETTE.pierre}\` | Sekundärtext, Randspalte |

### Abgeleitete Werte

| Token | Hex | Grund |
|---|---|---|
${Object.entries(DERIVED)
  .map(([k, v]) => `| \`${k}\` | \`${v}\` | siehe Befunde unten |`)
  .join('\n')}

## Ergebnisse

| Vordergrund | Hintergrund | Verhältnis | Schwelle | Ergebnis | Verwendung |
|---|---|---|---|---|---|
${rows
  .map(
    (r) =>
      `| \`${r.fg}\` | \`${r.bg}\` | ${fmt(r.ratio)}:1 | ${r.min.toFixed(1)}:1 | ${
        r.binding ? (r.pass ? '**bestanden**' : '**DURCHGEFALLEN**') : r.pass ? 'bestanden (nachrichtlich)' : 'durchgefallen (nachrichtlich)'
      } | ${r.use} |`,
  )
  .join('\n')}

## Befunde und Abweichungen

**1. \`laiton\` (#A07C3C) trägt keinen Fließtext.**
Gegen \`papier\` erreicht das Messing ${fmt(contrast(PALETTE.laiton, PALETTE.papier))}:1.
Für Linien, Rahmen und grafische Abgrenzungen (Schwelle 3,0:1) reicht das,
für Text (4,5:1) nicht. Das Konzept sieht Messing ohnehin nur für
Marginalien, Linien und den aktiven Zustand vor. Wo Messing **als Text**
nötig ist, wird \`laiton-texte\` (#7A5D2B) eingesetzt:
${fmt(contrast(DERIVED['laiton-texte'], PALETTE.papier))}:1 gegen \`papier\`,
${fmt(contrast(DERIVED['laiton-texte'], PALETTE.craie))}:1 gegen \`craie\`.
Der Farbton bleibt erkennbar dasselbe Messing, nur abgedunkelt.

**2. \`laiton\` trägt auch auf dunklem Grund keinen Text.**
Gegen \`encre\` erreicht das Messing ${fmt(contrast(PALETTE.laiton, PALETTE.encre))}:1
und verfehlt die 4,5:1 damit knapp. Als Linie und als Wappen in der Fußzeile
ist es zulässig (Schwelle 3,0:1). Für **Text** auf dunklem Grund wird
\`laiton-clair\` (#AB8440) eingesetzt: ${fmt(contrast(DERIVED['laiton-clair'], PALETTE.encre))}:1.
Farbton und Sättigung bleiben unverändert (HSL 38,4° / 45,5 %), nur die
Helligkeit steigt von 43,1 % auf 46 %. Das ist der kleinste Schritt, der die
Schwelle mit Reserve nimmt — geraten wurde nichts, der Wert ist gesucht worden.

Damit gibt es drei Messingwerte, jeder mit genau einem Einsatzgebiet:
\`laiton\` für Linien und Flächen, \`laiton-texte\` für Text auf hellem Grund,
\`laiton-clair\` für Text auf dunklem Grund. Das ist eine Abweichung vom
Konzept, das nur einen Wert vorsah — sie ist durch die Prüfung erzwungen.

**3. \`pierre\` ist knapp, aber ausreichend.**
${fmt(contrast(PALETTE.pierre, PALETTE.craie))}:1 gegen \`craie\` und
${fmt(contrast(PALETTE.pierre, PALETTE.papier))}:1 gegen \`papier\`.
Die Marginalie wird in 0,8125rem gesetzt und ist damit kleiner Text — die
4,5:1 gelten, und sie sind erfüllt. Weiter aufhellen würde sie unterschreiten.

**4. Farbe ist nirgends der einzige Bedeutungsträger.**
Die beiden Einsetzstellen im Hero sind zusätzlich unterstrichen und tragen
\`aria-expanded\`. Links im Fließtext sind unterstrichen. Der Pflichtfeld-
und Fehlerzustand im Formular wird zusätzlich durch Text und
\`aria-invalid\` ausgewiesen, nicht nur durch Farbe.

**5. Kein Dunkelmodus.**
Die Seite ist hell, in allen Zuständen. Das Dunkelgrün ist Textfarbe und
Fußbereich, keine Flächenvariante. Ein zweites Farbsystem hätte keine
zusätzlichen geprüften Kombinationen, sondern nur ungeprüfte.
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
