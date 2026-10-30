# Kontrastprüfung — WCAG 2.2 AA

Erzeugt von `scripts/check-contrast.mjs`. Neu erzeugen mit `npm run check:contrast`.

Geprüft wird jede Farbkombination, die im Entwurf tatsächlich vorkommt.
Schwellen nach WCAG 2.2: **4,5:1** für Fließtext und kleinen Text,
**3,0:1** für großen Text, Bedienelemente und grafische Abgrenzungen
(Erfolgskriterium 1.4.11).

## Palette

| Token | Hex |
|---|---|
| `marine` | `#13294B` |
| `marine-tief` | `#0C1C36` |
| `encre` | `#0E1A2B` |
| `texte` | `#2B3442` |
| `gris` | `#5B6575` |
| `trait` | `#D9DDE3` |
| `brume` | `#F3F4F6` |
| `blanc` | `#FFFFFF` |
| `or` | `#A07C3C` |
| `or-clair` | `#CDB27F` |
| `marine-texte` | `#B9C3D3` |
| `erreur` | `#A32020` |
| `bordure` | `#858E9B` |

## Ergebnisse

| Kombination | Verhältnis | Mindestens | Verwendung |
|---|---|---|---|
| `texte` auf `blanc` | 12,56:1 | 4.5 | Fließtext |
| `texte` auf `brume` | 11,41:1 | 4.5 | Fließtext auf hellgrauen Bändern |
| `encre` auf `blanc` | 17,48:1 | 4.5 | Überschriften, Menü |
| `encre` auf `brume` | 15,88:1 | 4.5 | Überschriften auf hellgrauen Bändern |
| `gris` auf `blanc` | 5,89:1 | 4.5 | Sekundärtext, Einleitungen |
| `gris` auf `brume` | 5,36:1 | 4.5 | Sekundärtext auf hellgrauen Bändern |
| `marine` auf `blanc` | 14,52:1 | 4.5 | Links, Knöpfe als Text |
| `marine` auf `brume` | 13,19:1 | 4.5 | Links auf hellgrauen Bändern |
| `blanc` auf `marine` | 14,52:1 | 4.5 | Schrift auf Marine (Hero, Bänder, Knöpfe) |
| `marine-texte` auf `marine` | 8,16:1 | 4.5 | Zweitschrift auf Marine |
| `or-clair` auf `marine` | 7,10:1 | 4.5 | Gold als Schrift auf Marine |
| `marine-tief` auf `or-clair` | 8,32:1 | 4.5 | Schrift auf dem goldenen Knopf |
| `blanc` auf `marine-tief` | 17,00:1 | 4.5 | Schrift im Fußbereich und in der Leiste |
| `marine-texte` auf `marine-tief` | 9,56:1 | 4.5 | Zweitschrift im Fußbereich |
| `or-clair` auf `marine-tief` | 8,32:1 | 4.5 | Gold als Schrift im Fußbereich |
| `erreur` auf `blanc` | 7,54:1 | 4.5 | Fehlermeldungen im Formular |
| `or` auf `blanc` | 3,86:1 | 3 | Goldlinien, Pfeile, Fokusring (grafisch, WCAG 1.4.11) |
| `or` auf `brume` | 3,51:1 | 3 | Goldlinien auf hellgrauen Bändern |
| `bordure` auf `blanc` | 3,31:1 | 3 | Rahmen der Formularfelder (WCAG 1.4.11) |
| `or` auf `blanc` | 3,86:1 | 4.5 | Gold als Text auf Weiß — NICHT eingesetzt (nicht verbindlich) |

## Befunde

**Gold traegt auf Weiss keinen Text.** Das Gold des Wappens erreicht gegen
Weiss nur 3,86:1. Es steht deshalb nur
als Linie, Pfeil, Fokusring und im Logo. Als Schrift erscheint Gold nur auf
Marine, in der helleren Fassung `or-clair`.
