/**
 * Checks if a bitmask has a bit at index i.
 * This corresponds to a set membership relation.
 */
function has_bit(bitmask: number, i: number): boolean {
	return ((bitmask >> i) & 1) !== 0
}

/**
 * Returns the index of the lowest non-zero bit in a bitmask.
 */
function get_lowest_set_bit_index(bitmask: number): number {
	if (bitmask === 0) return -1
	let i = 0
	while (!(bitmask & 1)) {
		i++
		bitmask >>= 1
	}
	return i
}

/**
 * Type for a performance-sensitive partial order on the set 0,....,n-1
 * for a natural number n, the size of the partial order.
 *
 * For each number x, we save two bitmasks of length n:
 *
 * - the bitmask `lower[x]` of elements <= x,
 * - the bitmask `upper[x]` of elements >= x.
 *
 * This data is redundant, but is very useful to speed up computations.
 */
export type PartialOrder = {
	size: number
	lower: number[]
	upper: number[]
}

/**
 * Checks if x <= y holds in the partial order.
 */
export function leq(p: PartialOrder, x: number, y: number): boolean {
	return has_bit(p.upper[x], y)
}

/**
 * Converts the partial order to a readable string of relations.
 */
export function stringify_partial_order(p: PartialOrder): string {
	const rels: string[] = []

	for (let x = 0; x < p.size; x++) {
		for (let y = 0; y < p.size; y++) {
			if (x !== y && leq(p, x, y)) rels.push(`${x} < ${y}`)
		}
	}

	return rels.join(", ")
}

/**
 * Returns a copy of the given partial order.
 */
function get_copy(p: PartialOrder): PartialOrder {
	return { size: p.size, lower: p.lower.slice(), upper: p.upper.slice() }
}

/**
 * Iterates through all pairs (A,B) of bitmasks such that "A < B" elementwise
 * (in particular, A,B are disjoint), A is a lower set, and B is an upper set.
 * The callback is applied to every such pair.
 */
function iterate_lower_upper_set_pairs(
	p: PartialOrder,
	callback: (A: number, B: number) => void,
): void {
	/**
	 * Adds the next element to A or B.
	 */
	function recurse(free_A: number, free_B: number, A: number, B: number) {
		if (free_A === 0 && free_B === 0) {
			callback(A, B)
			return
		}

		const x = get_lowest_set_bit_index(free_A | free_B)

		{
			/**
			 * Option 1: Add x to A.
			 * Hence, add all y <= x to A.
			 * This works when x is free for A, not in B, and every element in B is >= x.
			 */
			if (has_bit(free_A, x) && !has_bit(B, x) && (B & ~p.upper[x]) === 0) {
				recurse(free_A & ~p.lower[x], free_B & ~p.lower[x], A | p.lower[x], B)
			}
		}
		{
			/**
			 * Option 2: Add x to B.
			 * Hence, add all y >= x to B.
			 * This works when x is free for B, not in A, and every element in A is <= x.
			 */
			if (has_bit(free_B, x) && !has_bit(A, x) && (A & ~p.lower[x]) === 0) {
				recurse(free_A & ~p.upper[x], free_B & ~p.upper[x], A, B | p.upper[x])
			}
		}
		{
			/**
			 * Option 3: Add x to neither A nor B.
			 * The elements >= x then cannot go to A anymore,
			 * and elements <= x cannot go to B anymore.
			 */
			recurse(free_A & ~p.upper[x], free_B & ~p.lower[x], A, B)
		}
	}

	const all_bits = (1 << p.size) - 1
	recurse(all_bits, all_bits, 0, 0)
}

/**
 * Extends a partial order of size n to partial order of size n + 1
 * from a pair of subsets A < B as above, using the construction from `proof.md`:
 * We add a new element x so that A is the bitmasked set of elements <= x,
 * and B the bitmasked set of elements >= x.
 * Notice: This changes the partial order in place (to increase performance).
 */
function extend_partial_order(p: PartialOrder, A: number, B: number): void {
	const x = p.size // new element

	p.lower[x] = 1 << x // x <= x
	p.upper[x] = 1 << x // x <= x

	for (let u = 0; u < p.size; u++) {
		if (has_bit(A, u)) {
			p.lower[x] |= 1 << u // u <= x for u in A
			p.upper[u] |= 1 << x // u <= x for u in A
		} else if (has_bit(B, u)) {
			p.lower[u] |= 1 << x // x <= u for u in B
			p.upper[x] |= 1 << u // x <= u for u in B
		}
	}

	p.size++
}

/**
 * Removes the last element from a partial order.
 * Notice: This changes the partial order in place (to increase performance).
 */
function shrink_partial_order(p: PartialOrder) {
	if (p.size === 0) return
	const last = p.size - 1
	p.lower[last] = 0
	p.upper[last] = 0
	for (let x = 0; x < p.size; x++) {
		p.lower[x] &= ~(1 << last)
		p.upper[x] &= ~(1 << last)
	}

	p.size--
}

/**
 * Computes the list of all partial orders on the set {0,1,...,n-1}.
 */
export function get_partial_orders(n: number): PartialOrder[] {
	const partial_orders: PartialOrder[] = []

	/**
	 * Intially, the unique partial order of size 0, which then will be edited
	 * in place to generate all partial orders.
	 */
	const p: PartialOrder = {
		size: 0,
		lower: new Array(n).fill(0),
		upper: new Array(n).fill(0),
	}

	/**
	 * Try to extend the partial order, using the construction
	 * from `proof.md`, recurse, and backtrack.
	 */
	function recurse() {
		if (p.size === n) {
			partial_orders.push(get_copy(p))
			return
		}

		iterate_lower_upper_set_pairs(p, (A, B) => {
			extend_partial_order(p, A, B)
			recurse()
			shrink_partial_order(p)
		})
	}

	recurse()

	return partial_orders
}

/**
 * Computes the number of partial orders on the set {0,1,...,n-1}.
 */
export function count_partial_orders(n: number): bigint {
	let count = 0n

	/**
	 * Intially, the unique partial order of size 0, which then will be edited
	 * in place to generate all partial orders.
	 */
	const p: PartialOrder = {
		size: 0,
		lower: new Array(n).fill(0),
		upper: new Array(n).fill(0),
	}

	/**
	 * Try to extend the partial order, using the construction
	 * from `proof.md`, recurse, and backtrack.
	 */
	function recurse() {
		if (p.size === n) {
			count++
			return
		}

		iterate_lower_upper_set_pairs(p, (A, B) => {
			extend_partial_order(p, A, B)
			recurse()
			shrink_partial_order(p)
		})
	}

	recurse()

	return count
}
