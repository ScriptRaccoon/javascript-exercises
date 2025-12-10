/**
 * Returns the list of permutations on 0,...,n-1 that fix 0.
 */
function get_permutations_fix_0(n: number): number[][] {
	const perms: number[][] = []
	const perm: number[] = [0]
	const seen = new Set<number>([0])

	function extend() {
		if (perm.length === n) {
			perms.push([...perm])
			return
		}

		for (let x = 0; x < n; x++) {
			if (seen.has(x)) continue
			perm.push(x)
			seen.add(x)
			extend()
			seen.delete(x)
			perm.pop()
		}
	}

	extend()

	return perms
}

/**
 * Returns a hashed value of a tuple with base 31.
 */
function hash_tuple(tuple: number[]): number {
	let h = 0
	for (const element of tuple) {
		h = h * 31 + element
	}
	return h
}

/**
 * Computes the conjugate of a tuple by a given permutation.
 * Updates an array in place to avoid allocations.
 */
function conjugate_with_permutation(
	perm: number[],
	inv: number[],
	tuple: number[],
	temp: number[],
): void {
	for (let i = 0; i < tuple.length; i++) {
		temp[i] = perm[tuple[inv[i]]]
	}
}

/**
 * Returns the inverse of a permutation.
 */
function get_inverse_permutation(perm: number[]): number[] {
	const inv = new Array(perm.length)
	for (let i = 0; i < perm.length; i++) inv[perm[i]] = i
	return inv
}

/**
 * Returns the orbit length of a tuple under a list of permutations
 * and updates the set of seen tuples.
 */
function get_orbit_length(
	tuple: number[],
	perms: number[][],
	inv_perms: number[][],
	seen: Set<number>,
	temp: number[],
): number {
	let orbit_length = 1
	seen.add(hash_tuple(tuple))

	for (let i = 0; i < perms.length; i++) {
		conjugate_with_permutation(perms[i], inv_perms[i], tuple, temp)
		const k = hash_tuple(temp)
		if (!seen.has(k)) {
			seen.add(k)
			orbit_length++
		}
	}
	return orbit_length
}

/**
 * Iterates through all n-tuples of numbers < m.
 */
function iterate_tuples(n: number, m: number, callback: (tuple: number[]) => void): void {
	const tuple = new Array(n)
	for (let k = 0; k < m ** n; k++) {
		let x = k
		for (let i = n - 1; i >= 0; i--) {
			tuple[i] = x % m
			x = (x / m) | 0
		}
		callback(tuple)
	}
}

/**
 * Returns representatives of the orbits of S_(n-1) = {p in S_n : p(0) = 0}
 * on the set of tuples n^n and their orbit lenghts.
 * cf. https://oeis.org/A027853
 */
export function get_orbit_representatives(n: number): [number[], number][] {
	const orbit_reps: [number[], number][] = []
	const perms = get_permutations_fix_0(n)
	const inv_perms = perms.map(get_inverse_permutation)

	const seen = new Set<number>()
	const temp = new Array(n).fill(0)

	iterate_tuples(n, n, (tuple) => {
		if (seen.has(hash_tuple(tuple))) return
		const orbit_length = get_orbit_length(tuple, perms, inv_perms, seen, temp)
		orbit_reps.push([tuple.slice(), orbit_length])
	})

	return orbit_reps
}
