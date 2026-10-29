/**
 * src/admin/atelier/chemins.ts — Vom angeklickten Text zum Datensatz.
 *
 * Die oeffentliche Seite markiert jeden bearbeitbaren Text mit
 * `data-lw="<tabelle>|<schluessel>|<pfad>"` (src/lib/edition.ts). Hier
 * steht alles, was der Redaktionsbereich damit anfaengt: den Wert lesen
 * und setzen, Unterschiede zwischen zwei Fassungen finden und beides so
 * benennen, dass ein Mensch ohne Datenbankkenntnis versteht, was gemeint
 * ist — „Startseite · Überschrift (Deutsch)“ statt
 * `settings.valeur.accueil.sections.services.titre.de`.
 */
import { SEGMENTS, type NomSegment } from '../../lib/routes';
import { LANGS, LANG_NOMS, type Lang } from '../../lib/langs';
import type { LangueAdmin } from '../i18n';

type Ligne = Record<string, any>;

export interface Cle {
  table: string;
  id: string;
  /** Spalte und Weg in das jsonb, ohne Sprache. */
  chemin: string[];
}

export function lireCle(attr: string): Cle {
  const [table, id, chemin = ''] = attr.split('|');
  return { table, id, chemin: chemin.split('.').filter(Boolean) };
}

export const texteCle = (c: Cle) => `${c.table}|${c.id}|${c.chemin.join('.')}`;

/** `settings` ist ueber `cle` geschluesselt, alles andere ueber `id`. */
export const colonneCle = (table: string) => (table === 'settings' ? 'cle' : 'id');

export function lire(objet: unknown, chemin: string[]): unknown {
  let x: any = objet;
  for (const teil of chemin) {
    if (x === null || x === undefined) return undefined;
    x = x[teil];
  }
  return x;
}

/** Setzt einen Wert tief im Objekt, ohne das Original anzufassen. */
export function poser<T>(objet: T, chemin: string[], valeur: unknown): T {
  if (chemin.length === 0) return valeur as T;
  const [tete, ...reste] = chemin;
  const index = /^\d+$/.test(tete) ? Number(tete) : null;
  const courant: any = objet ?? (index !== null ? [] : {});
  const copie: any = Array.isArray(courant) ? [...courant] : { ...courant };
  copie[index ?? tete] = poser(courant?.[index ?? tete], reste, valeur);
  return copie;
}

const estLangue = (s: string | undefined): s is Lang =>
  Boolean(s && (LANGS as readonly string[]).includes(s));

/**
 * Der bearbeitbare Wert hinter einem Text.
 *
 * `multi` heisst: das Feld gibt es je Sprache, bearbeitet wird die Sprache
 * der Seite. Sonst ist es ein einzelner Text fuer alle Sprachen (ein Name,
 * eine Telefonnummer).
 */
export function valeurDe(ligne: Ligne | undefined, cle: Cle, lang: Lang) {
  const brut = lire(ligne, cle.chemin);
  if (typeof brut === 'string') {
    return { texte: brut, multi: false, chemin: cle.chemin };
  }
  const multi = (brut ?? {}) as Record<string, unknown>;
  const v = multi[lang];
  return {
    texte: typeof v === 'string' ? v : '',
    multi: true,
    chemin: [...cle.chemin, lang],
    reference: typeof multi.fr === 'string' ? (multi.fr as string) : '',
  };
}

// ---------------------------------------------------------------------------
// Unterschiede zwischen zwei Fassungen
// ---------------------------------------------------------------------------

export interface Difference {
  chemin: string[];
  avant: unknown;
  apres: unknown;
}

/** Diese Spalten aendern sich bei jedem Speichern und sagen nichts aus. */
const IGNOREES = new Set(['updated_at', 'updated_by']);

const vide = (v: unknown) => v === null || v === undefined || v === '';
const estObjet = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

export function differences(avant: unknown, apres: unknown, chemin: string[] = []): Difference[] {
  if (vide(avant) && vide(apres)) return [];
  if (estObjet(avant) || estObjet(apres)) {
    const a = estObjet(avant) ? avant : {};
    const b = estObjet(apres) ? apres : {};
    const cles = new Set([...Object.keys(a), ...Object.keys(b)]);
    return [...cles]
      .filter((k) => !(chemin.length === 0 && IGNOREES.has(k)))
      .flatMap((k) => differences(a[k], b[k], [...chemin, k]));
  }
  if (Array.isArray(avant) && Array.isArray(apres) && avant.length === apres.length) {
    return avant.flatMap((x, i) => differences(x, apres[i], [...chemin, String(i)]));
  }
  return JSON.stringify(avant) === JSON.stringify(apres) ? [] : [{ chemin, avant, apres }];
}

// ---------------------------------------------------------------------------
// Namen, die ein Mensch versteht
// ---------------------------------------------------------------------------

const L = (de: string, fr: string) => ({ de, fr });

const NOMS_CHAMPS: Record<string, { de: string; fr: string }> = {
  titre: L('Überschrift', 'Titre'),
  chapeau: L('Einleitung', 'Introduction'),
  texte: L('Text', 'Texte'),
  corps: L('Text', 'Texte'),
  terme: L('Bezeichnung', 'Intitulé'),
  definition: L('Kurzbeschreibung', 'Définition'),
  kurz: L('Kurzform in der dunklen Leiste', 'Forme courte (barre sombre)'),
  lien: L('Linktext', 'Texte du lien'),
  appel: L('Hinweis vor der Telefonnummer', 'Texte avant le numéro'),
  question: L('Frage', 'Question'),
  reponse: L('Antwort', 'Réponse'),
  resume: L('Kurzfassung', 'Résumé'),
  fonction: L('Funktion', 'Fonction'),
  nom: L('Name', 'Nom'),
  role: L('Beschreibung', 'Description'),
  marge_terme: L('Randnotiz: Stichwort', 'Note en marge : mot-clé'),
  marge_texte: L('Randnotiz: Text', 'Note en marge : texte'),
  matieres: L('Rechtsgebiet', 'Matière'),
  etapes: L('Schritt', 'Étape'),
  parcours: L('Werdegang', 'Parcours'),
  fonctions: L('Amt', 'Fonction'),
  note_transparence: L('Hinweis', 'Note'),
  note_etat: L('Hinweis', 'Note'),
  ensuite: L('Wie es weitergeht', 'La suite'),
  worum: L('Worum es geht', 'De quoi il s’agit'),
  cadre: L('Was in Luxemburg gilt', 'Ce qui s’applique'),
  notre_role: L('Was wir übernehmen', 'Ce dont nous nous chargeons'),
  vos_pieces: L('Was wir von Ihnen brauchen', 'Ce dont nous avons besoin'),
  etiquette: L('Bezeichnung', 'Intitulé'),
  description: L('Beschreibung für Google', 'Description pour Google'),
  ordre: L('Reihenfolge', 'Ordre'),
  visible: L('Sichtbar', 'Visible'),
  statut: L('Veröffentlicht oder Entwurf', 'Publié ou brouillon'),
  etat_du_droit: L('Rechtsstand', 'État du droit'),
  date_publication: L('Datum', 'Date'),
  alt: L('Bildbeschreibung', 'Description de l’image'),
  point_x: L('Bildausschnitt', 'Cadrage'),
  point_y: L('Bildausschnitt', 'Cadrage'),
  chemin: L('Datei', 'Fichier'),
  variantes: L('Bilddatei', 'Fichier image'),
  largeur: L('Bilddatei', 'Fichier image'),
  hauteur: L('Bilddatei', 'Fichier image'),
  octets: L('Bilddatei', 'Fichier image'),
};

const NOMS_PAGES: Record<string, { de: string; fr: string }> = {
  accueil: L('Startseite', 'Accueil'),
  services: L('Tätigkeitsgebiete', 'Domaines d’activité'),
  situations: L('Ihre Situation', 'Votre situation'),
  etude: L('Die Kanzlei', 'L’Étude'),
  publications: L('Publikationen', 'Publications'),
  honoraires: L('Honorare', 'Honoraires'),
  contact: L('Kontakt', 'Contact'),
  recu: L('Bestätigung nach dem Formular', 'Confirmation du formulaire'),
  mentions: L('Impressum', 'Mentions légales'),
  donnees: L('Datenschutz', 'Protection des données'),
  conditions: L('Geschäftsbedingungen', 'Conditions générales'),
};

const NOMS_SECTIONS: Record<string, { de: string; fr: string }> = {
  hero: L('Großer Satz ganz oben', 'Grande phrase en haut'),
  services: L('Abschnitt „Was wir tun“', 'Section « Ce que nous faisons »'),
  avocat: L('Abschnitt über Me Lorang', 'Section sur Me Lorang'),
  bureau: L('Abschnitt „Die Kanzlei“ mit Bildern', 'Section « L’Étude » avec photos'),
  publications: L('Abschnitt „Publikationen“', 'Section « Publications »'),
  honoraires: L('Abschnitt „Honorare“', 'Section « Honoraires »'),
  faq: L('Häufige Fragen', 'Questions fréquentes'),
  contact: L('Abschnitt „Kontakt“', 'Section « Contact »'),
};

export function nomPage(id: string, la: LangueAdmin): string {
  return NOMS_PAGES[id]?.[la] ?? id;
}

/** Der Name des Feldes, etwa „Überschrift“ oder „Schritt 2“. */
export function nomChamp(chemin: string[], la: LangueAdmin): string {
  const sansLangue = estLangue(chemin[chemin.length - 1]) ? chemin.slice(0, -1) : chemin;
  const dernier = sansLangue[sansLangue.length - 1];
  if (dernier && /^\d+$/.test(dernier)) {
    const liste = sansLangue[sansLangue.length - 2];
    return `${NOMS_CHAMPS[liste]?.[la] ?? liste} ${Number(dernier) + 1}`;
  }
  // marge.terme in den Seitentexten heisst in den Tabellen marge_terme.
  const avant = sansLangue[sansLangue.length - 2];
  if (avant === 'marge' && NOMS_CHAMPS[`marge_${dernier}`]) {
    return NOMS_CHAMPS[`marge_${dernier}`][la];
  }
  // parcours.2.texte: „Werdegang 3“ sagt mehr als „Text“.
  if (avant && /^\d+$/.test(avant)) {
    const liste = sansLangue[sansLangue.length - 3];
    const nom = NOMS_CHAMPS[liste]?.[la];
    if (nom && liste !== 'blocs') return `${nom} ${Number(avant) + 1}`;
  }
  return NOMS_CHAMPS[dernier]?.[la] ?? (la === 'de' ? 'Text' : 'Texte');
}

export function nomLangue(chemin: string[]): string | null {
  const l = chemin[chemin.length - 1];
  return estLangue(l) ? LANG_NOMS[l] : null;
}

/** Kurzer Titel einer Zeile, fuer Aufzaehlungen: „Tätigkeitsgebiet „Erbrecht““. */
function titreLigne(ligne: Ligne | undefined, champ: string): string {
  const v = ligne?.[champ];
  const brut = typeof v === 'string' ? v : v?.de || v?.fr || v?.en || '';
  return apercu(brut, 50);
}

/** Wo auf der Website steht dieser Text? */
export function lieu(table: string, id: string, chemin: string[], ligne: Ligne | undefined, la: LangueAdmin): string {
  const guillemets = (s: string) => (la === 'de' ? `„${s}“` : `« ${s} »`);
  switch (table) {
    case 'settings': {
      if (id === 'pages') {
        const page = chemin[1];
        const base = nomPage(page, la);
        if (page === 'accueil' && chemin[2] === 'sections' && NOMS_SECTIONS[chemin[3]]) {
          return `${base} · ${NOMS_SECTIONS[chemin[3]][la]}`;
        }
        // Ein Unterabschnitt mit eigener Ueberschrift, etwa etude.intuitu:
        // dann steht diese Ueberschrift dabei, damit man ihn wiederfindet.
        // `etude.titre.de` ist dagegen ein Feld, kein Unterabschnitt.
        const sous = ligne?.valeur?.[page]?.[chemin[2]];
        const estAbschnitt = estObjet(sous) && !Object.keys(sous).every(estLangue);
        const titre = estAbschnitt ? titreLigne(sous, 'titre') : '';
        if (titre) return `${base} · ${guillemets(titre)}`;
        return base;
      }
      if (id === 'avocat') return la === 'de' ? 'Angaben zu Me Lorang' : 'Données sur Me Lorang';
      return la === 'de' ? 'Kanzleidaten' : 'Données de l’Étude';
    }
    case 'services':
      return `${la === 'de' ? 'Tätigkeitsgebiet' : 'Domaine'} ${guillemets(titreLigne(ligne, 'terme'))}`;
    case 'faq':
      return `${la === 'de' ? 'Häufige Frage' : 'Question'} ${guillemets(titreLigne(ligne, 'question'))}`;
    case 'publications':
      return `${la === 'de' ? 'Dokument' : 'Document'} ${guillemets(titreLigne(ligne, 'titre'))}`;
    case 'situations':
      return `${la === 'de' ? 'Situation' : 'Situation'} ${guillemets(titreLigne(ligne, 'titre'))}`;
    case 'team':
      return `Team: ${titreLigne(ligne, 'nom')}`;
    case 'legal_pages':
      return nomPage(id, la);
    case 'sections':
      return `${nomPage('accueil', la)} · ${NOMS_SECTIONS[id]?.[la] ?? id}`;
    case 'seo_meta':
      return la === 'de' ? `Angaben für Google (${id})` : `Données pour Google (${id})`;
    case 'publication_tags':
      return `${la === 'de' ? 'Thema' : 'Thème'} ${guillemets(titreLigne(ligne, 'etiquette'))}`;
    case 'media': {
      const datei = String(ligne?.chemin ?? '').split('/').pop() || id;
      return `${la === 'de' ? 'Bild' : 'Image'} ${guillemets(datei)}`;
    }
    default:
      return table;
  }
}

// ---------------------------------------------------------------------------
// Adressen der Website
// ---------------------------------------------------------------------------

const seg = (n: NomSegment, lang: Lang) => SEGMENTS[n][lang] ?? null;
/** Fehlt ein Teil, endet die Adresse davor — auf der Seite eine Ebene hoeher. */
function adresse(lang: Lang, ...teile: (string | null | undefined)[]) {
  const fehlt = teile.findIndex((t) => !t);
  const gueltig = fehlt === -1 ? teile : teile.slice(0, fehlt);
  return gueltig.length ? `/${lang}/${gueltig.join('/')}/` : `/${lang}/`;
}

/** Die Seiten, die man oben in der Auswahl direkt ansteuern kann. */
export function pagesPrincipales(lang: Lang, la: LangueAdmin) {
  const liste: { nom: string; chemin: string }[] = [
    { nom: nomPage('accueil', la), chemin: `/${lang}/` },
  ];
  const noms: NomSegment[] = [
    'services',
    'situations',
    'etude',
    'publications',
    'honoraires',
    'contact',
    'mentions',
    'donnees',
    'conditions',
  ];
  for (const n of noms) {
    const s = seg(n, lang);
    if (s) liste.push({ nom: nomPage(n, la), chemin: `/${lang}/${s}/` });
  }
  return liste;
}

/** Wie heisst die Seite, die gerade in der Vorschau steht? */
export function nomDeLaPage(chemin: string, titreH1: string, la: LangueAdmin): string {
  const [lang, premier, ...reste] = chemin.split('/').filter(Boolean);
  if (!estLangue(lang)) return titreH1 || chemin;
  if (!premier) return nomPage('accueil', la);
  const nom = (Object.keys(SEGMENTS) as NomSegment[]).find((n) => SEGMENTS[n][lang] === premier);
  const base = nom ? nomPage(nom, la) : premier;
  if (reste.length === 0) return base;
  return titreH1 ? `${base} › ${apercu(titreH1, 60)}` : base;
}

/** Auf welcher Seite laesst sich eine Aenderung ansehen? */
export function adresseDe(table: string, id: string, chemin: string[], ligne: Ligne | undefined, lang: Lang): string {
  const slug = (champ = 'slug') => {
    const v = ligne?.[champ]?.[lang];
    return typeof v === 'string' && v ? v : null;
  };
  switch (table) {
    case 'settings':
      if (id === 'pages') {
        const page = chemin[1] as NomSegment | 'accueil';
        if (page === 'accueil' || !(page in SEGMENTS)) return `/${lang}/`;
        return adresse(lang, seg(page as NomSegment, lang));
      }
      return adresse(lang, seg(id === 'avocat' ? 'etude' : 'contact', lang));
    case 'services':
      return adresse(lang, seg('services', lang), slug());
    case 'publications':
      return adresse(lang, seg('publications', lang), slug());
    case 'publication_tags':
      return adresse(lang, seg('publications', lang), seg('theme', lang), slug());
    case 'situations':
      return adresse(lang, seg('situations', lang));
    case 'team':
      return adresse(lang, seg('etude', lang));
    case 'legal_pages':
      return id in SEGMENTS ? adresse(lang, seg(id as NomSegment, lang)) : `/${lang}/`;
    default:
      return `/${lang}/`;
  }
}

/** Text ohne Auszeichnung, gekuerzt — fuer „vorher / nachher“. */
export function apercu(v: unknown, max = 140): string {
  if (typeof v !== 'string') {
    if (typeof v === 'boolean') return v ? '✓' : '—';
    if (typeof v === 'number') return String(v);
    return '';
  }
  const brut = v
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return brut.length > max ? `${brut.slice(0, max - 1)}…` : brut;
}
