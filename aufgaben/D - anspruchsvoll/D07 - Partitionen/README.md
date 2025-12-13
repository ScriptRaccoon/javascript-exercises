# Partitionen

## Aufgabe

Wieviele Möglichkeiten gibt es, 7.52 € in Münzen zu zerlegen? Das heißt, wieviele Möglichkeiten gibt es, die Zahl 752 als Summe von Zahlen der Form 1, 2, 5, 10, 20, 50, 100, 200 zu schreiben?

Schreibe dazu allgemein eine Funktion `count_partitions(n, parts)`, welche die Anzahl der Summenzerlegungen (Partitionen) der natürlichen Zahl `n` mit Zahlen aus einem Array `parts` von Zahlen bestimmt.

Die Reihenfolge der Zahlen in der Zerlegung soll keine Rolle spielen. Zum Beispiel sollen `1 + 2` und `2 + 1` als nur eine Zerlegung gezählt werden.

Hinweis: Es gibt eine naheliegende rekursive Implementierung, die allerdings sehr langsam ist. Finde eine effiziente Methode.

## Beispiele

| Eingabe                                                  | Ausgabe    |
| -------------------------------------------------------- | ---------- |
| `count_partitions(12, [1, 2, 5, 10])`                    | `15`       |
| `count_partitions(101, [50])`                            | `0`        |
| `count_partitions(752, [1, 2, 5, 10, 20, 50, 100, 200])` | `60510110` |
| `count_partitions(999, [33, 56, 60])`                    | `6`        |

Zur Illustration werden hier die 15 Partitionen von 12 mit 1, 2, 5, 10 aufgelistet (mit aufsteigenden Summanden):

```text
1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1
1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 2
1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 2 + 2
1 + 1 + 1 + 1 + 1 + 1 + 2 + 2 + 2
1 + 1 + 1 + 1 + 2 + 2 + 2 + 2
1 + 1 + 2 + 2 + 2 + 2 + 2
2 + 2 + 2 + 2 + 2 + 2
1 + 1 + 10
2 + 10
1 + 1 + 1 + 1 + 1 + 1 + 1 + 5
1 + 1 + 1 + 1 + 1 + 2 + 5
1 + 1 + 1 + 2 + 2 + 5
1 + 2 + 2 + 2 + 5
1 + 1 + 5 + 5
2 + 5 + 5
```

## Themen

Dynamische Programmierung, Rekursion, Cache, Arithmetik, Algorithmen
