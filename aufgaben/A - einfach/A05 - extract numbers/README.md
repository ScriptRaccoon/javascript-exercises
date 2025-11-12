# Aufgabe

Implementiere eine Funktion, die alle Zahlen aus einem Text herauszieht. Erfasst werden positive ganze Zahlen, negative ganze Zahlen, wie auch rationale Zahlen. Das Ergebnis soll ein Array der enthaltenden Zahlen sein.

# Beispiel

**Eingabe**

```js
const text = `
Rechnung Nr. 108421
2 Artikel à 19.99 €
Rückerstattung: -5.25 €`

extract_numbers(text)
```

**Ausgabe**

```text
[ 108421, 2, 19.99, -5.25 ]
```

# Themen

Strings, reguläre Ausdrücke
