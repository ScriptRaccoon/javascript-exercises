/*
Aufgabe: Schreibe eine Funktion, welche die Wörter in einem deutschen Text analysiert.
Berechnet werden ...
- die Anzahl aller Wörter
- die Anzahl der unterschiedlichen Wörter
- die sortierte Liste aller unterschiedlichen Wörter mit ihren Häufigkeiten

Beispiel:

const sample_txt = `
JavaScript (kurz JS) ist eine Skriptsprache, die ursprünglich 1995 von Netscape für
dynamisches HTML in Webbrowsern entwickelt wurde, um Benutzerinteraktionen auszuwerten,
Inhalte zu verändern, nachzuladen oder zu generieren und so die Möglichkeiten von HTML
zu erweitern. Heute wird JavaScript auch außerhalb von Browsern angewendet, etwa auf
Servern und in Microcontrollern.
`

word_stats(sample_txt) == {
  words_total: 49,
  words_unique: 40,
  words: [
    { word: 'von', frequency: 3 },
    { word: 'zu', frequency: 3 },
    { word: 'JavaScript', frequency: 2 },
    { word: 'die', frequency: 2 },
    { word: 'HTML', frequency: 2 },
    ...
	...
	...
  ]
}

Wichtig:
- Satzzeichen werden ignoriert.
- Wörter mit Umlauten werden unterstützt.

Bonus: Verbessere die Funktion, indem unwesentliche Wörter (z. B. Präpositionen, Artikel,
Konjunktionen) herausgefiltert werden, damit das Thema des Ausgangstextes besser
ersichtlich wird. Übergib außerdem einen optionalen weiteren Parameter für die
Mindesthäufigkeit der angezeigten Wörter.
  
Beispiel (mit obigem Beispieltext):

word_stats(sample_txt, { exclude_common_words: true, min_frequency: 2 }) = {
  words_total: 49,
  words_unique: 40,
  words: [
    { word: 'JavaScript', frequency: 2 },
    { word: 'HTML', frequency: 2 }
  ]
}

Themen: Strings, Arrays, Objekte, reguläre Ausdrücke, Sortierung, Optionsobjekt
*/

const COMMON_WORDS_DE = [
	"und",
	"oder",
	"nicht",
	"der",
	"die",
	"das",
	"dass",
	"den",
	"dem",
	"er",
	"sie",
	"es",
	"wer",
	"wie",
	"was",
	"zu",
	"hat",
	"ist",
	"gibt",
	"wird",
	"werden",
	"sind",
	"war",
	"sich",
	"ein",
	"eine",
	"einer",
	"eines",
	"einen",
	"einem",
	"ihr",
	"ihre",
	"ihrer",
	"ihren",
	"ihres",
	"ihrem",
	"sein",
	"seine",
	"seinen",
	"seines",
	"seiner",
	"seinem",
	"man",
	"als",
	"nur",
	"ob",
	"dann",
	"denn",
	"doch",
	"jedoch",
	"noch",
	"viel",
	"an",
	"da",
	"dort",
	"hier",
	"von",
	"aber",
	"in",
	"im",
	"ins",
	"aus",
	"bis",
	"mit",
	"für",
	"bei",
	"auf",
	"über",
	"nach",
	"dabei",
	"damit",
	"sogar",
	"schon",
	"auch",
	"wenn",
	"während",
	"keine",
	"sehr",
	"wieder",
	"kann",
	"oft",
	"geht",
	"so",
	"sei",
]

/**
 * Ermittelt alle Wörter und ihre Häufigkeiten in einem deutschen Text.
 * Optional werden allgemein übliche Wörter oder im Text zu selten vorkommende
 * Wörter herausgefiltert.
 */
function word_stats(txt, options) {
	const word_list = txt.match(/[A-Za-zÀ-ÖØ-öø-ÿß]+/g)
	if (!word_list)
		return {
			words_total: 0,
			words_unique: 0,
			words: [],
		}

	const unique_words = [...new Set(word_list)]

	const frequencies = {}

	for (const word of word_list) {
		if (
			options.exclude_common_words &&
			COMMON_WORDS_DE.includes(word.toLowerCase())
		) {
			continue
		}

		if (word in frequencies) {
			frequencies[word]++
		} else {
			frequencies[word] = 1
		}
	}

	const words_with_frequencies = Object.entries(frequencies)
		.filter((a) => a[1] >= (options.min_frequency ?? 0))
		.sort((a, b) => b[1] - a[1])
		.map((a) => ({ word: a[0], frequency: a[1] }))

	return {
		words_total: word_list.length,
		words_unique: unique_words.length,
		words: words_with_frequencies,
	}
}

/* ------ TESTS ------ */

const sample_txt = `
JavaScript (kurz JS) ist eine Skriptsprache, die ursprünglich 1995 von Netscape für
dynamisches HTML in Webbrowsern entwickelt wurde, um Benutzerinteraktionen auszuwerten,
Inhalte zu verändern, nachzuladen oder zu generieren und so die Möglichkeiten von HTML
zu erweitern. Heute wird JavaScript auch außerhalb von Browsern angewendet, etwa auf
Servern und in Microcontrollern.
`

console.info(word_stats(sample_txt, { exclude_common_words: true, min_frequency: 2 }))

/**
 * Artikel aus der SZ:
 * {@link https://www.sueddeutsche.de/wirtschaft/hunde-haltung-kosten-li.3333655}
 */
const sample_article = `
„Mein Ein und Alles“ – Was Hunde kosten

Tierliebhaber, die sich einen Hund zulegen, ahnen oft nicht, wie kostspielig das werden kann. Es ist ein Milliardengeschäft. Doch die Halter bekommen auch Wertvolles zurück.

Von Hendrik Munsberg

Wie viel ist ein Hund wert, was darf er kosten? Lea Schütz, 29, muss keine Sekunde überlegen. Über ihre Terrier-Mischlingshündin Papaya sagt sie: „Sie ist mein Ein und Alles“. Schütz arbeitet als Volontärin bei einer Zeitung, und Anlass zu Überschwang gibt es in ihrem Job eher selten.
Doch Schütz und Papaya verbindet eine herzergreifende Geschichte, Schauplatz war Kolumbien, im Norden Südamerikas: Während ihres Auslandssemesters in Bogotá machten Schütz und ihre Kommilitonen einen Tagesausflug zu einem Bergdorf und stießen dabei auf ein verwaistes Hundebaby, ein wimmerndes Häufchen Elend.

Aber „niemand“, so Schütz, „wollte das arme Tier aufnehmen oder sich darum kümmern“. Nur sie „ertrug das nicht“. Also beschloss sie, die erbarmungswürdige Kreatur mit nach Deutschland zu nehmen, und scheute weder Mühen noch Kosten. Typisch Hundeliebhaberin.
Heute zählt Papaya zu den rund zehn Millionen Hunden, die in deutschen Städten und Dörfern morgens und abends von ihren Besitzerinnen oder Besitzern Gassi geführt werden. Schütz und ihr Terrier-Mischling leben in einer WG in München.

Das Ungewöhnliche dabei: Während viele Hundehalter sehr bald zu spüren bekommen, dass ihr Tier beträchtliche Kosten verursacht – beispielsweise für Futter, Medikamente oder Betreuung – machte Schütz eine angenehme Erfahrung: Die Journalistin schaffte es problemlos, die Bedürfnisse ihrer Hündin mit den Anforderungen ihres stressigen Berufslebens in Einklang zu bringen. Und, besonders erstaunlich: Papaya, ihr „Ein und Alles“, verursachte dabei kaum größere Ausgaben.
Wie das funktioniert? Zweimal die Woche, bevor Schütz zur Arbeit geht, bringt sie Papaya zu einer Hundesitterin, die für die Betreuung kein Geld verlangt. Möglich macht das eine Art Dating-Plattform, die Hundebesitzer und Hundefreunde miteinander vernetzt. An den übrigen Werktagen bleibt das Tier in der WG. Hat Papaya Glück, dann geht einer der Mitbewohner mit ihr Gassi. Und wenn nicht? Egal, sie gilt als „duldsam und anpassungsfähig“.

Selbst die Urlaubsplanung ist für Schütz unkompliziert und die Hundebetreuung wiederum gratis. „Meine Eltern“, sagt sie, „lieben Papaya abgöttisch“. Günstiger geht es nicht.

„Wird der Hund oft krank, dann wird es teuer“

Doch dann machte auch Schütz eine unangenehme Erfahrung: Papaya litt an einer Bindehautentzündung. Sie musste zum Tierarzt, einem Augenspezialisten. Der stellte für die Behandlung prompt 600 Euro in Rechnung. Ein anderes Mal war, ausgerechnet sonntags, ein Besuch beim Tierarzt notwendig. Schon wurde die gesetzlich vorgeschriebene pauschale „Notdienstgebühr“ von 50 Euro extra fällig. Dann, so Schütz, koste es „schnell mal 200 bis 400 Euro“.

Eine von zehn Millionen in Deutschland: Die Terrier-Mischlingshündin Papaya .

Von da an war ihr klar: „Wird der Hund oft krank, dann wird es teuer“. Papaya wird im Dezember vier Jahre alt. Nun erwägt Schütz, eine Tierkrankenversicherung abzuschließen. Willkommen in einer Realität, in der viele Hundeliebhaber immer wieder erleben, dass ihre Vierbeiner erhebliche Kosten verursachen. Sie nähren damit eine Milliarden-Branche.

Für Menschen, die sich mit dem Gedanken tragen, einen Hund oder eine Hündin anzuschaffen, hat der Haustierbedarf-Anbieter „Zoo Royal“ eine plausibel erscheinende Kostenübersicht zusammengestellt. Zur Einstimmung heißt es da: Natürlich könne ein eigener Hund „das Leben bereichern“. Doch sogleich folgt die Mahnung: Ein Hund sei „nicht nur eine emotionale, sondern auch eine finanzielle Verpflichtung.“

Was das in der Praxis bedeuten kann, zeigt das Zahlenwerk, das Preisspannen als Orientierungsgrößen aufführt (siehe Tabelle). Schon die Anschaffung eines Hundes kostet zwischen 100 und 4000 Euro – je nachdem, ob man ihn aus dem Tierheim holt oder bei einem Züchter kauft. Auch die Grundausstattung kann mit erheblichen Ausgaben verbunden sein – beispielsweise für Halsband, Leine, Spielzeug und „Kauartikel“; oder für ein Trenngitter im Auto.

„Zoo Royal“ ist ein gewinnorientiertes Unternehmen. Einen ähnlichen Kostenüberblick findet man im Netz vom Konkurrenten „Fressnapf“. Doch es geht vermutlich auch günstiger, wenn man Gebrauchtes kauft oder Preisvergleiche mit anderen Anbietern anstellt. Vielleicht gibt es sogar einen individuellen Tierbedarfsladen in der Nähe?

Kaum vermeidbar sind die Tierarztbesuche, die häufig mit erheblichen Kosten verbunden sind. Und was ist mit einer Haftpflichtversicherung, für den Fall, dass der Hund größere finanzielle Schäden verursachen sollte? Dann ist da noch die Hundesteuer, die in deutschen Gemeinden sehr unterschiedlich ausfällt. In München sind es derzeit jährlich 100 Euro, wenn man nur einen Hund besitzt. Deutlich mehr kosten „Listenhunde“, also Rassen, die als gefährlich gelten. In Magdeburg beispielsweise sind dafür 500 Euro fällig.

Hundeliebhaber sind keine scharfen Kostenrechner

Summa summarum stehen jährliche Gesamtkosten zu Buche, die sich in einer Spanne zwischen rund 1600 und 3500 Euro bewegen. Als Orientierungswerte sind sie für jeden hilfreich, der herausfinden möchte, ob er sich einen Hund leisten kann oder lieber darauf verzichtet.

Doch Hundeliebhaber sind keine scharfen Kostenrechner. Denn täglich erfahren sie, wie regelmäßiges Gassi gehen und Streicheln auch ihrem Körper und ihrer Seele guttun. Und längst gibt es etliche Studien, die zu dem Ergebnis kommen, dass das Leben mit Hunden für Frauchen und Herrchen viel Segensreiches bringt: etwa soziale Kontakte erleichtern, das Selbstwertgefühl steigern, Schmerzen lindern – und sogar die Herzkranzgefäße schützen.

Susanne Meyer, die ihren wahren Namen nicht nennen möchte, kennt beide Seiten des Hundehaltens: die Kosten, aber auch die gesteigerte Lebensqualität. Die 69-Jährige lebt in Berlin, zusammen mit ihrem Mops Klaus. Dreimal am Tag – morgens, mittags und abends – treten beide zu einem längeren Spaziergang an, bei jedem Wetter, versteht sich. Schon bekommt das Leben eine gesunde Struktur, dem Hund sei Dank.

Meyer bewirtet gern Freundinnen und Freunde in ihrer Wohnung. Zur Begrüßung, sagt sie, zeige sich Klaus stets „in Hochform“. Aufgekratzt begrüßt er die Gäste, wobei er unablässig seinen Ringelschwanz bewegt. Der ganze Hund scheint dann vor Freude zu wackeln. Weil er aber irgendwann auch Ruhe schätzt, freut er sich noch mehr, wenn die Besucher nicht allzu spät wieder gehen.

Besonders kostenträchtig sind Möpse

Möpse gelten jedoch als krankheitsanfällig und deshalb als kostenträchtig. Probleme bereiten besonders Nase, Pfoten und Augen. Meyer, die Rente bezieht, hat früh damit begonnen, ihre Ausgaben für den Mops aufzuschreiben, ohne Anspruch auf Vollständigkeit. Von 2017 bis 2024 kamen so Kosten von rund 8000 Euro zusammen. Im Durchschnitt der acht Jahre ergibt das 1000 Euro. Zwei weitere Erkenntnisse zog sie daraus: Die Teuerung wird auch für Hundehalter deutlich fühlbar. Und besonders die Tierarztkosten schwanken erheblich – im Maximum erreichten sie bei Klaus rund 700 Euro im Jahr. Für Meyer ist das jedoch verkraftbar.

Es gibt aber auch Menschen, die ein Hund an die Grenze ihrer finanziellen Möglichkeiten bringt. Für solche Fälle gibt es in München die „Tiertafel“. Sie unterstützt nach eigenen Angaben „mittlerweile mehr als 650 bedürftige Münchner Tierhalter und Tierhalterinnen mit Futter- und Sachspenden“. Denn „gerade in schwierigen Lebenssituationen“ sei ein Haustier „Seelentröster und oft letzter sozialer Kontakt“.

Die Hilfe ist allerdings an eine strikte Voraussetzung gebunden: Man muss seine Bedürftigkeit nachweisen können – mit den letzten drei Hartz IV- oder Rentenbescheiden.
`

console.info(word_stats(sample_article, { exclude_common_words: true, min_frequency: 3 }))
