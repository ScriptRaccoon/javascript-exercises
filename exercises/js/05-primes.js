/**
 * Aufgabe: Implementiere einen Primzahlgenerator:
 *
 * Genauer gesagt, definiere ein Objekt "primes" das eine Methode .next()
 * bereitstellt, die jeweils die nächste Primzahl ausgibt:
 *
 * primes.next() = 2
 * primes.next() = 3
 * primes.next() = 5
 * primes.next() = 7
 * usw.
 *
 *
 * Es soll außerdem eine Methode zum Zurücksetzen des Generators geben:
 *
 * primes.reset()
 * primes.next() = 2
 * primes.next() = 3
 * usw.
 *
 * Hinweis: Es muss nicht unbedingt mit Klassen gearbeitet werden.
 *
 * Bonusaufgabe: Finde eine Lösung, die es unmöglich macht, die aktuelle Primzahl
 * von außen zu manipulieren (primes.current = 7 zum Beispiel sollte unmöglich sein).
 *
 * Themen: Generator, Objektorientierte Programmierung, Closure (Abschluss), Methoden
 */

/**
 * Primzahlgenerator
 */
const primes = {
	current: undefined,

	next: () => {
		let next_prime = primes.current ? primes.current + 1 : 2
		while (!is_prime(next_prime)) next_prime++
		primes.current = next_prime
		return next_prime
	},

	reset: () => {
		primes.current = undefined
	},
}

/**
 * Prüft ob eine Zahl eine Primzahl ist.
 */
function is_prime(n) {
	if (n !== Math.floor(n) || n <= 1) return false
	for (let d = 2; d * d <= n; d++) {
		if (n % d === 0) return false
	}
	return true
}

// TESTS
console.info(primes.next())
console.info(primes.next())
console.info(primes.next())
console.info(primes.next())
console.info(primes.next())
console.info(primes.next())

primes.reset()

console.info(primes.next())
console.info(primes.next())
console.info(primes.next())

// Es ist hierbei allerdings auch möglich, den internen Zähler
// zu manipulieren. Das ist problematisch.
primes.current = 100
console.info(primes.next(), "Oups!")

/**
 * Funktion, die einen Primzahlgenerator zurückgibt, ohne dass der aktuelle
 * Wert von außen zu ändern ist (Closure).
 */
function create_prime_generator() {
	let current

	return {
		next: () => {
			let next_prime = current ? current + 1 : 2
			while (!is_prime(next_prime)) next_prime++
			current = next_prime
			return next_prime
		},
		reset: () => {
			current = undefined
		},
	}
}

const primes_improved = create_prime_generator()

// TESTS
console.info("---")
console.info(primes_improved.next())
console.info(primes_improved.next())
console.info(primes_improved.next())
console.info(primes_improved.next())
console.info(primes_improved.next())
console.info(primes_improved.next())

primes_improved.reset()

console.info(primes_improved.next())
console.info(primes_improved.next())
console.info(primes_improved.next())
