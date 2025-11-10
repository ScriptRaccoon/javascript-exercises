# Kontext

Normale Zahlen lassen sich in JavaScript nur bis zu einer bestimmten Grenze verarbeiten:

```js
1000000000000000000 + 42 == 1000000000000000000; // ???
```

Es gibt sogar eine `MAX_SAFE_INTEGER`:

```js
Number.MAX_SAFE_INTEGER == 9007199254740991;
Number.MAX_SAFE_INTEGER + 1 == 9007199254740992;
Number.MAX_SAFE_INTEGER + 2 == 9007199254740992; // ???
Number.MAX_SAFE_INTEGER + 3 == 9007199254740994;
```

# Aufgabe

Entwickle eine Klasse `BigNumber` (ähnlich wie die bereits in JS eingebaute
Klasse `BigInt`), die auch mit größeren natürlichen Zahlen klarkommt und mit ihnen
rechnen kann. Unterstützt werden sollen (mindestens) Addition und Multiplikation.
Der Konstruktor nimmt (a) Zahlen, (b) Strings, (c) (optional) Arrays von Ziffern an.

# Beispiel

```js
const x = new BigNumber(8916);
const y = new BigNumber(12087);

const u = x.add(y);
u.print(); // '21003'

const v = x.multiply(y);
v.print(); // '107767692'

const a = new BigNumber(1000000000000000000);
const b = new BigNumber(42);
const s = a.add(b);
s.print(); // '1000000000000000042'
```

# Themen

Mathematik, Arithmetik, Klassen, Methoden, Schleifen
