/**
 * src/lib/groupes.ts — Die Taetigkeiten in fuenf Bereichen.
 *
 * Dreizehn Taetigkeiten in einer Liste sind auf dem Handy eine lange
 * Strecke. In Bereichen sieht man auf einen Blick, was die Kanzlei macht,
 * und findet sein Anliegen schneller. Die Zuordnung ist Gliederung, keine
 * Aussage: jede Taetigkeit steht mit ihrem Titel von der alten Seite da.
 *
 * Eine Taetigkeit, die hier nicht steht (etwa eine neu angelegte), landet
 * unter „Autres activités“ und geht nie verloren.
 */
import type { Lang, Multi } from './langs';
import { activites, type Activite } from './content';

export interface Groupe {
  id: string;
  nom: Multi;
  activites: string[];
}

export const GROUPES: Groupe[] = [
  {
    id: 'societes',
    nom: { fr: 'Sociétés et finance', en: 'Companies and finance' },
    activites: ['creation-societes', 'domiciliation-societes', 'fusions-acquisitions', 'banque-finance'],
  },
  {
    id: 'patrimoine',
    nom: { fr: 'Patrimoine et successions', en: 'Wealth and inheritance' },
    activites: ['gestion-patrimoine', 'family-office', 'droit-successoral', 'successions-internationales'],
  },
  {
    id: 'immobilier',
    nom: { fr: 'Immobilier', en: 'Real estate' },
    activites: ['investissements-immobiliers', 'habitat-bail'],
  },
  {
    id: 'contentieux',
    nom: { fr: 'Contentieux et recouvrement', en: 'Litigation and debt collection' },
    activites: ['recouvrement-creances', 'assurance-indemnisation'],
  },
  {
    id: 'propriete',
    nom: { fr: 'Propriété intellectuelle', en: 'Intellectual property' },
    activites: ['marques-droits-auteur'],
  },
];

const AUTRES: Multi = { fr: 'Autres activités', en: 'Other activities' };

/** Die Bereiche einer Sprache, jeder mit seinen gebauten Taetigkeiten. */
export function groupesAvecActivites(lang: Lang): { id: string; nom: Multi; liste: Activite[] }[] {
  const toutes = activites(lang);
  const parId = new Map(toutes.map((a) => [a.id, a]));
  const vues = new Set<string>();
  const out = GROUPES.map((g) => {
    const liste = g.activites.map((id) => parId.get(id)).filter((a): a is Activite => Boolean(a));
    liste.forEach((a) => vues.add(a.id));
    return { id: g.id, nom: g.nom, liste };
  }).filter((g) => g.liste.length > 0);
  const reste = toutes.filter((a) => !vues.has(a.id));
  if (reste.length) out.push({ id: 'autres', nom: AUTRES, liste: reste });
  return out;
}

/** Der Bereich einer Taetigkeit — fuer die Brotkrume und die Seitenleiste. */
export function groupeDe(id: string): Groupe | null {
  return GROUPES.find((g) => g.activites.includes(id)) ?? null;
}
