/**
 * Abstrakte Funktion, die zwei Funktionen miteinander verkettet.
 */
function compose(f, g) {
	return (s) => f(g(s))
}

/* ------ TESTS ------ */
const add_one = (n) => n + 1
const double = (n) => 2 * n
const double_then_add_one = compose(add_one, double)

console.info(double_then_add_one(4) === 9)
console.info(compose(add_one, add_one)(4) === 6)
