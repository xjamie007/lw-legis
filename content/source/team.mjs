/**
 * content/source/team.mjs — Teammitglieder.
 *
 * Die Liste ist leer, und das ist Absicht. Die englische Fassung der alten
 * Seite nennt zehn Mitarbeiter; Namen, Funktionen, Zulassungsjahre,
 * Sprachen und Fotos liegen nicht vor und werden nicht erfunden.
 *
 * Die Sektion ist technisch fertig und funktioniert mit einer Person
 * genauso wie mit zehn — die Anzahl steckt in den Daten, nicht im Code.
 * Sobald ein Datensatz angelegt ist, erscheint die Sektion von selbst.
 *
 * Felder eines Mitglieds:
 *   id, nom, fonction {Multi}, barreau_depuis, langues [], photo, ordre,
 *   statut ('entwurf' | 'publie')
 */
export const TEAM = [];

/** Die Felder, die fuer eine Veroeffentlichung belegt sein muessen. */
export const CHAMPS_REQUIS = ['nom', 'fonction'];
