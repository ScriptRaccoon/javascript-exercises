/**
 * List of allowed operators
 */
const OPERATORS = [
	{ symbol: "+", commutative: true },
	{ symbol: "-", commutative: false },
	{ symbol: "*", commutative: true },
	{ symbol: "/", commutative: false },
	{ symbol: "**", commutative: false },
] as const

/**
 * Union type of allowed operator symbols
 */
type Operator = (typeof OPERATORS)[number]["symbol"]

/**
 * Recursive type of an arithmetic expression
 */
export type Expr = number | [Operator, Expr, Expr]

/**
 * Evaluates an arithmetic expression.
 * Returns `null` for division by 0.
 */
export function evaluate(expr: Expr): number | null {
	if (typeof expr === "number") return expr

	const [op, left, right] = expr

	const a = evaluate(left)
	const b = evaluate(right)

	if (a === null || b === null) return null

	return apply_operator(op, a, b)
}

/**
 * Applies an operator symbol to two numbers.
 * Returns `null` for divison by 0.
 */
function apply_operator(op: Operator, a: number, b: number): null | number {
	switch (op) {
		case "+":
			return a + b
		case "-":
			return a - b
		case "/":
			if (b === 0) return null
			return a / b
		case "*":
			return a * b
		case "**":
			return a ** b
	}
}

/**
 * Finds an arithmetic expression with the least number of operators
 * that is built up from the constant and which evaluates to the target.
 */
export function find_shortest_expression(target: number, constant: number): Expr | null {
	if (!(Number.isInteger(target) && target > 0)) {
		throw new Error("Target must be a positive integer")
	}

	if (!(Number.isInteger(constant) && constant > 0)) {
		throw new Error("Constant must be a positive integer")
	}

	if (target === constant) return constant

	/**
	 * layers[d] = list of all relevant [expr,val], where expr is an expression with d
	 * operators which evaluates to v. Because of BFS below, d is always minimal for v.
	 */
	const layers: [Expr, number][][] = []

	layers[0] = [[constant, constant]]

	/**
	 * Set of found values. We only want to save a value once.
	 *
	 * We only save integer values because it is safe to assume that
	 * rational values do not lead to shortest expressions. One might
	 * even restrict the size of values, but there is a chance that
	 * this skips some shortest expressions with cancelling terms.
	 * Pruning "useless" values speeds up the algorithm a *lot*, but
	 * it is hard to properly justify which values are "useless".
	 */
	const found_values = new Set<number>([constant])

	/**
	 * The number of operators needed. This equals the target since
	 * n = (d + ... + d)/d is an expression with n operators.
	 */
	const MAX_OPERATORS = target

	for (let d = 1; d <= MAX_OPERATORS; d++) {
		layers[d] = []

		for (const op of OPERATORS) {
			const limit_p = op.commutative ? Math.floor((d - 1) / 2) : d - 1

			for (let p = 0; p <= limit_p; p++) {
				for (const [left, a] of layers[p]) {
					for (const [right, b] of layers[d - 1 - p]) {
						{
							const expr: Expr = [op.symbol, left, right]
							const val = apply_operator(op.symbol, a, b)

							if (val === target) return expr

							const save =
								val !== null &&
								Number.isInteger(val) &&
								!found_values.has(val)

							if (save) {
								layers[d].push([expr, val])
								found_values.add(val)
							}
						}
					}
				}
			}
		}
	}

	return null
}

/**
 * Converts an arithmetic expression to a readable string such as 4+(4*4).
 */
export function stringify_expression(expr: Expr): string {
	if (typeof expr === "number") return expr.toString()
	const a = stringify_expression(expr[1])
	const b = stringify_expression(expr[2])
	const a_brackets = typeof expr[1] === "number" ? a : `(${a})`
	const b_brackets = typeof expr[2] === "number" ? b : `(${b})`
	return a_brackets + expr[0] + b_brackets
}

/**
 * Prints an arithmetic expression with the least number of operators
 * that is built up from the constant and which evaluates to the target.
 */
// @ts-expect-error Function unused since it is used for development.
function print_shortest_expression(target: number, constant: number): void {
	const expr = find_shortest_expression(target, constant)
	if (expr) {
		const str = stringify_expression(expr)
		console.info(`${target} = ${str}`)
	} else {
		console.info(`${target} = ?`)
	}
}
