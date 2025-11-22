/**
 * Type for a finite graph. Here we implicitly assume that it is
 * simple and undirected. Loops are possible.
 */
export type Graph = Record<string, string[]>

/**
 * Creates a copy of the graph.
 */
function get_copy(g: Graph): Graph {
	const h: Graph = {}
	for (const vertex in g) {
		h[vertex] = [...g[vertex]]
	}
	return h
}

/**
 * Returns the number of vertices of the graph.
 */
export function number_vertices(g: Graph): number {
	return Object.keys(g).length
}

/**
 * Returns a random edge of the graph, if any exists.
 */
export function get_edge(g: Graph): [string, string] | null {
	for (const vertex in g) {
		for (const neighbor of g[vertex]) {
			return [vertex, neighbor]
		}
	}
	return null
}

/**
 * Returns a new graph where an edge has been deleted.
 */
export function remove_edge(g: Graph, e: [string, string]): Graph {
	const [v, w] = e
	if (!g[v].includes(w) || !g[w].includes(v)) throw new Error("Edge does not exist")

	const h = get_copy(g)

	h[v] = h[v].filter((u) => u != w)
	h[w] = h[w].filter((u) => u != v)

	return h
}

/**
 * Returns a new graph where two vertices have been merged and all
 * edges between these have been removed.
 */
export function merge_vertices(g: Graph, v: string, w: string): Graph {
	const h: Graph = {}

	for (const vertex in g) {
		if (vertex === w || vertex === v) continue
		h[vertex] = [...new Set(g[vertex].map((u) => (u === w ? v : u)))]
	}

	h[v] = g[v].filter((u) => u != w).concat(g[w].filter((u) => u != v))
	h[v] = [...new Set(h[v])]

	return h
}
