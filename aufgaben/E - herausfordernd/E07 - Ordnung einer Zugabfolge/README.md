# Ordnung einer Zugabfolge

## Kontext

Jede Zugabfolge auf dem Zauberwürfel hat eine _Ordnung_: die kleinste Anzahl von Wiederholungen der Zugabfolge, die man machen muss, bis der Würfel wieder im Ursprungszustand ist. Mehr dazu kann man zum Beispiel in dem Artikel [Was die Zahl 1260 so besonders macht](https://cubingfreunde.wordpress.com/2025/08/11/1260-maximale-ordnung/) nachlesen.

<img width="500" alt="ruf" src="https://github.com/user-attachments/assets/efdc3cbf-7476-4991-87a7-cb6ae4cb614c" />

Zugabfolgen werden dabei als Strings kodiert. Zum Beispiel dreht man bei der Zugabfolge `R2 U R' F` zweimal rechts im UZS, dann oben einmal im UZS, dann rechts einmal gegen den UZS, und schließlich vorne einmal gegen den UZS. Details zur Notation findet man im Artikel [Zauberwürfel: Notation](https://freshcuber.wordpress.com/2012/01/18/zauberwuerfel-notation/).

## Aufgabe

Implementiere eine Funktion, die die Ordnung einer Zugabfolge auf dem Zauberwürfel bestimmt.

Für illegale Zugabfolgen wird ein Fehler geworfen.

## Beispiele

| Eingabe                                                      | Ausgabe |
| ------------------------------------------------------------ | ------- |
| `get_sequence_order(" ")`                                    | `1`     |
| `get_sequence_order("R")`                                    | `4`     |
| `get_sequence_order("R'")`                                   | `4`     |
| `get_sequence_order("U")`                                    | `4`     |
| `get_sequence_order("R U")`                                  | `105`   |
| `get_sequence_order("R U'")`                                 | `63`    |
| `get_sequence_order("R U R' U'")`                            | `6`     |
| `get_sequence_order("R U F")`                                | `80`    |
| `get_sequence_order("R D F U")`                              | `252`   |
| `get_sequence_order("R3 D' F' U3 D F U")`                    | `72`    |
| `get_sequence_order("R U R' U' R' F R2 U' R' U' R U R' F'")` | `2`     |
| `get_sequence_order("R U' R U R U R U' R' U' R2")`           | `3`     |
| `get_sequence_order("R U2 D' B D'")`                         | `1260`  |

## Themen

Reguläre Ausdrücke, Permutationen, Mathematik, Kombinatorik, Modellierung
