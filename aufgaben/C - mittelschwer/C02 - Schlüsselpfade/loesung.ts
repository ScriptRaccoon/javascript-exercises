/**
 * Berechnet das Array der vollständigen Pfade entlang der Schlüssel eines Objektes.
 */
function paths(obj: unknown): string[] {
	const is_object = typeof obj === "object" && !Array.isArray(obj) && obj !== null
	if (!is_object) return []

	const result: string[] = []

	for (const [key, val] of Object.entries(obj)) {
		const subpaths = paths(val)
		if (subpaths.length === 0) {
			result.push(key)
		} else {
			for (const path of subpaths) {
				result.push(`${key}.${path}`)
			}
		}
	}

	return result
}

/* ------ TESTS ------ */

// [ 'a', 'b' ]
console.info(paths({ a: 1, b: 2 }))

// [ 'a', 'b.c', 'b.d' ]
console.info(paths({ a: 1, b: { c: 2, d: 3 } }))

// [ 'a.b.c.d' ]
console.info(paths({ a: { b: { c: { d: 0 } } } }))

// []
console.info(paths([0, 1]))

// []
console.info(paths(42))
