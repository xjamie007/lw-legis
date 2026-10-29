/**
 * src/lib/i18n.ts — Oberflaechentexte.
 *
 * Alle sichtbaren Texte der Bedienoberflaeche stehen in
 * src/i18n/<sprache>.json, nie fest im Markup. Das gilt auch fuer
 * Formularfehler, Knopfbeschriftungen, Alt-Texte und aria-Labels.
 *
 * Fehlt ein Schluessel in einer Sprache, wird er gemeldet und die
 * Sprachfassung gilt als unvollstaendig — es wird nichts stillschweigend
 * durch Franzoesisch ersetzt.
 */
import fr from '../i18n/fr.json';
import de from '../i18n/de.json';
import en from '../i18n/en.json';
import lb from '../i18n/lb.json';
import { LANGS, LANG_DEFAUT, type Lang } from './langs';

const TABLES: Record<Lang, Record<string, string>> = { fr, de, en, lb };

/** Wert, mit dem `lb.json` vollstaendig vorbelegt ist. */
export const MARQUE_OUVERTE = '[LB FEHLT]';

export type Cle = keyof typeof fr;

function estOuvert(valeur: string | undefined): boolean {
  return (
    valeur === undefined ||
    valeur.trim() === '' ||
    /^\[[A-Z]{2} FEHLT\]$/.test(valeur.trim())
  );
}

/** Uebersetzung holen. Fehlt sie, kommt die Lueckenmarkierung zurueck. */
export function t(lang: Lang, cle: Cle): string {
  const v = TABLES[lang]?.[cle as string];
  if (estOuvert(v)) return `[${lang.toUpperCase()} FEHLT]`;
  return v as string;
}

/** Ist dieser Schluessel in dieser Sprache belegt? */
export function aTraduction(lang: Lang, cle: Cle): boolean {
  return !estOuvert(TABLES[lang]?.[cle as string]);
}

/** Alle offenen Schluessel einer Sprache — Grundlage der Build-Pruefung. */
export function clesOuvertes(lang: Lang): string[] {
  const reference = Object.keys(TABLES[LANG_DEFAUT]);
  return reference.filter((c) => estOuvert(TABLES[lang]?.[c]));
}

/**
 * Ist die Oberflaeche dieser Sprache vollstaendig uebersetzt?
 * Nur dann duerfen Seiten in dieser Sprache gebaut werden.
 */
export function oberflaecheVollstaendig(lang: Lang): boolean {
  return clesOuvertes(lang).length === 0;
}

/** Die Sprachen, deren Oberflaeche vollstaendig ist. */
export function languesUtilisables(): Lang[] {
  return LANGS.filter(oberflaecheVollstaendig);
}

/** Bequeme, an eine Sprache gebundene Fassung von `t`. */
export function traducteur(lang: Lang) {
  return (cle: Cle) => t(lang, cle);
}

/**
 * Datumsformat je Sprache. Auch Datumsangaben werden uebersetzt, nicht nur
 * Fliesstexte.
 */
export function formaterDate(iso: string, lang: Lang): string {
  const locales: Record<Lang, string> = {
    fr: 'fr-LU',
    de: 'de-LU',
    en: 'en-GB',
    lb: 'lb-LU',
  };
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat(locales[lang], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(d);
}

/** Nur das Jahr — fuer die Randspalte. */
export function annee(iso: string): string {
  return iso.slice(0, 4);
}

/** Dateigroesse, sprachgerecht. */
export function formaterTaille(octets: number, lang: Lang): string {
  const locales: Record<Lang, string> = {
    fr: 'fr-LU',
    de: 'de-LU',
    en: 'en-GB',
    lb: 'lb-LU',
  };
  const mo = octets / (1024 * 1024);
  if (mo >= 1) {
    return `${new Intl.NumberFormat(locales[lang], { maximumFractionDigits: 1 }).format(mo)} MB`;
  }
  const ko = octets / 1024;
  return `${new Intl.NumberFormat(locales[lang], { maximumFractionDigits: 0 }).format(ko)} kB`;
}
