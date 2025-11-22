/**
 * Schreibt einen Countdown in die Konsole.
 * Nach jeder Sekunde wird die Zahl erniedrigt.
 */
function countdown(n: number): void {
	if (!Number.isInteger(n) || n < 0) throw new Error(`Illegal input: ${n}`)

	if (n === 0) {
		console.info(`0 - LIFT OFF`)
	} else {
		console.info(n)
		setTimeout(() => {
			countdown(n - 1)
		}, 1000)
	}
}

/* ------ TESTS ------ */

countdown(5)

/*
5
4
3
2
1
0 - LIFT OFF
*/
