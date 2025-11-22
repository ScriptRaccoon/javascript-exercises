import { describe, it, expect } from "vitest"
import { count_derangements } from "./loesung"

describe("count_derangements", () => {
	it("d=0", () => {
		expect(count_derangements(3, 0)).toBe(6n)
	})

	it("d=1", () => {
		expect(count_derangements(0, 1)).toBe(1n)
		expect(count_derangements(1, 1)).toBe(0n)
		expect(count_derangements(2, 1)).toBe(1n)
		expect(count_derangements(3, 1)).toBe(2n)
		expect(count_derangements(4, 1)).toBe(9n)
		expect(count_derangements(5, 1)).toBe(44n)
		expect(count_derangements(6, 1)).toBe(265n)
		expect(count_derangements(20, 1)).toBe(895014631192902121n)
	})

	it("d=2", () => {
		expect(count_derangements(4, 2)).toBe(1n)
		expect(count_derangements(5, 2)).toBe(4n)
		expect(count_derangements(6, 2)).toBe(29n)
		expect(count_derangements(7, 2)).toBe(206n)
		expect(count_derangements(20, 2)).toBe(114601867572247060n)
	})

	it("d=5", () => {
		expect(count_derangements(10, 5)).toBe(1n)
		expect(count_derangements(15, 5)).toBe(21201024n)
		expect(count_derangements(20, 5)).toBe(91932770123800n)
		expect(count_derangements(22, 5)).toBe(49865459492032640n)
	})
}, 10_000)
