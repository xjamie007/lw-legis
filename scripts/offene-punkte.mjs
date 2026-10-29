/**
 * scripts/offene-punkte.mjs
 *
 * Erzeugt OFFENE-PUNKTE.md aus dem Register in
 * content/source/ouvertes.mjs und dem aktuellen Schnappschuss.
 *
 * Damit gibt es genau eine Quelle: was auf der Website als offene Stelle
 * erscheint, steht auch in dieser Liste — und umgekehrt. Eine von Hand
 * gepflegte zweite Liste waere nach der ersten Aenderung falsch.
 *
 * Aufruf:  node scripts/offene-punkte.mjs
 */
import { readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { OUVERTES } from '../content/source/ouvertes.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const snap = JSON.parse(await readFile(join(ROOT, 'content', 'snapshot.json'), 'utf8'));

const entrees = Object.entries(OUVERTES);
const bloquants = entrees.filter(([, o]) => o.bloquant);
const autres = entrees.filter(([, o]) => !o.bloquant);

const parDomaine = (liste) => {
  const m = new Map();
  for (const [id, o] of liste) {
    if (!m.has(o.domaine)) m.set(o.domaine, []);
    m.get(o.domaine).push([id, o]);
  }
  return m;
};

const bloc = (id, o) => {
  const marque = o.statut === 'unbestaetigt' ? 'UNBESTÄTIGT' : 'FEHLT';
  return [`### ${o.titre}  <span title="${id}">[${marque}]</span>`, '', o.question, ''].join('\n');
};

const situationsOffen = snap.situations.filter((s) => s.statut !== 'publie').length;
const docsOffen = snap.publications.filter((p) => !p.etat_du_droit).length;

const md = `# Offene Punkte

**Diese Liste muss abgearbeitet sein, bevor die Website online geht.**

Alles, was hier steht, ist auf der ausgelieferten Seite **sichtbar als offene
Stelle markiert** — in Messing hinterlegt, nicht zu übersehen. Nichts davon
wurde erfunden: keine Registernummer, keine Adresse, keine Öffnungszeit, kein
Rechtsinhalt und keine luxemburgische Übersetzung.

Erzeugt von \`scripts/offene-punkte.mjs\`. Neu erzeugen mit
\`node scripts/offene-punkte.mjs\`.

| | Anzahl |
|---|---|
| Punkte insgesamt | **${entrees.length}** |
| davon blockierend | **${bloquants.length}** |
| Konstellationen ohne Inhalt | ${situationsOffen} von ${snap.situations.length} |
| Dokumente ohne Rechtsstand | ${docsOffen} von ${snap.publications.length} |

---

## Teil 1 — Was einem Livegang entgegensteht

Ohne diese Angaben darf die Seite nicht online gehen. Bei einem Impressum
sind falsche oder fehlende Pflichtangaben keine Formalie, sondern ein
abmahnfähiger Zustand.

${[...parDomaine(bloquants)]
  .map(([domaine, liste]) => `## ${domaine}\n\n${liste.map(([id, o]) => bloc(id, o)).join('\n')}`)
  .join('\n')}
---

## Teil 2 — Was die Seite besser macht, aber sie nicht aufhält

Diese Punkte blockieren nichts. Die betroffenen Bereiche sind technisch
fertig und erscheinen, sobald die Inhalte da sind.

${[...parDomaine(autres)]
  .map(([domaine, liste]) => `## ${domaine}\n\n${liste.map(([id, o]) => bloc(id, o)).join('\n')}`)
  .join('\n')}
---

## Teil 3 — Was wir empfehlen, ohne dass es eine Frage wäre

### Die vier Google-Einträge zusammenführen

Es gibt mindestens vier konkurrierende Google-Unternehmensprofile:

| Eintrag | Bewertung |
|---|---|
| Etude D'Avocats LW LEGIS | 3,9 bei 7 Bewertungen |
| Lorang Alain | 3,7 bei 6 Bewertungen |
| AVOCAT LORANG | 4,3 bei 4 Bewertungen |
| Etude Alain Lorang | ohne Bewertungen |

Das verteilt siebzehn Bewertungen und die gesamte lokale Sichtbarkeit auf
vier Karteileichen. Google wertet jeden Eintrag einzeln; vier schwache
schlagen einen starken nicht.

**Zu tun:** einen Eintrag behalten — sinnvollerweise „Etude D'Avocats LW
LEGIS“, weil er die meisten Bewertungen hat und zum Namen der neuen Seite
passt. Die übrigen drei über Google Business Profile als Duplikat melden und
zusammenführen lassen. Danach in diesem einen Eintrag exakt dieselben Daten
eintragen, die auch auf der Website stehen:

    Étude d'Avocats LW LEGIS
    41, avenue du X Septembre
    L-2551 Luxembourg
    +352 44 71 76-1
    contact@cabinet-avocats-lorang.com

Exakt dieselbe Schreibweise, auch bei „avenue“ (nicht „av.“) und bei der
Postleitzahl. Abweichungen kosten lokale Sichtbarkeit.

Sobald der Eintrag steht, gehört seine Adresse in die Stammdaten
(Redaktionsbereich → Einstellungen → \`profils.google\`); sie erscheint dann
als \`sameAs\` in den strukturierten Daten und verbindet Seite und Profil.

### Weiterleitungen von der alten Seite

Jede Adresse von cabinet-avocats-lorang.com, die Google kennt, sollte per
301 auf ihre Entsprechung zeigen. Ohne das beginnt die neue Seite bei null.
Die Liste der alten Adressen steht in der Google Search Console unter
„Seiten“. Besonders wichtig: die zehn Dossier-Unterseiten und die
PDF-Adressen der Konferenzunterlagen.

### Das Datum der Konferenzunterlage

Von den neunzehn Unterlagen trägt genau eine ein Datum im Dateinamen:
\`conference-07-2025.pdf\`, also Juli 2025. Aus dem Namen geht nicht hervor,
welche der neunzehn das ist. Diese eine ließe sich sofort veröffentlichen —
die anderen achtzehn brauchen ihren Rechtsstand.

---

## Wie diese Punkte in die Seite kommen

Fast alles lässt sich im Redaktionsbereich selbst eintragen, ohne dass
jemand Code anfasst:

| Punkt | Wo |
|---|---|
| Registerdaten, Versicherung, Aufsicht | Einstellungen → Stammdaten (nur Inhaber) |
| Öffnungszeiten, Anfahrt, Parken | Einstellungen → Stammdaten |
| Honorare | Seiten → Honorare |
| Antwortfrist | Seiten → Bestätigung, und Häufige Fragen |
| Team | Team → Neu anlegen |
| Dokumente und Rechtsstand | Dokumente |
| Konstellationen | Situationsmatrix |
| Geschäftsbedingungen | Rechtstexte (nur Inhaber) |

Die luxemburgische Sprachfassung braucht einen Muttersprachler und wird
zusätzlich in \`src/i18n/lb.json\` und in \`src/lib/routes.ts\` eingetragen —
das ist der einzige Punkt, der einen Entwickler braucht.

---

*Stand: ${new Date().toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })}*
`;

await writeFile(join(ROOT, 'OFFENE-PUNKTE.md'), md, 'utf8');
console.log(
  `OFFENE-PUNKTE.md geschrieben: ${entrees.length} Punkte, davon ${bloquants.length} blockierend.`,
);
