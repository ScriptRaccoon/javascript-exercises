# Bearbeitungspfade

## Aufgabe

Ein _Bearbeitungspfad_ von einem String zu einem anderen ist eine Abfolge von Bearbeitungen, bei der jeweils entweder ein Zeichen eingefügt, ersetzt, oder gelöscht wird.

Implementiere eine Funktion, die einen kürzesten Bearbeitungspfad zwischen zwei Strings berechnet. Ausgegeben werden lediglich die Strings nach der jeweiligen Bearbeitung, also nicht welche Bearbeitungen im Einzelnen gemacht worden sind.

## Beispiele

| Eingabe                                  | Ausgabe                                                            |
| ---------------------------------------- | ------------------------------------------------------------------ |
| `get_edit_path("keiner", "eimer")`       | `[ 'keiner', 'einer', 'eimer' ]`                                   |
| `get_edit_path("banane", "badewanne")`   | `[ 'banane', 'badnane', 'badenane', 'badewane', 'badewanne' ]`     |
| `get_edit_path("anschauung", "schauen")` | `[ 'anschauung', 'nschauung', 'schauung', 'schaueng', 'schauen' ]` |
| `get_edit_path("kantig", "rund")`        | `[ 'kantig', 'rantig', 'runtig', 'runig', 'rung', 'rund' ]`        |
| `get_edit_path("rund", "kantig")`        | `[ 'rund', 'kund', 'kand', 'kantd', 'kantid', 'kantig' ]`          |

## Themen

Dynamische Programmierung, Backtracking, Strings, Algorithmen, Levenshtein-Distanz
