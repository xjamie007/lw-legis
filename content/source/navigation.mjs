/**
 * content/source/navigation.mjs — Menue und Footer-Links.
 *
 * Reihenfolge und Beschriftung wie auf der alten Website: Accueil, Les
 * avocats, Activités, Dossiers thématiques, Conférences, Partenaires,
 * Contact. Die Beschriftung steht in src/i18n/<sprache>.json unter `cle`.
 */

export const NAVIGATION = [
  { id: 'avocats', cle: 'nav.avocats', segment: 'avocats', ordre: 1, visible: true },
  { id: 'activites', cle: 'nav.activites', segment: 'activites', ordre: 2, visible: true },
  { id: 'dossiers', cle: 'nav.dossiers', segment: 'dossiers', ordre: 3, visible: true },
  { id: 'conferences', cle: 'nav.conferences', segment: 'conferences', ordre: 4, visible: true },
  { id: 'partenaires', cle: 'nav.partenaires', segment: 'partenaires', ordre: 5, visible: true },
  { id: 'contact', cle: 'nav.contact', segment: 'contact', ordre: 6, visible: true },
];

export const PIED = [
  { id: 'mentions', cle: 'pied.mentions', segment: 'mentions', ordre: 1, visible: true },
  { id: 'donnees', cle: 'pied.donnees', segment: 'donnees', ordre: 2, visible: true },
  { id: 'cookies', cle: 'pied.cookies', segment: 'cookies', ordre: 3, visible: true },
  { id: 'conditions', cle: 'pied.conditions', segment: 'conditions', ordre: 4, visible: true },
];
