# Primzahlgenerator

## Aufgabe

Implementiere einen Primzahlgenerator. Genauer gesagt, definiere ein Objekt `primes`, welches eine Methode `.next()` beinhaltet, die jeweils die nächste Primzahl ausgibt:

```js
primes.next() == 2
primes.next() == 3
primes.next() == 5
primes.next() == 7
primes.next() == 11
primes.next() == 13
```

Es soll außerdem eine Methode zum Zurücksetzen des Generators geben:

```js
primes.reset()

primes.next() == 2
primes.next() == 3
primes.next() == 5
```

Hinweis: Es muss nicht unbedingt mit Klassen gearbeitet werden.

## Bonusaufgabe

Finde eine Lösung, die es unmöglich macht, die aktuelle Primzahl von außen zu manipulieren. Zum Beispiel sollte `primes.current = 7` unmöglich sein.

## Themen

Generatoren, Objektorientierte Programmierung, Abschluss, Methoden
