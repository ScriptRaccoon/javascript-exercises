/*
The game 1-dimensional Tic Tac Toe is also known as Treblecross
(https://en.wikipedia.org/wiki/Treblecross). It is a combinatorial
game, and we need to find its P-positions. We need some results of
combinatorial game theory:
- Every combinatorial game is equivalent to a Nim game *n, where n
  is the Grundy value of the game.
- A game is a P-position if and only if its Grundy value is 0.
- The Grundy value of a sum of games is the Nim sum of the Grundy values.

On boards >= 3 Treblecross is "equivalent" to a simpler game:
every 1 also occupies the max. 4 zeros around it:

0 0 1 0 0

These fields can be removed. What remains is a bunch of isolated
blocks of zeros. What only matters is the tuple of their lengths.
We get a sum of games, each one with just one pile.

Given a pile with x > 0 numbers, we may:

- remove it when x <= 5
- replace x with x - 3 (when x > 3)
- replace x with x - 4 (when x > 4)
- replace x with x - 5 (when x > 5)
- replace x by two piles with a,b > 0 numbers where a + b = x - 5

In other words, this is the "take-and-break" game .11337. For the
notation, see Chapter 4 in the book "Winning Ways" (Vol. 1).

The "equivalence" respects the P-positions, but not the Grundy values.
Still, the Grundy value of a sum is easy to compute using the Nim sum.
So even when we are only interested in the P-positions, this approach
is very fast. In fact, it allows us to compute the P-positions for
all n <= 100.000 (or even n <= 250.000) quickly.

The authors of "Winning Ways" identify Treblecross with the game .007,
which however requires to expand the board on both sides by 1 slot.
This also explains the 2-shift between our values and the ones on
the website https://wwwhomes.uni-bielefeld.de/achim/octal.html.
See also https://math.stackexchange.com/q/4283174 for an explanation.
*/

/**
 * Returns the minimal element excluded from the array.
 */
function mex(arr: number[]): number {
	let res = 0
	while (arr.includes(res)) res++
	return res
}

/**
 * Returns the list of sizes n for which Treblecross of size n
 * is won by the second player (in optimal play).
 */
export function get_losing_sizes(limit: number, print = true): number[] {
	if (print) console.info("Determine P-positions in Treblecross")
	const P_positions: number[] = [0, 2]

	const grundys = new Uint16Array(limit + 1)
	grundys[1] = 1
	grundys[2] = 1

	for (let n = 3; n <= limit; n++) {
		if (print && n % 1_000 === 0) console.info("Computing numbers >=", n, "...")
		const options: number[] = []

		if (n <= 5) options.push(0)
		for (const d of [3, 4, 5]) {
			if (n > d) options.push(grundys[n - d])
		}
		for (let a = 1; a <= (n - 5) / 2; a++) {
			const b = n - 5 - a
			if (b >= 1) {
				const s = grundys[a] ^ grundys[b]
				options.push(s)
			}
		}

		const g = mex(options)
		grundys[n] = g

		if (g === 0) {
			if (print) console.info("👀 Found P-position:", n)
			P_positions.push(n)
		}
	}
	return P_positions
}

// Usage:
// console.info(get_losing_sizes(100_000))

/*
[
     0,    2,    6,   12,   22,    30,
    32,   44,   54,   64,   76,    86,
    98,  110,  118,  130,  132,   162,
   170,  184,  194,  202,  282,   290,
   302,  356, 1046, 2502, 2752,  2912,
  3052, 3076, 7250, 7356, 7866, 16168
]

It seems like this is a *finite* set of 36 P-positions. But the proof
is a hard unsolved problem in combinatorial game theory.
*/
