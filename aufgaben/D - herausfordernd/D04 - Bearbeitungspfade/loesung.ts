/**
 * Returns the minimum of an array with respect to a property.
 */
function minimize<T>(arr: T[], prop: (a: T) => number): T {
	if (arr.length === 0) throw new Error("Array must be non-empty")
	return arr.reduce((min, x) => (prop(x) < prop(min) ? x : min), arr[0])
}

/**
 * Computes the shortest edit path between two strings.
 */
function get_edit_path(a: string, b: string): string[] {
	const n = a.length
	const m = b.length

	/**
	 * dist[i][j] = edit distance between the prefixes a[0:i] and b[0:j] of length i resp. j
	 */
	const dist: number[][] = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0))

	type Edit = {
		type: "insert" | "delete" | "match" | "replace"
		prev: [number, number]
	}

	/**
	 * edit[i][j] = type of editing at this step and the previous coordinate
	 */
	const edit: Edit[][] = Array.from({ length: n + 1 }, () => Array(m + 1).fill(null))

	for (let i = 0; i <= n; i++) {
		dist[i][0] = i
		edit[i][0] = { type: "delete", prev: [i - 1, 0] }
	}

	for (let j = 1; j <= m; j++) {
		dist[0][j] = j
		edit[0][j] = { type: "insert", prev: [0, j - 1] }
	}

	for (let i = 1; i <= n; i++) {
		for (let j = 1; j <= m; j++) {
			if (a[i - 1] === b[j - 1]) {
				dist[i][j] = dist[i - 1][j - 1]
				edit[i][j] = { type: "match", prev: [i - 1, j - 1] }
				continue
			}

			// Remark: The order of options determines which ones are preferreed
			// if multiple are possible. Currently, replace > insert > delete.
			const options: (Edit & { value: number })[] = [
				{ type: "replace", prev: [i - 1, j - 1], value: dist[i - 1][j - 1] + 1 },
				{ type: "insert", prev: [i, j - 1], value: dist[i][j - 1] + 1 },
				{ type: "delete", prev: [i - 1, j], value: dist[i - 1][j] + 1 },
			]

			const { type, prev, value } = minimize(options, ({ value }) => value)

			dist[i][j] = value
			edit[i][j] = { prev, type }
		}
	}

	const edit_path: string[] = [b]
	let i = n
	let j = m
	let current = b

	while (i > 0 || j > 0) {
		const { type, prev } = edit[i][j]
		const [u, v] = prev

		if (type === "replace") {
			current = current.slice(0, v) + a[u] + current.slice(v + 1)
		} else if (type === "insert") {
			current = current.slice(0, v) + current.slice(v + 1)
		} else if (type === "delete") {
			current = current.slice(0, v) + a[u] + current.slice(v)
		}

		if (type !== "match") edit_path.push(current)
		i = u
		j = v
	}

	edit_path.reverse()
	return edit_path
}

/* ------ TESTS ------ */

// [ 'keiner', 'einer', 'eimer' ]
console.info(get_edit_path("keiner", "eimer"))

// [ 'banane', 'badnane', 'badenane', 'badewane', 'badewanne' ]
console.info(get_edit_path("banane", "badewanne"))

// [ 'anschauung', 'nschauung', 'schauung', 'schaueng', 'schauen' ]
console.info(get_edit_path("anschauung", "schauen"))

// [ 'rund', 'kund', 'kand', 'kantd', 'kantid', 'kantig' ]
console.info(get_edit_path("rund", "kantig"))

// [ 'kantig', 'rantig', 'runtig', 'runig', 'rung', 'rund' ]
console.info(get_edit_path("kantig", "rund"))
