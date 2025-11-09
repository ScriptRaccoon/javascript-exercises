# Aufgabe

Schreibe eine Funktion, die einen mit Operationszeichen und Zahlen beschrifteten
Binärbaum zu einer Zahl auswertet.

# Beispiel

Der beschriftete Binärbaum

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

wird ausgewertet zu `(1 + 2) * (4 - 2) = 3 * 2 = 6`.

Im Code wird der Binärkaum kodiert durch

```js
const tree = ["*", ["+", 1, 2], ["-", 4, 2]];
```

und es soll dann gelten:

```js
evaluate(["*", ["+", 1, 2], ["-", 4, 2]]) == 6;
```

# Themen

Rekursion, Fallunterscheidung
