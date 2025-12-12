/**
 * Altitude profile encoded as a 0,1-matrix.
 * 0 = water, 1 = land.
 */
export type Profile = (0 | 1)[][]

/**
 * Checks if a coordinate in a profile has water.
 */
export function has_water(profile: Profile, y: number, x: number) {
	return profile[y][x] === 0
}

/**
 * Returns the sizes (n,m) in y- and x-direction of a profile.
 */
export function get_dimensions(profile: Profile): [number, number] {
	if (profile.length === 0) throw new Error("Profile cannot be empty")
	return [profile.length, profile[0].length]
}

/**
 * Encodes a coordinate in the profile as a number.
 */
export function idx(y: number, x: number, m: number) {
	return y * m + x
}

/**
 * Decodes a number into a coordinate.
 */
export function unidx(i: number, m: number): [number, number] {
	return [(i / m) | 0, i % m]
}

/**
 * Returns the list of neighbors of a given coordinate.
 */
export function get_neighbors(
	y: number,
	x: number,
	n: number,
	m: number,
): [number, number][] {
	const neighbors: [number, number][] = []

	if (y > 0) neighbors.push([y - 1, x])
	if (y < n - 1) neighbors.push([y + 1, x])
	if (x > 0) neighbors.push([y, x - 1])
	if (x < m - 1) neighbors.push([y, x + 1])

	return neighbors
}
