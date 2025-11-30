# Dedekind-Zahlen

## Kontext

Für $n \geq 0$ ist die _Dedekind-Zahl_ $M(n)$ die Anzahl der Antiketten in der Potenzmenge $P(n)$, oder äquivalent, die Anazhl der "oberen Teilmengen" von $P(n)$, also jene Familien, die unter Obermengen abgeschlossen sind. Mehr dazu erfährt man bei [Wikipedia](https://de.wikipedia.org/wiki/Dedekind-Zahl).

## Aufgabe

Implementiere eine Funktion, welche die Dedekind-Zahlen für $0 \leq n \leq 6$ möglichst effizient berechnet.

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
