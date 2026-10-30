/**
 * src/admin/atelier/ListeModifications.tsx — „Ihre Änderungen“.
 *
 * Jede Aenderung seit dem letzten Veroeffentlichen, mit dem alten und dem
 * neuen Text nebeneinander. „Ansehen“ springt in der Vorschau an die
 * Stelle, „Zurücknehmen“ stellt den veroeffentlichten Text wieder her.
 */
import { useState } from 'react';
import { traduire, type LangueAdmin } from '../i18n';
import { apercu, lieu, nomChamp, nomLangue, libelleParDefaut } from './chemins';
import type { Modification } from './modifications';

interface Props {
  modifications: Modification[];
  langueAdmin: LangueAdmin;
  onMontrer: (m: Modification) => void;
  onAnnuler: (m: Modification) => Promise<void>;
}

export default function ListeModifications({
  modifications,
  langueAdmin,
  onMontrer,
  onAnnuler,
}: Props) {
  const t = (c: Parameters<typeof traduire>[1], v?: Record<string, string | number>) =>
    traduire(langueAdmin, c, v);
  const [occupe, setOccupe] = useState<number | null>(null);

  const heure = (iso: string) =>
    new Date(iso).toLocaleString(langueAdmin === 'de' ? 'de-LU' : 'fr-LU', {
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <ol className="modifs">
      {modifications.map((m, i) => {
        const langue = nomLangue(m.chemin);
        return (
          <li key={`${m.table}|${m.id}|${m.chemin.join('.')}`} className="modif">
            <p className="modif__ou">
              {lieu(m.table, m.id, m.chemin, m.ligne, langueAdmin)}
            </p>
            <p className="modif__quoi">
              {m.nouveau ? t('atelier.neu_angelegt') : nomChamp(m.chemin, langueAdmin)}
              {langue && <span className="modif__langue"> · {langue}</span>}
              <span className="modif__quand"> · {heure(m.quand)}</span>
            </p>

            {!m.nouveau && (
              <dl className="modif__textes">
                <dt>{t('atelier.vorher')}</dt>
                <dd className="modif__avant">
                  {apercu(m.avant) || libelleParDefaut(m.table, m.id, m.chemin) || t('atelier.leer')}
                </dd>
                <dt>{t('atelier.jetzt')}</dt>
                <dd className="modif__apres">{apercu(m.apres) || t('atelier.leer')}</dd>
              </dl>
            )}

            <div className="modif__actions">
              <button type="button" className="bouton-fin" onClick={() => onMontrer(m)}>
                {t('atelier.ansehen')}
              </button>
              {!m.nouveau && (
                <button
                  type="button"
                  className="bouton-fin"
                  disabled={occupe !== null}
                  onClick={async () => {
                    if (!window.confirm(t('atelier.zuruecknehmen_sicher'))) return;
                    setOccupe(i);
                    await onAnnuler(m);
                    setOccupe(null);
                  }}
                >
                  {occupe === i ? t('app.laden') : t('atelier.zuruecknehmen')}
                </button>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
