export class AST_UTILS {
	/**
	 * This is not needed right here, but may be useful in some scenarios.
	 */
	static to_term(node) {
		switch (node.type) {
			case "number":
				return node.value
			case "variable":
				return node.name
			case "unary":
				return [node.op, AST_UTILS.to_term(node.expr)]
			case "binary":
				return [
					node.op,
					AST_UTILS.to_term(node.left),
					AST_UTILS.to_term(node.right),
				]
		}
	}

	static evaluate(node, vars = {}) {
		switch (node.type) {
			case "number":
				return node.value

			case "variable":
				if (!(node.name in vars)) {
					throw new Error(`variable ${node.name} not defined`)
				}
				return vars[node.name]

			case "unary":
				return -AST_UTILS.evaluate(node.expr, vars)

			case "binary": {
				const left = AST_UTILS.evaluate(node.left, vars)
				const right = AST_UTILS.evaluate(node.right, vars)

				switch (node.op) {
					case "+":
						return left + right
					case "-":
						return left - right
					case "*":
						return left * right
					case "/":
						return left / right
					default:
						throw new Error(`unknown operator ${node.op}`)
				}
			}
		}
	}
}
