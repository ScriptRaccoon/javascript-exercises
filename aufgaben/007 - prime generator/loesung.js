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

/* ------ TESTS ------ */
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

/* ------ TESTS ------ */
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
