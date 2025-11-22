# Passwortstärke

## Aufgabe

Implementiere eine Funktion, die die Stärke eines Passworts bestimmt. Die Stärke ist standardmäßig 0, und jede der folgenden Kriterien erhöht sie um 1.

- mind. 8 Zeichen
- mind. 12 Zeichen
- mind. 16 Zeichen
- mind. ein Großbuchstabe
- mind. ein Kleinbuchstabe
- mind. eine Ziffer
- mind. ein Sonderzeichen

Die maximale Stärke ist demnach 7.

Vergib außerdem einen _Punktabzug_, wenn das Passwort eines der gängigen Wörter
(z. B. `test`, `password`, `login`, usw.) beinhaltet.

## Beispiele

| Eingabe                                     | Ausgabe | Hinweis                 |
| ------------------------------------------- | ------- | ----------------------- |
| `password_strength("test")`                 | `0`     | Punktabzug wegen "test" |
| `password_strength("Berlin_1997")`          | `5`     | Alle Zeichen            |
| `password_strength("hCq{}!w$mGg#,)4$plYw")` | `7`     | Alle Zeichen; sehr lang |

## Themen

Strings, reguläre Ausdrücke, Fallunterscheidungen
