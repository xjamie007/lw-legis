/**
 * src/admin/composants/Publier.tsx — Der Knopf „Veroeffentlichen“.
 *
 * Loest ueber die Edge Function den Build in GitHub Actions aus und zeigt
 * den Fortschritt im Klartext: „Wird veroeffentlicht, seit 40 Sekunden“
 * beziehungsweise „Veroeffentlicht um 14:32“.
 *
 * Einen eigenen Vorschau-Build gibt es hier nicht mehr: Die Vorschau im
 * Redaktionsbereich zeigt jede gespeicherte Aenderung sofort.
 *
 * Gegen die oertliche Datenbank gibt es nichts zu veroeffentlichen — dort
 * laeuft weder die Edge Function noch ein Build. Der Knopf sagt das,
 * statt mit einer Fehlermeldung zu scheitern.
 */
import { useEffect, useRef, useState } from 'react';
import { appelerFonction } from '../supabase';
import { traduire, type LangueAdmin } from '../i18n';

type Etat = 'ruhe' | 'laeuft' | 'fertig' | 'fehler';

interface Props {
  langue: LangueAdmin;
  /** Wie viele Aenderungen warten. */
  nombre: number;
  /** Oertliche Testumgebung: kein echter Build. */
  local: boolean;
}

export default function Publier({ langue, nombre, local }: Props) {
  const t = (c: Parameters<typeof traduire>[1], v?: Record<string, string | number>) =>
    traduire(langue, c, v);

  const [etat, setEtat] = useState<Etat>('ruhe');
  const [secondes, setSecondes] = useState(0);
  const [fini, setFini] = useState<string | null>(null);
  const minuterie = useRef<number | null>(null);

  useEffect(() => () => {
    if (minuterie.current) window.clearInterval(minuterie.current);
  }, []);

  async function lancer() {
    if (!window.confirm(t('publier.sicher', { n: nombre }))) return;
    setEtat('laeuft');
    setSecondes(0);
    minuterie.current = window.setInterval(() => setSecondes((s) => s + 1), 1000);
    try {
      await appelerFonction('publish', { apercu: false });
      // Der Build laeuft bei GitHub. Eine belastbare Rueckmeldung ueber
      // sein Ende gibt es hier nicht, deshalb wird die uebliche Bauzeit
      // abgewartet und ehrlich gesagt, dass es so lange dauert.
      window.setTimeout(() => {
        if (minuterie.current) window.clearInterval(minuterie.current);
        setEtat('fertig');
        setFini(
          new Date().toLocaleTimeString(langue === 'de' ? 'de-LU' : 'fr-LU', {
            hour: '2-digit',
            minute: '2-digit',
          }),
        );
      }, 90_000);
    } catch {
      if (minuterie.current) window.clearInterval(minuterie.current);
      setEtat('fehler');
    }
  }

  return (
    <div className="publier">
      <button
        className="bouton bouton--gros bouton--publier"
        type="button"
        onClick={() => void lancer()}
        disabled={local || etat === 'laeuft' || nombre === 0}
      >
        {t('publier.knopf_n', { n: nombre })}
      </button>

      <p className="publier__etat" role="status">
        {local && t('publier.lokal')}
        {!local && etat === 'ruhe' && t('publier.hinweis')}
        {etat === 'laeuft' && t('publier.laeuft', { s: secondes })}
        {etat === 'fertig' && fini && t('publier.fertig', { zeit: fini })}
        {etat === 'fehler' && t('publier.fehlgeschlagen')}
      </p>
    </div>
  );
}
