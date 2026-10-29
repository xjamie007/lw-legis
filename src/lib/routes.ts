/**
 * src/lib/routes.ts — Die Adressen der Seite.
 *
 * Jede Sprache bekommt ihre eigenen, sprechenden Pfadsegmente. Das ist der
 * Grund, warum das Sprach-Routing nicht ueber Astros `i18n`-Option laeuft:
 * die kann nur ein Praefix voranstellen, nicht die Segmente uebersetzen.
 *
 *   /fr/votre-situation/france/acheter-un-bien-immobilier/
 *   /de/ihre-situation/frankreich/immobilie-kaufen/
 *   /en/your-situation/france/buying-property/
 *
 * Alle Adressen enden auf einen Schraegstrich (astro.config: trailingSlash).
 */
import { LANGS, type Lang, type Multi } from './langs';

/** Ein Pfadsegment je Sprache. `null` = fuer diese Sprache noch nicht geliefert. */
export type Segment = Multi;

export const SEGMENTS = {
  situations: { fr: 'votre-situation', de: 'ihre-situation', en: 'your-situation', lb: null },
  services: {
    fr: 'domaines-d-activite',
    de: 'taetigkeitsgebiete',
    en: 'practice-areas',
    lb: null,
  },
  etude: { fr: 'l-etude', de: 'die-kanzlei', en: 'the-firm', lb: null },
  publications: { fr: 'publications', de: 'publikationen', en: 'publications', lb: null },
  honoraires: { fr: 'honoraires', de: 'honorare', en: 'fees', lb: null },
  contact: { fr: 'contact', de: 'kontakt', en: 'contact', lb: null },
  mentions: { fr: 'mentions-legales', de: 'impressum', en: 'legal-notice', lb: null },
  donnees: {
    fr: 'protection-des-donnees',
    de: 'datenschutz',
    en: 'privacy-policy',
    lb: null,
  },
  conditions: { fr: 'conditions-generales', de: 'agb', en: 'terms', lb: null },
  // Filtersegmente der Bibliothek
  theme: { fr: 'theme', de: 'thema', en: 'topic', lb: null },
  annee: { fr: 'annee', de: 'jahr', en: 'year', lb: null },
  // Bestaetigungsseite des Formulars
  recu: { fr: 'message-recu', de: 'nachricht-erhalten', en: 'message-received', lb: null },
} as const satisfies Record<string, Segment>;

export type NomSegment = keyof typeof SEGMENTS;

/** Liefert das Segment, oder null, wenn es fuer die Sprache fehlt. */
export function seg(nom: NomSegment, lang: Lang): string | null {
  return SEGMENTS[nom][lang] ?? null;
}

/**
 * Baut eine Adresse. Gibt `null` zurueck, sobald ein Segment in dieser
 * Sprache fehlt — dann wird die Seite gar nicht erst gebaut und auch
 * nirgends verlinkt.
 */
export function url(lang: Lang, ...parties: (string | null | undefined)[]): string | null {
  if (parties.some((p) => p === null || p === undefined || p === '')) return null;
  const chemin = parties.filter(Boolean).join('/');
  return chemin ? `/${lang}/${chemin}/` : `/${lang}/`;
}

/** Adresse aus benannten Segmenten. */
export function urlSeg(lang: Lang, ...noms: NomSegment[]): string | null {
  return url(lang, ...noms.map((n) => seg(n, lang)));
}

/** Startseite einer Sprache. */
export function urlAccueil(lang: Lang): string {
  return `/${lang}/`;
}

/** Die Sprachen, in denen ein Pfad aus diesen Segmenten ueberhaupt existiert. */
export function languesAvecSegments(...noms: NomSegment[]): Lang[] {
  return LANGS.filter((l) => noms.every((n) => seg(n, l) !== null));
}

/** Haengt an eine Adresse einen Ankernamen an. */
export function ancre(adresse: string | null, nom: string): string | null {
  return adresse ? `${adresse}#${nom}` : null;
}
