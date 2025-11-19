import { describe, it, expect } from "vitest"
import { get_normalized_latin_squares } from "./latin_squares"

describe("get_normalized_latin_squares", () => {
	it("works for n = 1", () => {
		const list = [...get_normalized_latin_squares(1)]
		expect(list.length).toBe(1)
		expect(list).toContainEqual([[0]])
	})

	it("works for n = 2", () => {
		const list = [...get_normalized_latin_squares(2)]
		expect(list.length).toBe(1)
		expect(list).toContainEqual([
			[0, 1],
			[1, 0],
		])
	})

	it("works for n = 3", () => {
		const list = [...get_normalized_latin_squares(3)]
		expect(list.length).toBe(1)
		expect(list).toContainEqual([
			[0, 1, 2],
			[1, 2, 0],
			[2, 0, 1],
		])
	})

	it("works for n = 4", () => {
		const list = [...get_normalized_latin_squares(4)]
		expect(list.length).toBe(4)
		expect(list).toContainEqual([
			[0, 1, 2, 3],
			[1, 3, 0, 2],
			[2, 0, 3, 1],
			[3, 2, 1, 0],
		])
	})

	it("works for n = 5", () => {
		const list = [...get_normalized_latin_squares(5)]
		expect(list.length).toBe(56)
		expect(list).toContainEqual([
			[0, 1, 2, 3, 4],
			[1, 4, 0, 2, 3],
			[2, 0, 3, 4, 1],
			[3, 2, 4, 1, 0],
			[4, 3, 1, 0, 2],
		])
	})
})
