/**
 * Entfernt aus einem Objekt die Werte `undefined` und `null`.
 * Implementierung mittels Object.fromEntries und Object.entries.
 */
function clean(obj) {
	return Object.fromEntries(Object.entries(obj).filter(([_, val]) => val != null))
}

/**
 * Entfernt aus einem Objekt die Werte `undefined` und `null`.
 * Direkte Implementierung ohne weitere Hilfsmittel.
 * Die Performance ist hierbei wesentlich besser.
 */
function clean_fast(obj) {
	const res = {}

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
