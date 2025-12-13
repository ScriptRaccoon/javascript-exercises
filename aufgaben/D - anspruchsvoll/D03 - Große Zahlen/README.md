# Große Zahlen

## Kontext

Normale Zahlen lassen sich in JavaScript nur bis zu einer bestimmten Grenze zuverlässig verarbeiten:

```js
1000000000000000000 + 42 == 1000000000000000000 // ???
```

Es gibt sogar eine `MAX_SAFE_INTEGER`:

```js
Number.MAX_SAFE_INTEGER == 9007199254740991
Number.MAX_SAFE_INTEGER + 1 == 9007199254740992
Number.MAX_SAFE_INTEGER + 2 == 9007199254740992 // ???
Number.MAX_SAFE_INTEGER + 3 == 9007199254740994
```

## Aufgabe

Entwickle eine Klasse `BigNumber` (ähnlich wie die bereits in JS eingebaute Klasse `BigInt`), die beliebig große natürliche Zahlen verarbeiten und mit ihnen rechnen kann. Der Konstruktor nimmt sowohl Zahlen, Strings, als auch Arrays von Ziffern entgegen.

Unterstützt werden sollen Addition und Multiplikation in Form von zwei Klassenmethoden `.add` und `.multiply`. Außerdem soll es eine Methode `.print` geben, mit der die Zahl in die Konsole geschrieben wird.

## Beispiel 1

**Eingabe**

```js
const x = new BigNumber(8916)
const y = new BigNumber(12087)

const sum = x.add(y)
const prod = x.multiply(y)

sum.print()
prod.print()
```

**Ausgabe**

```json
21003
21003
```

## Beispiel 2

Auch große Zahlen funktionieren nun:

**Eingabe**

```js
const a = new BigNumber(1000000000000000000)
const b = new BigNumber(42)
const sum = a.add(b)
sum.print()
```

**Ausgabe**

```json
1000000000000000042
```

## Themen

Mathematik, Arithmetik, Klassen, Methoden, Schleifen
