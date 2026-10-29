/**
 * src/admin/App.tsx — Der Redaktionsbereich.
 *
 * Eine Anwendung mit eigener Adressleiste (ueber den Ankerteil der URL),
 * damit Zurueck und Lesezeichen funktionieren, ohne dass der Server
 * mitspielen muss.
 *
 * Oben stehen vier Bereiche, mehr nicht:
 *   Website bearbeiten  — die echte Seite als Vorschau, Text anklicken,
 *                         aendern, veroeffentlichen (Standard)
 *   Nachrichten         — Anfragen aus dem Kontaktformular
 *   Bilder              — die Ablage
 *   Weitere Inhalte     — die Listen fuer alles, was sich nicht anklicken
 *                         laesst: neue Eintraege, Google-Angaben, Status
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
import { COLLECTIONS, ORDRE_NAV } from './schema';
import type { Lang } from '../lib/langs';
import Connexion from './composants/Connexion';
import Liste from './composants/Liste';
import Editeur from './composants/Editeur';
import Medias from './composants/Medias';
import Anfragen from './composants/Anfragen';
import Atelier from './atelier/Atelier';

interface Route {
  vue: string;
  id?: string;
}

function lireRoute(): Route {
  const brut = window.location.hash.replace(/^#\/?/, '');
  const [vue, id] = brut.split('/');
  return { vue: vue || 'website', id: id || undefined };
}

interface Props {
  /** Zeitpunkt, aus dem die Website zuletzt gebaut wurde. */
  stand: string;
  /** Die Sprachen, in denen die Website gebaut wird. */
  langues: Lang[];
}

export default function App({ stand, langues }: Props) {
  const [profil, setProfil] = useState<Profil | null | 'charge'>('charge');
  /** Erreichte Sicherungsstufe. Ohne 'aal2' gibt es keinen Zugang. */
  const [niveau, setNiveau] = useState<'aal1' | 'aal2' | null | 'charge'>('charge');
  const [route, setRoute] = useState<Route>(lireRoute);
  const [langueAdmin, setLangueAdmin] = useState<LangueAdmin>('de');

  const [nouvelles, setNouvelles] = useState(0);

  const t = (c: Parameters<typeof traduire>[1], v?: Record<string, string | number>) =>
    traduire(langueAdmin, c, v);

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

  // Wie viele Nachrichten warten? Steht als Zahl am Reiter.
  const connecte = Boolean(profil && profil !== 'charge');
  useEffect(() => {
    if (!connecte) return;
    void supabase
      .from('inquiries')
      .select('id', { count: 'exact', head: true })
      .eq('traite', false)
      .then(({ count }) => setNouvelles(count ?? 0));
  }, [connecte, route.vue]);

  useEffect(() => {
    const surHash = () => setRoute(lireRoute());
    window.addEventListener('hashchange', surHash);
    return () => window.removeEventListener('hashchange', surHash);
  }, []);

  const aller = (vue: string, id?: string) => {
    window.location.hash = id ? `/${vue}/${id}` : `/${vue}`;
  };

  async function changerLangue(l: LangueAdmin) {
    setLangueAdmin(l);
    if (profil && profil !== 'charge') {
      await supabase.from('profiles').update({ langue_admin: l }).eq('id', profil.id);
    }
  }

  // --- Sonderfaelle --------------------------------------------------------
  if (!configuré) {
    return (
      <main className="connexion">
        <div className="connexion__carte">
          <p className="connexion__marque">LW LEGIS</p>
          <p className="connexion__erreur" role="alert">
            {t('app.nicht_eingerichtet')}
          </p>
        </div>
      </main>
    );
  }

  if (profil === 'charge' || niveau === 'charge') {
    return <p className="charge">{t('app.laden')}</p>;
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
    return <Connexion langue={langueAdmin} onConnecte={() => void relire()} />;
  }

  const estOwner = profil.role === 'owner';

  // Rechtstexte und Konten sieht nur der Inhaber.
  const sammlungen = ORDRE_NAV.filter((cle) => {
    const c = COLLECTIONS[cle];
    return c && (!c.reserveOwner || estOwner);
  });

  const collectionActive = COLLECTIONS[route.vue];
  const bereich =
    route.vue === 'website' || route.vue === 'anfragen' || route.vue === 'medias'
      ? route.vue
      : 'mehr';

  const reiter: { vue: string; cle: Parameters<typeof traduire>[1]; icone: string }[] = [
    { vue: 'website', cle: 'nav.website', icone: '✎' },
    { vue: 'anfragen', cle: 'nav.nachrichten', icone: '✉' },
    { vue: 'medias', cle: 'nav.medias', icone: '▣' },
    { vue: 'mehr', cle: 'nav.mehr', icone: '☰' },
  ];

  return (
    <div className={bereich === 'website' ? 'admin admin--atelier' : 'admin'}>
      <a className="saut-admin" href="#zone">
        {t('app.titre')}
      </a>

      <header className="admin__entete">
        <p className="admin__marque">LW LEGIS</p>

        <nav className="reiter" aria-label={t('nav.inhalte')}>
          {reiter.map((r) => (
            <button
              key={r.vue}
              type="button"
              className={bereich === r.vue ? 'reiter__knopf reiter__knopf--aktiv' : 'reiter__knopf'}
              aria-current={bereich === r.vue ? 'page' : undefined}
              onClick={() => aller(r.vue)}
            >
              <span className="reiter__icone" aria-hidden="true">
                {r.icone}
              </span>
              {t(r.cle)}
              {r.vue === 'anfragen' && nouvelles > 0 && (
                <span className="compteur-rond" aria-label={t('nav.neu', { n: nouvelles })}>
                  {nouvelles}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="admin__cote">
          <span className="admin__qui">{profil.nom || '—'}</span>
          <label className="admin__langue">
            <span className="visuellement-cache">{t('app.sprache')}</span>
            <select
              value={langueAdmin}
              onChange={(e) => void changerLangue(e.target.value as LangueAdmin)}
            >
              <option value="de">Deutsch</option>
              <option value="fr">Français</option>
            </select>
          </label>
          <button
            type="button"
            className="bouton-fin"
            onClick={async () => {
              await supabase.auth.signOut();
              setProfil(null);
            }}
          >
            {t('app.abmelden')}
          </button>
        </div>
      </header>

      <main className="admin__zone" id="zone" tabIndex={-1}>
        {bereich === 'website' && (
          <Atelier langueAdmin={langueAdmin} estOwner={estOwner} stand={stand} langues={langues} />
        )}

        {bereich === 'anfragen' && (
          <div className="admin__page">
            <h1 className="admin__titre">{t('nav.nachrichten')}</h1>
            <Anfragen langueAdmin={langueAdmin} />
          </div>
        )}

        {bereich === 'medias' && (
          <div className="admin__page">
            <h1 className="admin__titre">{t('nav.medias')}</h1>
            <Medias langueAdmin={langueAdmin} />
          </div>
        )}

        {bereich === 'mehr' && !collectionActive && (
          <div className="admin__page">
            <h1 className="admin__titre">{t('nav.mehr')}</h1>
            <p className="admin__intro">{t('mehr.intro')}</p>
            <ul className="kacheln">
              {sammlungen.map((cle) => (
                <li key={cle}>
                  <button type="button" className="kachel" onClick={() => aller(cle)}>
                    <span className="kachel__titel">
                      {t(COLLECTIONS[cle].cleNav as Parameters<typeof traduire>[1])}
                    </span>
                    <span className="kachel__text">
                      {t(`mehr.${cle}` as Parameters<typeof traduire>[1])}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {collectionActive && !route.id && (
          <div className="admin__page">
            <button type="button" className="bouton-fin" onClick={() => aller('mehr')}>
              ← {t('nav.mehr')}
            </button>
            <h1 className="admin__titre">
              {t(collectionActive.cleNav as Parameters<typeof traduire>[1])}
            </h1>
            <Liste
              collection={collectionActive}
              langueAdmin={langueAdmin}
              onOuvrir={(id) => aller(route.vue, id)}
            />
          </div>
        )}

        {collectionActive && route.id && (
          <div className="admin__page">
            <Editeur
              collection={collectionActive}
              id={route.id}
              langueAdmin={langueAdmin}
              estOwner={estOwner}
              onRetour={() => aller(route.vue)}
            />
          </div>
        )}
      </main>
    </div>
  );
}
