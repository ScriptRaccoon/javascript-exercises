/**
 * Logical symbol "not"
 */
const not = "not"

/**
 * Logical symbol "and"
 */
const and = "and"

/**
 * Logical symbol "or"
 */
const or = "or"

/**
 * Type for a boolean expression with variables
 */
export type BooleanExpression =
	| boolean
	| string
	| [typeof not, BooleanExpression]
	| [typeof and | typeof or, BooleanExpression, BooleanExpression]

/**
 * Converts a boolean expression to a readable string.
 */
export function stringify_expr(expr: BooleanExpression): string {
	if (typeof expr === "boolean") {
		return expr ? "⊤" : "⊥"
	}
	if (typeof expr === "string") {
		return expr
	}

	const op = expr[0]
	const a = stringify_expr(expr[1])
	const a_clear = a.length <= 1 ? a : `(${a})`

	if (op === not) {
		return `¬${a_clear}`
	}

	const b = stringify_expr(expr[2])
	const b_clear = b.length <= 1 ? b : `(${b})`

	if (op === and) {
		return `${a_clear} ∧ ${b_clear}`
	}

	if (op === or) {
		return `${a_clear} ∨ ${b_clear}`
	}

	throw new Error(`Unexpected operator: ${op}`)
}

/**
 * Structural equality for two boolean expressions.
 */
function structural_equal(a: BooleanExpression, b: BooleanExpression): boolean {
	if (!Array.isArray(a)) {
		return typeof b === typeof a && a === b
	}

	return (
		Array.isArray(b) &&
		a.length === b.length &&
		a[0] === b[0] &&
		a.every((expr, i) => structural_equal(expr, b[i]))
	)
}

/**
 * Utility function for duplicate-free union of arrays.
 */
function array_union<T>(a: T[], b: T[]): T[] {
	const u = a.slice()
	for (const x of b) {
		if (!u.includes(x)) u.push(x)
	}
	return u
}

/**
 * Returns the list of distinct variables in a boolean expression.
 */
function get_variables(expr: BooleanExpression): string[] {
	if (typeof expr === "boolean") {
		return []
	}
	if (typeof expr === "string") {
		return [expr]
	}

	const op = expr[0]

	if (op === not) {
		return get_variables(expr[1])
	}

	return array_union(get_variables(expr[1]), get_variables(expr[2]))
}

/**
 * Replaces a list of variables of a boolean expression with other boolean expressions.
 */
export function replace_variables(
	expr: BooleanExpression,
	replacements: Record<string, BooleanExpression>,
): BooleanExpression {
	if (typeof expr === "boolean") {
		return expr
	}

	if (typeof expr === "string") {
		if (expr in replacements) return replacements[expr]
		return expr
	}

	const op = expr[0]

	if (op === not) {
		return [not, replace_variables(expr[1], replacements)]
	}

	const [a, b] = [expr[1], expr[2]]

	return [op, replace_variables(a, replacements), replace_variables(b, replacements)]
}

/**
 * Returns a simplified version of the given boolean expression.
 */
export function simplify_expression(expr: BooleanExpression): BooleanExpression {
	if (typeof expr === "boolean" || typeof expr === "string") {
		return expr
	}

	const op = expr[0]

	if (op === not) {
		const negated = expr[1]

		// not not x = x
		if (Array.isArray(negated) && negated[0] === not) {
			return simplify_expression(negated[1])
		}

		const a = simplify_expression(negated)

		// not true = false, not false = true
		if (typeof a === "boolean") return !a

		return [not, a]
	}

	if (op === and) {
		const [left, right] = [expr[1], expr[2]]

		const a = simplify_expression(left)

		// x and x = x
		if (structural_equal(left, right)) return a

		// x and y = y
		if (a === true) return simplify_expression(right)

		// false and y = false
		if (a === false) return false

		const b = simplify_expression(right)

		// x and x = x
		if (structural_equal(a, b)) return a

		// x and true = x
		if (b === true) return a

		// x and false = false
		if (b === false) return false

		// x and (not x) = false
		if (Array.isArray(b) && b[0] === not && structural_equal(a, b[1])) {
			return false
		}

		// (not x) and x = false
		if (Array.isArray(a) && a[0] === not && structural_equal(b, a[1])) {
			return false
		}

		return [and, a, b]
	}

	if (op === or) {
		const [left, right] = [expr[1], expr[2]]

		const a = simplify_expression(left)

		// x or x = x
		if (structural_equal(left, right)) return a

		// true or x = true
		if (a === true) return true

		// false or x = x
		if (a === false) return simplify_expression(right)

		const b = simplify_expression(right)

		// x or x = x
		if (structural_equal(a, b)) return a

		// x or true = true
		if (b === true) return true

		// x or false = x
		if (b === false) return a

		// x or (not x) = true
		if (Array.isArray(b) && b[0] === not && structural_equal(a, b[1])) {
			return true
		}

		// (not x) or x = true
		if (Array.isArray(a) && a[0] === not && structural_equal(b, a[1])) {
			return true
		}

		return [or, a, b]
	}

	throw new Error(`Unexpected operator: ${op}`)
}

type Assignment = Record<string, boolean>

/**
 * Returns an unassigned variable in a partial assignment, if there is any.
 */
function get_unassigned_variable(
	assignment: Assignment,
	vars: string[],
): string | undefined {
	const assigned_vars = new Set(Object.keys(assignment))
	return vars.find((variable) => !assigned_vars.has(variable))
}

/**
 * Yields all extensions of an assignment where the non-assigned
 * variables are assigned `true` or `false`.
 */
function* extend_assignment(
	assignment: Assignment,
	vars: string[],
): IterableIterator<Assignment> {
	const variable = get_unassigned_variable(assignment, vars)
	if (!variable) {
		yield assignment
		return
	}
	yield* extend_assignment({ ...assignment, [variable]: true }, vars)
	yield* extend_assignment({ ...assignment, [variable]: false }, vars)
}

/**
 * Yields all assignments of a boolean expression that make it true.
 * Uses backtracking and prunes partial assignments early by simplifying
 * substituted expressions.
 */
export function* get_assignments_iterator(
	expr: BooleanExpression,
): IterableIterator<Assignment> {
	const vars = get_variables(expr)

	const stack: Assignment[] = [{}]

	while (stack.length > 0) {
		const assignment = stack.pop()!

		const replaced = replace_variables(expr, assignment)
		const simplified = simplify_expression(replaced)

		if (simplified === false) {
			continue
		}

		if (simplified === true) {
			yield* extend_assignment(assignment, vars)
			continue
		}

		const variable = get_unassigned_variable(assignment, vars)
		// If there was no unassigned variable, `simplified` above would be true or false.
		if (!variable) throw new Error(`Expected an unassigned variable.`)

		stack.push({ ...assignment, [variable]: false })
		stack.push({ ...assignment, [variable]: true })
	}
}

/**
 * Returns the list of all assignments of a boolean expression that make it true.
 */
export function get_assignments(expr: BooleanExpression): Assignment[] {
	return [...get_assignments_iterator(expr)]
}

/**
 * Generates a random boolean expression with a given depth
 * and a list of variables. This is used for testing purposes.
 */
export function generate_random_expr(depth: number, vars: string[]): BooleanExpression {
	if (depth === 0) {
		const i = Math.floor(Math.random() * vars.length)
		return vars[i]
	}

	const r = Math.random()
	if (r < 1 / 3) {
		return [not, generate_random_expr(depth - 1, vars)]
	}
	const op = Math.random() < 0.5 ? and : or
	const a = generate_random_expr(depth - 1, vars)
	let b = generate_random_expr(depth - 1, vars)
	while (structural_equal(a, b)) {
		b = generate_random_expr(depth - 1, vars)
	}
	return [op, a, b]
}
