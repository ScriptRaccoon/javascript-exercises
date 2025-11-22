# Quadratzahlen

## Aufgabe

Eine _Quadratzahl_ ist eine natürliche Zahl, die sich als Quadrat einer natürlichen Zahl schreiben lässt (0, 1, 4, 9, 16, usw.).

Implementiere eine Funktion, die überprüft, ob eine natürliche Zahl eine Quadratzahl ist. Dabei soll _nicht_ die Wurzelfunktion benutzt werden.

Wenn der Funktion eine negative oder nicht-ganze Zahl übergeben wird, wird `false` zurückgegeben.

## Beispiele

| Eingabe          | Ausgabe |
| ---------------- | ------- |
| `is_square(-2)`  | `false` |
| `is_square(1.5)` | `false` |
| `is_square(0)`   | `true`  |
| `is_square(1)`   | `true`  |
| `is_square(5)`   | `false` |
| `is_square(121)` | `true`  |
| `is_square(250)` | `false` |

## Themen

Arithmetik, Schleifen
