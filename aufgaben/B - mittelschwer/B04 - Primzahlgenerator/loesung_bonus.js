/**
 * Funktion, die einen Primzahlgenerator zurückgibt, ohne dass der aktuelle
 * Wert von außen zugreifbar oder gar änderbar ist.
 */
function create_prime_generator() {
	let current

	return {
		next: () => {
			let next_prime = current ? current + 1 : 2
			while (!is_prime_number(next_prime)) next_prime++
			current = next_prime
			return next_prime
		},
		reset: () => {
			current = undefined
		},
	}
}

/**
 * Prüft ob eine Zahl eine Primzahl ist.
 */
function is_prime_number(n) {
	if (!Number.isInteger(n) || n <= 1) return false
	for (let d = 2; d * d <= n; d++) {
		if (n % d === 0) return false
	}
	return true
}

/* ------ TESTS ------ */

const primes_gen = create_prime_generator()

console.info(primes_gen.next()) // 2
console.info(primes_gen.next()) // 3
console.info(primes_gen.next()) // 5

console.info("reset")
primes_gen.reset()

console.info(primes_gen.next()) // 2
console.info(primes_gen.next()) // 3
console.info(primes_gen.next()) // 5
