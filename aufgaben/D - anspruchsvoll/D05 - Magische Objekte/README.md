# Magische Objekte

## Aufgabe

Schreibe eine Funktion `create_magic_object(obj)`, die aus einem Objekt ein Objekt `magic_obj` erzeugt, welches sich genauso verhält und dieselben Eigenschaften besitzt wie `obj`, allerdings eine weitere besondere Eigenschaft `magic_obj.__stats__` besitzt. Dies soll ein Objekt sein, in dem die Lese- und Schreibzugriffe auf "magische Weise" gespeichert werden.

Wird zum Beispiel eine Eigenschaft namens `name` zweimal gelesen und einmal geändert, soll `magic_obj.__stats__`

```json
{
	"reads": { "name": 2 },
	"writes": { "name": 1 }
}
```

beinhalten. Außerdem soll in diesem Objekt gespeichert werden, wann das Objekt erstellt und zuletzt aktualisiert worden ist. Mehr dazu in dem Beispiel unten. Die TypeScript-Version soll vollständig typsicher sein.

Hinweis: Arbeite mit einem Proxy-Objekt.

## Beispiel

**Eingabe**

```js
const user = create_magic_object({
	id: "t4Ra5r",
	name: "maria",
	role: "editor",
})

console.info(user)
console.info(user.__stats__)
```

**Ausgabe**

```json
{
	"id": "t4Ra5r",
	"name": "maria",
	"role": "editor"
}
```

```json
{
	"created_at": "2025-11-11T21:29:46.515Z",
	"updated_at": null,
	"reads": {},
	"writes": {}
}
```

**Eingabe**

```js
user.name
user.name
user.name
user.id
user.id
user.name = "mary"
user.name = "mary b."

console.info(user.__stats__)
```

**Ausgabe**

```json
{
	"created_at": "2025-11-11T21:29:46.515Z",
	"updated_at": "2025-11-11T21:29:46.515Z",
	"reads": { "name": 3, "id": 2 },
	"writes": { "name": 2 }
}
```

## Themen

Proxys, Objekte, Abschluss
