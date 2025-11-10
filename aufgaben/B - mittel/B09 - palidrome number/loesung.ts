/**
 * Prüft ob ein String ein Palindrom ist.
 */
function is_palindrome(str: string): boolean {
	const n = str.length
	if (str.length === 0) return true
	for (let i = 0; i < Math.floor(n / 2); i++) {
		if (str[i] !== str[n - 1 - i]) return false
	}
	return true
}

/**
 * Bestimmt die kleinste Palindromzahl >= n.
 * Brute-Force-Algorithmus.
 */
function next_palindrome_slow(n: number): number {
	const is_valid = Number.isInteger(n) && n >= 0
	if (!is_valid) throw new Error("Number must be a non-negative integer")
	let k = n
	while (!is_palindrome(k.toString())) k++
	return k
}

/**
 * Hilfsfunktion, die einen String umkehrt.
 */

function reverse_string(s: string): string {
	return [...s].reverse().join("")
}

/**
 * Hilfsfunktion, die einen Teilstring umdreht und hinten anhängt.
 */

function mirrored(left: string, len: number): string {
	return left + reverse_string(len % 2 === 0 ? left : left.slice(0, -1))
}

/**
 * Bestimmt die kleinste Palindromzahl >= n.
 * Schneller Algorithmus.
 */
function next_palindrome(n: number): number {
	const is_valid = Number.isInteger(n) && n >= 0
	if (!is_valid) throw new Error("Number must be a non-negative integer")

	const s = String(n)
	const len = s.length

	const left = s.slice(0, Math.ceil(len / 2))
	const mirror = Number(mirrored(left, len))

	if (mirror >= n) return mirror

	const left_add_one = String(Number(left) + 1)
	return Number(mirrored(left_add_one, len))
}

/* ------ TESTS ------ */

console.info(next_palindrome(99) == 99)
console.info(next_palindrome(123) == 131)
console.info(next_palindrome(9190) == 9229)
console.info(next_palindrome(10004) == 10101)
console.info(next_palindrome(1129404) == 1130311)
console.info(next_palindrome(4249812309120352) == 4249812332189424)
