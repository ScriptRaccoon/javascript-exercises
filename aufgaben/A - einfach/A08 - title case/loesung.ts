/**
 * Wandelt einen Text in "Title Case" um, mit einer optionalen Liste von Ausnahmen.
 * {@link https://en.wikipedia.org/wiki/Title_case}
 */
function to_title_case(str: string, exceptions: string[] = []): string {
	return str
		.split(" ")
		.map((word) =>
			!exceptions.includes(word) && word.length > 0
				? `${word[0].toUpperCase()}${word.substring(1)}`
				: word,
		)
		.join(" ")
}

/* ------ TESTS ------ */
const heading =
	"How the Trump administration is giving even more tax breaks to the wealthy"
const exceptions = ["to", "the"]
console.info(to_title_case(heading, exceptions))

console.info(to_title_case("Eine neue S-Bahnlinie wird in Berlin eröffnet", ["in"]))
