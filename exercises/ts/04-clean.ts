/**
 * Implementiere eine allgemeine Hilfsfunktion, die aus einem Objekt die Werte
 * 'undefined' und 'null' entfernt.
 *
 * Beispiel:
 *
 * clean({x : 0, y : null, z : undefined}) = {x : 0}
 */

/**
 * Entfernt aus einem Objekt die Werte 'undefined' und 'null'.
 */
function clean<T>(obj: Record<string, T | null | undefined>): Record<string, T> {
	return Object.fromEntries(
		Object.entries(obj).filter(([_, val]) => val != null),
	) as Record<string, T>
}

/**
 * Entfernt aus einem Objekt die Werte 'undefined' und 'null'.
 * Alternative Implementierung.
 */
function clean_alternative<T>(
	obj: Record<string, T | null | undefined>,
): Record<string, T> {
	const res: Record<string, T> = {}

	for (const key in obj) {
		const val = obj[key]
		if (val != null) res[key] = val
	}

	return res
}

// TESTS
console.info(clean({ x: 0, y: null, z: undefined }))
console.info(clean({}))
