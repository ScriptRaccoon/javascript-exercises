/**
 * Gibt die Liste aller in einem Text enthaltenen Zahlen aus.
 */
function extract_numbers(str) {
	const matches = str.match(/-?\d+(\.\d+)?/g)
	if (!matches) return []
	return matches.map(Number)
}

/* ------ TESTS ------ */
const text = `
Rechnung Nr. 108421
2 Artikel à 19.99 €
Rückerstattung: -5.25 €`
console.info(extract_numbers(text))
