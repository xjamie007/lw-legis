# Website der Étude d'Avocats LW LEGIS

Website der Kanzlei auf Französisch und Englisch, mit eigenem
Redaktionsbereich. Me Lorang ändert jeden Text, jedes Bild und jedes Dokument
selbst, im Browser, ohne dass jemand Code anfasst.

Dieses Dokument hat zwei Teile. **Teil A** ist für Me Lorang und das
Sekretariat und erklärt in ganzen Sätzen, wie man mit der Seite arbeitet.
**Teil B** ist für Entwickler.

> **Zum Ausprobieren:** [DATENBANK.md](DATENBANK.md) erklärt in vier
> Befehlen, wie Sie die Datenbank auf Ihrem Rechner starten und sich im
> Redaktionsbereich anmelden.

> **Bevor die Seite online geht:** [OFFENE-PUNKTE.md](OFFENE-PUNKTE.md) lesen.
> Dort steht, was beim Übertragen der alten Texte aufgefallen ist und nur die
> Kanzlei entscheiden kann — vor allem die Rechtstexte.

---

# Teil A — Für die Kanzlei

## Was die Seite kann

Die Seite enthält die Inhalte der bisherigen Website
cabinet-avocats-lorang.com, Wort für Wort, auf Französisch und Englisch, in
neuer Gestaltung:

* **Accueil** — die Kanzlei, Me Lorang, die Tätigkeiten, die Stärken, die
  Netzwerke (Intrum Justitia, IJCOF, ADVOUNION, LIC), Dossiers und
  Konferenzen.
* **Les avocats**, **Activités** (13 Tätigkeiten, je mit eigener Seite),
  **Dossiers thématiques** (12 Fachdossiers als lesbare Seiten),
  **Conférences** (die Unterlagen von Me Lorang als PDF), **Partenaires**,
  **Contact** und die Rechtstexte.

Weggelassen wurden die Platzhalter der alten Seite: „Lorem ipsum“, die
Zeitleiste, die Kennzahlen, die Muster-Kundenstimmen und der Kreditrechner.

Neu dazugekommen sind Dinge, die nichts behaupten, aber praktisch sind:

* **Index des matières** — alle Tätigkeiten, Dossiers und Konferenzen von A
  bis Z, wie das Sachregister eines Kommentars.
* **Themenfilter** bei Dossiers und Konferenzen, mit Dateigröße am PDF.
* **Auf jeder Tätigkeitsseite** ein Kasten „Contacter l'Étude à ce sujet“,
  der das Formular mit dieser Tätigkeit vorbelegt.
* **Kontakt**: Wegbeschreibung (OpenStreetMap) und „Ajouter aux contacts“
  als Kontaktkarte fürs Adressbuch.
* **Dossiers drucken** — mit eigener Druckfassung, Lesezeit steht dabei.
* **Alle alten Adressen** (…php) leiten auf die neue Seite weiter. Lesezeichen
  und Google-Treffer bleiben gültig.

## Anmelden

1. Auf der Website ganz unten im Footer, neben „© … Tous droits réservés.“,
   auf **„Login“** klicken. (Oder direkt `https://IHRE-ADRESSE/admin`.)
2. Vor der Seite erscheint das Anmeldefenster: E-Mail-Adresse und Passwort
   eingeben.
3. Den sechsstelligen Code aus der Authenticator-App eingeben.

Danach sind Sie auf **derselben Seite**, auf der Sie „Login“ geklickt
haben, und können sie sofort bearbeiten. Abmelden: im Footer auf
„Abmelden“ (dort, wo vorher „Login“ stand) oder unter „Mehr“.

Der zweite Faktor ist **Pflicht**. Beim ersten Anmelden zeigt die Seite einen
QR-Code: Den mit einer Authenticator-App scannen (Google Authenticator,
Microsoft Authenticator, 1Password, Authy — jede tut es), dann den
angezeigten Code eintragen. Ab dann fragt die Seite bei jeder Anmeldung nach
dem aktuellen Code.

Es gibt **keine Registrierung**. Neue Konten legt Me Lorang an, unter
„Konten“.

Es gibt zwei Rollen:

* **Inhaber** (Me Lorang) darf alles, auch die Rechtstexte, die Stammdaten
  und die Benutzerkonten.
* **Redakteur** (Sekretariat) darf Inhalte, Dokumente und Bilder ändern —
  aber nicht Impressum, Datenschutz, Geschäftsbedingungen, Stammdaten oder
  Konten.

Unter „Mehr“ lässt sich die Sprache des Redaktionsbereichs zwischen Deutsch
und Französisch umschalten.

## Einen Text ändern

Bedient wird der Redaktionsbereich wie bei den Websites von Krombach und
DRP Group: Sie sehen die Website selbst und ändern sie direkt dort. Unten
steht eine dunkle Leiste:

**Speichern · Rückgängig · Seiten · Google · Veröffentlichen · Mehr**

1. **Text anklicken und lostippen.** Fährt man mit der Maus über einen Text,
   der sich ändern lässt, wird er gestrichelt umrandet. Enter beendet die
   Eingabe.
2. **Längere Texte** (mit Absätzen, Listen, Fußnoten) öffnen beim Anklicken
   ein Fenster mit dem Texteditor. „Übernehmen“ setzt den Text in die Seite.
3. **„Speichern“.** Die Schaltfläche leuchtet grün, sobald es etwas zu
   speichern gibt. Vertippt? **„Rückgängig“** nimmt die letzte Eingabe
   zurück, solange noch nicht gespeichert ist.
4. **„Veröffentlichen“.** Erst dann sehen Besucher die Änderung. Die Zahl
   auf der Schaltfläche sagt, wie viele Änderungen noch nicht online sind.
   Im Fenster steht jede davon mit dem alten und dem neuen Text; „Ansehen“
   springt an die Stelle, „Zurücknehmen“ stellt den veröffentlichten Text
   wieder her.

**Gelb hinterlegt** ist alles, was anders ist als online.

Bearbeitet wird immer die Sprache, die Sie gerade sehen. Eine andere Seite
oder Sprache wählen Sie unter **„Seiten“**; Links auf der Website
funktionieren ebenfalls. Links zu anderen Websites und das Kontaktformular
sind beim Bearbeiten abgeschaltet. Getippte, noch nicht gespeicherte Texte
gehen beim Seitenwechsel nicht verloren.

**„Google“** zeigt Titel und Beschreibung der Seite so, wie Google sie
anzeigt, mit Zeichenzähler. Das gibt es für die Startseite und die
Hauptseiten; Unterseiten bekommen beides automatisch aus ihrem Inhalt.

Nicht jeder Text lässt sich anklicken: Menü, Schaltflächen und der große Satz
ganz oben gehören zur Gestaltung. Unter **„Mehr“** finden Sie die
Nachrichten aus dem Formular, die Bilder und die **Weiteren Inhalte**: ob
ein Eintrag veröffentlicht ist, neue Einträge und die Reihenfolge der
Startseite. Dort steht bei jeder Sprache außer Französisch links die
**französische Referenzfassung**; „Referenz übernehmen“ kopiert sie herüber,
damit Sie übersetzen statt abzutippen.

Der Texteditor kann Absatz, Zwischenüberschrift, Unterüberschrift, Liste,
fett, kursiv, Link, Zitat und Fußnote. Mehr nicht — und das ist Absicht: Es
gibt keine Schriftart-, Größen- und Farbauswahl, weil das Aussehen der Seite
aus dem Entwurf kommt und nicht aus dem Editor. So sieht die Seite in drei
Jahren noch aus wie am ersten Tag.

Eingefügter Text aus Word oder einer E-Mail wird automatisch von seiner
Formatierung befreit. Das ist gewollt.

## Ein Bild austauschen

1. Unten auf „Mehr“, dann „Bilder“.
2. Bild in das gestrichelte Feld ziehen, oder auf „Bild hochladen“.
3. Die Seite erzeugt im Hintergrund die modernen Bildformate (AVIF und WebP)
   in vier Breiten. Das dauert ein paar Sekunden.
4. Auf das Bild klicken, um es zu bearbeiten.
5. **Bildbeschreibung in beiden Sprachen eintragen.** Das ist Pflicht:
   Blinde Besucher hören diesen Text, und das Gesetz verlangt ihn. Solange
   eine Sprache fehlt, lässt sich das Bild nicht veröffentlichen — der Haken
   ist dann nicht anklickbar.
6. Beim **Bildausschnitt** auf die Stelle klicken, die immer sichtbar bleiben
   soll — meist ein Gesicht. Wer lieber tippt, trägt die Werte in die beiden
   Zahlenfelder darunter ein.
7. Haken bei „Veröffentlicht“, dann unten auf „Veröffentlichen“ und
   „Jetzt veröffentlichen“.

## Wappen und Fotos

Auf der Seite stehen jetzt das echte Wappen der Kanzlei und drei
Aufnahmen, alle übernommen von der bisherigen Website
`cabinet-avocats-lorang.com`:

| Bild | Wo es steht |
|---|---|
| Wappen | Kopfzeile und Fußbereich |
| Porträt Me Lorang | Startseite „Wer antwortet“ und Kanzleiseite |
| Wartebereich | „Wo wir empfangen“, links |
| Treppenhaus | „Wo wir empfangen“, rechts |

**Drei Dinge sind dazu noch zu klären**, sie stehen auch in
[OFFENE-PUNKTE.md](OFFENE-PUNKTE.md):

1. **Die Nutzungsrechte.** Die Aufnahmen stammen von einem Fotografen.
   Dass sie auf der alten Seite standen, heißt nicht zwangsläufig, dass
   sie auch auf einer neuen verwendet werden dürfen.
2. **Die Auflösung des Porträts.** 579 × 626 Pixel im Original — auf der
   Seite wird daraus höchstens eine 500 Pixel breite Fassung, und das
   sieht man. Eine Neuaufnahme wäre der größte Einzelgewinn.
3. **Das Wappen als Vektordatei.** Die jetzige Fassung ist aus einem Foto
   freigestellt und in den gebrauchten Größen scharf, aber nicht beliebig
   skalierbar.

### Ein Bild austauschen

Zwei Wege.

**Der übliche:** im Redaktionsbereich unter „Bilder“ hochladen,
Ausschnitt setzen, Bildbeschreibung in beiden Sprachen eintragen,
veröffentlichen. AVIF und WebP entstehen dabei automatisch.

**Der direkte, für die vier festen Plätze:** die neue Datei nach
`tools/originale/` legen, in `scripts/bilder-aufbereiten.mjs` den
Dateinamen eintragen und `npm run bilder` ausführen. Das Skript schneidet
zu, erzeugt AVIF und WebP in allen sinnvollen Breiten und räumt die alten
Ableitungen weg. Es rechnet dabei nie hoch: Was das Original nicht
hergibt, wird auch nicht erzeugt.

Wo eine Datei fehlt, zeigt die Seite einen gestalteten Platzhalter mit
dem Hinweis, welche Aufnahme dort hingehört — sie sieht damit gewollt aus
und nicht kaputt.

### Die Bildbeschreibungen

Jedes inhaltstragende Bild braucht einen Alt-Text in beiden Sprachen;
ohne ihn lässt sich ein Bild nicht veröffentlichen, das erzwingt die
Datenbank. Der Text beschreibt, **was auf dem Bild zu sehen ist** — nicht,
was man sich dabei denken soll. Ein Alt-Text, der etwas nennt, das im Bild
gar nicht vorkommt, führt blinde Besucher in die Irre und ist schlechter
als gar keiner.

## Ein Dossier oder eine Konferenz einstellen

1. Unten auf „Mehr“, dann „Weitere Inhalte“ und „Dokumente“.
2. Art wählen: Fachdossier oder Konferenzunterlage.
3. **Dossier:** Titel, Adresse, Kurzfassung und Text eintragen, in beiden
   Sprachen. Fehlt die englische Fassung, erscheint das Dossier nur auf der
   französischen Seite.
4. **Konferenz:** Titel und eine Zeile Beschreibung; dazu das PDF, oder —
   ohne PDF — die Kennung des Dossiers, auf das sie verweist, oder die Adresse
   der Veranstaltungsseite. Ein Datum, wenn es auf der Unterlage steht.
5. Themen ankreuzen. Danach filtern Besucher, und auf jedem Dossier stehen
   die Konferenzen zum selben Thema.
6. Status auf „Veröffentlicht“, dann unten auf „Veröffentlichen“ und
   „Jetzt veröffentlichen“.

## Was „Veröffentlichen“ auslöst

Die Website ist eine **statische Seite**. Sie fragt beim Aufruf keine
Datenbank, sondern liefert fertige Dateien aus. Deshalb ist sie schnell, und
deshalb setzt sie kein Cookie.

Wenn Sie auf „Veröffentlichen“ klicken, passiert Folgendes:

1. Ein Bauvorgang bei GitHub wird gestartet.
2. Er holt alle Inhalte aus der Datenbank.
3. Er baut aus jedem Inhalt eine fertige HTML-Seite, in jeder Sprache.
4. Er prüft dabei, was noch fehlt, und lässt Unfertiges weg.
5. Er legt die neuen Dateien auf dem Webserver ab.

Das dauert **ein bis zwei Minuten**. In dieser Zeit bleibt die alte Fassung
online — es gibt keinen Moment, in dem die Seite leer ist. Der
Redaktionsbereich zeigt „Wird veröffentlicht, seit 40 Sekunden“ und danach
„Veröffentlicht um 14:32“.

Eine eigene Vorschau muss nicht mehr gebaut werden: Nach dem Login
steht jede gespeicherte Änderung sofort in der Website, gelb
hinterlegt, bevor sie freigegeben wird.

## Eine Änderung rückgängig machen

Noch nicht gespeichert: unten auf **„Rückgängig“**.

Gespeichert, aber noch nicht veröffentlicht: unten auf „Veröffentlichen“,
unter „Ihre Änderungen“ beim betreffenden Eintrag auf
**„Zurücknehmen“**. Dann steht dort wieder der veröffentlichte Text.

Für ältere Stände: Jedes Speichern sichert die vorherige Fassung. Unten in jedem Eintrag gibt es
„Frühere Fassungen“ (unter „Weitere Inhalte“): Dort stehen die letzten
dreißig, mit Datum und
Bearbeiter. Ein Klick auf „Diese Fassung wiederherstellen“ spielt sie zurück.

Auch das Zurückspielen wird gesichert — Sie können also auch das Rückgängig­-
machen rückgängig machen.

## Anfragen aus dem Formular

Jede Anfrage geht **doppelt** ein: als E-Mail an die Kanzlei und als Eintrag
unter „Anfragen“ im Redaktionsbereich. Das ist Absicht: Wenn eine E-Mail im
Spamordner landet, ist die Anfrage trotzdem da.

Anfragen, aus denen kein Mandat wird, werden nach zwölf Monaten automatisch
gelöscht. Bei jeder Anfrage steht, wann das sein wird. Genau diese Frist steht
auch in der Datenschutzerklärung — sie wird eingehalten, weil sie technisch
durchgesetzt ist und nicht, weil jemand daran denkt.

## Was Sie nicht verstellen können

Farben, Schriften, Abstände und das Layoutraster sind nicht änderbar. Der
Editor bietet sie gar nicht erst an. Das ist die wichtigste Entscheidung
dieses Redaktionssystems: Ein Design, das der Redakteur verstellen kann, ist
nach drei Monaten tot.

Wenn das Aussehen sich wirklich ändern soll, ändert es ein Entwickler an einer
Stelle, und es ändert sich überall.

---

# Teil B — Für Entwickler

## Kurzfassung

```bash
npm install          # Abhängigkeiten
npm run fonts        # Schriften holen (einmalig, Ergebnis wird committet)
npm run dev          # Entwicklungsserver auf http://localhost:4321
npm run build        # Inhalte holen, prüfen, bauen
npm run build:offline# dasselbe ohne Supabase, aus content/snapshot.json
npm run check:all    # Kontrast, Inhalte, Links
```

Node 24 (siehe `.nvmrc`).

## Aufbau

| Bereich | Technik |
|---|---|
| Framework | Astro 7, statisch erzeugt |
| Styling | Tailwind 4 mit projekteigenen Tokens |
| Interaktives (öffentlich) | Kein Framework, rund 3 kB eigenes JavaScript |
| Interaktives (`/admin`) | React 19 |
| Inhalte | Supabase Postgres, Region EU (Frankfurt) |
| Ausliefern | GitHub Actions → Cloudflare Pages |
| Schriften | selbst gehostet als WOFF2 |

Die öffentliche Seite stellt zur Laufzeit **keine** Datenbankabfrage.
`scripts/fetch-content.mjs` holt die Inhalte vor dem Build nach
`content/snapshot.json`; Astro liest ausschließlich diese Datei.

### Zwei bewusste Abweichungen vom Nave-Standard

**1. Die öffentliche Seite benutzt kein React.**
Der Standard sagt „React-Islands, nur wo wirklich nötig“, und ebenso „keine
Bibliothek für etwas, das mit 20 Zeilen eigenem Code geht“. Für den
Hero-Satz und das Formular reichen zwei kleine Module (`src/scripts/`). React
hätte dort rund 66 kB komprimiert gekostet — für Verhalten, das in etwa 200
Zeilen DOM-Code besser aufgehoben ist. React kommt genau dort zum Einsatz, wo
es sich verdient: im Redaktionsbereich.

Nachprüfbar: `scripts/postbuild.mjs` misst je Seite, was ein Besucher
tatsächlich lädt, und meldet Bundles, die keine öffentliche Seite anfordert.

**2. `/admin` ist keine server-gerenderte Route, sondern eine statische
Seite mit einer React-Anwendung darin.**
Das Briefing sah Server-Rendering vor. Das verträgt sich nicht mit
„Hosting: GitHub, Deployment über GitHub Actions“ — eine statisch
ausgelieferte Seite hat keinen Server. Der Redaktionsbereich hat ohnehin
keinen vorrenderbaren Inhalt: Alles hängt am angemeldeten Konto. Geschützt
wird er nicht durch das Rendering, sondern durch Row Level Security in der
Datenbank; das ausgelieferte HTML ist eine leere Hülle.

Praktisch ändert sich nichts an den Anforderungen: `/admin` trägt `noindex`,
steht in `robots.txt`, fehlt in der Sitemap, bekommt über `_headers`
zusätzlich `X-Robots-Tag: noindex`, und kein Byte davon liegt auf einer
öffentlichen Seite. Soll es doch Server-Rendering sein, genügt ein Adapter
plus `export const prerender = false` — dann braucht es aber einen Node-Host.

## Verzeichnisse

```
content/
  source/           von Hand gepflegte Erstbefüllung (Quelle vor dem Livegang)
  snapshot.json     was Astro liest — aus Supabase oder aus source/
src/
  lib/              Sprachen, Routen, Inhalte, SEO, JSON-LD
  i18n/             Oberflächentexte, vier Dateien
  components/       Kopf, Fuß, Hero, Formular, Marginalie, Lücke
  vues/             je eine Ansicht pro Seitentyp
  pages/            genau eine öffentliche Route plus /admin
  scripts/          die beiden öffentlichen Skripte (Hero, Formular)
  admin/            der Redaktionsbereich (React)
  styles/           global.css (öffentlich), admin.css (Redaktion)
supabase/
  migrations/       Schema, RLS, Storage, Wartung
  functions/        send-inquiry, publish, process-image
  seed.sql          erzeugt aus snapshot.json
scripts/            Build- und Prüfskripte
docs/               Kontrastbericht, Buildbericht
tools/              Quelle des Open-Graph-Bildes
```

## Warum es nur eine öffentliche Route gibt

Die Pfadsegmente unterscheiden sich je Sprache:

```
/fr/votre-situation/france/acheter-un-bien-immobilier/
/de/ihre-situation/frankreich/immobilie-kaufen/
/en/your-situation/france/buying-property/
```

Astros `i18n`-Routing kann nur ein Präfix voranstellen, nicht die Segmente
übersetzen. Deshalb baut `src/lib/pages.ts` die vollständige Adresstabelle,
und `src/pages/[lang]/[...chemin].astro` erzeugt daraus jede Seite.

Dieselbe Tabelle speist Sitemap, hreflang, Brotkrumen und die Link-Prüfung.
Es gibt keine zweite Liste, die abweichen könnte.

## Die Vorschau im Redaktionsbereich

Der Redaktionsbereich zeigt die gebaute Seite in einem `<iframe>` über die
ganze Fläche (dieselbe Adresse, derselbe Server) und legt beim Laden die
gespeicherten und die noch nicht gespeicherten Texte darüber. Einzeilige
Texte werden dort `contenteditable`, `data-lw-html` öffnet den Texteditor in
einem Fenster. Getippt wird zuerst nur im Browser; „Speichern“ schreibt alles
auf einmal, je Datensatz frisch gelesen (`src/admin/atelier/Atelier.tsx`).
Der „Login“-Link im Footer (`Pied.astro`) führt nach `/admin/?seite=<pfad>`,
damit es auf derselben Seite weitergeht. Welcher Text zu welchem Datensatz gehört, steht im HTML:

```html
<h2 data-lw="settings|pages|valeur.accueil.sections.services.titre">…</h2>
<p data-lw="faq|premier-entretien-prix|reponse" data-lw-html>…</p>
```

Tabelle, Schlüssel und Pfad ins jsonb; die Sprache kommt aus dem
`lang`-Attribut der Seite. Gesetzt werden die Attribute mit den Helfern aus
`src/lib/edition.ts` (`ed`, `edPage`, `edAvocat`, `edFamille`). **Wer ein
neues Textfeld auf die Seite bringt, markiert es dort mit** — sonst lässt es
sich in der Vorschau nicht anklicken. Markiert wird nur ein Element, dessen
Inhalt genau dieses eine Feld ist.

„Ihre Änderungen“ vergleicht jede Zeile, die nach `meta.genere_le` des
Schnappschusses gespeichert wurde, mit ihrer ersten Vorfassung danach aus
`revisions` (`src/admin/atelier/modifications.ts`). An den Browser gehen
dafür nur dieser Zeitpunkt und die Liste der gebauten Sprachen, nicht der
Schnappschuss — darin stehen auch Entwürfe.

## Die Veröffentlichungsschranken

| Inhalt | Bedingung |
|---|---|
| Dossier | Titel, Adresse und Text in der Sprache der Seite |
| Konferenz | Titel; dazu PDF, Dossier oder Veranstaltungsseite |
| Tätigkeit | Bezeichnung, Adresse, Kurztext und Text |
| Sprachfassung | Oberfläche vollständig übersetzt |

Was durchfällt, wird in dieser Sprache nicht gebaut, steht nicht in der
Sitemap und wird nirgends verlinkt. `npm run content:check` listet auf, was
in welcher Sprache entsteht. Die Datenbank prüft dasselbe noch einmal
(`supabase/migrations/0005_alte_seite.sql`).

## Supabase einrichten

Ausführlich in [DATENBANK.md](DATENBANK.md) — mit beiden Wegen (örtlich zum
Ausprobieren, bei Supabase für den Betrieb), dem ersten Konto und den
Stolpersteinen, die dabei wirklich aufgetreten sind.

Kurzfassung für den Betrieb:

```bash
npx supabase link --project-ref IHRE-REF
npx supabase db push
npx supabase db execute --file supabase/seed.sql
npx supabase functions deploy send-inquiry publish process-image
npm run konto -- lorang@… 'Passwort' owner 'Alain Lorang'
```

## Repository-Secrets in GitHub

| Name | Wofür |
|---|---|
| `PUBLIC_SUPABASE_URL` | Projekt-URL |
| `PUBLIC_SUPABASE_ANON_KEY` | öffentlicher Schlüssel, darf in den Browser |
| `SUPABASE_SERVICE_ROLE_KEY` | umgeht RLS, **nur** im Build |
| `SUPABASE_DB_URL`, `SUPABASE_DB_PASSWORD` | für die Sicherung |
| `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` | Ausliefern |

Als Variablen (nicht Secrets): `PUBLIC_SITE_URL`, `APERCU_URL`.

Fehlen `CLOUDFLARE_API_TOKEN` und `CLOUDFLARE_ACCOUNT_ID`, bricht nichts
ab: gebaut und geprüft wird trotzdem, nur das Ausliefern entfällt, und
die fertige Seite liegt als Artefakt `website` beim jeweiligen Lauf.
Dasselbe gilt für die nächtliche Sicherung ohne `SUPABASE_DB_URL`.

## Die Vorschau auf GitHub Pages

`.github/workflows/pages.yml` liefert jeden Stand von `main` unter

    https://<konto>.github.io/<repository>/

aus. Das ist eine **Vorschau, nicht die veröffentlichte Seite**: jede
Seite trägt `noindex`, und `robots.txt` sperrt alles. Eine unfertige
Fassung darf nicht neben der echten Seite im Index stehen — sie würde mit
ihr um dieselben Suchbegriffe konkurrieren.

GitHub Pages liefert ein Projekt-Repository unter einem Unterpfad aus,
nicht in der Wurzel. Dafür gibt es `PUBLIC_BASE_PATH` und
`src/lib/base.ts`: `prefixer()` setzt den Präfix vor jede Adresse, die
nicht von Astro selbst gebündelt wird. Bei `/` — also auf der eigenen
Domain — ist die Funktion wirkungslos und der Build Zeichen für Zeichen
derselbe. Zwei Prüfungen halten das fest:

* `check-links.mjs` kennt den Präfix und meldet jede Adresse, die ihn
  verloren hat, als `Link ohne Auslieferungspräfix`;
* ein eigener Schritt im Ablauf durchsucht das gebaute HTML nach
  absoluten Adressen ohne Präfix — Schriften und Bilder brechen unter
  einem Unterpfad als Erstes und zeigen sich in keiner Linkprüfung.

Lokal nachstellen lässt sich das so:

    PUBLIC_BASE_PATH=/lw-legis PUBLIC_NOINDEX=1 npm run build:offline
    PUBLIC_BASE_PATH=/lw-legis npm run check:links

Was GitHub Pages nicht kann: eigene Kopfzeilen (`_headers` wird nicht
gelesen, also auch kein `X-Robots-Tag` und keine CSP), Weiterleitungen
aus `_redirects` und eine Zusage über den Standort der Rechenzentren.
Für den Betrieb bleibt es deshalb bei Cloudflare Pages.

## Sicherung zurückspielen

Eine Sicherung, die nie zurückgespielt wurde, ist keine Sicherung. Einmal
üben, bevor es ernst wird:

```bash
# Abzug holen
curl -H "Authorization: Bearer $SERVICE_KEY" \
  "$SUPABASE_URL/storage/v1/object/sicherungen/sicherung-2026-09-20.sql.gz" \
  -o sicherung.sql.gz
gunzip sicherung.sql.gz

# In ein LEERES Testprojekt einspielen, nie in die Produktion
psql "$TEST_DB_URL" -f supabase/migrations/0001_schema.sql
psql "$TEST_DB_URL" -f supabase/migrations/0002_rls.sql
psql "$TEST_DB_URL" -f sicherung.sql
```

## Prüfungen

| Befehl | Was er prüft |
|---|---|
| `npm run check:contrast` | jede Farbkombination gegen WCAG 2.2 AA |
| `npm run content:check` | offene Übersetzungen, unfertige Inhalte, Titellängen |
| `npm run check:links` | tote Links und Anker, hreflang, `<h1>`, Alt-Texte, NAP |
| `npm run typecheck` | TypeScript |

`npm run build` führt die ersten drei selbst aus.

## Farben und Übergänge

Die sechs Grundtöne stehen als Tokens in `src/styles/global.css`. Dazu
kommen sechs abgeleitete Werte: drei Messingtöne für unterschiedliche
Gründe und drei Endpunkte für die Übergänge.

Die Seite arbeitet mit weichen Übergängen statt harter Kanten zwischen
den Bändern: Die hellen Abschnitte gehen an ihren Rändern in die
Grundfläche über, die Grundfläche selbst hat einen kaum wahrnehmbaren
warmen Zug von oben nach unten, der Fußbereich läuft ins Tiefere, und die
Messinglinien laufen nach rechts aus, statt abzubrechen.

Das ist eine Abweichung von der ursprünglichen Vorgabe, die Farbverläufe
ausschloss. Der Grund für die Vorgabe war der Verlauf als **Dekoration** —
der bunte Farbklecks, der nichts bedeutet. Hier ersetzt der Verlauf eine
Kante, die vorher Struktur vortäuschte, wo keine war. Und seit auf der
Seite Fotos mit warmem Holz liegen, wirkte das kühle Graugrün daneben
fahl.

**Jeder Endpunkt eines Verlaufs ist geprüft.** Ein Verlauf verschiebt den
Grund, auf dem Text steht; ein ungeprüfter Grund ist genauso riskant wie
eine ungeprüfte Farbe. `npm run check:contrast` prüft inzwischen 30
Kombinationen und schreibt sie nach `docs/kontrast.md`.

## Bewegung

Zwei Systeme, beide mit derselben Regel: **kein Inhalt hängt von einer
Animation ab.**

**Beim Laden** hebt sich der Seiteninhalt einmal um 0,7 rem. Die Animation
verändert nur `transform`, nicht `opacity` — läuft sie nicht, steht die
Seite trotzdem vollständig da. Der erste Entwurf blendete über die
Deckkraft ein; beim Rendern mit einem Schnappschuss-Werkzeug kam eine
leere Seite heraus. Dasselbe passiert auf einem sehr langsamen Gerät.

**Beim Scrollen** blendet `src/scripts/revele.ts` ein, was in den Blick
kommt. Das Skript versteckt dabei **ausschließlich, was beim Start unter
der Falz liegt** — was sichtbar ist, bleibt unangetastet. Zusätzlich gibt
es eine Reißleine: nach zwölf Sekunden wird alles gezeigt, egal was der
Beobachter meldet. Kein Scroll-Listener; ein IntersectionObserver feuert
einmal je Element und hört dann auf.

Die Bewegung ist je Inhalt verschieden, damit sie nicht als ein einziger
Baukastenreflex liest:

| Inhalt | Bewegung |
|---|---|
| Überschrift | hebt sich — sie kündigt etwas an |
| Fließtext | nur Deckkraft, keine Verschiebung — Lesen soll nicht warten |
| Marginalie | kommt von der Seite, wie eine Randnotiz |
| Messinglinie | zeichnet sich von links |
| Liste | gestaffelt, Zeile für Zeile |
| Bild | legt sich aus 1,02 auf 1 |

**Beim Überfahren** zeigt der Zustand Anklickbarkeit, mehr nicht. Nichts
skaliert, nichts hüpft. Alle Hover-Regeln stehen in
`@media (hover: hover) and (pointer: fine)` — auf einem Touchgerät gibt es
kein Überfahren, und ein hängengebliebener Hover-Zustand nach dem Tippen
ist dort ein echtes Ärgernis.

`prefers-reduced-motion: reduce` schaltet beides vollständig ab, ohne dass
Inhalte verschwinden.

## Cookies

Die öffentliche Seite setzt **kein** Cookie und legt nichts auf dem Gerät des
Besuchers ab. Keine Analytik, keine fremden Einbindungen, Schriften vom
eigenen Server. Deshalb gibt es kein Cookie-Banner — es gäbe nichts
anzunehmen oder abzulehnen.

Der Redaktionsbereich legt ein Anmeldemerkmal im `localStorage` ab, und zwar
nur unter `/admin`. Das ist technisch notwendig und einwilligungsfrei.

Wenn später doch Analytik gewünscht wird: ein cookiefreies Werkzeug mit
EU-Hosting (Plausible, Matomo ohne Cookies). Sobald etwas Cookies setzt,
braucht die Seite ein Banner, und dann ist die halbe Arbeit hier umsonst.

## Browser

Der Hero benutzt das **Popover-API** (`<button popovertarget>`). Das ist seit
2024 in allen aktuellen Browsern verfügbar. Kennt ein Browser es nicht und ist
zusätzlich JavaScript abgeschaltet, erscheinen die beiden Auswahllisten
einfach untereinander im Textfluss — mit denselben echten Links. Degradiert,
aber vollständig bedienbar.

## Das Open-Graph-Bild neu erzeugen

`tools/og-bild.html` ist die Quelle. Neu rendern:

```bash
qlmanage -t -s 1200 -o /tmp tools/og-bild.html
sips -c 630 1200 /tmp/og-bild.html.png --out public/og/lw-legis.png
```

Der Inhalt ist in einem 1000×1000-Feld mittig gesetzt, weil `sips` aus der
Mitte schneidet.

---

## Lizenzen

Literata und Atkinson Hyperlegible Next stehen unter der SIL Open Font
License 1.1. Die Lizenztexte liegen unter `public/fonts/OFL-*.txt` und
müssen dort bleiben.
