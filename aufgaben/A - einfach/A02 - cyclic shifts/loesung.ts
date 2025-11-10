/**
 * Berechnet das Array aller zyklischen Verschiebungen.
 */
function cyclic_shifts<T>(arr: T[]): T[][] {
	const n = arr.length

	const result: T[][] = []

	for (let i = 0; i < n; i++) {
		const shift = arr.slice(i).concat(arr.slice(0, i))
		result.push(shift)
	}

	return result
}

/**
 * Berechnet das Array aller zyklischen Verschiebungen.
 * Alternative Implementierung.
 */
function cyclic_shifts_alternativel<T>(arr: T[]): T[][] {
	const n = arr.length

	const result = new Array<T[]>(n)

	for (let i = 0; i < n; i++) {
		const shifted = new Array<T>(n)
		for (let j = 0; j < n; j++) {
			shifted[j] = arr[(i + j) % n]
		}
		result[i] = shifted
	}

	return result
}

/* ------ TESTS ------ */
console.info(cyclic_shifts([2, 3, 5]))
