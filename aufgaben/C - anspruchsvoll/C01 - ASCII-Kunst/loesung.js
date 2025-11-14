/**
 * Summe aller Elemente eines Arrays.
 */
function sum(arr) {
	return arr.reduce((prev, acc) => prev + acc, 0)
}

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
const CHARACTER_GAP = 3

const CHARACTER_CONFIG = [
	{ char: "a", width: 8 },
	{ char: "b", width: 8 },
	{ char: "c", width: 8 },
	{ char: "d", width: 8 },
	{ char: "e", width: 8 },
	{ char: "f", width: 8 },
	{ char: "g", width: 8 },
	{ char: "h", width: 8 },
	{ char: "i", width: 2 },
	{ char: "j", width: 8 },
	{ char: "k", width: 8 },
	{ char: "l", width: 8 },
	{ char: "m", width: 8 },
	{ char: "n", width: 8 },
	{ char: "o", width: 8 },
	{ char: "p", width: 8 },
	{ char: "q", width: 8 },
	{ char: "r", width: 8 },
	{ char: "s", width: 8 },
	{ char: "t", width: 8 },
	{ char: "u", width: 8 },
	{ char: "v", width: 8 },
	{ char: "w", width: 8 },
	{ char: "x", width: 8 },
	{ char: "y", width: 8 },
	{ char: "z", width: 8 },
	{ char: " ", width: 2 },
	{ char: ".", width: 4 },
	{ char: "!", width: 4 },
	{ char: "?", width: 8 },
]

const CHARACTER_LINES = CHARACTERS_ART.split("\n").filter((line) => line.length > 0)

console.assert(CHARACTER_LINES.length === CHARACTER_HEIGHT, "Art has incorrect height")

console.assert(
	CHARACTER_LINES.every(
		(line) =>
			line.length ===
			sum(CHARACTER_CONFIG.map((item) => item.width + CHARACTER_GAP)),
	),
	"Art has incorrect width",
)

/**
 * Schreibt einen Text als ASCII-Art in die Konsole.
 */
function write(text) {
	const lines = new Array(CHARACTER_HEIGHT).fill("")

	for (const char of text) {
		const index = CHARACTER_CONFIG.findIndex((item) => item.char === char)
		if (index < 0) continue

		const start_pos = sum(
			CHARACTER_CONFIG.slice(0, index).map((item) => item.width + CHARACTER_GAP),
		)
		const end_pos = start_pos + CHARACTER_CONFIG[index].width + CHARACTER_GAP

		for (let i = 0; i < lines.length; i++) {
			lines[i] += CHARACTER_LINES[i].slice(start_pos, end_pos)
		}
	}

	for (const line of lines) {
		console.info(line)
	}
}

/* ------ TESTS ------ */

/*
 
      **     ****     **    **     ****     ********    ******    ******     **   *******    ********    **    
      **    **  **    **    **    **  **    **    **   **    **   **   **    **   **    **      **       **    
      **   **    **   **    **   **    **   **         **         **   **    **   **    **      **       **    
      **   ********   **    **   ********   ********   **         *****      **   *******       **       **    
**    **   **    **    **  **    **    **         **   **         **  **     **   **            **       **    
**    **   **    **     ****     **    **   **    **   **    **   **   **    **   **            **             
********   **    **      **      **    **   ********    ******    **    **   **   **            **       ** 
 
*/
write("javascript!")

/*
 
**    **   ********   ******          ******       ****     **    **   **   ********   
**    **   **         **   **         **   ***    **  **    ***  ***   **      **      
**    **   **         **   **         **    **   **    **   ** ** **   **      **      
********   ********   *****           **    **   ********   **    **   **      **      
**    **   **         **  **          **    **   **    **   **    **   **      **      
**    **   **         **   **         **   ***   **    **   **    **   **      **      
**    **   ********   **    **        ******     **    **   **    **   **      **    
 
*/
write("her damit")
