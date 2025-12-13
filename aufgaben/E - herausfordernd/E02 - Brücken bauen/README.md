# Brücken bauen

## Aufgabe

Gegeben sei ein Höhenprofil für ein Gebiet aus Wasser und Land, welches wir durch eine 0,1-Matrix kodieren: 0 steht für Wasser, 1 für Land.

Zum Beispiel kodieren wir das Profil (Land ist `*`)

```text
    * *           *
  * * * *         * *
    * * * * *   * * *
        * *
          *     * *
    *         * * *
  * * *
```

durch die 0,1-Matrix

```text
0 0 1 1 0 0 0 0 0 1 0
0 1 1 1 1 0 0 0 0 1 1
0 0 1 1 1 1 1 0 1 1 1
0 0 0 0 1 1 0 0 0 0 0
0 0 0 0 0 1 0 0 1 1 0
0 0 1 0 0 0 0 1 1 1 0
0 1 1 1 0 0 0 0 0 0 0
```

Eine _Insel_ ist eine zusammenhängende Landmasse. Unser Beispiel hat demnach 4 Inseln.

Eine _Brücke_ zwischen zwei Inseln ist eine Verbindung von zusammenhängenden Abschnitten, die auf dem Wasser errichtet werden.

```text
    * *      ---- *
  * * * *   |     * *
    * * * * *   * * *
    |   * *
    |     *     * *
    *     --- * * *
  * * *
```

Sie können horizontal und vertikal verlaufen, sogar abbiegen, aber nicht diagonal verlaufen.

1. Implementiere eine Funktion, die für ein gegebenes Höhenprofil, kodiert durch eine 0,1-Matrix, die Liste ihrer Inseln bestimmt. Eine Insel wird dabei durch die Menge ihrer Koordinaten kodiert.

2. Implementiere eine Funktion, die für je zwei Inseln eine kürzeste Brücke zwischen ihnen bestimmt. Eine Brücke kodieren wir durch ein Array von Koordinaten.

3. Implementiere eine Funktion, die eine Konfiguration von Brücken bestimmt, welche alle Inseln miteinander verbindet (ggf. indirekt), sodass die Gesamtlänge der Brücken minimiert wird. Die Kosten für ihre Errichtung sollen also minimiert werden.

Im obigen Beispielprofil ist eine solche Konfiguration die folgende mit der Gesamtlänge 4.

```text
    * *           *
  * * * *         * *
    * * * * * - * * *
    |   * *       |
    |     *     * *
    *         * * *
  * * *
```

Implementiere dafür sowohl eine Funktion `compute_best_bridge_selection(profile)`, welche die Brücken anhand ihrer Koordinaten ausgibt, sowie eine Funktion `get_best_bridge_plan(profile)`, welche die Koordinaten der Brücken in der Matrix jeweils mit 2 überschreibt.

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

Anschaulicher:

```text
                * * * * *                   * *
      * - - - - * * * *                     |
    * *                                     |
    * * *                                   |
      * *                         * * *     |
      |                         * * * * * - -
      * *         *             * * * * *
* * * * *         * * - - - - - * * * * *
  * * *           * *               * * *
  * *           * * *               |
  * * *       * * * *               |
    * * * - - * * * *               |
        |     *                     |
        |                       * * *
        * *                   * * * *
        * * * *                 * * * *
```

## Themen

Tiefensuche, Algorithmen, Graphentheorie, Minimaler Spannbaum
