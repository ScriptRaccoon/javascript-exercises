/**
 * Berechnet das Array aller zyklischen Verschiebungen eines Arrays.
 * Implementierung, die mit diversen Array-Methoden arbeitet.
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
 * Berechnet das Array aller zyklischen Verschiebungen eines Arrays.
 * Einfache Implementierung, die die Arrays per Hand aufbaut.
 * Die Performance ist nicht wesentlich anders.
 */
function cyclic_shifts_alternative<T>(arr: T[]): T[][] {
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

// [ [ 2, 3, 5 ], [ 3, 5, 2 ], [ 5, 2, 3 ] ]
console.info(cyclic_shifts([2, 3, 5]))
