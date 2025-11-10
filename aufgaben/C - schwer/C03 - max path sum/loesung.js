/**
 * Berechnet die maximale Pfadsumme einer Matrix mit einem rekursiven Ansatz.
 * Diese Methode ist zwar einfach hinzuschreiben, hat aber gerade bei großen
 * Matrizen eine schlechte Laufzeit, weil immer wieder dieselben Berechnungen
 * gemacht und nicht zwischengespeichert werden.
 */
function max_path_sum_rec(matrix) {
	if (matrix.length === 0) {
		return 0
	} else if (matrix[0].length === 0) {
		return 0
	}
	const submat_1 = matrix.slice(1)
	const submat_2 = matrix.map((row) => row.slice(1))
	const sum_1 = max_path_sum_rec(submat_1)
	const sum_2 = max_path_sum_rec(submat_2)
	return matrix[0][0] + Math.max(sum_1, sum_2)
}

/**
 * Berechnet die maximale Pfadsumme einer Matrix. Die Berechnung erfolgt iterativ
 * von unten rechts nach oben links. Zwischenergebnisse werden gespeichert.
 */
function max_path_sum(matrix) {
	if (matrix.length === 0) return 0
	if (matrix[0].length === 0) return 0

	const n = matrix.length
	const m = matrix[0].length

	const grid = Array.from({ length: n }, () => Array(m).fill(0))

	for (let p = n - 1; p >= 0; p--) {
		for (let q = m - 1; q >= 0; q--) {
			if (p === n - 1 && q === m - 1) {
				grid[p][q] = matrix[p][q]
			} else if (p === n - 1) {
				grid[p][q] = matrix[p][q] + grid[p][q + 1]
			} else if (q === m - 1) {
				grid[p][q] = matrix[p][q] + grid[p + 1][q]
			} else {
				grid[p][q] = matrix[p][q] + Math.max(grid[p + 1][q], grid[p][q + 1])
			}
		}
	}

	return grid[0][0]
}

/* ------ TESTS ------ */

const matrix = [
	[5, 3, 2],
	[1, 9, 1],
	[0, 2, 8],
]

console.info(max_path_sum(matrix))

function create_random_matrix(n, m, range) {
	const matrix = []
	for (let i = 0; i < n; i++) {
		matrix[i] = []
		for (let j = 0; j < m; j++) {
			matrix[i][j] = Math.floor(Math.random() * range)
		}
	}
	return matrix
}

const big_matrix = create_random_matrix(16, 16, 100)

// Zeitmessungen auf MacBook Pro 16'' (2024) mit M4 Pro Chip.

console.time("iterative method")
max_path_sum(big_matrix)
console.timeEnd("iterative method") // ca. 0.1ms

console.time("recursive method")
max_path_sum_rec(big_matrix)
console.timeEnd("recursive method") // ca. 22s
