# CSV-Parser

## Aufgabe

Entwickle einen einfachen CSV-Parser, das heißt eine Funktion, die einen mehrzeiligen Text im tabellarischen CSV-Format entgegennimmt und ein Array aus Objekten daraus erzeugt.

Als Trennzeichen zwischen den Einträgen wird ein Komma verwendet.

Hinweis: Randfälle (Felder in Anführungsstrichen, Kommata in den Feldern, usw.) können ignoriert werden. Formatierungsfehler müssen auch nicht strikt behandelt werden. Mache es dir so einfach wie möglich! Für wasserdichte CSV-Parser verwendet man ohnehin am besten eine Bibliothek.

## Beispiel

**Eingabe**

```js
const csv = `
name,age,city
Manfred,30,Berlin
Maria,25,Göttingen
`

basic_CSV_parser(csv)
```

**Ausgabe**

```json
[
	{ "name": "Manfred", "age": "30", "city": "Berlin" },
	{ "name": "Maria", "age": "25", "city": "Göttingen" }
]
```

## Themen

Strings, Arrays, Objekte
