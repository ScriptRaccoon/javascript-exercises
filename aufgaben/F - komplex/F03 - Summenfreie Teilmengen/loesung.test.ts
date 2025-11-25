import { describe, it, expect } from "vitest"
import { get_largest_sum_free_subset } from "./loesung"

/**
 * Checks if a set is sum-free.
 * Logs a counterexample if there is any.
 */
function is_sum_free(set: Set<number>): boolean {
	for (const x of set) {
		for (const y of set) {
			if (set.has(x + y)) {
				console.warn("set is not sum-free:", x, y)
				return false
			}
		}
	}
	return true
}

describe("get_largest_sum_free_subset", () => {
	it("works for a tiny set", () => {
		const set = new Set([5, 6, 1])
		const expected = new Set([1, 5])
		const result = get_largest_sum_free_subset(set)
		expect(is_sum_free(result)).toBe(true)
		expect(get_largest_sum_free_subset(set)).toEqual(expected)
	})

	it("works for a small set", () => {
		const set = new Set([10, 1, 12, 2, 3, 11])
		const expected = new Set([2, 3, 10, 11])
		const result = get_largest_sum_free_subset(set)
		expect(is_sum_free(result)).toBe(true)
		expect(get_largest_sum_free_subset(set)).toEqual(expected)
	})

	it("works for an interval", () => {
		const set = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
		const expected = new Set([1, 3, 5, 7, 9])
		const result = get_largest_sum_free_subset(set)
		expect(is_sum_free(result)).toBe(true)
		expect(get_largest_sum_free_subset(set)).toEqual(expected)
	})

	it("works for a large set", () => {
		const set = new Set([
			2, 12, 17, 19, 24, 25, 26, 28, 32, 37, 40, 43, 44, 47, 54, 55, 58, 62, 73, 79,
			81, 83, 84, 89, 100, 101, 104, 115, 118, 120, 125, 127, 130, 135, 142, 148,
			151, 155, 160, 161, 163, 165, 169, 174, 181, 200, 205, 213, 224, 226,
		])
		const expected = new Set([
			2, 17, 24, 25, 28, 32, 40, 43, 47, 54, 55, 58, 62, 73, 81, 84, 89, 100, 104,
			115, 118, 130, 148, 160, 163, 174, 205, 213, 224,
		])
		const result = get_largest_sum_free_subset(set)
		expect(is_sum_free(result)).toBe(true)
		expect(get_largest_sum_free_subset(set)).toEqual(expected)
	}, 20000)

	it("throws when the set has a zero", () => {
		const set = new Set([0, 6, 8])
		expect(() => get_largest_sum_free_subset(set)).toThrow()
	})

	it("throws when the set has a negative number", () => {
		const set = new Set([-2, 1, 8])
		expect(() => get_largest_sum_free_subset(set)).toThrow()
	})

	it("throws when the set has a non-integer", () => {
		const set = new Set([1, 2.5, 3])
		expect(() => get_largest_sum_free_subset(set)).toThrow()
	})
})
