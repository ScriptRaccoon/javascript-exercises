# Arithmetische Zerlegungen und die Zahl 4

## Kontext

Jede positive ganze Zahl kann man als einen arithmetischen Ausdruck darstellen, der sich aus der 4 ergibt sowie den fünf gängigen Operationen: Addition (`+`), Multiplikation (`*`), Subtraktion (`-`), Division (`/`) und Exponentiation (`**`).

Zum Beispiel gilt:

- `1 = 4/4`
- `5 = 4+(4/4)`
- `6 = 4+((4+4)/4)`
- `100 = 4+(4*(4+(4+(4*4))))`

Es gibt jeweils sehr viele solcher Darstellungen. So gilt etwa `6 = 4+((4/4)+(4/4))`, aber diese Darstellung ist länger als `6 = 4+((4+4)/4)` in dem Sinne, dass sie `4` statt `3` Operatoren verwendet.

## Aufgabe

Implementiere eine Funktion, die effizient für jede positive ganze Zahl `n` einen arithmetischen Ausdruck mit Vieren ausgibt, der sich zu `n` auswertet und die Anzahl der verwendeten Operatoren minimal ist.

Anstelle der `4` lasse auch eine beliebige positive ganze Zahl als "Basis" zu.

Optimiere die Funktion so, dass sie auch für `n <= 99999` innerhalb von (Milli-)Sekunden ein Ergebnis liefert.

## Beispiele

### Basis 4

| Eingabe                              | Ausgabe                                             |
| ------------------------------------ | --------------------------------------------------- |
| `print_shortest_expression(1,4)`     | `1 = 4/4`                                           |
| `print_shortest_expression(2,4)`     | `2 = (4+4)/4`                                       |
| `print_shortest_expression(3,4)`     | `3 = 4-(4/4)`                                       |
| `print_shortest_expression(4,4)`     | `4 = 4`                                             |
| `print_shortest_expression(5,4)`     | `5 = 4+(4/4)`                                       |
| `print_shortest_expression(6,4)`     | `6 = 4+((4+4)/4)`                                   |
| `print_shortest_expression(7,4)`     | `7 = 4+(4-(4/4))`                                   |
| `print_shortest_expression(8,4)`     | `8 = 4+4`                                           |
| `print_shortest_expression(9,4)`     | `9 = 4+(4+(4/4))`                                   |
| `print_shortest_expression(10,4)`    | `10 = 4+(4+((4+4)/4))`                              |
| `print_shortest_expression(123,4)`   | `123 = (4*(4*(4+4)))-(4+(4/4))`                     |
| `print_shortest_expression(999,4)`   | `999 = (4*((4**4)-4))-(4+(4+(4/4)))`                |
| `print_shortest_expression(2025,4)`  | `2025 = 4+(4+((4/4)+((4+4)*((4**4)-4))))`           |
| `print_shortest_expression(3003,4)`  | `3003 = ((4**4)*(4+(4+4)))-(4+((4+(4**4))/4))`      |
| `print_shortest_expression(39999,4)` | `39999 = (((4+(4*4))**4)-4)/4`                      |
| `print_shortest_expression(91681,4)` | `91681 = (((4*4)+(4/4))**4)+((4+4)*((4*(4**4))-4))` |

### Basis 3

| Eingabe                                 | Ausgabe                                   |
| --------------------------------------- | ----------------------------------------- |
| `print_shortest_expression(10,3)`       | `10 = (3*3)+(3/3)`                        |
| `print_shortest_expression(100,3)`      | `100 = (3/3)+(3*(3+(3+(3**3))))`          |
| `print_shortest_expression(1000,3)`     | `1000 = ((3*3)+(3/3))**3`                 |
| `print_shortest_expression(10000,3)`    | `10000 = ((3*3)+(3/3))**(3+(3/3))`        |
| `print_shortest_expression(100000,3)`   | `100000 = ((3*3)+(3/3))**(3+(3-(3/3)))`   |
| `print_shortest_expression(1000000,3)`  | `1000000 = ((3*3)+(3/3))**(3+3)`          |
| `print_shortest_expression(10000000,3)` | `10000000 = ((3*3)+(3/3))**(3+(3+(3/3)))` |

### Basis 1

| Eingabe                            | Ausgabe                                           |
| ---------------------------------- | ------------------------------------------------- |
| `print_shortest_expression(5,1)`   | `5 = 1+(1+(1+(1+1)))`                             |
| `print_shortest_expression(6,1)`   | `6 = (1+1)*(1+(1+1))`                             |
| `print_shortest_expression(101,1)` | `101 = 1+((1+((1+(1+1))**(1+1)))**(1+1))`         |
| `print_shortest_expression(500,1)` | `500 = ((1+((1+(1+1))**(1+1)))**(1+(1+1)))/(1+1)` |

## Themen

Laufzeitoptimierung, Algorithmen, Arithmetik, Rekursion, Tiefensuche
