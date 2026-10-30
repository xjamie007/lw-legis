/**
 * src/lib/routes.ts — Die Adressen der Seite.
 *
 * Jede Sprache bekommt ihre eigenen, sprechenden Pfadsegmente. Das ist der
 * Grund, warum das Sprach-Routing nicht ueber Astros `i18n`-Option laeuft:
 * die kann nur ein Praefix voranstellen, nicht die Segmente uebersetzen.
 *
 *   /fr/activites/domiciliation-de-societes/
 *   /en/practice-areas/company-domiciliation/
 *
 * Alle Adressen enden auf einen Schraegstrich (astro.config: trailingSlash).
 */
import { LANGS, type Lang, type Multi } from './langs';
import { prefixer } from './base';

/** Ein Pfadsegment je Sprache. `null` = fuer diese Sprache noch nicht geliefert. */
export type Segment = Multi;

export const SEGMENTS = {
  avocats: { fr: 'avocats', en: 'lawyers' },
  activites: { fr: 'activites', en: 'practice-areas' },
  dossiers: { fr: 'dossiers-thematiques', en: 'thematic-files' },
  conferences: { fr: 'conferences', en: 'conferences' },
  partenaires: { fr: 'partenaires', en: 'partners' },
  index: { fr: 'index-des-matieres', en: 'subject-index' },
  contact: { fr: 'contact', en: 'contact' },
  mentions: { fr: 'mentions-legales', en: 'legal-notice' },
  donnees: { fr: 'protection-des-donnees', en: 'privacy-policy' },
  cookies: { fr: 'cookies', en: 'cookies' },
  conditions: { fr: 'conditions-generales', en: 'terms' },
  // Bestaetigungsseite des Formulars
  recu: { fr: 'message-recu', en: 'message-received' },
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
  const reste = parties.filter(Boolean).join('/');
  return prefixer(reste ? `/${lang}/${reste}/` : `/${lang}/`);
}

/** Adresse aus benannten Segmenten. */
export function urlSeg(lang: Lang, ...noms: NomSegment[]): string | null {
  return url(lang, ...noms.map((n) => seg(n, lang)));
}

/** Startseite einer Sprache. */
export function urlAccueil(lang: Lang): string {
  return prefixer(`/${lang}/`);
}

/** Die Sprachen, in denen ein Pfad aus diesen Segmenten ueberhaupt existiert. */
export function languesAvecSegments(...noms: NomSegment[]): Lang[] {
  return LANGS.filter((l) => noms.every((n) => seg(n, l) !== null));
}

/** Haengt an eine Adresse einen Ankernamen an. */
export function ancre(adresse: string | null, nom: string): string | null {
  return adresse ? `${adresse}#${nom}` : null;
}
