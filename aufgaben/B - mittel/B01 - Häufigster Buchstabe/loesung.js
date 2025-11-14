/**
 * Bestimmt den Buchstaben, der am häufigsten vorkommt, inkl. Häufigkeit.
 */
function most_frequent_letter(str) {
	const frequencies = {}

	let best = undefined

	for (const letter of str) {
		if (!/[a-zA-Z]/.test(letter)) continue
		frequencies[letter] = (frequencies[letter] ?? 0) + 1
		if (!best || frequencies[letter] > best.frequency) {
			best = { letter, frequency: frequencies[letter] }
		}
	}

	return best
}

/* ------ TESTS ------ */

// { letter: 'a', frequency: 3 }
console.info(most_frequent_letter("abba: dancing queen (1976)"))

// { letter: 'x', frequency: 2 }
console.info(most_frequent_letter("0000xyxy"))

// undefined
console.info(most_frequent_letter("110"))
