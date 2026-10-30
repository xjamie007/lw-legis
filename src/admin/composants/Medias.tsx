/**
 * src/admin/composants/Medias.tsx — Bilder.
 *
 * Hochladen per Ziehen und Ablegen oder ueber die Dateiauswahl. Danach
 * erzeugt die Edge Function `process-image` AVIF und WebP in den
 * festgelegten Breiten und traegt die echten Masse ein — damit im Markup
 * `width` und `height` stehen und beim Laden nichts springt.
 *
 * Der Alt-Text ist in beiden Sprachen Pflicht. Ohne ihn laesst der
 * Trigger in der Datenbank das Bild nicht auf „veroeffentlicht“.
 */
import { useEffect, useRef, useState } from 'react';
import { supabase, appelerFonction } from '../supabase';
import { traduire, type LangueAdmin } from '../i18n';
import { LANGUES_CONTENU, NOMS_LANGUE, estVide } from './ChampMulti';

interface Media {
  id: string;
  chemin: string;
  type_mime: string;
  largeur: number | null;
  hauteur: number | null;
  point_x: number;
  point_y: number;
  alt: Record<string, string>;
  variantes: unknown[];
  statut: string;
}

const URL_BASE = `${import.meta.env.PUBLIC_SUPABASE_URL}/storage/v1/object/public/media/`;

export default function Medias({ langueAdmin }: { langueAdmin: LangueAdmin }) {
  const t = (c: Parameters<typeof traduire>[1]) => traduire(langueAdmin, c);
  const [images, setImages] = useState<Media[] | null>(null);
  const [actif, setActif] = useState<string | null>(null);
  const [occupe, setOccupe] = useState(false);
  const [survol, setSurvol] = useState(false);
  const champFichier = useRef<HTMLInputElement>(null);

  async function charger() {
    const { data } = await supabase
      .from('media')
      .select('*')
      .eq('bucket', 'media')
      .order('updated_at', { ascending: false });
    setImages((data as Media[]) ?? []);
  }

  useEffect(() => {
    void charger();
  }, []);

  async function televerser(fichiers: FileList | null) {
    if (!fichiers?.length) return;
    setOccupe(true);
    for (const fichier of Array.from(fichiers)) {
      const nom = fichier.name
        .toLowerCase()
        .replace(/[^a-z0-9.]+/g, '-')
        .replace(/^-|-$/g, '');
      const chemin = `${Date.now()}-${nom}`;

      const { error } = await supabase.storage
        .from('media')
        .upload(chemin, fichier, { contentType: fichier.type, upsert: false });
      if (error) {
        window.alert(error.message);
        continue;
      }

      const { data: ligne } = await supabase
        .from('media')
        .insert({
          bucket: 'media',
          chemin,
          type_mime: fichier.type,
          octets: fichier.size,
          alt: {},
          statut: 'entwurf',
        })
        .select('id')
        .single();

      if (ligne) {
        try {
          await appelerFonction('process-image', { chemin, media_id: ligne.id });
        } catch {
          // Die Ableitungen fehlen dann; das Originalbild ist trotzdem da.
        }
      }
    }
    setOccupe(false);
    void charger();
  }

  async function modifier(id: string, champs: Partial<Media>) {
    const { error } = await supabase.from('media').update(champs).eq('id', id);
    if (error) window.alert(error.message);
    void charger();
  }

  if (images === null) return <p className="charge">{t('app.laden')}</p>;

  return (
    <div className="medias">
      {/* --- Hochladen ---------------------------------------------------- */}
      <div
        className={survol ? 'depot depot--survol' : 'depot'}
        onDragOver={(e) => {
          e.preventDefault();
          setSurvol(true);
        }}
        onDragLeave={() => setSurvol(false)}
        onDrop={(e) => {
          e.preventDefault();
          setSurvol(false);
          void televerser(e.dataTransfer.files);
        }}
      >
        <p>{t('medias.ziehen')}</p>
        <button
          type="button"
          className="bouton"
          disabled={occupe}
          onClick={() => champFichier.current?.click()}
        >
          {t('medias.hochladen')}
        </button>
        <input
          ref={champFichier}
          type="file"
          accept="image/*"
          multiple
          className="visuellement-cache"
          onChange={(e) => void televerser(e.target.files)}
        />
      </div>

      {/* --- Die Bilder --------------------------------------------------- */}
      <ul className="medias__liste">
        {images.map((m) => {
          const ouvert = actif === m.id;
          const absentes = LANGUES_CONTENU.filter((l) => estVide(m.alt?.[l]));
          return (
            <li key={m.id} className="medias__element">
              <button
                type="button"
                className="medias__vignette"
                aria-expanded={ouvert}
                onClick={() => setActif(ouvert ? null : m.id)}
              >
                <img
                  src={`${URL_BASE}${m.chemin}`}
                  alt=""
                  width={m.largeur ?? 300}
                  height={m.hauteur ?? 200}
                  loading="lazy"
                  style={{ objectPosition: `${m.point_x}% ${m.point_y}%` }}
                />
              </button>

              <div className="medias__info">
                <p className="medias__nom">{m.chemin}</p>
                {m.largeur && (
                  <p className="medias__detail">
                    {t('medias.masse')}: {m.largeur} × {m.hauteur}
                    {m.variantes?.length > 0 && ` — ${t('medias.verarbeitet')}`}
                  </p>
                )}
                {absentes.length > 0 && (
                  <p className="pastille pastille--manque">
                    {t('medias.alt')}: {absentes.map((l) => NOMS_LANGUE[l]).join(', ')}
                  </p>
                )}
              </div>

              {ouvert && (
                <div className="medias__edition">
                  <p className="champ-multi__aide">{t('medias.alt_hilfe')}</p>
                  {LANGUES_CONTENU.map((l) => (
                    <div key={l} className="champ-multi">
                      <label className="champ-multi__label" htmlFor={`alt-${m.id}-${l}`}>
                        {t('medias.alt')} — {NOMS_LANGUE[l]}
                      </label>
                      <input
                        id={`alt-${m.id}-${l}`}
                        className="saisie"
                        type="text"
                        defaultValue={m.alt?.[l] ?? ''}
                        onBlur={(e) =>
                          void modifier(m.id, { alt: { ...(m.alt ?? {}), [l]: e.target.value } })
                        }
                      />
                    </div>
                  ))}

                  {/* --- Bildausschnitt ------------------------------------ */}
                  <p className="champ-multi__label">{t('medias.ausschnitt')}</p>
                  <p className="champ-multi__aide">{t('medias.ausschnitt_hilfe')}</p>
                  <div className="cadrage">
                    <img
                      src={`${URL_BASE}${m.chemin}`}
                      alt=""
                      width={m.largeur ?? 300}
                      height={m.hauteur ?? 200}
                      onClick={(e) => {
                        const r = e.currentTarget.getBoundingClientRect();
                        void modifier(m.id, {
                          point_x: Math.round(((e.clientX - r.left) / r.width) * 100),
                          point_y: Math.round(((e.clientY - r.top) / r.height) * 100),
                        });
                      }}
                    />
                    <span
                      className="cadrage__point"
                      style={{ left: `${m.point_x}%`, top: `${m.point_y}%` }}
                      aria-hidden="true"
                    />
                  </div>
                  {/* Auch per Tastatur setzbar — ein Klickpunkt allein waere
                      ohne Maus nicht bedienbar. */}
                  <div className="cadrage__champs">
                    <label htmlFor={`px-${m.id}`}>X %</label>
                    <input
                      id={`px-${m.id}`}
                      className="saisie saisie--courte"
                      type="number"
                      min={0}
                      max={100}
                      defaultValue={m.point_x}
                      onBlur={(e) => void modifier(m.id, { point_x: Number(e.target.value) })}
                    />
                    <label htmlFor={`py-${m.id}`}>Y %</label>
                    <input
                      id={`py-${m.id}`}
                      className="saisie saisie--courte"
                      type="number"
                      min={0}
                      max={100}
                      defaultValue={m.point_y}
                      onBlur={(e) => void modifier(m.id, { point_y: Number(e.target.value) })}
                    />
                  </div>

                  <div className="champ-bascule">
                    <input
                      id={`pub-${m.id}`}
                      type="checkbox"
                      checked={m.statut === 'veroeffentlicht'}
                      disabled={absentes.length > 0}
                      onChange={(e) =>
                        void modifier(m.id, {
                          statut: e.target.checked ? 'veroeffentlicht' : 'entwurf',
                        } as Partial<Media>)
                      }
                    />
                    <label htmlFor={`pub-${m.id}`}>
                      {traduire(langueAdmin, 'liste.veroeffentlicht')}
                    </label>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
