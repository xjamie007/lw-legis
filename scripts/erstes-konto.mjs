/**
 * scripts/erstes-konto.mjs — Das erste Redaktionskonto anlegen.
 *
 * Die Website hat bewusst KEINE oeffentliche Registrierung: Konten
 * entstehen nur per Einladung. Damit gibt es aber ein Henne-Ei-Problem —
 * das allererste Konto kann niemand einladen. Dieses Skript loest das.
 *
 * Es legt ein Konto in der Anmeldung an und dazu die passende Zeile in
 * `profiles` mit der Rolle. Beides zusammen ergibt erst ein Konto, mit
 * dem man sich im Redaktionsbereich anmelden kann.
 *
 * Aufruf:
 *   node scripts/erstes-konto.mjs <e-mail> <passwort> [owner|editor] [name]
 *
 * Beispiel:
 *   node scripts/erstes-konto.mjs lorang@example.lu 'EinLangesPasswort!' owner 'Alain Lorang'
 *
 * Gelesen werden PUBLIC_SUPABASE_URL und SUPABASE_SERVICE_ROLE_KEY aus der
 * Umgebung oder aus .env. Der Service-Role-Schluessel umgeht die
 * Zugriffsregeln — deshalb laeuft dieses Skript auf dem Rechner und
 * niemals im Browser.
 */
import { ladeEnv } from './env.mjs';

await ladeEnv();

const [courriel, motDePasse, role = 'owner', ...nomTeile] = process.argv.slice(2);
const nom = nomTeile.join(' ') || courriel?.split('@')[0] || '';

if (!courriel || !motDePasse) {
  console.error(
    'So wird es aufgerufen:\n' +
      "  node scripts/erstes-konto.mjs <e-mail> <passwort> [owner|editor] [name]\n\n" +
      'Beispiel:\n' +
      "  node scripts/erstes-konto.mjs lorang@example.lu 'EinLangesPasswort!' owner 'Alain Lorang'",
  );
  process.exit(1);
}
if (!['owner', 'editor'].includes(role)) {
  console.error(`Unbekannte Rolle "${role}". Erlaubt sind owner und editor.`);
  process.exit(1);
}
if (motDePasse.length < 10) {
  console.error('Das Passwort ist zu kurz. Mindestens zehn Zeichen — es schützt die Mandantendaten.');
  process.exit(1);
}

const URL_SB = process.env.PUBLIC_SUPABASE_URL;
const CLE = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_SB || !CLE) {
  console.error(
    'PUBLIC_SUPABASE_URL oder SUPABASE_SERVICE_ROLE_KEY fehlen.\n' +
      'Beide stehen in .env (siehe .env.example) oder kommen aus der Umgebung.',
  );
  process.exit(1);
}

const kopf = {
  apikey: CLE,
  Authorization: `Bearer ${CLE}`,
  'Content-Type': 'application/json',
};

// --- 1. Konto in der Anmeldung -------------------------------------------
let benutzerId;
const anlegen = await fetch(`${URL_SB}/auth/v1/admin/users`, {
  method: 'POST',
  headers: kopf,
  body: JSON.stringify({
    email: courriel,
    password: motDePasse,
    // Oertlich gibt es keinen Postversand: die Adresse gilt sofort.
    email_confirm: true,
  }),
});

if (anlegen.ok) {
  benutzerId = (await anlegen.json()).id;
  console.log(`Konto angelegt: ${courriel}`);
} else {
  const fehler = await anlegen.text();
  if (!/already been registered|already exists/i.test(fehler)) {
    console.error(`Das Konto konnte nicht angelegt werden:\n  ${fehler}`);
    process.exit(1);
  }
  // Schon vorhanden: Kennung heraussuchen und Passwort neu setzen.
  const liste = await fetch(`${URL_SB}/auth/v1/admin/users?per_page=200`, { headers: kopf });
  const { users } = await liste.json();
  const vorhanden = users.find((u) => u.email?.toLowerCase() === courriel.toLowerCase());
  if (!vorhanden) {
    console.error('Das Konto gibt es angeblich schon, ist aber nicht auffindbar.');
    process.exit(1);
  }
  benutzerId = vorhanden.id;
  await fetch(`${URL_SB}/auth/v1/admin/users/${benutzerId}`, {
    method: 'PUT',
    headers: kopf,
    body: JSON.stringify({ password: motDePasse }),
  });
  console.log(`Konto bestand bereits: ${courriel} — Passwort neu gesetzt.`);
}

// --- 2. Profil mit der Rolle ---------------------------------------------
// Ohne diese Zeile kommt man zwar durch die Anmeldung, aber nicht in den
// Redaktionsbereich: Alle Zugriffsregeln haengen an der Rolle im Profil.
const profil = await fetch(`${URL_SB}/rest/v1/profiles`, {
  method: 'POST',
  headers: { ...kopf, Prefer: 'resolution=merge-duplicates,return=representation' },
  body: JSON.stringify({ id: benutzerId, nom, role, langue_admin: 'de' }),
});

if (!profil.ok) {
  console.error(`Das Profil konnte nicht angelegt werden:\n  ${await profil.text()}`);
  process.exit(1);
}

console.log(`Profil angelegt: ${nom || '(ohne Namen)'}, Rolle ${role}`);
console.log('');
console.log('Jetzt anmelden:');
console.log('  1. npm run dev');
console.log('  2. http://localhost:4321/admin aufrufen');
console.log(`  3. ${courriel} und das gesetzte Passwort eingeben`);
// Gegen die oertliche Datenbank verlangt der Redaktionsbereich keinen
// zweiten Faktor (siehe facteurObligatoire in src/admin/supabase.ts).
if (!/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?(\/|$)/.test(URL_SB)) {
  console.log('  4. Der zweite Faktor wird beim ersten Mal eingerichtet:');
  console.log('     QR-Code mit einer Authenticator-App scannen, dann den');
  console.log('     sechsstelligen Code eintragen. Ohne ihn geht es nicht weiter.');
}
