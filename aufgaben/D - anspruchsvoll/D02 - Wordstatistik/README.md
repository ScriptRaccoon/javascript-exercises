# Wordstatistik

## Aufgabe

Schreibe eine Funktion, welche die Wörter in einem deutschsprachigen Text analysiert. Berechnet werden ...

- die Anzahl aller Wörter
- die Anzahl der unterschiedlichen Wörter
- die sortierte Liste aller unterschiedlichen Wörter mit ihren Häufigkeiten (häufigste zuerst)

Wichtig:

- Satzzeichen werden ignoriert.
- Wörter mit Umlauten werden unterstützt.

Verbessere anschließend die Funktion, indem unwesentliche Wörter (z. B. Präpositionen, Artikel und Konjunktionen) herausgefiltert werden, damit das Thema des Ausgangstextes besser ersichtlich wird. Übergib außerdem einen weiteren optionalen Parameter für die Mindesthäufigkeit der angezeigten Wörter.

## Beispiel 1

**Eingabe**

```js
const sample_txt = `JavaScript (kurz JS) ist eine Skriptsprache, die ursprünglich 1995
von Netscape für dynamisches HTML in Webbrowsern entwickelt wurde, um Benutzerinteraktionen
auszuwerten, Inhalte zu verändern, nachzuladen oder zu generieren und so die Möglichkeiten
von HTML zu erweitern. Heute wird JavaScript auch außerhalb von Browsern angewendet,
etwa auf Servern und in Microcontrollern.`

word_stats(sample_txt)
```

**Ausgabe**

```json
{
	"words_total": 49,
	"words_unique": 40,
	"words_with_frequencies": [
		["von", 3],
		["zu", 3],
		["JavaScript", 2],
		["die", 2],
		["HTML", 2],
		["in", 2],
		["und", 2]
    ...
    ...
	]
}
```

**Eingabe**

```js
word_stats(sample_txt, { exclude_common_words: true, min_frequency: 2 })
```

**Ausgabe**

```json
{
	"words_total": 49,
	"words_unique": 40,
	"words_with_frequencies": [
		["JavaScript", 2],
		["HTML", 2]
	]
}
```

## Beispiel 2

Aus dem [Grundgesetz für die Bundesrepublik Deutschland](https://www.gesetze-im-internet.de/gg/GG.pdf) erhält man die folgende Wordstatistik (mit `min_frequency: 50`):

```json
{
	"words_total": 22827,
	"words_unique": 3634,
	"words_with_frequencies": [
		["Art", 225],
		["Länder", 158],
		["Artikel", 134],
		["Bund", 125],
		["Zustimmung", 119],
		["Bundesrates", 116],
		["Bundesgesetz", 107],
		["Absatz", 98],
		["Bundes", 93],
		["Ländern", 88],
		["Bundesregierung", 87],
		["Satz", 78],
		["Abs", 76],
		["können", 76],
		["Gesetz", 70],
		["Recht", 69],
		["Bundestag", 65],
		["Bundestages", 62],
		["Gemeinden", 55],
		["Nähere", 52],
		["Grund", 50]
	]
}
```

## Themen

Strings, Arrays, Objekte, reguläre Ausdrücke, Sortierung, Optionsobjekt
