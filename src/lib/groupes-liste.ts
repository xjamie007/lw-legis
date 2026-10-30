/**
 * src/lib/groupes-liste.ts — Die fuenf Bereiche der Taetigkeiten, ohne
 * Inhalte. Eigene Datei, damit der Redaktionsbereich die Bereiche kennt,
 * ohne den ganzen Schnappschuss in sein Bundle zu ziehen.
 */
import type { Multi } from './langs';

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

export const AUTRES: Multi = { fr: 'Autres activités', en: 'Other activities' };
