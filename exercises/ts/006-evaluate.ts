/**
 * Aufgabe: Schreibe eine Funktion, die einen mit Operationszeichen und Zahlen beschrifteten
 * Binärbaum zu einer Zahl auswertet.
 *
 * Beispiel:
 *
 * Der beschriftete Binärbaum
 *
 *              *
 *             / \
 *            /   \
 *           /     \
 *          +       -
 *         / \     / \
 *        /   \   /   \
 *       1     2  4    2
 *
 * wird ausgewertet zu (1 + 2) * (4 - 2) = 3 * 2 = 6.
 *
 * Im Code wird der Binärkaum kodiert durch
 *
 * const tree = ["*", ["+", 1, 2], ["-", 4, 2]]
 *
 * und es soll dann gelten:
 *
 * evaluate(["*", ["+", 1, 2], ["-", 4, 2]]) == 6
 *
 * Themen: Rekursion, Fallunterscheidung
 */

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
