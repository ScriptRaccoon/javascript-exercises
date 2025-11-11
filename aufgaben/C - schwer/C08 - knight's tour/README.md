# Aufgabe

Finde eine effiziente Lösung für das Springerproblem: Ein Weg des Springers über ein nxn-Schachbrett, bei dem jedes Feld genau einmal besucht wird. Das Startfeld kann beliebig vorgegeben werden.

Genauer gesagt, implementiere eine Funktion `find_knight_tour(n, start)`, welche eine nxn-Matrix von Zahlen ausgibt, sodass die i-te Koordinate des Springerweges mit i beschriftet wird. Wenn also zum Beispiel der Springerweg mit den Koordinaten (0,0) -> (2,1) -> (1,3) startet, bedeutet das für die Matrix, dass sie bei diesen Koordinaten die Werte 1,2,3 besitzt.

Wenn es keine Lösung gibt, soll `null` zurückgegeben werden.

Implementiere außerdem eine Funktion `print_knight_tour(n, start)`, welche die Matrix übersichtlich in die Konsole schreibt.

Hinweis: Die Funktion soll auch mit größeren Werten wie etwa `n = 10` oder gar `n = 20` schnell ein Ergebnis liefern. Daher gibt es hier Optimierungsbedarf.

# Beispiel

```js
print_knight_tour(5, [0, 0]);
```

gibt Folgendes aus (oder eine vergleichbare Lösung):

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

Auch große Felder funktionieren:

```js
print_knight_tour(12, [0, 0]);
```

soll Folgendes ausgeben (oder eine vergleichbare Lösung):

```text
┌─────────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬────┬────┬────┬────┬────┐
│ (index) │ 0   │ 1   │ 2   │ 3   │ 4   │ 5   │ 6   │ 7  │ 8  │ 9  │ 10 │ 11 │
├─────────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼────┼────┼────┼────┼────┤
│ 0       │ 1   │ 98  │ 3   │ 144 │ 95  │ 100 │ 21  │ 24 │ 89 │ 50 │ 19 │ 26 │
│ 1       │ 4   │ 137 │ 96  │ 99  │ 22  │ 143 │ 94  │ 51 │ 20 │ 25 │ 72 │ 49 │
│ 2       │ 97  │ 2   │ 141 │ 138 │ 101 │ 92  │ 23  │ 90 │ 71 │ 88 │ 27 │ 18 │
│ 3       │ 140 │ 5   │ 136 │ 103 │ 142 │ 129 │ 132 │ 93 │ 52 │ 73 │ 48 │ 61 │
│ 4       │ 117 │ 104 │ 139 │ 130 │ 133 │ 102 │ 91  │ 70 │ 87 │ 62 │ 17 │ 28 │
│ 5       │ 6   │ 135 │ 116 │ 123 │ 128 │ 131 │ 112 │ 53 │ 74 │ 45 │ 60 │ 47 │
│ 6       │ 105 │ 118 │ 127 │ 134 │ 111 │ 84  │ 69  │ 86 │ 63 │ 54 │ 29 │ 16 │
│ 7       │ 126 │ 7   │ 122 │ 115 │ 124 │ 113 │ 64  │ 75 │ 44 │ 59 │ 46 │ 39 │
│ 8       │ 119 │ 106 │ 125 │ 110 │ 83  │ 76  │ 85  │ 68 │ 55 │ 40 │ 15 │ 30 │
│ 9       │ 8   │ 109 │ 80  │ 121 │ 114 │ 65  │ 56  │ 43 │ 58 │ 33 │ 38 │ 35 │
│ 10      │ 79  │ 120 │ 107 │ 10  │ 77  │ 82  │ 67  │ 12 │ 41 │ 36 │ 31 │ 14 │
│ 11      │ 108 │ 9   │ 78  │ 81  │ 66  │ 11  │ 42  │ 57 │ 32 │ 13 │ 34 │ 37 │
└─────────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴────┴────┴────┴────┴────┘
```

Hingegen gilt:

- `print_knight_tour(4, [0, 0]) == null`
- `print_knight_tour(5, [1, 0]) == null`

# Themen

Backtracking, Rekursion, Sortierung, Matrizen, Laufzeitoptimierung
