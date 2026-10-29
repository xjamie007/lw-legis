/**
 * src/admin/schema.ts — Was der Redaktionsbereich zu bearbeiten gibt.
 *
 * Jede Sammlung wird hier einmal beschrieben; Liste und Formular entstehen
 * daraus von selbst. Neue Felder kommen hier hinein und nicht an fuenf
 * Stellen in der Oberflaeche.
 *
 * NICHT bearbeitbar sind Farben, Schriften, Abstaende und das Raster.
 * Der Editor kennt keine Schriftart-, Groessen- oder Farbauswahl. Ein
 * Design, das der Redakteur verstellen kann, ist nach drei Monaten tot.
 */
import type { LangueAdmin } from './i18n';

export type TypeChamp =
  | 'texte' // einzeilig, mehrsprachig
  | 'texte_long' // mehrzeilig, mehrsprachig, mit Formatierung
  | 'texte_simple' // einzeilig, NICHT mehrsprachig (Name, Dateipfad)
  | 'nombre'
  | 'date'
  | 'bascule'
  | 'choix'
  | 'liste_texte' // mehrsprachige Liste (z. B. Rechtsgebiete)
  | 'etiquettes' // Themen-Tags
  | 'media'
  | 'seo_titre'
  | 'seo_description';

export interface Champ {
  nom: string;
  etiquette: { de: string; fr: string };
  type: TypeChamp;
  aide?: { de: string; fr: string };
  /** Pflicht fuer die Veroeffentlichung. */
  requis?: boolean;
  /** Nur der owner darf dieses Feld aendern. */
  reserveOwner?: boolean;
  options?: { valeur: string; etiquette: { de: string; fr: string } }[];
}

export interface Collection {
  /** Tabellenname in der Datenbank. */
  table: string;
  /** Schluessel in der Adminnavigation. */
  cleNav: string;
  /** Darf der Redakteur hier neue Eintraege anlegen und loeschen? */
  creable: boolean;
  supprimable: boolean;
  /** Nur der owner sieht und bearbeitet diese Sammlung. */
  reserveOwner?: boolean;
  /** Feld, das in der Liste als Bezeichnung dient. */
  champTitre: string;
  /** Feste Namen je id, wenn die Eintraege keinen eigenen Titel haben. */
  nomsFixes?: Record<string, { de: string; fr: string }>;
  /** Hat diese Sammlung einen Entwurf/Veroeffentlicht-Status? */
  statut: boolean;
  /** Lassen sich die Eintraege umsortieren? */
  triable: boolean;
  champs: Champ[];
  /** Felder, die fuer eine Veroeffentlichung in JEDER Sprache stehen muessen. */
  requisParLangue?: string[];
  /** Mindestzahl eigener Woerter fuer die Veroeffentlichung. */
  seuilMots?: number;
}

const L = (de: string, fr: string) => ({ de, fr });

const STATUT_OPTIONS = [
  { valeur: 'entwurf', etiquette: L('Entwurf', 'Brouillon') },
  { valeur: 'veroeffentlicht', etiquette: L('Veröffentlicht', 'Publié') },
];

export const COLLECTIONS: Record<string, Collection> = {
  // =========================================================================
  /**
   * Von den Sektionen nutzt die Website nur Reihenfolge und Sichtbarkeit
   * (fetch-content.mjs, `sections_accueil`). Ihre Texte stehen in
   * `settings.pages` und werden in der Vorschau bearbeitet. Frueher gab es
   * hier auch Felder fuer Ueberschrift und Text — Aenderungen daran kamen
   * nie auf der Website an.
   */
  sections: {
    table: 'sections',
    cleNav: 'nav.sektionen',
    creable: false,
    supprimable: false,
    champTitre: 'id',
    nomsFixes: {
      hero: L('Großer Satz ganz oben', 'Grande phrase en haut'),
      services: L('Was wir tun', 'Ce que nous faisons'),
      avocat: L('Über Me Lorang', 'Me Lorang'),
      bureau: L('Die Kanzlei (Bilder)', 'L’Étude (photos)'),
      publications: L('Publikationen', 'Publications'),
      honoraires: L('Honorare', 'Honoraires'),
      faq: L('Häufige Fragen', 'Questions fréquentes'),
      contact: L('Kontakt', 'Contact'),
    },
    statut: false,
    triable: true,
    champs: [
      {
        nom: 'visible',
        etiquette: L('Auf der Startseite zeigen', 'Afficher sur l’accueil'),
        type: 'bascule',
      },
    ],
  },

  // =========================================================================
  services: {
    table: 'services',
    cleNav: 'nav.services',
    creable: true,
    supprimable: true,
    champTitre: 'terme',
    statut: true,
    triable: true,
    champs: [
      { nom: 'terme', etiquette: L('Bezeichnung', 'Intitulé'), type: 'texte', requis: true },
      { nom: 'slug', etiquette: L('Adresse', 'Adresse'), type: 'texte', requis: true },
      {
        nom: 'definition',
        etiquette: L('Definitionszeile', 'Ligne de définition'),
        type: 'texte',
        aide: L(
          'Ein Satz, der sagt, was das Gebiet ist — nicht, wie gut die Kanzlei darin ist.',
          'Une phrase qui dit ce qu’est le domaine, non à quel point l’Étude y est bonne.',
        ),
        requis: true,
      },
      { nom: 'texte', etiquette: L('Zwei Sätze', 'Deux phrases'), type: 'texte_long', requis: true },
      {
        nom: 'kurz',
        etiquette: L('Kurzform für die Leiste', 'Forme courte pour la barre'),
        type: 'texte',
        aide: L(
          'Zwei, drei Wörter für die dunkle Leiste unter dem Hero. Sie müssen im Vorbeigehen lesbar sein — keine Fachsprache, nur die Tätigkeiten.',
          'Deux ou trois mots pour la barre sombre sous le hero. Ils doivent se lire au passage — pas de jargon, seulement les activités.',
        ),
        requis: true,
      },
      { nom: 'marge_terme', etiquette: L('Randspalte: Stichwort', 'Marge : mot-clé'), type: 'texte' },
      { nom: 'marge_texte', etiquette: L('Randspalte: Text', 'Marge : texte'), type: 'texte' },
      {
        nom: 'matieres',
        etiquette: L('Einzelne Rechtsgebiete', 'Matières'),
        type: 'liste_texte',
      },
      { nom: 'statut', etiquette: L('Status', 'Statut'), type: 'choix', options: STATUT_OPTIONS },
    ],
    requisParLangue: ['terme', 'slug', 'definition', 'texte', 'kurz'],
  },

  // =========================================================================
  situations: {
    table: 'situations',
    cleNav: 'nav.situations',
    creable: true,
    supprimable: true,
    champTitre: 'titre',
    statut: true,
    triable: false,
    champs: [
      {
        nom: 'titre',
        etiquette: L('Der vollendete Satz', 'La phrase complétée'),
        type: 'texte',
        requis: true,
      },
      {
        nom: 'worum',
        etiquette: L('Worum es geht', 'De quoi il s’agit'),
        type: 'texte_long',
        aide: L('Zwei bis drei Sätze.', 'Deux à trois phrases.'),
        requis: true,
      },
      {
        nom: 'cadre',
        etiquette: L('Was in Luxemburg dafür gilt', 'Ce qui s’applique au Luxembourg'),
        type: 'texte_long',
        aide: L(
          'Konkrete Regeln, Fristen, Behörden, Steuern. Rechtsinhalt — nur von der Kanzlei.',
          'Règles, délais, administrations, impôts. Contenu juridique — par l’Étude seule.',
        ),
        requis: true,
      },
      {
        nom: 'notre_role',
        etiquette: L('Was wir übernehmen', 'Ce dont nous nous chargeons'),
        type: 'texte_long',
        requis: true,
      },
      {
        nom: 'vos_pieces',
        etiquette: L('Was wir von Ihnen brauchen', 'Ce dont nous avons besoin'),
        type: 'texte_long',
        requis: true,
      },
      { nom: 'themes', etiquette: L('Themen', 'Thèmes'), type: 'etiquettes' },
      { nom: 'statut', etiquette: L('Status', 'Statut'), type: 'choix', options: STATUT_OPTIONS },
    ],
    requisParLangue: ['titre', 'worum', 'cadre', 'notre_role', 'vos_pieces'],
    seuilMots: 400,
  },

  // =========================================================================
  publications: {
    table: 'publications',
    cleNav: 'nav.publications',
    creable: true,
    supprimable: true,
    champTitre: 'titre',
    statut: true,
    triable: true,
    champs: [
      { nom: 'titre', etiquette: L('Titel', 'Titre'), type: 'texte', requis: true },
      { nom: 'slug', etiquette: L('Adresse', 'Adresse'), type: 'texte', requis: true },
      { nom: 'resume', etiquette: L('Kurzfassung', 'Résumé'), type: 'texte_long', requis: true },
      { nom: 'corps', etiquette: L('Volltext', 'Texte intégral'), type: 'texte_long', requis: true },
      {
        nom: 'etat_du_droit',
        etiquette: L('Rechtsstand', 'État du droit'),
        type: 'date',
        aide: L(
          'Pflichtfeld. Ohne dieses Datum wird das Dokument nicht veröffentlicht.',
          'Obligatoire. Sans cette date, le document n’est pas publié.',
        ),
        requis: true,
      },
      { nom: 'date_publication', etiquette: L('Datum', 'Date'), type: 'date' },
      {
        nom: 'type',
        etiquette: L('Art', 'Type'),
        type: 'choix',
        options: [
          { valeur: 'dossier', etiquette: L('Fachdossier', 'Dossier juridique') },
          { valeur: 'conference', etiquette: L('Konferenzunterlage', 'Support de conférence') },
        ],
      },
      { nom: 'auteur', etiquette: L('Autor', 'Auteur'), type: 'texte_simple' },
      { nom: 'pdf_chemin', etiquette: L('PDF', 'PDF'), type: 'texte_simple' },
      { nom: 'themes', etiquette: L('Themen', 'Thèmes'), type: 'etiquettes' },
      { nom: 'statut', etiquette: L('Status', 'Statut'), type: 'choix', options: STATUT_OPTIONS },
    ],
    requisParLangue: ['titre', 'slug', 'resume', 'corps'],
  },

  // =========================================================================
  team: {
    table: 'team',
    cleNav: 'nav.team',
    creable: true,
    supprimable: true,
    champTitre: 'nom',
    statut: true,
    triable: true,
    champs: [
      { nom: 'nom', etiquette: L('Name', 'Nom'), type: 'texte_simple', requis: true },
      { nom: 'fonction', etiquette: L('Funktion', 'Fonction'), type: 'texte', requis: true },
      {
        nom: 'barreau_depuis',
        etiquette: L('Am Barreau seit', 'Au barreau depuis'),
        type: 'nombre',
      },
      { nom: 'photo_id', etiquette: L('Foto', 'Photographie'), type: 'media' },
      { nom: 'statut', etiquette: L('Status', 'Statut'), type: 'choix', options: STATUT_OPTIONS },
    ],
    requisParLangue: ['fonction'],
  },

  // =========================================================================
  faq: {
    table: 'faq',
    cleNav: 'nav.faq',
    creable: true,
    supprimable: true,
    champTitre: 'question',
    statut: true,
    triable: true,
    champs: [
      { nom: 'question', etiquette: L('Frage', 'Question'), type: 'texte', requis: true },
      { nom: 'reponse', etiquette: L('Antwort', 'Réponse'), type: 'texte_long', requis: true },
      { nom: 'statut', etiquette: L('Status', 'Statut'), type: 'choix', options: STATUT_OPTIONS },
    ],
    requisParLangue: ['question', 'reponse'],
  },

  // =========================================================================
  pages: {
    table: 'pages',
    cleNav: 'nav.seiten',
    creable: false,
    supprimable: false,
    champTitre: 'titre',
    statut: true,
    triable: false,
    champs: [
      { nom: 'titre', etiquette: L('Überschrift', 'Titre'), type: 'texte', requis: true },
      { nom: 'chapeau', etiquette: L('Einleitung', 'Chapeau'), type: 'texte_long' },
      { nom: 'corps', etiquette: L('Text', 'Texte'), type: 'texte_long' },
      { nom: 'statut', etiquette: L('Status', 'Statut'), type: 'choix', options: STATUT_OPTIONS },
    ],
    requisParLangue: ['titre'],
  },

  // =========================================================================
  seo_meta: {
    table: 'seo_meta',
    cleNav: 'nav.seo',
    creable: false,
    supprimable: false,
    champTitre: 'id',
    statut: false,
    triable: false,
    champs: [
      { nom: 'titre', etiquette: L('Title', 'Title'), type: 'seo_titre', requis: true },
      {
        nom: 'description',
        etiquette: L('Description', 'Description'),
        type: 'seo_description',
        requis: true,
      },
      { nom: 'og_image_id', etiquette: L('Teilbild', 'Image de partage'), type: 'media' },
      {
        nom: 'noindex',
        etiquette: L('Von Suchmaschinen ausschließen', 'Exclure des moteurs'),
        type: 'bascule',
      },
    ],
    requisParLangue: ['titre', 'description'],
  },

  // =========================================================================
  legal_pages: {
    table: 'legal_pages',
    cleNav: 'nav.legal',
    creable: false,
    supprimable: false,
    reserveOwner: true,
    champTitre: 'titre',
    statut: true,
    triable: false,
    champs: [
      { nom: 'titre', etiquette: L('Überschrift', 'Titre'), type: 'texte', requis: true },
      { nom: 'chapeau', etiquette: L('Einleitung', 'Chapeau'), type: 'texte_long' },
      { nom: 'corps', etiquette: L('Text', 'Texte'), type: 'texte_long', requis: true },
      { nom: 'statut', etiquette: L('Status', 'Statut'), type: 'choix', options: STATUT_OPTIONS },
    ],
    requisParLangue: ['titre', 'corps'],
  },
};

/**
 * Reihenfolge unter „Weitere Inhalte“.
 *
 * `pages` steht nicht mehr darin: Die Tabelle wird beim Bauen gar nicht
 * gelesen — die Seitentexte liegen in `settings.pages`. Wer dort etwas
 * aenderte, sah es nie auf der Website.
 */
export const ORDRE_NAV = [
  'sections',
  'services',
  'situations',
  'publications',
  'faq',
  'team',
  'seo_meta',
  'legal_pages',
];

export function etiquetteChamp(c: Champ, langue: LangueAdmin): string {
  return c.etiquette[langue];
}
