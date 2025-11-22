/**
 * Bestimmt die Häufigkeit eines Buchstabens in einem String.
 */
function frequency(input: string, letter: string): number {
	let res = 0
	for (const char of input) {
		if (char === letter) res++
	}
	return res
}

/**
 * Bestimmt die Häufigkeit eines Buchstabens in einem String.
 * Alternative Implementierung mit Umweg über ein Array.
 */
function frequency_concise(input: string, letter: string): number {
	return [...input].filter((char) => char === letter).length
}

/* ------ TESTS ------ */

console.info(frequency("hallo", "h")) // 1
console.info(frequency("hallo", "l")) // 2
console.info(frequency("hallo", "o")) // 1
console.info(frequency("hallo", "r")) // 0

console.info(frequency("javascript", "a")) // 2
console.info(frequency("javascript", "h")) // 0
