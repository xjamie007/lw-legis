/**
 * src/lib/seo.ts — Kanonische Adressen, hreflang, Meta-Angaben.
 *
 * Ohne hreflang haelt Google die Sprachfassungen fuer doppelten Inhalt.
 * Ausgegeben werden nur Sprachen, die tatsaechlich gebaut werden — eine
 * hreflang-Angabe auf eine Seite, die es nicht gibt, ist schlimmer als
 * keine.
 */
import { LANG_BALISE, type Lang } from './langs';
import { languesDuSite } from './content';

export const SITE = (import.meta.env.PUBLIC_SITE_URL || 'https://www.lw-legis.lu').replace(
  /\/+$/,
  '',
);

/** Standardsprache fuer x-default. */
const DEFAUT: Lang = 'fr';

export function absolu(chemin: string): string {
  return `${SITE}${chemin.startsWith('/') ? chemin : `/${chemin}`}`;
}

export interface Alternative {
  lang: Lang;
  hreflang: string;
  href: string;
}

/**
 * Baut die hreflang-Liste.
 * `parLangue` liefert je Sprache den Pfad — oder null, wenn es die Seite
 * in dieser Sprache nicht gibt.
 */
export function alternatives(parLangue: (l: Lang) => string | null): Alternative[] {
  const out: Alternative[] = [];
  for (const lang of languesDuSite()) {
    const chemin = parLangue(lang);
    if (!chemin) continue;
    out.push({ lang, hreflang: LANG_BALISE[lang], href: absolu(chemin) });
  }
  // x-default zeigt auf die franzoesische Fassung, sofern es sie gibt.
  const parDefaut = out.find((a) => a.lang === DEFAUT) ?? out[0];
  if (parDefaut) {
    out.push({ lang: parDefaut.lang, hreflang: 'x-default', href: parDefaut.href });
  }
  return out;
}

/** Kuerzt eine Description defensiv, falls der Adminbereich zu viel liefert. */
export function couper(texte: string, max: number): string {
  if (texte.length <= max) return texte;
  const coupe = texte.slice(0, max - 1);
  const espace = coupe.lastIndexOf(' ');
  return `${(espace > max * 0.6 ? coupe.slice(0, espace) : coupe).trimEnd()}…`;
}

/** Entfernt Auszeichnung aus einem Text, der in ein Meta-Attribut soll. */
export function sansBalises(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
