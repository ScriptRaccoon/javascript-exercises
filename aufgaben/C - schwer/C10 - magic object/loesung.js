/**
 * Erstellt ein Proxy-Objekt mit Statistiken für Lese- und Schreibzugriffe
 */
function create_magic_object(obj) {
	const stats = {
		created_at: new Date().toISOString(),
		updated_at: null,
		reads: {},
		writes: {},
	}

	return new Proxy(obj, {
		get: (target, prop, receiver) => {
			if (prop === "__stats__") return stats
			stats.reads[prop] = (stats.reads[prop] ?? 0) + 1
			return Reflect.get(target, prop, receiver)
		},
		set: (target, prop, val, receiver) => {
			stats.writes[prop] = (stats.writes[prop] ?? 0) + 1
			stats.updated_at = new Date().toISOString()
			return Reflect.set(target, prop, val, receiver)
		},
	})
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
