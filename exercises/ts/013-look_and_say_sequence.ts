/*
Aufgabe: Implementiere eine Funktion, welche die ersten n Glieder der Conway-Folge
ausgibt. Die Idee ist, dass jedes Folgenglied das Vorherige "vorliest".

Wir starten mit "1".
"1" besteht aus einer (1) Eins (1) ---> "11".
"11" besteht aus zwei (2) Einsen (1) ---> "21".
"21" besteht aus einer Zwei und einer Eins ---> "1211".
"1211" besteht aus einer Eins, einer Zwei, zwei Einsen ---> "111221"
usw.

Beispiel:

look_and_say(10)

soll Folgendes ausgeben:

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

Themen: Mathematik, Strings, Schleifen 
*/

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
