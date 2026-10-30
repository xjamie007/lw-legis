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
        etiquette: L('Kurztext in der Übersicht', 'Texte court dans la liste'),
        type: 'texte',
        requis: true,
      },
      { nom: 'texte', etiquette: L('Text der Seite', 'Texte de la page'), type: 'texte_long', requis: true },
      { nom: 'statut', etiquette: L('Status', 'Statut'), type: 'choix', options: STATUT_OPTIONS },
    ],
    requisParLangue: ['terme', 'slug', 'definition', 'texte'],
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
      {
        nom: 'dossier',
        etiquette: L('Verweist auf das Dossier', 'Renvoie au dossier'),
        type: 'texte_simple',
        aide: L('Nur für Konferenzen ohne PDF: die Kennung des Dossiers.', 'Seulement pour une conférence sans PDF : l’identifiant du dossier.'),
      },
      { nom: 'lien_externe', etiquette: L('Veranstaltungsseite', 'Page de l’événement'), type: 'texte_simple' },
      { nom: 'themes', etiquette: L('Themen', 'Thèmes'), type: 'etiquettes' },
      { nom: 'statut', etiquette: L('Status', 'Statut'), type: 'choix', options: STATUT_OPTIONS },
    ],
    // Konferenzen haben keinen Volltext und keine eigene Adresse.
    requisParLangue: ['titre'],
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
      { nom: 'titre_civil', etiquette: L('Anrede', 'Civilité'), type: 'texte_simple' },
      { nom: 'nom', etiquette: L('Name', 'Nom'), type: 'texte_simple', requis: true },
      { nom: 'fonction', etiquette: L('Funktion', 'Fonction'), type: 'texte', requis: true },
      { nom: 'bio', etiquette: L('Werdegang', 'Parcours'), type: 'texte_long', requis: true },
      {
        nom: 'barreau_depuis',
        etiquette: L('Am Barreau seit', 'Au barreau depuis'),
        type: 'nombre',
      },
      {
        nom: 'photo',
        etiquette: L('Foto', 'Photographie'),
        type: 'texte_simple',
        aide: L('Bildplatz aus der Bildablage, z. B. „portrait“. Leer: ohne Foto.', 'Emplacement d’image, p. ex. « portrait ». Vide : sans photo.'),
      },
      { nom: 'statut', etiquette: L('Status', 'Statut'), type: 'choix', options: STATUT_OPTIONS },
    ],
    requisParLangue: ['fonction', 'bio'],
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
export const ORDRE_NAV = ['services', 'publications', 'team', 'seo_meta', 'legal_pages'];

export function etiquetteChamp(c: Champ, langue: LangueAdmin): string {
  return c.etiquette[langue];
}
