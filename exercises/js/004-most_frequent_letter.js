/*
Aufgabe: Implementiere eine Funktion, die möglichst effizient für eine
Zeichenabfolge den Buchstaben (a-z, A-Z) ausgibt,
der am häufigsten darin vorkommt, zusammen mit seiner Häufigkeit.
Wenn dabei mehrere Buchstaben in Frage kommen, gewinnt derjenige,
der als erstes vorgekommen ist.

Beispiel:

most_frequent_letter("abba: dancing queen (1976)") = {letter: "a": frequency: 3}

Die Funktion gibt 'undefined' zurück, wenn die Zeichenabfolge keinen Buchstaben beinhaltet.

most_frequent_letter('110') = undefined

Wichtig: Die Zeichenabfolge soll nur einmal durchlaufen werden!

Themen: Laufzeitanalyse, Schleifen, regulärer Ausdruck, Optimierungsproblem,
Fallunterscheidungen
*/

/**
 * Bestimmt den Buchstaben, der am häufigsten vorkommt, inkl. Häufigkeit.
 */
function most_frequent_letter(str) {
	const frequencies = {}

	let best = undefined

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
