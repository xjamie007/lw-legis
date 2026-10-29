/**
 * src/admin/atelier/modifications.ts — Was seit dem letzten Veroeffentlichen
 * geaendert wurde.
 *
 * „Veroeffentlicht“ ist der Stand, aus dem die Website zuletzt gebaut
 * wurde: der Zeitpunkt `meta.genere_le` aus content/snapshot.json. Jede
 * Zeile, die seitdem gespeichert wurde, ist geaendert. Wie sie VORHER
 * aussah, steht in `revisions`: Der Trigger `journaliser` sichert dort vor
 * jedem Speichern die Vorfassung. Die erste Vorfassung nach dem Stichtag
 * ist also genau das, was gerade online steht.
 *
 * Verglichen wird Feld fuer Feld und Sprache fuer Sprache. Wer einen Text
 * aendert und wieder zurueckaendert, sieht hier nichts mehr — richtig so,
 * denn online wuerde sich dann auch nichts aendern.
 */
import { supabase } from '../supabase';
import { colonneCle, differences, lire, poser } from './chemins';

type Ligne = Record<string, any>;

export interface Modification {
  table: string;
  id: string;
  /** Weg zum geaenderten Wert, mit Sprache am Ende, wo es eine gibt. */
  chemin: string[];
  avant: unknown;
  apres: unknown;
  /** Die Zeile, wie sie jetzt in der Datenbank steht. */
  ligne: Ligne;
  /** Seit dem letzten Veroeffentlichen neu angelegt. */
  nouveau: boolean;
  quand: string;
}

/** Die Tabellen, deren Inhalt auf der Website erscheint. */
const TABLES = [
  'settings',
  'sections',
  'services',
  'faq',
  'publications',
  'publication_tags',
  'situations',
  'team',
  'legal_pages',
  'seo_meta',
  // Bilder erscheinen nicht als Text in der Vorschau, gehoeren aber
  // genauso dazu: Wer nur ein Bild tauscht, braucht den Knopf auch.
  'media',
];

export async function chargerModifications(stand: string): Promise<Modification[]> {
  const parTable = await Promise.all(
    TABLES.map(async (table) => {
      const { data } = await supabase.from(table).select('*').gt('updated_at', stand);
      return (data ?? []).map((ligne: Ligne) => ({ table, ligne }));
    }),
  );

  const resultats = await Promise.all(
    parTable.flat().map(async ({ table, ligne }) => {
      const id = String(ligne[colonneCle(table)]);
      const { data: vorher } = await supabase
        .from('revisions')
        .select('donnees')
        .eq('table_nom', table)
        .eq('enregistrement_id', id)
        .gt('ecrit_le', stand)
        .order('ecrit_le', { ascending: true })
        .limit(1)
        .maybeSingle();

      const base = { table, id, ligne, quand: ligne.updated_at as string };
      if (!vorher) {
        // Keine Vorfassung nach dem Stichtag: die Zeile ist neu.
        return [{ ...base, chemin: [], avant: null, apres: null, nouveau: true }];
      }
      return differences(vorher.donnees, ligne).map((d) => ({ ...base, ...d, nouveau: false }));
    }),
  );

  return resultats.flat().sort((a, b) => b.quand.localeCompare(a.quand));
}

/**
 * Setzt EINEN geaenderten Wert auf den veroeffentlichten Stand zurueck.
 * Die uebrigen Aenderungen derselben Zeile bleiben stehen.
 */
export async function annulerModification(m: Modification): Promise<string | null> {
  const col = colonneCle(m.table);
  const { data: frais, error: erreurLecture } = await supabase
    .from(m.table)
    .select('*')
    .eq(col, m.id)
    .single();
  if (erreurLecture || !frais) return erreurLecture?.message ?? 'nicht gefunden';

  const [colonne] = m.chemin;
  const suivant = poser(frais, m.chemin, m.avant);
  const { error } = await supabase
    .from(m.table)
    .update({ [colonne]: lire(suivant, [colonne]) })
    .eq(col, m.id);
  return error?.message ?? null;
}
