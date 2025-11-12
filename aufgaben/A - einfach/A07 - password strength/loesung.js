/**
 * Auswahl von üblichen Wörtern, die in Passwörtern nicht vorkommen sollten.
 */
const common_words = [
	"test",
	"password",
	"admin",
	"1234",
	"user",
	"login",
	"qwerty",
	"guest",
	"secret",
	"abc123",
	"letmein",
]

/**
 * Berechnet die Stärke eines Passworts.
 */
function password_strength(password) {
	let strength = 0

	if (password.length >= 8) strength++
	if (password.length >= 12) strength++
	if (password.length >= 16) strength++

	// Kleinbuchstabe
	if (/[a-z]/.test(password)) strength++

	// Großbuchstabe
	if (/[A-Z]/.test(password)) strength++

	// Ziffer
	if (/\d/.test(password)) strength++

	// Sonderzeichen
	if (/[\W_]/.test(password)) strength++

	if (common_words.some((word) => password.toLowerCase().includes(word))) strength--

	return strength
}

/* ------ TESTS ------ */

// 0
console.info(password_strength("test"))

// 5
console.info(password_strength("Berlin_1997"))

// 7
console.info(password_strength("hCq{}!w$mGg#,)4$plYw"))
