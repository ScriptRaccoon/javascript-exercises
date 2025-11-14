/**
 * Findet eine Lösung für das Springerproblem: einen Weg des Springes über ein
 * n×m-Schachbrett, bei dem jedes Feld genau einmal betreten wird.
 * Das Ergebnis wird kodiert durch eine Matrix, bei der die Koordinate
 * des i-ten Schritts mit i befüllt wird (i = 1, 2, ..., n*m).
 *
 * Methode: Backtracking.
 */
function find_knight_tour(n, m, start) {
	const matrix = Array.from({ length: n }, () => Array(m).fill(0))

	const mark_step = ([y, x], step) => {
		matrix[y][x] = step
	}

	const is_visited = ([y, x]) => matrix[y][x] >= 1

	const is_valid = ([y, x]) => y >= 0 && y < n && x >= 0 && x < m

	const get_next_coords = ([y, x]) => {
		const coords = []
		for (const u of [1, -1]) {
			for (const v of [2, -2]) {
				for (const flipped of [true, false]) {
					const coord = flipped ? [y + v, x + u] : [y + u, x + v]
					if (is_valid(coord) && !is_visited(coord)) {
						coords.push(coord)
					}
				}
			}
		}
		return coords
	}

	/**
	 * Löst das Springerproblem rekursiv mit einem vorgegebenem Anfangsabschnitt
	 * von Koordinaten und einer Schrittzahl (1,...,n*m).
	 */
	function solve(current, step) {
		mark_step(current, step)

		if (step === n * m) return matrix

		const next_coords = get_next_coords(current)

		// Warnsdorff's Regel: Sortiere Fortsetzungen nach der Anzahl ihrer
		// möglichen Fortsetzungen
		const next_coords_with_counts = next_coords.map((coord) => [
			coord,
			get_next_coords(coord).length,
		])
		next_coords_with_counts.sort((a, b) => a[1] - b[1])

		for (const [coord] of next_coords_with_counts) {
			const solution = solve(coord, step + 1)
			if (solution) return solution
		}

		mark_step(current, 0)

		return null
	}

	return solve(start, 1)
}

/**
 * Druckt eine Lösung für das Springerproblem in die Konsole
 * inkl. der dafür benötigten Berechnungszeit.
 */
function print_knight_tour(n, m, start) {
	console.time("computation")
	const result = find_knight_tour(n, m, start)
	console.timeEnd("computation")
	console.table(result)
}

/* ------ TESTS ------ */

/*
┌─────────┬────┬────┬────┬────┬────┐
│ (index) │ 0  │ 1  │ 2  │ 3  │ 4  │
├─────────┼────┼────┼────┼────┼────┤
│ 0       │ 1  │ 22 │ 11 │ 16 │ 7  │
│ 1       │ 12 │ 17 │ 8  │ 21 │ 10 │
│ 2       │ 25 │ 2  │ 23 │ 6  │ 15 │
│ 3       │ 18 │ 13 │ 4  │ 9  │ 20 │
│ 4       │ 3  │ 24 │ 19 │ 14 │ 5  │
└─────────┴────┴────┴────┴────┴────┘
*/
print_knight_tour(5, 5, [0, 0])

/*
┌─────────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┐
│ (index) │ 0  │ 1  │ 2  │ 3  │ 4  │ 5  │ 6  │ 7  │ 8  │ 9  │
├─────────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
│ 0       │ 31 │ 72 │ 17 │ 64 │ 29 │ 80 │ 15 │ 48 │ 53 │ 50 │
│ 1       │ 18 │ 1  │ 30 │ 73 │ 16 │ 65 │ 54 │ 51 │ 14 │ 47 │
│ 2       │ 71 │ 32 │ 63 │ 28 │ 77 │ 68 │ 79 │ 58 │ 49 │ 52 │
│ 3       │ 2  │ 19 │ 76 │ 69 │ 74 │ 59 │ 66 │ 55 │ 46 │ 13 │
│ 4       │ 33 │ 70 │ 27 │ 62 │ 67 │ 78 │ 45 │ 60 │ 57 │ 40 │
│ 5       │ 20 │ 3  │ 34 │ 75 │ 24 │ 61 │ 56 │ 41 │ 12 │ 9  │
│ 6       │ 35 │ 26 │ 5  │ 22 │ 37 │ 44 │ 7  │ 10 │ 39 │ 42 │
│ 7       │ 4  │ 21 │ 36 │ 25 │ 6  │ 23 │ 38 │ 43 │ 8  │ 11 │
└─────────┴────┴────┴────┴────┴────┴────┴────┴────┴────┴────┘
*/
print_knight_tour(8, 10, [1, 1])

console.info(find_knight_tour(4, 4, [0, 0])) // null
console.info(find_knight_tour(5, 5, [1, 0])) // null
