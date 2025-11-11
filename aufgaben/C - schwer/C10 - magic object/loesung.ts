/**
 * Typ mit Statistiken für Lese- und Schreibzugriffe
 */
type Stats<T extends Record<PropertyKey, unknown>> = {
	created_at: string
	updated_at: string | null
	reads: { [a in keyof T]?: number }
	writes: { [a in keyof T]?: number }
}

/**
 * Erstellt ein Proxy-Objekt mit Statistiken für Lese- und Schreibzugriffe
 */
function create_magic_object<T extends Record<PropertyKey, unknown>>(obj: T) {
	const stats: Stats<T> = {
		created_at: new Date().toISOString(),
		updated_at: null,
		reads: {},
		writes: {},
	}

	return new Proxy<T>(obj, {
		get: (target: T, prop: keyof T, receiver: any) => {
			if (prop === "__stats__") return stats
			stats.reads[prop] = (stats.reads[prop] ?? 0) + 1
			return Reflect.get(target, prop, receiver)
		},
		set: (target: T, prop: keyof T, val: any, receiver: any) => {
			stats.writes[prop] = (stats.writes[prop] ?? 0) + 1
			stats.updated_at = new Date().toISOString()
			return Reflect.set(target, prop, val, receiver)
		},
	}) as T & { __stats__: Stats<T> }
}

/* ------ TESTS ------ */

const user = create_magic_object({
	id: "t4Ra5r",
	name: "maria",
	role: "editor",
})

// { id: 't4Ra5r', name: 'maria', role: 'editor' }
console.info(user)

/*
{
  created_at: '2025-11-11T21:29:46.515Z',
  updated_at: null,
  reads: {},
  writes: {}
}
*/
console.info(user.__stats__)

user.name
user.name
user.name
user.id
user.id
user.name = "mary"
user.name = "mary b."

/*
{
  created_at: '2025-11-11T21:29:46.515Z',
  updated_at: '2025-11-11T21:29:46.515Z',
  reads: { name: 3, id: 2 },
  writes: { name: 2 }
}
*/
console.info(user.__stats__)
