# Parser für arithmetische Ausdrücke

## Aufgabe

Entwickle einen Parser für arithmetische Ausdrücke wie zum Beispiel `x * y + 7` oder `-5 / z`. Das Ergebnis soll ein _abstrakter Syntaxbaum_ sein.

```text
      +                 /
     / \              /   \
    *   7            -     z
   / \               |
  x   y              5
```

Die Eingabe ist jeweils ein String, die Ausgabe ein Objekt, welches einen solchen Baum kodiert. Unterstützt werden sollen:

- Zahlen
- Variablen
- binäre Operatoren `+`, `-`, `*`, `/`
- unärer Operator `-`
- "Punkt- vor Strichrechnung"
- Klammern
- Beliebige Schachtelungen

Schreibe außerdem eine Funktion, die einen abstrakten Syntaxbaum (mit der von dir gewählten Kodierung) mit Hilfe einer Belegung der Variablen auswertet (vgl. Aufgabe B08). Für mehr Details siehe die Beispiele.

## Beispiel 1

**Eingabe**

```js
parse_expression("0.5")
```

**Ausgabe**

```json
{ "type": "number", "value": 0.5 }
```

## Beispiel 2

**Eingabe**

```js
parse_expression("-x")
```

**Ausgabe**

```json
{
	"type": "unary",
	"op": "-",
	"expr": { "type": "variable", "name": "x" }
}
```

## Beispiel 3

**Eingabe**

```js
parse_expression("x + 42")
```

**Ausgabe**

```json
{
	"type": "binary",
	"op": "+",
	"left": { "type": "variable", "name": "x" },
	"right": { "type": "number", "value": 42 }
}
```

## Beispiel 4

**Eingabe**

```js
parse_expression("x * y + z")
```

**Ausgabe**

```json
{
	"type": "binary",
	"op": "+",
	"left": {
		"type": "binary",
		"op": "*",
		"left": {
			"type": "variable",
			"name": "x"
		},
		"right": {
			"type": "variable",
			"name": "y"
		}
	},
	"right": {
		"type": "variable",
		"name": "z"
	}
}
```

## Beispiel 5

**Eingabe**

```js
parse_expression("3.5/(2 - 1/(3 - p))")
```

**Ausgabe**

```json
{
	"type": "binary",
	"op": "/",
	"left": { "type": "number", "value": 3.5 },
	"right": {
		"type": "binary",
		"op": "-",
		"left": { "type": "number", "value": 2 },
		"right": {
			"type": "binary",
			"op": "/",
			"left": { "type": "number", "value": 1 },
			"right": {
				"type": "binary",
				"op": "-",
				"left": { "type": "number", "value": 3 },
				"right": { "type": "variable", "name": "p" }
			}
		}
	}
}
```

## Beispiel 5

**Eingabe**

```js
const ast = {
	type: "binary",
	op: "+",
	left: { type: "variable", name: "x" },
	right: { type: "variable", name: "y" },
}

evaluate_ast(ast, { x: 10, y: 2 })
```

**Ausgabe**

```js
12
```

## Themen

Rekursion, Parser, Strings, Bäume, Algorithmen
