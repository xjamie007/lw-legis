/**
 * src/admin/composants/Anfragen.tsx — Eingegangene Anfragen.
 *
 * Jede Anfrage liegt zusaetzlich zur E-Mail hier, damit nichts verloren
 * geht, wenn eine Mail im Spamordner landet. Sichtbar ist auch, wann sie
 * nach der in der Datenschutzerklaerung genannten Frist geloescht wird.
 */
import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { traduire, type LangueAdmin } from '../i18n';

interface Anfrage {
  id: string;
  recu_le: string;
  nom: string;
  courriel: string;
  telephone: string | null;
  pays: string;
  projet: string;
  echeance: string | null;
  sans_echeance: boolean;
  message: string;
  langue: string;
  supprimer_le: string;
  traite: boolean;
}

export default function Anfragen({ langueAdmin }: { langueAdmin: LangueAdmin }) {
  const t = (c: Parameters<typeof traduire>[1]) => traduire(langueAdmin, c);
  const [liste, setListe] = useState<Anfrage[] | null>(null);

  async function charger() {
    const { data } = await supabase
      .from('inquiries')
      .select('*')
      .order('recu_le', { ascending: false });
    setListe((data as Anfrage[]) ?? []);
  }

  useEffect(() => {
    void charger();
  }, []);

  const date = (iso: string) =>
    new Date(iso).toLocaleString(langueAdmin === 'de' ? 'de-LU' : 'fr-LU', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

  if (liste === null) return <p className="charge">{t('app.laden')}</p>;
  if (liste.length === 0) return <p className="vide">{t('inquiries.leer')}</p>;

  return (
    <ul className="anfragen">
      {liste.map((a) => (
        <li key={a.id} className={a.traite ? 'anfrage anfrage--traitee' : 'anfrage'}>
          <div className="anfrage__entete">
            <p className="anfrage__nom">{a.nom}</p>
            <p className="anfrage__quand">{date(a.recu_le)}</p>
          </div>

          <dl className="anfrage__donnees">
            <dt>{t('anmeldung.email')}</dt>
            <dd>
              <a href={`mailto:${a.courriel}`}>{a.courriel}</a>
            </dd>
            {a.telephone && (
              <>
                <dt>Telefon</dt>
                <dd>
                  <a href={`tel:${a.telephone}`}>{a.telephone}</a>
                </dd>
              </>
            )}
            <dt>{langueAdmin === 'de' ? 'Wohnsitz' : 'Résidence'}</dt>
            <dd>{a.pays}</dd>
            <dt>{langueAdmin === 'de' ? 'Anliegen' : 'Objet'}</dt>
            <dd>{a.projet}</dd>
            <dt>{langueAdmin === 'de' ? 'Frist' : 'Échéance'}</dt>
            <dd>{a.sans_echeance ? '—' : (a.echeance ?? '—')}</dd>
          </dl>

          <p className="anfrage__message">{a.message}</p>

          <div className="anfrage__pied">
            <button
              type="button"
              className="bouton-fin"
              onClick={async () => {
                await supabase.from('inquiries').update({ traite: !a.traite }).eq('id', a.id);
                void charger();
              }}
            >
              {a.traite ? t('inquiries.wieder_offen') : t('inquiries.erledigt')}
            </button>
            <span className="anfrage__frist">
              {t('inquiries.loeschen_am')} {a.supprimer_le}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
