type BinaryOperator = "+" | "-" | "*" | "/"
type BinaryTree = number | [BinaryOperator, BinaryTree, BinaryTree]

function evaluate(tree: BinaryTree): number {
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
console.info(evaluate(["-", 3, 3]))
console.info(evaluate(["/", 1, 2]))
console.info(evaluate(["*", ["+", 1, 2], ["-", 4, 2]]))
console.info(evaluate(["/", 1, ["+", 1, ["/", 1, ["+", 1, 1]]]]))
