/**
 * Aufgabe: Implementiere eine Funktion, die zu einem Array von Zahlen
 * die größte Lücke zwischen diesen Zahlen berechnet.
 *
 * Beispiel:
 *
 * largest_gap([2,10,3,9]) = 6 weil die größte Lücke zwischen 3 und 9 ist.
 *
 * Für Arrays der Länge <= 1 sei 0 die größte Lücke.
 *
 * Themen: Optimierung, Sortierung, Array-Methoden
 */

/**
 * Berechnet die größte Lücke eines Arrays von Zahlen.
 */
function largest_gap(arr: number[]): number {
	if (arr.length <= 1) return 0
	const sorted = arr.toSorted((a, b) => a - b)
	const gaps = sorted.map((_, i) => sorted[i] - sorted[i - 1]).slice(1)
	return Math.max(...gaps)
}

/**
 * Berechnet die größte Lücke eines Arrays von Zahlen.
 * Iterative Implementierung.
 */
function largest_gap_alternative(arr: number[]): number {
	if (arr.length <= 1) return 0
	const sorted = arr.toSorted((a, b) => a - b)

	let largest = 0

	for (let i = 1; i < sorted.length; i++) {
		const gap = sorted[i] - sorted[i - 1]
		if (gap > largest) largest = gap
	}

	return largest
}

// TESTS
console.info(largest_gap([2, 10, 3, 9]))
console.info(largest_gap([2]))
console.info(largest_gap([]))
console.info(largest_gap([0, 10, 100]))
