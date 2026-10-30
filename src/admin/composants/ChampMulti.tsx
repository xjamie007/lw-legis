/**
 * src/admin/composants/ChampMulti.tsx — Ein mehrsprachiges Feld.
 *
 * Links die franzoesische Referenzfassung, rechts die bearbeitete Sprache.
 * Fehlt die Uebersetzung, steht das da — deutlich, nicht versteckt.
 *
 * Die Referenzspalte ist nicht bearbeitbar, solange eine andere Sprache
 * bearbeitet wird; wer Franzoesisch aendern will, waehlt Franzoesisch.
 */
import { traduire, type LangueAdmin } from '../i18n';
import EditeurTexte from './EditeurTexte';
import type { Champ } from '../schema';

/** Wie die Website: Franzoesisch und Englisch. */
export const LANGUES_CONTENU = ['fr', 'en'] as const;
export type LangueContenu = (typeof LANGUES_CONTENU)[number];

export const NOMS_LANGUE: Record<LangueContenu, string> = {
  fr: 'Français',
  en: 'English',
};

interface Props {
  champ: Champ;
  valeur: Record<string, string> | null;
  langueContenu: LangueContenu;
  langueAdmin: LangueAdmin;
  onChange: (v: Record<string, string>) => void;
}

export function estVide(v: string | undefined | null): boolean {
  return !v || v.trim() === '' || /^\[[A-Z]{2} FEHLT\]$/.test(v.trim());
}

export default function ChampMulti({
  champ,
  valeur,
  langueContenu,
  langueAdmin,
  onChange,
}: Props) {
  const t = (c: Parameters<typeof traduire>[1], vars?: Record<string, string | number>) =>
    traduire(langueAdmin, c, vars);

  const v = valeur ?? {};
  const actuel = v[langueContenu] ?? '';
  const reference = v.fr ?? '';
  const manque = estVide(actuel);
  const estReference = langueContenu === 'fr';
  const idChamp = `champ-${champ.nom}-${langueContenu}`;
  const idAide = champ.aide ? `${idChamp}-aide` : undefined;

  const poser = (nouveau: string) => onChange({ ...v, [langueContenu]: nouveau });

  const saisie =
    champ.type === 'texte_long' ? (
      <EditeurTexte
        id={idChamp}
        valeur={actuel}
        onChange={poser}
        langue={langueAdmin}
        ariaDescribedby={idAide}
      />
    ) : (
      <input
        id={idChamp}
        className="saisie"
        type="text"
        value={actuel}
        aria-describedby={idAide}
        onChange={(e) => poser(e.target.value)}
      />
    );

  return (
    <div className="champ-multi">
      <div className="champ-multi__entete">
        <label className="champ-multi__label" htmlFor={idChamp}>
          {champ.etiquette[langueAdmin]}
          {champ.requis && <span className="champ-multi__requis"> *</span>}
        </label>
        {manque && <span className="marque-manque">{t('champ.fehlt')}</span>}
      </div>

      {champ.aide && (
        <p className="champ-multi__aide" id={idAide}>
          {champ.aide[langueAdmin]}
        </p>
      )}

      <div className={estReference ? 'champ-multi__corps' : 'champ-multi__corps champ-multi__corps--double'}>
        {!estReference && (
          <div className="champ-multi__colonne champ-multi__colonne--ref">
            <p className="champ-multi__titre-colonne">{t('champ.referenz')}</p>
            <div
              className="champ-multi__reference"
              // Reiner Anzeigetext. Die Referenz kommt aus derselben
              // Datenbank und wird nie vom Besucher eingegeben.
              dangerouslySetInnerHTML={{ __html: reference || '<p class="vide">—</p>' }}
            />
            {!estVide(reference) && (
              <button
                type="button"
                className="bouton-fin"
                onClick={() => poser(reference)}
                title={t('champ.uebernehmen')}
              >
                {t('champ.uebernehmen')}
              </button>
            )}
          </div>
        )}

        <div className="champ-multi__colonne">
          {!estReference && (
            <p className="champ-multi__titre-colonne">
              {t('champ.bearbeitet')} — {NOMS_LANGUE[langueContenu]}
            </p>
          )}
          {saisie}
        </div>
      </div>
    </div>
  );
}
