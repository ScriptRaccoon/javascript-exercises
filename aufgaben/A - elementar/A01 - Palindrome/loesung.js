/**
 * Prüft ob ein String ein Palindrom ist.
 */
function is_palindrome(input) {
	const n = input.length
	for (let i = 0; i < n / 2; i++) {
		if (input[i] !== input[n - 1 - i]) return false
	}
	return true
}

/**
 * Prüft ob ein String ein Palindrom ist.
 * Alternative Implementierung.
 */
function is_palindrome_alternative(input) {
	return input === reverse_string(input)
}

/**
 * Dreht einen String um (z. B. "haus" ---> "suah").
 */
function reverse_string(input) {
	const n = input.length
	let reversed = ""
	for (let i = 0; i < input.length; i++) {
		reversed += input[n - 1 - i]
	}
	return reversed
}

/* ------ TESTS ------ */

console.info(is_palindrome("")) // true
console.info(is_palindrome("a")) // true
console.info(is_palindrome("ab")) // false
console.info(is_palindrome("anna")) // true
console.info(is_palindrome("hannah")) // true
console.info(is_palindrome("rentner")) // true
console.info(is_palindrome("rentnerin")) // false
