# Schlüsselpfade

## Aufgabe

Implementiere eine Funktion, die zu einem Objekt das Array der vollständigen Pfade entlang der Schlüssel zurückgibt.

Wenn die Eingabe kein Objekt ist, wird ein leeres Array zurückgegeben.

## Beispiele

| Eingabe                                | Ausgabe                 |
| -------------------------------------- | ----------------------- |
| `paths({ a: 1, b: 2 }`                 | `[ 'a', 'b' ]`          |
| `paths({ a: 1, b: { c: 2, d: 3 } }`    | `[ 'a', 'b.c', 'b.d' ]` |
| `paths({ a: { b: { c: { d: 0 } } } })` | `[ 'a.b.c.d' ]`         |
| `paths([0, 1])`                        | `[]`                    |
| `paths(42)`                            | `[]`                    |

## Themen

Rekursion, Objekte, Strings
