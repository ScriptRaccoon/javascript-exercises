/**
 * Prüft, ob eine Zahl eine Primzahl ist.
 */
function is_prime_number(n: number): boolean {
	if (!Number.isInteger(n) || n <= 1) return false
	for (let d = 2; d * d <= n; d++) {
		if (n % d === 0) return false
	}
	return true
}

/**
 * Gibt für eine natürliche Zahl n ein Paar von Primzahlen (p,q) aus
 * mit n = p + q, sofern es existiert, andernfalls `null`.
 */
function decompose_into_primes(n: number): null | [number, number] {
	const is_possible = Number.isInteger(n) && n >= 4 && n % 2 === 0
	if (!is_possible) return null

	for (let p = 2; p <= n / 2; p++) {
		const q = n - p
		if (is_prime_number(p) && is_prime_number(q)) {
			return [p, q]
		}
	}

	return null
}

/**
 * Prüft die Goldbach-Vermutung für alle natürlichen Zahlen unterhalb einer Grenze.
 */
function verify_goldbach_up_to(limit: number): void {
	console.info(`Verifying Goldbach conjecture up to ${limit} ...`)
	for (let n = 4; n <= limit; n += 2) {
		const pair = decompose_into_primes(n)
		if (!pair) return console.warn(`Goldbach conjecture does not hold for n = ${n}`)
		const [p, q] = pair
		console.info(`${n} = ${p} + ${q}`)
	}
}

/* ------ TESTS ------ */

/*
4 = 2 + 2
6 = 3 + 3
8 = 3 + 5
10 = 3 + 7
12 = 5 + 7
...
*/
verify_goldbach_up_to(100)
