/**
 * content/source/situations.mjs — Die Situationsmatrix.
 *
 * Sechs Herkunftslaender mal sieben Vorhaben ergeben bis zu 42
 * Konstellationen je Sprache. Jede veroeffentlichte Konstellation ist eine
 * eigene, indexierbare Seite mit sprechender Adresse.
 *
 * WAS HIER STEHT UND WAS NICHT
 * Der vollendete Satz (die <h1>) wird hier erzeugt — das ist reine
 * Sprachmechanik und voellig unbedenklich. Die vier inhaltlichen
 * Abschnitte bleiben leer:
 *
 *   worum       — worum es geht
 *   cadre       — was in Luxemburg dafuer gilt   <- Rechtsinhalt
 *   notre_role  — was die Kanzlei uebernimmt
 *   vos_pieces  — welche Unterlagen gebraucht werden
 *
 * Sie werden von Me Lorang im Adminbereich geschrieben. Erfundenes Recht
 * auf einer Anwaltsseite waere ein Haftungsfall, kein Schoenheitsfehler.
 *
 * Eine Konstellation wird nur gebaut, wenn alle vier Abschnitte in der
 * jeweiligen Sprache stehen UND der Eigeninhalt rund 400 Woerter erreicht.
 * Unfertige Konstellationen tauchen weder in der Sitemap noch in
 * Verweisen auf — im Auswahlmenue fuehren sie auf das zugehoerige
 * Taetigkeitsgebiet, nie auf eine leere Seite und nie auf 404.
 */

/** Achse 1 — Wo Sie sind. */
export const PAYS = [
  {
    id: 'france',
    ordre: 1,
    slug: { fr: 'france', de: 'frankreich', en: 'france', lb: null },
    etiquette: { fr: 'France', de: 'Frankreich', en: 'France', lb: null },
    dans_la_phrase: { fr: 'en France', de: 'in Frankreich', en: 'in France', lb: null },
    code: 'FR',
  },
  {
    id: 'belgique',
    ordre: 2,
    slug: { fr: 'belgique', de: 'belgien', en: 'belgium', lb: null },
    etiquette: { fr: 'Belgique', de: 'Belgien', en: 'Belgium', lb: null },
    dans_la_phrase: { fr: 'en Belgique', de: 'in Belgien', en: 'in Belgium', lb: null },
    code: 'BE',
  },
  {
    id: 'allemagne',
    ordre: 3,
    slug: { fr: 'allemagne', de: 'deutschland', en: 'germany', lb: null },
    etiquette: { fr: 'Allemagne', de: 'Deutschland', en: 'Germany', lb: null },
    dans_la_phrase: { fr: 'en Allemagne', de: 'in Deutschland', en: 'in Germany', lb: null },
    code: 'DE',
  },
  {
    id: 'luxembourg',
    ordre: 4,
    slug: { fr: 'luxembourg', de: 'luxemburg', en: 'luxembourg', lb: null },
    etiquette: {
      fr: 'Luxembourg (résident)',
      de: 'Luxemburg (ansässig)',
      en: 'Luxembourg (resident)',
      lb: null,
    },
    // Fuer Ansaessige darf hier nicht "au Luxembourg" stehen: der Satz
    // nennt Luxemburg gleich danach noch einmal, und "Vous êtes au
    // Luxembourg et vous souhaitez, au Luxembourg, …" stolpert.
    dans_la_phrase: {
      fr: 'résident luxembourgeois',
      de: 'in Luxemburg ansässig',
      en: 'resident in Luxembourg',
      lb: null,
    },
    code: 'LU',
  },
  {
    id: 'ue',
    ordre: 5,
    slug: {
      fr: 'union-europeenne',
      de: 'eu-ausland',
      en: 'european-union',
      lb: null,
    },
    etiquette: {
      fr: 'Autre pays de l’Union européenne',
      de: 'Übriges EU-Ausland',
      en: 'Another EU country',
      lb: null,
    },
    dans_la_phrase: {
      fr: 'dans un autre pays de l’Union européenne',
      de: 'in einem anderen EU-Land',
      en: 'in another EU country',
      lb: null,
    },
    code: 'EU',
  },
  {
    id: 'hors-ue',
    ordre: 6,
    slug: {
      fr: 'hors-union-europeenne',
      de: 'ausserhalb-der-eu',
      en: 'outside-the-eu',
      lb: null,
    },
    etiquette: {
      fr: 'Hors Union européenne',
      de: 'Außerhalb der EU',
      en: 'Outside the European Union',
      lb: null,
    },
    dans_la_phrase: {
      fr: 'hors de l’Union européenne',
      de: 'außerhalb der EU',
      en: 'outside the European Union',
      lb: null,
    },
    code: 'XX',
  },
];

/** Achse 2 — Was Sie vorhaben. */
export const PROJETS = [
  {
    id: 'immobilier',
    ordre: 1,
    slug: {
      fr: 'acheter-un-bien-immobilier',
      de: 'immobilie-kaufen',
      en: 'buying-property',
      lb: null,
    },
    etiquette: {
      fr: 'Acheter ou détenir un bien immobilier',
      de: 'Eine Immobilie kaufen oder halten',
      en: 'Buy or hold property',
      lb: null,
    },
    dans_la_phrase: {
      fr: 'acheter ou détenir un bien immobilier',
      de: 'eine Immobilie kaufen oder halten',
      en: 'buy or hold property',
      lb: null,
    },
    themes: ['immobilier', 'fiscalite'],
  },
  {
    id: 'societe',
    ordre: 2,
    slug: {
      fr: 'creer-une-societe',
      de: 'gesellschaft-gruenden',
      en: 'setting-up-a-company',
      lb: null,
    },
    etiquette: {
      fr: 'Créer ou gérer une société',
      de: 'Eine Gesellschaft gründen oder verwalten',
      en: 'Set up or run a company',
      lb: null,
    },
    dans_la_phrase: {
      fr: 'créer ou gérer une société',
      de: 'eine Gesellschaft gründen oder verwalten',
      en: 'set up or run a company',
      lb: null,
    },
    themes: ['societes', 'fiscalite'],
  },
  {
    id: 'succession',
    ordre: 3,
    slug: {
      fr: 'regler-une-succession',
      de: 'erbfall-regeln',
      en: 'settling-an-estate',
      lb: null,
    },
    etiquette: {
      fr: 'Régler une succession',
      de: 'Einen Erbfall regeln',
      en: 'Settle an estate',
      lb: null,
    },
    dans_la_phrase: {
      fr: 'régler une succession',
      de: 'einen Erbfall regeln',
      en: 'settle an estate',
      lb: null,
    },
    themes: ['successions'],
  },
  {
    id: 'creance',
    ordre: 4,
    slug: {
      fr: 'recouvrer-une-creance',
      de: 'forderung-eintreiben',
      en: 'recovering-a-debt',
      lb: null,
    },
    etiquette: {
      fr: 'Recouvrer une créance',
      de: 'Eine Forderung eintreiben',
      en: 'Recover a debt',
      lb: null,
    },
    dans_la_phrase: {
      fr: 'recouvrer une créance',
      de: 'eine Forderung eintreiben',
      en: 'recover a debt',
      lb: null,
    },
    themes: ['recouvrement'],
  },
  {
    id: 'marque',
    ordre: 5,
    slug: {
      fr: 'proteger-une-marque',
      de: 'marke-schuetzen',
      en: 'protecting-a-trademark',
      lb: null,
    },
    etiquette: {
      fr: 'Protéger une marque ou un brevet',
      de: 'Eine Marke oder ein Patent schützen',
      en: 'Protect a trademark or patent',
      lb: null,
    },
    dans_la_phrase: {
      fr: 'protéger une marque ou un brevet',
      de: 'eine Marke oder ein Patent schützen',
      en: 'protect a trademark or patent',
      lb: null,
    },
    themes: ['propriete-intellectuelle'],
  },
  {
    id: 'fiscalite',
    ordre: 6,
    slug: {
      fr: 'clarifier-sa-situation-fiscale',
      de: 'steuerliche-lage-klaeren',
      en: 'clarifying-your-tax-position',
      lb: null,
    },
    etiquette: {
      fr: 'Clarifier votre situation fiscale',
      de: 'Die steuerliche Lage klären',
      en: 'Clarify your tax position',
      lb: null,
    },
    dans_la_phrase: {
      fr: 'clarifier votre situation fiscale',
      de: 'Ihre steuerliche Lage klären',
      en: 'clarify your tax position',
      lb: null,
    },
    themes: ['fiscalite'],
  },
  {
    id: 'litige',
    ordre: 7,
    slug: {
      fr: 'conduire-un-litige',
      de: 'rechtsstreit-fuehren',
      en: 'pursuing-a-dispute',
      lb: null,
    },
    etiquette: {
      fr: 'Conduire un litige',
      de: 'Einen Rechtsstreit führen',
      en: 'Pursue a dispute',
      lb: null,
    },
    dans_la_phrase: {
      fr: 'conduire un litige',
      de: 'einen Rechtsstreit führen',
      en: 'pursue a dispute',
      lb: null,
    },
    themes: ['contentieux'],
  },
];

/** Der Satzbau je Sprache. Die eckigen Klammern werden ersetzt. */
const PHRASE = {
  fr: (pays, projet) => `Vous êtes ${pays} et vous souhaitez, au Luxembourg, ${projet}.`,
  de: (pays, projet) => `Sie sind ${pays} und möchten in Luxemburg ${projet}.`,
  en: (pays, projet) => `You are ${pays} and you want to ${projet} in Luxembourg.`,
  lb: () => null,
};

/** Baut den vollendeten Satz fuer eine Konstellation. */
export function phrase(pays, projet, lang) {
  const p = pays.dans_la_phrase[lang];
  const v = projet.dans_la_phrase[lang];
  if (!p || !v) return null;
  return PHRASE[lang](p, v);
}

/**
 * Erzeugt alle 42 Konstellationen als Entwurf.
 * `statut: 'entwurf'` und leere Inhaltsfelder heisst: wird nicht gebaut.
 */
export function construireSituations() {
  const out = [];
  for (const pays of PAYS) {
    for (const projet of PROJETS) {
      out.push({
        id: `${pays.id}--${projet.id}`,
        pays: pays.id,
        projet: projet.id,
        ordre: pays.ordre * 10 + projet.ordre,
        statut: 'entwurf',
        titre: {
          fr: phrase(pays, projet, 'fr'),
          de: phrase(pays, projet, 'de'),
          en: phrase(pays, projet, 'en'),
          lb: null,
        },
        // Die vier inhaltlichen Abschnitte. Bewusst leer.
        worum: { fr: null, de: null, en: null, lb: null },
        cadre: { fr: null, de: null, en: null, lb: null },
        notre_role: { fr: null, de: null, en: null, lb: null },
        vos_pieces: { fr: null, de: null, en: null, lb: null },
        themes: projet.themes,
        // Verweis fuer den Fall, dass die Konstellation nicht gebaut wird.
        famille: null, // wird in build-snapshot.mjs gesetzt
        ouvert: 'situations_contenu',
        updated_at: null,
      });
    }
  }
  return out;
}

/** Mindestumfang fuer eine Veroeffentlichung, in Woertern. */
export const SEUIL_MOTS = 400;

/** Die Felder, die fuer eine Veroeffentlichung belegt sein muessen. */
export const CHAMPS_REQUIS = ['worum', 'cadre', 'notre_role', 'vos_pieces'];
