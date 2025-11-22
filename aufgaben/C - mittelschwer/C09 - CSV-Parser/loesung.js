/**
 * Wandelt einen Text vom CSV-Format in ein Array von Objekten.
 */
function basic_CSV_parser(csv) {
	const lines = csv.split("\n").filter((t) => t.length > 0)
	if (lines.length === 0) return []

	const columns = lines[0].split(",")

	const result = []

	for (const line of lines.slice(1)) {
		const fields = line.split(",")
		const obj = Object.fromEntries(columns.map((col, i) => [col, fields[i]]))
		result.push(obj)
	}

	return result
}

/* ------ TESTS ------ */

const csv = `
name,age,city
Manfred,30,Berlin
Maria,25,Göttingen
`

/*
[
  { name: 'Manfred', age: '30', city: 'Berlin' },
  { name: 'Maria', age: '25', city: 'Göttingen' }
]
*/
console.info(basic_CSV_parser(csv))
