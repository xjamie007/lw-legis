/**
 * .../donnees.json.ts — Inhalt einer Konstellation als JSON.
 *
 * Nur fuer die Verbesserung des Heros: ist JavaScript da, laedt der
 * Browser diese Datei und setzt die Antwort unter den Satz, statt die
 * Seite zu wechseln. Ohne JavaScript wird die Datei nie angefragt, und
 * die gewoehnliche Seite tut dasselbe.
 *
 * Erzeugt wird sie nur fuer Konstellationen, die auch als Seite gebaut
 * werden — dieselbe Schranke, dieselbe Tabelle.
 */
import type { APIRoute, GetStaticPaths } from 'astro';
import { toutesLesRoutes } from '../../../../../lib/pages';
import { txt, type Lang } from '../../../../../lib/langs';
import type { Situation } from '../../../../../lib/content';

export const getStaticPaths = (() =>
  toutesLesRoutes()
    .filter((r) => r.type === 'situation')
    .map((r) => ({
      params: {
        lang: r.lang,
        section: r.segments[0],
        pays: r.segments[1],
        projet: r.segments[2],
      },
      props: { situation: r.data.situation as Situation, lang: r.lang },
    }))) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) => {
  const { situation, lang } = props as { situation: Situation; lang: Lang };
  const corps = JSON.stringify({
    titre: txt(situation.titre, lang),
    worum: txt(situation.worum, lang),
    cadre: txt(situation.cadre, lang),
    notre_role: txt(situation.notre_role, lang),
    vos_pieces: txt(situation.vos_pieces, lang),
  });
  return new Response(corps, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
