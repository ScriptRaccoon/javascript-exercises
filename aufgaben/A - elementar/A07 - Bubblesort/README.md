# Bubblesort

## Kontext

Der _Bubblesort-Algorithmus_ ist ein einfacher Algorithmus zum Sortieren eines Arrays von Zahlen. Er vertauscht im Wesentlichen immer wieder zwei benachbarte Zahlen, wenn sie nicht in der richtigen Reihenfolge sind (d.h., die Zahl links größer als die rechte ist).

Der Pseudocode lautet:

```text
bubble_sort(arr):

    n := länge von arr

    für m = n-1, n-2, ..., 0:
        getauscht := nein

        für i = 0, 1, ..., m-1:
            falls arr[i] > arr[i+1]:
                tausche arr[i] und arr[i+1]
                getauscht := ja

        falls nicht getauscht:
            fertig
```

## Aufgabe

Implementiere eine Funktion, die den Bubblesort-Algoritmus umsetzt. Eingabe ist ein Array von Zahlen beliebiger Länge. Die Funktion ändert das Array an Ort und Stelle. Es wird also kein neues Array produziert.

## Beispiel

**Eingabe**

```js
const arr = [
	42, 31, 12, 52, 29, 92, 99, 77, 87, 45, 30, 7, 12, 72, 69, 94, 98, 69, 25, 66,
]

bubble_sort(arr)

console.info(arr)
```

**Ausgabe**

```json
[7, 12, 12, 25, 29, 30, 31, 42, 45, 52, 66, 69, 69, 72, 77, 87, 92, 94, 98, 99]
```

## Themen

Schleifen, Algorithmen
