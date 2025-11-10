/**
 * Prüft ob eine Zahl eine Primzahl ist.
 */
function is_prime_number(n) {
	if (n !== Math.floor(n) || n <= 1) return false
	for (let d = 2; d * d <= n; d++) {
		if (n % d === 0) return false
	}
	return true
}

/**
 * Prüft die Goldbach-Vermutung für eine feste natürliche Zahl
 */
function verify_goldbach(n) {
	const is_relevant = Number.isInteger(n) && n >= 4 && n % 2 === 0
	if (!is_relevant) return

	for (let p = 2; p <= n / 2; p++) {
		const q = n - p
		if (is_prime_number(p) && is_prime_number(q)) {
			return console.info(`${n} = ${p} + ${q}`)
		}
	}

	console.warn(`Goldbach conjecture is wrong for n = ${n}`)
}

/**
 * Prüft die Goldbach-Vermutung für alle natürlichen Zahlen unterhalb einer Grenze
 */
function verify_goldbachs(n) {
	console.info(`Verifying Goldbach conjecture up to ${n} ...`)
	for (let k = 4; k <= n; k += 2) {
		verify_goldbach(k)
	}
}

/* ------ TESTS ------ */
verify_goldbachs(100)
