/**
 * Typ für eine Koordinate.
 */
type Coord = [number, number]

/**
 * Kodiert eine Koordinate als String.
 */
const key = ([x, y]: Coord) => `${x},${y}`

/**
 * Liste der vier Richtungen durch das Labyrinth.
 */
const directions: [number, number][] = [
	[0, 1],
	[0, -1],
	[1, 0],
	[-1, 0],
]

/**
 * Findet einen kürzesten Pfad zwischen zwei Punkten in einem Labyrinth,
 * kodiert durch eine 0,1-Matrix, mittels einer Breitensuche.
 */
function get_shortest_path(maze: number[][], start: Coord, end: Coord): null | Coord[] {
	const n = maze.length
	if (n === 0) throw new Error("Größe muss positiv sein")

	const m = maze[0].length
	if (m === 0) throw new Error("Größe muss positiv sein")

	const has_wall = ([x, y]: Coord) => maze[x][y] > 0
	const is_valid = ([x, y]: Coord) => x >= 0 && x < n && y >= 0 && y < m

	if (has_wall(start) || has_wall(end)) return null

	const visited = new Set<string>()

	const queue: [Coord, Coord[]][] = [[start, [start]]]

	while (queue.length > 0) {
		const [coord, path] = queue.shift()!

		if (key(coord) === key(end)) return path

		for (const [dx, dy] of directions) {
			const next_coord: Coord = [coord[0] + dx, coord[1] + dy]

			if (!is_valid(next_coord)) continue
			if (has_wall(next_coord)) continue
			if (visited.has(key(next_coord))) continue

			visited.add(key(next_coord))
			queue.push([next_coord, [...path, next_coord]])
		}
	}

	return null
}

/**
 * Druckt das Labyrinth und den kürzesten Pfad darin in diese Konsole.
 */
function print_shortest_path(maze: number[][], start: Coord, end: Coord) {
	console.info("Labyrinth:\n")
	for (const row of maze) {
		console.info(row.join(" "))
	}

	const path = get_shortest_path(maze, start, end)
	if (!path) {
		console.warn("\nKein Pfad gefunden")
		return
	}

	console.info("\nKürzester Pfad:\n")

	const solved_maze: string[][] = maze.map((row, i) =>
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

/*
[
  [ 0, 0 ],   [ 1, 0 ],   [ 1, 1 ],
  [ 1, 2 ],   [ 0, 2 ],   [ 0, 3 ],
  [ 0, 4 ],   [ 1, 4 ],   [ 2, 4 ],
  [ 3, 4 ],   [ 4, 4 ],   [ 5, 4 ],
  [ 6, 4 ],   [ 6, 5 ],   [ 7, 5 ],
  [ 8, 5 ],   [ 8, 6 ],   [ 8, 7 ],
  [ 9, 7 ],   [ 10, 7 ],  [ 11, 7 ],
  [ 11, 8 ],  [ 11, 9 ],  [ 10, 9 ],
  [ 9, 9 ],   [ 9, 10 ],  [ 9, 11 ],
  [ 10, 11 ], [ 11, 11 ]
]
*/
console.info(get_shortest_path(sample_maze, [0, 0], [11, 11]))

// * 1 * * * 0 0 0 0 1 0 1
// * * * 1 * 1 0 1 0 1 0 0
// 1 1 1 1 * 1 1 1 0 1 1 0
// 0 1 0 1 * 1 0 0 0 0 0 0
// 0 1 0 1 * 1 0 1 1 1 1 0
// 0 1 0 0 * 1 0 1 0 0 0 0
// 0 1 1 1 * * 0 1 0 1 1 1
// 0 1 0 1 1 * 1 1 0 0 0 0
// 0 0 0 0 0 * * * 1 1 1 0
// 0 1 1 1 1 1 1 * 1 * * *
// 0 1 0 0 0 0 1 * 1 * 1 *
// 0 1 1 0 1 0 0 * * * 1 *
print_shortest_path(sample_maze, [0, 0], [11, 11])
