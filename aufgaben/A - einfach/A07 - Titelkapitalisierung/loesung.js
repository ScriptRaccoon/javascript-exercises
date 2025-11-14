/**
 * Wandelt ein Wort in das großgeschriebene Wort um.
 */
function capitalize(word) {
	if (word.length === 0) return word
	return `${word[0].toUpperCase()}${word.substring(1)}`
}

/**
 * Wandelt einen Text in Title Case um, mit einer optionalen Liste von Ausnahmen.
 * vgl. {@link https://en.wikipedia.org/wiki/Title_case}.
 */
function to_title_case(str, exceptions = []) {
	return str
		.split(" ")
		.map((word) => (exceptions.includes(word) ? word : capitalize(word)))
		.join(" ")
}

/* ------ TESTS ------ */

// "How the Trump Administration Is Giving Even More Tax Breaks to the Wealthy"
console.info(
	to_title_case(
		"How the Trump administration is giving even more tax breaks to the wealthy",
		["to", "the"],
	),
)

// "Eine Neue S-Bahnlinie Wird in Berlin Eröffnet"
console.info(to_title_case("Eine neue S-Bahnlinie wird in Berlin eröffnet", ["in"]))
