/**
 * Wertet einen beschrifteten Binärbaum aus.
 */
function evaluate(tree) {
	if (typeof tree === "number") {
		return tree
	}

	const [operator, child_1, child_2] = tree

	const evaluated_1 = evaluate(child_1)
	const evaluated_2 = evaluate(child_2)

	switch (operator) {
		case "+":
			return evaluated_1 + evaluated_2
		case "-":
			return evaluated_1 - evaluated_2
		case "*":
			return evaluated_1 * evaluated_2
		case "/":
			return evaluated_1 / evaluated_2
	}
}

/* ------ TESTS ------ */

// 0
console.info(evaluate(["-", 3, 3]))

// 0.5
console.info(evaluate(["/", 1, 2]))

// 6
console.info(evaluate(["*", ["+", 1, 2], ["-", 4, 2]]))

// 0.6666...
console.info(evaluate(["/", 1, ["+", 1, ["/", 1, ["+", 1, 1]]]]))
