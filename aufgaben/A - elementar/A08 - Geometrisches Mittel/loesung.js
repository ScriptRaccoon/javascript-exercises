/**
 * Bestimmt das geometrische Mittel eines Arrays von Zahlen.
 * {@link https://de.wikipedia.org/wiki/Geometrisches_Mittel}
 */
function geometric_mean(arr) {
	const n = arr.length
	let p = 1
	for (const x of arr) p *= x
	return p ** (1 / n)
}

/* ------ TESTS ------ */

console.info(geometric_mean([2])) // 2
console.info(geometric_mean([4, 9])) // 6
console.info(geometric_mean([1, 2, 3])) // 1.8171205928321397
console.info(geometric_mean([2, 3])) // 2.449489742783178
