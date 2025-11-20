import { appendFileSync, writeFileSync } from "fs"

/**
 * Encodes a coordinate as a string.
 */
function key(y: number, x: number) {
	return `${x}.${y}`
}

/**
 * Decodes a coordinate as a string.
 */
function unkey(str: string): [number, number] {
	const [a, b] = str.split(".")
	return [Number(a), Number(b)]
}

/**
 * Type for a graphs with two types of edges (0 and 1).
 * graph[v] = [[a1,a2,...],[b1,b2,...]] means that there are edges
 * v -> a1, ... of type 0 and edges v -> b1, ... of type 1.
 */
type GraphWithTwoEdgeTypes = Record<string, [string[], string[]]>

/**
 * Creates the undirected grid graph of size nxn with two types of edges:
 * 0 = horizontal, 1 = vertical.
 */
function get_grid_graph(n: number): GraphWithTwoEdgeTypes {
	const graph: GraphWithTwoEdgeTypes = {}

	const is_valid = (y: number, x: number) => y >= 0 && y < n && x >= 0 && x < n

	for (let y = 0; y < n; y++) {
		for (let x = 0; x < n; x++) {
			graph[key(y, x)] = [[], []]
			for (const delta of [+1, -1]) {
				if (is_valid(y, x + delta)) {
					graph[key(y, x)][0].push(key(y, x + delta))
				}
				if (is_valid(y + delta, x)) {
					graph[key(y, x)][1].push(key(y + delta, x))
				}
			}
		}
	}

	return graph
}

/**
 * Iterator for Hamiltonian paths in a graph with two types of edges
 * that start at a given vertex with an edge of type 0 and have the
 * property that at most k edges of the same type are in a row.
 */
function* curly_hamiltonian_path_iterator(
	graph: GraphWithTwoEdgeTypes,
	start: string,
	k: number,
): IterableIterator<string[]> {
	const vertex_count = Object.keys(graph).length

	function* backtrack(
		path: string[],
		current: string,
		visited: Set<string>,
		last_edge_types: number[],
	): IterableIterator<string[]> {
		if (path.length === vertex_count) {
			yield [...path]
			return
		}

		for (const edge_type of [0, 1]) {
			for (const neighbor of graph[current][edge_type]) {
				if (visited.has(neighbor)) continue

				const too_many_edges =
					last_edge_types.length === k &&
					new Set([...last_edge_types, edge_type]).size === 1
				if (too_many_edges) {
					continue
				}

				path.push(neighbor)
				visited.add(neighbor)

				const updated_edge_types =
					last_edge_types.length < k
						? last_edge_types.concat([edge_type])
						: last_edge_types.slice(1).concat([edge_type])

				yield* backtrack(path, neighbor, visited, updated_edge_types)

				path.pop()
				visited.delete(neighbor)
			}
		}
	}

	yield* backtrack([start], start, new Set<string>([start]), Array(k).fill(1))
}

/**
 * Returns the list of all Hamiltonian nxn grid paths that start in the top
 * left with a horizontal edge and such that at most two horizontal (or vertical)
 * edges are in a row.
 */
export function get_curly_grid_paths(n: number): [number, number][][] {
	const graph = get_grid_graph(n)
	const paths_keyed = [...curly_hamiltonian_path_iterator(graph, key(0, 0), 2)]
	return paths_keyed.map((path) => path.map(unkey))
}

/**
 * Writes the path data to a JSON file.
 * The data is used in the visualization subfolder.
 */
// @ts-expect-error This function is only used when needed.
function output_path_data(n: number) {
	const graph = get_grid_graph(n)
	const paths = curly_hamiltonian_path_iterator(graph, key(0, 0), 2)

	writeFileSync("output.json", "[")

	for (const path of paths) {
		const path_str = path.join(";")
		appendFileSync("output.json", `"${path_str}",`, "utf8")
		appendFileSync("output.json", "\n", "utf8")
	}

	appendFileSync("output.json", "]")
}
