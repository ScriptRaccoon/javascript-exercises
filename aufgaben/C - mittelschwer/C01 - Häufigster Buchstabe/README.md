# Häufigster Buchstabe

## Aufgabe

Implementiere eine Funktion, die möglichst effizient für eine Zeichenabfolge den Buchstaben (a-z, A-Z) ausgibt, der am häufigsten darin vorkommt, zusammen mit seiner Häufigkeit. Wenn dabei mehrere Buchstaben in Frage kommen, gewinnt derjenige, der als erstes vorgekommen ist.

Wenn kein Buchstabe vorkommt, wird `undefined` zurückgegeben.

Wichtig: Die Zeichenabfolge soll nur einmal durchlaufen werden!

## Beispiele

| Eingabe                                              | Ausgabe                         |
| ---------------------------------------------------- | ------------------------------- |
| `most_frequent_letter("abba: dancing queen (1976)")` | `{ letter: "a", frequency: 3 }` |
| `most_frequent_letter("0000xyxy")`                   | `{ letter: 'x', frequency: 2 }` |
| `most_frequent_letter("110")`                        | `undefined`                     |

## Themen

Optimierungsproblem, Strings, Schleifen, reguläre Ausdrücke, Fallunterscheidungen, Laufzeitoptimierung
