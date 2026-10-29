/**
 * src/admin/supabase.ts — Verbindung zur Datenbank.
 *
 * Benutzt wird ausschliesslich der oeffentliche „anon“-Schluessel. Er ist
 * dafuer gemacht, im Browser zu stehen; geschuetzt wird der Zugriff durch
 * Row Level Security in der Datenbank, nicht durch Geheimhaltung des
 * Schluessels. Der Service-Role-Schluessel kommt hier nie vor.
 *
 * Die Sitzung liegt im localStorage des angemeldeten Rechners, nicht in
 * einem Cookie — und ausschliesslich unter /admin. Die oeffentliche Seite
 * legt auf dem Geraet des Besuchers nichts ab und braucht deshalb kein
 * Cookie-Banner.
 */
import { createClient } from '@supabase/supabase-js';

/**
 * Leer zaehlt wie nicht gesetzt.
 *
 * In GitHub Actions wird ein fehlendes Secret als LEERE Zeichenkette
 * eingesetzt, nicht als `undefined` — `??` greift dann nicht, und
 * `createClient('')` wirft beim Laden des Moduls. Die Folge war eine
 * vollstaendig weisse Seite unter /admin statt der Meldung, dass die
 * Verbindung nicht eingerichtet ist. Deshalb `||` und nicht `??`.
 */
const url = import.meta.env.PUBLIC_SUPABASE_URL || '';
const cle = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || '';

export const configuré = Boolean(url && cle);

export const supabase = createClient(url || 'http://localhost', cle || 'anon', {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
    storageKey: 'lw-legis-admin',
    flowType: 'pkce',
  },
});

/** Zeigt die Seite auf die oertliche Supabase-Instanz (Probedaten)? */
export const estLocal = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?(\/|$)/.test(url);

/**
 * Verlangt die Anmeldung einen zweiten Faktor?
 *
 * Gegen die oertliche Supabase-Instanz nicht: Dort liegen nur Probedaten,
 * und der QR-Code stoert beim Ausprobieren mehr, als er schuetzt. Sobald
 * die Seite auf ein echtes Projekt zeigt, ist er Pflicht — im Betrieb
 * ohnehin, aber auch, wenn jemand oertlich gegen die echte Datenbank
 * arbeitet.
 */
export const facteurObligatoire = !estLocal;

export type Role = 'owner' | 'editor';

export interface Profil {
  id: string;
  nom: string;
  role: Role;
  langue_admin: 'de' | 'fr';
}

/**
 * Die erreichte Sicherungsstufe der Sitzung.
 *
 *   'aal1' — nur Passwort
 *   'aal2' — Passwort UND zweiter Faktor
 *
 * Der Redaktionsbereich verlangt aal2. Ohne diese Abfrage genuegte das
 * Passwort: Sobald die Anmeldung gelingt, meldet Supabase einen
 * Sitzungswechsel, die Anwendung laedt das Profil und zeigt die
 * Oberflaeche — der zweite Faktor kaeme nie zum Zug. Genau das ist beim
 * Pruefen passiert.
 */
export async function niveauSecurite(): Promise<'aal1' | 'aal2' | null> {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  if (error || !data) return 'aal1';
  return (data.currentLevel as 'aal1' | 'aal2') ?? 'aal1';
}

export async function chargerProfil(): Promise<Profil | null> {
  const { data: session } = await supabase.auth.getUser();
  if (!session?.user) return null;
  const { data } = await supabase
    .from('profiles')
    .select('id, nom, role, langue_admin')
    .eq('id', session.user.id)
    .single();
  return (data as Profil) ?? null;
}

/** Ruft eine Edge Function mit dem Token des angemeldeten Kontos auf. */
export async function appelerFonction<T>(nom: string, corps: unknown = {}): Promise<T> {
  const { data } = await supabase.auth.getSession();
  const jeton = data.session?.access_token;
  const reponse = await fetch(`${url}/functions/v1/${nom}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jeton ?? ''}`,
      apikey: cle ?? '',
    },
    body: JSON.stringify(corps),
  });
  if (!reponse.ok) {
    const texte = await reponse.text();
    throw new Error(`${nom}: ${reponse.status} ${texte}`);
  }
  return (await reponse.json()) as T;
}
