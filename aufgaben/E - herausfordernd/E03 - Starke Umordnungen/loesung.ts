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
export function count_derangements(n: number, d: number): bigint {
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
