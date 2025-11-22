export type Graph = Record<string, string[]>
export type Coloring<Color> = Record<string, Color>

/**
 * Checks if a color assignment to a vertex is allowed, i.e.,
 * different from the colors of all neighbors.
 */
function is_legal_color<Color>(
	vertex: string,
	color: Color,
	graph: Graph,
	coloring: Coloring<Color>,
) {
	return graph[vertex].every((neighbor) => coloring[neighbor] !== color)
}

/**
 * Returns the uncolored vertex with fewest legal color options.
 */
function select_next_vertex<Color>(
	vertices: string[],
	coloring: Coloring<Color>,
	graph: Graph,
	colors: Color[],
): string | undefined {
	let min_vertex: string | undefined = undefined
	let min_count = Infinity

	for (const v of vertices) {
		if (v in coloring) continue
		const legal_colors = colors.filter((color) =>
			is_legal_color(v, color, graph, coloring),
		)

		if (legal_colors.length < min_count) {
			min_count = legal_colors.length
			min_vertex = v
		}
	}

	return min_vertex
}

/**
 * Iteratively generates all valid vertex colorings of a graph so that
 * adjacent vertices have different colors.
 */
export function* get_colorings<Color>(
	graph: Graph,
	colors: Color[],
	initial_coloring: Coloring<Color> = {},
): IterableIterator<Coloring<Color>> {
	const vertices = Object.keys(graph)
	const coloring: Coloring<Color> = Object.assign({}, initial_coloring)

	const stack: { vertex: string; next_color_index: number }[] = []

	const first_vertex = select_next_vertex(vertices, coloring, graph, colors)
	if (!first_vertex) {
		yield {}
		return
	}

	stack.push({ vertex: first_vertex, next_color_index: 0 })

	while (stack.length > 0) {
		const top = stack[stack.length - 1]
		const vertex = top.vertex

		if (top.next_color_index >= colors.length) {
			stack.pop()
			delete coloring[vertex]
			continue
		}

		const color = colors[top.next_color_index]
		top.next_color_index++

		if (!is_legal_color(vertex, color, graph, coloring)) continue

		coloring[vertex] = color

		if (Object.keys(coloring).length === vertices.length) {
			yield { ...coloring }
			delete coloring[vertex]
			continue
		}

		const next_vertex = select_next_vertex(vertices, coloring, graph, colors)
		if (next_vertex) {
			stack.push({ vertex: next_vertex, next_color_index: 0 })
		}
	}
}
