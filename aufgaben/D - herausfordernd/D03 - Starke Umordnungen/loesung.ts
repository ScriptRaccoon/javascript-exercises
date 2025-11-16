import { describe, expect, test } from "../test.utils"

/**
 * Computes the number of permutations of 0,...,n-1 where each element
 * is moved by at least d numbers. For d = 1 we get classical derangements.
 *
 * The strategy is to represent this number as the permanent of the (0,1)-matrix
 * of size n which has zeros in the diagonals which are < d steps away from the
 * main diagonal. Then, use Ryser's formula to compute the permanent, and inline
 * the computation for a performance boost.
 * {@link https://en.wikipedia.org/wiki/Computing_the_permanent}
 *
 * Also, instead of looping over all 2^n subsets of [n], use a bitmask to represent
 * these subsets. Throws when 2^n >= Number.MAX_SAFE_INTEGER, i.e. n >= 53.
 */
function count_derangements(n: number, d: number): bigint {
	if (n >= 53) throw new Error(`Number out of bounds: ${n}`)
	let result = 0n
	for (let mask = 0; mask < 1 << n; mask++) {
		const k = count_bits(mask)
		let prod = 1n
		for (let i = 0; i < n; i++) {
			let row_sum = 0n
			for (let j = 0; j < n; j++) {
				if (mask & (1 << j) && Math.abs(i - j) >= d) row_sum += 1n
			}
			prod *= row_sum
			if (prod === 0n) break
		}
		result += (n + k) % 2 === 0 ? prod : -prod
	}

	return result
}

/**
 * Counts the number of bits in a number, represented in binary.
 */
function count_bits(x: number) {
	let count = 0
	while (x) {
		count += x & 1
		x >>= 1
	}
	return count
}

/* ------ TESTS ------ */

describe("count_derangements", () => {
	console.time("computation")
	test("d=0", () => {
		expect(count_derangements(3, 0)).toBe(6n)
	})

	test("d=1", () => {
		expect(count_derangements(0, 1)).toBe(1n)
		expect(count_derangements(1, 1)).toBe(0n)
		expect(count_derangements(2, 1)).toBe(1n)
		expect(count_derangements(3, 1)).toBe(2n)
		expect(count_derangements(4, 1)).toBe(9n)
		expect(count_derangements(5, 1)).toBe(44n)
		expect(count_derangements(6, 1)).toBe(265n)
		expect(count_derangements(20, 1)).toBe(895014631192902121n)
	})

	test("d=2", () => {
		expect(count_derangements(4, 2)).toBe(1n)
		expect(count_derangements(5, 2)).toBe(4n)
		expect(count_derangements(6, 2)).toBe(29n)
		expect(count_derangements(7, 2)).toBe(206n)
		expect(count_derangements(20, 2)).toBe(114601867572247060n)
	})

	test("d=5", () => {
		expect(count_derangements(10, 5)).toBe(1n)
		expect(count_derangements(15, 5)).toBe(21201024n)
		expect(count_derangements(20, 5)).toBe(91932770123800n)
		expect(count_derangements(22, 5)).toBe(49865459492032640n)
	})
	console.timeEnd("computation")
	console.info("tests done")
})
