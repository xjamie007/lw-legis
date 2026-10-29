/**
 * scripts/env.mjs — .env einlesen.
 *
 * Node laedt `.env` nicht von selbst, und Astro tut es nur fuer den
 * eigenen Lauf. Die Build- und Wartungsskripte laufen ausserhalb davon —
 * ohne dieses Modul sehen sie die Zugangsdaten nicht und bauen still aus
 * dem alten Schnappschuss weiter. Genau das ist beim Pruefen passiert:
 * Die Datenbank lief, aber `npm run content:pull` meldete „keine
 * Zugangsdaten gesetzt“.
 *
 * Werte, die bereits in der Umgebung stehen, haben Vorrang — in GitHub
 * Actions kommen sie von dort und es gibt gar keine .env.
 */
import { readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

export async function ladeEnv(datei = '.env') {
  let roh;
  try {
    roh = await readFile(join(ROOT, datei), 'utf8');
  } catch {
    return false; // keine .env — im Betrieb der Normalfall
  }
  for (const zeile of roh.split('\n')) {
    const t = zeile.trim();
    if (!t || t.startsWith('#')) continue;
    const i = t.indexOf('=');
    if (i < 1) continue;
    const schluessel = t.slice(0, i).trim();
    const wert = t
      .slice(i + 1)
      .trim()
      .replace(/^["']|["']$/g, '');
    if (!(schluessel in process.env)) process.env[schluessel] = wert;
  }
  return true;
}
