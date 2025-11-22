/**
 * Entfernt aus einem Objekt die Werte `undefined` und `null`.
 * Implementierung mittels Object.fromEntries und Object.entries.
 */
function clean<T>(obj: Record<PropertyKey, T | null | undefined>) {
	return Object.fromEntries(
		Object.entries(obj).filter(([_, val]) => val != null),
	) as Record<PropertyKey, T>
}

/**
 * Entfernt aus einem Objekt die Werte `undefined` und `null`.
 * Direkte Implementierung ohne weitere Hilfsmittel.
 * Die Performance ist hierbei wesentlich besser.
 */
function clean_fast<T>(
	obj: Record<PropertyKey, T | null | undefined>,
): Record<PropertyKey, T> {
	const res: Record<PropertyKey, T> = {}

	for (const key in obj) {
		const val = obj[key]
		if (val != null) res[key] = val
	}

	return res
}

/* ------ TESTS ------ */

// { x: 0 }
console.info(clean({ x: 0, y: null, z: undefined }))

// {}
console.info(clean({}))
