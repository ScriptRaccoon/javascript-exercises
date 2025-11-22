import { Coloring, get_colorings, Graph } from "./colorings"

const get_square = (i: number, j: number) => `${i},${j}`

/**
 * Creates the graph for a Latin square of size n.
 * Squares in the same row or column are adjacent.
 */
function create_latin_square_grid(n: number): Graph {
	const graph: Graph = {}

	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			const square = get_square(i, j)
			graph[square] = []
			for (let k = 0; k < n; k++) {
				if (k != i) graph[square].push(get_square(k, j))
				if (k != j) graph[square].push(get_square(i, k))
			}
		}
	}

	return graph
}

/**
 * Assigns to the squares (i,0) and (0,i) the color i,
 * so that the Latin square becomes normalized / reduced.
 */
function create_normalization_coloring(n: number) {
	const coloring: Coloring<number> = {}
	for (let i = 0; i < n; i++) {
		coloring[get_square(i, 0)] = i
		coloring[get_square(0, i)] = i
	}
	return coloring
}

/**
 * Converts a coloring of the Latin square graph to a matrix.
 */
function convert_coloring_to_matrix(n: number, coloring: Coloring<number>) {
	const matrix: number[][] = Array.from({ length: n }, (_) => new Array(n).fill(0))
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			const square = get_square(i, j)
			if (square in coloring) {
				matrix[i][j] = coloring[square]
			}
		}
	}
	return matrix
}

/**
 * Generates iteratively all normalized Latin squares of size n.
 * cf. {@link https://en.wikipedia.org/wiki/Latin_square}
 */
export function* get_normalized_latin_squares(n: number) {
	if (!(Number.isInteger(n) && n >= 1)) throw new Error(`Illegal number: ${n}`)

	const graph = create_latin_square_grid(n)
	const colors = Array.from({ length: n }, (_, i) => i)

	const initial_coloring = create_normalization_coloring(n)

	const colorings = get_colorings(graph, colors, initial_coloring)

	for (const coloring of colorings) {
		yield convert_coloring_to_matrix(n, coloring)
	}
}
