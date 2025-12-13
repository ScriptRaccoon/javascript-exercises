# Unabhängige Teilmengen

## Aufgabe

Implementiere eine Funktion, die für einen Graphen möglichst effizient eine größte unabhängige Menge von Knoten bestimmt. Dabei heißt eine Menge von Knoten _unabhängig_, wenn je zwei Knoten nicht adjazent sind, und sie ist die größte, wenn es keine unabhängige Menge mit größerer Kardinalität gibt.

Für dieses Problem gibt es (vermutlich) keinen Algorithmus mit polynomieller Laufzeit, allerdings kann der Brute-Force-Algorithmus verbessert werden.

Benutze die Funktion anschließend, um das folgende Problem zu lösen: für eine Menge von Strings ist eine größte Teilmenge gesucht, sodass jeder String in dieser Teilmenge kein Teilstring von einem anderen ist.

## Beispiele

**Eingabe**

```ts
/*
			0 --- 1 --- 2 --- 3
*/
const g = [[1], [0, 2], [1, 3], [2]]

get_largest_independent_subset(g)
```

**Ausgabe**

```json
[0, 2]
```

**Eingabe**

```ts
/*
		0 --- 1 --- 2     5    8
		      |     |
		      3 --- 4 --- 7
		      |
		      6
*/
const g = [[1], [0, 2, 3], [1, 4], [1, 4, 6], [2, 3, 7], [], [3], [4], []]

get_largest_independent_subset(g)
```

**Ausgabe**

```json
[5, 8, 0, 2, 7, 3]
```

**Eingabe**

```ts
/*
				    0
				   / \
				  1   2
				 / \   \
				3   4   5
				    |   |
				    6   7
*/
const g = [[1, 2], [0, 3, 4], [0, 5], [1], [1, 6], [2, 7], [4], [5]]

get_largest_independent_subset(g)
```

**Ausgabe**

```json
[3, 0, 4, 5]
```

**Eingabe**

```ts
const arr = ["baa", "ba", "bb", "bbb", "b", "a", "ab"]

get_independent_strings(arr)
```

**Ausgabe**

```json
["baa", "ab", "bb"]
```

## Themen

Laufzeitoptimierung, Algorithmen, Rekursion, Graphen
