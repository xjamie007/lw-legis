/**
 * src/admin/composants/Connexion.tsx — Anmeldung mit zweitem Faktor.
 *
 * E-Mail und Passwort, danach TOTP. Der zweite Faktor ist Pflicht: wer
 * noch keinen eingerichtet hat, richtet ihn hier ein, bevor er weiterkommt.
 * Einzige Ausnahme ist die oertliche Datenbank, dort genuegt das Passwort.
 * Es gibt keine oeffentliche Registrierung — Konten entstehen nur per
 * Einladung durch den Inhaber.
 */
import { useEffect, useState } from 'react';
import { demo, facteurObligatoire, supabase } from '../supabase';
import { traduire, type LangueAdmin } from '../i18n';
import Feuille from './Feuille';

type Etape = 'identifiants' | 'mfa_verifier' | 'mfa_inscrire';

interface Props {
  langue: LangueAdmin;
  onConnecte: () => void;
  /** Fenster schliessen, ohne sich anzumelden: zurueck zur Website. */
  onFermer: () => void;
}

export default function Connexion({ langue, onConnecte, onFermer }: Props) {
  const t = (c: Parameters<typeof traduire>[1]) => traduire(langue, c);

  const [etape, setEtape] = useState<Etape>('identifiants');
  const [courriel, setCourriel] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [code, setCode] = useState('');
  const [erreur, setErreur] = useState<string | null>(null);
  const [occupe, setOccupe] = useState(false);

  const [facteurId, setFacteurId] = useState<string | null>(null);
  const [qr, setQr] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);

  /** Nach Passwort prüfen: gibt es schon einen zweiten Faktor? */
  async function apresMotDePasse() {
    if (!facteurObligatoire) {
      onConnecte();
      return;
    }
    const { data, error } = await supabase.auth.mfa.listFactors();
    if (error) {
      setErreur(error.message);
      return;
    }
    const pret = data.totp.find((f) => f.status === 'verified');
    if (pret) {
      setFacteurId(pret.id);
      setEtape('mfa_verifier');
      return;
    }

    /**
     * Abgebrochene Einrichtungen wegraeumen.
     *
     * Wer die Seite waehrend der Einrichtung schliesst, laesst einen
     * unbestaetigten Faktor zurueck. Beim naechsten Versuch lehnt Supabase
     * dann ab: „A factor with the friendly name … already exists“ — und
     * der Betreffende kaeme nie wieder hinein, ohne dass jemand in der
     * Datenbank aufraeumt. Genau das ist beim Pruefen passiert.
     */
    const alle = (data as { all?: { id: string; status: string }[] }).all ?? data.totp;
    for (const f of alle) {
      if (f.status !== 'verified') {
        await supabase.auth.mfa.unenroll({ factorId: f.id });
      }
    }

    // Jetzt neu einrichten.
    const { data: inscrit, error: erreurInscription } = await supabase.auth.mfa.enroll({
      factorType: 'totp',
      friendlyName: 'LW LEGIS',
    });
    if (erreurInscription || !inscrit) {
      setErreur(erreurInscription?.message ?? 'MFA');
      return;
    }
    setFacteurId(inscrit.id);
    setQr(inscrit.totp.qr_code);
    setSecret(inscrit.totp.secret);
    setEtape('mfa_inscrire');
  }

  async function envoyerIdentifiants(e: React.FormEvent) {
    e.preventDefault();
    setErreur(null);
    setOccupe(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: courriel.trim(),
      password: motDePasse,
    });
    if (error) {
      setErreur(t('anmeldung.fehlgeschlagen'));
      setOccupe(false);
      return;
    }
    await apresMotDePasse();
    setOccupe(false);
  }

  async function envoyerCode(e: React.FormEvent) {
    e.preventDefault();
    if (!facteurId) return;
    setErreur(null);
    setOccupe(true);
    const { data: defi, error: erreurDefi } = await supabase.auth.mfa.challenge({
      factorId: facteurId,
    });
    if (erreurDefi || !defi) {
      setErreur(erreurDefi?.message ?? 'MFA');
      setOccupe(false);
      return;
    }
    const { error } = await supabase.auth.mfa.verify({
      factorId: facteurId,
      challengeId: defi.id,
      code: code.trim(),
    });
    if (error) {
      setErreur(t('anmeldung.mfa_falsch'));
      setCode('');
      setOccupe(false);
      return;
    }
    setOccupe(false);
    onConnecte();
  }

  useEffect(() => {
    // Beim Öffnen prüfen, wie weit die Anmeldung schon ist.
    //
    //   keine Sitzung          -> Formular für E-Mail und Passwort
    //   Sitzung, aber nur aal1 -> direkt zum zweiten Faktor
    //   aal2                   -> fertig, hinein
    //
    // Der mittlere Fall trat vorher durch: Nach dem Passwort zeigte die
    // Anwendung die Inhalte, ohne je nach dem zweiten Faktor zu fragen.
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) return;
      const { data: niveau } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
      if (niveau?.currentLevel === 'aal2') {
        onConnecte();
        return;
      }
      await apresMotDePasse();
    });
    // apresMotDePasse ändert sich nicht; die Prüfung soll genau einmal laufen.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onConnecte]);

  const titre =
    etape === 'identifiants'
      ? t('anmeldung.titre')
      : etape === 'mfa_inscrire'
        ? t('anmeldung.mfa_einrichten_titel')
        : t('anmeldung.mfa_titel');

  return (
    <Feuille titre={titre} onFermer={onFermer} fermer={t('atelier.schliessen')}>
      {etape === 'identifiants' && (
        <form className="kx-form" onSubmit={envoyerIdentifiants}>
          <label>
            {t(demo ? 'anmeldung.benutzer' : 'anmeldung.email')}
            <input
              type={demo ? 'text' : 'email'}
              autoComplete="username"
              autoCapitalize="none"
              required
              value={courriel}
              onChange={(e) => setCourriel(e.target.value)}
            />
          </label>
          <label>
            {t('anmeldung.passwort')}
            <input
              type="password"
              autoComplete="current-password"
              required
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
            />
          </label>
          {erreur && (
            <p className="kx-err" role="alert">
              {erreur}
            </p>
          )}
          <button className="kx-btn kx-primary kx-block" type="submit" disabled={occupe}>
            {occupe ? t('anmeldung.laeuft') : t('anmeldung.senden')}
          </button>
        </form>
      )}

      {etape === 'mfa_inscrire' && (
        <form className="kx-form" onSubmit={envoyerCode}>
          <p className="kx-p">{t('anmeldung.mfa_einrichten_hilfe')}</p>
          {qr && <img className="kx-qr" src={qr} alt="" width={200} height={200} />}
          {secret && (
            <p className="kx-hint">
              {t('anmeldung.mfa_geheimnis')} <code>{secret}</code>
            </p>
          )}
          <label>
            {t('anmeldung.mfa_code')}
            <input
              className="kx-code"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9]{6}"
              maxLength={6}
              required
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
            />
          </label>
          {erreur && (
            <p className="kx-err" role="alert">
              {erreur}
            </p>
          )}
          <button className="kx-btn kx-primary kx-block" type="submit" disabled={occupe}>
            {t('anmeldung.mfa_bestaetigen')}
          </button>
        </form>
      )}

      {etape === 'mfa_verifier' && (
        <form className="kx-form" onSubmit={envoyerCode}>
          <p className="kx-p">{t('anmeldung.mfa_hilfe')}</p>
          <label>
            {t('anmeldung.mfa_code')}
            <input
              className="kx-code"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9]{6}"
              maxLength={6}
              required
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
            />
          </label>
          {erreur && (
            <p className="kx-err" role="alert">
              {erreur}
            </p>
          )}
          <button className="kx-btn kx-primary kx-block" type="submit" disabled={occupe}>
            {t('anmeldung.mfa_pruefen')}
          </button>
        </form>
      )}
    </Feuille>
  );
}
