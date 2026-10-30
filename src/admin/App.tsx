/**
 * src/admin/App.tsx — Der Redaktionsbereich.
 *
 * Bedienung wie in den Demos fuer Krombach und DRP: Im Footer der Website
 * steht „Login“. Der Klick oeffnet diese Seite mit derselben Seite der
 * Website im Hintergrund und dem Anmeldefenster davor. Nach der Anmeldung
 * wird direkt auf der Seite bearbeitet, unten steht die Leiste
 * Speichern · Rückgängig · Seiten · Google · Veröffentlichen · Mehr.
 * Alles Weitere (Nachrichten, Bilder, Weitere Inhalte) liegt unter „Mehr“.
 *
 * Kein Kilobyte hiervon liegt auf einer oeffentlichen Seite: Astro
 * buendelt je Seite, und /admin ist die einzige Seite, die React laedt.
 */
import { useCallback, useEffect, useState } from 'react';
import {
  chargerProfil,
  configuré,
  facteurObligatoire,
  niveauSecurite,
  supabase,
  type Profil,
} from './supabase';
import { traduire, type LangueAdmin } from './i18n';
import type { Lang } from '../lib/langs';
import Connexion from './composants/Connexion';
import Feuille from './composants/Feuille';
import Atelier from './atelier/Atelier';
import { prefixer } from '../lib/base';

interface Props {
  /** Zeitpunkt, aus dem die Website zuletzt gebaut wurde. */
  stand: string;
  /** Die Sprachen, in denen die Website gebaut wird. */
  langues: Lang[];
}

/** Die Seite, von der aus „Login“ geklickt wurde — sonst die Startseite. */
function pageDeDepart(langues: Lang[]): string {
  const seite = new URLSearchParams(window.location.search).get('seite');
  // Nur Pfade dieser Website, keine fremde Adresse.
  if (seite?.startsWith('/') && !seite.startsWith('//') && !seite.includes('/admin/')) {
    return seite;
  }
  return prefixer(`/${langues[0] ?? 'fr'}/`);
}

export default function App({ stand, langues }: Props) {
  const [profil, setProfil] = useState<Profil | null | 'charge'>('charge');
  /** Erreichte Sicherungsstufe. Ohne 'aal2' gibt es keinen Zugang. */
  const [niveau, setNiveau] = useState<'aal1' | 'aal2' | null | 'charge'>('charge');
  const [langueAdmin, setLangueAdmin] = useState<LangueAdmin>('fr');
  const [depart] = useState(() => pageDeDepart(langues));

  const t = (c: Parameters<typeof traduire>[1]) => traduire(langueAdmin, c);

  const relire = useCallback(async () => {
    const [p, n] = await Promise.all([chargerProfil(), niveauSecurite()]);
    setProfil(p);
    setNiveau(n);
    if (p) setLangueAdmin(p.langue_admin);
  }, []);

  useEffect(() => {
    if (!configuré) {
      setProfil(null);
      return;
    }
    void relire();
    const { data } = supabase.auth.onAuthStateChange(() => void relire());
    return () => data.subscription.unsubscribe();
  }, [relire]);

  async function changerLangue(l: LangueAdmin) {
    setLangueAdmin(l);
    if (profil && profil !== 'charge') {
      await supabase.from('profiles').update({ langue_admin: l }).eq('id', profil.id);
    }
  }

  async function abmelden(chemin: string) {
    await supabase.auth.signOut();
    // Zurueck auf dieselbe Seite der Website, wie bei Krombach und DRP.
    window.location.assign(chemin);
  }

  /** Die Website im Hintergrund, solange das Anmeldefenster davor steht. */
  const fond = <iframe className="kx-fond" src={depart} title="LW LEGIS" tabIndex={-1} aria-hidden="true" />;

  if (!configuré) {
    return (
      <>
        {fond}
        <Feuille titre="LW LEGIS" onFermer={() => window.location.assign(depart)} fermer={t('atelier.schliessen')}>
          <p className="kx-err" role="alert">
            {t('app.nicht_eingerichtet')}
          </p>
        </Feuille>
      </>
    );
  }

  if (profil === 'charge' || niveau === 'charge') {
    return (
      <>
        {fond}
        <p className="kx-toast" role="status">
          {t('app.laden')}
        </p>
      </>
    );
  }

  /**
   * Kein Profil — oder ein Passwort ohne zweiten Faktor. Beides führt zur
   * Anmeldung. Der zweite Fall ist der wichtige: Wer nur das Passwort
   * kennt, sieht hier die Aufforderung zum zweiten Faktor und nicht die
   * Inhalte. Die Datenbank schützt sich zusätzlich selbst über die
   * Zugriffsregeln, aber die Oberfläche darf gar nicht erst aufgehen.
   * Gegen die örtliche Datenbank genügt das Passwort (siehe
   * `facteurObligatoire`).
   */
  if (!profil || (facteurObligatoire && niveau !== 'aal2')) {
    return (
      <>
        {fond}
        <Connexion
          langue={langueAdmin}
          onConnecte={() => void relire()}
          onFermer={() => window.location.assign(depart)}
        />
      </>
    );
  }

  return (
    <Atelier
      langueAdmin={langueAdmin}
      profil={profil}
      stand={stand}
      langues={langues}
      depart={depart}
      onLangueAdmin={(l) => void changerLangue(l)}
      onAbmelden={(chemin) => void abmelden(chemin)}
    />
  );
}
