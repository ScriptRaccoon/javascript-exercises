import { describe, it, expect } from "vitest"
import { AST, evaluate_ast } from "./ast"

describe("evaluate_ast", () => {
	it("evaluates numbers", () => {
		const ast: AST = { type: "number", value: 42 }
		const val = evaluate_ast(ast)
		expect(val).toBe(42)
	})

	it("evaluates binary operations", () => {
		const ast: AST = {
			type: "binary",
			op: "+",
			left: { type: "variable", name: "x" },
			right: { type: "variable", name: "y" },
		}

		const val = evaluate_ast(ast!, { x: 10, y: 2 })
		expect(val).toBe(12)
	})

	it("evaluates nested expressions", () => {
		const ast: AST = {
			type: "binary",
			op: "/",
			left: { type: "number", value: 1 },
			right: {
				type: "binary",
				op: "+",
				left: { type: "number", value: 1 },
				right: {
					type: "binary",
					op: "/",
					left: { type: "number", value: 1 },
					right: { type: "variable", name: "y" },
				},
			},
		}

		const val = evaluate_ast(ast, { y: 1 })
		expect(val).toBe(0.5)
	})
})
