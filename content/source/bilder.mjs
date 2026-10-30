/**
 * content/source/bilder.mjs — Bildplätze der Seite.
 *
 * Die Aufnahmen stammen aus den Beständen der Kanzlei, übernommen von
 * ihrer bisherigen Website. Woher genau und was dazu noch zu klären ist,
 * steht in tools/originale/HERKUNFT.md — insbesondere die Frage der
 * Nutzungsrechte des Fotografen.
 *
 * `datei` zeigt auf den Namen ohne Endung und ohne Breite; das Bauteil
 * setzt daraus die AVIF- und WebP-Fassungen zusammen. Erzeugt werden sie
 * von `npm run bilder` aus tools/originale/.
 *
 * Ist `datei` null, zeigt die Seite einen gestalteten Platzhalter mit der
 * Beschreibung dessen, was dort hingehört — das sieht gewollt aus und
 * nicht kaputt.
 *
 * SO KOMMT EIN BILD AUF DIE SEITE
 * Entweder die Datei nach `public/bilder/<name>` legen und hier `datei`
 * eintragen — oder, der übliche Weg, im Redaktionsbereich unter „Bilder“
 * hochladen. Dort entstehen AVIF und WebP automatisch, und der Alt-Text
 * wird in allen vier Sprachen abgefragt.
 *
 * Alt-Texte: Für die Plätze, deren Inhalt feststeht, sind sie hier schon
 * geschrieben. Zeigt die Datei etwas anderes, gehört der Text angepasst —
 * ein Alt-Text, der das Bild nicht beschreibt, ist schlimmer als keiner.
 */

export const BILDER = {
  portrait: {
    id: 'portrait-lorang',
    datei: '/bilder/portrait.jpg',
    /**
     * Nur 579 × 626 im Original. Auf einem Retina-Schirm wird das an der
     * größten Stelle leicht weich. Eine Neuaufnahme oder die Datei des
     * Fotografen wäre deutlich besser — siehe OFFENE-PUNKTE.md.
     */
    breiten: [480, 500],
    /** Für den Platzhalter und die Übergabe. */
    beschreibung: {
      fr: 'Portrait de Me Alain Lorang',
      en: 'Portrait of Me Alain Lorang',
    },
    /**
     * Beschreibt, was auf dem Bild WIRKLICH zu sehen ist. Der erste
     * Entwurf sagte „in seiner Kanzlei“ — auf der Aufnahme ist aber nur
     * ein neutraler Hintergrund. Ein Alt-Text, der etwas nennt, das im
     * Bild nicht vorkommt, führt blinde Besucher in die Irre.
     */
    alt: {
      fr: 'Me Alain Lorang, avocat à la cour : cheveux gris, lunettes rondes, col roulé noir.',
      en: 'Me Alain Lorang, avocat à la cour: grey hair, round glasses, black polo neck.',
    },
    /** Hochformat — ein Porträt wird nicht quer beschnitten. */
    seitenverhaeltnis: '4 / 5',
    point_x: 50,
    point_y: 35,
  },

  bureau_1: {
    id: 'bureau-1',
    datei: '/bilder/bureau-1.jpg',
    breiten: [480, 768, 1200, 1719],
    beschreibung: {
      fr: 'Le salon d’attente',
      en: 'The waiting room',
    },
    alt: {
      fr: 'Le salon d’attente de l’Étude : fauteuils en cuir clair, table basse, parquet.',
      en: 'The firm’s waiting room: light leather armchairs, low table, parquet floor.',
    },
    seitenverhaeltnis: '3 / 2',
    point_x: 62,
    point_y: 50,
  },

  bureau_2: {
    id: 'bureau-2',
    datei: '/bilder/bureau-2.jpg',
    breiten: [480, 519],
    beschreibung: {
      fr: 'L’étage, escalier et palier',
      en: 'The upper floor, stairs and landing',
    },
    alt: {
      fr: 'L’escalier et le palier de l’Étude, parquet et boiseries claires.',
      en: 'The stairs and landing of the firm, parquet and light woodwork.',
    },
    seitenverhaeltnis: '3 / 4',
    point_x: 50,
    point_y: 50,
  },

};

/** Breiten, in denen ein hochgeladenes Bild erzeugt wird. */
export const BREITEN = [480, 768, 1200, 1800];
