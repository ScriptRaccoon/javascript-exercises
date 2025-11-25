import { describe, it, expect } from "vitest"
import {
	count_partial_orders,
	get_partial_orders,
	leq,
	PartialOrder,
	stringify_partial_order,
} from "./loesung"

/**
 * Checks if a partial order is actually one, i.e.
 * reflexive, antisymmetric, and transitive.
 */
function is_valid_partial_order(p: PartialOrder): boolean {
	for (let x = 0; x < p.size; x++) {
		if (!leq(p, x, x)) return false
	}
	for (let x = 0; x < p.size; x++) {
		for (let y = x + 1; y < p.size; y++) {
			if (leq(p, x, y) && leq(p, y, x) && x !== y) return false
		}
	}
	for (let x = 0; x < p.size; x++) {
		for (let y = 0; y < p.size; y++) {
			for (let z = 0; z < p.size; z++) {
				if (leq(p, x, y) && leq(p, y, z) && !leq(p, x, z)) return false
			}
		}
	}

	return true
}

describe("count_partial_orders", () => {
	const cases = [
		[0, 1n],
		[1, 1n],
		[2, 3n],
		[3, 19n],
		[4, 219n],
		[5, 4231n],
		[6, 130023n],
		[7, 6129859n],
	] as const

	it.each(cases)("for n = %d finds %d partial orders", (n, count) => {
		expect(count_partial_orders(n)).toBe(count)
	})
})

describe("get_partial_orders", () => {
	it("returns the correct partial orders for n = 2", () => {
		const partial_orders = get_partial_orders(2)
		expect(partial_orders.length).toBe(3)
		const stringified = partial_orders.map(stringify_partial_order)
		expect(stringified).toContainEqual("0 < 1")
		expect(stringified).toContainEqual("1 < 0")
		expect(stringified).toContainEqual("")
	})

	it("returns the correct partial orders for n = 3", () => {
		const partial_orders = get_partial_orders(3)
		expect(partial_orders.length).toBe(19)
		const stringified = partial_orders.map(stringify_partial_order)
		expect(stringified).toContainEqual("0 < 1, 0 < 2, 1 < 2")
		expect(stringified).toContainEqual("0 < 1, 0 < 2")
		expect(stringified).toContainEqual("1 < 2")
		expect(stringified).toContainEqual("2 < 0, 2 < 1")
	})

	it("returns only valid partial orders for n = 4", () => {
		const partial_orders = get_partial_orders(4)
		expect(partial_orders.length).toBe(219)
		for (const partial_order of partial_orders) {
			expect(is_valid_partial_order(partial_order)).toBe(true)
		}
	})
})
