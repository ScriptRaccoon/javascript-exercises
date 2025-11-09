/*
Die Goldbach-Vermutung aus der Mathematik besagt, dass jede gerade Zahl > 2
als Summe von zwei Primzahlen geschrieben werden kann. Sie ist bis heute offen.

Aufgabe: Schreibe eine Funktion verify_goldbach(n), welche die Goldbach-Vermutung
für eine gerade Zahl n prüft und eine entsprechende Zerlegung in die Konsole schreibt.
Es müssen nicht alle Zerlegungen bestimmt werden; eine reicht aus.
Schreibe außerdem eine Funktion verify_goldbachs(n), welche die Vermutung für alle
geraden Zahlen <= n überprüft und jeweils eine Zerlegung ausgibt.

Beispiel:

verify_goldbachs(12)

druckt

4 = 2 + 2
6 = 3 + 3
8 = 3 + 5
10 = 3 + 7
12 = 5 + 7

Themen: Arithmetik, Mathematik, Primzahlen, Schleifen
*/

/**
 * Prüft ob eine Zahl eine Primzahl ist.
 */
function is_prime_number(n) {
	if (n !== Math.floor(n) || n <= 1) return false
	for (let d = 2; d * d <= n; d++) {
		if (n % d === 0) return false
	}
	return true
}

/**
 * Prüft die Goldbach-Vermutung für eine feste natürliche Zahl
 */
function verify_goldbach(n) {
	const is_relevant = Number.isInteger(n) && n >= 4 && n % 2 === 0
	if (!is_relevant) return

	for (let p = 2; p <= n / 2; p++) {
		const q = n - p
		if (is_prime_number(p) && is_prime_number(q)) {
			return console.info(`${n} = ${p} + ${q}`)
		}
	}

	console.warn(`Goldbach conjecture is wrong for n = ${n}`)
}

/**
 * Prüft die Goldbach-Vermutung für alle natürlichen Zahlen unterhalb einer Grenze
 */
function verify_goldbachs(n) {
	console.info(`Verifying Goldbach conjecture up to ${n} ...`)
	for (let k = 4; k <= n; k += 2) {
		verify_goldbach(k)
	}
}

/* ------ TESTS ------ */
verify_goldbachs(100)
