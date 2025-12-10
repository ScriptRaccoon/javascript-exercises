import { get_orbit_representatives } from "./orbits"

/**
 * Counts the number of associative binary operations on a set
 * with n elements. This function uses the fact that the count
 * with a given first row is the same when the first row is
 * conjugated by some permutation fixing 0.
 */
export function count_associative_operations(n: number): number {
	if (n <= 1) return 1

	const orbit_reps = get_orbit_representatives(n)

	let total = 0

	for (const rep of orbit_reps) {
		const [row, mult] = rep
		const count = count_associative_operations_by_first_row(n, row)
		total += mult * count
	}

	return total
}

/**
 * Counts the number of associative binary operations on a set
 * with n elements where the first row is given.
 * This function recursively sets values and propagates them
 * using associativitiy.
 */
function count_associative_operations_by_first_row(n: number, row: number[]): number {
	let count = 0

	const table = new Uint8Array(n * n)
	const defined = new Uint8Array(n * n)

	try {
		for (let x = 0; x < n; x++) {
			set(0, x, row[x], [])
		}
	} catch (_) {
		return 0
	}

	function idx(x: number, y: number) {
		return x * n + y
	}

	function unidx(i: number): [number, number] {
		return [Math.floor(i / n), i % n]
	}

	function op(x: number, y: number) {
		return table[idx(x, y)]
	}

	function unset(index: number) {
		defined[index] = 0
	}

	function is_defined(x: number, y: number): boolean {
		return Boolean(defined[idx(x, y)])
	}

	function set(x: number, y: number, val: number, stack: number[]) {
		if (is_defined(x, y)) {
			if (op(x, y) !== val) throw "contradiction"
			return
		}
		const index = idx(x, y)
		table[index] = val
		defined[index] = 1

		stack.push(index)
		propagate(x, y, stack)
	}

	function propagate(x: number, y: number, stack: number[]) {
		const a = op(x, y)

		for (let u = 0; u < n; u++) {
			// type 1
			if (is_defined(y, u) && is_defined(x, op(y, u))) {
				set(a, u, op(x, op(y, u)), stack)
			}

			// type 2
			if (is_defined(u, x) && is_defined(op(u, x), y)) {
				set(u, a, op(op(u, x), y), stack)
			}
		}

		for (let u = 0; u < n; u++) {
			for (let v = 0; v < n; v++) {
				if (!is_defined(u, v)) continue
				const uv = op(u, v)
				// type 3
				if (uv == x && is_defined(v, y)) {
					set(u, op(v, y), a, stack)
				}
				// type 4
				if (uv == y && is_defined(x, u)) {
					set(op(x, u), v, a, stack)
				}
			}
		}
	}

	function extend(index: number, depth: number): void {
		if (index === n * n) {
			count++
			return
		}

		const [x, y] = unidx(index)

		if (is_defined(x, y)) {
			return extend(index + 1, depth)
		}

		for (let val = 0; val < n; val++) {
			const stack: number[] = []

			try {
				set(x, y, val, stack)
				extend(index + 1, depth + 1)
			} catch (_) {}

			while (stack.length > 0) {
				unset(stack.pop()!)
			}
		}
	}

	extend(n, 0)

	return count
}

/*
Current times:
- n = 4: 13.768ms
- n = 5: 183.637ms
- n = 6: 16.894s
- n = 7: approx. 1 hour

This can be improved a bit by using workers, but not much,
since most of the time is spent by handling the case that
the first row is completely 0.
*/
