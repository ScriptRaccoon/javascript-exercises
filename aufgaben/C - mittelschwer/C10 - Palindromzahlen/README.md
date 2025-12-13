# Palindromzahlen

## Aufgabe

Eine natürliche Zahl heißt _Palindromzahl_, wenn sie im Dezimalsystem von vorne und hinten gelesen den gleichen Wert hat, wie z.B. `10101` und `9229` (aber nicht `123`).

Implementiere eine Funktion `next_palindrome(n)`, die für eine natürliche Zahl $n$ die kleinste Palindromzahl bestimmt, die $\geq n$ ist.

Benutze dabei eine effiziente Methode, die _nicht_ lediglich die Zahlen $n$, $n + 1$, $n + 2$, ... durchgeht und prüft, welche davon erstmals eine Palindromzahl ist. Die Methode sollte auch für große $n$ sehr schnell das Ergebnis liefern. Genauer gesagt soll die Laufzeit $O(\log(n))$ sein.

## Beispiele

| Eingabe                             | Ausgabe            |
| ----------------------------------- | ------------------ |
| `next_palindrome(99)`               | `99`               |
| `next_palindrome(123)`              | `131`              |
| `next_palindrome(9190)`             | `9229`             |
| `next_palindrome(10004)`            | `10101`            |
| `next_palindrome(1129404)`          | `1130311`          |
| `next_palindrome(4249812309120352)` | `4249812332189424` |

## Themen

Arithmetik, Strings, Laufzeitoptimierung
