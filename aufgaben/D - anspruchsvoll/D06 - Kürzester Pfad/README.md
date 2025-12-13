# Kürzester Pfad

## Aufgabe

Schreibe eine Funktion, die einen kürzesten Pfad durch ein Labyrinth berechnet. Ein Labyrinth wird hierbei durch eine 0,1-Matrix beschrieben, wobei 0 für einen leeren Raum bzw. 1 für eine Wand steht.

<img width="300"  alt="maze" src="https://github.com/user-attachments/assets/c987451d-b9bf-4cc1-9ffa-e725aa42de2f" /><br />
  
Vorgegeben sind Start- und Endkoordinate des Pfades, und die Schritte gehen jeweils nach oben, rechts, unten, oder links, sofern dort ein leerer Raum ist.

Ein Pfad wird durch die Liste der besuchten Koordinaten beschrieben. Wenn kein Pfad gefunden wird, wird `null` zurückgegeben.

Implementiere außerdem eine Funktion, welche den Pfad grafisch ansprechend in die Konsole schreibt.

## Beispiel

**Eingabe**

```js
const sample_maze = [
	[0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
	[0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
	[1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0],
	[0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
	[0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0],
	[0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
	[0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1],
	[0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
	[0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0],
	[0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0],
	[0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
]

get_shortest_path(sample_maze, [0, 0], [11, 11])
```

**Ausgabe**

```text
[
	[0, 0], [1, 0], [1, 1], [1, 2], [0, 2],
	[0, 3], [0, 4], [1, 4], [2, 4], [3, 4],
	[4, 4], [5, 4], [6, 4], [6, 5], [7, 5],
	[8, 5], [8, 6], [8, 7], [9, 7], [10, 7],
	[11, 7], [11, 8], [11, 9], [10, 9], [9, 9],
	[9, 10], [9, 11], [10, 11], [11, 11],
]
```

**Eingabe**

```js
print_shortest_path(sample_maze, [0, 0], [11, 11])
```

**Ausgabe**

```text
Labyrinth:

0 1 0 0 0 0 0 0 0 1 0 1
0 0 0 1 0 1 0 1 0 1 0 0
1 1 1 1 0 1 1 1 0 1 1 0
0 1 0 1 0 1 0 0 0 0 0 0
0 1 0 1 0 1 0 1 1 1 1 0
0 1 0 0 0 1 0 1 0 0 0 0
0 1 1 1 0 0 0 1 0 1 1 1
0 1 0 1 1 0 1 1 0 0 0 0
0 0 0 0 0 0 0 0 1 1 1 0
0 1 1 1 1 1 1 0 1 0 0 0
0 1 0 0 0 0 1 0 1 0 1 0
0 1 1 0 1 0 0 0 0 0 1 0

Kürzester Pfad:

* 1 * * * 0 0 0 0 1 0 1
* * * 1 * 1 0 1 0 1 0 0
1 1 1 1 * 1 1 1 0 1 1 0
0 1 0 1 * 1 0 0 0 0 0 0
0 1 0 1 * 1 0 1 1 1 1 0
0 1 0 0 * 1 0 1 0 0 0 0
0 1 1 1 * * 0 1 0 1 1 1
0 1 0 1 1 * 1 1 0 0 0 0
0 0 0 0 0 * * * 1 1 1 0
0 1 1 1 1 1 1 * 1 * * *
0 1 0 0 0 0 1 * 1 * 1 *
0 1 1 0 1 0 0 * * * 1 *
```

## Themen

Breitensuche, Warteschlange, Schleifen, Optimierungsproblem, Algorithmen
