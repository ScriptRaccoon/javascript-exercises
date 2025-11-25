import { is_set_of_positive_integers, lex_smaller, sum } from "./utils"

/**
 * Computes the largest sum-free subset of a finite set of positive integers.
 * Among these, we choose the one which is lexicographically smallest when sorted.
 */
export function get_largest_sum_free_subset(set: Set<number>): Set<number> {
	if (!is_set_of_positive_integers(set)) {
		throw new Error("Set must consist of positive integers.")
	}

	let largest: number[] = []
	let max_size = 0
	let min_sum = Infinity

	const allowed = [...set].sort((a, b) => a - b)

	/**
	 * List of currently chosen elements.
	 */
	const current: number[] = [] // list of currently chosen elements

	/**
	 * Lookup array to check if an element index has been chosen (1) or not (0).
	 */
	const present = new Uint8Array(Math.max(...allowed) + 1)

	/**
	 * Checks if the set of chosen elements stays sum-free after adding x.
	 */
	function is_valid(x: number): boolean {
		if (present[x + x]) return false
		for (const y of current) {
			if (present[x + y] || present[x - y]) return false
		}
		return true
	}

	/**
	 * Either skips the element at the given index or adds it to the
	 * chosen elements in case it is valid. If the index is after the end,
	 * checks if the sum-free subset is larger than the ones found before.
	 */
	function recurse(index: number) {
		if (index === allowed.length) {
			const current_sum = sum(current)
			if (
				current.length > max_size ||
				(current.length >= max_size && lex_smaller(current, largest))
			) {
				largest = [...current]
				max_size = current.length
				min_sum = current_sum
			}
			return
		}

		const remaining_length = allowed.length - index
		if (current.length + remaining_length <= max_size) return

		const x = allowed[index]

		// Option 1: skip x
		recurse(index + 1)

		// Option 2: add x if possible
		if (is_valid(x)) {
			current.push(x)
			present[x] = 1

			recurse(index + 1)

			current.pop()
			present[x] = 0
		}
	}

	recurse(0)

	return new Set(largest)
}
