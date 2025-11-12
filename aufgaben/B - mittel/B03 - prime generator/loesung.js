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
	if (!Number.isInteger(n) || n <= 1) return false
	for (let d = 2; d * d <= n; d++) {
		if (n % d === 0) return false
	}
	return true
}

/* ------ TESTS ------ */

console.info(primes.next()) // 2
console.info(primes.next()) // 3
console.info(primes.next()) // 5
console.info(primes.next()) // 7
console.info(primes.next()) // 11
console.info(primes.next()) // 13

console.info("reset")
primes.reset()

console.info(primes.next()) // 2
console.info(primes.next()) // 3
console.info(primes.next()) // 5

// Es ist hierbei allerdings auch möglich, den internen Zähler
// zu manipulieren. Daher die Bonusaufgabe!
primes.current = 100
console.info(primes.next()) // 101
