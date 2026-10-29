/**
 * src/lib/langs.ts — Sprachen und mehrsprachige Felder.
 *
 * Grundregel des Projekts: es wird nie stillschweigend die falsche Sprache
 * ausgeliefert. Fehlt eine Uebersetzung, passiert zweierlei:
 *   1. die Stelle bleibt im HTML sichtbar offen (Markierung `[LB FEHLT]`)
 *   2. die betroffene Sprachfassung der Seite wird gar nicht erst gebaut
 *
 * Deshalb gibt es `pick()` (liefert Wert + Befund) und `isComplete()`
 * (entscheidet, ob eine Sprachfassung gebaut werden darf).
 */

export const LANGS = ['fr', 'de', 'en', 'lb'] as const;
export type Lang = (typeof LANGS)[number];

/** Franzoesisch ist die Referenzfassung und die Standardsprache. */
export const LANG_DEFAUT: Lang = 'fr';

export const LANG_NOMS: Record<Lang, string> = {
  fr: 'Français',
  de: 'Deutsch',
  en: 'English',
  lb: 'Lëtzebuergesch',
};

/** Wert des `lang`-Attributs und der hreflang-Angabe. */
export const LANG_BALISE: Record<Lang, string> = {
  fr: 'fr',
  de: 'de',
  en: 'en',
  lb: 'lb',
};

export function isLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value);
}

/** Ein mehrsprachiges Feld, wie es in der Datenbank als `jsonb` liegt. */
export type Multi<T = string> = Partial<Record<Lang, T | null>>;

/** Markierung, die im HTML erscheint, wenn eine Fassung fehlt. */
export function marqueLacune(lang: Lang): string {
  return `[${lang.toUpperCase()} FEHLT]`;
}

export interface Befund {
  /** Der auszugebende Wert. */
  valeur: string;
  /** Wurde auf die Referenzfassung zurueckgefallen? */
  manque: boolean;
  /** Die Sprache, aus der der Wert tatsaechlich stammt. */
  source: Lang | null;
}

/**
 * Holt einen Wert aus einem mehrsprachigen Feld.
 *
 * Fehlt die angefragte Sprache, wird `manque: true` gemeldet und als Wert
 * die Lueckenmarkierung geliefert — nicht die franzoesische Fassung. Wer
 * den Rueckfall auf Franzoesisch ausdruecklich will (etwa im Adminbereich
 * als Referenzspalte), nimmt `pickAvecRepli()`.
 */
export function pick(champ: Multi | null | undefined, lang: Lang): Befund {
  const brut = champ?.[lang];
  if (typeof brut === 'string' && brut.trim() !== '') {
    return { valeur: brut, manque: false, source: lang };
  }
  return { valeur: marqueLacune(lang), manque: true, source: null };
}

/** Wie `pick()`, faellt aber auf die franzoesische Referenzfassung zurueck. */
export function pickAvecRepli(champ: Multi | null | undefined, lang: Lang): Befund {
  const direct = pick(champ, lang);
  if (!direct.manque) return direct;
  const repli = champ?.[LANG_DEFAUT];
  if (typeof repli === 'string' && repli.trim() !== '') {
    return { valeur: repli, manque: true, source: LANG_DEFAUT };
  }
  return direct;
}

/** Kurzform fuer Stellen, an denen nur der Text gebraucht wird. */
export function txt(champ: Multi | null | undefined, lang: Lang): string {
  return pick(champ, lang).valeur;
}

/** Ist das Feld in dieser Sprache belegt? */
export function aValeur(champ: Multi | null | undefined, lang: Lang): boolean {
  const v = champ?.[lang];
  return typeof v === 'string' && v.trim() !== '';
}

/** Sind alle uebergebenen Felder in dieser Sprache belegt? */
export function isComplete(lang: Lang, ...champs: (Multi | null | undefined)[]): boolean {
  return champs.every((c) => aValeur(c, lang));
}

/** Sammelt die Sprachen, in denen alle Felder belegt sind. */
export function languesCompletes(...champs: (Multi | null | undefined)[]): Lang[] {
  return LANGS.filter((l) => isComplete(l, ...champs));
}
