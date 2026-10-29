/**
 * scripts/bilder-aufbereiten.mjs
 *
 * Macht aus den Originalen unter tools/originale/ das, was die Seite
 * braucht: AVIF und WebP in vier Breiten, plus ein freigestelltes Wappen.
 *
 * Die Originale stammen von der bisherigen Website der Kanzlei; woher
 * genau, steht in tools/originale/HERKUNFT.md. Kommen eines Tages bessere
 * Aufnahmen, werden sie dort abgelegt und dieses Skript neu ausgefuehrt —
 * die Website selbst muss dafuer nicht angefasst werden.
 *
 * Aufruf:  npm run bilder
 */
import { mkdir, writeFile, readdir, stat, rm } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const QUELLE = join(ROOT, 'tools', 'originale');
const ZIEL = join(ROOT, 'public', 'bilder');

const BREITEN = [480, 768, 1200, 1800];

/**
 * Was wohin wird.
 *
 * `zuschnitt` ist die Schwerpunktlage: Bei einem Portraet gehoert der
 * Kopf ins Bild, nicht die Bildmitte. sharp bekommt das als `position`.
 */
const PLAETZE = [
  {
    name: 'portrait',
    quelle: 'avocat-luxembourg-lorang.jpg',
    verhaeltnis: [4, 5],
    zuschnitt: 'north',
  },
  {
    name: 'bureau-1',
    quelle: 'etude-avocats-luxembourg-lorang.jpg',
    verhaeltnis: [3, 2],
    zuschnitt: 'centre',
  },
  {
    name: 'bureau-2',
    quelle: 'avocats-luxembourg-cabinet-lorang.jpg',
    verhaeltnis: [3, 4],
    zuschnitt: 'centre',
  },
  // Der Besprechungsraum aus `avocat-lorang-luxembourg-footer.jpg` ist
  // bewusst NICHT dabei: Die Aufnahme ist schwarzweiss und traegt das
  // Wappen eingebrannt. Neben zwei warmen Farbaufnahmen saehe das nach
  // Versehen aus, nicht nach Absicht. Die Datei liegt in
  // tools/originale/, falls die Kanzlei sie doch verwenden will.
];

/** Lage des weissen Wappens im Foto des Besprechungsraums. */
const WAPPEN_IM_FOTO = {
  quelle: 'avocat-lorang-luxembourg-footer.jpg',
  // Mit Rand, damit der Rahmen des Wappens vollstaendig drin ist.
  extract: { left: 655, top: 546, width: 694, height: 240 },
};

async function existiert(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// 1. Das Wappen freistellen
// ---------------------------------------------------------------------------
/**
 * Im Foto ist das Wappen weiss auf dunkel. Die Helligkeit wird zur
 * Deckkraft: was hell ist, bleibt stehen, der dunkle Raum dahinter fällt
 * weg. Danach laesst sich das Wappen in jeder Farbe einfaerben — Messing
 * fuer helle Flaechen, Messing-hell fuer den dunklen Fussbereich.
 *
 * Warum nicht das Farb-JPEG (300 × 102)? Weil es nur halb so breit ist.
 * Die weisse Fassung im Foto misst 694 Pixel und traegt selbst mit
 * JPEG-Artefakten mehr Zeichnung.
 */
async function wappenFreistellen() {
  const quelle = join(QUELLE, WAPPEN_IM_FOTO.quelle);
  if (!(await existiert(quelle))) {
    console.warn('  Wappen: Quelle fehlt, übersprungen.');
    return;
  }

  const ausschnitt = sharp(quelle).extract(WAPPEN_IM_FOTO.extract);

  // Helligkeit -> Deckkraft. Der Schwarzpunkt wird angehoben, damit der
  // dunkle Raum sauber verschwindet und nicht als Schleier bleibt.
  const maske = await ausschnitt
    .clone()
    .greyscale()
    .linear(1.9, -95) // Kontrast hoch, Tiefen zu
    .toColourspace('b-w')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = maske.info;

  /** Baut das Wappen in einer Farbe, mit der Maske als Alphakanal. */
  const einfaerben = async (r, g, b, datei) => {
    const flaeche = await sharp({
      create: { width, height, channels: 3, background: { r, g, b } },
    })
      .raw()
      .toBuffer();

    const rgba = Buffer.alloc(width * height * 4);
    for (let i = 0; i < width * height; i++) {
      rgba[i * 4] = flaeche[i * 3];
      rgba[i * 4 + 1] = flaeche[i * 3 + 1];
      rgba[i * 4 + 2] = flaeche[i * 3 + 2];
      rgba[i * 4 + 3] = maske.data[i];
    }

    await sharp(rgba, { raw: { width, height, channels: 4 } })
      .png({ compressionLevel: 9 })
      .toFile(join(ZIEL, datei));
  };

  // Messing fuer helle Flaechen, aufgehelltes Messing fuer dunkle.
  await einfaerben(0xa0, 0x7c, 0x3c, 'wappen.png');
  await einfaerben(0xab, 0x84, 0x40, 'wappen-hell.png');

  console.log(`  Wappen freigestellt: ${width} × ${height}, zwei Farbfassungen`);
}

// ---------------------------------------------------------------------------
// 2. Die Fotos
// ---------------------------------------------------------------------------
async function fotoAufbereiten(platz) {
  const quelle = join(QUELLE, platz.quelle);
  if (!(await existiert(quelle))) {
    console.warn(`  ${platz.name}: Quelle fehlt, übersprungen.`);
    return null;
  }

  let bild = sharp(quelle).rotate(); // EXIF-Drehung beachten
  if (platz.vorschnitt) bild = bild.extract(platz.vorschnitt);
  if (platz.graustufen) bild = bild.greyscale();

  const meta = await bild.clone().metadata();
  const [vw, vh] = platz.verhaeltnis;

  /**
   * Die größte Breite, die das Original im Zielverhältnis WIRKLICH
   * hergibt — begrenzt durch Breite UND Höhe.
   *
   * Beim Porträt (579 × 626) im Verhältnis 4:5 wären 579 Pixel Breite
   * 724 Pixel Höhe: mehr, als die Quelle hat. sharp hätte klaglos
   * hochgerechnet und ein weicheres Bild geliefert als das Original.
   * Deshalb wird hier gedeckelt statt aufgeblasen.
   */
  const maxBreite = Math.floor(Math.min(meta.width, (meta.height * vw) / vh));

  const stufen = BREITEN.filter((b) => b <= maxBreite);
  if (maxBreite > (stufen.at(-1) ?? 0) && maxBreite < BREITEN.at(-1)) {
    stufen.push(maxBreite);
  }

  const erzeugt = [];
  for (const breite of stufen) {
    const hoehe = Math.round((breite / vw) * vh);

    const basis = bild
      .clone()
      .resize(breite, hoehe, { fit: 'cover', position: platz.zuschnitt });

    await basis.clone().avif({ quality: 52, effort: 6 }).toFile(join(ZIEL, `${platz.name}-${breite}.avif`));
    await basis.clone().webp({ quality: 74 }).toFile(join(ZIEL, `${platz.name}-${breite}.webp`));
    erzeugt.push(breite);
  }

  // Rückfall für Browser ohne AVIF und WebP.
  const grosste = erzeugt.at(-1) ?? Math.min(maxBreite, BREITEN[0]);
  await bild
    .clone()
    .resize(grosste, Math.round((grosste / vw) * vh), { fit: 'cover', position: platz.zuschnitt })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(join(ZIEL, `${platz.name}.jpg`));

  console.log(
    `  ${platz.name.padEnd(10)} aus ${meta.width}×${meta.height}` +
      `  →  ${erzeugt.join(', ') || '—'} px` +
      (maxBreite < BREITEN.at(-1) ? `  (Original gibt höchstens ${maxBreite} her)` : ''),
  );

  return { name: platz.name, breiten: erzeugt, quelle: meta };
}

// ---------------------------------------------------------------------------
async function main() {
  await mkdir(ZIEL, { recursive: true });

  // Alte Ableitungen wegräumen. Ohne das bleiben Dateien aus einem
  // früheren Lauf liegen — mit dem Seitenverhältnis von damals. Sie
  // werden zwar nicht mehr verlinkt, liegen aber im Auslieferungsordner
  // und stiften beim nächsten Blick Verwirrung.
  for (const d of await readdir(ZIEL)) {
    if (/\.(avif|webp|jpg|png)$/.test(d)) await rm(join(ZIEL, d));
  }

  console.log('Bilder aufbereiten:');

  await wappenFreistellen();

  const ergebnis = [];
  for (const p of PLAETZE) {
    const r = await fotoAufbereiten(p);
    if (r) ergebnis.push(r);
  }

  const dateien = await readdir(ZIEL);
  let gesamt = 0;
  for (const d of dateien) gesamt += (await stat(join(ZIEL, d))).size;

  console.log(
    `\n  ${dateien.length} Dateien, ${(gesamt / 1024 / 1024).toFixed(1)} MB in public/bilder/`,
  );

  // Kleiner Bericht für die Übergabe.
  await writeFile(
    join(ROOT, 'docs', 'bilder.md'),
    `# Bilder\n\nErzeugt von \`scripts/bilder-aufbereiten.mjs\` aus \`tools/originale/\`.\nNeu erzeugen mit \`npm run bilder\`.\n\n` +
      `| Platz | Original | Erzeugte Breiten |\n|---|---|---|\n` +
      ergebnis
        .map(
          (r) =>
            `| ${r.name} | ${r.quelle.width} × ${r.quelle.height} | ${r.breiten.join(', ') || '—'} |`,
        )
        .join('\n') +
      `\n\nJe Breite entsteht AVIF und WebP, dazu ein JPEG als Rückfall.\n\n` +
      `Zur Herkunft und zu den offenen Rechtefragen: \`tools/originale/HERKUNFT.md\`.\n`,
    'utf8',
  );
}

main().catch((e) => {
  console.error('Bilder konnten nicht aufbereitet werden:', e.message);
  process.exit(1);
});
