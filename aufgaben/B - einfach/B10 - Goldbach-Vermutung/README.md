# Goldbach-Vermutung

## Kontext

Die [Goldbach-Vermutung](https://de.wikipedia.org/wiki/Goldbachsche_Vermutung) aus der Mathematik besagt, dass jede gerade Zahl > 2 als Summe von zwei Primzahlen geschrieben werden kann (z.B. `12 = 5 + 7`). Auch wenn sie für sehr viele Zahlen bereits bestätigt ist, ist die allgemeine Aussage bis heute ein ungelöstes Problem.

## Aufgabe

Schreibe eine Funktion `verify_goldbach_up_to(n)`, welche die Goldbach-Vermutung
für alle geraden Zahlen kleiner oder gleich `n` prüft und eine entsprechende Zerlegung in die Konsole schreibt. Es müssen nicht alle Zerlegungen bestimmt werden; eine reicht aus.

## Beispiel

**Eingabe**

```js
verify_goldbach_up_to(100)
```

**Ausgabe**

```text
Verifying Goldbach conjecture up to 100 ...
4 = 2 + 2
6 = 3 + 3
8 = 3 + 5
10 = 3 + 7
12 = 5 + 7
14 = 3 + 11
16 = 3 + 13
18 = 5 + 13
20 = 3 + 17
22 = 3 + 19
24 = 5 + 19
26 = 3 + 23
28 = 5 + 23
30 = 7 + 23
32 = 3 + 29
34 = 3 + 31
36 = 5 + 31
38 = 7 + 31
40 = 3 + 37
42 = 5 + 37
44 = 3 + 41
46 = 3 + 43
48 = 5 + 43
50 = 3 + 47
52 = 5 + 47
54 = 7 + 47
56 = 3 + 53
58 = 5 + 53
60 = 7 + 53
62 = 3 + 59
64 = 3 + 61
66 = 5 + 61
68 = 7 + 61
70 = 3 + 67
72 = 5 + 67
74 = 3 + 71
76 = 3 + 73
78 = 5 + 73
80 = 7 + 73
82 = 3 + 79
84 = 5 + 79
86 = 3 + 83
88 = 5 + 83
90 = 7 + 83
92 = 3 + 89
94 = 5 + 89
96 = 7 + 89
98 = 19 + 79
100 = 3 + 97
```

## Bonusaufgabe

Optimiere die Funktion, sodass auch in wenigen Sekunden die Goldbach-Vermutung bis zu 1 Mrd. geprüft werden kann (ohne Ausgabe der Paare).

## Themen

Arithmetik, Mathematik, Primzahlen, Schleifen
