# Verkettung von Funktionen

## Aufgabe

Implementiere eine abstrakte Funktion `compose(f,g)`, die zwei Funktionen
`f` und `g` entgegennimmt und die verkettete Funktion `f o g` zurückgibt,
die also erst `g` und dann `f` ausführt.

Hinweis: Beide Funktionen `f` und `g` haben der Einfachheit halber nur ein Argument.

## Beispiel

```js
const add_one = (n) => n + 1
const double = (n) => 2 * n

const double_then_add_one = compose(add_one, double)
const add_one_then_double = compose(double, add_one)
const add_three = compose(add_one, compose(add_one, add_one))

double_then_add_one(4) // -> 9
add_one_then_double(4) // -> 10
add_three(4) // -> 7
```

## Themen

Funktionen höherer Ordnung, Funktionen als Argumente, Funktionen als Rückgabewerte, Hilfsfunktionen
