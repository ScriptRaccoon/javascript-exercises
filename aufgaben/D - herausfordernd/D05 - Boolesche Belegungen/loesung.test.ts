import { describe, it, expect } from "vitest"
import {
	BooleanExpression,
	generate_random_expr,
	get_assignments,
	get_assignments_iterator,
	replace_variables,
	simplify_expression,
	stringify_expr,
} from "./loesung"

describe("get_assignments", () => {
	it("works for x ∧ y", () => {
		const expr: BooleanExpression = ["and", "x", "y"]
		const assignments = get_assignments(expr)
		expect(assignments.length).toBe(1)
		expect(assignments).toContainEqual({ x: true, y: true })
	})

	it("works for ¬x ∨ ¬y", () => {
		const expr: BooleanExpression = ["or", ["not", "x"], ["not", "y"]]
		const assignments = get_assignments(expr)
		expect(assignments.length).toBe(3)
		expect(assignments).toContainEqual({ x: true, y: false })
		expect(assignments).toContainEqual({ x: false, y: false })
		expect(assignments).toContainEqual({ x: false, y: false })
	})

	it("works for ¬(¬(((x ∨ z) ∨ (¬x)) ∧ ((¬y) ∧ (¬x))))", () => {
		const expr: BooleanExpression = [
			"not",
			[
				"not",
				[
					"and",
					["or", ["or", "x", "z"], ["not", "x"]],
					["and", ["not", "y"], ["not", "x"]],
				],
			],
		]
		const assignments = get_assignments(expr)
		expect(assignments.length).toBe(2)
		expect(assignments).toContainEqual({ x: false, z: true, y: false })
		expect(assignments).toContainEqual({ x: false, z: false, y: false })
	})
})

describe("get_assignments_iterator", () => {
	for (let depth = 0; depth < 5; depth++) {
		const expr: BooleanExpression = generate_random_expr(depth, "abcdef".split(""))
		it(`[random] works for ${stringify_expr(expr)}`, () => {
			const assignments = get_assignments_iterator(expr)
			for (const assignment of assignments) {
				const value = simplify_expression(replace_variables(expr, assignment))
				expect(value).toBe(true)
			}
		})
	}
})
