# Aufgabe

Implementiere eine Funktion, die möglichst effizient für eine Zeichenabfolge den Buchstaben (a-z, A-Z) ausgibt, der am häufigsten darin vorkommt, zusammen mit seiner Häufigkeit. Wenn dabei mehrere Buchstaben in Frage kommen, gewinnt derjenige,
der als erstes vorgekommen ist.

# Beispiel

```js
most_frequent_letter("abba: dancing queen (1976)") ==  {letter: "a": frequency: 3}
```

Die Funktion gibt `undefined` zurück, wenn die Zeichenabfolge keinen Buchstaben beinhaltet.

```js
most_frequent_letter("110") == undefined;
```

Wichtig: Die Zeichenabfolge soll nur einmal durchlaufen werden!

# Themen

Laufzeitanalyse, Schleifen, regulärer Ausdruck, Optimierungsproblem,
Fallunterscheidungen
