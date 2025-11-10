/**
 * Berechnet das Array aller Verschiebungen.
 */
function shifts(arr) {
	const n = arr.length

	const result = []

	for (let i = 0; i < n; i++) {
		const shift = arr.slice(i).concat(arr.slice(0, i))
		result.push(shift)
	}

	return result
}

/**
 * Berechnet das Array aller Verschiebungen.
 * Alternative Implementierung.
 */
function shifts_lowlevel(arr) {
	const n = arr.length

	const result = new Array(n)

	for (let i = 0; i < n; i++) {
		const shifted = new Array() < T > n
		for (let j = 0; j < n; j++) {
			shifted[j] = arr[(i + j) % n]
		}
		result[i] = shifted
	}

	return result
}

/* ------ TESTS ------ */
console.info(shifts([2, 3, 5]))
