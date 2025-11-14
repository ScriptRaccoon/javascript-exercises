# Maximale Pfadsumme

## Aufgabe

Implementiere eine Funktion, die für eine Matrix aus Zahlen die maximale Summe eines Pfades berechnet, der von oben links nach unten rechts wandert. Jeder Schritt geht dabei entweder nach rechts oder unten, und aufsummiert werden die besuchten Zahlen der Matrix.

Hinweis: Es gibt eine naheliegende rekursive Implementierung, die allerdings eine schlechte Laufzeit aufweist. Finde eine bessere Methode, die auch für große Matrizen (`16x16` und größer) schnell ein Ergebnis liefert.

## Beispiel 1

**Eingabe**

```js
const matrix = [
	[5, 3, 2],
	[1, 9, 1],
	[0, 2, 8],
]

max_path_sum(matrix)
```

**Ausgabe**

```text
27
```

Denn der zugehörige Pfad ist

```text
[5 3  ]
[  9  ]
[  2 8]
```

und hat als Summe 5 + 3 + 9 + 2 + 8 = 27. Alle anderen Pfade durch die Matrix ergeben eine kleinere Summe.

## Beispiel 2

**Eingabe**

```js
const big_matrix = [
	[89, 62, 36, 56, 49, 33, 94, 58, 53, 95, 24, 38, 16, 58, 8, 55],
	[24, 8, 68, 7, 64, 32, 87, 81, 55, 28, 26, 31, 12, 92, 97, 7],
	[48, 97, 64, 15, 55, 39, 34, 21, 93, 3, 5, 41, 23, 35, 90, 66],
	[48, 56, 39, 77, 28, 0, 65, 40, 64, 56, 47, 60, 92, 97, 78, 93],
	[84, 54, 60, 6, 20, 81, 82, 47, 85, 27, 25, 44, 22, 91, 98, 24],
	[57, 89, 71, 32, 38, 71, 21, 69, 14, 25, 84, 17, 13, 90, 60, 36],
	[5, 19, 51, 48, 31, 37, 24, 59, 44, 30, 71, 69, 31, 91, 78, 21],
	[90, 89, 47, 95, 3, 61, 17, 64, 1, 15, 93, 78, 5, 63, 10, 34],
	[21, 82, 61, 12, 83, 68, 84, 71, 46, 5, 47, 48, 6, 83, 27, 25],
	[92, 64, 10, 78, 90, 55, 23, 94, 44, 9, 95, 22, 2, 15, 42, 64],
	[44, 10, 72, 90, 53, 7, 28, 93, 96, 93, 65, 13, 43, 75, 68, 95],
	[4, 51, 52, 57, 39, 43, 3, 0, 14, 60, 10, 25, 86, 44, 40, 35],
	[0, 70, 10, 99, 22, 98, 6, 38, 70, 64, 96, 62, 12, 59, 57, 80],
	[10, 98, 31, 38, 3, 34, 6, 78, 80, 40, 61, 26, 8, 70, 27, 3],
	[62, 18, 11, 53, 86, 30, 24, 73, 92, 68, 8, 80, 46, 24, 9, 12],
	[38, 10, 23, 27, 57, 16, 59, 14, 38, 46, 80, 77, 62, 44, 52, 79],
]

max_path_sum(big_matrix)
```

**Ausgabe**

```text
2118
```

## Themen

Arrays, Matrizen, Rekursion, dynamische Programmierung, Laufzeitoptimierung
