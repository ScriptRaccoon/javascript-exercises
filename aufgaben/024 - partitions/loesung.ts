/**
 * Bestimmt die Anzahl der Zerlegungen einer Zahl durch andere Zahlen, wobei
 * die Reihenfolge keine Rolle spielt.
 */
function count_partitions(n: number, parts: number[]): number {
	if (!parts.every((p) => Number.isInteger(p) && p > 0)) {
		throw new Error("Nur positive ganze Zahlen sind als Bestandteile erlaubt")
	}

	if (!(Number.isInteger(n) && n >= 0)) {
		throw new Error("Nur nichtnegative Zahlen sind erlaubt")
	}

	const cache = Array(n + 1).fill(0)
	cache[0] = 1

	for (const part of parts) {
		for (let i = part; i <= n; i++) {
			cache[i] += cache[i - part]
		}
	}

	return cache[n]
}

/* ------ TESTS ------ */

const parts = [1, 2, 5, 10, 20, 50, 100, 200]
console.info(count_partitions(752, parts))
