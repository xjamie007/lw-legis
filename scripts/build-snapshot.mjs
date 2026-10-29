/**
 * scripts/build-snapshot.mjs
 *
 * Setzt die Quelldateien unter content/source/ zu content/snapshot.json
 * zusammen. Der Schnappschuss hat genau die Form, die auch
 * `scripts/fetch-content.mjs` aus Supabase liefert — Astro liest immer nur
 * diese eine Datei und weiss nicht, woher sie stammt.
 *
 * Damit gilt:
 *   - vor dem Livegang ist content/source/ die Quelle der Wahrheit
 *   - nach dem Livegang ist Supabase die Quelle, und content/source/ ist
 *     die Erstbefuellung, aus der `npm run content:seed` das SQL erzeugt
 *   - ist Supabase beim Bauen nicht erreichbar, baut die Seite aus dem
 *     zuletzt geschriebenen Schnappschuss und bricht nicht ab
 *
 * Aufruf:  node scripts/build-snapshot.mjs
 */
import { writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { OUVERTES } from '../content/source/ouvertes.mjs';
import { SETTINGS, AVOCAT } from '../content/source/settings.mjs';
import { FAMILLES, PROJET_VERS_FAMILLE } from '../content/source/services.mjs';
import { PAYS, PROJETS, construireSituations } from '../content/source/situations.mjs';
import {
  THEMES,
  construirePublications,
  assurerSlugsUniques,
} from '../content/source/publications.mjs';
import { PAGES, SECTIONS_ACCUEIL } from '../content/source/pages.mjs';
import { FAQ } from '../content/source/faq.mjs';
import { MENTIONS, DONNEES, CONDITIONS } from '../content/source/legal.mjs';
import { SEO, MODELES, LIMITES } from '../content/source/seo.mjs';
import { NAVIGATION, PIED } from '../content/source/navigation.mjs';
import { TEAM } from '../content/source/team.mjs';
import { BILDER } from '../content/source/bilder.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const situations = construireSituations().map((s) => ({
  ...s,
  famille: PROJET_VERS_FAMILLE[s.projet] ?? null,
}));

const publications = assurerSlugsUniques(construirePublications());

const snapshot = {
  /** Wann und woraus dieser Schnappschuss entstanden ist. */
  meta: {
    genere_le: new Date().toISOString(),
    source: 'content/source',
    version: 1,
  },
  ouvertes: OUVERTES,
  settings: SETTINGS,
  avocat: AVOCAT,
  navigation: NAVIGATION,
  pied: PIED,
  sections_accueil: SECTIONS_ACCUEIL,
  pages: PAGES,
  familles: FAMILLES,
  projet_vers_famille: PROJET_VERS_FAMILLE,
  situation_options: { pays: PAYS, projets: PROJETS },
  situations,
  themes: THEMES,
  publications,
  bilder: BILDER,
  team: TEAM,
  faq: FAQ,
  legal: { mentions: MENTIONS, donnees: DONNEES, conditions: CONDITIONS },
  seo: SEO,
  seo_modeles: MODELES,
  seo_limites: LIMITES,
};

await writeFile(
  join(ROOT, 'content', 'snapshot.json'),
  JSON.stringify(snapshot, null, 2) + '\n',
  'utf8',
);

const lignes = [
  'content/snapshot.json geschrieben.',
  `  ${Object.keys(OUVERTES).length} offene Punkte`,
  `  ${FAMILLES.length} Tätigkeitsfelder mit ${FAMILLES.reduce((n, f) => n + f.matieres.length, 0)} Einzelgebieten`,
  `  ${situations.length} Konstellationen (${situations.filter((s) => s.statut === 'publie').length} veröffentlicht)`,
  `  ${publications.length} Dokumente (${publications.filter((p) => p.statut === 'publie').length} veröffentlicht)`,
  `  ${FAQ.length} häufige Fragen (${FAQ.filter((f) => f.statut === 'publie').length} beantwortet)`,
  `  ${TEAM.length} Teammitglieder`,
];
console.log(lignes.join('\n'));
