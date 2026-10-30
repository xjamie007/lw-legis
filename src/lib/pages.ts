/**
 * src/lib/pages.ts — Die vollstaendige Adresstabelle der Seite.
 *
 * Weil sich die Pfadsegmente je Sprache unterscheiden, gibt es genau eine
 * Route (`[lang]/[...chemin].astro`), die alles erzeugt. Diese Datei baut
 * die Tabelle, aus der sie schoepft — und dieselbe Tabelle speist
 * Sitemap, hreflang, Brotkrumen, Weiterleitungen und die Link-Pruefung.
 *
 * Wer hier nicht drinsteht, wird nicht gebaut und nirgends verlinkt.
 */
import { LANGS, aValeur, txt, type Lang, type Multi } from './langs';
import { t } from './i18n';
import { seg, urlAccueil, type NomSegment } from './routes';
import { couper, sansBalises } from './seo';
import { prefixer } from './base';
import { ed, edLibelle, edPage, type Edition } from './edition';
import {
  activites,
  contenu,
  dossiers,
  languesDuSite,
  type Activite,
  type Publication,
} from './content';

export type TypePage =
  | 'accueil'
  | 'avocats'
  | 'activites'
  | 'activite'
  | 'dossiers'
  | 'dossier'
  | 'conferences'
  | 'partenaires'
  | 'index'
  | 'contact'
  | 'recu'
  | 'mentions'
  | 'donnees'
  | 'cookies'
  | 'conditions';

export interface Etape {
  nom: string;
  url: string;
  /** Wo der Name im Redaktionsbereich bearbeitet wird. */
  ed?: Edition;
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
  /** Ueberschrift der Seite (fuer Brotkrumen und Seitenkopf). */
  nom: string;
  titre: string;
  description: string;
  noindex: boolean;
  fil: Etape[];
  data: Record<string, unknown>;
}

/** Titel und Beschreibung: aus `seo`, sonst aus dem Inhalt. */
function meta(cle: string, lang: Lang, nom: string, texte: string) {
  const s = contenu.seo[cle];
  const modele = txt(contenu.seo_modeles.detail?.titre, lang);
  const titre = aValeur(s?.titre, lang) ? txt(s.titre, lang) : modele.replace('%titre%', nom);
  const description = aValeur(s?.description, lang)
    ? txt(s.description, lang)
    : couper(sansBalises(texte), 158);
  return { titre, description, noindex: Boolean(s?.noindex) };
}

const p = (lang: Lang, ...teile: string[]) => prefixer(`/${lang}/${teile.join('/')}/`);

/** Die einfachen Seiten: Schluessel, Seitentyp, Segment, Quelle der Ueberschrift. */
const SIMPLES: { cle: TypePage; nom: (l: Lang) => string; texte: (l: Lang) => string; ed?: Edition }[] = [
  { cle: 'avocats', nom: (l) => txt(contenu.pages.avocats.titre, l), texte: (l) => txt(contenu.pages.avocats.intro, l), ed: edPage('avocats.titre') },
  { cle: 'activites', nom: (l) => txt(contenu.pages.activites.titre, l), texte: (l) => txt(contenu.pages.activites.intro, l), ed: edPage('activites.titre') },
  { cle: 'dossiers', nom: (l) => txt(contenu.pages.dossiers.titre, l), texte: (l) => txt(contenu.pages.dossiers.intro, l), ed: edPage('dossiers.titre') },
  { cle: 'conferences', nom: (l) => (aValeur(contenu.pages.conferences.titre, l) ? txt(contenu.pages.conferences.titre, l) : t(l, 'nav.conferences')), texte: (l) => txt(contenu.pages.conferences.intro, l), ed: edPage('conferences.titre') },
  { cle: 'partenaires', nom: (l) => txt(contenu.pages.partenaires.titre, l), texte: (l) => txt(contenu.pages.partenaires.intro, l), ed: edPage('partenaires.titre') },
  { cle: 'index', nom: (l) => t(l, 'nav.index'), texte: (l) => t(l, 'index.intro'), ed: edLibelle('nav.index') },
  { cle: 'contact', nom: (l) => txt(contenu.pages.contact.titre, l), texte: () => '', ed: edPage('contact.titre') },
  { cle: 'recu', nom: (l) => t(l, 'recu.titre'), texte: (l) => t(l, 'recu.texte'), ed: edLibelle('recu.titre') },
  { cle: 'mentions', nom: (l) => txt(contenu.legal.mentions?.titre, l), texte: (l) => txt(contenu.legal.mentions?.corps, l), ed: ed('legal_pages', 'mentions', 'titre') },
  { cle: 'donnees', nom: (l) => txt(contenu.legal.donnees?.titre, l), texte: (l) => txt(contenu.legal.donnees?.corps, l), ed: ed('legal_pages', 'donnees', 'titre') },
  { cle: 'cookies', nom: (l) => txt(contenu.legal.cookies?.titre, l), texte: (l) => txt(contenu.legal.cookies?.corps, l), ed: ed('legal_pages', 'cookies', 'titre') },
  { cle: 'conditions', nom: (l) => txt(contenu.legal.conditions?.titre, l), texte: (l) => txt(contenu.legal.conditions?.corps, l), ed: ed('legal_pages', 'conditions', 'titre') },
];

/** Gibt es diese einfache Seite in dieser Sprache? */
function simpleExiste(cle: TypePage, lang: Lang): boolean {
  const quelle: Record<string, Multi | undefined> = {
    avocats: contenu.pages.avocats?.titre,
    activites: contenu.pages.activites?.titre,
    dossiers: contenu.pages.dossiers?.titre,
    // Die alte Seite hat keine englische Konferenzseite, aber einen
    // englischen Einleitungssatz; der Titel kommt dann aus der Oberflaeche.
    conferences: contenu.pages.conferences?.intro,
    partenaires: contenu.pages.partenaires?.titre,
    contact: contenu.pages.contact?.titre,
    mentions: contenu.legal.mentions?.corps,
    donnees: contenu.legal.donnees?.corps,
    cookies: contenu.legal.cookies?.corps,
    conditions: contenu.legal.conditions?.corps,
  };
  return cle in quelle ? aValeur(quelle[cle], lang) : true;
}

/** Baut alle Adressen einer Sprache. */
function routesDe(lang: Lang): Route[] {
  const out: Route[] = [];
  const accueil: Etape = { nom: t(lang, 'nav.accueil'), url: urlAccueil(lang), ed: edLibelle('nav.accueil') };

  // --- Startseite -----------------------------------------------------------
  {
    const nom = txt(contenu.pages.accueil.titre, lang);
    out.push({
      cle: 'accueil',
      lang,
      type: 'accueil',
      chemin: urlAccueil(lang),
      segments: [],
      nom,
      ...meta('accueil', lang, nom, txt(contenu.pages.accueil.intro, lang)),
      fil: [],
      data: {},
    });
  }

  // --- Einfache Seiten ------------------------------------------------------
  const etapes: Partial<Record<TypePage, Etape>> = {};
  for (const s of SIMPLES) {
    const x = seg(s.cle as NomSegment, lang);
    if (!x || !simpleExiste(s.cle, lang)) continue;
    const chemin = p(lang, x);
    const nom = s.nom(lang);
    etapes[s.cle] = { nom, url: chemin, ed: s.ed };
    out.push({
      cle: s.cle,
      lang,
      type: s.cle,
      chemin,
      segments: [x],
      nom,
      ...meta(s.cle, lang, nom, s.texte(lang)),
      fil: [accueil, { nom, url: chemin, ed: s.ed }],
      data: {},
    });
  }

  // --- Taetigkeiten ---------------------------------------------------------
  const sAct = seg('activites', lang);
  if (sAct && etapes.activites) {
    for (const a of activites(lang)) {
      const slug = txt(a.slug, lang);
      const chemin = p(lang, sAct, slug);
      const nom = txt(a.terme, lang);
      out.push({
        cle: `activite:${a.id}`,
        lang,
        type: 'activite',
        chemin,
        segments: [sAct, slug],
        nom,
        ...meta(`activite:${a.id}`, lang, nom, txt(a.definition, lang) || txt(a.texte, lang)),
        fil: [accueil, etapes.activites, { nom, url: chemin, ed: ed('services', a.id, 'terme') }],
        data: { activite: a },
      });
    }
  }

  // --- Dossiers -------------------------------------------------------------
  const sDos = seg('dossiers', lang);
  if (sDos && etapes.dossiers) {
    for (const d of dossiers(lang)) {
      const slug = txt(d.slug, lang);
      const chemin = p(lang, sDos, slug);
      const nom = txt(d.titre, lang);
      out.push({
        cle: `dossier:${d.id}`,
        lang,
        type: 'dossier',
        chemin,
        segments: [sDos, slug],
        nom,
        ...meta(`dossier:${d.id}`, lang, nom, txt(d.resume, lang) || txt(d.corps, lang)),
        fil: [accueil, etapes.dossiers, { nom, url: chemin, ed: ed('publications', d.id, 'titre') }],
        data: { dossier: d },
      });
    }
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

/** Adresse einer Seite nach Schluessel, oder null, wenn sie nicht gebaut wird. */
export function adresse(cle: string, lang: Lang): string | null {
  return toutesLesRoutes().find((r) => r.cle === cle && r.lang === lang)?.chemin ?? null;
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

export type { Activite, Publication };
export { LANGS };
