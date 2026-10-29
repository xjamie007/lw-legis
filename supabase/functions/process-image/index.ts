/**
 * supabase/functions/process-image/index.ts
 *
 * Wird nach dem Hochladen eines Bildes aufgerufen. Erzeugt AVIF und WebP
 * in den festgelegten Breiten, liest die echten Masse aus und traegt
 * beides in `media` ein.
 *
 * Die echten Masse sind wichtig: mit ihnen stehen `width` und `height` im
 * Markup, und beim Laden springt nichts (CLS).
 *
 * Der Alt-Text wird hier NICHT gesetzt. Er muss in allen vier Sprachen von
 * Hand kommen, und der Trigger `media_garde` laesst ein Bild ohne ihn
 * nicht auf „veroeffentlicht“.
 */
import { createClient } from 'jsr:@supabase/supabase-js@2';
import { ImageMagick, initialize, MagickFormat } from 'jsr:@imagemagick/magick-wasm@0.0.35';
import { corsHeaders, preflight } from '../_shared/cors.ts';

await initialize();

/** Breiten, in denen jedes Bild vorliegt. */
const LARGEURS = [480, 768, 1200, 1800];

Deno.serve(async (req) => {
  const vol = preflight(req);
  if (vol) return vol;

  const entetes = { ...corsHeaders(req.headers.get('origin')), 'Content-Type': 'application/json' };
  const repondre = (statut: number, corps: Record<string, unknown>) =>
    new Response(JSON.stringify(corps), { status: statut, headers: entetes });

  if (req.method !== 'POST') return repondre(405, { erreur: 'methode' });

  const jeton = (req.headers.get('authorization') ?? '').replace(/^Bearer\s+/i, '');
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    { auth: { persistSession: false } },
  );
  const { data: u } = await supabase.auth.getUser(jeton);
  if (!u?.user) return repondre(401, { erreur: 'nicht angemeldet' });

  const { chemin, media_id } = (await req.json()) as { chemin: string; media_id: string };
  if (!chemin || !media_id) return repondre(400, { erreur: 'chemin oder media_id fehlt' });

  const { data: fichier, error } = await supabase.storage.from('media').download(chemin);
  if (error || !fichier) return repondre(404, { erreur: 'Datei nicht gefunden' });

  const octets = new Uint8Array(await fichier.arrayBuffer());
  const variantes: { format: string; largeur: number; chemin: string; octets: number }[] = [];
  let largeurOrigine = 0;
  let hauteurOrigine = 0;

  await new Promise<void>((resolve) => {
    ImageMagick.read(octets, (image) => {
      largeurOrigine = image.width;
      hauteurOrigine = image.height;
      resolve();
    });
  });

  const base = chemin.replace(/\.[^.]+$/, '');

  for (const largeur of LARGEURS) {
    // Kein Hochrechnen: ein 800 Pixel breites Foto wird nicht auf 1800
    // aufgeblasen, das kostet nur Bytes.
    if (largeur > largeurOrigine) continue;

    for (const [format, extension, typeMime] of [
      [MagickFormat.Avif, 'avif', 'image/avif'],
      [MagickFormat.WebP, 'webp', 'image/webp'],
    ] as const) {
      const sortie = await new Promise<Uint8Array>((resolve) => {
        ImageMagick.read(octets, (image) => {
          const hauteur = Math.round((largeur / largeurOrigine) * hauteurOrigine);
          image.resize(largeur, hauteur);
          image.quality = format === MagickFormat.Avif ? 55 : 72;
          image.write(format, (donnees) => resolve(new Uint8Array(donnees)));
        });
      });

      const cheminVariante = `${base}-${largeur}.${extension}`;
      const { error: erreurTeleversement } = await supabase.storage
        .from('media')
        .upload(cheminVariante, sortie, { contentType: typeMime, upsert: true });

      if (!erreurTeleversement) {
        variantes.push({
          format: extension,
          largeur,
          chemin: cheminVariante,
          octets: sortie.byteLength,
        });
      }
    }
  }

  await supabase
    .from('media')
    .update({
      largeur: largeurOrigine,
      hauteur: hauteurOrigine,
      variantes,
    })
    .eq('id', media_id);

  return repondre(200, {
    ok: true,
    largeur: largeurOrigine,
    hauteur: hauteurOrigine,
    variantes: variantes.length,
  });
});
