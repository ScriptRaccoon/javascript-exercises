export type Permutation = number[]

/**
 * Class with utility methods for permutations.
 * These are modelled as arrays of distinct numbers 0,1,...,n-1 of length n.
 */
export class PermUtils {
	/**
	 * Checks if an array of numbers is actually a permutation.
	 */
	static is_permutation(a: Permutation): boolean {
		const n = a.length
		return new Set(a).size === n && Math.min(...a) === 0 && Math.max(...a) === n - 1
	}

	/**
	 * Composes two permutations (from left to right).
	 */
	static compose(a: Permutation, b: Permutation): Permutation {
		return b.map((x) => a[x])
	}

	/**
	 * Composes an array of permutations (from left to right).
	 */
	static compose_array(arr: Permutation[], n: number): Permutation {
		if (arr.length === 0) return PermUtils.get_identity(n)
		const [first, ...rest] = arr
		return PermUtils.compose(first, PermUtils.compose_array(rest, n))
	}

	/**
	 * Converts a cycle to a permutation of a given length.
	 */
	static convert_cycle(cycle: number[], n: number): Permutation {
		if (new Set(cycle).size < cycle.length) {
			throw new Error(`Cycle has duplicate entries: ${cycle}`)
		}
		const perm: Permutation = []
		for (let x = 0; x < n; x++) {
			if (cycle.includes(x)) {
				const i = cycle.indexOf(x)
				perm[x] = cycle[(i + 1) % cycle.length]
			} else {
				perm[x] = x
			}
		}
		return perm
	}

	/**
	 * Converts a list of cycles to permutations and composes them.
	 */
	static convert_cycles(cycles: number[][], n: number): Permutation {
		return PermUtils.compose_array(
			cycles.map((c) => PermUtils.convert_cycle(c, n)),
			n,
		)
	}

	/**
	 * Computes the inverse of a permutation.
	 */
	static get_inverse(a: Permutation): Permutation {
		return Array.from({ length: a.length }, (_, i) => a.indexOf(i))
	}

	/**
	 * Returns the identity permutation of length.
	 */
	static get_identity(n: number): Permutation {
		return Array.from({ length: n }, (_, i) => i)
	}

	/**
	 * Checks if a permutation is the identity permutation.
	 */
	static is_identity(a: Permutation): boolean {
		return a.every((_, i) => a[i] === i)
	}

	/**
	 * Returns the power of a permutation with a given exponent.
	 */
	static get_power(a: Permutation, exponent: number): Permutation {
		if (exponent === 0) return PermUtils.get_identity(a.length)
		if (exponent < 0) return PermUtils.get_power(PermUtils.get_inverse(a), -exponent)
		return PermUtils.compose(a, PermUtils.get_power(a, exponent - 1))
	}

	/**
	 * Computes the order of a permutation: the smallest positive integer k
	 * such that the k-fold power equals the identity.
	 */
	static get_order(a: Permutation): number {
		let order = 1
		let current = a
		while (!PermUtils.is_identity(current)) {
			current = PermUtils.compose(current, a)
			order++
		}
		return order
	}
}
