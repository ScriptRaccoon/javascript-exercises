/*
Aufgabe: Implementiere eine Funktion, die ein Wort als ASCII-Art in die Konsole schreibt.

Beispiel:

write("javascript")

soll Folgendes ausgeben:

      **     ****     **    **     ****     ********    ******    ******     **   *******    ********   
      **    **  **    **    **    **  **    **    **   **    **   **   **    **   **    **      **      
      **   **    **   **    **   **    **   **         **         **   **    **   **    **      **      
      **   ********    **  **    ********   ********   **         *****      **   *******       **      
**    **   **    **     *  *     **    **         **   **         **  **     **   **            **      
**    **   **    **      **      **    **   **    **   **    **   **   **    **   **            **      
********   **    **      **      **    **   ********    ******    **    **   **   **            **      

Wie die Buchstaben im Einzelnen aussehen, ist dir überlassen. Wichtig ist nur,
dass sie gleich hoch (nicht unbedingt gleich breit) sind und stets nebeneinander
geschrieben werden.

Themen: Strings, String-Methoden, Schleifen
*/

/**
 * ASCII-Zeichnung von diversen Zeichen (Buchstaben + Interpunktion)
 */
const CHARACTERS_ART = `
  ****     *******     ******    ******     ********   ********    ******    **    **   **         **   **    **   **         **    **   **    **    ******    *******     *****     ******     ********   ********   **    **   **    **   **    **   **    **   **    **   ********                **     ******    
 **  **    **   ***   **    **   **   ***   **         **         **    **   **    **   **         **   **   **    **         ***  ***   ***   **   **    **   **    **   **   **    **   **    **    **      **      **    **   **    **   **    **    **  **     **  **          **                **    **    **   
**    **   **    **   **         **    **   **         **         **         **    **   **         **   **  **     **         ** ** **   ** *  **   **    **   **    **   **   **    **   **    **            **      **    **   **    **   **    **     ****       ****         ***                 **          **   
********   ******     **         **    **   ********   *******    **  ****   ********   **         **   ****       **         **    **   **  * **   **    **   *******    **   **    *****      ********      **      **    **   **    **   **    **      **         **         **                   **        ***    
**    **   **    **   **         **    **   **         **         **    **   **    **   **   **    **   **  **     **         **    **   **   ***   **    **   **         **  ***    **  **           **      **      **    **    **  **    ** ** **     ****       **        ***                    **       **      
**    **   **   ***   **    **   **   ***   **         **         **    **   **    **   **   **    **   **   **    **         **    **   **    **   **    **   **         **   **    **   **    **    **      **      **    **     ****     ***  ***    **  **     **        **                                       
**    **   ******      ******    ******     ********   **          ******    **    **   **   ********   **    **   ********   **    **   **    **    ******    **          **** **   **    **   ********      **       ******       **      **    **   **    **   **         ********         **     **       **      
`

const CHARACTER_HEIGHT = 7
const DEFAULT_CHARACTER_WIDTH = 8
const CHARACTER_GAP = 3

const CHARACTERS_CONFIG: readonly { char: string; width: number }[] = [
	{ char: "a" },
	{ char: "b" },
	{ char: "c" },
	{ char: "d" },
	{ char: "e" },
	{ char: "f" },
	{ char: "g" },
	{ char: "h" },
	{ char: "i", width: 2 },
	{ char: "j" },
	{ char: "k" },
	{ char: "l" },
	{ char: "m" },
	{ char: "n" },
	{ char: "o" },
	{ char: "p" },
	{ char: "q" },
	{ char: "r" },
	{ char: "s" },
	{ char: "t" },
	{ char: "u" },
	{ char: "v" },
	{ char: "w" },
	{ char: "x" },
	{ char: "y" },
	{ char: "z" },
	{ char: " ", width: 2 },
	{ char: ".", width: 4 },
	{ char: "!", width: 4 },
	{ char: "?" },
].map((c) => ({ char: c.char, width: c.width ?? DEFAULT_CHARACTER_WIDTH }))

const CHARACTER_LINES = CHARACTERS_ART.split("\n").filter((line) => line.length > 0)

console.assert(CHARACTER_LINES.length === CHARACTER_HEIGHT, "Art has incorrect height")

console.assert(
	CHARACTER_LINES.every(
		(line) =>
			line.length ===
			sum(CHARACTERS_CONFIG.map((item) => item.width + CHARACTER_GAP)),
	),
	"Art has incorrect width",
)

/**
 * Schreibt einen Text als ASCII-Art in die Konsole.
 */
function write(text: string) {
	const lines = new Array(CHARACTER_HEIGHT).fill("")

	for (const char of text) {
		const index = CHARACTERS_CONFIG.findIndex((item) => item.char === char)
		if (index < 0) continue

		const start = sum(
			CHARACTERS_CONFIG.slice(0, index).map((item) => item.width + CHARACTER_GAP),
		)
		const end = start + CHARACTERS_CONFIG[index].width + CHARACTER_GAP

		for (let i = 0; i < lines.length; i++) {
			lines[i] += CHARACTER_LINES[i].slice(start, end)
		}
	}

	for (const line of lines) {
		console.info(line)
	}
}

/**
 * Schreibt einen mehrzeiligen Text als ASCII-Art in die Konsole.
 */
function write_texts(texts: string[]) {
	for (const text of texts) {
		write(text)
		console.info("\n")
	}
}

/**
 * Summe aller Elemente eines Arrays.
 */
function sum(arr: number[]): number {
	return arr.reduce((prev, acc) => prev + acc, 0)
}

// TESTS
write_texts(["javascript", "ist nice.", "checkst du?"])
