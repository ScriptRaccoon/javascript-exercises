/*
Aufgabe: Entwickle einen einfachen CSV-Parser, das heißt eine Funktion,
die einen Text im tabellarischen CSV-Format entgegennimmt und ein Objekt
daraus erzeugt, dessen Schlüssel die Einträge der ersten Zeile sind.
Als Trennzeichen zwischen den Einträgen wird ein Komma verwendet.
Randfälle (Felder in Anführungsstrichen, Kommata in den Feldern, usw.)
können ignoriert werden. Formatierungsfehler müssen auch nicht strikt
behandelt werden. Mache es dir so einfach wie möglich hier! Für
wasserdichte CSV-Parser verwendet man ohnehin am besten eine Bibliothek.

Beispiel:

const csv = `
name,age,city
Manfred,30,Berlin
Maria,25,Göttingen
`

basic_CSV_parser(csv) == [
  { name: 'Manfred', age: '30', city: 'Berlin' },
  { name: 'Maria', age: '25', city: 'Göttingen' }
]

Themen: Strings, Arrays, Objekte
*/

/**
 * Wandelt einen Text vom CSV-Format in ein Objekt um.
 */
function basic_CSV_parser(csv) {
	const lines = csv.split("\n").filter((t) => t.length > 0)
	if (lines.length === 0) throw new Error("No line detected")

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

console.info(basic_CSV_parser(csv))
