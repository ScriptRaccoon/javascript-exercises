/*
In this approach, a *bitmask* is a natural number whose binary representation
uses the i-th bit to indicate whether a certain condition holds at index i:
the bit is 1 if the condition is true, and 0 otherwise.

For domino tilings with m fixed rows, we build the tiling column by column.
At each column, and for each row index 0 <= i < m, a horizontal domino either
overlaps the current column or it does not. We represent this state using a
bitmask of length m.

Example:

 _____
|_____|
|  |
|__|__ 
|_____|
|_____|
|  |
|__|

In this fragment of a tiling with m = 7, column 0 has no overlapping
horizontal dominoes, giving the bitmask [0000000] = 0.

At column 1, rows 0, 3, and 4 are overlapped, giving the bitmask [0011001] = 25.

Working with bitmasks is significantly more efficient than using boolean
arrays or explicit subsets of indices.
*/

/**
 * Adds a bit at position i to the bitmask and returns the result.
 * Uses bitwise OR (`|`) and bitwise left shift (`<<`).
 */
function add_bit(bitmask: number, i: number): number {
	return bitmask | (1 << i)
}

/**
 * Returns the bit at position i in the bitmask.
 * Uses the bitwise AND (`&`) and the bitwise right shift.
 */
function get_bit(bitmask: number, i: number): number {
	return (bitmask >> i) & 1
}

/**
 * Type for a directed graph whose vertices are numbers.
 * Loops and multiple edges between vertices are allowed.
 */
type NumberMapGraph = Map<number, number[]>

/**
 * Creates a directed graph G_m such that walks 0 -> 0 of length n in G_m
 * correspond to domino tilings of an mxn-grid.
 * Vertices are bitmasks of length m, representing configurations of overlapping dominoes
 * as explained. An edge fills a column with dominoes, placed horizontally or vertically.
 *
 * We only construct a connected component here (those vertices reachable from a given
 * vertex), since this is sufficient and faster as well.
 */
function create_domino_tiling_graph(m: number, connected_to: number): NumberMapGraph {
	const g: NumberMapGraph = new Map()

	const stack: number[] = [connected_to]

	while (stack.length > 0) {
		const bitmask = stack.pop()!
		if (g.has(bitmask)) continue
		const neighbors = get_neighbors(bitmask, m)
		g.set(bitmask, neighbors)
		stack.push(...neighbors)
	}

	return g
}

/**
 * Computes the list of neighbors of a vertex in the graph G_m of domino tilings
 * with m rows. Given a vertex, i.e. a bitmask of length m,
 * (1) we flip each 1 to 0 (the dominoes at these rows already cover the column),
 * (2) each 0 is either flipped to 1 (placing a horizontal domino), or
 * (2') we combine two consecutive 0 and keep them (placing a vertical domino).
 *
 * For example: for m = 8 and the bitmask 00001001, we may place horizontal
 * dominoes at rows 1,2,4,7 and a vertical domino at rows 5,6, giving 10010110.
 *  _____           _____
 * |_____|         |_____|__
 * |  |            |  |_____|
 * |__|__          |__|_____|
 * |_____|         |_____|__
 * |  |            |  |_____|
 * |__|            |__|  |
 * |  |            |  |__|__
 * |__|            |__|_____|
 */
function get_neighbors(bitmask: number, m: number): number[] {
	const neighbors: number[] = []

	/**
	 * Recursively computes the neighbors where the bits in positions < `pos`
	 * have already been processed, and `current` is the neighbor under construction.
	 */
	function recurse(pos: number, current: number) {
		if (pos === m) {
			neighbors.push(current)
			return
		}

		if (get_bit(bitmask, pos) === 1) {
			// flip bit 1 -> 0
			recurse(pos + 1, current)
		} else {
			// flip bit 0 -> 1
			recurse(pos + 1, add_bit(current, pos))
			// keep both 0-bits
			if (pos + 1 < m && get_bit(bitmask, pos + 1) === 0) {
				recurse(pos + 2, current)
			}
		}
	}

	recurse(0, 0)
	return neighbors
}

/**
 * Computes the number of walks between two nodes of a directed graph.
 * Uses dynamic programming instead of recursion for performance reasons.
 */
function number_walks(
	g: NumberMapGraph,
	start: number,
	end: number,
	length: number,
): bigint {
	/**
	 * dp[v][k] = number of walks v ---> end of length k.
	 */
	const dp: bigint[][] = []

	for (const v of g.keys()) {
		dp[v] = []
		dp[v][0] = v === end ? 1n : 0n
	}

	for (let k = 1; k <= length; k++) {
		for (const v of g.keys()) {
			let sum = 0n
			// Walks v ---> end decompose as v ---> u ---> end.
			for (const u of g.get(v) ?? []) sum += dp[u][k - 1]
			dp[v][k] = sum
		}
	}

	return dp[start][length]
}

/**
 * Returns the number of domino tilings of an mxn-grid.
 * They are represented as walks of lengths n from 0 to 0 in
 * the graph G_m of length n constructed above.
 * Remark: The construction of G_m takes the longest time.
 */
export function count_domino_tilings(m: number, n: number): bigint {
	if (n % 2 === 1 && m % 2 === 1) return 0n
	if (m > n) return count_domino_tilings(n, m)
	const g = create_domino_tiling_graph(m, 0)
	return number_walks(g, 0, 0, n)
}

/**
 * Returns the numbers of domino tilings of an mxn-grid for n = 0,1,...,N.
 * This reuses the auxiliary graph that only depends on m.
 */
export function count_domino_tilings_up_to(m: number, N: number): bigint[] {
	const counts: bigint[] = []
	const g = create_domino_tiling_graph(m, 0)
	for (let n = 0; n <= N; n++) {
		if (n % 2 === 1 && m % 2 === 1) counts.push(0n)
		else counts.push(number_walks(g, 0, 0, n))
	}
	return counts
}
