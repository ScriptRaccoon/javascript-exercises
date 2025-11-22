import { get_edge, Graph, merge_vertices, number_vertices, remove_edge } from "./graph"
import { Polynomial, X } from "./polynomial"

/**
 * Computes the chromatic polynomial of a finite simple undirected graph
 * using a well-known recursive formula:
 * {@link https://en.wikipedia.org/wiki/Chromatic_polynomial}.
 */
export function get_chromatic_polynomial(g: Graph): Polynomial {
	const edge = get_edge(g)
	if (!edge) return X.power(number_vertices(g))
	const p = get_chromatic_polynomial(remove_edge(g, edge))
	const q = get_chromatic_polynomial(merge_vertices(g, ...edge))
	return p.sub(q)
}

/**
 * Computes the chromatic number of a finite simple undirected graph
 * using the chromatic polynomial.
 */
export function get_chromatic_number(g: Graph): number {
	const p = get_chromatic_polynomial(g)
	let k = 0
	while (p.evaluate(k) === 0) k++
	return k
}
