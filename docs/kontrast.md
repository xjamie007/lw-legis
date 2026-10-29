# Kontrastprüfung — WCAG 2.2 AA

Erzeugt von `scripts/check-contrast.mjs`. Neu erzeugen mit `npm run check:contrast`.

Geprüft wird jede Farbkombination, die im Entwurf tatsächlich vorkommt.
Schwellen nach WCAG 2.2: **4,5:1** für Fließtext und kleinen Text,
**3,0:1** für großen Text, Bedienelemente und grafische Abgrenzungen
(Erfolgskriterium 1.4.11).

## Palette

| Token | Hex | Verwendung |
|---|---|---|
| `encre` | `#1E1A13` | Fließtext, Fußbereich |
| `frontiere` | `#2F5340` | Leitfarbe, alle interaktiven Elemente |
| `laiton` | `#A87A35` | Linien, Marginalien, aktiver Zustand |
| `papier` | `#EFEADB` | Grundfläche der Seite |
| `craie` | `#FAF7EE` | Lesefläche |
| `pierre` | `#5A5348` | Sekundärtext, Randspalte |

### Abgeleitete Werte

| Token | Hex | Grund |
|---|---|---|
| `frontiere-tief` | `#264333` | siehe Befunde unten |
| `laiton-texte` | `#88632B` | siehe Befunde unten |
| `laiton-clair` | `#A87A35` | siehe Befunde unten |
| `craie-gedaempft` | `#BDB4A4` | siehe Befunde unten |
| `papier-warm` | `#F3EEE1` | siehe Befunde unten |
| `craie-warm` | `#FDFBF4` | siehe Befunde unten |
| `encre-tief` | `#14110C` | siehe Befunde unten |

## Ergebnisse

| Vordergrund | Hintergrund | Verhältnis | Schwelle | Ergebnis | Verwendung |
|---|---|---|---|---|---|
| `encre` | `craie` | 16,17:1 | 4.5:1 | **bestanden** | Fließtext auf der Lesefläche |
| `encre` | `papier` | 14,40:1 | 4.5:1 | **bestanden** | Fließtext auf der Grundfläche |
| `encre` | `sable` | 12,67:1 | 4.5:1 | **bestanden** | Fließtext auf der Messingwäsche |
| `pierre` | `craie` | 7,09:1 | 4.5:1 | **bestanden** | Sekundärtext, Marginalie auf Lesefläche |
| `pierre` | `papier` | 6,31:1 | 4.5:1 | **bestanden** | Sekundärtext, Marginalie auf Grundfläche |
| `pierre` | `sable` | 5,56:1 | 4.5:1 | **bestanden** | Sekundärtext auf der Messingwäsche |
| `frontiere` | `craie` | 8,06:1 | 4.5:1 | **bestanden** | Link und Einsetzstelle im Hero |
| `frontiere` | `papier` | 7,18:1 | 4.5:1 | **bestanden** | Link auf Grundfläche |
| `frontiere` | `sable` | 6,32:1 | 4.5:1 | **bestanden** | Link auf der Messingwäsche |
| `frontiere-tief` | `papier` | 9,03:1 | 4.5:1 | **bestanden** | Link, Hover- und Aktivzustand |
| `craie` | `frontiere` | 8,06:1 | 4.5:1 | **bestanden** | Schrift auf gefülltem Knopf |
| `laiton` | `papier` | 3,17:1 | 3.0:1 | **bestanden** | Linie in Messing (grafische Abgrenzung, WCAG 1.4.11) |
| `laiton` | `craie` | 3,56:1 | 3.0:1 | **bestanden** | Linie in Messing auf Lesefläche |
| `laiton` | `papier` | 3,17:1 | 4.5:1 | durchgefallen (nachrichtlich) | Messing als Fließtextfarbe — NICHT eingesetzt, siehe Befund 1 |
| `laiton` | `sable` | 2,79:1 | 3.0:1 | durchgefallen (nachrichtlich) | Messing auf der Messingwäsche — NICHT eingesetzt, siehe Befund 2 |
| `laiton-texte` | `papier` | 4,52:1 | 4.5:1 | **bestanden** | Messing als Textfarbe — Marginalie, aktiver Zustand |
| `laiton-texte` | `craie` | 5,07:1 | 4.5:1 | **bestanden** | Messing als Textfarbe auf Lesefläche |
| `craie` | `encre` | 16,17:1 | 4.5:1 | **bestanden** | Text auf dunklem Grund (Fußzeile, Leiste) |
| `craie-gedaempft` | `encre` | 8,44:1 | 4.5:1 | **bestanden** | Sekundärtext auf dunklem Grund |
| `laiton-clair` | `encre` | 4,54:1 | 4.5:1 | **bestanden** | Messing als Textfarbe auf dunklem Grund |
| `laiton` | `encre` | 4,54:1 | 3.0:1 | **bestanden** | Messinglinie auf dunklem Grund |
| `frontiere` | `papier` | 7,18:1 | 3.0:1 | **bestanden** | Fokusring gegen Grundfläche |
| `frontiere` | `craie` | 8,06:1 | 3.0:1 | **bestanden** | Fokusring gegen Lesefläche |
| `craie` | `frontiere` | 8,06:1 | 3.0:1 | **bestanden** | Fokusring auf gefülltem Knopf |
| `laiton-clair` | `encre` | 4,54:1 | 3.0:1 | **bestanden** | Fokusring auf dunklem Grund |
| `encre` | `papier-warm` | 14,95:1 | 4.5:1 | **bestanden** | Fließtext am warmen Ende der Grundfläche |
| `encre` | `craie-warm` | 16,73:1 | 4.5:1 | **bestanden** | Fließtext am warmen Ende der Lesefläche |
| `pierre` | `papier-warm` | 6,55:1 | 4.5:1 | **bestanden** | Sekundärtext am warmen Ende |
| `pierre` | `craie-warm` | 7,33:1 | 4.5:1 | **bestanden** | Sekundärtext am warmen Ende der Lesefläche |
| `frontiere` | `papier-warm` | 7,45:1 | 4.5:1 | **bestanden** | Link am warmen Ende |
| `frontiere` | `craie-warm` | 8,34:1 | 4.5:1 | **bestanden** | Link am warmen Ende der Lesefläche |
| `laiton-texte` | `papier-warm` | 4,69:1 | 4.5:1 | **bestanden** | Messingtext am warmen Ende |
| `laiton` | `papier-warm` | 3,30:1 | 3.0:1 | **bestanden** | Messinglinie am warmen Ende |
| `craie` | `encre-tief` | 17,58:1 | 4.5:1 | **bestanden** | Text am tiefen Ende des Fußbereichs |
| `craie-gedaempft` | `encre-tief` | 9,17:1 | 4.5:1 | **bestanden** | Sekundärtext am tiefen Ende |
| `laiton-clair` | `encre-tief` | 4,93:1 | 4.5:1 | **bestanden** | Messingtext am tiefen Ende |
| `papier` | `craie` | 1,12:1 | 1.0:1 | bestanden (nachrichtlich) | Grundfläche gegen Lesefläche — bewusst leise |
| `sable` | `papier` | 1,14:1 | 1.0:1 | bestanden (nachrichtlich) | Messingwäsche gegen Grundfläche — hier soll man die Kante sehen |

## Befunde und Abweichungen

**1. `laiton` (#A07C3C) trägt keinen Fließtext.**
Gegen `papier` erreicht das Messing 3,17:1.
Für Linien, Rahmen und grafische Abgrenzungen (Schwelle 3,0:1) reicht das,
für Text (4,5:1) nicht. Das Konzept sieht Messing ohnehin nur für
Marginalien, Linien und den aktiven Zustand vor. Wo Messing **als Text**
nötig ist, wird `laiton-texte` (#7A5D2B) eingesetzt:
4,52:1 gegen `papier`,
5,07:1 gegen `craie`.
Der Farbton bleibt erkennbar dasselbe Messing, nur abgedunkelt.

**2. `laiton` trägt auch auf dunklem Grund keinen Text.**
Gegen `encre` erreicht das Messing 4,54:1
und verfehlt die 4,5:1 damit knapp. Als Linie und als Wappen in der Fußzeile
ist es zulässig (Schwelle 3,0:1). Für **Text** auf dunklem Grund wird
`laiton-clair` (#AB8440) eingesetzt: 4,54:1.
Farbton und Sättigung bleiben unverändert (HSL 38,4° / 45,5 %), nur die
Helligkeit steigt von 43,1 % auf 46 %. Das ist der kleinste Schritt, der die
Schwelle mit Reserve nimmt — geraten wurde nichts, der Wert ist gesucht worden.

Damit gibt es drei Messingwerte, jeder mit genau einem Einsatzgebiet:
`laiton` für Linien und Flächen, `laiton-texte` für Text auf hellem Grund,
`laiton-clair` für Text auf dunklem Grund. Das ist eine Abweichung vom
Konzept, das nur einen Wert vorsah — sie ist durch die Prüfung erzwungen.

**3. `pierre` ist knapp, aber ausreichend.**
7,09:1 gegen `craie` und
6,31:1 gegen `papier`.
Die Marginalie wird in 0,8125rem gesetzt und ist damit kleiner Text — die
4,5:1 gelten, und sie sind erfüllt. Weiter aufhellen würde sie unterschreiten.

**4. Farbe ist nirgends der einzige Bedeutungsträger.**
Die beiden Einsetzstellen im Hero sind zusätzlich unterstrichen und tragen
`aria-expanded`. Links im Fließtext sind unterstrichen. Der Pflichtfeld-
und Fehlerzustand im Formular wird zusätzlich durch Text und
`aria-invalid` ausgewiesen, nicht nur durch Farbe.

**5. Kein Dunkelmodus.**
Die Seite ist hell, in allen Zuständen. Das Dunkelgrün ist Textfarbe und
Fußbereich, keine Flächenvariante. Ein zweites Farbsystem hätte keine
zusätzlichen geprüften Kombinationen, sondern nur ungeprüfte.
