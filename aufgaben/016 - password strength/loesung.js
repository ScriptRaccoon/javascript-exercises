/**
 * Auswahl von üblichen Wörtern, die in Passwörtern nicht vorkommen sollten.
 */
const common_words = ["test", "passwort", "password", "admin", "1234", "user"]

/**
 * Berechnet die Stärke eines Passworts.
 */
function password_strength(password) {
	let strength = 0

	if (password.length >= 8) strength++
	if (password.length >= 12) strength++
	if (password.length >= 16) strength++
	if (/[A-Z]/.test(password)) strength++
	if (/[a-z]/.test(password)) strength++
	if (/\d/.test(password)) strength++
	if (/[\W_]/.test(password)) strength++

	if (common_words.some((word) => password.toLowerCase().includes(word))) strength--

	return strength
}

/* ------ TESTS ------ */
console.info(password_strength("test"))
console.info(password_strength("Test_1997"))
console.info(password_strength("hCq{}!w$mGg#,)4$plYw"))
