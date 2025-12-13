# Boolesche Belegungen

## Aufgabe

Implementiere eine Funktion, welche effizient für einen booleschen Ausdruck wie z. B.

`¬(¬(((x ∨ z) ∨ (¬x)) ∧ ((¬y) ∧ (¬x))))`

alle Belegungen (also Zuweisungen) der Variablen ausgibt, die diesen Ausdruck wahr machen. Boolesche Ausdrücke können hierbei durch geschachtelte Arrays modelliert werden (siehe Beispiele unten). Ihre Belegungen werden durch Objekte modelliert, welche jeder Variable entweder `true` oder `false` zuweisen.

Wichtig: Es sollen _nicht_ einfach alle $2^n$ Belegungen durchgegangen werden, wenn $n$ die Anzahl der Variablen ist. Arbeite stattdessen mit einem effizienten Backtracking-Algorithmus, der Schritt für Schritt _partielle Belegungen_ aufbaut und jeweils prüft, ob sich der Ausdruck damit bereits vereinfacht. Wenn wir zum Beispiel beim Ausdruck `x ∧ y` mit der partiellen Belegung `x = false` starten, vereinfacht sich der Ausdruck zu `false`, sodass man bereits abbrechen kann. Bei der partiellen Belegung `x = true` hingegen vereinfacht sich der Ausdruck zu `y`, sodass `y = true` erzwungen ist. Im _schlimmsten_ Fall hat der Algorithmus immer noch eine Laufzeit von $O(2^n)$, ist in der Praxis aber schneller.

## Beispiele

**Eingabe**

```js
get_assignments(["and", "x", "y"]) // x ∧ y
```

**Ausgabe**

```json
[{ "x": true, "y": true }]
```

**Eingabe**

```js
get_assignments(["or", ["not", "x"], ["not", "y"]]) // ¬x ∨ ¬y
```

**Ausgabe**

```json
[
	{ "x": true, "y": false },
	{ "x": false, "y": true },
	{ "x": false, "y": false }
]
```

**Eingabe**

```js
// ¬(¬(((x ∨ z) ∨ (¬x)) ∧ ((¬y) ∧ (¬x))))
get_assignments([
	"not",
	[
		"not",
		[
			"and",
			["or", ["or", "x", "z"], ["not", "x"]],
			["and", ["not", "y"], ["not", "x"]],
		],
	],
])
```

**Ausgabe**

```json
[
	{ "x": false, "z": true, "y": false },
	{ "x": false, "z": false, "y": false }
]
```

**Eingabe**

```js
// ¬((((((d ∨ c) ∨ (e ∨ c)) ∧ ((d ∨ a) ∧ (b ∧ e))) ∧ ((¬(b ∨ e)) ∨ ((b ∨ a) ∧ (¬b)))) ∨ (¬((¬(¬c)) ∨ (¬(e ∨ d))))) ∨ ((¬(((¬c) ∧ (¬a)) ∧ ((¬a) ∨ (c ∧ a)))) ∨ (¬((¬(a ∨ d)) ∨ ((a ∧ e) ∨ (b ∧ e))))))
const expr = [
	"not",
	[
		"or",
		[
			"or",
			[
				"and",
				[
					"and",
					["or", ["or", "d", "c"], ["or", "e", "c"]],
					["and", ["or", "d", "a"], ["and", "b", "e"]],
				],
				[
					"or",
					["not", ["or", "b", "e"]],
					["and", ["or", "b", "a"], ["not", "b"]],
				],
			],
			["not", ["or", ["not", ["not", "c"]], ["not", ["or", "e", "d"]]]],
		],
		[
			"or",
			[
				"not",
				[
					"and",
					["and", ["not", "c"], ["not", "a"]],
					["or", ["not", "a"], ["and", "c", "a"]],
				],
			],
			[
				"not",
				[
					"or",
					["not", ["or", "a", "d"]],
					["or", ["and", "a", "e"], ["and", "b", "e"]],
				],
			],
		],
	],
]

get_assignments(expr)
```

**Ausgabe**

```json
[
	{ "d": false, "c": false, "e": false, "a": false, "b": true },
	{ "d": false, "c": false, "e": false, "a": false, "b": false }
]
```

## Themen

Backtracking, Boolesche Algebra, Algorithmen, Laufzeitoptimierung
