# Aufgabe

Schreibe eine Funktion, welche die Wörter in einem deutschen Text analysiert.
Berechnet werden ...

-   die Anzahl aller Wörter
-   die Anzahl der unterschiedlichen Wörter
-   die sortierte Liste aller unterschiedlichen Wörter mit ihren Häufigkeiten

# Beispiel

```js
const sample_txt = `JavaScript (kurz JS) ist eine Skriptsprache, die ursprünglich 1995 von Netscape für
dynamisches HTML in Webbrowsern entwickelt wurde, um Benutzerinteraktionen auszuwerten,
Inhalte zu verändern, nachzuladen oder zu generieren und so die Möglichkeiten von HTML
zu erweitern. Heute wird JavaScript auch außerhalb von Browsern angewendet, etwa auf
Servern und in Microcontrollern.`;

word_stats(sample_txt) ==
	{
		words_total: 49,
		words_unique: 40,
		words: [
			{ word: "von", frequency: 3 },
			{ word: "zu", frequency: 3 },
			{ word: "JavaScript", frequency: 2 },
			{ word: "die", frequency: 2 },
			{ word: "HTML", frequency: 2 },
			// ...
		],
	};
```

Wichtig:

-   Satzzeichen werden ignoriert.
-   Wörter mit Umlauten werden unterstützt.

# Bonusaufgabe

Verbessere die Funktion, indem unwesentliche Wörter (z. B. Präpositionen, Artikel,
Konjunktionen) herausgefiltert werden, damit das Thema des Ausgangstextes besser
ersichtlich wird. Übergib außerdem einen optionalen weiteren Parameter für die
Mindesthäufigkeit der angezeigten Wörter. Zum Beispiel:

```js
word_stats(sample_txt, { exclude_common_words: true, min_frequency: 2 }) ==
	{
		words_total: 49,
		words_unique: 40,
		words: [
			{ word: "JavaScript", frequency: 2 },
			{ word: "HTML", frequency: 2 },
		],
	};
```

# Themen

Strings, Arrays, Objekte, reguläre Ausdrücke, Sortierung, Optionsobjekt
