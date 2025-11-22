import { describe, it, expect } from "vitest"
import { AST, AST_UTILS } from "./ast"

describe("AST_UTILS.evaluate", () => {
	it("evaluates numbers", () => {
		const ast: AST = { type: "number", value: 42 }
		const val = AST_UTILS.evaluate(ast)
		expect(val).toBe(42)
	})

	it("evaluates binary operations", () => {
		const ast: AST = {
			type: "binary",
			op: "+",
			left: { type: "variable", name: "x" },
			right: { type: "variable", name: "y" },
		}

		const val = AST_UTILS.evaluate(ast!, { x: 10, y: 2 })
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

		const val = AST_UTILS.evaluate(ast, { y: 1 })
		expect(val).toBe(0.5)
	})
})
