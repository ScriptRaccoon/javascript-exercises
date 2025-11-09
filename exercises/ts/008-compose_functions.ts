/*
Aufgabe: Implementiere eine abstrakte Funktion compose(f,g), die zwei Funktionen
f und g entgegennimmt und die verkettete Funktion f o g zurückgibt,
die also erst g und dann f ausführt. Beide Funktionen f und g haben nur ein Argument.

Beispiel:

const add_one = (n) => n + 1
const double = (n) => 2 * n
const double_then_add_one = compose(add_one, double)

Dann soll gelten:

double_then_add_one(4) === 9

Themen: Funktionen höherer Ordnung, Funktionen als Argumente,
Funktionen als Rückgabewerte, Hilfsfunktionen
*/

/**
 * Abstrakte Funktion, die zwei Funktionen miteinander verkettet.
 */
function compose<S, T, R>(f: (t: T) => R, g: (s: S) => T): (s: S) => R {
	return (s) => f(g(s))
}

/* ------ TESTS ------ */
const add_one = (n: number) => n + 1
const double = (n: number) => 2 * n
const double_then_add_one = compose(add_one, double)

console.info(double_then_add_one(4) === 9)
console.info(compose(add_one, add_one)(4) === 6)
