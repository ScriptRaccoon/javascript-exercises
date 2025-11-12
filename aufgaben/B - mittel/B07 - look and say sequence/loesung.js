/**
 * Druckt die ersten n Einträge der Conway-Folge in die Konsole.
 * vgl. {@link https://en.wikipedia.org/wiki/Look-and-say_sequence}.
 */
function look_and_say(n) {
	let str = "1"

	for (let i = 0; i < n; i++) {
		console.info(str)
		str = get_next(str)
	}
}

/**
 * Bestimmt den jeweils nächsten Eintrag der Conway-Folge.
 */
function get_next(str) {
	const occurances = []

	for (const char of str) {
		const previous = occurances.at(-1)
		if (previous?.[0] === char) {
			previous[1]++
		} else {
			occurances.push([char, 1])
		}
	}

	return occurances.map(([char, freq]) => freq + char).join("")
}

/* ------ TESTS ------ */

/*
1
11
21
1211
111221
312211
13112221
1113213211
31131211131221
13211311123113112211
*/
look_and_say(10)
