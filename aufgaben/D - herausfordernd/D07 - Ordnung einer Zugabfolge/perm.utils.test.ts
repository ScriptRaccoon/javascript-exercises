import { describe, it, expect } from "vitest"
import { PermUtils } from "./perm.utils"

describe("PermUtils", () => {
	describe("is_permutation", () => {
		const cases: [number[], boolean][] = [
			[[0, 1, 2], true],
			[[1, 0, 2], true],
			[[1, 1], false],
			[[0, 1, 3], false],
		]

		it.each(cases)("%j --> %j", (perm, bool) => {
			expect(PermUtils.is_permutation(perm)).toBe(bool)
		})
	})

	describe("compose_cycles", () => {
		it("converts cycle notation to permutation", () => {
			const cycles: number[][] = [
				[0, 1, 2],
				[7, 8],
			]
			const perm = PermUtils.convert_cycles(cycles, 10)
			expect(PermUtils.is_permutation(perm)).toBe(true)
			expect(perm).toEqual([1, 2, 0, 3, 4, 5, 6, 8, 7, 9])
		})
	})

	describe("get_inverse", () => {
		it("returns the inverse permutation", () => {
			const perm = [0, 4, 7, 3, 1, 2, 5, 6]
			expect(PermUtils.is_permutation(perm)).toBe(true)
			const inv = PermUtils.get_inverse(perm)
			expect(PermUtils.is_permutation(inv)).toBe(true)
			for (let i = 0; i < perm.length; i++) {
				expect(inv[perm[i]]).toBe(i)
				expect(perm[inv[i]]).toBe(i)
			}
		})
	})

	describe("order", () => {
		const cases: [number[], number][] = [
			[[0, 1, 2], 1],
			[[1, 0, 2], 2],
			[[1, 2, 3, 4, 0], 5],
			[[1, 0, 3, 4, 2], 6],
		]

		it.each(cases)("%j --> %d", (perm, order) => {
			expect(PermUtils.get_order(perm)).toBe(order)
		})
	})
})
