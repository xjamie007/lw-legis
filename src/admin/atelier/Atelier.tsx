/**
 * src/admin/atelier/Atelier.tsx — Die Website bearbeiten, direkt auf der Seite.
 *
 * Bedienung wie in den Demos fuer Krombach und DRP:
 *
 *   Text anklicken     -> direkt lostippen (laengere Texte mit Absaetzen,
 *                         Listen und Fussnoten oeffnen ein Fenster mit dem
 *                         Texteditor)
 *   Leiste unten       -> Speichern · Rückgängig · Seiten · Google ·
 *                         Veröffentlichen · Mehr
 *
 * Die Website ist die statisch gebaute Seite in einem <iframe> ueber die
 * ganze Flaeche (dieselbe Adresse, derselbe Server). Beim Laden legt diese
 * Datei die gespeicherten und die noch nicht gespeicherten Texte darueber.
 * Gelb hinterlegt ist, was anders ist als online.
 *
 * Getippt wird zuerst nur hier im Browser („wartet“). „Speichern“ schreibt
 * alles in die Datenbank, „Veröffentlichen“ baut daraus die Website neu.
 * Ungespeichertes geht beim Seitenwechsel nicht verloren: Es haengt am
 * Datensatz, nicht an der Seite.
 *
 * Welcher Text zu welchem Datensatz gehoert, steht im HTML als
 * `data-lw` (src/lib/edition.ts, src/admin/atelier/chemins.ts).
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { demo, estLocal, supabase, type Profil } from '../supabase';
import { reinitialiserDemo } from '../demo';
import { traduire, type LangueAdmin } from '../i18n';
import { COLLECTIONS, ORDRE_NAV } from '../schema';
import { LANG_NOMS, type Lang } from '../../lib/langs';
import { SEGMENTS, type NomSegment } from '../../lib/routes';
import Feuille from '../composants/Feuille';
import Publier from '../composants/Publier';
import EditeurTexte from '../composants/EditeurTexte';
import Anfragen from '../composants/Anfragen';
import Medias from '../composants/Medias';
import Liste from '../composants/Liste';
import Editeur from '../composants/Editeur';
import ListeModifications from './ListeModifications';
import {
  adresseDe,
  apercu,
  colonneCle,
  lire,
  lireCle,
  nomDeLaPage,
  pagesPrincipales,
  poser,
  texteCle,
  valeurDe,
  type Cle,
} from './chemins';
import { annulerModification, chargerModifications, type Modification } from './modifications';
import { prefixer } from '../../lib/base';

type Ligne = Record<string, any>;
type CleT = Parameters<typeof traduire>[1];

interface Props {
  langueAdmin: LangueAdmin;
  profil: Profil;
  /** Zeitpunkt, aus dem die Website zuletzt gebaut wurde. */
  stand: string;
  /** Die Sprachen, in denen die Website gebaut wird. */
  langues: Lang[];
  /** Die Seite, von der aus „Login“ geklickt wurde. */
  depart: string;
  onLangueAdmin: (l: LangueAdmin) => void;
  onAbmelden: (chemin: string) => void;
}

/** Ein getippter, noch nicht gespeicherter Text. */
interface Attente {
  cle: Cle;
  lang: Lang;
  texte: string;
}
type Attentes = Record<string, Attente>;

type Fenster =
  | 'seiten'
  | 'google'
  | 'publier'
  | 'mehr'
  | 'hilfe'
  | 'nachrichten'
  | 'medias'
  | 'inhalte';

/** Die Markierungen in der Website. Liegen IN der Vorschau, nicht hier. */
const STYLE_VORSCHAU = `
  [data-lw] {
    cursor: text; border-radius: 2px;
    outline: 2px dashed transparent; outline-offset: 3px;
    transition: outline-color .15s;
  }
  [data-lw]:hover { outline-color: rgba(160, 124, 60, .75); }
  [data-lw]:focus { outline: 2px solid #a07c3c; background-color: rgba(160, 124, 60, .08); }
  [data-lw-html] { cursor: pointer; }
  .lw-fixe, .lw-fixe:hover { cursor: not-allowed; outline-color: transparent; }
  .lw-geaendert {
    background-color: rgba(255, 208, 90, 0.5) !important;
    box-shadow: 0 0 0 3px rgba(255, 208, 90, 0.5);
  }
  .lw-choisi, .lw-choisi:hover { outline: 3px solid #f5a524 !important; outline-offset: 3px; }
  @keyframes lw-blinken { 0%, 100% { outline-color: transparent; } 50% { outline-color: #f5a524; } }
  .lw-blinken { outline: 3px solid #f5a524; outline-offset: 3px; animation: lw-blinken 0.7s ease 3; }
  astro-dev-toolbar { display: none !important; }
`;

const norm = (s: string) => s.replace(/\s+/g, ' ').trim();
const cleAttente = (c: Cle, lang: Lang) => `${texteCle(c)}|${lang}`;
const cleLigne = (c: Cle) => `${c.table}|${c.id}`;

/** Die Seiten mit eigenen Angaben fuer Google (`seo_meta.id`). */
const PAGES_SEO: NomSegment[] = [
  'avocats',
  'activites',
  'dossiers',
  'conferences',
  'partenaires',
  'index',
  'contact',
  'mentions',
  'donnees',
  'cookies',
  'conditions',
];
function idSeo(chemin: string, lang: Lang): string | null {
  const teile = chemin.split('/').filter(Boolean);
  if (teile.length === 1) return 'accueil';
  if (teile.length !== 2) return null;
  return PAGES_SEO.find((n) => SEGMENTS[n][lang] === teile[1]) ?? null;
}

export default function Atelier({
  langueAdmin,
  profil,
  stand,
  langues,
  depart,
  onLangueAdmin,
  onAbmelden,
}: Props) {
  const t = (c: CleT, v?: Record<string, string | number>) => traduire(langueAdmin, c, v);
  const estOwner = profil.role === 'owner';

  const cadre = useRef<HTMLIFrameElement>(null);
  const [ici, setIci] = useState<{ chemin: string; lang: Lang; nom: string } | null>(null);
  const [fenster, setFenster] = useState<Fenster | null>(null);
  const [riche, setRiche] = useState<Attente | null>(null);
  const [toast, setToast] = useState<{ texte: string; ms: number; n: number } | null>(null);
  const [modifs, setModifs] = useState<Modification[] | null>(null);
  const [nouvelles, setNouvelles] = useState(0);
  const [occupe, setOccupe] = useState(false);
  const [inhalte, setInhalte] = useState<{ cle?: string; id?: string }>({});

  /** Getippt, aber noch nicht gespeichert. Die Ref ist die Wahrheit. */
  const attentes = useRef<Attentes>({});
  /** Fuer „Rückgängig“: frühere Staende von `attentes`. */
  const pile = useRef<Attentes[]>([]);
  /** Neu zeichnen, wenn sich `attentes` oder `pile` aendern. */
  const [, setRev] = useState(0);
  const neuZeichnen = () => setRev((r) => r + 1);

  /** Zeilen aus der Datenbank, nach `tabelle|schluessel`. */
  const lignes = useRef(new Map<string, Ligne>());
  /** Was die gebaute Seite an dieser Stelle zeigt — also der Stand online. */
  const originaux = useRef(new WeakMap<Element, string>());
  /** Nach dem naechsten Laden zu dieser Stelle springen. */
  const aMontrer = useRef<string | null>(null);

  const doc = () => cadre.current?.contentDocument ?? null;
  const elementsDe = (cle: string) =>
    Array.from(doc()?.querySelectorAll('[data-lw]') ?? []).filter(
      (el) => el.getAttribute('data-lw') === cle,
    );

  const montrerToast = (texte: string, ms = 2600) =>
    setToast((alt) => ({ texte, ms, n: (alt?.n ?? 0) + 1 }));
  useEffect(() => {
    if (!toast) return;
    const minuterie = window.setTimeout(() => setToast(null), toast.ms);
    return () => window.clearTimeout(minuterie);
  }, [toast]);

  // --- Werte -----------------------------------------------------------------
  /** Was an dieser Stelle stehen soll: getippt, sonst gespeichert. */
  function valeur(c: Cle, lang: Lang): string {
    const a = attentes.current[cleAttente(c, lang)];
    if (a) return a.texte;
    return valeurDe(lignes.current.get(cleLigne(c)), c, lang).texte;
  }

  function rendre(el: Element, texte: string) {
    const html = el.hasAttribute('data-lw-html');
    const original = originaux.current.get(el) ?? '';
    // Leer: die gebaute Seite zeigt an dieser Stelle schon, dass etwas
    // fehlt. Das bleibt stehen.
    const neu = texte.trim() === '' ? original : texte;
    if (html) {
      const probe = el.ownerDocument.createElement('div');
      probe.innerHTML = neu;
      if (norm(probe.innerHTML) !== norm(el.innerHTML)) el.innerHTML = neu;
      el.classList.toggle('lw-geaendert', norm(el.innerHTML) !== norm(original));
    } else {
      if (norm(el.textContent ?? '') !== norm(neu)) el.textContent = neu;
      el.classList.toggle('lw-geaendert', norm(el.textContent ?? '') !== norm(original));
    }
  }

  /** Alle Texte der Seite neu zeichnen, z. B. nach „Rückgängig“. */
  function toutRendre() {
    const d = doc();
    if (!d) return;
    const lang = langueDe(d);
    for (const el of Array.from(d.querySelectorAll('[data-lw]'))) {
      // Ohne Wert stellt `rendre` den Text der gebauten Seite wieder her.
      rendre(el, valeur(lireCle(el.getAttribute('data-lw')!), lang));
    }
  }

  const langueDe = (d: Document) => (d.documentElement.lang.slice(0, 2) || langues[0]) as Lang;

  function lectureSeule(c: Cle): string | null {
    if (estOwner) return null;
    if (c.table === 'legal_pages') return t('atelier.nur_inhaber');
    if (c.table === 'settings' && lignes.current.get(cleLigne(c))?.reserve_owner) {
      return t('atelier.nur_inhaber');
    }
    return null;
  }

  /** Einen getippten Text vormerken. Gleiche Texte zaehlen nicht. */
  function vormerken(c: Cle, lang: Lang, texte: string) {
    if (texte === valeur(c, lang)) return;
    pile.current = [...pile.current.slice(-59), attentes.current];
    const gespeichert = valeurDe(lignes.current.get(cleLigne(c)), c, lang).texte;
    const naechste = { ...attentes.current };
    // Wieder wie gespeichert: dann wartet hier nichts mehr.
    if (texte === gespeichert) delete naechste[cleAttente(c, lang)];
    else naechste[cleAttente(c, lang)] = { cle: c, lang, texte };
    attentes.current = naechste;
    for (const el of elementsDe(texteCle(c))) rendre(el, texte);
    neuZeichnen();
  }

  function rueckgaengig() {
    const vorher = pile.current.pop();
    if (!vorher) return;
    attentes.current = vorher;
    toutRendre();
    neuZeichnen();
    montrerToast(t('atelier.rueckgaengig_ok'));
  }

  // --- Zeilen holen ----------------------------------------------------------
  async function chargerLignes(cles: Cle[]) {
    const parTable = new Map<string, Set<string>>();
    for (const c of cles) {
      if (!parTable.has(c.table)) parTable.set(c.table, new Set());
      parTable.get(c.table)!.add(c.id);
    }
    await Promise.all(
      [...parTable].map(async ([table, ids]) => {
        const col = colonneCle(table);
        const { data } = await supabase.from(table).select('*').in(col, [...ids]);
        for (const l of data ?? []) lignes.current.set(`${table}|${l[col]}`, l);
      }),
    );
  }

  const rafraichirModifs = useCallback(async () => {
    setModifs(await chargerModifications(stand));
  }, [stand]);

  const compterNouvelles = useCallback(async () => {
    const { count } = await supabase
      .from('inquiries')
      .select('id', { count: 'exact', head: true })
      .eq('traite', false);
    setNouvelles(count ?? 0);
  }, []);

  useEffect(() => {
    void rafraichirModifs();
    void compterNouvelles();
    montrerToast(t('atelier.angemeldet'), 4200);
    // Nur einmal nach der Anmeldung.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Nicht gespeichert? Dann fragt der Browser vor dem Verlassen nach.
  useEffect(() => {
    const avant = (e: BeforeUnloadEvent) => {
      if (Object.keys(attentes.current).length) e.preventDefault();
    };
    window.addEventListener('beforeunload', avant);
    return () => window.removeEventListener('beforeunload', avant);
  }, []);

  // --- Speichern -------------------------------------------------------------
  async function enregistrer() {
    // Was gerade getippt wird, zaehlt mit.
    (doc()?.activeElement as HTMLElement | null)?.blur?.();
    const liste = Object.values(attentes.current);
    if (!liste.length || occupe) return;
    setOccupe(true);

    const parLigne = new Map<string, Attente[]>();
    for (const a of liste) {
      const k = cleLigne(a.cle);
      parLigne.set(k, [...(parLigne.get(k) ?? []), a]);
    }

    const problemes: string[] = [];
    const reste = { ...attentes.current };
    for (const groupe of parLigne.values()) {
      const { table, id } = groupe[0].cle;
      const col = colonneCle(table);
      // Frisch lesen: Seit dem Oeffnen koennte jemand anderes an derselben
      // Zeile gearbeitet haben, und die Seitentexte liegen alle in einer.
      const { data: frais, error: erreurLecture } = await supabase
        .from(table)
        .select('*')
        .eq(col, id)
        .single();
      if (erreurLecture || !frais) {
        problemes.push(erreurLecture?.message ?? t('app.fehler'));
        continue;
      }
      let suivant: Ligne = frais;
      const colonnes = new Set<string>();
      for (const a of groupe) {
        suivant = poser(suivant, valeurDe(suivant, a.cle, a.lang).chemin, a.texte);
        colonnes.add(a.cle.chemin[0]);
      }
      const maj = Object.fromEntries([...colonnes].map((c) => [c, lire(suivant, [c])]));
      const { data: ecrit, error } = await supabase.from(table).update(maj).eq(col, id).select();
      if (error) {
        problemes.push(error.message);
        continue;
      }
      // Ohne Recht verweigert die Datenbank nicht laut, sie aendert still
      // null Zeilen. Das muss hier auffallen.
      if (!ecrit || ecrit.length === 0) {
        problemes.push(t('atelier.keine_berechtigung'));
        continue;
      }
      lignes.current.set(`${table}|${id}`, ecrit[0]);
      for (const a of groupe) delete reste[cleAttente(a.cle, a.lang)];
    }

    attentes.current = reste;
    if (!problemes.length) pile.current = [];
    setOccupe(false);
    neuZeichnen();
    toutRendre();
    void rafraichirModifs();
    if (problemes.length) {
      montrerToast(`${t('atelier.speichern_fehler')} ${problemes.join(' · ')}`, 7000);
    } else {
      montrerToast(t('atelier.gespeichert_ok'), 4200);
    }
  }

  // --- Ein laengerer Text: im Fenster mit dem Texteditor -------------------
  function ouvrirRiche(el: Element) {
    const d = el.ownerDocument;
    const c = lireCle(el.getAttribute('data-lw')!);
    const lang = langueDe(d);
    const raison = lectureSeule(c);
    if (raison) return montrerToast(raison, 4000);
    d.querySelectorAll('.lw-choisi').forEach((x) => x.classList.remove('lw-choisi'));
    el.classList.add('lw-choisi');
    setRiche({ cle: c, lang, texte: valeur(c, lang) });
  }

  function fermerRiche(texte: string | null) {
    if (!riche) return;
    doc()
      ?.querySelectorAll('.lw-choisi')
      .forEach((x) => x.classList.remove('lw-choisi'));
    if (texte !== null) vormerken(riche.cle, riche.lang, texte);
    else for (const el of elementsDe(texteCle(riche.cle))) rendre(el, valeur(riche.cle, riche.lang));
    setRiche(null);
  }

  // Die Ereignisse in der Website rufen immer die neueste Fassung auf.
  const aktuell = useRef({ vormerken, ouvrirRiche, montrerToast, enregistrer, lectureSeule, t, abmelden });
  aktuell.current = { vormerken, ouvrirRiche, montrerToast, enregistrer, lectureSeule, t, abmelden };

  function abmelden() {
    const chemin = ici?.chemin ?? depart;
    if (Object.keys(attentes.current).length && !window.confirm(t('atelier.abmelden_ungespeichert'))) {
      return;
    }
    attentes.current = {};
    onAbmelden(chemin);
  }

  // --- Die Website vorbereiten, sobald eine Seite geladen ist ----------------
  async function preparer() {
    const d = doc();
    const fenetre = cadre.current?.contentWindow;
    if (!d || !fenetre) return;

    const chemin = fenetre.location.pathname;
    // Neu laden fuehrt auf dieselbe Seite zurueck.
    window.history.replaceState(null, '', `?seite=${encodeURIComponent(chemin)}`);
    const lang = langueDe(d);
    setIci({ chemin, lang, nom: nomDeLaPage(chemin, d.querySelector('h1')?.textContent ?? '', langueAdmin) });

    const style = d.createElement('style');
    style.textContent = STYLE_VORSCHAU;
    d.head.appendChild(style);

    // „Login“ im Footer heisst jetzt „Abmelden“ — wie bei Krombach und DRP.
    for (const a of Array.from(d.querySelectorAll('.k-login'))) {
      a.textContent = aktuell.current.t('app.abmelden');
      a.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        aktuell.current.abmelden();
      });
    }

    const elements = Array.from(d.querySelectorAll('[data-lw]'));
    for (const el of elements) {
      originaux.current.set(el, el.hasAttribute('data-lw-html') ? el.innerHTML : (el.textContent ?? ''));
    }

    // --- Ereignisse ---------------------------------------------------------
    const editable = (x: EventTarget | null) =>
      (x as Element | null)?.closest?.('[data-lw]:not([data-lw-html])') as HTMLElement | null;

    d.addEventListener(
      'click',
      (e) => {
        const cible = e.target as Element | null;
        if (cible?.closest?.('.k-login')) return;
        const el = cible?.closest?.('[data-lw]');
        if (el) {
          const raison = aktuell.current.lectureSeule(lireCle(el.getAttribute('data-lw')!));
          if (el.hasAttribute('data-lw-html') || raison) {
            e.preventDefault();
            e.stopPropagation();
            if (raison) aktuell.current.montrerToast(raison, 4000);
            else aktuell.current.ouvrirRiche(el);
            return;
          }
          // Text in einem Link: tippen statt weiterspringen. In einer
          // zugeklappten Frage darf der Klick sie noch aufklappen.
          const resume = el.closest('summary');
          if (!resume || resume.parentElement?.hasAttribute('open')) e.preventDefault();
          return;
        }
        const a = cible?.closest?.('a[href]') as HTMLAnchorElement | null;
        if (a) {
          const intern = a.origin === fenetre.location.origin && !a.target;
          if (!intern) {
            e.preventDefault();
            aktuell.current.montrerToast(aktuell.current.t('atelier.extern_blockiert'));
          }
        }
      },
      true,
    );
    d.addEventListener('focusin', (e) => {
      const el = editable(e.target);
      if (el) (el as any)._avant = norm(el.textContent ?? '');
    });
    d.addEventListener('focusout', (e) => {
      const el = editable(e.target);
      if (!el) return;
      const texte = norm(el.textContent ?? '');
      if ((el as any)._avant === texte) return;
      const c = lireCle(el.getAttribute('data-lw')!);
      aktuell.current.vormerken(c, langueDe(d), texte);
    });
    d.addEventListener(
      'keydown',
      (e) => {
        const el = editable(e.target);
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') {
          e.preventDefault();
          void aktuell.current.enregistrer();
          return;
        }
        if (!el) {
          // Laengere Texte mit der Tastatur oeffnen.
          const riche = (e.target as Element | null)?.closest?.('[data-lw-html]');
          if (riche && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            aktuell.current.ouvrirRiche(riche);
          }
          return;
        }
        // Ein Titel hat keine Zeilenumbrueche: Enter beendet die Eingabe.
        if (e.key === 'Enter') {
          e.preventDefault();
          el.blur();
        }
        // In einer Frage wuerde die Leertaste sie auf- und zuklappen.
        if (e.key === ' ' && el.closest('summary')) {
          e.preventDefault();
          d.execCommand('insertText', false, ' ');
        }
      },
      true,
    );
    // Eingefuegter Text verliert seine Formatierung.
    d.addEventListener('paste', (e) => {
      if (!editable(e.target)) return;
      e.preventDefault();
      d.execCommand('insertText', false, norm(e.clipboardData?.getData('text/plain') ?? ''));
    });
    // Aus der Vorschau wird nichts abgeschickt — kein Formular erreicht
    // die Kanzlei, nur weil jemand beim Bearbeiten auf „Senden“ drueckt.
    d.addEventListener(
      'submit',
      (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        aktuell.current.montrerToast(aktuell.current.t('atelier.formular_blockiert'));
      },
      true,
    );

    // --- Gespeicherte und getippte Texte darueberlegen -----------------------
    await chargerLignes(elements.map((el) => lireCle(el.getAttribute('data-lw')!)));
    if (doc() !== d) return; // inzwischen weitergeblaettert
    for (const el of elements) {
      const c = lireCle(el.getAttribute('data-lw')!);
      rendre(el, valeur(c, lang));
      if (el.hasAttribute('data-lw-html')) {
        el.setAttribute('tabindex', '0');
      } else if (lectureSeule(c)) {
        el.classList.add('lw-fixe');
      } else {
        const h = el as HTMLElement;
        h.contentEditable = 'plaintext-only';
        if (h.contentEditable !== 'plaintext-only') h.contentEditable = 'true';
        h.spellcheck = true;
      }
    }

    if (aMontrer.current) sauter();
  }

  function sauter() {
    const cle = aMontrer.current;
    aMontrer.current = null;
    const cible = cle ? elementsDe(cle)[0] : null;
    if (!cible) return;
    cible.scrollIntoView({ block: 'center', behavior: 'smooth' });
    cible.classList.add('lw-blinken');
    window.setTimeout(() => cible.classList.remove('lw-blinken'), 2400);
  }

  // --- Navigation ------------------------------------------------------------
  function aller(chemin: string) {
    const f = cadre.current?.contentWindow;
    if (!f) return;
    if (f.location.pathname === chemin) return sauter();
    f.location.assign(chemin);
  }

  function changerLangue(l: Lang) {
    const alt = doc()?.querySelector(`link[rel="alternate"][hreflang="${l}"]`)?.getAttribute('href');
    try {
      aller(alt ? new URL(alt, window.location.href).pathname : prefixer(`/${l}/`));
    } catch {
      aller(prefixer(`/${l}/`));
    }
  }

  function recharger() {
    cadre.current?.contentWindow?.location.reload();
  }

  // --- Aenderungen ansehen und zuruecknehmen ---------------------------------
  function montrer(m: Modification) {
    const derniere = m.chemin[m.chemin.length - 1];
    const langueModif = langues.find((l) => l === derniere);
    const lang = langueModif ?? ici?.lang ?? langues[0];
    const cheminCle = langueModif ? m.chemin.slice(0, -1) : m.chemin;
    aMontrer.current = texteCle({ table: m.table, id: m.id, chemin: cheminCle });
    setFenster(null);
    aller(adresseDe(m.table, m.id, cheminCle, m.ligne, lang));
  }

  async function annuler(m: Modification) {
    const probleme = await annulerModification(m);
    if (probleme) {
      window.alert(`${t('atelier.speichern_fehler')} ${probleme}`);
      return;
    }
    // Die Website neu aufbauen, damit der alte Text wieder dasteht.
    lignes.current.clear();
    recharger();
    await rafraichirModifs();
    montrerToast(t('atelier.zurueckgenommen'));
  }

  /** Nach Bildern, Nachrichten und Weiteren Inhalten: frisch laden. */
  function fermerFenster() {
    if (fenster === 'medias' || fenster === 'inhalte') {
      lignes.current.clear();
      recharger();
      void rafraichirModifs();
    }
    if (fenster === 'nachrichten') void compterNouvelles();
    setFenster(null);
    setInhalte({});
  }

  // ---------------------------------------------------------------------------
  const nombreAttentes = Object.keys(attentes.current).length;
  const sale = nombreAttentes > 0;
  const nombre = modifs?.length ?? 0;
  const lang = ici?.lang ?? langues[0];
  const fermer = t('atelier.schliessen');

  return (
    <>
      <iframe
        ref={cadre}
        className="kx-cadre"
        src={depart}
        title={t('atelier.vorschau')}
        onLoad={() => void preparer()}
      />

      <nav className="kx-bar" aria-label={t('app.titre')}>
        <button
          type="button"
          className={sale ? 'kx-b kx-save kx-dirty' : 'kx-b kx-save'}
          disabled={!sale || occupe}
          onClick={() => void enregistrer()}
        >
          <span className="kx-i" aria-hidden="true">✓</span>
          <span>{occupe ? t('leiste.speichert') : sale ? t('leiste.speichern') : t('leiste.gespeichert')}</span>
        </button>
        <button type="button" className="kx-b" disabled={!pile.current.length} onClick={rueckgaengig}>
          <span className="kx-i" aria-hidden="true">↶</span>
          <span>{t('leiste.rueckgaengig')}</span>
        </button>
        <button type="button" className="kx-b" onClick={() => setFenster('seiten')}>
          <span className="kx-i" aria-hidden="true">☰</span>
          <span>{t('leiste.seiten')}</span>
        </button>
        <button type="button" className="kx-b" onClick={() => setFenster('google')}>
          <span className="kx-i" aria-hidden="true">G</span>
          <span>Google</span>
        </button>
        <button type="button" className="kx-b" onClick={() => setFenster('publier')}>
          <span className="kx-i" aria-hidden="true">⇪</span>
          <span>{t('leiste.veroeffentlichen')}</span>
          {nombre > 0 && <span className="kx-badge">{nombre}</span>}
        </button>
        <button type="button" className="kx-b" onClick={() => setFenster('mehr')}>
          <span className="kx-i" aria-hidden="true">⋯</span>
          <span>{t('leiste.mehr')}</span>
          {nouvelles > 0 && (
            <span className="kx-badge" aria-label={t('nav.neu', { n: nouvelles })}>
              {nouvelles}
            </span>
          )}
        </button>
      </nav>

      {toast && (
        <p key={toast.n} className="kx-toast" role="status">
          {toast.texte}
        </p>
      )}

      {riche && (
        <FenetreRiche
          attente={riche}
          ligne={lignes.current.get(cleLigne(riche.cle))}
          langueAdmin={langueAdmin}
          onApercu={(texte) => {
            for (const el of elementsDe(texteCle(riche.cle))) rendre(el, texte);
          }}
          onFermer={fermerRiche}
        />
      )}

      {fenster === 'seiten' && (
        <Feuille titre={t('seiten.titel')} onFermer={fermerFenster} fermer={fermer}>
          <div className="kx-list">
            {pagesPrincipales(lang, langueAdmin).map((p) => (
              <button
                key={p.chemin}
                type="button"
                className={p.chemin === ici?.chemin ? 'kx-li kx-cur' : 'kx-li'}
                onClick={() => {
                  setFenster(null);
                  aller(p.chemin);
                }}
              >
                {p.nom}
              </button>
            ))}
          </div>
          {langues.length > 1 && (
            <>
              <h3 className="kx-h3">{t('atelier.sprache_website')}</h3>
              <div className="kx-row kx-row--start">
                {langues.map((l) => (
                  <button
                    key={l}
                    type="button"
                    className={l === lang ? 'kx-btn kx-primary' : 'kx-btn kx-ghost'}
                    aria-pressed={l === lang}
                    onClick={() => {
                      setFenster(null);
                      changerLangue(l);
                    }}
                  >
                    {LANG_NOMS[l]}
                  </button>
                ))}
              </div>
            </>
          )}
        </Feuille>
      )}

      {fenster === 'google' && ici && (
        <FenetreGoogle
          chemin={ici.chemin}
          lang={ici.lang}
          langueAdmin={langueAdmin}
          lignes={lignes.current}
          valeur={valeur}
          document={doc()}
          onAppliquer={(c, texte) => vormerken(c, ici.lang, texte)}
          onFermer={(applique) => {
            setFenster(null);
            if (applique) montrerToast(t('google.uebernommen'), 4000);
          }}
        />
      )}

      {fenster === 'publier' && (
        <Feuille titre={t('leiste.veroeffentlichen')} large onFermer={fermerFenster} fermer={fermer}>
          {sale && <p className="kx-err kx-abstand">{t('publier.erst_speichern')}</p>}
          {modifs === null ? (
            <p className="kx-hint">{t('app.laden')}</p>
          ) : nombre === 0 ? (
            <p className="kx-p">{t('atelier.keine_aenderungen')}</p>
          ) : (
            <>
              <p className="kx-p">{t('atelier.noch_nicht_online', { n: nombre })}</p>
              <Publier langue={langueAdmin} nombre={nombre} local={estLocal} />
              <h3 className="kx-h3">{t('atelier.ihre_aenderungen')}</h3>
              <ListeModifications
                modifications={modifs}
                langueAdmin={langueAdmin}
                onMontrer={montrer}
                onAnnuler={annuler}
              />
            </>
          )}
        </Feuille>
      )}

      {fenster === 'mehr' && (
        <Feuille titre={t('leiste.mehr')} onFermer={fermerFenster} fermer={fermer}>
          <p className="kx-hint kx-abstand">{t('mehr.angemeldet_als', { nom: profil.nom || '—' })}</p>
          <div className="kx-list">
            <button type="button" className="kx-li" onClick={() => setFenster('nachrichten')}>
              ✉ {t('nav.nachrichten')}
              {nouvelles > 0 && ` (${nouvelles})`}
            </button>
            <button type="button" className="kx-li" onClick={() => setFenster('medias')}>
              ▣ {t('nav.medias')}
            </button>
            <button type="button" className="kx-li" onClick={() => setFenster('inhalte')}>
              ☰ {t('nav.mehr')}
            </button>
            <button type="button" className="kx-li" onClick={() => setFenster('hilfe')}>
              ❓ {t('mehr.anleitung')}
            </button>
            <button type="button" className="kx-li" onClick={recharger}>
              ↻ {t('mehr.neu_laden')}
            </button>
            {demo && (
              <button
                type="button"
                className="kx-li"
                onClick={() => {
                  if (!window.confirm(t('mehr.demo_sicher'))) return;
                  reinitialiserDemo();
                  window.location.reload();
                }}
              >
                ⟲ {t('mehr.demo_zuruecksetzen')}
              </button>
            )}
          </div>
          <h3 className="kx-h3">{t('app.sprache')}</h3>
          <div className="kx-row kx-row--start">
            {(['de', 'fr'] as const).map((l) => (
              <button
                key={l}
                type="button"
                className={l === langueAdmin ? 'kx-btn kx-primary' : 'kx-btn kx-ghost'}
                aria-pressed={l === langueAdmin}
                onClick={() => onLangueAdmin(l)}
              >
                {l === 'de' ? 'Deutsch' : 'Français'}
              </button>
            ))}
          </div>
          <div className="kx-list kx-oben">
            <button type="button" className="kx-li" onClick={abmelden}>
              ⎋ {t('app.abmelden')}
            </button>
          </div>
        </Feuille>
      )}

      {fenster === 'hilfe' && (
        <Feuille titre={t('mehr.anleitung')} onFermer={fermerFenster} fermer={fermer}>
          <ol className="kx-help">
            {([1, 2, 3, 4, 5, 6, 7] as const).map((n) => (
              <li key={n}>
                <b>{t(`hilfe.${n}_titel` as CleT)}</b> {t(`hilfe.${n}` as CleT)}
              </li>
            ))}
          </ol>
        </Feuille>
      )}

      {fenster === 'nachrichten' && (
        <Feuille titre={t('nav.nachrichten')} large onFermer={fermerFenster} fermer={fermer}>
          <Anfragen langueAdmin={langueAdmin} />
        </Feuille>
      )}

      {fenster === 'medias' && (
        <Feuille titre={t('nav.medias')} large onFermer={fermerFenster} fermer={fermer}>
          <Medias langueAdmin={langueAdmin} />
        </Feuille>
      )}

      {fenster === 'inhalte' && (
        <Feuille
          titre={inhalte.cle ? t(COLLECTIONS[inhalte.cle].cleNav as CleT) : t('nav.mehr')}
          large
          onFermer={fermerFenster}
          fermer={fermer}
        >
          {!inhalte.cle && (
            <>
              <p className="kx-p">{t('mehr.intro')}</p>
              <div className="kx-list">
                {ORDRE_NAV.filter((cle) => COLLECTIONS[cle] && (!COLLECTIONS[cle].reserveOwner || estOwner)).map(
                  (cle) => (
                    <button key={cle} type="button" className="kx-li" onClick={() => setInhalte({ cle })}>
                      <b>{t(COLLECTIONS[cle].cleNav as CleT)}</b>
                      <small className="kx-li-text">{t(`mehr.${cle}` as CleT)}</small>
                    </button>
                  ),
                )}
              </div>
            </>
          )}
          {inhalte.cle && !inhalte.id && (
            <>
              <button type="button" className="kx-btn kx-ghost kx-abstand" onClick={() => setInhalte({})}>
                ← {t('nav.mehr')}
              </button>
              <Liste
                collection={COLLECTIONS[inhalte.cle]}
                langueAdmin={langueAdmin}
                onOuvrir={(id) => setInhalte({ cle: inhalte.cle, id })}
              />
            </>
          )}
          {inhalte.cle && inhalte.id && (
            <Editeur
              collection={COLLECTIONS[inhalte.cle]}
              id={inhalte.id}
              langueAdmin={langueAdmin}
              estOwner={estOwner}
              onRetour={() => setInhalte({ cle: inhalte.cle })}
            />
          )}
        </Feuille>
      )}
    </>
  );
}

// =============================================================================
// Ein laengerer Text im Fenster: Absatz, Liste, Fussnote, Link …
// =============================================================================
function FenetreRiche({
  attente,
  ligne,
  langueAdmin,
  onApercu,
  onFermer,
}: {
  attente: Attente;
  ligne: Ligne | undefined;
  langueAdmin: LangueAdmin;
  onApercu: (texte: string) => void;
  onFermer: (texte: string | null) => void;
}) {
  const t = (c: CleT) => traduire(langueAdmin, c);
  const [texte, setTexte] = useState(attente.texte);
  const v = valeurDe(ligne, attente.cle, attente.lang);
  const reference = v.multi && attente.lang !== 'fr' && 'reference' in v ? v.reference : '';

  return (
    <Feuille titre={`${t('atelier.text_aendern')} · ${LANG_NOMS[attente.lang]}`} large onFermer={() => onFermer(null)} fermer={t('atelier.schliessen')}>
      <div className="kx-form">
        {attente.texte.trim() === '' && <p className="kx-hint">{t('atelier.fehlt_noch')}</p>}
        <EditeurTexte
          id="kx-riche"
          valeur={texte}
          onChange={(neu) => {
            setTexte(neu);
            onApercu(neu);
          }}
          langue={langueAdmin}
        />
        {reference && (
          <details className="kx-ref">
            <summary>{t('atelier.referenz_zeigen')}</summary>
            <p>{apercu(reference, 600)}</p>
          </details>
        )}
        <div className="kx-row">
          <button type="button" className="kx-btn kx-ghost" onClick={() => onFermer(null)}>
            {t('atelier.abbrechen')}
          </button>
          <button type="button" className="kx-btn kx-primary" onClick={() => onFermer(texte)}>
            {t('atelier.uebernehmen')}
          </button>
        </div>
      </div>
    </Feuille>
  );
}

// =============================================================================
// Google: Titel und Beschreibung dieser Seite, mit Vorschau wie bei Google
// =============================================================================
const LIMITES = { titre: [50, 60], description: [150, 160] } as const;

function FenetreGoogle({
  chemin,
  lang,
  langueAdmin,
  lignes,
  valeur,
  document: d,
  onAppliquer,
  onFermer,
}: {
  chemin: string;
  lang: Lang;
  langueAdmin: LangueAdmin;
  lignes: Map<string, Ligne>;
  valeur: (c: Cle, lang: Lang) => string;
  document: Document | null;
  onAppliquer: (c: Cle, texte: string) => void;
  onFermer: (applique: boolean) => void;
}) {
  const t = (c: CleT, v?: Record<string, string | number>) => traduire(langueAdmin, c, v);
  const [id, setId] = useState(() => idSeo(chemin, lang));
  const cTitre: Cle = { table: 'seo_meta', id: id ?? '', chemin: ['titre'] };
  const cDesc: Cle = { table: 'seo_meta', id: id ?? '', chemin: ['description'] };
  const [pret, setPret] = useState(!id || lignes.has(`seo_meta|${id}`));
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!id) return;
    void (async () => {
      if (!lignes.has(`seo_meta|${id}`)) {
        const { data } = await supabase.from('seo_meta').select('*').eq('id', id).maybeSingle();
        // Ohne Datensatz gibt es nichts zu bearbeiten: wie eine Unterseite.
        if (!data) return setId(null);
        lignes.set(`seo_meta|${id}`, data);
      }
      setTitre(valeur(cTitre, lang) || d?.title || '');
      setDescription(
        valeur(cDesc, lang) || d?.querySelector('meta[name="description"]')?.getAttribute('content') || '',
      );
      setPret(true);
    })();
    // Einmal beim Oeffnen.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const zaehler = (n: number, [min, max]: readonly [number, number], cle: CleT) =>
    `${t(cle, { n })} – ${n < min ? t('seo.zu_kurz') : n > max ? t('seo.zu_lang') : t('seo.gut')}`;

  function appliquer() {
    if (titre.trim() !== valeur(cTitre, lang)) onAppliquer(cTitre, titre.trim());
    if (description.trim() !== valeur(cDesc, lang)) onAppliquer(cDesc, description.trim());
    // In der Vorschau gleich sichtbar machen.
    if (d) {
      d.title = titre.trim();
      d.querySelector('meta[name="description"]')?.setAttribute('content', description.trim());
    }
    onFermer(true);
  }

  return (
    <Feuille
      titre={t('google.titel', { l: lang.toUpperCase() })}
      large
      onFermer={() => onFermer(false)}
      fermer={t('atelier.schliessen')}
    >
      {!id ? (
        <p className="kx-p">{t('google.automatisch')}</p>
      ) : !pret ? (
        <p className="kx-hint">{t('app.laden')}</p>
      ) : (
        <div className="kx-form">
          <p className="kx-hint">{t('google.hinweis')}</p>
          <div className="kx-serp" aria-hidden="true">
            <div className="kx-serp-url">{`www.lw-legis.lu${chemin}`}</div>
            <div className="kx-serp-t">{titre}</div>
            <div className="kx-serp-d">{description}</div>
          </div>
          <label>
            <span>
              {t('google.titel_feld')}{' '}
              <small>{zaehler(titre.length, LIMITES.titre, 'seo.titel_zaehler')}</small>
            </span>
            <input value={titre} onChange={(e) => setTitre(e.target.value)} />
          </label>
          <label>
            <span>
              {t('google.beschreibung_feld')}{' '}
              <small>{zaehler(description.length, LIMITES.description, 'seo.beschreibung_zaehler')}</small>
            </span>
            <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
          </label>
          <button type="button" className="kx-btn kx-primary kx-block" onClick={appliquer}>
            {t('atelier.uebernehmen')}
          </button>
        </div>
      )}
    </Feuille>
  );
}
