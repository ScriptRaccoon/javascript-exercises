# Dedekind-Zahlen

## Kontext

Für $n \geq 0$ ist die _Dedekind-Zahl_ $M(n)$ die Anzahl der Antiketten in der Potenzmenge $P(n)$, oder äquivalent, die Anzahl der Teilmengen von $P(n)$, die unter Obermengen abgeschlossen sind. Mehr dazu erfährt man bei [Wikipedia](https://de.wikipedia.org/wiki/Dedekind-Zahl).

## Aufgabe

Implementiere eine Funktion, welche die Dedekind-Zahlen für $0 \leq n \leq 6$ möglichst effizient berechnet.

Hinweis: Die Werte sind nur für $n \leq 9$ bekannt, vgl. [A000372](https://oeis.org/A000372).

## Beispiele

| Eingabe              | Ausgabe |
| -------------------- | ------- |
| `dedekind_number(0)` | 2       |
| `dedekind_number(1)` | 3       |
| `dedekind_number(2)` | 6       |
| `dedekind_number(3)` | 20      |
| `dedekind_number(4)` | 168     |
| `dedekind_number(5)` | 7581    |
| `dedekind_number(6)` | 7828354 |

## Themen

Algorithmen, Kombinatorik, Laufzeitoptimierung, Bitmasken
