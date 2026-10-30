/**
 * content/source/settings.mjs — Stammdaten der Kanzlei.
 *
 * Alles hier steht so auf der alten Website (cabinet-avocats-lorang.com).
 * Name, Adresse und Telefon stehen genau einmal und werden von jeder
 * Seite, vom Footer, von der vCard und von den strukturierten Daten aus
 * derselben Quelle gelesen. Abweichende Schreibweisen kosten lokale
 * Sichtbarkeit.
 *
 * Die Telefonnummer schreibt die alte Seite „00352 44 71 76 1“. Hier
 * steht sie in der internationalen Form mit +352; gewaehlt wird dieselbe
 * Nummer.
 */

export const SETTINGS = {
  nom: 'Étude d’Avocats LW LEGIS',
  nom_court: 'LW LEGIS',

  adresse: {
    rue: '41, avenue du X Septembre',
    code_postal: 'L-2551',
    ville: 'Luxembourg',
    pays_code: 'LU',
    une_ligne: '41, avenue du X Septembre, L-2551 Luxembourg',
    latitude: 49.6103,
    longitude: 6.1147,
  },

  /** Postanschrift, wie auf der alten Seite: „B.P. 1734 | L-2551 Luxembourg“. */
  postfach: {
    boite: 'B.P. 1734',
    une_ligne: 'B.P. 1734, L-2551 Luxembourg',
  },

  telephone: {
    affiche: '+352 44 71 76 1',
    lien: '+3524471761',
  },
  courriel: 'contact@cabinet-avocats-lorang.com',

  /** Fuer die strukturierten Daten: wo die Mandanten sitzen. */
  territoires: ['LU', 'FR', 'BE', 'DE'],

  /**
   * Netzwerke und Vertretungen — Wortlaut der alten Startseite
   * (FR) bzw. der englischen Startseite (EN).
   */
  reseaux: [
    {
      id: 'intrum',
      nom: 'Intrum Justitia',
      role: {
        fr: 'Représentant officiel au Luxembourg du groupe Intrum Justitia',
        en: 'Official representative in Luxembourg of the Intrum Justitia group',
      },
    },
    {
      id: 'ijcof',
      nom: 'IJCOF',
      role: {
        fr: 'Filiale spécialisée au service des entreprises, spécialiste européen du contentieux commercial en matière de recouvrement de créances',
        en: 'A European specialist in commercial litigation and debt collection',
      },
    },
    {
      id: 'advounion',
      nom: 'ADVOUNION',
      role: {
        fr: 'Réseau international d’avocats auquel le cabinet est affilié',
        en: 'International network of lawyers of which the firm is a member',
      },
    },
    {
      id: 'lic',
      nom: 'LIC',
      role: {
        fr: 'League International for Creditors, représentant pour le Luxembourg',
        en: 'League International for Creditors, Luxembourg representative',
      },
    },
  ],
};
