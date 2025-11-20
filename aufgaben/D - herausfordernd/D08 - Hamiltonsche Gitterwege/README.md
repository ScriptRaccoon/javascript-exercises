# Hamiltonsche Gitterwege mit Windungen

## Aufgabe

Ein Pfad in einem Graphen heißt _Hamiltonsch_, wenn er jeden Knoten genau einmal besucht.

Implementiere eine Funktion, die für jedes $n \geq 2$ die Liste der Hamiltonschen Gitterwege in einem $n \times n$-Gitter bestimmt, die

- oben links starten,
- als Erstes nach rechts gehen,
- niemals dreimal hintereinander in dieselbe Richtung gehen.

Wenn also ein Pfad z. B. zweimal nach rechts gegangen ist, muss er danach entweder nach oben oder nach unten weitergehen. Dadurch werden Pfade vermieden, die zu lange in eine Richtung gehen. Die Pfade müssen sich mehr winden.

<img src="./visualization/examples.png" width="500">

Pfade werden als Listen von Koordinaten zurückgegeben.

## Beispiele

**Eingabe**

```js
get_curly_grid_paths(4)
```

**Ausgabe**

Hier gibt es tatsächlich nur einen Pfad (ohne die Einschränkung gäbe es 52 Hamiltonsche Gitterwege, die oben links starten).

```json
[
	[
		[0, 0],
		[1, 0],
		[1, 1],
		[0, 1],
		[0, 2],
		[0, 3],
		[1, 3],
		[1, 2],
		[2, 2],
		[2, 3],
		[3, 3],
		[3, 2],
		[3, 1],
		[2, 1],
		[2, 0],
		[3, 0]
	]
]
```

<img src="./visualization/4x4-screenshot.png" width="200" />

**Eingabe**

```js
get_curly_grid_paths(5).length
```

**Ausgabe**

```json
8
```

<img src="./visualization/5x5-screenshot.png" width="800" />

## Themen

Backtracking, Algorithmen, Graphen
