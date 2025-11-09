/**
 * Bestimmt den Buchstaben, der am häufigsten vorkommt, inkl. Häufigkeit.
 */
function most_frequent_letter(
	str: string,
): { letter: string; frequency: number } | undefined {
	const frequencies: Record<string, number> = {}

	let best: { letter: string; frequency: number } | undefined = undefined

	const regex = /^[a-zA-Z]$/

	for (const letter of str) {
		if (!regex.test(letter)) continue
		frequencies[letter] = (frequencies[letter] ?? 0) + 1
		if (!best || frequencies[letter] > best.frequency) {
			best = { letter, frequency: frequencies[letter] }
		}
	}

	return best
}

/* ------ TESTS ------ */
console.info(most_frequent_letter("abba: dancing queen (1976)"))
console.info(most_frequent_letter("0000xyxyxy0000"))
console.info(most_frequent_letter("110"))
