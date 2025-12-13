/**
 * Erzeugt mit dem Sieb des Eratosthenes ein 0,1-Array, sodass die Indizes
 * mit 1 genau die Primzahlen <= n sind.
 * Zwecks Performance wird ein Uint8Array anstelle eines Array verwendet.
 */
function get_prime_sieve(n: number): Uint8Array {
	const sieve = new Uint8Array(n + 1)
	sieve.fill(1, 2) // [0,0,1,1,1,1,...]
	const limit = Math.sqrt(n)
	for (let i = 2; i <= limit; i++) {
		if (sieve[i]) {
			for (let j = i * i; j <= n; j += i) {
				sieve[j] = 0
			}
		}
	}
	return sieve
}

/**
 * Prüft die Goldbach-Vermutung für alle natürlichen Zahlen unterhalb einer Grenze.
 * Zwecks Laufzeitoptimierung werden vorher alle Primzahlen in dem Bereich bestimmt.
 */
function verify_goldbach_fast(limit: number) {
	console.info(`👀 Verify Goldback conjecture up to ${limit} ...`)

	console.info("Generating sieve ...")
	const primes = get_prime_sieve(limit)

	console.info("Checking numbers ...")
	for (let n = 4; n <= limit; n += 2) {
		if (primes[n - 2]) continue

		let valid = false

		for (let p = 3; p * 2 <= n; p += 2) {
			if (primes[p] && primes[n - p]) {
				valid = true
				break
			}
		}

		if (!valid) {
			return console.warn(`❌ Fails for n = ${n}`)
		}
	}

	console.info("✅ Verified")
}

console.time("⏱️ Computation")
verify_goldbach_fast(1_000_000_000)
console.timeEnd("⏱️ Computation")
