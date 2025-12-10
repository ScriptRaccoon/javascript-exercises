# Assoziative Verknüpfungen

## Kontext

Eine Verknüpfung $b : X \times X \to X$ auf einer Menge $X$ heißt _assoziativ_, wenn für alle $x,y,z \in X$ gilt:

$b(b(x,y),z) = b(x,b(y,z))$

Eine solche Verknüpfung kann man auch als eine Verknüpfungstabelle darstellen. Hier etwa das Beispiel der Addition modulo $5$ auf $X = \{0,1,2,3,4\}$.

| +     | **0** | **1** | **2** | **3** | **4** |
| ----- | ----- | ----- | ----- | ----- | ----- |
| **0** | 0     | 1     | 2     | 3     | 4     |
| **1** | 1     | 2     | 3     | 4     | 0     |
| **2** | 2     | 3     | 4     | 0     | 1     |
| **3** | 3     | 4     | 0     | 1     | 2     |
| **4** | 4     | 0     | 1     | 2     | 3     |

## Aufgabe

Implementiere eine Funktion, welche für ein festes $0 \leq n \leq 6$ die Anzahl der assoziativen Verknüpfungen auf einer Menge mit $n$ Elementen effizient bestimmt.

Ein Brute-Force-Algorithmus (der z. B. alle $n \times n$-Verknüpfungstabellen auf Assoziativität überprüft) wäre viel zu langsam. Finde einen besseren Algorithmus.

Die Anzahl ist sogar für $n \leq 9$ bekannt, vgl. [OEIS](https://oeis.org/A023814). Die Funktion muss aber nicht für diese Werte optimiert werden.

## Beispiele

| Eingabe                           | Ausgabe    |
| --------------------------------- | ---------- |
| `count_associative_operations(0)` | `1`        |
| `count_associative_operations(1)` | `1`        |
| `count_associative_operations(2)` | `8`        |
| `count_associative_operations(3)` | `113`      |
| `count_associative_operations(4)` | `3492`     |
| `count_associative_operations(5)` | `183732`   |
| `count_associative_operations(6)` | `17061118` |

## Themen

Laufzeitoptimierung, Algorithmen, Constraint Satisfaction Problem, Mathematik
