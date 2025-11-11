/**
 * Typ für eine Koordinate auf dem Schachbrett
 */
type Coord = [number, number]

/**
 * Findet eine Lösung für das Springerproblem: einen Weg des Springes über ein
 * nxn-Schachbrett, bei dem jedes Feld genau einmal betreten wird.
 * Das Ergebnis wird kodiert durch eine Matrix, bei der die Koordinate
 * des i-ten Schritts mit i befüllt wird (i = 1,2,...,n*n).
 */
function find_knight_tour(n: number, start: Coord): null | number[][] {
	const result = Array.from({ length: n }, () => Array(n).fill(0))

	const mark_step = ([y, x]: Coord, step: number) => {
		result[y][x] = step
	}

	const is_visited = ([y, x]: Coord) => result[y][x] >= 1

	const is_valid = ([y, x]: Coord) => y >= 0 && y < n && x >= 0 && x < n

	const get_next_coords = ([y, x]: Coord) => {
		const coords: Coord[] = []
		for (const u of [1, -1]) {
			for (const v of [2, -2]) {
				for (const flipped of [true, false]) {
					const coord: Coord = flipped ? [y + v, x + u] : [y + u, x + v]
					if (is_valid(coord) && !is_visited(coord)) {
						coords.push(coord)
					}
				}
			}
		}
		return coords
	}

	/**
	 * Löst das Springerproblem rekursiv mit einem vorgegebenem
	 * Anfangsabschnitt von Koordinaten und einem Schrittindex.
	 */
	function solve(current: Coord, step: number): null | number[][] {
		mark_step(current, step)

		if (step === n * n) return result

		const next_coords = get_next_coords(current)

		// Warnsdorff's Regel: Sortiere Fortsetzungen nach ihren möglichen Fortsetzungen
		// damit potenzielle Sackgassen möglichst früh beendet werden
		const next_coords_with_counts = next_coords.map(
			(coord) => [coord, get_next_coords(coord).length] as [Coord, number],
		)
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
 * inkl. die dafür benötigte Berechnungszeit.
 */
function print_knight_tour(n: number, start: Coord) {
	console.time("computation")
	const result = find_knight_tour(n, start)
	console.timeEnd("computation")
	console.table(result)
}

/* ------ TESTS ------ */

print_knight_tour(20, [0, 0])
