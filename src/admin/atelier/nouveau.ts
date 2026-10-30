/**
 * src/admin/atelier/nouveau.ts — Neue Seiten anlegen und gleich zeigen.
 *
 * Die Vorschau ist die gebaute Website. Was seit dem letzten Bauen
 * angelegt wurde (eine Taetigkeit, ein Dossier, eine Konferenz), steht
 * darin noch nicht. Damit es trotzdem sofort zu sehen und zu bearbeiten ist:
 *
 *   - In jeder Liste (`data-lw-liste`) wird ein vorhandener Eintrag
 *     (`data-lw-item`) kopiert und auf den neuen Datensatz umgestellt.
 *   - Die Seite eines neuen Eintrags ist die Seite eines vorhandenen mit
 *     `?lw-nouveau=<id>`: Ueberschrift, Einleitung und Text zeigen dann auf
 *     den neuen Datensatz und lassen sich wie gewohnt anklicken.
 *
 * Nach „Veröffentlichen“ baut die Website diese Seiten richtig.
 */
import { supabase, urlFichier } from '../supabase';
import type { Lang } from '../../lib/langs';

type Ligne = Record<string, any>;

export type Sorte = 'services' | 'dossier' | 'conference';
export type Nouveaux = Record<Sorte, Ligne[]>;

export const PARAM = 'lw-nouveau';

/** Was die Seite /admin ueber die gebaute Website mitbringt. */
export interface Site {
  /** Kennungen aller Eintraege, die beim Bauen schon da waren. */
  ids: string[];
  /** Je Sprache: Adressen, an denen neue Eintraege gezeigt werden. */
  adresses: Record<string, Record<'services' | 'dossier' | 'activites' | 'dossiers' | 'conferences', string | null>>;
}

export function lireSite(): Site {
  const el = document.getElementById('lw-site');
  return el ? JSON.parse(el.textContent || '{}') : { ids: [], adresses: {} };
}

export const tableDe = (s: Sorte) => (s === 'services' ? 'services' : 'publications');

/** Die seit dem Bauen angelegten Eintraege. */
export async function chargerNouveaux(site: Site): Promise<Nouveaux> {
  const connus = new Set(site.ids);
  const [{ data: s }, { data: p }] = await Promise.all([
    supabase.from('services').select('*').order('ordre', { ascending: true }),
    supabase.from('publications').select('*').order('ordre', { ascending: true }),
  ]);
  const neu = (l: Ligne) => !connus.has(l.id);
  return {
    services: (s ?? []).filter(neu),
    dossier: (p ?? []).filter((l: Ligne) => neu(l) && l.type === 'dossier'),
    conference: (p ?? []).filter((l: Ligne) => neu(l) && l.type === 'conference'),
  };
}

// ---------------------------------------------------------------------------
// Kleinigkeiten
// ---------------------------------------------------------------------------
const LOCALES: Record<string, string> = { fr: 'fr-LU', en: 'en-GB' };

export function taille(octets: number | null | undefined, lang: Lang): string {
  if (!octets) return '';
  const mo = octets / (1024 * 1024);
  const n = (v: number, d: number) => new Intl.NumberFormat(LOCALES[lang], { maximumFractionDigits: d }).format(v);
  return mo >= 1 ? `${n(mo, 1)} MB` : `${n(octets / 1024, 0)} kB`;
}

const mois = (iso: string, lang: Lang) =>
  new Intl.DateTimeFormat(LOCALES[lang], { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(iso));

/** Text leeren, damit die Vorschau den des neuen Datensatzes einsetzt. */
function vider(el: Element) {
  if (el.hasAttribute('data-lw-html')) el.innerHTML = '';
  else el.textContent = '';
}

/** Alle Texte eines Datensatzes auf einen anderen umstellen. */
function umstellen(racine: Element, table: string, ancien: string, neu: string, sauf?: (el: Element) => boolean) {
  for (const el of [racine, ...Array.from(racine.querySelectorAll('[data-lw]'))]) {
    const v = el.getAttribute('data-lw');
    if (!v || (sauf && sauf(el))) continue;
    const [t, id, chemin] = v.split('|');
    if (t !== table || id !== ancien) continue;
    el.setAttribute('data-lw', `${t}|${neu}|${chemin}`);
    vider(el);
  }
}

function etiquettes(conteneur: Element, l: Ligne, themes: Ligne[]) {
  const d = conteneur.ownerDocument;
  conteneur.replaceChildren(
    ...(l.themes ?? [])
      .map((id: string) => themes.find((t) => t.id === id))
      .filter(Boolean)
      .map((t: Ligne) => {
        const s = d.createElement('span');
        s.setAttribute('data-lw', `publication_tags|${t.id}|etiquette`);
        return s;
      }),
  );
}

/** Der letzte reine Text in einem Element (etwa die Groesse neben dem Symbol). */
function texteFinal(el: Element, texte: string) {
  const noeuds = Array.from(el.childNodes).filter((n) => n.nodeType === 3 && n.textContent!.trim());
  if (noeuds.length) noeuds[noeuds.length - 1].textContent = texte;
  else el.append(texte);
}

// ---------------------------------------------------------------------------
// Listen ergaenzen
// ---------------------------------------------------------------------------
async function copier(modele: HTMLElement, l: Ligne, sorte: Sorte, lang: Lang, themes: Ligne[]) {
  const c = modele.cloneNode(true) as HTMLElement;
  const table = tableDe(sorte);
  umstellen(c, table, modele.dataset.lwItem!, l.id);
  c.dataset.lwItem = l.id;
  c.classList.remove('revele--pret');
  c.removeAttribute('aria-current');
  c.querySelectorAll('[aria-current]').forEach((x) => x.removeAttribute('aria-current'));
  if (c.hasAttribute('data-themes')) c.setAttribute('data-themes', (l.themes ?? []).join(' '));
  c.querySelectorAll('.etiquettes').forEach((e) => etiquettes(e, l, themes));

  const date = c.querySelector('.conference__date');
  if (date) date.textContent = l.date_publication ? mois(l.date_publication, lang) : '';

  const lien = (c.matches('a[href]') ? c : c.querySelector('a[href]')) as HTMLAnchorElement | null;
  if (sorte === 'conference') {
    if (l.pdf_chemin && lien) {
      lien.href = await urlFichier(l.pdf_chemin);
      lien.setAttribute('download', '');
      const t = taille(l.pdf_octets, lang);
      c.querySelectorAll('.conference__lien small').forEach((s) => (s.textContent = t));
      c.querySelectorAll('.courte__pdf').forEach((s) => texteFinal(s, t));
    } else if (lien && lien !== c) {
      lien.remove();
    }
  } else if (lien) {
    // Die Seite des Vorbilds, umgestellt auf den neuen Eintrag.
    const u = new URL(lien.href);
    u.searchParams.set(PARAM, l.id);
    lien.href = u.pathname + u.search;
  }
  return c;
}

/** Neue Eintraege in alle Listen der Seite einsetzen. */
export async function completerListes(d: Document, lang: Lang, nouveaux: Nouveaux, themes: Ligne[]) {
  for (const liste of Array.from(d.querySelectorAll<HTMLElement>('[data-lw-liste]'))) {
    const sorte = liste.dataset.lwListe as Sorte;
    const groupe = liste.dataset.lwGroupe;
    const max = Number(liste.dataset.lwMax) || 0;
    const items = Array.from(liste.children).filter((e): e is HTMLElement => e.hasAttribute('data-lw-item'));
    if (!items.length || !nouveaux[sorte]) continue;

    let lignes = nouveaux[sorte];
    if (sorte === 'services' && groupe) lignes = lignes.filter((l) => (l.groupe || 'autres') === groupe);
    if (sorte === 'conference' && max) lignes = lignes.filter((l) => l.pdf_chemin);
    // Taetigkeiten hinten anfuegen, Dossiers und Konferenzen vorn: das Neueste zuerst.
    const devant = sorte !== 'services';
    for (const l of devant ? [...lignes].reverse() : lignes) {
      if (liste.querySelector(`[data-lw-item="${CSS.escape(l.id)}"]`)) continue;
      const c = await copier(items[0], l, sorte, lang, themes);
      if (devant) liste.querySelector('[data-lw-item]')!.before(c);
      else Array.from(liste.querySelectorAll(':scope > [data-lw-item]')).pop()!.after(c);
    }
    if (max) Array.from(liste.querySelectorAll(':scope > [data-lw-item]')).slice(max).forEach((x) => x.remove());
  }
}

// ---------------------------------------------------------------------------
// Die Seite eines neuen Eintrags
// ---------------------------------------------------------------------------
/**
 * Stellt die geladene Vorbildseite auf den neuen Eintrag um. Gibt zurueck,
 * ob das gelungen ist.
 */
export async function preparerPageNouvelle(d: Document, id: string, lang: Lang, themes: Ligne[]): Promise<boolean> {
  const h1 = d.querySelector('h1[data-lw]');
  if (!h1) return false;
  const [table, ancien] = h1.getAttribute('data-lw')!.split('|');
  const { data: l } = await supabase.from(table).select('*').eq('id', id).maybeSingle();
  if (!l) return false;

  // Listen bleiben, wie sie sind: dort steht das Vorbild als eigener Eintrag.
  umstellen(d.body, table, ancien, id, (el) => Boolean(el.closest('[data-lw-liste]')));
  d.querySelectorAll('[data-lw-liste] [aria-current]').forEach((x) => x.removeAttribute('aria-current'));

  // Was aus dem Text des Vorbilds abgeleitet war, passt nicht mehr.
  d.querySelector('[data-sommaire]')?.remove();
  d.querySelector('[aria-labelledby="conf-liees"]')?.remove();

  const meta = d.querySelector('[data-lw-pdfs]');
  if (meta) {
    meta.querySelectorAll(':scope > a').forEach((a) => a.remove());
    const modele = meta.querySelector<HTMLTemplateElement>('template[data-lw-modele-pdf]');
    if (l.pdf_chemin && modele) {
      const bouton = modele.content.firstElementChild!.cloneNode(true) as HTMLAnchorElement;
      bouton.href = await urlFichier(l.pdf_chemin);
      const small = bouton.querySelector('small');
      if (small) small.textContent = `PDF${l.pdf_octets ? ` · ${taille(l.pdf_octets, lang)}` : ''}`;
      meta.prepend(bouton);
    }
    const et = meta.querySelector('.etiquettes');
    if (et) etiquettes(et, l, themes);
  }
  return true;
}

/** In der Seitenleiste den neuen Eintrag als den aktuellen markieren. */
export function marquerCourant(d: Document, id: string) {
  d.querySelectorAll(`[data-lw-liste] [data-lw-item="${CSS.escape(id)}"]`).forEach((a) =>
    a.setAttribute('aria-current', 'page'),
  );
}

// ---------------------------------------------------------------------------
// Anlegen
// ---------------------------------------------------------------------------
export interface Brouillon {
  titre: string;
  texte: string;
  groupe?: string;
  themes: string[];
  date?: string;
  pdf?: { chemin: string; octets: number } | null;
}

const slug = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);

const echapper = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Legt den Eintrag an und gibt seine Kennung zurueck. */
export async function creer(sorte: Sorte, b: Brouillon, lang: Lang): Promise<string> {
  const table = tableDe(sorte);
  const { data: tous, error: erreurLecture } = await supabase.from(table).select('*');
  if (erreurLecture) throw new Error(erreurLecture.message);
  const existants = (tous ?? []) as Ligne[];

  const base = slug(b.titre) || sorte;
  let id = base;
  for (let n = 2; existants.some((l) => l.id === id); n++) id = `${base}-${n}`;

  const ordres = existants.filter((l) => sorte === 'services' || l.type === sorte).map((l) => Number(l.ordre) || 0);
  const m = (v: string) => (v ? { [lang]: v } : {});
  const html = b.texte ? `<p>${echapper(b.texte)}</p>` : '';
  const aujourdhui = new Date().toISOString().slice(0, 10);

  const ligne: Ligne =
    sorte === 'services'
      ? {
          id,
          slug: { [lang]: id },
          terme: m(b.titre),
          definition: m(b.texte),
          texte: m(html),
          groupe: b.groupe || null,
          ordre: (ordres.length ? Math.max(...ordres) : 0) + 1,
          statut: 'veroeffentlicht',
        }
      : {
          id,
          type: sorte,
          slug: sorte === 'dossier' ? { [lang]: id } : {},
          // Konferenzen erscheinen nur mit franzoesischem Titel.
          titre: sorte === 'conference' ? { fr: b.titre, ...m(b.titre) } : m(b.titre),
          resume: m(b.texte),
          corps: sorte === 'dossier' ? m(html) : {},
          themes: b.themes,
          pdf_chemin: b.pdf?.chemin ?? null,
          pdf_octets: b.pdf?.octets ?? null,
          date_publication: b.date || aujourdhui,
          etat_du_droit: aujourdhui,
          ordre: (ordres.length ? Math.min(...ordres) : 0) - 1,
          statut: 'veroeffentlicht',
        };

  const { error } = await supabase.from(table).insert(ligne).select('id').single();
  if (error) throw new Error(error.message);
  return id;
}

/** Wo der neue Eintrag zu sehen ist. */
export function adresseNouveau(site: Site, sorte: Sorte, id: string, lang: Lang): string | null {
  const a = site.adresses[lang];
  if (!a) return null;
  if (sorte === 'conference') return a.conferences;
  const modele = sorte === 'services' ? a.services : a.dossier;
  return modele ? `${modele}?${PARAM}=${encodeURIComponent(id)}` : null;
}
