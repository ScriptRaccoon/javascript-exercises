# Summenfreie Teilmengen

## Kontext

Eine Menge $S$ von positiven ganzen Zahlen heißt _summenfrei_, wenn für alle $x,y \in S$ gilt, dass $x + y \notin S$. Zum Beispiel ist $\lbrace 1,6,10 \rbrace$ summenfrei, aber $\lbrace 1,4,6,10 \rbrace$ nicht.

## Aufgabe

Implementiere eine Funktion, die effizient für eine gegebene endliche Menge $A$ von positiven ganzen Zahlen die (bezüglich ihrer Kardinalität) größte Teilmenge $S \subseteq A$ zurückgibt, die summenfrei ist. Falls es mehrere solche geben sollte, wird diejenige zurückgegeben, die nach Sortierung bezüglich der lexikographischen Ordnung am kleinsten ist.

Die Funktion sollte auch für Mengen mit 50 Elementen innerhalb von Sekunden ein Ergebnis liefern.

## Beispiele

**Eingabe**

```js
get_largest_sum_free_subset(new Set([5, 6, 1]))
```

**Ausgabe**

```js
new Set([1, 5])
```

**Eingabe**

```js
get_largest_sum_free_subset(new Set([10, 1, 12, 2, 3, 11]))
```

**Ausgabe**

```js
new Set([2, 3, 10, 11])
```

**Eingabe**

```js
get_largest_sum_free_subset(new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))
```

**Ausgabe**

```js
new Set([1, 3, 5, 7, 9])
```

**Eingabe**

```js
const sample = new Set([
	2, 12, 17, 19, 24, 25, 26, 28, 32, 37, 40, 43, 44, 47, 54, 55, 58, 62, 73, 79, 81, 83,
	84, 89, 100, 101, 104, 115, 118, 120, 125, 127, 130, 135, 142, 148, 151, 155, 160,
	161, 163, 165, 169, 174, 181, 200, 205, 213, 224, 226,
])
get_largest_sum_free_subset(sample)
```

**Ausgabe**

```js
new Set([
	2, 17, 24, 25, 28, 32, 40, 43, 47, 54, 55, 58, 62, 73, 81, 84, 89, 100, 104, 115, 118,
	130, 148, 160, 163, 174, 205, 213, 224,
])
```

## Themen

Laufzeitoptimierung, Algorithmen, Arrays, Rekursion, Tiefensuche
