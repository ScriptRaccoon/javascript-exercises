# Domino-Pflasterungen

## Aufgabe

Implementiere eine Funktion, die effizient die Anzahl der Pflasterungen eines `m`x`n`-Rechtecks durch Dominosteine berechnet.

Anleitung: Interpretiere solche Pflasterungen als Wege in einem gerichteten Graphen der Länge `n`, dessen Knoten die Konfigurationen von überstehenden Dominos sind. Kodiere diese Konfigurationen durch Bitmasken. Verwende `bigint` als Rückgabetyp für die Anzahlen.

## Beispiele

| Eingabe                       | Ausgabe                                              |
| ----------------------------- | ---------------------------------------------------- |
| `count_domino_tilings(2,1)`   | `1n`                                                 |
| `count_domino_tilings(2,2)`   | `2n`                                                 |
| `count_domino_tilings(4,4)`   | `36n`                                                |
| `count_domino_tilings(5,5)`   | `0n`                                                 |
| `count_domino_tilings(10,4)`  | `18061n`                                             |
| `count_domino_tilings(10,6)`  | `4213133n`                                           |
| `count_domino_tilings(10,10)` | `258584046368n`                                      |
| `count_domino_tilings(12,12)` | `53060477521960000n`                                 |
| `count_domino_tilings(20,20)` | `1269984011256235834242602753102293934298576249856n` |

## OEIS-Folgen

Zur Kontrolle der Zahlenwerte finden sich hier einige OEIS-Folgen der Anzahlen für festes `m`:

| `m`  | OEIS-Folge                          |
| ---- | ----------------------------------- |
| `2`  | [A000045](https://oeis.org/A000045) |
| `3`  | [A001835](https://oeis.org/A001835) |
| `4`  | [A005178](https://oeis.org/A005178) |
| `5`  | [A003775](https://oeis.org/A003775) |
| `6`  | [A028468](https://oeis.org/A028468) |
| `7`  | [A028469](https://oeis.org/A028469) |
| `8`  | [A028470](https://oeis.org/A028470) |
| `9`  | [A028471](https://oeis.org/A028471) |
| `10` | [A028472](https://oeis.org/A028472) |

Es gibt auch den allgemeinen Eintrag [A099390](https://oeis.org/A099390).

## Themen

Dynamische Programmierung, Laufzeitoptimierung, Bitmasken, Graphen, Algorithmen
