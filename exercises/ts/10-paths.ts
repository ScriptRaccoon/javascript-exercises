/**
 * Aufgabe: Implementiere eine Funktion paths(obj), die zu einem Objekt die Liste
 * aller vollständigen Pfade entlang der Schlüssel zurückgibt.
 *
 * Beispiel:
 *
 * const obj = { a: 1, b: { c: [0, 1], d: 2 } }
 * paths(obj) == ["a", "b.c", "b.d"]
 *
 * Themen: Rekursion, Objekte, Strings
 */

/**
 * Gibt die Liste aller vollständigen Schlüsselpfade eines Objektes zurück.
 */
function paths(obj: unknown): string[] {
	const is_obj = typeof obj === "object" && !Array.isArray(obj) && obj !== null
	if (!is_obj) return []

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

// TESTING
const obj1 = { a: 1, b: { c: [0, 1], d: 2 } }
console.info(paths(obj1))

const obj2 = { a: { b: { c: { d: 0 } } } }
console.info(paths(obj2))

const obj3 = {}
console.info(paths(obj3))

const obj4 = 42
console.info(paths(obj4))
