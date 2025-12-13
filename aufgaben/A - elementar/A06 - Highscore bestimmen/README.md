# Highscore bestimmen

## Aufgabe

In einem Online-Spiel werden die Spielergebnisse in einem Objekt gespeichert, wobei jedem Spieler das Ergebnis zugeordnet wird. Gesucht wird der Spieler mit dem besten Ergebnis.

Implementiere dazu eine Funktion, die aus einem Objekt aus String-Zahl-Paaren das Paar mit der größten Zahl ermittelt.

Für ein leeres Objekt soll `null` zurückgegeben werden.

## Beispiel

**Eingabe**

```js
const scores = {
	alexei: 55,
	mariana: 142,
	tariq: 42,
	lian: 26,
	sofia: 79,
	kenji: 24,
	amara: 453,
	mateo: 278,
	noura: 141,
	elias: 199,
}

get_highscore(scores)
```

**Ausgabe**

```json
["amara", 453]
```

## Themen

Schleifen, Objekte, Fallunterscheidung, Optimierung
