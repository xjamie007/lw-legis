/**
 * src/lib/edition.ts — Anklickbare Texte fuer den Redaktionsbereich.
 *
 * Der Redaktionsbereich zeigt die echte Website in einer Vorschau. Klickt
 * man dort auf einen Text, oeffnet sich daneben das Eingabefeld. Damit er
 * weiss, WELCHER Datensatz hinter einem Text steht, traegt das Element ein
 * Attribut:
 *
 *   data-lw="<tabelle>|<schluessel>|<pfad>"
 *
 *   tabelle     Tabelle in Supabase (services, faq, settings …)
 *   schluessel  id der Zeile — bei `settings` die Spalte `cle`
 *   pfad        Spalte und, bei jsonb, der Weg hinein, mit Punkten:
 *               valeur.accueil.sections.services.titre
 *
 * Zeigt der Pfad auf ein mehrsprachiges Feld, bearbeitet der Redakteur
 * die Sprache der Seite, die er gerade ansieht. `data-lw-html` sagt, dass
 * das Feld Auszeichnung enthaelt (Absaetze, Listen, Links) und mit dem
 * Fliesstexteditor bearbeitet wird.
 *
 * Nur Elemente, deren Inhalt GENAU dieses eine Feld ist, bekommen die
 * Markierung — sonst koennte die Vorschau den Text beim Tippen nicht
 * ersetzen, ohne Umliegendes zu zerstoeren.
 *
 * Die Attribute stehen auch im ausgelieferten HTML. Sie verraten nichts,
 * was nicht ohnehin auf der Seite steht, und die Datenbank schuetzt sich
 * ueber ihre Zugriffsregeln selbst.
 */

export interface Edition {
  'data-lw': string;
  'data-lw-html'?: '';
}

export function ed(table: string, cle: string, chemin: string, html = false): Edition {
  const attr: Edition = { 'data-lw': `${table}|${cle}|${chemin}` };
  if (html) attr['data-lw-html'] = '';
  return attr;
}

/** Seitentexte — liegen als ein jsonb-Block in `settings`, Zeile `pages`. */
export const edPage = (chemin: string, html = false) =>
  ed('settings', 'pages', `valeur.${chemin}`, html);

/** Ein fester Text der Oberflaeche (src/lib/i18n.ts), `settings`, Zeile `libelles`. */
export const edLibelle = (cle: string) => ed('settings', 'libelles', `valeur.${cle}`);

/** Angaben zur Person — `settings`, Zeile `avocat`. Nur der Inhaber. */
export const edAvocat = (chemin: string, html = false) =>
  ed('settings', 'avocat', `valeur.${chemin}`, html);

/** Ein Taetigkeitsgebiet. `marge.terme` heisst in der Datenbank `marge_terme`. */
export const edFamille = (id: string | undefined, champ: string) =>
  id ? ed('services', id, champ.replace('marge.', 'marge_')) : undefined;
