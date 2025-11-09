/**
 * Druckt die ersten n Glieder der Conway-Folge
 * {@link https://en.wikipedia.org/wiki/Look-and-say_sequence}
 */
function look_and_say(n: number) {
	let str = ""

	for (let i = 0; i < n; i++) {
		str = get_next(str)
		console.info(str)
	}
}

/**
 * Bestimmt den jeweils nächsten Eintrag der Conway-Folge.
 */
function get_next(str: string): string {
	if (!str.length) return "1"

	const occurances: [string, number][] = []

	for (const char of str) {
		const previous = occurances.at(-1)
		if (previous?.[0] === char) {
			previous[1]++
		} else {
			occurances.push([char, 1])
		}
	}

	return occurances.map(([char, freq]) => `${freq}${char}`).join("")
}

/* ------ TESTS ------ */
look_and_say(10)
