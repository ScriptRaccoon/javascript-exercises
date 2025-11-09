# Aufgabe

Implementiere einen Primzahlgenerator:

Genauer gesagt, definiere ein Objekt `primes` das eine Methode `.next()`
bereitstellt, die jeweils die nächste Primzahl ausgibt:

```js
primes.next() = 2
primes.next() = 3
primes.next() = 5
primes.next() = 7
```

usw.

Es soll außerdem eine Methode zum Zurücksetzen des Generators geben:

```js
primes.reset()
primes.next() = 2
primes.next() = 3
```

usw.

Hinweis: Es muss nicht unbedingt mit Klassen gearbeitet werden.

# Bonusaufgabe

Finde eine Lösung, die es unmöglich macht, die aktuelle Primzahl
von außen zu manipulieren (`primes.current = 7` zum Beispiel sollte unmöglich sein).

# Themen

Generator, Objektorientierte Programmierung, Closure (Abschluss), Methoden
