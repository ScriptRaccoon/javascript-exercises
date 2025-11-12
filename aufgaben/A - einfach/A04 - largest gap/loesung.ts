/**
 * Berechnet die größte Lücke in einem Array von Zahlen.
 * Benutzt verschiedene Array-Methoden und Math.max.
 */
function largest_gap(arr: number[]): number | null {
	if (arr.length === 0) return null
	if (arr.length === 1) return 0
	const sorted = arr.toSorted((a, b) => a - b)
	const gaps = sorted.map((_, i) => sorted[i] - sorted[i - 1]).slice(1)
	return Math.max(...gaps)
}

/**
 * Berechnet die größte Lücke in einem Array von Zahlen.
 * Bestimmt das Maximum händisch, und ist etwas schneller.
 */
function largest_gap_faster(arr: number[]): number | null {
	if (arr.length === 0) return null

	const sorted = arr.toSorted((a, b) => a - b)

	let largest = 0

	for (let i = 1; i < sorted.length; i++) {
		const gap = sorted[i] - sorted[i - 1]
		if (gap > largest) largest = gap
	}

	return largest
}

/* ------ TESTS ------ */

// 6
console.info(largest_gap([2, 10, 3, 9]))

// 0
console.info(largest_gap([2]))

// null
console.info(largest_gap([]))
