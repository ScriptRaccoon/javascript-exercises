/**
 * Typ für eine Koordinate.
 */
type Coord = [number, number]

/**
 * Typ für eine Figur bzw. Kachel, also eine Liste von Koordinaten.
 */
type Tile = Coord[]

/**
 * Typ für eine Pflasterung, also eine Liste von Kacheln, die das Rechteck
 * ohne Überschneidungen überdecken.
 */
type Tiling = Tile[]

/**
 * Bestimmt alle irreduziblen Pflasterungen eines nx2-Rechtecks durch
 * Dominos und L-Trominos.
 *
 * *Irreduzibel* bedeutet hierbei, dass die Pflasterung keine horizontale
 * Trennlinie beinhaltet und mindestens einen Stein hat.
 *
 * Für n = 0 gibt es also keine.
 *
 * Für n = 1 gibt es genau eine irreduzible Pflasterung, bestehend aus
 * einem Domino:
 *
 * ```
 *   x
 *   x
 * ```
 *
 * Für n = 2 gibt es ebenfalls genau eine irreduzible Pflasterung,
 * bestehend aus zwei Dominos:
 *
 *
 * ```
 *   x x
 *   o o
 * ```
 *
 *
 * Für jedes n >= 3 gibt es zwei irreduzible Pflasterungen. Zum Beispiel n = 5:
 *
 * ```
 *   x x - - x
 *   x o o x x
 *
 *   x o o x x
 *   x x - - x
 * ```
 */
function get_irreducible_tilings(n: number): Tiling[] {
	if (!(Number.isInteger(n) && n >= 0)) {
		throw new Error("Parameter must be a positive integer")
	}

	if (n === 0) return []

	if (n === 1) {
		return [
			[
				[
					[0, 0],
					[1, 0],
				],
			],
		]
	}

	if (n === 2) {
		return [
			[
				[
					[0, 0],
					[0, 1],
				],
				[
					[1, 0],
					[1, 1],
				],
			],
		]
	}

	const tiling: Tiling = []

	tiling.push([
		[0, 0],
		[1, 0],
		[1, 1],
	])

	for (let i = 1; i <= n - 3; i++) {
		tiling.push([
			[1 - (i % 2), i],
			[1 - (i % 2), i + 1],
		])
	}

	tiling.push([
		[1 - (n % 2), n - 2],
		[1 - (n % 2), n - 1],
		[n % 2, n - 1],
	])

	return [tiling, get_flipped_tiling(tiling)]
}

/**
 * Spiegelt eine nx2-Pflasterung vertikal.
 */
function get_flipped_tiling(tiling: Tiling): Tiling {
	return tiling.map((tile) => tile.map(([y, x]) => [1 - y, x]))
}

/**
 * Verschiebt die Koordinaten einer nx2-Pflasterung horizontal.
 */
function shift_tiling(tiling: Tiling, dx: number): Tiling {
	return tiling.map((tile) => tile.map(([y, x]) => [y, x + dx]))
}

/**
 * Bestimmt alle Pflasterungen eines nx2-Rechtecks durch Dominos und L-Trominos.
 * Jede solche Pflasterung setzt sich eindeutig aus irreduziblen Pflasterungen zusammen.
 * Methode: bottom-up.
 */
function get_all_tilings(n: number): Tiling[] {
	// tilings[i] = Liste der Pflasterungen eines ix2-Rechtecks
	const tilings = Array.from({ length: n + 1 }, () => [] as Tiling[])
	tilings[0] = [[]]

	for (let i = 1; i <= n; i++) {
		// Berechne tilings[i] rekursiv.
		for (let k = 1; k <= i; k++) {
			for (const tail of get_irreducible_tilings(k)) {
				const shifted_tail = shift_tiling(tail, i - k)
				for (const head of tilings[i - k]) {
					tilings[i].push([...head, ...shifted_tail])
				}
			}
		}
	}

	return tilings[n]
}

/**
 * Druckt eine nx2-Pflasterung in die Konsole.
 */
function print_tiling(n: number, tiling: Tiling): void {
	const labels = ["+", "o", "-", "*", "=", "#", "."]

	const labeled_tiling = tiling.map((tile, index) => ({
		coords: tile,
		label: labels[index % labels.length],
	}))

	const get_tile = (y: number, x: number) =>
		labeled_tiling.find((tile) =>
			tile.coords.some((coord) => coord[0] === y && coord[1] === x),
		)

	for (const y of [0, 1]) {
		let line = ""
		for (let x = 0; x < n; x++) {
			const tile = get_tile(y, x)
			if (!tile) throw new Error(`No tile found at ${[y, x]}`)
			line += `${tile.label} `
		}
		console.info(line)
	}
}

/**
 * Druckt alle nx2-Pflasterungen in die Konsole.
 */
function print_all_tilings(n: number): void {
	const tilings = get_all_tilings(n)
	console.info(`Found ${tilings.length} tilings of length ${n}.\n`)
	for (const tiling of tilings) {
		print_tiling(n, tiling)
		console.info("")
	}
}

/* ------ TESTS ------ */

print_all_tilings(5)
