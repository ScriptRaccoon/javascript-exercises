# Aufgabe

Implementiere eine Funktion, welche die ersten `n` Einträge der [Conway-Folge](https://de.wikipedia.org/wiki/Conway-Folge) in die Konsole schreibt. Deren Idee ist, dass jedes Folgenglied das Vorherige "vorliest":

- Wir starten mit dem String "1".
- "1" besteht aus einer (1) Eins (1) ---> "11".
- "11" besteht aus zwei (2) Einsen (1) ---> "21".
- "21" besteht aus einer (1) Zwei (2) und einer (1) Eins (1) ---> "1211".
- "1211" besteht aus einer Eins, einer Zwei, zwei Einsen ---> "111221"
- usw.

# Beispiel

**Eingabe**

```js
look_and_say(10)
```

**Ausgabe**

```text
1
11
21
1211
111221
312211
13112221
1113213211
31131211131221
13211311123113112211
```

# Themen

Mathematik, Strings, Schleifen
