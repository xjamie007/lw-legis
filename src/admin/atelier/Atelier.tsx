/**
 * src/admin/atelier/Atelier.tsx — Die Website bearbeiten, so wie sie aussieht.
 *
 * Links steht die echte Website in einer Vorschau, rechts ein schmaler
 * Bereich mit dem, was gerade zu tun ist:
 *
 *   nichts angeklickt  -> Anleitung in drei Schritten, „Ihre Änderungen“,
 *                         Veroeffentlichen
 *   Text angeklickt    -> das Eingabefeld fuer genau diesen Text
 *
 * Die Vorschau ist die statisch gebaute Seite (dieselbe Adresse, derselbe
 * Server). Beim Laden legt diese Datei die gespeicherten Texte aus der
 * Datenbank darueber — so sieht man seine Aenderungen, bevor sie
 * veroeffentlicht sind. Was anders ist als online, wird gelb hinterlegt.
 *
 * Welcher Text zu welchem Datensatz gehoert, steht im HTML als
 * `data-lw` (src/lib/edition.ts, src/admin/atelier/chemins.ts).
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { estLocal, supabase } from '../supabase';
import { traduire, type LangueAdmin } from '../i18n';
import { LANG_NOMS, type Lang } from '../../lib/langs';
import Publier from '../composants/Publier';
import PanneauTexte, { type Selection } from './PanneauTexte';
import ListeModifications from './ListeModifications';
import {
  adresseDe,
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

type Ligne = Record<string, any>;

interface Props {
  langueAdmin: LangueAdmin;
  estOwner: boolean;
  /** Zeitpunkt, aus dem die Website zuletzt gebaut wurde. */
  stand: string;
  /** Die Sprachen, in denen die Website gebaut wird. */
  langues: Lang[];
}

const CLE_STOCKAGE = 'lw-atelier-chemin';

/** Die Markierungen in der Vorschau. Liegen IN der Vorschau, nicht hier. */
const STYLE_VORSCHAU = `
  [data-lw] { cursor: pointer; border-radius: 2px; }
  [data-lw]:hover, [data-lw]:focus-visible {
    outline: 3px dashed #a07c3c; outline-offset: 3px;
  }
  .lw-geaendert {
    background-color: rgba(255, 208, 90, 0.5) !important;
    box-shadow: 0 0 0 3px rgba(255, 208, 90, 0.5);
  }
  .lw-choisi, .lw-choisi:hover {
    outline: 4px solid #2f5d50 !important; outline-offset: 3px;
  }
  @keyframes lw-blinken { 0%, 100% { outline-color: transparent; } 50% { outline-color: #2f5d50; } }
  .lw-blinken { outline: 4px solid #2f5d50; outline-offset: 3px; animation: lw-blinken 0.7s ease 3; }
  #lw-schild {
    position: fixed; z-index: 2147483000; pointer-events: none;
    background: #151e1a; color: #fcfcfa; border-radius: 3px;
    font: 600 15px/1.2 system-ui, sans-serif; padding: 6px 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,.25); display: none; white-space: nowrap;
  }
  astro-dev-toolbar { display: none !important; }
`;

const norm = (s: string) => s.replace(/\s+/g, ' ').trim();

export default function Atelier({ langueAdmin, estOwner, stand, langues }: Props) {
  const t = (c: Parameters<typeof traduire>[1], v?: Record<string, string | number>) =>
    traduire(langueAdmin, c, v);

  const langueDepart: Lang = langues.includes(langueAdmin as Lang)
    ? (langueAdmin as Lang)
    : (langues[0] ?? 'fr');

  const cadre = useRef<HTMLIFrameElement>(null);
  const [src] = useState(() => {
    try {
      const gemerkt = window.sessionStorage.getItem(CLE_STOCKAGE);
      if (gemerkt?.startsWith('/')) return gemerkt;
    } catch {
      /* ohne Speicher eben die Startseite */
    }
    return `/${langueDepart}/`;
  });

  const [ici, setIci] = useState<{ chemin: string; lang: Lang; nom: string } | null>(null);
  const [selection, setSelection] = useState<Selection | null>(null);
  const [sale, setSale] = useState(false);
  const [modifs, setModifs] = useState<Modification[] | null>(null);
  const [bandeau, setBandeau] = useState<string | null>(null);

  /** Zeilen aus der Datenbank, nach `tabelle|schluessel`. */
  const lignes = useRef(new Map<string, Ligne>());
  /** Was die gebaute Seite an dieser Stelle zeigt — also der Stand online. */
  const originaux = useRef(new WeakMap<Element, string>());
  /** Nach dem naechsten Laden zu dieser Stelle springen. */
  const aMontrer = useRef<string | null>(null);
  /** Die aktuelle Auswahl, fuer die Ereignisse in der Vorschau. */
  const selectionRef = useRef<Selection | null>(null);
  const saleRef = useRef(false);
  selectionRef.current = selection;
  saleRef.current = sale;

  const doc = () => cadre.current?.contentDocument ?? null;
  const cleLigne = (c: Cle) => `${c.table}|${c.id}`;

  const elementsDe = (cle: string) =>
    Array.from(doc()?.querySelectorAll('[data-lw]') ?? []).filter(
      (el) => el.getAttribute('data-lw') === cle,
    );

  // --- Einen Text in der Vorschau anzeigen --------------------------------
  const rendre = useCallback((el: Element, texte: string) => {
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
  }, []);

  const rendreCle = useCallback(
    (c: Cle, lang: Lang) => {
      const ligne = lignes.current.get(cleLigne(c));
      if (!ligne) return;
      const { texte } = valeurDe(ligne, c, lang);
      for (const el of elementsDe(texteCle(c))) rendre(el, texte);
    },
    [rendre],
  );

  // --- Zeilen holen -------------------------------------------------------
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

  useEffect(() => {
    void rafraichirModifs();
  }, [rafraichirModifs]);

  // --- Einen Text auswaehlen ----------------------------------------------
  function marquerChoisi(el: Element | null) {
    doc()
      ?.querySelectorAll('.lw-choisi')
      .forEach((x) => x.classList.remove('lw-choisi'));
    el?.classList.add('lw-choisi');
  }

  /** Nicht gespeicherte Eingaben in der Vorschau wieder zuruecknehmen. */
  function verwerfen() {
    const s = selectionRef.current;
    if (s) rendreCle(s.cle, s.lang);
  }

  function fermer() {
    verwerfen();
    marquerChoisi(null);
    setSelection(null);
    setSale(false);
  }

  function choisir(el: Element) {
    const attr = el.getAttribute('data-lw');
    if (!attr) return;
    const courante = selectionRef.current;
    if (courante && texteCle(courante.cle) === attr) return;
    if (saleRef.current && !window.confirm(t('atelier.verwerfen_sicher'))) return;
    verwerfen();

    const d = el.ownerDocument;
    const lien = el.closest('a[href]')?.getAttribute('href') ?? null;
    marquerChoisi(el);
    setBandeau(null);
    setSale(false);
    setSelection({
      cle: lireCle(attr),
      lang: (d.documentElement.lang || langueDepart) as Lang,
      html: el.hasAttribute('data-lw-html'),
      lien: lien && lien.startsWith('/') ? lien : null,
    });
  }

  // --- Die Vorschau vorbereiten, sobald eine Seite geladen ist ------------
  async function preparer() {
    const d = doc();
    const fenetre = cadre.current?.contentWindow;
    if (!d || !fenetre) return;

    const chemin = fenetre.location.pathname;
    try {
      window.sessionStorage.setItem(CLE_STOCKAGE, chemin);
    } catch {
      /* egal */
    }
    const lang = (d.documentElement.lang || langueDepart) as Lang;
    setIci({ chemin, lang, nom: nomDeLaPage(chemin, d.querySelector('h1')?.textContent ?? '', langueAdmin) });

    // Eine Auswahl gehoert zur Seite, auf der sie getroffen wurde.
    setSelection(null);
    setSale(false);

    const style = d.createElement('style');
    style.textContent = STYLE_VORSCHAU;
    d.head.appendChild(style);

    const schild = d.createElement('div');
    schild.id = 'lw-schild';
    schild.textContent = `✎ ${t('atelier.klicken_zum_aendern')}`;
    d.body.appendChild(schild);

    const elements = Array.from(d.querySelectorAll('[data-lw]'));
    for (const el of elements) {
      originaux.current.set(el, el.hasAttribute('data-lw-html') ? el.innerHTML : (el.textContent ?? ''));
      // Auch mit der Tastatur erreichbar.
      el.setAttribute('tabindex', '0');
    }

    // --- Ereignisse ---------------------------------------------------------
    d.addEventListener(
      'click',
      (e) => {
        const cible = e.target as Element | null;
        const el = cible?.closest?.('[data-lw]');
        if (el) {
          // In einer aufklappbaren Frage darf das Aufklappen weiter
          // funktionieren — sonst kaeme man nie an die Antwort.
          if (!el.closest('summary')) e.preventDefault();
          e.stopPropagation();
          choisir(el);
          return;
        }
        const a = cible?.closest?.('a[href]') as HTMLAnchorElement | null;
        if (a) {
          const intern = a.origin === fenetre.location.origin && !a.target;
          if (!intern) {
            e.preventDefault();
            setBandeau(t('atelier.extern_blockiert'));
          }
        }
      },
      true,
    );
    d.addEventListener(
      'keydown',
      (e) => {
        const el = (e.target as Element | null)?.closest?.('[data-lw]');
        if (el && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          choisir(el);
        }
      },
      true,
    );
    // Aus der Vorschau wird nichts abgeschickt — kein Formular erreicht
    // die Kanzlei, nur weil jemand beim Bearbeiten auf „Senden“ drueckt.
    d.addEventListener(
      'submit',
      (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        setBandeau(t('atelier.formular_blockiert'));
      },
      true,
    );
    d.addEventListener('mouseover', (e) => {
      const el = (e.target as Element | null)?.closest?.('[data-lw]');
      if (!el) {
        schild.style.display = 'none';
        return;
      }
      const r = el.getBoundingClientRect();
      schild.style.display = 'block';
      schild.style.left = `${Math.max(4, r.left)}px`;
      schild.style.top = `${r.top > 40 ? r.top - 36 : r.bottom + 8}px`;
    });
    d.addEventListener('scroll', () => (schild.style.display = 'none'), { passive: true });

    // --- Gespeicherte Texte darueberlegen ----------------------------------
    const cles = elements.map((el) => lireCle(el.getAttribute('data-lw')!));
    await chargerLignes(cles);
    if (doc() !== d) return; // inzwischen weitergeblaettert
    for (const el of elements) {
      const c = lireCle(el.getAttribute('data-lw')!);
      const ligne = lignes.current.get(cleLigne(c));
      if (ligne) rendre(el, valeurDe(ligne, c, lang).texte);
    }

    if (aMontrer.current) {
      const cible = elementsDe(aMontrer.current)[0];
      aMontrer.current = null;
      if (cible) {
        cible.scrollIntoView({ block: 'center', behavior: 'smooth' });
        cible.classList.add('lw-blinken');
        window.setTimeout(() => cible.classList.remove('lw-blinken'), 2400);
      }
    }
  }

  // --- Navigation ---------------------------------------------------------
  function aller(chemin: string) {
    if (saleRef.current && !window.confirm(t('atelier.verwerfen_sicher'))) return;
    const f = cadre.current?.contentWindow;
    if (!f) return;
    if (f.location.pathname === chemin && aMontrer.current) {
      // Schon da: nur hinspringen.
      void preparerSprung();
      return;
    }
    f.location.assign(chemin);
  }

  async function preparerSprung() {
    const cle = aMontrer.current;
    aMontrer.current = null;
    const cible = cle ? elementsDe(cle)[0] : null;
    if (cible) {
      cible.scrollIntoView({ block: 'center', behavior: 'smooth' });
      cible.classList.add('lw-blinken');
      window.setTimeout(() => cible.classList.remove('lw-blinken'), 2400);
    }
  }

  function changerLangue(l: Lang) {
    const d = doc();
    const alt = d?.querySelector(`link[rel="alternate"][hreflang="${l}"]`)?.getAttribute('href');
    if (!alt) return aller(`/${l}/`);
    try {
      aller(new URL(alt, window.location.href).pathname);
    } catch {
      aller(`/${l}/`);
    }
  }

  // --- Speichern ----------------------------------------------------------
  async function enregistrer(texte: string): Promise<string | null> {
    const s = selectionRef.current;
    if (!s) return null;
    const { table, id } = s.cle;
    const col = colonneCle(table);

    // Frisch lesen: Seit dem Oeffnen koennte jemand anderes an derselben
    // Zeile gearbeitet haben, und die Seitentexte liegen alle in einer.
    const { data: frais, error: erreurLecture } = await supabase
      .from(table)
      .select('*')
      .eq(col, id)
      .single();
    if (erreurLecture || !frais) return erreurLecture?.message ?? t('app.fehler');

    const { chemin } = valeurDe(frais, s.cle, s.lang);
    const suivant = poser(frais, chemin, texte);
    const colonne = s.cle.chemin[0];
    const { data: ecrit, error } = await supabase
      .from(table)
      .update({ [colonne]: lire(suivant, [colonne]) })
      .eq(col, id)
      .select();
    if (error) return error.message;
    // Ohne Recht verweigert die Datenbank nicht laut, sie aendert still
    // null Zeilen. Das muss hier auffallen.
    if (!ecrit || ecrit.length === 0) return t('atelier.keine_berechtigung');

    lignes.current.set(cleLigne(s.cle), ecrit[0]);
    rendreCle(s.cle, s.lang);
    marquerChoisi(null);
    setSelection(null);
    setSale(false);
    setBandeau(t('atelier.gespeichert_hinweis'));
    void rafraichirModifs();
    return null;
  }

  function lectureSeule(s: Selection): string | null {
    const ligne = lignes.current.get(cleLigne(s.cle));
    if (estOwner) return null;
    if (s.cle.table === 'legal_pages') return t('atelier.nur_inhaber');
    if (s.cle.table === 'settings' && ligne?.reserve_owner) return t('atelier.nur_inhaber');
    return null;
  }

  // --- Aenderungen ansehen und zuruecknehmen -------------------------------
  function montrer(m: Modification) {
    const derniere = m.chemin[m.chemin.length - 1];
    const langueModif = langues.find((l) => l === derniere);
    const lang = langueModif ?? ici?.lang ?? langueDepart;
    const cheminCle = langueModif ? m.chemin.slice(0, -1) : m.chemin;
    aMontrer.current = texteCle({ table: m.table, id: m.id, chemin: cheminCle });
    aller(adresseDe(m.table, m.id, cheminCle, m.ligne, lang));
  }

  async function annuler(m: Modification) {
    const probleme = await annulerModification(m);
    if (probleme) {
      window.alert(`${t('atelier.speichern_fehler')} ${probleme}`);
      return;
    }
    // Die Vorschau neu aufbauen, damit der alte Text wieder dasteht.
    cadre.current?.contentWindow?.location.reload();
    await rafraichirModifs();
    setBandeau(t('atelier.zurueckgenommen'));
  }

  // -------------------------------------------------------------------------
  const pages = pagesPrincipales(ici?.lang ?? langueDepart, langueAdmin);
  const surUnePagePrincipale = pages.some((p) => p.chemin === ici?.chemin);
  const nombre = modifs?.length ?? 0;

  return (
    <div className="atelier">
      <section className="apercu" aria-label={t('atelier.vorschau')}>
        <div className="apercu__barre">
          <label className="apercu__ici">
            <span className="apercu__etiquette">{t('atelier.sie_sind_hier')}</span>
            <select
              className="saisie apercu__choix"
              value={surUnePagePrincipale ? ici?.chemin : ''}
              onChange={(e) => e.target.value && aller(e.target.value)}
            >
              {!surUnePagePrincipale && <option value="">{ici?.nom ?? t('app.laden')}</option>}
              {pages.map((p) => (
                <option key={p.chemin} value={p.chemin}>
                  {p.nom}
                </option>
              ))}
            </select>
          </label>

          {langues.length > 1 && (
            <div className="apercu__langues" role="group" aria-label={t('atelier.sprache_website')}>
              {langues.map((l) => (
                <button
                  key={l}
                  type="button"
                  className={ici?.lang === l ? 'langue-bouton langue-bouton--actif' : 'langue-bouton'}
                  aria-pressed={ici?.lang === l}
                  onClick={() => changerLangue(l)}
                >
                  {LANG_NOMS[l]}
                </button>
              ))}
            </div>
          )}

          <div className="apercu__outils">
            <button
              type="button"
              className="bouton-fin"
              onClick={() => cadre.current?.contentWindow?.history.back()}
            >
              ← {t('atelier.zurueck')}
            </button>
            <button
              type="button"
              className="bouton-fin"
              onClick={() => cadre.current?.contentWindow?.location.reload()}
            >
              ↻ {t('atelier.neu_laden')}
            </button>
          </div>
        </div>

        <p className="apercu__legende">
          <span className="apercu__pastille" aria-hidden="true" /> {t('atelier.legende')}
        </p>

        <iframe
          ref={cadre}
          className="apercu__cadre"
          src={src}
          title={t('atelier.vorschau')}
          onLoad={() => void preparer()}
        />
      </section>

      <aside className="panneau" aria-live="polite">
        {selection ? (
          <PanneauTexte
            key={`${texteCle(selection.cle)}|${selection.lang}`}
            selection={selection}
            ligne={lignes.current.get(cleLigne(selection.cle))}
            langueAdmin={langueAdmin}
            lectureSeule={lectureSeule(selection)}
            onApercu={(texte) => {
              for (const el of elementsDe(texteCle(selection.cle))) rendre(el, texte);
            }}
            onEnregistrer={enregistrer}
            onFermer={fermer}
            onSuivreLien={() => {
              const lien = selection.lien;
              fermer();
              if (lien) aller(lien);
            }}
            onSale={setSale}
          />
        ) : (
          <>
            {bandeau && (
              <p className="bandeau" role="status">
                {bandeau}
              </p>
            )}

            <h2 className="panneau__titre">{t('atelier.so_gehts')}</h2>
            <ol className="schritte">
              <li>
                <strong>{t('atelier.schritt1_titel')}</strong> {t('atelier.schritt1')}
              </li>
              <li>
                <strong>{t('atelier.schritt2_titel')}</strong> {t('atelier.schritt2')}
              </li>
              <li>
                <strong>{t('atelier.schritt3_titel')}</strong> {t('atelier.schritt3')}
              </li>
            </ol>

            <section className="panneau__bloc" aria-labelledby="titre-modifs">
              <h2 className="panneau__titre" id="titre-modifs">
                {t('atelier.ihre_aenderungen')}
                {nombre > 0 && <span className="compteur-rond">{nombre}</span>}
              </h2>
              {modifs === null ? (
                <p className="charge">{t('app.laden')}</p>
              ) : nombre === 0 ? (
                <p className="vide">{t('atelier.keine_aenderungen')}</p>
              ) : (
                <>
                  <p className="panneau__aide">{t('atelier.noch_nicht_online', { n: nombre })}</p>
                  <Publier langue={langueAdmin} nombre={nombre} local={estLocal} />
                  <ListeModifications
                    modifications={modifs}
                    langueAdmin={langueAdmin}
                    onMontrer={montrer}
                    onAnnuler={annuler}
                  />
                </>
              )}
            </section>

            <p className="panneau__fest">{t('atelier.nicht_alles')}</p>
          </>
        )}
      </aside>
    </div>
  );
}
