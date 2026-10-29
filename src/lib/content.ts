/**
 * src/lib/content.ts — Zugriff auf die Inhalte.
 *
 * Gelesen wird ausschliesslich content/snapshot.json. Die oeffentliche
 * Seite stellt zur Laufzeit KEINE Datenbankabfrage: der Schnappschuss wird
 * vor dem Build geholt (scripts/fetch-content.mjs) und dann statisch
 * eingebacken. Das haelt die Ladezeit unten und den Datenschutz sauber.
 *
 * Hier stehen ausserdem die Veroeffentlichungsschranken. Eine Seite wird
 * nur gebaut, wenn ihr Inhalt in der jeweiligen Sprache wirklich da ist.
 * Duenne oder halb uebersetzte Seiten schaden dem Ranking mehr, als sie
 * nuetzen — und auf einer Anwaltsseite schaden halbe Rechtsinhalte mehr
 * als das.
 */
import brut from '../../content/snapshot.json';
import { LANGS, aValeur, type Lang, type Multi } from './langs';
import { oberflaecheVollstaendig } from './i18n';

// ---------------------------------------------------------------------------
// Typen
// ---------------------------------------------------------------------------

export interface RefOuverte {
  __ouvert: string;
}

export interface PointOuvert {
  statut: 'fehlt' | 'unbestaetigt';
  bloquant: boolean;
  domaine: string;
  titre: string;
  question: string;
  etiquette: Multi;
}

export interface Famille {
  id: string;
  ordre: number;
  slug: Multi;
  terme: Multi;
  definition: Multi;
  /** Zwei, drei Wörter für die Schnellleiste unter dem Hero. */
  kurz: Multi;
  texte: Multi;
  marge: { terme: Multi; texte: Multi };
  matieres: Multi[];
}

export interface OptionAxe {
  id: string;
  ordre: number;
  slug: Multi;
  etiquette: Multi;
  dans_la_phrase: Multi;
  code?: string;
  themes?: string[];
}

export interface Situation {
  id: string;
  pays: string;
  projet: string;
  ordre: number;
  statut: 'entwurf' | 'publie';
  titre: Multi;
  worum: Multi;
  cadre: Multi;
  notre_role: Multi;
  vos_pieces: Multi;
  themes: string[];
  famille: string | null;
  ouvert: string | null;
}

export interface Publication {
  id: string;
  type: 'dossier' | 'conference';
  ordre: number;
  statut: 'entwurf' | 'publie';
  titre: Multi;
  slug: Multi;
  resume: Multi;
  corps: Multi;
  etat_du_droit: string | null;
  date_publication: string | null;
  auteur: string;
  langue_originale: Lang;
  pdf: { chemin: string; octets: number } | null;
  themes: string[];
  ouvert: string | null;
}

export interface Theme {
  id: string;
  slug: Multi;
  etiquette: Multi;
}

export interface MembreEquipe {
  id: string;
  nom: string;
  fonction: Multi;
  barreau_depuis?: number;
  langues?: string[];
  photo?: string | null;
  ordre: number;
  statut: 'entwurf' | 'publie';
}

export interface EntreeFaq {
  id: string;
  ordre: number;
  statut: 'entwurf' | 'publie';
  question: Multi;
  reponse: Multi;
  ouvert: string | null;
  complement_ouvert?: string;
}

export const contenu = brut as unknown as {
  meta: { genere_le: string; source: string; version: number };
  ouvertes: Record<string, PointOuvert>;
  settings: any;
  avocat: any;
  navigation: { id: string; cle: string; segment: string; ordre: number; visible: boolean }[];
  pied: { id: string; cle: string; segment: string; ordre: number; visible: boolean }[];
  sections_accueil: { id: string; ordre: number; visible: boolean; verrouille: boolean }[];
  pages: Record<string, any>;
  familles: Famille[];
  projet_vers_famille: Record<string, string>;
  situation_options: { pays: OptionAxe[]; projets: OptionAxe[] };
  situations: Situation[];
  themes: Theme[];
  publications: Publication[];
  bilder: Record<string, any>;
  team: MembreEquipe[];
  faq: EntreeFaq[];
  legal: Record<string, any>;
  seo: Record<string, { titre: Multi; description: Multi; noindex?: boolean }>;
  seo_modeles: Record<string, { titre: Multi }>;
  seo_limites: { titre: { min: number; max: number }; description: { min: number; max: number } };
};

// ---------------------------------------------------------------------------
// Offene Punkte
// ---------------------------------------------------------------------------

export function estRefOuverte(v: unknown): v is RefOuverte {
  return Boolean(v && typeof v === 'object' && '__ouvert' in (v as object));
}

export function pointOuvert(id: string): PointOuvert | null {
  return contenu.ouvertes[id] ?? null;
}

/** Beschriftung einer offenen Stelle, wie sie im HTML erscheint. */
export function etiquetteOuverte(id: string, lang: Lang): string {
  const p = pointOuvert(id);
  if (!p) return `[${id}]`;
  const e = p.etiquette?.[lang];
  const nom = typeof e === 'string' && e ? e : p.titre;
  const marque = p.statut === 'unbestaetigt' ? 'UNBESTÄTIGT' : 'FEHLT';
  return `${nom} — ${marque}`;
}

// ---------------------------------------------------------------------------
// Veroeffentlichungsschranken
// ---------------------------------------------------------------------------

/** Mindestumfang einer Konstellation, in Woertern eigenen Inhalts. */
export const SEUIL_MOTS_SITUATION = 400;

function compterMots(...champs: (string | null | undefined)[]): number {
  return champs
    .filter((c): c is string => typeof c === 'string')
    .join(' ')
    .replace(/<[^>]*>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
}

/**
 * Darf diese Konstellation in dieser Sprache gebaut werden?
 * Alle fuenf Felder muessen stehen und zusammen rund 400 Woerter ergeben.
 */
export function situationPubliable(s: Situation, lang: Lang): boolean {
  if (s.statut !== 'publie') return false;
  const requis: (keyof Situation)[] = ['titre', 'worum', 'cadre', 'notre_role', 'vos_pieces'];
  if (!requis.every((c) => aValeur(s[c] as Multi, lang))) return false;
  const mots = compterMots(
    (s.worum as Multi)[lang],
    (s.cadre as Multi)[lang],
    (s.notre_role as Multi)[lang],
    (s.vos_pieces as Multi)[lang],
  );
  return mots >= SEUIL_MOTS_SITUATION;
}

/**
 * Darf dieses Dokument in dieser Sprache gebaut werden?
 * `etat_du_droit` ist Pflichtfeld: ein undatiertes Steuerpapier schadet
 * der Kanzlei mehr, als es ihr nuetzt.
 */
export function publicationPubliable(p: Publication, lang: Lang): boolean {
  if (p.statut !== 'publie') return false;
  if (!p.etat_du_droit) return false;
  if (!aValeur(p.slug, lang)) return false;
  return ['titre', 'resume', 'corps'].every((c) => aValeur((p as any)[c] as Multi, lang));
}

export function faqPubliable(f: EntreeFaq, lang: Lang): boolean {
  return f.statut === 'publie' && aValeur(f.question, lang) && aValeur(f.reponse, lang);
}

export function membrePubliable(m: MembreEquipe, lang: Lang): boolean {
  return m.statut === 'publie' && Boolean(m.nom) && aValeur(m.fonction, lang);
}

// ---------------------------------------------------------------------------
// Abfragen
// ---------------------------------------------------------------------------

export function situationsPubliees(lang: Lang): Situation[] {
  return contenu.situations
    .filter((s) => situationPubliable(s, lang))
    .sort((a, b) => a.ordre - b.ordre);
}

export function publicationsPubliees(lang: Lang): Publication[] {
  return contenu.publications
    .filter((p) => publicationPubliable(p, lang))
    .sort((a, b) => {
      const da = a.date_publication ?? '';
      const db = b.date_publication ?? '';
      if (da !== db) return db.localeCompare(da);
      return a.ordre - b.ordre;
    });
}

export function faqPubliee(lang: Lang): EntreeFaq[] {
  return contenu.faq.filter((f) => faqPubliable(f, lang)).sort((a, b) => a.ordre - b.ordre);
}

/** Alle FAQ-Eintraege, auch unbeantwortete — fuer die sichtbare Lueckenanzeige. */
export function faqToutes(lang: Lang): EntreeFaq[] {
  return contenu.faq
    .filter((f) => aValeur(f.question, lang))
    .sort((a, b) => a.ordre - b.ordre);
}

export function equipePubliee(lang: Lang): MembreEquipe[] {
  return contenu.team.filter((m) => membrePubliable(m, lang)).sort((a, b) => a.ordre - b.ordre);
}

export function familles(lang: Lang): Famille[] {
  return contenu.familles
    .filter((f) => aValeur(f.slug, lang) && aValeur(f.terme, lang))
    .sort((a, b) => a.ordre - b.ordre);
}

export function familleParId(id: string | null): Famille | null {
  if (!id) return null;
  return contenu.familles.find((f) => f.id === id) ?? null;
}

export function paysOptions(lang: Lang): OptionAxe[] {
  return contenu.situation_options.pays
    .filter((p) => aValeur(p.slug, lang) && aValeur(p.etiquette, lang))
    .sort((a, b) => a.ordre - b.ordre);
}

export function projetOptions(lang: Lang): OptionAxe[] {
  return contenu.situation_options.projets
    .filter((p) => aValeur(p.slug, lang) && aValeur(p.etiquette, lang))
    .sort((a, b) => a.ordre - b.ordre);
}

export function themeParId(id: string): Theme | null {
  return contenu.themes.find((t) => t.id === id) ?? null;
}

/** Themen, zu denen es in dieser Sprache mindestens ein Dokument gibt. */
export function themesAvecDocuments(lang: Lang): Theme[] {
  const utilises = new Set(publicationsPubliees(lang).flatMap((p) => p.themes));
  return contenu.themes.filter((t) => utilises.has(t.id) && aValeur(t.slug, lang));
}

/** Jahre, zu denen es in dieser Sprache mindestens ein Dokument gibt. */
export function anneesAvecDocuments(lang: Lang): string[] {
  const set = new Set(
    publicationsPubliees(lang)
      .map((p) => p.etat_du_droit?.slice(0, 4))
      .filter((a): a is string => Boolean(a)),
  );
  return [...set].sort((a, b) => b.localeCompare(a));
}

/** Dokumente zu einem Thema — verbindet Bibliothek und Situationsmatrix. */
export function documentsParThemes(themes: string[], lang: Lang, max = 6): Publication[] {
  if (themes.length === 0) return [];
  return publicationsPubliees(lang)
    .filter((p) => p.themes.some((t) => themes.includes(t)))
    .slice(0, max);
}

// ---------------------------------------------------------------------------
// Welche Sprachen werden ueberhaupt gebaut?
// ---------------------------------------------------------------------------

/**
 * Eine Sprachfassung der Seite wird nur gebaut, wenn
 *   1. die Oberflaeche vollstaendig uebersetzt ist und
 *   2. die tragenden Seitentexte in dieser Sprache vorliegen.
 *
 * Fuer Luxemburgisch trifft beides nicht zu. Also gibt es kein /lb/ —
 * weder in der Sitemap noch in den hreflang-Angaben. Der Sprachumschalter
 * nennt die Sprache trotzdem und sagt, dass sie in Vorbereitung ist. Das
 * ist ehrlicher als eine Seite, auf der in jeder Zeile „[LB FEHLT]“ steht,
 * und besser fuer die Indexierung als eine halb franzoesische Fassung.
 */
export function languesDuSite(): Lang[] {
  return LANGS.filter((l) => {
    if (!oberflaecheVollstaendig(l)) return false;
    const p = contenu.pages;
    return (
      aValeur(p.accueil.sections.services.titre, l) &&
      aValeur(p.services.titre, l) &&
      aValeur(p.etude.titre, l) &&
      aValeur(p.contact.titre, l)
    );
  });
}

/** Sprachen, die es noch nicht gibt — fuer den Hinweis im Umschalter. */
export function languesEnPreparation(): Lang[] {
  const pretes = languesDuSite();
  return LANGS.filter((l) => !pretes.includes(l));
}
