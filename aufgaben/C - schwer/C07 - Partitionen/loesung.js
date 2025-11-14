/**
 * Bestimmt die Anzahl der Partitionen einer Zahl durch andere Zahlen,
 * wobei die Reihenfolge keine Rolle spielt.
 * Methode: "bottom-up".
 */
function count_partitions(n, parts) {
	if (!parts.every((p) => Number.isInteger(p) && p > 0)) {
		throw new Error("Nur positive ganze Zahlen sind als Bestandteile erlaubt")
	}

	if (!(Number.isInteger(n) && n >= 0)) {
		throw new Error("Nur nichtnegative Zahlen sind erlaubt")
	}

	const unique_parts = new Set(parts)

	const partitions = Array(n + 1).fill(0)
	partitions[0] = 1

	for (const p of unique_parts) {
		for (let i = p; i <= n; i++) {
			// i = (... partition von i - p mit teilen <= p ...) + p
			partitions[i] += partitions[i - p]
		}
	}

	return partitions[n]
}

/* ------ TESTS ------ */

console.info(count_partitions(12, [1, 2, 10, 5])) // 15
console.info(count_partitions(101, [50])) // 0
console.info(count_partitions(752, [1, 2, 5, 10, 20, 50, 100, 200])) // 60510110
console.info(count_partitions(999, [33, 56, 60])) // 6
