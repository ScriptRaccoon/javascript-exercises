/**
 * Bestimmt das Schlüssel-Wert-Paar mit dem größten Wert.
 * Falls das Objekt leer ist, wird `null` zurückgegeben.
 */
function get_highscore(scores) {
	let winner = null
	let highscore = -Infinity

	for (const name in scores) {
		const score = scores[name]
		if (score > highscore) {
			winner = name
			highscore = score
		}
	}

	if (winner === null) {
		return null
	}

	return [winner, highscore]
}

/* ------ TESTS ------ */

const scores = {
	alexei: 55,
	mariana: 142,
	tariq: 42,
	lian: 26,
	sofia: 79,
	kenji: 24,
	amara: 453,
	mateo: 278,
	noura: 141,
	elias: 199,
}

// [ 'amara', 453 ]
console.info(get_highscore(scores))
