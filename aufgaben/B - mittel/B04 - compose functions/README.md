# Aufgabe

Implementiere eine abstrakte Funktion `compose(f,g)`, die zwei Funktionen
`f` und `g` entgegennimmt und die verkettete Funktion `f o g` zurückgibt,
die also erst `g` und dann `f` ausführt. Beide Funktionen `f` und `g` haben nur ein Argument.

# Beispiel

```js
const add_one = (n) => n + 1
const double = (n) => 2 \* n
const double_then_add_one = compose(add_one, double)
```

Dann soll gelten:

```js
double_then_add_one(4) === 9;
```

# Themen

Funktionen höherer Ordnung, Funktionen als Argumente, Funktionen als Rückgabewerte, Hilfsfunktionen
