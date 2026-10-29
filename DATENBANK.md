# Die Datenbank einrichten

Damit der Redaktionsbereich läuft, braucht die Seite eine Supabase-Instanz:
dort liegen die Inhalte, die Konten und die Bilder.

Es gibt **zwei Wege**. Wenn Sie nur ausprobieren wollen, wie sich die Seite
bearbeiten lässt, nehmen Sie Weg A — der braucht kein Konto, kein Internet
und kostet nichts. Weg B ist der für den echten Betrieb.

Beide Wege sind hier einmal vollständig durchgelaufen; die Stolpersteine
unten stehen drin, weil sie wirklich aufgetreten sind.

---

## Weg A — Auf diesem Rechner, zum Ausprobieren

### Was Sie brauchen

**Docker Desktop**, gestartet. Mehr nicht. Supabase läuft dann komplett auf
Ihrem Rechner: Datenbank, Anmeldung, Dateiablage.

> Docker braucht Arbeitsspeicher. Unter *Einstellungen → Resources* sollten
> mindestens 4 GB eingestellt sein. Läuft parallel noch ein anderes
> Supabase-Projekt, kann es eng werden — dann das andere vorher stoppen.

### Die vier Befehle

```bash
cd "/Users/jamieley/Desktop/Website LW Legis"

npm install          # einmalig, falls noch nicht geschehen
npm run db:start     # startet Datenbank, Anmeldung und Ablage
```

Beim ersten Mal lädt Docker einige Abbilder herunter, das dauert ein paar
Minuten. Danach geht es in Sekunden.

`npm run db:start` gibt am Ende einen Block mit Schlüsseln aus. Zwei davon
brauchen Sie: `ANON_KEY` und `SERVICE_ROLE_KEY`.

### Die Zugangsdaten hinterlegen

Legen Sie im Projektordner eine Datei `.env` an — oder benutzen Sie die,
die schon da ist. Sie steht in `.gitignore` und wird nie ausgeliefert.

```
PUBLIC_SITE_URL=http://localhost:4321
PUBLIC_SUPABASE_URL=http://127.0.0.1:54421
PUBLIC_SUPABASE_ANON_KEY=<ANON_KEY aus der Ausgabe>
SUPABASE_SERVICE_ROLE_KEY=<SERVICE_ROLE_KEY aus der Ausgabe>
```

Bei der örtlichen Instanz sind diese Schlüssel bei jedem gleich und kein
Geheimnis. Bei der echten Instanz (Weg B) sind sie es sehr wohl.

### Das erste Konto

Die Seite hat **keine Registrierung** — Konten legt nur der Inhaber an. Das
allererste kann deshalb niemand einladen; dafür gibt es ein Skript:

```bash
npm run konto -- ihre@adresse.lu 'EinLangesPasswort' owner 'Ihr Name'
```

Die Anführungszeichen um das Passwort sind wichtig, sonst verschluckt die
Kommandozeile Sonderzeichen. Mindestens zehn Zeichen.

### Anmelden

```bash
npm run dev
```

Dann `http://localhost:4321/admin` öffnen.

E-Mail und Passwort eingeben — fertig.

Einen **zweiten Faktor** verlangt die Seite hier nicht: Solange `.env` auf
die örtliche Instanz (`127.0.0.1` oder `localhost`) zeigt, genügt das
Passwort. Gegen ein echtes Supabase-Projekt (Weg B) ist er Pflicht, siehe
dort.

### Ausprobieren

Links steht die Website als Vorschau. Einen Text anklicken, rechts ändern,
„Speichern“. Die Stelle ist danach gelb hinterlegt, und rechts unter „Ihre
Änderungen“ steht sie mit altem und neuem Text; „Zurücknehmen“ stellt den
alten wieder her.

„Jetzt veröffentlichen“ ist hier abgeschaltet: Örtlich läuft kein Build.
Wer sehen will, wie die gebaute Seite mit den Änderungen aussieht, holt die
Inhalte in den Schnappschuss (`npm run content:pull`) und lädt die Seite neu
— danach gilt der neue Stand als veröffentlicht, und die Liste ist leer.

Unter „Weitere Inhalte“ gibt es in jedem Eintrag „Frühere Fassungen“. Dort
steht jede vorherige Fassung mit Datum und Bearbeiter und lässt sich
zurückspielen. Auch das Zurückspielen wird gesichert.

### Wieder aufräumen

```bash
npm run db:stop       # hält alles an, Daten bleiben
npm run db:reset      # spielt Schema und Inhalte neu ein — ALLE
                      # Änderungen und Konten sind danach weg
```

---

## Weg B — Bei Supabase, für den Betrieb

### 1. Projekt anlegen

Auf [supabase.com](https://supabase.com) ein Konto und ein Projekt
anlegen. **Region: Frankfurt (eu-central-1).** Das ist keine Kleinigkeit —
die Datenschutzerklärung dieser Seite sagt zu, dass die Daten in der
Europäischen Union bleiben.

Das Datenbank-Passwort, das dabei vergeben wird, gut aufbewahren; es taucht
später bei der Sicherung wieder auf.

### 2. Schema und Inhalte einspielen

```bash
npx supabase login
npx supabase link --project-ref <die-ref-aus-der-projektadresse>
npx supabase db push                                  # Tabellen und Regeln
npx supabase db execute --file supabase/seed.sql      # Erstbefüllung
```

### 3. Die Zugangsdaten

In der Supabase-Oberfläche unter *Project Settings → API*:

| Feld dort | gehört nach |
|---|---|
| Project URL | `PUBLIC_SUPABASE_URL` |
| `anon` `public` | `PUBLIC_SUPABASE_ANON_KEY` |
| `service_role` `secret` | `SUPABASE_SERVICE_ROLE_KEY` |

Der `anon`-Schlüssel darf in den Browser — er ist dafür gemacht, und
geschützt wird der Zugriff durch die Regeln in der Datenbank.
**Der `service_role`-Schlüssel darf das nie.** Er umgeht alle Regeln. Er
gehört in die GitHub-Secrets und in Ihre örtliche `.env`, sonst nirgendwo.

### 4. Ablage für Bilder und Sicherungen

Die Eimer `media` und `documents` legt die Migration selbst an. Einen
dritten brauchen Sie von Hand, unter *Storage → New bucket*:

- Name `sicherungen`, **nicht** öffentlich.

### 5. Edge Functions

```bash
npx supabase functions deploy send-inquiry publish process-image

npx supabase secrets set \
  INQUIRY_RECIPIENT=contact@cabinet-avocats-lorang.com \
  SMTP_HOST=… SMTP_PORT=587 SMTP_USER=… SMTP_PASSWORD=… SMTP_FROM=… \
  ALLOWED_ORIGINS=https://www.ihre-adresse.lu \
  GITHUB_REPOSITORY=…/… GITHUB_DISPATCH_TOKEN=…
```

### 6. Das erste Konto

Wie bei Weg A, nur zeigt `.env` jetzt auf das echte Projekt:

```bash
npm run konto -- lorang@… 'EinLangesPasswort' owner 'Alain Lorang'
```

Weitere Konten legt Me Lorang danach im Redaktionsbereich an.

Beim Anmelden erscheint diesmal ein **QR-Code**. Scannen Sie ihn mit einer
Authenticator-App (Google Authenticator, Microsoft Authenticator,
1Password, Authy, jede tut es) und tragen Sie den sechsstelligen Code ein.
**Der zweite Faktor ist hier Pflicht.** Ohne ihn kommt niemand hinein,
auch nicht mit richtigem Passwort. Wer die Einrichtung abbricht und es
später erneut versucht, bekommt einen frischen QR-Code — die abgebrochene
Einrichtung wird automatisch weggeräumt.

---

## Stolpersteine

**„Email logins are disabled"**
In `supabase/config.toml` steht unter `[auth.email]` `enable_signup`. Das
schaltet nicht nur die Registrierung ab, sondern den ganzen E-Mail-Anbieter
— auch das Anmelden. Es muss dort `true` stehen. Die öffentliche
Registrierung sperrt stattdessen `enable_signup` weiter oben unter `[auth]`.

**„keine Supabase-Zugangsdaten gesetzt", obwohl `.env` da ist**
Node liest `.env` nicht von selbst. Die Skripte tun es über
`scripts/env.mjs`. Wenn Sie ein eigenes Skript schreiben, denken Sie daran.

**Container werden nicht gesund**
Meist zu wenig Arbeitsspeicher für Docker, besonders wenn ein zweites
Supabase-Projekt läuft. In `supabase/config.toml` sind Studio und Realtime
deshalb ausgeschaltet; die Seite braucht beides nicht. Studio können Sie
dort einschalten, wenn Sie in die Tabellen schauen wollen.

**Ports belegt**
Dieses Projekt benutzt 54421 bis 54424 statt der üblichen 54321 ff., damit
es sich mit anderen Supabase-Projekten auf demselben Rechner verträgt.

---

## Was wo liegt

| | |
|---|---|
| Tabellen und Zugriffsregeln | `supabase/migrations/` |
| Erstbefüllung | `supabase/seed.sql`, erzeugt aus `content/snapshot.json` |
| Örtliche Einstellungen | `supabase/config.toml` |
| Edge Functions | `supabase/functions/` |
| Erstes Konto | `scripts/erstes-konto.mjs` |

Die öffentliche Website fragt die Datenbank **nie** zur Laufzeit ab. Vor
jedem Build holt `scripts/fetch-content.mjs` die Inhalte nach
`content/snapshot.json`, und Astro baut daraus statische Seiten. Ist die
Datenbank beim Bauen nicht erreichbar, wird aus dem letzten Schnappschuss
gebaut und die Seite bleibt online.
