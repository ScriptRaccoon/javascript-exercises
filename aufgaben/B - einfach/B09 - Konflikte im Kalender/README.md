# Konflikte im Kalender

## Aufgabe

Implementiere eine Funktion, die für eine Liste von Kalendereinträgen die Liste der zeitlichen Konflikte bestimmt. Ein Kalendereintrag besteht hierbei aus Titel, Start- und Endzeit, und ein Konflikt besteht aus der Start- und Endzeit des Konflikts sowie einer Liste der Titel der sich in dieser Zeit überschneidenden Einträge.

## Beispiel

**Eingabe**

```js
const events = [
	{ title: "book train tickets", start: "09:00", end: "09:15" },
	{ title: "train to lusanne", start: "17:00", end: "18:45" },
	{ title: "lunch", start: "12:00", end: "12:30" },
	{ title: "meeting with peter", start: "11:00", end: "12:15" },
	{ title: "call with luisa", start: "15:00", end: "16:00" },
	{ title: "call with tom", start: "16:50", end: "17:20" },
]

get_conflicting_events(events)
```

**Ausgabe**

```json
[
	{ "start": "17:00", "end": "17:20", "events": ["train to lusanne", "call with tom"] },
	{ "start": "12:00", "end": "12:15", "events": ["lunch", "meeting with peter"] }
]
```

## Themen

Objekte, Schleifen, Fallunterscheidungen
