/**
 * src/admin/atelier/FenetreNouveau.tsx — Eine neue Seite anlegen.
 *
 * Nur das Noetigste: Titel, ein kurzer Text, bei Dossiers und Konferenzen
 * Themen und PDF, bei Konferenzen das Datum, bei Taetigkeiten der Bereich.
 * Den Rest schreibt man danach direkt auf der Seite, wie jeden anderen Text.
 */
import { useEffect, useState } from 'react';
import { supabase, televerserDocument } from '../supabase';
import type { LangueAdmin } from '../i18n';
import type { Lang } from '../../lib/langs';
import { AUTRES, GROUPES } from '../../lib/groupes-liste';
import Feuille from '../composants/Feuille';
import { creer, type Sorte } from './nouveau';

const TITRES: Record<Sorte, { de: string; fr: string }> = {
  services: { de: 'Neue Tätigkeit', fr: 'Nouvelle activité' },
  dossier: { de: 'Neues Fachdossier', fr: 'Nouveau dossier thématique' },
  conference: { de: 'Neue Konferenz', fr: 'Nouvelle conférence' },
};

export const NOMS_SORTES = TITRES;

interface Props {
  sorte: Sorte;
  groupe?: string;
  lang: Lang;
  langueAdmin: LangueAdmin;
  onCree: (id: string) => void;
  onFermer: () => void;
}

export default function FenetreNouveau({ sorte, groupe, lang, langueAdmin, onCree, onFermer }: Props) {
  const fr = langueAdmin === 'fr';
  const [titre, setTitre] = useState('');
  const [texte, setTexte] = useState('');
  const [domaine, setDomaine] = useState(groupe ?? GROUPES[0].id);
  const [themes, setThemes] = useState<string[]>([]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [fichier, setFichier] = useState<File | null>(null);
  const [tous, setTous] = useState<Record<string, any>[]>([]);
  const [occupe, setOccupe] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    if (sorte === 'services') return;
    void supabase
      .from('publication_tags')
      .select('*')
      .order('ordre', { ascending: true })
      .then(({ data }) => setTous(data ?? []));
  }, [sorte]);

  async function envoyer(e: React.FormEvent) {
    e.preventDefault();
    if (sorte === 'conference' && !fichier) {
      setErreur(fr ? 'Choisissez le PDF de la conférence.' : 'Bitte das PDF der Konferenz wählen.');
      return;
    }
    setOccupe(true);
    setErreur(null);
    try {
      const pdf = fichier ? await televerserDocument(fichier) : null;
      const id = await creer(sorte, { titre: titre.trim(), texte: texte.trim(), groupe: domaine, themes, date, pdf }, lang);
      onCree(id);
    } catch (err) {
      setErreur(String((err as Error).message ?? err));
      setOccupe(false);
    }
  }

  const etiquetteTexte =
    sorte === 'services'
      ? fr
        ? 'Texte court (sous le titre, dans la liste)'
        : 'Kurztext (unter dem Titel, in der Liste)'
      : fr
        ? `Résumé${sorte === 'conference' ? ' (facultatif)' : ''}`
        : `Kurzfassung${sorte === 'conference' ? ' (freiwillig)' : ''}`;

  return (
    <Feuille titre={TITRES[sorte][langueAdmin]} onFermer={onFermer} fermer={fr ? 'Fermer' : 'Schließen'}>
      <form className="kx-form" onSubmit={envoyer}>
        <label>
          {fr ? 'Titre' : 'Titel'}
          <input required value={titre} onChange={(e) => setTitre(e.target.value)} autoFocus />
        </label>
        <label>
          {etiquetteTexte}
          <textarea
            rows={3}
            required={sorte !== 'conference'}
            value={texte}
            onChange={(e) => setTexte(e.target.value)}
          />
        </label>

        {sorte === 'services' && (
          <label>
            {fr ? 'Domaine' : 'Bereich'}
            <select value={domaine} onChange={(e) => setDomaine(e.target.value)}>
              {[...GROUPES, { id: 'autres', nom: AUTRES }].map((g) => (
                <option key={g.id} value={g.id}>
                  {g.nom.fr}
                </option>
              ))}
            </select>
          </label>
        )}

        {sorte === 'conference' && (
          <label>
            {fr ? 'Date de la conférence' : 'Datum der Konferenz'}
            <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
        )}

        {sorte !== 'services' && tous.length > 0 && (
          <fieldset className="kx-cases">
            <legend>{fr ? 'Thèmes' : 'Themen'}</legend>
            {tous.map((t) => (
              <label key={t.id} className="kx-case">
                <input
                  type="checkbox"
                  checked={themes.includes(t.id)}
                  onChange={(e) =>
                    setThemes((x) => (e.target.checked ? [...x, t.id] : x.filter((y) => y !== t.id)))
                  }
                />
                {t.etiquette?.[lang] || t.etiquette?.fr || t.id}
              </label>
            ))}
          </fieldset>
        )}

        {sorte !== 'services' && (
          <label>
            {sorte === 'conference'
              ? fr
                ? 'PDF de la conférence'
                : 'PDF der Konferenz'
              : fr
                ? 'PDF à télécharger (facultatif)'
                : 'PDF zum Herunterladen (freiwillig)'}
            <input type="file" accept="application/pdf" onChange={(e) => setFichier(e.target.files?.[0] ?? null)} />
          </label>
        )}

        <p className="kx-hint">
          {fr
            ? 'Ensuite, la page s’ouvre : cliquez sur les textes pour les compléter, comme partout ailleurs.'
            : 'Danach öffnet sich die Seite: Texte anklicken und ergänzen, wie überall sonst.'}
        </p>
        {erreur && (
          <p className="kx-err" role="alert">
            {erreur}
          </p>
        )}
        <button className="kx-btn kx-primary kx-block" type="submit" disabled={occupe}>
          {occupe ? (fr ? 'Création…' : 'Wird angelegt …') : fr ? 'Créer la page' : 'Seite anlegen'}
        </button>
      </form>
    </Feuille>
  );
}
