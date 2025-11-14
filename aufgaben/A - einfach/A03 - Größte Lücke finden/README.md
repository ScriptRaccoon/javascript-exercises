# Größte Lücke finden

## Aufgabe

Eine _Lücke_ in einem Arrays von Zahlen sei die Differenz von zwei Zahlen in diesem Array, zwischen denen sich keine andere Zahl im Array befindet. Zum Beispiel ist 3 eine Lücke im Array `[1, 6, 4]` als Differenz `4 - 1`, weil `2`, `3` nicht im Array enthalten sind.

Implementiere eine Funktion, die zu einem Array von Zahlen die größte Lücke in diesem Array berechnet.

Für ein leeres Array soll `null` zurückgegeben werden.

## Beispiele

| Eingabe                      | Ausgabe | Erklärung                      |
| ---------------------------- | ------- | ------------------------------ |
| `largest_gap([2, 10, 3, 9])` | `6`     | größte Lücke zwischen 3 und 9  |
| `largest_gap([2])`           | `0`     | einzige Lücke zwischen 2 und 2 |
| `largest_gap([])`            | `null`  | keine Lücke                    |

## Themen

Optimierungsproblem, Sortierung, Arrays, Array-Methoden
