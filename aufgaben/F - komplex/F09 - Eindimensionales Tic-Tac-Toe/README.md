# Eindimensionales Tic-Tac-Toe

## Kontext

Diese Aufgabe handelt von einem kombinatorischen Spiel, einer Art eindimensionalem Tic-Tac-Toe.

Auf einem Spielfeld der Größe $n \times 1$ werden von zwei Spielern abwechselnd Kreuze gesetzt. Wer als erstes drei Kreuze nebeneinander gesetzt hat, gewinnt das Spiel. Wer nicht mehr ziehen kann, verliert. In diesem Spiel für $n = 6$ gewinnt zum Beispiel der zweite Spieler:

| Zug | Feld          | Bemerkung                   |
| --- | ------------- | --------------------------- |
| 0   | `- - - - - -` | Start                       |
| 1   | `X - - - - -` | Spieler 1 zieht             |
| 2   | `X - - X - -` | Spieler 2 zieht             |
| 3   | `X - - X - X` | Spieler 1 zieht             |
| 4   | `X - - X X X` | Spieler 2 zieht und gewinnt |

Tatsächlich kann der zweite Spieler für $n = 6$ immer gewinnen, egal was der erste Spieler zieht. Für $n = 5$ hat aber der erste Spieler eine Gewinnstrategie: er setzt zuerst das Kreuz in die Mitte.

Man kann zeigen: Für jedes $n \geq 0$ hat entweder der erste oder der zweite Spieler eine Gewinnstrategie.

## Aufgabe

Implementiere eine Funktion, welche alle $n \leq 100.000$ bestimmt, für die der zweite Spieler in diesem Spiel eine Gewinnstrategie hat, also der erste Spieler verliert.

## Beispiel

**Eingabe**

```js
get_losing_sizes(100_000)
```

**Ausgabe**

```text
[
     0,    2,    6,   12,   22,    30,
    32,   44,   54,   64,   76,    86,
    98,  110,  118,  130,  132,   162,
   170,  184,  194,  202,  282,   290,
   302,  356, 1046, 2502, 2752,  2912,
  3052, 3076, 7250, 7356, 7866, 16168
]
```

## Ein Beispiel-Spiel

Hier noch ein Beispiel dafür, wie das Spiel für $n = 10$ ablaufen kann. Hier gewinnt der erste Spieler.

```text
- - - - - - - - - -
- X - - - - - - - -     Spieler 1
- X - - - - X - - -     Spieler 2
- X - - - - X - - X     Spieler 1
- X - X - - X - - X     Spieler 2
- X X X - - X - - X     Spieler 1
```

## Themen

Spieltheorie, Kombinatorik, Rekursion, Laufzeitoptimierung, Grundy-Wert
