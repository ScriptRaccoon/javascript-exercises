# Aufgabe

Ein _Domino_ besteht aus zwei zusammenhängenden Steinen, ein _L-Tromino_ aus drei zusammenhängenden Steinen in L-Form. Bestimme sämtliche Pflasterungen eines nx2-Rechtecks durch Dominos und L-Trominos. Gib sie außerdem übersichtlich in der Konsole aus.

Das hier ist zum Beispiel eine Pflasterung eines 7x2-Rechtecks, bestehend aus 4 Dominos und 2 Trominos.

```text
+ o o * = # #
+ - - * = = #
```

# Beispiel

```js
print_all_tilings(5);
```

soll in etwa Folgendes ausgeben:

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

Die Koordinaten sollen ebenfalls bestimmt werden:

```js
get_all_tilings(5)[23] ==
	[
		[
			[1, 0],
			[0, 0],
			[0, 1],
		],
		[
			[1, 1],
			[1, 2],
		],
		[
			[0, 2],
			[0, 3],
		],
		[
			[1, 3],
			[1, 4],
			[0, 4],
		],
	];
```

Die Anzahl der Pflasterungen ist übrigens die OEIS-Folge [A052980](https://oeis.org/A052980). Damit lässt sich dein Ergebnis überprüfen.

# Themen

Kombinatorik, Dynamische Programmierung, Arrays
