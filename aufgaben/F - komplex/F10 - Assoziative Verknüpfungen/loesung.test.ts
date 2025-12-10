import { describe, it, expect } from "vitest"
import { count_associative_operations } from "./loesung"

describe("count_associative_operations", () => {
	// https://oeis.org/A023814
	const cases: [number, number][] = [
		[0, 1],
		[1, 1],
		[2, 8],
		[3, 113],
		[4, 3492],
		[5, 183732],
	]

	it.each(cases)("for n = %d returns %d", (n, expected) => {
		const actual = count_associative_operations(n)
		expect(actual).toBe(expected)
	})
})
