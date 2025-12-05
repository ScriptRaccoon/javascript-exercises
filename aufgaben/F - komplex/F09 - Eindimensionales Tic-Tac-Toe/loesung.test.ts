import { describe, it, expect } from "vitest"
import { get_losing_sizes } from "./loesung"

describe("get_losing_sizes", () => {
	it("finds the correct sizes <= 20000", () => {
		const actual = get_losing_sizes(20000, false)
		const expected = [
			0, 2, 6, 12, 22, 30, 32, 44, 54, 64, 76, 86, 98, 110, 118, 130, 132, 162, 170,
			184, 194, 202, 282, 290, 302, 356, 1046, 2502, 2752, 2912, 3052, 3076, 7250,
			7356, 7866, 16168,
		]
		expect(actual).toEqual(expected)
	}, 15_000)
})
