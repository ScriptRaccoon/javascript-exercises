# Starke Umordnungen

## Aufgabe

Eine _Umordnung von $n$ Elementen vom Grad_ $d$ sei eine Permutation $s$ der Menge $\{0,\dotsc,n-1\}$ mit der Eigenschaft, dass $|s(i) - i| \geq d$ für alle $i$ gilt. Für $d=1$ sind das gerade die fixpunktfreien Permutationen (_Derangements_).

Implementiere eine Funktion, welche die Anzahl der Umordnungen von $n$ Elementen vom Grad $d$ berechnet. Sie sollte effizient vorgehen und nicht einfach alle Permutationen durchgehen. Genauer gesagt, die Zeitkomplexität sollte $O(2^n \cdot n^2)$ oder besser sein. Auch für zum Beispiel $n = 20$, $d = 5$ sollte schnell ein Ergebnis berechnet werden können. Es darf aber $n \leq 50$ angenommen werden.

Wegen der großen beteiligten Zahlen (auch in Zwischenberechnungen) muss hier mit `bigint` gearbeitet werden; `number` kann zu Ungenauigkeiten führen.

## Beispiele

| Eingabe                     | Ausgabe               |
| --------------------------- | --------------------- |
| `count_derangements(3, 0)`  | `6`                   |
| `count_derangements(1, 1)`  | `0n`                  |
| `count_derangements(2, 1)`  | `1n`                  |
| `count_derangements(3, 1)`  | `2n`                  |
| `count_derangements(4, 1)`  | `9n`                  |
| `count_derangements(5, 1)`  | `44n`                 |
| `count_derangements(6, 1)`  | `265n`                |
| `count_derangements(20, 1)` | `895014631192902121n` |
| `count_derangements(4, 2)`  | `1n`                  |
| `count_derangements(5, 2)`  | `4n`                  |
| `count_derangements(6, 2)`  | `29n`                 |
| `count_derangements(7, 2)`  | `206n`                |
| `count_derangements(20, 2)` | `114601867572247060n` |
| `count_derangements(10, 5)` | `1n`                  |
| `count_derangements(15, 5)` | `21201024n`           |
| `count_derangements(20, 5)` | `91932770123800n`     |
| `count_derangements(22, 5)` | `49865459492032640n`  |

## OEIS-Folgen

Für festes `d` erhält man eine Zahlenfolge `count_derangements(-, d)`. Für $0 \leq d \leq 6$ finden sich diese in der [OEIS](https://oeis.org/). Damit lässt sich die Implementierung der Funktion überprüfen.

| $d$ | OEIS-Folge                          | Hinweis    |
| --- | ----------------------------------- | ---------- |
| 0   | [A000142](https://oeis.org/A000142) | Fakultät   |
| 1   | [A000166](https://oeis.org/A000166) |            |
| 2   | [A001883](https://oeis.org/A001883) |            |
| 3   | [A075851](https://oeis.org/A075851) |            |
| 4   | [A075852](https://oeis.org/A075852) |            |
| 5   | [A183242](https://oeis.org/A183242) | mit Offset |
| 6   | [A183243](https://oeis.org/A183243) | mit Offset |
| 7   | fehlt                               |            |

## Themen

Laufzeitoptimierung, Permutationen, Binärzahlen, Matrizen, Algorithmen
