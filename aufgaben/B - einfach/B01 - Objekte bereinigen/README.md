# Objekte bereinigen

## Aufgabe

Implementiere eine allgemeine Hilfsfunktion, die aus einem Objekt die Werte
`undefined` und `null` entfernt, es also "bereinigt".

Hinweis: Das vorhandene Objekt wird nicht verändert, es wird ein neues erzeugt. Tiefer geschachtelte Werte wie z. B. in

```js
{
	x: {
		y: null
	}
}
```

müssen nicht beachtet werden.

## Beispiel

**Eingabe**

```js
clean({ x: 0, y: null, z: undefined })
```

**Ausgabe**

```json
{ "x": 0 }
```

## Themen

Objekte, Schleifen
