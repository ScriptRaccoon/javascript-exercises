# Binärbäume auswerten

## Aufgabe

Schreibe eine Funktion, die einen mit Operationszeichen und Zahlen beschrifteten
Binärbaum zu einer Zahl auswertet.

Dabei werden solche Binärbäume durch geschachtelte Arrays modelliert. Der Binärbaum

```text

             *
            / \
           /   \
          /     \
         +       -
        / \     / \
       /   \   /   \
      1     2  4    2
```

wird zum Beispiel durch das Array

```json
["*", ["+", 1, 2], ["-", 4, 2]]
```

modelliert. Als Operationszeichen sind `+`, `-`, `*` und `/` zugelassen.

## Beispiel

**Eingabe**

```js
evaluate(["*", ["+", 1, 2], ["-", 4, 2]])
```

**Ausgabe**

```json
6
```

Denn `(1 + 2) * (4 - 2) = 3 * 2 = 6`.

## Themen

Rekursion, Fallunterscheidung
