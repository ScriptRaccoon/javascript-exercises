# Aufgabe

Schreibe eine Funktion, die den kürzesten Pfad durch ein Labyrinth berechnet.
Ein Labyrinth wird hierbei durch eine 0,1-Matrix beschrieben, wobei 0 = offener Raum,
1 = Wand. Vorgegeben sind Start- und Endkoordinate des Pfades, und es kann sich jeweils
nach oben, rechts, unten, links bewegt werden, sofern dort ein offener Raum ist.
Ein Pfad wird durch die Liste der besuchten Koordinaten beschrieben.
Wenn kein Pfad gefunden wird, wird `null` zurückgegeben.

# Beispiel

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
];

get_shortest_path(sample_maze, [0, 0], [11, 11]) ==
	[
		[0, 0],
		[1, 0],
		[1, 1],
		[1, 2],
		[0, 2],
		[0, 3],
		[0, 4],
		[1, 4],
		[2, 4],
		[3, 4],
		[4, 4],
		[5, 4],
		[6, 4],
		[6, 5],
		[7, 5],
		[8, 5],
		[8, 6],
		[8, 7],
		[9, 7],
		[10, 7],
		[11, 7],
		[11, 8],
		[11, 9],
		[10, 9],
		[9, 9],
		[9, 10],
		[9, 11],
		[10, 11],
		[11, 11],
	];
```

# Themen

Breitensuche, Queue (Warteschlange), Optimierungsproblem
