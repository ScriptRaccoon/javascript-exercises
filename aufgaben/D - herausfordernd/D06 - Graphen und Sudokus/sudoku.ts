import { Coloring, get_colorings, Graph } from "./colorings"

const get_square = (i: number, j: number) => `${i},${j}`

/**
 * Creates the Sudoku graph whose vertices are the 81 squares of a Sudoku
 * such that the neighbors of a square are the squares in the same column,
 * row, or 3x3 block.
 */
function create_sudoku_graph() {
	const graph: Graph = {}

	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			const square = get_square(i, j)

			const row_squares = []
			const col_squares = []

			for (let k = 0; k < 9; k++) {
				if (k != j) row_squares.push(get_square(i, k))
				if (k != i) col_squares.push(get_square(k, j))
			}

			const block_y = 3 * Math.floor(i / 3)
			const block_x = 3 * Math.floor(j / 3)

			const block_squares = []

			for (let p = block_y; p < block_y + 3; p++) {
				for (let q = block_x; q < block_x + 3; q++) {
					if (p !== i || q !== j) block_squares.push(get_square(p, q))
				}
			}

			graph[square] = [
				...new Set([...row_squares, ...col_squares, ...block_squares]),
			]
		}
	}

	return graph
}

/**
 * Converts a (partial) Sudoku matrix to a (partial) coloring of the Sudoku graph.
 */
function convert_sudoku_to_coloring(matrix: number[][]) {
	const coloring: Coloring<number> = {}
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			if (matrix[i][j] > 0) coloring[get_square(i, j)] = matrix[i][j]
		}
	}
	return coloring
}

/**
 * Converts a (partial) coloring of the Sudoku graph to a (partial) Sudoku matrix.
 */
function convert_coloring_to_sudoku(coloring: Coloring<number>) {
	const matrix: number[][] = Array.from({ length: 9 }, (_) => new Array(9).fill(0))
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			const square = get_square(i, j)
			if (square in coloring) {
				matrix[i][j] = coloring[square]
			}
		}
	}
	return matrix
}

/**
 * Generates iteratively all solutions of a Sudoku,
 * which is given by a integer 9x9 matrix with 0 = open.
 */
export function* get_sudoku_solutions(matrix: number[][]) {
	const graph = create_sudoku_graph()
	const colors = [1, 2, 3, 4, 5, 6, 7, 8, 9]
	const coloring = convert_sudoku_to_coloring(matrix)
	const colorings = get_colorings(graph, colors, coloring)
	for (const coloring of colorings) {
		yield convert_coloring_to_sudoku(coloring)
	}
}
