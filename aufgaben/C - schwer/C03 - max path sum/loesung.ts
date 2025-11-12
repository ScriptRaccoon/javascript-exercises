/**
 * Berechnet die maximale Pfadsumme einer Matrix mit einem rekursiven, "top-down" Ansatz.
 * Diese Methode ist zwar einfach hinzuschreiben, hat aber gerade bei großen
 * Matrizen eine schlechte Laufzeit, weil immer wieder dieselben Berechnungen
 * gemacht und nicht zwischengespeichert werden.
 */
function max_path_sum_rec(matrix: number[][]): number {
	if (matrix.length === 0) return 0
	if (matrix[0].length === 0) return 0

	const without_first_row = matrix.slice(1)
	const without_first_column = matrix.map((row) => row.slice(1))
	const sum_down = max_path_sum_rec(without_first_row)
	const sum_right = max_path_sum_rec(without_first_column)
	return matrix[0][0] + Math.max(sum_down, sum_right)
}

/**
 * Berechnet die maximale Pfadsumme einer Matrix mit einem iterativen, "bottom-up"
 * Ansatz, bei dem Zwischenergebnisse in einer Tabelle zwischengespeichert werden.
 */
function max_path_sum(matrix: number[][]): number {
	if (matrix.length === 0) return 0
	if (matrix[0].length === 0) return 0

	const n = matrix.length
	const m = matrix[0].length

	/**
	 * max_sum_at[p][q] = maximale Pfadsumme von (p, q) nach (n - 1, m - 1)
	 */
	const max_sum_at: number[][] = Array.from({ length: n }, () => Array(m).fill(0))

	for (let p = n - 1; p >= 0; p--) {
		for (let q = m - 1; q >= 0; q--) {
			if (p === n - 1 && q === m - 1) {
				max_sum_at[p][q] = matrix[p][q]
			} else if (p === n - 1) {
				max_sum_at[p][q] = matrix[p][q] + max_sum_at[p][q + 1]
			} else if (q === m - 1) {
				max_sum_at[p][q] = matrix[p][q] + max_sum_at[p + 1][q]
			} else {
				max_sum_at[p][q] =
					matrix[p][q] + Math.max(max_sum_at[p + 1][q], max_sum_at[p][q + 1])
			}
		}
	}

	return max_sum_at[0][0]
}

/* ------ TESTS ------ */

const matrix = [
	[5, 3, 2],
	[1, 9, 1],
	[0, 2, 8],
]

console.info(max_path_sum(matrix)) // 27

/* ------ PERFORMANCE COMPARISON ------ */

function create_random_matrix(n: number, m: number, range: number) {
	const matrix: number[][] = []
	for (let i = 0; i < n; i++) {
		matrix[i] = []
		for (let j = 0; j < m; j++) {
			matrix[i][j] = Math.floor(Math.random() * range)
		}
	}
	return matrix
}

const big_matrix = create_random_matrix(16, 16, 100)
console.table(big_matrix)

console.time("iterative method")
console.info(max_path_sum(big_matrix))
console.timeEnd("iterative method") // ca. 0.1ms

console.time("recursive method")
console.info(max_path_sum_rec(big_matrix))
console.timeEnd("recursive method") // ca. 22s
