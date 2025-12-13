# Pflasterungen mit Dominos und Trominos

## Aufgabe

Ein _Domino_ besteht aus zwei zusammenhängenden Steinen, ein _L-Tromino_ aus drei zusammenhängenden Steinen in L-Form.

Implementiere eine Funktion, die sämtliche Pflasterungen eines nx2-Rechtecks durch Dominos und L-Trominos bestimmt und sie in der Konsole grafisch darstellt.

Das hier ist zum Beispiel eine Pflasterung eines 7x2-Rechtecks, bestehend aus 4 Dominos und 2 Trominos.

<img width="400" alt="tiling example" src="https://github.com/user-attachments/assets/2c9472cd-9cf3-42e0-a676-eab453bbf987" />

In der Konsole kann man sie zum Beispiel so darstellen:

```text
A B B D D F F
A C C D E E F
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

A B C D E
A B C D E

A A C D E
B B C D E

A B B D E
A C C D E

A B B C D
A A B C D

A A B C D
A B B C D

A B C C E
A B D D E

A A C C E
B B D D E

A B C C D
A B B C D

A B B C D
A B C C D

A B B C D
A A C C D

A A C C D
A B B C D

A B C D D
A B C E E

A A C D D
B B C E E

A B B D D
A C C E E

A B B C C
A A B D D

A A B C C
A B B D D

A B C D D
A B C C D

A A C D D
B B C C D

A B C C D
A B C D D

A A C C D
B B C D D

A B C C D
A B B D D

A B B D D
A B C C D

A B B D D
A A C C D

A A C C D
A B B D D
```

## Themen

Kombinatorik, Dynamische Programmierung, Arrays, Algorithmen
