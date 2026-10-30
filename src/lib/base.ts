/**
 * src/lib/base.ts — Praefix fuer die Auslieferung in einem Unterpfad.
 *
 * Auf der eigenen Domain liegt die Seite in der Wurzel. Auf GitHub Pages
 * liegt sie unter /<repository>/. Astro kennt diesen Praefix als
 * BASE_URL und setzt ihn vor alles, was es selbst buendelt — vor von Hand
 * geschriebene Adressen und vor alles aus `public/` jedoch nicht. Genau
 * diese Luecke schliesst diese Datei.
 *
 * In der Wurzel (BASE_URL === '/') ist `chemin()` die Identitaet: der
 * Produktionsbuild bleibt Zeichen fuer Zeichen derselbe.
 */

/** '' in der Wurzel, sonst z. B. '/lw-legis' — nie mit Schraegstrich am Ende. */
export const BASE = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');

/**
 * Aus einem wurzelrelativen Pfad die tatsaechlich ausgelieferte Adresse.
 *
 * Heisst bewusst nicht `chemin`: so heisst in den Komponenten schon die
 * Prop mit der eigenen Adresse, und der Aufruf schlug dort erst beim
 * Rendern fehl, nicht beim Typpruefen.
 */
export function prefixer(p: string): string {
  return p.startsWith('/') ? `${BASE}${p}` : p;
}

/**
 * Dasselbe fuer Links in Fliesstexten aus den Inhalten (etwa die PDFs in
 * den Dossiers): `href="/…"` bekommt den Praefix.
 */
export function prefixerHtml(html: string): string {
  return BASE ? html.replace(/(href|src)="\/(?!\/)/g, `$1="${BASE}/`) : html;
}
