/*
Aufgabe: Implementiere eine Funktion, die die Stärke eines Passworts bestimmt.
Die Stärke ist standardmäßig 0, und jede der folgenden Kriterien erhöht sie um 1.
- mind. 8 Zeichen
- mind. 12 Zeichen (Zusatzpunkt)
- mind. 16 Zeichen (Zusatzpunkt)
- mind. ein Großbuchstabe
- mind. ein Kleinbuchstabe
- mind. eine Ziffer
- mind. ein Sonderzeichen

Die maximale Stärke wäre hier also 7.

Beispiel:

password_strength("test") == 1
password_strength("Test_1997") == 5
password_strength("hCq{}!w$mGg#,)4$plYw") == 7

Bonus: Vergib einen Punktabzug, wenn das Passwort eines der gängigen Wörter
(z. B. 'test', 'passwort', 'password', 'test', usw.) beinhaltet. Dann wäre z. B.
password_strength("Test_1997") == 4.

Themen: Strings, reguläre Ausdrücke, Fallunterscheidungen
*/

/**
 * Auswahl von üblichen Wörtern, die in Passwörtern nicht vorkommen sollten.
 */
const common_words = ["test", "passwort", "password", "admin", "1234", "user"] as const

/**
 * Berechnet die Stärke eines Passworts.
 */
function password_strength(password: string): number {
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
