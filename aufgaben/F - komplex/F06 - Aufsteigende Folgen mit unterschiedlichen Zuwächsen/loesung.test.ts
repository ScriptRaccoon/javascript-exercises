import { describe, it, expect } from "vitest"
import { unique_slope_sequences, unique_slope_sequences_fast } from "./loesung"

describe("unique_slope_sequences", () => {
	it("works for k = 1", () => {
		for (let n = 0; n < 10; n++) {
			expect(unique_slope_sequences(n, 1)).toBe(n)
		}
	})

	it("works for k = 2", () => {
		for (let n = 0; n < 10; n++) {
			// https://oeis.org/A161680
			expect(unique_slope_sequences(n, 2)).toBe(n == 0 ? 0 : (n * (n - 1)) / 2)
		}
	})

	it("works for k = 3", () => {
		// https://oeis.org/A212964
		const expected = [
			0, 0, 0, 2, 6, 14, 26, 44, 68, 100, 140, 190, 250, 322, 406, 504, 616, 744,
			888,
		]
		for (let n = 1; n < 20; n++) {
			expect(unique_slope_sequences(n, 3)).toBe(expected[n - 1])
		}
	})

	it("works for k = 4", () => {
		// https://oeis.org/A057524
		const expected = [
			1, 3, 7, 14, 25, 41, 64, 95, 136, 189, 256, 339, 441, 564, 711, 885, 1089,
			1326, 1600, 1914,
		].map((x) => 6 * x)
		for (let n = 0; n < 20; n++) {
			expect(unique_slope_sequences(n + 7, 4)).toBe(expected[n])
		}
	})

	it("works for k = 5", () => {
		// no OEIS entry
		const expected = [
			0, 24, 72, 168, 336, 624, 1056, 1704, 2616, 3888, 5592, 7848, 10752, 14472,
			19128, 24912, 31992, 40608, 50952, 63312,
		]
		for (let n = 10; n < 30; n++) {
			expect(unique_slope_sequences(n, 5)).toBe(expected[n - 10])
		}
	})
})

describe("unique_slope_sequences_fast", () => {
	it("gives the same results", () => {
		for (let n = 0; n < 20; n++) {
			for (let k = 0; k < n; k++) {
				expect(unique_slope_sequences_fast(n, k)).toBe(
					unique_slope_sequences(n, k),
				)
			}
		}
	})

	it("handles large numbers", () => {
		expect(unique_slope_sequences_fast(40, 5)).toBe(428184)
		expect(unique_slope_sequences_fast(90, 13)).toBe(296022988800)
		expect(unique_slope_sequences_fast(120, 11)).toBe(85786588339200)
		expect(unique_slope_sequences_fast(120, 16)).toBe(0)
	}, 10_000)
})
