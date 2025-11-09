# Aufgabe

Implementiere eine Funktion, die einen Text in "Title Case" umwandelt, vgl.
<https://en.wikipedia.org/wiki/Title_case> und als Beispiel <https://www.nytimes.com/>.
Dabei werden alle Wörter großgeschrieben, abgesehen von Artikeln, kurzen Präpositionen
und einigen Konjunktionen.

Die Funktion sollte den Text sowie eine optionale Liste von Ausnahmen entgegennehmen.

# Beispiel

```js
const heading =
	"How the Trump administration is giving even more tax breaks to the wealthy";
const exceptions = ["to", "the"];

to_title_case(heading, exceptions) ==
	"How the Trump Administration Is Giving Even More Tax Breaks to the Wealthy";
```

# Themen

Strings, Arrays
