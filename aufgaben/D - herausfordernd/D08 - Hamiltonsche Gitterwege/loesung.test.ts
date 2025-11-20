import { describe, it, expect } from "vitest"
import { get_curly_grid_paths } from "./loesung"

describe("get_curly_grid_paths", () => {
	it("returns exactly one path for n = 4", () => {
		const paths = get_curly_grid_paths(4)
		expect(paths.length).toBe(1)
		expect(paths[0].length).toBe(4 * 4)
		expect(paths[0]).toEqual([
			[0, 0],
			[1, 0],
			[1, 1],
			[0, 1],
			[0, 2],
			[0, 3],
			[1, 3],
			[1, 2],
			[2, 2],
			[2, 3],
			[3, 3],
			[3, 2],
			[3, 1],
			[2, 1],
			[2, 0],
			[3, 0],
		])
	})

	it("returns exactly 8 paths for n = 5", () => {
		const paths = get_curly_grid_paths(5)
		expect(paths.length).toBe(8)
		expect(paths).toContainEqual([
			[0, 0],
			[1, 0],
			[1, 1],
			[0, 1],
			[0, 2],
			[1, 2],
			[1, 3],
			[0, 3],
			[0, 4],
			[1, 4],
			[2, 4],
			[2, 3],
			[3, 3],
			[3, 4],
			[4, 4],
			[4, 3],
			[4, 2],
			[3, 2],
			[2, 2],
			[2, 1],
			[2, 0],
			[3, 0],
			[3, 1],
			[4, 1],
			[4, 0],
		])
	})

	it("returns exactly 39 paths for n = 6", () => {
		const paths = get_curly_grid_paths(6)
		expect(paths.length).toBe(39)
		expect(paths).toContainEqual([
			[0, 0],
			[1, 0],
			[2, 0],
			[2, 1],
			[3, 1],
			[3, 0],
			[4, 0],
			[5, 0],
			[5, 1],
			[4, 1],
			[4, 2],
			[5, 2],
			[5, 3],
			[4, 3],
			[4, 4],
			[5, 4],
			[5, 5],
			[4, 5],
			[3, 5],
			[3, 4],
			[3, 3],
			[2, 3],
			[2, 4],
			[2, 5],
			[1, 5],
			[0, 5],
			[0, 4],
			[1, 4],
			[1, 3],
			[0, 3],
			[0, 2],
			[0, 1],
			[1, 1],
			[1, 2],
			[2, 2],
			[3, 2],
		])
	})
})
