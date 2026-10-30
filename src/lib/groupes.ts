/**
 * src/lib/groupes.ts — Die Taetigkeiten in fuenf Bereichen.
 *
 * Dreizehn Taetigkeiten in einer Liste sind auf dem Handy eine lange
 * Strecke. In Bereichen sieht man auf einen Blick, was die Kanzlei macht,
 * und findet sein Anliegen schneller. Die Zuordnung ist Gliederung, keine
 * Aussage: jede Taetigkeit steht mit ihrem Titel von der alten Seite da.
 *
 * Eine neu angelegte Taetigkeit nennt ihren Bereich selbst (`groupe`);
 * eine ohne Bereich landet unter „Autres activités“ und geht nie verloren.
 * Die Namen der Bereiche lassen sich im Redaktionsbereich aendern
 * (`pages.activites.groupes.<id>`).
 */
import type { Lang, Multi } from './langs';
import { activites, contenu, type Activite } from './content';

import { AUTRES, GROUPES } from './groupes-liste';

export { GROUPES };


/** Der Name eines Bereichs: im Redaktionsbereich geaendert oder wie oben. */
export function nomGroupe(id: string): Multi {
  const defaut = GROUPES.find((g) => g.id === id)?.nom ?? AUTRES;
  return { ...defaut, ...(contenu.pages.activites?.groupes?.[id] ?? {}) };
}

/** Der Bereich einer Taetigkeit: selbst gewaehlt, sonst aus der Liste oben. */
export function groupeDe(a: Pick<Activite, 'id' | 'groupe'>): string {
  if (a.groupe && GROUPES.some((g) => g.id === a.groupe)) return a.groupe;
  return GROUPES.find((g) => g.activites.includes(a.id))?.id ?? 'autres';
}

/** Die Bereiche einer Sprache, jeder mit seinen gebauten Taetigkeiten. */
export function groupesAvecActivites(lang: Lang): { id: string; nom: Multi; liste: Activite[] }[] {
  const toutes = activites(lang);
  return [...GROUPES.map((g) => g.id), 'autres']
    .map((id) => {
      // Die feste Reihenfolge innerhalb eines Bereichs, Neues dahinter.
      const fixe = GROUPES.find((g) => g.id === id)?.activites ?? [];
      const rang = (a: Activite) => (fixe.includes(a.id) ? fixe.indexOf(a.id) : fixe.length + a.ordre);
      const liste = toutes.filter((a) => groupeDe(a) === id).sort((a, b) => rang(a) - rang(b));
      return { id, nom: nomGroupe(id), liste };
    })
    .filter((g) => g.liste.length > 0);
}
