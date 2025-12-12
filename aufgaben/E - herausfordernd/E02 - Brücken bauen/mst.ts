/**
 * Type for an undirected weighted graph whose nodes are numbers.
 * When there is an edge i ---> j of weight w, we let g[i][j] = w.
 * We then also expect that g[j][i] = w.
 * When there is no edge, we let g[i][j] = Infinity.
 */
export type WeightedGraph = number[][]

/**
 * Computes a minimum spanning tree (mst) of an undirected weighted graph,
 * i.e. a tree that includes all nodes of the graph that minimizes
 * the sum of the weights of the included edges. This function uses
 * Prim's algorithm, simplified (without a priority queue).
 */
export function compute_mst(g: WeightedGraph): [number, number][] | null {
	const n = g.length

	if (n === 0) return null

	const weighted_edges: [number, number, number][] = []

	for (let i = 0; i < n; i++) {
		for (let j = i + 1; j < n; j++) {
			const w = g[i][j]
			if (w < Infinity) {
				weighted_edges.push([i, j, w])
			}
		}
	}

	weighted_edges.sort((a, b) => a[2] - b[2])

	const visited = new Set<number>()
	const mst: [number, number][] = []

	visited.add(0)

	function get_next_edge_index() {
		return weighted_edges.findIndex(
			([u, v]) =>
				(visited.has(u) && !visited.has(v)) ||
				(visited.has(v) && !visited.has(u)),
		)
	}

	while (visited.size < n) {
		const i = get_next_edge_index()
		if (i < 0) return null
		const [u, v] = weighted_edges[i]
		visited.add(u)
		visited.add(v)
		mst.push([u, v])
		weighted_edges.splice(i, 1)
	}

	return mst
}
