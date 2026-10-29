/**
 * supabase/functions/send-inquiry/index.ts
 *
 * Nimmt das Anfrageformular entgegen, prueft es serverseitig, legt es in
 * `inquiries` ab und schickt eine E-Mail an die Kanzlei.
 *
 * Warum beides — Datenbank UND E-Mail:
 * Damit keine Anfrage verloren geht, wenn eine Mail im Spamordner landet.
 * Genau das ist der einzige ernsthafte oeffentliche Vorwurf gegen diese
 * Kanzlei: auf E-Mails nicht geantwortet zu haben.
 *
 * Ohne JavaScript im Browser kommt hier ein gewoehnlicher Formular-POST an;
 * beantwortet wird er mit 303 auf die Bestaetigungsseite. Mit JavaScript
 * kommt derselbe POST mit `Accept: application/json` und wird mit JSON
 * beantwortet.
 *
 * Spamschutz: Honeypot plus serverseitige Pruefung. Kein Captcha.
 *
 * Empfaenger und Zugangsdaten stehen in Umgebungsvariablen, niemals im
 * Frontend.
 */
import { createClient } from 'jsr:@supabase/supabase-js@2';
import { SMTPClient } from 'jsr:@denodomain/denomailer@1.6.0';
import { corsHeaders, preflight } from '../_shared/cors.ts';

const PAYS = ['france', 'belgique', 'allemagne', 'luxembourg', 'ue', 'hors-ue'];
const PROJETS = [
  'immobilier',
  'societe',
  'succession',
  'creance',
  'marque',
  'fiscalite',
  'litige',
];
const LANGUES = ['fr', 'de', 'en', 'lb'];

interface Faute {
  champ: string;
  raison: string;
}

function valider(f: FormData): { fautes: Faute[]; donnees: Record<string, unknown> } {
  const fautes: Faute[] = [];
  const s = (k: string) => String(f.get(k) ?? '').trim();

  const nom = s('nom');
  const courriel = s('courriel');
  const telephone = s('telephone');
  const pays = s('pays');
  const projet = s('projet');
  const message = s('message');
  const echeance = s('echeance');
  const sansEcheance = s('sans_echeance') === '1';
  const consentement = s('consentement') === '1';
  const langue = LANGUES.includes(s('langue')) ? s('langue') : 'fr';

  if (nom.length < 2 || nom.length > 200) fautes.push({ champ: 'nom', raison: 'laenge' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(courriel) || courriel.length > 320)
    fautes.push({ champ: 'courriel', raison: 'format' });
  if (!PAYS.includes(pays)) fautes.push({ champ: 'pays', raison: 'unbekannt' });
  if (!PROJETS.includes(projet)) fautes.push({ champ: 'projet', raison: 'unbekannt' });
  if (message.length < 10 || message.length > 8000)
    fautes.push({ champ: 'message', raison: 'laenge' });
  if (!consentement) fautes.push({ champ: 'consentement', raison: 'fehlt' });
  if (!sansEcheance && !/^\d{4}-\d{2}-\d{2}$/.test(echeance))
    fautes.push({ champ: 'echeance', raison: 'fehlt' });
  if (telephone.length > 60) fautes.push({ champ: 'telephone', raison: 'laenge' });

  return {
    fautes,
    donnees: {
      nom,
      courriel,
      telephone: telephone || null,
      pays,
      projet,
      echeance: sansEcheance ? null : echeance,
      sans_echeance: sansEcheance,
      message,
      langue,
      page: s('page') || null,
    },
  };
}

function texteCourriel(d: Record<string, unknown>): string {
  return [
    'Neue Anfrage über das Formular der Website',
    '',
    `Name:      ${d.nom}`,
    `E-Mail:    ${d.courriel}`,
    `Telefon:   ${d.telephone ?? '—'}`,
    `Wohnsitz:  ${d.pays}`,
    `Anliegen:  ${d.projet}`,
    `Frist:     ${d.sans_echeance ? 'keine angegeben' : d.echeance}`,
    `Sprache:   ${d.langue}`,
    `Von Seite: ${d.page ?? '—'}`,
    '',
    '--- Nachricht ---',
    String(d.message),
    '',
    '-----------------',
    'Diese Anfrage ist zusätzlich im Redaktionsbereich unter „Anfragen“',
    'gespeichert, damit nichts verloren geht.',
  ].join('\n');
}

Deno.serve(async (req) => {
  const vol = preflight(req);
  if (vol) return vol;

  const entetes = corsHeaders(req.headers.get('origin'));
  const veutJson = (req.headers.get('accept') ?? '').includes('application/json');
  const repondre = (statut: number, corps: Record<string, unknown>, redirection?: string) => {
    if (!veutJson && redirection) {
      return new Response(null, {
        status: 303,
        headers: { ...entetes, Location: redirection },
      });
    }
    return new Response(JSON.stringify(corps), {
      status: statut,
      headers: { ...entetes, 'Content-Type': 'application/json' },
    });
  };

  if (req.method !== 'POST') {
    return repondre(405, { erreur: 'methode' });
  }

  let formulaire: FormData;
  try {
    formulaire = await req.formData();
  } catch {
    return repondre(400, { erreur: 'format' });
  }

  // --- Honeypot -----------------------------------------------------------
  // Fuer Menschen unsichtbar. Ist es ausgefuellt, war es eine Maschine.
  // Geantwortet wird trotzdem freundlich, damit der Absender nicht lernt,
  // woran es gescheitert ist.
  if (String(formulaire.get('societe') ?? '').trim() !== '') {
    return repondre(200, { ok: true }, String(formulaire.get('recu') ?? '/'));
  }

  const { fautes, donnees } = valider(formulaire);
  if (fautes.length > 0) {
    return repondre(422, { erreur: 'pruefung', fautes });
  }

  const urlSupabase = Deno.env.get('SUPABASE_URL')!;
  const cleService = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(urlSupabase, cleService, {
    auth: { persistSession: false },
  });

  // --- Ablegen ------------------------------------------------------------
  // Zuerst speichern, dann versenden. Faellt der Mailversand aus, ist die
  // Anfrage trotzdem da.
  const { error: erreurBase } = await supabase.from('inquiries').insert(donnees);
  if (erreurBase) {
    console.error('inquiries insert:', erreurBase.message);
    return repondre(500, { erreur: 'speichern' });
  }

  // --- Versenden ----------------------------------------------------------
  const destinataire = Deno.env.get('INQUIRY_RECIPIENT');
  const hote = Deno.env.get('SMTP_HOST');
  if (destinataire && hote) {
    try {
      const client = new SMTPClient({
        connection: {
          hostname: hote,
          port: Number(Deno.env.get('SMTP_PORT') ?? 587),
          tls: Deno.env.get('SMTP_PORT') === '465',
          auth: {
            username: Deno.env.get('SMTP_USER')!,
            password: Deno.env.get('SMTP_PASSWORD')!,
          },
        },
      });
      await client.send({
        from: Deno.env.get('SMTP_FROM') ?? destinataire,
        to: destinataire,
        // Antworten geht direkt an den Absender.
        replyTo: `${donnees.nom} <${donnees.courriel}>`,
        subject: `Anfrage Website — ${donnees.pays} / ${donnees.projet}`,
        content: texteCourriel(donnees),
      });
      await client.close();
    } catch (e) {
      // Der Versand ist fehlgeschlagen, die Anfrage ist aber gespeichert.
      // Deshalb gilt sie als angekommen; das Protokoll haelt den Fehler fest.
      console.error('SMTP:', e instanceof Error ? e.message : String(e));
    }
  }

  return repondre(200, { ok: true }, String(formulaire.get('recu') ?? '/'));
});
