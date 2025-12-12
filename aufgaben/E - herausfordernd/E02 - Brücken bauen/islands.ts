import { get_dimensions, get_neighbors, has_water, idx, Profile } from "./profile"

export type Island = Set<number>

/**
 * Computes all "islands" (connected regions of 1s) of an altitude profile,
 * using BFS.
 */
export function get_islands(profile: Profile): Island[] {
	const [n, m] = get_dimensions(profile)
	const visited = new Set<number>()
	const islands: Island[] = []

	function add_island(y: number, x: number): void {
		if (has_water(profile, y, x)) return

		const start = idx(y, x, m)
		if (visited.has(start)) return

		const island = new Set<number>()
		const queue: [number, number][] = [[y, x]]

		visited.add(start)
		island.add(start)

		while (queue.length > 0) {
			const [v, u] = queue.shift()!

			for (const [p, q] of get_neighbors(v, u, n, m)) {
				if (has_water(profile, p, q)) continue
				const k = idx(p, q, m)
				if (visited.has(k)) continue
				visited.add(k)
				island.add(k)
				queue.push([p, q])
			}
		}

		islands.push(island)
	}

	for (let y = 0; y < n; y++) {
		for (let x = 0; x < m; x++) {
			add_island(y, x)
		}
	}

	return islands
}
