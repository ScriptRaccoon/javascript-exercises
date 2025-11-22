/**
 * Liste der Leute, deren Informationen abgerufen werden können:
 * Name, Alter, Land.
 */
const people = [
	{ name: "Alexei", age: 21, country: "Russia" },
	{ name: "Mariana", age: 27, country: "Brazil" },
	{ name: "Tariq", age: 24, country: "Jordan" },
	{ name: "Lian", age: 22, country: "China" },
	{ name: "Sofia", age: 29, country: "Spain" },
	{ name: "Kenji", age: 26, country: "Japan" },
	{ name: "Amara", age: 23, country: "Nigeria" },
	{ name: "Mateo", age: 28, country: "Argentina" },
	{ name: "Noura", age: 25, country: "Saudi Arabia" },
	{ name: "Elias", age: 30, country: "Lebanon" },
]

/**
 * Beantwortet eine *einfache* Frage zu den Leuten in der Konsole.
 */
function ask(question: string): void {
	const person = people.find((p) => question.includes(p.name))
	if (!person) {
		console.info("Sorry, but I cannot help you with that question.")
		return
	}

	const q = question.toLowerCase()

	const asks_for_age = q.includes("age") || q.includes("old")
	const asks_for_country = q.includes("country") || q.includes("where")

	if (asks_for_age && !asks_for_country) {
		const answer = `${person.name} is ${person.age} years old.`
		console.info(answer)
	} else if (!asks_for_age && asks_for_country) {
		const answer = `${person.name} comes from ${person.country}.`
		console.info(answer)
	} else if (asks_for_age && asks_for_country) {
		const answer = `${person.name} comes from ${person.country} and is ${person.age} years old.`
		console.info(answer)
	} else {
		console.info(`What do you want to know exactly about ${person.name}?`)
	}
}

/* ------ TESTS ------ */

ask("Where does Noura come from?")
// Noura comes from Saudi Arabia.

ask("How old is Kenji? And where does he live?")
// Kenji comes from Japan and is 26 years old.

ask("In which country is Sofia living?")
// Sofia comes from Spain.

ask("Tell me the age of Mateo.")
// Mateo is 28 years old.

ask("Where does Hank come from?")
// Sorry, but I cannot help you with that question.

ask("Tell me something about Lian.")
// What do you want to know exactly about Lian?

ask("I want to know where Lian is coming from.")
// Lian comes from China.
