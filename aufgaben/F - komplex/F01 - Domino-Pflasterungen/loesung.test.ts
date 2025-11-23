import { describe, it, expect } from "vitest"
import { count_domino_tilings, count_domino_tilings_up_to } from "./loesung"

describe("count_domino_tilings_up_to", () => {
	it("works for m = 1", () => {
		const expected = [1n, 0n, 1n, 0n, 1n, 0n, 1n, 0n, 1n, 0n, 1n]
		const counts = count_domino_tilings_up_to(1, 10)
		expect(counts).toEqual(expected)
	})

	it("works for m = 2", () => {
		// https://oeis.org/A000045
		const expected = [1n, 1n, 2n, 3n, 5n, 8n, 13n, 21n, 34n, 55n, 89n]
		const counts = count_domino_tilings_up_to(2, 10)
		expect(counts).toEqual(expected)
	})

	it("works for m = 3", () => {
		// https://oeis.org/A001835
		const expected = [
			1n,
			3n,
			11n,
			41n,
			153n,
			571n,
			2131n,
			7953n,
			29681n,
			110771n,
			413403n,
		]
		const counts = count_domino_tilings_up_to(3, 20).filter((_, i) => i % 2 === 0)
		expect(counts).toEqual(expected)
	})

	it("works for m = 4", () => {
		// https://oeis.org/A005178
		const expected = [1n, 1n, 5n, 11n, 36n, 95n, 281n, 781n, 2245n, 6336n, 18061n]
		const counts = count_domino_tilings_up_to(4, 10)
		expect(counts).toEqual(expected)
	})

	it("works for m = 10", () => {
		// https://oeis.org/A028472
		const expected = [
			1n,
			1n,
			89n,
			571n,
			18061n,
			185921n,
			4213133n,
			53175517n,
			1031151241n,
			14479521761n,
			258584046368n,
		]
		const counts = count_domino_tilings_up_to(10, 10)
		expect(counts).toEqual(expected)
	})
})

describe("count_domino_tilings", () => {
	it("works for m = n = 12", () => {
		// https://oeis.org/A004003
		const count = count_domino_tilings(12, 12)
		const expected = 53060477521960000n
		expect(count).toBe(expected)
	})

	it("works for m = n = 14", () => {
		// https://oeis.org/A004003
		const count = count_domino_tilings(14, 14)
		const expected = 112202208776036178000000n
		expect(count).toBe(expected)
	})

	it("works for m = n = 20", () => {
		// https://oeis.org/A004003
		const count = count_domino_tilings(20, 20)
		const expected = 1269984011256235834242602753102293934298576249856n
		expect(count).toBe(expected)
	}, 20000)
})
