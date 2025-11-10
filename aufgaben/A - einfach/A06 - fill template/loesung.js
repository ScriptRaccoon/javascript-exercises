/**
 * Füllt eine Textvorlage mit Werten
 */
function fill_template(txt, data) {
	let result = txt
	for (const key of Object.keys(data)) {
		result = result.replaceAll(`{{ ${key} }}`, data[key].toString())
	}
	return result
}

/* ------ TESTS ------ */

const txt = "Hallo {{ first_name }} {{ last_name }}, willkommen im Jahr {{ year }}."
const data = { first_name: "Gregor", last_name: "Samsa", year: 1912 }
console.info(fill_template(txt, data))
