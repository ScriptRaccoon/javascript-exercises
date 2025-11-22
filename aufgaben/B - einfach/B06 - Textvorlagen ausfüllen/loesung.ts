/**
 * Füllt eine Textvorlage mit Werten aus einem Datenobjekt aus.
 */
function fill_template<T extends { toString: () => string }>(
	txt: string,
	data: Record<string, T>,
): string {
	let result = txt
	for (const key of Object.keys(data)) {
		result = result.replaceAll(
			`{{ ${key} }}`,
			data[key as keyof typeof data].toString(),
		)
	}
	return result
}

/* ------ TESTS ------ */

const txt = "Hallo {{ first_name }} {{ last_name }}, willkommen im Jahr {{ year }}."
const data = { first_name: "Gregor", last_name: "Samsa", year: 1912 }

// "Hallo Gregor Samsa, willkommen im Jahr 1912."
console.info(fill_template(txt, data))
