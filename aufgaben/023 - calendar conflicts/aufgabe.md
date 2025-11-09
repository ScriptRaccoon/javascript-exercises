# Aufgabe

Implementiere eine Funktion, die für eine Liste von Kalendereinträgen die Konflikte bestimmt, also die Paare von Einträgen, die sich zeitlich überlagern. Es sollte auch das Zeitintervall bestimmt werden, in dem sich diese überlagern.

# Beispiel

```js
const events = [
	{ title: "book train tickets", start: "09:00", end: "09:15" },
	{ title: "train to lusanne", start: "17:00", end: "18:45" },
	{ title: "lunch", start: "12:00", end: "12:30" },
	{ title: "meeting with peter", start: "11:00", end: "12:15" },
	{ title: "call with luisa", start: "15:00", end: "16:00" },
	{ title: "call with tom", start: "16:50", end: "17:20" },
];

get_conflicting_events(events) ==
	[
		{
			start: "17:00",
			end: "17:20",
			event_titles: ["train to lusanne", "call with tom"],
		},
		{
			start: "12:00",
			end: "12:15",
			event_titles: ["lunch", "meeting with peter"],
		},
	];
```

# Themen

Schleifen, Einstieg
