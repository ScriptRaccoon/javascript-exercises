# Aufgabe

Implementiere eine Funktion, die alle Zahlen aus einem Text herauszieht.
Dabei müssen positive Zahlen, negative Zahlen, wie auch rationale Zahlen erfasst werden.
Das Ergebnis soll ein Array aller enthaltenden Zahlen sein.

# Beispiel

```js
const text = `
Rechnung Nr. 108421
2 Artikel à 19.99 €
Rückerstattung: -5.25 €`;

extract_numbers(text) == [108421, 2, 19.99, -5.25];
```

# Themen

reguläre Ausdrücke, Strings
