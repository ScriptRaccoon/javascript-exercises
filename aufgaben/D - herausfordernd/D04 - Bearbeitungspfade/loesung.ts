/**
 * Union type of allowed string edits.
 */
type Edit =
	| { op: "insert"; index: number; char: string }
	| { op: "delete"; index: number; char: string }
	| { op: "replace"; index: number; char: string; new_char: string }

/**
 * Computes the shortest edit path between two strings.
 */
function get_edit_path(a: string, b: string): string[] {
	const n = a.length
	const m = b.length

	// --- Compute the edit distance ---

	/**
	 * dist[i][j] = edit distance between the prefixes a[0:i] and b[0:j] of length i resp. j
	 */
	const dist: number[][] = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0))

	for (let i = 0; i <= n; i++) dist[i][0] = i // delete
	for (let j = 0; j <= m; j++) dist[0][j] = j // insert

	for (let i = 1; i <= n; i++) {
		for (let j = 1; j <= m; j++) {
			if (a[i - 1] === b[j - 1]) {
				dist[i][j] = dist[i - 1][j - 1] // match
			} else {
				dist[i][j] = Math.min(
					dist[i - 1][j - 1] + 1, // replace
					dist[i][j - 1] + 1, // insert
					dist[i - 1][j] + 1, // delete
				)
			}
		}
	}

	// --- Backtrack to get list of edits ---

	const edits: Edit[] = []
	let i = n
	let j = m

	while (i > 0 || j > 0) {
		if (i > 0 && j > 0 && a[i - 1] === b[j - 1]) {
			i--
			j--
		} else if (i > 0 && j > 0 && dist[i][j] === dist[i - 1][j - 1] + 1) {
			edits.push({
				op: "replace",
				index: i - 1,
				char: a[i - 1],
				new_char: b[j - 1],
			})
			i--
			j--
		} else if (j > 0 && (i === 0 || dist[i][j] === dist[i][j - 1] + 1)) {
			edits.push({ op: "insert", index: i, char: b[j - 1] })
			j--
		} else if (i > 0 && (j === 0 || dist[i][j] === dist[i - 1][j] + 1)) {
			edits.push({ op: "delete", index: i - 1, char: a[i - 1] })
			i--
		} else {
			throw new Error("Invalid case")
		}
	}

	edits.reverse()

	// --- Apply edits with index tracking ---

	const path: string[] = [a]

	let current = a
	let offset = 0

	for (const edit of edits) {
		const i = edit.index + offset
		console.log(edit.op)
		if (edit.op === "replace") {
			current = current.substring(0, i) + edit.new_char + current.substring(i + 1)
		} else if (edit.op === "insert") {
			current = current.substring(0, i) + edit.char + current.substring(i)
			offset++
		} else if (edit.op === "delete") {
			current = current.substring(0, i) + current.substring(i + 1)
			offset--
		}
		path.push(current)
	}

	return path
}

/* ------ TESTS ------ */

// [ 'keiner', 'einer', 'eimer' ]
console.info(get_edit_path("keiner", "eimer"))

// [ 'banane', 'badnane', 'badenane', 'badewane', 'badewanne' ]
console.info(get_edit_path("banane", "badewanne"))

// [ 'anschauung', 'nschauung', 'schauung', 'schaueng', 'schauen' ]
console.info(get_edit_path("anschauung", "schauen"))

// [ 'kantig', 'rantig', 'runtig', 'runig', 'rung', 'rund' ]
console.info(get_edit_path("rund", "kantig"))

// [ 'rund', 'kund', 'kand', 'kantd', 'kantid', 'kantig' ]
console.info(get_edit_path("kantig", "rund"))
