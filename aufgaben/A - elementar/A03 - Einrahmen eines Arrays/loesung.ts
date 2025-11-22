/**
 * Fügt ein Element vorne und hinten zu einem Array hinzu.
 */
function frame<T>(arr: T[], el: T): T[] {
	return [el, ...arr, el]
}

/**
 * Fügt ein Element vorne und hinten zu einem Array hinzu.
 * Alternative Implementierung.
 */
function frame_alternative<T>(arr: T[], el: T): T[] {
	const res: T[] = [el]
	for (const x of arr) res.push(x)
	res.push(el)
	return res
}

/* ------ TESTS ------ */

console.info(frame([5, 6, 7], 1)) // [1, 5, 6, 7, 1]
console.info(frame([], 2)) // [2, 2]
