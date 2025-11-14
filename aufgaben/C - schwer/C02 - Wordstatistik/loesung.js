import { readFileSync } from "fs"

/**
 * Liste von gängigen Wörtern in der deutschen Sprache
 * (z. B. Präpositionen, Artikel und Konjunktionen)
 */
const COMMON_WORDS_DE = JSON.parse(readFileSync("./common-words.de.json", "utf8"))

/**
 * Ermittelt alle Wörter und ihre Häufigkeiten in einem deutschsprachigen Text.
 * Optional werden allgemein übliche Wörter oder im Text zu selten vorkommende
 * Wörter herausgefiltert.
 */
function word_stats(txt, options = {}) {
	const word_list = txt.match(/[A-Za-zÀ-ÖØ-öø-ÿß-]+/g)?.filter((w) => w.length > 1)
	if (!word_list) {
		return {
			words_total: 0,
			words_unique: 0,
			words_with_frequencies: [],
		}
	}

	const frequencies = {}

	for (const word of word_list) {
		if (
			options.exclude_common_words &&
			COMMON_WORDS_DE.includes(word.toLowerCase())
		) {
			continue
		}

		frequencies[word] = (frequencies[word] ?? 0) + 1
	}

	const words_with_frequencies = Object.entries(frequencies)
		.filter((a) => a[1] >= (options.min_frequency ?? 0))
		.sort((a, b) => b[1] - a[1])

	return {
		words_total: word_list.length,
		words_unique: new Set(word_list).size,
		words_with_frequencies,
	}
}

/* ------ TESTS ------ */

const sample_txt = `JavaScript (kurz JS) ist eine Skriptsprache, die ursprünglich 1995
von Netscape für dynamisches HTML in Webbrowsern entwickelt wurde, um Benutzerinteraktionen
auszuwerten, Inhalte zu verändern, nachzuladen oder zu generieren und so die Möglichkeiten
von HTML zu erweitern. Heute wird JavaScript auch außerhalb von Browsern angewendet,
etwa auf Servern und in Microcontrollern.`

/*
{
  words_total: 49,
  words_unique: 40,
  words_with_frequencies: [
    [ 'von', 3 ],
    [ 'zu', 3 ],
    [ 'JavaScript', 2 ],
    [ 'die', 2 ],
    [ 'HTML', 2 ],
    [ 'in', 2 ],
    [ 'und', 2 ],
    ...
  ]
}
*/
console.info(word_stats(sample_txt))

/*
{
  words_total: 49,
  words_unique: 40,
  words_with_frequencies: [ [ 'JavaScript', 2 ], [ 'HTML', 2 ] ]
}
*/
console.info(word_stats(sample_txt, { exclude_common_words: true, min_frequency: 2 }))

/**
 * Quelle: {@link https://www.gesetze-im-internet.de/gg/GG.pdf}
 */
const grundgesetz_text = readFileSync("./grundgesetz.txt", "utf8")

/*
{
  words_total: 22827,
  words_unique: 3634,
  words_with_frequencies: [
    [ 'Art', 225 ],
    [ 'Länder', 158 ],
    [ 'Artikel', 134 ],
    [ 'Bund', 125 ],
    [ 'Zustimmung', 119 ],
    [ 'Bundesrates', 116 ],
    [ 'Bundesgesetz', 107 ],
    [ 'Absatz', 98 ],
    [ 'Bundes', 93 ],
    [ 'Ländern', 88 ],
    [ 'Bundesregierung', 87 ],
    [ 'Satz', 78 ],
    [ 'Abs', 76 ],
    [ 'können', 76 ],
    [ 'Gesetz', 70 ],
    [ 'Recht', 69 ],
    [ 'Bundestag', 65 ],
    [ 'Bundestages', 62 ],
    [ 'Gemeinden', 55 ],
    [ 'Nähere', 52 ],
    [ 'Grund', 50 ]
  ]
}
*/
console.info(
	word_stats(grundgesetz_text, {
		exclude_common_words: true,
		min_frequency: 50,
	}),
)
