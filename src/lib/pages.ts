/**
 * src/lib/pages.ts — Die vollstaendige Adresstabelle der Seite.
 *
 * Weil sich die Pfadsegmente je Sprache unterscheiden, gibt es genau eine
 * Route (`[lang]/[...chemin].astro`), die alles erzeugt. Diese Datei baut
 * die Tabelle, aus der sie schoepft — und dieselbe Tabelle speist
 * Sitemap, hreflang, Brotkrumen und die Link-Pruefung. Eine Quelle, keine
 * Abweichungen.
 *
 * Wer hier nicht drinsteht, wird nicht gebaut und nirgends verlinkt.
 * Genau so bleiben unfertige Konstellationen und undatierte Dokumente
 * draussen, ohne dass irgendwo eine zweite Liste gepflegt werden muesste.
 */
import { LANGS, txt, type Lang } from './langs';
import { t } from './i18n';
import { seg, urlAccueil } from './routes';
import { couper } from './seo';
import {
  contenu,
  familles,
  languesDuSite,
  paysOptions,
  projetOptions,
  publicationsPubliees,
  situationsPubliees,
  themesAvecDocuments,
  type Famille,
  type OptionAxe,
  type Publication,
  type Situation,
  type Theme,
} from './content';

export type TypePage =
  | 'accueil'
  | 'situations'
  | 'situation-pays'
  | 'situation'
  | 'services'
  | 'famille'
  | 'etude'
  | 'publications'
  | 'publication'
  | 'theme'
  | 'honoraires'
  | 'contact'
  | 'recu'
  | 'mentions'
  | 'donnees'
  | 'conditions';

export interface Etape {
  nom: string;
  url: string;
}

export interface Route {
  /** Logischer Schluessel, ueber den die Sprachfassungen zusammenfinden. */
  cle: string;
  lang: Lang;
  type: TypePage;
  /** Vollstaendiger Pfad mit fuehrendem und abschliessendem Schraegstrich. */
  chemin: string;
  /** Die Segmente nach /<sprache>/ — das, was `[...chemin]` bekommt. */
  segments: string[];
  titre: string;
  description: string;
  noindex: boolean;
  fil: Etape[];
  /** Nutzlast fuer die jeweilige Ansicht. */
  data: Record<string, unknown>;
}

function metaDe(id: string, lang: Lang): { titre: string; description: string; noindex: boolean } {
  const m = contenu.seo[id];
  return {
    titre: txt(m?.titre, lang),
    description: txt(m?.description, lang),
    noindex: Boolean(m?.noindex),
  };
}

function modele(id: string, lang: Lang, remplacements: Record<string, string>): string {
  let s = txt(contenu.seo_modeles[id]?.titre, lang);
  for (const [k, v] of Object.entries(remplacements)) {
    s = s.replaceAll(`%${k}%`, v);
  }
  return s;
}

/** Baut alle Adressen einer Sprache. */
function routesDe(lang: Lang): Route[] {
  const out: Route[] = [];
  const S = (n: Parameters<typeof seg>[0]) => seg(n, lang);
  const accueil: Etape = { nom: t(lang, 'nav.accueil'), url: urlAccueil(lang) };

  const pousser = (r: Omit<Route, 'lang'>) => out.push({ ...r, lang });

  // --- Startseite ----------------------------------------------------------
  {
    const m = metaDe('accueil', lang);
    pousser({
      cle: 'accueil',
      type: 'accueil',
      chemin: urlAccueil(lang),
      segments: [],
      ...m,
      fil: [],
      data: {},
    });
  }

  // --- Situationsmatrix ----------------------------------------------------
  const sSit = S('situations');
  if (sSit) {
    const base = `/${lang}/${sSit}/`;
    const m = metaDe('situations', lang);
    const filBase: Etape[] = [accueil, { nom: m.titre, url: base }];
    pousser({
      cle: 'situations',
      type: 'situations',
      chemin: base,
      segments: [sSit],
      ...m,
      fil: filBase,
      data: {},
    });

    const pays = paysOptions(lang);
    const projets = projetOptions(lang);
    const publiees = situationsPubliees(lang);

    // Eine Seite je Land: die sieben Vorhaben fuer dieses Land.
    for (const p of pays) {
      const slug = txt(p.slug, lang);
      const chemin = `${base}${slug}/`;
      const nom = txt(p.etiquette, lang);
      pousser({
        cle: `situation-pays:${p.id}`,
        type: 'situation-pays',
        chemin,
        segments: [sSit, slug],
        titre: couper(`${t(lang, 'situation.intro_axe_pays')}: ${nom} | LW LEGIS`, 65),
        description: couper(
          `${txt(contenu.pages.situations.chapeau, lang)}`,
          200,
        ),
        noindex: false,
        fil: [...filBase, { nom, url: chemin }],
        data: { pays: p, projets },
      });
    }

    // Eine Seite je veroeffentlichter Konstellation.
    for (const s of publiees) {
      const p = pays.find((x) => x.id === s.pays);
      const pr = projets.find((x) => x.id === s.projet);
      if (!p || !pr) continue;
      const sp = txt(p.slug, lang);
      const spr = txt(pr.slug, lang);
      const chemin = `${base}${sp}/${spr}/`;
      pousser({
        cle: `situation:${s.id}`,
        type: 'situation',
        chemin,
        segments: [sSit, sp, spr],
        titre: couper(
          modele('situation', lang, {
            projet: txt(pr.etiquette, lang),
            pays: txt(p.etiquette, lang),
          }),
          65,
        ),
        description: couper(txt(s.worum, lang).replace(/<[^>]*>/g, ' '), 200),
        noindex: false,
        fil: [
          ...filBase,
          { nom: txt(p.etiquette, lang), url: `${base}${sp}/` },
          { nom: txt(pr.etiquette, lang), url: chemin },
        ],
        data: { situation: s, pays: p, projet: pr },
      });
    }
  }

  // --- Taetigkeitsgebiete ---------------------------------------------------
  const sSrv = S('services');
  if (sSrv) {
    const base = `/${lang}/${sSrv}/`;
    const m = metaDe('services', lang);
    const filBase: Etape[] = [accueil, { nom: m.titre, url: base }];
    pousser({
      cle: 'services',
      type: 'services',
      chemin: base,
      segments: [sSrv],
      ...m,
      fil: filBase,
      data: {},
    });

    for (const f of familles(lang)) {
      const slug = txt(f.slug, lang);
      const chemin = `${base}${slug}/`;
      const nom = txt(f.terme, lang);
      pousser({
        cle: `famille:${f.id}`,
        type: 'famille',
        chemin,
        segments: [sSrv, slug],
        titre: couper(modele('famille', lang, { famille: nom }), 65),
        description: couper(txt(f.definition, lang), 200),
        noindex: false,
        fil: [...filBase, { nom, url: chemin }],
        data: { famille: f },
      });
    }
  }

  // --- Die Kanzlei ----------------------------------------------------------
  const sEtu = S('etude');
  if (sEtu) {
    const chemin = `/${lang}/${sEtu}/`;
    const m = metaDe('etude', lang);
    pousser({
      cle: 'etude',
      type: 'etude',
      chemin,
      segments: [sEtu],
      ...m,
      fil: [accueil, { nom: txt(contenu.pages.etude.titre, lang), url: chemin }],
      data: {},
    });
  }

  // --- Fonds documentaire ---------------------------------------------------
  const sPub = S('publications');
  if (sPub) {
    const base = `/${lang}/${sPub}/`;
    const m = metaDe('publications', lang);
    const filBase: Etape[] = [accueil, { nom: m.titre, url: base }];
    pousser({
      cle: 'publications',
      type: 'publications',
      chemin: base,
      segments: [sPub],
      ...m,
      fil: filBase,
      data: {},
    });

    // Filterseiten nach Thema — echte Adressen, damit sie ohne
    // JavaScript funktionieren.
    const sTheme = S('theme');
    if (sTheme) {
      for (const th of themesAvecDocuments(lang)) {
        const slug = txt(th.slug, lang);
        const chemin = `${base}${sTheme}/${slug}/`;
        const nom = txt(th.etiquette, lang);
        pousser({
          cle: `theme:${th.id}`,
          type: 'theme',
          chemin,
          segments: [sPub, sTheme, slug],
          titre: couper(modele('theme', lang, { theme: nom }), 65),
          description: couper(
            `${nom} — ${txt(contenu.pages.publications.chapeau, lang)}`,
            200,
          ),
          noindex: false,
          fil: [...filBase, { nom, url: chemin }],
          data: { theme: th },
        });
      }
    }

    for (const p of publicationsPubliees(lang)) {
      const slug = txt(p.slug, lang);
      const chemin = `${base}${slug}/`;
      const nom = txt(p.titre, lang);
      pousser({
        cle: `publication:${p.id}`,
        type: 'publication',
        chemin,
        segments: [sPub, slug],
        titre: couper(modele('publication', lang, { titre: nom }), 70),
        description: couper(txt(p.resume, lang).replace(/<[^>]*>/g, ' '), 200),
        noindex: false,
        fil: [...filBase, { nom, url: chemin }],
        data: { publication: p },
      });
    }
  }

  // --- Einfache Seiten ------------------------------------------------------
  const simples: { cle: string; type: TypePage; nomSegment: Parameters<typeof seg>[0]; titreSource?: string }[] = [
    { cle: 'honoraires', type: 'honoraires', nomSegment: 'honoraires' },
    { cle: 'contact', type: 'contact', nomSegment: 'contact' },
    { cle: 'recu', type: 'recu', nomSegment: 'recu' },
    { cle: 'mentions', type: 'mentions', nomSegment: 'mentions' },
    { cle: 'donnees', type: 'donnees', nomSegment: 'donnees' },
    { cle: 'conditions', type: 'conditions', nomSegment: 'conditions' },
  ];
  for (const s of simples) {
    const x = S(s.nomSegment);
    if (!x) continue;
    const chemin = `/${lang}/${x}/`;
    const m = metaDe(s.cle, lang);
    pousser({
      cle: s.cle,
      type: s.type,
      chemin,
      segments: [x],
      ...m,
      fil: [accueil, { nom: m.titre.split('—')[0].split('|')[0].trim(), url: chemin }],
      data: {},
    });
  }

  return out;
}

let _cache: Route[] | null = null;

/** Alle Adressen aller gebauten Sprachen. */
export function toutesLesRoutes(): Route[] {
  if (_cache) return _cache;
  _cache = languesDuSite().flatMap(routesDe);
  return _cache;
}

/** Index: logischer Schluessel -> Pfad je Sprache. Basis fuer hreflang. */
let _index: Map<string, Partial<Record<Lang, string>>> | null = null;

export function indexAlternatifs(): Map<string, Partial<Record<Lang, string>>> {
  if (_index) return _index;
  const m = new Map<string, Partial<Record<Lang, string>>>();
  for (const r of toutesLesRoutes()) {
    const e = m.get(r.cle) ?? {};
    e[r.lang] = r.chemin;
    m.set(r.cle, e);
  }
  _index = m;
  return m;
}

/** Liefert fuer eine Route die Funktion, die hreflang braucht. */
export function alternatifsPour(cle: string): (l: Lang) => string | null {
  const e = indexAlternatifs().get(cle) ?? {};
  return (l: Lang) => e[l] ?? null;
}

/** Nur die Adressen, die in die Sitemap gehoeren. */
export function routesIndexables(): Route[] {
  return toutesLesRoutes().filter((r) => !r.noindex);
}

/** Alle gebauten Pfade — fuer die Link-Pruefung. */
export function cheminsConnus(): Set<string> {
  return new Set(toutesLesRoutes().map((r) => r.chemin));
}

export type { Famille, OptionAxe, Publication, Situation, Theme };
export { LANGS };
