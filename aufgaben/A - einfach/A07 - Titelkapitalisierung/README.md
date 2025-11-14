# Aufgabe

Auf der Website der [New York Times](https://www.nytimes.com/) wird in Überschriften der [Title Case](https://en.wikipedia.org/wiki/Title_case) verwendet. Abgesehen von Artikeln, kurzen Präpositionen und einigen Konjunktionen werden dabei alle Wörter großgeschrieben.

Implementiere eine Funktion, die einen Text in Title Case umwandelt. Sie soll einen Text sowie eine optionale Liste von Ausnahmen entgegennehmen.

# Beispiel

**Eingabe**

```js
to_title_case(
	"How the Trump administration is giving even more tax breaks to the wealthy",
	["to", "the"],
)
```

**Ausgabe**

```text
"How the Trump Administration Is Giving Even More Tax Breaks to the Wealthy"
```

# Themen

Strings, Arrays
