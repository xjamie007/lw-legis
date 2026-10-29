/**
 * src/admin/composants/Editeur.tsx — Formular fuer einen Datensatz.
 *
 * Entsteht aus der Beschreibung in schema.ts. Enthaelt:
 *   - die Sprachumschaltung mit Zaehler offener Stellen je Sprache
 *   - automatisches Zwischenspeichern von Entwuerfen
 *   - die Anzeige, was einer Veroeffentlichung noch entgegensteht
 *   - den Zugang zu frueheren Fassungen
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { supabase } from '../supabase';
import { traduire, type LangueAdmin } from '../i18n';
import type { Collection } from '../schema';
import ChampMulti, {
  LANGUES_CONTENU,
  NOMS_LANGUE,
  estVide,
  type LangueContenu,
} from './ChampMulti';
import Revisions from './Revisions';

type Enregistrement = Record<string, any>;

interface Props {
  collection: Collection;
  id: string;
  langueAdmin: LangueAdmin;
  estOwner: boolean;
  onRetour: () => void;
}

const LIMITES = {
  seo_titre: { min: 50, max: 60 },
  seo_description: { min: 150, max: 160 },
};

function compterMots(...valeurs: (string | undefined)[]): number {
  return valeurs
    .filter((v): v is string => typeof v === 'string')
    .join(' ')
    .replace(/<[^>]*>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
}

export default function Editeur({
  collection,
  id,
  langueAdmin,
  estOwner,
  onRetour,
}: Props) {
  const t = (c: Parameters<typeof traduire>[1], v?: Record<string, string | number>) =>
    traduire(langueAdmin, c, v);

  const [donnees, setDonnees] = useState<Enregistrement | null>(null);
  const [langueContenu, setLangueContenu] = useState<LangueContenu>('fr');
  const [etat, setEtat] = useState<'charge' | 'pret' | 'sale' | 'enregistre' | 'erreur'>('charge');
  const [messageErreur, setMessageErreur] = useState<string | null>(null);
  const [montrerFassungen, setMontrerFassungen] = useState(false);
  const minuterie = useRef<number | null>(null);

  const lectureSeule = Boolean(collection.reserveOwner && !estOwner);

  // --- Laden ---------------------------------------------------------------
  useEffect(() => {
    let vivant = true;
    (async () => {
      const { data, error } = await supabase
        .from(collection.table)
        .select('*')
        .eq('id', id)
        .single();
      if (!vivant) return;
      if (error) {
        setMessageErreur(error.message);
        setEtat('erreur');
        return;
      }
      setDonnees(data);
      setEtat('pret');
    })();
    return () => {
      vivant = false;
    };
  }, [collection.table, id]);

  // --- Speichern -----------------------------------------------------------
  const enregistrer = useCallback(
    async (valeurs: Enregistrement) => {
      const { id: _ignore, updated_at, updated_by, ...aEcrire } = valeurs;
      const { error } = await supabase.from(collection.table).update(aEcrire).eq('id', id);
      if (error) {
        setMessageErreur(error.message);
        setEtat('erreur');
        return;
      }
      setMessageErreur(null);
      setEtat('enregistre');
    },
    [collection.table, id],
  );

  /** Automatisches Zwischenspeichern, zwei Sekunden nach der letzten Eingabe. */
  const modifier = useCallback(
    (champ: string, valeur: unknown) => {
      setDonnees((d) => {
        if (!d) return d;
        const suivant = { ...d, [champ]: valeur };
        setEtat('sale');
        if (minuterie.current) window.clearTimeout(minuterie.current);
        minuterie.current = window.setTimeout(() => void enregistrer(suivant), 2000);
        return suivant;
      });
    },
    [enregistrer],
  );

  // Vor dem Schliessen warnen, wenn noch etwas aussteht.
  useEffect(() => {
    const garde = (e: BeforeUnloadEvent) => {
      if (etat === 'sale') e.preventDefault();
    };
    window.addEventListener('beforeunload', garde);
    return () => window.removeEventListener('beforeunload', garde);
  }, [etat]);

  // --- Offene Stellen je Sprache ------------------------------------------
  const ouvertesParLangue = useMemo(() => {
    const out: Record<LangueContenu, number> = { fr: 0, de: 0, en: 0, lb: 0 };
    if (!donnees) return out;
    const champsMulti = collection.champs.filter((c) =>
      ['texte', 'texte_long', 'seo_titre', 'seo_description'].includes(c.type),
    );
    const champsListe = collection.champs.filter((c) => c.type === 'liste_texte');

    for (const l of LANGUES_CONTENU) {
      let n = champsMulti.filter((c) => estVide(donnees[c.nom]?.[l])).length;
      /**
       * Listenfelder sind KEINE `{fr,de,en,lb}`-Objekte, sondern Felder
       * solcher Objekte. Wer sie wie ein einfaches Feld abfragt, bekommt
       * immer `undefined` und zählt sie dauerhaft als offen — genau das
       * meldete der Zähler vorher für jede Sprache eine Stelle zu viel.
       */
      for (const c of champsListe) {
        const liste = donnees[c.nom];
        if (!Array.isArray(liste) || liste.length === 0) n += 1;
        else if (liste.some((x: Record<string, string>) => estVide(x?.[l]))) n += 1;
      }
      out[l] = n;
    }
    return out;
  }, [donnees, collection.champs]);

  // --- Was steht einer Veroeffentlichung entgegen? ------------------------
  const obstacles = useMemo(() => {
    if (!donnees) return [];
    const liste: string[] = [];
    for (const nom of collection.requisParLangue ?? []) {
      const champ = collection.champs.find((c) => c.nom === nom);
      if (estVide(donnees[nom]?.[langueContenu])) {
        liste.push(`${champ?.etiquette[langueAdmin] ?? nom} (${NOMS_LANGUE[langueContenu]})`);
      }
    }
    // Harte Zusatzbedingungen, dieselben wie in Datenbank und Build.
    if (collection.table === 'publications' && !donnees.etat_du_droit) {
      liste.push(t('publications.rechtsstand'));
    }
    if (collection.seuilMots) {
      const mots = compterMots(
        ...(collection.requisParLangue ?? [])
          .filter((n) => n !== 'titre')
          .map((n) => donnees[n]?.[langueContenu]),
      );
      if (mots < collection.seuilMots) liste.push(t('situations.woerter', { n: mots }));
    }
    return liste;
  }, [donnees, collection, langueContenu, langueAdmin]);

  if (etat === 'charge') return <p className="charge">{t('app.laden')}</p>;
  if (!donnees) {
    return (
      <div>
        <p role="alert" className="alerte">
          {messageErreur ?? t('app.fehler')}
        </p>
        <button className="bouton-fin" onClick={onRetour}>
          {t('editeur.zurueck')}
        </button>
      </div>
    );
  }

  return (
    <div className="editeur">
      <div className="editeur__barre">
        <button className="bouton-fin" onClick={onRetour} type="button">
          ← {t('editeur.zurueck')}
        </button>

        <span className="editeur__etat" role="status">
          {etat === 'sale' && t('editeur.ungesichert')}
          {etat === 'enregistre' && t('editeur.gespeichert')}
          {etat === 'erreur' && (messageErreur ?? t('app.fehler'))}
        </span>

        <button
          className="bouton"
          type="button"
          onClick={() => void enregistrer(donnees)}
          disabled={lectureSeule}
        >
          {t('editeur.speichern')}
        </button>
      </div>

      {/* --- Sprachumschaltung mit Zaehler ------------------------------- */}
      <div className="langues" role="tablist" aria-label={t('champ.bearbeitet')}>
        {LANGUES_CONTENU.map((l) => (
          <button
            key={l}
            role="tab"
            type="button"
            aria-selected={l === langueContenu}
            className={l === langueContenu ? 'langues__onglet langues__onglet--actif' : 'langues__onglet'}
            onClick={() => setLangueContenu(l)}
          >
            {NOMS_LANGUE[l]}
            <span className="langues__compte">
              {ouvertesParLangue[l] === 0
                ? t('champ.alles_da')
                : t('champ.offen_zaehler', { n: ouvertesParLangue[l] })}
            </span>
          </button>
        ))}
      </div>

      {obstacles.length > 0 && (
        <div className="obstacles">
          <p className="obstacles__titre">{t('editeur.veroeffentlichen_sperre')}</p>
          <ul>
            {obstacles.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </div>
      )}

      {/* --- Die Felder --------------------------------------------------- */}
      <fieldset className="editeur__champs" disabled={lectureSeule}>
        {collection.champs.map((champ) => {
          const idc = `c-${champ.nom}`;
          switch (champ.type) {
            case 'texte':
            case 'texte_long':
              return (
                <ChampMulti
                  key={champ.nom}
                  champ={champ}
                  valeur={donnees[champ.nom]}
                  langueContenu={langueContenu}
                  langueAdmin={langueAdmin}
                  onChange={(v) => modifier(champ.nom, v)}
                />
              );

            case 'seo_titre':
            case 'seo_description': {
              const limite = LIMITES[champ.type];
              const valeur = donnees[champ.nom]?.[langueContenu] ?? '';
              const n = valeur.length;
              const verdict =
                n < limite.min ? t('seo.zu_kurz') : n > limite.max ? t('seo.zu_lang') : t('seo.gut');
              return (
                <div key={champ.nom} className="champ-multi">
                  <label className="champ-multi__label" htmlFor={idc}>
                    {champ.etiquette[langueAdmin]} — {NOMS_LANGUE[langueContenu]}
                  </label>
                  <input
                    id={idc}
                    className="saisie"
                    type="text"
                    value={valeur}
                    onChange={(e) =>
                      modifier(champ.nom, {
                        ...(donnees[champ.nom] ?? {}),
                        [langueContenu]: e.target.value,
                      })
                    }
                  />
                  <p
                    className={
                      n >= limite.min && n <= limite.max
                        ? 'compteur compteur--bon'
                        : 'compteur compteur--hors'
                    }
                  >
                    {champ.type === 'seo_titre'
                      ? t('seo.titel_zaehler', { n })
                      : t('seo.beschreibung_zaehler', { n })}{' '}
                    — {verdict}
                  </p>
                </div>
              );
            }

            case 'texte_simple':
              return (
                <div key={champ.nom} className="champ-multi">
                  <label className="champ-multi__label" htmlFor={idc}>
                    {champ.etiquette[langueAdmin]}
                  </label>
                  <input
                    id={idc}
                    className="saisie"
                    type="text"
                    value={donnees[champ.nom] ?? ''}
                    onChange={(e) => modifier(champ.nom, e.target.value)}
                  />
                </div>
              );

            case 'nombre':
              return (
                <div key={champ.nom} className="champ-multi">
                  <label className="champ-multi__label" htmlFor={idc}>
                    {champ.etiquette[langueAdmin]}
                  </label>
                  <input
                    id={idc}
                    className="saisie saisie--courte"
                    type="number"
                    value={donnees[champ.nom] ?? ''}
                    onChange={(e) =>
                      modifier(champ.nom, e.target.value === '' ? null : Number(e.target.value))
                    }
                  />
                </div>
              );

            case 'date':
              return (
                <div key={champ.nom} className="champ-multi">
                  <label className="champ-multi__label" htmlFor={idc}>
                    {champ.etiquette[langueAdmin]}
                    {champ.requis && <span className="champ-multi__requis"> *</span>}
                  </label>
                  {champ.aide && <p className="champ-multi__aide">{champ.aide[langueAdmin]}</p>}
                  <input
                    id={idc}
                    className="saisie saisie--courte"
                    type="date"
                    value={donnees[champ.nom] ?? ''}
                    onChange={(e) => modifier(champ.nom, e.target.value || null)}
                  />
                </div>
              );

            case 'liste_texte': {
              /**
               * Eine Zeile je Eintrag. Für die Rechtsgebiete eines
               * Tätigkeitsfelds reicht das und ist schneller zu bedienen
               * als einzelne Felder mit Plus- und Minusknöpfen.
               *
               * Vorher gab es hier gar nichts: Das Feld fiel in den
               * `default`-Zweig und war schlicht nicht bearbeitbar.
               */
              const liste: Record<string, string>[] = Array.isArray(donnees[champ.nom])
                ? donnees[champ.nom]
                : [];
              const zeilen = liste.map((x) => x?.[langueContenu] ?? '').join('\n');
              return (
                <div key={champ.nom} className="champ-multi">
                  <label className="champ-multi__label" htmlFor={idc}>
                    {champ.etiquette[langueAdmin]} — {NOMS_LANGUE[langueContenu]}
                  </label>
                  <p className="champ-multi__aide">
                    {langueAdmin === 'de'
                      ? 'Ein Eintrag je Zeile.'
                      : 'Une entrée par ligne.'}
                  </p>
                  <textarea
                    id={idc}
                    className="saisie"
                    rows={Math.max(4, liste.length + 1)}
                    value={zeilen}
                    onChange={(ev) => {
                      const neueZeilen = ev.target.value.split('\n');
                      const laenge = Math.max(liste.length, neueZeilen.length);
                      const suivant: Record<string, string>[] = [];
                      for (let i = 0; i < laenge; i += 1) {
                        const vorher = liste[i] ?? {};
                        const wert = neueZeilen[i] ?? '';
                        // Eine leere Zeile am Ende löscht den Eintrag nicht
                        // in den anderen Sprachen — sie leert nur diese.
                        suivant.push({ ...vorher, [langueContenu]: wert });
                      }
                      modifier(
                        champ.nom,
                        suivant.filter((x) =>
                          Object.values(x).some((v) => typeof v === 'string' && v.trim() !== ''),
                        ),
                      );
                    }}
                  />
                </div>
              );
            }

            case 'bascule':
              return (
                <div key={champ.nom} className="champ-bascule">
                  <input
                    id={idc}
                    type="checkbox"
                    checked={Boolean(donnees[champ.nom])}
                    onChange={(e) => modifier(champ.nom, e.target.checked)}
                  />
                  <label htmlFor={idc}>{champ.etiquette[langueAdmin]}</label>
                </div>
              );

            case 'choix':
              return (
                <div key={champ.nom} className="champ-multi">
                  <label className="champ-multi__label" htmlFor={idc}>
                    {champ.etiquette[langueAdmin]}
                  </label>
                  <select
                    id={idc}
                    className="saisie saisie--courte"
                    value={donnees[champ.nom] ?? ''}
                    onChange={(e) => modifier(champ.nom, e.target.value)}
                  >
                    {champ.options?.map((o) => (
                      <option key={o.valeur} value={o.valeur}>
                        {o.etiquette[langueAdmin]}
                      </option>
                    ))}
                  </select>
                </div>
              );

            default:
              return null;
          }
        })}
      </fieldset>

      {/* --- Frühere Fassungen -------------------------------------------- */}
      <div className="editeur__pied">
        <button
          type="button"
          className="bouton-fin"
          aria-expanded={montrerFassungen}
          onClick={() => setMontrerFassungen((v) => !v)}
        >
          {t('editeur.fassungen')}
        </button>
        {montrerFassungen && (
          <Revisions
            table={collection.table}
            enregistrementId={id}
            langueAdmin={langueAdmin}
            onRestaure={() => window.location.reload()}
          />
        )}
      </div>
    </div>
  );
}
