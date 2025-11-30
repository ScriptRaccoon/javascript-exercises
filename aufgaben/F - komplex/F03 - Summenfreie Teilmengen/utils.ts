/**
 * Checks if a set of numbers consists only of positive integers.
 */
export function is_set_of_positive_integers(set: Set<number>): boolean {
	for (const x of set) {
		if (!(Number.isInteger(x) && x > 0)) return false
	}
	return true
}

/**
 * Checks if an array is smaller than another array in the lexicographic order.
 */
export function lex_smaller(a: number[], b: number[]): boolean {
	for (let i = 0; i < Math.min(a.length, b.length); i++) {
		if (a[i] < b[i]) return true
		if (a[i] > b[i]) return false
	}
	return a.length < b.length
}
