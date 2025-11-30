/**
 * Computes the number of upper sets in the power set P(n),
 * or equivalently, the number of antichains in P(n).
 * {@link https://en.wikipedia.org/wiki/Dedekind_number}
 */
export function dedekind_number(n: number) {
	let count = 0

	/**
	 * Number of subsets, which we encode using bitmasks of length n.
	 */
	const N = 1 << n

	/**
	 * supersets[A] = list of supersets of A (encoded as bitmasks).
	 */
	const supersets: number[][] = Array.from({ length: N }, () => [])

	for (let A = 0; A < N; A++) {
		for (let B = 0; B < N; B++) {
			if ((A & ~B) === 0) {
				supersets[A].push(B)
			}
		}
	}

	/**
	 * remaining[A] = 1 means that subset A can still be included
	 * to construct the remaining upper set.
	 */
	const remaining = new Uint16Array(N).fill(1)

	/**
	 * Tries to extend the given upper set by one subset.
	 */
	function extend(index: number): void {
		while (index < N && !remaining[index]) index++

		const A = index

		if (A === N) {
			count++
			return
		}

		{
			// Option 1: Do not include A in the uppset set.
			remaining[A] = 0
			extend(A + 1)
			remaining[A] = 1
		}

		{
			// Option 2: Include A in the upper set.

			/**
			 * Array of all remaining supersets of A, which we will remove.
			 */
			const removed: number[] = []

			for (const C of supersets[A]) {
				if (remaining[C]) {
					remaining[C] = 0
					removed.push(C)
				}
			}

			extend(A + 1)

			for (const C of removed) {
				remaining[C] = 1
			}
		}
	}

	extend(0)

	return count
}

for (let n = 0; n <= 6; n++) {
	const x = dedekind_number(n)
	console.info(`| \`dedekind_number(${n})\` | ${x} |`)
}
