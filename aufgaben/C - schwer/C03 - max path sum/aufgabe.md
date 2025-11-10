# Aufgabe

Implementiere eine Funktion, die für eine Matrix aus Zahlen die
maximale Pfadsumme berechnet: ein Pfad startet dabei ganz oben links,
geht dann jeweils nach rechts oder nach unten, und endet ganz unten rechts.

# Beispiel

```js
const matrix = [
	[5, 3, 2],
	[1, 9, 1],
	[0, 2, 8],
];

(max_path_sum(matrix) == 5 + 3 + 9 + 2 + 8) == 27;
```

Der zugehörige Pfad sieht so aus:

```text
[* *  ]
[  *  ]
[  * *]
```

Alle anderen Pfade durch die Matrix ergeben eine kleinere Summe.

Hinweis: Es gibt eine naheliegende rekursive Implementierung, die allerdings
eine schlechte Laufzeit hat. Finde möglichst eine bessere Methode, die auch
für große Matrizen (`15x15` und größer) zuverlässig funktioniert.

# Themen

Arrays, Matrizen, Rekursion, dynamische Programmierung, Laufzeitoptimierung
