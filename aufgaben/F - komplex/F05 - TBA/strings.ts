import { get_largest_independent_subset, Graph } from "./independent"

/**
 * Given an array of strings, construct the graph where two strings are
 * adjacent when one is a substring of the other.
 */
function generate_substring_graph(arr: string[]): Graph {
	const g: Graph = Array.from({ length: arr.length }, () => [])
	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr.length; j++) {
			if (i !== j && (arr[i].includes(arr[j]) || arr[j].includes(arr[i]))) {
				g[i].push(j)
			}
		}
	}
	return g
}

/**
 * Computes the largest independent subset of a list of strings,
 * meaning that no two are substrings of another.
 */
export function get_independent_strings(arr: string[]): string[] {
	const g = generate_substring_graph(arr)
	return get_largest_independent_subset(g).map((i) => arr[i])
}

/**
 * Checks if a set of strings is independent.
 * This is used only for testing purposes.
 */
export function check_independence(set: string[]): boolean {
	for (let i = 0; i < set.length; i++) {
		for (let j = i + 1; j < set.length; j++) {
			if (set[i].includes(set[j]) || set[j].includes(set[i])) return false
		}
	}
	return true
}
