# Einfacher Bot

## Aufgabe

Es sind die folgenden Daten über 10 Personen gegeben:

| name      | age  | country        |
| --------- | ---- | -------------- |
| `Alexei`  | `21` | `Russia`       |
| `Mariana` | `27` | `Brazil`       |
| `Tariq`   | `24` | `Jordan`       |
| `Lian`    | `22` | `China`        |
| `Sofia`   | `29` | `Spain`        |
| `Kenji`   | `26` | `Japan`        |
| `Amara`   | `23` | `Nigeria`      |
| `Mateo`   | `28` | `Argentina`    |
| `Noura`   | `25` | `Saudi Arabia` |
| `Elias`   | `30` | `Lebanon`      |

Implementiere eine Funktion, die einfache Fragen zu diesen Personen entgegennimmt und sie in der Konsole beantwortet. Die genaue Formulierung einer Frage ist nicht vorgegeben, wodurch wir hier eine Art "Bot" programmieren. Dieser "Bot" achtet auf Schlüsselwörter, damit klar ist, zu welcher Person gefragt wird und ob es um das Alter und/oder das Land geht.

Falls die Person, nach der gefragt wird, nicht in den Daten vorhanden ist, antwortet der Bot lediglich, dass die Frage nicht beantwortet werden kann. Falls zwar eine bekannte Person erwähnt wird, aber anscheinend weder nach dem Alter oder nach dem Land gefragt wird, wird um Klarstellung gebeten.

Fragen und Antworten sollen hier in Englisch sein.

## Beispiele

**Eingabe**

```js
ask("Where does Noura come from?")
```

**Ausgabe**

```text
Noura comes from Saudi Arabia.
```

**Eingabe**

```js
ask("How old is Kenji? And where does he live?")
```

**Ausgabe**

```text
Kenji comes from Japan and is 26 years old.
```

**Eingabe**

```js
ask("In which country is Sofia living?")
```

**Ausgabe**

```text
Sofia comes from Spain.
```

**Eingabe**

```js
ask("Tell me the age of Mateo.")
```

**Ausgabe**

```text
Mateo is 28 years old.
```

**Eingabe**

```js
ask("Where does Hank come from?")
```

**Ausgabe**

```text
Sorry, but I cannot help you with that question.
```

**Eingabe**

```js
ask("Tell me something about Lian.")
```

**Ausgabe**

```text
What do you want to know exactly about Lian?
```

**Eingabe**

```js
ask("I want to know where Lian is coming from.")
```

**Ausgabe**

```text
Lian comes from China.
```

## Themen

Strings, Fallunterscheidungen, Objekte, Arrays
