# Partielle Ordnungen zählen

## Kontext

Sei $X$ eine Menge. Eine _partielle Ordnung_ $\leq$ auf $X$ ist eine binäre Relation auf $X$, die reflexiv, symmetrisch, und antisymmetrisch ist. Das heißt, es muss gelten:

- Für $x \in X$ gilt $x \leq x$.
- Für $x,y,z \in X$ folgt aus $x \leq y$ und $y \leq z$ ebenfalls $x \leq z$.
- Für $x,y \in X$ folgt aus $x \leq y$ und $y \leq x$ bereits $x = y$.

## Aufgabe

Implementiere eine Funktion, die für $n \in \mathbb{N}$ möglichst effizient die Anzahl der partiellen Ordnungen auf einer $n$-elementigen Menge bestimmt. Sie sollte zumindest für $n \leq 8$ innerhalb von Sekunden ein Ergebnis liefern.

Tipp: Finde ein Verfahren, mit dem man die partiellen Ordnungen mit $n+1$ Elementen aus den partiellen Ordnungen mit $n$ Elementen gewinnen kann. Arbeite außerdem mit Bitmasken, um die Laufzeit zu verbessern.

## Beispiele

| Eingabe                   | Ausgabe     |
| ------------------------- | ----------- |
| `count_partial_orders(0)` | `1`         |
| `count_partial_orders(1)` | `1`         |
| `count_partial_orders(2)` | `3`         |
| `count_partial_orders(3)` | `19`        |
| `count_partial_orders(4)` | `219`       |
| `count_partial_orders(5)` | `4231`      |
| `count_partial_orders(6)` | `130023`    |
| `count_partial_orders(7)` | `6129859`   |
| `count_partial_orders(8)` | `431723379` |

## OEIS-Folge

[A001035](https://oeis.org/A001035)

## Themen

Rekursion, Tiefensuche, Laufzeitoptimierung, Algorithmen, Mathematik
