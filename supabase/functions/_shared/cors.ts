/**
 * supabase/functions/_shared/cors.ts
 *
 * Die Edge Functions werden von der statischen Website aus aufgerufen, die
 * unter einer anderen Herkunft liegt. Erlaubt werden nur die Herkuenfte,
 * die in ERLAUBTE_HERKUENFTE stehen — nicht `*`, weil das Formular sonst
 * von jeder beliebigen Seite aus bedient werden koennte.
 */
const ERLAUBTE_HERKUENFTE = (Deno.env.get('ALLOWED_ORIGINS') ?? '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

export function corsHeaders(origin: string | null): Record<string, string> {
  const erlaubt =
    origin && (ERLAUBTE_HERKUENFTE.includes(origin) || ERLAUBTE_HERKUENFTE.length === 0)
      ? origin
      : (ERLAUBTE_HERKUENFTE[0] ?? '');
  return {
    'Access-Control-Allow-Origin': erlaubt,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, accept',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    Vary: 'Origin',
  };
}

export function preflight(req: Request): Response | null {
  if (req.method !== 'OPTIONS') return null;
  return new Response(null, { status: 204, headers: corsHeaders(req.headers.get('origin')) });
}
