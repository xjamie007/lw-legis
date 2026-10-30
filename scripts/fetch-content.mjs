/**
 * scripts/fetch-content.mjs
 *
 * Holt die Inhalte aus Supabase und schreibt sie nach
 * content/snapshot.json. Astro liest ausschliesslich diese Datei; die
 * oeffentliche Seite stellt zur Laufzeit keine einzige Datenbankabfrage.
 *
 * WENN SUPABASE NICHT ERREICHBAR IST, BRICHT NICHTS AB.
 * Dann bleibt der zuletzt geschriebene Schnappschuss stehen und der Build
 * laeuft damit durch. Eine Website, die sich nicht mehr bauen laesst,
 * weil ein Dienst gerade klemmt, ist schlimmer als eine, die kurz einen
 * Tag alt ist. Der Vorgang sagt im Klartext, was passiert ist.
 *
 * Gelesen wird mit dem Service-Role-Schluessel, der RLS umgeht. Er steht
 * ausschliesslich als Repository-Secret in GitHub Actions und taucht
 * niemals im ausgelieferten HTML oder JavaScript auf.
 */
import { readFile, writeFile, stat } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ladeEnv } from './env.mjs';

await ladeEnv();

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CIBLE = join(ROOT, 'content', 'snapshot.json');

/**
 * Vorschau-Modus: Entwuerfe werden wie Veroeffentlichtes behandelt, damit
 * Me Lorang sieht, wie ein Text aussieht, BEVOR er ihn freigibt.
 * Gesetzt wird das nur vom Vorschau-Lauf in GitHub Actions; die Vorschau
 * liegt unter einer eigenen Adresse, traegt noindex und hat keine Sitemap.
 */
const APERCU = process.env.APERCU === '1';
const publierLesBrouillons = APERCU;

const URL_SUPABASE = process.env.PUBLIC_SUPABASE_URL;
const CLE = process.env.SUPABASE_SERVICE_ROLE_KEY;

/** Ohne Zugangsdaten wird gar nicht erst versucht. */
if (!URL_SUPABASE || !CLE) {
  console.log(
    'Inhalte: keine Supabase-Zugangsdaten gesetzt.\n' +
      '  Gebaut wird aus dem vorhandenen content/snapshot.json.\n' +
      '  Das ist der richtige Zustand fuer einen Build ohne Datenbank.',
  );
  process.exit(0);
}

async function table(nom, colonnes = '*') {
  const url = `${URL_SUPABASE}/rest/v1/${nom}?select=${encodeURIComponent(colonnes)}`;
  const reponse = await fetch(url, {
    headers: {
      apikey: CLE,
      Authorization: `Bearer ${CLE}`,
      Accept: 'application/json',
    },
    signal: AbortSignal.timeout(20_000),
  });
  if (!reponse.ok) {
    throw new Error(`${nom}: ${reponse.status} ${await reponse.text()}`);
  }
  return reponse.json();
}

/** Aus den flachen Datenbankzeilen die Form bauen, die Astro erwartet. */
function assembler(brut, ancien) {
  const parId = (liste) => Object.fromEntries(liste.map((l) => [l.id, l]));
  // `settings` ist ueber `cle` geschluesselt, nicht ueber `id`.
  const reglages = Object.fromEntries((brut.settings ?? []).map((l) => [l.cle, l]));

  return {
    meta: {
      genere_le: new Date().toISOString(),
      source: 'supabase',
      version: 1,
    },
    ouvertes: ancien.ouvertes ?? {},
    /**
     * Die Bildplaetze stehen ebenfalls im Repository, nicht in der
     * Datenbank: Sie beschreiben, WO ein Bild hingehoert und in welchem
     * Zuschnitt — das ist Gestaltung, keine Redaktion. Die Bilder selbst
     * tauscht der Redaktionsbereich ueber die Ablage aus.
     *
     * Ohne diese Zeile fiel der ganze Abschnitt beim Holen aus Supabase
     * weg, und die Seite baute ohne Portraet und ohne Bueroaufnahmen.
     */
    bilder: ancien.bilder,
    settings: reglages.stammdaten?.valeur ?? ancien.settings,
    navigation: (brut.navigation ?? [])
      .filter((n) => n.emplacement === 'principale')
      .map((n) => ({ id: n.id, cle: n.cle_i18n, segment: n.segment, ordre: n.ordre, visible: n.visible })),
    pied: (brut.navigation ?? [])
      .filter((n) => n.emplacement === 'pied')
      .map((n) => ({ id: n.id, cle: n.cle_i18n, segment: n.segment, ordre: n.ordre, visible: n.visible })),
    pages: reglages.pages?.valeur ?? ancien.pages,
    familles: (brut.services ?? [])
      .filter((s) => publierLesBrouillons || s.statut === 'veroeffentlicht')
      .map((s) => ({
        id: s.id,
        ordre: s.ordre,
        slug: s.slug,
        terme: s.terme,
        definition: s.definition,
        texte: s.texte,
        kurz: s.kurz,
        marge: { terme: s.marge_terme, texte: s.marge_texte },
        matieres: s.matieres,
        groupe: s.groupe ?? null,
      })),
    themes: brut.publication_tags ?? [],
    publications: (brut.publications ?? []).map((p) => ({
      ...p,
      statut: publierLesBrouillons || p.statut === 'veroeffentlicht' ? 'publie' : 'entwurf',
      pdf: p.pdf_chemin ? { chemin: p.pdf_chemin, octets: p.pdf_octets ?? 0 } : null,
    })),
    team: (brut.team ?? []).map((m) => ({
      ...m,
      statut: publierLesBrouillons || m.statut === 'veroeffentlicht' ? 'publie' : 'entwurf',
    })),
    legal: parId(brut.legal_pages ?? []),
    seo: parId(brut.seo_meta ?? []),
    seo_modeles: ancien.seo_modeles,
    seo_limites: ancien.seo_limites,
    libelles: reglages.libelles?.valeur ?? {},
  };
}

async function main() {
  const ancien = JSON.parse(await readFile(CIBLE, 'utf8'));

  const [settings, navigation, services, publication_tags, publications, team, legal_pages, seo_meta] =
    await Promise.all([
      table('settings'),
      table('navigation'),
      table('services'),
      table('publication_tags'),
      table('publications'),
      table('team'),
      table('legal_pages'),
      table('seo_meta'),
    ]);

  const suivant = assembler(
    { settings, navigation, services, publication_tags, publications, team, legal_pages, seo_meta },
    ancien,
  );

  // Notbremse: kaeme aus der Datenbank fast nichts zurueck, waere ein
  // Fehler wahrscheinlicher als eine geleerte Kanzleiwebsite. Dann bleibt
  // der alte Schnappschuss stehen.
  const abschnitteFehlen = ['ouvertes', 'bilder', 'pages', 'seo_modeles'].filter(
    (k) => suivant[k] == null,
  );
  if (abschnitteFehlen.length > 0) {
    throw new Error(
      `Im zusammengesetzten Schnappschuss fehlen: ${abschnitteFehlen.join(', ')}. ` +
        'Das sieht nach einem Fehler im Zusammensetzen aus, nicht nach einer Aenderung.',
    );
  }

  if ((suivant.familles?.length ?? 0) === 0 && (ancien.familles?.length ?? 0) > 0) {
    throw new Error(
      'Supabase lieferte keine Taetigkeiten. Das sieht nach einem Fehler aus, ' +
        'nicht nach einer Aenderung. Der vorhandene Schnappschuss bleibt stehen.',
    );
  }

  await writeFile(CIBLE, JSON.stringify(suivant, null, 2) + '\n', 'utf8');
  console.log(
    `Inhalte aus Supabase geholt.\n` +
      `  ${suivant.familles.length} Tätigkeiten\n` +
      `  ${suivant.publications.length} Dossiers und Konferenzen\n` +
      `  ${suivant.team.length} Anwälte\n` +
      `  content/snapshot.json aktualisiert`,
  );
}

main().catch(async (err) => {
  const info = await stat(CIBLE).catch(() => null);
  console.warn('');
  console.warn('Supabase war nicht erreichbar oder hat abgelehnt:');
  console.warn(`  ${err.message}`);
  if (info) {
    console.warn(
      `\nGebaut wird aus dem vorhandenen Schnappschuss vom ${info.mtime.toLocaleString('de-DE')}.\n` +
        `Der Build laeuft weiter — die Seite geht davon nicht offline.`,
    );
    process.exit(0);
  }
  console.error('\nEs gibt auch keinen Schnappschuss. Der Build kann nicht fortfahren.');
  process.exit(1);
});
