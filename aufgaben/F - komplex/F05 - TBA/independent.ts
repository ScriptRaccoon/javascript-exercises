/**
 * Type for a finite graph, which we assume to be undirected,
 * simple, and without loops. We also assume that the vertices
 * are the natural numbers 0,1,...,n-1 for some n >= 0.
 * g[k] is the list of neighbors of k, where k = 0,1,....,n-1.
 */
export type Graph = number[][]

/**
 * Computes a largest independent subset in a graph.
 */
export function get_largest_independent_subset(g: Graph) {
	const available = new Uint8Array(g.length).fill(1)
	return get_largest_independent_available_subset(g, available)
}

/**
 * Computes a largest independent subset in a graph,
 * where only certain elements are available anymore.
 * Uses a bottom-up version of the algorithm from `alg.md`.
 */
function get_largest_independent_available_subset(
	g: Graph,
	available: Uint8Array,
): number[] {
	if (available.every((val) => val === 0)) return []

	const deg0: number[] = []
	const deg1: number[] = []
	const deg3plus: number[] = []

	for (let x = 0; x < g.length; x++) {
		if (!available[x]) continue
		let deg = 0
		for (const n of g[x]) if (available[n]) deg++
		if (deg === 0) deg0.push(x)
		else if (deg === 1) deg1.push(x)
		else if (deg >= 3) deg3plus.push(x)
	}

	if (deg0.length > 0) {
		for (const x of deg0) available[x] = 0
		return deg0.concat(get_largest_independent_available_subset(g, available))
	}

	if (deg1.length > 0) {
		const x = deg1[0]
		available[x] = 0
		for (const n of g[x]) available[n] = 0
		return [x].concat(get_largest_independent_available_subset(g, available))
	}

	if (deg3plus.length > 0) {
		const x = deg3plus[0]

		// do not include x
		const available_copy = new Uint8Array(available)
		available_copy[x] = 0
		const set_1 = get_largest_independent_available_subset(g, available_copy)

		// include x
		available[x] = 0
		for (const n of g[x]) available[n] = 0
		const set_2 = [x].concat(get_largest_independent_available_subset(g, available))

		return set_1.length <= set_2.length ? set_2 : set_1
	}

	// all vertices have degree 2 -> graph is a sum of non-trivial cycles
	const cycles = find_connected_components(g, new Uint8Array(available))

	return cycles.flatMap((cycle) =>
		get_largest_independent_subset_in_cycle(cycle, available, g),
	)
}

/**
 * Computes the list of connected components of a graph,
 * where only certain elements are available to take anymore.
 */
function find_connected_components(g: Graph, available: Uint8Array): number[][] {
	const components: number[][] = []

	function get_component(x: number): number[] {
		const component: number[] = [x]
		const pending: number[] = [x]
		available[x] = 0

		for (const a of pending) {
			for (const b of g[a]) {
				if (available[b]) {
					component.push(b)
					pending.push(b)
					available[b] = 0
				}
			}
		}

		return component
	}

	for (let x = 0; x < g.length; x++) {
		if (available[x]) components.push(get_component(x))
	}

	return components
}

/**
 * Computes one the two largest independent subsets in
 * a non-trivial cycle subgraph, where only certain elements
 * are available anymore.
 */
function get_largest_independent_subset_in_cycle(
	vertices: number[],
	available: Uint8Array,
	g: Graph,
): number[] {
	const x = vertices[0]
	if (x === undefined) return []

	// Directed list of the vertices in the cycle.
	const array: number[] = [x]

	let prev = x
	let curr = g[x].find((n) => available[n])!

	while (curr != x) {
		array.push(curr)
		const [n1, n2] = g[curr].filter((n) => available[n])
		const next = n1 === prev ? n2 : n1
		prev = curr
		curr = next
	}

	const n = array.length

	// Take every second element
	return array.filter((_, i) => i % 2 === 0 && (i < n - 1 || n % 2 === 0))
}
