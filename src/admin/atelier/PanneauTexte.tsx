/**
 * src/admin/atelier/PanneauTexte.tsx — Das Eingabefeld zum angeklickten Text.
 *
 * Erscheint rechts neben der Vorschau, sobald man dort auf einen Text
 * klickt. Jede Eingabe steht sofort links in der Vorschau; gespeichert
 * wird erst mit „Speichern“. Das ist Absicht: Wer ausprobiert, soll nicht
 * nebenbei die Datenbank veraendern, und „Abbrechen“ soll wirklich alles
 * zuruecknehmen.
 */
import { useEffect, useRef, useState } from 'react';
import { traduire, type LangueAdmin } from '../i18n';
import { LANG_NOMS, type Lang } from '../../lib/langs';
import EditeurTexte from '../composants/EditeurTexte';
import { apercu, lieu, nomChamp, valeurDe, type Cle } from './chemins';

export interface Selection {
  cle: Cle;
  lang: Lang;
  html: boolean;
  /** Ziel des Links, in dem der Text steht — sonst null. */
  lien: string | null;
}

interface Props {
  selection: Selection;
  ligne: Record<string, any> | undefined;
  langueAdmin: LangueAdmin;
  /** Grund, warum nicht bearbeitet werden darf — oder null. */
  lectureSeule: string | null;
  onApercu: (texte: string) => void;
  onEnregistrer: (texte: string) => Promise<string | null>;
  onFermer: () => void;
  onSuivreLien: () => void;
  onSale: (sale: boolean) => void;
}

export default function PanneauTexte({
  selection,
  ligne,
  langueAdmin,
  lectureSeule,
  onApercu,
  onEnregistrer,
  onFermer,
  onSuivreLien,
  onSale,
}: Props) {
  const t = (c: Parameters<typeof traduire>[1], v?: Record<string, string | number>) =>
    traduire(langueAdmin, c, v);

  const valeur = valeurDe(ligne, selection.cle, selection.lang);
  const [texte, setTexte] = useState(valeur.texte);
  const [occupe, setOccupe] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const champ = useRef<HTMLTextAreaElement>(null);

  const sale = texte !== valeur.texte;

  useEffect(() => {
    onSale(sale);
  }, [sale, onSale]);

  // Das Feld bekommt sofort den Fokus: Wer klickt, will schreiben.
  useEffect(() => {
    champ.current?.focus();
    champ.current?.select();
  }, []);

  const modifier = (neu: string) => {
    setTexte(neu);
    onApercu(neu);
  };

  async function enregistrer() {
    setOccupe(true);
    setErreur(null);
    const probleme = await onEnregistrer(texte);
    setOccupe(false);
    if (probleme) setErreur(probleme);
  }

  const nom = nomChamp([...selection.cle.chemin], langueAdmin);
  const ou = lieu(selection.cle.table, selection.cle.id, selection.cle.chemin, ligne, langueAdmin);
  const reference =
    valeur.multi && selection.lang !== 'fr' && 'reference' in valeur ? valeur.reference : '';
  const lignes = Math.min(14, Math.max(3, Math.ceil(texte.length / 38) + 1));

  return (
    <div className="panneau-texte">
      <p className="panneau__surtitre">{t('atelier.sie_aendern')}</p>
      <h2 className="panneau__titre">{nom}</h2>
      <p className="panneau__lieu">
        {ou}
        {valeur.multi && (
          <>
            {' · '}
            <strong>{LANG_NOMS[selection.lang]}</strong>
          </>
        )}
      </p>

      {lectureSeule ? (
        <>
          <p className="alerte" role="alert">
            {lectureSeule}
          </p>
          <div className="panneau__actions">
            <button type="button" className="bouton-fin bouton--gros" onClick={onFermer}>
              {t('atelier.schliessen')}
            </button>
          </div>
        </>
      ) : (
        <>
          {valeur.texte.trim() === '' && (
            <p className="panneau__hinweis">{t('atelier.fehlt_noch')}</p>
          )}

          <label className="visuellement-cache" htmlFor="panneau-champ">
            {nom}
          </label>
          {selection.html ? (
            <EditeurTexte
              id="panneau-champ"
              valeur={texte}
              onChange={modifier}
              langue={langueAdmin}
            />
          ) : (
            <textarea
              ref={champ}
              id="panneau-champ"
              className="saisie saisie--grande"
              rows={lignes}
              value={texte}
              // Ein Titel hat keine Zeilenumbrueche. Enter speichert,
              // wie man es aus jedem Formular kennt.
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  if (sale && !occupe) void enregistrer();
                }
                if (e.key === 'Escape') onFermer();
              }}
              onChange={(e) => modifier(e.target.value.replace(/\n/g, ' '))}
            />
          )}

          <p className="panneau__aide">{t('atelier.vorschau_sofort')}</p>

          {erreur && (
            <p className="alerte" role="alert">
              {t('atelier.speichern_fehler')} {erreur}
            </p>
          )}

          <div className="panneau__actions">
            <button
              type="button"
              className="bouton bouton--gros"
              onClick={() => void enregistrer()}
              disabled={!sale || occupe}
            >
              {occupe ? t('editeur.speichert') : `✓ ${t('editeur.speichern')}`}
            </button>
            <button type="button" className="bouton-fin bouton--gros" onClick={onFermer}>
              {sale ? t('atelier.abbrechen') : t('atelier.schliessen')}
            </button>
          </div>
        </>
      )}

      {reference && (
        <details className="panneau__reference">
          <summary>{t('atelier.referenz_zeigen')}</summary>
          <p>{apercu(reference, 600)}</p>
        </details>
      )}

      {selection.lien && (
        <div className="panneau__lien">
          <p>{t('atelier.ist_link')}</p>
          <button type="button" className="bouton-fin" onClick={onSuivreLien}>
            {t('atelier.link_folgen')} →
          </button>
        </div>
      )}
    </div>
  );
}
