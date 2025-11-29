import { describe, it, expect } from "vitest"
import {
	get_monic_irreducible,
	get_monic_irreducibles,
	is_irreducible,
	stringify_poly,
} from "./loesung"

describe("stringify_poly", () => {
	it("returns a readable string version of the polynomial", () => {
		const str = stringify_poly([2, -1, 0, 0, 2, -3, 5])
		expect(str).toBe("5X^6 - 3X^5 + 2X^4 - X + 2")
	})
})

describe("is_irreducible", () => {
	it("confirms that X^3 + X + 1 is irreducible mod 2", () => {
		const irred = is_irreducible([1, 1, 0, 1], 2)
		expect(irred).toBe(true)
	})

	it("confirms that X^3 + X + 1 is not irreducible mod 3", () => {
		const irred = is_irreducible([1, 1, 0, 1], 3)
		expect(irred).toBe(false)
	})

	it("confirms that X^5 + 2X + 1 is reducible mod 7", () => {
		const irred = is_irreducible([1, 2, 0, 0, 0, 1], 7)
		expect(irred).toBe(false)
	})

	// slow, TODO: improve speed
	it("confirms that X^5 + 3X + 1 is not irreducible mod 7", () => {
		const irred = is_irreducible([1, 3, 0, 0, 0, 1], 7)
		expect(irred).toBe(true)
	}, 20_000)
})

describe("get_monic_irreducible", () => {
	const cases: [number, number, string][] = [
		[2, 2, "X^2 + X + 1"],
		[3, 2, "X^3 + X + 1"],
		[4, 2, "X^4 + X + 1"],
		[5, 2, "X^5 + X^2 + 1"],
		[2, 3, "X^2 + 1"],
		[5, 3, "X^5 + 2X + 1"],
		[2, 5, "X^2 + 2"],
		[6, 5, "X^6 + X + 2"], // slow, TODO: improve speed
		[3, 7, "X^3 + 2"],
	]

	it.each(cases)(
		"for n = %d and p = %d yields %s",
		(n, p, s) => {
			const f = get_monic_irreducible(n, p)
			expect(f).toBeTruthy()
			const f_str = stringify_poly(f!)
			expect(f_str).toBe(s)
		},
		10_000,
	)
})

describe("get_monic_irreducibles", () => {
	it("works for n = 2 and p = 2", () => {
		expect([...get_monic_irreducibles(2, 2)]).toEqual([
			[1, 1, 1], // X^2 + X + 1
		])
	})

	it("works for n = 3 and p = 2", () => {
		expect([...get_monic_irreducibles(3, 2)]).toEqual([
			[1, 1, 0, 1], // X^3 + X + 1
			[1, 0, 1, 1], // X^3 + X^2 + 1
		])
	})

	it("works for n = 3 and p = 3", () => {
		expect([...get_monic_irreducibles(3, 3)]).toEqual([
			[1, 2, 0, 1], // X^3 + 2X + 1
			[2, 2, 0, 1], // X^3 + 2X + 2
			[2, 0, 1, 1], // X^3 + X^2 + 2
			[2, 1, 1, 1], // X^3 + X^2 + X + 1
			[1, 2, 1, 1], // X^3 + X^2 + 2X + 1
			[1, 0, 2, 1], // X^3 + 2X^2 + 1
			[1, 1, 2, 1], // X^3 + 2X^2 + X + 1
			[2, 2, 2, 1], // X^3 + 2X^2 + 2X + 2
		])
	})

	it("has the correct numbers for p = 2", () => {
		// https://oeis.org/A001037
		const expected = [2, 1, 2, 3, 6, 9, 18, 30, 56]
		const actual = []
		for (let n = 1; n <= 9; n++) {
			actual.push([...get_monic_irreducibles(n, 2)].length)
		}
		expect(actual).toEqual(expected)
	})
})
