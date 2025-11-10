# Aufgabe

Wieviele Möglichkeiten gibt es, 7.52 € in Münzen zu zerlegen? Das heißt,
wieviele Möglichkeiten gibt es, die Zahl 752 als Summe von Zahlen der Form
1,2,5,10,20,50,100,200 zu schreiben?

Schreibe dazu allgemein eine Funktion `count_partitions(n, parts)`, welche
die Anzahl der Zerlegungen der natürlichen Zahl `n` mit Zahlen aus einer
Liste von Zahlen `parts` bestimmt.

Die Reihenfolge der Zahlen in der Zerlegung soll keine Rolle spielen, also `1 + 2`
und `2 + 1` sollen zum Beispiel als nur eine Zerlegung gezählt werden.

Hinweis: Es gibt eine naheliegende rekursive Implementierung, die allerdings
viel zu langsam ist. Finde eine effiziente Methode.

# Beispiel

```js
const parts = [1, 2, 5, 10];
count_partitions(12, parts) == 15;
```

Die 15 Zerlegungen müssen nicht bestimmt werden, werden hier aber zur Illustration aufgelistet:

```text
10 + 2
10 + 1 + 1
5 + 5 + 2
5 + 5 + 1 + 1
5 + 2 + 2 + 2 + 1
5 + 2 + 2 + 1 + 1 + 1
5 + 2 + 1 + 1 + 1 + 1 + 1
5 + 1 + 1 + 1 + 1 + 1 + 1 + 1
2 + 2 + 2 + 2 + 2 + 2
2 + 2 + 2 + 2 + 2 + 1 + 1
2 + 2 + 2 + 2 + 1 + 1 + 1 + 1
2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1
2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1
2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1
1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1
```

Ein größeres Beispiel:

```js
const parts = [1, 2, 5, 10, 20, 50, 100, 200];
count_partitions(752, parts) == 50249780;
```

# Themen

Dynamische Programmierung, Rekursion, Cache, Arithmetik
