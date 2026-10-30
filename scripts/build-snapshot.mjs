/**
 * scripts/build-snapshot.mjs
 *
 * Setzt die Quelldateien unter content/source/ zu content/snapshot.json
 * zusammen. Der Schnappschuss hat genau die Form, die auch
 * `scripts/fetch-content.mjs` aus Supabase liefert — Astro liest immer nur
 * diese eine Datei und weiss nicht, woher sie stammt.
 *
 * Die Inhalte sind die der alten Website (cabinet-avocats-lorang.com),
 * auf Franzoesisch und Englisch.
 *
 * Aufruf:  node scripts/build-snapshot.mjs
 */
import { writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { SETTINGS } from '../content/source/settings.mjs';
import { ACTIVITES } from '../content/source/activites.mjs';
import { THEMES, DOSSIERS, CONFERENCES } from '../content/source/publications.mjs';
import { PAGES } from '../content/source/pages.mjs';
import { TEAM } from '../content/source/team.mjs';
import { MENTIONS, DONNEES, COOKIES, CONDITIONS } from '../content/source/legal.mjs';
import { SEO, MODELES, LIMITES } from '../content/source/seo.mjs';
import { NAVIGATION, PIED } from '../content/source/navigation.mjs';
import { BILDER } from '../content/source/bilder.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

/**
 * Auf der alten Startseite stehen diese drei Eintraege in einem
 * HTML-Kommentar, Besucher sehen sie also nicht. Sie kommen als Entwurf
 * mit; die Kanzlei schaltet sie im Redaktionsbereich frei, wenn sie
 * sollen.
 */
const CACHEES = ['domiciliation-atad-3', 'sci-conformite', 'investissement-immobilier-cles-juridiques'];

/** Die Spalten der Tabelle `publications`, fuer beide Arten gleich. */
const publication = (p, type) => ({
  id: p.id,
  type,
  ordre: p.ordre,
  statut: CACHEES.includes(p.id) ? 'entwurf' : 'publie',
  titre: p.titre,
  slug: p.slug ?? {},
  resume: p.resume ?? {},
  corps: p.corps ?? {},
  themes: p.themes ?? [],
  pdf: p.pdf ?? null,
  dossier: p.dossier ?? null,
  lien_externe: p.lien_externe ?? null,
  date_publication: p.date ? `${p.date}-01` : null,
  etat_du_droit: null,
  auteur: 'Alain Lorang',
  langue_originale: 'fr',
});

const snapshot = {
  meta: { genere_le: new Date().toISOString(), source: 'content/source', version: 2 },
  ouvertes: {},
  settings: SETTINGS,
  navigation: NAVIGATION,
  pied: PIED,
  pages: PAGES,
  familles: ACTIVITES.map((a) => ({
    id: a.id,
    ordre: a.ordre,
    slug: a.slug,
    terme: a.terme,
    definition: a.definition,
    texte: a.texte,
    // Spalten der Tabelle `services`, die die neue Seite nicht mehr nutzt.
    kurz: {},
    marge: { terme: {}, texte: {} },
    matieres: [],
  })),
  themes: THEMES,
  publications: [
    ...DOSSIERS.map((d) => publication(d, 'dossier')),
    ...CONFERENCES.map((c) => publication(c, 'conference')),
  ],
  bilder: BILDER,
  team: TEAM,
  legal: { mentions: MENTIONS, donnees: DONNEES, cookies: COOKIES, conditions: CONDITIONS },
  seo: SEO,
  seo_modeles: MODELES,
  seo_limites: LIMITES,
};

/**
 * Typografie, nicht Wortlaut: Die alte Seite setzt gerade Apostrophe und
 * Anfuehrungszeichen. Hier werden sie zu den typografischen Zeichen der
 * jeweiligen Sprache — nur im Text, nie in HTML-Tags oder Adressen.
 */
function typographie(texte, lang) {
  return texte
    .split(/(<[^>]*>)/)
    .map((teil) => {
      if (teil.startsWith('<')) return teil;
      let t = teil.replace(/(\p{L})'(\p{L})/gu, '$1’$2');
      if (lang === 'fr') {
        t = t.replace(/"([^"<>]{1,200})"/g, '« $1 »');
        // Franzoesische Satzzeichen: geschuetztes Leerzeichen, damit „»“
        // oder „:“ nie allein am Zeilenanfang stehen.
        t = t.replace(/«\s+/g, '«\u00a0').replace(/\s+([»:;?!])/g, '\u00a0$1');
      } else {
        t = t.replace(/"([^"<>]{1,200})"/g, '“$1”');
      }
      return t;
    })
    .join('');
}
function soigner(v, lang = null) {
  if (typeof v === 'string') return lang ? typographie(v, lang) : v;
  if (Array.isArray(v)) return v.map((x) => soigner(x, lang));
  if (v && typeof v === 'object') {
    return Object.fromEntries(
      Object.entries(v).map(([k, x]) => [k, soigner(x, k === 'fr' || k === 'en' ? k : lang)]),
    );
  }
  return v;
}
/**
 * Die Rechtstexte der alten Seite beginnen bei h3. Unter dem h1 der Seite
 * wird daraus h2 (und h4 zu h3), damit keine Ebene uebersprungen wird.
 */
for (const page of Object.values(snapshot.legal)) {
  for (const [l, html] of Object.entries(page.corps ?? {})) {
    if (typeof html === 'string' && !/<h2[\s>]/.test(html) && /<h3[\s>]/.test(html)) {
      page.corps[l] = html.replace(/<(\/?)h([34])([\s>])/g, (_, s, n, e) => `<${s}h${Number(n) - 1}${e}`);
    }
  }
}

for (const cle of ['pages', 'familles', 'publications', 'team', 'legal', 'seo']) {
  snapshot[cle] = soigner(snapshot[cle]);
}

await writeFile(join(ROOT, 'content', 'snapshot.json'), JSON.stringify(snapshot, null, 2) + '\n', 'utf8');

console.log(
  [
    'content/snapshot.json geschrieben.',
    `  ${ACTIVITES.length} Tätigkeiten`,
    `  ${DOSSIERS.length} Dossiers, ${CONFERENCES.length} Konferenzen, ${THEMES.length} Themen`,
    `  ${TEAM.length} Anwälte`,
  ].join('\n'),
);
