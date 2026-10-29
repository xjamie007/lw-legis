/**
 * src/admin/composants/Liste.tsx — Uebersicht einer Sammlung.
 *
 * Zeigt je Eintrag den Status und in welchen Sprachen noch etwas fehlt.
 * Sortieren geht per Maus UND per Tastatur — die Pfeilknoepfe sind
 * gewoehnliche Schaltflaechen, kein Ziehen-und-Ablegen, das sich ohne
 * Maus nicht bedienen liesse.
 */
import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../supabase';
import { traduire, type LangueAdmin } from '../i18n';
import type { Collection } from '../schema';
import { LANGUES_CONTENU, estVide } from './ChampMulti';

interface Props {
  collection: Collection;
  langueAdmin: LangueAdmin;
  onOuvrir: (id: string) => void;
}

export default function Liste({ collection, langueAdmin, onOuvrir }: Props) {
  const t = (c: Parameters<typeof traduire>[1]) => traduire(langueAdmin, c);
  const [lignes, setLignes] = useState<Record<string, any>[] | null>(null);
  const [filtre, setFiltre] = useState('');

  async function charger() {
    const requete = supabase.from(collection.table).select('*');
    const { data } = collection.triable
      ? await requete.order('ordre', { ascending: true })
      : await requete.order('id', { ascending: true });
    setLignes(data ?? []);
  }

  useEffect(() => {
    void charger();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection.table]);

  const titre = (l: Record<string, any>) => {
    const fixe = collection.nomsFixes?.[l.id];
    if (fixe) return fixe[langueAdmin];
    const v = l[collection.champTitre];
    if (typeof v === 'string') return v;
    if (v && typeof v === 'object') return v.fr || v.de || v.en || l.id;
    return l.id;
  };

  const manquantes = (l: Record<string, any>) =>
    LANGUES_CONTENU.filter((lang) =>
      (collection.requisParLangue ?? []).some((n) => estVide(l[n]?.[lang])),
    );

  const visibles = useMemo(() => {
    if (!lignes) return [];
    const f = filtre.trim().toLowerCase();
    if (!f) return lignes;
    return lignes.filter((l) => titre(l).toLowerCase().includes(f) || l.id.includes(f));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lignes, filtre]);

  async function deplacer(index: number, sens: -1 | 1) {
    if (!lignes) return;
    const cible = index + sens;
    if (cible < 0 || cible >= lignes.length) return;
    const a = lignes[index];
    const b = lignes[cible];
    await supabase.from(collection.table).update({ ordre: b.ordre }).eq('id', a.id);
    await supabase.from(collection.table).update({ ordre: a.ordre }).eq('id', b.id);
    void charger();
  }

  if (lignes === null) return <p className="charge">{t('app.laden')}</p>;

  return (
    <div className="liste">
      <div className="liste__barre">
        <label className="liste__recherche">
          <span className="visuellement-cache">{t('liste.suchen')}</span>
          <input
            className="saisie"
            type="search"
            placeholder={t('liste.suchen')}
            value={filtre}
            onChange={(e) => setFiltre(e.target.value)}
          />
        </label>
      </div>

      {visibles.length === 0 ? (
        <p className="vide">{t('liste.leer')}</p>
      ) : (
        <ul className="liste__elements">
          {visibles.map((l, i) => {
            const absentes = manquantes(l);
            return (
              <li key={l.id} className="liste__element">
                <button type="button" className="liste__lien" onClick={() => onOuvrir(l.id)}>
                  {titre(l)}
                </button>

                <div className="liste__meta">
                  {collection.statut && (
                    <span
                      className={
                        l.statut === 'veroeffentlicht'
                          ? 'pastille pastille--publie'
                          : 'pastille'
                      }
                    >
                      {l.statut === 'veroeffentlicht'
                        ? t('liste.veroeffentlicht')
                        : t('liste.entwurf')}
                    </span>
                  )}
                  {absentes.length > 0 && (
                    <span className="pastille pastille--manque">
                      {t('liste.offen_in')} {absentes.join(', ')}
                    </span>
                  )}
                </div>

                {collection.triable && !filtre && (
                  <div className="liste__ordre">
                    <button
                      type="button"
                      className="bouton-fin"
                      aria-label={`${titre(l)} — ↑`}
                      disabled={i === 0}
                      onClick={() => void deplacer(i, -1)}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      className="bouton-fin"
                      aria-label={`${titre(l)} — ↓`}
                      disabled={i === visibles.length - 1}
                      onClick={() => void deplacer(i, 1)}
                    >
                      ↓
                    </button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
