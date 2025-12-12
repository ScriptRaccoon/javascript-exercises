# Brücken bauen

## Aufgabe

Gegeben sei ein Höhenprofil aus 0 und 1, wobei 0 für Wasser und 1 für Land innerhalb eines Gebiets steht. Wir kodieren es durch eine 0,1-Matrix.

1. Bestimme die _Inseln_ des Profils, also die zusammenhängenden Landmassen. Zum Beispiel hat das folgende Profil vier Inseln. Eine Insel wird hierbei durch eine Menge von Koordinaten kodiert.

```text
0 0 1 1 0 0 0 0 0 1 0
0 1 1 1 1 0 0 0 0 1 1
0 0 1 1 1 1 1 0 1 1 1
0 0 0 0 1 1 0 0 0 0 0
0 0 0 0 0 1 0 0 1 1 0
0 0 1 0 0 0 0 1 1 1 0
0 1 1 1 0 0 0 0 0 0 0
```

2. Eine _Brücke_ besteht aus zusammenhängenden Koordinaten (die also immer nach links, rechts, oben oder unten laufen), die auf Wasserabschnitten errichtet werden. Bestimme für je zwei Inseln die kürzeste Brücke zwischen ihnen, kodiert durch eine Liste von Koordinaten.

3. Bestimme eine Konfiguration von Brücken, welche alle Inseln miteinander verbindet (ggf. indirekt), sodass die Gesamtlänge der Brücken minimiert wird. Die Kosten für ihre Errichtung soll also minimiert werden. Im obigen Beispielprofil ist eine mögliche Konfiguration die Folgende, wobei 2 für eine Brücke steht. Die Gesamtlänge der Brücken beträgt 4.

```text
0 0 1 1 0 0 0 0 0 1 0
0 1 1 1 1 0 0 0 0 1 1
0 0 1 1 1 1 1 2 1 1 1
0 0 2 0 1 1 0 0 0 2 0
0 0 2 0 0 1 0 0 1 1 0
0 0 1 0 0 0 0 1 1 1 0
0 1 1 1 0 0 0 0 0 0 0
```

Implementiere dafür sowohl eine Funktion `compute_best_bridge_selection(profile)`, welche die Brücken anhand ihrer Koordinaten ausgibt, sowie eine Funktion `get_best_bridge_plan(profile)`, welche die Koordinaten der Brücken mit 2 beschreibt.

Hinweis: Die Funktionen müssen nicht auf ihre Laufzeit optimiert werden. Das Profil wird höchstens eine Größe von 50x50 haben.

## Beispiel

**Eingabe**

```ts
const profile = [
	[0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
	[0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
	[0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
	[1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
	[0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
	[0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
]

get_best_bridge_plan(profile)
```

**Ausgabe**

```json
[
	[0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
	[0, 0, 0, 1, 2, 2, 2, 2, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
	[0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
	[0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
	[0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 2, 0],
	[0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 0],
	[0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
	[1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 0, 0, 0],
	[0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
	[0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
	[0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
	[0, 0, 1, 1, 1, 2, 2, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0]
]
```

Etwas anschaulicher:

```text
0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 1 1
0 0 0 1 2 2 2 2 1 1 1 1 0 0 0 0 0 0 0 0 0 0 2 0
0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 2 0
0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 2 0
0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 2 0
0 0 0 2 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 2 2 0
0 0 0 1 1 0 0 0 0 1 0 0 0 0 0 0 1 1 1 1 1 0 0 0
1 1 1 1 1 0 0 0 0 1 1 2 2 2 2 2 1 1 1 1 1 0 0 0
0 1 1 1 0 0 0 0 0 1 1 0 0 0 0 0 0 0 1 1 1 0 0 0
0 1 1 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 2 0 0 0 0 0
0 1 1 1 0 0 0 1 1 1 1 0 0 0 0 0 0 0 2 0 0 0 0 0
0 0 1 1 1 2 2 1 1 1 1 0 0 0 0 0 0 0 2 0 0 0 0 0
0 0 0 0 2 0 0 1 0 0 0 0 0 0 0 0 0 0 2 0 0 0 0 0
0 0 0 0 2 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0
0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0
0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0
```

## Themen

Tiefensuche, Algorithmen, Graphentheorie, Minimaler Spannbaum
