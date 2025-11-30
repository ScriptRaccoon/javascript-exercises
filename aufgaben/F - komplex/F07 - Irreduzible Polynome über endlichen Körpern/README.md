# Irreduzible Polynome über endlichen Körpern

## Kontext

Für jede Primzahl $p$ gibt es einen sog. _endlichen Körper_ $\mathbb{F}_p$ mit $p$ Elementen: eine algebraische Struktur, bei der man wie gewohnt mit ganzen Zahlen rechnet, aber modulo $p$, sodass die Zahlen $0,1,\dotsc,p-1$ immer ausreichen. Zum Beispiel besteht $\mathbb{F}_3$ aus den drei Zahlen $0,1,2$, und es gilt $2 + 2 = 1$ in $\mathbb{F}_3$.

Ein Polynom $f \in \mathbb{F}_p[X]$ mit Koeffizienten in $\mathbb{F}_p$ heißt _irreduzibel_, wenn es nicht konstant ist und für jede Zerlegung $f = g \cdot h$ mit Polynomen $g,h \in \mathbb{F}_p[X]$ gilt: $g$ oder $h$ ist konstant.

Es ist ein Fakt, dass es für jedes $n \geq 1$ ein normiertes irreduzibles Polynom vom Grad $n$ über $\mathbb{F}_p$ gibt.

## Aufgabe

Implementiere eine Funktion `get_monic_irreducible(n, p)`, die effizient für jedes $n \geq 1$ und jede Primzahl $p$ ein normiertes irreduzibles Polynom vom Grad $n$ über $\mathbb{F}_p$ berechnet, und zwar das Polynom, das lexikographisch\* am kleinsten ist.

Welcher Algorithmus dafür verwendet wird, ist nicht vorgegeben, allerdings soll er auch für große Werte von $n$ bzw. $p$ schnell funktionieren.

Implementiere außerdem eine Funktion `get_monic_irreducibles(n,p)`, die sämtliche normierten irreduziblen Polynome vom Grad $n$ über $\mathbb{F}_p$ berechnet.

\*Die Sortierung wird gestartet bei $X^0$, dann $X^1$, usw.

## Beispiele

| Eingabe                         | Ausgabe\*                     |
| ------------------------------- | ----------------------------- |
| `get_monic_irreducible(2, 2)`   | `X^2 + X + 1`                 |
| `get_monic_irreducible(3, 2)`   | `X^3 + X + 1`                 |
| `get_monic_irreducible(4, 2)`   | `X^4 + X + 1`                 |
| `get_monic_irreducible(5, 2)`   | `X^5 + X^2 + 1`               |
| `get_monic_irreducible(2, 3)`   | `X^2 + 1`                     |
| `get_monic_irreducible(5, 3)`   | `X^5 + 2X + 1`                |
| `get_monic_irreducible(2, 5)`   | `X^2 + 2`                     |
| `get_monic_irreducible(6, 5)`   | `X^6 + X + 2`                 |
| `get_monic_irreducible(3, 7)`   | `X^3 + 2`                     |
| `get_monic_irreducible(20, 13)` | `X^20 + X^2 + X + 9`          |
| `get_monic_irreducible(44, 11)` | `X^44 + X^2 + 4X + 7`         |
| `get_monic_irreducible(200, 2)` | `X^200 + X^5 + X^3 + X^2 + 1` |

\*Verschönerte Ausgabe. Die Funktion gibt eigentlich eine Koeffizientenliste zurück.

**Eingabe**

```js
get_monic_irreducibles(3, 2)
```

```json
[
	[1, 1, 0, 1], // X^3 + X + 1
	[1, 0, 1, 1] // X^3 + X^2 + 1
]
```

## Themen

Algebra, Arithmetik, Polynome, Laufzeitoptimierung, Algorithmen
