/**
 * src/pages/sitemap.xml.ts — Sitemap mit allen Sprachfassungen.
 *
 * Enthaelt genau die Adressen, die auch wirklich gebaut werden. Was nicht
 * in `routesIndexables()` steht, steht hier nicht — unfertige
 * Konstellationen, undatierte Dokumente, der Adminbereich und die
 * Bestaetigungsseite des Formulars also nicht.
 *
 * Zu jeder Adresse stehen die xhtml:link-Alternativen, damit Google die
 * Sprachfassungen nicht fuer doppelten Inhalt haelt.
 */
import type { APIRoute } from 'astro';
import { routesIndexables, indexAlternatifs } from '../lib/pages';
import { absolu } from '../lib/seo';
import { LANG_BALISE, LANG_DEFAUT, type Lang } from '../lib/langs';

export const GET: APIRoute = () => {
  const routes = routesIndexables();
  const alternatifs = indexAlternatifs();

  const echapper = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const entrees = routes
    .map((r) => {
      const groupe = alternatifs.get(r.cle) ?? {};
      const liens = Object.entries(groupe)
        .map(
          ([l, chemin]) =>
            `    <xhtml:link rel="alternate" hreflang="${LANG_BALISE[l as Lang]}" href="${echapper(
              absolu(chemin as string),
            )}" />`,
        )
        .join('\n');
      const defaut = groupe[LANG_DEFAUT] ?? Object.values(groupe)[0];
      const lienDefaut = defaut
        ? `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${echapper(
            absolu(defaut),
          )}" />`
        : '';
      return `  <url>
    <loc>${echapper(absolu(r.chemin))}</loc>
${liens}${lienDefaut}
  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entrees}
</urlset>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
