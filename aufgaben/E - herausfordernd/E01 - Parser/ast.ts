type OperatorName = string
type VariableName = string

export type AST =
	| { type: "number"; value: number }
	| { type: "variable"; name: VariableName }
	| { type: "binary"; op: OperatorName; left: AST; right: AST }
	| { type: "unary"; op: OperatorName; expr: AST }

export function evaluate_ast(node: AST, vars: Record<string, number> = {}): number {
	switch (node.type) {
		case "number":
			return node.value

		case "variable":
			if (!(node.name in vars)) {
				throw new Error(`variable ${node.name} not defined`)
			}
			return vars[node.name]

		case "unary":
			return -evaluate_ast(node.expr, vars)

		case "binary": {
			const left = evaluate_ast(node.left, vars)
			const right = evaluate_ast(node.right, vars)

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
