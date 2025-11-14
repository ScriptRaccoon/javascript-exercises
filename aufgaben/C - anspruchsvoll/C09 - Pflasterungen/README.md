# Pflasterungen

## Aufgabe

Ein _Domino_ besteht aus zwei zusammenhängenden Steinen, ein _L-Tromino_ aus drei zusammenhängenden Steinen in L-Form. Implementiere eine Funktion, die sämtliche Pflasterungen eines nx2-Rechtecks durch Dominos und L-Trominos bestimmt und sie grafisch ansprechend in die Konsole schreibt.

Das hier ist zum Beispiel eine Pflasterung eines 7x2-Rechtecks, bestehend aus 4 Dominos und 2 Trominos.

```text
+ o o * = # #
+ - - * = = #
```

Hinweis: Die Anzahl der Pflasterungen ist die OEIS-Folge [A052980](https://oeis.org/A052980). Damit lässt sich das Ergebnis überprüfen.

## Beispiel

**Eingabe**

```js
print_all_tilings(5)
```

**Ausgabe**

```text
Found 24 tilings of length 5.

+ o - * =
+ o - * =

+ + - * =
o o - * =

+ o o * =
+ - - * =

+ o o - *
+ + o - *

+ + o - *
+ o o - *

+ o - - =
+ o * * =

+ + - - =
o o * * =

+ o - - *
+ o o - *

+ o o - *
+ o - - *

+ o o - *
+ + - - *

+ + - - *
+ o o - *

+ o - * *
+ o - = =

+ + - * *
o o - = =

+ o o * *
+ - - = =

+ o o - -
+ + o * *

+ + o - -
+ o o * *

+ o - * *
+ o - - *

+ + - * *
o o - - *

+ o - - *
+ o - * *

+ + - - *
o o - * *

+ o - - *
+ o o * *

+ o o * *
+ o - - *

+ o o * *
+ + - - *

+ + - - *
+ o o * *
```

## Themen

Kombinatorik, Dynamische Programmierung, Arrays, Algorithmen
