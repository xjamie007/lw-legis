/**
 * supabase/functions/publish/index.ts
 *
 * Der Knopf „Veroeffentlichen“ im Redaktionsbereich ruft diese Funktion
 * auf. Sie loest per `repository_dispatch` den Build in GitHub Actions
 * aus, der die Inhalte holt, die Seite baut und ausliefert.
 *
 * Warum der Umweg ueber GitHub statt eines direkten Deploys:
 * Das GitHub-Token bleibt auf dem Server. Laege es im Browser, haette
 * jeder angemeldete Redakteur Schreibrechte auf das Repository.
 *
 * Aufrufen darf das nur, wer angemeldet und Redakteur ist — geprueft wird
 * das Token des Aufrufers, nicht bloss seine Behauptung.
 */
import { createClient } from 'jsr:@supabase/supabase-js@2';
import { corsHeaders, preflight } from '../_shared/cors.ts';

Deno.serve(async (req) => {
  const vol = preflight(req);
  if (vol) return vol;

  const entetes = { ...corsHeaders(req.headers.get('origin')), 'Content-Type': 'application/json' };
  const repondre = (statut: number, corps: Record<string, unknown>) =>
    new Response(JSON.stringify(corps), { status: statut, headers: entetes });

  if (req.method !== 'POST') return repondre(405, { erreur: 'methode' });

  // --- Wer ruft an? -------------------------------------------------------
  const jeton = (req.headers.get('authorization') ?? '').replace(/^Bearer\s+/i, '');
  if (!jeton) return repondre(401, { erreur: 'nicht angemeldet' });

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    { auth: { persistSession: false } },
  );

  const { data: utilisateur, error: erreurAuth } = await supabase.auth.getUser(jeton);
  if (erreurAuth || !utilisateur?.user) {
    return repondre(401, { erreur: 'nicht angemeldet' });
  }

  const { data: profil } = await supabase
    .from('profiles')
    .select('role, nom')
    .eq('id', utilisateur.user.id)
    .single();

  if (!profil || !['owner', 'editor'].includes(profil.role)) {
    return repondre(403, { erreur: 'nicht berechtigt' });
  }

  // --- Vorschau oder wirklich veroeffentlichen? ---------------------------
  let corps: { apercu?: boolean } = {};
  try {
    corps = await req.json();
  } catch {
    corps = {};
  }
  const apercu = corps.apercu === true;

  // --- Build ausloesen ----------------------------------------------------
  const depot = Deno.env.get('GITHUB_REPOSITORY');
  const token = Deno.env.get('GITHUB_DISPATCH_TOKEN');
  if (!depot || !token) {
    return repondre(500, { erreur: 'GITHUB_REPOSITORY oder GITHUB_DISPATCH_TOKEN fehlt' });
  }

  const reponse = await fetch(`https://api.github.com/repos/${depot}/dispatches`, {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      event_type: apercu ? 'apercu' : 'publier',
      client_payload: {
        declenche_par: profil.nom || utilisateur.user.email,
        quand: new Date().toISOString(),
      },
    }),
  });

  if (!reponse.ok) {
    const texte = await reponse.text();
    console.error('repository_dispatch:', reponse.status, texte);
    return repondre(502, { erreur: 'GitHub hat abgelehnt', statut: reponse.status });
  }

  return repondre(202, {
    ok: true,
    apercu,
    // Damit der Redaktionsbereich im Klartext anzeigen kann, seit wann.
    demarre: new Date().toISOString(),
  });
});
