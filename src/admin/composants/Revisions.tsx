/**
 * src/admin/composants/Revisions.tsx — Frühere Fassungen.
 *
 * Jede Speicherung schreibt die Vorfassung nach `revisions` — durch einen
 * Trigger in der Datenbank, nicht durch die Oberflaeche. Hier stehen sie
 * mit Datum und Bearbeiter und lassen sich zurueckspielen.
 *
 * Das Zurueckspielen ist selbst eine Aenderung und wird wieder gesichert:
 * auch das Rueckgaengigmachen laesst sich rueckgaengig machen.
 */
import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { traduire, type LangueAdmin } from '../i18n';

interface Fassung {
  id: number;
  ecrit_le: string;
  ecrit_par: string | null;
  donnees: Record<string, unknown>;
}

interface Props {
  table: string;
  enregistrementId: string;
  langueAdmin: LangueAdmin;
  onRestaure: () => void;
}

export default function Revisions({ table, enregistrementId, langueAdmin, onRestaure }: Props) {
  const t = (c: Parameters<typeof traduire>[1]) => traduire(langueAdmin, c);
  const [fassungen, setFassungen] = useState<Fassung[] | null>(null);
  const [noms, setNoms] = useState<Record<string, string>>({});
  const [occupe, setOccupe] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('revisions')
        .select('id, ecrit_le, ecrit_par, donnees')
        .eq('table_nom', table)
        .eq('enregistrement_id', enregistrementId)
        .order('ecrit_le', { ascending: false })
        .limit(30);
      setFassungen((data as Fassung[]) ?? []);

      const { data: profils } = await supabase.from('profiles').select('id, nom');
      setNoms(Object.fromEntries((profils ?? []).map((p: any) => [p.id, p.nom])));
    })();
  }, [table, enregistrementId]);

  async function restaurer(id: number) {
    if (!window.confirm(t('revisions.sicher'))) return;
    setOccupe(true);
    const { error } = await supabase.rpc('restaurer', { revision_id: id });
    setOccupe(false);
    if (!error) onRestaure();
    else window.alert(error.message);
  }

  if (fassungen === null) return <p className="charge">{t('app.laden')}</p>;
  if (fassungen.length === 0) return <p className="vide">{t('revisions.leer')}</p>;

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString(langueAdmin === 'de' ? 'de-LU' : 'fr-LU', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

  return (
    <div className="revisions">
      <h3 className="revisions__titre">{t('revisions.titel')}</h3>
      <ul className="revisions__liste">
        {fassungen.map((f) => (
          <li key={f.id} className="revisions__element">
            <span className="revisions__quand">{formatDate(f.ecrit_le)}</span>
            {f.ecrit_par && noms[f.ecrit_par] && (
              <span className="revisions__qui">
                {t('revisions.von')} {noms[f.ecrit_par]}
              </span>
            )}
            <button
              type="button"
              className="bouton-fin"
              disabled={occupe}
              onClick={() => void restaurer(f.id)}
            >
              {t('revisions.wiederherstellen')}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
