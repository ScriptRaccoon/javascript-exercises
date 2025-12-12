import { get_islands, Island } from "./islands"
import { compute_mst, WeightedGraph } from "./mst"
import { get_dimensions, get_neighbors, has_water, idx, Profile, unidx } from "./profile"

/**
 * Bridge encoded as an array of coordinate indices.
 */
type Bridge = number[]

/**
 * Constructs the shortest bridge between two islands in an altitude profile,
 * using BFS.
 */
export function construct_shortest_bridge(
	A: Island,
	B: Island,
	profile: Profile,
): Bridge | null {
	if (A === B) return null

	const [n, m] = get_dimensions(profile)

	/**
	 * Returns the "ports", the water neighbors of A.
	 */
	function get_ports(): [number, number][] {
		const seen = new Set<number>()
		const ports: [number, number][] = []
		for (const a of A) {
			const [y, x] = unidx(a, m)
			for (const [v, u] of get_neighbors(y, x, n, m)) {
				if (!has_water(profile, v, u)) continue
				const i = idx(v, u, m)
				if (seen.has(i)) continue
				seen.add(i)
				ports.push([v, u])
			}
		}

		return ports
	}

	const ports = get_ports()

	let shortest_bridge: Bridge | null = null
	let shortest_bridge_length = Infinity

	function get_best_bridge(start: [number, number], max_len: number): Bridge | null {
		const [y0, x0] = start
		if (!has_water(profile, y0, x0)) return null
		const start_idx = idx(y0, x0, m)
		const visited = new Set<number>([start_idx])

		const queue: [number[], number, number][] = [[[start_idx], y0, x0]]

		while (queue.length > 0) {
			const [bridge, y, x] = queue.shift()!

			for (const [v, u] of get_neighbors(y, x, n, m)) {
				const i = idx(v, u, m)

				if (!has_water(profile, v, u)) {
					if (B.has(i)) return bridge
					continue
				}

				if (visited.has(i)) continue
				visited.add(i)

				if (bridge.length < max_len) {
					queue.push([[...bridge, i], v, u])
				}
			}
		}

		return null
	}

	for (const port of ports) {
		const bridge = get_best_bridge(port, shortest_bridge_length - 1)
		if (bridge !== null && bridge.length < shortest_bridge_length) {
			shortest_bridge_length = bridge.length
			shortest_bridge = bridge
			if (shortest_bridge_length === 1) break
		}
	}

	return shortest_bridge
}

/**
 * Constructs a matrix for looking up the shortest bridges between all islands.
 */
export function construct_shortest_bridges(islands: Island[], profile: Profile) {
	const shortest_bridges: (Bridge | null)[][] = Array.from(
		{ length: islands.length },
		() => [],
	)

	for (let i = 0; i < islands.length; i++) {
		shortest_bridges[i][i] = null

		for (let j = i + 1; j < islands.length; j++) {
			const bridge = construct_shortest_bridge(islands[i], islands[j], profile)
			shortest_bridges[i][j] = bridge
			shortest_bridges[j][i] = bridge ? bridge.toReversed() : null
		}
	}

	return shortest_bridges
}

/**
 * Constructs a weighted graph whose nodes are the islands of the profile and whose
 * edges are the shortest bridges between these, weighted by their length.
 */
export function construct_island_graph(
	islands: Island[],
	bridges: (Bridge | null)[][],
): WeightedGraph {
	const g: WeightedGraph = Array.from({ length: islands.length }, () =>
		Array(islands.length).fill(Infinity),
	)

	for (let i = 0; i < islands.length; i++) {
		for (let j = i + 1; j < islands.length; j++) {
			const bridge = bridges[i][j]
			g[i][j] = bridge === null ? Infinity : bridge.length
			g[j][i] = g[i][j]
		}
	}

	return g
}

/**
 * Computes a selection of bridges that connects all islands and has minimal
 * total bridge length.
 */
function compute_best_bridge_selection(profile: Profile): Bridge[] {
	const no_islands = profile.every((row) => row.every((val) => val === 0))
	if (no_islands) return []

	const islands = get_islands(profile)
	const bridges = construct_shortest_bridges(islands, profile)
	const g = construct_island_graph(islands, bridges)

	const edges = compute_mst(g)
	if (edges === null) {
		throw new Error("No bridge plan found.")
	}

	return edges.map(([i, j]) => bridges[i][j]).filter((b) => b !== null)
}

/**
 * Altitude profile encoded as a 0,1,2-matrix.
 * 0 = water, 1 = land, 2 = bridge.
 */
type BridgeProfile = (0 | 1 | 2)[][]

/**
 * Computes a selection of bridges that connects all islands and has minimal
 * total bridge length, and adds the selected bridges to the profile.
 */
export function get_best_bridge_plan(profile: Profile): BridgeProfile {
	const [, m] = get_dimensions(profile)
	const bridges = compute_best_bridge_selection(profile)
	const plan: BridgeProfile = profile.map((row) => [...row])
	for (const bridge of bridges) {
		for (const i of bridge) {
			const [y, x] = unidx(i, m)
			plan[y][x] = 2
		}
	}
	return plan
}
