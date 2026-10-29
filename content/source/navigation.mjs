/**
 * content/source/navigation.mjs — Navigation und Fusszeile.
 *
 * Die Beschriftungen kommen aus den Uebersetzungsdateien (i18n), damit sie
 * an genau einer Stelle stehen. Hier steht nur, WAS verlinkt wird und in
 * welcher Reihenfolge — beides ist im Adminbereich aenderbar.
 */

export const NAVIGATION = [
  { id: 'situations', cle: 'nav.situations', segment: 'situations', ordre: 1, visible: true },
  { id: 'services', cle: 'nav.services', segment: 'services', ordre: 2, visible: true },
  { id: 'publications', cle: 'nav.publications', segment: 'publications', ordre: 3, visible: true },
  { id: 'etude', cle: 'nav.etude', segment: 'etude', ordre: 4, visible: true },
  { id: 'honoraires', cle: 'nav.honoraires', segment: 'honoraires', ordre: 5, visible: true },
  { id: 'contact', cle: 'nav.contact', segment: 'contact', ordre: 6, visible: true },
];

export const PIED = [
  { id: 'mentions', cle: 'pied.mentions', segment: 'mentions', ordre: 1, visible: true },
  { id: 'donnees', cle: 'pied.donnees', segment: 'donnees', ordre: 2, visible: true },
  { id: 'conditions', cle: 'pied.conditions', segment: 'conditions', ordre: 3, visible: true },
];
