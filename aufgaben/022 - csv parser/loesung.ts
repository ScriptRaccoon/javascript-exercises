/**
 * Wandelt einen Text vom CSV-Format in ein Objekt um.
 */
function basic_CSV_parser(csv: string) {
	const lines = csv.split("\n").filter((t) => t.length > 0)
	if (lines.length === 0) throw new Error("No line detected")

	const columns = lines[0].split(",")
	const result: Record<string, string>[] = []

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

console.info(basic_CSV_parser(csv))
