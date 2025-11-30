import { describe, it, expect } from "vitest"
import { dedekind_number } from "./loesung"

describe("dedekind_number", () => {
	const cases = [
		[2, 0],
		[3, 1],
		[6, 2],
		[20, 3],
		[168, 4],
		[7581, 5],
		[7828354, 6],
	]

	it.each(cases)("returns %d for n = %d", (expected, n) => {
		const actual = dedekind_number(n)
		expect(actual).toBe(expected)
	})
})
