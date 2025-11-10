# Aufgabe

Implementiere eine Funktion, welche die ersten `n` Glieder der Conway-Folge
ausgibt. Die Idee ist, dass jedes Folgenglied das Vorherige "vorliest".

-   Wir starten mit "1".
-   "1" besteht aus einer (1) Eins (1) ---> "11".
-   "11" besteht aus zwei (2) Einsen (1) ---> "21".
-   "21" besteht aus einer Zwei und einer Eins ---> "1211".
-   "1211" besteht aus einer Eins, einer Zwei, zwei Einsen ---> "111221"
    usw.

# Beispiel

```js
look_and_say(10);
```

soll Folgendes ausgeben:

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
