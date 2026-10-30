/**
 * src/admin/demo.ts — Der Redaktionsbereich ohne Datenbank, zum Vorfuehren.
 *
 * Wie bei den Demos fuer Krombach und DRP: Anmelden mit festem
 * Benutzernamen und Passwort, alles Gespeicherte bleibt in DIESEM Browser
 * (localStorage). Kein echter Schutz — das Passwort steht nur als
 * SHA-256-Pruefsumme im Code, aber wer will, kommt auch so an die Daten.
 * Fuer den Betrieb ist Supabase da (supabase.ts); diese Datei wird nur
 * benutzt, wenn beim Bauen PUBLIC_DEMO=1 gesetzt ist.
 *
 * Nachgebildet ist genau der Teil der Supabase-Schnittstelle, den der
 * Redaktionsbereich benutzt: from().select/eq/gt/in/order/limit/single/
 * maybeSingle/update/insert, auth (Anmelden, Sitzung, Abmelden) und
 * rpc('restaurer'). Wie die echte Datenbank legt jedes Aendern eine
 * Vorfassung in `revisions` ab — so funktionieren „Ihre Änderungen“ und
 * „Zurücknehmen“ auch in der Demo.
 *
 * Die Startinhalte (dieselben wie auf der Website) liegen als JSON in der
 * Seite /admin (siehe src/pages/admin/index.astro).
 */

type Ligne = Record<string, any>;
type Tables = Record<string, Ligne[]>;

const CLE = 'lw-legis-demo-v1';
const CLE_SESSION = 'lw-legis-demo-session';

/** Demo-Zugang: Benutzername statt E-Mail, Gross-/Kleinschreibung egal.
 *  Gespeichert ist nur die Pruefsumme des Passworts. */
export const DEMO_UTILISATEUR = 'lw-legis';
const DEMO_HASH = '9d3c9be5913be415dcb9d095683ad72fa2717362c79ccee9597f184b6860bed3';

const colonneCle = (table: string) => (table === 'settings' ? 'cle' : 'id');

async function sha256(texte: string): Promise<string> {
  const octets = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(texte));
  return [...new Uint8Array(octets)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function graines(): Tables {
  const el = document.getElementById('lw-demo-graines');
  return el ? JSON.parse(el.textContent || '{}') : {};
}

function lireTables(): Tables {
  try {
    const brut = localStorage.getItem(CLE);
    if (brut) return JSON.parse(brut);
  } catch {
    /* kein Speicher: frisch aus den Startinhalten */
  }
  return graines();
}

let tables: Tables | null = null;
const db = () => (tables ??= lireTables());
const enregistrer = () => {
  try {
    localStorage.setItem(CLE, JSON.stringify(db()));
  } catch {
    /* voll oder gesperrt: die Aenderung gilt bis zum Neuladen */
  }
};

const copie = <T>(v: T): T => JSON.parse(JSON.stringify(v));

type Filtre = (l: Ligne) => boolean;

/** Eine Abfrage, die sich wie die von supabase-js verketten und abwarten laesst. */
class Requete implements PromiseLike<{
  data: any;
  error: { message: string } | null;
  count?: number;
}> {
  private filtres: Filtre[] = [];
  private tri: { col: string; asc: boolean } | null = null;
  private max: number | null = null;
  private mode: 'liste' | 'un' | 'peutetre' = 'liste';
  private operation: { type: 'select' } | { type: 'update'; valeurs: Ligne } | { type: 'insert'; valeurs: Ligne } = {
    type: 'select',
  };
  private compte = false;
  private seulementCompte = false;

  constructor(private table: string) {}

  select(_colonnes = '*', options?: { count?: string; head?: boolean }) {
    if (options?.count) this.compte = true;
    if (options?.head) this.seulementCompte = true;
    return this;
  }
  update(valeurs: Ligne) {
    this.operation = { type: 'update', valeurs };
    return this;
  }
  insert(valeurs: Ligne) {
    this.operation = { type: 'insert', valeurs };
    return this;
  }
  eq(col: string, v: unknown) {
    this.filtres.push((l) => String(l[col]) === String(v));
    return this;
  }
  gt(col: string, v: string) {
    this.filtres.push((l) => String(l[col] ?? '') > String(v));
    return this;
  }
  in(col: string, vs: unknown[]) {
    const set = new Set(vs.map(String));
    this.filtres.push((l) => set.has(String(l[col])));
    return this;
  }
  order(col: string, opts?: { ascending?: boolean }) {
    this.tri = { col, asc: opts?.ascending !== false };
    return this;
  }
  limit(n: number) {
    this.max = n;
    return this;
  }
  single() {
    this.mode = 'un';
    return this;
  }
  maybeSingle() {
    this.mode = 'peutetre';
    return this;
  }

  private executer() {
    const lignes = (db()[this.table] ??= []);
    const maintenant = new Date().toISOString();

    if (this.operation.type === 'insert') {
      const nouvelle = {
        id: crypto.randomUUID(),
        updated_at: maintenant,
        ...this.operation.valeurs,
      };
      lignes.push(nouvelle);
      enregistrer();
      return this.resultat([copie(nouvelle)]);
    }

    let touchees = lignes.filter((l) => this.filtres.every((f) => f(l)));

    if (this.operation.type === 'update') {
      for (const l of touchees) {
        // Wie der Trigger `journaliser`: erst die Vorfassung sichern.
        (db().revisions ??= []).push({
          id: crypto.randomUUID(),
          table_nom: this.table,
          enregistrement_id: String(l[colonneCle(this.table)]),
          ecrit_le: maintenant,
          ecrit_par: 'demo',
          donnees: copie(l),
        });
        Object.assign(l, copie(this.operation.valeurs), {
          updated_at: maintenant,
          updated_by: 'demo',
        });
      }
      enregistrer();
    }

    touchees = touchees.map(copie);
    if (this.tri) {
      const { col, asc } = this.tri;
      touchees.sort((a, b) => (a[col] > b[col] ? 1 : a[col] < b[col] ? -1 : 0) * (asc ? 1 : -1));
    }
    if (this.max !== null) touchees = touchees.slice(0, this.max);
    return this.resultat(touchees);
  }

  private resultat(lignes: Ligne[]) {
    if (this.seulementCompte) return { data: null, error: null, count: lignes.length };
    if (this.mode === 'un') {
      return lignes[0]
        ? { data: lignes[0], error: null }
        : { data: null, error: { message: 'Eintrag nicht gefunden.' } };
    }
    if (this.mode === 'peutetre') return { data: lignes[0] ?? null, error: null };
    return {
      data: lignes,
      error: null,
      count: this.compte ? lignes.length : undefined,
    };
  }

  then<A, B>(
    ok?: ((v: { data: any; error: { message: string } | null; count?: number }) => A | PromiseLike<A>) | null,
    ko?: ((e: unknown) => B | PromiseLike<B>) | null,
  ) {
    return Promise.resolve()
      .then(() => this.executer())
      .then(ok, ko);
  }
}

// ---------------------------------------------------------------------------
// Anmeldung
// ---------------------------------------------------------------------------
const PROFIL_ID = 'demo';
const auditeurs = new Set<() => void>();

const connecte = () => {
  try {
    return sessionStorage.getItem(CLE_SESSION) === '1' || localStorage.getItem(CLE_SESSION) === '1';
  } catch {
    return false;
  }
};
const session = () => (connecte() ? { access_token: 'demo', user: { id: PROFIL_ID, email: DEMO_UTILISATEUR } } : null);

const auth = {
  async signInWithPassword({ email, password }: { email: string; password: string }) {
    const ok = email.trim().toLowerCase() === DEMO_UTILISATEUR && (await sha256(password)) === DEMO_HASH;
    if (!ok) return { data: null, error: { message: 'login' } };
    try {
      localStorage.setItem(CLE_SESSION, '1');
    } catch {
      sessionStorage.setItem(CLE_SESSION, '1');
    }
    auditeurs.forEach((f) => f());
    return { data: { session: session() }, error: null };
  },
  async signOut() {
    try {
      localStorage.removeItem(CLE_SESSION);
      sessionStorage.removeItem(CLE_SESSION);
    } catch {
      /* egal */
    }
    auditeurs.forEach((f) => f());
    return { error: null };
  },
  async getSession() {
    return { data: { session: session() } };
  },
  async getUser() {
    return { data: { user: session()?.user ?? null } };
  },
  onAuthStateChange(f: () => void) {
    auditeurs.add(f);
    return {
      data: { subscription: { unsubscribe: () => auditeurs.delete(f) } },
    };
  },
  mfa: {
    async getAuthenticatorAssuranceLevel() {
      return {
        data: { currentLevel: connecte() ? 'aal2' : null },
        error: null,
      };
    },
  },
};

export function creerClientDemo() {
  return {
    from: (table: string) => new Requete(table),
    auth,
    storage: {
      from: () => ({
        upload: async () => ({
          error: {
            message: 'In der Demo lassen sich keine Bilder hochladen. Das geht mit der echten Datenbank.',
          },
        }),
      }),
    },
    async rpc(nom: string, args: { revision_id: string }) {
      if (nom !== 'restaurer') return { error: { message: nom } };
      const r = (db().revisions ?? []).find((x) => x.id === args.revision_id);
      if (!r) return { error: { message: 'Fassung nicht gefunden.' } };
      const col = colonneCle(r.table_nom);
      await new Requete(r.table_nom).update(copie(r.donnees)).eq(col, r.enregistrement_id);
      return { error: null };
    },
  };
}

/** Alles auf die Startinhalte zuruecksetzen (Knopf unter „Mehr“). */
export function reinitialiserDemo() {
  try {
    localStorage.removeItem(CLE);
  } catch {
    /* egal */
  }
  tables = null;
}
