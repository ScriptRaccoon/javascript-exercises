# Springerproblem

## Aufgabe

Finde eine effiziente Lösung für das _Springerproblem_: Einen Weg des Springers über das n×m-Schachbrett, bei dem jedes Feld genau einmal besucht wird. Das Startfeld kann beliebig vorgegeben werden.

Genauer gesagt, implementiere eine Funktion `find_knight_tour(n, m, start)`, welche eine n×m-Matrix von Zahlen ausgibt, sodass die i-te Koordinate des Springerweges mit i beschriftet wird. Wenn also zum Beispiel der Springerweg mit den Koordinaten (0,0) -> (2,1) -> (1,3) startet, hat die Matrix an diesen Koordinaten die Werte 1,2,3.

Wenn es keine Lösung gibt, soll `null` zurückgegeben werden.

Implementiere außerdem eine Funktion `print_knight_tour(n, m, start)`, welche die Matrix übersichtlich in die Konsole schreibt.

Hinweis: Die Funktion soll auch mit größeren Werten wie etwa `n = m = 10` oder gar `n = m = 20` schnell ein Ergebnis liefern. Der Algorithmus muss entsprechend optimiert werden.

## Beispiel 1

**Eingabe**

```js
print_knight_tour(5, 5, [0, 0])
```

**Ausgabe**

```text
┌─────────┬────┬────┬────┬────┬────┐
│ (index) │ 0  │ 1  │ 2  │ 3  │ 4  │
├─────────┼────┼────┼────┼────┼────┤
│ 0       │ 1  │ 22 │ 11 │ 16 │ 7  │
│ 1       │ 12 │ 17 │ 8  │ 21 │ 10 │
│ 2       │ 25 │ 2  │ 23 │ 6  │ 15 │
│ 3       │ 18 │ 13 │ 4  │ 9  │ 20 │
│ 4       │ 3  │ 24 │ 19 │ 14 │ 5  │
└─────────┴────┴────┴────┴────┴────┘
```

Das ist nur eine Lösung, es gibt auch andere.

## Beispiel 2

Auch große Bretter und andere Startfelder funktionieren:

**Eingabe**

```js
print_knight_tour(8, 10, [1, 1])
```

**Ausgabe**

```text
┌─────────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┐
│ (index) │ 0  │ 1  │ 2  │ 3  │ 4  │ 5  │ 6  │ 7  │ 8  │ 9  │
├─────────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
│ 0       │ 31 │ 72 │ 17 │ 64 │ 29 │ 80 │ 15 │ 48 │ 53 │ 50 │
│ 1       │ 18 │ 1  │ 30 │ 73 │ 16 │ 65 │ 54 │ 51 │ 14 │ 47 │
│ 2       │ 71 │ 32 │ 63 │ 28 │ 77 │ 68 │ 79 │ 58 │ 49 │ 52 │
│ 3       │ 2  │ 19 │ 76 │ 69 │ 74 │ 59 │ 66 │ 55 │ 46 │ 13 │
│ 4       │ 33 │ 70 │ 27 │ 62 │ 67 │ 78 │ 45 │ 60 │ 57 │ 40 │
│ 5       │ 20 │ 3  │ 34 │ 75 │ 24 │ 61 │ 56 │ 41 │ 12 │ 9  │
│ 6       │ 35 │ 26 │ 5  │ 22 │ 37 │ 44 │ 7  │ 10 │ 39 │ 42 │
│ 7       │ 4  │ 21 │ 36 │ 25 │ 6  │ 23 │ 38 │ 43 │ 8  │ 11 │
└─────────┴────┴────┴────┴────┴────┴────┴────┴────┴────┴────┘
```

## Beispiel 3

Hingegen liefern

```js
find_knight_tour(4, 4, [0, 0])
find_knight_tour(5, 5, [1, 0])
```

jeweils `null`.

## Themen

Backtracking, Rekursion, Sortierung, Matrizen, Laufzeitoptimierung, Algorithmen
