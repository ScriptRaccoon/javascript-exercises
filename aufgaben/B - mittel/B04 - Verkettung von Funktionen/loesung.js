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
const add_one_then_double = compose(double, add_one)
const add_three = compose(add_one, compose(add_one, add_one))

console.info(double_then_add_one(4)) // 9
console.info(add_one_then_double(4)) // 10
console.info(add_three(4)) // 7
