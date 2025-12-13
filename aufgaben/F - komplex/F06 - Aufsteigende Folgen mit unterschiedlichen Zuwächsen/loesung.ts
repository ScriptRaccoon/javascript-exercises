/**
 * Number of strictly increasing sequences of k elements in {0,1,...,n-1}
 * so that the consecutive differences ("slopes") are pairwise distinct.
 * First implementation, which is already fast, but which we will improve below.
 */
export function unique_slope_sequences(n: number, k: number): number {
	if (k === 0) return 1
	/**
	 * We set slopes[d] = 1 when the slope d is already taken.
	 */
	const slopes = new Uint16Array(n).fill(0)

	/**
	 * Number of ways to expand a valid sequence of length m,
	 * where the last element is given.
	 */
	function extensions(m: number, last: number): number {
		if (m === k) return 1
		let count = 0
		for (let x = last + 1; x < n; x++) {
			const d = x - last
			if (slopes[d]) continue
			slopes[d] = 1
			count += extensions(m + 1, x)
			slopes[d] = 0
		}
		return count
	}

	let total = 0

	for (let x = 0; x < n; x++) {
		total += extensions(1, x)
	}

	return total
}

/**
 * Number of strictly increasing sequences of k elements in {0,1,...,n-1}
 * whose slopes are strictly increasing.
 */
function slope_increasing_sequences(n: number, k: number): number {
	if (k === 0) return 1
	if (k === 1) return n

	/**
	 * Number of ways to increase a valid sequence of length m >= 2
	 * where the last element a(m-1) and the last slope a(m-1) - a(m-2) are given.
	 */
	function helper(m: number, last: number, last_slope: number): number {
		if (m <= 1) return 0
		if (m === k) return 1

		let count = 0

		for (let x = last + 1; x < n; x++) {
			const d = x - last
			if (d > last_slope) {
				count += helper(m + 1, x, d)
			}
		}
		return count
	}

	let total = 0

	for (let x = 0; x < n; x++) {
		for (let y = x + 1; y < n; y++) {
			total += helper(2, y, y - x)
		}
	}

	return total
}

/**
 * Returns the factorial n! of n.
 */
function fac(n: number): number {
	return n === 0 ? 1 : n * fac(n - 1)
}

/**
 * Number of strictly increasing sequences of k elements in {0,1,...,n-1}
 * so that the consecutive differences ("slopes") are pairwise distinct.
 * Faster implementation, coming from the observation that there are (k-1)!
 * as many of these sequences than slope increasing sequences:
 * We are free to permute the k-1 slopes. Also uses the observation that
 * a sequence can only exist when n > ((k - 1) * k) / 2, since we must
 * have n > d_0 + ... + d_(k-2) and d_i >= i+1.
 */
export function unique_slope_sequences_fast(n: number, k: number): number {
	if (k === 0) return 1
	if (n <= ((k - 1) * k) / 2) return 0
	return fac(k - 1) * slope_increasing_sequences(n, k)
}
