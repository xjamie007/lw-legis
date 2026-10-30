/**
 * src/lib/content.ts — Zugriff auf die Inhalte.
 *
 * Gelesen wird ausschliesslich content/snapshot.json. Die oeffentliche
 * Seite stellt zur Laufzeit KEINE Datenbankabfrage: der Schnappschuss wird
 * vor dem Build geholt (scripts/fetch-content.mjs) oder aus den Quellen
 * zusammengesetzt (scripts/build-snapshot.mjs) und dann statisch
 * eingebacken.
 *
 * Eine Seite wird nur in einer Sprache gebaut, in der ihr Inhalt wirklich
 * vorliegt. Fehlt die englische Fassung eines Dossiers, gibt es dieses
 * Dossier auf der englischen Seite nicht — statt eines halb
 * franzoesischen Textes unter englischer Adresse.
 */
import brut from '../../content/snapshot.json';
import { LANGS, aValeur, type Lang, type Multi } from './langs';
import { oberflaecheVollstaendig } from './i18n';

// ---------------------------------------------------------------------------
// Typen
// ---------------------------------------------------------------------------

/** Eine Taetigkeit der Kanzlei (Tabelle `services`). */
export interface Activite {
  id: string;
  ordre: number;
  slug: Multi;
  terme: Multi;
  /** Der Kurztext aus der Uebersicht. */
  definition: Multi;
  /** Der Text der Detailseite, HTML. */
  texte: Multi;
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
  themes: string[];
  pdf: { chemin: string; octets: number } | null;
  /** Konferenz, die auf ein Dossier statt auf ein PDF verweist. */
  dossier: string | null;
  lien_externe: string | null;
  date_publication: string | null;
}

export interface Theme {
  id: string;
  slug: Multi;
  etiquette: Multi;
}

export interface Avocat {
  id: string;
  nom: string;
  titre_civil?: string;
  fonction: Multi;
  barreau_depuis?: number | null;
  /** Schluessel in `bilder`, oder null. */
  photo?: string | null;
  bio: Multi;
  ordre: number;
  statut: 'entwurf' | 'publie';
}

export interface Seite {
  titre: Multi;
  description: Multi;
  noindex?: boolean;
}

export const contenu = brut as unknown as {
  meta: { genere_le: string; source: string; version: number };
  settings: any;
  navigation: { id: string; cle: string; segment: string; ordre: number; visible: boolean }[];
  pied: { id: string; cle: string; segment: string; ordre: number; visible: boolean }[];
  pages: Record<string, any>;
  familles: Activite[];
  themes: Theme[];
  publications: Publication[];
  bilder: Record<string, any>;
  team: Avocat[];
  legal: Record<string, { titre: Multi; corps: Multi; chapeau?: Multi }>;
  seo: Record<string, Seite>;
  seo_modeles: Record<string, { titre: Multi }>;
  seo_limites: { titre: { min: number; max: number }; description: { min: number; max: number } };
};

// ---------------------------------------------------------------------------
// Abfragen
// ---------------------------------------------------------------------------

const parOrdre = <T extends { ordre: number }>(a: T, b: T) => a.ordre - b.ordre;

export function activites(lang: Lang): Activite[] {
  return contenu.familles
    .filter((a) => aValeur(a.slug, lang) && aValeur(a.terme, lang) && aValeur(a.texte, lang))
    .sort(parOrdre);
}

export function activiteParId(id: string): Activite | null {
  return contenu.familles.find((a) => a.id === id) ?? null;
}

export function dossiers(lang: Lang): Publication[] {
  return contenu.publications
    .filter(
      (p) =>
        p.type === 'dossier' &&
        p.statut === 'publie' &&
        aValeur(p.slug, lang) &&
        aValeur(p.titre, lang) &&
        aValeur(p.corps, lang),
    )
    .sort(parOrdre);
}

export function dossierParId(id: string | null, lang: Lang): Publication | null {
  if (!id) return null;
  return dossiers(lang).find((d) => d.id === id) ?? null;
}

/**
 * Konferenzunterlagen. Sie sind franzoesisch; auf der englischen Seite
 * erscheinen auch die ohne englischen Titel — als franzoesisch
 * gekennzeichnet, nicht stillschweigend.
 */
export function conferences(): Publication[] {
  return contenu.publications
    .filter((p) => p.type === 'conference' && p.statut === 'publie' && aValeur(p.titre, 'fr'))
    .sort(parOrdre);
}

export function equipe(lang: Lang): Avocat[] {
  return contenu.team
    .filter((m) => m.statut === 'publie' && Boolean(m.nom) && aValeur(m.bio, lang))
    .sort(parOrdre);
}

export function themeParId(id: string): Theme | null {
  return contenu.themes.find((t) => t.id === id) ?? null;
}

/** Themen, zu denen es mindestens einen Eintrag gibt — in der gegebenen Liste. */
export function themesDe(liste: Publication[], lang: Lang): Theme[] {
  const utilises = new Set(liste.flatMap((p) => p.themes));
  return contenu.themes.filter((t) => utilises.has(t.id) && aValeur(t.etiquette, lang));
}

/** Woerter eines HTML-Textes, fuer die Lesezeit. */
export function mots(html: string | null | undefined): number {
  return (html ?? '').replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length;
}

// ---------------------------------------------------------------------------
// Welche Sprachen werden ueberhaupt gebaut?
// ---------------------------------------------------------------------------

/**
 * Eine Sprachfassung wird nur gebaut, wenn die Oberflaeche vollstaendig
 * uebersetzt ist und die tragenden Seitentexte in dieser Sprache stehen.
 */
export function languesDuSite(): Lang[] {
  return LANGS.filter((l) => {
    if (!oberflaecheVollstaendig(l)) return false;
    const p = contenu.pages;
    return aValeur(p.accueil?.titre, l) && aValeur(p.activites?.titre, l) && aValeur(p.contact?.titre, l);
  });
}
