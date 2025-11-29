# Aufsteigende Folgen mit unterschiedlichen Zuwächsen

## Aufgabe

Implementiere eine Funktion, die effizient für $0 \leq k \leq n$ die Anzahl der strikt aufsteigenden Folgen

$a_0 < a_1 < \cdots < a_{k-1}$

von $k$ Zahlen $0 \leq a_i < n$ berechnet, sodass die Zuwächse $d_i := a_{i+1} - a_i$ (für $0 \leq i < k-1$) paarweise verschieden sind.

Zum Beispiel ist `2 < 3 < 6 < 8` eine solche Folge (die Zuwächse sind `1,3,2`), aber `0 < 1 < 5 < 6` ist es nicht (die Zuwächse sind `1,4,1`).

## Beispiele

| Eingabe                          | Ausgabe          |
| -------------------------------- | ---------------- |
| `unique_slope_sequences(10,1)`   | `10`             |
| `unique_slope_sequences(4,2)`    | `6`              |
| `unique_slope_sequences(7,3)`    | `26`             |
| `unique_slope_sequences(11,6)`   | `0`              |
| `unique_slope_sequences(40,5)`   | `428184`         |
| `unique_slope_sequences(90,13)`  | `296022988800`   |
| `unique_slope_sequences(120,11)` | `85786588339200` |
| `unique_slope_sequences(120,16)` | `0`              |

## Themen

Rekursion, Laufzeitoptimierung, Kombinatorik, Folgen
