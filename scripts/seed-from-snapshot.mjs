/**
 * scripts/seed-from-snapshot.mjs
 *
 * Erzeugt supabase/seed.sql aus content/snapshot.json — die Erstbefuellung
 * der Datenbank mit genau dem, was im Repository steht.
 *
 * Danach ist Supabase die Quelle der Wahrheit, und dieses Skript wird
 * nicht mehr gebraucht. Es bleibt hier, damit sich die Datenbank
 * jederzeit aus dem Repository neu aufbauen laesst.
 *
 * Aufruf:  npm run content:seed
 */
import { readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const s = JSON.parse(await readFile(join(ROOT, 'content', 'snapshot.json'), 'utf8'));

/** Zeichenkette fuer SQL. */
const q = (v) => (v === null || v === undefined ? 'null' : `'${String(v).replace(/'/g, "''")}'`);
/** jsonb. Leere Sprachen werden weggelassen, nicht als '' geschrieben. */
const j = (v) => {
  if (v === null || v === undefined) return `'{}'::jsonb`;
  const propre =
    typeof v === 'object' && !Array.isArray(v)
      ? Object.fromEntries(
          Object.entries(v).filter(([, x]) => x !== null && x !== undefined && x !== ''),
        )
      : v;
  return `'${JSON.stringify(propre).replace(/'/g, "''")}'::jsonb`;
};
const n = (v) => (v === null || v === undefined ? 'null' : Number(v));
const b = (v) => (v ? 'true' : 'false');
const statut = (v) => (v === 'publie' || v === 'veroeffentlicht' ? "'veroeffentlicht'" : "'entwurf'");

const lignes = [];
const dit = (x) => lignes.push(x);

dit(`-- ===========================================================================`);
dit(`-- LW LEGIS — Erstbefuellung`);
dit(`-- ERZEUGT von scripts/seed-from-snapshot.mjs. Nicht von Hand aendern.`);
dit(`-- Quelle: content/snapshot.json (${s.meta?.genere_le ?? 'unbekannt'})`);
dit(`--`);
dit(`-- Alle Angaben stammen aus dem Repository. Was dort offen ist, ist auch`);
dit(`-- hier offen — es wird nichts erfunden, um die Tabellen zu fuellen.`);
dit(`-- ===========================================================================`);
dit(``);
dit(`begin;`);
dit(``);

// --- Einstellungen ---------------------------------------------------------
dit(`-- Stammdaten, Person und Seitentexte liegen als jsonb in settings.`);
dit(`insert into public.settings (cle, valeur, reserve_owner) values`);
dit(`  ('stammdaten', ${j(s.settings)}, true),`);
dit(`  ('avocat', ${j(s.avocat)}, true),`);
dit(`  ('pages', ${j(s.pages)}, false)`);
dit(`on conflict (cle) do update set valeur = excluded.valeur;`);
dit(``);

// --- Navigation ------------------------------------------------------------
dit(`insert into public.navigation (id, emplacement, cle_i18n, segment, ordre, visible) values`);
const nav = [
  ...s.navigation.map((x) => ({ ...x, emplacement: 'principale' })),
  ...s.pied.map((x) => ({ ...x, emplacement: 'pied' })),
];
dit(
  nav
    .map(
      (x) =>
        `  (${q(x.id)}, ${q(x.emplacement)}, ${q(x.cle)}, ${q(x.segment)}, ${n(x.ordre)}, ${b(x.visible)})`,
    )
    .join(',\n') + '\non conflict (id) do nothing;',
);
dit(``);

// --- Seiten und Sektionen --------------------------------------------------
dit(`insert into public.pages (id, titre, statut) values`);
const pagesListe = Object.entries(s.pages).map(([id, p]) => ({ id, titre: p.titre ?? {} }));
dit(
  pagesListe.map((p) => `  (${q(p.id)}, ${j(p.titre)}, 'veroeffentlicht')`).join(',\n') +
    '\non conflict (id) do nothing;',
);
dit(``);
dit(`insert into public.sections (id, page_id, ordre, visible, verrouille) values`);
dit(
  s.sections_accueil
    .map((x) => `  (${q(x.id)}, 'accueil', ${n(x.ordre)}, ${b(x.visible)}, ${b(x.verrouille)})`)
    .join(',\n') + '\non conflict (id) do nothing;',
);
dit(``);

// --- Taetigkeitsgebiete ----------------------------------------------------
dit(`insert into public.services (id, slug, terme, definition, texte, kurz, marge_terme, marge_texte, matieres, ordre, statut) values`);
dit(
  s.familles
    .map(
      (f) =>
        `  (${q(f.id)}, ${j(f.slug)}, ${j(f.terme)}, ${j(f.definition)}, ${j(f.texte)}, ${j(f.kurz)}, ` +
        `${j(f.marge?.terme)}, ${j(f.marge?.texte)}, ${j(f.matieres)}, ${n(f.ordre)}, 'veroeffentlicht')`,
    )
    .join(',\n') + '\non conflict (id) do nothing;',
);
dit(``);

// --- Achsen der Matrix -----------------------------------------------------
dit(`insert into public.situation_options (id, axe, slug, etiquette, dans_la_phrase, code, themes, ordre) values`);
const options = [
  ...s.situation_options.pays.map((o) => ({ ...o, axe: 'pays' })),
  ...s.situation_options.projets.map((o) => ({ ...o, axe: 'projet' })),
];
dit(
  options
    .map(
      (o) =>
        `  (${q(o.id)}, ${q(o.axe)}, ${j(o.slug)}, ${j(o.etiquette)}, ${j(o.dans_la_phrase)}, ` +
        `${q(o.code ?? null)}, ${j(o.themes ?? [])}, ${n(o.ordre)})`,
    )
    .join(',\n') + '\non conflict (id) do nothing;',
);
dit(``);

// --- Konstellationen -------------------------------------------------------
dit(`-- Alle ${s.situations.length} Konstellationen als Entwurf. Die drei`);
dit(`-- Rechtsabschnitte sind leer und werden im Redaktionsbereich gefuellt.`);
dit(`insert into public.situations (id, pays, projet, titre, worum, cadre, notre_role, vos_pieces, themes, famille, ordre, statut) values`);
dit(
  s.situations
    .map(
      (x) =>
        `  (${q(x.id)}, ${q(x.pays)}, ${q(x.projet)}, ${j(x.titre)}, ${j(x.worum)}, ${j(x.cadre)}, ` +
        `${j(x.notre_role)}, ${j(x.vos_pieces)}, ${j(x.themes)}, ${q(x.famille)}, ${n(x.ordre)}, ${statut(x.statut)})`,
    )
    .join(',\n') + '\non conflict (id) do nothing;',
);
dit(``);

// --- Themen und Dokumente --------------------------------------------------
dit(`insert into public.publication_tags (id, slug, etiquette, ordre) values`);
dit(
  s.themes
    .map((t, i) => `  (${q(t.id)}, ${j(t.slug)}, ${j(t.etiquette)}, ${i})`)
    .join(',\n') + '\non conflict (id) do nothing;',
);
dit(``);
dit(`-- Die ${s.publications.length} Dokumente. Rechtsstand und Volltext fehlen und`);
dit(`-- sind Pflicht fuer die Veroeffentlichung — der Trigger laesst sie sonst`);
dit(`-- nicht auf 'veroeffentlicht'.`);
dit(`insert into public.publications (id, type, slug, titre, resume, corps, etat_du_droit, auteur, langue_originale, themes, ordre, statut) values`);
dit(
  s.publications
    .map(
      (p) =>
        `  (${q(p.id)}, ${q(p.type)}, ${j(p.slug)}, ${j(p.titre)}, ${j(p.resume)}, ${j(p.corps)}, ` +
        `${p.etat_du_droit ? q(p.etat_du_droit) : 'null'}, ${q(p.auteur)}, ${q(p.langue_originale)}, ` +
        `${j(p.themes)}, ${n(p.ordre)}, ${statut(p.statut)})`,
    )
    .join(',\n') + '\non conflict (id) do nothing;',
);
dit(``);

// --- FAQ -------------------------------------------------------------------
dit(`insert into public.faq (id, question, reponse, ordre, statut) values`);
dit(
  s.faq
    .map(
      (f) => `  (${q(f.id)}, ${j(f.question)}, ${j(f.reponse)}, ${n(f.ordre)}, ${statut(f.statut)})`,
    )
    .join(',\n') + '\non conflict (id) do nothing;',
);
dit(``);

// --- Team ------------------------------------------------------------------
if (s.team.length === 0) {
  dit(`-- Keine Teammitglieder: Namen, Funktionen und Fotos liegen nicht vor.`);
  dit(`-- Die Sektion ist fertig und erscheint, sobald der erste Datensatz da ist.`);
} else {
  dit(`insert into public.team (id, nom, fonction, ordre, statut) values`);
  dit(
    s.team
      .map((m) => `  (${q(m.id)}, ${q(m.nom)}, ${j(m.fonction)}, ${n(m.ordre)}, ${statut(m.statut)})`)
      .join(',\n') + '\non conflict (id) do nothing;',
  );
}
dit(``);

// --- Rechtstexte -----------------------------------------------------------
dit(`insert into public.legal_pages (id, titre, chapeau, blocs, corps, statut) values`);
dit(
  Object.entries(s.legal)
    .map(
      ([id, p]) =>
        `  (${q(id)}, ${j(p.titre)}, ${j(p.chapeau)}, ${j(p.blocs ?? [])}, ${j(p.corps)}, 'veroeffentlicht')`,
    )
    .join(',\n') + '\non conflict (id) do nothing;',
);
dit(``);

// --- SEO -------------------------------------------------------------------
dit(`insert into public.seo_meta (id, titre, description, noindex) values`);
dit(
  Object.entries(s.seo)
    .map(([id, m]) => `  (${q(id)}, ${j(m.titre)}, ${j(m.description)}, ${b(m.noindex)})`)
    .join(',\n') + '\non conflict (id) do nothing;',
);
dit(``);
dit(`commit;`);
dit(``);

await writeFile(join(ROOT, 'supabase', 'seed.sql'), lignes.join('\n'), 'utf8');
console.log(
  `supabase/seed.sql geschrieben (${lignes.length} Zeilen).\n` +
    `  ${s.familles.length} Tätigkeitsgebiete, ${s.situations.length} Konstellationen,\n` +
    `  ${s.publications.length} Dokumente, ${s.faq.length} Fragen, ${s.team.length} Teammitglieder.`,
);
