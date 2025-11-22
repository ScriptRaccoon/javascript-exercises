/**
 * Prüft, ob eine natürliche Zahl eine Quadratzahl ist.
 */
function is_square(n) {
	if (!Number.isInteger(n) || n < 0) return false
	let k = 0
	while (k * k < n) k++
	return k * k === n
}

/* ------ TESTS ------ */

console.info(is_square(-2)) // false
console.info(is_square(1.5)) // false
console.info(is_square(0)) // true
console.info(is_square(1)) // true
console.info(is_square(5)) // false
console.info(is_square(121)) // true
console.info(is_square(250)) // false
