/**
 * Kodiert eine Koordinate als String.
 */
const key = ([x, y]) => `${x},${y}`

/**
 * Liste der vier Richtungen durch das Labyrinth.
 */
const directions = [
	[0, 1],
	[0, -1],
	[1, 0],
	[-1, 0],
]

/**
 * Findest den kürzesten Pfad zwischen zwei Punkten in einem Labyrinth,
 * kodiert durch eine 0,1-Matrix.
 */
function get_shortest_path(maze, start, end) {
	const [n, m] = [maze.length, maze[0]?.length || 0]
	if (n === 0 || m === 0) throw new Error("Größe muss positiv sein")

	const [a, b] = start
	const [u, v] = end

	if (maze[a][b] || maze[u][v]) return null

	const visited = new Set()
	const queue = [[a, b, [start]]]

	while (queue.length > 0) {
		const [x, y, path] = queue.shift()

		if (x === u && y === v) return path

		for (const [dx, dy] of directions) {
			const x_new = x + dx
			const y_new = y + dy
			const next_key = key([x_new, y_new])

			const in_bounds = x_new >= 0 && x_new < n && y_new >= 0 && y_new < m
			if (!in_bounds) continue
			if (maze[x_new][y_new]) continue
			if (visited.has(next_key)) continue

			visited.add(next_key)
			queue.push([x_new, y_new, [...path, [x_new, y_new]]])
		}
	}

	return null
}

/**
 * Druckt das Labyrinth und den kürzesten Pfad darin aus.
 */
function print_shortest_path(maze, start, end) {
	console.info("Labyrinth:\n")
	for (const row of maze) {
		console.info(row.join(" "))
	}

	const path = get_shortest_path(maze, start, end)
	if (!path) {
		console.warn("\nKein Pfad gefunden")
		return
	}

	console.info(JSON.stringify(path))

	console.info("\nKürzester Pfad:\n")

	const solved_maze = maze.map((row, i) =>
		row.map((_, j) =>
			maze[i][j]
				? "1"
				: path.some((coord) => coord[0] === i && coord[1] === j)
					? "*"
					: "0",
		),
	)

	for (const row of solved_maze) {
		console.info(row.join(" "))
	}
}

/* ------ TESTS ------ */

const sample_maze = [
	[0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
	[0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
	[1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0],
	[0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
	[0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0],
	[0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
	[0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1],
	[0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
	[0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0],
	[0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0],
	[0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
]

print_shortest_path(sample_maze, [0, 0], [11, 11])
