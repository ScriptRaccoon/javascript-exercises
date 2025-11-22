# Maximale Tiefe

## Aufgabe

Ein Objekt in JavaScript kann beliebig tief geschachtelt sein.

```js
{
	a: {
		b: {
			c: {
				d: 10
			}
		}
	},
	u: {
		v: 2
	}
}
```

Implementiere dazu eine Funktion, die für ein Objekt die maximale Tiefe ausgibt (im obigen Beispiel wäre sie 4). Für Nicht-Objekte soll die Funktion 0 ausgeben.

## Beispiele

| Eingabe                                          | Ausgabe |
| ------------------------------------------------ | ------- |
| `max_depth(1)`                                   | `0`     |
| `max_depth({})`                                  | `0`     |
| `max_depth(null)`                                | `0`     |
| `max_depth([1, 2, 3])`                           | `0`     |
| `max_depth({ a: 1 })`                            | `1`     |
| `max_depth({ a: 1, b: 2 })`                      | `1`     |
| `max_depth({ a: {} })`                           | `1`     |
| `max_depth({ a: { b: 1 } })`                     | `2`     |
| `max_depth({ a: { b: { c: 1 } } })`              | `3`     |
| `max_depth({ a: { b: 1 }, c: { d: 2 } })`        | `2`     |
| `max_depth({ a: { b: 1 }, c: { d: { e: 1 } } })` | `3`     |

## Themen

Rekursion, Bäume, Objekte
